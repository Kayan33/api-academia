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


    const senhaCrypt = await hash(senha, 8)
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
  

  
  

  async AlterarAlunoDePersonal({ id, aluno }: AlterarAlunoDePersonal) {
    try {
        // Verifica se o e-mail do aluno existe
        const alunosExistem = await prismaClient.aluno.findMany({
            where: {
                email: { in: aluno }
            }
        });

        const emailsEncontrados = alunosExistem.map(a => a.email);
        const emailsNaoEncontrados = aluno.filter(email => !emailsEncontrados.includes(email));

        if (emailsNaoEncontrados.length > 0) {
           
          throw new Error(`E-mails não existem no sistema: ${emailsNaoEncontrados.join(", ")}`);
        }

        

        // Verifica se os alunos já estão associados a outro personal
        const alunosAssociados = await prismaClient.aluno.findMany({
            where: {
                email: { in: aluno },
                personalID: { not: id }
            }
        });

        if (alunosAssociados.length > 0) {

            throw new Error("Esse aluno já está associado a outro personal.");
            
        }

        // Atualiza os dados do personal
        const personalAtualizado = await prismaClient.personal.update({
            where: { id },
            data: {
                aluno: aluno.length > 0 ? { connect: aluno.map(email => ({ email })) } : undefined,
            },
            include: { aluno: true },
        });

        return { sucesso: true, mensagem: "Cadastro atualizado com sucesso!", dados: personalAtualizado };

    } catch (error) {
        console.error("Erro ao alterar personal:", error);
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
      }
        throw new Error("Erro ao atualizar personal.");
        
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
