import { mailTransport } from "../config/google0athMail.config";
import { mailGenerator } from "../config/mailgen.config";

class MailgenMails {
  async updatePassword(
    name: string,
    email: string,
    password: string,
    smtpConfig?: boolean
  ) {
    
    const html = {
      body: {
        name,
        intro:  `Welcome to Eswift! We're very excited to have you on board. Your generated password is <strong>${password}</strong>. You would be required to change this during your first signup  ${`${process.env.BACKEND_URL}/admin`}.`,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const template = mailGenerator.generate(html);
    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      email,
      "Eswift Password Update",
      template,
      {
        smtpConfig,
      }
    );
  }
  async forgotPassword(
    name: string,
    email: string,
    token: string,
    smtpConfig?: boolean
  ) {
    
    const html = {
      body: {
        name,
        intro: `We received a request to reset your password. No worries—we're here to help! Click the link below to set a new password:`,
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#22BC66",
            text: "Reset Password",
            link: `${process.env.BACKEND_URL}/forgot-password/${token}`,
          },
        },
        outro: `If you did not request this, please ignore this email. Your account remains secure.  
        Need any help? Just reply to this email—we're happy to assist!`,
      },
    };
    

    const template = mailGenerator.generate(html);
    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      email,
      "Eswift Forgot Password",
      template,
      {
        smtpConfig,
      }
    );
  }
  
  async propertyCreationEmail(
    emailData: { name: string; email: string }[], 
    propertyName: string, 
    newPropertyid: string,
    smtpConfig?: boolean
  ) {
    
    for (const recipient of emailData) {
      try {
        const html = {
          body: {
            name: recipient.name,
            intro: `Exciting news! A new property, **${propertyName}**, has just been listed in your preferred location.`,
            action: {
              instructions: "Don't miss out on this opportunity! Click the button below to view the property details:",
              button: {
                color: "#0073e6",
                text: "View Property",
                link: `${process.env.BACKEND_URL}/properties/${newPropertyid}`,
              },
            },
            outro:
              "If you have any questions, feel free to reply to this email. We're happy to assist you!",
          },
        };
  
        const template = mailGenerator.generate(html);
  
        // Send the email
        await mailTransport(
          `Eswift <${process.env.SENDING_MAIL}>`,
          recipient.email, // Use recipient's email
          `New Property Alert: ${propertyName}`,
          template,
          {
            smtpConfig,
          }
        );
  
        console.log(`Email sent successfully to ${recipient.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
      }
    }
  }
  
  
  async refLink(
    name: string,
    email: string,
    refCode: string,
    smtpConfig?: boolean
  ) {
    const html = {
      body: {
        name,
        intro: `Welcome to Eswift! We're very excited to have you on board. Your referral link is ${`${process.env.BACKEND_URL}/auth?refcode=${refCode}`}. Share this to invite someone.`,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const template = mailGenerator.generate(html);
    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      email,
      "Eswift Referral",
      template,
      {
        smtpConfig,
      }
    );
  }

  async contactEswiftTemplate(
    name: string,
    email: string,
    phone: string,
    reason: string,
    contactMode: string,
    detail: string
  ) {
    const html = {
      body: {
        name: "Eswift Support Team", // Display recipient name as Eswift support
        intro: `
          <p>Hello Eswift Team,</p>
          <p>You have received a new customer inquiry. Below are the details:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Reason for Inquiry:</strong> ${reason}</li>
            <li><strong>How they heard about Eswift:</strong> ${contactMode}</li>
          </ul>
        `,
        action: {
          instructions:
            "Please review the user's message below and follow up as necessary.",
        },
        outro: `<p>${detail}</p>`,
      },
    };

    await mailTransport(
      `${name}<${email}>`,
      `${process.env["SENDING_MAIL"]}`,
      `Customer Inquiry: ${reason}`,
      html,
      { smtpConfig: true }
    );
  }
}

export const mailGenMails = new MailgenMails();
