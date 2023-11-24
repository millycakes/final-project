import '../database/db.mjs';
import mongoose from 'mongoose';

const Challenge = mongoose.model('Challenge');
const User = mongoose.model('User');
const userChallenge = mongoose.model('userChallenge');

const getChallenges = async (req, res)=> {
    if (res.locals.uid) {
        try {
            const user = await User.findOne({uid: res.locals.uid});
            const challenges = await Challenge.find({_id: { $nin: user.rec_challenges }});
            // const challenges = JSON.stringify(data);
            const rec_challenges = await Challenge.find({_id: {$in: user.rec_challenges}});
            // const rec_challenges = JSON.stringify(rec);
            return res.json({
                success: true,
                allChallenges: challenges,
                recChallenges: rec_challenges
            })
        }
        catch (error) {
            console.log("i has error", error);
            return res.json({
                success: false,
                error: error
            })
        }
    }
    else {
        return res.json({
            success: false,
            error: "Could not validate user"
        });
    }
}

const challengeDetails = async (req, res)=> {
    if (res.locals.authenticated) {
        const {id} = req.body;
        try {
            const data = await Challenge.findOne({_id:id});
            console.log("this is the data", data);
            return res.json({
                success: true,
                details: data
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: error
            })
        }
    }
    else {
        return res.json({
            success: false,
            message: "Could not validate user"
        });
    }
}

const enterChallenge = async (req,res) =>{
    if (res.locals.authenticated) {
        const {challenge, startdate, enddate} = req.body;
        const data = await Challenge.findOne({_id: challenge._id});
        if (data) {
            const newChallenge = new userChallenge({challenge: data, startDate: startdate, endDate: enddate, challengePhotos:[], completed: false});
            await newChallenge.save();
            const user = await User.findOne({uid: res.locals.uid});
            user.curr_challenges.push(newChallenge);
            if (user.rec_challenges.includes(data._id)) {
                user.rec_challenges.splice(user.rec_challenges.indexOf(data._id));
                //currently, will allow for recommended challenges to include past challenges
                const findrec = await Challenge.findOne({$and: [
                    { _id: { $nin: user.curr_challenges } },
                    { _id: { $nin: user.rec_challenges } }
                  ], tags: {$or: [
                    { tags: user.preferences[0]["Interest"] },
                    { tags: user.preferences[0]["Experience"] }
                  ]}});
                if (findrec) {
                    user.rec_challenges.push(findrec);
                }
            }
            await user.save();
            data.participants++;
            data.currentUsers.push(user);
            await data.save();
            return res.json({
                success: true,
            })
        }
        else {
            return res.json({
                success: false,
                message: "Could not find selected challenge"
            })
        }
    }
    else {
        return res.json({
            success: false,
            message: "Could not validate user"
        });
    }
}

export{
    getChallenges,
    challengeDetails,
    enterChallenge
};
