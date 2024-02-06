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
  cidadesController.createBodyValidator,
  cidadesController.createQueryValidator,
  cidadesController.create
);

router.post("/people", peopleController.create);

router.post(
  "/home",
  homeController.createBodyValidator,
  homeController.createQueryValidator,
  homeController.create,
);

router.get("/test", (req, res) => {
  console.log("RES test");
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
