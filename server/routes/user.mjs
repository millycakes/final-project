import express from 'express';
import {createUser,userNumber,userPreferences,getPreferneces,updateUserInfo} from '../controllers/user.mjs'
import {checkAuth} from '../middleware/validation/user.mjs'

const router = express.Router();

router.post('/userSignup', createUser);

router.post('/userUpdateInfo',checkAuth,updateUserInfo);

//add back later when we use numbers
// router.post('/signUpPhone', checkAuth, userNumber);

router.post('/addPreference',checkAuth, userPreferences);

router.post('/getPreferences',checkAuth, getPreferneces);

export{
    router
};