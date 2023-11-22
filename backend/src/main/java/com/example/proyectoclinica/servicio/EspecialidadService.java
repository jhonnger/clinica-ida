package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.entidades.Especialidad;
import com.example.proyectoclinica.entidades.Paciente;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface EspecialidadService {

    public List<Especialidad> listarEspecialidad();

    public RespuestaControlador guardar (Especialidad especialidad);

    public RespuestaControlador actualizar (Especialidad especialidad);

    public RespuestaControlador eliminar (Long id);
}
