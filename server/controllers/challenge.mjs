import '../database/db.mjs';
import mongoose from 'mongoose';

const Challenge = mongoose.model('Challenge');
const User = mongoose.model('User');

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

export{
    getChallenges,
    challengeDetails,
};
