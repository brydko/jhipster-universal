import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHero } from 'app/shared/model/hero.model';

@Component({
  selector: 'jhi-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
  hero: IHero | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hero }) => (this.hero = hero));
  }

  previousState(): void {
    window.history.back();
  }
}
