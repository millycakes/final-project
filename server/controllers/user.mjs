import '../database/db.mjs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const User = mongoose.model('User');
const Challenge = mongoose.model('Challenge');

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

const updateUserInfo = async(req,res)=>{
    if (res.locals.authenticated) {
        const {firstname,lastname} = req.body;
        User.findOne({uid: res.locals.uid})
        .then((user)=>{
            user.firstname = firstname;
            user.lastname = lastname;
            user.save()
            .then((u)=>{
                return res.json({
                    success: true
                })
            }).catch((err)=>{
                return res.json({
                    success: false,
                    message: err
                })
            })
        })
        .catch((err)=>{
            return res.json({
                success: false,
                message: err
            })
        })
    }
    else {
        return res.json({
            success: false,
            message: "Could not validate user"
        })
    }
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

const userPreferences = async(req,res)=>{
    if (res.locals.uid) {
        const {goals,experience,challenge} = req.body;
        User.findOne({uid: res.locals.uid})
        .then(async (u)=>{
            u.preferences[0]["Interest"] = goals;
            u.preferences[0]["Experience"] = experience;
            u.preferences[0]["Focus"] = challenge;
            //setting number of challenges we recommend to a limit of 2 for now
            const recommended = await Challenge.find({tags: {$in:[goals]}}).limit(2).select('_id');
            //can probably get rid of later few lines after we add more challenges
            let add_recommended = [];
            if (recommended.length<2) {
                add_recommended = await Challenge.find({_id: { $nin: recommended }, tags: {$in:[experience]}}).limit(2-recommended.length).select('_id');
            }
            u.rec_challenges =  [...recommended, ...add_recommended];
            await u.save();
            return res.json({
                success: true
            })
        })
        .catch((err)=>{
            console.log(err);
            return res.json({
                success: false,
                message: "Could not find user"
            })
        }); 
    }
    else {
        return res.json({
            success: false,
            message: "Could not validate user"
        })
    }
}

const getPreferneces = async (req,res)=>{
    if (res.locals.uid) {
        const findUser = await User.findOne({uid: res.locals.uid});
        if (findUser) {
            return res.json({
                success: true,
                preferences: findUser.preferences[0]
            })
        }
        return res.json({
            success: false,
            message: "Invalid User",
        })
    }
    else {
        return res.json({
            success: false,
            message: "Could not validate user"
        })
    }
}

export{
    createUser,
    userNumber,
    userPreferences,
    getPreferneces,
    updateUserInfo
};