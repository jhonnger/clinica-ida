package com.example.proyectoclinica.repositorios;

import com.example.proyectoclinica.entidades.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepositorio extends JpaRepository<Paciente , Long> {

    @Query("SELECT e FROM Paciente e WHERE concat( e.nombre,'',e.apellido) LIKE %:filtro% OR e.dni LIKE %:filtro%")
    List<Paciente> buscarPorNombreODni(@Param("filtro") String filtro);
}
