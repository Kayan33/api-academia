import prismaClient from "../prisma";

interface Rotina {
  repeticao: string
  descanso: string
  series: string
  exercicio: string[]
}

class RotinaServices {
  async cadastar_Rotina({ repeticao, descanso, series, exercicio }: Rotina) {
    const cadastrar = await prismaClient.rotina.create({
      data: {
        repeticao,
        descanso,
        series,
        exercicio: {
          connect: exercicio.map(id => ({ id }))
        }
      },
      include: {
        exercicio: true
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