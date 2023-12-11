
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token || token === undefined) {
        return res.redirect('/admin/login');    
    }         

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) =>{
            if (error) {
                if (error.message === 'jwt expired') {
                    return res.redirect('/admin/login');
                }
                return res.redirect('/admin/login');
            }
            else{
                req.admin = decodedToken.id;
                next();
            }
        });
    }
    else{
        return res.redirect('/admin/login');
    }
}
module.exports = {auth}