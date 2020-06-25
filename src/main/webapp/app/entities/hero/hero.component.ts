import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHero } from 'app/shared/model/hero.model';
import { HeroService } from './hero.service';
import { HeroDeleteDialogComponent } from './hero-delete-dialog.component';

@Component({
  selector: 'jhi-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  heroes?: IHero[];
  eventSubscriber?: Subscription;

  constructor(protected heroService: HeroService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.heroService.query().subscribe((res: HttpResponse<IHero[]>) => (this.heroes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHeroes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHero): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHeroes(): void {
    this.eventSubscriber = this.eventManager.subscribe('heroListModification', () => this.loadAll());
  }

  delete(hero: IHero): void {
    const modalRef = this.modalService.open(HeroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.hero = hero;
  }
}
