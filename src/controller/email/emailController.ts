import { Request, Response } from "express";
import EmailServices from "../../services/emailServices/emailServices";

class EmailController {
  async sendResetPasswordEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const emailServices = new EmailServices();
      const message = await emailServices.sendResetPasswordEmail(email);

      return res.status(200).json({success: true, message });
    } catch (error : any) {
      console.error(error);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || "Erro interno do servidor.",
    });
    }
  }
}

export default EmailController;
