import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Time } from '../../models/timer-info';
import { Result, Grade, Quizzes, TestResult } from '../../store/quiz.model';
import {
  selectAllQuizzes,
  selectCompletedDate,
  selectElapsedTime,
  selectResult,
} from '../../store/selectors/questionnaire.selector';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultPageComponent {
  quizzes$: Observable<Quizzes | undefined>;
  result$: Observable<TestResult | undefined>;
  completedDate$: Observable<Date | null | undefined>;
  timerTime$: Observable<Time | undefined>;

  constructor(private store: Store) {
    this.quizzes$ = this.store.pipe(select(selectAllQuizzes));
    this.result$ = this.store.pipe(select(selectResult));
    this.timerTime$ = this.store.pipe(select(selectElapsedTime));
    this.completedDate$ = this.store.pipe(select(selectCompletedDate));
  }

  get getResult(): Observable<Result> {
    return combineLatest([this.result$, this.quizzes$]).pipe(
      map(([r, q]) => {
        const correctAnswerCount =
          q?.filter((quiz) => r?.markedAnswer[quiz.id] === quiz.answer)
            ?.length || 0;
        const total = q?.length || 0;
        return {
          score: correctAnswerCount,
          total: total,
          grade:
            total > 0 && (correctAnswerCount / total) * 10 > 4
              ? Grade.Passed
              : Grade.Failed,
        };
      })
    );
  }

  retakeTest() {}
}
