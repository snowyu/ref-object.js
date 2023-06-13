import {stateable} from 'abstract-object'
import {eventable} from 'events-ex'

import refCountable from './ref-countable'

export function EventableRefObject() {
  this._constructor.apply(this, arguments)
}

stateable(EventableRefObject)
refCountable(EventableRefObject)
eventable(EventableRefObject)

export default EventableRefObject
