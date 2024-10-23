import { Request,  Response } from "express";
import RotinaServices from "../../services/rotina/rotinaServices";

class RotinaController {
async cadastro_Rotina (req:Request, res:Response){
  const {dia_semana,descricao,exercicio}=req.body
  const rotinaService = new RotinaServices()
  const resposta = await rotinaService.cadastar_Rotina({
    dia_semana,
       descricao,
       exercicio
  })
return res.json(resposta)
}
}
export default RotinaController