import { Request, Response } from "express";

interface ICitys {
    name: string;
}

export const create = (req: Request<{}, {}, ICitys>,res: Response) => {

    const data: ICitys = req.body;

    console.log(data.name);

    return res.send({
        id:"xpto",
        data
    });
};
