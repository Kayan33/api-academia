import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface Personal {
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  senha: string,
  aluno: string[]
}

interface AlterarPersonal {
  id: string
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  aluno: string[]
}


class PersonalServices {
  async cadastrar_personal({ nome, telefone, email, CREF, sexo, senha, aluno }: Personal) {

    const senhaCrypt = await hash(senha, 8)
    const cadastrar = await prismaClient.personal.create({
      data: {
        nome,
        telefone,
        email,
        CREF,
        sexo,
        senha: senhaCrypt,

        aluno: aluno.length > 0 ? { connect: aluno.map(id => ({ id })) } : undefined,
      },
      include: {
        aluno: true,
      },
    });
    return cadastrar;
  }

  async getAllPersonalTrainers() {
    const ver = await prismaClient.personal.findMany({
      include: {
        aluno: true
      }
    });
    return ver;
  }

  // ERRO AO BUSCAR COM findFirst PELO FRONT
  async consultarPersonalUnico(id: string) {
    const resposta = await prismaClient.personal.findMany({
      where: {
        id: id
      },
      include: {
        aluno: true
      }
    })
   

    return resposta
  }

  async alterarDadosPersonal({ id, nome, telefone, email, CREF, sexo, aluno }: AlterarPersonal) {
    await prismaClient.personal.update({
      where: {
        id: id
      },
      data: {
        nome: nome,
        telefone: telefone,
        email: email,
        CREF: CREF,
        sexo: sexo,
        aluno: aluno.length > 0 ? { connect: aluno.map(id => ({ id })) } : undefined,
      },
      include: {
        aluno: true
      }
    })
    return ({dados:'Cadastro Efetuado com Sucesso'})
  }
}

export { PersonalServices };
