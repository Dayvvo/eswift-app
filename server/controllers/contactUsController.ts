import { Request, Response } from "express";
// import sendEmail from "../utils/service/email";
import { validateMailbody } from "../utils/validation";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { MailType } from "../utils/interfaces/mailtype.interface";
import { mailGenMails } from "../utils/mails/mailgen.mail";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sendEmailFunction = async ({
  email,
  firstName,
  lastName,
  message,
  phoneNumber,
  inquiryType,
  howDidYouHear,
}: MailType) => {
  // const mailOptions = {
  //   from: `${firstName} ${lastName} <${email}>`,
  //   to: process.env.CLIENT_EMAIL,
  //   subject: inquiryType,
  //   name: `${firstName} ${lastName}`,
  //   text: `
  //     Name: ${firstName} ${lastName}
  //     Email: ${email}
  //     Phone Number: ${phoneNumber}
  //     Inquiry Type: ${inquiryType}
  //     How did you hear about us: ${howDidYouHear}    
  //     Message: ${message}
  //   `,
  //   replyTo: email,
  // };

  try {
    // const send = await transporter.sendMail(mailOptions);

    const send = await mailGenMails.contactEswiftTemplate(
      `${firstName} ${lastName}`,
      email,
      phoneNumber,
      inquiryType,
      howDidYouHear,
      message
    );
    return send;
  } catch (error: any) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

class ContactUsController {
  sendEmail = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateMailbody(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const mailSent = await sendEmailFunction(value);
      return res.status(201).json({
        message: "Email sent successfully",
        data: mailSent,
      });
    } catch (error) {
      res.status(500).send("Failed to send email");
    }
  };
}

let contactUsController = new ContactUsController();

export default contactUsController;
