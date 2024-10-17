import { Request, Response } from "express";
import { PersonalServices } from "../services/personal/personalServices";


class PersonalController {
    async cadastroPersonal(req:Request, res:Response){
        const {nome,telefone,email,CREF,sexo,senha} = req.body;
        const personalServices = new PersonalServices()
        const resposta = await personalServices.cadastrar_personal({
            nome,telefone,email,CREF,sexo,senha
        })
        return resposta
    }
}

export default PersonalController