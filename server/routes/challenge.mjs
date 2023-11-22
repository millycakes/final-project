import express from 'express';
import '../database/db.mjs';
import mongoose from 'mongoose';
import {checkAuth} from '../middleware/validation/user.mjs'
import { getChallenges,challengeDetails } from '../controllers/challenge.mjs';

const challengeRouter = express.Router();

challengeRouter.get('/getChallenges', checkAuth, getChallenges);

challengeRouter.post('/challengeDetails', checkAuth, challengeDetails);

export {
    challengeRouter
}