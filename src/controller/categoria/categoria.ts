import { Request, Response } from "express";
import CategoriaServices from "../../services/categoria/categoriaServices";

class CategoriaController {
    async cadastro_Categoria(req: Request, res: Response) {
        const { categoria } = req.body
        const categoriaServices = new CategoriaServices()
        const resposta = await categoriaServices.cadastrar_Categoria({
            categoria
        })
        return res.json(resposta)
    }
async getCadastro(req: Request, res: Response){

    const categoriaServices = new CategoriaServices()
    const resposta = await categoriaServices.getAllCategoria()
    return res.json(resposta)

}

}
export default CategoriaController