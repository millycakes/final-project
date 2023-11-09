import {check, validationResult} from 'express-validator';
import {admin} from '../../app.mjs';

//middleware for checking if user is authenticated
  const checkAuth = (req, res, next)=>{
    if (req.headers.authtoken) {
      admin.auth().verifyIdToken(req.headers.authtoken)
        .then((token) => {
          console.log(token);
          next();
        }).catch(() => {
          res.status(401).send('You are not authorized to make this request');
        });
    } else {
      return res.status(401).send('You are not authorized to make this request');
    }
  }

const validateUserSignUp = [
  check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty!')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long!'),
  check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Both password must be same!');
      }
      return true;
    }),
];

const validateNumber = [
    check('number')
    .isMobilePhone('any',{strictMode:true})
    .withMessage('Invalid Number!'),
]

const errorMsg = (req, res, next) => {
    const vres = validationResult(req);
    if (!vres.isEmpty()) {
        res.json({message: vres.array()});
    }
    else {
        next();
    }
  };

export {
    checkAuth,
    validateUserSignUp,
    validateNumber,
    errorMsg
}
