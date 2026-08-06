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

//TODO - TERMINAR DE FORMATAR E ADICIONAR OQUE FALTA E FAZER AS FUNÇÕES
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 0 })
  balance!: number;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @OneToMany((type) => Transactions, (transaction) => transaction.id)
  @JoinColumn()
  transactions!: Transactions[];

  @OneToMany((type) => Recurrences, (recurrence) => recurrence.id)
  @JoinColumn()
  recurrences!: Recurrences[];
}
