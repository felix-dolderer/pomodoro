export const useDefaultTimer = () =>
  useState<string>("defaultTimer", initDefaultTimer);

export function initDefaultTimer() {
  const systemDefaultTimer = "00:30:00.000";

  // localStorage maybe undefined due to SSR
  // components that use this composable should be wrapped in <ClientOnly>
  try {
    if (!localStorage) return systemDefaultTimer;
  } catch (error) {
    return systemDefaultTimer;
  }

  const storedDefaultTimer = localStorage.getItem("defaultTimer");

  const timerRegex = /^(\d{1,2}):(\d{2}):(\d{2}).(\d{3})$/;

  if (storedDefaultTimer && timerRegex.test(storedDefaultTimer)) {
    return storedDefaultTimer;
  }
  return systemDefaultTimer;
}
