import { Request, Response } from "express";
import { LoginServices } from "../../services/login/loginServices";

class loginController {
  async loginAluno(req: Request, res: Response) {
    const { email, senha } = req.body;
    const loginServices = new LoginServices();
    const resposta = await loginServices.loginUsuario({
      email,
      senha,
    });
    return res.json(resposta);
  }
  async loginPersonal(req: Request, res: Response) {
    const { email, senha } = req.body;
    const loginServices = new LoginServices();
    try {
        const resposta =  await loginServices.loginPersonal({
            email,
            senha
        })
        return res.json(resposta)
    } catch (error) {
        throw new Error("Erro ao fazer Login");
        
    }
  }

  async verificaTokenPersonal(req: Request, res: Response) {
    const id = req.params.id;
    const loginServices = new LoginServices();
    const resposta = await loginServices.verificaTokenPersonal(id);
    return res.json(resposta);
  }

  async verificaTokenAluno(req: Request, res: Response){
    const id = req.params.id
    const loginServices = new LoginServices();
    try {
        
        const  resposta = await loginServices.verificaTokenAluno(id)
        return res.json(resposta)
    } catch (error) {
        throw new Error("Verificação falhou");
        
    }
  }
}

export { loginController };
