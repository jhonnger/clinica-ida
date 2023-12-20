package com.example.proyectoclinica.repositorios;

import com.example.proyectoclinica.entidades.ProgramacionMedico;
import com.example.proyectoclinica.entidades.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProgramacionMedicoRepositorio extends JpaRepository<ProgramacionMedico, Long> {

    @Query("SELECT e FROM ProgramacionMedico e WHERE  DATE_FORMAT(e.fechaInicio, '%Y%m%d') = :fecha")
    List<ProgramacionMedico> findProgramacionMedicoByDia(@Param("fecha") String fecha);

    @Query("SELECT e FROM ProgramacionMedico e  WHERE DATE_FORMAT(e.fechaInicio, '%Y%m%d') = :fecha and e.medico.id= :medicoId")
    List<ProgramacionMedico> findProgramacionMedicoByDia(@Param("fecha") String fecha, @Param("medicoId") Long medicoId);
}
