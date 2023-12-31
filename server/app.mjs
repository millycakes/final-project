import express from 'express';
import mongoose from 'mongoose';
import './database/db.mjs';
import admin from 'firebase-admin';
import {router} from './routes/user.mjs';
import {challengeRouter} from './routes/challenge.mjs'

const app = express();

//firebase admin config
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://checkmate-1fddb-default-rtdb.firebaseio.com'
});

app.get('/',(req,res)=>{
    res.send("home page");
})

//middleware to get user from frontend
app.use(express.json());
app.use(router);
app.use(challengeRouter);

//TODO: create initializations for all Challenges -- must be removed when released on app store

app.listen(process.env.PORT || 3000);

export{
    admin,
}