import express from "express"
import cors from "cors"
import "dotenv/config.js"
const app = express();
const PORT = process.env.PORT || 5000

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req,res)=>{
    return res.json({message: "its working"})
});

//routes
import Routes from './routes/index.js'
app.use(Routes)





app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
})