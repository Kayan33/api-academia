import { Router } from "express";
import PersonalController from "./controller/personal/personal";
import TreinoController from "./controller/treino/treino";
import ExercicioController from "./controller/exercicio/exercicio";
import AlunoController from "./controller/aluno/aluno";
import RotinaController from "./controller/rotina/rotina";

const router = Router()

router.post('/aluno', new AlunoController().cadastro_Aluno)

router.post('/personal', new PersonalController().cadastro_Personal)
router.get('/personal', new PersonalController().getPersonalTrainers)


router.post('/treino', new TreinoController().cadastro_Treino)
router.get('/treino', new TreinoController().getTreino)

router.post('/rotina', new RotinaController().cadastro_Rotina)

router.post('/exercicio', new ExercicioController().cadastro_Exercicio)
export default router