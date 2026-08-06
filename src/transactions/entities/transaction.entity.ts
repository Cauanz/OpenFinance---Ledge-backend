import { Recurrences } from 'src/recurrences/entities/recurrences.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user_id!: User;

  @Column()
  title!: string;

  @Column()
  amount!: number;

  @Column()
  type!: string;

  @Column()
  date!: Date;

  @Column()
  status!: string;

  @ManyToOne((type) => Recurrences, (recurreces) => recurreces.id)
  @JoinColumn()
  recurrence_id!: Recurrences;

  @CreateDateColumn()
  createdAt!: string;
}
