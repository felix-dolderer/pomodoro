// #region general

export const LOCAL_STORAGE_TOKENS = Object.freeze({
  CONFIG_AUTO_PLAY: "autoPlay",
  CONFIG_AUTO_REMOVE: "autoRemove",
  CONFIG_TIMER_PRESET: "timerPreset",
  TIMERS: "timers",
})

// #endregion general

// #region autoPlay

// localStorage maybe undefined due to SSR
// components that use this composable should be wrapped in <ClientOnly>
export const useAutoPlay = () =>
  useState<boolean>(LOCAL_STORAGE_TOKENS.CONFIG_AUTO_PLAY, initAutoPlay)

function initAutoPlay() {
  const autoPlayDefault = true

  try {
    if (!localStorage) return autoPlayDefault
  } catch (_) {
    return autoPlayDefault
  }

  const autoPlayStored = localStorage.getItem(
    LOCAL_STORAGE_TOKENS.CONFIG_AUTO_PLAY,
  )

  if (autoPlayStored === null) {
    return autoPlayDefault
  } else {
    return autoPlayStored === "true"
  }
}

// #endregion autoPlay

// #region autoRemove

// localStorage maybe undefined due to SSR
// components that use this composable should be wrapped in <ClientOnly>
export const useAutoRemove = () =>
  useState<boolean>(LOCAL_STORAGE_TOKENS.CONFIG_AUTO_REMOVE, initAutoRemove)

function initAutoRemove() {
  const autoRemoveDefault = true

  try {
    if (!localStorage) return autoRemoveDefault
  } catch (_) {
    return autoRemoveDefault
  }

  const autoRemoveStored = localStorage.getItem(
    LOCAL_STORAGE_TOKENS.CONFIG_AUTO_REMOVE,
  )

  if (autoRemoveStored === null) {
    return autoRemoveDefault
  } else {
    return autoRemoveStored === "true"
  }
}

// #endregion autoRemove

// #region timerPreset

// localStorage maybe undefined due to SSR
// components that use this composable should be wrapped in <ClientOnly>
export const useTimerPreset = () =>
  useState<string>(LOCAL_STORAGE_TOKENS.CONFIG_TIMER_PRESET, initTimerPreset)

function initTimerPreset() {
  const timerPresetDefault = "00:30:00.000"

  try {
    if (!localStorage) return timerPresetDefault
  } catch (error) {
    return timerPresetDefault
  }

  const storedTimerPreset = localStorage.getItem(
    LOCAL_STORAGE_TOKENS.CONFIG_TIMER_PRESET,
  )

  const timerRegex = /^(\d{2}):(\d{2}):(\d{2})?$/

  if (storedTimerPreset && timerRegex.test(storedTimerPreset)) {
    return storedTimerPreset
  } else {
    return timerPresetDefault
  }
}

// #endregion timerPreset
