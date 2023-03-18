import { Router } from "express";
import APIV1 from "./v1"
const router = Router();

router.use('/v1', APIV1);

export default router;