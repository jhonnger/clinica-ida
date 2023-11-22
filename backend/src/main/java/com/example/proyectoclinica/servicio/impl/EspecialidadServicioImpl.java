package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Especialidad;
import com.example.proyectoclinica.repositorios.EspecialidadRepositorio;
import com.example.proyectoclinica.servicio.EspecialidadService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadServicioImpl implements EspecialidadService {

    @Autowired
    private EspecialidadRepositorio especialidadRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public List<Especialidad> listarEspecialidad(){
        return especialidadRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Especialidad especialidad) {
        RespuestaControlador respuestaControlador;
        especialidadRepositorio.save(especialidad);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(Especialidad especialidad) {
        RespuestaControlador respuestaControlador;
        especialidadRepositorio.save(especialidad);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        especialidadRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;
    }
}
