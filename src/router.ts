import { Router } from "express";
import PersonalController from "./controller/personal";

const router = Router()

router.post('/personal', new PersonalController().cadastroPersonal)

export default router