import prismaClient from "../prisma";

interface Rotina {
  repeticao: string
  descanso: string
  series: string
  exercicioID: string[]
  personalID: string
}

class RotinaServices {
  async cadastar_Rotina({ repeticao, descanso, series, exercicioID,personalID }: Rotina) {
    const cadastrar = await prismaClient.rotina.create({
      data: {
        repeticao,
        descanso,
        series,
        exercicio: {
          connect: exercicioID.map(id => ({ id }))
        },
        personal: {
         connect:{ id:personalID}
        }
      },
      include: {
        exercicio: true,
        personal:true
      }
    })
    return cadastrar
  }

  async getAllRotina() {
    const ver = await prismaClient.rotina.findMany({
      include: {
        exercicio: { 
          include: {
            categoria: {
              include:{
                exercicios:true
              }
            } 
            
          },
        },
      },
    })
    return ver
  }
}

export default RotinaServices