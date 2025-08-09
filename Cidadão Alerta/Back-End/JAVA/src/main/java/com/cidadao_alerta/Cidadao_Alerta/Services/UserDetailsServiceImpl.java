package com.cidadao_alerta.Cidadao_Alerta.Services;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UsuarioRepositories repository;

    public UserDetailsServiceImpl(UsuarioRepositories repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getSenha())
                .authorities("Usuario") // autoridade padrão, não usada
                .build();
    }
}
