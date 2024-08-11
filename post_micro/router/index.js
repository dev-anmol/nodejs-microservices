import {Router} from "express"
import postRoute from "./postRoutes.js"


const router = Router();

router.post("/api", postRoute)

export default router