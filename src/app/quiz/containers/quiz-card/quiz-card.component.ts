import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Quiz } from '../../store/quiz.model';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizCardComponent implements OnInit {
  
  @Input() quiz!: Quiz;
  @Input() selectedAnswers!: {quizId: number, answer: string};

  @Output() onChoiceMade = new EventEmitter<{id: number, answer: string}>();

  public form!: FormGroup;
  constructor() { }

  get option(): FormControl<string> {
    return <FormControl> this.form.get('option');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      option: new FormControl<string>('')
    })

    this.option.valueChanges.subscribe(s => this.onChange(s));
  }

  onChange = (value: string) => {
    this.onChoiceMade.emit({
      id: this.quiz.id,
      answer: value
    });
  };
}
