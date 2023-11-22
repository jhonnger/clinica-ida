package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.entidades.Medico;
import com.example.proyectoclinica.repositorios.MedicoRepositorio;
import com.example.proyectoclinica.servicio.MedicoService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoServicioImpl implements MedicoService {

    @Autowired
    private MedicoRepositorio medicoRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public List<Medico> listarMedico() {
        return medicoRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Medico medico) {
        RespuestaControlador respuestaControlador;
        medicoRepositorio.save(medico);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador actualizar(Medico medico) {
        RespuestaControlador respuestaControlador;
        medicoRepositorio.save(medico);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        medicoRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;

    }
}
