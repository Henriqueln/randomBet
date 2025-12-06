import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsCreateComponent } from './teams/teams-create/teams-create.component';
import { TeamsListComponent } from './teams/teams-list/teams-list.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },  // Default route
  { path: 'dashboard', component: DashboardComponent }, // Optional explicit route
  { path: 'teams-create', component: TeamsCreateComponent } ,
  { path: 'teams', component: TeamsListComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'games-create', component: GamesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
