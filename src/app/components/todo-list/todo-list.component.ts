import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  categories: string[] = [];
  newTodo: string = '';
  selectedCategory: string = '';
  dueDate: string = '';
  filterStatus: 'all' | 'active' | 'completed' = 'all';
  filterCategory: string = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
      this.applyFilters();
    });
    this.todoService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const dueDate = this.dueDate ? new Date(this.dueDate) : null;
      this.todoService.addTodo(this.newTodo, this.selectedCategory, dueDate);
      this.newTodo = '';
      this.dueDate = '';
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  applyFilters() {
    let filtered = [...this.todos];
    
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(todo => 
        this.filterStatus === 'completed' ? todo.completed : !todo.completed
      );
    }

    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(todo => todo.category === this.filterCategory);
    }

    this.filteredTodos = filtered;
  }

  setFilterStatus(status: 'all' | 'active' | 'completed') {
    this.filterStatus = status;
    this.applyFilters();
  }

  setFilterCategory(category: string) {
    this.filterCategory = category;
    this.applyFilters();
  }

  isOverdue(todo: Todo): boolean {
    return todo.dueDate && !todo.completed && todo.dueDate < new Date();
  }
}