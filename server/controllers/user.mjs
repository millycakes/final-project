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
    const {email, password, uid} = req.body;
    console.log(email+" "+password);
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) {
            console.log(err);
        }
        else {
            const newUser = new User({uid: uid, hash: hash, email: email, preferences:{}});
            newUser.save()
            .then((user)=>{
                return res.json({
                    success: true,
                    message: "successfully created"+user.email
                })
            })
            .catch((err)=>{
                console.log(err);
                return res.json({
                    success: false,
                    message: err
                })
            })
        }
    });
}

const userNumber = async (req,res)=>{
    const auth = getAuth();
    const {email,number} = req.body;
    const uniqueNumber = await User.uniqueNumber(number);
    if (!uniqueNumber) {
        return res.json({
            success: false,
            message: "Invalid Number",
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
                    message: "Verification code could not be sent!",
                })
            })
    }
}

//hard coded for now, need to use firebase user instead for this part
const userPreferences = async(req,res)=>{
    const {email,pref} = req.body;
    //remove this after we force user to pick at least one option
    if (pref!="") {
        const findUser = await User.findOne({email: email});
        switch(pref) {
            case ("I never worked on a personal goal before"):
                findUser.preferences[0]["Experience"] = "Beginner";
                break;
            case ("I had a few personal goals"):
                findUser.preferences[0]["Experience"] = "Intermediate";
                break;
            case("I had and achieved many personal goals"):
                findUser.preferences[0]["Experience"] = "Advanced";
                break;
            case("I lose motivation quickly"):
                findUser.preferences[0]["Focus"] = "Staying Motivated";
                break;
            case("I have a hard time getting started"):
                findUser.preferences[0]["Focus"] = "Getting Started";
                break;
            case("I get overwhelmed"):
                findUser.preferences[0]["Focus"] = "Taking It Slow";
                break;
            case("I forget to work on my goal"):
                findUser.preferences[0]["Focus"] = "Building Consistency";
                break;
            default:
                findUser.preferences[0]["Interest"]=pref;
        }
        await findUser.save();
    }
    return res.json({
        success: true
    })
}

const getUser = async (req,res)=>{
    const{email} = req.body;
    const findUser = await User.findOne({email: email});
    if (findUser) {
        return res.json({
            success: true,
            firstname: findUser.firstname,
            preferences: findUser.preferences[0]
        })
    }
    return res.json({
        success: false,
        message: "Invalid User",
    })
}

export{
    createUser,
    userNumber,
    userPreferences,
    getUser
};