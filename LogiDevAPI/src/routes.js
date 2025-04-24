// Importa o express
const express = require('express');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

// Criar um variavel para trabalhar com express
const router = express.Router();


router.post('/categorias', async (req, res) => {
    // Pega as informações do corpo da requisição
    const { nome, descricao } = req.body;

    // Salvando a categoria 
    const categoria = await prisma.categorias.create({
        data: { nome, descricao }
    })

    // Status 201 = created
    return res.status(201).json(categoria);
})

// Rota get
router.get('/categorias/:id', async (req, res) => {
    // Pegando o id da categoria
    const { id } = req.params

    const categorias = await prisma.categorias.findUnique({
        where: { id: Number(id) }
    })

    if (!categorias) {
        // Status 404 = não encontrado (not found)
        return res.status(404).json({ error: "Categoria não encontrada" })
    }

    return res.status(200).json(categorias)
});

router.get("/categorias", async (req, res) => {
    //Buscar as categorias no db
    const categorias = await prisma.categorias.findMany()

    return res.json(categorias)
});

router.put("/categorias/:id", async (req, res) => {
    const { id } = req.params
    const { nome, descricao } = req.body

    const categoria = await prisma.categorias.update({
        where: { id: Number(id) },
        data: { nome, descricao }
    })

    return res.json(categoria)
});

// Deletar produto
router.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params

    await prisma.categorias.delete({
        where: { id: Number(id) }
    })

    return res.status(204).send()
})




//-------------------------------------------------------




// Criar produto
router.post('/produtos', async (req, res) => {

    const { nome, descricao, preco, quantidade, categoriaId, fornecedorId } = req.body

    const produtos = await prisma.produtos.create({
        data: { nome, descricao, preco: parseFloat(preco), quantidade, categoriaId, fornecedorId }
    })

    return res.status(201).json(produtos);
})

// Buscar produto por id
router.get('/produtos/:id', async (req, res) => {

    const { id } = req.params

    const produto = await prisma.produtos.findUnique({
        where: { id: Number(id) }
    })

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" })
    }

    return res.status(200).json(produto)
})

// Listar todos os produtos
router.get('/produtos', async (req, res) => {
    const produtos = await prisma.produtos.findMany({
        include: {
            categoria: true, 
            fornecedor: true, 
        },

    })

    return res.json(produtos)
})

// Atualizar produto
router.put('/produtos/:id', async (req, res) => {
    const { id } = req.params
    const { nome, descricao, preco, quantidade, categoriaId } = req.body

    const produto = await prisma.produtos.update({
        where: { id: Number(id) },
        data: { nome, descricao, preco: parseFloat(preco), quantidade, categoriaId }
    })

    return res.json(produto)
})

// Deletar produto
router.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params

    await prisma.produtos.delete({
        where: { id: Number(id) }
    })

    return res.status(204).send()
})




//--------------------------------------------------------




// Criar fornecedores
router.post('/fornecedores', async (req, res) => {
    const { nome, contato, telefone, email } = req.body;

    const fornecedores = await prisma.fornecedores.create({
        data: { nome, contato, telefone, email }
    })

    // Status 201 = created 
    return res.status(201).json(fornecedores);
})


// Buscar fornecedor por id
router.get('/fornecedores/:id', async (req, res) => {

    const { id } = req.params

    const fornecedor = await prisma.fornecedores.findUnique({
        where: { id: Number(id) }
    })

    if (!fornecedor) {
        return res.status(404).json({ error: "Fornecedor não encontrado" })
    }

    return res.status(200).json(fornecedor)
});

// Buscando todos os fornecedores
router.get("/fornecedores", async (req, res) => {
    const fornecedores = await prisma.fornecedores.findMany()

    return res.json(fornecedores)
});

// Atualizar fornecedor
router.put('/fornecedores/:id', async (req, res) => {
    const { id } = req.params
    const { nome, contato, telefone, email } = req.body

    const fornecedor = await prisma.fornecedores.update({
        where: { id: Number(id) },
        data: { nome, contato, telefone, email }
    })

    return res.json(fornecedor)
});

// Deletar produto
router.delete('/fornecedores/:id', async (req, res) => {
    const { id } = req.params

    await prisma.fornecedores.delete({
        where: { id: Number(id) }
    })

    return res.status(204).send()
})




module.exports = router