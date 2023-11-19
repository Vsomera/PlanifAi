import { Request, Response } from "express"
import Plan from "../models/planModels"
import User from "../models/userModels"

declare module 'express' {
    interface Request {
        user?: {
            _id: string
            email: string
            iat: number
        }
    }
}

const createPlan = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_name } = req.body

        const userExists = await User.findOne({ _id: user?._id })
        if (!userExists) {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }

        const planExists = await Plan.findOne({ user_id: user?._id, plan_name })
        if (planExists) {
            return res.status(400).json({
                message: "Could not create plan",
                error: "Plan already exists"
            })
        }

        const newPlan = await Plan.create({
            user_id: user?._id,
            plan_name,
            itinerary: []
        })

        return res.status(201).json({
            message: "New Plan Created",
            plan_id: newPlan._id,
        })

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

        const userExists = await User.findOne({ _id: user?._id })
        if (!userExists) {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }
        
        const planExists = await Plan.findOne({ _id : plan_id, user_id : user?._id })
        if (planExists) {
            const editPlan = await Plan.findOneAndUpdate(
                {
                    _id: plan_id,
                    user_id: user?._id
                },
                {
                    plan_name: new_plan_name
                }
            )
            if (editPlan) {
                return res.status(200).json({
                    message: "Plan Name Changed"
                })
            } 
        } else {
            return res.status(404).json({
                message: "Could not Edit Plan",
                error: "Plan does not exist"
            })
        }
       
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Could not Edit Plan",
            err
        })
    }
}

const deletePlanById = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id } = req.params


        const userExists = await User.findOne({ _id: user?._id })
        if (!userExists) {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }
        
        const deletePlan = await Plan.findOneAndDelete(
            {
                _id: plan_id,
                user_id: user?._id
            }
        )
        if (deletePlan) {
            return res.status(200).json({
                message: `${deletePlan.plan_name} Deleted`
            })
        } else {
            return res.status(404).json({
                message: "Could not Delete Plan",
                error: "Plan does not exist"
            })
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Could not Delete Plan",
            err
        })
    }
}

const fetchPlansFromUserId = async (req : Request, res : Response) => {
    try {
        const { user } = req;

        const userExists = await User.findOne({ _id : user?._id})
        if (!userExists) {
            return res.status(403).json({
                error: "User not Authorized"
            });
        }

        const plans = await Plan.find({ user_id: user?._id })

        return res.status(200).json({
            plans
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Could not fetch plans",
            err
        })
    }
};


const addPlaceToPlan = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id } = req.params
        const { place } = req.body

        const userExists = await User.findOne({ _id : user?._id})
        if (!userExists) {
            return res.status(403).json({
                error: "User not Authorized"
            });
        }
        const addPlace = await Plan.findOneAndUpdate(
            {
                _id: plan_id,
                user_id: user?._id,
            },
            {
                // appends place object to itinerary array
                $push: { itinerary: place }
            }
        )
        if (addPlace) {
            return res.status(201).json({
                message: `${place.location_name} added to itinerary`
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Could not add Place",
            err
        })
    }
}

const deletePlaceById = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id, location_id } = req.params

        const userExists = await User.findOne({ _id : user?._id})
        if (!userExists) {
            return res.status(403).json({
                error: "User not Authorized"
            });
        }

        const selectedPlan = await Plan.findOne({ _id: plan_id, user_id: user?._id })
        const placeExists = selectedPlan?.itinerary.findIndex((place) => place.location_id === location_id) !== -1
        
        if (selectedPlan) {
            if (placeExists) {
                const deletedPlace = await Plan.findOneAndUpdate(
                    {
                        _id: plan_id,
                        user_id: user?._id
                    },
                    {
                        // removes places that matches the location_id
                        $pull: { itinerary: { location_id: location_id } }
                    },
                    { new: true })
                return res.status(200).json({
                    message: `Place Deleted from ${deletedPlace?.plan_name}`,
                })
            } else {
                return res.status(404).json({
                    message : "Unable to delete place",
                    error : `Place does not exist in ${selectedPlan.plan_name} itinerary`
                })
            }
        } else {
            return res.status(404).json({
                message : "Unable to delete place",
                error : `Plan does not exist`
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Could not remove Place",
            err
        })
    }
}

export default {
    createPlan,
    editPlanName,
    deletePlanById,
    fetchPlansFromUserId,
    addPlaceToPlan,
    deletePlaceById
}