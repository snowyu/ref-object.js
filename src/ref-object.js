import {stateable} from 'abstract-object'

import refCountable from './ref-countable'

export function RefObject() {
  this._constructor.apply(this, arguments)
}

stateable(RefObject)
refCountable(RefObject)

export default RefObject
