"use strict"

refCountable    = require './ability'
AbstractObject  = require("abstract-object")
inherits        = require("inherits-ex/lib/inherits")

# RefObject with RefCount and AddRef/Release Supports.
#
# * release/free: Decrements reference count for this instance.
#   If it is becoming <0, the object would be (self) destroyed.
# * addRef: Increments the reference count for this instance
#   and returns the new reference count.


module.exports = class RefObject
  inherits RefObject, AbstractObject
  refCountable RefObject
