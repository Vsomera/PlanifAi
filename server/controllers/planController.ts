import { Request, Response } from "express"
import { Types } from "mongoose"
import jwt from "jsonwebtoken"
import Plan from "../models/planModels"

declare module 'express' {
    interface Request {
        user?: {
            _id: string
            username: string
            email: string
            iat: number
        }
    }
}

const createPlan = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_name } = req.body

        if (user) {

            const checkExists = await Plan.findOne({ user_id : user._id, plan_name })

            if (checkExists) {
                return res.status(400).json({
                    message : "Could not create plan",
                    error : "Plan already exists"
                })
            }

            const newPlan = await Plan.create({
                user_id: user._id,
                plan_name,
                itinerary: []
            })
    
            if (newPlan) {
                return res.status(201).json({
                    message: "New Plan Created",
                    plan_id: newPlan._id,
                })
            }
            
        } else {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Could not Create Plan",
            err
        })
    }
}

const editPlanName = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id } = req.params
        const { new_plan_name } = req.body

        if (user) {
            const editPlan = await Plan.findOneAndUpdate(
                {
                    _id: plan_id,
                    user_id: user._id
                },
                {
                    plan_name: new_plan_name
                }
            )
            if (editPlan) {
                return res.status(200).json({
                    message: "Plan Name Changed"
                })
            } else {
                return res.status(404).json({
                    message : "Could not Edit Plan",
                    error : "Plan does not exist"
                })
            }
        } else {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Could not Edit Plan",
        })
    }
}

const deletePlanById = async (req : Request, res : Response) => {   
    try {
        const { user } = req
        const { plan_id } = req.params
        
        if (user) {
            const deletePlan = await Plan.findOneAndDelete(
                {
                    _id: plan_id,
                    user_id: user._id
                }
            )
            if (deletePlan) {
                return res.status(200).json({
                    message: `${deletePlan.plan_name} Deleted`
                })
            } else {
                return res.status(404).json({
                    message : "Could not Delete Plan",
                    error : "Plan does not exist"
                })
            }
        } else {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message : "Could not Delete Plan",
            err
        })
    }
}

export default {
    createPlan,
    editPlanName,
    deletePlanById
}