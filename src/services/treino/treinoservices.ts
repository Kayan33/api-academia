import prismaClient from "../prisma";

interface Treino {
  nome_treino: string,
  repeticao: string,
  descanso: string,
  series:string,
  rotinas: string[]
}

class TreinoServices {
  async cadastrar_Treinos({ nome_treino, repeticao, descanso, series, rotinas }: Treino) {
    const cadastrar = await prismaClient.treino.create({
        data: {
            nome_treino,
            repeticao,
            descanso,
            series,
            rotinas: {
                connect: rotinas.map(id => ({ id })), 
            },
        },
        include: {
            rotinas: true 
        }
    });
    return cadastrar; 
}


  async getAllTreinos() {
    const ver = await prismaClient.treino.findMany({
      include: {
        rotinas: true, 
      },
    });
    return ver;
  }
}

export default TreinoServices;
