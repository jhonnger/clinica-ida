package com.example.proyectoclinica.controllers;

import com.example.proyectoclinica.entidades.Aseguradora;
import com.example.proyectoclinica.servicio.AseguradoraService;
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

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/aseguradora")
public class AseguradoraController {

    @Autowired
    private AseguradoraService aseguradoraService;

    @GetMapping("/listar")
    public List<Aseguradora> listarAseguradora(){
        return aseguradoraService.listarAseguradora();
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar (@RequestBody Aseguradora aseguradora){
        try {
            RespuestaControlador rc = aseguradoraService.guardar(aseguradora);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar (@RequestBody Aseguradora aseguradora){
        try {
            RespuestaControlador rc =aseguradoraService.actualizar(aseguradora);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar (@PathVariable Long id){
        try {
            RespuestaControlador rc =  aseguradoraService.eliminar(id);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
