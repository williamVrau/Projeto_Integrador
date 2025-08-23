package com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Voto;

public class PontoVotoGetDTO {
    private Integer id;

    public PontoVotoGetDTO(Voto voto) {
        this.id = voto.getId();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
