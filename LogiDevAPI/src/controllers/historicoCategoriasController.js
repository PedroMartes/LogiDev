const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const historicoCategoriasController = {

    // Retorna todo o histórico de alterações de categorias
    getAll: async (req, res) => {
        try {
            const historico = await prisma.categoriasHistorico.findMany({
                orderBy: { dataAlteracao: 'desc' }
            });
            return res.json(historico);
        } catch (error) {
            console.log("Erro ao buscar histórico de categorias:", error);
            res.status(500).json({ error: "Erro ao buscar histórico de categorias." });
        }
    },

    // Retorna o histórico de uma categoria específica
    getUnique: async (req, res) => {
        try {
            const { categoriaId } = req.params;
            const historico = await prisma.categoriasHistorico.findMany({
                where: { categoriaId: Number(categoriaId) },
                orderBy: { dataAlteracao: 'desc' }
            });

            if (!historico || historico.length === 0) {
                return res.status(404).json({ error: "Nenhum histórico encontrado para esta categoria." });
            }

            return res.json(historico);

        } catch (error) {
            console.log("Erro ao buscar histórico da categoria:", error);
            res.status(500).json({ error: "Erro ao buscar histórico da categoria." });
        }
    },

};

module.exports = historicoCategoriasController;