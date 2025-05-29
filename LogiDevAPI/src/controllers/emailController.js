import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Configuração do Nodemailer (direto no controller)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: "logidev2025@gmail.com",
    pass: "Logi-Dev2*25@",
  },
});

export const forgotPassword = async (req, res) => {
  try {
    const { user } = req; // Recebido do middleware
    const resetToken = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hora de validade

    // Atualiza usuário com token
    await prisma.Usuarios.update({
      where: { email: user.email },
      data: { resetToken, tokenExpiry },
    });

    const url = "http://localhost:5173/"
    const email = "logidev2025@gmail.com"
    // Envia e-mail
    const resetLink = `${url}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: `"Suporte" <${email}>`,
      to: user.email,
      subject: 'Redefina sua senha',
      html: `
        <h1>Recuperação de senha</h1>
        <p>Clique <a href="${resetLink}">aqui</a> para redefinir sua senha.</p>
        <p><small>Link válido por 1 hora.</small></p>
      `,
    });

    res.json({ message: 'E-mail de recuperação enviado!' });
  } catch (error) {
    console.error('Erro em forgotPassword:', error);
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
};

export const validateCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
      resetCode: code,
      codeExpiry: { gt: new Date() } // Código ainda válido
    }
  });

  if (!user) {
    return res.status(400).json({ error: 'Código inválido ou expirado' });
  }

  res.json({ success: true, message: 'Código válido!' });
};