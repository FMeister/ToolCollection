interface Todo {
  description: string;
  done: boolean;
}
interface TimerPreset {
  displayName: string;
  duration: number;
}

export class App {
  // public heading = "Timer";
  // public todos: Todo[] = [];
  // public todoDescription = '';

  public presetTimerList: TimerPreset[] = [
    { displayName: "Reis", duration: 7 * 60 },
    { displayName: "FrenchPress1", duration: 5 * 60 },
    { displayName: "FrenchPress2", duration: 4 * 60 }
  ];

  public startTime = new Date();
  public currentTime = new Date();
  public displayedTime = "0 : 0 : 0";

  public inputSecounds = null;
  public inputMinutes = null;
  public inputHours = null;

  public inputTargetSecounds = 0;
  public timerIsRunning = false;



  startTimer() {
    this.startTime = new Date();
    this.timerIsRunning = true;

    this.inputTargetSecounds = 0;
    if (this.inputHours != null)
      this.inputTargetSecounds += Number(this.inputHours * 3600);

    if (this.inputMinutes != null)
      this.inputTargetSecounds += Number(this.inputMinutes * 60);

    if (this.inputSecounds != null)
      this.inputTargetSecounds += Number(this.inputSecounds);

    this.updateTimer();
  }

  startPresetTimer(preset: TimerPreset) {
    this.startTimer();
    this.inputTargetSecounds = preset.duration;
  }

  stopTimer() {
    this.timerIsRunning = false;
  }

  updateTimer() {
    this.currentTime = new Date();

    let secoundsLeft: number = this.inputTargetSecounds - (this.currentTime.getSeconds() - this.startTime.getSeconds());
    if (secoundsLeft == 0)
      this.stopTimer();

    this.displaySecounds(secoundsLeft);

    if (!this.timerIsRunning) {
      return;
    } else {
      requestAnimationFrame(this.updateTimer.bind(this));
    }
  }

  displaySecounds(secounds: number) {

    let hours: number = Math.floor(secounds / 3600);
    secounds -= 3600 * hours;
    let minutes: number = Math.floor(secounds / 60);
    secounds -= 60 * minutes;

    this.displayedTime = "" + hours + " : " + minutes + " : " + secounds;
  }

}
