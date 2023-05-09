import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDtos } from './dto/product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {

  constructor(private productRepository: ProductRepository) { }

  async create(input: ProductDtos.create): Promise<Product> {
    try {
      let product = new Product();
      product.name = input.name
      product.description = input.description
      product.price = input.price
      if (input.image) product.image = input.image
      if (input.tag) product.tags = input.tag

      return await this.productRepository.save(product)
    } catch (error) {
      throw error
    }
  }

}
