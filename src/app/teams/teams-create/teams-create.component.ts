import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { leagues } from 'src/app/enums/leagues';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  leagues = leagues;

  team: Team = {
    id: '',
    name: '',
    logo: '',
    league: ''
  };

  onSubmit() {
    this.apiService.createTeam(this.team).subscribe(result => {
      alert('Team created successfully!');
      this.router.navigate(['/dashboard']);
    })
  }

}
