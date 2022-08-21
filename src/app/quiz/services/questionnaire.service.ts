import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
} from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { Questionnaire } from '../store/quiz.model';
import { defaultDataServiceConfig, QuestionnaireFeatureKey } from '../store/store-keywords';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireResultService extends DefaultDataService<Questionnaire> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super(QuestionnaireFeatureKey, http, httpUrlGenerator, defaultDataServiceConfig);
  }

  override update(update: Update<Questionnaire>): Observable<Questionnaire> {
    return this.http.patch<Questionnaire>(`${defaultDataServiceConfig.root}/questionnaires/updateanswer/${update.id}`, update.changes)
  }
}

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService extends EntityCollectionServiceBase<Questionnaire> {

  public categories$ = this.entities$;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(QuestionnaireFeatureKey, serviceElementsFactory);
  }
}
