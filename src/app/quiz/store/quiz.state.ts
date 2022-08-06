import { Quiz, Questionnaire } from "./quiz.model";

export interface State {
    currentQuiz: Quiz | undefined;
    questionnaire: Questionnaire | undefined;
    error: Error | undefined;
    // selectedAnswer: Map<number, string>;
    selectedAnswer: Array<{ quizId: number, answer: string }>;
    isCompleted: boolean;
  }