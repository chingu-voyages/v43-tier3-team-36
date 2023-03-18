import { Router } from "express";
import { logout, register, signin } from "../../controllers/user.controller";
import validateSchema from "../../middleware/validateSchema";
import { UserOptionalDefaultsSchema } from "../../schemas";
import { z } from "zod";
import { isLoggedIn } from "../../middleware/isLoggedIn";
import { authPassportLocal } from "../../middleware/authPassportLocal";
const router = Router();

// Auth
router.post('/register', validateSchema(z.object({body: UserOptionalDefaultsSchema})), register);
router.post('/signin', validateSchema(z.object({body: UserOptionalDefaultsSchema})), authPassportLocal);
router.post('/logout', isLoggedIn, logout);



export default router;