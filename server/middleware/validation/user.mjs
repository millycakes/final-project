import {check, validationResult} from 'express-validator';
import {admin} from '../../app.mjs';

//middleware for checking if user is authenticated
  const checkAuth = (req, res, next)=>{
    if (req.headers.authtoken) {
      admin.auth().verifyIdToken(req.headers.authtoken)
        .then((token) => {
          console.log(token);
          res.locals.uid = token.uid;
          res.locals.authenticated = true;
          next();
        }).catch(() => {
          res.status(401).send('You are not authorized to make this request');
        });
    } else {
      return res.status(401).send('You are not authorized to make this request');
    }
  }

export {
    checkAuth,
}

