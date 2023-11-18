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
    prev_challenges: [Schema.Types.ObjectId],
    curr_challneges: [Schema.Types.ObjectId],
    challengePhotos: [String]
});

//challenge schema
const Challenge = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    challengePhotos: [Buffer],
    completed: Boolean,
    category: String
})


//check if username is unique
User.statics.uniqueUsername = async function(username) {
    if (!username) throw new Error('Invalid Username');
    try {
        const pattern = new RegExp(`^${username}$`, 'i');
        const duplicate = await this.findOne({username: { $regex:pattern}});
        if (duplicate){
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

//check if email is unique
User.statics.uniqueEmail = async function(email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const duplicate = await this.findOne({email: email});
        if (duplicate){
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

//check if number is unique
User.statics.uniqueNumber = async function(number) {
    if (!number) throw new Error('Invalid Number');
    try {
        const duplicate = await this.findOne({number: number});
        if (duplicate){
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

//model our schemas
mongoose.model('User', User);
mongoose.model('Challenge', Challenge);

//connect to mongoose
mongoose.connect(process.env.MONGO_URI, mongooseOpts)
    .then(()=>{
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    });