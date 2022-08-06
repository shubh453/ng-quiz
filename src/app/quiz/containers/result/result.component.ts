import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quizzes, TestResult } from '../../store/quiz.model';

@Component({
  selector: 'quiz-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() result: TestResult | undefined | null;
  @Input() quizzes: Quizzes | undefined | null;
  @Input() completedOn!: Date;
  @Input() completionTime!: string;
  score!: number;
  total!: number;
  grade!: Grade;
  @Output() onRetake = new EventEmitter<boolean>();

  ngOnInit(): void {
    const { score, total, grade } = this.calculateReult();
    this.score = score;
    this.total = total;
    this.grade = grade;
  }

  calculateReult(): { score: number; total: number; grade: Grade; } {
    if (this.result && this.quizzes) {
      let correctAnswerCount = 0;
      this.quizzes.forEach((q) => {
        if (this.result?.markedAnswer[q.id] === q.answer) {
          correctAnswerCount++;
        }
      });
      return {
        score: correctAnswerCount,
        total: this.quizzes.length,
        grade:
          correctAnswerCount / this.quizzes.length > 4
            ? Grade.Passed
            : Grade.Failed,
      };
    }

    return { score: 0, total: 0, grade: Grade.Passed };
  }

  retake() {
    this.onRetake.emit(true);
  }
}

enum Grade {
  Passed = 'Passed',
  Failed = 'Failed',
}
