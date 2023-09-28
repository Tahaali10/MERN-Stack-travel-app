import express from "express" //"type":"module" in package.json
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan";
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'

const app=express(); 

app.use(morgan("dev"))
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());

app.use("/users",userRouter)
app.use("/tour",tourRouter)


const MONGO_URL="mongodb+srv://syedtahali10:Mongodb.1@cluster0.urnvzg2.mongodb.net/tours_app"

const port=5000
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));