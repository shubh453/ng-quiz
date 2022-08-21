import { Component, Input } from '@angular/core';
import { Quizmarked } from '../../store/quiz.model';

@Component({
  selector: 'result-analysis',
  templateUrl: './result-analysis.component.html',
  styleUrls: ['./result-analysis.component.scss']
})
export class ResultAnalysisComponent  {

  @Input() markedAnswers: Quizmarked[] | undefined | null;
  trackBy(index: number, name: Quizmarked): number {
    return name.id;
  }

  getClass(quiz : Quizmarked, option : string): string {
    let classes = '';
    if(quiz.answer === option)
    {
      classes = 'correct-selection';
    }
    if(quiz.selectedAnswer === option && quiz.selectedAnswer !== quiz.answer ) {
      classes = 'wrong-selection';
    }
    
    return classes;
  }
}
