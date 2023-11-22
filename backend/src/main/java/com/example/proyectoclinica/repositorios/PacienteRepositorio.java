package com.example.proyectoclinica.repositorios;

import com.example.proyectoclinica.entidades.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepositorio extends JpaRepository<Paciente , Long> {
}
