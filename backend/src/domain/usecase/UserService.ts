import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

class UserUseCase {

  constructor(private repository: UserRepository) {}

  public register = async (entity: Omit<User, "id">): Promise<User> => {
    if(entity.email.length > 40)
      throw new Error("String email muito grande");

    if(entity.name.length > 80)
      throw new Error("String name muito grande");

    if(entity.password.length < 5)
      throw new Error("Password deve ter mais que 5 caracteres");

    if(await this.findUserByEmail(entity.email))
      throw new Error("Pessoa usuária já existe");
    
      return await this.repository.register(entity)
  }

  public login = async (entity: Omit<User, "id" | "name">): Promise<any> => {
    if(!entity.email || !entity.password)
      throw new Error("Os campos não podem ser vazios");
    
    return await this.repository.login(entity)
  }

  private findUserByEmail = async (email: string): Promise<User> => {
    return await this.repository.findUserByEmail(email)
  }
}

export default UserUseCase;



