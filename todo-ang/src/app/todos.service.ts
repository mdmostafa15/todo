import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private url = "http://localhost:3000/todos";

  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
  }

  createTodo (obj: Todo) {
    const res = this.http.post<Todo>(`${this.url}`, JSON.stringify(obj))
    console.log("Todo is inserted :) ", res);
    return res;
  }


  updateTodo (todo: Todo) {
    const res = this.http.put<Todo>(`${this.url}/${todo.id}`, JSON.stringify(todo))
    console.log("Is completed res : ",res);
    return res;
  }


  deleteTodo (id: string) {
    const res = this.http.delete<string>(`${this.url}/${id}`)
    console.log("todo is deleted : ",res);
    return res;
  }

}
