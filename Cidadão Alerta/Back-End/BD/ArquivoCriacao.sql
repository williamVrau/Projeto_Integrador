-- Criação do schema
CREATE SCHEMA IF NOT EXISTS cidadao_alerta;
USE cidadao_alerta;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    classe VARCHAR(50) NOT NULL DEFAULT 'Usuario'
);

CREATE TABLE Pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    lat DOUBLE,
    lng DOUBLE,
    tipo_ocorrencia VARCHAR(100),
    data_criacao DATE,
    situacao VARCHAR(100),
    url_imagen longtext,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Voto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_criacao DATE,
    usuario_id INT,
    pontos_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (pontos_id) REFERENCES Pontos(id)
);
select * from voto;

UPDATE voto
SET data_criacao = '2025-08-12'
WHERE id = 1;