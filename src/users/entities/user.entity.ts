import { Recurrences } from 'src/recurrences/entities/recurrences.entity';
import { Transactions } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => Transactions, (transaction) => transaction.user)
  transactions!: Transactions[];

  @OneToMany((type) => Recurrences, (recurrence) => recurrence.id)
  @JoinColumn()
  recurrences!: Recurrences[];
}
