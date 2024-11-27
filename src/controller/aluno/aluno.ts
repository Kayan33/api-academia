import { Request, Response } from "express";
import AlunoServises from "../../services/aluno/alunoServices";


class AlunoController {
  async cadastro_Aluno(req: Request, res: Response) {
    const { nome, telefone, email, endereco, data_nascimento, senha, personalID } = req.body
    const alunoServices = new AlunoServises()
    const resposta = await alunoServices.Cadastar_Aluno({
      nome,
      telefone,
      email,
      endereco,
      data_nascimento,
      senha,
      personalID
    })
    return res.json(resposta)
  }

  async get_Aluno(req: Request, res: Response) {
    const alunoServices = new AlunoServises()
    const resposta = await alunoServices.getAllAluno()
    return res.json(resposta)
  }

  async consultarUsuariosUnico(req: Request, res: Response) {
    const { id } = req.body
    const enviardadosServices = new AlunoServises()
    const resposta = await enviardadosServices.consultarAlunoUnico(id)
    return res.json(resposta)
  }

  async alterarDadosUsuarios(req: Request, res: Response) {
    const { id, nome, telefone, email, endereco, data_nascimento, personalID } = req.body
    const enviardadosServices = new AlunoServises()
    const resposta = await enviardadosServices.alterarDadosAluno({
      id,
      nome,
      telefone,
      email,
      endereco,
      data_nascimento,
      personalID
    })

    return res.json(resposta)

  }

  async apagarUsuarios(req: Request, res: Response) {
    const { id } = req.params
    const enviardadosServices = new AlunoServises()
    const resposta = await enviardadosServices.apagarAlunos(id)
    return res.json(resposta)

  }
}
export default AlunoController