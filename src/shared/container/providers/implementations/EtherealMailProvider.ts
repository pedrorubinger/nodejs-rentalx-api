import fs from "fs"
import Handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"
import { injectable } from "tsyringe"

import { IMailProvider } from "../MailProvider/IMailProvider"

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((err) => console.log("[ERROR]: Error on send email:", err))
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")
    const templateParse = Handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)
    const message = await this.client.sendMail({
      subject,
      to,
      from: "Rentalx - <noreply@rentx.com.br",
      html: templateHTML,
    })

    console.log("Message sent:", message.messageId)
    console.log("Preview URL:", nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }
