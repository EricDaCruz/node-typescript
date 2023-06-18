import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICity {
  name: string;
  state: string;
}
interface IFilter {
  filter?: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    //Validando mais de um campo
    const errors: Record<string, string> = {};
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
};

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, { abortEarly: false });
    next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    //Validando mais de um campo
    const errors: Record<string, string> = {};
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
};

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const data = req.body;

  return res.send(data);
};
