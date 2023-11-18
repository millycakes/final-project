import express from 'express';
import '../database/db.mjs';
import mongoose from 'mongoose';

const challengeRouter = express.Router();
const Challenge = mongoose.model('Challenge');

challengeRouter.get('/getChallenges', async (req, res)=> {
    try {
        res.writeHead(200, {'Content-Type':'application/json'});
        const data = await Challenge.find()
        const dataJSON = JSON.stringify(data)
        res.write(dataJSON);
    }
    catch (error) {
        console.log("db closed");
        console.log(error)
    }
    res.end()
});

challengeRouter.get('/challengeDetails', async (req, res)=> {
    try {
        res.writeHead(200, {'Content-Type':'application/json'});
        var o_id = new mongoose.Types.ObjectId(req.query.id);
        const data = await Challenge.find({_id:o_id})
        const dataJSON = JSON.stringify(data)
        res.write(dataJSON);
    }
    catch (error) {
        console.log("db closed");
        console.log(error)
    }
    res.end()
});

export {
    challengeRouter
}