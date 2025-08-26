package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoPutDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoPutDescDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontosPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
public class PontoController {
    private static String caminhoImagens = "D:/repositorio GitHub/projeto_Integrador/cidadão Alerta/front-End/iMGs/";
    private final PontosRepositories pontosRepositories;
    private final UsuarioRepositories usuarioRepositories;
    @Autowired
    private EmailService emailService;

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
        try {
            emailService.enviarEmail(
                    "cidadaoalerta.21@gmail.com",
                    "O Usuário " + pontos.getCriador() + " acabou de criar um ponto",
                    "O usuário " + pontos.getCriador() + " criou o ponto '" + pontos.getName() +
                            "' com a descrição: " + pontos.getDescription()
            );
        } catch (Exception e) {
            System.err.println("Falha ao enviar e-mail: " + e.getMessage());
        }
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