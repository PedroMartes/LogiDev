// Importa o express
const express = require('express');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

// Criar um variavel para trabalhar com express
const router = express.Router();


// Produtos

const produtosRouter = require("./produtosRouter")

router.use("/produtos", produtosRouter)



// Categorias

const categoriasRouter = require("./categoriasRouter")

router.use("/categorias", categoriasRouter)

// Fornecedores

const fornecedoresRouter = require("./fornecedoresRouter")

router.use("/fornecedores", fornecedoresRouter)


const userRouter = require("./userRouter");

router.use("/usuarios", userRouter);

module.exports = router