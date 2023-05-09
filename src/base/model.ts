import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@ObjectType()
export class ModelBase {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => Date)
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Field(() => Date)
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Field(() => Date, { nullable: true })
    @Prop({ type: Date, default: null })
    deletedAt?: Date;

    @Field(() => String, { defaultValue: 'Admin' })
    @Prop({ type: String, default: 'Admin' })
    createdBy: string;

    @Field(() => String, { defaultValue: 'Admin' })
    @Prop({ type: String, default: 'Admin' })
    updatedBy: string;
}

export type SchemaBase = ModelBase & Document;
