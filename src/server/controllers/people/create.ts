import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface IPeople {
  name: string;
}

const bodyValidation: yup.ObjectSchema<IPeople> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, IPeople>, res: Response) => {
  try {
    const validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
    return res.send({
      id: "xpto",
      response: req.body,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    //All possible error will be at validationErrors
    yupError.inner.forEach((err) => {
      if (!err.path) return;
      validationErrors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      response: {
        id: "xpto",
        error: yupError.message,
        received: {
          body: req.body,
        },
      },
    });
  }

  console.log(req.body.name);
};
