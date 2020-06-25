import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHero } from 'app/shared/model/hero.model';
import { HeroService } from './hero.service';

@Component({
  templateUrl: './hero-delete-dialog.component.html',
})
export class HeroDeleteDialogComponent {
  hero?: IHero;

  constructor(protected heroService: HeroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.heroService.delete(id).subscribe(() => {
      this.eventManager.broadcast('heroListModification');
      this.activeModal.close();
    });
  }
}
