import { Router } from "express";
import { Health } from "../controllers/Health";
import { Gateway } from "../middlewares/Gateway";

const gateway = new Gateway();

export const HealthRoutes = Router();

HealthRoutes.get("/health", gateway.execute, Health.check);
