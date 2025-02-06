import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';


@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent {
  @Input() itemTitle:string = "";
  @Output() hideModalEvent = new EventEmitter<void>();
  @Output() addTodoEvent = new EventEmitter<string>()
  @Output() updateTodoEvent = new EventEmitter<string>();
 
  constructor () {
  }
  

  closeModal () {
    this.hideModalEvent.emit();
  }


  addTodo (title: string) {
    this.addTodoEvent.emit(title);
    console.log("addTodo function is called!!!");
  }

  
  updateTodo (item: string) {
    this.updateTodoEvent.emit(item)
  }

}
