import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const should = chai.should();

import RefObject from '../src/eventable-ref-object'
import inherits from 'inherits-ex/lib/inherits'
import createObject from 'inherits-ex/lib/createObject'

// setImmediate = setImmediate || process.nextTick;

chai.use(sinonChai);

describe("eventable RefObject", function() {
  var TestObject;
  TestObject = (function() {
    function TestObject() {}

    inherits(TestObject, RefObject);

    TestObject.prototype.finalize = sinon.spy(function() {
      return RefObject.prototype.finalize.apply(this, arguments);
    });

    TestObject.prototype.initialize = function() {
      TestObject.__super__.initialize.apply(this, arguments);
      setImmediate((function(_this) {
        return function() {
          return _this.setObjectState("inited");
        };
      })(this));
      return true;
    };

    return TestObject;

  })();
  it("RefObject constructor should be called", function(done) {
    var TestObject1, obj;
    TestObject1 = function() {};
    TestObject1.prototype.initialize = function() {
      setImmediate((function(_this) {
        return function() {
          return _this.setObjectState("inited");
        };
      })(this));
      return true;
    };
    inherits(TestObject1, RefObject);
    obj = createObject(TestObject1);
    obj.on('inited', function() {
      done();
    });
  });
  describe("Object State Events", function() {
    it('should emit the "inited" event', function(done) {
      var obj;
      obj = createObject(TestObject);
      obj.on('inited', function() {
        return done();
      });
    });
    it('should emit the "destroying" event', function(done) {
      var obj;
      obj = createObject(TestObject);
      obj.on('destroying', function() {
        return done();
      });
      obj.free();
    });
    return it('should emit the "destroyed" event', function(done) {
      var obj;
      obj = createObject(TestObject);
      obj.on('destroyed', function() {
        return done();
      });
      obj.free();
    });
  });
  describe("finalization method", function() {
    return it('should pass options to finalize method when free(options)', function() {
      var obj, opts;
      obj = createObject(TestObject);
      opts = {
        test: 123,
        a: 2
      };
      obj.free(opts, "hi", 23);
      obj.finalize.should.be.calledWith(opts, "hi", 23);
    });
  });
  describe("initialization method", function() {
    it('should pass the arguments into the initialization method', function(done) {
      var TestObject2, obj;
      TestObject2 = (function() {
        function TestObject2() {}

        inherits(TestObject2, RefObject);

        TestObject2.prototype.initialize = function() {
          arguments.should.have.length(3);
          arguments.should.have.property('0', 'abc');
          arguments.should.have.property('1', '321');
          arguments.should.have.property('2', 456);
          return done();
        };

        return TestObject2;

      })();
      obj = createObject(TestObject2, 'abc', '321', 456);
    });
    it('should call the initialization method when overriding the constructor method', function(done) {
      var TestObject2, obj;
      TestObject2 = (function() {
        inherits(TestObject2, RefObject);

        function TestObject2() {
          TestObject2.__super__.constructor.apply(this, arguments);
        }

        TestObject2.prototype.initialize = function() {
          arguments.should.have.length(3);
          arguments.should.have.property('0', 'abc');
          arguments.should.have.property('1', '321');
          arguments.should.have.property('2', 456);
          return done();
        };

        return TestObject2;

      })();
      obj = createObject(TestObject2, 'abc', '321', 456);
    });
  });
  describe("addRef", function() {
    return it('should not free instance when RefCount > 0', function(done) {
      var i, obj;
      obj = createObject(TestObject);
      obj.on('destroying', function() {
        i.should.equal(0);
        if (i > 0) {
          return done("err");
        } else {
          return done();
        }
      });
      i = obj.addRef();
      obj.RefCount.should.be.equal(i);
      obj.free();
      i--;
      obj.RefCount.should.be.equal(i);
      obj.free();
    });
  });
});
