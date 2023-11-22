package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Aseguradora;
import com.example.proyectoclinica.repositorios.AseguradoraRepositorio;
import com.example.proyectoclinica.servicio.AseguradoraService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AseguradoraServicioImpl implements AseguradoraService {

    @Autowired
    private AseguradoraRepositorio aseguradoraRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    public List<Aseguradora> listarAseguradora(){
        return aseguradoraRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Aseguradora aseguradora) {
        RespuestaControlador respuestaControlador;
        aseguradoraRepositorio.save(aseguradora);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(Aseguradora aseguradora) {
        RespuestaControlador respuestaControlador;
        aseguradoraRepositorio.save(aseguradora);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        aseguradoraRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;
    }
}
