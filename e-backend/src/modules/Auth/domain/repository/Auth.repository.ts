import { User } from '../entity/user.entity';

export abstract class AuthRepository {
  public abstract createUser(user: User): Promise<any>;
  public abstract loginUser(UserCredentials: string): Promise<User[]>;
}
