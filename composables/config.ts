// #region autoPlay

// localStorage maybe undefined due to SSR
// components that use this composable should be wrapped in <ClientOnly>
export const useAutoPlay = () => useState<boolean>("autoPlay", initAutoPlay);

function initAutoPlay() {
  const autoPlayDefault = true;

  try {
    if (!localStorage) return autoPlayDefault;
  } catch (_) {
    return autoPlayDefault;
  }

  const autoPlayStored = localStorage.getItem("autoPlay");

  if (autoPlayStored === null) {
    return autoPlayDefault;
  } else {
    return autoPlayStored === "true";
  }
}

// #endregion autoPlay

// #region timerPreset

// localStorage maybe undefined due to SSR
// components that use this composable should be wrapped in <ClientOnly>
export const useTimerPreset = () =>
  useState<string>("timerPreset", initTimerPreset);

function initTimerPreset() {
  const timerPresetDefault = "00:30:00.000";

  try {
    if (!localStorage) return timerPresetDefault;
  } catch (error) {
    return timerPresetDefault;
  }

  const storedTimerPreset = localStorage.getItem("timerPreset");

  const timerRegex = /^(\d{2}):(\d{2}):(\d{2})?$/;

  if (storedTimerPreset && timerRegex.test(storedTimerPreset)) {
    return storedTimerPreset;
  } else {
    return timerPresetDefault;
  }
}

// #endregion timerPreset
