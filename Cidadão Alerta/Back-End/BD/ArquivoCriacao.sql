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
    tipo_ocorencia VARCHAR(100),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    situacao VARCHAR(100),
    url_imagen VARCHAR(500),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Voto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    pontos_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (pontos_id) REFERENCES Pontos(id)
);


set sql_safe_updates = 0;
DELETE FROM usuario
WHERE nome = 'aria';
DELETE FROM usuario;

select * From pontos;