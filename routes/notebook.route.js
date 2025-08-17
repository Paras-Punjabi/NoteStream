import {Router} from 'express'
import { renderNotebook } from '../controllers/notebook.controller.js'
const router = Router()

router.get("/:id",renderNotebook)

export default router