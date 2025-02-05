import { getLSItem } from "./localStorageHelper";

export function checkSavedDarkMode(): boolean {
  const savedDarkMode = getLSItem("crypton-test-darkmode");

  if (savedDarkMode) {
    if (savedDarkMode === "true") return true;
    if (savedDarkMode === "false") return false;
  }

  return false;
}
