import prismaClient from "../prisma";

interface Exercicios {
  nome_exercicio: string;
  URL_video: string;
  categoriaID : string
}

class ExercicioServices {
  async cadastrar_exercicios({ nome_exercicio, URL_video,categoriaID }: Exercicios) {
    const cadastrar = await prismaClient.exercicio.create({
      data: {
        nome_exercicio,
        URL_video,
        categoriaID
    
      },
      include:{
        categoria:true
      }
    })
    return cadastrar
  }

  async getAllExercicios() {
    const ver = await prismaClient.exercicio.findMany({
      select: {
        nome_exercicio: true,
        URL_video: true,
        categoria: {
          select: {
            categoria: true, 
          },
        },
      },
    });
    return ver;
  }
  
}

export default ExercicioServices
