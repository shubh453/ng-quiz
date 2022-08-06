import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizCategoryFormValue } from '../../models/quizCategoryFormType';
import { QuizCategoryService } from '../../services/quiz-category.service';
import { QuizCategories } from '../../store/quiz-category.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  quizCategories$: Observable<QuizCategories> = this.categoryService.categories$;
  
  constructor(private categoryService: QuizCategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  navigate(value: QuizCategoryFormValue) {
    this.router.navigate(['/', 'questionnaire'],
     {queryParams: { category: value.quizcategory.name, questioncount: value.numberOfQuestion }})
  }
}
