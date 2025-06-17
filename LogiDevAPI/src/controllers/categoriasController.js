const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const categoriasController = {

    create: async (req, res) => {
        try {
            const { nome, descricao } = req.body;

            const categoria = await prisma.categorias.create({
                data: { nome, descricao }
            });

            // Salva no histórico
            await prisma.categoriasHistorico.create({
                data: {
                    categoriaId: categoria.id,
                    nome: categoria.nome,
                    descricao: categoria.descricao,
                    acao: "create"
                }
            });

            return res.status(201).json(categoria);

        } catch (error) {
            console.log("Erro ao criar categoria:", error)
        }
    },

    getAll: async (req, res) => {
        try {
            const categorias = await prisma.categorias.findMany()
            return res.json(categorias)
        } catch (error) {
            console.log("Erro ao buscar categorias:", error)
        }
    },

    getUnique: async (req, res) => {
        try {
            const { id } = req.params

            const categoria = await prisma.categorias.findUnique({
                where: { id: Number(id) }
            })

            if (!categoria) {
                return res.status(404).json({ error: "Categoria não encontrada" })
            }

            return res.status(200).json(categoria)
        } catch (error) {
            console.log("Erro ao buscar categoria:", error)
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { nome, descricao } = req.body

            // Busca a categoria atual antes de atualizar
            const categoriaAtual = await prisma.categorias.findUnique({ where: { id: Number(id) } });

            const categoria = await prisma.categorias.update({
                where: { id: Number(id) },
                data: { nome, descricao }
            });

            // Salva no histórico
            await prisma.categoriasHistorico.create({
                data: {
                    categoriaId: categoriaAtual.id,
                    nome: categoriaAtual.nome,
                    descricao: categoriaAtual.descricao,
                    acao: "update"
                }
            });

            return res.json(categoria)
        } catch (error) {
            console.log("Erro ao atualizar categoria:", error)
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params

            // Busca a categoria antes de deletar
            const categoria = await prisma.categorias.findUnique({ where: { id: Number(id) } });

            await prisma.categorias.delete({
                where: { id: Number(id) }
            });

            // Salva no histórico
            await prisma.categoriasHistorico.create({
                data: {
                    categoriaId: categoria.id,
                    nome: categoria.nome,
                    descricao: categoria.descricao,
                    acao: "delete"
                }
            });

            return res.status(204).send()
        } catch (error) {
            console.log("Erro ao deletar categoria:", error)
        }
    }
}

module.exports = categoriasController