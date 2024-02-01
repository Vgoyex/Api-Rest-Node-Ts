import { Request, Response } from "express";


interface IPeople {
    name:string;
}

export const create = (req: Request<{},{},IPeople>, res: Response) => {
    
    const data = req.body;

    console.log(data.name);

    return res.send({
        id: "xpto",
        data
    });
}