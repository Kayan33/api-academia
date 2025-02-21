import { hash } from "bcryptjs";
import prismaClient from "../prisma";
import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface Aluno {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: string;
  senha: string;
  personalID: string;
}

interface AlterarUsuarios {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: string;
}
class AlunoServises {
  async Cadastar_Aluno({
    nome,
    telefone,
    email,
    endereco,
    data_nascimento,
    senha,
    personalID,
  }: Aluno) {
    const senhaCrypt = await hash(senha, 8);
    await prismaClient.aluno.create({
      data: {
        nome: nome,
        telefone: telefone,
        email: email,
        endereco: endereco,
        data_nascimento: data_nascimento,
        senha: senhaCrypt,
        personalID: personalID,
      },
    });
    return { dados: "Cadastro Efetuado com Sucesso" };
  }

  async getAllAluno() {
    const ver = await prismaClient.aluno.findMany({
      include: {
        personal: true,
      },
    });
    return ver;
  }

  async consultarAlunoUnico(id: string) {
    const resposta = await prismaClient.aluno.findUnique({
      where: {
        id: id,
      },
      include: {
       personal:{
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
       }
      },
    });
    return resposta;
  }

  async alterarDadosAluno({
    id,
    nome,
    telefone,
    email,
    endereco,
    data_nascimento,
  }: AlterarUsuarios) {
    await prismaClient.aluno.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        telefone: telefone,
        email: email,
        endereco: endereco,
        data_nascimento: data_nascimento,
      },
    });
    return { data: "Alterado com Sucesso" };
  }

  async apagarAlunos(id: string) {
    await prismaClient.aluno.delete({
      where: {
        id: id,
      },
    });
    return { dados: "Registro Apagado com sucesso" };
  }

  async resetPassword(token: string, senha: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRETO as string) as {
        sub: string;
      };

      console.log(decoded);

      const user = await prismaClient.aluno.findUnique({
        where: { id: decoded.sub },
      });

      const personal = await prismaClient.personal.findUnique({
        where: { id: decoded.sub },
      });

      if (!user && !personal) {
        return { status: 404, message: "Usuário não encontrado!" };
      }

      // Criptografando a nova senha
      const senhaCrypt = await hash(senha, 8);

      
      if (user) {
        await prismaClient.aluno.update({
          where: { id: decoded.sub },
          data: { senha: senhaCrypt },
        });
      } else if (personal) {
        await prismaClient.personal.update({
          where: { id: decoded.sub },
          data: { senha: senhaCrypt },
        });
      }

      return { status: 200, message: "Senha redefinida com sucesso!" };
    } catch (error) {
      console.error("Erro ao trocar a senha. Verifique o token e tente novamente.", error);
      throw new Error("Erro ao trocar a senha.",);
    }
  }
}

export default AlunoServises;
