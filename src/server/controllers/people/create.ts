import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware/validation";
import * as yup from "yup";

interface IPeople {
  name: string;
}

const bodyValidation: yup.ObjectSchema<IPeople> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const createValidation = validation((getAllSchemas) => ({
  body: getAllSchemas<IPeople>(bodyValidation),
}));

export const create = async (req: Request<{}, {}, IPeople>, res: Response) => {
  return res.send({
    response: {
      id: "xpto",
      received: {
        body: req.body,
      },
    },
  });

  console.log(req.body);
};
