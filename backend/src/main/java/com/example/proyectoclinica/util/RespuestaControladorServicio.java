package com.example.proyectoclinica.util;

import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class RespuestaControladorServicio {

    public RespuestaControlador obtenerRespuestaDeExitoCrear(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeExito(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_CREAR_EXITO, nombreEntidad));
    }

    public RespuestaControlador obtenerRespuestaDeErrorCrear(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeError(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_CREAR_ERROR, nombreEntidad));
    }

    public RespuestaControlador obtenerRespuestaDeExitoActualizar(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeExito(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_ACTUALIZAR_EXITO, nombreEntidad));
    }

    public RespuestaControlador obtenerRespuestaDeErrorActualizar(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeError(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_ACTUALIZAR_ERROR, nombreEntidad));
    }

    public RespuestaControlador obtenerRespuestaDeExitoEliminar(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeExito(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_ELIMINAR_EXITO, nombreEntidad));
    }

    public RespuestaControlador obtenerRespuestaDeErrorEliminar(String nombreEntidad) {
        return RespuestaControlador.obtenerRespuestaDeError(MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_ELIMINAR_ERROR, nombreEntidad));
    }

    public String obtenerMensajeErrorActualizar(String nombreEntidad){
        return MessageFormat.format(Constantes.RESPUESTA_CONTROLADOR.MENSAJE_ACTUALIZAR_ERROR, nombreEntidad);
    }

}
