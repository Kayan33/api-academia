import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{

    sub: string
};

export function estaAutenticado(

    req: Request, 
    res: Response, 
    next: NextFunction

){

    const autToken = req.headers.authorization?.split(" ");

    if (!autToken){

        return res.json({dados: 'Token Inválido!'});
    }

    try{

        const {sub} = verify(

            autToken[1],
            process.env.JWT_SECRETO as string

        ) as Payload;

        req.alunoID = sub;

        return next();

    }catch{

        return res.json({dados: 'Token Inválido!'});
        
    }
}