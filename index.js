const express = require('express');
const userRouter = require('./routes/userRoute');
const connectBD = require('./database/mongoose')


const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(userRouter);
const connection = async () => {
    try{
         connectBD(`mongodb+srv://amanborkar995:wD3HhtRC8eLBHVVH@neko.wiehd.mongodb.net/?retryWrites=true&w=majority&appName=Neko`);
        console.log('done')
    }catch(e){
        console.log(e);
    }
}
connection();
app.listen(port, () => {
    console.log('Server is running on port' + port);
})