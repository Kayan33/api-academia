import prismaClient from "../prisma";

interface Rotina {
  dia_semana: string
  descricao : string
  id_exercicio : string
}

class RotinaServices{
 async cadastar_Rotina ({dia_semana,descricao,id_exercicio}:Rotina){
  const cadastrar = await prismaClient.rotina.create({
    data:{
      dia_semana,
       descricao,
       id_exercicio
    },
    include:{
      exercicio:true
    }
  })
  return cadastrar
 }
}

export default RotinaServices