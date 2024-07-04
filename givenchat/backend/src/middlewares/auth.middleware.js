const UserModel = require("../app/auth/user.model")
const jwt = require("jsonwebtoken")

const checkAuthentication = async (req,res,next) => {
    try{
        let token = null;

        if(req.headers['authorization']){
            token = req.headers['authorization']
            token = token.split(" ").pop();
            var decoded = jwt.verify(token, 'privateKey');
            //TOTEST
        // var decoded = jwt.verify(token, 'privateKey',{},(err,userData) => {
        //     if(err) throw err;
        //     return userData;
        // });
        //TOTEST
            // console.log(decoded.id);

            const userFromDb = await UserModel.findOne({ _id: decoded.id });
            // console.log(userFromDb);
            req.authUser = userFromDb;
            next();
        
        }
    }catch(exception){
        next(exception)
    }
}

module.exports = checkAuthentication;