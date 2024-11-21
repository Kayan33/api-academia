import { compare } from "bcryptjs";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface login {
    email: string
    senha: string
}

class LoginServices {
    async loginUsuarios({ email, senha }: login) {
        const aluno = await prismaClient.aluno.findFirst({
            where: {
                email
            }
        })
        if (!aluno) {
            throw new Error("Usuario ou senha Invalido");
        }

        const senhaCrypt = await compare(senha, aluno.senha)
        if (!senhaCrypt) {
            throw new Error("Usuario ou senha Invalido");

        }

        const token = sign({
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email
        },
            process.env.JWT_SECRETO,
            {
                subject: aluno.id,
                expiresIn: '8h'
            })
        return {
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            token: token
        }
    }
}

export { LoginServices }