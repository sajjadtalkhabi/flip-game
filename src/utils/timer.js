// Timer.js
import Emitter from "mitt";

export class Timer {
    interval;
    isStarted;
    time;
    emitter;

    constructor(time) {
        this.isStarted = false;
        this.time = time;
        this.emitter = Emitter();
    }

    start() {
        this.interval = setInterval(() => {
            if (--this.time === 0) {
                clearInterval(this.interval);
                this.emitter.emit("timerFinished");
                this.isStarted = false;
            }

            this.emitter.emit("timeChange", this.time);
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.isStarted = false;
    }
}
