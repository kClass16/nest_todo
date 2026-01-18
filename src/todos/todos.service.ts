import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

findOne(id: number): Todo | undefined {
  return this.todos.find(todo => todo.id === id);
}


  create(title: string, description?: string): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      description,
      isCompleted: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

update(id: number, updateData: Partial<Todo>): Todo | undefined {
  const todo = this.findOne(id);
  if (todo) Object.assign(todo, updateData);
  return todo;
}


  remove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
