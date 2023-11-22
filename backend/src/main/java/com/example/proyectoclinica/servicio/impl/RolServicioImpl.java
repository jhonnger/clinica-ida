package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Rol;
import com.example.proyectoclinica.repositorios.RolRepositorio;
import com.example.proyectoclinica.servicio.RolServicio;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServicioImpl implements RolServicio {
    @Autowired
    private RolRepositorio rolRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public List<Rol> listarRoles(){

        return rolRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Rol rol) {
        RespuestaControlador respuestaControlador;
        rolRepositorio.save(rol);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(Rol rol) {
        RespuestaControlador respuestaControlador;
        rolRepositorio.save(rol);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        rolRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;
    }
}
