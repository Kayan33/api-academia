import { Request, Response } from "express";
import RotinaExercicioServices from "../../services/rotina/rotinaServices";

class RotinaExercicioController {
  async cadastro_RotinaExercicio(req: Request, res: Response) {
    const { treinosID } = req.params
    const { repeticoes, descanso, series, exercicioID } = req.body
    const rotinaService = new RotinaExercicioServices()
    const resposta = await rotinaService.cadastrarRotinaExercicioServices({
      repeticoes,
      descanso,
      series,
      exercicioID,
      treinosID
    })
    return res.json(resposta)
  }

  async altera_RotinaExercicio(req: Request, res: Response){
    const{id}= req.params
    const {repeticoes, descanso, series} =req.body
    const rotinaService = new RotinaExercicioServices()
    try {
      const resposta = await rotinaService.alterarRotinaExercicioServices({
        id,
        repeticoes,
        descanso,
        series
      })
    } catch (error) {
      
    }
  }
}
export default RotinaExercicioController