import { Request, Response } from "express";
import TreinoServices from "../../services/treino/treinoservices";

class TreinoController {
  async cadastro_Treino(req: Request, res: Response) {
    const { alunoID, personalID, } = req.params; // O alunoID vem dos parâmetros da URL
    const { nome_treino, AlunoExercicio, } = req.body; // Dados do treino no corpo da requisição

    const treinoServices = new TreinoServices();

    try {
      const resposta = await treinoServices.cadastrar_Treinos({
        nome_treino,
        AlunoExercicio,
        personalID,
        alunoID: [alunoID],
      });

      return res.json(resposta); // Retorna a resposta para o cliente
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao cadastrar treino", error: error.message });
    }
  }

  async getTreino(req: Request, res: Response) {
    const treinoSerices = new TreinoServices()
    const resposta = await treinoSerices.getAllTreinos()
    return res.json(resposta)
  }

  async consultarTreinoUnico(req: Request, res: Response){
    const{id}= req.params
    const treinoServices = new TreinoServices()

    try {
      const resposta = await treinoServices.consultartreinolUnico({id})
      return res.json(resposta)
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao consultar treino", error: error.message });
    }
  }
}

export default TreinoController