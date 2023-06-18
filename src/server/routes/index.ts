import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "../../controllers";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("Hello Dev!");
});

router.post(
  "/cities",
  CitiesController.createBodyValidator,
  CitiesController.createQueryValidator,
  CitiesController.create
);


export { router };
