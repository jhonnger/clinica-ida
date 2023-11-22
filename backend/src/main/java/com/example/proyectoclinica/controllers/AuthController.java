package com.example.proyectoclinica.controllers;

import com.example.proyectoclinica.dtos.LoginDto;
import com.example.proyectoclinica.entidades.Usuario;
import com.example.proyectoclinica.servicio.UsuarioService;
import com.example.proyectoclinica.util.RespuestaControlador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> logueo(@RequestBody LoginDto request){

        try {
            return ResponseEntity.ok(usuarioService.validarCredenciales(request));
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Usuario usuario){
        try {
            RespuestaControlador rc = usuarioService.guardar(usuario);
            return ResponseEntity.ok(rc);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar (@RequestBody Usuario usuario) {
        try {
            RespuestaControlador rc = usuarioService.actualizar(usuario);
            return ResponseEntity.ok(rc);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar (@PathVariable Long id){
        try {
            RespuestaControlador rc = usuarioService.eliminar(id);
            return ResponseEntity.ok(rc);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }



}
