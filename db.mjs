import mongoose from 'mongoose';
import './config.mjs';

const mongooseOpts = {};


//user schema
const User = new mongoose.Schema({
	username: String,
	hash: String,
    email: String,
    number: String,
    photo: String,
    preferences: {
        type: Map,
        of: Schema.Types.Mixed 
    },
    prev_challenges: [Schema.Types.ObjectId],
    curr_challneges: [Schema.Types.ObjectId],
    challengePhotos: [String]
});

//challenge schema
const Challenge = new mongoose.Schema({
    title: String,
    duration: [Date],
    challengePhotos: [String],
    completed: Boolean
})


//model our schemas
mongoose.model('User', User);
mongoose.model('Challenge', Challenge);

//connect to mongoose
mongoose.connect(process.env.DSN, mongooseOpts)
    .then(()=>{
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    });