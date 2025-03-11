
import prismaClient from "../prisma";

interface Historico{
    alunoID: string
    treinoID:string
    exercicioID:string
    carga_utilizada:number
    tempo_execucao:string



}

class HistoricoExercicioServices{

    async cadastrarHistoricoExercicio({alunoID,treinoID,exercicioID,carga_utilizada,tempo_execucao}:Historico){
        try {
            await prismaClient.historicoExercicio.create({
                data:{
                    alunoID,treinoID,exercicioID,carga_utilizada,tempo_execucao
                }
            })
            
            return { dados: "Historico realizado com Sucesso" };
        } catch (err) {
            console.log(err);
            
        }throw new Error("Erro a Cadastrar Historico de treino!");
        
    }

    async ConsultarHistoricoExercicioComAluno(alunoId: string) {
        try {
            const historicos = await prismaClient.historicoExercicio.findMany({
                where: {
                    alunoID: alunoId,  
                },
                
                select:{
                    carga_utilizada:true,
                    tempo_execucao:true,
                    data_realizacao:true,
                    treino:{
                        select:{
                            nome_treino:true
                        }
                    },
                    exercicio:{
                        select:{
                            nome_exercicio:true,
                            URL_video:true,
                            categoria:{
                                select:{
                                    categoria:true
                                }
                            }
                        }
                    }
                }
            });
            return historicos;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar histórico de exercícios");
        }
    }
    
}

export default HistoricoExercicioServices