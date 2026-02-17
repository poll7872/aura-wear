import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetProductQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La categoria debe ser un numero' })
  category_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La cantidad debe ser un numero' })
  @Min(1, { message: 'La cantidad debe ser mayor o igual a 1' })
  take: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La cantidad debe ser un numero' })
  skip: number;
}
