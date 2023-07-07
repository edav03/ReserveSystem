import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'info' })
export class Appointment {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column()
  title: string;

  @Column()
  nombre: string;

  @Column()
  dni: number;

  @Column()
  email: string;

  @Column()
  pago: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  parentId: string;
}
