import { IFiber, IRef, GodotElement } from './type'
import { updateElement } from './dom'
import { isFn, LANE } from './reconcile'

export const commit = (fiber: IFiber): void => {
  let d = fiber
  let e = d.e
  fiber.e = null
  do {
    insert(e)
  } while ((e = e.e))
  while ((d = d.d)) remove(d)
  fiber.d = null
}

const insert = (fiber: IFiber): void => {
  if (fiber.lane & LANE.UPDATE) {
    updateElement(fiber.node, fiber.oldProps || {}, fiber.props)
  }
  if (fiber.lane & LANE.INSERT) {
    // if (fiber.node.get_parent()) {
    //   fiber.node.get_parent().remove_child(fiber.node)
    // }
    if (fiber.after) {
      fiber.parentNode.add_child(fiber.node, true)
      fiber.parentNode.move_child(fiber.node, Math.max(0, fiber.after.get_index()))
    } else {
      fiber.parentNode.add_child(fiber.node, true)
    }
  }
  refer(fiber.ref, fiber.node)
}

const refer = (ref: IRef, dom?: GodotElement): void => {
  if (ref)
    isFn(ref) ? ref(dom) : ((ref as { current?: GodotElement })!.current = dom)
}

const kidsRefer = (kids: any): void => {
  kids.forEach(kid => {
    kid.kids && kidsRefer(kid.kids)
    refer(kid.ref, null)
  })
}

const remove = d => {
  if (d.isComp) {
    if (d.lane & LANE.REMOVE) {
      d.hooks && d.hooks.list.forEach(e => e[2] && e[2]())
    }
    d.kids.forEach(remove)
  } else {
    kidsRefer(d.kids)
    d.parentNode.remove_child(d.node)
    d.node.queue_free()
    refer(d.ref, null)
  }
}
