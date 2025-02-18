import express from 'express';
import * as ReadController from "./controllers/read-controller";
const router = express.Router();

router.get('/adduser', ReadController.addMsgToRequest)
router.get('/usernames/:username', ReadController.getEmailByUsername)


export default router;