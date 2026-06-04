import { Role } from 'src/roles/role.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Auths')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.auths)
  role: Role;
}
