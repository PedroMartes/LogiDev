
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs"); // Importando o bcrypt 

const jwt = require("jsonwebtoken"); // Importando o JWT

const userController = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios"
            });
        }

        const userEncontrado = await prisma.usuarios.findUnique({
            where: { email }    
        });

        
        if(!userEncontrado) {
            return res.status(403).json({
                masg: "email ou senha invalidos"
            });
        }

        const isCerto = await bcrypt.compare(senha, userEncontrado.senha);

        if(!isCerto) {
            return res.status(401).json({
                masg: "email ou senha invalidos"
            });
        }

        // payload -> Conteudo de dentro so JWT
        const payload = {
            id: userEncontrado.id,
            nome: userEncontrado.nome
        }

        //token vai sobreviver po 1h
        //palavra secreta -> Winghslompson o maior do Brasil E de Cuba -> base64 -> V2luZ2hzbG9tcHNvbiBvIG1haW9yIGRvIEJyYXNpbCBFIGRlIEN1YmE=
        const token = jwt.sign(payload, 'V2luZ2hzbG9tcHNvbiBvIG1haW9yIGRvIEJyYXNpbCBFIGRlIEN1YmE=' , {
            expiresIn: '1d' // Tempo de expiração do token
        })

        return res.status(200).json({
            token,
            id: userEncontrado.id,
            msg: "Usuario autenticado com sucesso" 
        })
    },
   create: async (req, res) => {
    try {
        const { nome, email, senha, cpfcnpj } = req.body;

        if (!nome || !email || !senha || !cpfcnpj) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios"
            })
        }

        // Senha criptografada
        const hashSenha = await bcrypt.hash(senha, 10)

        const userCriado = await prisma.usuarios.create({
            data: {
                nome, email, senha: hashSenha, cpfcnpj
            }
        })

        return res.status(201).json({
            msg: "Usuario criado com sucesso",
            id: userCriado.id
        })

    } catch (error) {
        if (error.code === 'P2002') {
            // Erro de campo único duplicado
            return res.status(400).json({
                msg: "Já existe um usuário com este e-mail ou CPF/CNPJ"
            });
        }
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error",
        })
    }
},

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const userDelete = await prisma.usuarios.delete({
                where: { id: Number(id) }
            })

            if (!id) {
                return res.status(400).json({
                    msg: "ID necessário",
                    userDelete
                })
            }

            return res.status(200).json({
                msg: "Usuario deletado com sucesso",
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: "Internal server error"
            })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;

            console.log(id)

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    msg: 'Usuario não encontrado'
                });
            }

            await prisma.usuarios.update({
                data: {
                    nome, email, senha
                }, where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({
                msg: 'Usuario atualizado com sucesso',
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal server error'
            })
        }
    },

     updateEmail: async (req, res) => {
        try {
            const { id } = req.params;
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    msg: 'Novo e-mail é obrigatório'
                });
            }

            const userAtualizado = await prisma.usuarios.update({
                where: { id: Number(id) },
                data: { email }
            });

            return res.status(200).json({
                msg: 'E-mail atualizado com sucesso',
                user: userAtualizado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal server error'
            });
        }
    },

    getUser: async (req, res) => {
        try {

            const usuariosAchados = await prisma.usuarios.findMany()

            return res.status(200).json({
                msg: "Usuarios encontrados com sucesso",
                usuariosAchados
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: "Internal server error"
            })
        }
    },

verificaEmail: async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ exists: false, msg: "E-mail não informado" });
        }
        const usuario = await prisma.usuarios.findUnique({ where: { email } });
        if (usuario) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
},

   redefinirSenha: async (req, res) => {
    const { email, novaSenha } = req.body;

    if (!email || !novaSenha) {
        return res.status(400).json({ msg: "E-mail e nova senha são obrigatórios." });
    }

    try {
        // Procura usuário pelo e-mail
        const usuario = await prisma.usuarios.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({ msg: "Usuário não encontrado." });
        }

        // Criptografa a nova senha
        const hashSenha = await bcrypt.hash(novaSenha, 10);

        // Atualiza a senha
        await prisma.usuarios.update({
            where: { id: usuario.id },
            data: {
                senha: hashSenha
            }
        });

        return res.status(200).json({ msg: "Senha redefinida com sucesso!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Erro ao redefinir senha." });
    }
}
}

module.exports = userController;