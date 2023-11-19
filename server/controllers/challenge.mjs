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
    console.log("HA;SDJFHASKJDFHAKSJLDFHALKSJDHF");
    if (res.locals.authenticated) {
        const {id} = req.body;
        try {
            res.writeHead(200, {'Content-Type':'application/json'});
            const data = await Challenge.find({_id:id});
            const dataJSON = JSON.stringify(data);
            console.log("this is the challenge",dataJSON);
            res.write(dataJSON);
        }
        catch (error) {
            console.log("db closed");
            console.log(error)
        }
        res.end()
    }
    else {
        const responseData = {
            success: false,
            message: "Could not validate user"
        };
        res.write(JSON.stringify(responseData))
        res.end();
       }
}

export{
    getChallenges,
    challengeDetails,
};
