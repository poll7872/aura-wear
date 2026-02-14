import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoria no puede estar vacio' })
  @IsString({ message: 'Valor no valido' })
  name: string;
}
