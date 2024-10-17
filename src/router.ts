import { Router } from "express";
import PersonalController from "./controller/personal";

const router = Router()

router.post('/personal', new PersonalController().cadastroPersonal)
router.get('/personal', new PersonalController().getPersonalTrainers)

export default router