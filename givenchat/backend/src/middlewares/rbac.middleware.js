const checkPermission = (checkRole) => {
    return (req, res, next) =>{
        if( req.authUser?.role==="admin"){
         next();
        }else{
         console.log("protected routes, permission denied");
         next({code:403, message:"Not allowed to access this route"})
     
        }
     }
}


module.exports = checkPermission