import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks$: Observable<Task[]> = this.todoService.tasks$;
  filteredTasks$: Observable<Task[]> = this.tasks$; // Ініціалізація фільтрованих завдань
  newTaskName: string = '';
  newTaskDescription: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  onFilterChange(filterValue: string) {
    this.filteredTasks$ = this.todoService.getFilteredTasks(filterValue);
  }

  onAddTask() {
    if (!this.newTaskName.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      name: this.newTaskName,
      description: this.newTaskDescription,
      isCompleted: false
    };

    this.todoService.addTask(newTask);
    this.newTaskName = '';
    this.newTaskDescription = '';
  }

  onDeleteTask(taskId: number) {
    this.todoService.deleteTask(taskId);
  }

  onToggleCompletion(taskId: number) {
    this.todoService.toggleCompletion(taskId);
  }
  onEditTask(updatedTask: Task) {
    this.todoService.updateTask(updatedTask);
  }
}
