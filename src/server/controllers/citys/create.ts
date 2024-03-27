import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICitys {
  name: string;
  state: string;
}
interface IFilter {
  filter?: string;
  limit?: string;
}

//* The function below ↓
//* Has gone to ./shared/validation
//* And transformed to const createBodyValidation = validation(bodyValidation);
// export const createBodyValidator: RequestHandler = async (req, res, next) => {
//   try {
//     await bodyValidation.validate(req.body, { abortEarly: false });

//     return next();
//   } catch (err) {
//     const yupError = err as yup.ValidationError;
//     const validationErrors: Record<string, string> = {};
//     //All possible error will be at validationErrors
//     yupError.inner.forEach((err) => {
//       if (!err.path) return;
//       validationErrors[err.path] = err.message;
//     });
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       response: {
//         id: "xpto",
//         error: validationErrors,
//         received: {
//           body: req.body,
//         },
//       },
//     });
//   }
// };

//* The function below ↓
//* Has gone to ./shared/validation
//* And transformed to const createValidation = validation(queryValidation);
// export const createQueryValidator: RequestHandler = async (req, res, next) => {
//   try {
//     await queryValidation.validate(req.query, { abortEarly: false });
//     return next();
//   } catch (err) {
//     const yupError = err as yup.ValidationError;
//     const validationErrors: Record<string, string> = {};
//     //All possible error will be at validationErrors
//     yupError.inner.forEach((err) => {
//       if (!err.path) return;
//       validationErrors[err.path] = err.message;
//     });
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       response: {
//         id: "xpto",
//         error: validationErrors,
//         received: {
//           body: req.body,
//         },
//       },
//     });
//   }
// };

const bodyValidation: yup.ObjectSchema<ICitys> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().min(3),
  limit: yup.string().min(1),
});

//* Another way to do createValidation ↓
// export const createValidation = validation({
//   body: yup.object().shape({
//     name: yup.string().required().min(3),
//     state: yup.string().required().min(3),
//   }),
//   query:yup.object().shape({
//     filter: yup.string().min(3),
//   }),
// });

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICitys>(bodyValidation),
  query: getSchema<IFilter>(queryValidation),
}));

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


