import { QuizCategory } from "../store/quiz-category.model";

export type QuizCategoryFormType = Partial<QuizCategoryFormValue>

export interface QuizCategoryFormValue {
    quizcategory: QuizCategory;
    numberOfQuestion: number
}