const express=require("express");
const {handledEventController, handledEventListController, handledEventDeleteController, handledEventUpdateController}=require("../controller/EventController");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Router is working")
})

//addEvent
router.post("/addEvent",handledEventController);

//get Event list
router.get("/Eventlist",handledEventListController)

//deleteEvent 
router.delete("/deleteEvent",handledEventDeleteController)
//updateEvent
router.put("/updateEvent", handledEventUpdateController);
//router.
module.exports=router;