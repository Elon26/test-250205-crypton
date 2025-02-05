export function getLSItem(LSName: string): string | null {
  return localStorage.getItem(LSName)
}

export function setLSItem(LSName: string, value: string) {
  return localStorage.setItem(LSName, value)
}

export function removeLSItem(LSName: string): void {
  localStorage.removeItem(LSName)
}