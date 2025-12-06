import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActiveTeam, Team } from '../models/team';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // readonly url = 'http://localhost:5984';  // Remove credentials from URL
  readonly url = 'https://brachial-unmartial-sherryl.ngrok-free.dev'

  headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('admin:1234'), // Encode username:password
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    let request = { "selector": {}, "limit": 999999 }
    return this.http.post<any>(`${this.url}/teams/_find`, request, { headers: this.headers })
      .pipe(map(response => { return response.docs }));
  }

  getGames(): Observable<any> {
    let request = { "selector": {}, "limit": 999999 }
    return this.http.post<any>(`${this.url}/games/_find`, request, { headers: this.headers })
      .pipe(map(response => { return response.docs }));
  }

  getActiveTeams(): Observable<any> {
    let request = { "selector": {}, "limit": 999999 }
    return this.http.post<any>(`${this.url}/active-teams/_find`, request, { headers: this.headers })
      .pipe(map(response => { return response.docs }));
  }

  createTeam(request: Team) {
    return this.http.post<any>(`${this.url}/teams`, request, { headers: this.headers })
  }

  createGame(request: Game) {
    return this.http.post<any>(`${this.url}/games`, request, { headers: this.headers })
  }

  updateActiveTeamDebt(team: ActiveTeam): Observable<any> {
    return this.http.put<any>(`${this.url}/active-teams/${team._id}`, team, { headers: this.headers })
  }

  updateGame(game: Game): Observable<any> {
    return this.http.put<any>(`${this.url}/games/${game._id}`, game, { headers: this.headers })
  }

}
