import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/controller/Auth.controller';
import { AuthService } from './application/auth.service';
import { AuthRepository } from './domain/repository/Auth.repository';
import { AuthMysqlRepository } from './infraestructure/persistence/mysql/AuthMysql.repository';
import { User } from './domain/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { JwtStrategyService } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategyService,
    {
      provide: AuthRepository,
      useClass: AuthMysqlRepository,
    },
  ],
})
export class AuthModule {}
