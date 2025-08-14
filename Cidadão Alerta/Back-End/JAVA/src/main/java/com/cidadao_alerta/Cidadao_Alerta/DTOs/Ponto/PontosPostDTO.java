package com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

public class PontosPostDTO{
    private String name;
    private String description;
    private Double lat;
    private Double lng;
    private String tipoOcorencia;
    private String situacao;
    private String criador;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
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

    public String getSituacao() {
        return situacao;
    }

    public String getCriador() {
        return criador;
    }
}
