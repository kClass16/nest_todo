import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.schema'; // use schema type

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(@Body() body: { title: string; description?: string }): Promise<Todo> {
    return this.todosService.create(body.title, body.description);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Todo>): Promise<Todo> {
    return this.todosService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(id);
  }
}
