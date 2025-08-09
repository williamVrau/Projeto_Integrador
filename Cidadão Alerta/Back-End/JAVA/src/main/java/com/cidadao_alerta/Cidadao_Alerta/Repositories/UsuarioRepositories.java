package com.cidadao_alerta.Cidadao_Alerta.Repositories;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositories extends JpaRepository<Usuario, Integer> {
    public Optional<Usuario> findByEmail(String email);
}
