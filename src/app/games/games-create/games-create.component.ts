import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { GameResult, platforms } from 'src/app/enums/games';
import { Game } from 'src/app/models/game';
import { ActiveTeam, Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api.service';
import { mapActiveTeams } from 'src/app/services/helpers';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.scss']
})
export class GamesCreateComponent implements OnInit {
  game: Game = {
    activeTeam: '',
    oposingTeam: '',
    date: Date.now(),
    result: GameResult.FUTURE,
    platform: '',
    odds: 2.5,
    bet: 1
  };

  teams: Team[] = [];
  activeTeams: ActiveTeam[] = []; // for activeTeam select
  platforms = platforms;
  gameResults = GameResult;
  activeTeam: any = {};


  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    forkJoin({
      activeTeams: this.apiService.getActiveTeams(),
      teams: this.apiService.getTeams()
    }).subscribe({
      next: ({ activeTeams, teams }) => {
        // Both API calls are finished
        // Map active teams to include full team data
        this.activeTeams = mapActiveTeams(activeTeams, teams);
        this.teams = teams; // if you still need the full teams array
      },
      error: err => console.error('Error loading data', err)
    });
    this.setRandomPlatform();
  }

  setRandomPlatform() {
    const randomIndex = Math.floor(Math.random() * this.platforms.length);
    this.game.platform = this.platforms[randomIndex];
  }

  create() {
    let activeTeam = this.activeTeams.find(t => t.teamId === this.activeTeam._id)
    if (activeTeam) {
      activeTeam.currentLostValue = activeTeam?.currentLostValue + this.game.bet;
      this.apiService.createGame(this.game).pipe(
        switchMap(result => {
          if (activeTeam) return this.apiService.updateActiveTeamDebt(activeTeam);
          else return of(false)
        })
      ).subscribe({
        next: result => {
          alert('Game created successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: err => console.error(err)
      });
    }
  }

  onDateChange(event: any) {
    // event is a string from datetime-local input
    this.game.date = new Date(event).getTime();
  }

  onActiveTeamSelected(team: ActiveTeam) {
    if (team?.teamId) {
      this.game.activeTeam = team.teamId;
      this.activeTeam = { ...this.teams.find(t => t._id === team?.teamId), currentLostValue: team.currentLostValue, } as ActiveTeam
      this.calculateStuff()
    }
  }

  onOposingTeamSelected(team: Team) {
    if (team?._id) this.game.oposingTeam = team._id;
  }

  getPrizeValue(bet: number) {
    return (this.game.odds * bet) - bet
  }

  calculateStuff() {
    if (this.activeTeam) {
      let currentBet = 0.1;
      let max: number = 100000 // set a reasonable upper limit
      let value = 0;
      while (value <= max) {
        if (this.getPrizeValue(currentBet) > this.activeTeam.currentLostValue) {
          this.game.bet = Math.ceil(currentBet * 100) / 100;
          return
        } else {
          currentBet = currentBet + 0.05
          value++;
        }
      }
    }
  }
}
