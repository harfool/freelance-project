import express from "express";
import {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
} from "../controllers/announcement.controllers.js";


const router = express.Router();


router.post("/create", createAnnouncement); 
router.get("/get-all", getAllAnnouncements); 
router.get("/:id", getAnnouncementById); 
router.put("/:id", updateAnnouncement); 
router.delete("/:id", deleteAnnouncement);

export default router;
