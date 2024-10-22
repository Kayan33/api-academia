import { Request, Response } from "express";
import ExercicioServices from "../../services/exercicio/exercicioServices";

class ExercicioController {
  async cadastro_Exercicio(req: Request, res: Response) {
    const { nome_exercicio, descricao, URL_video, } = req.body
    const exercicioServices = new ExercicioServices()
    const resposta = await exercicioServices.cadastrar_exercicios({
      nome_exercicio,
      descricao,
      URL_video,
    })
    return res.json(resposta)
  }
}

export default ExercicioController