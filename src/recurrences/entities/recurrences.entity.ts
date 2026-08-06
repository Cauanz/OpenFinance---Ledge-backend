import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recurrences {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany((type) => User, (user) => user.id)
  @JoinColumn()
  user_id!: User;

  @Column()
  title!: string;

  @Column()
  amount!: number;

  @Column()
  type!: string;

  @Column()
  frequency!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @Column()
  active!: boolean;
}
