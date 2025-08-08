package com.cidadao_alerta.Cidadao_Alerta.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate dataCriacao;

    @ManyToOne()
    @JoinColumn(name = "usuario_id")
    @JsonIgnore()
    private Usuario usuario;
    @ManyToOne()
    @JoinColumn(name = "pontos_id")
    @JsonIgnore()
    private Pontos pontos;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Pontos getPontos() {
        return pontos;
    }

    public void setPontos(Pontos pontos) {
        this.pontos = pontos;
    }
}
