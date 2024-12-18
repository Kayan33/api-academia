import { Router } from "express";
import PersonalController from "./controller/personal/personal";
import TreinoController from "./controller/treino/treino";
import ExercicioController from "./controller/exercicio/exercicio";
import AlunoController from "./controller/aluno/aluno";
import RotinaController from "./controller/rotina/rotina";
import CategoriaController from "./controller/categoria/categoria";
import { loginController } from "./controller/login/loginController";
import { estaAutenticado } from "./middleware/estaAutenticado";
import EmailController from "./controller/email/emailController";

const router = Router()

router.post('/CadastrarAluno', new AlunoController().cadastro_Aluno)
router.get('/Consultaraluno', new AlunoController().get_Aluno)
router.post('/ConsultarAlunoUnico/:id', new AlunoController().consultarUsuariosUnico)
router.put('/AlterarDadosAluno/:id', new AlunoController().alterarDadosUsuarios)
router.delete('/ApagarAluno/:id', new AlunoController().apagarUsuarios)

router.post('/CadastrarPersonal', new PersonalController().cadastro_Personal)
router.get('/ConsultarPersonal', new PersonalController().getPersonalTrainers)
router.put('/AlterarDadosPersonal/:id', new PersonalController().alterarDadosPersonal)
router.post('/ConsultarPersonalUnico/:id', new PersonalController().consultarUsuariosUnico)
router.put('/AlterarDadosPersonal/:id', new PersonalController().alterarDadosPersonal)
router.delete('/ApagarPersonal/:id', new PersonalController().apagarPersonal)


router.post('/treino', new TreinoController().cadastro_Treino)
router.get('/treino', new TreinoController().getTreino)

router.post('/rotina', new RotinaController().cadastro_Rotina)
router.get('/rotina', new RotinaController().getRotina)

router.post('/exercicio', new ExercicioController().cadastro_Exercicio)
router.get('/exercicio', new ExercicioController().getTreino)

router.post('/categoria', new CategoriaController().cadastro_Categoria)
router.get('/categoria', new CategoriaController().getCadastro)

router.post('/loginUsuarios', new loginController().loginAluno)
router.get('/verificaToken', new loginController().verificaToken)

router.post("/esqueci-senha", new EmailController().sendResetPasswordEmail);
router.post("/resetar-senha/:token", new AlunoController().resetPassword);


export default router