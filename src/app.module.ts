import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kaliyaclasses16:61lTru3qNCYfPyxj@cluster0.ktao9kg.mongodb.net/nest_todos'),TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

