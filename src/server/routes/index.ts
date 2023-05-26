import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("Hello Dev!");
});

router.post("/test/:id", (req: Request, res: Response) => {
  const name = req.body.name;
  const id = req.params.id;
  const message = req.query.message;
  return res
    .status(StatusCodes.CREATED)
    .json({ message: `Hello ${name} your id is ${id}. You say ${message}` });
});

export { router };
