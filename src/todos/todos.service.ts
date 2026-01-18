import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  async create(title: string, description?: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, description });
    return newTodo.save();
  }

  async update(id: string, updateData: Partial<Todo>): Promise<Todo> {
    const updated = await this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Todo with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.todoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Todo with id ${id} not found`);
  }
}
