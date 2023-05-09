import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

export namespace CommonDtos {
    @ObjectType()
    export class DataInJSON {
        @Field(() => GraphQLJSON)
        data: JSON;
    }
}