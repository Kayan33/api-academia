import prismaClient from "../prisma";

interface RotinaExercicio {
  repeticoes: number;
  descanso: number;
  exercicioID: string  // ID dos exercícios a serem associados
  treinosID: string;      // ID do treino para vincular ao alunoExercicio
}

interface AlteracaoRotinaExercicio {
  id: string
  repeticoes: number;
  descanso: number;
}



class RotinaExercicioServices {
  async cadastrarRotinaExercicioServices({ repeticoes, descanso , exercicioID, treinosID }: RotinaExercicio) {
    try {
      const cadastrar = await prismaClient.alunoExercicio.create({
        data: {
          repeticoes,
          descanso,
          

          exercicio: { connect: { id: exercicioID } },
          treinos: { connect: { id: treinosID } }, 
        },
        include: {
          exercicio: true,
          treinos: true,   
        },
      });
      return cadastrar;
    } catch (error) {
      console.error("Erro ao cadastrar rotinaExercicio de treino para o aluno:", error);
      throw new Error("Erro ao cadastrar rotinaExercicio de treino.");
    }
  }

  async alterarRotinaExercicioServices({ id, repeticoes, descanso,  }: AlteracaoRotinaExercicio) {
    try {
      await prismaClient.alunoExercicio.update({
        where: { id },
        data: {
          repeticoes,
          descanso,
          

        },


      })
      return { dados: 'Alteração efetuada com sucesso' };
    } catch (error) {
      console.error("Erro ao alterar dados do exercício:", error);
      throw new Error("Erro ao alterar dados do exercício.");

    }

  }

  async apagarExerciciosComAluno (id:string){
    try {
      await prismaClient.alunoExercicio.delete({
        where:{
          id: id
        }
      })
      return { dados: "Exercício apagado com sucesso" };
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao apagar exercício.");
      
    }
  }


}

export default RotinaExercicioServices;
