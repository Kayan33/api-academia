import nodemailer from 'nodemailer';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';

class EmailService {
  
  async sendResetPasswordEmail(email: string) {
    const user = await prismaClient.aluno.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Usuário não encontrado!");

   
    const token = sign({ sub: user.id }, process.env.JWT_SECRETO as string, { expiresIn: "1h" });

    
    const resetLink = `http://localhost:7777/resetar-senha/${token}`;

 
    const transporter = nodemailer.createTransport({
      host: process.env.MAILERSEND_SMTP_HOST,  
      port: Number(process.env.MAILERSEND_SMTP_PORT),  
      secure: false, 
      auth: {
        user: process.env.MAILERSEND_SMTP_USER,
        pass: process.env.MAILERSEND_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

   
    const mailOptions = {
      from: process.env.EMAIL_FROM, 
      to: email,
      subject: "Redefinição de Senha",
      html: `
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link é válido por <strong>1 hora</strong>.</p>
      `,
    };

   
    try {
      await transporter.sendMail(mailOptions);
      return "E-mail enviado com sucesso!";
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Erro ao enviar e-mail.");
    }
  }
}

export default EmailService;
