

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './router';
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json"

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc))
 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);  
    if(err instanceof Error){
        return res.status(400).json({
            message: err.message
        });
    }
 
    return res.status(500).json({
        'err': 'Erro',
        'message':'Erro interno no servidor'
    });
});
 
     app.listen(7777, () => console.log("Rodando no http://localhost:7777/"));
 
