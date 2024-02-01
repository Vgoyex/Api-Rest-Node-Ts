import { Request, Response } from "express";

class ICitys {
    public name: string | undefined;
}

export const create = (req: Request<{}, {}, ICitys>,res: Response) => {

    const data: ICitys = req.body;

    console.log(data.name);

    return res.send({
        id:"xpto",
        data
    });
};
