import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'questionnaire', component: QuestionnaireComponent
  },
  {
    path: 'result', component: ResultPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
