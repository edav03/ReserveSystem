import { Column } from 'typeorm';

export class User {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
