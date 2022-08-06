export interface Quiz {
    id: number,
    question: string,
    answer: string | string [] | null,
    options: string[],
    additionalText: string
}

export type Quizzes = Quiz[];

export type QuizDto = Partial<Pick<Quiz, 'question' | 'options'>> ;

export type CreateQuizDto = Partial<Quiz>;

export type UpdateQuizDto = Required<Pick<Quiz, 'id'>> &
  Partial<Omit<Quiz, 'id'>>;

export type DeleteQuizDto = number;

export interface Questionnaire {
  id: number,
  category: string,
  isComplete: boolean;
  testResult: TestResult;
  quizzes: Quizzes
}

export interface TestResult {
  markedAnswer: { [key: number]: string; };
  isPassed: boolean;
}