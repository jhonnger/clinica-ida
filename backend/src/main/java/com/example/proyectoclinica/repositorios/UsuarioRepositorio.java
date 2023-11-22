package com.example.proyectoclinica.repositorios;

import com.example.proyectoclinica.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    Usuario findUsuarioByLogin(String login);
}
