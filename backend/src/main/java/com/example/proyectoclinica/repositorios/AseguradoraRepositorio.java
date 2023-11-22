package com.example.proyectoclinica.repositorios;

import com.example.proyectoclinica.entidades.Aseguradora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AseguradoraRepositorio extends JpaRepository<Aseguradora, Long> {
}
