const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const UserModel = require('../../models/user.model');
const {sendMail} = require('../../services/mail.service');

const register = (body) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({email: body.email}, (error, user) => {
            if (error) {
                return reject(error);
            } else if (user) {
                return reject('User already registerd.');
            } else {
                bcrypt.hash(body.password, 10).then((hashedPwd) => {
                    const confirmationHash = randomstring.generate({length: 20});
                    body.password = hashedPwd;
                    body.confirmed = false;
                    body.confirmationHash = confirmationHash;

                    return UserModel.create(body).then((mongoResponse) => {
                        const emailData = {
                            recipient: mongoResponse.email,
                            subject: `Sneakers & Go - Confirmation de votre e-mail`,
                            title: `Bienvenue ${mongoResponse.firstname}`,
                            content: `<p>Félicitations, vous venez de créer votre compte sur Sneakers & Go ! Merci de confirmer votre compte pour pouvoir utiliser l'application et vous connecter à votre compte.</p>`,
                            btnText: "Confirmer",
                            btnLink: `${process.env.API_URL}/auth/confirmation/${confirmationHash}`
                        };

                        sendMail(emailData);

                        return resolve(mongoResponse);
                    }).catch((mongoResponseErr) => {
                        return reject(mongoResponseErr);
                    });
                }).catch((hashedErr) => {
                    return reject(hashedErr);
                });
            }
        });
    });
};

const login = (body) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({email: body.email}, (error, user) => {
            if (error) {
                return reject(error);
            } else if (!user) {
                return reject('Unknown user');
            } else if (user.confirmed === false) {
                return reject('Unconfirmed account');
            } else {
                const validPassword = bcrypt.compareSync(body.password, user.password);

                if (!validPassword) {
                    return reject('Wrong password');
                } else {
                    return resolve({
                        user: user,
                        token: user.generateJwt()
                    });
                }
            }
        });
    });
};

const confirmation = (params) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({confirmationHash: params.confirmationHash}, (error, user) => {
            if (error) {
                return reject(error);
            } else if (!user) {
                return reject('Unknown confirmation hash');
            } else {
                user.confirmed = true;
                user.confirmationHash = undefined;
                user.confirmationDate = Date.now();

                user.save().then((mongoResponse) => {
                    resolve(mongoResponse);
                })
            }
        });
    });
};

module.exports = {register, login, confirmation};