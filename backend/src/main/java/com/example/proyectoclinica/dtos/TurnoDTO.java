package com.example.proyectoclinica.dtos;

import java.time.LocalDateTime;

public class TurnoDTO {

    private String turno;

    private LocalDateTime fecha;

    public TurnoDTO() {
    }

    public TurnoDTO(String turno, LocalDateTime fecha) {
        this.turno = turno;
        this.fecha = fecha;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
