import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Game } from '../models/game';
import { ActiveTeam, Team } from '../models/team';
import { GameResult } from '../enums/games';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  games: Game[] = [];
  teams: Team[] = [];
  activeTeams: ActiveTeam[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Get teams first
    this.apiService.getTeams().subscribe({
      next: teams => {
        this.teams = teams;

        // Get games after teams are loaded
        this.apiService.getGames().subscribe({
          next: games => {
            // Sort games by date ascending
            this.games = games.filter((g: Game) => g.result === GameResult.FUTURE).sort((a: Game, b: Game) => a.date - b.date);
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error(err)
    });

    this.apiService.getActiveTeams().subscribe(result => {
      this.activeTeams = result;
    })
  }

  getTeamById(id: string) {
    return this.teams.find(t => t._id === id) || { name: '', logo: '' };
  }

  toggleBetResult(game: Game) {
    // Switch between WIN and LOSE
    // game.result = game.result === 1 ? 2 : 1;
    // this.apiService.updateGame(game).subscribe(); // optional: save to DB
  }

  triState: 'notSet' | 'won' | 'lose' = 'notSet';

  cycleState(game: Game) {
    if (game.result === GameResult.FUTURE) game.result = GameResult.WIN;
    else if (game.result === GameResult.WIN) game.result = GameResult.LOSE;
    else game.result = GameResult.FUTURE;
  }

  isBetWon(game: Game) {
    return game.result === GameResult.WIN; // assuming 1 = WIN, 2 = LOSE
  }

  getGames() {
    this.apiService.getGames().subscribe({
      next: games => {
        // Sort games by date ascending
            this.games = games.filter((g: Game) => g.result === GameResult.FUTURE).sort((a: Game, b: Game) => a.date - b.date);
      },
      error: err => console.error(err)
    });
  }

  saveGame(game: Game) {
    this.apiService.updateGame(game).subscribe(result => this.getGames())
    if (game.result === GameResult.WIN) {
      let activeTeam = this.activeTeams.find(t => t.teamId === game.activeTeam);
      if (activeTeam) {
        activeTeam.currentLostValue = 0;
        this.apiService.updateActiveTeamDebt(activeTeam).subscribe(result => {
        })
      }
    }
  }
}
