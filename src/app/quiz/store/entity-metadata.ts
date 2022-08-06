import { EntityDataModuleConfig, EntityMetadata } from '@ngrx/data';
import { QuizCategory } from './quiz-category.model';
import { Questionnaire, Quiz } from './quiz.model';
import { QuestionnaireFeatureKey, QuizCategoryFeatureKey, QuizFeatureKey } from './store-keywords';

const quizCategoryEntityMetadata: EntityMetadata<QuizCategory> = {
  entityName: QuizCategoryFeatureKey,
  selectId: (category: QuizCategory) => category.id,
};

const quizEntityMetadata: EntityMetadata<Quiz> = {
  entityName: QuizFeatureKey,
  selectId: (quiz: Quiz) => quiz.id,
};

const questionnaireEntityMetadata: EntityMetadata<Questionnaire> = {
  entityName: QuestionnaireFeatureKey,
  selectId: (questionnaire: Questionnaire) => questionnaire.id,
};

const pluralNames = {
  QuizCategory: 'QuizCategories',
  Quiz: 'Quizzes',
};

export const quizEntityConfig: EntityDataModuleConfig = {
  entityMetadata: {
    quizEntityMetadata,
    quizCategoryEntityMetadata,
    questionnaireEntityMetadata,
  },
  pluralNames,
};


