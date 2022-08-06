import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  Subscription,
  throwError,
} from 'rxjs';
import { QuestionnaireResultService } from '../../services/questionnaire.service';
import {
  answerSelected,
  changeQuiz,
  loadFailed,
  loadSuccess,
} from '../../store/actions/questionnaire.actions';
import {
  allSelectedAnswers,
  currentQuiz,
  selectAllQuizzes,
  selectedAnswer,
  selectResult,
} from '../../store/selectors/questionnaire.selector';
import { Questionnaire, Quiz, Quizzes, TestResult } from '../../store/quiz.model';
import {
  TimerInfo,
  TimerOption,
  TimerVisualOption,
} from '../../models/timer-info';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import { QuestionnaireFeatureKey } from '../../store/store-keywords';

@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  private readonly questionnaireService: EntityCollectionService<Questionnaire>;
  private readonly subscriptions = new Subscription();

  questionnaire!: Questionnaire;
  readonly currentQuiz$: Observable<Quiz | undefined>;
  readonly quizzes$: Observable<Quizzes | undefined>;
  readonly steps$: Observable<number[] | undefined>;
  readonly currentSelectedAnswers$!: Observable<{ quizId: number; answer: string } | undefined>;
  readonly allSelectedAnswers$!: Observable<{ quizId: number; answer: string }[] | undefined>;
  readonly result$: Observable<TestResult | undefined>;

  completedDate = new Date() ;
  timerTime!: string;

  timerInfo = new TimerInfo({
    type: TimerOption.Countdown,
    visualOptions: TimerVisualOption.Full,
    endTime: new Date(new Date().getTime() + 30 * 60000),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceFactory: EntityCollectionServiceFactory,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.questionnaireService = serviceFactory.create<Questionnaire>(QuestionnaireFeatureKey);
    this.result$ = this.questionnaireService.entities$.pipe(map(q=> q[0]?.testResult));
    this.currentQuiz$ = this.store.pipe(select(currentQuiz));
    this.quizzes$ = this.store.pipe(select(selectAllQuizzes));
    this.steps$ = this.quizzes$.pipe(map((q) => q?.map((c) => c.id)));
    this.currentSelectedAnswers$ = this.store.pipe(
      select(selectedAnswer),
      filter((val) => val !== undefined)
    );
    this.allSelectedAnswers$ = this.store.pipe(select(allSelectedAnswers));
  }

  ngOnInit(): void {
    const subsxription = this.route.queryParams
      .pipe(
        mergeMap((param) => {
          const category = param['category'];
          const questionCount = param['questioncount'];
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
    this.subscriptions.add(subsxription);
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
      width: '250px',
    });

    dialogref.afterClosed().subscribe((result) => {
      if (result && this.questionnaire) {

        setTimeout(async () => {

          const selectedAnswers = await firstValueFrom(
            this.allSelectedAnswers$ 
          );
          let result: { [key: number]: string } = {};
          selectedAnswers?.forEach((r) => (result[r.quizId] = r.answer));
          this.questionnaireService.update({
            ...this.questionnaire,
            ...{
              testResult: {
                markedAnswer: result,
                isPassed: false,
              },
            },
          })
        });
        
        this.completedDate = new Date(Date.now());
        // breaking the rules to mutate and preserve state in the component
        this.questionnaire.isComplete = true;
      }
    });
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

  retakeTest() {

  }

  completeTimer(value: string) {
    this.timerTime = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
