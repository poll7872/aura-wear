import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetProductQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La categoria debe ser un numero' })
  category_id?: number;
}
