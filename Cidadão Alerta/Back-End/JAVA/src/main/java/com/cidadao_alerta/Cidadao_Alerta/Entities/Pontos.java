package com.cidadao_alerta.Cidadao_Alerta.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Pontos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Double lat;
    private Double lng;
    private String tipoOcorencia;
    private Integer votos;
    @ManyToOne()
    @JoinColumn(name = "usuario_id")
    @JsonIgnore()
    private Usuario usuario;

    public Integer getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public Double getLat() {
        return lat;
    }

    public Double getLng() {
        return lng;
    }

    public String getTipoOcorencia() {
        return tipoOcorencia;
    }

    public Integer getVotos() {
        return votos;
    }

    public Usuario getCriador() {
        return usuario;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public void setTipoOcorencia(String tipoOcorencia) {
        this.tipoOcorencia = tipoOcorencia;
    }

    public void setVotos(Integer votos) {
        this.votos = votos;
    }

    public void setCriador(Usuario criador) {
        this.usuario = criador;
    }
}
