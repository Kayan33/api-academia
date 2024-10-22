import { Router } from "express";
import PersonalController from "./controller/personal/personal";
import TreinoController from "./controller/treino/treino";
import ExercicioController from "./controller/exercicio/exercicio";

const router = Router()

router.post('/personal', new PersonalController().cadastro_Personal)
router.get('/personal', new PersonalController().getPersonalTrainers)


router.post('/treino', new TreinoController().cadastro_Treino)
router.get('/treino', new TreinoController().getTreino)

router.post('/exercicio', new ExercicioController().cadastro_Exercicio)
export default router