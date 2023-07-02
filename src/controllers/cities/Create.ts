import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

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
  filter: yup.string().optional().min(3),
});

export const createValidator = validation({
  body: bodyValidation,
  query: queryValidation,
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const data = req.body;

  return res.send(data);
};
