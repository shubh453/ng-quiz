import { DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from 'src/environments/environment';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.baseurl,
};

export const QuestionnaireFeatureKey = 'Questionnaire';
export const QuizCategoryFeatureKey = 'QuizCategory';
export const QuizFeatureKey = 'Quiz';
