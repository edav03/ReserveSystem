import { Injectable } from '@nestjs/common';
import { FacilitiesInfoRepository } from '../domain/repository/FacilitiesInfo.repository';
import { FacilitiesAppointmentRepository } from '../domain/repository/FacilitiesAppointment.repository';

@Injectable()
export class GetAppointmentsService {
  constructor(
    private readonly facilitiesAppointmentsRepository: FacilitiesAppointmentRepository,
  ) {}
  public async run(parentId: string) {
    return await this.facilitiesAppointmentsRepository.getAppointments(
      parentId,
    );
  }
}
