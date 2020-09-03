document.querySelector('.timer__icon').addEventListener('click', () => {
  let timeLimit = Number(document.querySelector('.display__input').value) * 60;
  let timeLeft = timeLimit;
  let WARNING_THRESHOLD = timeLimit / 2;
  let ALERT_THRESHOLD = timeLimit / 5;
  const FULL_DASH_ARRAY = 283;
  let timerInterval = null;

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

  document.getElementById('clock-label').innerHTML = formatTime(timeLeft);
  document.querySelector('.clock__label--timer').classList.remove('clock__label--timer');
  document.querySelector('.clock__setTime').classList.add('clock__setTime--hide');
  document.querySelector('.timer__icon--start').style.display = 'none';

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

    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document
      .getElementById('clock-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  }
});
