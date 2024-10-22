import prismaClient from "../prisma";

interface Rotina {
  repeticao: string
  descricao : string
  descanso: string
  series : string
  id_exercicio : string
}

class RotinaServices{
 async cadastar_Rotina ({repeticao, descricao,descanso,series,id_exercicio}:Rotina){
  const cadastrar = await prismaClient.rotina.create({
    data:{
      repeticao,
       descricao,
       descanso,
       series,
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