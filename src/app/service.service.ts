import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarShip, Pilot, Actor, Film, Planet } from './api-interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(
    private http: HttpClient,
  ) { }
// -------------Starships----------
  getDataFromApi(page = 1): Observable<any> {
    const path = 'https://swapi.dev/api/starships/';
    return this.http.get<StarShip[]>(
      `${path}/?page=${page}`);
  }
  getStarship(id: number): Observable<any> {
    const path = `https://swapi.dev/api/starships/${id}`;
    return this.http.get<StarShip>(path)
  }
  // ---Actors & Pilots from people----------
  getActorsFromApi(page = 1): Observable<any> {
    const path = 'https://swapi.dev/api/people/';
    return this.http.get<Actor[]>(
      `${path}/?page=${page}`);
  }
  getPilot(id: number): Observable<Pilot> {
    const path = `https://swapi.dev/api/people/${id}`;
    return this.http.get<Pilot>(path);
  }
 // -------------Films----------
  getFilms(id: number): Observable<Film> {
    const path = `https://swapi.dev/api/films/${id}`;
    return this.http.get<Film>(path);
  }
  // -------------Planets----------
  getPlanetsFromApi(page = 1): Observable<any> {
    const path = 'https://swapi.dev/api/planets/';
    return this.http.get<StarShip[]>(
      `${path}/?page=${page}`);
  }
  getPlanetById(id: number): Observable<Planet> {
    const path = `https://swapi.dev/api/planets/${id}`;
    return this.http.get<Planet>(path);
  }
}
