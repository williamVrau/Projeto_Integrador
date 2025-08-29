package com.cidadao_alerta.Cidadao_Alerta.exceptions;

public class UsuarioNaoEncontradoException extends RuntimeException {
  public UsuarioNaoEncontradoException(String email) {
    super("Usuário com email " + email + " não encontrado.");
  }
}