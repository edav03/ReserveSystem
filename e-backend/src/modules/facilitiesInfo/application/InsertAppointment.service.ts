import { Injectable } from '@nestjs/common';
import { appointmentType } from '../infrastructure/types/Appointment';
import { FacilitiesAppointmentRepository } from '../domain/repository/FacilitiesAppointment.repository';

@Injectable()
export class InsertAppointmentService {
  constructor(
    private readonly facilitiesAppointmentsRepository: FacilitiesAppointmentRepository,
  ) {}
  public async run(newAppointment: appointmentType) {
    return await this.facilitiesAppointmentsRepository.insertNewAppointment(
      newAppointment,
    );
  }
}
