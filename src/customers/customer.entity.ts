import { Auth } from 'src/auths/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => Auth, (auth) => auth.customers)
  auth: Auth;
}
