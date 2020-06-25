import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHero, Hero } from 'app/shared/model/hero.model';
import { HeroService } from './hero.service';
import { HeroComponent } from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroUpdateComponent } from './hero-update.component';

@Injectable({ providedIn: 'root' })
export class HeroResolve implements Resolve<IHero> {
  constructor(private service: HeroService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHero> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((hero: HttpResponse<Hero>) => {
          if (hero.body) {
            return of(hero.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Hero());
  }
}

export const heroRoute: Routes = [
  {
    path: '',
    component: HeroComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'universalApp.hero.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HeroDetailComponent,
    resolve: {
      hero: HeroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'universalApp.hero.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HeroUpdateComponent,
    resolve: {
      hero: HeroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'universalApp.hero.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HeroUpdateComponent,
    resolve: {
      hero: HeroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'universalApp.hero.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
