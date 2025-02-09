import { Component } from '@angular/core';
import { toDoService } from './to-do.component.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  toDos : any[] = [];
  newToDo: string = '';  // Holds the new todo text
  newUserId: number = 1;  // Default User ID (can be dynamic based on your logic)
  newCompleted: string = 'false';  // Default: 'false' as text, can be 'true' or 'false'


  constructor(private toDoservice : toDoService){}

  ngOnInit(){
    this.getResponse();
  }

  getResponse(){
    this.toDoservice.getToDoLists().subscribe({
      next: (toDos : any) => {
        this.toDos = toDos;
      },
      error: (err) =>{
        console.log("error", err);
      }
  });
  }

  // Add a new todo to the API
  addToDo() {
    // if (this.newToDo.trim() === '') {
    //   console.log('Todo cannot be empty!');
    //   return;
    // }

    // Prepare the data object with all required fields
    const newToDoData = {
      id: null,  // Set to `null` for auto-generation by backend
      todo: this.newToDo,
      completed: this.newCompleted === 'true',  // Convert text to boolean
      userId: this.newUserId  // Use the user ID entered by the user
    };

    // Call the service to create a new todo
    this.toDoservice.createToDo(newToDoData).subscribe({
      next: (response) => {
        console.log('New Todo added:', response);
        this.toDos.push(response);  // Add the newly created todo to the list
        this.newToDo = '';  // Clear the input after successful addition
        this.newCompleted = 'false';  // Reset completed status
      },
      error: (err) => {
        console.log('Error adding todo:', err);
      }
    });

  }

}
