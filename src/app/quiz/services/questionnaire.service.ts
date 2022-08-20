import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  HttpUrlGenerator,
} from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { merge, Observable } from 'rxjs';
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
  
    const markUpdate$ = this.http.patch<Questionnaire>(`${defaultDataServiceConfig.root}/questionnaires/updateanswer/${update.id}`, update.changes)
    const statusUpdate$ = this.http.patch<Questionnaire>(`${defaultDataServiceConfig.root}/questionnaires/updatestatus/${update.id}`, 3)

    return merge(markUpdate$, statusUpdate$)
  }
}
