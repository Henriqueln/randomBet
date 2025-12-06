import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GameResult } from 'src/app/enums/games';
import { Game } from 'src/app/models/game';
import { ActiveTeam, Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api.service';
import { mapActiveTeams } from 'src/app/services/helpers';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  activeTeams: ActiveTeam[] = [];
  teams: Team[] = [];
  games: Game[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get teams first
    this.apiService.getTeams().subscribe({
      next: teams => {
        this.teams = teams;

        // Get games after teams are loaded
        this.apiService.getGames().subscribe({
          next: games => {
            // Sort games by date ascending
            this.games = games.sort((a: Game, b: Game) => a.date - b.date);
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
        this.games = games.sort((a: Game, b: Game) => a.date - b.date);
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
  addGame() {
    this.router.navigate(['/games-create']); // Redirect to create page
  }

}
