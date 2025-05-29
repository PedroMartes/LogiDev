const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const produtosController = {

    create: async (req, res) => {
        try {

            const { nome, descricao, preco, quantidade, categoriaId, fornecedorId } = req.body

            const produtos = await prisma.produtos.create({
                data: { nome, descricao, preco: parseFloat(preco), quantidade, categoriaId, fornecedorId }
            })

            return res.status(201).json(produtos);

        } catch (error) {
            console.log("Erro ao criar produto:", error)
        }
    },

    getAll: async (req, res) => {
        try {
            const produtos = await prisma.produtos.findMany({
                include: {
                    categoria: {
                        select: { nome: true }
                    },
                    fornecedor: {
                        select: { nome: true }
                    },
                },

            })

            return res.json(produtos)

        } catch (error) {
            console.log("Erro ao buscar produtos:", error)
        }

    },

    getUnique: async (req, res) => {
        try {
            const { id } = req.params

            const produto = await prisma.produtos.findUnique({
                where: { id: Number(id) },
                include: {
                    categoria: {
                        select: { nome: true }
                    },
                    fornecedor: {
                        select: { nome: true }
                    },
                },

            })

            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" })
            }

            return res.status(200).json(produto)

        } catch (error) {
            console.log("Erro ao buscar produto:", error)
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { nome, descricao, preco, quantidade, categoriaId, fornecedorId } = req.body

            // Verifica se categoria e fornecedor existem
            const categoria = await prisma.categorias.findUnique({ where: { id: Number(categoriaId) } });
            const fornecedor = await prisma.fornecedores.findUnique({ where: { id: Number(fornecedorId) } });

            if (!categoria || !fornecedor) {
                return res.status(400).json({ error: "Categoria ou Fornecedor inválido." });
            }

            const produto = await prisma.produtos.update({
                where: { id: Number(id) },
                data: { nome, descricao, preco: parseFloat(preco), quantidade, categoriaId, fornecedorId }
            })

            return res.json(produto)

        } catch (error) {
            console.log("Erro ao atualizar produto:", error)
            res.status(500).json({ error: "Erro ao atualizar produto." });
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params

            await prisma.produtos.delete({
                where: { id: Number(id) }
            })

            return res.status(204).send()

        } catch (error) {
            console.log("Erro ao deletar produto:", error)
        }
    }

}

module.exports = produtosController