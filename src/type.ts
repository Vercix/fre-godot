export type Key = FreText
export interface RefObject<T> {
  current: T
}

export type RefCallback<T> = {
  bivarianceHack(instance: T | null): void
}['bivarianceHack']
export type Ref<T = any> = RefCallback<T> | RefObject<T> | null

export interface Attributes extends Record<string, any> {
  key?: Key
  children?: FreNode
  ref?: Ref
}

export interface FC<P extends Attributes = {}> {
  (props: P): FreElement<P> | null
  fiber?: IFiber
  tag?: number
  type?: string
}

export interface FreElement<P extends Attributes = any, T = string> {
  type: T
  props: P
  key: string
}

export type HookTypes = 'list' | 'effect' | 'layout'

export interface IHook {
  list: IEffect[]
  layout: IEffect[]
  effect: IEffect[]
}

export type IRef = (e: GodotElement | undefined) => void | { current?: GodotElement }

export interface IFiber<P extends Attributes = any> {
  key?: string
  type: string | FC<P>
  parentNode: GodotElementEx
  node?: GodotElementEx | GodotElementNode
  kids?: any
  parent?: IFiber<P>
  sibling?: IFiber<P>
  child?: IFiber<P>
  done?: () => void
  ref: IRef
  hooks: IHook
  oldProps: P
  after: any
  props: P
  lane: number
  time: number
  e: IFiber,
  prev: IFiber,
  d: IFiber,
  laziness: any[],
  dirty: boolean,
  isComp: boolean,
  isNode: boolean,
}

export type GodotElement = godot.Control
export type GodotElementEx = godot.Control & { last: IFiber | null,  }
export type GodotElementNode = GodotElementEx & { _render(): IFiber | null, fiber: IFiber}

export type IEffect = [Function?, number?, Function?]

export type FreText = string | number
export type FreNode = FreText | FreElement | FreNode[] | boolean | null | undefined
export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A, resume?: boolean) => void
export type Reducer<S, A> = (prevState: S, action: A) => S
export type IVoidCb = () => void
export type EffectCallback = () => void | (IVoidCb | undefined)
export type DependencyList = Array<any>

export interface PropsWithChildren {
  children?: FreNode
}

export type ITaskCallback = ((time: boolean) => boolean) | null

export interface ITask {
  callback?: ITaskCallback
  fiber: IFiber
}

export type DOM = GodotElement | SVGElement
