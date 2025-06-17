const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const historicoFornecedoresController = {

    // Retorna todo o histórico de alterações de fornecedores
    getAll: async (req, res) => {
        try {
            const historico = await prisma.fornecedoresHistorico.findMany({
                orderBy: { dataAlteracao: 'desc' }
            });
            return res.json(historico);
        } catch (error) {
            console.log("Erro ao buscar histórico de fornecedores:", error);
            res.status(500).json({ error: "Erro ao buscar histórico de fornecedores." });
        }
    },

    // Retorna o histórico de um fornecedor específico
    getByFornecedorId: async (req, res) => {
        try {
            const { fornecedorId } = req.params;
            const historico = await prisma.fornecedoresHistorico.findMany({
                where: { fornecedorId: Number(fornecedorId) },
                orderBy: { dataAlteracao: 'desc' }
            });

            if (!historico || historico.length === 0) {
                return res.status(404).json({ error: "Nenhum histórico encontrado para este fornecedor." });
            }

            return res.json(historico);

        } catch (error) {
            console.log("Erro ao buscar histórico do fornecedor:", error);
            res.status(500).json({ error: "Erro ao buscar histórico do fornecedor." });
        }
    },

};

module.exports = historicoFornecedoresController;