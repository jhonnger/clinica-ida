package com.example.proyectoclinica.servicio.impl;

import com.example.proyectoclinica.dtos.LoginDto;
import com.example.proyectoclinica.dtos.UsuarioDto;
import com.example.proyectoclinica.entidades.Usuario;
import com.example.proyectoclinica.repositorios.UsuarioRepositorio;
import com.example.proyectoclinica.servicio.UsuarioService;
import com.example.proyectoclinica.util.RespuestaControlador;
import com.example.proyectoclinica.util.RespuestaControladorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    RespuestaControladorServicio respuestaControladorServicio;

    @Override
    public UsuarioDto validarCredenciales(LoginDto credenciales) throws Exception {

        UsuarioDto dto = new UsuarioDto();
        Usuario usuario = usuarioRepositorio.findUsuarioByLogin(credenciales.getUsuario());

        if(!usuario.getPassword().equals(credenciales.getContrasena())
        || !usuario.getRol().getId().toString().equals(credenciales.getRol())){
            throw new Exception("Credenciales incorrectas");
        }

        dto.setLogin(usuario.getLogin());
        dto.setIdUsuario(usuario.getId());
        dto.setNombre(usuario.getNombre());

        return dto;
    }

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @Override
    public RespuestaControlador guardar(Usuario usuario) {
        RespuestaControlador respuestaControlador;
        usuarioRepositorio.save(usuario);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoCrear("Medico");
        return respuestaControlador;
    }

    @Override
    public RespuestaControlador actualizar(Usuario usuario) {
        RespuestaControlador respuestaControlador;
        usuarioRepositorio.save(usuario);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoActualizar("Medico");
        return respuestaControlador;

    }

    @Override
    public RespuestaControlador eliminar(Long id) {
        RespuestaControlador respuestaControlador;
        usuarioRepositorio.deleteById(id);
        respuestaControlador = respuestaControladorServicio.obtenerRespuestaDeExitoEliminar("Medico");
        return respuestaControlador;
    }
}
