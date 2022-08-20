export class TimerInfo {
  totalTime: string;
  endTime: number;
  type: TimerOption;
  visualOptions: TimerVisualOption;

  constructor(
   {
      totalTime = '',
      endTime = 0,
      type = TimerOption.Countdown,
      visualOptions = TimerVisualOption.Small
   }
  )  {
    this.totalTime = totalTime;
    this.endTime = endTime;
    this.type = type;
    this.visualOptions = visualOptions;
  }
 
}

export enum TimerVisualOption {
  Full = 'full',
  Small = 'small',
}

export enum TimerOption {
  ShowFixedTime = 'fixed',
  Countdown = 'countdown',
  Clear = 'clear',
}

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}