/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeSignUpController } from '../factories/signup.factory';
import { adaptRoute } from '../adapters/express.route.adapter';

const signUpRouter = Router();

signUpRouter.post('/signup', adaptRoute(makeSignUpController()));

export { signUpRouter };
