import express from 'express';
import mongoose from 'mongoose';
import './database/db.mjs';
import admin from 'firebase-admin';
import {router} from './routes/user.mjs';

const app = express();

//firebase admin config
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://checkmate-1fddb-default-rtdb.firebaseio.com'
});

//firebase config, put in client side
// const firebaseConfig = {
//     apiKey: "AIzaSyCvUR1B6tVKUFRhB8V6NcSo1o4-jXGo0Wk",
//     authDomain: "checkmate-1fddb.firebaseapp.com",
//     projectId: "checkmate-1fddb",
//     storageBucket: "checkmate-1fddb.appspot.com",
//     messagingSenderId: "497273418555",
//     appId: "1:497273418555:web:5796acd59100cbdc823d1e",
//     measurementId: "G-QXK2P17VKL"
//   };


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

export{
    admin,
}