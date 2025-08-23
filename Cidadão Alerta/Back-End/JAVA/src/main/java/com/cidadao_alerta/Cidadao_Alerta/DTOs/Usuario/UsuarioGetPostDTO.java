package com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;

public class UsuarioGetPostDTO {
    private String nome;
    private String email;


    public UsuarioGetPostDTO(Usuario user) {
        this.nome = user.getNome(); ;
        this.email = user.getEmail();
    }

    public String getEmail() {
        return email;
    }



    public String getNome() {
        return nome;
    }
}
