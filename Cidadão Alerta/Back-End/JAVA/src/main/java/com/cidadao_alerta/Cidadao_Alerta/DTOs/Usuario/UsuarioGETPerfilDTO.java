package com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoVotoGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Voto;

import java.util.ArrayList;
import java.util.List;

public class UsuarioGETPerfilDTO {
    private String nome;
    private String classe;
    private String email;
    List<PontoGetDTO> listaPontos;

    public UsuarioGETPerfilDTO(Usuario user) {
        this.nome = user.getNome(); ;
        this.email = user.getEmail();
        this.classe = user.getClasse();
        this.listaPontos = listaPontos;

        List<PontoGetDTO> listaPonto = new ArrayList<>();
        for (Pontos i : user.getPontos()) {
            PontoGetDTO pontoGetDTOGet = new PontoGetDTO(i);
            listaPonto.add(pontoGetDTOGet);
        }
        this.listaPontos = listaPonto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getClasse() {
        return classe;
    }

    public void setClasse(String classe) {
        this.classe = classe;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<PontoGetDTO> getListaPontos() {
        return listaPontos;
    }

    public void setListaPontos(List<PontoGetDTO> listaPontos) {
        this.listaPontos = listaPontos;
    }
}
