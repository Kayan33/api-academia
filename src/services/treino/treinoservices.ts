import prismaClient from "../prisma";

interface Treino {
  nome_treino: string,
  rotinasID: string[]
}

class TreinoServices {
  async cadastrar_Treinos({ nome_treino, rotinasID }: Treino) {
    const cadastrar = await prismaClient.treino.create({
      data: {
        nome_treino,
        rotinas: {
          connect: rotinasID.map(id => ({ id })),
        },
      },
      include: {
        rotinas: {
          include: {
            exercicio: true  
          }
        },
      },
    });
    return cadastrar;
  }

  async getAllTreinos() {
    const ver = await prismaClient.treino.findMany({
      include: {
        rotinas: {
          include: {
            exercicio: {
              include:{
                categoria:true
              }
            }  
          }
        },
      },
    });
    return ver;
  }
}

export default TreinoServices;
