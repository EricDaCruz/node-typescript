import { Request, Response, Router } from "express";

import { CitiesController } from "../../controllers";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("Hello Dev!");
});

router.get(
  "/cities",
  CitiesController.getAllValidator,
  CitiesController.getAll
);
router.post(
  "/cities",
  CitiesController.createValidator,
  CitiesController.create
);


export { router };
