export const useAutoPlay = () => useState<boolean>("autoPlay", initAutoPlay);

export function initAutoPlay() {
  const systemAutoPlay = false;

  // localStorage maybe undefined due to SSR
  // components that use this composable should be wrapped in <ClientOnly>
  try {
    if (!localStorage) return systemAutoPlay;
  } catch (_) {
    return systemAutoPlay;
  }

  const storedAutoPlay = localStorage.getItem("autoPlay");

  return storedAutoPlay === "true";
}