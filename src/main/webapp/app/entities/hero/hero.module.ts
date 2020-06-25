import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { HeroComponent } from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroUpdateComponent } from './hero-update.component';
import { HeroDeleteDialogComponent } from './hero-delete-dialog.component';
import { heroRoute } from './hero.route';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(heroRoute)],
  declarations: [HeroComponent, HeroDetailComponent, HeroUpdateComponent, HeroDeleteDialogComponent],
  entryComponents: [HeroDeleteDialogComponent],
})
export class JhipsterHeroModule {}
