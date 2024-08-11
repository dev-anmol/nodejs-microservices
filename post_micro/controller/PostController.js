import prisma from "../config/db.config.js"

class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            return res.status(200).json({
                posts
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Something went wrong!!!'
            })
        }

    }

    static async store(req, res) {

        try {
            const authUser = req.user;
            const { title, content } = req.body;
            const post = await prisma.post.create({
                data: {
                    user_id: authUser.id,
                    title: title,
                    content: content
                }
            });
            return res.json({ message: "Post created successfully", post })
        } catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }

    }
}


export default PostController