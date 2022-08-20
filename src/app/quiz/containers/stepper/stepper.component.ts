import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'quiz-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements OnInit, OnDestroy {
  /* Array of the identifier in the steps */
  @Input() steps!: number[];
  @Input() clickable: boolean = true;
  @Output() stepChange = new EventEmitter<number>();
  @ViewChildren('stepbutton') scroller!: QueryList<MatButton>;

  indexSubscription$!: Subscription;
  currentIndex = new BehaviorSubject<number>(0);
  showPrev = false;
  showNext = true;

  ngOnInit(): void {
    this.trackCurrentIndex();
  }

  changeStep(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.updateStepAndEmit(stepIndex);
    }
  }

  nextStep(event: Event): void {
    const index = this.currentIndex.getValue();
    if (index < this.steps.length) {
      this.updateStepAndEmit(index + 1);
    }
    this.scroller
      .find(
        (s) => s._elementRef.nativeElement.id === `step-button-${index + 2}`
      )
      ?._elementRef.nativeElement.scrollIntoView();
  }

  prevStep(event: Event): void {
    const index = this.currentIndex.getValue();
    if (index > 0) {
      this.updateStepAndEmit(index - 1);
    }
    this.scroller
      .find(
        (s) => s._elementRef.nativeElement.id === `step-button-${index - 2}`
      )
      ?._elementRef.nativeElement.scrollIntoView();
  }

  private updateStepAndEmit(index: number): void {
    this.currentIndex.next(index);
    this.stepChange.emit(this.steps[this.currentIndex.getValue()]);
  }

  private trackCurrentIndex(): void {
    this.indexSubscription$ = this.currentIndex.subscribe((index) => {
      switch (index) {
        case 0:
          this.showPrev = false;
          this.showNext = true;
          break;
        case this.steps.length - 1:
          this.showPrev = true;
          this.showNext = false;
          break;
        default:
          this.showPrev = true;
          this.showNext = true;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.indexSubscription$?.unsubscribe();
  }

  setId(id: string, index: number) {
    return `${id}-${index}`;
  }
}
