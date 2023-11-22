package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.entidades.Cita;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface CitaService {

    List<Cita> listarCita();

    public RespuestaControlador guardar (Cita cita);

    public RespuestaControlador actualizar (Cita cita);

    public RespuestaControlador eliminar (Long id);
}
