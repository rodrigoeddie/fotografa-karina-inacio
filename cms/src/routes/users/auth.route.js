const errors   = require('restify-errors');
const jwt      = require('jsonwebtoken');
const User     = require('../../models/User');
const auth     = require('../../helpers/auth');
const config   = require('../../config');

module.exports = {
    method: 'get',
    path: '/auth',
    name: 'auth user',
    useWrap: true,
    version: 'v1.0.0',
    handler: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await auth.authenticate(email, password);
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
