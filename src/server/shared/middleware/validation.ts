import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: Schema<T>) => Schema<unknown>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TAllSchemas = Record<TProperty, Schema<unknown>>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
      // return next();
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
      //All possible error will be at validationErrors
      yupError.inner.forEach((err) => {
        if (!err.path) return;
        errors[err.path] = err.message;
      });
      errorsResult[key as string] = errors;
    }
  });
  if (Object.entries(errorsResult).length == 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      response: {
        id: "xpto",
        error: errorsResult,
        received: {
          body: req.body,
        },
      },
    });
  }
};
