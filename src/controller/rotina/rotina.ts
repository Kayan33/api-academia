import { Request, Response } from "express";
import RotinaExercicioServices from "../../services/rotina/rotinaServices";
import prismaClient from "../../services/prisma";

class RotinaExercicioController {

  async cadastro_RotinaExercicio(req: Request, res: Response) {
    const { treinosID } = req.params;
    const {
      repeticoes,
      exercicioID,
      tempoRepeticao,
      cargaSugerida,
    } = req.body;

    const rotinaService = new RotinaExercicioServices();
    try {
      const resposta = await rotinaService.cadastrarRotinaExercicioServices({
        repeticoes,
        exercicioID,
        treinosID,
        tempoRepeticao,
        cargaSugerida,
      });
      return res.json(resposta);
    } catch (error) {
      console.error("Erro ao cadastrar rotina de exercício:", error);
      return res.status(500).json({ message: "Erro ao cadastrar rotina de exercício." });
    }
  }


  async altera_RotinaExercicio(req: Request, res: Response) {
    const { id } = req.params;
    const {
      repeticoes,
      tempoRepeticao,
      cargaSugerida,
    } = req.body;

    const rotinaService = new RotinaExercicioServices();
    try {
      const resposta = await rotinaService.alterarRotinaExercicioServices({
        id,
        repeticoes,
        tempoRepeticao,
        cargaSugerida,
      });
      return res.json(resposta);
    } catch (error) {
      console.error("Erro ao alterar rotina de exercício:", error);
      return res.status(500).json({ message: "Erro ao alterar rotina de exercício." });
    }
  }

  
  async DeleteExerciciosComAluno(req: Request, res: Response) {
    const { id } = req.params;
    const rotinaService = new RotinaExercicioServices();
    try {
      const resposta = await rotinaService.apagarExerciciosComAluno(id);
      return res.json(resposta);
    } catch (error: any) {
      console.log("Erro ao apagar exercício:", error);
      return res.status(500).json({ message: "Erro ao apagar exercício." });
    }
  }
}

export default RotinaExercicioController;
