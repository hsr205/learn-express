import express from "express";
import * as Controller from "../controllers/controller";

const router = express.Router();


router.get('/:username', Controller.getEmailByUsername)


export default router;
