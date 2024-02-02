import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICitys {
    name: string;
}

const bodyValidation: yup.ObjectSchema<ICitys> =  yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(3),
})


export const create = async (req: Request<{}, {}, ICitys>,res: Response) => {

    let validatedData: ICitys | undefined = undefined;
    try{
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
        // console.log(validatedBody.name);
        return res.send({
            id:"xpto",
            data: req.body
        });

    }catch(err){
        const yupError = err as yup.ValidationError;
        const validationErrors: Record<string, string> = {} 
        
        //All possible error will be at validationErrors
        yupError.inner.forEach(err => {
            if(!err.path) return
            validationErrors[err.path] = err.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({
            response:{
                id: "xpto",
                error: validationErrors,
                received: {
                    body: req.body
                }
            },
        });
    }

    
    
    
};
