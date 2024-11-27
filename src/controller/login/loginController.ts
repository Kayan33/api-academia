import { Request, Response } from 'express'
import { LoginServices } from '../../services/login/loginServices'

class loginController {
    async loginAluno(req: Request, res: Response) {
        const { email, senha } = req.body
        const loginServices = new LoginServices
        const resposta = await loginServices.loginUsuario({
            email,
            senha
        })
        return res.json(resposta)
    }

    async verificaToken(req: Request, res: Response) {
        const id = req.alunoID
        const loginServices = new LoginServices ()
        const resposta = await loginServices.verificaToken(id)
        return res.json(resposta)
    }
}

export{loginController}