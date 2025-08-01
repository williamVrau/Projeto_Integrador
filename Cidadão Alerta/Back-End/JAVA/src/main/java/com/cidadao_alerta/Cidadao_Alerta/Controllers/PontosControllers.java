package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Pontos")
public class PontosControllers {
    private final PontosRepositories pontosRepositories;
    private final UsuarioRepositories usuarioRepositories;

    public  PontosControllers (PontosRepositories pontosRepositories, UsuarioRepositories usuarioRepositories){
        this.pontosRepositories=pontosRepositories;
        this.usuarioRepositories=usuarioRepositories;
    }
    

}
