import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { GetFacilityImgService } from '../../application/GetFacilityImg.service';
import { appointmentType } from '../types/Appointment';
import { InsertAppointmentService } from '../../application/InsertAppointment.service';
import { GetAppointmentsService } from '../../application/GetAppointments.service';
import { GetAllFacilitiesInfoService } from '../../application/GetAllFacilitiesInfo.service';
import { GetAllFacilitiesImgService } from '../../application/GetAllFacilitiesImg.service';
import { GetFacilityInfoService } from '../../application/GetFacilityInfo.service';
import { newFacilityType } from '../types/Facility';
import { InsertFacilityService } from '../../application/InsertFacility.service';
import { JWTAuthGuard } from '../../../Auth/jwt-auth.guard';
import { DeleteAppointmentService } from '../../application/DeleteAppointment.service';
import { UpdateAppointmentService } from '../../application/UpdateAppointment.service';
import { GetAllMunicipalitiesService } from '../../application/GetAllMunicipalities.service';

interface GetAppointmentsRequest {
  parentId: string;
}

@Controller('facilities')
export class facilitiesInfoController {
  constructor(
    private readonly getAllMunicipalitiesService: GetAllMunicipalitiesService,

    private readonly getFacilityInfoService: GetFacilityInfoService,
    private readonly getAllFacilitiesInfoService: GetAllFacilitiesInfoService,

    private readonly getFacilityImgService: GetFacilityImgService,
    private readonly getAllFacilitiesImgService: GetAllFacilitiesImgService,

    private readonly getAppointmentsService: GetAppointmentsService,
    private readonly insertAppointmentService: InsertAppointmentService,
    private readonly deleteAppointmentService: DeleteAppointmentService,
    private readonly updateAppointmentService: UpdateAppointmentService,

    private readonly insertFacilityService: InsertFacilityService,
  ) {}

  @Get()
  public async getAllMunicipalities() {
    const res = await this.getAllMunicipalitiesService.run();
    return res;
  }

  @Get('img/:town/')
  public async getAllFacilityImg(@Param('town') town: string) {
    const res = await this.getAllFacilitiesImgService.run(town);
    return res;
  }

  @Get('img/:town/:facility')
  public async getFacilityImg(
    @Param('town') town: string,
    @Param('facility') facility: string,
  ) {
    const res = await this.getFacilityImgService.run(town, facility);
    return res;
  }

  @Get('info/:town/')
  public async getAllFacilities(@Param('town') town: string) {
    const res = await this.getAllFacilitiesInfoService.run(town);
    return res;
  }

  @Get('info/:town/:facility')
  public async facilitiesInfo(
    @Param('town') town: string,
    @Param('facility') facility: string,
  ) {
    const res = await this.getFacilityInfoService.run(town, facility);
    return res;
  }

  @UseGuards(JWTAuthGuard)
  @Post('newFacility')
  public async newFacility(@Body() newFacility: newFacilityType) {
    const res = await this.insertFacilityService.run(newFacility);
    return res;
  }

  @Post('getAppointments')
  public async getAppointments(@Body() parentId: GetAppointmentsRequest) {
    const res = await this.getAppointmentsService.run(parentId.parentId);
    return res;
  }

  @Post('insertAppointment')
  public async insertAppointment(@Body() newAppointment: appointmentType) {
    const res = await this.insertAppointmentService.run(newAppointment);
    return res;
  }

  @UseGuards(JWTAuthGuard)
  @Post('deleteAppointment')
  public async deleteAppointment(@Body() appointment: appointmentType) {
    const res = await this.deleteAppointmentService.run(appointment);
    return res;
  }

  @UseGuards(JWTAuthGuard)
  @Post('updateAppointment')
  public async updateAppointment(@Body() appointment: appointmentType) {
    const res = await this.updateAppointmentService.run(appointment);
    return res;
  }
}
