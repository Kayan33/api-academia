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
    });

    if (!usuario) {
      throw new Error("Usuário ou senha inválidos");
    }

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRETO as string,
      {
        subject: usuario.id,
        expiresIn: "8h",
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }

  async loginPersonal({ email, senha }: Login) {
    const personal = await prismaClient.personal.findFirst({
      where: {
        email,
      },
    });

    if (!personal) {
        throw new Error("Usuário ou senha inválidos");
        
    }

    const senhaValida = await compare(senha, personal.senha);
    if (!senhaValida) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = sign(
        {
          id: personal.id,
          nome: personal.nome,
          email: personal.email,
        },
        process.env.JWT_SECRETO as string,
        {
          subject: personal.id,
          expiresIn: "8h",
        }
      );

      return {
        id: personal.id,
        nome: personal.nome,
        email: personal.email,
        token: token,
      };

  }

  async verificaTokenPersonal(id: string) {
    const resposta = await prismaClient.personal.findFirst({
      where: { id: id },
      select: { id: true, nome: true },
    });

    return resposta;
  }

  async verificaTokenAluno (id:string){
    const resposta = await prismaClient.aluno.findFirst({
        where:{
            id:id
        },
        select:{
            id:true, nome:true
        }
    })
    return resposta
  }


}

export { LoginServices };
