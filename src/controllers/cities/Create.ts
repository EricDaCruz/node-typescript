import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface ICity {
  name: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const createValidator = validation({
  body: bodyValidation,
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const data = req.body;

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(`Not implemented yet: ${JSON.stringify(data)}`);
};
