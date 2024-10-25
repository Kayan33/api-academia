import prismaClient from "../prisma";

interface Personal {
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  senha: string,
  alunoId: string[] 
}

class PersonalServices {
  async cadastrar_personal({ nome, telefone, email, CREF, sexo, senha, alunoId}: Personal) {
    const cadastrar = await prismaClient.personal.create({
      data: {
        nome,
        telefone,
        email,
        CREF,
        sexo,
        senha,
        
        aluno: {
          connect: alunoId.map(id => ({ id })) 
        }
      },
      include: {
        aluno: true 
      }
    });
    return cadastrar;
  }

  async getAllPersonalTrainers() {
    const ver = await prismaClient.personal.findMany({
      include: {
        aluno: true // Incluir os Alunos associados
      }
    });
    return ver;
  }
}

export { PersonalServices };
