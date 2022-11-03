import { DbAddAccount } from '../../data/useCases/addAccount/DbAddAccount';
import { BcryptAdapter } from '../../infra/bcrypt/BcryptAdapter';
import { MongoAccountRepository } from '../../infra/databases/mongodb/MongoAccountRepository';
import { SignUpController } from '../../presentation/controllers/signup/SignUp';
import { EmailValidatorAdapter } from '../../utils/EmailValidator.adapter';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;

  const emailValidator = new EmailValidatorAdapter();

  const mongoAccountRepository = new MongoAccountRepository();
  const encrypter = new BcryptAdapter(salt);

  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository);

  const signUpController = new SignUpController(emailValidator, addAccount);
  return signUpController;
};
