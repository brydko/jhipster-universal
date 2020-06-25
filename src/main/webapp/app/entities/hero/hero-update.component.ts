import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHero, Hero } from 'app/shared/model/hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'jhi-hero-update',
  templateUrl: './hero-update.component.html',
})
export class HeroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected heroService: HeroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hero }) => {
      this.updateForm(hero);
    });
  }

  updateForm(hero: IHero): void {
    this.editForm.patchValue({
      id: hero.id,
      name: hero.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hero = this.createFromForm();
    if (hero.id !== undefined) {
      this.subscribeToSaveResponse(this.heroService.update(hero));
    } else {
      this.subscribeToSaveResponse(this.heroService.create(hero));
    }
  }

  private createFromForm(): IHero {
    return {
      ...new Hero(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHero>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
