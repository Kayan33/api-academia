import { Request, Response } from "express";
import ExercicioServices from "../../services/exercicio/exercicioServices";

class ExercicioController {
  async cadastro_Exercicio(req: Request, res: Response) {
    try {
      const { nome_exercicio, URL_video, categoriaID, personalID } = req.body;
      const exercicioServices = new ExercicioServices();
      const resposta = await exercicioServices.cadastrar_exercicios({
        nome_exercicio,
        URL_video,
        categoriaID,
        personalID,
      });
      return res.json(resposta);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao caadastrar a Exercicios." });
    }
  }
  async getExercicios(req: Request, res: Response) {
    try {
      const exercicioServices = new ExercicioServices();
      const ver = await exercicioServices.getAllExercicios();
      return res.json(ver);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar exercicios." });
    }
  }

  async consultarExerciciosUnico(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exercicioServices = new ExercicioServices();
      const resposta = await exercicioServices.consultarExercicios(id);
      return res.json(resposta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao consultar exercicios." });
    }
  }

  async ConsultapersonalExerciciosCategoria(req: Request, res: Response) {
    try {
      const {categoriaID, personalID}= req.params
      const exercicioServices = new ExercicioServices();
      const resposta = await exercicioServices.personalExerciciosCategoria(categoriaID,personalID)
      return res.json(resposta)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar exercicios." });
    }
  }

  async alterarDadosExercicios(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome_exercicio, URL_video, categoriaID } = req.body;
      const exercicioServices = new ExercicioServices();
      const resposta = await exercicioServices.alterarDadosExercicios({
        id,
        nome_exercicio,
        URL_video,
        categoriaID,
      });
      return res.json(resposta);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao alterar os dados exercicios." });
    }
  }

  async apagarExercicios(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exercicioServices = new ExercicioServices();
      const resposta = await exercicioServices.apagarExercicios(id);
      return res.json(resposta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao apagar exercicios." });
    }
  }
}

export default ExercicioController;
