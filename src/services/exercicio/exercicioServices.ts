import prismaClient from "../prisma";

interface Exercicios {
  nome_exercicio: string;
  descricao: string;
  URL_video: string;
}

class ExercicioServices {
  async cadastrar_exercicios({ nome_exercicio, descricao, URL_video }: Exercicios) {
    const cadastrar = await prismaClient.exercicio.create({
      data: {
        nome_exercicio,
        descricao,
        URL_video,
    
      }
    })
    return cadastrar
  }
}

export default ExercicioServices
