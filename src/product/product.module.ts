import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductRepository } from './product.repository';
import { Product, ProductSchema } from './models/product.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), Product],
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [Product]
})
export class ProductModule { }
