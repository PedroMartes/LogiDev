const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const produtosController = {

    create: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoriaId, fornecedorId } = req.body

            const produto = await prisma.produtos.create({
                data: { nome, descricao, preco: parseFloat(preco), quantidade, categoriaId, fornecedorId }
            })

            // Salva no histórico
            await prisma.produtosHistorico.create({
                data: {
                    produtoId: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    categoriaId: produto.categoriaId,
                    fornecedorId: produto.fornecedorId,
                    acao: "create"
                }
            });

            return res.status(201).json(produto);

        } catch (error) {
            console.log("Erro ao criar produto:", error)
        }
    },

    getAll: async (req, res) => {
        try {
            const produtos = await prisma.produtos.findMany({
                include: {
                    categoria: {
                        select: { nome: true, id: true }
                    },
                    fornecedor: {
                        select: { nome: true, id: true }
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

            // Busca o produto atual antes de atualizar
            const produtoAtual = await prisma.produtos.findUnique({ where: { id: Number(id) } });

            // Salva no histórico
            await prisma.produtosHistorico.create({
                data: {
                    produtoId: produtoAtual.id,
                    nome: produtoAtual.nome,
                    descricao: produtoAtual.descricao,
                    preco: produtoAtual.preco,
                    quantidade: produtoAtual.quantidade,
                    categoriaId: produtoAtual.categoriaId,
                    fornecedorId: produtoAtual.fornecedorId,
                    acao: "update"
                }
            });

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

            // Busca o produto antes de deletar
            const produto = await prisma.produtos.findUnique({ where: { id: Number(id) } });

            await prisma.produtos.delete({
                where: { id: Number(id) }
            })

            // Salva no histórico
            await prisma.produtosHistorico.create({
                data: {
                    produtoId: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    categoriaId: produto.categoriaId,
                    fornecedorId: produto.fornecedorId,
                    acao: "delete"
                }
            });

            return res.status(204).send()

        } catch (error) {
            console.log("Erro ao deletar produto:", error)
        }
    }

}

module.exports = produtosController