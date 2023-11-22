package com.example.proyectoclinica.servicio;


import com.example.proyectoclinica.entidades.Paciente;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface PacienteService {

    List<Paciente> listarPaciente();

    public RespuestaControlador guardar (Paciente paciente);

    public RespuestaControlador actualizar (Paciente paciente);

    public RespuestaControlador eliminar (Long id);
}
