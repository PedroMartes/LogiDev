const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const alertasController = {
    // Cria um novo alerta
    create: async (req, res) => {
        try {
            // Conta quantos alertas existem
            const count = await prisma.alertas.count();
            if (count >= 4) {
                // Busca o alerta mais antigo
                const alertaAntigo = await prisma.alertas.findFirst({
                    orderBy: { id: 'asc' }
                });
                if (alertaAntigo) {
                    await prisma.alertas.delete({ where: { id: alertaAntigo.id } });
                }
            }

            const { titulo, descricao, consequencia, acao, checked } = req.body;
            const alerta = await prisma.alertas.create({
                data: { titulo, descricao, consequencia, acao, checked: checked ?? false }
            });
            return res.status(201).json(alerta);
        } catch (error) {
            console.log("Erro ao criar alerta:", error);
            res.status(500).json({ error: "Erro ao criar alerta." });
        }
    },

    // Retorna todos os alertas
    getAll: async (req, res) => {
        try {
            const alertas = await prisma.alertas.findMany();
            return res.json(alertas);
        } catch (error) {
            console.log("Erro ao buscar alertas:", error);
            res.status(500).json({ error: "Erro ao buscar alertas." });
        }
    },

    // Retorna um alerta específico
    getUnique: async (req, res) => {
        try {
            const { id } = req.params;
            const alerta = await prisma.alertas.findUnique({ where: { id: Number(id) } });
            if (!alerta) {
                return res.status(404).json({ error: "Alerta não encontrado." });
            }
            return res.json(alerta);
        } catch (error) {
            console.log("Erro ao buscar alerta:", error);
            res.status(500).json({ error: "Erro ao buscar alerta." });
        }
    },

    // Atualiza um alerta
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, descricao, consequencia, acao, checked } = req.body;
            const alerta = await prisma.alertas.update({
                where: { id: Number(id) },
                data: { titulo, descricao, consequencia, acao, checked }
            });
            return res.json(alerta);
        } catch (error) {
            console.log("Erro ao atualizar alerta:", error);
            res.status(500).json({ error: "Erro ao atualizar alerta." });
        }
    },

    // Deleta um alerta
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.alertas.delete({ where: { id: Number(id) } });
            return res.status(204).send();
        } catch (error) {
            console.log("Erro ao deletar alerta:", error);
            res.status(500).json({ error: "Erro ao deletar alerta." });
        }
    }
};

module.exports = alertasController;