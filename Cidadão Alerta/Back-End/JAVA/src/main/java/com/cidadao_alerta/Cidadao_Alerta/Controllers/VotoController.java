package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Voto.VotoPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Voto;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.VotosRepositories;
import org.springframework.data.repository.support.Repositories;
import org.springframework.web.bind.annotation.*;

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
    public Voto votarPonto(@RequestBody VotoPostDTO voto, @PathVariable Integer pontoId){
        Voto novoVoto = new Voto();
        novoVoto.setUsuario(this.usuarioRepositories.findByEmail(voto.getNomeUsuario()).get());
        novoVoto.setPontos(this.pontosRepositories.findById(pontoId).get());
        return this.votosRepositories.save(novoVoto);

    }
}
