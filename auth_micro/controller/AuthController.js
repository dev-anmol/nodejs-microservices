import bcrypt from 'bcrypt'
import prisma from '../config/db_config.js'
import jwt from 'jsonwebtoken'

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
            return res.status(500).json({ msg: "Something went wrong!!!" })
        }

    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            
            if (user) {
                // check both password
                //this condition inside if return true or false
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(401).json({ message: "Invalid credentials" })
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                    expiresIn: "365d"
                });

                return res.status(200).json({ message: "logged in successfully", access_token: `Bearer ${token}` })
            }

        } catch (error) {
            return res.status(500).json("something went wrong!!!")
        }





    }
}


export default AuthController;
