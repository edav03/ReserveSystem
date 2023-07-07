import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserDto } from '../infraestructure/dto/user.model';
import { AuthRepository } from '../domain/repository/Auth.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/entity/user.entity';
import { UserLoginDto } from '../infraestructure/dto/userLogin.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  public async register(userObject: UserDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.userRepository.createUser(userObject);
  }

  public async login(userLogin: UserLoginDto) {
    const { credential, password } = userLogin;

    const UserExists = await this.userRepository.loginUser(credential);
    if (UserExists.length > 0) {
      const { password: hashPassword } = UserExists[0];
      const comparePassword = await compare(password, hashPassword);
      if (comparePassword) {
        const payload = {
          name: UserExists[0].name,
          email: UserExists[0].email,
        };

        const token = this.jwtService.sign(payload);
        return { ...UserExists[0], token };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
