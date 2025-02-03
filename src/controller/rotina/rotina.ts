import { Request, Response } from "express";
import RotinaExercicioServices from "../../services/rotina/rotinaServices";

class RotinaExercicioController {
  async cadastro_RotinaExercicio(req: Request, res: Response) {
    const { treinosID } = req.params
    const { repeticoes, descanso, exercicioID } = req.body
    const rotinaService = new RotinaExercicioServices()
    const resposta = await rotinaService.cadastrarRotinaExercicioServices({
      repeticoes,
      descanso,
    
      exercicioID,
      treinosID
    })
    return res.json(resposta)
  }

  async altera_RotinaExercicio(req: Request, res: Response){
    const{id}= req.params
    const {repeticoes, descanso,} =req.body
    const rotinaService = new RotinaExercicioServices()
    try {
      const resposta = await rotinaService.alterarRotinaExercicioServices({
        id,
        repeticoes,
        descanso,
        
      })
    } catch (error) {
      
    }
  }
}
export default RotinaExercicioController