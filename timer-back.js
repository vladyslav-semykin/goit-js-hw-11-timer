const refs = {
  secs: document.querySelector('[data-value="secs"]'),
  mins: document.querySelector('[data-value="mins"]'),
  hours: document.querySelector('[data-value="hours"]'),
  days: document.querySelector('[data-value="days"]'),
};

class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    this.targetDate = new Date(this.targetDate).getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const deadLine = this.targetDate - currentTime;
      const time = this.getTimeComponents(deadLine);
      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  onTick: addClockElement,
  selector: "#timer-1",
  targetDate: new Date("Dec 31 2021"),
});

function addClockElement({ days, hours, mins, secs }) {
  refs.secs.textContent = `${secs}`;
  refs.mins.textContent = `${mins}`;
  refs.hours.textContent = `${hours}`;
  refs.days.textContent = `${days}`;
}

timer.start();
