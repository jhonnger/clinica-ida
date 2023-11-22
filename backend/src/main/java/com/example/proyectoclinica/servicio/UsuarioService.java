package com.example.proyectoclinica.servicio;

import com.example.proyectoclinica.dtos.LoginDto;
import com.example.proyectoclinica.dtos.UsuarioDto;
import com.example.proyectoclinica.entidades.Usuario;
import com.example.proyectoclinica.util.RespuestaControlador;

import java.util.List;

public interface UsuarioService {
    UsuarioDto validarCredenciales(LoginDto credenciales) throws Exception;

    List<Usuario> listarUsuarios();

    public RespuestaControlador guardar (Usuario usuario);

    public RespuestaControlador actualizar (Usuario usuario);

    public RespuestaControlador eliminar (Long id);
}
