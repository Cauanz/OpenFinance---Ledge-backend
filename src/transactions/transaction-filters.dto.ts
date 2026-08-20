import { IsEnum, IsOptional } from 'class-validator';

enum TransactionPeriod {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class TransactionFilterDto {
  @IsOptional()
  @IsEnum(TransactionPeriod)
  period?: TransactionPeriod;
}
