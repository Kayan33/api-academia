import { Request, Response } from "express";
import CategoriaServices from "../../services/categoria/categoriaServices";

class CategoriaController {
    async cadastro_Categoria(req: Request, res: Response) {
        try {
            const { categoria } = req.body;
            const categoriaServices = new CategoriaServices();
            const resposta = await categoriaServices.cadastrar_Categoria({
                categoria
            });
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao cadastrar a categoria." });
        }
    }

    async getCadastro(req: Request, res: Response) {
        try {
            const categoriaServices = new CategoriaServices();
            const resposta = await categoriaServices.getAllCategoria();
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar as categorias." });
        }
    }

    async consultarUsuariosUnico(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoriaServices = new CategoriaServices();
            const resposta = await categoriaServices.consultarCategoria(id);
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao consultar a categoria." });
        }
    }

    async alterarDadosPersonal(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { categoria } = req.body;
            const categoriaServices = new CategoriaServices();
            const resposta = await categoriaServices.alterarDadosCategoria({
                id,
                categoria
            });
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao alterar os dados da categoria." });
        }
    }

    async apagarPersonal(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoriaServices = new CategoriaServices();
            const resposta = await categoriaServices.apagarCategoria(id);
            return res.json(resposta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao apagar a categoria." });
        }
    }
}

export default CategoriaController;
