import express from 'express';
import {createUser} from '../controllers/user.mjs'

const router = express.Router();

router.post('/create-user', createUser);

export{
    router
};