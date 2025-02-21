import prismaClient from "../prisma";

interface Convite {
  personalID: string;
  alunoID: string;
}

class ConviteService {
  async EnviarConvie({ personalID, alunoID }: Convite) {
    try {
      const alunoExisteste = await prismaClient.aluno.findUnique({
        where: { id: alunoID },
      });

      if (!alunoExisteste) {
        throw new Error("Aluno não encontrado.");
      }

      if (alunoExisteste.personalID) {
        throw new Error("Aluno já possui um personal associado.");
      }
      await prismaClient.convite.create({
        data: {
          personalID,
          alunoID,
          status: "PENDENTE",
        },
      });
      return {dados:`Convite enviado com sucesso`}
    } catch (error: any) {
      console.log(error);

      throw new Error(`Erro ao Enviar Convites: ${error.message}`);
    }
  }

  async ListaConvitesPendentes(alunoID: string) {
    try {
    const alunoExisteste = await prismaClient.aluno.findUnique({
        where:{
            id:alunoID
        }
    })

    if (!alunoExisteste) {
        throw new Error("Aluno Não Encontrado");
        
    }

    if (alunoExisteste.personalID) {
        throw new Error("Aluno já possui um personal associado.");
      }

      return await prismaClient.convite.findMany({
        where: { alunoID, status: "PENDENTE" },

        include: {
          personal: {
            include: {},
          },
        },
      });
    }catch (error: any) {
        console.log(error);
  
        throw new Error(`Erro ao ver convites: ${error.message}`);
      }
  }

  async AceitaConvite(id: string) {
    try {
      const convite = await prismaClient.convite.findUnique({
        where: { id: id },
      });

      if (!convite) {
        throw new Error("Convite não encontrado");
      }

      await prismaClient.convite.update({
        where: { id: id },
        data: { status: "ACEITO" },
      });

      await prismaClient.aluno.update({
        where: { id: convite.alunoID },
        data: { personalID: convite?.personalID },
      });
      return { dados: "Convite aceito com sucesso" };
    } catch (error: any) {
      console.log(error);
      throw new Error(`Erro ao aceitar convite: ${error.message}`);
    }
  }

  async RejeitaConvite(id: string) {
    try {
      const convite = await prismaClient.convite.findUnique({
        where: { id: id },
      });

      if (!convite) {
        throw new Error("Convite não encontrado");
      }

      await prismaClient.convite.update({
        where: { id: id },
        data: { status: "REJEITADO" },
      });

      return { dados: "Convite Rejeitado com sucesso" };
    } catch (error: any) {
        console.log(error);
        throw new Error(`Erro ao Rejeitado convite: ${error.message}`);
      }
  }
}

export default ConviteService;
