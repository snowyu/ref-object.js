import {createAbilityInjector} from 'custom-ability'
import {defineProperty, isFunction, isUndefined} from 'util-ex'

function RefCountable() {}

defineProperty(RefCountable.prototype, 'initialize', function() {
  const self = this.self || this

  defineProperty(self, 'RefCount', 0);

  if (isFunction(this.super)) {
    return this.super.apply(self, arguments)
  }
})


defineProperty(RefCountable.prototype, 'addRef', function() {
  const self = this.self || this
  if (isFunction(this.super)) {
    this.super.apply(self, arguments)
  }
  if (isUndefined(self.RefCount)) {
    return self.RefCount = 1;
  } else {
    return ++self.RefCount;
  }
})

defineProperty(RefCountable.prototype, 'release', function() {
  const self = this.self || this
  if (isFunction(this.super)) {
    this.super.apply(self, arguments)
  }
  if (isUndefined(self.RefCount)) {self.RefCount = 0}
  const result = --self.RefCount
  if (!(result >= 0)) {
    if (self.destroy) self.destroy.apply(self, arguments);
  }
  return result
})

RefCountable.prototype.free = RefCountable.prototype.release

export const refCountable = createAbilityInjector(RefCountable, 'addRef')
export default refCountable
