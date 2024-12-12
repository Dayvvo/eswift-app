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
        intro: `Welcome to Eswift! We're very excited to have you on board. Your generated password is ${password}. You would be required to change this during your first signup.`,
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
  async propertyCreationEmail(
    emailData: { name: string; email: string }[], // Accept an array of objects with name and email
    smtpConfig?: boolean
  ) {
    // Iterate through each recipient
    for (const recipient of emailData) {
      try {
        // Generate the email template for each recipient
        const html = {
          body: {
            name: recipient.name, // Use recipient's name
            intro: `Thank you for using Eswift! This is to notify that a new property is available for sale in your state or location of interest`,
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help find your dream property.",
          },
        };

        const template = mailGenerator.generate(html);

        // Send the email
        await mailTransport(
          `Eswift<${process.env.SENDING_MAIL}>`,
          recipient.email, // Use recipient's email
          "Eswift Property Update",
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
        intro: `Welcome to Eswift! We're very excited to have you on board. Your referral link is ${`${process.env.FRONTEND_URL}/auth?refcode=${refCode}`}. Share this to invite someone.`,
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
        name,
        intro: `
          <div> Name: ${name} </div>
          <div> Phone: ${phone} </div>
          <div> Reason for inquiry: ${reason} </div>
          <div> How they first heard about eswift: ${contactMode} </>
        `,

        outro: detail,
      },
    };

    const template = mailGenerator.generate(html);
    await mailTransport(
      `Eswift<${process.env.SENDING_MAIL}>`,
      `${process.env["SENDING_MAIL"]}`,
      `You were contacted from e-swiftproperties.com`,
      html,
      { smtpConfig: true }
    );
  }
}

export const mailGenMails = new MailgenMails();
