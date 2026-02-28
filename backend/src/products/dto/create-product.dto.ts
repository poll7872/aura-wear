import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto no puede ir vacio' })
  @IsString({ message: 'Nombre no valido' })
  name: string;

  @IsNotEmpty({ message: 'El nombre de la imagen no puede ir vacia' })
  image: string;

  @IsNotEmpty({ message: 'El precio del producto no puede ir vacio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no valido' })
  price: number;

  @IsNotEmpty({ message: 'La cantidad no puede ir vacia' })
  @IsInt({ message: 'Cantidad no valida' })
  inventory: number;

  @IsNotEmpty({ message: 'La categoria es obligatoria' })
  @IsInt({ message: 'Categoria no valida' })
  categoryId: number;
}
