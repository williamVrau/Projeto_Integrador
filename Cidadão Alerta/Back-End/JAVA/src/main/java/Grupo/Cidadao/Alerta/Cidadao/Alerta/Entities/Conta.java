package Grupo.Cidadao.Alerta.Cidadao.Alerta.Entities;

public abstract class Conta {
    protected Integer id;
    protected String nome;
    protected String email;
    protected String senha;

    public Conta(Integer id, String nome, String email, String senha){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public Integer getId() {
        return id;
    }
}
