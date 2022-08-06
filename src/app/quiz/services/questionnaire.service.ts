import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
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
    return this.http.put<Questionnaire>(`${defaultDataServiceConfig.root}/questionnaires/updateanswer/${update.id}`, update.changes)
  }
}
