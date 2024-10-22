import prismaClient from "../prisma";

interface Treino {
  nome_treino: string;
  descricao: string;
  descanso: string;
  series: string;
  repeticao: string;
  id_exercicio: string;
}

class TreinoServices {
  async cadastrar_personal({ nome_treino, descricao, descanso, series, repeticao,id_exercicio }: Treino) {
    const cadastrar = await prismaClient.treino.create({
      data: {
        nome_treino,
        descricao,
        descanso,
        series,
        repeticao,
        id_exercicio
      },
      include:{
        exercicio:true
      }
    })
    return cadastrar
  }

  async getAllTreino() {
    const ver = await prismaClient.treino.findMany({
      include: {
        exercicio: true, 
      }
    });
    return ver;
  }
  
}

export default TreinoServices
