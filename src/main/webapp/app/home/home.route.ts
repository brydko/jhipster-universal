import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { HeroDetailComponent } from './public/hero-detail/hero-detail.component';
import { HeroesComponent } from './public/heroes/heroes.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'Welcome, Java Hipster!',
  },
  children: [
    {
      path: '',
      component: DashboardComponent,
      data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!',
      },
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!',
      },
    },
    {
      path: 'detail/:id',
      component: HeroDetailComponent,
      data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!',
      },
    },
    {
      path: 'heroes',
      component: HeroesComponent,
      data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!',
      },
    },
  ],
};
