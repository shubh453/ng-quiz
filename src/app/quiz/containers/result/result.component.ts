import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Time } from '../../models/timer-info';
import { Grade, TestResult } from '../../store/quiz.model';

@Component({
  selector: 'quiz-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() result: TestResult | undefined | null;
  @Input() completedOn: Date | null | undefined;
  @Input() completionTime!: Time | undefined | null;

  @Output() onRetake = new EventEmitter<boolean>();

  get isPassed(): boolean {
    return !!this.result?.isPassed;
  }

  retake() {
    this.onRetake.emit(true);
  }
}

