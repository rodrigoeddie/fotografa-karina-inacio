const errors   = require('restify-errors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../../config')

const User = mongoose.model('User');

const authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //try to fetch user
            const user = await User.findOne({ email })
            
            // Match User email with password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    // Password did not match
                    reject('Failed to authenicate user')
                }
            })
        } catch (err) {
            // Can't find user email
            reject('Sorry, Authentication failed')
        }
    });
}

module.exports = {
    method: 'get',
    path: '/auth',
    name: 'auth user',
    useWrap: true,
    version: 'v1.0.0',
    handler: (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await authenticate(email, password);
          // Create JWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '10m' })
            
            const { iat, exp } = jwt.decode(token);

            // respond with token
            res.send({iat, exp, token})
            console.log(iat, exp, token)
            next();
        } catch(error) {
            //Unauthorized
            return next(new errors.UnauthorizedError(error))
        }
    }
}
