import express from "express";
import {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
} from "../controllers/announcement.controllers.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middlewares.js";


const router = express.Router();


router.post("/create", authenticate, authorizeRoles("ADMIN"), createAnnouncement); 
router.get("/get-all", authenticate, getAllAnnouncements); 
router.get("/:id", authenticate, getAnnouncementById); 
router.put("/:id", authenticate, authorizeRoles("ADMIN"), updateAnnouncement); 
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    deleteAnnouncement,
);

export default router;
