import '../db.mjs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

export{
    createUser
};