import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req,res) => {
  return res.send("RESP GET");
});

router.post("/post", (req,res) => {
  console.log(req.body);
  
  return res.json(req.body);    
})

router.get("/test", (req,res) => {
    console.log("RES test");
    return res.status(StatusCodes.ACCEPTED).json(req.body);
})




export { router };