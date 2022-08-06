import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../quiz.state";
import { QuestionnaireFeatureKey } from "../store-keywords";


export const selectCurrentState = createFeatureSelector<State>(QuestionnaireFeatureKey);

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
