import { Router } from "express";
import { userIdUpload } from "../controllers/user.controller.js";
const router = Router();

router.route("/process").post(userIdUpload);
export default router;
