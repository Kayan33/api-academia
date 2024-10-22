import prismaClient from "../prisma";

interface Aluno {
  nome : string
  telefone: string
  email : string
  endereco : string
  data_nascimento :string
  status : boolean
}

class AlunoServises{
async Cadastar_Aluno({nome,telefone,email,endereco,data_nascimento,status}:Aluno){
const cadastrar = await prismaClient.aluno.create({
  data:{
    nome,
    telefone,
    email,
    endereco,
    data_nascimento,
    status: status ? 1 : 0,
  }
})
return cadastrar
}
}

export default AlunoServises