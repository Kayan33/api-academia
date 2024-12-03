import { compare } from "bcryptjs";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface Login {
    email: string;
    senha: string;
}

class LoginServices {
    async loginUsuario({ email, senha }: Login) {
        
        const usuario = await prismaClient.aluno.findFirst({
            where: { email },
        }) || await prismaClient.personal.findFirst({
            where: { email },
        });

        
        if (!usuario) {
            throw new Error("Usuário ou senha inválidos");
        }

        
        const senhaValida = await compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Usuário ou senha inválidos");
        }

        
       
        const tipo = usuario.hasOwnProperty('CREF') ? 'personal' : 'aluno';
        
        const token = sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo
            },
            process.env.JWT_SECRETO as string,
            {
                subject: usuario.id,
                expiresIn: '8h',
            }
        );

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token: token,
            tipo
        };
    }

    async verificaToken(id: string) {
        const usuario = await prismaClient.aluno.findUnique({
            where: { id },
            select: { id: true },
        }) || await prismaClient.personal.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return usuario;
    }
}

export { LoginServices };
