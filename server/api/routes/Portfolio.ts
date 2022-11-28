import { Router } from "express";
import { Gateway } from "../middlewares/Gateway";
import { Portfolio } from "../controllers/Portfolio";

const portfolioController = new Portfolio();
const gateway = new Gateway();

export const PortfolioRoutes = Router();

PortfolioRoutes.get("/projects", gateway.execute, portfolioController.readMany);
