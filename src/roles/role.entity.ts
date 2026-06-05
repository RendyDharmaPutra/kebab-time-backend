import { Auth } from 'src/auths/auth.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany(() => Auth, (auth) => auth.role)
  auths: Auth[];
}
