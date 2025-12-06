import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveTeam, Team } from 'src/app/models/team';

@Component({
  selector: 'app-teams-select',
  templateUrl: './teams-select.component.html',
  styleUrls: ['./teams-select.component.scss']
})
export class TeamsSelectComponent implements OnInit {

  @Input() teams: Team[] = [];
  @Output() selectedTeam = new EventEmitter<any>();

  filteredTeams: Team[] = [];

  searchText = '';
  selectedTeamId = '';

  ngOnInit() {
    this.filteredTeams = [...this.teams];
  }

  ngOnChanges() {
    this.filteredTeams = [...this.teams];
    if(this.teams.length > 0){
      this.selectedTeamId = this.teams[0]._id!
      this.onSelectTeam();
    }
  }

  filterTeams() {
    const text = this.searchText.toLowerCase();

    if (!text) {
      // If search is empty, show all teams
      this.filteredTeams = [...this.teams];
    } else {
      // Filter by substring match
      this.filteredTeams = this.teams.filter(team =>
        team.name.toLowerCase().includes(text)
      );
    }
  }

  onSelectTeam() {
    const team = this.teams.find(t => t._id === this.selectedTeamId);
    if (team) {
      this.selectedTeam.emit(team);
      this.searchText = '';
      this.filterTeams();
    }
  }

  // dynamically calculate dropdown size
  get dropdownSize(): number {
    // Expand only when user is typing
    return this.searchText ? Math.min(this.filteredTeams.length, 8)+1 : 1;
  }
}
