import prismaClient from "../prisma";

interface Exercicios {
  nome_exercicio: string;
  URL_video: string;
  categoriaID: string;
}

interface ExerciciosAltera {
  nome_exercicio: string;
  URL_video: string;
  categoriaID: string;
  id: string;
}

class ExercicioServices {
  async cadastrar_exercicios({ nome_exercicio, URL_video, categoriaID }: Exercicios) {
    try {
      const cadastrar = await prismaClient.exercicio.create({
        data: {
          nome_exercicio,
          URL_video,
          categoriaID,
        },
        include: {
          categoria: true,
        },
      });
      return cadastrar;
    } catch (error) {
      console.error("Erro ao cadastrar exercício:", error);
      throw new Error("Erro ao cadastrar exercício.");
    }
  }

  async getAllExercicios() {
    try {
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
    } catch (error) {
      console.error("Erro ao listar exercícios:", error);
      throw new Error("Erro ao listar exercícios.");
    }
  }

  // Alterado para usar findFirst em vez de findMany
  async consultarExercicios(id: string) {
    try {
      const resposta = await prismaClient.exercicio.findFirst({
        include:{
          categoria:{
            
          }
        },
      });
      if (!resposta) {
        throw new Error("Exercício não encontrado.");
      }
      return resposta;
    } catch (error) {
      console.error("Erro ao consultar exercício:", error);
      throw new Error("Erro ao consultar exercício.");
    }
  }

  async alterarDadosExercicios({ nome_exercicio, URL_video, categoriaID, id }: ExerciciosAltera) {
    try {
      await prismaClient.exercicio.update({
        where: {
          id: id,
        },
        data: {
          nome_exercicio,
          URL_video,
          categoriaID,
        },
      });
      return { dados: 'Alteração efetuada com sucesso' };
    } catch (error) {
      console.error("Erro ao alterar dados do exercício:", error);
      throw new Error("Erro ao alterar dados do exercício.");
    }
  }

  async apagarExercicios(id: string) {
    try {
      await prismaClient.exercicio.delete({
        where: {
          id: id,
        },
      });
      return { dados: "Exercício apagado com sucesso" };
    } catch (error) {
      console.error("Erro ao apagar exercício:", error);
      throw new Error("Erro ao apagar exercício.");
    }
  }
}

export default ExercicioServices;
