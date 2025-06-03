const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const fornecedoresController = {

    create: async (req, res) => {
        try {
            const { nome, contato, telefone, email } = req.body;

            const fornecedor = await prisma.fornecedores.create({
                data: { nome, contato, telefone, email }
            });

            // Salva no histórico
            await prisma.fornecedoresHistorico.create({
                data: {
                    fornecedorId: fornecedor.id,
                    nome: fornecedor.nome,
                    contato: fornecedor.contato,
                    telefone: fornecedor.telefone,
                    email: fornecedor.email,
                    acao: "create"
                }
            });

            return res.status(201).json(fornecedor);
        } catch (error) {
            console.log("Erro ao criar fornecedor:", error)
        }
    },

    getAll: async (req, res) => {
        try {
            const fornecedores = await prisma.fornecedores.findMany()
            return res.json(fornecedores)
        } catch (error) {
            console.log("Erro ao buscar fornecedores:", error)
        }
    },

    getUnique: async (req, res) => {
        try {
            const { id } = req.params

            const fornecedor = await prisma.fornecedores.findUnique({
                where: { id: Number(id) }
            })

            if (!fornecedor) {
                return res.status(404).json({ error: "Fornecedor não encontrado" })
            }

            return res.status(200).json(fornecedor)
        } catch (error) {
            console.log("Erro ao buscar fornecedor:", error)
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { nome, contato, telefone, email } = req.body

            // Busca o fornecedor atual antes de atualizar
            const fornecedorAtual = await prisma.fornecedores.findUnique({ where: { id: Number(id) } });

            const fornecedor = await prisma.fornecedores.update({
                where: { id: Number(id) },
                data: { nome, contato, telefone, email }
            });

            // Salva no histórico
            await prisma.fornecedoresHistorico.create({
                data: {
                    fornecedorId: fornecedorAtual.id,
                    nome: fornecedorAtual.nome,
                    contato: fornecedorAtual.contato,
                    telefone: fornecedorAtual.telefone,
                    email: fornecedorAtual.email,
                    acao: "update"
                }
            });

            return res.json(fornecedor)
        } catch (error) {
            console.log("Erro ao atualizar fornecedor:", error)
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params

            // Busca o fornecedor antes de deletar
            const fornecedor = await prisma.fornecedores.findUnique({ where: { id: Number(id) } });

            await prisma.fornecedores.delete({
                where: { id: Number(id) }
            });

            // Salva no histórico
            await prisma.FornecedoresHistorico.create({
                data: {
                    fornecedorId: fornecedor.id,
                    nome: fornecedor.nome,
                    contato: fornecedor.contato,
                    telefone: fornecedor.telefone,
                    email: fornecedor.email,
                    acao: "delete"
                }
            });

            return res.status(204).send()
        } catch (error) {
            console.log("Erro ao deletar fornecedor:", error)
        }
    }
}

module.exports = fornecedoresController