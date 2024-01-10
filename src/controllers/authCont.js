const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
module.exports = {
    
   
    login: async (req, res) => {
        const { email, password } = req.body;
        try {

            const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
            
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

            if (!emailPattern.test(email)) {
                throw Error('Enter a valid Email');
            }
            if (!passwordPattern.test(password)) {
                throw Error('Password should carry at least one lowercase, uppercase, special charater, and number');
            }

            const _admin = await Admin.login(email, password);

            // Generating  json web token
            const token = jwt.sign({ id: _admin._id },
                process.env.JWT_SECRET,
            )
            console.log(token);    
            
            res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 });

            return res.status(200).json({
                success: true, msg: 'Login Successfully',  
                redirectURL: '/admin/home'
            });

        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
}