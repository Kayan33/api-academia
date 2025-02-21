import { Request, Response } from "express";
import RotinaExercicioServices from "../../services/rotina/rotinaServices";
import prismaClient from "../../services/prisma";

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
      return res.json(resposta)
    } catch (error) {
      
    }
  }

  async DeleteExerciciosComAluno (req: Request, res: Response){
    const {id}= req.params
    const rotinaService = new RotinaExercicioServices()
    try {
      const resposta = await rotinaService.apagarExerciciosComAluno(id)
      return res.json(resposta)
    } catch (error:any) {
      console.log("Erro ao apagar exercício:", error);
      
      throw new Error("Erro ao apagar exercício:");
      
    }
  }
}
export default RotinaExercicioController