import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ModelBase } from '../../base/model';

export type ProductDocument = Product & Document;

@Schema()
@ObjectType()
export class Product extends ModelBase {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Float)
  @Prop({ required: true })
  price: number;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
