import { Request, Response } from "express"
import Plan from "../models/planModels"

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

        if (user) {

            const checkExists = await Plan.findOne({ user_id: user._id, plan_name })

            if (checkExists) {
                return res.status(400).json({
                    message: "Could not create plan",
                    error: "Plan already exists"
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
                    message: "Could not Edit Plan",
                    error: "Plan does not exist"
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

const deletePlanById = async (req: Request, res: Response) => {
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
                    message: "Could not Delete Plan",
                    error: "Plan does not exist"
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
            message: "Could not Delete Plan",
            err
        })
    }
}

const fetchPlacesFromPlanId = async (req : Request, res : Response) => {
    try {
        const { user } = req;
        const { plan_id } = req.params;

        if (!user) {
            return res.status(403).json({
                error: "User not Authorized"
            });
        }

        // check if plan exists
        const plan = await Plan.findOne({ _id: plan_id, user_id: user._id });

        if (!plan) { // if plan doesn't exist
            return res.status(404).json({
                message : "Could not fetch places",
                error: "Plan does not exist or does not belong to the user"
            });
        }

        return res.status(200).json({
            itinerary: plan.itinerary
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Could not fetch places",
            err
        });
    }
};


const addPlaceToPlan = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id } = req.params
        const { place } = req.body

        if (user) {
            const addPlace = await Plan.findOneAndUpdate(
                {
                    _id: plan_id,
                    user_id: user._id,
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
        } else {
            return res.status(403).json({
                message: "User not Authorized"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Could not add Place",
            err
        })
    }
}

const deletePlaceById = async (req: Request, res: Response) => {
    try {
        const { user } = req
        const { plan_id, location_id } = req.params

        if (user) {

            const selectedPlan = await Plan.findOne({
                // check if plan exists
                _id: plan_id,
                user_id: user._id
            });

            // checks itinerary array to see if the place exists
            const placeExists = selectedPlan?.itinerary.findIndex((place) => place.location_id === location_id) !== -1
            
            if (selectedPlan) {
                if (placeExists) {
                    // checks if plan and place exists before executing
                    const deletePlace = await Plan.findOneAndUpdate(
                        {
                            _id: plan_id,
                            user_id: user._id
                        },
                        {
                            // removes places that matches the location_id
                            $pull: { itinerary: { location_id: location_id } }
                        },
                        { new: true })

                    return res.status(200).json({
                        message: `Place Deleted from ${deletePlace?.plan_name}`,
                    })
                } else {
                    return res.status(404).json({
                        message : "Unable to delete place",
                        error : `Place does not exist in ${selectedPlan.plan_name} itinerary`
                    })
                }
            } else {
                return res.status(404).json({
                    error : `Plan does not exist`
                })
            }

        } else {
            return res.status(403).json({
                message: "User not authorized"
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
    fetchPlacesFromPlanId,
    addPlaceToPlan,
    deletePlaceById
}