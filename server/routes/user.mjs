import express from 'express';
import {createUser,userNumber,userPreferences,getPreferneces,updateUserInfo} from '../controllers/user.mjs'
import {validateUserSignUp,validateNumber,errorMsg,checkAuth} from '../middleware/validation/user.mjs'

const router = express.Router();

router.post('/userSignup', validateUserSignUp, errorMsg, createUser);

router.post('/userUpdateInfo',updateUserInfo);

//add checkAuth after creating frontend from this route onwards
router.post('/signUpPhone', validateNumber, errorMsg, userNumber);

router.post('/addPreference', userPreferences);

router.post('/getPreferences', getPreferneces);

export{
    router
};