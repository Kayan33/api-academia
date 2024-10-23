import prismaClient from "../prisma";

interface Categoria{
categoria:string
}
 class CategoriaServices{
async cadastrar_Categoria({categoria}:Categoria){
const cadastrar = await prismaClient.categoria.create({
    data:{
        categoria
    }
})
return cadastrar
}

async getAllCategoria (){
    const ver = await prismaClient.categoria.findMany({
        include:{

        }
    })
    return ver
}

 }

 export default CategoriaServices