import { Module } from '@nestjs/common';
import { FacilitiesInfoModule } from './modules/facilitiesInfo/FacilitiesInfo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './modules/facilitiesInfo/domain/entity/img.entity';
import { Info } from './modules/facilitiesInfo/domain/entity/info.entity';
import { AuthModule } from './modules/Auth/Auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'Ebooking',
      entities: [Img, Info],
      autoLoadEntities: true,
    }),
    FacilitiesInfoModule,
    AuthModule,
  ],
})
export class AppModule {}
