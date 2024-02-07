import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesController } from "./../controllers";
import { peopleController } from "./../controllers";
import { homeController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("RESP GET");
});

router.post(
  "/citys",
  cidadesController.createValidation,
  cidadesController.create
);

router.post(
  "/people",
  peopleController.createValidation,
  peopleController.create
);

router.post("/home", homeController.createValidation, homeController.create);

router.get("/test", (req, res) => {
  console.log("RES test");
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
