import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { concat, concatMap, map, merge, mergeMap, Observable, zip } from 'rxjs';
import { Time } from '../../models/timer-info';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Quizmarked, Quizzes, TestResult } from '../../store/quiz.model';
import {
  selectCompletedDate,
  selectElapsedTime,
} from '../../store/selectors/questionnaire.selector';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultPageComponent {
  result$: Observable<TestResult | undefined>;
  completedDate$: Observable<Date | null | undefined>;
  timerTime$: Observable<Time | undefined>;
  quizzes$: Observable<Quizzes | undefined>;
  toggleNav = false;
  constructor(
    private store: Store,
    private questionnaireService: QuestionnaireService
  ) {
    this.result$ = this.questionnaireService.entities$.pipe(
      map((e) => e[e.length - 1]?.testResult)
    );
    this.quizzes$ = this.questionnaireService.entities$.pipe(
      map((e) => e[e.length - 1]?.quizzes)
    )
    this.timerTime$ = this.store.pipe(select(selectElapsedTime));
    this.completedDate$ = this.store.pipe(select(selectCompletedDate));
  }

  retakeTest() {}

  openAnalysis() {
    this.toggleNav = !this.toggleNav;
  }

  get markedAnswers$() {
    return zip([this.result$, this.quizzes$]).pipe(map(([r, q]) => {
      return q?.map(quiz => {
        return {
          ...quiz,
          selectedAnswer: r?.markedAnswer[quiz.id]
        } as Quizmarked
      })      
    }))
  } 
}
