export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

function padStartZero(num) {
  return num.toString().padStart(2, 0);
}

export function getDateDaysAgo(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
