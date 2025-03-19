-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Cliente_telefono_key`(`telefono`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pista` (
    `id_pista` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `tipo` ENUM('cubierta', 'exterior') NOT NULL,
    `precio_hora` DECIMAL(2, 2) NOT NULL,
    `estado` ENUM('disponible', 'ocupada') NOT NULL,

    UNIQUE INDEX `Pista_numero_key`(`numero`),
    PRIMARY KEY (`id_pista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado` (
    `id_empleado` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `cargo` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Empleado_telefono_key`(`telefono`),
    UNIQUE INDEX `Empleado_email_key`(`email`),
    PRIMARY KEY (`id_empleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
