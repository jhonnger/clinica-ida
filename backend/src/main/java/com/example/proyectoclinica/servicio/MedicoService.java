package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.entidades.Medico;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface MedicoService {

    List<Medico> listarMedico();

    public RespuestaControlador guardar (Medico medico);

    public RespuestaControlador actualizar (Medico medico);

    public RespuestaControlador eliminar (Long id);
}
