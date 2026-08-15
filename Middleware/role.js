//create authorization middleware to check if the user has the required role to access a specific route
exports.authorizeRole = (...role) =>{
    return (req,res,next) => {
        if(!role.includes(req.user.role)){
            return res.status(403).json({message: "FORBIDDEN ACTION"})
        }
        next();
        
    }
}