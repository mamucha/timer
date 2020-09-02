const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.querySelector('.timer__clock').innerHTML = `

  <svg class="clock__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="clock__circle">
      <circle class="clock__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="clock-path-remaining"
        stroke-dasharray="283"
        class="clock__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="clock-label" class="clock__label">0:00</span>

`;

document.querySelector('.timer__icon').addEventListener('click', () => {
  let timeLimit = document.querySelector('.display__input').value;
  let timeLeft = timeLimit;

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('clock-label').innerHTML = formatTime(timeLeft);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document.getElementById('clock-path-remaining').classList.remove(warning.color);
      document.getElementById('clock-path-remaining').classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document.getElementById('clock-path-remaining').classList.remove(info.color);
      document.getElementById('clock-path-remaining').classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    console.log(timeLeft, timeLimit);
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document
      .getElementById('clock-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  }
});
