"use strict"

customAbility   = require 'custom-ability'
isUndefined     = require 'util-ex/lib/is/type/undefined'
defineProperty  = require 'util-ex/lib/defineProperty'

class RefCountable
  # initialization method
  initialize: ->
    #@RefCount = 0
    defineProperty @, 'RefCount', 0
    if @init
      console.error "init method is deprecated, pls use initialize instead"
      RefObject::init = (->) unless RefObject::init
      @init.apply @, arguments # keep back compatibility
  addRef: ->
    if isUndefined @RefCount
      @RefCount = 1
    else
      ++@RefCount
  release: ->
    result = --@RefCount
    @destroy.apply @, arguments unless result >= 0
    result
  free: @::release


module.exports = customAbility RefCountable, 'addRef'
