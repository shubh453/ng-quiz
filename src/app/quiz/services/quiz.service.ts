import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Quiz } from '../store/quiz.model';
import { QuizFeatureKey } from '../store/store-keywords';

@Injectable({
  providedIn: 'root',
})
export class QuizService extends EntityCollectionServiceBase<Quiz> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(QuizFeatureKey, serviceElementsFactory);
  }
}
