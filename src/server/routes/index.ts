import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesController } from "./../controllers";
import { peopleController } from "./../controllers";

const router = Router();

router.get("/", (req,res) => {
  return res.send("RESP GET");
});

router.post("/citys", cidadesController.create);

router.post("/people", peopleController.create);

router.get("/test", (req,res) => {
    console.log("RES test");
    return res.status(StatusCodes.ACCEPTED).json(req.body);
});






export { router };
