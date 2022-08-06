export interface QuizCategory {
    id: number,
    label: string,
    description: string,
    name: string
}

export type QuizCategories = QuizCategory[];

export type CreateQuizCategoryDto = Partial<QuizCategory>;

export type UpdateQuizCategoryDto = Required<Pick<QuizCategory, 'id'>> &
  Partial<Omit<QuizCategory, 'id'>>;

export type DeleteQuizCategoryDto = number;