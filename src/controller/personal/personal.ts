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
}

export default PersonalController