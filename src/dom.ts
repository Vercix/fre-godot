// @ts-nocheck

import { Attributes, DOM, IFiber, GodotElement } from './type'
import { isStr, LANE } from './reconcile'

//godot
import factory from './factory'

const defaultObj = {} as const

const jointIter = <P extends Attributes>(
  aProps: P,
  bProps: P,
  callback: (name: string, a: any, b: any) => void
) => {
  aProps = aProps || defaultObj as P
  bProps = bProps || defaultObj as P
  Object.keys(aProps).forEach(k => callback(k, aProps[k], bProps[k]))
  Object.keys(bProps).forEach(k => !aProps.hasOwnProperty(k) && callback(k, undefined, bProps[k]))
}

export const updateElement = <P extends Attributes>(
  dom,
  aProps: P,
  bProps: P
) => {
  jointIter(aProps, bProps, (name, a, b) => {
    // console.log((name in dom && !(dom instanceof SVGElement)))
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
        console.log('________________________')
        console.log(a, b, name)
        console.log(a == b)
        console.log(a === b)
        console.log(dom)
        console.log('________________________')
        //console.log(dom.is_connected(name, dom, a))
        dom.disconnect(name,  a)
        console.log('************************')
        //throw new Error('test')
      }
      dom.connect(name, b);
    }
    else if (b == null || b === false) {
      //dom.removeAttribute(name)
    } else {
      dom.set(name, b)
    }
  })
}

export const createElement = <P = Attributes>(fiber: IFiber) => {
  // const dom =
  //   fiber.type === '#text'
  //     ? document.createTextNode('')
  //     : fiber.lane & LANE.SVG
  //     ? document.createElementNS(
  //         'http://www.w3.org/2000/svg',
  //         fiber.type as string
  //       )
  //     : document.createElement(fiber.type as string)
  const dom : GodotElement = fiber.isNode ? new fiber.type() : factory(fiber.type, fiber?.props?.anchor, fiber?.props?.size)
  updateElement(dom as DOM, {} as P, fiber.props as P)
  return dom
}
