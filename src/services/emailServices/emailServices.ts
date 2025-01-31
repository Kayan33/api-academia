import nodemailer from 'nodemailer';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';

class EmailService {
  
  private transporter;

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

  private async getUserByEmail(email: string) {
    return prismaClient.aluno.findUnique({ where: { email } });
  }

  private async getPersonalByEmail(email: string) {
    return prismaClient.personal.findUnique({ where: { email } });
  }

  private generateResetToken(userId: string) {
    return sign({ sub: userId }, process.env.JWT_SECRETO as string, { expiresIn: "1h" });
  }

  private async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
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

  public async sendResetPasswordEmail(email: string) {
    const user = await this.getUserByEmail(email);
    const personal = await this.getPersonalByEmail(email)
    if (!user && !personal) throw new Error('Usuário ou Personal não encontrado!');

  
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
