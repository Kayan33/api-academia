import { Request, Response } from "express";
import ExercicioServices from "../../services/exercicio/exercicioServices";

class ExercicioController {
  async cadastro_Exercicio(req: Request, res: Response) {
    try {
      
      const { nome_exercicio, URL_video,categoriaID } = req.body
      const exercicioServices = new ExercicioServices()
      const resposta = await exercicioServices.cadastrar_exercicios({
        nome_exercicio,
        URL_video,
        categoriaID
      })
      return res.json(resposta)
    } catch (error) {
      console.error(error);
        return res.status(500).json({ error: "Erro ao caadastrar a Exercicios." });
    }
  }
  async getExercicios (req: Request, res: Response) {
    try {
      const exercicioServices = new ExercicioServices()
      const ver = await exercicioServices.getAllExercicios()
      return res.json(ver)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar as exercicios." }); 
    }
  }

  async consultarExerciciosUnico(req: Request, res: Response) {
    try {
        const { id } = req.params;
         const exercicioServices = new ExercicioServices()
        const resposta = await exercicioServices.consultarExercicios(id);
        return res.json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao consultar a exercicios." });
    }
}

async alterarDadosExercicios(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nome_exercicio,URL_video,categoriaID } = req.body;
         const exercicioServices = new ExercicioServices()
        const resposta = await exercicioServices.alterarDadosExercicios({
            id,
            nome_exercicio,
            URL_video,
            categoriaID 
        });
        return res.json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao alterar os dados da exercicios." });
    }
}

async apagarExercicios(req: Request, res: Response) {
    try {
        const { id } = req.params;
         const exercicioServices = new ExercicioServices()
        const resposta = await exercicioServices.apagarExercicios(id);
        return res.json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao apagar a exercicios." });
    }
}
}

export default ExercicioController