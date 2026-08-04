import { DefaultValuePipe } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TODO - CONTINUAR CRIANDO ENTIDADES, E CRIAR MODULOS E TUDO MAIS DAS OUTRAS ENTIDADES

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

  @Column()
  balance!: number;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @OneToMany((type) => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn()
  transaction!: TransactionEntity[];

  @OneToMany((type) => RecurrenceEntity, (recurrence) => recurrence.id)
  @JoinColumn()
  recurrence!: RecurrenceEntity[];
}
