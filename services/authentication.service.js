const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const UserModel = require('../models/user.model');

const authJwt = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
            if (err) { return done(err, false)}
            if (user) { return done(null, user) }
            else { return done(null, false) }
        });
    }));
};

module.exports = {
    setAuthentication: (passport) => {
        authJwt(passport);
    },
};