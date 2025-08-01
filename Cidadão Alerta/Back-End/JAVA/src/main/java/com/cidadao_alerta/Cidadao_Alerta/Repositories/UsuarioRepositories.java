package com.cidadao_alerta.Cidadao_Alerta.Repositories;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositories extends JpaRepository<Usuario, Integer> {
}
