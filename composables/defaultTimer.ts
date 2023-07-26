export const useDefaultTimer = () =>
  useState<string>("defaultTimer", initDefaultTimer);

export function initDefaultTimer() {
  const defaultTimerLocalStorage = localStorage?.getItem("defaultTimer");

  const timerRegex = /^(\d{1,2}):(\d{2}):(\d{2}).(\d{3})$/;

  if (defaultTimerLocalStorage && timerRegex.test(defaultTimerLocalStorage)) {
    return defaultTimerLocalStorage;
  } else {
    return "00:30:00.000";
  }
}
