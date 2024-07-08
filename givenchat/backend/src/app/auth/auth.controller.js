const UserModel = require("./user.model")
const jwt = require('jsonwebtoken')

class AuthController{
     async login(req,res, next){
        // let new_user = new UserModel({
        //     name:"suman baga",
        //     username:"suman",
        //     email:"sumanbaga@gmail.com",
        //     phone:"9845666888",
        //     address:"bhaktapur",
        //     password:"qwertyiop"
        // })
        // const new_user_created = await new_user.save();
        // console.log("req body",new_user_created);
        // console.log("req body login", req.body);
        try{
            const userFromDb = await UserModel.findOne({ email: req.body.email });

            if(userFromDb.password===req.body.password){
                console.log("generate token");
                var token = jwt.sign({id:userFromDb._id}, "privateKey",{ expiresIn: '30d' });

                res.json({
                    result:{accessToken:token,user:userFromDb }, 
                    message:"login succesful",
                    meta:null
                })
            }else{
                next({
                    code:400,
                    message:"credentials do not match", 
                    meta:null
                })
            }

        }catch(exception){
            console.log("exception",exception);
        }

    
    
    }

    profile(req,res, next){
        res.json(req.authUser);
    }

    adminPage(req,res,next){
        console.log("admin page");
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl;