import nodemailer from 'nodemailer';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';

class EmailService {
  
   transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });
  }

  async getUserByEmail(email: string) {
    return prismaClient.aluno.findUnique({ where: { email } });
  }

  async getPersonalByEmail(email: string) {
    return prismaClient.personal.findUnique({ where: { email } });
  }

  generateResetToken(userId: string) {
    return sign({ sub: userId }, process.env.JWT_SECRETO as string, { expiresIn: "1h" });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `"Sistema para Personal" <${process.env.SMTP_EMAIL}>`, 
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return "E-mail enviado com sucesso!";
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Erro ao enviar e-mail.",);
    }
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.getUserByEmail(email);
    const personal = await this.getPersonalByEmail(email)
    if (!user && !personal) {
      throw { status: 404, message: 'Usuário ou Personal não encontrado!' };
    }

  
    const resetUser = user || personal;  
  

    if (!resetUser) {
      throw new Error('Usuário ou Personal não encontrado!');
    }

    const token = this.generateResetToken(resetUser.id);
    const resetLink = `http://localhost:3000/Troca-senha/${token}`;

    const emailContent = `
      <p>Olá,</p>
      <p>Você solicitou a redefinição de senha.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">Redefinir Senha</a>
      <p>Este link é válido por <strong>1 hora</strong>.</p>
    `;

    return this.sendEmail(email, "Redefinição de Senha", emailContent);
  }
}

export default EmailService;
