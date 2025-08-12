//package com.cidadao_alerta.Cidadao_Alerta.Controllers;

//import com.cidadao_alerta.Cidadao_Alerta.Entities.Pontos;
//import com.cidadao_alerta.Cidadao_Alerta.Repositories.PontosRepositories;
//import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//@RestController
//@RequestMapping
//public class PontoController {
//    private static String caminhoImagens = "D:/repositorio GitHub/projeto_Integrador/cidadão Alerta/front-End/iMGs/";
//    private final PontosRepositories pontosRepositories;
//    private final UsuarioRepositories usuarioRepositories;
//
//    public PontoController(PontosRepositories pontosRepositories, UsuarioRepositories usuarioRepositories) {
//        this.pontosRepositories = pontosRepositories;
//        this.usuarioRepositories = usuarioRepositories;
//    }
//
//
//    @PostMapping
//    public Pontos criarPonto (@RequestParam("file")MultipartFile file){
//        Pontos ponto1;
//        return ponto1 = new Pontos();
//
//    }
//}
