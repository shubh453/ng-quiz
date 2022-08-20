import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  finalize,
  interval,
  last,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { Time, TimerInfo } from '../../models/timer-info';

@Component({
  selector: 'quiz-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  public time$: Observable<Time> = of({ hours: 0, minutes: 0, seconds: 0 });
  @Input('stop') stopTimer = new Subject<boolean>();
  @Output() timerComplete = new EventEmitter<Time>();
  elapsedTimeInSec = 0;
  endDate = new Date();
  private _info!: TimerInfo;
  @Input()
  set info(value: TimerInfo) {
    this._info = value;
    this.endDate = new Date(new Date().getTime() + this.info.endTime);
    this.time$ = timer(0, 1000).pipe(
      takeUntil(this.stopTimer),
      takeWhile(t => Math.floor(this.getDistance(this.endDate) / 1000 ) >= 0),
      tap(n => this.elapsedTimeInSec = n + 1),
      switchMap(() => of(this.getRemainingTime(this.endDate))),
      finalize(() => {
        this.timerComplete.emit(
          this.transformMilisecondToTime(this.elapsedTimeInSec * 1000)
        )
      })
    );
  }

  get info(): TimerInfo {
    return this._info;
  }

  private getRemainingTime(endTime: Date): Time {
    return this.transformMilisecondToTime(this.getDistance(endTime));
  }

  private getDistance(endTime: Date) {
    return endTime.getTime() - new Date().getTime();
  }

  private transformMilisecondToTime(miliseconds: number): Time {
    let hours = Math.floor(
      (miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }
}
