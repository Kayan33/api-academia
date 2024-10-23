import prismaClient from "../prisma";

interface Rotina {
  dia_semana: string
  descricao : string
  exercicio : string[]
}

class RotinaServices{
 async cadastar_Rotina ({dia_semana,descricao,exercicio}:Rotina){
  const cadastrar = await prismaClient.rotina.create({
    data:{
      dia_semana,
       descricao,
       exercicio:{
        connect: exercicio.map(id=>({id}))
       }
    },
    include:{
      exercicio:true
    }
  })
  return cadastrar
 }
}

export default RotinaServices