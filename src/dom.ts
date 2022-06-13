// @ts-nocheck
import { Attributes, DOM, IFiber } from './type'
import { isStr, LANE } from './reconcile'

//godot
import factory from './factory'


const defaultObj = {} as const

const jointIter = <P extends Attributes>(
  aProps = defaultObj as P,
  bProps = defaultObj as P,
  callback: (name: string, a: any, b: any) => void
) => {
  if (!aProps || !bProps) return
  Object.keys(aProps).forEach(k => callback(k, aProps[k], bProps[k]))
  Object.keys(bProps).forEach(k => callback(k, undefined, bProps[k]))
}

export const updateElement = <P extends Attributes>(
  dom: DOM,
  aProps: P,
  bProps: P
) => {
  jointIter(aProps, bProps, (name, a, b) => {
    if (a === b || name === 'children') {

    } else if (name === 'style' && !isStr(b)) {
      jointIter(a, b, (styleKey, aStyle, bStyle) => {
        if (aStyle !== bStyle) {
          dom.set(styleKey, bStyle)
        }
      })
    } else if (name[0] === 'o' && name[1] === 'n' && name[2] === '_') {
      name = name.slice(3).toLowerCase() as Extract<keyof P, string>
      if (a) {
        try {
          dom.disconnect(name, a)
          a['connected'] = false
        } catch (e) {
          console.log(e)
        }
      }
      if(!b['connected']){
        dom.connect(name, b);
        b['connected'] = true
      }
    }
    else if (b == null || b === false) {
      dom.removeAttribute(name)
    } else {
      dom.set(name, b)
    }
  })
}

export const createElement = <P = Attributes>(fiber: IFiber) => {
  // @ts-ignore
  const dom: GodotElement = factory(fiber.type, fiber?.props?.anchor, fiber?.props?.size)
  updateElement(dom as DOM, {} as P, fiber.props as P)
  return dom
}
