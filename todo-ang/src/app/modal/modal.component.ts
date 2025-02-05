import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';


@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent {
  todos: Todo[] =[]
  @Output() hide = new EventEmitter<void>();
  todoService = inject(TodosService);

  constructor () {
    this.todoService.getTodos().then((todos)=>{
      this.todos = todos;
    }); 
  }
  

  hideModal () {
    this.hide.emit();
    console.log("hidden function called");
  }


  addTodo (title: string) {
    let len: number = this.todos.length;
    if (title!=="") {
      const obj: Todo = {
        userId: Math.floor(Math.random() * 3) + 1,
        id: 1 + this.todos[len - 1].id ,
        title,
        completed: false
      }

      this.todos.push(obj);
      this.todoService.createTodo(obj);
    }

    console.log("addTodo function is called!!!");
    this.hideModal()
  }

}
