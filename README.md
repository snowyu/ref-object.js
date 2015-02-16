### ref-object [![Build Status](https://img.shields.io/travis/snowyu/ref-object.js/master.png)](http://travis-ci.org/snowyu/ref-object.js) [![npm](https://img.shields.io/npm/v/ref-object.svg)](https://npmjs.org/package/ref-object) [![downloads](https://img.shields.io/npm/dm/ref-object.svg)](https://npmjs.org/package/ref-object) [![license](https://img.shields.io/npm/l/ref-object.svg)](https://npmjs.org/package/ref-object)

add the RefCount ability to class or  RefObject with RefCount and AddRef/Release Support.

The derived class should overwrite the `initialize` and `finalize` methods.

# ref-count-able ability

add the RefCount ability to any class directly.


the following members will be added to your class. and you should implement
the `destroy` method which will be called by `release`/`free`.

* properties:
  * RefCount *(integer)*: the reference count.
* methods:
  * `release()`/`free()`: Decrements reference count for this instance.
    If it is becoming less than 0, the object would be (self) destroyed.
  * `addRef()`: Increments the reference count for this instance
    and returns the new reference count.



```coffee
refCountable = require 'ref-object/ability'

class MyClass
  refCountable MyClass
  destroy: ->console.log 'destroy'


my = new MyClass

my.addRef()
my.free() # nothing
my.free() # print the 'destroy' here.


```

# RefObject

The `RefObject` is derived from [AbstractObject](https://github.com/snowyu/abstract-object). and add the `RefCount` and `AddRef/Release` Supports.

* methods:
  * `release()`/`free()`: Decrements reference count for this instance.
    If it is becoming less than 0, the object would be (self) destroyed.
  * `addRef()`: Increments the reference count for this instance
    and returns the new reference count.


# Usage:

```coffee
RefObject = require('ref-object')
inherits = require('inherits-ex')
createObject = require('inherits-ex/lib/createObject')

class MyObject
  inherits MyObject, RefObject
  initialize: (@a,@b)->
    super

myObj = createObject(MyObject, 1, 2)

# if you do not wanna use `createObject`, you MUST remember this:
# even the constructor is empty, you should call the parent's constructor manually.
# myObj = new MyObject()

class MyObject
  inherits MyObject, RefObject
  constructor: ->
    # must call super method here:
    super
  initialize: (@a,@b)->
    # must call super method here for RefObject initialization:
    super

```

the javascript:

```js

var RefObject = require('ref-object')
var inherits = require('inherits-ex')
var createObject = require('inherits-ex/lib/createObject')

//if you do not wanna to use the createObject:
var MyObject = function() {
  //super call
  MyObject.__super__.constructor.apply(this, arguments);
}
// or, this MUST use 'AbstractObject.create'
var MyObject = function(){}


inherits(MyObject, RefObject)


MyObject.prototype.initialize = function(a,b) {
  //super call
  MyObject.__super__.initialize.call(this)
  this.a = a
  this.b = b
}


var myObj = createObject(MyObject, 1, 2)
//or this,  must overwrite the constructor and call the super constructor.
var myObj = new MyObject(1,2)
```
