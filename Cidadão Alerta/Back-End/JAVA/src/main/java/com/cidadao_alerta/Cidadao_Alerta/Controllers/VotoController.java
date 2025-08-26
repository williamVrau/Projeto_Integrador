package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Ponto.PontoVotoGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Voto.VotoPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Voto;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.VotosRepositories;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping
public class VotoController {
    final UsuarioRepositories usuarioRepositories;
    final PontosRepositories pontosRepositories;
    final VotosRepositories votosRepositories;

    public VotoController(UsuarioRepositories usuarioRepositories, PontosRepositories pontosRepositories, VotosRepositories votosRepositories) {
        this.usuarioRepositories = usuarioRepositories;
        this.pontosRepositories = pontosRepositories;
        this.votosRepositories = votosRepositories;
    }

    @PostMapping("/Voto/{pontoId}")
    public ResponseEntity<?> votarPonto(@RequestBody VotoPostDTO voto, @PathVariable Integer pontoId) {
        // Busca usuário pelo email
        Usuario usuario = this.usuarioRepositories.findByEmail(voto.getNomeUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Busca ponto
        Pontos ponto = this.pontosRepositories.findById(pontoId)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));

        // Lista de votos que o usuário já fez
        List<Voto> votosUsuario = usuario.getVotos();

        // Filtra os votos do usuário nesse ponto específico
        List<Voto> votosDoPonto = votosUsuario.stream()
                .filter(v -> v.getPontos().getId().equals(pontoId))
                .toList();

        // Se já existem votos, verificar datas
        if (!votosDoPonto.isEmpty()) {
            LocalDate hoje = LocalDate.now();

            // Verifica se existe algum voto com menos de 7 dias
            boolean temVotoRecente = votosDoPonto.stream()
                    .anyMatch(v -> ChronoUnit.DAYS.between(v.getDataCriacao(), hoje) < 7);

            if (temVotoRecente) {
                return ResponseEntity.badRequest().body("Usuário já votou neste ponto nos últimos 7 dias.");
            }
        }

        // Se passou nas validações, salva o voto
        Voto novoVoto = new Voto();
        novoVoto.setUsuario(usuario);
        novoVoto.setPontos(ponto);
        novoVoto.setDataCriacao(LocalDate.now());

        this.votosRepositories.save(novoVoto);

        return ResponseEntity.ok(new PontoVotoGetDTO(novoVoto));
    }
}
