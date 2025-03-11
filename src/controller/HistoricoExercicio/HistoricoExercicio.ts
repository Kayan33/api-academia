import { Request, Response } from "express";
import HistoricoExercicioServices from "../../services/HistoricoExercicio/HistoricoExercicioServices";

class HistoricoExercicioController {
  async cadastrarHistoricoExercicio(req: Request, res: Response) {
    const { alunoID, treinoID, exercicioID, carga_utilizada, tempo_execucao } =
      req.body;
    try {
      const historicoExercicioServices = new HistoricoExercicioServices();

      const resposta =
        await historicoExercicioServices.cadastrarHistoricoExercicio({
          alunoID,
          treinoID,
          exercicioID,
          carga_utilizada,
          tempo_execucao,
        });
      return res.json(resposta);
    } catch (error: any) {
      console.log(`Erro ao cadastrar Historico de exercicio`, error);
      throw new Error(`${error.message}`);
    }
  }

  async ConsultarHistoricoExercicioComAluno(req: Request, res: Response) {
    const { alunoID } = req.params;
    try {
      const historicoExercicioServices = new HistoricoExercicioServices();
      const resposta =
        await historicoExercicioServices.ConsultarHistoricoExercicioComAluno(
          alunoID
        );
      return res.json(resposta);
    } catch (error: any) {
      console.log(`Erro ao consultar Historico de exercicios`, error);
      throw new Error(`${error.message}`);
    }
  }
}

export default HistoricoExercicioController;
