import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks(); // Завантажуємо збережені завдання при старті
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
    }
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next([...tasks]); // Оновлюємо потік з новими значеннями
  }

  addTask(task: Task) {
    const tasks = [...this.tasksSubject.value, task];
    this.saveTasks(tasks);
  }

  deleteTask(id: number) {
    const tasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.saveTasks(tasks);
  }

  toggleCompletion(id: number) {
    const tasks = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.saveTasks(tasks);
  }

  getFilteredTasks(filter: string): Observable<Task[]> {
    return new Observable(subscriber => {
      this.tasks$.subscribe(tasks => {
        let filteredTasks = tasks;
        if (filter === 'completed') {
          filteredTasks = tasks.filter(task => task.isCompleted);
        } else if (filter === 'pending') {
          filteredTasks = tasks.filter(task => !task.isCompleted);
        }
        subscriber.next(filteredTasks);
        subscriber.complete();
      });
    });
  }
  updateTask(updatedTask: Task) {
    const tasks = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks(tasks);
  }


}
