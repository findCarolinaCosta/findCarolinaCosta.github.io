import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { Skill } from "../controllers/Skill";

const skillController = new Skill();
const gateway = new Gateway();

export const SkillRoutes = Router();

SkillRoutes.get("/skills", gateway.execute, skillController.readMany);
