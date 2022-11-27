import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { Service } from "../controllers/Service";

const serviceController = new Service();
const gateway = new Gateway();

export const serviceRoutes = Router();

serviceRoutes.get("/services", gateway.execute, serviceController.readMany);
