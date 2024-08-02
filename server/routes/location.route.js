import { Router } from "express";
import {addLocation, getLocation} from "../controllers/location.controller.js";

const locationRouter = Router();

locationRouter
    .post("/", addLocation)
    .get("/:id",getLocation)


export { locationRouter }