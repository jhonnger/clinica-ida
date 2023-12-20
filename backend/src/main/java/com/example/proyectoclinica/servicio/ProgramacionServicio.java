package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.dtos.FiltroCitasDto;
import com.example.proyectoclinica.dtos.ProgramacionDto;
import com.example.proyectoclinica.dtos.TurnoDTO;
import com.example.proyectoclinica.entidades.Cita;
import com.example.proyectoclinica.entidades.ProgramacionMedico;
import com.example.proyectoclinica.entidades.Rol;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface ProgramacionServicio {

    public List<ProgramacionMedico> listarProgramacion();

    List<ProgramacionMedico> buscarPorFiltros(ProgramacionDto dto);

    List<TurnoDTO> listarCitasPorDia(FiltroCitasDto filtro);

    public RespuestaControlador guardar (ProgramacionDto rol);

    public RespuestaControlador actualizar (ProgramacionMedico rol);

    public RespuestaControlador eliminar (Long id);
}
