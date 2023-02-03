import { User } from "../entities/User"
import { IUserPersistence } from "./IUserPersistence"

class UserRepository {
    constructor(private iPersistence: IUserPersistence) { }
    
    public register = async (entity: Omit<User, "id">): Promise<User> => {
        return await this.iPersistence.register(entity)
    }

    public login = async(entity: Pick<User, "email" | "password">) => {
        return await this.iPersistence.login(entity)
    }

    public findUserByEmail = async(email: string) => {
        return this.iPersistence.findUserByEmail(email)
    }
}

export { UserRepository }

