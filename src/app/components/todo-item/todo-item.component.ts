import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Task>();

  isEditing = false;
  editedName = '';
  editedDescription = '';

  startEditing() {
    this.isEditing = true;
    this.editedName = this.task.name;
    this.editedDescription = this.task.description;
  }

  saveEdit() {
    if (this.editedName.trim() && this.editedDescription.trim()) {
      this.edit.emit({ ...this.task, name: this.editedName, description: this.editedDescription });
    }
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onToggle() {
    this.toggle.emit(this.task.id);
  }
}
