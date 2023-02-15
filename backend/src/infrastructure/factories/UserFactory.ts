import { User } from '../../domain/entities/User';
import { IUserPersistence } from '../../domain/repository/IUserPersistence';
import { UserRepository } from '../../domain/repository/UserRepository';
import UserUseCase from '../../domain/usecase/UserService';
import UserController from '../controllers/UserController';
import UserODM from '../persistence/UserPersistence';

const ipersitence: IUserPersistence = new UserODM()
const userRepository = new UserRepository(ipersitence)
const usecase = new UserUseCase(userRepository)
const controller = new UserController(usecase)

export {controller}