import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TField = "body" | "query" | "params" | "header";

type TGetSchemas = (schema: any) => Schema<any>;

type TAllSchemas = Record<TField, Schema<any>>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errosResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(async ([key, schema]) => {
    try {
      await schema.validateSync(req[key as TField], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      //Validando mais de um campo
      const errors: Record<string, string> = {};
      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });

      errosResult[key] = errors;
    }
  });

  if (Object.entries(errosResult).length === 0) {
    next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errosResult,
    });
  }
};
