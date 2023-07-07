import { Injectable } from '@nestjs/common';
import { appointmentType } from '../infrastructure/types/Appointment';
import { FacilitiesAppointmentRepository } from '../domain/repository/FacilitiesAppointment.repository';

@Injectable()
export class UpdateAppointmentService {
  constructor(
    private readonly facilitiesAppointmentRepository: FacilitiesAppointmentRepository,
  ) {}
  public async run(appointment: appointmentType) {
    return await this.facilitiesAppointmentRepository.updateAppointment(
      appointment,
    );
  }
}
