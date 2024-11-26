import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface Aluno {
  nome: string
  telefone: string
  email: string
  endereco: string
  data_nascimento: string
  senha: string
  status: boolean
  personalID: string
}

class AlunoServises {
  async Cadastar_Aluno({ nome, telefone, email, endereco, data_nascimento, senha, status, personalID }: Aluno) {
    const senhaCrypt = await hash(senha, 8)
    const cadastrar = await prismaClient.aluno.create({
      data: {
        nome,
        telefone,
        email,
        endereco,
        data_nascimento,
        senha: senhaCrypt,
        status: status ? 1 : 0,
        personalID
      }
    })
    return cadastrar
  }

  async getAllAluno() {
    const ver = await prismaClient.aluno.findMany({
      include: {
        personal: true 
      }
    });
    return ver;
  }
}

export default AlunoServises