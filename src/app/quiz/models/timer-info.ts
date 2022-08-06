export class TimerInfo {
  totalTime: string;
  endTime: Date;
  type: TimerOption;
  visualOptions: TimerVisualOption;

  constructor(
   {
      totalTime = '',
      endTime = new Date(),
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
