import { AuthRepository } from 'src/modules/Auth/domain/repository/Auth.repository';
import { Repository } from 'typeorm';
import { User } from 'src/modules/Auth/domain/entity/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

export class AuthMysqlRepository extends AuthRepository {
  constructor(
    @InjectEntityManager() private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  public async createUser(user: User) {
    const result = await this.userRepository.query(
      `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`,
    );
    return result;
  }

  public async loginUser(UserCredentials: string) {
    const result = await this.userRepository.query(
      `SELECT * FROM users WHERE email = '${UserCredentials}' OR name = '${UserCredentials}'`,
    );
    return result;
  }
}
