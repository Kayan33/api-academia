import { Request,  Response } from "express";
import TreinoServices from "../../services/treino/treinoservices";

class TreinoController{
  async cadastro_Treino(req:Request, res:Response){
    const {nome_treino,dia_semana,descricao,id_rotina} = req.body
    const treinoServices = new TreinoServices()
    const resposta = await treinoServices.cadastrar_personal({
      nome_treino,
      dia_semana,
      descricao,
      id_rotina
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