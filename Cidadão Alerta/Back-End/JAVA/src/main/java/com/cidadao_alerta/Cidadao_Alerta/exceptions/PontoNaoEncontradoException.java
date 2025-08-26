package com.cidadao_alerta.Cidadao_Alerta.exceptions;

public class PontoNaoEncontradoException extends RuntimeException {
    public PontoNaoEncontradoException(Integer id) {
        super("Ponto com ID " + id + " não encontrado.");
    }
}