const express = require('express');
const userRouter = require('./routes/userRoute');
const connectBD = require('./database/mongoose')
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(userRouter);
const connection = async () => {
    try{
         connectBD(process.env.MONGODBURL);
        console.log('done')
    }catch(e){
        console.log(e);
    }
}
connection();
app.listen(port, () => {
    console.log('Server is running on port' + port);
})