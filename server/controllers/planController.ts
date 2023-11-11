import { Request, Response } from "express"
import { Types } from "mongoose"
import jwt from "jsonwebtoken"
import hashMiddleware from "../middleware/hashMiddleware"
import Plan from "../models/planModels"

