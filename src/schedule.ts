import { IFiber, ITask, ITaskCallback } from './type'

const queue: ITask[] = []
const threshold: number = 5
const transitions = []
let deadline: number = 0

export const startTransition = cb => {
  transitions.push(cb) && translate()
}

export const schedule = (callback: any): void => {
  queue.push({ callback } as any)
  startTransition(flush)
}

const task = (pending: boolean) => {
  const cb = () => transitions.splice(0, 1).forEach(c => c())
  if (!pending && typeof Promise !== 'undefined') {
    console.log("RETURNING HERE")
    // Todo queueMicrotask
    return () => Promise.resolve().then(cb)
  }
  if (typeof MessageChannel !== 'undefined') {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = cb
    return () => port2.postMessage(null)
  }
  return () => cb()
}

let translate = task(false)

const flush = (): void => {
  deadline = getTime() + threshold
  let job = peek(queue)
  while (job && !shouldYield()) {
    const { callback } = job as any
    job.callback = null
    const next = callback()
    if (next) {
      job.callback = next as any
    } else {
      queue.shift()
    }
    job = peek(queue)
  }
  job && (translate = task(shouldYield())) && startTransition(flush)
}

export const shouldYield = (): boolean => {
  return false//getTime() >= deadline
}
// @ts-ignore
export const getTime = () => godot.OS.get_ticks_msec() 

const peek = (queue: ITask[]) => queue[0]