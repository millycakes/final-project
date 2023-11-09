import express from 'express';
import {createUser,userNumber} from '../controllers/user.mjs'
import {validateUserSignUp,validateNumber,errorMsg,checkAuth} from '../middleware/validation/user.mjs'

const router = express.Router();

router.post('/userSignup', validateUserSignUp, errorMsg, createUser);

//add checkAuth after creating frontend from this route onwards
router.post('/signUpPhone', validateNumber, errorMsg, userNumber);

export{
    router
};