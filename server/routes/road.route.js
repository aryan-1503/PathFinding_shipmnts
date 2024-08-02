import { Router } from "express";
import {addRoad, generateTrafficReport, getShortestPath, updateTraffic} from "../controllers/road.controller.js";

const roadRouter = Router();

roadRouter.post("/", addRoad);
roadRouter.patch("/traffic-updates",updateTraffic)
roadRouter.get("/shortest-path",getShortestPath)
roadRouter.get("/report/traffic",generateTrafficReport)

export { roadRouter }

