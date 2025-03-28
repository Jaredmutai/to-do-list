// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-todo-list',
//   imports: [],
//   templateUrl: './todo-list.component.html',
//   styleUrl: './todo-list.component.scss'
// })
// export class TodoListComponent {

// }

import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }
}