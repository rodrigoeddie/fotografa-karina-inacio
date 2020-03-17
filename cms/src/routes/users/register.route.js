const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User   = require('../../models/User');

module.exports = {
    method: 'post',
    path: '/user/register',
    name: 'user register',
    useWrap: true,
    version: 'v1.0.0',
    handler: (req, res) => {
        const { email, password } = req.body;
        
        console.log(email);
        console.log(password);
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Encrypt the password
                user.password = hash;

                //Save User to database
                try {
                    const newUser = await user.save();
                    return res.send(201)
                } catch (err) {
                    return new errors.InternalError(err.message);
                }
            });
        })
    }
}