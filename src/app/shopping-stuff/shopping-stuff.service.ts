import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn : 'root',
})

export class ShoppingStuffService {
    
    private apiUrl : string = 'https://api.restful-api.dev/objects';

    constructor(private http : HttpClient){}

    getShoppingStuff() : Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((response:any) => {
                return response.map((obj : any) => ({
                    id : obj.id,
                    name : obj.name,
                    color : obj.data?.color || 'NA'
                }));
            }),
        );
    }

    sendShoppingStuff( newObj : any) : Observable <any> {
        return this.http.post(this.apiUrl, newObj);
    }

    deleteProductData(id: string) {
        const url = `${this.apiUrl}/${id}`;  // API URL with the product ID
    return this.http.delete<any>(url);  // Send DELETE request
    }

    updateProductData( id : string, product : any) : Observable <any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<any>(url, product);
    }
}