import '../database/db.mjs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getDatabase, ref, set } from "firebase/database";
const User = mongoose.model('User');

//salt rounds for hashing
const saltRounds = 10;

const createUser = async (req,res)=> {
    const {email, password} = req.body;
    const uniqueUser = await User.uniqueEmail(email);
    if (!uniqueUser) {
        console.log('duplicate error');
    }
   else {
        //hashing password
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                console.log(err);
            }
            else {
                const newUser = new User({hash: hash, email: email});
                await newUser.save();
            }
        });
   }
}

const userNumber = async (req,res)=>{
    //need email of the user to find user before updating their number
    const {email,number} = req.body;
    const uniqueNumber = await User.uniqueNumber(number);
    if (!uniqueNumber) {
        console.log('duplicate number');
    }
    else {
        const findUser = await User.findOne({email:email});
        findUser.number = number;
        await findUser.save();
        const db = getDatabase();
        set(ref(db, email), {
            number:number
        });
    }
}

export{
    createUser,
    userNumber
};