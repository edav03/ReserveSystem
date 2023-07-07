import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'info' })
export class Info {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  town: string;

  @Column()
  facility: string;

  @Column()
  price: number;

  @Column()
  location: string;
}
