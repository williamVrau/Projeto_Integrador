package Grupo.Cidadao.Alerta.Cidadao.Alerta.Controllers;

import Grupo.Cidadao.Alerta.Cidadao.Alerta.Entities.Conta;
import Grupo.Cidadao.Alerta.Cidadao.Alerta.Entities.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping("/Contas")
public class ContaController {
    private ArrayList<Conta> lista;

    public ContaController() {
        ArrayList<Conta> list = new ArrayList<Conta>();
        Conta teste = new Usuario(1, "jose", "Jose@gmail.com", "1234");
        list.add(teste);
        this.lista = list;
    }

    @GetMapping
    public ArrayList<Conta> listarContas() {
        return this.lista;
    }

    @GetMapping("/{idConta}")
    public Conta buscarConta(@PathVariable Integer idClientes) {
        for (Conta conta : lista) {
            if (Objects.equals(conta.getId(), idClientes)) {
                return conta;
            }
        }
        return null;
    }
}
