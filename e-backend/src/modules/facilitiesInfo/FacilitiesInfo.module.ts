import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAllFacilitiesImgService } from './application/GetAllFacilitiesImg.service';
import { GetAllFacilitiesInfoService } from './application/GetAllFacilitiesInfo.service';
import { GetAppointmentsService } from './application/GetAppointments.service';
import { GetFacilityImgService } from './application/GetFacilityImg.service';
import { GetFacilityInfoService } from './application/GetFacilityInfo.service';
import { InsertAppointmentService } from './application/InsertAppointment.service';
import { Img } from './domain/entity/img.entity';
import { Info } from './domain/entity/info.entity';
import { FacilitiesImgRepository } from './domain/repository/FacilitiesImg.repository';
import { FacilitiesInfoRepository } from './domain/repository/FacilitiesInfo.repository';
import { facilitiesInfoController } from './infrastructure/controller/facilitiesInfo.controller';
import { FacilitiesImgMysqlRepository } from './infrastructure/persistence/mysql/FacilitiesImgMysql.repository';
import { FacilitiesInfoMysqlRepository } from './infrastructure/persistence/mysql/FacilitiesInfoMysql.repository';
import { InsertFacilityService } from './application/InsertFacility.service';
import { DeleteAppointmentService } from './application/DeleteAppointment.service';
import { FacilitiesAppointmentRepository } from './domain/repository/FacilitiesAppointment.repository';
import { FacilitiesAppointmentMysqlRepository } from './infrastructure/persistence/mysql/FacilitiesAppointmentMysql.repository';
import { Appointment } from './domain/entity/appointment.entity';
import { UpdateAppointmentService } from './application/UpdateAppointment.service';
import { GetAllMunicipalitiesService } from './application/GetAllMunicipalities.service';

@Module({
  controllers: [facilitiesInfoController],
  imports: [TypeOrmModule.forFeature([Info, Img, Appointment])],
  providers: [
    GetFacilityImgService,
    GetAllFacilitiesImgService,
    GetFacilityInfoService,
    GetAllFacilitiesInfoService,
    GetAppointmentsService,
    InsertAppointmentService,
    DeleteAppointmentService,
    InsertFacilityService,
    UpdateAppointmentService,
    GetAllMunicipalitiesService,
    {
      provide: FacilitiesInfoRepository,
      useClass: FacilitiesInfoMysqlRepository,
    },
    {
      provide: FacilitiesImgRepository,
      useClass: FacilitiesImgMysqlRepository,
    },
    {
      provide: FacilitiesAppointmentRepository,
      useClass: FacilitiesAppointmentMysqlRepository,
    },
  ],
})
export class FacilitiesInfoModule {}
