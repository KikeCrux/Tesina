-- Crear la base de datos
CREATE DATABASE PinatasDB;

-- Seleccionar la base de datos
USE PinatasDB;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre_cliente VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    tipo_usuario ENUM('mayoreo', 'menudeo') NOT NULL
);

-- Tabla de Ubicaciones (asociada a los usuarios)
CREATE TABLE Ubicaciones (
    id_ubicacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_ubicacion ENUM('personalizada', 'en_tienda') NOT NULL,
    direccion VARCHAR(255),  -- Solo se llena si es personalizada
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de ClientesMayoreo (solo aplica para usuarios de tipo "mayoreo")
CREATE TABLE ClientesMayoreo (
    id_cliente_mayoreo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_negocio VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de Productos (Piñatas)
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio_menudeo DECIMAL(10, 2) NOT NULL
);

-- Tabla de PreciosMayoreo (Precios personalizados para clientes de mayoreo)
CREATE TABLE PreciosMayoreo (
    id_precio_mayoreo INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,  -- Solo clientes de mayoreo
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,  -- Solo clientes de mayoreo pueden hacer pedidos
    total_cantidad_piñatas INT NOT NULL,
    total_por_cobrar DECIMAL(10, 2) NOT NULL,
    fecha_generacion DATETIME NOT NULL,
    fecha_esperada_entrega DATETIME,
    fecha_real_entrega DATETIME,
    estado_pedido ENUM('pendiente', 'entregado') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de DetallesPedidos (Detalles de cada pedido, como lista de piñatas)
CREATE TABLE DetallesPedidos (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- Tabla de Pagos (para los pedidos)
CREATE TABLE Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    monto_pagado DECIMAL(10, 2) NOT NULL,
    fecha_pago DATETIME NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,  -- Ejemplo: "Tarjeta", "Efectivo"
    estado_pago ENUM('pendiente', 'completado') NOT NULL,
    nota VARCHAR(255),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);

-- Tabla de Promociones (maneja descuentos por producto o cliente)
CREATE TABLE Promociones (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    nombre_promocion VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    descuento_porcentaje DECIMAL(5, 2),  -- Ejemplo: 10% descuento
    descuento_monto DECIMAL(10, 2),      -- Ejemplo: $50.00 descuento
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    id_producto INT,  -- Opcional (NULL si aplica a todos los productos)
    id_usuario INT,   -- Opcional (NULL si aplica a todos los usuarios)
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de Paquetes (solo para clientes de menudeo) con decoraciones
CREATE TABLE Paquetes (
    id_paquete INT AUTO_INCREMENT PRIMARY KEY,
    nombre_paquete VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio_paquete DECIMAL(10, 2) NOT NULL,
    decoracion VARCHAR(255),  -- Nuevo campo para las decoraciones especiales (ej: torres de globos)
    id_usuario INT,  -- Solo para clientes de menudeo
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de ComponentesPaquetes (define los componentes de un paquete de fiesta)
CREATE TABLE ComponentesPaquetes (
    id_componente INT AUTO_INCREMENT PRIMARY KEY,
    id_paquete INT NOT NULL,
    tipo_componente ENUM('piñata', 'palo', 'globos', 'centros_de_mesa', 'decoracion') NOT NULL,
    nombre_componente VARCHAR(255) NOT NULL,  -- Ej: Globos temáticos de Mario Bros, Torres de globos
    cantidad INT NOT NULL,
    FOREIGN KEY (id_paquete) REFERENCES Paquetes(id_paquete)
);
