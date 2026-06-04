import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;
}
