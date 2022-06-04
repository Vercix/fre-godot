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
  console.log("______TASK______")
  console.log(typeof MessageChannel)
  console.log(typeof Promise)
  console.log(pending)
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
  console.log("RETURNING TIMEOUT")
  return () => cb()
}

let translate = task(false)

const flush = (): void => {
  console.log("______FLUSH____dfgdfg__")
  console.log("A")
  console.log(getTime())
  console.log("B")
  deadline = getTime() + threshold
  console.log("C")
  console.log(deadline)
  let job = peek(queue)
  console.log("D")
  console.log(job)
  console.log("E")
  console.log(shouldYield())
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