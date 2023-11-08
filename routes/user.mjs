import express from 'express';
import {createUser,userNumber} from '../controllers/user.mjs'
import {validateUserSignUp,validateNumber,errorMsg} from '../middleware/validation/user.mjs'

const router = express.Router();

router.post('/userSignup', validateUserSignUp, errorMsg, createUser);
router.post('/signUpPhone', validateNumber, errorMsg, userNumber);

export{
    router
};