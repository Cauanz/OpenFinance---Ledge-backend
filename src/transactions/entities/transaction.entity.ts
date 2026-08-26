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

  @ManyToOne(() => User, (user) => user.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id!: User;

  @Column()
  title!: string;

  @Column()
  amount!: number;

  @Column()
  type!: string;

  @CreateDateColumn({ name: 'date' })
  date!: Date;

  @Column()
  status!: string;

  @ManyToOne(() => Recurrences, (recurrece) => recurrece.transactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'recurrence_id' })
  recurrence_id!: Recurrences | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;
}
