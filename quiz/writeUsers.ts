import express from 'express';
import * as WriteController from "./controllers/write_controller";

const router = express.Router()


router.post('/adduser', WriteController.addUser)


export default router;