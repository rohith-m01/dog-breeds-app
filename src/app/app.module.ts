import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DogDisplayComponent } from './dog-display/dog-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ToDoComponent } from './to-do/to-do.component';
import { FormsModule } from '@angular/forms';
import { ShoppingStuffComponent } from './shopping-stuff/shopping-stuff.component';
import { NewShoppingStuffComponent } from './new-shopping-stuff/new-shopping-stuff.component';

@NgModule({
  declarations: [
    AppComponent,
    DogDisplayComponent,
    ToDoComponent,
    ShoppingStuffComponent,
    NewShoppingStuffComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
