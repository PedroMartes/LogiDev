-- CreateTable
CREATE TABLE `CategoriasHistorico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoriaId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dataAlteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FornecedoresHistorico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fornecedorId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dataAlteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
