import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { ProductDtos } from './dto/product.dto';
import { EventPattern } from '@nestjs/microservices';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => String)
  async test(): Promise<string> {
    return "sdfghjhgfdfgh"
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: ProductDtos.create): Promise<Product> {
    return this.productService.create(input)
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log({ data });

  }
}
