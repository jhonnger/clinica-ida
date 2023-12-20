package com.example.proyectoclinica.controllers;

import com.example.proyectoclinica.dtos.FiltroCitasDto;
import com.example.proyectoclinica.dtos.ProgramacionDto;
import com.example.proyectoclinica.entidades.ProgramacionMedico;
import com.example.proyectoclinica.servicio.ProgramacionServicio;
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
@RequestMapping("/programacion")
public class ProgramacionController {

    @Autowired
    private ProgramacionServicio programacionServicio;

    @GetMapping
    public List<ProgramacionMedico> listarRoles(){
        return programacionServicio.listarProgramacion();
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar (@RequestBody ProgramacionDto programacion){
        try {
            RespuestaControlador rc = programacionServicio.guardar(programacion);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/buscar")
    public ResponseEntity<?> buscar (@RequestBody ProgramacionDto programacion){
        try {
            RespuestaControlador rc = RespuestaControlador.obtenerRespuestaExitoConExtraInfo(programacionServicio.buscarPorFiltros(programacion));
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/buscarTurnos")
    public ResponseEntity<?> buscarTurnos (@RequestBody FiltroCitasDto filtro){
        try {
            RespuestaControlador rc = RespuestaControlador.obtenerRespuestaExitoConExtraInfo(programacionServicio.listarCitasPorDia(filtro));
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar (@RequestBody ProgramacionMedico programacion){
        try {
            RespuestaControlador rc =programacionServicio.actualizar(programacion);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar (@PathVariable Long id){
        try {
            RespuestaControlador rc =  programacionServicio.eliminar(id);
            return ResponseEntity.ok(rc);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
