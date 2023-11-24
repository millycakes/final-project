import mongoose from 'mongoose';
import './config.mjs';
const { Schema } = mongoose;

const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

//user schema
const User = new mongoose.Schema({
    uid:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
	username: {
        type: String,
        trim: true
    },
	hash: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    number: {
        type: String,
    },
    photo: Buffer,
    preferences:[{
        Interest: String,
        Experience: String,
        Focus: String
    }],
    rec_challenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
    prev_challenges: [{ type: Schema.Types.ObjectId, ref: 'userChallenges' }],
    curr_challenges: [{ type: Schema.Types.ObjectId, ref: 'userChallenges' }],
    challengePhotos: [String]
});

//challenge schema
const Challenge = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    likes: Number,
    participants: Number,
    challengePhotos: [Buffer],
    challengeReviews: [{
        user: String,
        rating: Number,
        review: String,
        date: {type: Date, default: Date.now}
    }],
    currentUsers: [{
        date: { type: Date},
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
      }],
    category: String
})

const userChallenge = new mongoose.Schema({
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge' },
    startDate: Date,
    endDate: Date,
    challengePhotos: [Buffer],
    completed: Boolean,
})


//model our schemas
mongoose.model('User', User);
mongoose.model('Challenge', Challenge);
mongoose.model('userChallenge', userChallenge);

//connect to mongoose
mongoose.connect(process.env.MONGO_URI, mongooseOpts)
    .then(()=>{
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    });