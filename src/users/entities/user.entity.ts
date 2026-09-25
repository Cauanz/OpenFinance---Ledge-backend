import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transactions } from '../../transactions/entities/transaction.entity';
import { Recurrences } from '../../recurrences/entities/recurrences.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @OneToMany(() => Transactions, (transaction) => transaction.user_id)
  transactions!: Transactions[];

  @OneToMany(() => Recurrences, (recurrence) => recurrence.id)
  @JoinColumn()
  recurrences!: Recurrences[];
}
