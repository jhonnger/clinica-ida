package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.entidades.Aseguradora;
import com.example.proyectoclinica.entidades.Rol;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface AseguradoraService {

    public List<Aseguradora> listarAseguradora();

    public RespuestaControlador guardar (Aseguradora aseguradora);

    public RespuestaControlador actualizar (Aseguradora aseguradora);

    public RespuestaControlador eliminar (Long id);
}
