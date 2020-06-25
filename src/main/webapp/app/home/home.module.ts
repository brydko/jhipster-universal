import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HeroesComponent } from './public/heroes/heroes.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { HeroDetailComponent } from './public/hero-detail/hero-detail.component';
import { MessagesComponent } from './public/messages/messages.component';
import { HeroSearchComponent } from './public/hero-search/hero-search.component';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forRoot([HOME_ROUTE]), CommonModule, FormsModule, HttpClientModule],
  declarations: [HomeComponent, DashboardComponent, HeroesComponent, HeroDetailComponent, MessagesComponent, HeroSearchComponent],
  exports: [DashboardComponent, HeroesComponent, HeroDetailComponent, MessagesComponent, HeroSearchComponent],
})
export class JhipsterHomeModule {}
