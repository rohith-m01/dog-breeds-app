import { Component } from '@angular/core';
import { NewShopping } from './new-shopping-stuff.component.service';

@Component({
  selector: 'app-new-shopping-stuff',
  templateUrl: './new-shopping-stuff.component.html',
  styleUrls: ['./new-shopping-stuff.component.css']
})
export class NewShoppingStuffComponent {

  obj : any [] = [];

  productList = {
    name : '',
    data : {
      year : null,
      price : null,
      "CPU model" : '',
      "Hard disk size" : ''
    }
  }

  editingProduct: any = null; // Object to hold the product being edited

  constructor(private newShopping : NewShopping){}

  ngOnInit(){
    this.getStuff();
  }

  getStuff(){
    this.newShopping.getBackend().subscribe({
      next : (obj : any) => {
        this.obj = obj;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  sendStuff(){
    this.newShopping.sendBackend(this.productList).subscribe({
      next : (response : any) => {
        console.log("data sent", response);
        this.productList.name = '';
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  deleteStuff(id : string){
    this.newShopping.deleteBackend(id).subscribe({
      next : (response : any) => {
        console.log("data deleted", response);
        this.getStuff();
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

   // Method to set the product into editing mode
   onEdit(product: any): void {
    // Set the product to editingProduct so that we can edit it
    this.editingProduct = { ...product }; // Make a copy of the product
  }

  // Method to update the product
  onUpdate(updatedProduct: any): void {
    // Send the updated product data to the API using PUT
    this.newShopping.updateProductData(updatedProduct.id, updatedProduct).subscribe({
      next : (response) => {
        console.log('Product updated successfully', response);
        // Reload product data after update
        this.getStuff();
        // Reset the editing state
        this.editingProduct = null;
      },
      error : (err) => {
        console.error('Error updating product:', err);
      }
  });
  }

  // Method to cancel the editing
  onCancel(): void {
    this.editingProduct = null;  // Reset editing state
  }

}
