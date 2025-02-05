import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  url = "http://localhost:3000/todos";

  async getTodos(): Promise<Todo[]>{
    const data = await fetch(this.url);
    return (await data.json());
  }

  async createTodo (obj: Todo) {
    const res = await fetch(`${this.url}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj),
    })
    console.log("Todo is inserted :) ", res);
    
  }


  async updateTodo (todo: Todo) {
    const res = await fetch(`${this.url}/${todo.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo),
    })

    console.log("Is completed res : ",res);
    
  }


  async deleteTodo (id: string) {
    const res = await fetch(`${this.url}/${id}`,{
      method: "DELETE"
    })
    console.log("todo is deleted : ",res);
  }

}
