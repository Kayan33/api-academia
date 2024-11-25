import { compare } from "bcryptjs";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface login {
    email: string
    senha: string
}

class LoginServices {
    async loginAluno({ email, senha }: login) {
        const aluno = await prismaClient.aluno.findFirst({
            where: {
                email
            }
        })

      

        if (!aluno  ) {
            throw new Error("Usuario ou senha Invalido");
        }

        const senhaCrypt = await compare(senha, aluno.senha, )
        if (!senhaCrypt) {
            throw new Error("Usuario ou senha Invalido");

        }

        const token = sign({
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email
        },
            process.env.JWT_SECRETO as string,
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

    async verificaToken(id: string){

        const aluno = await prismaClient.aluno.findUnique({

            where:{

                id: id
            },

             select:{

                id: true
            }
        });

        if(!aluno){

            throw new Error('Usuário ou senha incorretos!')
        }

        return aluno;
    }
}

export { LoginServices }