import { User } from '../../domain/entities/User';
import { IUserPersistence } from '../../domain/repository/IUserPersistence';
import db from '../utils/Connection';
import { ResultSetHeader } from "mysql2";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class UserPersistence implements IUserPersistence {

  public login = async (entity: Pick<User, "email" | "password">) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [entity.email];

    const [data] = await db.execute(query, values);
    const [user] = data as User[]

    const isPasswordCorrect = bcrypt.compareSync(
      entity.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new Error('Username ou password estão incorretos')

    const token = jwt.sign({ id: user.id }, 'jwtkey');

    return token
  }

  public findUserByEmail = async (email: string): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    const [data] = await db.execute(query, values);
    const [user] = data as User[];

    return user || null;
  }

  public register = async (entity: User): Promise<Pick<User, "name" | "email">> => {
    const query = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(entity.password, salt);

    const values = [entity.name, entity.email, hash];
    await db.execute<ResultSetHeader>(query, values);

    const newUser: Pick<User, "name" | "email"> = { name: entity.name, email: entity.email};
    return newUser;
  }

}

export default UserPersistence;