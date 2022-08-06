import { createAction, props } from "@ngrx/store";
import { Questionnaire, Quiz } from "../quiz.model";

export const loadSuccess = createAction(
                '[Questionnarire Component] Loaded Successfully',
                props<{questionnaire: Questionnaire}>());

export const loadFailed = createAction(
                '[Questionnarire Component] Load Failed',
                props<{error: Error}>());

export const changeQuiz = createAction(
                '[Questionnarire Component] Quiz Changed',
                props<{quiz: Quiz}>());

export const answerSelected = createAction(
                '[Questionnarire Component] Answer Selected',
                props<{selectedAnswer: string, index: number}>());

export const answerSubmitted = createAction(
                '[Questionnarire Component] Quiz Answer Submitted');