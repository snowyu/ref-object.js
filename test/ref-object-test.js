import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const should = chai.should();

import RefObject from '../src/ref-object'

describe("RefObject", function() {
  const finalizeFn = sinon.spy(function() {
    return RefObject.prototype.finalize.apply(this, arguments);
  });

  class TestObject extends RefObject {
    finalize() {
      return finalizeFn.apply(this, arguments)
    }
    initialize() {
      super.initialize(...arguments)
    }
  }

  it("constructor should be called", function() {
    const obj = new TestObject
    expect(obj.isInited()).to.be.true
    expect(obj).to.have.ownProperty('RefCount', 0)
  });

  it("addRef/free", function() {
    const obj = new TestObject
    obj.addRef()
    expect(obj).to.have.ownProperty('RefCount', 1)
    expect(obj.isInited()).to.be.true
    obj.free()
    expect(obj.isInited()).to.be.true
    expect(obj).to.have.ownProperty('RefCount', 0)
    obj.free()
    expect(obj).to.have.ownProperty('RefCount', -1)
    expect(obj).to.have.property('objectState', 'destroyed')
  });
});
