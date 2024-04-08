const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
//const { options } = require('../app');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Natours web app <natours@webapp.io>';
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      ///Brevo
      return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: process.env.BREVO_USERNAME, // YOUR LOGIN EMAIL on BREVO
          pass: process.env.BREVO_PASSWORD, // BREVO SMTP KEY
        },
      });
    }
    ///Create transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  ///Send the actual email
  async send(template, subject) {
    ///Render HTML based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      { firstName: this.firstName, url: this.url, subject },
    );

    ///Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    ///Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Web App');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 mins)',
    );
  }
};
