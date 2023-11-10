import express from 'express';
import {createUser,userNumber,userPreferences, getUser} from '../controllers/user.mjs'
import {validateUserSignUp,validateNumber,errorMsg,checkAuth} from '../middleware/validation/user.mjs'

const router = express.Router();

router.post('/userSignup', validateUserSignUp, errorMsg, createUser);

//add checkAuth after creating frontend from this route onwards
router.post('/signUpPhone', validateNumber, errorMsg, userNumber);

router.post('/addPreference', userPreferences);

router.post('/getUser', getUser);

export{
    router
};