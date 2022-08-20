import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuizCategoryCardComponent } from './containers/quiz-category-card/quiz-category-card.component';
import { QuizCardComponent } from './containers/quiz-card/quiz-card.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { StepperComponent } from './containers/stepper/stepper.component';
import { StoreModule } from '@ngrx/store';
import * as questReducer from "src/app/quiz/store/reducers/questionnaire.reducers";
import { TimerComponent } from './containers/timer/timer.component';
import { QuestionnaireResultService } from './services/questionnaire.service';
import { EntityDataService } from '@ngrx/data';
import { ResultComponent } from './containers/result/result.component';
import { QuestionnaireFeatureKey } from './store/store-keywords';
import { ResultPageComponent } from './components/result-page/result-page.component';

@NgModule({
  declarations: [
    QuizCategoryCardComponent,
    QuizCardComponent,
    WelcomeComponent,
    QuestionnaireComponent,
    StepperComponent,
    TimerComponent,
    ResultComponent,
    ResultPageComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    StoreModule.forFeature(QuestionnaireFeatureKey, questReducer.reducer)
  ],
  providers: [
    QuestionnaireResultService
  ]
})
export class QuizModule {
  constructor(entityDataService: EntityDataService,
    questionnaireResultService: QuestionnaireResultService,) {
      entityDataService.registerService(QuestionnaireFeatureKey, questionnaireResultService);
  }
 }
