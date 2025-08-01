package com.cidadao_alerta.Cidadao_Alerta.Entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

    @Entity
    public class Usuario {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private String nome;
        private String email;
        private String senha;
        private String classe;
        @OneToMany(mappedBy = "usuario",cascade = CascadeType.ALL)
        private List<Pontos> pontos = new ArrayList<>();


    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public String getEmail() {
        return email;
    }

    public String getClasse() {
        return classe;
    }

    public List<Pontos> getPontos() {
        return pontos;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setClasse(String classe) {
        this.classe = classe;
    }

    public void setPontos(List<Pontos> pontos) {
        this.pontos = pontos;
    }
}
