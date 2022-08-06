import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  TimerInfo,
  TimerOption,
  TimerVisualOption,
} from '../../models/timer-info';

@Component({
  selector: 'quiz-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  private _info!: TimerInfo;
  public id: ReturnType<typeof setInterval> | undefined;
  public time: {
    hours: string;
    minutes: string;
    seconds: string;
  } = { hours: '00', minutes: '00', seconds: '00' };

  @Input()
  set info(value: TimerInfo) {
    this._info = value;
    this.checkType(this.info.type);
  }

  get info(): TimerInfo {
    return this._info;
  }

  @Input('stop') stopTimer = false;

  @Output() onComplete = new EventEmitter<string>();

  constructor(private ref: ChangeDetectorRef) { }

  public checkType(timerOption: TimerOption): void {
    if (timerOption === TimerOption.Countdown) {
      this.startTimer();
    } else if (timerOption === TimerOption.Clear) {
      this.clear();
    } else if (timerOption === TimerOption.ShowFixedTime) {
      this.showFixedTime();
    }
  }

  public get isSmallDisplayType(): boolean {
    return this.info.visualOptions === TimerVisualOption.Small;
  }

  private startTimer(): void {
    this.clearInterval();

    this.id = setInterval(() => {
      if(this.stopTimer) {
        this.onComplete.emit(`${this.time.hours}:${this.time.minutes}:${this.time.seconds}`);
        this.clearInterval();
      }

      var now = new Date().getTime();
      var distance = this._info.endTime.getTime() - now;
      this.transformMilisecondInString(distance);

      if (distance < 0) {
        this.clearInterval();
        this.setTime();
      }
    }, 1000);
  }

  private clear(): void {
    this.clearInterval();
    this.setTime();
  }

  private showFixedTime(): void {
    this.clearInterval();

    let arr = this._info.totalTime.split(':');

    let hours = arr[0];
    let minutes = arr[1];
    let seconds = arr[2];

    this.setTime(hours, minutes, seconds);
  }

  private clearInterval(): void {
    if (this.id) {
      clearInterval(this.id);
    }

    this.id = undefined;
  }

  private transformMilisecondInString(miliseconds: number) {
    let hours = Math.floor(
      (miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, '0');
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    this.setTime(hours, minutes, seconds);
  }

  private setTime(
    hours: string = '00',
    minutes: string = '00',
    seconds: string = '00'
  ) {
    this.time = { hours, minutes, seconds };
    this.ref.detectChanges();
  }
}
