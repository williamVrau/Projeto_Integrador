package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Usuarios")
public class UsuarioControllers {
    private final UsuarioRepositories usuarioRepositories;
    public UsuarioControllers (UsuarioRepositories usuarioRepositories){
        this.usuarioRepositories=usuarioRepositories;
    }
    @GetMapping
    public List<Usuario> listarUsuario(){
        return this.usuarioRepositories.findAll();
    }
    @PostMapping
    public Usuario criarUsuario (@RequestBody Usuario usuario){
        this.usuarioRepositories.save(usuario);
        return usuario;
    }
}
