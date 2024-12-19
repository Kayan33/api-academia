import { Request,  Response } from "express";
import TreinoServices from "../../services/treino/treinoservices";

class TreinoController{
  async cadastro_Treino(req:Request, res:Response){
    const {nome_treino,rotinasID,personalID,alunoID} = req.body
    const treinoServices = new TreinoServices()
    const resposta = await treinoServices.cadastrar_Treinos({
      nome_treino,
        rotinasID,
        personalID,
        alunoID
    })
    return res.json(resposta)

  }
  async getTreino (req:Request, res:Response){
const treinoSerices = new TreinoServices()
const resposta = await treinoSerices.getAllTreinos()
return res.json(resposta)
  }
}

export default TreinoController