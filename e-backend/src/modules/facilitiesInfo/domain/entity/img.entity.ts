import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'img' })
export class Img {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  town: string;

  @Column()
  facility: string;

  @Column()
  src: string;
}
