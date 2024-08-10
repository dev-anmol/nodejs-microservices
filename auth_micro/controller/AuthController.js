import bcrypt from 'bcrypt'
import prisma from '../config/db_config.js'

class AuthController {
    //static functions can be called without creating an instance of the class
    static async register(req, res) {

        try {
            const payload = req.body;
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            const user = await prisma.user.create({
                data: payload,
            })
            return res.json({ message: "Account created successfully" })
        } catch (err) {
            return res.status(500).json({msg:"Something went wrong!!!"})
        }

    }
}


export default AuthController;
