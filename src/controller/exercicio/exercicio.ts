import { Request, Response } from "express";
import ExercicioServices from "../../services/exercicio/exercicioServices";

class ExercicioController {
  async cadastro_Exercicio(req: Request, res: Response) {
    const { nome_exercicio, URL_video,categoriaID } = req.body
    const exercicioServices = new ExercicioServices()
    const resposta = await exercicioServices.cadastrar_exercicios({
      nome_exercicio,
      URL_video,
      categoriaID
    })
    return res.json(resposta)
  }
  async getTreino (req: Request, res: Response) {
    const exercicioServices = new ExercicioServices()
    const ver = await exercicioServices.getAllExercicios()
    return res.json(ver)
  }
}

export default ExercicioController