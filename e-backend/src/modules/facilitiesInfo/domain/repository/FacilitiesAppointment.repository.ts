import { appointmentType } from '../../infrastructure/types/Appointment';

export abstract class FacilitiesAppointmentRepository {
  public abstract insertNewAppointment(
    newAppointment: appointmentType,
  ): Promise<boolean>;

  public abstract deleteAppointment(
    appointment: appointmentType,
  ): Promise<boolean>;

  public abstract updateAppointment(
    appointment: appointmentType,
  ): Promise<boolean>;

  public abstract getAppointments(id: string): Promise<appointmentType>;
}
