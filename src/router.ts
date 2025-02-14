import { Router } from "express";
import PersonalController from "./controller/personal/personal";
import TreinoController from "./controller/treino/treino";
import ExercicioController from "./controller/exercicio/exercicio";
import AlunoController from "./controller/aluno/aluno";
import CategoriaController from "./controller/categoria/categoria";
import { loginController } from "./controller/login/loginController";
import EmailController from "./controller/email/emailController";
import RotinaExercicioController from "./controller/rotina/rotina";
import { estaAutenticado } from "./middleware/estaAutenticado";

const router = Router()

router.post('/CadastrarAluno', new AlunoController().cadastro_Aluno)
router.get('/Consultaraluno', new AlunoController().get_Aluno)
router.post('/ConsultarAlunoUnico/:id', new AlunoController().consultarUsuariosUnico)
router.put('/AlterarDadosAluno/:id', new AlunoController().alterarDadosUsuarios)
router.delete('/ApagarAluno/:id', new AlunoController().apagarUsuarios)

router.post('/CadastrarPersonal', new PersonalController().cadastro_Personal)
router.get('/ConsultarPersonal', new PersonalController().getPersonalTrainers)
router.put('/AlterarDadosPersonal/:id', new PersonalController().alterarDadosPersonal)
router.post('/ConsultarPersonalUnico/:id',new PersonalController().consultarUsuariosUnico)
router.post('/consultarPersonalComAlunoUnico/:personalId/:alunoId/',new PersonalController().consultarPersonalComAlunoUnico)

router.delete('/ApagarPersonal/:id', new PersonalController().apagarPersonal)


router.post('/treino/:alunoID/:personalID',new TreinoController().cadastro_Treino)
router.get('/treino', new TreinoController().getTreino)
router.get('/consultartreinolUnico/:id', new TreinoController().consultarTreinoUnico)
router.delete('/ApagarTreino/:id', new TreinoController().DeleteTreino)

router.post('/rotinaExercicio/:treinosID', new RotinaExercicioController().cadastro_RotinaExercicio)
router.put('/AlterarotinaExercicio/:id', new RotinaExercicioController().altera_RotinaExercicio)

router.post('/CadastrarExercicios', new ExercicioController().cadastro_Exercicio)
router.get('/ConsultarTodosExercicios', new ExercicioController().getExercicios)
router.post('/ConsultarExerciciosUnico/:id', new ExercicioController().consultarExerciciosUnico)
router.put('/AlterarDadosExercicios/:id', new ExercicioController().alterarDadosExercicios)
router.delete('/ApagarExercicios/:id', new ExercicioController().apagarExercicios)

router.post('/CadastrarCategoria', new CategoriaController().cadastro_Categoria)
router.get('/ConsultarTodosCategoria', new CategoriaController().getCadastro)
router.get('/ConsultarCategoriaPorPersonal/:personalID/:categoriaID', new CategoriaController().getCategoriaByPersonalAnd);
router.post('/ConsultarCategoriaUnico/:id', new CategoriaController().consultarCategoriaUnico)
router.put('/AlterarDadosCategoria/:id', new CategoriaController().alterarDadosPersonal)
router.delete('/ApagarCategoria/:id', new CategoriaController().apagarPersonal)

router.post('/loginUsuarios', new loginController().loginAluno)
router.get('/verificaToken/:id', new loginController().verificaToken)

router.post("/esqueci-senha", new EmailController().sendResetPasswordEmail);
router.put("/resetar-senha/:token", new AlunoController().resetPassword);


export default router