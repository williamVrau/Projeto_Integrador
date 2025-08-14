package com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;

public class UsuarioGetDTO {
    private String nome;
    private String classe;
    private String email;


    public UsuarioGetDTO(Usuario user) {
        this.nome = user.getNome(); ;
        this.classe = user.getClasse();
        this.email = user.getNome();
    }

    public String getEmail() {
        return email;
    }

    public String getClasse() {
        return classe;
    }

    public String getNome() {
        return nome;
    }
}
