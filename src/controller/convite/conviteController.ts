import { Request, Response } from "express";
import ConviteService from "../../services/convite/conviteService";

class ConviteController {

    async EnviarConvie(req: Request, res: Response){
        try {
            const{personalID,email}= req.body
            const conviteService = new ConviteService();

            const resposta = await conviteService.EnviarConvite({personalID,email})
           
            return res.json(resposta)
            
        } catch (error: any) {
            console.log(error);
            throw new Error(`${error.message}`);
            
            
        }

    }

    async ListaConvitesPendentes(req: Request, res: Response){
        try {
            const{alunoID}= req.params;
            const conviteService = new ConviteService();

            const resposta = await conviteService.ListaConvitesPendentes(alunoID)
            return res.json(resposta)
        } catch (error: any) {
            console.log(error);
            throw new Error(`${error.message}`);
            
            
        }
    }

    async AceitaConvite(req: Request, res: Response) {
        try {
            const {id}= req.params;
            const conviteService = new ConviteService();
            const resposta = await conviteService.AceitaConvite(id)
            return res.json(resposta)
        } catch (error: any) {
            console.log(error);
            throw new Error(`${error.message}`);
            
            
        }
    }

    async RejeitarConvite(req: Request, res: Response){
        try {
            const{id}=req.params
            const conviteService = new ConviteService();
            const resposta = await conviteService.RejeitaConvite(id)
            return res.json(resposta)
        } catch (error: any) {
            console.log(error);
            throw new Error(`${error.message}`);
            
            
        }
    }
    
}

export default ConviteController