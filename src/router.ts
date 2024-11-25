import { Router } from "express";
import PersonalController from "./controller/personal/personal";
import TreinoController from "./controller/treino/treino";
import ExercicioController from "./controller/exercicio/exercicio";
import AlunoController from "./controller/aluno/aluno";
import RotinaController from "./controller/rotina/rotina";
import CategoriaController from "./controller/categoria/categoria";
import { loginController } from "./controller/login/loginController";
import { estaAutenticado } from "./middleware/estaAutenticado";

const router = Router()

router.post('/aluno', new AlunoController().cadastro_Aluno)

router.post('/personal', new PersonalController().cadastro_Personal)
router.get('/personal', new PersonalController().getPersonalTrainers)


router.post('/treino',estaAutenticado, new TreinoController().cadastro_Treino)
router.get('/treino',estaAutenticado, new TreinoController().getTreino)

router.post('/rotina',estaAutenticado, new RotinaController().cadastro_Rotina)
router.get('/rotina',estaAutenticado, new RotinaController().getRotina)

router.post('/exercicio', new ExercicioController().cadastro_Exercicio)
router.get('/exercicio', new ExercicioController().getTreino)

router.post('/categoria', new CategoriaController().cadastro_Categoria)
router.get('/categoria', new CategoriaController().getCadastro)

router.post('/loginUsuarios', new loginController().loginAluno)
router.get('/verificaToken', new loginController().verificaToken)


export default router