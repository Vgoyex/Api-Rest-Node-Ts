import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICitys {
    name: string;
}

const bodyValidation: yup.ObjectSchema<ICitys> =  yup.object().shape({
    name: yup.string().required().min(3),
})


export const create = async (req: Request<{}, {}, ICitys>,res: Response) => {

    try{
        let validatedBody = await bodyValidation.validate(req.body);
        // console.log(validatedBody.name);
        return res.send({
            id:"xpto",
            data: req.body
        });

    }catch(err){
        const yupError = err as yup.ValidationError;
        return res.status(StatusCodes.BAD_REQUEST).json({
            response:{
                id: "xpto",
                error: yupError.message,
                received: {
                    body: req.body
                }
            },
        });
    }

    
    
    
};
