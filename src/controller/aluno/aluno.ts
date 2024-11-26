import { Request, Response } from "express";
import AlunoServises from "../../services/aluno/alunoServices";


class AlunoController {
 async cadastro_Aluno (req:Request, res:Response){
  const {nome,telefone,email,endereco,data_nascimento,senha,status,personalID}= req.body
  const alunoServices = new AlunoServises()
  const resposta =  await alunoServices.Cadastar_Aluno({
    nome,
    telefone,
    email,
    endereco,
    data_nascimento,
    senha,
    status,
    personalID
  })
return res.json(resposta)
 }

 async get_Aluno(req:Request, res:Response){
  const alunoServices = new AlunoServises()
  const resposta = await alunoServices.getAllAluno()
  return res.json(resposta)
 }
}
export default AlunoController