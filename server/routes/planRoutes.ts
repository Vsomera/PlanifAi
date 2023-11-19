import express from "express"
import authMiddleware from "../middleware/authMiddleware"
import planController from "../controllers/planController"
const router = express.Router()


// @ desc Create a plan
// @ route POST /api/plan/
// @ access Private
/* REQUEST BODY
    {
        plan_name : string
    }
*/
router.post("/", authMiddleware.authenticateToken, planController.createPlan)

// @ desc Edit a plan name
// @ route PUT /api/plan/:plan_id
// @ access Private
/* REQUEST BODY:
    {
        new_plan_name : string
    }
*/
router.put("/:plan_id", authMiddleware.authenticateToken, planController.editPlanName)


// @ desc Edit a plan name
// @ route DELETE /api/plans/:plan_id
// @ access Private
router.delete("/:plan_id", authMiddleware.authenticateToken, planController.deletePlanById)

// @ desc Fetch all Plan Objects owned by a user_id
// @ router GET /api/plans/
// @ access Private
router.get("/", authMiddleware.authenticateToken, planController.fetchPlansFromUserId)

// @ desc Add a place to the plan itinerary
// @ route POST /api/plans/:plan_name
// @ access Private
/* REQUEST BODY:
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

// TODO
// // Edit places the Itinerary (re-arranging places in itinerary of a given plan)
// router.put("/:plan_name/:id", authMiddleware.authenticateToken)

// @ desc Delete a place in the itinerary array given a location id
// @ route DELETE /api/plans/:plan_id/:location_id
// @ access Private
router.delete("/:plan_id/:location_id", authMiddleware.authenticateToken, planController.deletePlaceById)

module.exports = router