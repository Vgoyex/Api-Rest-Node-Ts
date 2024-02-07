import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware/validation";
import * as yup from "yup";

interface IHome {
  name: string;
}

interface IFilter {
  filter?: string;
}

const bodyValidation: yup.ObjectSchema<IHome> = yup.object().shape({
  name: yup.string().required().min(3),
});

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().min(3),
});

export const createValidation = validation((getAllSchemas) => ({
  body: getAllSchemas<IHome>(bodyValidation),
  query: getAllSchemas<IFilter>(queryValidation),
}));

export const create = async (req: Request<{}, {}, IHome>, res: Response) => {
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
