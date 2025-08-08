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
        private String classe = "Usuario";
        @OneToMany(mappedBy = "usuario",cascade = CascadeType.ALL)
        private List<Pontos> pontos = new ArrayList<>();
        @OneToMany(mappedBy = "usuario",cascade = CascadeType.ALL)
        private List<Voto> votos = new ArrayList<>();

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }

        public String getClasse() {
            return classe;
        }

        public void setClasse(String classe) {
            this.classe = classe;
        }

        public List<Voto> getVotos() {
            return votos;
        }

        public void setVotos(List<Voto> votos) {
            this.votos = votos;
        }

        public List<Pontos> getPontos() {
            return pontos;
        }

        public void setPontos(List<Pontos> pontos) {
            this.pontos = pontos;
        }
    }
