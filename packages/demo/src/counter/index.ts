import {defaultCounter} from './defaultCounter'
export { defaultCounter }

export function setupCounter(element: SetUpCountProps) {
  let counter = defaultCounter
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export type SetUpCountProps = HTMLButtonElement