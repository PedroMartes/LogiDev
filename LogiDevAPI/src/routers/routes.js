// Importa o express
const express = require('express');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()


const authenticate = require('../middleware/authMiddleware');

// Criar um variavel para trabalhar com express
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/usuarios", userRouter);

router.use(authenticate); // Aplicando o middleware de autenticação a todas as rotas

// Produtos
const produtosRouter = require("./produtosRouter")
router.use("/produtos", produtosRouter)



// Categorias

const categoriasRouter = require("./categoriasRouter")
router.use("/categorias", categoriasRouter)

// Fornecedores
const fornecedoresRouter = require("./fornecedoresRouter")
router.use("/fornecedores", fornecedoresRouter)

const alertasRouter = require('./alertasRouter');
router.use('/alertas', alertasRouter);

// Histórico de Produtos
const historicoProdutosRouter = require("./historicoProdutosRouter")

router.use("/historico_produtos", historicoProdutosRouter)


// Histórico de Produtos
const historicoCategoriasRouter = require("./historicoCategoriasRouter")

router.use("/historico_categorias", historicoCategoriasRouter)


// Histórico de Produtos
const historicoFornecedoresRouter = require("./historicoFornecedoresRouter")

router.use("/historico_fornecedores", historicoFornecedoresRouter)


module.exports = router