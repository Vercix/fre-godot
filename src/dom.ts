import { Attributes, DOM, IFiber } from './type'
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
  console.log('UPDATE ELEMENT')
  jointIter(aProps, bProps, (name, a, b) => {
    console.log('CALLBACK')
    console.log(name)
    console.log(a)
    console.log(b)
    console.log('========')
    console.log((a === b || name === 'children'))
    console.log((name === 'style' && !isStr(b)))
    console.log((name[0] === 'o' && name[1] === 'n'))
    // console.log((name in dom && !(dom instanceof SVGElement)))
    console.log((b == null || b === false))
    if (a === b || name === 'children') {
      console.log('5')

    } else if (name === 'style' && !isStr(b)) {
      console.log('4')
      jointIter(a, b, (styleKey, aStyle, bStyle) => {
        if (aStyle !== bStyle) {
          ; (dom as any)[name][styleKey] = bStyle || ''
        }
      })
    } else if (name[0] === 'o' && name[1] === 'n') {
      console.log('3')
      name = name.slice(2).toLowerCase() as Extract<keyof P, string>
      if (a) dom.disconnect(name, a)
      dom.connect(name, b);
    }
    // else if (name in dom && !(dom instanceof SVGElement)) {
    //   console.log('2')
    //     ; (dom as any)[name] = b || ''
    // }
    else if (b == null || b === false) {
      console.log('1')
      dom.removeAttribute(name)
    } else {
      console.log('Setting attribute')
      dom.set(name, b)
    }
  })
}

export const createElement = <P = Attributes>(fiber: IFiber) => {
  console.log('&&&&&&&&&&&&&&&&&')
  // const dom =
  //   fiber.type === '#text'
  //     ? document.createTextNode('')
  //     : fiber.lane & LANE.SVG
  //     ? document.createElementNS(
  //         'http://www.w3.org/2000/svg',
  //         fiber.type as string
  //       )
  //     : document.createElement(fiber.type as string)
  const dom = factory(fiber.type)
  console.log(dom)
  updateElement(dom as DOM, {} as P, fiber.props as P)
  return dom
}
