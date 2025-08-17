import { Router } from "express";
import {createNotebook, getNotebook, updateNotebook} from '../controllers/api.controller.js'
const router = Router()


router.get("/create",createNotebook)
router.post("/notebook",getNotebook)
router.post("/update",updateNotebook)

export default router;
