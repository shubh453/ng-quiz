import { Action, createReducer, on } from '@ngrx/store';
import * as QuestionnaireComponentActions from '../actions/questionnaire.actions';
import { State } from '../quiz.state';

export const initialState: State = {
  currentQuiz: undefined,
  questionnaire: undefined,
  error: undefined,
  selectedAnswer: [],
  isCompleted: false,
  elapsedTime: {
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  completionDate: null
};

const questionnaireReducer = createReducer(
  initialState,
  on(QuestionnaireComponentActions.loadSuccess, (state, { questionnaire }) => ({
    ...state,
    questionnaire: questionnaire,
    currentQuiz: questionnaire.quizzes[0],
    selectedAnswer: 
      questionnaire.quizzes.map((q) => {
        return  { quizId: q.id, answer: ''};
      }),
    isCompleted: false,
    elapsedTime: {hours: 0, minutes: 0, seconds: 0},
    completionDate: null,
    error: undefined
  })),
  on(QuestionnaireComponentActions.loadFailed, (state, { error }) => ({
    ...state,
    questionnaire: undefined,
    currentQuiz: undefined,
    error: error,
  })),
  on(
    QuestionnaireComponentActions.answerSelected,
    (state, { selectedAnswer, index }) => ({
      ...state,
      selectedAnswer: [
        ...state.selectedAnswer.slice(0, index),
        { ...state.selectedAnswer[index], answer: selectedAnswer  },
        ...state.selectedAnswer.slice(index+1),
      ],
    })
  ),
  on(QuestionnaireComponentActions.changeQuiz, (state, { quiz }) => ({
    ...state,
    currentQuiz: quiz,
  })),
  on(QuestionnaireComponentActions.answerSubmitted, (state) => ({
    ...state,
    isCompleted: true,
    completionDate: new Date()
  })),
  on(QuestionnaireComponentActions.timerCompleted, (state, {time}) => ({
    ...state,
    elapsedTime: time
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return questionnaireReducer(state, action);
}
