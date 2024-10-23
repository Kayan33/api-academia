import { Request,  Response } from "express";
import RotinaServices from "../../services/rotina/rotinaServices";

class RotinaController {
async cadastro_Rotina (req:Request, res:Response){
  const {repeticao,descanso,series,exercicio}=req.body
  const rotinaService = new RotinaServices()
  const resposta = await rotinaService.cadastar_Rotina({
    repeticao,
      descanso,
      series,
       exercicio
  })
return res.json(resposta)
}

async getRotina (req:Request, res:Response){
  const rotinaService = new RotinaServices()
  const resposta = await rotinaService.getAllRotina()
  return res.json(resposta)
}
}
export default RotinaController