import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface Aluno {
  nome: string
  telefone: string
  email: string
  endereco: string
  data_nascimento: string
  senha: string
  personalID: string
}

interface AlterarUsuarios {
  id: string
  nome: string
  telefone: string
  email: string
  endereco: string
  data_nascimento: string
  personalID: string
}
class AlunoServises {
  async Cadastar_Aluno({ nome, telefone, email, endereco, data_nascimento, senha, personalID }: Aluno) {
    const senhaCrypt = await hash(senha, 8)
    await prismaClient.aluno.create({
      data: {
        nome: nome,
        telefone: telefone,
        email: email,
        endereco: endereco,
        data_nascimento: data_nascimento,
        senha: senhaCrypt,
        personalID: personalID


      }
    })
    return ({ dados: 'Cadastro Efetuado com Sucesso' })
  }

  async getAllAluno() {
    const ver = await prismaClient.aluno.findMany({
      include: {
        personal: true
      }
    });
    return ver;
  }

  async consultarAlunoUnico(id: string) {
    const resposta = await prismaClient.aluno.findFirst({
      where: {
        id: id
      },
      select: {
        nome: true,
        email: true,
        senha: true
      }
    })
    return resposta

  }

  async alterarDadosAluno({ id, nome, telefone, email, endereco, data_nascimento, personalID }: AlterarUsuarios) {
    await prismaClient.aluno.update({
      where: {
        id: id
      },
      data: {
        nome: nome,
        telefone: telefone,
        email: email,
        endereco: endereco,
        data_nascimento: data_nascimento,
        personalID: personalID
      }
    })
    return ({ data: "Alterado com Sucesso" })
  }

  async apagarAlunos(id: string) {
    await prismaClient.aluno.delete({
      where: {
        id: id
      }
    })
    return ({ dados: "Registro Apagado com sucesso" })
  }

}

export default AlunoServises