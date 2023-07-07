import { FacilitiesInfoRepository } from 'src/modules/facilitiesInfo/domain/repository/FacilitiesInfo.repository';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from 'src/modules/facilitiesInfo/domain/entity/appointment.entity';
import { appointmentType } from '../../types/Appointment';
import { FacilitiesAppointmentRepository } from 'src/modules/facilitiesInfo/domain/repository/FacilitiesAppointment.repository';

export class FacilitiesAppointmentMysqlRepository extends FacilitiesAppointmentRepository {
  constructor(
    @InjectEntityManager()
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super();
  }
  public async insertNewAppointment(newAppointment: appointmentType) {
    const querySQL = `INSERT INTO appointments (title, nombre, dni, email, pago, startDate, endDate, parent_Id) VALUES ('${newAppointment.title}', '${newAppointment.nombre}', '${newAppointment.dni}', '${newAppointment.email}', '${newAppointment.pago}', STR_TO_DATE('${newAppointment.startDate}', '%Y-%m-%dT%H:%i:%s.%fZ'), STR_TO_DATE('${newAppointment.endDate}', '%Y-%m-%dT%H:%i:%s.%fZ'), '${newAppointment.parent_Id}')`;
    const res = await this.appointmentRepository.query(querySQL);
    return res.length > 0 ? true : false;
  }

  public async deleteAppointment(appointment: appointmentType) {
    const querySQL = `DELETE FROM appointments where dni = '${appointment.dni}' AND startDate = '${appointment.startDate}' AND parent_Id = '${appointment.parent_Id}'`;
    const res = await this.appointmentRepository.query(querySQL);
    return res.affectedRows == 1 ? true : false;
  }

  public async updateAppointment(appointment: appointmentType) {
    const querySQL = `UPDATE appointments SET title = '${appointment.title}', nombre = '${appointment.nombre}', email = '${appointment.email}', pago = '${appointment.pago}' WHERE dni = '${appointment.dni}' AND startDate = STR_TO_DATE('${appointment.startDate}', '%Y-%m-%dT%H:%i:%s.%fZ') AND parent_Id = '${appointment.parent_Id}'`;
    const res = await this.appointmentRepository.query(querySQL);
    console.log(res);
    return res.affectedRows == 1 ? true : false;
  }

  public async getAppointments(parentId: string) {
    const querySQL = `SELECT title, nombre, dni, pago, email, startDate, endDate, parent_Id FROM appointments where parent_id = '${parentId}'`;
    const appointments = await this.appointmentRepository.query(querySQL);

    return appointments;
  }
}
