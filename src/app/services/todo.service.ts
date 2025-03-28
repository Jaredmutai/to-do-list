import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.next([...this.todos.value, newTodo]);
  }

  toggleTodo(id: number) {
    const updatedTodos = this.todos.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todos.next(updatedTodos);
  }

  removeTodo(id: number) {
    const updatedTodos = this.todos.value.filter(todo => todo.id !== id);
    this.todos.next(updatedTodos);
  }
}