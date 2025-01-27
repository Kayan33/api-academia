import prismaClient from "../prisma";

interface RotinaExercicio {
  repeticoes: number;
  descanso: number;
  series: number;
  exercicioID: string  // ID dos exercícios a serem associados
  treinosID: string;      // ID do treino para vincular ao alunoExercicio
}

interface AlteracaoRotinaExercicio {
  id: string
  repeticoes: number;
  descanso: number;
  series: number;
}



class RotinaExercicioServices {
  async cadastrarRotinaExercicioServices({ repeticoes, descanso, series, exercicioID, treinosID }: RotinaExercicio) {
    try {
      const cadastrar = await prismaClient.alunoExercicio.create({
        data: {
          repeticoes,
          descanso,
          series,

          exercicio: { connect: { id: exercicioID } },
          treinos: { connect: { id: treinosID } }, // Conecta ao treino
        },
        include: {
          exercicio: true, // Inclui os exercícios associados à rotinaExercicio
          treinos: true,   // Inclui os treinos associados
        },
      });
      return cadastrar;
    } catch (error) {
      console.error("Erro ao cadastrar rotinaExercicio de treino para o aluno:", error);
      throw new Error("Erro ao cadastrar rotinaExercicio de treino.");
    }
  }

  async alterarRotinaExercicioServices({ id, repeticoes, descanso, series }: AlteracaoRotinaExercicio) {
    try {
      await prismaClient.alunoExercicio.update({
        where: { id },
        data: {
          repeticoes,
          descanso,
          series

        },


      })
      return { dados: 'Alteração efetuada com sucesso' };
    } catch (error) {
      console.error("Erro ao alterar dados do exercício:", error);
      throw new Error("Erro ao alterar dados do exercício.");

    }

  }


}

export default RotinaExercicioServices;
