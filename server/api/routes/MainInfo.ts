import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { MainInfo } from "../controllers/MainInfo";

const mainInfoController = new MainInfo();
const gateway = new Gateway();

export const mainInfoRoutes = Router();

mainInfoRoutes.get("/texts", gateway.execute, mainInfoController.read);
