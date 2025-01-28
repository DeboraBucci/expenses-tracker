export function getFormattedDate(date) {
  return `${date.getFullYear()}/${padStartZero(
    date.getMonth() + 1
  )}/${padStartZero(date.getDay())}`;
}

function padStartZero(num) {
  return num.toString().padStart(2, 0);
}

export function getDateDaysAgo(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
