import { Component } from '@angular/core';
import { ShoppingStuffService } from './shopping-stuff.service';

@Component({
  selector: 'app-shopping-stuff',
  templateUrl: './shopping-stuff.component.html',
  styleUrls: ['./shopping-stuff.component.css']
})
export class ShoppingStuffComponent {

  obj : any [] = [];
  productData = {
    name: '',
    data: {
      year: null,
      price: null,
      'CPU model': '',
      'Hard disk size': ''
    }
  };

  editingProduct : any = null;

  constructor(private shoppingservice : ShoppingStuffService){}

  ngOnInit(){
    this.printStuff();
  }

  printStuff(){
    this.shoppingservice.getShoppingStuff().subscribe({
      next : (obj : any) => {
        this.obj = obj;
      },
      error : (err) =>{
        console.log("error", err);
      }
      
  });
  }

  sendStuff() {

    this.shoppingservice.sendShoppingStuff(this.productData).subscribe({
      next : (response) => {
        console.log('Product data posted successfully!', response);
        this.productData.name = '';
        
      },
      error : (err) => {
        console.error('Error posting product data:', err);
      }
  });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.shoppingservice.deleteProductData(id).subscribe({
        next : (response) => {
          console.log('Product deleted successfully', response);
          // Reload product data after deletion
          this.printStuff();
        },
        error : (err) => {
          console.error('Error deleting product:', err);
        }
    });
    }
  }

  onEdit(product : any){
    this.editingProduct = {...product};
  }

  operationEdit(productData : any){
    this.shoppingservice.updateProductData(productData.id, productData).subscribe({
      next : (response) =>{
        console.log("Edit Success", response);
        this.printStuff();
        this.editingProduct = null;
      },
      error : (err) => {
        console.log(err);
      }

    });
  }

  onCancel() {
    this.editingProduct = null;
  } 

}
