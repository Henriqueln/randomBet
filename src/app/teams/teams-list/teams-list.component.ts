import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = [];
  loading: boolean = true;

constructor(
  private apiService: ApiService,
  private router: Router
) { }

  ngOnInit(): void {
    this.apiService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching teams:', err);
        this.loading = false;
      }
    });
  }

  addTeam() {
    this.router.navigate(['/teams-create']); // Redirect to create page
  }

}