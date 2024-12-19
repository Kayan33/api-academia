import prismaClient from "../prisma";

interface Categoria {
    categoria: string;
}

interface CategoriaAltera {
    categoria: string;
    id: string;
}

class CategoriaServices {
    async cadastrar_Categoria({ categoria }: Categoria) {
        try {
            const cadastrar = await prismaClient.categoria.create({
                data: {
                    categoria,
                },
            });
            return cadastrar;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao cadastrar a categoria.");
        }
    }

    async getAllCategoria() {
        try {
            const ver = await prismaClient.categoria.findMany({
                select: {
                    categoria: true,
                },
            });
            return ver;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao buscar as categorias.");
        }
    }

    // ERRO AO BUSCAR COM findFirst PELO FRONT
    async consultarCategoria(id: string) {
        try {
            const resposta = await prismaClient.categoria.findMany({
                where: {
                    id: id,
                },
            });
            return resposta;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao consultar categoria.");
        }
    }

    async alterarDadosCategoria({ categoria, id }: CategoriaAltera) {
        try {
            await prismaClient.categoria.update({
                where: {
                    id: id,
                },
                data: {
                    categoria,
                },
            });
            return { dados: 'Alteração Efetuado com Sucesso' };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao alterar dados da categoria.");
        }
    }

    async apagarCategoria(id: string) {
        try {
            await prismaClient.categoria.delete({
                where: {
                    id: id,
                },
            });
            return { dados: "Registro Apagado com sucesso" };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao apagar a categoria.");
        }
    }
}

export default CategoriaServices;
