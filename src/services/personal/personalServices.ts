import prismaClient from "../prisma";

interface Personal {
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  senha: string
  aluno: string[]
}
class PersonalServices {

  async cadastrar_personal({ nome, telefone, email, CREF, sexo, senha,aluno }: Personal) {
    const cadastrar = await prismaClient.personal.create({
      data: {
        nome,
        telefone,
        email,
        CREF,
        sexo,
        senha,
        aluno:{
          connect:aluno.map(id=>({id}))
        }
      },include:{
        aluno:true
      }
    })
    return cadastrar
  }

  async getAllPersonalTrainers() {
    const ver = await prismaClient.personal.findMany({
      include:{
        aluno:true
      }
    })
    return ver
  }
}

export { PersonalServices }

