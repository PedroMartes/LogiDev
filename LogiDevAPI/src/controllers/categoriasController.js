const { PrismaClient } = require("@prisma/client");
const { getAll, getUnique } = require("./produtosController");
const prisma = new PrismaClient()

const categoriasController = {

    create: async (req, res) => {
        try {

            // Pega as informações do corpo da requisição
            const { nome, descricao } = req.body;

            // Salvando a categoria 
            const categoria = await prisma.categorias.create({
                data: { nome, descricao }
            })

            // Status 201 = created
            return res.status(201).json(categoria);

        } catch (error) {
            console.log("Erro ao criar categoria:", error)
        }
    },

    getAll: async (req, res) => {
        try {
            //Buscar as categorias no db
            const categorias = await prisma.categorias.findMany()
            return res.json(categorias)

        } catch (error) {
            console.log("Erro ao buscar categorias:", error)
        }

    },

    getUnique: async (req, res) => {
        try {

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

        } catch (error) {
            console.log("Erro ao buscar categoria:", error)
        }
    },

    update: async (req, res) => {
        try {

            const { id } = req.params
            const { nome, descricao } = req.body
        
            const categoria = await prisma.categorias.update({
                where: { id: Number(id) },
                data: { nome, descricao }
            })
        
            return res.json(categoria)
        } catch (error) {
            console.log("Erro ao atualizar categoria:", error)
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params

            await prisma.categorias.delete({
                where: { id: Number(id) }
            })
        
            return res.status(204).send()
        } catch (error) {
            console.log("Erro ao deletar categoria:", error)
        }
    }
}

module.exports = categoriasController