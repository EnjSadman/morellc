export function minutesToMiliseconds(minutes) {
  return minutes * 60000
}

export function milisecondsToMinutes(ms) {
  return ms / 60000
}

export function milisecondsToClockTime(ms) {
  const minutes = Math.floor(milisecondsToMinutes(ms));
  const seconds = Math.floor((ms % 60000) / 1000);


  return {minutes, seconds}
}