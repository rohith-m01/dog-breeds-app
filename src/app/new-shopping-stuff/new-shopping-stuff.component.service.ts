import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn : "root",
})

export class NewShopping{

    private apiUrl : string = 'https://api.restful-api.dev/objects';

    constructor(private http : HttpClient){}

    
    getBackend() : Observable <any> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((response : any) => {
                return response.map((obj : any) => ({
                    id : obj.id,
                    name : obj.name,
                    color : obj.data?.color || "No color for this product"
                }));
            }),

        );
    }

    sendBackend(newData : any) : Observable <any> {
        return this.http.post<any>(this.apiUrl, newData);
    }

    deleteBackend(id : any) : Observable <any> {
        const deleteUrl = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(deleteUrl, id);
    }

    // Method to update product data via PUT request
  updateProductData(id: string, updatedProduct: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Construct the URL with the ID
    return this.http.put<any>(url, updatedProduct);  // Send PUT request with updated data
  }

}