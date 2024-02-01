import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


interface IHome {
    name: string;
}

const bodyValidation: yup.ObjectSchema<IHome> = yup.object().shape({
    name: yup.string().required().min(3),
});

const create = async (req: Request<{},{},IHome>, res: Response) => {

    try{
        await bodyValidation.validate(req.body);
        return res.send({
            id: "xpto",
            response: req.body
        });
    }catch(err){
        const yupError = err as yup.ValidationError;
        return res.status(StatusCodes.BAD_REQUEST).json({
            response: {
                id: "xpto",
                error: yupError.message,
                received: {
                    body: req.body,
                }
            }
        })
    }
    
}



