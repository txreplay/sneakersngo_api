const nodemailer = require('nodemailer');
const ejs        = require('ejs');

const transporterOptions = {
    host: process.env.MAILER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
};

const transporter = nodemailer.createTransport(transporterOptions);

const sendMail = (emailData) => {
    nodemailer.createTestAccount(() => {
        return new Promise((resolve, reject) => {
            ejs.renderFile('templates/template-email.ejs', {
                title: emailData.title,
                content: emailData.content,
                btnText: emailData.btnText,
                btnLink: emailData.btnLink,
            }, function (error, html_string) {
                if (error) {
                    reject(error);
                }

                let mailOptions = {
                    from: emailData.from || '"Noella de SneakersnGo" <sneakersandgo@gmail.com>',
                    to: emailData.recipient,
                    subject: emailData.subject,
                    html: html_string
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(info);
                });
            });
        });
    });
};

module.exports = {sendMail};