import prismaClient from "../prisma";

interface Treino {
  nome_treino: string,
  AlunoExercicio?: string[]
  personalID: string
  alunoID: string[]
}

class TreinoServices {
  async cadastrar_Treinos({ nome_treino, AlunoExercicio, personalID, alunoID }: Treino) {
    try {
      const cadastrar = await prismaClient.treino.create({
        data: {
          nome_treino,
          AlunoExercicio: {
            connect: AlunoExercicio ? AlunoExercicio.map((id) => ({ id })) : [],
          },
          personal: {
            connect: { id: personalID },
          },
          aluno: {
            connect: alunoID.map((id) => ({ id })),
          },
        },
        include: {
          AlunoExercicio: {
            include: {
              exercicio: true,
            },
          },
        },
      });
  
      return cadastrar; // Retorna os dados cadastrados se bem-sucedido
    } catch (error) {
      console.error("Erro ao cadastrar treino:", error); // Log do erro no console
      throw new Error("Não foi possível cadastrar o treino. Verifique os dados e tente novamente."); // Retorna uma mensagem amigável
    }
  }
  

  async getAllTreinos() {
    const ver = await prismaClient.treino.findMany({
      include: {
        AlunoExercicio: {
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

  async consultartreinolUnico({id}:{id :string}){
    const ver =  await prismaClient.treino.findUnique({
      where: { id},

      include:{
        aluno:true,
        AlunoExercicio:{
          include:{
            exercicio:true
          }
        }
      }
    })
    return ver
  }
}

export default TreinoServices;
