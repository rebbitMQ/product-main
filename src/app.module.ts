import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import mongoose from 'mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cluster0.iqumapr.mongodb.net/main?retryWrites=true&w=majority', {
      user: 'mrdeveloperproduction',
      pass: '4pKT1gqO3XaGji0V',
    }),
    ProductModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({ driver: ApolloDriver, autoSchemaFile: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name)
  constructor() {
    const db = mongoose.connection;
    db.on('connection', connection => this.logger.log('connection', connection));
  }
}
