import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const connection = this.dataSource;
    await connection.dropDatabase();
    await connection.synchronize();
  }

  async seed() {
    await this.categoryRepository.save(categories);
    const savedCategories = await this.categoryRepository.find();

    const categoryMap = new Map(savedCategories.map((cat) => [cat.id, cat]));

    for (const seedProduct of products) {
      const category = categoryMap.get(seedProduct.categoryId);

      if (!category) {
        throw new Error(
          `La categoria con el id ${seedProduct.categoryId} no existe`,
        );
      }

      const product = this.productRepository.create({
        ...seedProduct,
        category,
      });

      await this.productRepository.save(product);
    }
  }
}
