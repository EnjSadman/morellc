import { milisecondsToClockTime, milisecondsToMinutes, minutesToMiliseconds } from "../utils/timeConvert";

const RESERVATION_TIME_LIMIT = 15;
const TIME_LOW = 3;

export function reservationTimerInit(id) {
  const prevData = window.localStorage.getItem("id");
  const date = Date.now();
  const timerData = {
    id,
    start: date,
    end: minutesToMiliseconds(RESERVATION_TIME_LIMIT) + date,
  }
  if (prevData !== null) {
    const parsedData = JSON.parse(prevData);
    if (parsedData.id === id) {
      return parsedData;
    } else {
      window.localStorage.setItem("id", JSON.stringify(timerData));
      return timerData;
    }
  }
  window.localStorage.setItem("id", JSON.stringify(timerData));
  return timerData;
}

export function timerSetter(id) {
  const data = reservationTimerInit(id);
  const timer = document.getElementById("timerClock");
  const bar = document.getElementById('timeBar');
  const totalTime = minutesToMiliseconds(RESERVATION_TIME_LIMIT);
  let remainingTime = data.end - Date.now();

  const timerSet = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = milisecondsToClockTime(data.end - currentTime);
    const percentage = (remainingTime / totalTime) * 100;

    if (milisecondsToMinutes(data.end - currentTime) <= TIME_LOW && !bar.classList.contains("low-on-time")) {
      bar.classList.add("low-on-time");
    }

    bar.style.width = `${percentage}%`
    timer.innerHTML = `${(timeLeft.minutes < 10) ? `0${timeLeft.minutes}` : timeLeft.minutes} : ${(timeLeft.seconds < 10) ? `0${timeLeft.seconds}` : timeLeft.seconds}`;
    remainingTime -= 1000;

    if (currentTime >= data.end) {
      clearInterval(timerSet);
      timer.innerHTML = "00 : 00";
      bar.style.width = "0";
    }
  }, 1000)
}