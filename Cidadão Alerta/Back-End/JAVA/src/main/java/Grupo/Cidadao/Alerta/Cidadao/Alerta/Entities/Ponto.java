package Grupo.Cidadao.Alerta.Cidadao.Alerta.Entities;

public class Ponto {
    private String name;
    private String description;
    private Double lat;
    private Double lng;
    private String imageUrl;
    private String tipoOcorrencia;
    private Integer vote;
    private String creator;
    private String status;

    public Ponto(String name, String description, Double lat, Double lng, String imageUrl, String tipoOcorrencia, Integer vote, String creator, String status) {
        this.name = name;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.imageUrl = imageUrl;
        this.tipoOcorrencia = tipoOcorrencia;
        this.vote = vote;
        this.creator = creator;
        this.status = status;
    }

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

    public String getImageUrl() {
        return imageUrl;
    }

    public String getTipoOcorrencia() {
        return tipoOcorrencia;
    }

    public Integer getVote() {
        return vote;
    }

    public String getCreator() {
        return creator;
    }

    public void setVote(Integer vote) {
        this.vote = vote;
    }
}
