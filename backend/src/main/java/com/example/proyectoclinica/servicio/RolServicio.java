package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.entidades.Medico;
import com.example.proyectoclinica.entidades.Rol;
import com.example.proyectoclinica.repositorios.RolRepositorio;
import com.example.proyectoclinica.util.RespuestaControlador;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface RolServicio {

    public List<Rol> listarRoles();

    public RespuestaControlador guardar (Rol rol);

    public RespuestaControlador actualizar (Rol rol);

    public RespuestaControlador eliminar (Long id);
}
