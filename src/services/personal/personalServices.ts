import prismaClient from "../prisma";

interface Personal {
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  senha: string
}
class PersonalServices {

  async cadastrar_personal({ nome, telefone, email, CREF, sexo, senha }: Personal) {
    const cadastrar = await prismaClient.personal.create({
      data: {
        nome,
        telefone,
        email,
        CREF,
        sexo,
        senha
      }
    })
    return cadastrar
  }

  async getAllPersonalTrainers() {
    const ver = await prismaClient.personal.findMany({
      select: {
        id: true,
        nome:true,
        telefone:true,
        email:true,
        CREF:true,
        sexo:true,
        senha:true,
      }
    })
    return ver
  }
}

export { PersonalServices }

