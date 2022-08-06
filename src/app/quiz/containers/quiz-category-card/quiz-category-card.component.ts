import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  QuizCategoryFormType,
  QuizCategoryFormValue,
} from '../../models/quizCategoryFormType';
import { QuizCategories } from '../../store/quiz-category.model';

@Component({
  selector: 'quiz-category-card',
  templateUrl: './quiz-category-card.component.html',
  styleUrls: ['./quiz-category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizCategoryCardComponent {
  @Input() title: string = '';
  @Input() categories: QuizCategories = [];
  @Output('categorySelected') onCategorySelected = new EventEmitter<QuizCategoryFormValue>();

  formSelectedValues: QuizCategoryFormType = {
    quizcategory: undefined,
    numberOfQuestion: 10,
  };

  numberOfQuestions = [5, 10, 15, 20, 25];

  onStart() {
    if (
      !this.formSelectedValues.quizcategory ||
      !this.formSelectedValues.numberOfQuestion
    ) {
      return;
    }

    this.onCategorySelected.emit({
      quizcategory: this.formSelectedValues.quizcategory,
      numberOfQuestion: this.formSelectedValues.numberOfQuestion,
    });
  }
}
