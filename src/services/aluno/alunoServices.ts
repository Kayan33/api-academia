import prismaClient from "../prisma";

interface Aluno {
  nome : string
  telefone: string
  email : string
  endereco : string
  data_nascimento :string
  status : boolean
  personalID:string
}

class AlunoServises{
async Cadastar_Aluno({nome,telefone,email,endereco,data_nascimento,status,personalID}:Aluno){
const cadastrar = await prismaClient.aluno.create({
  data:{
    nome,
    telefone,
    email,
    endereco,
    data_nascimento,
    status: status ? 1 : 0,
    personalID
  }
})
return cadastrar
}
}

export default AlunoServises