import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { faker } from '@faker-js/faker';
import { Product } from 'models/product';
import { ProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const newProduct = await this.productModel.create({
      id: faker.datatype.uuid(),
      name: productDto.name,
      description: productDto.description,
      amount: productDto.amount,
    });
    return newProduct;
  }

  async getAllProduct(): Promise<Product[]> {
    const products = await this.productModel.findAll();
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  async changeProduct(id: string, productDto: ProductDto): Promise<Product> {
    await this.productModel.update({ ...productDto }, { where: { id } });

    const updatedProduct = await this.productModel.findByPk(id);

    return updatedProduct;
  }
}
