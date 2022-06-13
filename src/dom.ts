import { Attributes, DOM, IFiber, GodotElement} from './type'
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

const createTheme = (themeProps) => {

  console.log("create theme")
  const theme = new godot.Theme()
  Object.keys(themeProps).forEach(
    node_type => {
      Object.keys(themeProps[node_type]).forEach(
        type => {
          switch (type) {
            case 'constant':
              Object.keys(themeProps[node_type][type]).forEach(
                key => {
                  console.log(node_type, type, key, themeProps[node_type][type][key])
                  theme.set_constant(key, node_type, themeProps[node_type][type][key])}
              )
              break;
            case 'color':
              console.log("color")
              console.log(node_type)
              Object.keys(themeProps[node_type][type]).forEach(
                key => theme.set_color(key, node_type, themeProps[node_type][type][key])
              )
              break;
            case 'font':
              Object.keys(themeProps[node_type][type]).forEach(
                key => theme.set_font(key, node_type, themeProps[node_type][type][key])
              )
              break;
            default:
              break;
          }
        })
    }
  )
  return theme
}

export const updateElement = <P extends Attributes>(
  dom: GodotElement,
  aProps: P,
  bProps: P
) => {
  jointIter(aProps, bProps, (name, a, b) => {
    if (a === b || name === 'children') {

    } else if (name === 'theme' && !isStr(b)) {
      dom.set_theme( createTheme(b))
      console.log(dom instanceof godot.BoxContainer)
      console.log("set theme")
      // jointIter(a, b, (styleKey, aStyle, bStyle) => {
      //   if (aStyle !== bStyle) {
      //     dom.set(styleKey, bStyle)
      //   }
      // })
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
      if (!b['connected']) {
        dom.connect(name, b);
        b['connected'] = true
      }
    }
    else if (b == null || b === false) {
      //dom.removeAttribute(name)
    } else {
      dom.set(name, b)
    }
  })
}

const handleAnchor = (dom, anchor: number, size) => {
  //we handle styling
  if (anchor) {
    dom.set_anchors_preset(anchor)
  }
  if (size) {
    if (typeof size.width === 'number') {
      dom.set_h_size_flags(size.width)
    }
    if (typeof size.height === 'number') {
      dom.set_v_size_flags(size.height)
    }
  }
}


export const createElement = <P = Attributes>(fiber: IFiber) => {
  // @ts-ignore
  const dom: GodotElement = fiber.isNode ? new fiber.type() : factory(fiber.type, fiber?.props?.anchor, fiber?.props?.size)
  handleAnchor(dom, fiber?.props?.anchor, fiber?.props?.size)
  updateElement(dom as GodotElement, {} as P, fiber.props as P)
  return dom
}
