import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'E-mail não cadastrado' });
  }

  req.user = user; // Passa o usuário adiante
  next();
};