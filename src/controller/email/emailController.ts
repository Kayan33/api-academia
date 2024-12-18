import { Request, Response } from "express";
import EmailServices from "../../services/emailServices/emailServices";

class EmailController {
  async sendResetPasswordEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      // Instanciar o serviço de e-mail
      const emailServices = new EmailServices();
      
      // Chamar o método para enviar o e-mail
      const message = await emailServices.sendResetPasswordEmail(email);

      return res.status(200).json({ message });
    } catch (error) {
      // Verificar se o erro possui mensagem detalhada
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      
      console.error("Erro ao enviar e-mail:", error); // Log detalhado no console
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export default EmailController;
