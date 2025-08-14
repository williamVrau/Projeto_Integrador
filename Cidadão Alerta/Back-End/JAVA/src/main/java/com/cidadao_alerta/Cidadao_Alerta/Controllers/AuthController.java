package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Auth.LoginRequest;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Auth.LoginResponse;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Services.JWTService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepositories usuarioRepository;
    private final UserDetailsService userDetailsService;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepositories usuarioRepository, UserDetailsService userDetailsService, JWTService jwtService, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        if (this.usuarioRepository.findByEmail(usuario.getEmail()).isPresent()){
            throw new BadCredentialsException("Email em Uso");
        }
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return this.usuarioRepository.save(usuario);

    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        UserDetails user = userDetailsService.loadUserByUsername(request.email);
        Usuario usuarioEmail = this.usuarioRepository.findByEmail(request.email).get();

        if (!passwordEncoder.matches(request.senha, user.getPassword())) {
            throw new BadCredentialsException("Senha inválida");
        }

        String token = jwtService.generateToken(user);
        return new LoginResponse(token, usuarioEmail);
    }
}
