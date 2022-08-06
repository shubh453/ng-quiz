import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { QuizCategory } from '../store/quiz-category.model';
import { QuizCategoryFeatureKey } from '../store/store-keywords';

@Injectable({
  providedIn: 'root'
})
export class QuizCategoryService extends EntityCollectionServiceBase<QuizCategory> {

  public categories$ = this.entities$;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(QuizCategoryFeatureKey, serviceElementsFactory);
  }
}
