import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  concat,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  Subject,
  Subscription,
  throwError,
} from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {
  Time,
  TimerInfo,
  TimerOption,
  TimerVisualOption,
} from '../../models/timer-info';
import { QuestionnaireService } from '../../services/questionnaire.service';
import {
  answerSelected,
  answerSubmitted,
  changeQuiz,
  loadFailed,
  loadSuccess,
  timerCompleted,
} from '../../store/actions/questionnaire.actions';
import {
  Questionnaire,
  Quiz,
  Quizzes,
} from '../../store/quiz.model';
import {
  allSelectedAnswers,
  currentQuiz,
  selectAllQuizzes,
  selectedAnswer,
  selectError,
  selectQuizCompletionStatus,
} from '../../store/selectors/questionnaire.selector';

@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  questionnaire!: Questionnaire;
  readonly currentQuiz$: Observable<Quiz | undefined>;
  readonly quizzes$: Observable<Quizzes | undefined>;
  readonly steps$: Observable<number[] | undefined>;
  readonly currentSelectedAnswers$!: Observable<
    { quizId: number; answer: string } | undefined
  >;
  readonly allSelectedAnswers$!: Observable<
    { quizId: number; answer: string }[] | undefined
  >;
  readonly isQuestionnaireCompleted$: Observable<boolean | undefined>;
  readonly error$: Observable<Error | undefined>;
  readonly stopTimer = new Subject<boolean>();

  timerInfo : TimerInfo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private store: Store,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.currentQuiz$ = this.store.pipe(select(currentQuiz));
    this.quizzes$ = this.store.pipe(select(selectAllQuizzes));
    this.steps$ = this.quizzes$.pipe(map((q) => q?.map((c) => c.id)));
    this.currentSelectedAnswers$ = this.store.pipe(
      select(selectedAnswer),
      filter((val) => val !== undefined)
    );
    this.allSelectedAnswers$ = this.store.pipe(select(allSelectedAnswers));
    this.isQuestionnaireCompleted$ = this.store.pipe(
      select(selectQuizCompletionStatus)
    );
    this.error$ = concat(
      this.store.pipe(
        select(selectError),
        filter((e) => !!e)
      ),
      this.questionnaireService.errors$.pipe(
        map((e) => e.payload.data?.error?.error)
      )
    );
  }

  ngOnInit(): void {
    const subsxription = this.route.queryParams
      .pipe(
        mergeMap((param) => {
          const category = param['category'];
          const questionCount = param['questioncount'];
          this.timerInfo = new TimerInfo({
            type: TimerOption.Countdown,
            visualOptions: TimerVisualOption.Full,
            endTime: questionCount * 30000,
          });
          return this.questionnaireService.getWithQuery({
            category: category,
            questionCount: questionCount,
          });
        }),
        catchError((err) => {
          this.store.dispatch(loadFailed({ error: err }));
          return throwError(() => err);
        })
      )
      .subscribe((s) => {
        this.questionnaire = s[0];
        this.store.dispatch(loadSuccess({ questionnaire: s[0] }));
      });

    const errorSub = this.error$.subscribe((e) =>
      this._snackBar.open(e?.message || 'Something went wrong', 'Close')
    );
    this.subscriptions.add(subsxription);
    this.subscriptions.add(errorSub);
  }

  saveAnswer(selectedValue: { id: number; answer: string }) {
    firstValueFrom(
      this.steps$.pipe(
        map((s) => s?.findIndex((step) => step === selectedValue.id))
      )
    ).then((i) => {
      this.store.dispatch(
        answerSelected({
          index: !i || i < 0 ? 0 : i,
          selectedAnswer: selectedValue.answer,
        })
      );
    });
  }

  submitAnswers() {
    let dialogref = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '150px',
    });

    dialogref.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && this.questionnaire) {
        this.submitAnswerInternal();
      }
    });
  }

  private submitAnswerInternal() {
    setTimeout(async () => {
      const selectedAnswers = await firstValueFrom(
        this.allSelectedAnswers$
      );
      let result: { [key: number]: string; } = {};
      selectedAnswers?.forEach((r) => (result[r.quizId] = r.answer));
      this.questionnaireService.update({
        ...this.questionnaire,
        ...{
          testResult: {
            markedAnswer: result,
            isPassed: false,
            score: null
          },
        },
      });
    });

    this.stopTimer.next(true);
    this.store.dispatch(answerSubmitted());
    this.router.navigate(['/result']);
  }

  updateCurrentQuiz(currentQuizId: number) {
    firstValueFrom(
      this.quizzes$.pipe(map((q) => q?.find((c) => c.id === currentQuizId)))
    ).then((quiz) => {
      if (quiz) {
        this.store.dispatch(changeQuiz({ quiz }));
      }
    });
  }

  updateTime(time: Time) {
    this.store.dispatch(timerCompleted({ time }));
    this.submitAnswerInternal();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.stopTimer.unsubscribe();
  }
}
