import prismaClient from "../prisma";

interface Treino {
  nome_treino: string;
  dia_semana: string;
  descricao: string;
  id_rotina: string;
}

class TreinoServices {
  async cadastrar_personal({ nome_treino, dia_semana, descricao,id_rotina }: Treino) {
    const cadastrar = await prismaClient.treino.create({
      data: {
        nome_treino,
        dia_semana,
        descricao,
        id_rotina
      },
      include:{
        rotina:true
      }
    })
    return cadastrar
  }

  async getAllTreino() {
    const ver = await prismaClient.treino.findMany({
      include: {
        rotina: true, 
        
      }
    });
    return ver;
  }
  
}

export default TreinoServices
