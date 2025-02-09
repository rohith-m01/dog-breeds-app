import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";

@Injectable({
providedIn :'root',
})

export class toDoService {

    private apiUrl : string = 'https://dummyjson.com/todos';

    constructor(private http: HttpClient){}

    getToDoLists() : Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((response : any) => {
                return response.todos.map((toDos : any) => ({
                    id : toDos.id,
                    toDo : toDos.todo,
                    completed : toDos.completed,
                    userId : toDos.userId,
                }));       
            }),
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        throw new Error(error.message || 'Server error');
      }


    createToDo(newToDo: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, newToDo);
      }

}