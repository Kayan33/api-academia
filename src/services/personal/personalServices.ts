import prismaClient from "../prisma";

interface Personal {
  nome:string,
  telefone:string,
  email:string,
  CREF:string,
  sexo:string,
  senha:string
}
class PersonalServices{
async cadastrar_personal({nome,telefone,email,CREF,sexo,senha}:Personal){
  const cadastrar = await prismaClient.personal.create({
    data:{
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
}

export {PersonalServices}

