import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  category: string;
  dueDate: Date | null;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  private categories = new BehaviorSubject<string[]>(['Work', 'Personal', 'Shopping']);
  categories$ = this.categories.asObservable();

  addTodo(title: string, category: string, dueDate: Date | null) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      category,
      dueDate,
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

  addCategory(category: string) {
    if (!this.categories.value.includes(category)) {
      this.categories.next([...this.categories.value, category]);
    }
  }
}