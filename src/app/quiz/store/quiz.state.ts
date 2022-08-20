import { Time } from "../models/timer-info";
import { Quiz, Questionnaire } from "./quiz.model";

export interface State {
    currentQuiz: Quiz | undefined;
    questionnaire: Questionnaire | undefined;
    error: Error | undefined;
    selectedAnswer: Array<{ quizId: number, answer: string }>;
    isCompleted: boolean;
    elapsedTime: Time,
    completionDate: Date | null
  }