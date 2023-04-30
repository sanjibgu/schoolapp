const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const userRoutes=require('./routes/userRoutes')
const studentRoutes=require('./routes/studentRoutes')
const examRoutes=require('./routes/examRoutes')
const connectDB=require('./config/db')


const app=express();
dotenv.config();

app.use(cors())
app.use(express.json())

//Database Connecion
const DBUrl=process.env.DATABASE_URL;
connectDB(DBUrl)


app.use('/api/user',userRoutes)
app.use('/api/student',studentRoutes)
app.use('/api/exam',examRoutes)

app.listen(5000,console.log("Server is connected"))