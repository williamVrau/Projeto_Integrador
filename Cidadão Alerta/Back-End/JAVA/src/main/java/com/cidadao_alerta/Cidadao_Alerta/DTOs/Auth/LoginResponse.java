package com.cidadao_alerta.Cidadao_Alerta.DTOs.Auth;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;

public class LoginResponse {
    public String token;
    public String nome;
    public String email;

    public LoginResponse(String token, Usuario usuario) {
        this.token = token;
        this.email = usuario.getEmail();
        this.nome = usuario.getNome();
    }


}
