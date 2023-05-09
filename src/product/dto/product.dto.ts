import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace ProductDtos {

  @InputType()
  export class create {
    @Field(() => String)
    @IsString()
    name: string

    @Field(() => String, { nullable: false })
    @IsString()
    description: string

    @Field(() => Int, { nullable: false })
    @IsNumber()
    price: number

    @Field(() => String, { nullable: true })
    @IsOptional()
    image?: string

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    tag?: string[]
  }
}
