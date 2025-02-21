import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface Personal {
  nome: string,
  telefone: string,
  email: string,
  CREF: string,
  sexo: string,
  senha: string,
  aluno: string[]
}

interface AlterarAlunoDePersonal {
  id: string
  aluno: string[]
}


class PersonalServices {
  async cadastrar_personal({ nome, telefone, email, CREF, sexo, senha, aluno }: Personal) {

    const  RegistroEmail = await prismaClient.personal.findFirst({
      where:{
      OR:[{email},{CREF}]  
      }
    })

    
if (RegistroEmail) {
  
  if (RegistroEmail.email === email) {
    throw new Error("Este email já está cadastrado. Tente outro.");
    
  }
  if (RegistroEmail.CREF === CREF) {
    throw new Error("Está CREEF já está cadastrado.");
    
  }
}


    const senhaCrypt = await hash(senha, 8)

    try {
      const cadastrar = await prismaClient.personal.create({
        data: {
          nome,
          telefone,
          email,
          CREF,
          sexo,
          senha: senhaCrypt,
  
          aluno: aluno.length > 0 ? { connect: aluno.map(id => ({ id })) } : undefined,
        },
        include: {
          aluno: true,
        },
      });
      return cadastrar;
    } catch (error) {
      console.log(error);
      
      throw new Error("Erro a Cadastrar Usuario");
      
    }
    
  }

  async getAllPersonalTrainers() {
    const ver = await prismaClient.personal.findMany({
      include: {
        aluno: true
      }
    });
    return ver;
  }

  // ERRO AO BUSCAR COM findFirst PELO FRONT
  async consultarPersonalUnico(id: string) {
    const resposta = await prismaClient.personal.findUnique({
      where: {
        id: id
      },
      include: {
        aluno: true,
        treino:true
      }
    })
   

    return resposta
  }

  async consultarPersonalComAlunoUnico(personalId: string, alunoId: string) {
    try {
      const resposta = await prismaClient.personal.findUnique({
        where: {
          id: personalId,
        },
        include: {
          aluno: {
            where: {
              id: alunoId,
            },
            include:{
              treino:{
                include:{
                  AlunoExercicio:{
                    include:{
                      exercicio:{
                        include:{
                          categoria:{
                            include:{
                              
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        },
      });
  
      return resposta;
    } catch (err) {
      console.error("Erro ao consultar personal com aluno único:", err);
      throw new Error("Não foi possível buscar os dados do personal ou aluno.");
    }
  }
  
  
  async apagarPersonal(id: string) {
    await prismaClient.personal.delete({
      where: {
        id: id
      }
    })
    return ({ dados: "Registro Apagado com sucesso" })
  }
}

export { PersonalServices };
