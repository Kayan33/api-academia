import prismaClient from "../prisma";

interface RotinaExercicio {
  repeticoes: number;
  exercicioID: string;
  treinosID: string;   
  tempoRepeticao?: number; 
  cargaSugerida?: number;     
}

interface AlteracaoRotinaExercicio {
  id: string;
  repeticoes: number;
  tempoRepeticao?: number;
  tempoDescanso?: number;
  cargaSugerida?: number;
  cargaUsada?: number;
}

class RotinaExercicioServices {
  
  async cadastrarRotinaExercicioServices({
    repeticoes,
    exercicioID,
    treinosID,
    tempoRepeticao,
    cargaSugerida,
  }: RotinaExercicio) {
    try {
      const cadastrar = await prismaClient.alunoExercicio.create({
        data: {
          repeticoes,
          tempoRepeticao,
          cargaSugerida,
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
      console.log(error);
      throw new Error("Erro ao cadastrar rotinaExercicio de treino.");
    }
  }


  async alterarRotinaExercicioServices({
    id,
    repeticoes,
    tempoRepeticao,
    cargaSugerida
  }: AlteracaoRotinaExercicio) {
    try {
      await prismaClient.alunoExercicio.update({
        where: { id },
        data: {
          repeticoes,
          
          tempoRepeticao,
          cargaSugerida,
        },
      });
      return { dados: 'Alteração efetuada com sucesso' };
    } catch (error) {
      console.error("Erro ao alterar dados do exercício:", error);
      throw new Error("Erro ao alterar dados do exercício.");
    }
  }


  async apagarExerciciosComAluno(id: string) {
    try {
      await prismaClient.alunoExercicio.delete({
        where: { id },
      });
      return { dados: "Exercício apagado com sucesso" };
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao apagar exercício.");
    }
  }
}

export default RotinaExercicioServices;
