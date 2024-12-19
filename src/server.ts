import Express, { Response, Request, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors'
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json"
const app = Express();

app.use(Express.json())
app.use(cors())
app.use(router)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
if (err instanceof Error) {
    return res.status(400).json({
        error:err.message
    })
}
return res.status(500).json({
    status:'Erro',
    message:'Erro interno do servidor'
})
})

app.listen(7777,()=>console.log('servidor ON LINE'))
export default app