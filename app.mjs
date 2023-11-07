import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import './db.mjs';
import {router} from './routes/user.mjs';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const User = mongoose.model('User');
const Challenge = mongoose.model('Challenge'); 

app.get('/',(req,res)=>{
    res.send("home page");
})

//variables to be changed with route handling
const email = "xoxo@gmail.com";
const username = "test";
const password = "password";
const number = "0001110000";

//middleware to get user from frontend
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.body);
    next();
})
app.use(router);

app.post('/update-number', async(req,res)=>{
    if (!User.uniqueNumber(number)) {
        console.log('invalid number');
    }
    else {
        const findUser = await User.findOne({email: email});
        if (!findUser) {
            console.log('user not found');
        }
        else {
            findUser.number = number;
            await findUser.save();
        }
    }
    res.redirect('/');
})



app.listen(process.env.PORT || 3000);
