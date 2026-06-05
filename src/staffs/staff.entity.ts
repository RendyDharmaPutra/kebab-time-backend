import { Auth } from 'src/auths/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Staffs')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => Auth, (auth) => auth.staffs)
  auth: Auth;
}
