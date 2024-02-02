import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICitys {
  name: string;
  state: string;
}

const bodyValidation: yup.ObjectSchema<ICitys> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });

    return next();
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
        error: validationErrors,
        received: {
          body: req.body,
        },
      },
    });
  }
};

interface IFilter {
  filter?: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, { abortEarly: false });
    return next();
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
        error: validationErrors,
        received: {
          body: req.body,
        },
      },
    });
  }
};

//This const and method creation below is the same as "const create = async (req: Request<{}, {}, ICitys>,res: Response)"

export const create = async (req: Request<{}, {}, ICitys>, res: Response) => {
  res.send({
    response: {
      id: "xpto",
      received: {
        body: req.body,
      },
    },
  });

  console.log(req.body);
};
