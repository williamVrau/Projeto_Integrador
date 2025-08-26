package com.cidadao_alerta.Cidadao_Alerta.Controllers;

import com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario.UsuarioGETPerfilDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario.UsuarioGetDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario.UsuarioGetPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.DTOs.Usuario.UsuarioPostDTO;
import com.cidadao_alerta.Cidadao_Alerta.Entities.Usuario;
import com.cidadao_alerta.Cidadao_Alerta.Repositories.UsuarioRepositories;
import com.cidadao_alerta.Cidadao_Alerta.exceptions.UsuarioNaoEncontradoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
public class UsuarioController {
    private final UsuarioRepositories usuarioRepositories;
    public UsuarioController (UsuarioRepositories usuarioRepositories){
        this.usuarioRepositories=usuarioRepositories;
    }
    @GetMapping("/Usuarios")
    public List<UsuarioGetDTO> listarUsuario(){
        List<UsuarioGetDTO> lista = new ArrayList<>();
        for(Usuario i : this.usuarioRepositories.findAll()){
            lista.add(new UsuarioGetDTO(i));
        }
        return lista;
    }
    @GetMapping("/Usuario/{emailUsuario}")
    public ResponseEntity<UsuarioGETPerfilDTO> perfilUsuario(@PathVariable String emailUsuario) {
        return this.usuarioRepositories.findByEmail(emailUsuario)
                .map(usuario -> ResponseEntity.ok(new UsuarioGETPerfilDTO(usuario)))
                .orElseThrow(() -> new UsuarioNaoEncontradoException(emailUsuario));
    }
}