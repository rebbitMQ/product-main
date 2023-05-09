import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./models/product.model";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll() {
        return this.productModel.find().exec();
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    async save(input: Product): Promise<Product> {
        const createdProduct = new this.productModel(input);
        return await createdProduct.save();
    }
}
