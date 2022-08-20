import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { QuizCategoryFormValue } from '../../models/quizCategoryFormType';
import { QuizCategoryService } from '../../services/quiz-category.service';
import { QuizCategories } from '../../store/quiz-category.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit, OnDestroy {
  quizCategories$: Observable<QuizCategories> =
    this.categoryService.categories$;
  readonly error$: Observable<any | undefined>;
  errorSubscription: Subscription | undefined;

  constructor(
    private categoryService: QuizCategoryService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.error$ = this.categoryService.errors$.pipe(
      map((e) => e.payload.data?.error?.error?.message)
    );
  }

  ngOnInit(): void {
    this.errorSubscription = this.error$.subscribe((e) => {
      this._snackBar.open(e || 'Something went wrong', 'Close');
    });
    this.categoryService.getAll();
  }

  navigate(value: QuizCategoryFormValue) {
    this.router.navigate(['/', 'questionnaire'], {
      queryParams: {
        category: value.quizcategory.name,
        questioncount: value.numberOfQuestion,
      },
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
