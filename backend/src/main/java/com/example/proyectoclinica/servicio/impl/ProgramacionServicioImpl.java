package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.dtos.FiltroCitasDto;
import com.example.proyectoclinica.dtos.ProgramacionDto;
import com.example.proyectoclinica.dtos.TurnoDTO;
import com.example.proyectoclinica.entidades.Cita;
import com.example.proyectoclinica.entidades.Medico;
import com.example.proyectoclinica.entidades.ProgramacionMedico;
import com.example.proyectoclinica.repositorios.ProgramacionMedicoRepositorio;
import com.example.proyectoclinica.servicio.ProgramacionServicio;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
public class ProgramacionServicioImpl implements ProgramacionServicio {
    @Autowired
    private ProgramacionMedicoRepositorio programacionMedicoRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public List<ProgramacionMedico> listarProgramacion(){

        return programacionMedicoRepositorio.findAll();
    }
    @Override
    public List<ProgramacionMedico> buscarPorFiltros(ProgramacionDto dto){

        LocalDateTime fecha = LocalDateTime.of(dto.getAnio(), dto.getMes(), dto.getDia(), 12,0);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formatDateTime = fecha.format(formatter);
        return programacionMedicoRepositorio.findProgramacionMedicoByDia(formatDateTime);
    }

    @Override
    public List<TurnoDTO> listarCitasPorDia(FiltroCitasDto filtro){
        int tiempoAtencion = 20;
        List<TurnoDTO> turnos = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formatDateTime = filtro.getFecha().format(formatter);
        List<ProgramacionMedico> programacion = programacionMedicoRepositorio.findProgramacionMedicoByDia(formatDateTime);

        if(Objects.nonNull(programacion) && !programacion.isEmpty()){
            DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);
            for (ProgramacionMedico det: programacion){
                LocalTime time = det.getFechaInicio().toLocalTime();

                LocalTime to = det.getFechaFin().toLocalTime();

                while (time.isBefore(to)){
                    turnos.add(new TurnoDTO(time.format(formatterTime).concat(" A ").concat(time.plusMinutes(tiempoAtencion).format(formatterTime)), LocalDateTime.of(det.getFechaInicio().toLocalDate(), time)));
                    time = time.plusMinutes(tiempoAtencion);
                }
            }
        }


        return turnos;
    }

    @Override
    public RespuestaControlador guardar(ProgramacionDto rol) {
        RespuestaControlador respuestaControlador;
        ProgramacionMedico programacionMedico = new ProgramacionMedico();

        Medico medico = new Medico();
        medico.setId(rol.getMedicoId());
        LocalDateTime inicio = LocalDateTime.of(rol.getAnio(), rol.getMes(), rol.getDia(), Integer.parseInt(rol.getHoraInicio().split(":")[0]), Integer.parseInt(rol.getHoraInicio().split(":")[1]));
        LocalDateTime fin = LocalDateTime.of(rol.getAnio(), rol.getMes(), rol.getDia(), Integer.parseInt(rol.getHoraFin().split(":")[0]), Integer.parseInt(rol.getHoraFin().split(":")[1]));

        programacionMedico.setMedico(medico);
        programacionMedico.setFechaInicio(inicio);
        programacionMedico.setFechaFin(fin);

        programacionMedicoRepositorio.save(programacionMedico);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Programacion");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(ProgramacionMedico rol) {
        RespuestaControlador respuestaControlador;
        programacionMedicoRepositorio.save(rol);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Programacion");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        programacionMedicoRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Programacion");
        return respuestaControlador;
    }
}
