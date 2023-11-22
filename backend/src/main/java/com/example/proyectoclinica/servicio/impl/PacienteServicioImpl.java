package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Paciente;
import com.example.proyectoclinica.repositorios.PacienteRepositorio;
import com.example.proyectoclinica.servicio.PacienteService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServicioImpl implements PacienteService {

    @Autowired
    private PacienteRepositorio pacienteRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;


    @Override
    public List<Paciente> listarPaciente() {
        return pacienteRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Paciente paciente) {
        RespuestaControlador respuestaControlador;
        pacienteRepositorio.save(paciente);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(Paciente paciente) {
        RespuestaControlador respuestaControlador;
        pacienteRepositorio.save(paciente);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        pacienteRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;

    }
}


