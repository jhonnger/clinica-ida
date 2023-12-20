package com.example.proyectoclinica.dtos;

import java.time.LocalDate;

public class FiltroCitasDto {
    private LocalDate fecha;
    private Long medicoId;

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Long getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(Long medicoId) {
        this.medicoId = medicoId;
    }
}
