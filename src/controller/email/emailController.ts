import { Request, Response } from "express";
import EmailServices from "../../services/emailServices/emailServices";

class EmailController {
  async sendResetPasswordEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const emailServices = new EmailServices();
      const message = await emailServices.sendResetPasswordEmail(email);

      return res.status(200).json({ message });
    } catch (error) {
      console.log(error);
      
      return res.status(400).json({ error: "Erro ao enviar E-mail" ,});
    }
  }
}

export default EmailController;
