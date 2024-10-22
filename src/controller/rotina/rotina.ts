import { Request,  Response } from "express";
import RotinaServices from "../../services/rotina/rotinaServices";

class RotinaController {
async cadastro_Rotina (req:Request, res:Response){
  const {repeticao, descricao,descanso,series,id_exercicio}=req.body
  const rotinaService = new RotinaServices()
  const resposta = await rotinaService.cadastar_Rotina({
    repeticao,
     descricao,
     descanso,
     series,
     id_exercicio
  })
return res.json(resposta)
}
}
export default RotinaController