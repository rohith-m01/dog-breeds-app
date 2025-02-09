import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn : 'root',
})

export class DogService{
    private apiUrl = 'https://dogapi.dog/api/v2/breeds';

  constructor(private http: HttpClient) {}

  // Method to fetch dog breeds
  getDogBreeds(): Observable<any> {

    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        return response.data.map((breed: any) => ({
          id: breed.id,
          name: breed.attributes.name,
          description: breed.attributes.description,
          lifeMin: breed.attributes.life.min,
          lifeMax: breed.attributes.life.max,
          maleWeightMin: breed.attributes.male_weight.min,
          maleWeightMax: breed.attributes.male_weight.max,
          femaleWeightMin: breed.attributes.female_weight.min,
          femaleWeightMax: breed.attributes.female_weight.max,
          hypoallergenic: breed.attributes.hypoallergenic,
        }));
      }),
      catchError(this.handleError) // Handle errors gracefully
    );
  }

  // Handle errors from API requests
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error(error.message || 'Server error');
  }
}