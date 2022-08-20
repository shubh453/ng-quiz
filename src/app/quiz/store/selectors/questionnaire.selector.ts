import { EntitySelectorsFactory } from "@ngrx/data";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Questionnaire } from "../quiz.model";
import { State } from "../quiz.state";
import { QuestionnaireFeatureKey } from "../store-keywords";


export const selectCurrentState = createFeatureSelector<State>(QuestionnaireFeatureKey);
export const questionnaireEntitySelector = new EntitySelectorsFactory().create<Questionnaire>(QuestionnaireFeatureKey);

export const currentQuiz = createSelector(
    selectCurrentState,
    (state) => state.currentQuiz
)

export const selectAllQuizzes = createSelector(
    selectCurrentState,
    (state) => state.questionnaire?.quizzes
)

export const selectedAnswer = createSelector(
    selectCurrentState,
    currentQuiz,
    (state, q) => state.selectedAnswer.find(a => a.quizId === q?.id)
)

export const allSelectedAnswers = createSelector(
    selectCurrentState,
    (state) => state.selectedAnswer
)

export const selectResult = createSelector(
    selectCurrentState,
    (state) => state.questionnaire?.testResult 
)

export const selectQuizCompletionStatus = createSelector(
    selectCurrentState,
    (state) => state.isCompleted
)

export const selectError = createSelector(
    selectCurrentState,
    (state) => state.error
)

export const selectElapsedTime = createSelector(
    selectCurrentState,
    (state) => state.elapsedTime
)

export const selectCompletedDate = createSelector(
    selectCurrentState,
    (state) => state.completionDate
)

