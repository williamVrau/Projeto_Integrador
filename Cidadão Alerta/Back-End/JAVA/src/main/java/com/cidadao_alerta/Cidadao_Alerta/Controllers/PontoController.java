package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontosPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping
public class PontoController {
    private static String caminhoImagens = "D:/repositorio GitHub/projeto_Integrador/cidadão Alerta/front-End/iMGs/";
    private final PontosRepositories pontosRepositories;
    private final UsuarioRepositories usuarioRepositories;

    public PontoController(PontosRepositories pontosRepositories, UsuarioRepositories usuarioRepositories) {
        this.pontosRepositories = pontosRepositories;
        this.usuarioRepositories = usuarioRepositories;
    }


    @PostMapping("/Ponto/criarponto")
    public Pontos criarPonto (@RequestBody PontosPostDTO pontos){
        Pontos novoPonto = new Pontos();
        novoPonto.setUsuario(this.usuarioRepositories.findByEmail(pontos.getCriador()).get());
        novoPonto.setName(pontos.getName());
        novoPonto.setDescription(pontos.getDescription());
        novoPonto.setLat(pontos.getLat());
        novoPonto.setLng(pontos.getLng());
        novoPonto.setTipoOcorencia(pontos.getTipoOcorencia());
        novoPonto.setSituacao(pontos.getSituacao());
        return this.pontosRepositories.save(novoPonto);
    }
    @GetMapping("/Pontos")
    public List<Pontos> listarPontos (){
        return this.pontosRepositories.findAll();
    }
}
