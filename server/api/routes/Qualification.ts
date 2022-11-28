import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { Qualification } from "../controllers/Qualification";

const qualificationController = new Qualification();
const gateway = new Gateway();

export const qualificationRoutes = Router();

qualificationRoutes.get(
  "/qualifications",
  gateway.execute,
  qualificationController.readMany
);
