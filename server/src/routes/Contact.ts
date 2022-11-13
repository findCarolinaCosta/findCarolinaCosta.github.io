import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { Contact } from "../controllers/Contact";

const contactController = new Contact();
const gateway = new Gateway();

export const ContactRoutes = Router();

ContactRoutes.post("/contact", gateway.execute, contactController.create);
