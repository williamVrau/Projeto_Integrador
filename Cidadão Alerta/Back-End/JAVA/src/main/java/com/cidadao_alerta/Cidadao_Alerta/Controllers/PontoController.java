package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoPutDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoPutDescDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontosPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    public PontoGetDTO criarPonto(@RequestBody PontosPostDTO pontos) {
        Pontos novoPonto = new Pontos();
        novoPonto.setUsuario(this.usuarioRepositories.findByEmail(pontos.getCriador()).get());
        novoPonto.setName(pontos.getName());
        novoPonto.setDescription(pontos.getDescription());
        novoPonto.setLat(pontos.getLat());
        novoPonto.setLng(pontos.getLng());
        novoPonto.setTipoOcorrencia(pontos.getTipoOcorrencia());
        novoPonto.setUrlImagen(pontos.getUrlImagen() != null ? pontos.getUrlImagen() : ""); // Salva Base64 ou string vazia
        System.out.println("Ponto criado: " + novoPonto);
        this.pontosRepositories.save(novoPonto);
        return new PontoGetDTO(novoPonto);
    }

    @GetMapping("/Pontos")
    public List<PontoGetDTO> listarPontosDTO() {
        List<Pontos> pontos = pontosRepositories.findAll();
        List<PontoGetDTO> pontosDTO = new ArrayList<>();

        for (Pontos ponto : pontos) {
            pontosDTO.add(new PontoGetDTO(ponto));
        }
        return pontosDTO;
    }

    @PutMapping("/Ponto/Alterar/{idPonto}")
    public PontoGetDTO alterarPonto(@PathVariable Integer idPonto, @RequestBody PontoPutDTO situacao) {
        Pontos ponto = this.pontosRepositories.findById(idPonto).get();
        ponto.setSituacao(situacao.getSituacao());
        this.pontosRepositories.save(ponto);
        return new PontoGetDTO(ponto);
    }

    @PutMapping("/Ponto/AlterarDesc/{idPonto}")
    public PontoGetDTO alterarDescPonto(@PathVariable Integer idPonto, @RequestBody PontoPutDescDTO situacao) {
        Pontos ponto = this.pontosRepositories.findById(idPonto).get();
        ponto.setDescription(situacao.getDescription());
        this.pontosRepositories.save(ponto);
        return new PontoGetDTO(ponto);
    }
}