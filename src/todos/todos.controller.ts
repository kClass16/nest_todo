import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

@Get(':id') findOne(@Param('id') id: string): Todo { const todo = this.todosService.findOne(+id); if (!todo) { throw new NotFoundException(`Todo with id ${id} not found`); } return todo; }

  @Post()
  create(@Body() body: { title: string; description?: string }): Todo {
    return this.todosService.create(body.title, body.description);
  }

@Put(':id') update(@Param('id') id: string, @Body() body: Partial<Todo>): Todo { const todo = this.todosService.update(+id, body); if (!todo) { throw new NotFoundException(`Todo with id ${id} not found`); } return todo; }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.todosService.remove(+id);
  }
}
