import { Request, Response } from "express";
import { PersonalServices } from "../../services/personal/personalServices";


class PersonalController {
    async cadastro_Personal(req:Request, res:Response){
        const {nome,telefone,email,CREF,sexo,senha,aluno} = req.body;
        const personalServices = new PersonalServices()
        const resposta = await personalServices.cadastrar_personal({
            nome,telefone,email,CREF,sexo,senha,aluno
        })
        return res.json(resposta)
    }

    async getPersonalTrainers(req:Request,res:Response) {
        const personalServices = new PersonalServices()
        const resposta = await personalServices.getAllPersonalTrainers()
        
        return res.json(resposta)
    }

    async consultarUsuariosUnico(req:Request,res:Response){
        const {id}= req.params
        const personalServices = new PersonalServices()
        const resposta = await personalServices.consultarPersonalUnico(id)
        return res.json(resposta)
    }

    async consultarPersonalComAlunoUnico(req: Request, res: Response) {
        const { personalId, alunoId } = req.params;
    
        try {
            const personalServices = new PersonalServices();
            const resposta = await personalServices.consultarPersonalComAlunoUnico(personalId, alunoId);
    
            if (!resposta) {
                return res.status(404).json({ message: "Personal ou aluno não encontrados" });
            }
    
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar personal e aluno" });
        }
    }
    

    async apagarPersonal(req: Request, res: Response) {
        const { id } = req.params
        const personalServices = new PersonalServices()
        const resposta = await personalServices.apagarPersonal(id)
        return res.json(resposta)
    
      }
}

export default PersonalController