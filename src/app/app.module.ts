import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamsCreateComponent } from './teams/teams-create/teams-create.component';
import { TeamsListComponent } from './teams/teams-list/teams-list.component';
import { TeamsSelectComponent } from './shared/teams-select/teams-select.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TeamsCreateComponent,
    TeamsListComponent,
    TeamsSelectComponent,
    GamesListComponent,
    GamesCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
