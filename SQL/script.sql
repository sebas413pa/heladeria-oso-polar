CREATE DATABASE IF NOT EXISTS TiendaHelados;
USE TiendaHelados;

CREATE TABLE sabores (
    id_sabor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    id_sabor INT,
    FOREIGN KEY (id_sabor) REFERENCES sabores(id_sabor),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(50),
    nit VARCHAR(50),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(6,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE detalleventa (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT NOT NULL,
    subtotal DECIMAL(6,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO sabores (nombre, descripcion) VALUES
('Vainilla', 'Clásico sabor a vainilla'),
('Chocolate', 'Sabor intenso a chocolate'),
('Fresa', 'Helado de fresa natural');

INSERT INTO productos (nombre, precio, id_sabor) VALUES
('Helado de Vainilla', 15.00, 1),
('Helado de Chocolate', 17.00, 2),
('Helado de Fresa', 16.00, 3);

INSERT INTO clientes (nombre, telefono, correo) VALUES
('Ana López', '555-1234', 'ana@example.com'),
('Carlos Pérez', '555-5678', 'carlos@example.com');