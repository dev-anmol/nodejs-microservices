import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader === null || authHeader === undefined){
        return res.status(401).json({
            statusbar: 401,
            message: "unAuthorized"
        })
    }

    const token = authHeader.split(" ")[1];

    //verify

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload)=>{
        if(err) return res.status(401).json({statusbar: 401, message: "UnAuthorized"})

        req.user = payload;
        next();
    })

}

export default authMiddleware;