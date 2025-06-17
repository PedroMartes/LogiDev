-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `codeExpiry` DATETIME(3) NULL,
    ADD COLUMN `resetCode` VARCHAR(191) NULL;
