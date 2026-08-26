import { Transactions } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recurrences {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.recurrences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id!: User;

  @OneToMany(() => Transactions, (transaction) => transaction.recurrence_id)
  transactions!: Transactions[];

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
