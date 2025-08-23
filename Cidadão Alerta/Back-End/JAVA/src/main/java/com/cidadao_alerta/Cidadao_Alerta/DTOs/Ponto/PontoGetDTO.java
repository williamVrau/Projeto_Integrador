package com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Voto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PontoGetDTO {
    private Integer id;
    private String name;
    private String description;
    private Double lat;
    private Double lng;
    private String tipoOcorrencia;
    private LocalDate dataCriacao = LocalDate.now();
    private String situacao = "Aberta";
    private String urlImagen = "Usuario";
    private List<PontoVotoGetDTO> votos = new ArrayList<>();

    public PontoGetDTO(Pontos ponto) {
        this.id = ponto.getId();
        this.name = ponto.getName();
        this.lat = ponto.getLat();
        this.description = ponto.getDescription();
        this.lng = ponto.getLng();
        this.tipoOcorrencia = ponto.getTipoOcorrencia();
        this.dataCriacao = ponto.getDataCriacao();
        this.urlImagen = ponto.getUrlImagen();
        this.situacao = ponto.getSituacao();
        List<PontoVotoGetDTO> listaVotos = new ArrayList<>();
        for (Voto i : ponto.getVotos()) {
            PontoVotoGetDTO votoGet = new PontoVotoGetDTO(i);
            listaVotos.add(votoGet);
        }
        this.votos = listaVotos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getTipoOcorrencia() {
        return tipoOcorrencia;
    }

    public void setTipoOcorrencia(String tipoOcorrencia) {
        this.tipoOcorrencia = tipoOcorrencia;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public List<PontoVotoGetDTO> getVotos() {
        return votos;
    }

    public void setVotos(List<PontoVotoGetDTO> votos) {
        this.votos = votos;
    }
}
