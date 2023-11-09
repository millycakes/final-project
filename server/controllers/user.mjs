import '../database/db.mjs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {admin} from '../app.mjs';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

//TODO: move firebase auth to frontend client side

const User = mongoose.model('User');

//salt rounds for hashing
const saltRounds = 10;

const createUser = async (req,res)=> {
    const {email, password} = req.body;
    const user = admin.auth().createUser({
        email: email,
        password: password
    }).then((userRecord)=>{
        console.log("successfully created user");
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                console.log(err);
            }
            else {
                const newUser = new User({uid: userRecord.uid, hash: hash, email: email});
                await newUser.save();
            }
        });
    }).catch((error)=>{
        return res.json({
            success: false,
            message: error,
        });
    })
}

const userNumber = async (req,res)=>{
    const auth = getAuth();
    const {email,number} = req.body;
    const uniqueNumber = await User.uniqueNumber(number);
    if (!uniqueNumber) {
        return res.json({
            success: false,
            message: "Invalid Number"
        });
    }
    else {
        signInWithPhoneNumber(auth, number)
            .then((confirmationResult)=>{
                code = confirmationResult;
            })
            .catch((err)=>{
                console.log(err);
                return res.json({
                    success: false,
                    message: "Verification code could not be sent!"
                })
            })
    }
}


export{
    createUser,
    userNumber
};