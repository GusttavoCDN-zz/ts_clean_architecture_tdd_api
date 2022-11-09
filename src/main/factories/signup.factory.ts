import { DbAddAccount } from '../../data/useCases/addAccount/DbAddAccount';
import { BcryptAdapter } from '../../infra/bcrypt/BcryptAdapter';
import { MongoLogRepository } from '../../infra/databases/log-repository/MongoLogRepository';
import { MongoAccountRepository } from '../../infra/databases/mongodb/MongoAccountRepository';
import { IController } from '../../presentation/contracts';
import { SignUpController } from '../../presentation/controllers/signup/SignUp';
import { EmailValidatorAdapter } from '../../utils/EmailValidator.adapter';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignUpController = (): IController => {
  const salt = 12;

  const emailValidator = new EmailValidatorAdapter();

  const mongoAccountRepository = new MongoAccountRepository();
  const encrypter = new BcryptAdapter(salt);

  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository);

  const signUpController = new SignUpController(emailValidator, addAccount);
  const logErrorRepository = new MongoLogRepository();

  return new LogControllerDecorator(signUpController, logErrorRepository);
};
