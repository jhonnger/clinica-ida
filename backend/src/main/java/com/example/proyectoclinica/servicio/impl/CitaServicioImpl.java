package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Cita;
import com.example.proyectoclinica.repositorios.CitaRepositorio;
import com.example.proyectoclinica.servicio.CitaService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitaServicioImpl implements CitaService {

    @Autowired
    private CitaRepositorio citaRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public List<Cita> listarCita() {
        return citaRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Cita cita) {
        RespuestaControlador respuestaControlador;
        citaRepositorio.save(cita);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador actualizar(Cita cita) {
        RespuestaControlador respuestaControlador;
        citaRepositorio.save(cita);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        citaRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;

    }
}
