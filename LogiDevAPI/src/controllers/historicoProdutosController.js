const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const historicoProdutosController = {

    // Retorna todo o histórico de alterações de produtos
    getAll: async (req, res) => {
        try {
            const historico = await prisma.produtosHistorico.findMany({
                orderBy: { dataAlteracao: 'desc' }
                // Não precisa de include para campos do próprio model
            });

            return res.json(historico);

        } catch (error) {
            console.log("Erro ao buscar histórico de produtos:", error);
            res.status(500).json({ error: "Erro ao buscar histórico de produtos." });
        }
    },

    // Retorna o histórico de um produto específico
    getUnique: async (req, res) => {
        try {
            const { produtoId } = req.params;

            const historico = await prisma.produtosHistorico.findMany({
                where: { produtoId: Number(produtoId) },
                orderBy: { dataAlteracao: 'desc' }
            });

            if (!historico || historico.length === 0) {
                return res.status(404).json({ error: "Nenhum histórico encontrado para este produto." });
            }

            return res.json(historico);

        } catch (error) {
            console.log("Erro ao buscar histórico do produto:", error);
            res.status(500).json({ error: "Erro ao buscar histórico do produto." });
        }
    },

};

module.exports = historicoProdutosController;