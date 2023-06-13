import AbstractObject from 'abstract-object'
import inherits from 'inherits-ex/lib/inherits'

import refCountable from './ref-countable'

export function RefObject() {}

inherits(RefObject, AbstractObject)
refCountable(RefObject)

export default RefObject
