import { request, Request, response, Response } from "express";
import TreinoServices from "../../services/treino/treinoservices";

class TreinoController{
  async cadastro_Treino(req:Request, res:Response){
    const {nome_treino,descricao,descanso,series,repeticao,id_exercicio} = req.body
    const treinoServices = new TreinoServices()
    const resposta = await treinoServices.cadastrar_personal({
      nome_treino,
      descricao,
      descanso,
      series,
      repeticao,
      id_exercicio
    })
    return res.json(resposta)

  }
  async getTreino (req:Request, res:Response){
const treinoSerices = new TreinoServices()
const resposta = await treinoSerices.getAllTreino()
return res.json(resposta)
  }
}

export default TreinoController