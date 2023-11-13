import express from "express"
import authMiddleware from "../middleware/authMiddleware"
import planController from "../controllers/planController"
const router = express.Router()


// @ desc Create a plan
// @ route POST /api/plan/
// @ access Private
/*
    {
        plan_name : string
    }
*/
router.post("/", authMiddleware.authenticateToken, planController.createPlan)

// @ desc Edit a plan name
// @ route PUT /api/plan/:plan_id
// @ access Private
/*
    {
        new_plan_name : string
    }
*/
router.put("/:plan_id", authMiddleware.authenticateToken, planController.editPlanName)


// @ desc Edit a plan name
// @ route DELETE /api/plan/:plan_id
// @ access Private
router.delete("/:plan_id", authMiddleware.authenticateToken, planController.deletePlanById)


// @ desc Add a place to the plan itinerary
// @ route POST /api/plan/:plan_name
// @ access Private
/*
    {
        place : {
            location_id : string
            location_name : string
            lat : number
            long : number
            photoUrl? : string
            rating? : number // eg. 5.0, 4.5 
            ranking? : string
            price? : string // eg. $23 - $45
            is_closed : boolean
            date : Date // set by user
        }
    }
*/
router.post("/:plan_id", authMiddleware.authenticateToken, planController.addPlaceToPlan)

    // // Edit places the Itinerary
    // router.put("/:plan_name/:id", authMiddleware.authenticateToken)

// // Delete places in the Itinerary
// router.delete(":plan_name/:id", authMiddleware.authenticateToken)

module.exports = router