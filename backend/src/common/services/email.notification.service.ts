import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService
  ) {}

  async sendVerificationEmail(toEmail: string, token: string) {
    const authUrl = `${this.configService.get(
      "AUTH_BASE_URL"
    )}/verify-email?token=${token}`;
    const mailOptions = {
      from: '"CourseApp Team" <' + this.configService.get("EMAIL_FROM") + ">",
      to: toEmail, // list of receivers (separated by ,)
      subject: "Please Verify Your Email",
      html: `HI, <br> Thanks for registration. Please verify your email.<br><br>\
             \Please click here to verify your email <br><br><a href=${authUrl}>${authUrl}</a> <br><br><br>Thanks. <br><b>@CourseApp Team</b>`,
    };
    console.log(mailOptions);
    return await this.mailerService
      .sendMail(mailOptions)
      .then((response) => {
        console.log("Email sent successfully", response);
        return true;
      })
      .catch((error: any) => {
        console.log("Email sending failed", error);
        return false;
      });
  }

  async sendForgotPasswordEmail(toEmail: string, token: string) {
    const url = `${this.configService.get(
      "AUTH_BASE_URL"
    )}/reset-password?token=${token}`;
    const mailOptions = {
      from: '"Autohub Team" <' + this.configService.get("EMAIL_FROM") + ">",
      to: toEmail, // list of receivers (separated by ,)
      subject: "Reset password has been requested for your Email",
      html: `HI, <br>Please click here to reset your password <br><br><a href=${url}>${url}</a> <br><br>Thanks. <br><b>@Autohub Team</b>`,
    };
    console.log(mailOptions);
    return await this.mailerService
      .sendMail(mailOptions)
      .then((response) => {
        console.log("Email sent successfully", response);
        return true;
      })
      .catch((error: any) => {
        console.log("Email sending failed", error);
        return false;
      });
  }
}
