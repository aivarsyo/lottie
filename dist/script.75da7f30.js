// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js"}],"node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_library":"node_modules/core-js/modules/_library.js"}],"node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"node_modules/core-js/modules/_shared.js"}],"node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_has":"node_modules/core-js/modules/_has.js","./_uid":"node_modules/core-js/modules/_uid.js","./_function-to-string":"node_modules/core-js/modules/_function-to-string.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_ctx":"node_modules/core-js/modules/_ctx.js"}],"node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"node_modules/core-js/modules/_array-species-constructor.js"}],"node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js"}],"node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"node_modules/core-js/modules/_is-array.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"node_modules/core-js/modules/_export.js","./_flatten-into-array":"node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js"}],"node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_wks":"node_modules/core-js/modules/_wks.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"node_modules/core-js/modules/_iobject.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-dps":"node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_html":"node_modules/core-js/modules/_html.js"}],"node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_has":"node_modules/core-js/modules/_has.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"node_modules/core-js/modules/_object-create.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"node_modules/core-js/modules/_hide.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"node_modules/core-js/modules/_library.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-create":"node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js"}],"node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js","./_date-to-primitive":"node_modules/core-js/modules/_date-to-primitive.js"}],"node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js"}],"node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"node_modules/core-js/modules/_uid.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_has":"node_modules/core-js/modules/_has.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_meta":"node_modules/core-js/modules/_meta.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js"}],"node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-fround":"node_modules/core-js/modules/_math-fround.js"}],"node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"node_modules/core-js/modules/_export.js","./_defined":"node_modules/core-js/modules/_defined.js","./_fails":"node_modules/core-js/modules/_fails.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_cof":"node_modules/core-js/modules/_cof.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-float":"node_modules/core-js/modules/_parse-float.js"}],"node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-int":"node_modules/core-js/modules/_parse-int.js"}],"node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js"}],"node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_fails":"node_modules/core-js/modules/_fails.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_create-property":"node_modules/core-js/modules/_create-property.js"}],"node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js"}],"node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js"}],"node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_same-value":"node_modules/core-js/modules/_same-value.js"}],"node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_invoke":"node_modules/core-js/modules/_invoke.js","./_html":"node_modules/core-js/modules/_html.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_global":"node_modules/core-js/modules/_global.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_task":"node_modules/core-js/modules/_task.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js"}],"node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_classof":"node_modules/core-js/modules/_classof.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_task":"node_modules/core-js/modules/_task.js","./_microtask":"node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js","./_perform":"node_modules/core-js/modules/_perform.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_core":"node_modules/core-js/modules/_core.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js"}],"node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_invoke":"node_modules/core-js/modules/_invoke.js"}],"node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_bind":"node_modules/core-js/modules/_bind.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js"}],"node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"node_modules/core-js/modules/_global.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"node_modules/core-js/modules/_classof.js"}],"node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js","./_wks":"node_modules/core-js/modules/_wks.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js"}],"node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_fails":"node_modules/core-js/modules/_fails.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_same-value":"node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_library":"node_modules/core-js/modules/_library.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_fails":"node_modules/core-js/modules/_fails.js","./_shared":"node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_wks-define":"node_modules/core-js/modules/_wks-define.js","./_enum-keys":"node_modules/core-js/modules/_enum-keys.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_library":"node_modules/core-js/modules/_library.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"node_modules/core-js/modules/_wks-define.js"}],"node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"node_modules/core-js/modules/_string-at.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js"}],"node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"node_modules/core-js/modules/_string-trim.js"}],"node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"node_modules/core-js/modules/_string-trim.js"}],"node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"node_modules/core-js/modules/_global.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_typed":"node_modules/core-js/modules/_typed.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_fails":"node_modules/core-js/modules/_fails.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js"}],"node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_fails":"node_modules/core-js/modules/_fails.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js","./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_classof":"node_modules/core-js/modules/_classof.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_has":"node_modules/core-js/modules/_has.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"node_modules/core-js/modules/_global.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js","./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_task":"node_modules/core-js/modules/_task.js"}],"node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"node_modules/@lottiefiles/lottie-player/dist/lottie-player.js":[function(require,module,exports) {
var define;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e18) { throw _e18; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e19) { didErr = true; err = _e19; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) {
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "ytxR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;
    var e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback;
    exports.isCEPolyfill = e;

    var o = function o(e, _o) {
      var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      for (; _o !== l;) {
        var _l = _o.nextSibling;
        e.insertBefore(_o, s), _o = _l;
      }
    };

    exports.reparentNodes = o;

    var l = function l(e, o) {
      var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      for (; o !== l;) {
        var _l2 = o.nextSibling;
        e.removeChild(o), o = _l2;
      }
    };

    exports.removeNodes = l;
  }, {}],
  "Av0K": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;
    var e = "{{lit-".concat(String(Math.random()).slice(2), "}}");
    exports.marker = e;
    var t = "<!--".concat(e, "-->");
    exports.nodeMarker = t;
    var r = new RegExp("".concat(e, "|").concat(t));
    exports.markerRegex = r;
    var s = "$lit$";
    exports.boundAttributeSuffix = s;

    var o = function o(t, _o2) {
      _classCallCheck(this, o);

      this.parts = [], this.element = _o2;
      var i = [],
          l = [],
          p = document.createTreeWalker(_o2.content, 133, null, !1);
      var c = 0,
          d = -1,
          u = 0;
      var f = t.strings,
          h = t.values.length;

      for (; u < h;) {
        var _t = p.nextNode();

        if (null !== _t) {
          if (d++, 1 === _t.nodeType) {
            if (_t.hasAttributes()) {
              var _e = _t.attributes,
                  _o3 = _e.length;
              var _i = 0;

              for (var _t2 = 0; _t2 < _o3; _t2++) {
                n(_e[_t2].name, s) && _i++;
              }

              for (; _i-- > 0;) {
                var _e2 = f[u],
                    _o4 = x.exec(_e2)[2],
                    _n = _o4.toLowerCase() + s,
                    _i2 = _t.getAttribute(_n);

                _t.removeAttribute(_n);

                var _a = _i2.split(r);

                this.parts.push({
                  type: "attribute",
                  index: d,
                  name: _o4,
                  strings: _a
                }), u += _a.length - 1;
              }
            }

            "TEMPLATE" === _t.tagName && (l.push(_t), p.currentNode = _t.content);
          } else if (3 === _t.nodeType) {
            var _o5 = _t.data;

            if (_o5.indexOf(e) >= 0) {
              var _e3 = _t.parentNode,
                  _l3 = _o5.split(r),
                  _p = _l3.length - 1;

              for (var _r = 0; _r < _p; _r++) {
                var _o6 = void 0,
                    _i3 = _l3[_r];

                if ("" === _i3) _o6 = a();else {
                  var _e4 = x.exec(_i3);

                  null !== _e4 && n(_e4[2], s) && (_i3 = _i3.slice(0, _e4.index) + _e4[1] + _e4[2].slice(0, -s.length) + _e4[3]), _o6 = document.createTextNode(_i3);
                }
                _e3.insertBefore(_o6, _t), this.parts.push({
                  type: "node",
                  index: ++d
                });
              }

              "" === _l3[_p] ? (_e3.insertBefore(a(), _t), i.push(_t)) : _t.data = _l3[_p], u += _p;
            }
          } else if (8 === _t.nodeType) if (_t.data === e) {
            var _e5 = _t.parentNode;
            null !== _t.previousSibling && d !== c || (d++, _e5.insertBefore(a(), _t)), c = d, this.parts.push({
              type: "node",
              index: d
            }), null === _t.nextSibling ? _t.data = "" : (i.push(_t), d--), u++;
          } else {
            var _r2 = -1;

            for (; -1 !== (_r2 = _t.data.indexOf(e, _r2 + 1));) {
              this.parts.push({
                type: "node",
                index: -1
              }), u++;
            }
          }
        } else p.currentNode = l.pop();
      }

      for (var _i5 = 0, _i4 = i; _i5 < _i4.length; _i5++) {
        var _e6 = _i4[_i5];

        _e6.parentNode.removeChild(_e6);
      }
    };

    exports.Template = o;

    var n = function n(e, t) {
      var r = e.length - t.length;
      return r >= 0 && e.slice(r) === t;
    },
        i = function i(e) {
      return -1 !== e.index;
    };

    exports.isTemplatePartActive = i;

    var a = function a() {
      return document.createComment("");
    };

    exports.createMarker = a;
    var x = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    exports.lastAttributeNameRegex = x;
  }, {}],
  "NXoq": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodesFromTemplate = n, exports.insertNodeIntoTemplate = l;

    var e = require("./template.js");

    var t = 133;

    function n(e, n) {
      var r = e.element.content,
          l = e.parts,
          u = document.createTreeWalker(r, t, null, !1);
      var c = o(l),
          d = l[c],
          s = -1,
          i = 0;
      var a = [];
      var p = null;

      for (; u.nextNode();) {
        s++;
        var _e7 = u.currentNode;

        for (_e7.previousSibling === p && (p = null), n.has(_e7) && (a.push(_e7), null === p && (p = _e7)), null !== p && i++; void 0 !== d && d.index === s;) {
          d.index = null !== p ? -1 : d.index - i, d = l[c = o(l, c)];
        }
      }

      a.forEach(function (e) {
        return e.parentNode.removeChild(e);
      });
    }

    var r = function r(e) {
      var n = 11 === e.nodeType ? 0 : 1;
      var r = document.createTreeWalker(e, t, null, !1);

      for (; r.nextNode();) {
        n++;
      }

      return n;
    },
        o = function o(t) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      for (var _r3 = n + 1; _r3 < t.length; _r3++) {
        var _n2 = t[_r3];
        if ((0, e.isTemplatePartActive)(_n2)) return _r3;
      }

      return -1;
    };

    function l(e, n) {
      var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var u = e.element.content,
          c = e.parts;
      if (null == l) return void u.appendChild(n);
      var d = document.createTreeWalker(u, t, null, !1);
      var s = o(c),
          i = 0,
          a = -1;

      for (; d.nextNode();) {
        for (a++, d.currentNode === l && (i = r(n), l.parentNode.insertBefore(n, l)); -1 !== s && c[s].index === a;) {
          if (i > 0) {
            for (; -1 !== s;) {
              c[s].index += i, s = o(c, s);
            }

            return;
          }

          s = o(c, s);
        }
      }
    }
  }, {
    "./template.js": "Av0K"
  }],
  "uWh2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isDirective = exports.directive = void 0;

    var e = new WeakMap(),
        t = function t(_t3) {
      return function () {
        var i = _t3.apply(void 0, arguments);

        return e.set(i, !0), i;
      };
    };

    exports.directive = t;

    var s = function s(t) {
      return "function" == typeof t && e.has(t);
    };

    exports.isDirective = s;
  }, {}],
  "pnLb": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.nothing = exports.noChange = void 0;
    var e = {};
    exports.noChange = e;
    var o = {};
    exports.nothing = o;
  }, {}],
  "bn5t": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.TemplateInstance = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    var s = /*#__PURE__*/function () {
      function s(e, t, _s) {
        _classCallCheck(this, s);

        this.__parts = [], this.template = e, this.processor = t, this.options = _s;
      }

      _createClass(s, [{
        key: "update",
        value: function update(e) {
          var t = 0;

          var _iterator = _createForOfIteratorHelper(this.__parts),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _s2 = _step.value;
              void 0 !== _s2 && _s2.setValue(e[t]), t++;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var _iterator2 = _createForOfIteratorHelper(this.__parts),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _s3 = _step2.value;
              void 0 !== _s3 && _s3.commit();
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }, {
        key: "_clone",
        value: function _clone() {
          var s = e.isCEPolyfill ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
              o = [],
              r = this.template.parts,
              n = document.createTreeWalker(s, 133, null, !1);
          var i,
              p = 0,
              l = 0,
              a = n.nextNode();

          for (; p < r.length;) {
            if (i = r[p], (0, t.isTemplatePartActive)(i)) {
              var _this$__parts;

              for (; l < i.index;) {
                l++, "TEMPLATE" === a.nodeName && (o.push(a), n.currentNode = a.content), null === (a = n.nextNode()) && (n.currentNode = o.pop(), a = n.nextNode());
              }

              if ("node" === i.type) {
                var _e8 = this.processor.handleTextExpression(this.options);

                _e8.insertAfterNode(a.previousSibling), this.__parts.push(_e8);
              } else (_this$__parts = this.__parts).push.apply(_this$__parts, _toConsumableArray(this.processor.handleAttributeExpressions(a, i.name, i.strings, this.options)));

              p++;
            } else this.__parts.push(void 0), p++;
          }

          return e.isCEPolyfill && (document.adoptNode(s), customElements.upgrade(s)), s;
        }
      }]);

      return s;
    }();

    exports.TemplateInstance = s;
  }, {
    "./dom.js": "ytxR",
    "./template.js": "Av0K"
  }],
  "cVNN": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.SVGTemplateResult = exports.TemplateResult = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    var s = " ".concat(t.marker, " ");

    var r = /*#__PURE__*/function () {
      function r(e, t, s, _r4) {
        _classCallCheck(this, r);

        this.strings = e, this.values = t, this.type = s, this.processor = _r4;
      }

      _createClass(r, [{
        key: "getHTML",
        value: function getHTML() {
          var e = this.strings.length - 1;
          var r = "",
              n = !1;

          for (var _l4 = 0; _l4 < e; _l4++) {
            var _e9 = this.strings[_l4],
                i = _e9.lastIndexOf("\x3c!--");

            n = (i > -1 || n) && -1 === _e9.indexOf("--\x3e", i + 1);
            var o = t.lastAttributeNameRegex.exec(_e9);
            r += null === o ? _e9 + (n ? s : t.nodeMarker) : _e9.substr(0, o.index) + o[1] + o[2] + t.boundAttributeSuffix + o[3] + t.marker;
          }

          return r += this.strings[e];
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var e = document.createElement("template");
          return e.innerHTML = this.getHTML(), e;
        }
      }]);

      return r;
    }();

    exports.TemplateResult = r;

    var n = /*#__PURE__*/function (_r5) {
      _inherits(n, _r5);

      var _super = _createSuper(n);

      function n() {
        _classCallCheck(this, n);

        return _super.apply(this, arguments);
      }

      _createClass(n, [{
        key: "getHTML",
        value: function getHTML() {
          return "<svg>".concat(_get(_getPrototypeOf(n.prototype), "getHTML", this).call(this), "</svg>");
        }
      }, {
        key: "getTemplateElement",
        value: function getTemplateElement() {
          var t = _get(_getPrototypeOf(n.prototype), "getTemplateElement", this).call(this),
              s = t.content,
              r = s.firstChild;

          return s.removeChild(r), (0, e.reparentNodes)(s, r.firstChild), t;
        }
      }]);

      return n;
    }(r);

    exports.SVGTemplateResult = n;
  }, {
    "./dom.js": "ytxR",
    "./template.js": "Av0K"
  }],
  "atl2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

    var t = require("./directive.js"),
        e = require("./dom.js"),
        i = require("./part.js"),
        s = require("./template-instance.js"),
        n = require("./template-result.js"),
        r = require("./template.js");

    var o = function o(t) {
      return null === t || !("object" == _typeof(t) || "function" == typeof t);
    };

    exports.isPrimitive = o;

    var a = function a(t) {
      return Array.isArray(t) || !(!t || !t[Symbol.iterator]);
    };

    exports.isIterable = a;

    var h = /*#__PURE__*/function () {
      function h(t, e, i) {
        _classCallCheck(this, h);

        this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];

        for (var _s4 = 0; _s4 < i.length - 1; _s4++) {
          this.parts[_s4] = this._createPart();
        }
      }

      _createClass(h, [{
        key: "_createPart",
        value: function _createPart() {
          return new l(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          var t = this.strings,
              e = t.length - 1;
          var i = "";

          for (var _s5 = 0; _s5 < e; _s5++) {
            i += t[_s5];
            var _e10 = this.parts[_s5];

            if (void 0 !== _e10) {
              var _t4 = _e10.value;
              if (o(_t4) || !a(_t4)) i += "string" == typeof _t4 ? _t4 : String(_t4);else {
                var _iterator3 = _createForOfIteratorHelper(_t4),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var _e11 = _step3.value;
                    i += "string" == typeof _e11 ? _e11 : String(_e11);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            }
          }

          return i += t[e];
        }
      }, {
        key: "commit",
        value: function commit() {
          this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
        }
      }]);

      return h;
    }();

    exports.AttributeCommitter = h;

    var l = /*#__PURE__*/function () {
      function l(t) {
        _classCallCheck(this, l);

        this.value = void 0, this.committer = t;
      }

      _createClass(l, [{
        key: "setValue",
        value: function setValue(e) {
          e === i.noChange || o(e) && e === this.value || (this.value = e, (0, t.isDirective)(e) || (this.committer.dirty = !0));
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; (0, t.isDirective)(this.value);) {
            var _t5 = this.value;
            this.value = i.noChange, _t5(this);
          }

          this.value !== i.noChange && this.committer.commit();
        }
      }]);

      return l;
    }();

    exports.AttributePart = l;

    var u = /*#__PURE__*/function () {
      function u(t) {
        _classCallCheck(this, u);

        this.value = void 0, this.__pendingValue = void 0, this.options = t;
      }

      _createClass(u, [{
        key: "appendInto",
        value: function appendInto(t) {
          this.startNode = t.appendChild((0, r.createMarker)()), this.endNode = t.appendChild((0, r.createMarker)());
        }
      }, {
        key: "insertAfterNode",
        value: function insertAfterNode(t) {
          this.startNode = t, this.endNode = t.nextSibling;
        }
      }, {
        key: "appendIntoPart",
        value: function appendIntoPart(t) {
          t.__insert(this.startNode = (0, r.createMarker)()), t.__insert(this.endNode = (0, r.createMarker)());
        }
      }, {
        key: "insertAfterPart",
        value: function insertAfterPart(t) {
          t.__insert(this.startNode = (0, r.createMarker)()), this.endNode = t.endNode, t.endNode = this.startNode;
        }
      }, {
        key: "setValue",
        value: function setValue(t) {
          this.__pendingValue = t;
        }
      }, {
        key: "commit",
        value: function commit() {
          if (null === this.startNode.parentNode) return;

          for (; (0, t.isDirective)(this.__pendingValue);) {
            var _t6 = this.__pendingValue;
            this.__pendingValue = i.noChange, _t6(this);
          }

          var e = this.__pendingValue;
          e !== i.noChange && (o(e) ? e !== this.value && this.__commitText(e) : e instanceof n.TemplateResult ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : a(e) ? this.__commitIterable(e) : e === i.nothing ? (this.value = i.nothing, this.clear()) : this.__commitText(e));
        }
      }, {
        key: "__insert",
        value: function __insert(t) {
          this.endNode.parentNode.insertBefore(t, this.endNode);
        }
      }, {
        key: "__commitNode",
        value: function __commitNode(t) {
          this.value !== t && (this.clear(), this.__insert(t), this.value = t);
        }
      }, {
        key: "__commitText",
        value: function __commitText(t) {
          var e = this.startNode.nextSibling,
              i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
          e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.__commitNode(document.createTextNode(i)), this.value = t;
        }
      }, {
        key: "__commitTemplateResult",
        value: function __commitTemplateResult(t) {
          var e = this.options.templateFactory(t);
          if (this.value instanceof s.TemplateInstance && this.value.template === e) this.value.update(t.values);else {
            var _i6 = new s.TemplateInstance(e, t.processor, this.options),
                _n3 = _i6._clone();

            _i6.update(t.values), this.__commitNode(_n3), this.value = _i6;
          }
        }
      }, {
        key: "__commitIterable",
        value: function __commitIterable(t) {
          Array.isArray(this.value) || (this.value = [], this.clear());
          var e = this.value;
          var i,
              s = 0;

          var _iterator4 = _createForOfIteratorHelper(t),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _n4 = _step4.value;
              void 0 === (i = e[s]) && (i = new u(this.options), e.push(i), 0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(_n4), i.commit(), s++;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          s < e.length && (e.length = s, this.clear(i && i.endNode));
        }
      }, {
        key: "clear",
        value: function clear() {
          var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
          (0, e.removeNodes)(this.startNode.parentNode, t.nextSibling, this.endNode);
        }
      }]);

      return u;
    }();

    exports.NodePart = u;

    var d = /*#__PURE__*/function () {
      function d(t, e, i) {
        _classCallCheck(this, d);

        if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
        this.element = t, this.name = e, this.strings = i;
      }

      _createClass(d, [{
        key: "setValue",
        value: function setValue(t) {
          this.__pendingValue = t;
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; (0, t.isDirective)(this.__pendingValue);) {
            var _t7 = this.__pendingValue;
            this.__pendingValue = i.noChange, _t7(this);
          }

          if (this.__pendingValue === i.noChange) return;
          var e = !!this.__pendingValue;
          this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = i.noChange;
        }
      }]);

      return d;
    }();

    exports.BooleanAttributePart = d;

    var c = /*#__PURE__*/function (_h) {
      _inherits(c, _h);

      var _super2 = _createSuper(c);

      function c(t, e, i) {
        var _this;

        _classCallCheck(this, c);

        _this = _super2.call(this, t, e, i), _this.single = 2 === i.length && "" === i[0] && "" === i[1];
        return _this;
      }

      _createClass(c, [{
        key: "_createPart",
        value: function _createPart() {
          return new p(this);
        }
      }, {
        key: "_getValue",
        value: function _getValue() {
          return this.single ? this.parts[0].value : _get(_getPrototypeOf(c.prototype), "_getValue", this).call(this);
        }
      }, {
        key: "commit",
        value: function commit() {
          this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
        }
      }]);

      return c;
    }(h);

    exports.PropertyCommitter = c;

    var p = /*#__PURE__*/function (_l5) {
      _inherits(p, _l5);

      var _super3 = _createSuper(p);

      function p() {
        _classCallCheck(this, p);

        return _super3.apply(this, arguments);
      }

      return p;
    }(l);

    exports.PropertyPart = p;

    var _ = !1;

    (function () {
      try {
        var _e12 = {
          get capture() {
            return _ = !0, !1;
          }

        };
        window.addEventListener("test", _e12, _e12), window.removeEventListener("test", _e12, _e12);
      } catch (t) {}
    })();

    var m = /*#__PURE__*/function () {
      function m(t, e, i) {
        var _this2 = this;

        _classCallCheck(this, m);

        this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.__boundHandleEvent = function (t) {
          return _this2.handleEvent(t);
        };
      }

      _createClass(m, [{
        key: "setValue",
        value: function setValue(t) {
          this.__pendingValue = t;
        }
      }, {
        key: "commit",
        value: function commit() {
          for (; (0, t.isDirective)(this.__pendingValue);) {
            var _t8 = this.__pendingValue;
            this.__pendingValue = i.noChange, _t8(this);
          }

          if (this.__pendingValue === i.noChange) return;
          var e = this.__pendingValue,
              s = this.value,
              n = null == e || null != s && (e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive),
              r = null != e && (null == s || n);
          n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = v(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = i.noChange;
        }
      }, {
        key: "handleEvent",
        value: function handleEvent(t) {
          "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
        }
      }]);

      return m;
    }();

    exports.EventPart = m;

    var v = function v(t) {
      return t && (_ ? {
        capture: t.capture,
        passive: t.passive,
        once: t.once
      } : t.capture);
    };
  }, {
    "./directive.js": "uWh2",
    "./dom.js": "ytxR",
    "./part.js": "pnLb",
    "./template-instance.js": "bn5t",
    "./template-result.js": "cVNN",
    "./template.js": "Av0K"
  }],
  "gbKZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.templateFactory = t, exports.templateCaches = void 0;

    var e = require("./template.js");

    function t(t) {
      var s = r.get(t.type);
      void 0 === s && (s = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, r.set(t.type, s));
      var n = s.stringsArray.get(t.strings);
      if (void 0 !== n) return n;
      var a = t.strings.join(e.marker);
      return void 0 === (n = s.keyString.get(a)) && (n = new e.Template(t, t.getTemplateElement()), s.keyString.set(a, n)), s.stringsArray.set(t.strings, n), n;
    }

    var r = new Map();
    exports.templateCaches = r;
  }, {
    "./template.js": "Av0K"
  }],
  "Fhpq": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.render = exports.parts = void 0;

    var e = require("./dom.js"),
        t = require("./parts.js"),
        r = require("./template-factory.js");

    var s = new WeakMap();
    exports.parts = s;

    var o = function o(_o7, a, p) {
      var d = s.get(a);
      void 0 === d && ((0, e.removeNodes)(a, a.firstChild), s.set(a, d = new t.NodePart(Object.assign({
        templateFactory: r.templateFactory
      }, p))), d.appendInto(a)), d.setValue(_o7), d.commit();
    };

    exports.render = o;
  }, {
    "./dom.js": "ytxR",
    "./parts.js": "atl2",
    "./template-factory.js": "gbKZ"
  }],
  "LBiL": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

    var e = require("./parts.js");

    var t = /*#__PURE__*/function () {
      function t() {
        _classCallCheck(this, t);
      }

      _createClass(t, [{
        key: "handleAttributeExpressions",
        value: function handleAttributeExpressions(t, r, s, o) {
          var a = r[0];

          if ("." === a) {
            return new e.PropertyCommitter(t, r.slice(1), s).parts;
          }

          return "@" === a ? [new e.EventPart(t, r.slice(1), o.eventContext)] : "?" === a ? [new e.BooleanAttributePart(t, r.slice(1), s)] : new e.AttributeCommitter(t, r, s).parts;
        }
      }, {
        key: "handleTextExpression",
        value: function handleTextExpression(t) {
          return new e.NodePart(t);
        }
      }]);

      return t;
    }();

    exports.DefaultTemplateProcessor = t;
    var r = new t();
    exports.defaultTemplateProcessor = r;
  }, {
    "./parts.js": "atl2"
  }],
  "SPDu": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "DefaultTemplateProcessor", {
      enumerable: !0,
      get: function get() {
        return e.DefaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "defaultTemplateProcessor", {
      enumerable: !0,
      get: function get() {
        return e.defaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function get() {
        return t.SVGTemplateResult;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function get() {
        return t.TemplateResult;
      }
    }), Object.defineProperty(exports, "directive", {
      enumerable: !0,
      get: function get() {
        return r.directive;
      }
    }), Object.defineProperty(exports, "isDirective", {
      enumerable: !0,
      get: function get() {
        return r.isDirective;
      }
    }), Object.defineProperty(exports, "removeNodes", {
      enumerable: !0,
      get: function get() {
        return n.removeNodes;
      }
    }), Object.defineProperty(exports, "reparentNodes", {
      enumerable: !0,
      get: function get() {
        return n.reparentNodes;
      }
    }), Object.defineProperty(exports, "noChange", {
      enumerable: !0,
      get: function get() {
        return o.noChange;
      }
    }), Object.defineProperty(exports, "nothing", {
      enumerable: !0,
      get: function get() {
        return o.nothing;
      }
    }), Object.defineProperty(exports, "AttributeCommitter", {
      enumerable: !0,
      get: function get() {
        return i.AttributeCommitter;
      }
    }), Object.defineProperty(exports, "AttributePart", {
      enumerable: !0,
      get: function get() {
        return i.AttributePart;
      }
    }), Object.defineProperty(exports, "BooleanAttributePart", {
      enumerable: !0,
      get: function get() {
        return i.BooleanAttributePart;
      }
    }), Object.defineProperty(exports, "EventPart", {
      enumerable: !0,
      get: function get() {
        return i.EventPart;
      }
    }), Object.defineProperty(exports, "isIterable", {
      enumerable: !0,
      get: function get() {
        return i.isIterable;
      }
    }), Object.defineProperty(exports, "isPrimitive", {
      enumerable: !0,
      get: function get() {
        return i.isPrimitive;
      }
    }), Object.defineProperty(exports, "NodePart", {
      enumerable: !0,
      get: function get() {
        return i.NodePart;
      }
    }), Object.defineProperty(exports, "PropertyCommitter", {
      enumerable: !0,
      get: function get() {
        return i.PropertyCommitter;
      }
    }), Object.defineProperty(exports, "PropertyPart", {
      enumerable: !0,
      get: function get() {
        return i.PropertyPart;
      }
    }), Object.defineProperty(exports, "parts", {
      enumerable: !0,
      get: function get() {
        return u.parts;
      }
    }), Object.defineProperty(exports, "render", {
      enumerable: !0,
      get: function get() {
        return u.render;
      }
    }), Object.defineProperty(exports, "templateCaches", {
      enumerable: !0,
      get: function get() {
        return p.templateCaches;
      }
    }), Object.defineProperty(exports, "templateFactory", {
      enumerable: !0,
      get: function get() {
        return p.templateFactory;
      }
    }), Object.defineProperty(exports, "TemplateInstance", {
      enumerable: !0,
      get: function get() {
        return a.TemplateInstance;
      }
    }), Object.defineProperty(exports, "createMarker", {
      enumerable: !0,
      get: function get() {
        return s.createMarker;
      }
    }), Object.defineProperty(exports, "isTemplatePartActive", {
      enumerable: !0,
      get: function get() {
        return s.isTemplatePartActive;
      }
    }), Object.defineProperty(exports, "Template", {
      enumerable: !0,
      get: function get() {
        return s.Template;
      }
    }), exports.svg = exports.html = void 0;

    var e = require("./lib/default-template-processor.js"),
        t = require("./lib/template-result.js"),
        r = require("./lib/directive.js"),
        n = require("./lib/dom.js"),
        o = require("./lib/part.js"),
        i = require("./lib/parts.js"),
        u = require("./lib/render.js"),
        p = require("./lib/template-factory.js"),
        a = require("./lib/template-instance.js"),
        s = require("./lib/template.js");

    "undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");

    var l = function l(r) {
      for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        n[_key - 1] = arguments[_key];
      }

      return new t.TemplateResult(r, n, "html", e.defaultTemplateProcessor);
    };

    exports.html = l;

    var c = function c(r) {
      for (var _len2 = arguments.length, n = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        n[_key2 - 1] = arguments[_key2];
      }

      return new t.SVGTemplateResult(r, n, "svg", e.defaultTemplateProcessor);
    };

    exports.svg = c;
  }, {
    "./lib/default-template-processor.js": "LBiL",
    "./lib/template-result.js": "cVNN",
    "./lib/directive.js": "uWh2",
    "./lib/dom.js": "ytxR",
    "./lib/part.js": "pnLb",
    "./lib/parts.js": "atl2",
    "./lib/render.js": "Fhpq",
    "./lib/template-factory.js": "gbKZ",
    "./lib/template-instance.js": "bn5t",
    "./lib/template.js": "Av0K"
  }],
  "eBH8": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function get() {
        return a.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function get() {
        return a.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function get() {
        return a.TemplateResult;
      }
    }), exports.render = void 0;

    var e = require("./dom.js"),
        t = require("./modify-template.js"),
        r = require("./render.js"),
        n = require("./template-factory.js"),
        o = require("./template-instance.js"),
        s = require("./template.js"),
        a = require("../lit-html.js");

    var l = function l(e, t) {
      return "".concat(e, "--").concat(t);
    };

    var i = !0;
    void 0 === window.ShadyCSS ? i = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), i = !1);

    var d = function d(e) {
      return function (t) {
        var r = l(t.type, e);
        var o = n.templateCaches.get(r);
        void 0 === o && (o = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        }, n.templateCaches.set(r, o));
        var a = o.stringsArray.get(t.strings);
        if (void 0 !== a) return a;
        var d = t.strings.join(s.marker);

        if (void 0 === (a = o.keyString.get(d))) {
          var _r6 = t.getTemplateElement();

          i && window.ShadyCSS.prepareTemplateDom(_r6, e), a = new s.Template(t, _r6), o.keyString.set(d, a);
        }

        return o.stringsArray.set(t.strings, a), a;
      };
    },
        p = ["html", "svg"],
        c = function c(e) {
      p.forEach(function (r) {
        var o = n.templateCaches.get(l(r, e));
        void 0 !== o && o.keyString.forEach(function (e) {
          var r = e.element.content,
              n = new Set();
          Array.from(r.querySelectorAll("style")).forEach(function (e) {
            n.add(e);
          }), (0, t.removeNodesFromTemplate)(e, n);
        });
      });
    },
        m = new Set(),
        y = function y(e, r, n) {
      m.add(e);
      var o = n ? n.element : document.createElement("template"),
          s = r.querySelectorAll("style"),
          a = s.length;
      if (0 === a) return void window.ShadyCSS.prepareTemplateStyles(o, e);
      var l = document.createElement("style");

      for (var _t9 = 0; _t9 < a; _t9++) {
        var _e13 = s[_t9];
        _e13.parentNode.removeChild(_e13), l.textContent += _e13.textContent;
      }

      c(e);
      var i = o.content;
      n ? (0, t.insertNodeIntoTemplate)(n, l, i.firstChild) : i.insertBefore(l, i.firstChild), window.ShadyCSS.prepareTemplateStyles(o, e);
      var d = i.querySelector("style");
      if (window.ShadyCSS.nativeShadow && null !== d) r.insertBefore(d.cloneNode(!0), r.firstChild);else if (n) {
        i.insertBefore(l, i.firstChild);

        var _e14 = new Set();

        _e14.add(l), (0, t.removeNodesFromTemplate)(n, _e14);
      }
    },
        S = function S(t, n, s) {
      if (!s || "object" != _typeof(s) || !s.scopeName) throw new Error("The `scopeName` option is required.");
      var a = s.scopeName,
          l = r.parts.has(n),
          p = i && 11 === n.nodeType && !!n.host,
          c = p && !m.has(a),
          S = c ? document.createDocumentFragment() : n;

      if ((0, r.render)(t, S, Object.assign({
        templateFactory: d(a)
      }, s)), c) {
        var _t10 = r.parts.get(S);

        r.parts.delete(S);

        var _s6 = _t10.value instanceof o.TemplateInstance ? _t10.value.template : void 0;

        y(a, S, _s6), (0, e.removeNodes)(n, n.firstChild), n.appendChild(S), r.parts.set(n, _t10);
      }

      !l && p && window.ShadyCSS.styleElement(n.host);
    };

    exports.render = S;
  }, {
    "./dom.js": "ytxR",
    "./modify-template.js": "NXoq",
    "./render.js": "Fhpq",
    "./template-factory.js": "gbKZ",
    "./template-instance.js": "bn5t",
    "./template.js": "Av0K",
    "../lit-html.js": "SPDu"
  }],
  "fKvB": [function (require, module, exports) {
    "use strict";

    var t;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0, window.JSCompiler_renameProperty = function (t, e) {
      return t;
    };
    var e = {
      toAttribute: function toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? "" : null;

          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t);
        }

        return t;
      },
      fromAttribute: function fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t;

          case Number:
            return null === t ? null : Number(t);

          case Object:
          case Array:
            return JSON.parse(t);
        }

        return t;
      }
    };
    exports.defaultConverter = e;

    var r = function r(t, e) {
      return e !== t && (e == e || t == t);
    };

    exports.notEqual = r;
    var s = {
      attribute: !0,
      type: String,
      converter: e,
      reflect: !1,
      hasChanged: r
    },
        i = 1,
        a = 4,
        o = 8,
        p = 16,
        n = "finalized";

    var h = /*#__PURE__*/function (_HTMLElement) {
      _inherits(h, _HTMLElement);

      var _super4 = _createSuper(h);

      function h() {
        var _this3;

        _classCallCheck(this, h);

        _this3 = _super4.call(this), _this3._updateState = 0, _this3._instanceProperties = void 0, _this3._updatePromise = new Promise(function (t) {
          return _this3._enableUpdatingResolver = t;
        }), _this3._changedProperties = new Map(), _this3._reflectingProperties = void 0, _this3.initialize();
        return _this3;
      }

      _createClass(h, [{
        key: "initialize",
        value: function initialize() {
          this._saveInstanceProperties(), this._requestUpdate();
        }
      }, {
        key: "_saveInstanceProperties",
        value: function _saveInstanceProperties() {
          var _this4 = this;

          this.constructor._classProperties.forEach(function (t, e) {
            if (_this4.hasOwnProperty(e)) {
              var _t11 = _this4[e];
              delete _this4[e], _this4._instanceProperties || (_this4._instanceProperties = new Map()), _this4._instanceProperties.set(e, _t11);
            }
          });
        }
      }, {
        key: "_applyInstanceProperties",
        value: function _applyInstanceProperties() {
          var _this5 = this;

          this._instanceProperties.forEach(function (t, e) {
            return _this5[e] = t;
          }), this._instanceProperties = void 0;
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this.enableUpdating();
        }
      }, {
        key: "enableUpdating",
        value: function enableUpdating() {
          void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {}
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(t, e, r) {
          e !== r && this._attributeToProperty(t, r);
        }
      }, {
        key: "_propertyToAttribute",
        value: function _propertyToAttribute(t, e) {
          var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : s;

          var i = this.constructor,
              a = i._attributeNameForProperty(t, r);

          if (void 0 !== a) {
            var _t12 = i._propertyValueToAttribute(e, r);

            if (void 0 === _t12) return;
            this._updateState = this._updateState | o, null == _t12 ? this.removeAttribute(a) : this.setAttribute(a, _t12), this._updateState = this._updateState & ~o;
          }
        }
      }, {
        key: "_attributeToProperty",
        value: function _attributeToProperty(t, e) {
          if (this._updateState & o) return;

          var r = this.constructor,
              s = r._attributeToPropertyMap.get(t);

          if (void 0 !== s) {
            var _t13 = r.getPropertyOptions(s);

            this._updateState = this._updateState | p, this[s] = r._propertyValueFromAttribute(e, _t13), this._updateState = this._updateState & ~p;
          }
        }
      }, {
        key: "_requestUpdate",
        value: function _requestUpdate(t, e) {
          var r = !0;

          if (void 0 !== t) {
            var _s7 = this.constructor,
                _i7 = _s7.getPropertyOptions(t);

            _s7._valueHasChanged(this[t], e, _i7.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== _i7.reflect || this._updateState & p || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, _i7))) : r = !1;
          }

          !this._hasRequestedUpdate && r && (this._updatePromise = this._enqueueUpdate());
        }
      }, {
        key: "requestUpdate",
        value: function requestUpdate(t, e) {
          return this._requestUpdate(t, e), this.updateComplete;
        }
      }, {
        key: "_enqueueUpdate",
        value: function () {
          var _enqueueUpdate2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var t;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this._updateState = this._updateState | a;
                    _context.prev = 1;
                    _context.next = 4;
                    return this._updatePromise;

                  case 4:
                    _context.next = 8;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](1);

                  case 8:
                    t = this.performUpdate();
                    _context.t1 = null != t;

                    if (!_context.t1) {
                      _context.next = 13;
                      break;
                    }

                    _context.next = 13;
                    return t;

                  case 13:
                    return _context.abrupt("return", !this._hasRequestedUpdate);

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[1, 6]]);
          }));

          function _enqueueUpdate() {
            return _enqueueUpdate2.apply(this, arguments);
          }

          return _enqueueUpdate;
        }()
      }, {
        key: "performUpdate",
        value: function performUpdate() {
          this._instanceProperties && this._applyInstanceProperties();
          var t = !1;
          var e = this._changedProperties;

          try {
            (t = this.shouldUpdate(e)) ? this.update(e) : this._markUpdated();
          } catch (r) {
            throw t = !1, this._markUpdated(), r;
          }

          t && (this._updateState & i || (this._updateState = this._updateState | i, this.firstUpdated(e)), this.updated(e));
        }
      }, {
        key: "_markUpdated",
        value: function _markUpdated() {
          this._changedProperties = new Map(), this._updateState = this._updateState & ~a;
        }
      }, {
        key: "_getUpdateComplete",
        value: function _getUpdateComplete() {
          return this._updatePromise;
        }
      }, {
        key: "shouldUpdate",
        value: function shouldUpdate(t) {
          return !0;
        }
      }, {
        key: "update",
        value: function update(t) {
          var _this6 = this;

          void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach(function (t, e) {
            return _this6._propertyToAttribute(e, _this6[e], t);
          }), this._reflectingProperties = void 0), this._markUpdated();
        }
      }, {
        key: "updated",
        value: function updated(t) {}
      }, {
        key: "firstUpdated",
        value: function firstUpdated(t) {}
      }, {
        key: "_hasRequestedUpdate",
        get: function get() {
          return this._updateState & a;
        }
      }, {
        key: "hasUpdated",
        get: function get() {
          return this._updateState & i;
        }
      }, {
        key: "updateComplete",
        get: function get() {
          return this._getUpdateComplete();
        }
      }], [{
        key: "_ensureClassProperties",
        value: function _ensureClassProperties() {
          var _this7 = this;

          if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
            this._classProperties = new Map();

            var _t14 = Object.getPrototypeOf(this)._classProperties;

            void 0 !== _t14 && _t14.forEach(function (t, e) {
              return _this7._classProperties.set(e, t);
            });
          }
        }
      }, {
        key: "createProperty",
        value: function createProperty(t) {
          var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : s;
          if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
          var r = "symbol" == _typeof(t) ? Symbol() : "__".concat(t),
              i = this.getPropertyDescriptor(t, r, e);
          void 0 !== i && Object.defineProperty(this.prototype, t, i);
        }
      }, {
        key: "getPropertyDescriptor",
        value: function getPropertyDescriptor(t, e, r) {
          return {
            get: function get() {
              return this[e];
            },
            set: function set(r) {
              var s = this[t];
              this[e] = r, this._requestUpdate(t, s);
            },
            configurable: !0,
            enumerable: !0
          };
        }
      }, {
        key: "getPropertyOptions",
        value: function getPropertyOptions(t) {
          return this._classProperties && this._classProperties.get(t) || s;
        }
      }, {
        key: "finalize",
        value: function finalize() {
          var t = Object.getPrototypeOf(this);

          if (t.hasOwnProperty(n) || t.finalize(), this[n] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
            var _t15 = this.properties,
                _e15 = [].concat(_toConsumableArray(Object.getOwnPropertyNames(_t15)), _toConsumableArray("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(_t15) : []));

            var _iterator5 = _createForOfIteratorHelper(_e15),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _r7 = _step5.value;
                this.createProperty(_r7, _t15[_r7]);
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        }
      }, {
        key: "_attributeNameForProperty",
        value: function _attributeNameForProperty(t, e) {
          var r = e.attribute;
          return !1 === r ? void 0 : "string" == typeof r ? r : "string" == typeof t ? t.toLowerCase() : void 0;
        }
      }, {
        key: "_valueHasChanged",
        value: function _valueHasChanged(t, e) {
          var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : r;
          return s(t, e);
        }
      }, {
        key: "_propertyValueFromAttribute",
        value: function _propertyValueFromAttribute(t, r) {
          var s = r.type,
              i = r.converter || e,
              a = "function" == typeof i ? i : i.fromAttribute;
          return a ? a(t, s) : t;
        }
      }, {
        key: "_propertyValueToAttribute",
        value: function _propertyValueToAttribute(t, r) {
          if (void 0 === r.reflect) return;
          var s = r.type,
              i = r.converter;
          return (i && i.toAttribute || e.toAttribute)(t, s);
        }
      }, {
        key: "observedAttributes",
        get: function get() {
          var _this8 = this;

          this.finalize();
          var t = [];
          return this._classProperties.forEach(function (e, r) {
            var s = _this8._attributeNameForProperty(r, e);

            void 0 !== s && (_this8._attributeToPropertyMap.set(s, r), t.push(s));
          }), t;
        }
      }]);

      return h;
    }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

    exports.UpdatingElement = h, h[t = n] = !0;
  }, {}],
  "FzpZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.property = i, exports.internalProperty = s, exports.query = c, exports.queryAsync = u, exports.queryAll = l, exports.eventOptions = f, exports.queryAssignedNodes = m, exports.customElement = void 0;

    var e = function e(_e16, t) {
      return window.customElements.define(_e16, t), t;
    },
        t = function t(e, _t16) {
      var r = _t16.kind,
          n = _t16.elements;
      return {
        kind: r,
        elements: n,
        finisher: function finisher(t) {
          window.customElements.define(e, t);
        }
      };
    },
        r = function r(_r8) {
      return function (n) {
        return "function" == typeof n ? e(_r8, n) : t(_r8, n);
      };
    };

    exports.customElement = r;

    var n = function n(e, t) {
      return "method" !== t.kind || !t.descriptor || "value" in t.descriptor ? {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        initializer: function initializer() {
          "function" == typeof t.initializer && (this[t.key] = t.initializer.call(this));
        },
        finisher: function finisher(r) {
          r.createProperty(t.key, e);
        }
      } : Object.assign(Object.assign({}, t), {
        finisher: function finisher(r) {
          r.createProperty(t.key, e);
        }
      });
    },
        o = function o(e, t, r) {
      t.constructor.createProperty(r, e);
    };

    function i(e) {
      return function (t, r) {
        return void 0 !== r ? o(e, t, r) : n(e, t);
      };
    }

    function s(e) {
      return i({
        attribute: !1,
        hasChanged: null == e ? void 0 : e.hasChanged
      });
    }

    function c(e) {
      return function (t, r) {
        var n = {
          get: function get() {
            return this.renderRoot.querySelector(e);
          },
          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    function u(e) {
      return function (t, r) {
        var n = {
          get: function get() {
            var _this9 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this9.updateComplete;

                    case 2:
                      return _context2.abrupt("return", _this9.renderRoot.querySelector(e));

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }))();
          },
          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    function l(e) {
      return function (t, r) {
        var n = {
          get: function get() {
            return this.renderRoot.querySelectorAll(e);
          },
          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    var a = function a(e, t, r) {
      Object.defineProperty(t, r, e);
    },
        d = function d(e, t) {
      return {
        kind: "method",
        placement: "prototype",
        key: t.key,
        descriptor: e
      };
    },
        p = function p(e, t) {
      return Object.assign(Object.assign({}, t), {
        finisher: function finisher(r) {
          Object.assign(r.prototype[t.key], e);
        }
      });
    },
        y = function y(e, t, r) {
      Object.assign(t[r], e);
    };

    function f(e) {
      return function (t, r) {
        return void 0 !== r ? y(e, t, r) : p(e, t);
      };
    }

    function m() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      return function (r, n) {
        var o = {
          get: function get() {
            var r = "slot".concat(e ? "[name=".concat(e, "]") : ""),
                n = this.renderRoot.querySelector(r);
            return n && n.assignedNodes({
              flatten: t
            });
          },
          enumerable: !0,
          configurable: !0
        };
        return void 0 !== n ? a(o, r, n) : d(o, r);
      };
    }
  }, {}],
  "ZFCR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;
    var e = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    exports.supportsAdoptingStyleSheets = e;
    var t = Symbol();

    var s = /*#__PURE__*/function () {
      function s(e, _s8) {
        _classCallCheck(this, s);

        if (_s8 !== t) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e;
      }

      _createClass(s, [{
        key: "toString",
        value: function toString() {
          return this.cssText;
        }
      }, {
        key: "styleSheet",
        get: function get() {
          return void 0 === this._styleSheet && (e ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
        }
      }]);

      return s;
    }();

    exports.CSSResult = s;

    var r = function r(e) {
      return new s(String(e), t);
    };

    exports.unsafeCSS = r;

    var o = function o(e) {
      if (e instanceof s) return e.cssText;
      if ("number" == typeof e) return e;
      throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(e, ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."));
    },
        n = function n(e) {
      for (var _len3 = arguments.length, r = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        r[_key3 - 1] = arguments[_key3];
      }

      var n = r.reduce(function (t, s, r) {
        return t + o(s) + e[r + 1];
      }, e[0]);
      return new s(n, t);
    };

    exports.css = n;
  }, {}],
  "bhxD": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var e = {
      LitElement: !0,
      html: !0,
      svg: !0,
      TemplateResult: !0,
      SVGTemplateResult: !0
    };
    Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function get() {
        return n.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function get() {
        return n.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function get() {
        return n.TemplateResult;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function get() {
        return n.SVGTemplateResult;
      }
    }), exports.LitElement = void 0;

    var t = require("lit-html/lib/shady-render.js"),
        r = require("./lib/updating-element.js");

    Object.keys(r).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function get() {
          return r[t];
        }
      }));
    });

    var s = require("./lib/decorators.js");

    Object.keys(s).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function get() {
          return s[t];
        }
      }));
    });

    var n = require("lit-html/lit-html.js"),
        o = require("./lib/css-tag.js");

    Object.keys(o).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function get() {
          return o[t];
        }
      }));
    }), (window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");
    var i = {};

    var l = /*#__PURE__*/function (_r$UpdatingElement) {
      _inherits(l, _r$UpdatingElement);

      var _super5 = _createSuper(l);

      function l() {
        _classCallCheck(this, l);

        return _super5.apply(this, arguments);
      }

      _createClass(l, [{
        key: "initialize",
        value: function initialize() {
          _get(_getPrototypeOf(l.prototype), "initialize", this).call(this), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
        }
      }, {
        key: "createRenderRoot",
        value: function createRenderRoot() {
          return this.attachShadow({
            mode: "open"
          });
        }
      }, {
        key: "adoptStyles",
        value: function adoptStyles() {
          var e = this.constructor._styles;
          0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? o.supportsAdoptingStyleSheets ? this.renderRoot.adoptedStyleSheets = e.map(function (e) {
            return e.styleSheet;
          }) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(function (e) {
            return e.cssText;
          }), this.localName));
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          _get(_getPrototypeOf(l.prototype), "connectedCallback", this).call(this), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
        }
      }, {
        key: "update",
        value: function update(e) {
          var _this10 = this;

          var t = this.render();
          _get(_getPrototypeOf(l.prototype), "update", this).call(this, e), t !== i && this.constructor.render(t, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this
          }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(function (e) {
            var t = document.createElement("style");
            t.textContent = e.cssText, _this10.renderRoot.appendChild(t);
          }));
        }
      }, {
        key: "render",
        value: function render() {
          return i;
        }
      }], [{
        key: "getStyles",
        value: function getStyles() {
          return this.styles;
        }
      }, {
        key: "_getUniqueStyles",
        value: function _getUniqueStyles() {
          if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
          var e = this.getStyles();
          if (void 0 === e) this._styles = [];else if (Array.isArray(e)) {
            var _t17 = function _t17(e, r) {
              return e.reduceRight(function (e, r) {
                return Array.isArray(r) ? _t17(r, e) : (e.add(r), e);
              }, r);
            },
                _r9 = _t17(e, new Set()),
                _s9 = [];

            _r9.forEach(function (e) {
              return _s9.unshift(e);
            }), this._styles = _s9;
          } else this._styles = [e];
        }
      }]);

      return l;
    }(r.UpdatingElement);

    exports.LitElement = l, l.finalized = !0, l.render = t.render;
  }, {
    "lit-html/lib/shady-render.js": "eBH8",
    "./lib/updating-element.js": "fKvB",
    "./lib/decorators.js": "FzpZ",
    "lit-html/lit-html.js": "SPDu",
    "./lib/css-tag.js": "ZFCR"
  }],
  "xaRr": [function (require, module, exports) {
    var define;
    var global = arguments[3];
    var define,
        global = arguments[3];
    "undefined" != typeof navigator && function (t, e) {
      "function" == typeof define && define.amd ? define(function () {
        return e(t);
      }) : "object" == _typeof(module) && module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie);
    }(window || {}, function (window) {
      "use strict";

      var svgNS = "http://www.w3.org/2000/svg",
          locationHref = "",
          initialDefaultFrame = -999999,
          subframeEnabled = !0,
          expressionsPlugin,
          isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
          cachedColors = {},
          bm_rounder = Math.round,
          bm_rnd,
          bm_pow = Math.pow,
          bm_sqrt = Math.sqrt,
          bm_abs = Math.abs,
          bm_floor = Math.floor,
          bm_max = Math.max,
          bm_min = Math.min,
          blitter = 10,
          BMMath = {};

      function ProjectInterface() {
        return {};
      }

      !function () {
        var t,
            e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
            r = e.length;

        for (t = 0; t < r; t += 1) {
          BMMath[e[t]] = Math[e[t]];
        }
      }(), BMMath.random = Math.random, BMMath.abs = function (t) {
        if ("object" === _typeof(t) && t.length) {
          var e,
              r = createSizedArray(t.length),
              i = t.length;

          for (e = 0; e < i; e += 1) {
            r[e] = Math.abs(t[e]);
          }

          return r;
        }

        return Math.abs(t);
      };
      var defaultCurveSegments = 150,
          degToRads = Math.PI / 180,
          roundCorner = .5519;

      function roundValues(t) {
        bm_rnd = t ? Math.round : function (t) {
          return t;
        };
      }

      function styleDiv(t) {
        t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d";
      }

      function BMEnterFrameEvent(t, e, r, i) {
        this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
      }

      function BMCompleteEvent(t, e) {
        this.type = t, this.direction = e < 0 ? -1 : 1;
      }

      function BMCompleteLoopEvent(t, e, r, i) {
        this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1;
      }

      function BMSegmentStartEvent(t, e, r) {
        this.type = t, this.firstFrame = e, this.totalFrames = r;
      }

      function BMDestroyEvent(t, e) {
        this.type = t, this.target = e;
      }

      function BMRenderFrameErrorEvent(t, e) {
        this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
      }

      function BMConfigErrorEvent(t) {
        this.type = "configError", this.nativeError = t;
      }

      function BMAnimationConfigErrorEvent(t, e) {
        this.type = t, this.nativeError = e, this.currentTime = currentTime;
      }

      roundValues(!1);

      var createElementID = (_count = 0, function () {
        return "__lottie_element_" + ++_count;
      }),
          _count;

      function HSVtoRGB(t, e, r) {
        var i, s, a, n, o, h, l, p;

        switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
          case 0:
            i = r, s = p, a = h;
            break;

          case 1:
            i = l, s = r, a = h;
            break;

          case 2:
            i = h, s = r, a = p;
            break;

          case 3:
            i = h, s = l, a = r;
            break;

          case 4:
            i = p, s = h, a = r;
            break;

          case 5:
            i = r, s = h, a = l;
        }

        return [i, s, a];
      }

      function RGBtoHSV(t, e, r) {
        var i,
            s = Math.max(t, e, r),
            a = Math.min(t, e, r),
            n = s - a,
            o = 0 === s ? 0 : n / s,
            h = s / 255;

        switch (s) {
          case a:
            i = 0;
            break;

          case t:
            i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
            break;

          case e:
            i = r - t + 2 * n, i /= 6 * n;
            break;

          case r:
            i = t - e + 4 * n, i /= 6 * n;
        }

        return [i, o, h];
      }

      function addSaturationToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }

      function addBrightnessToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }

      function addHueToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
      }

      var rgbToHex = function () {
        var t,
            e,
            r = [];

        for (t = 0; t < 256; t += 1) {
          e = t.toString(16), r[t] = 1 == e.length ? "0" + e : e;
        }

        return function (t, e, i) {
          return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i];
        };
      }();

      function BaseEvent() {}

      BaseEvent.prototype = {
        triggerEvent: function triggerEvent(t, e) {
          if (this._cbs[t]) for (var r = this._cbs[t].length, i = 0; i < r; i++) {
            this._cbs[t][i](e);
          }
        },
        addEventListener: function addEventListener(t, e) {
          return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
            this.removeEventListener(t, e);
          }.bind(this);
        },
        removeEventListener: function removeEventListener(t, e) {
          if (e) {
            if (this._cbs[t]) {
              for (var r = 0, i = this._cbs[t].length; r < i;) {
                this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
              }

              this._cbs[t].length || (this._cbs[t] = null);
            }
          } else this._cbs[t] = null;
        }
      };

      var createTypedArray = function () {
        return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
          return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
        } : function (t, e) {
          var r,
              i = 0,
              s = [];

          switch (t) {
            case "int16":
            case "uint8c":
              r = 1;
              break;

            default:
              r = 1.1;
          }

          for (i = 0; i < e; i += 1) {
            s.push(r);
          }

          return s;
        };
      }();

      function createSizedArray(t) {
        return Array.apply(null, {
          length: t
        });
      }

      function createNS(t) {
        return document.createElementNS(svgNS, t);
      }

      function createTag(t) {
        return document.createElement(t);
      }

      function DynamicPropertyContainer() {}

      DynamicPropertyContainer.prototype = {
        addDynamicProperty: function addDynamicProperty(t) {
          -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
        },
        iterateDynamicProperties: function iterateDynamicProperties() {
          this._mdf = !1;
          var t,
              e = this.dynamicProperties.length;

          for (t = 0; t < e; t += 1) {
            this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
          }
        },
        initDynamicPropertyContainer: function initDynamicPropertyContainer(t) {
          this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
        }
      };

      var getBlendMode = (blendModeEnums = {
        0: "source-over",
        1: "multiply",
        2: "screen",
        3: "overlay",
        4: "darken",
        5: "lighten",
        6: "color-dodge",
        7: "color-burn",
        8: "hard-light",
        9: "soft-light",
        10: "difference",
        11: "exclusion",
        12: "hue",
        13: "saturation",
        14: "color",
        15: "luminosity"
      }, function (t) {
        return blendModeEnums[t] || "";
      }),
          blendModeEnums,
          Matrix = function () {
        var t = Math.cos,
            e = Math.sin,
            r = Math.tan,
            i = Math.round;

        function s() {
          return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
        }

        function a(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function n(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(1, 0, 0, 0, 0, i, -s, 0, 0, s, i, 0, 0, 0, 0, 1);
        }

        function o(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, 0, s, 0, 0, 1, 0, 0, -s, 0, i, 0, 0, 0, 0, 1);
        }

        function h(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function l(t, e) {
          return this._t(1, e, t, 1, 0, 0);
        }

        function p(t, e) {
          return this.shear(r(t), r(e));
        }

        function f(i, s) {
          var a = t(s),
              n = e(s);
          return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function m(t, e, r) {
          return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
        }

        function c(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
          return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = m, this.props[13] = c, this.props[14] = d, this.props[15] = u, this;
        }

        function d(t, e, r) {
          return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this;
        }

        function u(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
          var y = this.props;
          if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f) return y[12] = y[12] * t + y[15] * m, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
          var g = y[0],
              v = y[1],
              b = y[2],
              E = y[3],
              x = y[4],
              S = y[5],
              P = y[6],
              _ = y[7],
              C = y[8],
              A = y[9],
              T = y[10],
              k = y[11],
              M = y[12],
              D = y[13],
              w = y[14],
              F = y[15];
          return y[0] = g * t + v * s + b * h + E * m, y[1] = g * e + v * a + b * l + E * c, y[2] = g * r + v * n + b * p + E * d, y[3] = g * i + v * o + b * f + E * u, y[4] = x * t + S * s + P * h + _ * m, y[5] = x * e + S * a + P * l + _ * c, y[6] = x * r + S * n + P * p + _ * d, y[7] = x * i + S * o + P * f + _ * u, y[8] = C * t + A * s + T * h + k * m, y[9] = C * e + A * a + T * l + k * c, y[10] = C * r + A * n + T * p + k * d, y[11] = C * i + A * o + T * f + k * u, y[12] = M * t + D * s + w * h + F * m, y[13] = M * e + D * a + w * l + F * c, y[14] = M * r + D * n + w * p + F * d, y[15] = M * i + D * o + w * f + F * u, this._identityCalculated = !1, this;
        }

        function y() {
          return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
        }

        function g(t) {
          for (var e = 0; e < 16;) {
            if (t.props[e] !== this.props[e]) return !1;
            e += 1;
          }

          return !0;
        }

        function v(t) {
          var e;

          for (e = 0; e < 16; e += 1) {
            t.props[e] = this.props[e];
          }
        }

        function b(t) {
          var e;

          for (e = 0; e < 16; e += 1) {
            this.props[e] = t[e];
          }
        }

        function E(t, e, r) {
          return {
            x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
            y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
            z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
          };
        }

        function x(t, e, r) {
          return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12];
        }

        function S(t, e, r) {
          return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13];
        }

        function P(t, e, r) {
          return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14];
        }

        function _() {
          var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
              e = this.props[5] / t,
              r = -this.props[1] / t,
              i = -this.props[4] / t,
              s = this.props[0] / t,
              a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
              n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
              o = new Matrix();
          return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = s, o.props[12] = a, o.props[13] = n, o;
        }

        function C(t) {
          return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0);
        }

        function A(t) {
          var e,
              r = t.length,
              i = [];

          for (e = 0; e < r; e += 1) {
            i[e] = C(t[e]);
          }

          return i;
        }

        function T(t, e, r) {
          var i = createTypedArray("float32", 6);
          if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];else {
            var s = this.props[0],
                a = this.props[1],
                n = this.props[4],
                o = this.props[5],
                h = this.props[12],
                l = this.props[13];
            i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l;
          }
          return i;
        }

        function k(t, e, r) {
          return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]];
        }

        function M(t, e) {
          if (this.isIdentity()) return t + "," + e;
          var r = this.props;
          return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100;
        }

        function D() {
          for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) {
            r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
          }

          return r;
        }

        function w(t) {
          return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t;
        }

        function F() {
          var t = this.props;
          return "matrix(" + w(t[0]) + "," + w(t[1]) + "," + w(t[4]) + "," + w(t[5]) + "," + w(t[12]) + "," + w(t[13]) + ")";
        }

        return function () {
          this.reset = s, this.rotate = a, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = f, this.shear = l, this.scale = m, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = E, this.applyToX = x, this.applyToY = S, this.applyToZ = P, this.applyToPointArray = k, this.applyToTriplePoints = T, this.applyToPointStringified = M, this.toCSS = D, this.to2dCSS = F, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = A, this.inversePoint = C, this.getInverseMatrix = _, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
        };
      }();

      !function (t, e) {
        var r,
            i = this,
            s = 256,
            a = 6,
            n = "random",
            o = e.pow(s, a),
            h = e.pow(2, 52),
            l = 2 * h,
            p = s - 1;

        function f(t) {
          var e,
              r = t.length,
              i = this,
              a = 0,
              n = i.i = i.j = 0,
              o = i.S = [];

          for (r || (t = [r++]); a < s;) {
            o[a] = a++;
          }

          for (a = 0; a < s; a++) {
            o[a] = o[n = p & n + t[a % r] + (e = o[a])], o[n] = e;
          }

          i.g = function (t) {
            for (var e, r = 0, a = i.i, n = i.j, o = i.S; t--;) {
              e = o[a = p & a + 1], r = r * s + o[p & (o[a] = o[n = p & n + e]) + (o[n] = e)];
            }

            return i.i = a, i.j = n, r;
          };
        }

        function m(t, e) {
          return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
        }

        function c(t, e) {
          for (var r, i = t + "", s = 0; s < i.length;) {
            e[p & s] = p & (r ^= 19 * e[p & s]) + i.charCodeAt(s++);
          }

          return d(e);
        }

        function d(t) {
          return String.fromCharCode.apply(0, t);
        }

        e["seed" + n] = function (p, u, y) {
          var g = [],
              v = c(function t(e, r) {
            var i,
                s = [],
                a = _typeof(e);

            if (r && "object" == a) for (i in e) {
              try {
                s.push(t(e[i], r - 1));
              } catch (n) {}
            }
            return s.length ? s : "string" == a ? e : e + "\0";
          }((u = !0 === u ? {
            entropy: !0
          } : u || {}).entropy ? [p, d(t)] : null === p ? function () {
            try {
              if (r) return d(r.randomBytes(s));
              var e = new Uint8Array(s);
              return (i.crypto || i.msCrypto).getRandomValues(e), d(e);
            } catch (o) {
              var a = i.navigator,
                  n = a && a.plugins;
              return [+new Date(), i, n, i.screen, d(t)];
            }
          }() : p, 3), g),
              b = new f(g),
              E = function E() {
            for (var t = b.g(a), e = o, r = 0; t < h;) {
              t = (t + r) * s, e *= s, r = b.g(1);
            }

            for (; t >= l;) {
              t /= 2, e /= 2, r >>>= 1;
            }

            return (t + r) / e;
          };

          return E.int32 = function () {
            return 0 | b.g(4);
          }, E.quick = function () {
            return b.g(4) / 4294967296;
          }, E.double = E, c(d(b.S), t), (u.pass || y || function (t, r, i, s) {
            return s && (s.S && m(s, b), t.state = function () {
              return m(b, {});
            }), i ? (e[n] = t, r) : t;
          })(E, v, "global" in u ? u.global : this == e, u.state);
        }, c(e.random(), t);
      }([], BMMath);

      var BezierFactory = function () {
        var t = {
          getBezierEasing: function getBezierEasing(t, r, i, s, a) {
            var n = a || ("bez_" + t + "_" + r + "_" + i + "_" + s).replace(/\./g, "p");
            if (e[n]) return e[n];
            var o = new c([t, r, i, s]);
            return e[n] = o, o;
          }
        },
            e = {};
        var r = 4,
            i = 1e-7,
            s = 10,
            a = 11,
            n = 1 / (a - 1),
            o = "function" == typeof Float32Array;

        function h(t, e) {
          return 1 - 3 * e + 3 * t;
        }

        function l(t, e) {
          return 3 * e - 6 * t;
        }

        function p(t) {
          return 3 * t;
        }

        function f(t, e, r) {
          return ((h(e, r) * t + l(e, r)) * t + p(e)) * t;
        }

        function m(t, e, r) {
          return 3 * h(e, r) * t * t + 2 * l(e, r) * t + p(e);
        }

        function c(t) {
          this._p = t, this._mSampleValues = o ? new Float32Array(a) : new Array(a), this._precomputed = !1, this.get = this.get.bind(this);
        }

        return c.prototype = {
          get: function get(t) {
            var e = this._p[0],
                r = this._p[1],
                i = this._p[2],
                s = this._p[3];
            return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : f(this._getTForX(t), r, s);
          },
          _precompute: function _precompute() {
            var t = this._p[0],
                e = this._p[1],
                r = this._p[2],
                i = this._p[3];
            this._precomputed = !0, t === e && r === i || this._calcSampleValues();
          },
          _calcSampleValues: function _calcSampleValues() {
            for (var t = this._p[0], e = this._p[2], r = 0; r < a; ++r) {
              this._mSampleValues[r] = f(r * n, t, e);
            }
          },
          _getTForX: function _getTForX(t) {
            for (var e = this._p[0], o = this._p[2], h = this._mSampleValues, l = 0, p = 1, c = a - 1; p !== c && h[p] <= t; ++p) {
              l += n;
            }

            var d = l + (t - h[--p]) / (h[p + 1] - h[p]) * n,
                u = m(d, e, o);
            return u >= .001 ? function (t, e, i, s) {
              for (var a = 0; a < r; ++a) {
                var n = m(e, i, s);
                if (0 === n) return e;
                e -= (f(e, i, s) - t) / n;
              }

              return e;
            }(t, d, e, o) : 0 === u ? d : function (t, e, r, a, n) {
              var o,
                  h,
                  l = 0;

              do {
                (o = f(h = e + (r - e) / 2, a, n) - t) > 0 ? r = h : e = h;
              } while (Math.abs(o) > i && ++l < s);

              return h;
            }(t, l, l + n, e, o);
          }
        }, t;
      }();

      function extendPrototype(t, e) {
        var r,
            i,
            s = t.length;

        for (r = 0; r < s; r += 1) {
          for (var a in i = t[r].prototype) {
            i.hasOwnProperty(a) && (e.prototype[a] = i[a]);
          }
        }
      }

      function getDescriptor(t, e) {
        return Object.getOwnPropertyDescriptor(t, e);
      }

      function createProxyFunction(t) {
        function e() {}

        return e.prototype = t, e;
      }

      function bezFunction() {
        Math;

        function t(t, e, r, i, s, a) {
          var n = t * i + e * s + r * a - s * i - a * t - r * e;
          return n > -.001 && n < .001;
        }

        var e = function e(t, _e17, r, i) {
          var s,
              a,
              n,
              o,
              h,
              l,
              p = defaultCurveSegments,
              f = 0,
              m = [],
              c = [],
              d = bezier_length_pool.newElement();

          for (n = r.length, s = 0; s < p; s += 1) {
            for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) {
              o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * _e17[a], m[a] = o, null !== c[a] && (l += bm_pow(m[a] - c[a], 2)), c[a] = m[a];
            }

            l && (f += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = f;
          }

          return d.addedLength = f, d;
        };

        function r(t) {
          this.segmentLength = 0, this.points = new Array(t);
        }

        function i(t, e) {
          this.partialLength = t, this.point = e;
        }

        var s,
            a = (s = {}, function (e, a, n, o) {
          var h = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");

          if (!s[h]) {
            var l,
                p,
                f,
                m,
                c,
                d,
                u,
                y = defaultCurveSegments,
                g = 0,
                v = null;
            2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (y = 2);
            var b = new r(y);

            for (f = n.length, l = 0; l < y; l += 1) {
              for (u = createSizedArray(f), c = l / (y - 1), d = 0, p = 0; p < f; p += 1) {
                m = bm_pow(1 - c, 3) * e[p] + 3 * bm_pow(1 - c, 2) * c * (e[p] + n[p]) + 3 * (1 - c) * bm_pow(c, 2) * (a[p] + o[p]) + bm_pow(c, 3) * a[p], u[p] = m, null !== v && (d += bm_pow(u[p] - v[p], 2));
              }

              g += d = bm_sqrt(d), b.points[l] = new i(d, u), v = u;
            }

            b.segmentLength = g, s[h] = b;
          }

          return s[h];
        });

        function n(t, e) {
          var r = e.percents,
              i = e.lengths,
              s = r.length,
              a = bm_floor((s - 1) * t),
              n = t * e.addedLength,
              o = 0;
          if (a === s - 1 || 0 === a || n === i[a]) return r[a];

          for (var h = i[a] > n ? -1 : 1, l = !0; l;) {
            if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
              if (a === s - 1) return r[a];
              l = !1;
            }
          }

          return r[a] + (r[a + 1] - r[a]) * o;
        }

        var o = createTypedArray("float32", 8);
        return {
          getSegmentsLength: function getSegmentsLength(t) {
            var r,
                i = segments_length_pool.newElement(),
                s = t.c,
                a = t.v,
                n = t.o,
                o = t.i,
                h = t._length,
                l = i.lengths,
                p = 0;

            for (r = 0; r < h - 1; r += 1) {
              l[r] = e(a[r], a[r + 1], n[r], o[r + 1]), p += l[r].addedLength;
            }

            return s && h && (l[r] = e(a[r], a[0], n[r], o[0]), p += l[r].addedLength), i.totalLength = p, i;
          },
          getNewSegment: function getNewSegment(t, e, r, i, s, a, h) {
            var l,
                p = n(s = s < 0 ? 0 : s > 1 ? 1 : s, h),
                f = n(a = a > 1 ? 1 : a, h),
                m = t.length,
                c = 1 - p,
                d = 1 - f,
                u = c * c * c,
                y = p * c * c * 3,
                g = p * p * c * 3,
                v = p * p * p,
                b = c * c * d,
                E = p * c * d + c * p * d + c * c * f,
                x = p * p * d + c * p * f + p * c * f,
                S = p * p * f,
                P = c * d * d,
                _ = p * d * d + c * f * d + c * d * f,
                C = p * f * d + c * f * f + p * d * f,
                A = p * f * f,
                T = d * d * d,
                k = f * d * d + d * f * d + d * d * f,
                M = f * f * d + d * f * f + f * d * f,
                D = f * f * f;

            for (l = 0; l < m; l += 1) {
              o[4 * l] = Math.round(1e3 * (u * t[l] + y * r[l] + g * i[l] + v * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (b * t[l] + E * r[l] + x * i[l] + S * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (P * t[l] + _ * r[l] + C * i[l] + A * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (T * t[l] + k * r[l] + M * i[l] + D * e[l])) / 1e3;
            }

            return o;
          },
          getPointInSegment: function getPointInSegment(t, e, r, i, s, a) {
            var o = n(s, a),
                h = 1 - o;
            return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * r[0] + (o * o * h + h * o * o + o * h * o) * i[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * r[1] + (o * o * h + h * o * o + o * h * o) * i[1] + o * o * o * e[1])) / 1e3];
          },
          buildBezierData: a,
          pointOnLine2D: t,
          pointOnLine3D: function pointOnLine3D(e, r, i, s, a, n, o, h, l) {
            if (0 === i && 0 === n && 0 === l) return t(e, r, s, a, o, h);
            var p,
                f = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - r, 2) + Math.pow(n - i, 2)),
                m = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)),
                c = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
            return (p = f > m ? f > c ? f - m - c : c - m - f : c > m ? c - m - f : m - f - c) > -1e-4 && p < 1e-4;
          }
        };
      }

      !function () {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) {
          window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];
        }

        window.requestAnimationFrame || (window.requestAnimationFrame = function (e, r) {
          var i = new Date().getTime(),
              s = Math.max(0, 16 - (i - t)),
              a = setTimeout(function () {
            e(i + s);
          }, s);
          return t = i + s, a;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        });
      }();
      var bez = bezFunction();

      function dataFunctionManager() {
        function t(s, a, n) {
          var o,
              h,
              l,
              f,
              m,
              c,
              d = s.length;

          for (h = 0; h < d; h += 1) {
            if ("ks" in (o = s[h]) && !o.completed) {
              if (o.completed = !0, o.tt && (s[h - 1].td = o.tt), [], -1, o.hasMask) {
                var u = o.masksProperties;

                for (f = u.length, l = 0; l < f; l += 1) {
                  if (u[l].pt.k.i) i(u[l].pt.k);else for (c = u[l].pt.k.length, m = 0; m < c; m += 1) {
                    u[l].pt.k[m].s && i(u[l].pt.k[m].s[0]), u[l].pt.k[m].e && i(u[l].pt.k[m].e[0]);
                  }
                }
              }

              0 === o.ty ? (o.layers = e(o.refId, a), t(o.layers, a, n)) : 4 === o.ty ? r(o.shapes) : 5 == o.ty && p(o, n);
            }
          }
        }

        function e(t, e) {
          for (var r = 0, i = e.length; r < i;) {
            if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
            r += 1;
          }
        }

        function r(t) {
          var e, s, a;

          for (e = t.length - 1; e >= 0; e -= 1) {
            if ("sh" == t[e].ty) {
              if (t[e].ks.k.i) i(t[e].ks.k);else for (a = t[e].ks.k.length, s = 0; s < a; s += 1) {
                t[e].ks.k[s].s && i(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && i(t[e].ks.k[s].e[0]);
              }
              !0;
            } else "gr" == t[e].ty && r(t[e].it);
          }
        }

        function i(t) {
          var e,
              r = t.i.length;

          for (e = 0; e < r; e += 1) {
            t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
          }
        }

        function s(t, e) {
          var r = e ? e.split(".") : [100, 100, 100];
          return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0));
        }

        var a,
            n = function () {
          var t = [4, 4, 14];

          function e(t) {
            var e,
                r,
                i,
                s = t.length;

            for (e = 0; e < s; e += 1) {
              5 === t[e].ty && (r = t[e], i = void 0, i = r.t.d, r.t.d = {
                k: [{
                  s: i,
                  t: 0
                }]
              });
            }
          }

          return function (r) {
            if (s(t, r.v) && (e(r.layers), r.assets)) {
              var i,
                  a = r.assets.length;

              for (i = 0; i < a; i += 1) {
                r.assets[i].layers && e(r.assets[i].layers);
              }
            }
          };
        }(),
            o = (a = [4, 7, 99], function (t) {
          if (t.chars && !s(a, t.v)) {
            var e,
                r,
                n,
                o,
                h,
                l = t.chars.length;

            for (e = 0; e < l; e += 1) {
              if (t.chars[e].data && t.chars[e].data.shapes) for (n = (h = t.chars[e].data.shapes[0].it).length, r = 0; r < n; r += 1) {
                (o = h[r].ks.k).__converted || (i(h[r].ks.k), o.__converted = !0);
              }
            }
          }
        }),
            h = function () {
          var t = [4, 1, 9];

          function e(t) {
            var r,
                i,
                s,
                a = t.length;

            for (r = 0; r < a; r += 1) {
              if ("gr" === t[r].ty) e(t[r].it);else if ("fl" === t[r].ty || "st" === t[r].ty) if (t[r].c.k && t[r].c.k[0].i) for (s = t[r].c.k.length, i = 0; i < s; i += 1) {
                t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);
              } else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255;
            }
          }

          function r(t) {
            var r,
                i = t.length;

            for (r = 0; r < i; r += 1) {
              4 === t[r].ty && e(t[r].shapes);
            }
          }

          return function (e) {
            if (s(t, e.v) && (r(e.layers), e.assets)) {
              var i,
                  a = e.assets.length;

              for (i = 0; i < a; i += 1) {
                e.assets[i].layers && r(e.assets[i].layers);
              }
            }
          };
        }(),
            l = function () {
          var t = [4, 4, 18];

          function e(t) {
            var r, i, s;

            for (r = t.length - 1; r >= 0; r -= 1) {
              if ("sh" == t[r].ty) {
                if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;else for (s = t[r].ks.k.length, i = 0; i < s; i += 1) {
                  t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
                }
                !0;
              } else "gr" == t[r].ty && e(t[r].it);
            }
          }

          function r(t) {
            var r,
                i,
                s,
                a,
                n,
                o,
                h = t.length;

            for (i = 0; i < h; i += 1) {
              if ((r = t[i]).hasMask) {
                var l = r.masksProperties;

                for (a = l.length, s = 0; s < a; s += 1) {
                  if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;else for (o = l[s].pt.k.length, n = 0; n < o; n += 1) {
                    l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl);
                  }
                }
              }

              4 === r.ty && e(r.shapes);
            }
          }

          return function (e) {
            if (s(t, e.v) && (r(e.layers), e.assets)) {
              var i,
                  a = e.assets.length;

              for (i = 0; i < a; i += 1) {
                e.assets[i].layers && r(e.assets[i].layers);
              }
            }
          };
        }();

        function p(t, e) {
          0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0);
        }

        var f = {
          completeData: function completeData(e, r) {
            e.__complete || (h(e), n(e), o(e), l(e), t(e.layers, e.assets, r), e.__complete = !0);
          }
        };
        return f.checkColors = h, f.checkChars = o, f.checkShapes = l, f.completeLayers = t, f;
      }

      var dataManager = dataFunctionManager(),
          FontManager = function () {
        var t = 5e3,
            e = {
          w: 0,
          size: 0,
          shapes: []
        },
            r = [];

        function i(t, e) {
          var r = createTag("span");
          r.style.fontFamily = e;
          var i = createTag("span");
          i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
          var s = i.offsetWidth;
          return i.style.fontFamily = t + ", " + e, {
            node: i,
            w: s,
            parent: r
          };
        }

        function s(t, e) {
          var r = createNS("text");
          return r.style.fontSize = "100px", r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", e.fStyle), r.setAttribute("font-weight", e.fWeight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r;
        }

        r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);

        var a = function a() {
          this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now();
        };

        return a.getCombinedCharacterCodes = function () {
          return r;
        }, a.prototype.addChars = function (t) {
          if (t) {
            this.chars || (this.chars = []);
            var e,
                r,
                i,
                s = t.length,
                a = this.chars.length;

            for (e = 0; e < s; e += 1) {
              for (r = 0, i = !1; r < a;) {
                this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
              }

              i || (this.chars.push(t[e]), a += 1);
            }
          }
        }, a.prototype.addFonts = function (t, e) {
          if (t) {
            if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
            var r,
                a = t.list,
                n = a.length,
                o = n;

            for (r = 0; r < n; r += 1) {
              var h,
                  l,
                  p = !0;

              if (a[r].loaded = !1, a[r].monoCase = i(a[r].fFamily, "monospace"), a[r].sansCase = i(a[r].fFamily, "sans-serif"), a[r].fPath) {
                if ("p" === a[r].fOrigin || 3 === a[r].origin) {
                  if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[r].fFamily + '"], style[f-origin="3"][f-family="' + a[r].fFamily + '"]')).length > 0 && (p = !1), p) {
                    var f = createTag("style");
                    f.setAttribute("f-forigin", a[r].fOrigin), f.setAttribute("f-origin", a[r].origin), f.setAttribute("f-family", a[r].fFamily), f.type = "text/css", f.innerHTML = "@font-face {font-family: " + a[r].fFamily + "; font-style: normal; src: url('" + a[r].fPath + "');}", e.appendChild(f);
                  }
                } else if ("g" === a[r].fOrigin || 1 === a[r].origin) {
                  for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) {
                    -1 !== h[l].href.indexOf(a[r].fPath) && (p = !1);
                  }

                  if (p) {
                    var m = createTag("link");
                    m.setAttribute("f-forigin", a[r].fOrigin), m.setAttribute("f-origin", a[r].origin), m.type = "text/css", m.rel = "stylesheet", m.href = a[r].fPath, document.body.appendChild(m);
                  }
                } else if ("t" === a[r].fOrigin || 2 === a[r].origin) {
                  for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) {
                    a[r].fPath === h[l].src && (p = !1);
                  }

                  if (p) {
                    var c = createTag("link");
                    c.setAttribute("f-forigin", a[r].fOrigin), c.setAttribute("f-origin", a[r].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", a[r].fPath), e.appendChild(c);
                  }
                }
              } else a[r].loaded = !0, o -= 1;

              a[r].helper = s(e, a[r]), a[r].cache = {}, this.fonts.push(a[r]);
            }

            0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
          } else this.isLoaded = !0;
        }, a.prototype.getCharData = function (t, r, i) {
          for (var s = 0, a = this.chars.length; s < a;) {
            if (this.chars[s].ch === t && this.chars[s].style === r && this.chars[s].fFamily === i) return this.chars[s];
            s += 1;
          }

          return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, r, i), e;
        }, a.prototype.getFontByName = function (t) {
          for (var e = 0, r = this.fonts.length; e < r;) {
            if (this.fonts[e].fName === t) return this.fonts[e];
            e += 1;
          }

          return this.fonts[0];
        }, a.prototype.measureText = function (t, e, r) {
          var i = this.getFontByName(e),
              s = t.charCodeAt(0);

          if (!i.cache[s + 1]) {
            var a = i.helper;

            if (" " === t) {
              a.textContent = "|" + t + "|";
              var n = a.getComputedTextLength();
              a.textContent = "||";
              var o = a.getComputedTextLength();
              i.cache[s + 1] = (n - o) / 100;
            } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100;
          }

          return i.cache[s + 1] * r;
        }, a.prototype.checkLoadedFonts = function () {
          var e,
              r,
              i,
              s = this.fonts.length,
              a = s;

          for (e = 0; e < s; e += 1) {
            this.fonts[e].loaded ? a -= 1 : "n" === this.fonts[e].fOrigin || 0 === this.fonts[e].origin ? this.fonts[e].loaded = !0 : (r = this.fonts[e].monoCase.node, i = this.fonts[e].monoCase.w, r.offsetWidth !== i ? (a -= 1, this.fonts[e].loaded = !0) : (r = this.fonts[e].sansCase.node, i = this.fonts[e].sansCase.w, r.offsetWidth !== i && (a -= 1, this.fonts[e].loaded = !0)), this.fonts[e].loaded && (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent), this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)));
          }

          0 !== a && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
            this.isLoaded = !0;
          }.bind(this), 0);
        }, a.prototype.loaded = function () {
          return this.isLoaded;
        }, a;
      }(),
          PropertyFactory = function () {
        var t = initialDefaultFrame,
            e = Math.abs;

        function r(t, e) {
          var r,
              s = this.offsetTime;
          "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));

          for (var a, n, o, h, l, p, f, m, c = e.lastIndex, d = c, u = this.keyframes.length - 1, y = !0; y;) {
            if (a = this.keyframes[d], n = this.keyframes[d + 1], d === u - 1 && t >= n.t - s) {
              a.h && (a = n), c = 0;
              break;
            }

            if (n.t - s > t) {
              c = d;
              break;
            }

            d < u - 1 ? d += 1 : (c = 0, y = !1);
          }

          var g,
              v,
              b,
              E,
              x,
              S,
              P,
              _,
              C,
              A,
              T = n.t - s,
              k = a.t - s;

          if (a.to) {
            a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
            var M = a.bezierData;

            if (t >= T || t < k) {
              var D = t >= T ? M.points.length - 1 : 0;

              for (h = M.points[D].point.length, o = 0; o < h; o += 1) {
                r[o] = M.points[D].point[o];
              }
            } else {
              a.__fnct ? m = a.__fnct : (m = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = m), l = m((t - k) / (T - k));
              var w,
                  F = M.segmentLength * l,
                  I = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;

              for (f = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0, y = !0, p = M.points.length; y;) {
                if (I += M.points[f].partialLength, 0 === F || 0 === l || f === M.points.length - 1) {
                  for (h = M.points[f].point.length, o = 0; o < h; o += 1) {
                    r[o] = M.points[f].point[o];
                  }

                  break;
                }

                if (F >= I && F < I + M.points[f + 1].partialLength) {
                  for (w = (F - I) / M.points[f + 1].partialLength, h = M.points[f].point.length, o = 0; o < h; o += 1) {
                    r[o] = M.points[f].point[o] + (M.points[f + 1].point[o] - M.points[f].point[o]) * w;
                  }

                  break;
                }

                f < p - 1 ? f += 1 : y = !1;
              }

              e._lastPoint = f, e._lastAddedLength = I - M.points[f].partialLength, e._lastKeyframeIndex = d;
            }
          } else {
            var V, R, B, L, G;
            if (u = a.s.length, g = n.s || a.e, this.sh && 1 !== a.h) {
              if (t >= T) r[0] = g[0], r[1] = g[1], r[2] = g[2];else if (t <= k) r[0] = a.s[0], r[1] = a.s[1], r[2] = a.s[2];else {
                var z = i(a.s),
                    N = i(g);
                v = r, b = function (t, e, r) {
                  var i,
                      s,
                      a,
                      n,
                      o,
                      h = [],
                      l = t[0],
                      p = t[1],
                      f = t[2],
                      m = t[3],
                      c = e[0],
                      d = e[1],
                      u = e[2],
                      y = e[3];
                  (s = l * c + p * d + f * u + m * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
                  1 - s > 1e-6 ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, o = Math.sin(r * i) / a) : (n = 1 - r, o = r);
                  return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * f + o * u, h[3] = n * m + o * y, h;
                }(z, N, (t - k) / (T - k)), E = b[0], x = b[1], S = b[2], P = b[3], _ = Math.atan2(2 * x * P - 2 * E * S, 1 - 2 * x * x - 2 * S * S), C = Math.asin(2 * E * x + 2 * S * P), A = Math.atan2(2 * E * P - 2 * x * S, 1 - 2 * E * E - 2 * S * S), v[0] = _ / degToRads, v[1] = C / degToRads, v[2] = A / degToRads;
              }
            } else for (d = 0; d < u; d += 1) {
              1 !== a.h && (t >= T ? l = 1 : t < k ? l = 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[d] ? m = a.__fnct[d] : (V = void 0 === a.o.x[d] ? a.o.x[0] : a.o.x[d], R = void 0 === a.o.y[d] ? a.o.y[0] : a.o.y[d], B = void 0 === a.i.x[d] ? a.i.x[0] : a.i.x[d], L = void 0 === a.i.y[d] ? a.i.y[0] : a.i.y[d], m = BezierFactory.getBezierEasing(V, R, B, L).get, a.__fnct[d] = m)) : a.__fnct ? m = a.__fnct : (V = a.o.x, R = a.o.y, B = a.i.x, L = a.i.y, m = BezierFactory.getBezierEasing(V, R, B, L).get, a.__fnct = m), l = m((t - k) / (T - k)))), g = n.s || a.e, G = 1 === a.h ? a.s[d] : a.s[d] + (g[d] - a.s[d]) * l, "multidimensional" === this.propType ? r[d] = G : r = G;
            }
          }

          return e.lastIndex = c, r;
        }

        function i(t) {
          var e = t[0] * degToRads,
              r = t[1] * degToRads,
              i = t[2] * degToRads,
              s = Math.cos(e / 2),
              a = Math.cos(r / 2),
              n = Math.cos(i / 2),
              o = Math.sin(e / 2),
              h = Math.sin(r / 2),
              l = Math.sin(i / 2);
          return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l];
        }

        function s() {
          var e = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;

          if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
            this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
            var s = this.interpolateValue(e, this._caching);
            this.pv = s;
          }

          return this._caching.lastFrame = e, this.pv;
        }

        function a(t) {
          var r;
          if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);else for (var i = 0, s = this.v.length; i < s;) {
            r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1;
          }
        }

        function n() {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
            this.lock = !0, this._mdf = this._isFirstFrame;
            var t,
                e = this.effectsSequence.length,
                r = this.kf ? this.pv : this.data.k;

            for (t = 0; t < e; t += 1) {
              r = this.effectsSequence[t](r);
            }

            this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }

        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function h(t, e, r, i) {
          this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.addEffect = o;
        }

        function l(t, e, r, i) {
          this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
          var s,
              h = e.k.length;
          this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h);
          createTypedArray("float32", h);

          for (this.vel = createTypedArray("float32", h), s = 0; s < h; s += 1) {
            this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
          }

          this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = a, this.addEffect = o;
        }

        function p(e, i, h, l) {
          this.propType = "unidimensional", this.keyframes = i.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
            lastFrame: t,
            lastIndex: 0,
            value: 0,
            _lastKeyframeIndex: -1
          }, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.effectsSequence = [s.bind(this)], this.addEffect = o;
        }

        function f(e, i, h, l) {
          this.propType = "multidimensional";
          var p,
              f,
              m,
              c,
              d,
              u = i.k.length;

          for (p = 0; p < u - 1; p += 1) {
            i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (f = i.k[p].s, m = i.k[p + 1].s, c = i.k[p].to, d = i.k[p].ti, (2 === f.length && (f[0] !== m[0] || f[1] !== m[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], f[0] + c[0], f[1] + c[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], m[0] + d[0], m[1] + d[1]) || 3 === f.length && (f[0] !== m[0] || f[1] !== m[1] || f[2] !== m[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], f[0] + c[0], f[1] + c[1], f[2] + c[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], m[0] + d[0], m[1] + d[1], m[2] + d[2])) && (i.k[p].to = null, i.k[p].ti = null), f[0] === m[0] && f[1] === m[1] && 0 === c[0] && 0 === c[1] && 0 === d[0] && 0 === d[1] && (2 === f.length || f[2] === m[2] && 0 === c[2] && 0 === d[2]) && (i.k[p].to = null, i.k[p].ti = null));
          }

          this.effectsSequence = [s.bind(this)], this.keyframes = i.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.frameId = -1;
          var y = i.k[0].s.length;

          for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) {
            this.v[p] = t, this.pv[p] = t;
          }

          this._caching = {
            lastFrame: t,
            lastIndex: 0,
            value: createTypedArray("float32", y)
          }, this.addEffect = o;
        }

        return {
          getProp: function getProp(t, e, r, i, s) {
            var a;
            if (e.k.length) {
              if ("number" == typeof e.k[0]) a = new l(t, e, i, s);else switch (r) {
                case 0:
                  a = new p(t, e, i, s);
                  break;

                case 1:
                  a = new f(t, e, i, s);
              }
            } else a = new h(t, e, i, s);
            return a.effectsSequence.length && s.addDynamicProperty(a), a;
          }
        };
      }(),
          TransformPropertyFactory = function () {
        var t = [0, 0];

        function e(t, e, r) {
          if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
            k: [0, 0, 0]
          }, 1, 0, this), e.rx) {
            if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
              var i,
                  s = e.or.k.length;

              for (i = 0; i < s; i += 1) {
                e.or.k[i].to = e.or.k[i].ti = null;
              }
            }

            this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0;
          } else this.r = PropertyFactory.getProp(t, e.r || {
            k: 0
          }, 0, degToRads, this);

          e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
            k: [0, 0, 0]
          }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
            k: [100, 100, 100]
          }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
            _mdf: !1,
            v: 1
          }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
        }

        return e.prototype = {
          applyToMatrix: function applyToMatrix(t) {
            var e = this._mdf;
            this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          },
          getValue: function getValue(e) {
            if (this.elem.globalData.frameId !== this.frameId) {
              if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
                if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                  var r,
                      i,
                      s = this.elem.globalData.frameRate;
                  if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / s, 0), i = this.p.getValueAtTime(this.p.keyframes[0].t / s, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0), i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / s, 0)) : (r = this.p.pv, i = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / s, this.p.offsetTime));else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                    r = [], i = [];
                    var a = this.px,
                        n = this.py;
                    a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (r[0] = a.getValueAtTime((a.keyframes[0].t + .01) / s, 0), r[1] = n.getValueAtTime((n.keyframes[0].t + .01) / s, 0), i[0] = a.getValueAtTime(a.keyframes[0].t / s, 0), i[1] = n.getValueAtTime(n.keyframes[0].t / s, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (r[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0), r[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / s, 0), i[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / s, 0), i[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / s, 0)) : (r = [a.pv, n.pv], i[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / s, a.offsetTime), i[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / s, n.offsetTime));
                  } else r = i = t;
                  this.v.rotate(-Math.atan2(r[1] - i[1], r[0] - i[0]));
                }

                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              }

              this.frameId = this.elem.globalData.frameId;
            }
          },
          precalculateMatrix: function precalculateMatrix() {
            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
              if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
              }

              if (this.r) {
                if (this.r.effectsSequence.length) return;
                this.pre.rotate(-this.r.v), this.appliedTransformations = 4;
              } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
            }
          },
          autoOrient: function autoOrient() {}
        }, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function (t) {
          this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0;
        }, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
          getTransformProperty: function getTransformProperty(t, r, i) {
            return new e(t, r, i);
          }
        };
      }();

      function ShapePath() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
      }

      ShapePath.prototype.setPathData = function (t, e) {
        this.c = t, this.setLength(e);

        for (var r = 0; r < e;) {
          this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1;
        }
      }, ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t;) {
          this.doubleArrayLength();
        }

        this._length = t;
      }, ShapePath.prototype.doubleArrayLength = function () {
        this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
      }, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
        var a;

        switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
          case "v":
            a = this.v;
            break;

          case "i":
            a = this.i;
            break;

          case "o":
            a = this.o;
        }

        (!a[i] || a[i] && !s) && (a[i] = point_pool.newElement()), a[i][0] = t, a[i][1] = e;
      }, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
        this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o);
      }, ShapePath.prototype.reverse = function () {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v,
            r = this.o,
            i = this.i,
            s = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
        var a,
            n = this._length - 1,
            o = this._length;

        for (a = s; a < o; a += 1) {
          t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
        }

        return t;
      };

      var ShapePropertyFactory = function () {
        var t = -999999;

        function e(t, e, r) {
          var i,
              s,
              a,
              n,
              o,
              h,
              l,
              p,
              f,
              m = r.lastIndex,
              c = this.keyframes;
          if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, m = 0;else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;else {
            for (var d, u, y = m, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) {
              y < g - 1 ? y += 1 : v = !1;
            }

            if (m = y, !(a = 1 === d.h)) {
              if (t >= u.t - this.offsetTime) p = 1;else if (t < d.t - this.offsetTime) p = 0;else {
                var b;
                d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)));
              }
              s = u.s ? u.s[0] : d.e[0];
            }

            i = d.s[0];
          }

          for (h = e._length, l = i.i[0].length, r.lastIndex = m, n = 0; n < h; n += 1) {
            for (o = 0; o < l; o += 1) {
              f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = f, f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = f, f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = f;
            }
          }
        }

        function r() {
          var e = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
              s = this._caching.lastFrame;
          return s !== t && (s < r && e < r || s > i && e > i) || (this._caching.lastIndex = s < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv;
        }

        function i() {
          this.paths = this.localShapeCollection;
        }

        function s(t) {
          (function (t, e) {
            if (t._length !== e._length || t.c !== e.c) return !1;
            var r,
                i = t._length;

            for (r = 0; r < i; r += 1) {
              if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
            }

            return !0;
          })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
        }

        function a() {
          if (this.elem.globalData.frameId !== this.frameId) if (this.effectsSequence.length) {
            if (this.lock) this.setVValue(this.pv);else {
              this.lock = !0, this._mdf = !1;
              var t,
                  e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                  r = this.effectsSequence.length;

              for (t = 0; t < r; t += 1) {
                e = this.effectsSequence[t](e);
              }

              this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId;
            }
          } else this._mdf = !1;
        }

        function n(t, e, r) {
          this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
          var s = 3 === r ? e.pt.k : e.ks.k;
          this.v = shape_pool.clone(s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = [];
        }

        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function h(e, s, a) {
          this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === a ? s.pt.k : s.ks.k, this.k = !0, this.kf = !0;
          var n = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, n), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
            lastFrame: t,
            lastIndex: 0
          }, this.effectsSequence = [r.bind(this)];
        }

        n.prototype.interpolateShape = e, n.prototype.getValue = a, n.prototype.setVValue = s, n.prototype.addEffect = o, h.prototype.getValue = a, h.prototype.interpolateShape = e, h.prototype.setVValue = s, h.prototype.addEffect = o;

        var l = function () {
          var t = roundCorner;

          function e(t, e) {
            this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }

          return e.prototype = {
            reset: i,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function convertEllToPath() {
              var e = this.p.v[0],
                  r = this.p.v[1],
                  i = this.s.v[0] / 2,
                  s = this.s.v[1] / 2,
                  a = 3 !== this.d,
                  n = this.v;
              n.v[0][0] = e, n.v[0][1] = r - s, n.v[1][0] = a ? e + i : e - i, n.v[1][1] = r, n.v[2][0] = e, n.v[2][1] = r + s, n.v[3][0] = a ? e - i : e + i, n.v[3][1] = r, n.i[0][0] = a ? e - i * t : e + i * t, n.i[0][1] = r - s, n.i[1][0] = a ? e + i : e - i, n.i[1][1] = r - s * t, n.i[2][0] = a ? e + i * t : e - i * t, n.i[2][1] = r + s, n.i[3][0] = a ? e - i : e + i, n.i[3][1] = r + s * t, n.o[0][0] = a ? e + i * t : e - i * t, n.o[0][1] = r - s, n.o[1][0] = a ? e + i : e - i, n.o[1][1] = r + s * t, n.o[2][0] = a ? e - i * t : e + i * t, n.o[2][1] = r + s, n.o[3][0] = a ? e - i : e + i, n.o[3][1] = r - s * t;
            }
          }, extendPrototype([DynamicPropertyContainer], e), e;
        }(),
            p = function () {
          function t(t, e) {
            this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }

          return t.prototype = {
            reset: i,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function convertStarToPath() {
              var t,
                  e,
                  r,
                  i,
                  s = 2 * Math.floor(this.pt.v),
                  a = 2 * Math.PI / s,
                  n = !0,
                  o = this.or.v,
                  h = this.ir.v,
                  l = this.os.v,
                  p = this.is.v,
                  f = 2 * Math.PI * o / (2 * s),
                  m = 2 * Math.PI * h / (2 * s),
                  c = -Math.PI / 2;
              c += this.r.v;
              var d = 3 === this.data.d ? -1 : 1;

              for (this.v._length = 0, t = 0; t < s; t += 1) {
                r = n ? l : p, i = n ? f : m;
                var u = (e = n ? o : h) * Math.cos(c),
                    y = e * Math.sin(c),
                    g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                    v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d;
              }
            },
            convertPolygonToPath: function convertPolygonToPath() {
              var t,
                  e = Math.floor(this.pt.v),
                  r = 2 * Math.PI / e,
                  i = this.or.v,
                  s = this.os.v,
                  a = 2 * Math.PI * i / (4 * e),
                  n = -Math.PI / 2,
                  o = 3 === this.data.d ? -1 : 1;

              for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                var h = i * Math.cos(n),
                    l = i * Math.sin(n),
                    p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                    f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - f * a * s * o, h + p * a * s * o, l + f * a * s * o, t, !0), n += r * o;
              }

              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }(),
            f = function () {
          function t(t, e) {
            this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }

          return t.prototype = {
            convertRectToPath: function convertRectToPath() {
              var t = this.p.v[0],
                  e = this.p.v[1],
                  r = this.s.v[0] / 2,
                  i = this.s.v[1] / 2,
                  s = bm_min(r, i, this.r.v),
                  a = s * (1 - roundCorner);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)));
            },
            getValue: function getValue(t) {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: i
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }();

        var m = {
          getShapeProp: function getShapeProp(t, e, r) {
            var i;
            return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t, e, r) : new n(t, e, r) : 5 === r ? i = new f(t, e) : 6 === r ? i = new l(t, e) : 7 === r && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i;
          },
          getConstructorFunction: function getConstructorFunction() {
            return n;
          },
          getKeyframedConstructorFunction: function getKeyframedConstructorFunction() {
            return h;
          }
        };
        return m;
      }(),
          ShapeModifiers = function () {
        var t = {},
            e = {};
        return t.registerModifier = function (t, r) {
          e[t] || (e[t] = r);
        }, t.getModifier = function (t, r, i) {
          return new e[t](r, i);
        }, t;
      }();

      function ShapeModifier() {}

      function TrimModifier() {}

      function RoundCornersModifier() {}

      function RepeaterModifier() {}

      function ShapeCollection() {
        this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
      }

      function DashProperty(t, e, r, i) {
        this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
        var s,
            a,
            n = e.length || 0;

        for (s = 0; s < n; s += 1) {
          a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
            n: e[s].n,
            p: a
          };
        }

        this.k || this.getValue(!0), this._isAnimated = this.k;
      }

      function GradientProperty(t, e, r) {
        this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
        var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
        this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
      }

      ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
          t.sh.container.addDynamicProperty(t.sh);
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: shapeCollection_pool.newShapeCollection()
          };
          this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
        }
      }, ShapeModifier.prototype.init = function (t, e) {
        this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
      }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
        this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
      }, TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
        var a = [];
        e <= 1 ? a.push({
          s: t,
          e: e
        }) : t >= 1 ? a.push({
          s: t - 1,
          e: e - 1
        }) : (a.push({
          s: t,
          e: 1
        }), a.push({
          s: 0,
          e: e - 1
        }));
        var n,
            o,
            h = [],
            l = a.length;

        for (n = 0; n < l; n += 1) {
          var p, f;
          if ((o = a[n]).e * s < i || o.s * s > i + r) ;else p = o.s * s <= i ? 0 : (o.s * s - i) / r, f = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, f]);
        }

        return h.length || h.push([0, 0]), h;
      }, TrimModifier.prototype.releasePathsData = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          segments_length_pool.release(t[e]);
        }

        return t.length = 0, t;
      }, TrimModifier.prototype.processShapes = function (t) {
        var e, r, i;

        if (this._mdf || t) {
          var s = this.o.v % 360 / 360;

          if (s < 0 && (s += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s) > (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s)) {
            var a = e;
            e = r, r = a;
          }

          e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r;
        } else e = this.sValue, r = this.eValue;

        var n,
            o,
            h,
            l,
            p,
            f,
            m = this.shapes.length,
            c = 0;
        if (r === e) for (n = 0; n < m; n += 1) {
          this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
        } else if (1 === r && 0 === e || 0 === r && 1 === e) {
          if (this._mdf) for (n = 0; n < m; n += 1) {
            this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0;
          }
        } else {
          var d,
              u,
              y = [];

          for (n = 0; n < m; n += 1) {
            if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
              if (h = (i = d.shape.paths)._length, f = 0, !d.shape._mdf && d.pathsData.length) f = d.totalShapeLength;else {
                for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) {
                  p = bez.getSegmentsLength(i.shapes[o]), l.push(p), f += p.totalLength;
                }

                d.totalShapeLength = f, d.pathsData = l;
              }
              c += f, d.shape._mdf = !0;
            } else d.shape.paths = d.localShapeCollection;
          }

          var g,
              v = e,
              b = r,
              E = 0;

          for (n = m - 1; n >= 0; n -= 1) {
            if ((d = this.shapes[n]).shape._mdf) {
              for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && m > 1 ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, E, c), E += d.totalShapeLength) : g = [[v, b]], h = g.length, o = 0; o < h; o += 1) {
                v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
                  s: d.totalShapeLength * v,
                  e: d.totalShapeLength * b
                }) : v >= 1 ? y.push({
                  s: d.totalShapeLength * (v - 1),
                  e: d.totalShapeLength * (b - 1)
                }) : (y.push({
                  s: d.totalShapeLength * v,
                  e: d.totalShapeLength
                }), y.push({
                  s: 0,
                  e: d.totalShapeLength * (b - 1)
                }));
                var x = this.addShapes(d, y[0]);

                if (y[0].s !== y[0].e) {
                  if (y.length > 1) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                    var S = x.pop();
                    this.addPaths(x, u), x = this.addShapes(d, y[1], S);
                  } else this.addPaths(x, u), x = this.addShapes(d, y[1]);
                  this.addPaths(x, u);
                }
              }

              d.shape.paths = u;
            }
          }
        }
      }, TrimModifier.prototype.addPaths = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) {
          e.addShape(t[r]);
        }
      }, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
        s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1);
      }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
        e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1);
      }, TrimModifier.prototype.addShapes = function (t, e, r) {
        var i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f = t.pathsData,
            m = t.shape.paths.shapes,
            c = t.shape.paths._length,
            d = 0,
            u = [],
            y = !0;

        for (r ? (o = r._length, p = r._length) : (r = shape_pool.newElement(), o = 0, p = 0), u.push(r), i = 0; i < c; i += 1) {
          for (h = f[i].lengths, r.c = m[i].c, a = m[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1) {
            if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;else {
              if (d > e.e) {
                r.c = !1;
                break;
              }

              e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[s], m[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[s], m[i].o[s - 1], m[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1;
            }
          }

          if (m[i].c && h.length) {
            if (n = h[s - 1], d <= e.e) {
              var g = h[s - 1].addedLength;
              e.s <= d && e.e >= d + g ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[0], m[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[0], m[i].o[s - 1], m[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1);
            } else r.c = !1;

            d += n.addedLength, o += 1;
          }

          if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
          i < c - 1 && (r = shape_pool.newElement(), y = !0, u.push(r), o = 0);
        }

        return u;
      }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
      }, RoundCornersModifier.prototype.processPath = function (t, e) {
        var r = shape_pool.newElement();
        r.c = t.c;
        var i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f,
            m,
            c,
            d,
            u,
            y = t._length,
            g = 0;

        for (i = 0; i < y; i += 1) {
          s = t.v[i], n = t.o[i], a = t.i[i], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, f = u = s[1] - (s[1] - o[1]) * l, m = p - (p - s[0]) * roundCorner, c = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = m = s[0] + (o[0] - s[0]) * l, f = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1) : (r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1);
        }

        return r;
      }, RoundCornersModifier.prototype.processShapes = function (t) {
        var e,
            r,
            i,
            s,
            a,
            n,
            o = this.shapes.length,
            h = this.rd.v;
        if (0 !== h) for (r = 0; r < o; r += 1) {
          if ((a = this.shapes[r]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) {
            n.addShape(this.processPath(e[i], h));
          }
          a.shape.paths = a.localShapeCollection;
        }
        this.dynamicProperties.length || (this._mdf = !1);
      }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
      }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
        var n = a ? -1 : 1,
            o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
            h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }, RepeaterModifier.prototype.init = function (t, e, r, i) {
        this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);

        for (; r > 0;) {
          r -= 1, this._elements.unshift(e[r]), 1;
        }

        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, RepeaterModifier.prototype.resetElements = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
        }
      }, RepeaterModifier.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) {
          t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e);
        }
      }, RepeaterModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a;

        if (this._mdf || t) {
          var n,
              o = Math.ceil(this.c.v);

          if (this._groups.length < o) {
            for (; this._groups.length < o;) {
              var h = {
                it: this.cloneElements(this._elements),
                ty: "gr"
              };
              h.it.push({
                a: {
                  a: 0,
                  ix: 1,
                  k: [0, 0]
                },
                nm: "Transform",
                o: {
                  a: 0,
                  ix: 7,
                  k: 100
                },
                p: {
                  a: 0,
                  ix: 2,
                  k: [0, 0]
                },
                r: {
                  a: 1,
                  ix: 6,
                  k: [{
                    s: 0,
                    e: 0,
                    t: 0
                  }, {
                    s: 0,
                    e: 0,
                    t: 1
                  }]
                },
                s: {
                  a: 0,
                  ix: 3,
                  k: [100, 100]
                },
                sa: {
                  a: 0,
                  ix: 5,
                  k: 0
                },
                sk: {
                  a: 0,
                  ix: 4,
                  k: 0
                },
                ty: "tr"
              }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1;
            }

            this.elem.reloadShapes();
          }

          for (a = 0, i = 0; i <= this._groups.length - 1; i += 1) {
            n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;
          }

          this._currentCopies = o;
          var l = this.o.v,
              p = l % 1,
              f = l > 0 ? Math.floor(l) : Math.ceil(l),
              m = (this.tr.v.props, this.pMatrix.props),
              c = this.rMatrix.props,
              d = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var u,
              y,
              g = 0;

          if (l > 0) {
            for (; g < f;) {
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
            }

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p);
          } else if (l < 0) {
            for (; g > f;) {
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
            }

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p);
          }

          for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
            if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
              for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), u = 0; u < y; u += 1) {
                r[u] = this.matrix.props[u];
              }

              this.matrix.reset();
            } else for (this.matrix.reset(), u = 0; u < y; u += 1) {
              r[u] = this.matrix.props[u];
            }

            g += 1, a -= 1, i += s;
          }
        } else for (a = this._currentCopies, i = 0, s = 1; a;) {
          r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s;
        }
      }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
      }, ShapeCollection.prototype.releaseShapes = function () {
        var t;

        for (t = 0; t < this._length; t += 1) {
          shape_pool.release(this.shapes[t]);
        }

        this._length = 0;
      }, DashProperty.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
          var e = 0,
              r = this.dataProps.length;

          for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) {
            "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
          }
        }
      }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
        for (var r = 0, i = this.o.length / 2; r < i;) {
          if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
          r += 1;
        }

        return !0;
      }, GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
          if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
          t += 1;
        } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }, GradientProperty.prototype.getValue = function (t) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
          var e,
              r,
              i,
              s = 4 * this.data.p;

          for (e = 0; e < s; e += 1) {
            r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
          }

          if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) {
            r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
          }
          this._mdf = !t;
        }
      }, extendPrototype([DynamicPropertyContainer], GradientProperty);

      var buildShapeString = function buildShapeString(t, e, r, i) {
        if (0 === e) return "";
        var s,
            a = t.o,
            n = t.i,
            o = t.v,
            h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);

        for (s = 1; s < e; s += 1) {
          h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
        }

        return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h;
      },
          ImagePreloader = function () {
        var t = function () {
          var t = createTag("canvas");
          t.width = 1, t.height = 1;
          var e = t.getContext("2d");
          return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t;
        }();

        function e() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }

        function r(e) {
          var r = function (t, e, r) {
            var i = "";
            if (t.e) i = t.p;else if (e) {
              var s = t.p;
              -1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s;
            } else i = r, i += t.u ? t.u : "", i += t.p;
            return i;
          }(e, this.assetsPath, this.path),
              i = createTag("img");

          i.crossOrigin = "anonymous", i.addEventListener("load", this._imageLoaded.bind(this), !1), i.addEventListener("error", function () {
            s.img = t, this._imageLoaded();
          }.bind(this), !1), i.src = r;
          var s = {
            img: i,
            assetData: e
          };
          return s;
        }

        function i(t, e) {
          this.imagesLoadedCb = e;
          var r,
              i = t.length;

          for (r = 0; r < i; r += 1) {
            t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])));
          }
        }

        function s(t) {
          this.path = t || "";
        }

        function a(t) {
          this.assetsPath = t || "";
        }

        function n(t) {
          for (var e = 0, r = this.images.length; e < r;) {
            if (this.images[e].assetData === t) return this.images[e].img;
            e += 1;
          }
        }

        function o() {
          this.imagesLoadedCb = null, this.images.length = 0;
        }

        function h() {
          return this.totalImages === this.loadedAssets;
        }

        return function () {
          this.loadAssets = i, this.setAssetsPath = a, this.setPath = s, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = r, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
        };
      }(),
          featureSupport = function () {
        var t = {
          maskType: !0
        };
        return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t;
      }(),
          filtersFactory = function () {
        var t = {};
        return t.createFilter = function (t) {
          var e = createNS("filter");
          return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
        }, t.createAlphaToLuminanceFilter = function () {
          var t = createNS("feColorMatrix");
          return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
        }, t;
      }(),
          assetLoader = function () {
        function t(t) {
          return t.response && "object" == _typeof(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
        }

        return {
          load: function load(e, r, i) {
            var s,
                a = new XMLHttpRequest();
            a.open("GET", e, !0);

            try {
              a.responseType = "json";
            } catch (n) {}

            a.send(), a.onreadystatechange = function () {
              if (4 == a.readyState) if (200 == a.status) s = t(a), r(s);else try {
                s = t(a), r(s);
              } catch (n) {
                i && i(n);
              }
            };
          }
        };
      }();

      function TextAnimatorProperty(t, e, r) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
          alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
      }

      function TextAnimatorDataProperty(t, e, r) {
        var i = {
          propType: !1
        },
            s = PropertyFactory.getProp,
            a = e.a;
        this.a = {
          r: a.r ? s(t, a.r, 0, degToRads, r) : i,
          rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
          ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
          sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
          sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
          s: a.s ? s(t, a.s, 1, .01, r) : i,
          a: a.a ? s(t, a.a, 1, 0, r) : i,
          o: a.o ? s(t, a.o, 0, .01, r) : i,
          p: a.p ? s(t, a.p, 1, 0, r) : i,
          sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
          sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
          fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
          fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
          fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
          fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
          t: a.t ? s(t, a.t, 0, 0, r) : i
        }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t;
      }

      function LetterProps(t, e, r, i, s, a) {
        this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
          o: !0,
          sw: !!e,
          sc: !!r,
          fc: !!i,
          m: !0,
          p: !0
        };
      }

      function TextProperty(t, e) {
        this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1
        }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
      }

      TextAnimatorProperty.prototype.searchProperties = function () {
        var t,
            e,
            r = this._textData.a.length,
            i = PropertyFactory.getProp;

        for (t = 0; t < r; t += 1) {
          e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
        }

        this._textData.p && "m" in this._textData.p ? (this._pathData = {
          f: i(this._elem, this._textData.p.f, 0, 0, this),
          l: i(this._elem, this._textData.p.l, 0, 0, this),
          r: this._textData.p.r,
          m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
      }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
          this._isFirstFrame = !1;
          var r,
              i,
              s,
              a,
              n,
              o,
              h,
              l,
              p,
              f,
              m,
              c,
              d,
              u,
              y,
              g,
              v,
              b,
              E,
              x = this._moreOptions.alignment.v,
              S = this._animatorsData,
              P = this._textData,
              _ = this.mHelper,
              C = this._renderType,
              A = this.renderedLetters.length,
              T = (this.data, t.l);

          if (this._hasMaskedPath) {
            if (E = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
              var k,
                  M = E.v;

              for (this._pathData.r && (M = M.reverse()), n = {
                tLength: 0,
                segments: []
              }, a = M._length - 1, g = 0, s = 0; s < a; s += 1) {
                k = bez.buildBezierData(M.v[s], M.v[s + 1], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[s + 1][0] - M.v[s + 1][0], M.i[s + 1][1] - M.v[s + 1][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength;
              }

              s = a, E.v.c && (k = bez.buildBezierData(M.v[s], M.v[0], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength), this._pathData.pi = n;
            }

            if (n = this._pathData.pi, o = this._pathData.f.v, m = 0, f = 1, l = 0, p = !0, u = n.segments, o < 0 && E.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = (d = u[m = u.length - 1].points).length - 1; o < 0;) {
              o += d[f].partialLength, (f -= 1) < 0 && (f = (d = u[m -= 1].points).length - 1);
            }
            c = (d = u[m].points)[f - 1], y = (h = d[f]).partialLength;
          }

          a = T.length, r = 0, i = 0;
          var D,
              w,
              F,
              I,
              V = 1.2 * t.finalSize * .714,
              R = !0;
          F = S.length;
          var B,
              L,
              G,
              z,
              N,
              O,
              H,
              j,
              q,
              W,
              Y,
              X,
              $,
              K = -1,
              J = o,
              Z = m,
              U = f,
              Q = -1,
              tt = "",
              et = this.defaultPropsArray;

          if (2 === t.j || 1 === t.j) {
            var rt = 0,
                it = 0,
                st = 2 === t.j ? -.5 : -1,
                at = 0,
                nt = !0;

            for (s = 0; s < a; s += 1) {
              if (T[s].n) {
                for (rt && (rt += it); at < s;) {
                  T[at].animatorJustifyOffset = rt, at += 1;
                }

                rt = 0, nt = !0;
              } else {
                for (w = 0; w < F; w += 1) {
                  (D = S[w].a).t.propType && (nt && 2 === t.j && (it += D.t.v * st), (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? rt += D.t.v * B[0] * st : rt += D.t.v * B * st);
                }

                nt = !1;
              }
            }

            for (rt && (rt += it); at < s;) {
              T[at].animatorJustifyOffset = rt, at += 1;
            }
          }

          for (s = 0; s < a; s += 1) {
            if (_.reset(), N = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = J, R = !1, 0, this._hasMaskedPath && (f = U, c = (d = u[m = Z].points)[f - 1], y = (h = d[f]).partialLength, l = 0), $ = W = X = tt = "", et = this.defaultPropsArray;else {
              if (this._hasMaskedPath) {
                if (Q !== T[s].line) {
                  switch (t.j) {
                    case 1:
                      o += g - t.lineWidths[T[s].line];
                      break;

                    case 2:
                      o += (g - t.lineWidths[T[s].line]) / 2;
                  }

                  Q = T[s].line;
                }

                K !== T[s].ind && (T[K] && (o += T[K].extra), o += T[s].an / 2, K = T[s].ind), o += x[0] * T[s].an / 200;
                var ot = 0;

                for (w = 0; w < F; w += 1) {
                  (D = S[w].a).p.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? ot += D.p.v[0] * B[0] : ot += D.p.v[0] * B), D.a.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? ot += D.a.v[0] * B[0] : ot += D.a.v[0] * B);
                }

                for (p = !0; p;) {
                  l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, G = c.point[0] + (h.point[0] - c.point[0]) * v, z = c.point[1] + (h.point[1] - c.point[1]) * v, _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100), p = !1) : d && (l += h.partialLength, (f += 1) >= d.length && (f = 0, u[m += 1] ? d = u[m].points : E.v.c ? (f = 0, d = u[m = 0].points) : (l -= h.partialLength, d = null)), d && (c = h, y = (h = d[f]).partialLength));
                }

                L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0);
              } else L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0), _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100, 0);

              for (T[s].l / 2, w = 0; w < F; w += 1) {
                (D = S[w].a).t.propType && (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? B.length ? o += D.t.v * B[0] : o += D.t.v * B : B.length ? r += D.t.v * B[0] : r += D.t.v * B));
              }

              for (T[s].l / 2, t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), w = 0; w < F; w += 1) {
                (D = S[w].a).a.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? _.translate(-D.a.v[0] * B[0], -D.a.v[1] * B[1], D.a.v[2] * B[2]) : _.translate(-D.a.v[0] * B, -D.a.v[1] * B, D.a.v[2] * B));
              }

              for (w = 0; w < F; w += 1) {
                (D = S[w].a).s.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? _.scale(1 + (D.s.v[0] - 1) * B[0], 1 + (D.s.v[1] - 1) * B[1], 1) : _.scale(1 + (D.s.v[0] - 1) * B, 1 + (D.s.v[1] - 1) * B, 1));
              }

              for (w = 0; w < F; w += 1) {
                if (D = S[w].a, B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), D.sk.propType && (B.length ? _.skewFromAxis(-D.sk.v * B[0], D.sa.v * B[1]) : _.skewFromAxis(-D.sk.v * B, D.sa.v * B)), D.r.propType && (B.length ? _.rotateZ(-D.r.v * B[2]) : _.rotateZ(-D.r.v * B)), D.ry.propType && (B.length ? _.rotateY(D.ry.v * B[1]) : _.rotateY(D.ry.v * B)), D.rx.propType && (B.length ? _.rotateX(D.rx.v * B[0]) : _.rotateX(D.rx.v * B)), D.o.propType && (B.length ? N += (D.o.v * B[0] - N) * B[0] : N += (D.o.v * B - N) * B), t.strokeWidthAnim && D.sw.propType && (B.length ? H += D.sw.v * B[0] : H += D.sw.v * B), t.strokeColorAnim && D.sc.propType) for (q = 0; q < 3; q += 1) {
                  B.length ? O[q] = O[q] + (D.sc.v[q] - O[q]) * B[0] : O[q] = O[q] + (D.sc.v[q] - O[q]) * B;
                }

                if (t.fillColorAnim && t.fc) {
                  if (D.fc.propType) for (q = 0; q < 3; q += 1) {
                    B.length ? j[q] = j[q] + (D.fc.v[q] - j[q]) * B[0] : j[q] = j[q] + (D.fc.v[q] - j[q]) * B;
                  }
                  D.fh.propType && (j = B.length ? addHueToRGB(j, D.fh.v * B[0]) : addHueToRGB(j, D.fh.v * B)), D.fs.propType && (j = B.length ? addSaturationToRGB(j, D.fs.v * B[0]) : addSaturationToRGB(j, D.fs.v * B)), D.fb.propType && (j = B.length ? addBrightnessToRGB(j, D.fb.v * B[0]) : addBrightnessToRGB(j, D.fb.v * B));
                }
              }

              for (w = 0; w < F; w += 1) {
                (D = S[w].a).p.propType && (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), this._hasMaskedPath ? B.length ? _.translate(0, D.p.v[1] * B[0], -D.p.v[2] * B[1]) : _.translate(0, D.p.v[1] * B, -D.p.v[2] * B) : B.length ? _.translate(D.p.v[0] * B[0], D.p.v[1] * B[1], -D.p.v[2] * B[2]) : _.translate(D.p.v[0] * B, D.p.v[1] * B, -D.p.v[2] * B));
              }

              if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
                if (_.translate(0, -t.ls), _.translate(0, x[1] * V / 100 + i, 0), P.p.p) {
                  b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                  var ht = 180 * Math.atan(b) / Math.PI;
                  h.point[0] < c.point[0] && (ht += 180), _.rotate(-ht * Math.PI / 180);
                }

                _.translate(G, z, 0), o -= x[0] * T[s].an / 200, T[s + 1] && K !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize);
              } else {
                switch (_.translate(r, i, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                  case 1:
                    _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);

                    break;

                  case 2:
                    _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0);

                }

                _.translate(0, -t.ls), _.translate(L, 0, 0), _.translate(x[0] * T[s].an / 200, x[1] * V / 100, 0), r += T[s].l + t.tr / 1e3 * t.finalSize;
              }

              "html" === C ? tt = _.toCSS() : "svg" === C ? tt = _.to2dCSS() : et = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]], $ = N;
            }
            A <= s ? (I = new LetterProps($, W, Y, X, tt, et), this.renderedLetters.push(I), A += 1, this.lettersChangedFlag = !0) : (I = this.renderedLetters[s], this.lettersChangedFlag = I.update($, W, Y, X, tt, et) || this.lettersChangedFlag);
          }
        }
      }, TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
      }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, s, a) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
        var n = !1;
        return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n;
      }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
        for (var r in e) {
          e.hasOwnProperty(r) && (t[r] = e[r]);
        }

        return t;
      }, TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
      }, TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }, TextProperty.prototype.searchKeyframes = function () {
        return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }, TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.getValue = function (t) {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData,
              r = this.keysIndex;
          if (this.lock) this.setCurrentData(this.currentData);else {
            this.lock = !0, this._mdf = !1;
            var i,
                s = this.effectsSequence.length,
                a = t || this.data.d.k[this.keysIndex].s;

            for (i = 0; i < s; i += 1) {
              a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
            }

            e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }
      }, TextProperty.prototype.getKeyframeValue = function () {
        for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) {
          r += 1;
        }

        return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
      }, TextProperty.prototype.buildFinalText = function (t) {
        for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], s = 0, a = t.length; s < a;) {
          e = t.charCodeAt(s), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(s) : e >= 55296 && e <= 56319 && (e = t.charCodeAt(s + 1)) >= 56320 && e <= 57343 ? (i.push(t.substr(s, 2)), ++s) : i.push(t.charAt(s)), s += 1;
        }

        return i;
      }, TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e,
            r,
            i,
            s,
            a,
            n,
            o,
            h = this.elem.globalData.fontManager,
            l = this.data,
            p = [],
            f = 0,
            m = l.m.g,
            c = 0,
            d = 0,
            u = 0,
            y = [],
            g = 0,
            v = 0,
            b = h.getFontByName(t.f),
            E = 0,
            x = b.fStyle ? b.fStyle.split(" ") : [],
            S = "normal",
            P = "normal";

        for (r = x.length, e = 0; e < r; e += 1) {
          switch (x[e].toLowerCase()) {
            case "italic":
              P = "italic";
              break;

            case "bold":
              S = "700";
              break;

            case "black":
              S = "900";
              break;

            case "medium":
              S = "500";
              break;

            case "regular":
            case "normal":
              S = "400";
              break;

            case "light":
            case "thin":
              S = "200";
          }
        }

        t.fWeight = b.fWeight || S, t.fStyle = P, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;

        var _,
            C = t.tr / 1e3 * t.finalSize;

        if (t.sz) for (var A, T, k = !0, M = t.sz[0], D = t.sz[1]; k;) {
          A = 0, g = 0, r = (T = this.buildFinalText(t.t)).length, C = t.tr / 1e3 * t.finalSize;
          var w = -1;

          for (e = 0; e < r; e += 1) {
            _ = T[e].charCodeAt(0), i = !1, " " === T[e] ? w = e : 13 !== _ && 3 !== _ || (g = 0, i = !0, A += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(T[e], b.fStyle, b.fFamily), E = i ? 0 : o.w * t.finalSize / 100) : E = h.measureText(T[e], t.f, t.finalSize), g + E > M && " " !== T[e] ? (-1 === w ? r += 1 : e = w, A += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, w === e ? 1 : 0, "\r"), w = -1, g = 0) : (g += E, g += C);
          }

          A += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && D < A ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, k = !1);
        }
        g = -C, E = 0;
        var F,
            I = 0;

        for (e = 0; e < r; e += 1) {
          if (i = !1, _ = (F = t.finalText[e]).charCodeAt(0), " " === F ? s = " " : 13 === _ || 3 === _ ? (I = 0, y.push(g), v = g > v ? g : v, g = -2 * C, s = "", i = !0, u += 1) : s = t.finalText[e], h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily), E = i ? 0 : o.w * t.finalSize / 100) : E = h.measureText(s, t.f, t.finalSize), " " === F ? I += E + C : (g += E + C + I, I = 0), p.push({
            l: E,
            an: E,
            add: c,
            n: i,
            anIndexes: [],
            val: s,
            line: u,
            animatorJustifyOffset: 0
          }), 2 == m) {
            if (c += E, "" === s || " " === s || e === r - 1) {
              for ("" !== s && " " !== s || (c -= E); d <= e;) {
                p[d].an = c, p[d].ind = f, p[d].extra = E, d += 1;
              }

              f += 1, c = 0;
            }
          } else if (3 == m) {
            if (c += E, "" === s || e === r - 1) {
              for ("" === s && (c -= E); d <= e;) {
                p[d].an = c, p[d].ind = f, p[d].extra = E, d += 1;
              }

              c = 0, f += 1;
            }
          } else p[f].ind = f, p[f].extra = 0, f += 1;
        }

        if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = v, t.j) {
          case 1:
            t.justifyOffset = -t.boxWidth;
            break;

          case 2:
            t.justifyOffset = -t.boxWidth / 2;
            break;

          default:
            t.justifyOffset = 0;
        }
        t.lineWidths = y;
        var V,
            R,
            B = l.a;
        n = B.length;
        var L,
            G,
            z = [];

        for (a = 0; a < n; a += 1) {
          for ((V = B[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < r; e += 1) {
            (R = p[e]).anIndexes[a] = G, (1 == L && "" !== R.val || 2 == L && "" !== R.val && " " !== R.val || 3 == L && (R.n || " " == R.val || e == r - 1) || 4 == L && (R.n || e == r - 1)) && (1 === V.s.rn && z.push(G), G += 1);
          }

          l.a[a].s.totalChars = G;
          var N,
              O = -1;
          if (1 === V.s.rn) for (e = 0; e < r; e += 1) {
            O != (R = p[e]).anIndexes[a] && (O = R.anIndexes[a], N = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[a] = N;
          }
        }

        t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
      }, TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
      }, TextProperty.prototype.canResizeFont = function (t) {
        this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.setMinimumFontSize = function (t) {
        this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      };

      var TextSelectorProp = function () {
        var t = Math.max,
            e = Math.min,
            r = Math.floor;

        function i(t, e) {
          this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
            k: 0
          }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
            v: 100
          }, this.o = PropertyFactory.getProp(t, e.o || {
            k: 0
          }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
            k: 0
          }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
            k: 0
          }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue();
        }

        return i.prototype = {
          getMult: function getMult(i) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var s = 0,
                a = 0,
                n = 1,
                o = 1;
            this.ne.v > 0 ? s = this.ne.v / 100 : a = -this.ne.v / 100, this.xe.v > 0 ? n = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
            var h = BezierFactory.getBezierEasing(s, a, n, o).get,
                l = 0,
                p = this.finalS,
                f = this.finalE,
                m = this.data.sh;
            if (2 === m) l = h(l = f === p ? i >= f ? 1 : 0 : t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));else if (3 === m) l = h(l = f === p ? i >= f ? 0 : 1 : 1 - t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));else if (4 === m) f === p ? l = 0 : (l = t(0, e(.5 / (f - p) + (i - p) / (f - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);else if (5 === m) {
              if (f === p) l = 0;else {
                var c = f - p,
                    d = -c / 2 + (i = e(t(0, i + .5 - p), f - p)),
                    u = c / 2;
                l = Math.sqrt(1 - d * d / (u * u));
              }
              l = h(l);
            } else 6 === m ? (f === p ? l = 0 : (i = e(t(0, i + .5 - p), f - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (f - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(f, 1) - (p - i) : f - i, 1))), l = h(l));
            return l * this.a.v;
          },
          getValue: function getValue(t) {
            this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
            var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                r = this.o.v / e,
                i = this.s.v / e + r,
                s = this.e.v / e + r;

            if (i > s) {
              var a = i;
              i = s, s = a;
            }

            this.finalS = i, this.finalE = s;
          }
        }, extendPrototype([DynamicPropertyContainer], i), {
          getTextSelectorProp: function getTextSelectorProp(t, e, r) {
            return new i(t, e, r);
          }
        };
      }(),
          pool_factory = function pool_factory(t, e, r, i) {
        var s = 0,
            a = t,
            n = createSizedArray(a);

        function o() {
          return s ? n[s -= 1] : e();
        }

        return {
          newElement: o,
          release: function release(t) {
            s === a && (n = pooling.double(n), a *= 2), r && r(t), n[s] = t, s += 1;
          }
        };
      },
          pooling = function () {
        return {
          double: function double(t) {
            return t.concat(createSizedArray(t.length));
          }
        };
      }(),
          point_pool = function () {
        return pool_factory(8, function () {
          return createTypedArray("float32", 2);
        });
      }(),
          shape_pool = function () {
        var t = pool_factory(4, function () {
          return new ShapePath();
        }, function (t) {
          var e,
              r = t._length;

          for (e = 0; e < r; e += 1) {
            point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
          }

          t._length = 0, t.c = !1;
        });
        return t.clone = function (e) {
          var r,
              i = t.newElement(),
              s = void 0 === e._length ? e.v.length : e._length;

          for (i.setLength(s), i.c = e.c, r = 0; r < s; r += 1) {
            i.setTripleAt(e.v[r][0], e.v[r][1], e.o[r][0], e.o[r][1], e.i[r][0], e.i[r][1], r);
          }

          return i;
        }, t;
      }(),
          shapeCollection_pool = function () {
        var t = {
          newShapeCollection: function newShapeCollection() {
            var t;
            t = e ? i[e -= 1] : new ShapeCollection();
            return t;
          },
          release: function release(t) {
            var s,
                a = t._length;

            for (s = 0; s < a; s += 1) {
              shape_pool.release(t.shapes[s]);
            }

            t._length = 0, e === r && (i = pooling.double(i), r *= 2);
            i[e] = t, e += 1;
          }
        },
            e = 0,
            r = 4,
            i = createSizedArray(r);
        return t;
      }(),
          segments_length_pool = function () {
        return pool_factory(8, function () {
          return {
            lengths: [],
            totalLength: 0
          };
        }, function (t) {
          var e,
              r = t.lengths.length;

          for (e = 0; e < r; e += 1) {
            bezier_length_pool.release(t.lengths[e]);
          }

          t.lengths.length = 0;
        });
      }(),
          bezier_length_pool = function () {
        return pool_factory(8, function () {
          return {
            addedLength: 0,
            percents: createTypedArray("float32", defaultCurveSegments),
            lengths: createTypedArray("float32", defaultCurveSegments)
          };
        });
      }();

      function BaseRenderer() {}

      function SVGRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
        var r = "";

        if (e && e.title) {
          var i = createNS("title"),
              s = createElementID();
          i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s;
        }

        if (e && e.description) {
          var a = createNS("desc"),
              n = createElementID();
          a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n;
        }

        r && this.svgElement.setAttribute("aria-labelledby", r);
        var o = createNS("defs");
        this.svgElement.appendChild(o);
        var h = createNS("g");
        this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          progressiveLoad: e && e.progressiveLoad || !1,
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          viewBoxOnly: e && e.viewBoxOnly || !1,
          viewBoxSize: e && e.viewBoxSize || !1,
          className: e && e.className || "",
          id: e && e.id || "",
          focusable: e && e.focusable,
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "100%",
            height: e && e.filterSize && e.filterSize.height || "100%",
            x: e && e.filterSize && e.filterSize.x || "0%",
            y: e && e.filterSize && e.filterSize.y || "0%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: o,
          renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
      }

      function CanvasRenderer(t, e) {
        this.animationItem = t, this.renderConfig = {
          clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
          context: e && e.context || null,
          progressiveLoad: e && e.progressiveLoad || !1,
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          className: e && e.className || "",
          id: e && e.id || ""
        }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
          frameNum: -1,
          _mdf: !1,
          renderConfig: this.renderConfig,
          currentGlobalAlpha: -1
        }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1, this.rendererType = "canvas";
      }

      function HybridRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
          className: e && e.className || "",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "400%",
            height: e && e.filterSize && e.filterSize.height || "400%",
            x: e && e.filterSize && e.filterSize.x || "-100%",
            y: e && e.filterSize && e.filterSize.y || "-100%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
      }

      function MaskElement(t, e, r) {
        this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var i,
            s = this.globalData.defs,
            a = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = createSizedArray(a), this.solidPath = "";
        var n,
            o,
            h,
            l,
            p,
            f,
            m,
            c = this.masksProperties,
            d = 0,
            u = [],
            y = createElementID(),
            g = "clipPath",
            v = "clip-path";

        for (i = 0; i < a; i++) {
          if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (g = "mask", v = "mask"), "s" != c[i].mode && "i" != c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != c[i].mode) {
            var b;

            if (d += 1, n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (g = "mask", v = "mask", m = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (f = createNS("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), s.appendChild(p), n.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : (f = null, m = null), this.storedData[i] = {
              elem: n,
              x: m,
              expan: f,
              lastPath: "",
              lastOperator: "",
              filterId: b,
              lastRadius: 0
            }, "i" == c[i].mode) {
              h = u.length;
              var E = createNS("g");

              for (o = 0; o < h; o += 1) {
                E.appendChild(u[o]);
              }

              var x = createNS("mask");
              x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(n), s.appendChild(x), E.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(E);
            } else u.push(n);

            c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
              elem: n,
              lastPath: "",
              op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
              invRect: l
            }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
          } else this.viewData[i] = {
            op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
            prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
            elem: n,
            lastPath: ""
          }, s.appendChild(n);
        }

        for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) {
          this.maskElement.appendChild(u[i]);
        }

        d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
      }

      function HierarchyElement() {}

      function FrameElement() {}

      function TransformElement() {}

      function RenderableElement() {}

      function RenderableDOMElement() {}

      function ProcessedElement(t, e) {
        this.elem = t, this.pos = e;
      }

      function SVGStyleData(t, e) {
        this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null;
      }

      function SVGShapeData(t, e, r) {
        this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;

        for (var i = 0, s = t.length; i < s;) {
          if (t[i].mProps.dynamicProperties.length) {
            this._isAnimated = !0;
            break;
          }

          i += 1;
        }
      }

      function SVGTransformData(t, e, r) {
        this.transform = {
          mProps: t,
          op: e,
          container: r
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
      }

      function SVGStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
      }

      function SVGFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r;
      }

      function SVGGradientFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r);
      }

      function SVGGradientStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated;
      }

      function ShapeGroupData() {
        this.it = [], this.prevViewData = [], this.gr = createNS("g");
      }

      BaseRenderer.prototype.checkLayers = function (t) {
        var e,
            r,
            i = this.layers.length;

        for (this.completeLayers = !0, e = i - 1; e >= 0; e--) {
          this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
        }

        this.checkPendingElements();
      }, BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);

          case 0:
            return this.createComp(t);

          case 1:
            return this.createSolid(t);

          case 3:
            return this.createNull(t);

          case 4:
            return this.createShape(t);

          case 5:
            return this.createText(t);

          case 13:
            return this.createCamera(t);
        }

        return this.createNull(t);
      }, BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }, BaseRenderer.prototype.buildAllItems = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          this.buildItem(t);
        }

        this.checkPendingElements();
      }, BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
            r,
            i = t.length,
            s = this.layers.length;

        for (e = 0; e < i; e += 1) {
          for (r = 0; r < s;) {
            if (this.layers[r].id == t[e].id) {
              this.layers[r] = t[e];
              break;
            }

            r += 1;
          }
        }
      }, BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }, BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
        for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) {
          s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1;
        }
      }, BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          if (t[e].xt) {
            var i = this.createComp(t[e]);
            i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
          }
        }
      }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
        this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
          w: t.w,
          h: t.h
        };
      }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this);
      }, SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
        var r = createNS("clipPath"),
            i = createNS("rect");
        i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
        var s = createElementID();
        r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length);
      }, SVGRenderer.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
        var t,
            e = this.layers ? this.layers.length : 0;

        for (t = 0; t < e; t++) {
          this.elements[t] && this.elements[t].destroy();
        }

        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;

        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var r = this.createItem(this.layers[t]);
          e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)));
        }
      }, SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
          var t = this.pendingElements.pop();
          if (t.checkParenting(), t.data.tt) for (var e = 0, r = this.elements.length; e < r;) {
            if (this.elements[e] === t) {
              t.setMatte(this.elements[e - 1].layerId);
              break;
            }

            e += 1;
          }
        }
      }, SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
          var e,
              r = this.layers.length;

          for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e--) {
            (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
          }

          if (this.globalData._mdf) for (e = 0; e < r; e += 1) {
            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
          }
        }
      }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();

        if (r) {
          for (var i, s = 0; s < e;) {
            this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
          }

          i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r);
        }
      }, SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = "none";
      }, SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = "block";
      }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
        return new CVShapeElement(t, this.globalData, this);
      }, CanvasRenderer.prototype.createText = function (t) {
        return new CVTextElement(t, this.globalData, this);
      }, CanvasRenderer.prototype.createImage = function (t) {
        return new CVImageElement(t, this.globalData, this);
      }, CanvasRenderer.prototype.createComp = function (t) {
        return new CVCompElement(t, this.globalData, this);
      }, CanvasRenderer.prototype.createSolid = function (t) {
        return new CVSolidElement(t, this.globalData, this);
      }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
        if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) if (this.renderConfig.clearCanvas) {
          this.transformMat.cloneFromProps(t);
          var e = this.contextData.cTr.props;
          this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
          var r = this.contextData.cTr.props;
          this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
        } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
      }, CanvasRenderer.prototype.ctxOpacity = function (t) {
        if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void (this.globalData.currentGlobalAlpha = this.contextData.cO);
        this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO);
      }, CanvasRenderer.prototype.reset = function () {
        this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore();
      }, CanvasRenderer.prototype.save = function (t) {
        if (this.renderConfig.clearCanvas) {
          t && this.canvasContext.save();
          var e = this.contextData.cTr.props;
          this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
          var r,
              i = this.contextData.saved[this.contextData.cArrPos];

          for (r = 0; r < 16; r += 1) {
            i[r] = e[r];
          }

          this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
        } else this.canvasContext.save();
      }, CanvasRenderer.prototype.restore = function (t) {
        if (this.renderConfig.clearCanvas) {
          t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
          var e,
              r = this.contextData.saved[this.contextData.cArrPos],
              i = this.contextData.cTr.props;

          for (e = 0; e < 16; e += 1) {
            i[e] = r[e];
          }

          this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r);
        } else this.canvasContext.restore();
      }, CanvasRenderer.prototype.configAnimation = function (t) {
        this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
          w: t.w,
          h: t.h,
          sx: 0,
          sy: 0,
          tx: 0,
          ty: 0
        }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize();
      }, CanvasRenderer.prototype.updateContainerSize = function () {
        var t, e, r, i;

        if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
          var s = this.renderConfig.preserveAspectRatio.split(" "),
              a = s[1] || "meet",
              n = s[0] || "xMidYMid",
              o = n.substr(0, 4),
              h = n.substr(4);
          r = t / e, (i = this.transformCanvas.w / this.transformCanvas.h) > r && "meet" === a || i < r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === a || i > r && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === a || i > r && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i > r && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i > r && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0;
        } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);

        this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0);
      }, CanvasRenderer.prototype.destroy = function () {
        var t;

        for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) {
          this.elements[t] && this.elements[t].destroy();
        }

        this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
      }, CanvasRenderer.prototype.renderFrame = function (t, e) {
        if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
          this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
          var r,
              i = this.layers.length;

          for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r++) {
            (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
          }

          if (this.globalData._mdf) {
            for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1) {
              (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
            }

            !0 !== this.renderConfig.clearCanvas && this.restore();
          }
        }
      }, CanvasRenderer.prototype.buildItem = function (t) {
        var e = this.elements;

        if (!e[t] && 99 != this.layers[t].ty) {
          var r = this.createItem(this.layers[t], this, this.globalData);
          e[t] = r, r.initExpressions();
        }
      }, CanvasRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
          this.pendingElements.pop().checkParenting();
        }
      }, CanvasRenderer.prototype.hide = function () {
        this.animationItem.container.style.display = "none";
      }, CanvasRenderer.prototype.show = function () {
        this.animationItem.container.style.display = "block";
      }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
          this.pendingElements.pop().checkParenting();
        }
      }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();

        if (r) {
          var i = this.layers[e];
          if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);else if (this.threeDElements) this.addTo3dContainer(r, e);else {
            for (var s, a, n = 0; n < e;) {
              this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
            }

            s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r);
          }
        }
      }, HybridRenderer.prototype.createShape = function (t) {
        return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
      }, HybridRenderer.prototype.createText = function (t) {
        return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this);
      }, HybridRenderer.prototype.createCamera = function (t) {
        return this.camera = new HCameraElement(t, this.globalData, this), this.camera;
      }, HybridRenderer.prototype.createImage = function (t) {
        return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
      }, HybridRenderer.prototype.createComp = function (t) {
        return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
      }, HybridRenderer.prototype.createSolid = function (t) {
        return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
      }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
        for (var e = 0, r = this.threeDElements.length; e < r;) {
          if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
          e += 1;
        }
      }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
        var r = createTag("div");
        styleDiv(r);
        var i = createTag("div");
        styleDiv(i), "3d" === e && (r.style.width = this.globalData.compSize.w + "px", r.style.height = this.globalData.compSize.h + "px", r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = "50% 50%", i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), r.appendChild(i);
        var s = {
          container: i,
          perspectiveElem: r,
          startPos: t,
          endPos: t,
          type: e
        };
        return this.threeDElements.push(s), s;
      }, HybridRenderer.prototype.build3dContainers = function () {
        var t,
            e,
            r = this.layers.length,
            i = "";

        for (t = 0; t < r; t += 1) {
          this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
        }

        for (t = (r = this.threeDElements.length) - 1; t >= 0; t--) {
          this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
        }
      }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
        for (var r = 0, i = this.threeDElements.length; r < i;) {
          if (e <= this.threeDElements[r].endPos) {
            for (var s, a = this.threeDElements[r].startPos; a < e;) {
              this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
            }

            s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
            break;
          }

          r += 1;
        }
      }, HybridRenderer.prototype.configAnimation = function (t) {
        var e = createTag("div"),
            r = this.animationItem.wrapper;
        e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), e.style.overflow = "hidden";
        var i = createNS("svg");
        i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.resizerElem.appendChild(i);
        var s = createNS("defs");
        i.appendChild(s), this.data = t, this.setupGlobalData(t, i), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
      }, HybridRenderer.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
        var t,
            e = this.layers ? this.layers.length : 0;

        for (t = 0; t < e; t++) {
          this.elements[t].destroy();
        }

        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, HybridRenderer.prototype.updateContainerSize = function () {
        var t,
            e,
            r,
            i,
            s = this.animationItem.wrapper.offsetWidth,
            a = this.animationItem.wrapper.offsetHeight,
            n = s / a;
        this.globalData.compSize.w / this.globalData.compSize.h > n ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, i = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, i = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)";
      }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
        this.resizerElem.style.display = "none";
      }, HybridRenderer.prototype.show = function () {
        this.resizerElem.style.display = "block";
      }, HybridRenderer.prototype.initItems = function () {
        if (this.buildAllItems(), this.camera) this.camera.setup();else {
          var t,
              e = this.globalData.compSize.w,
              r = this.globalData.compSize.h,
              i = this.threeDElements.length;

          for (t = 0; t < i; t += 1) {
            this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px";
          }
        }
      }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
            r = t.length,
            i = createTag("div");

        for (e = 0; e < r; e += 1) {
          if (t[e].xt) {
            var s = this.createComp(t[e], i, this.globalData.comp, null);
            s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
          }
        }
      }, MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }, MaskElement.prototype.renderFrame = function (t) {
        var e,
            r = this.element.finalTransform.mat,
            i = this.masksProperties.length;

        for (e = 0; e < i; e++) {
          if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
            var s = this.storedData[e].expan;
            this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
          }
        }
      }, MaskElement.prototype.getMaskelement = function () {
        return this.maskElement;
      }, MaskElement.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
      }, MaskElement.prototype.drawPath = function (t, e, r) {
        var i,
            s,
            a = " M" + e.v[0][0] + "," + e.v[0][1];

        for (s = e._length, i = 1; i < s; i += 1) {
          a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
        }

        if (e.c && s > 1 && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
          var n = "";
          r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a;
        }
      }, MaskElement.prototype.destroy = function () {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
      }, HierarchyElement.prototype = {
        initHierarchy: function initHierarchy() {
          this.hierarchy = [], this._isParent = !1, this.checkParenting();
        },
        setHierarchy: function setHierarchy(t) {
          this.hierarchy = t;
        },
        setAsParent: function setAsParent() {
          this._isParent = !0;
        },
        checkParenting: function checkParenting() {
          void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
        }
      }, FrameElement.prototype = {
        initFrame: function initFrame() {
          this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
        },
        prepareProperties: function prepareProperties(t, e) {
          var r,
              i = this.dynamicProperties.length;

          for (r = 0; r < i; r += 1) {
            (e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
          }
        },
        addDynamicProperty: function addDynamicProperty(t) {
          -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
        }
      }, TransformElement.prototype = {
        initTransform: function initTransform() {
          this.finalTransform = {
            mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
              o: 0
            },
            _matMdf: !1,
            _opMdf: !1,
            mat: new Matrix()
          }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
        },
        renderTransform: function renderTransform() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t,
                e = this.finalTransform.mat,
                r = 0,
                i = this.hierarchy.length;
            if (!this.finalTransform._matMdf) for (; r < i;) {
              if (this.hierarchy[r].finalTransform.mProp._mdf) {
                this.finalTransform._matMdf = !0;
                break;
              }

              r += 1;
            }
            if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) {
              t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
            }
          }
        },
        globalToLocal: function globalToLocal(t) {
          var e = [];
          e.push(this.finalTransform);

          for (var r = !0, i = this.comp; r;) {
            i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
          }

          var s,
              a,
              n = e.length;

          for (s = 0; s < n; s += 1) {
            a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
          }

          return t;
        },
        mHelper: new Matrix()
      }, RenderableElement.prototype = {
        initRenderable: function initRenderable() {
          this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
        },
        addRenderableComponent: function addRenderableComponent(t) {
          -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
        },
        removeRenderableComponent: function removeRenderableComponent(t) {
          -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
        },
        prepareRenderableFrame: function prepareRenderableFrame(t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function checkTransparency() {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
        },
        checkLayerLimits: function checkLayerLimits(t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
        },
        renderRenderable: function renderRenderable() {
          var t,
              e = this.renderableComponents.length;

          for (t = 0; t < e; t += 1) {
            this.renderableComponents[t].renderFrame(this._isFirstFrame);
          }
        },
        sourceRectAtTime: function sourceRectAtTime() {
          return {
            top: 0,
            left: 0,
            width: 100,
            height: 100
          };
        },
        getLayerSize: function getLayerSize() {
          return 5 === this.data.ty ? {
            w: this.data.textData.width,
            h: this.data.textData.height
          } : {
            w: this.data.width,
            h: this.data.height
          };
        }
      }, extendPrototype([RenderableElement, createProxyFunction({
        initElement: function initElement(t, e, r) {
          this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
        },
        hide: function hide() {
          this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0);
        },
        show: function show() {
          this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0);
        },
        renderFrame: function renderFrame() {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        renderInnerContent: function renderInnerContent() {},
        prepareFrame: function prepareFrame(t) {
          this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
        },
        destroy: function destroy() {
          this.innerElem = null, this.destroyBaseElement();
        }
      })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
        this.d = "", this._mdf = !1;
      }, SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
        this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
          k: 0
        }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
          k: 0
        }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated;
      }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var r = createElementID(),
            i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
        var s,
            a,
            n,
            o = [];

        for (n = 4 * e.g.p, a = 0; a < n; a += 4) {
          s = createNS("stop"), i.appendChild(s), o.push(s);
        }

        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o;
      }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r,
              i,
              s,
              a = createNS("mask"),
              n = createNS("path");
          a.appendChild(n);
          var o = createElementID(),
              h = createElementID();
          a.setAttribute("id", h);
          var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
          l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
          var p = this.stops;

          for (i = 4 * t.g.p; i < s; i += 2) {
            (r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
          }

          n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n;
        }
      }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

      var SVGElementsRenderer = function () {
        var t = new Matrix(),
            e = new Matrix();

        function r(t, e, r) {
          (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
        }

        function i(r, i, s) {
          var a,
              n,
              o,
              h,
              l,
              p,
              f,
              m,
              c,
              d,
              u,
              y = i.styles.length,
              g = i.lvl;

          for (p = 0; p < y; p += 1) {
            if (h = i.sh._mdf || s, i.styles[p].lvl < g) {
              for (m = e.reset(), d = g - i.styles[p].lvl, u = i.transformers.length - 1; !h && d > 0;) {
                h = i.transformers[u].mProps._mdf || h, d--, u--;
              }

              if (h) for (d = g - i.styles[p].lvl, u = i.transformers.length - 1; d > 0;) {
                c = i.transformers[u].mProps.v.props, m.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), d--, u--;
              }
            } else m = t;

            if (n = (f = i.sh.paths)._length, h) {
              for (o = "", a = 0; a < n; a += 1) {
                (l = f.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, m));
              }

              i.caches[p] = o;
            } else o = i.caches[p];

            i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf;
          }
        }

        function s(t, e, r) {
          var i = e.style;
          (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v);
        }

        function a(t, e, r) {
          n(t, e, r), o(t, e, r);
        }

        function n(t, e, r) {
          var i,
              s,
              a,
              n,
              o,
              h = e.gf,
              l = e.g._hasOpacity,
              p = e.s.v,
              f = e.e.v;

          if (e.o._mdf || r) {
            var m = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
            e.style.pElem.setAttribute(m, e.o.v);
          }

          if (e.s._mdf || r) {
            var c = 1 === t.t ? "x1" : "cx",
                d = "x1" === c ? "y1" : "cy";
            h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]));
          }

          if (e.g._cmdf || r) {
            i = e.cst;
            var u = e.g.c;

            for (a = i.length, s = 0; s < a; s += 1) {
              (n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")");
            }
          }

          if (l && (e.g._omdf || r)) {
            var y = e.g.o;

            for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) {
              n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1]);
            }
          }

          if (1 === t.t) (e.e._mdf || r) && (h.setAttribute("x2", f[0]), h.setAttribute("y2", f[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
            o || (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));
            var g = Math.atan2(f[1] - p[1], f[0] - p[0]),
                v = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                b = Math.cos(g + e.a.v) * v + p[0],
                E = Math.sin(g + e.a.v) * v + p[1];
            h.setAttribute("fx", b), h.setAttribute("fy", E), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E));
          }
        }

        function o(t, e, r) {
          var i = e.style,
              s = e.d;
          s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
        }

        return {
          createRenderFunction: function createRenderFunction(t) {
            t.ty;

            switch (t.ty) {
              case "fl":
                return s;

              case "gf":
                return n;

              case "gs":
                return a;

              case "st":
                return o;

              case "sh":
              case "el":
              case "rc":
              case "sr":
                return i;

              case "tr":
                return r;
            }
          }
        };
      }();

      function ShapeTransformManager() {
        this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
      }

      function CVShapeData(t, e, r, i) {
        this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
        var s = 4;
        "rc" == e.ty ? s = 5 : "el" == e.ty ? s = 6 : "sr" == e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
        var a,
            n,
            o = r.length;

        for (a = 0; a < o; a += 1) {
          r[a].closed || (n = {
            transforms: i.addTransformSequence(r[a].transforms),
            trNodes: []
          }, this.styledShapes.push(n), r[a].elements.push(n));
        }
      }

      function BaseElement() {}

      function NullElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
      }

      function SVGBaseElement() {}

      function IShapeElement() {}

      function ITextElement() {}

      function ICompElement() {}

      function IImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        };
      }

      function ISolidElement(t, e, r) {
        this.initElement(t, e, r);
      }

      function SVGCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }

      function SVGTextElement(t, e, r) {
        this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r);
      }

      function SVGShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = [];
      }

      function SVGTintFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");

        if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
          var i,
              s = createNS("feMerge");
          t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i);
        }
      }

      function SVGFillFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r;
      }

      function SVGGaussianBlurEffect(t, e) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
        var r = createNS("feGaussianBlur");
        t.appendChild(r), this.feGaussianBlur = r;
      }

      function SVGStrokeEffect(t, e) {
        this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
      }

      function SVGTritoneFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
        var i = createNS("feComponentTransfer");
        i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
        var s = createNS("feFuncR");
        s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
        var a = createNS("feFuncG");
        a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
        var n = createNS("feFuncB");
        n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n;
      }

      function SVGProLevelsFilter(t, e) {
        this.filterManager = e;
        var r = this.filterManager.effectElements,
            i = createNS("feComponentTransfer");
        (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i));
      }

      function SVGDropShadowEffect(t, e) {
        var r = e.container.globalData.renderConfig.filterSize;
        t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
        var i = createNS("feGaussianBlur");
        i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
        var s = createNS("feOffset");
        s.setAttribute("dx", "25"), s.setAttribute("dy", "0"), s.setAttribute("in", "drop_shadow_1"), s.setAttribute("result", "drop_shadow_2"), this.feOffset = s, t.appendChild(s);
        var a = createNS("feFlood");
        a.setAttribute("flood-color", "#00ff00"), a.setAttribute("flood-opacity", "1"), a.setAttribute("result", "drop_shadow_3"), this.feFlood = a, t.appendChild(a);
        var n = createNS("feComposite");
        n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
        var o,
            h = createNS("feMerge");
        t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o);
      }

      ShapeTransformManager.prototype = {
        addTransformSequence: function addTransformSequence(t) {
          var e,
              r = t.length,
              i = "_";

          for (e = 0; e < r; e += 1) {
            i += t[e].transform.key + "_";
          }

          var s = this.sequences[i];
          return s || (s = {
            transforms: [].concat(t),
            finalTransform: new Matrix(),
            _mdf: !1
          }, this.sequences[i] = s, this.sequenceList.push(s)), s;
        },
        processSequence: function processSequence(t, e) {
          for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
            if (t.transforms[i].transform.mProps._mdf) {
              a = !0;
              break;
            }

            i += 1;
          }

          if (a) for (t.finalTransform.reset(), i = s - 1; i >= 0; i -= 1) {
            r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
          }
          t._mdf = a;
        },
        processSequences: function processSequences(t) {
          var e,
              r = this.sequenceList.length;

          for (e = 0; e < r; e += 1) {
            this.processSequence(this.sequenceList[e], t);
          }
        },
        getNewKey: function getNewKey() {
          return "_" + this.transform_key_count++;
        }
      }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
        checkMasks: function checkMasks() {
          if (!this.data.hasMask) return !1;

          for (var t = 0, e = this.data.masksProperties.length; t < e;) {
            if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
            t += 1;
          }

          return !1;
        },
        initExpressions: function initExpressions() {
          this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
          this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
        },
        setBlendMode: function setBlendMode() {
          var t = getBlendMode(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
        },
        initBaseData: function initBaseData(t, e, r) {
          this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
        },
        getType: function getType() {
          return this.type;
        },
        sourceRectAtTime: function sourceRectAtTime() {}
      }, NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
        return null;
      }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
        initRendererElement: function initRendererElement() {
          this.layerElement = createNS("g");
        },
        createContainerElements: function createContainerElements() {
          this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
          var t,
              e,
              r,
              i = null;

          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s = createNS("mask");
              s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
            } else if (2 == this.data.td) {
              var a = createNS("mask");
              a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
              var n = createNS("g");
              a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
              var o = createNS("feComponentTransfer");
              o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
              var h = createNS("feFuncA");
              h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
              var l = createNS("rect");
              l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a);
            }
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;

          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
            var p = createNS("clipPath"),
                f = createNS("path");
            f.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var m = createElementID();

            if (p.setAttribute("id", m), p.appendChild(f), this.globalData.defs.appendChild(p), this.checkMasks()) {
              var c = createNS("g");
              c.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")");
          }

          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function renderElement() {
          this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
        },
        destroyBaseElement: function destroyBaseElement() {
          this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
        },
        getBaseElement: function getBaseElement() {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function createRenderableComponents() {
          this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this);
        },
        setMatte: function setMatte(t) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
        }
      }, IShapeElement.prototype = {
        addShapeToModifiers: function addShapeToModifiers(t) {
          var e,
              r = this.shapeModifiers.length;

          for (e = 0; e < r; e += 1) {
            this.shapeModifiers[e].addShape(t);
          }
        },
        isShapeInAnimatedModifiers: function isShapeInAnimatedModifiers(t) {
          for (var e = this.shapeModifiers.length; 0 < e;) {
            if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
          }

          return !1;
        },
        renderModifiers: function renderModifiers() {
          if (this.shapeModifiers.length) {
            var t,
                e = this.shapes.length;

            for (t = 0; t < e; t += 1) {
              this.shapes[t].sh.reset();
            }

            for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) {
              this.shapeModifiers[t].processShapes(this._isFirstFrame);
            }
          }
        },
        lcEnum: {
          1: "butt",
          2: "round",
          3: "square"
        },
        ljEnum: {
          1: "miter",
          2: "round",
          3: "bevel"
        },
        searchProcessedElement: function searchProcessedElement(t) {
          for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
            if (e[r].elem === t) return e[r].pos;
            r += 1;
          }

          return 0;
        },
        addProcessedElement: function addProcessedElement(t, e) {
          for (var r = this.processedElements, i = r.length; i;) {
            if (r[i -= 1].elem === t) return void (r[i].pos = e);
          }

          r.push(new ProcessedElement(t, e));
        },
        prepareFrame: function prepareFrame(t) {
          this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
        }
      }, ITextElement.prototype.initElement = function (t, e, r) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
      }, ITextElement.prototype.prepareFrame = function (t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
      }, ITextElement.prototype.createPathShape = function (t, e) {
        var r,
            i,
            s = e.length,
            a = "";

        for (r = 0; r < s; r += 1) {
          i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);
        }

        return a;
      }, ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }, ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }, ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
            break;

          case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
        }

        e.translate(i, s, 0);
      }, ITextElement.prototype.buildColor = function (t) {
        return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
      }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
      }, ICompElement.prototype.prepareFrame = function (t) {
        if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
          }
          var r,
              i = this.elements.length;

          for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1) {
            (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
          }
        }
      }, ICompElement.prototype.renderInnerContent = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
        }
      }, ICompElement.prototype.setElements = function (t) {
        this.elements = t;
      }, ICompElement.prototype.getElements = function () {
        return this.elements;
      }, ICompElement.prototype.destroyElements = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          this.elements[t] && this.elements[t].destroy();
        }
      }, ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
      }, IImageElement.prototype.sourceRectAtTime = function () {
        return this.sourceRect;
      }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
      }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
      }, SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, r = t.length, i = [], s = ""; e < r;) {
          t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
        }

        return i.push(s), i;
      }, SVGTextElement.prototype.buildNewText = function () {
        var t,
            e,
            r = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass) this.layerElement.setAttribute("class", i.fClass);else {
          this.layerElement.setAttribute("font-family", i.fFamily);
          var s = r.fWeight,
              a = r.fStyle;
          this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s);
        }
        this.layerElement.setAttribute("aria-label", r.t);
        var n,
            o = r.l || [],
            h = !!this.globalData.fontManager.chars;
        e = o.length;
        var l,
            p = this.mHelper,
            f = "",
            m = this.data.singleShape,
            c = 0,
            d = 0,
            u = !0,
            y = r.tr / 1e3 * r.finalSize;

        if (!m || h || r.sz) {
          var g,
              v,
              b = this.textSpans.length;

          for (t = 0; t < e; t += 1) {
            h && m && 0 !== t || (n = b > t ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), m && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], m ? f += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (m && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
          }

          m && n && n.setAttribute("d", f);
        } else {
          var E = this.textContainer,
              x = "start";

          switch (r.j) {
            case 1:
              x = "end";
              break;

            case 2:
              x = "middle";
          }

          E.setAttribute("text-anchor", x), E.setAttribute("letter-spacing", y);
          var S = this.buildTextContents(r.finalText);

          for (e = S.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1) {
            (n = this.textSpans[t] || createNS("tspan")).textContent = S[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", E.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;
          }

          this.layerElement.appendChild(E);
        }

        for (; t < this.textSpans.length;) {
          this.textSpans[t].style.display = "none", t += 1;
        }

        this._sizeChanged = !0;
      }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = {
            top: e.y,
            left: e.x,
            width: e.width,
            height: e.height
          };
        }

        return this.bbox;
      }, SVGTextElement.prototype.renderInnerContent = function () {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          var t, e;
          this._sizeChanged = !0;
          var r,
              i,
              s = this.textAnimator.renderedLetters,
              a = this.textProperty.currentData.l;

          for (e = a.length, t = 0; t < e; t += 1) {
            a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc));
          }
        }
      }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }, SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t,
            e,
            r,
            i,
            s = this.shapes.length,
            a = this.stylesList.length,
            n = [],
            o = !1;

        for (r = 0; r < a; r += 1) {
          for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < s; t += 1) {
            -1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
          }

          n.length > 1 && o && this.setShapesAsAnimated(n);
        }
      }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          t[e].setAsAnimated();
        }
      }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var r,
            i = new SVGStyleData(t, e),
            s = i.pElem;
        if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);else if ("gf" === t.ty || "gs" === t.ty) {
          r = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"));
        }
        return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r;
      }, SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData();
        return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
      }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this),
            i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i;
      }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
        var i = 4;
        "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
        var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
        return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s;
      }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i;) {
          if (this.animatedContents[r].element === e) return;
          r += 1;
        }

        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(t),
          element: e,
          data: t
        });
      }, SVGShapeElement.prototype.setElementStyles = function (t) {
        var e,
            r = t.styles,
            i = this.stylesList.length;

        for (e = 0; e < i; e += 1) {
          this.stylesList[e].closed || r.push(this.stylesList[e]);
        }
      }, SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
            e = this.itemsData.length;

        for (t = 0; t < e; t += 1) {
          this.prevViewData[t] = this.itemsData[t];
        }

        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
          this.dynamicProperties[t].getValue();
        }

        this.renderModifiers();
      }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
        var o,
            h,
            l,
            p,
            f,
            m,
            c = [].concat(a),
            d = t.length - 1,
            u = [],
            y = [];

        for (o = d; o >= 0; o -= 1) {
          if ((m = this.searchProcessedElement(t[o])) ? e[o] = r[m - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) m ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);else if ("gr" == t[o].ty) {
            if (m) for (l = e[o].it.length, h = 0; h < l; h += 1) {
              e[o].prevViewData[h] = e[o].it[h];
            } else e[o] = this.createGroupElement(t[o]);
            this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr);
          } else "tr" == t[o].ty ? (m || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (m || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (m ? (f = e[o]).closed = !1 : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = f, this.shapeModifiers.push(f)), y.push(f)) : "rp" == t[o].ty && (m ? (f = e[o]).closed = !0 : (f = ShapeModifiers.getModifier(t[o].ty), e[o] = f, f.init(this, t, o, e), this.shapeModifiers.push(f), n = !1), y.push(f));
          this.addProcessedElement(t[o], o + 1);
        }

        for (d = u.length, o = 0; o < d; o += 1) {
          u[o].closed = !0;
        }

        for (d = y.length, o = 0; o < d; o += 1) {
          y[o].closed = !0;
        }
      }, SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
            e = this.stylesList.length;

        for (t = 0; t < e; t += 1) {
          this.stylesList[t].reset();
        }

        for (this.renderShape(), t = 0; t < e; t += 1) {
          (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
        }
      }, SVGShapeElement.prototype.renderShape = function () {
        var t,
            e,
            r = this.animatedContents.length;

        for (t = 0; t < r; t += 1) {
          e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
        }
      }, SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
      }, SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
        }
      }, SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
              r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
        }
      }, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = .3 * this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = 3 == r ? 0 : e,
              s = 2 == r ? 0 : e;
          this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
          var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      }, SVGStrokeEffect.prototype.initialize = function () {
        var t,
            e,
            r,
            i,
            s = this.elem.layerElement.children || this.elem.layerElement.childNodes;

        for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) {
          t = createNS("path"), e.appendChild(t), this.paths.push({
            p: t,
            m: r
          });
        }

        if (3 === this.filterManager.effectElements[10].p.v) {
          var a = createNS("mask"),
              n = createElementID();
          a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
          var o = createNS("g");

          for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) {
            o.appendChild(s[0]);
          }

          this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff");
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
          if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) {
            this.elem.layerElement.removeChild(s[0]);
          }
          this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
        }

        this.initialized = !0, this.pathMasker = e;
      }, SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
            r,
            i,
            s = this.paths.length;

        for (e = 0; e < s; e += 1) {
          if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
            var a;

            if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
              var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                  o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                  h = i.getTotalLength();
              a = "0 0 0 " + h * n + " ";
              var l,
                  p = h * (o - n),
                  f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                  m = Math.floor(p / f);

              for (l = 0; l < m; l += 1) {
                a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
              }

              a += "0 " + 10 * h + " 0 0";
            } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;

            i.setAttribute("stroke-dasharray", a);
          }
        }

        if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
          var c = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")");
        }
      }, SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v,
              s = i[0] + " " + r[0] + " " + e[0],
              a = i[1] + " " + r[1] + " " + e[1],
              n = i[2] + " " + r[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
        }
      }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var r = createNS(t);
        return r.setAttribute("type", "table"), e.appendChild(r), r;
      }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
        for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
          length: 256
        }), f = 0, m = s - i, c = e - t; o <= 256;) {
          n = (a = o / 256) <= h ? c < 0 ? s : i : a >= l ? c < 0 ? i : s : i + m * Math.pow((a - t) / c, 1 / r), p[f++] = n, o += 256 / 255;
        }

        return p.join(" ");
      }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
              r = this.filterManager.effectElements;
          this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e));
        }
      }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
          }

          if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
            var r = this.filterManager.effectElements[3].p.v,
                i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                s = r * Math.cos(i),
                a = r * Math.sin(i);
            this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a);
          }
        }
      };
      var _svgMatteSymbols = [];

      function SVGMatte3Effect(t, e, r) {
        this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
      }

      function SVGEffects(t) {
        var e,
            r,
            i = t.data.ef ? t.data.ef.length : 0,
            s = createElementID(),
            a = filtersFactory.createFilter(s),
            n = 0;

        for (this.filters = [], e = 0; e < i; e += 1) {
          r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e])), r && this.filters.push(r);
        }

        n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this);
      }

      function CVContextData() {
        this.saved = [], this.cArrPos = 0, this.cTr = new Matrix(), this.cO = 1;
        var t;

        for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) {
          this.saved[t] = createTypedArray("float32", 16);
        }

        this._length = 15;
      }

      function CVBaseElement() {}

      function CVImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r);
      }

      function CVCompElement(t, e, r) {
        this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }

      function CVMaskElement(t, e) {
        this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
        var r,
            i = this.masksProperties.length,
            s = !1;

        for (r = 0; r < i; r++) {
          "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
        }

        this.hasMasks = s, s && this.element.addRenderableComponent(this);
      }

      function CVShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t, e, r);
      }

      function CVSolidElement(t, e, r) {
        this.initElement(t, e, r);
      }

      function CVTextElement(t, e, r) {
        this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          sWidth: 0,
          fValue: ""
        }, this.initElement(t, e, r);
      }

      function CVEffects() {}

      function HBaseElement(t, e, r) {}

      function HSolidElement(t, e, r) {
        this.initElement(t, e, r);
      }

      function HCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }

      function HShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        };
      }

      function HTextElement(t, e, r) {
        this.textSpans = [], this.textPaths = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r);
      }

      function HImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r);
      }

      function HCameraElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
        var i = PropertyFactory.getProp;

        if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
          var s,
              a = t.ks.or.k.length;

          for (s = 0; s < a; s += 1) {
            t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null;
          }
        }

        this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0, this.finalTransform = {
          mProp: this
        };
      }

      function HEffects() {}

      SVGMatte3Effect.prototype.findSymbol = function (t) {
        for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
          if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
          e += 1;
        }

        return null;
      }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var r = t.layerElement.parentNode;

        if (r) {
          for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) {
            a += 1;
          }

          a <= n - 2 && (i = s[a + 1]);
          var o = createNS("use");
          o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o);
        }
      }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var r = createElementID(),
              i = createNS("mask");
          i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(i);
          var a = createNS("symbol");
          a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
          var n = createNS("use");
          n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show();
        }

        t.setMatte(e.layerId);
      }, SVGMatte3Effect.prototype.initialize = function () {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) {
          e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
        }

        this.initialized = !0;
      }, SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }, SVGEffects.prototype.renderFrame = function (t) {
        var e,
            r = this.filters.length;

        for (e = 0; e < r; e += 1) {
          this.filters[e].renderFrame(t);
        }
      }, CVContextData.prototype.duplicate = function () {
        var t = 2 * this._length,
            e = this.savedOp;
        this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
        var r = 0;

        for (r = this._length; r < t; r += 1) {
          this.saved[r] = createTypedArray("float32", 16);
        }

        this._length = t;
      }, CVContextData.prototype.reset = function () {
        this.cArrPos = 0, this.cTr.reset(), this.cO = 1;
      }, CVBaseElement.prototype = {
        createElements: function createElements() {},
        initRendererElement: function initRendererElement() {},
        createContainerElements: function createContainerElements() {
          this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this);
        },
        createContent: function createContent() {},
        setBlendMode: function setBlendMode() {
          var t = this.globalData;

          if (t.blendMode !== this.data.bm) {
            t.blendMode = this.data.bm;
            var e = getBlendMode(this.data.bm);
            t.canvasContext.globalCompositeOperation = e;
          }
        },
        createRenderableComponents: function createRenderableComponents() {
          this.maskManager = new CVMaskElement(this.data, this);
        },
        hideElement: function hideElement() {
          this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0);
        },
        showElement: function showElement() {
          this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
        },
        renderFrame: function renderFrame() {
          if (!this.hidden && !this.data.hd) {
            this.renderTransform(), this.renderRenderable(), this.setBlendMode();
            var t = 0 === this.data.ty;
            this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1);
          }
        },
        destroy: function destroy() {
          this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
        },
        mHelper: new Matrix()
      }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
        if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
          var t = createTag("canvas");
          t.width = this.assetData.w, t.height = this.assetData.h;
          var e,
              r,
              i = t.getContext("2d"),
              s = this.img.width,
              a = this.img.height,
              n = s / a,
              o = this.assetData.w / this.assetData.h,
              h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
          n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t;
        }
      }, CVImageElement.prototype.renderInnerContent = function (t) {
        this.canvasContext.drawImage(this.img, 0, 0);
      }, CVImageElement.prototype.destroy = function () {
        this.img = null;
      }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
        var t,
            e = this.canvasContext;

        for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1) {
          (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
        }
      }, CVCompElement.prototype.destroy = function () {
        var t;

        for (t = this.layers.length - 1; t >= 0; t -= 1) {
          this.elements[t] && this.elements[t].destroy();
        }

        this.layers = null, this.elements = null;
      }, CVMaskElement.prototype.renderFrame = function () {
        if (this.hasMasks) {
          var t,
              e,
              r,
              i,
              s = this.element.finalTransform.mat,
              a = this.element.canvasContext,
              n = this.masksProperties.length;

          for (a.beginPath(), t = 0; t < n; t++) {
            if ("n" !== this.masksProperties[t].mode) {
              this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
              var o,
                  h = i._length;

              for (o = 1; o < h; o++) {
                r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
              }

              r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
            }
          }

          this.element.globalData.renderer.save(!0), a.clip();
        }
      }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
        this.element = null;
      }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
        opacity: 1,
        _opMdf: !1
      }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
      }, CVShapeElement.prototype.createStyleElement = function (t, e) {
        var r = {
          data: t,
          type: t.ty,
          preTransforms: this.transformsManager.addTransformSequence(e),
          transforms: [],
          elements: [],
          closed: !0 === t.hd
        },
            i = {};

        if ("fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
          k: 0
        }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
          k: 0
        }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
          if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
            var s = new DashProperty(this, t.d, "canvas", this);
            i.d = s, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0]);
          }
        } else r.r = 2 === t.r ? "evenodd" : "nonzero";

        return this.stylesList.push(r), i.style = r, i;
      }, CVShapeElement.prototype.createGroupElement = function (t) {
        return {
          it: [],
          prevViewData: []
        };
      }, CVShapeElement.prototype.createTransformElement = function (t) {
        return {
          transform: {
            opacity: 1,
            _opMdf: !1,
            key: this.transformsManager.getNewKey(),
            op: PropertyFactory.getProp(this, t.o, 0, .01, this),
            mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
          }
        };
      }, CVShapeElement.prototype.createShapeElement = function (t) {
        var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
        return this.shapes.push(e), this.addShapeToModifiers(e), e;
      }, CVShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
            e = this.itemsData.length;

        for (t = 0; t < e; t += 1) {
          this.prevViewData[t] = this.itemsData[t];
        }

        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
          this.dynamicProperties[t].getValue();
        }

        this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
      }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
        var e,
            r = this.stylesList.length;

        for (e = 0; e < r; e += 1) {
          this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
        }
      }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
        var t,
            e = this.stylesList.length;

        for (t = 0; t < e; t += 1) {
          this.stylesList[t].closed || this.stylesList[t].transforms.pop();
        }
      }, CVShapeElement.prototype.closeStyles = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          t[e].closed = !0;
        }
      }, CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
        var a,
            n,
            o,
            h,
            l,
            p,
            f = t.length - 1,
            m = [],
            c = [],
            d = [].concat(s);

        for (a = f; a >= 0; a -= 1) {
          if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), m.push(e[a].style);else if ("gr" == t[a].ty) {
            if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) {
              e[a].prevViewData[n] = e[a].it[n];
            } else e[a] = this.createGroupElement(t[a]);
            this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d);
          } else "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), e[a] = l, l.init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
          this.addProcessedElement(t[a], a + 1);
        }

        for (this.removeTransformFromStyleList(), this.closeStyles(m), f = c.length, a = 0; a < f; a += 1) {
          c[a].closed = !0;
        }
      }, CVShapeElement.prototype.renderInnerContent = function () {
        this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
      }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
        (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0);
      }, CVShapeElement.prototype.drawLayer = function () {
        var t,
            e,
            r,
            i,
            s,
            a,
            n,
            o,
            h,
            l = this.stylesList.length,
            p = this.globalData.renderer,
            f = this.globalData.canvasContext;

        for (t = 0; t < l; t += 1) {
          if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
            for (p.save(), a = h.elements, "st" === o || "gs" === o ? (f.strokeStyle = "st" === o ? h.co : h.grd, f.lineWidth = h.wi, f.lineCap = h.lc, f.lineJoin = h.lj, f.miterLimit = h.ml || 0) : f.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && f.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
              for ("st" !== o && "gs" !== o || (f.beginPath(), h.da && (f.setLineDash(h.da), f.lineDashOffset = h.do)), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) {
                "m" == n[i].t ? f.moveTo(n[i].p[0], n[i].p[1]) : "c" == n[i].t ? f.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : f.closePath();
              }

              "st" !== o && "gs" !== o || (f.stroke(), h.da && f.setLineDash(this.dashResetter));
            }

            "st" !== o && "gs" !== o && f.fill(h.r), p.restore();
          }
        }
      }, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
        var s, a;

        for (a = t, s = e.length - 1; s >= 0; s -= 1) {
          "tr" == e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], r[s]) : "fl" == e[s].ty ? this.renderFill(e[s], r[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
        }

        i && this.drawLayer();
      }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
        if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
          var r,
              i,
              s,
              a = t.trNodes,
              n = e.paths,
              o = n._length;
          a.length = 0;
          var h = t.transforms.finalTransform;

          for (s = 0; s < o; s += 1) {
            var l = n.shapes[s];

            if (l && l.v) {
              for (i = l._length, r = 1; r < i; r += 1) {
                1 === r && a.push({
                  t: "m",
                  p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                }), a.push({
                  t: "c",
                  pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                });
              }

              1 === i && a.push({
                t: "m",
                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
              }), l.c && i && (a.push({
                t: "c",
                pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
              }), a.push({
                t: "z"
              }));
            }
          }

          t.trNodes = a;
        }
      }, CVShapeElement.prototype.renderPath = function (t, e) {
        if (!0 !== t.hd && t._shouldRender) {
          var r,
              i = e.styledShapes.length;

          for (r = 0; r < i; r += 1) {
            this.renderStyledShape(e.styledShapes[r], e.sh);
          }
        }
      }, CVShapeElement.prototype.renderFill = function (t, e, r) {
        var i = e.style;
        (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity);
      }, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
        var i = e.style;

        if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
          var s = this.globalData.canvasContext,
              a = e.s.v,
              n = e.e.v;
          if (1 === t.t) m = s.createLinearGradient(a[0], a[1], n[0], n[1]);else var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)),
              h = Math.atan2(n[1] - a[1], n[0] - a[0]),
              l = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
              p = Math.cos(h + e.a.v) * l + a[0],
              f = Math.sin(h + e.a.v) * l + a[1],
              m = s.createRadialGradient(p, f, 0, a[0], a[1], o);
          var c,
              d = t.g.p,
              u = e.g.c,
              y = 1;

          for (c = 0; c < d; c += 1) {
            e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * c + 1]), m.addColorStop(u[4 * c] / 100, "rgba(" + u[4 * c + 1] + "," + u[4 * c + 2] + "," + u[4 * c + 3] + "," + y + ")");
          }

          i.grd = m;
        }

        i.coOp = e.o.v * r.opacity;
      }, CVShapeElement.prototype.renderStroke = function (t, e, r) {
        var i = e.style,
            s = e.d;
        s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v);
      }, CVShapeElement.prototype.destroy = function () {
        this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
      }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
        var t = this.canvasContext;
        t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh);
      }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = !1;
        t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
        var r = !1;
        t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
        var i,
            s,
            a = this.globalData.fontManager.getFontByName(t.f),
            n = t.l,
            o = this.mHelper;
        this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
        var h,
            l,
            p,
            f,
            m,
            c,
            d,
            u,
            y,
            g,
            v = this.data.singleShape,
            b = t.tr / 1e3 * t.finalSize,
            E = 0,
            x = 0,
            S = !0,
            P = 0;

        for (i = 0; i < s; i += 1) {
          for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && n[i].n && (E = -b, x += t.yOffset, x += S ? 1 : 0, S = !1), d = (m = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[i].line, E, x), y = createSizedArray(d), c = 0; c < d; c += 1) {
            for (f = m[c].ks.k.i.length, u = m[c].ks.k, g = [], p = 1; p < f; p += 1) {
              1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
            }

            g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g;
          }

          v && (E += n[i].l, E += b), this.textSpans[P] ? this.textSpans[P].elem = y : this.textSpans[P] = {
            elem: y
          }, P += 1;
        }
      }, CVTextElement.prototype.renderInnerContent = function () {
        var t,
            e,
            r,
            i,
            s,
            a,
            n = this.canvasContext;
        this.finalTransform.mat.props;
        n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
        var o,
            h = this.textAnimator.renderedLetters,
            l = this.textProperty.currentData.l;
        e = l.length;
        var p,
            f,
            m = null,
            c = null,
            d = null;

        for (t = 0; t < e; t += 1) {
          if (!l[t].n) {
            if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
              for (o && o.fc ? m !== o.fc && (m = o.fc, n.fillStyle = o.fc) : m !== this.values.fill && (m = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) {
                for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) {
                  this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
                }
              }

              this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
            }

            if (this.stroke) {
              for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) {
                for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) {
                  this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
                }
              }

              this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
            }

            o && this.globalData.renderer.restore();
          }
        }
      }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
        checkBlendMode: function checkBlendMode() {},
        initRendererElement: function initRendererElement() {
          this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement);
        },
        createContainerElements: function createContainerElements() {
          this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function renderElement() {
          this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v);
        },
        renderFrame: function renderFrame() {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        destroy: function destroy() {
          this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null);
        },
        createRenderableComponents: function createRenderableComponents() {
          this.maskManager = new MaskElement(this.data, this, this.globalData);
        },
        addEffects: function addEffects() {},
        setMatte: function setMatte() {}
      }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
        var t;
        this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t);
      }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
        this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement;
      }, HCompElement.prototype.addTo3dContainer = function (t, e) {
        for (var r, i = 0; i < e;) {
          this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
        }

        r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t);
      }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
        var t;
        if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;else {
          t = createNS("svg");
          var e = this.comp.data ? this.comp.data : this.globalData.compSize;
          t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
        }
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t;
      }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) {
          e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
        }

        return e;
      }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
        var r,
            i,
            s,
            a,
            n,
            o = t.sh.v,
            h = t.transformers,
            l = o._length;

        if (!(l <= 1)) {
          for (r = 0; r < l - 1; r += 1) {
            i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
          }

          o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e));
        }
      }, HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
        this.getBoundsOfCurve(t, e, r, i);
        var a = this.shapeBoundingBox;
        s.x = bm_min(a.left, s.x), s.xMax = bm_max(a.right, s.xMax), s.y = bm_min(a.top, s.y), s.yMax = bm_max(a.bottom, s.yMax);
      }, HShapeElement.prototype.shapeBoundingBox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, HShapeElement.prototype.tempBoundingBox = {
        x: 0,
        xMax: 0,
        y: 0,
        yMax: 0,
        width: 0,
        height: 0
      }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
        for (var s, a, n, o, h, l, p, f = [[t[0], i[0]], [t[1], i[1]]], m = 0; m < 2; ++m) {
          if (a = 6 * t[m] - 12 * e[m] + 6 * r[m], s = -3 * t[m] + 9 * e[m] - 9 * r[m] + 3 * i[m], n = 3 * e[m] - 3 * t[m], a |= 0, n |= 0, 0 !== (s |= 0)) (h = a * a - 4 * n * s) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) && l < 1 && f[m].push(this.calculateF(l, t, e, r, i, m)), 0 < (p = (-a - bm_sqrt(h)) / (2 * s)) && p < 1 && f[m].push(this.calculateF(p, t, e, r, i, m)));else {
            if (0 === a) continue;
            0 < (o = -n / a) && o < 1 && f[m].push(this.calculateF(o, t, e, r, i, m));
          }
        }

        this.shapeBoundingBox.left = bm_min.apply(null, f[0]), this.shapeBoundingBox.top = bm_min.apply(null, f[1]), this.shapeBoundingBox.right = bm_max.apply(null, f[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, f[1]);
      }, HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
        return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bm_pow(t, 2) * i[a] + bm_pow(t, 3) * s[a];
      }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) {
          t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e);
        }
      }, HShapeElement.prototype.currentBoxContains = function (t) {
        return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height;
      }, HShapeElement.prototype.renderInnerContent = function () {
        if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
          var t = this.tempBoundingBox,
              e = 999999;
          if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
          var r = !1;
          this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
        }
      }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
        if (this.isMasked = this.checkMasks(), this.isMasked) {
          this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
          var t = createNS("g");
          this.maskedElement.appendChild(t), this.innerElem = t;
        } else this.renderType = "html", this.innerElem = this.layerElement;

        this.checkParenting();
      }, HTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = this.innerElem.style;
        e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
        var r,
            i,
            s = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars) if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass;else {
          e.fontFamily = s.fFamily;
          var a = t.fWeight,
              n = t.fStyle;
          e.fontStyle = n, e.fontWeight = a;
        }
        var o,
            h,
            l,
            p = t.l;
        i = p.length;
        var f,
            m = this.mHelper,
            c = "",
            d = 0;

        for (r = 0; r < i; r += 1) {
          if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : ((h = createTag("div")).style.lineHeight = 0, (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
            var u,
                y = this.globalData.fontManager.getCharData(t.finalText[r], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
            if (u = y ? y.data : null, m.reset(), u && u.shapes && (f = u.shapes[0].it, m.scale(t.finalSize / 100, t.finalSize / 100), c = this.createPathShape(m, f), o.setAttribute("d", c)), this.isMasked) this.innerElem.appendChild(o);else {
              if (this.innerElem.appendChild(h), u && u.shapes) {
                document.body.appendChild(l);
                var g = l.getBBox();
                l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[r].yOffset = g.y - 1;
              } else l.setAttribute("width", 1), l.setAttribute("height", 1);

              h.appendChild(l);
            }
          } else o.textContent = p[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");

          this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1;
        }

        for (; d < this.textSpans.length;) {
          this.textSpans[d].style.display = "none", d += 1;
        }
      }, HTextElement.prototype.renderInnerContent = function () {
        if (this.data.singleShape) {
          if (!this._isFirstFrame && !this.lettersChangedFlag) return;
          this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)");
        }

        if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
          var t,
              e,
              r,
              i,
              s,
              a = 0,
              n = this.textAnimator.renderedLetters,
              o = this.textProperty.currentData.l;

          for (e = o.length, t = 0; t < e; t += 1) {
            o[t].n ? a += 1 : (i = this.textSpans[t], s = this.textPaths[t], r = n[a], a += 1, r._mdf.m && (this.isMasked ? i.setAttribute("transform", r.m) : i.style.transform = i.style.webkitTransform = r.m), i.style.opacity = r.o, r.sw && r._mdf.sw && s.setAttribute("stroke-width", r.sw), r.sc && r._mdf.sc && s.setAttribute("stroke", r.sc), r.fc && r._mdf.fc && (s.setAttribute("fill", r.fc), s.style.color = r.fc));
          }

          if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
            var h = this.innerElem.getBBox();
            this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
            this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
          }
        }
      }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData),
            e = new Image();
        this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
      }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
        var t,
            e,
            r = this.comp.threeDElements.length;

        for (t = 0; t < r; t += 1) {
          "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
        }
      }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
        var t,
            e,
            r = this._isFirstFrame;
        if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) {
          r = this.hierarchy[t].finalTransform.mProp._mdf || r;
        }

        if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
          if (this.mat.reset(), this.hierarchy) for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
            var i = this.hierarchy[t].finalTransform.mProp;
            this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
          }

          if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
            var s;
            s = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
            var a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
                n = [s[0] / a, s[1] / a, s[2] / a],
                o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
                h = Math.atan2(n[1], o),
                l = Math.atan2(n[0], -n[2]);
            this.mat.rotateY(l).rotateX(-h);
          }

          this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
          var p = !this._prevMat.equals(this.mat);

          if ((p || this.pe._mdf) && this.comp.threeDElements) {
            var f;

            for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) {
              "3d" === (f = this.comp.threeDElements[t]).type && (p && (f.container.style.transform = f.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (f.perspectiveElem.style.perspective = f.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
            }

            this.mat.clone(this._prevMat);
          }
        }

        this._isFirstFrame = !1;
      }, HCameraElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
        return null;
      }, HEffects.prototype.renderFrame = function () {};

      var animationManager = function () {
        var t = {},
            e = [],
            r = 0,
            i = 0,
            s = 0,
            a = !0,
            n = !1;

        function o(t) {
          for (var r = 0, s = t.target; r < i;) {
            e[r].animation === s && (e.splice(r, 1), r -= 1, i -= 1, s.isPaused || p()), r += 1;
          }
        }

        function h(t, r) {
          if (!t) return null;

          for (var s = 0; s < i;) {
            if (e[s].elem == t && null !== e[s].elem) return e[s].animation;
            s += 1;
          }

          var a = new AnimationItem();
          return f(a, t), a.setData(t, r), a;
        }

        function l() {
          s += 1, d();
        }

        function p() {
          s -= 1;
        }

        function f(t, r) {
          t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
            elem: r,
            animation: t
          }), i += 1;
        }

        function m(t) {
          var o,
              h = t - r;

          for (o = 0; o < i; o += 1) {
            e[o].animation.advanceTime(h);
          }

          r = t, s && !n ? window.requestAnimationFrame(m) : a = !0;
        }

        function c(t) {
          r = t, window.requestAnimationFrame(m);
        }

        function d() {
          !n && s && a && (window.requestAnimationFrame(c), a = !1);
        }

        return t.registerAnimation = h, t.loadAnimation = function (t) {
          var e = new AnimationItem();
          return f(e, null), e.setParams(t), e;
        }, t.setSpeed = function (t, r) {
          var s;

          for (s = 0; s < i; s += 1) {
            e[s].animation.setSpeed(t, r);
          }
        }, t.setDirection = function (t, r) {
          var s;

          for (s = 0; s < i; s += 1) {
            e[s].animation.setDirection(t, r);
          }
        }, t.play = function (t) {
          var r;

          for (r = 0; r < i; r += 1) {
            e[r].animation.play(t);
          }
        }, t.pause = function (t) {
          var r;

          for (r = 0; r < i; r += 1) {
            e[r].animation.pause(t);
          }
        }, t.stop = function (t) {
          var r;

          for (r = 0; r < i; r += 1) {
            e[r].animation.stop(t);
          }
        }, t.togglePause = function (t) {
          var r;

          for (r = 0; r < i; r += 1) {
            e[r].animation.togglePause(t);
          }
        }, t.searchAnimations = function (t, e, r) {
          var i,
              s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
              a = s.length;

          for (i = 0; i < a; i += 1) {
            r && s[i].setAttribute("data-bm-type", r), h(s[i], t);
          }

          if (e && 0 === a) {
            r || (r = "svg");
            var n = document.getElementsByTagName("body")[0];
            n.innerHTML = "";
            var o = createTag("div");
            o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), h(o, t);
          }
        }, t.resize = function () {
          var t;

          for (t = 0; t < i; t += 1) {
            e[t].animation.resize();
          }
        }, t.goToAndStop = function (t, r, s) {
          var a;

          for (a = 0; a < i; a += 1) {
            e[a].animation.goToAndStop(t, r, s);
          }
        }, t.destroy = function (t) {
          var r;

          for (r = i - 1; r >= 0; r -= 1) {
            e[r].animation.destroy(t);
          }
        }, t.freeze = function () {
          n = !0;
        }, t.unfreeze = function () {
          n = !1, d();
        }, t.getRegisteredAnimations = function () {
          var t,
              r = e.length,
              i = [];

          for (t = 0; t < r; t += 1) {
            i.push(e[t].animation);
          }

          return i;
        }, t;
      }(),
          AnimationItem = function AnimationItem() {
        this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader();
      };

      extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";

        switch (e) {
          case "canvas":
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;

          case "svg":
            this.renderer = new SVGRenderer(this, t.rendererSettings);
            break;

          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }

        this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this))), this.initialSegment = t.initialSegment;
      }, AnimationItem.prototype.setData = function (t, e) {
        var r = {
          wrapper: t,
          animationData: e ? "object" == _typeof(e) ? e : JSON.parse(e) : null
        },
            i = t.attributes;
        r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
        var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
        "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
        var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
        r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r);
      }, AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
        var e,
            r,
            i = this.animationData.layers,
            s = i.length,
            a = t.layers,
            n = a.length;

        for (r = 0; r < n; r += 1) {
          for (e = 0; e < s;) {
            if (i[e].id == a[r].id) {
              i[e] = a[r];
              break;
            }

            e += 1;
          }
        }

        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) {
          this.animationData.assets.push(t.assets[e]);
        }
        this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
      }, AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this));
      }, AnimationItem.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }, AnimationItem.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded();
      }, AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }, AnimationItem.prototype.configAnimation = function (t) {
        if (this.renderer) try {
          this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded();
        } catch (e) {
          this.triggerConfigError(e);
        }
      }, AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }, AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
          this.trigger("DOMLoaded");
        }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
      }, AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }, AnimationItem.prototype.setSubframe = function (t) {
        this.subframeEnabled = !!t;
      }, AnimationItem.prototype.gotoFrame = function () {
        this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
      }, AnimationItem.prototype.renderFrame = function () {
        if (!1 !== this.isLoaded) try {
          this.renderer.renderFrame(this.currentFrame + this.firstFrame);
        } catch (t) {
          this.triggerRenderFrameError(t);
        }
      }, AnimationItem.prototype.play = function (t) {
        t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")));
      }, AnimationItem.prototype.pause = function (t) {
        t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"));
      }, AnimationItem.prototype.togglePause = function (t) {
        t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause());
      }, AnimationItem.prototype.stop = function (t) {
        t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
      }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
        r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
      }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
        this.goToAndStop(t, e, r), this.play();
      }, AnimationItem.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
          var e = this.currentRawFrame + t * this.frameModifier,
              r = !1;
          e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
        }
      }, AnimationItem.prototype.adjustSegment = function (t, e) {
        this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
      }, AnimationItem.prototype.setSegment = function (t, e) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0);
      }, AnimationItem.prototype.playSegments = function (t, e) {
        if (e && (this.segments.length = 0), "object" == _typeof(t[0])) {
          var r,
              i = t.length;

          for (r = 0; r < i; r += 1) {
            this.segments.push(t[r]);
          }
        } else this.segments.push(t);

        this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }, AnimationItem.prototype.resetSegments = function (t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
      }, AnimationItem.prototype.checkSegments = function (t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
      }, AnimationItem.prototype.destroy = function (t) {
        t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
      }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        this.currentRawFrame = t, this.gotoFrame();
      }, AnimationItem.prototype.setSpeed = function (t) {
        this.playSpeed = t, this.updaFrameModifier();
      }, AnimationItem.prototype.setDirection = function (t) {
        this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
      }, AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
      }, AnimationItem.prototype.getPath = function () {
        return this.path;
      }, AnimationItem.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;else if (this.assetsPath) {
          var r = t.p;
          -1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r;
        } else e = this.path, e += t.u ? t.u : "", e += t.p;
        return e;
      }, AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, r = this.assets.length; e < r;) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }, AnimationItem.prototype.hide = function () {
        this.renderer.hide();
      }, AnimationItem.prototype.show = function () {
        this.renderer.show();
      }, AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }, AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t]) switch (t) {
          case "enterFrame":
            this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
            break;

          case "loopComplete":
            this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
            break;

          case "complete":
            this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
            break;

          case "segmentStart":
            this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
            break;

          case "destroy":
            this.triggerEvent(t, new BMDestroyEvent(t, this));
            break;

          default:
            this.triggerEvent(t);
        }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
      }, AnimationItem.prototype.triggerRenderFrameError = function (t) {
        var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      }, AnimationItem.prototype.triggerConfigError = function (t) {
        var e = new BMConfigErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      };

      var Expressions = function () {
        var t = {};
        return t.initExpressions = function (t) {
          var e = 0,
              r = [];
          t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
            e += 1;
          }, t.renderer.globalData.popExpression = function () {
            0 == (e -= 1) && function () {
              var t,
                  e = r.length;

              for (t = 0; t < e; t += 1) {
                r[t].release();
              }

              r.length = 0;
            }();
          }, t.renderer.globalData.registerExpressionProperty = function (t) {
            -1 === r.indexOf(t) && r.push(t);
          };
        }, t;
      }();

      expressionsPlugin = Expressions;

      var ExpressionManager = function () {
        var ob = {},
            Math = BMMath,
            window = null,
            document = null;

        function $bm_isInstanceOfArray(t) {
          return t.constructor === Array || t.constructor === Float32Array;
        }

        function isNumerable(t, e) {
          return "number" === t || "boolean" === t || "string" === t || e instanceof Number;
        }

        function $bm_neg(t) {
          var e = _typeof(t);

          if ("number" === e || "boolean" === e || t instanceof Number) return -t;

          if ($bm_isInstanceOfArray(t)) {
            var r,
                i = t.length,
                s = [];

            for (r = 0; r < i; r += 1) {
              s[r] = -t[r];
            }

            return s;
          }

          return t.propType ? t.v : void 0;
        }

        var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
            easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
            easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

        function sum(t, e) {
          var r = _typeof(t),
              i = _typeof(e);

          if ("string" === r || "string" === i) return t + e;
          if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;

          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
              ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
            }

            return o;
          }

          return 0;
        }

        var add = sum;

        function sub(t, e) {
          var r = _typeof(t),
              i = _typeof(e);

          if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;

          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
              ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
            }

            return o;
          }

          return 0;
        }

        function mul(t, e) {
          var r,
              i,
              s,
              a = _typeof(t),
              n = _typeof(e);

          if (isNumerable(a, t) && isNumerable(n, e)) return t * e;

          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
              r[i] = t[i] * e;
            }

            return r;
          }

          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
              r[i] = t * e[i];
            }

            return r;
          }

          return 0;
        }

        function div(t, e) {
          var r,
              i,
              s,
              a = _typeof(t),
              n = _typeof(e);

          if (isNumerable(a, t) && isNumerable(n, e)) return t / e;

          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
              r[i] = t[i] / e;
            }

            return r;
          }

          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
              r[i] = t / e[i];
            }

            return r;
          }

          return 0;
        }

        function mod(t, e) {
          return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e;
        }

        var $bm_sum = sum,
            $bm_sub = sub,
            $bm_mul = mul,
            $bm_div = div,
            $bm_mod = mod;

        function clamp(t, e, r) {
          if (e > r) {
            var i = r;
            r = e, e = i;
          }

          return Math.min(Math.max(t, e), r);
        }

        function radiansToDegrees(t) {
          return t / degToRads;
        }

        var radians_to_degrees = radiansToDegrees;

        function degreesToRadians(t) {
          return t * degToRads;
        }

        var degrees_to_radians = radiansToDegrees,
            helperLengthArray = [0, 0, 0, 0, 0, 0];

        function length(t, e) {
          if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
          e || (e = helperLengthArray);
          var r,
              i = Math.min(t.length, e.length),
              s = 0;

          for (r = 0; r < i; r += 1) {
            s += Math.pow(e[r] - t[r], 2);
          }

          return Math.sqrt(s);
        }

        function normalize(t) {
          return div(t, length(t));
        }

        function rgbToHsl(t) {
          var e,
              r,
              i = t[0],
              s = t[1],
              a = t[2],
              n = Math.max(i, s, a),
              o = Math.min(i, s, a),
              h = (n + o) / 2;
          if (n == o) e = r = 0;else {
            var l = n - o;

            switch (r = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
              case i:
                e = (s - a) / l + (s < a ? 6 : 0);
                break;

              case s:
                e = (a - i) / l + 2;
                break;

              case a:
                e = (i - s) / l + 4;
            }

            e /= 6;
          }
          return [e, r, h, t[3]];
        }

        function hue2rgb(t, e, r) {
          return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
        }

        function hslToRgb(t) {
          var e,
              r,
              i,
              s = t[0],
              a = t[1],
              n = t[2];
          if (0 === a) e = r = i = n;else {
            var o = n < .5 ? n * (1 + a) : n + a - n * a,
                h = 2 * n - o;
            e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3);
          }
          return [e, r, i, t[3]];
        }

        function linear(t, e, r, i, s) {
          if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
            var a = r;
            r = e, e = a;
          }

          if (t <= e) return i;
          if (t >= r) return s;
          var n = r === e ? 0 : (t - e) / (r - e);
          if (!i.length) return i + (s - i) * n;
          var o,
              h = i.length,
              l = createTypedArray("float32", h);

          for (o = 0; o < h; o += 1) {
            l[o] = i[o] + (s[o] - i[o]) * n;
          }

          return l;
        }

        function random(t, e) {
          if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
            var r,
                i = e.length;
            t || (t = createTypedArray("float32", i));
            var s = createTypedArray("float32", i),
                a = BMMath.random();

            for (r = 0; r < i; r += 1) {
              s[r] = t[r] + a * (e[r] - t[r]);
            }

            return s;
          }

          return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
        }

        function createPath(t, e, r, i) {
          var s,
              a = t.length,
              n = shape_pool.newElement();
          n.setPathData(!!i, a);
          var o,
              h,
              l = [0, 0];

          for (s = 0; s < a; s += 1) {
            o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
          }

          return n;
        }

        function initiateExpression(elem, data, property) {
          var val = data.x,
              needsVelocity = /velocity(?![\w\d])/.test(val),
              _needsRandom = -1 !== val.indexOf("random"),
              elemType = elem.data.ty,
              transform,
              $bm_transform,
              content,
              effect,
              thisProperty = property;

          thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
            get: function get() {
              return thisProperty.v;
            }
          }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
              outPoint = elem.data.op / elem.comp.globalData.frameRate,
              width = elem.data.sw ? elem.data.sw : 0,
              height = elem.data.sh ? elem.data.sh : 0,
              name = elem.data.nm,
              loopIn,
              loop_in,
              loopOut,
              loop_out,
              smooth,
              toWorld,
              fromWorld,
              fromComp,
              toComp,
              fromCompToSurface,
              position,
              rotation,
              anchorPoint,
              scale,
              thisLayer,
              thisComp,
              mask,
              valueAtTime,
              velocityAtTime,
              __expression_functions = [],
              scoped_bm_rt;

          if (data.xf) {
            var i,
                len = data.xf.length;

            for (i = 0; i < len; i += 1) {
              __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())");
            }
          }

          var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
              numKeys = property.kf ? data.k.length : 0,
              active = !this.data || !0 !== this.data.hd,
              wiggle = function (t, e) {
            var r,
                i,
                s = this.pv.length ? this.pv.length : 1,
                a = createTypedArray("float32", s);
            var n = Math.floor(5 * time);

            for (r = 0, i = 0; r < n;) {
              for (i = 0; i < s; i += 1) {
                a[i] += -e + 2 * e * BMMath.random();
              }

              r += 1;
            }

            var o = 5 * time,
                h = o - Math.floor(o),
                l = createTypedArray("float32", s);

            if (s > 1) {
              for (i = 0; i < s; i += 1) {
                l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
              }

              return l;
            }

            return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
          }.bind(this);

          function loopInDuration(t, e) {
            return loopIn(t, e, !0);
          }

          function loopOutDuration(t, e) {
            return loopOut(t, e, !0);
          }

          thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
              time,
              velocity,
              value,
              text,
              textIndex,
              textTotal,
              selectorValue;

          function lookAt(t, e) {
            var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
            return [-Math.atan2(r[1], r[2]) / degToRads, i, 0];
          }

          function easeOut(t, e, r, i, s) {
            return applyEase(easeOutBez, t, e, r, i, s);
          }

          function easeIn(t, e, r, i, s) {
            return applyEase(easeInBez, t, e, r, i, s);
          }

          function ease(t, e, r, i, s) {
            return applyEase(easeInOutBez, t, e, r, i, s);
          }

          function applyEase(t, e, r, i, s, a) {
            void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r);
            var n = t(e = e > 1 ? 1 : e < 0 ? 0 : e);

            if ($bm_isInstanceOfArray(s)) {
              var o,
                  h = s.length,
                  l = createTypedArray("float32", h);

              for (o = 0; o < h; o += 1) {
                l[o] = (a[o] - s[o]) * n + s[o];
              }

              return l;
            }

            return (a - s) * n + s;
          }

          function nearestKey(t) {
            var e,
                r,
                i,
                s = data.k.length;
            if (data.k.length && "number" != typeof data.k[0]) {
              if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;else {
                for (e = 0; e < s - 1; e += 1) {
                  if (t === data.k[e].t) {
                    r = e + 1, i = data.k[e].t;
                    break;
                  }

                  if (t > data.k[e].t && t < data.k[e + 1].t) {
                    t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, i = data.k[e + 1].t) : (r = e + 1, i = data.k[e].t);
                    break;
                  }
                }

                -1 === r && (r = e + 1, i = data.k[e].t);
              }
            } else r = 0, i = 0;
            var a = {};
            return a.index = r, a.time = i / elem.comp.globalData.frameRate, a;
          }

          function key(t) {
            var e, r, i;
            if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
            t -= 1, e = {
              time: data.k[t].t / elem.comp.globalData.frameRate,
              value: []
            };
            var s = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e;

            for (i = s.length, r = 0; r < i; r += 1) {
              e[r] = s[r], e.value[r] = s[r];
            }

            return e;
          }

          function framesToTime(t, e) {
            return e || (e = elem.comp.globalData.frameRate), t / e;
          }

          function timeToFrames(t, e) {
            return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
          }

          function seedRandom(t) {
            BMMath.seedrandom(randSeed + t);
          }

          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }

          function substring(t, e) {
            return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : "";
          }

          function substr(t, e) {
            return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : "";
          }

          function posterizeTime(t) {
            time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time);
          }

          var index = elem.data.ind,
              hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
              parent,
              randSeed = Math.floor(1e6 * Math.random()),
              globalData = elem.globalData;

          function executeExpression(t) {
            return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt);
          }

          return executeExpression;
        }

        return ob.initiateExpression = initiateExpression, ob;
      }(),
          expressionHelpers = function () {
        return {
          searchExpressions: function searchExpressions(t, e, r) {
            e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
          },
          getSpeedAtTime: function getSpeedAtTime(t) {
            var e = this.getValueAtTime(t),
                r = this.getValueAtTime(t + -.01),
                i = 0;

            if (e.length) {
              var s;

              for (s = 0; s < e.length; s += 1) {
                i += Math.pow(r[s] - e[s], 2);
              }

              i = 100 * Math.sqrt(i);
            } else i = 0;

            return i;
          },
          getVelocityAtTime: function getVelocityAtTime(t) {
            if (void 0 !== this.vel) return this.vel;
            var e,
                r,
                i = this.getValueAtTime(t),
                s = this.getValueAtTime(t + -.001);
            if (i.length) for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) {
              e[r] = (s[r] - i[r]) / -.001;
            } else e = (s - i) / -.001;
            return e;
          },
          getValueAtTime: function getValueAtTime(t) {
            return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value;
          },
          getStaticValueAtTime: function getStaticValueAtTime() {
            return this.pv;
          },
          setGroupProperty: function setGroupProperty(t) {
            this.propertyGroup = t;
          }
        };
      }();

      !function () {
        function t(t, e, r) {
          if (!this.k || !this.keyframes) return this.pv;
          t = t ? t.toLowerCase() : "";
          var i,
              s,
              a,
              n,
              o,
              h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[l.length - 1].t;
          if (h <= p) return this.pv;

          if (r ? s = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
            if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0);
          } else {
            if ("offset" === t) {
              var f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                  m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
                  d = Math.floor((h - s) / i);

              if (this.pv.length) {
                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) {
                  o[a] = (m[a] - f[a]) * d + c[a];
                }

                return o;
              }

              return (m - f) * d + c;
            }

            if ("continue" === t) {
              var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);

              if (this.pv.length) {
                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) {
                  o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                }

                return o;
              }

              return u + (h - p) / .001 * (u - y);
            }
          }

          return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0);
        }

        function e(t, e, r) {
          if (!this.k) return this.pv;
          t = t ? t.toLowerCase() : "";
          var i,
              s,
              a,
              n,
              o,
              h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[0].t;
          if (h >= p) return this.pv;

          if (r ? s = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
            if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0);
          } else {
            if ("offset" === t) {
              var f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                  d = Math.floor((p - h) / i) + 1;

              if (this.pv.length) {
                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) {
                  o[a] = c[a] - (m[a] - f[a]) * d;
                }

                return o;
              }

              return c - (m - f) * d;
            }

            if ("continue" === t) {
              var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);

              if (this.pv.length) {
                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) {
                  o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
                }

                return o;
              }

              return u + (u - y) * (p - h) / .001;
            }
          }

          return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0);
        }

        function r(t, e) {
          if (!this.k) return this.pv;
          if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
          var r,
              i,
              s = this.comp.renderedFrame / this.comp.globalData.frameRate,
              a = s - t,
              n = e > 1 ? (s + t - a) / (e - 1) : 1,
              o = 0,
              h = 0;

          for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
            if (i = this.getValueAtTime(a + o * n), this.pv.length) for (h = 0; h < this.pv.length; h += 1) {
              r[h] += i[h];
            } else r += i;
            o += 1;
          }

          if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) {
            r[h] /= e;
          } else r /= e;
          return r;
        }

        var i = TransformPropertyFactory.getTransformProperty;

        TransformPropertyFactory.getTransformProperty = function (t, e, r) {
          var s = i(t, e, r);
          return s.dynamicProperties.length ? s.getValueAtTime = function (t) {
            console.warn("Transform at time not supported");
          }.bind(s) : s.getValueAtTime = function (t) {}.bind(s), s.setGroupProperty = expressionHelpers.setGroupProperty, s;
        };

        var s = PropertyFactory.getProp;

        PropertyFactory.getProp = function (i, a, n, o, h) {
          var l = s(i, a, n, o, h);
          l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === a.a ? a.k.length : 0, l.propertyIndex = a.ix;
          var p = 0;
          return 0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)), l._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: p
          }, expressionHelpers.searchExpressions(i, a, l), l.k && h.addDynamicProperty(l), l;
        };

        var a = ShapePropertyFactory.getConstructorFunction(),
            n = ShapePropertyFactory.getKeyframedConstructorFunction();

        function o() {}

        o.prototype = {
          vertices: function vertices(t, e) {
            this.k && this.getValue();
            var r = this.v;
            void 0 !== e && (r = this.getValueAtTime(e, 0));
            var i,
                s = r._length,
                a = r[t],
                n = r.v,
                o = createSizedArray(s);

            for (i = 0; i < s; i += 1) {
              o[i] = "i" === t || "o" === t ? [a[i][0] - n[i][0], a[i][1] - n[i][1]] : [a[i][0], a[i][1]];
            }

            return o;
          },
          points: function points(t) {
            return this.vertices("v", t);
          },
          inTangents: function inTangents(t) {
            return this.vertices("i", t);
          },
          outTangents: function outTangents(t) {
            return this.vertices("o", t);
          },
          isClosed: function isClosed() {
            return this.v.c;
          },
          pointOnPath: function pointOnPath(t, e) {
            var r = this.v;
            void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));

            for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
              if (l + a[o].addedLength > n) {
                var p = o,
                    f = r.c && o === h - 1 ? 0 : o + 1,
                    m = (n - l) / a[o].addedLength;
                i = bez.getPointInSegment(r.v[p], r.v[f], r.o[p], r.i[f], m, a[o]);
                break;
              }

              l += a[o].addedLength, o += 1;
            }

            return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i;
          },
          vectorOnPath: function vectorOnPath(t, e, r) {
            t = 1 == t ? this.v.c ? 0 : .999 : t;
            var i = this.pointOnPath(t, e),
                s = this.pointOnPath(t + .001, e),
                a = s[0] - i[0],
                n = s[1] - i[1],
                o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
            return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o];
          },
          tangentOnPath: function tangentOnPath(t, e) {
            return this.vectorOnPath(t, e, "tangent");
          },
          normalOnPath: function normalOnPath(t, e) {
            return this.vectorOnPath(t, e, "normal");
          },
          setGroupProperty: expressionHelpers.setGroupProperty,
          getValueAtTime: expressionHelpers.getStaticValueAtTime
        }, extendPrototype([o], a), extendPrototype([o], n), n.prototype.getValueAtTime = function (t) {
          return this._cachingAtTime || (this._cachingAtTime = {
            shapeValue: shape_pool.clone(this.pv),
            lastIndex: 0,
            lastTime: initialDefaultFrame
          }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
        }, n.prototype.initiateExpression = ExpressionManager.initiateExpression;
        var h = ShapePropertyFactory.getShapeProp;

        ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
          var a = h(t, e, r, i, s);
          return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
        };
      }(), function () {
        TextProperty.prototype.getExpressionValue = function (t, e) {
          var r = this.calculateExpression(e);

          if (t.t !== r) {
            var i = {};
            return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i;
          }

          return t;
        }, TextProperty.prototype.searchProperty = function () {
          var t = this.searchKeyframes(),
              e = this.searchExpressions();
          return this.kf = t || e, this.kf;
        }, TextProperty.prototype.searchExpressions = function () {
          if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0;
        };
      }();

      var ShapeExpressionInterface = function () {
        function t(t, f, m) {
          var c,
              d = [],
              u = t ? t.length : 0;

          for (c = 0; c < u; c += 1) {
            "gr" == t[c].ty ? d.push(e(t[c], f[c], m)) : "fl" == t[c].ty ? d.push(r(t[c], f[c], m)) : "st" == t[c].ty ? d.push(i(t[c], f[c], m)) : "tm" == t[c].ty ? d.push(s(t[c], f[c], m)) : "tr" == t[c].ty || ("el" == t[c].ty ? d.push(a(t[c], f[c], m)) : "sr" == t[c].ty ? d.push(n(t[c], f[c], m)) : "sh" == t[c].ty ? d.push(p(t[c], f[c], m)) : "rc" == t[c].ty ? d.push(o(t[c], f[c], m)) : "rd" == t[c].ty ? d.push(h(t[c], f[c], m)) : "rp" == t[c].ty && d.push(l(t[c], f[c], m)));
          }

          return d;
        }

        function e(e, r, i) {
          var s = function s(t) {
            switch (t) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return s.content;

              default:
                return s.transform;
            }
          };

          s.propertyGroup = function (t) {
            return 1 === t ? s : i(t - 1);
          };

          var a = function (e, r, i) {
            var s,
                a = function a(t) {
              for (var e = 0, r = s.length; e < r;) {
                if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                e += 1;
              }

              if ("number" == typeof t) return s[t - 1];
            };

            return a.propertyGroup = function (t) {
              return 1 === t ? a : i(t - 1);
            }, s = t(e.it, r.it, a.propertyGroup), a.numProperties = s.length, a.propertyIndex = e.cix, a._name = e.nm, a;
          }(e, r, s.propertyGroup),
              n = function (t, e, r) {
            function i(t) {
              return 1 == t ? s : r(--t);
            }

            e.transform.mProps.o.setGroupProperty(i), e.transform.mProps.p.setGroupProperty(i), e.transform.mProps.a.setGroupProperty(i), e.transform.mProps.s.setGroupProperty(i), e.transform.mProps.r.setGroupProperty(i), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i));

            function s(e) {
              return t.a.ix === e || "Anchor Point" === e ? s.anchorPoint : t.o.ix === e || "Opacity" === e ? s.opacity : t.p.ix === e || "Position" === e ? s.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? s.rotation : t.s.ix === e || "Scale" === e ? s.scale : t.sk && t.sk.ix === e || "Skew" === e ? s.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? s.skewAxis : void 0;
            }

            return e.transform.op.setGroupProperty(i), Object.defineProperties(s, {
              opacity: {
                get: ExpressionPropertyInterface(e.transform.mProps.o)
              },
              position: {
                get: ExpressionPropertyInterface(e.transform.mProps.p)
              },
              anchorPoint: {
                get: ExpressionPropertyInterface(e.transform.mProps.a)
              },
              scale: {
                get: ExpressionPropertyInterface(e.transform.mProps.s)
              },
              rotation: {
                get: ExpressionPropertyInterface(e.transform.mProps.r)
              },
              skew: {
                get: ExpressionPropertyInterface(e.transform.mProps.sk)
              },
              skewAxis: {
                get: ExpressionPropertyInterface(e.transform.mProps.sa)
              },
              _name: {
                value: t.nm
              }
            }), s.ty = "tr", s.mn = t.mn, s.propertyGroup = r, s;
          }(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);

          return s.content = a, s.transform = n, Object.defineProperty(s, "_name", {
            get: function get() {
              return e.nm;
            }
          }), s.numProperties = e.np, s.propertyIndex = e.ix, s.nm = e.nm, s.mn = e.mn, s;
        }

        function r(t, e, r) {
          function i(t) {
            return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0;
          }

          return Object.defineProperties(i, {
            color: {
              get: ExpressionPropertyInterface(e.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(e.o)
            },
            _name: {
              value: t.nm
            },
            mn: {
              value: t.mn
            }
          }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i;
        }

        function i(t, e, r) {
          function i(t) {
            return 1 === t ? ob : r(t - 1);
          }

          function s(t) {
            return 1 === t ? h : i(t - 1);
          }

          function a(r) {
            Object.defineProperty(h, t.d[r].nm, {
              get: ExpressionPropertyInterface(e.d.dataProps[r].p)
            });
          }

          var n,
              o = t.d ? t.d.length : 0,
              h = {};

          for (n = 0; n < o; n += 1) {
            a(n), e.d.dataProps[n].p.setGroupProperty(s);
          }

          function l(t) {
            return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0;
          }

          return Object.defineProperties(l, {
            color: {
              get: ExpressionPropertyInterface(e.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(e.o)
            },
            strokeWidth: {
              get: ExpressionPropertyInterface(e.w)
            },
            dash: {
              get: function get() {
                return h;
              }
            },
            _name: {
              value: t.nm
            },
            mn: {
              value: t.mn
            }
          }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l;
        }

        function s(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }

          function s(e) {
            return e === t.e.ix || "End" === e || "end" === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0;
          }

          return s.propertyIndex = t.ix, e.s.setGroupProperty(i), e.e.setGroupProperty(i), e.o.setGroupProperty(i), s.propertyIndex = t.ix, s.propertyGroup = r, Object.defineProperties(s, {
            start: {
              get: ExpressionPropertyInterface(e.s)
            },
            end: {
              get: ExpressionPropertyInterface(e.e)
            },
            offset: {
              get: ExpressionPropertyInterface(e.o)
            },
            _name: {
              value: t.nm
            }
          }), s.mn = t.mn, s;
        }

        function a(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          a.propertyIndex = t.ix;
          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0;
          }

          return s.s.setGroupProperty(i), s.p.setGroupProperty(i), Object.defineProperties(a, {
            size: {
              get: ExpressionPropertyInterface(s.s)
            },
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function n(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.r.ix === e ? a.rotation : t.pt.ix === e ? a.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? a.outerRadius : t.os.ix === e ? a.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? a.innerRoundness : void 0 : a.innerRadius;
          }

          return a.propertyIndex = t.ix, s.or.setGroupProperty(i), s.os.setGroupProperty(i), s.pt.setGroupProperty(i), s.p.setGroupProperty(i), s.r.setGroupProperty(i), t.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)), Object.defineProperties(a, {
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            rotation: {
              get: ExpressionPropertyInterface(s.r)
            },
            points: {
              get: ExpressionPropertyInterface(s.pt)
            },
            outerRadius: {
              get: ExpressionPropertyInterface(s.or)
            },
            outerRoundness: {
              get: ExpressionPropertyInterface(s.os)
            },
            innerRadius: {
              get: ExpressionPropertyInterface(s.ir)
            },
            innerRoundness: {
              get: ExpressionPropertyInterface(s.is)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function o(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0;
          }

          return a.propertyIndex = t.ix, s.p.setGroupProperty(i), s.s.setGroupProperty(i), s.r.setGroupProperty(i), Object.defineProperties(a, {
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            roundness: {
              get: ExpressionPropertyInterface(s.r)
            },
            size: {
              get: ExpressionPropertyInterface(s.s)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function h(t, e, r) {
          var i = e;

          function s(e) {
            if (t.r.ix === e || "Round Corners 1" === e) return s.radius;
          }

          return s.propertyIndex = t.ix, i.rd.setGroupProperty(function (t) {
            return 1 == t ? s : r(--t);
          }), Object.defineProperties(s, {
            radius: {
              get: ExpressionPropertyInterface(i.rd)
            },
            _name: {
              value: t.nm
            }
          }), s.mn = t.mn, s;
        }

        function l(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = e;

          function a(e) {
            return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0;
          }

          return a.propertyIndex = t.ix, s.c.setGroupProperty(i), s.o.setGroupProperty(i), Object.defineProperties(a, {
            copies: {
              get: ExpressionPropertyInterface(s.c)
            },
            offset: {
              get: ExpressionPropertyInterface(s.o)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function p(t, e, r) {
          var i = e.sh;

          function s(t) {
            if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path;
          }

          return i.setGroupProperty(function (t) {
            return 1 == t ? s : r(--t);
          }), Object.defineProperties(s, {
            path: {
              get: function get() {
                return i.k && i.getValue(), i;
              }
            },
            shape: {
              get: function get() {
                return i.k && i.getValue(), i;
              }
            },
            _name: {
              value: t.nm
            },
            ix: {
              value: t.ix
            },
            propertyIndex: {
              value: t.ix
            },
            mn: {
              value: t.mn
            }
          }), s;
        }

        return function (e, r, i) {
          var s;

          function a(t) {
            if ("number" == typeof t) return s[t - 1];

            for (var e = 0, r = s.length; e < r;) {
              if (s[e]._name === t) return s[e];
              e += 1;
            }
          }

          return a.propertyGroup = i, s = t(e, r, a), a.numProperties = s.length, a;
        };
      }(),
          TextExpressionInterface = function TextExpressionInterface(t) {
        var e;

        function r() {}

        return Object.defineProperty(r, "sourceText", {
          get: function get() {
            t.textProperty.getValue();
            var r = t.textProperty.currentData.t;
            return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e;
          }
        }), r;
      },
          LayerExpressionInterface = function () {
        function t(t, e) {
          var r = new Matrix();

          if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
            var i,
                s = this._elem.hierarchy.length;

            for (i = 0; i < s; i += 1) {
              this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
            }

            return r.applyToPointArray(t[0], t[1], t[2] || 0);
          }

          return r.applyToPointArray(t[0], t[1], t[2] || 0);
        }

        function e(t, e) {
          var r = new Matrix();

          if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
            var i,
                s = this._elem.hierarchy.length;

            for (i = 0; i < s; i += 1) {
              this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
            }

            return r.inversePoint(t);
          }

          return r.inversePoint(t);
        }

        function r(t) {
          var e = new Matrix();

          if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
            var r,
                i = this._elem.hierarchy.length;

            for (r = 0; r < i; r += 1) {
              this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
            }

            return e.inversePoint(t);
          }

          return e.inversePoint(t);
        }

        function i() {
          return [1, 1, 1, 1];
        }

        return function (s) {
          var a;

          function n(t) {
            switch (t) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return n.shapeInterface;

              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return a;

              case 4:
              case "ADBE Effect Parade":
              case "effects":
              case "Effects":
                return n.effect;
            }
          }

          n.toWorld = t, n.fromWorld = e, n.toComp = t, n.fromComp = r, n.sampleImage = i, n.sourceRectAtTime = s.sourceRectAtTime.bind(s), n._elem = s;
          var o = getDescriptor(a = TransformExpressionInterface(s.finalTransform.mProp), "anchorPoint");
          return Object.defineProperties(n, {
            hasParent: {
              get: function get() {
                return s.hierarchy.length;
              }
            },
            parent: {
              get: function get() {
                return s.hierarchy[0].layerInterface;
              }
            },
            rotation: getDescriptor(a, "rotation"),
            scale: getDescriptor(a, "scale"),
            position: getDescriptor(a, "position"),
            opacity: getDescriptor(a, "opacity"),
            anchorPoint: o,
            anchor_point: o,
            transform: {
              get: function get() {
                return a;
              }
            },
            active: {
              get: function get() {
                return s.isInRange;
              }
            }
          }), n.startTime = s.data.st, n.index = s.data.ind, n.source = s.data.refId, n.height = 0 === s.data.ty ? s.data.h : 100, n.width = 0 === s.data.ty ? s.data.w : 100, n.inPoint = s.data.ip / s.comp.globalData.frameRate, n.outPoint = s.data.op / s.comp.globalData.frameRate, n._name = s.data.nm, n.registerMaskInterface = function (t) {
            n.mask = new MaskManagerInterface(t, s);
          }, n.registerEffectsInterface = function (t) {
            n.effect = t;
          }, n;
        };
      }(),
          CompExpressionInterface = function CompExpressionInterface(t) {
        function e(e) {
          for (var r = 0, i = t.layers.length; r < i;) {
            if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
            r += 1;
          }

          return null;
        }

        return Object.defineProperty(e, "_name", {
          value: t.data.nm
        }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e;
      },
          TransformExpressionInterface = function TransformExpressionInterface(t) {
        function e(t) {
          switch (t) {
            case "scale":
            case "Scale":
            case "ADBE Scale":
            case 6:
              return e.scale;

            case "rotation":
            case "Rotation":
            case "ADBE Rotation":
            case "ADBE Rotate Z":
            case 10:
              return e.rotation;

            case "ADBE Rotate X":
              return e.xRotation;

            case "ADBE Rotate Y":
              return e.yRotation;

            case "position":
            case "Position":
            case "ADBE Position":
            case 2:
              return e.position;

            case "ADBE Position_0":
              return e.xPosition;

            case "ADBE Position_1":
              return e.yPosition;

            case "ADBE Position_2":
              return e.zPosition;

            case "anchorPoint":
            case "AnchorPoint":
            case "Anchor Point":
            case "ADBE AnchorPoint":
            case 1:
              return e.anchorPoint;

            case "opacity":
            case "Opacity":
            case 11:
              return e.opacity;
          }
        }

        if (Object.defineProperty(e, "rotation", {
          get: ExpressionPropertyInterface(t.r || t.rz)
        }), Object.defineProperty(e, "zRotation", {
          get: ExpressionPropertyInterface(t.rz || t.r)
        }), Object.defineProperty(e, "xRotation", {
          get: ExpressionPropertyInterface(t.rx)
        }), Object.defineProperty(e, "yRotation", {
          get: ExpressionPropertyInterface(t.ry)
        }), Object.defineProperty(e, "scale", {
          get: ExpressionPropertyInterface(t.s)
        }), t.p) var r = ExpressionPropertyInterface(t.p);
        return Object.defineProperty(e, "position", {
          get: function get() {
            return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
          }
        }), Object.defineProperty(e, "xPosition", {
          get: ExpressionPropertyInterface(t.px)
        }), Object.defineProperty(e, "yPosition", {
          get: ExpressionPropertyInterface(t.py)
        }), Object.defineProperty(e, "zPosition", {
          get: ExpressionPropertyInterface(t.pz)
        }), Object.defineProperty(e, "anchorPoint", {
          get: ExpressionPropertyInterface(t.a)
        }), Object.defineProperty(e, "opacity", {
          get: ExpressionPropertyInterface(t.o)
        }), Object.defineProperty(e, "skew", {
          get: ExpressionPropertyInterface(t.sk)
        }), Object.defineProperty(e, "skewAxis", {
          get: ExpressionPropertyInterface(t.sa)
        }), Object.defineProperty(e, "orientation", {
          get: ExpressionPropertyInterface(t.or)
        }), e;
      },
          ProjectInterface = function () {
        function t(t) {
          this.compositions.push(t);
        }

        return function () {
          function e(t) {
            for (var e = 0, r = this.compositions.length; e < r;) {
              if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
              e += 1;
            }
          }

          return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e;
        };
      }(),
          EffectsExpressionInterface = function () {
        function t(r, i, s, a) {
          var n,
              o = [],
              h = r.ef.length;

          for (n = 0; n < h; n += 1) {
            5 === r.ef[n].ty ? o.push(t(r.ef[n], i.effectElements[n], i.effectElements[n].propertyGroup, a)) : o.push(e(i.effectElements[n], r.ef[n].ty, a, l));
          }

          function l(t) {
            return 1 === t ? p : s(t - 1);
          }

          var p = function p(t) {
            for (var e = r.ef, i = 0, s = e.length; i < s;) {
              if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? o[i] : o[i]();
              i += 1;
            }

            return o[0]();
          };

          return p.propertyGroup = l, "ADBE Color Control" === r.mn && Object.defineProperty(p, "color", {
            get: function get() {
              return o[0]();
            }
          }), Object.defineProperty(p, "numProperties", {
            get: function get() {
              return r.np;
            }
          }), p.active = p.enabled = 0 !== r.en, p;
        }

        function e(t, e, r, i) {
          var s = ExpressionPropertyInterface(t.p);
          return t.p.setGroupProperty && t.p.setGroupProperty(i), function () {
            return 10 === e ? r.comp.compInterface(t.p.v) : s();
          };
        }

        return {
          createEffectsInterface: function createEffectsInterface(e, r) {
            if (e.effectsManager) {
              var i,
                  s = [],
                  a = e.data.ef,
                  n = e.effectsManager.effectElements.length;

              for (i = 0; i < n; i += 1) {
                s.push(t(a[i], e.effectsManager.effectElements[i], r, e));
              }

              return function (t) {
                for (var r = e.data.ef || [], i = 0, a = r.length; i < a;) {
                  if (t === r[i].nm || t === r[i].mn || t === r[i].ix) return s[i];
                  i += 1;
                }
              };
            }
          }
        };
      }(),
          MaskManagerInterface = function () {
        function t(t, e) {
          this._mask = t, this._data = e;
        }

        Object.defineProperty(t.prototype, "maskPath", {
          get: function get() {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          }
        }), Object.defineProperty(t.prototype, "maskOpacity", {
          get: function get() {
            return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
          }
        });
        return function (e, r) {
          var i,
              s = createSizedArray(e.viewData.length),
              a = e.viewData.length;

          for (i = 0; i < a; i += 1) {
            s[i] = new t(e.viewData[i], e.masksProperties[i]);
          }

          return function (t) {
            for (i = 0; i < a;) {
              if (e.masksProperties[i].nm === t) return s[i];
              i += 1;
            }
          };
        };
      }(),
          ExpressionPropertyInterface = function () {
        var t = {
          pv: 0,
          v: 0,
          mult: 1
        },
            e = {
          pv: [0, 0, 0],
          v: [0, 0, 0],
          mult: 1
        };

        function r(t, e, r) {
          Object.defineProperty(t, "velocity", {
            get: function get() {
              return e.getVelocityAtTime(e.comp.currentFrame);
            }
          }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (i) {
            if (t.numKeys) {
              var s = "";
              s = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
              var a = "unidimensional" === r ? new Number(s) : Object.assign({}, s);
              return a.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, a;
            }

            return 0;
          }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup;
        }

        function i() {
          return t;
        }

        return function (s) {
          return s ? "unidimensional" === s.propType ? function (e) {
            e && "pv" in e || (e = t);
            var i = 1 / e.mult,
                s = e.pv * i,
                a = new Number(s);
            return a.value = s, r(a, e, "unidimensional"), function () {
              return e.k && e.getValue(), s = e.v * i, a.value !== s && ((a = new Number(s)).value = s, r(a, e, "unidimensional")), a;
            };
          }(s) : function (t) {
            t && "pv" in t || (t = e);
            var i = 1 / t.mult,
                s = t.pv.length,
                a = createTypedArray("float32", s),
                n = createTypedArray("float32", s);
            return a.value = n, r(a, t, "multidimensional"), function () {
              t.k && t.getValue();

              for (var e = 0; e < s; e += 1) {
                a[e] = n[e] = t.v[e] * i;
              }

              return a;
            };
          }(s) : i;
        };
      }(),
          TextExpressionSelectorProp,
          propertyGetTextProp;

      function SliderEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function AngleEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function ColorEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }

      function PointEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }

      function LayerIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function MaskIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function CheckboxEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function NoValueEffect() {
        this.p = {};
      }

      function EffectsManager() {}

      function EffectsManager(t, e) {
        var r = t.ef || [];
        this.effectElements = [];
        var i,
            s,
            a = r.length;

        for (i = 0; i < a; i++) {
          s = new GroupEffect(r[i], e), this.effectElements.push(s);
        }
      }

      function GroupEffect(t, e) {
        this.init(t, e);
      }

      TextExpressionSelectorProp = function () {
        function t(t, e) {
          return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v;
        }

        return function (e, r) {
          this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty;
        };
      }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function (t, e, r) {
        return 1 === e.t ? new TextExpressionSelectorProp(t, e, r) : propertyGetTextProp(t, e, r);
      }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
        this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
        var r,
            i,
            s = this.data.ef.length,
            a = this.data.ef;

        for (r = 0; r < s; r += 1) {
          switch (i = null, a[r].ty) {
            case 0:
              i = new SliderEffect(a[r], e, this);
              break;

            case 1:
              i = new AngleEffect(a[r], e, this);
              break;

            case 2:
              i = new ColorEffect(a[r], e, this);
              break;

            case 3:
              i = new PointEffect(a[r], e, this);
              break;

            case 4:
            case 7:
              i = new CheckboxEffect(a[r], e, this);
              break;

            case 10:
              i = new LayerIndexEffect(a[r], e, this);
              break;

            case 11:
              i = new MaskIndexEffect(a[r], e, this);
              break;

            case 5:
              i = new EffectsManager(a[r], e, this);
              break;

            default:
              i = new NoValueEffect(a[r], e, this);
          }

          i && this.effectElements.push(i);
        }
      };

      var lottie = {},
          _isFrozen = !1;

      function setLocationHref(t) {
        locationHref = t;
      }

      function searchAnimations() {
        !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
      }

      function setSubframeRendering(t) {
        subframeEnabled = t;
      }

      function loadAnimation(t) {
        return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
      }

      function setQuality(t) {
        if ("string" == typeof t) switch (t) {
          case "high":
            defaultCurveSegments = 200;
            break;

          case "medium":
            defaultCurveSegments = 50;
            break;

          case "low":
            defaultCurveSegments = 10;
        } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
        roundValues(!(defaultCurveSegments >= 50));
      }

      function inBrowser() {
        return "undefined" != typeof navigator;
      }

      function installPlugin(t, e) {
        "expressions" === t && (expressionsPlugin = e);
      }

      function getFactory(t) {
        switch (t) {
          case "propertyFactory":
            return PropertyFactory;

          case "shapePropertyFactory":
            return ShapePropertyFactory;

          case "matrix":
            return Matrix;
        }
      }

      function checkReady() {
        "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
      }

      function getQueryVariable(t) {
        for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
          var i = e[r].split("=");
          if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
        }
      }

      lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.__getFactory = getFactory, lottie.version = "5.6.6";
      var standalone = "__[STANDALONE]__",
          animationData = "__[ANIMATIONDATA]__",
          renderer = "";

      if (standalone) {
        var scripts = document.getElementsByTagName("script"),
            index = scripts.length - 1,
            myScript = scripts[index] || {
          src: ""
        },
            queryString = myScript.src.replace(/^[^\?]+\??/, "");
        renderer = getQueryVariable("renderer");
      }

      var readyStateCheckInterval = setInterval(checkReady, 100);
      return lottie;
    });
  }, {}],
  "jFKs": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var n = require("lit-element");

    function e() {
      var n = r(["\n* {\n  box-sizing: border-box;\n}\n\n:host {\n  --lottie-player-toolbar-height: 35px;\n  --lottie-player-toolbar-background-color: transparent;\n  --lottie-player-toolbar-icon-color: #999;\n  --lottie-player-toolbar-icon-hover-color: #222;\n  --lottie-player-toolbar-icon-active-color: #555;\n  --lottie-player-seeker-track-color: #CCC;\n  --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);\n\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.main {\n  box-sizing: border-box;\n  display: inline-grid;\n  grid-auto-columns: auto;\n  grid-template-rows: auto;\n  position: relative;\n  height: inherit;\n  width: inherit;\n}\n\n.main.controls {\n  grid-template-rows: 1fr var(--lottie-player-toolbar-height);\n}\n\n.animation {\n  overflow: hidden;\n  height: calc(1fr - var(--lottie-player-toolbar-height));\n}\n\n.toolbar {\n  display: grid;\n  grid-template-columns: 32px 32px 1fr 32px;\n  align-items: center;\n  justify-items: center;\n  background-color: var(--lottie-player-toolbar-background-color);\n  margin: 0 5px;\n}\n\n.toolbar button {\n  cursor: pointer;\n  fill: var(--lottie-player-toolbar-icon-color);\n  display: flex;\n  background: none;\n  border: 0;\n  padding: 0;\n  outline: none;\n  height: 100%;\n}\n\n.toolbar button:hover {\n  fill: var(--lottie-player-toolbar-icon-hover-color);\n}\n\n.toolbar button.active {\n  fill: var(--lottie-player-toolbar-icon-active-color);\n}\n\n.toolbar button svg {\n}\n\n.toolbar button.disabled svg {\n  display: none;\n}\n\n.seeker {\n  -webkit-appearance: none;\n  width: 95%;\n  outline: none;\n}\n\n.seeker::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-webkit-slider-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -5px;\n}\n.seeker:focus::-webkit-slider-runnable-track {\n  background: #999;\n}\n.seeker::-moz-range-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-moz-range-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker::-ms-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n.seeker::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-thumb {\n  border: 0;\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker:focus::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n}\n.seeker:focus::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n}\n\n.error {\n  display: flex;\n  justify-content: center;\n  height: 100%;\n  align-items: center;\n}\n"]);
      return e = function e() {
        return n;
      }, n;
    }

    function r(n, e) {
      return e || (e = n.slice(0)), Object.freeze(Object.defineProperties(n, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    var o = (0, n.css)(e());
    exports.default = o;
  }, {
    "lit-element": "bhxD"
  }],
  "M8c7": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.parseSrc = g, exports.LottiePlayer = exports.PlayerEvents = exports.PlayMode = exports.PlayerState = void 0;

    var t = require("lit-element"),
        e = n(require("lottie-web/build/player/lottie")),
        i = o(require("./lottie-player.styles"));

    function o(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    function r() {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap();
      return r = function r() {
        return t;
      }, t;
    }

    function n(t) {
      if (t && t.__esModule) return t;
      if (null === t || "object" != _typeof(t) && "function" != typeof t) return {
        default: t
      };
      var e = r();
      if (e && e.has(t)) return e.get(t);
      var i = {},
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;

      for (var n in t) {
        if (Object.prototype.hasOwnProperty.call(t, n)) {
          var s = o ? Object.getOwnPropertyDescriptor(t, n) : null;
          s && (s.get || s.set) ? Object.defineProperty(i, n, s) : i[n] = t[n];
        }
      }

      return i.default = t, e && e.set(t, i), i;
    }

    function s() {
      var t = c(['<div class="error">⚠️</div>']);
      return s = function s() {
        return t;
      }, t;
    }

    function a() {
      var t = c(["\n      <div class=", '>\n        <div class="animation" style=', ">\n          ", "\n        </div>\n        ", "\n      </div>"]);
      return a = function a() {
        return t;
      }, t;
    }

    function h() {
      var t = c(['<svg width="24" height="24"><path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z"/></svg>']);
      return h = function h() {
        return t;
      }, t;
    }

    function p() {
      var t = c(['<svg width="24" height="24"><path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"/></svg>']);
      return p = function p() {
        return t;
      }, t;
    }

    function l() {
      var t = c(['\n      <div class="toolbar">\n        <button @click=', " class=", ">\n          ", "\n        </button>\n        <button @click=", " class=", '>\n          <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>\n        </button>\n        <input class="seeker" type="range" min="0" step="1" max="100" .value=', "\n          @input=", "\n          @mousedown=", "\n          @mouseup=", "\n        />\n        <button @click=", " class=", '>\n          <svg width="24" height="24">\n            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"/>\n          </svg>\n        </button>\n      </div>\n    ']);
      return l = function l() {
        return t;
      }, t;
    }

    function c(t, e) {
      return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    var u,
        d,
        v,
        y = function y(t, e, i, o) {
      var r,
          n = arguments.length,
          s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
      if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o);else for (var a = t.length - 1; a >= 0; a--) {
        (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s);
      }
      return n > 3 && s && Object.defineProperty(e, i, s), s;
    };

    function g(t) {
      if ("object" == _typeof(t)) return t;

      try {
        return JSON.parse(t);
      } catch (e) {
        return new URL(t, window.location.href).toString();
      }
    }

    exports.PlayerState = u, function (t) {
      t.Loading = "loading", t.Playing = "playing", t.Paused = "paused", t.Stopped = "stopped", t.Frozen = "frozen", t.Error = "error";
    }(u || (exports.PlayerState = u = {})), exports.PlayMode = d, function (t) {
      t.Normal = "normal", t.Bounce = "bounce";
    }(d || (exports.PlayMode = d = {})), exports.PlayerEvents = v, function (t) {
      t.Load = "load", t.Error = "error", t.Ready = "ready", t.Play = "play", t.Pause = "pause", t.Stop = "stop", t.Freeze = "freeze", t.Loop = "loop", t.Complete = "complete", t.Frame = "frame";
    }(v || (exports.PlayerEvents = v = {}));

    var m = /*#__PURE__*/function (_t$LitElement) {
      _inherits(m, _t$LitElement);

      var _super6 = _createSuper(m);

      function m() {
        var _this11;

        _classCallCheck(this, m);

        _this11 = _super6.apply(this, arguments), _this11.mode = d.Normal, _this11.autoplay = !1, _this11.background = "transparent", _this11.controls = !1, _this11.direction = 1, _this11.hover = !1, _this11.loop = !1, _this11.preserveAspectRatio = "xMidYMid meet", _this11.renderer = "svg", _this11.speed = 1, _this11.currentState = u.Loading, _this11.intermission = 1, _this11._io = void 0, _this11._counter = 0;
        return _this11;
      }

      _createClass(m, [{
        key: "_onVisibilityChange",
        value: function _onVisibilityChange() {
          !0 === document.hidden && this.currentState === u.Playing ? this.freeze() : this.currentState === u.Frozen && this.play();
        }
      }, {
        key: "_handleSeekChange",
        value: function _handleSeekChange(t) {
          if (!this._lottie || isNaN(t.target.value)) return;
          var e = t.target.value / 100 * this._lottie.totalFrames;
          this.seek(e);
        }
      }, {
        key: "load",
        value: function load(t) {
          var _this12 = this;

          if (!this.shadowRoot) return;
          var i = {
            container: this.container,
            loop: !1,
            autoplay: !1,
            renderer: this.renderer,
            rendererSettings: {
              preserveAspectRatio: this.preserveAspectRatio,
              clearCanvas: !1,
              progressiveLoad: !0,
              hideOnTransparent: !0
            }
          };

          try {
            var _r10 = g(t),
                _n5 = "string" == typeof _r10 ? "path" : "animationData";

            this._lottie && this._lottie.destroy(), this._lottie = e.loadAnimation(Object.assign(Object.assign({}, i), _defineProperty({}, _n5, _r10)));
          } catch (o) {
            return this.currentState = u.Error, void this.dispatchEvent(new CustomEvent(v.Error));
          }

          this._lottie && (this._lottie.addEventListener("enterFrame", function () {
            _this12.seeker = _this12._lottie.currentFrame / _this12._lottie.totalFrames * 100, _this12.dispatchEvent(new CustomEvent(v.Frame, {
              detail: {
                frame: _this12._lottie.currentFrame,
                seeker: _this12.seeker
              }
            }));
          }), this._lottie.addEventListener("complete", function () {
            _this12.currentState === u.Playing ? !_this12.loop || _this12.count && _this12._counter >= _this12.count ? _this12.dispatchEvent(new CustomEvent(v.Complete)) : _this12.mode === d.Bounce ? (_this12.count && (_this12._counter += .5), setTimeout(function () {
              _this12.dispatchEvent(new CustomEvent(v.Loop)), _this12.currentState === u.Playing && (_this12._lottie.setDirection(-1 * _this12._lottie.playDirection), _this12._lottie.play());
            }, _this12.intermission)) : (_this12.count && (_this12._counter += 1), window.setTimeout(function () {
              _this12.dispatchEvent(new CustomEvent(v.Loop)), _this12.currentState === u.Playing && (_this12._lottie.stop(), _this12._lottie.play());
            }, _this12.intermission)) : _this12.dispatchEvent(new CustomEvent(v.Complete));
          }), this._lottie.addEventListener("DOMLoaded", function () {
            _this12.dispatchEvent(new CustomEvent(v.Ready));
          }), this._lottie.addEventListener("data_ready", function () {
            _this12.dispatchEvent(new CustomEvent(v.Load));
          }), this._lottie.addEventListener("data_failed", function () {
            _this12.currentState = u.Error, _this12.dispatchEvent(new CustomEvent(v.Error));
          }), this.container.addEventListener("mouseenter", function () {
            _this12.hover && _this12.currentState !== u.Playing && _this12.play();
          }), this.container.addEventListener("mouseleave", function () {
            _this12.hover && _this12.currentState === u.Playing && _this12.stop();
          }), this.setSpeed(this.speed), this.setDirection(this.direction), this.autoplay && this.play());
        }
      }, {
        key: "getLottie",
        value: function getLottie() {
          return this._lottie;
        }
      }, {
        key: "play",
        value: function play() {
          this._lottie && (this._lottie.play(), this.currentState = u.Playing, this.dispatchEvent(new CustomEvent(v.Play)));
        }
      }, {
        key: "pause",
        value: function pause() {
          this._lottie && (this._lottie.pause(), this.currentState = u.Paused, this.dispatchEvent(new CustomEvent(v.Pause)));
        }
      }, {
        key: "stop",
        value: function stop() {
          this._lottie && (this._counter = 0, this._lottie.stop(), this.currentState = u.Stopped, this.dispatchEvent(new CustomEvent(v.Stop)));
        }
      }, {
        key: "seek",
        value: function seek(t) {
          if (!this._lottie) return;
          var e = t.toString().match(/^([0-9]+)(%?)$/);
          if (!e) return;
          var i = "%" === e[2] ? this._lottie.totalFrames * Number(e[1]) / 100 : Number(e[1]);
          this.seeker = i, this.currentState === u.Playing ? this._lottie.goToAndPlay(i, !0) : (this._lottie.goToAndStop(i, !0), this._lottie.pause());
        }
      }, {
        key: "snapshot",
        value: function snapshot() {
          var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
          if (!this.shadowRoot) return;
          var e = this.shadowRoot.querySelector(".animation svg"),
              i = new XMLSerializer().serializeToString(e);

          if (t) {
            var _t18 = document.createElement("a");

            _t18.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(i), _t18.download = "download_" + this.seeker + ".svg", document.body.appendChild(_t18), _t18.click(), document.body.removeChild(_t18);
          }

          return i;
        }
      }, {
        key: "freeze",
        value: function freeze() {
          this._lottie && (this._lottie.pause(), this.currentState = u.Frozen, this.dispatchEvent(new CustomEvent(v.Freeze)));
        }
      }, {
        key: "setSpeed",
        value: function setSpeed() {
          var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          this._lottie && this._lottie.setSpeed(t);
        }
      }, {
        key: "setDirection",
        value: function setDirection(t) {
          this._lottie && this._lottie.setDirection(t);
        }
      }, {
        key: "setLooping",
        value: function setLooping(t) {
          this._lottie && (this.loop = t, this._lottie.loop = t);
        }
      }, {
        key: "togglePlay",
        value: function togglePlay() {
          return this.currentState === u.Playing ? this.pause() : this.play();
        }
      }, {
        key: "toggleLooping",
        value: function toggleLooping() {
          this.setLooping(!this.loop);
        }
      }, {
        key: "resize",
        value: function resize() {
          this._lottie && this._lottie.resize();
        }
      }, {
        key: "firstUpdated",
        value: function firstUpdated() {
          var _this13 = this;

          "IntersectionObserver" in window && (this._io = new IntersectionObserver(function (t) {
            t[0].isIntersecting ? _this13.currentState === u.Frozen && _this13.play() : _this13.currentState === u.Playing && _this13.freeze();
          }), this._io.observe(this.container)), void 0 !== document.hidden && document.addEventListener("visibilitychange", function () {
            return _this13._onVisibilityChange();
          }), this.src && this.load(this.src);
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          var _this14 = this;

          this._io && (this._io.disconnect(), this._io = void 0), this._ro && (this._ro.disconnect(), this._ro = void 0), document.removeEventListener("visibilitychange", function () {
            return _this14._onVisibilityChange();
          });
        }
      }, {
        key: "renderControls",
        value: function renderControls() {
          var _this15 = this;

          var e = this.currentState === u.Playing,
              i = this.currentState === u.Paused,
              o = this.currentState === u.Stopped;
          return (0, t.html)(l(), this.togglePlay, e || i ? "active" : "", e ? (0, t.html)(p()) : (0, t.html)(h()), this.stop, o ? "active" : "", this.seeker, this._handleSeekChange, function () {
            _this15._prevState = _this15.currentState, _this15.freeze();
          }, function () {
            _this15._prevState === u.Playing && _this15.play();
          }, this.toggleLooping, this.loop ? "active" : "");
        }
      }, {
        key: "render",
        value: function render() {
          var e = this.controls ? "main controls" : "main";
          return (0, t.html)(a(), e, "background:" + this.background, this.currentState === u.Error ? (0, t.html)(s()) : void 0, this.controls ? this.renderControls() : void 0);
        }
      }], [{
        key: "styles",
        get: function get() {
          return i.default;
        }
      }]);

      return m;
    }(t.LitElement);

    exports.LottiePlayer = m, y([(0, t.query)(".animation")], m.prototype, "container", void 0), y([(0, t.property)()], m.prototype, "mode", void 0), y([(0, t.property)({
      type: Boolean
    })], m.prototype, "autoplay", void 0), y([(0, t.property)({
      type: String,
      reflect: !0
    })], m.prototype, "background", void 0), y([(0, t.property)({
      type: Boolean
    })], m.prototype, "controls", void 0), y([(0, t.property)({
      type: Number
    })], m.prototype, "count", void 0), y([(0, t.property)({
      type: Number
    })], m.prototype, "direction", void 0), y([(0, t.property)({
      type: Boolean
    })], m.prototype, "hover", void 0), y([(0, t.property)({
      type: Boolean,
      reflect: !0
    })], m.prototype, "loop", void 0), y([(0, t.property)({
      type: String
    })], m.prototype, "preserveAspectRatio", void 0), y([(0, t.property)({
      type: String
    })], m.prototype, "renderer", void 0), y([(0, t.property)({
      type: Number
    })], m.prototype, "speed", void 0), y([(0, t.property)({
      type: String
    })], m.prototype, "src", void 0), y([(0, t.property)({
      type: String
    })], m.prototype, "currentState", void 0), y([(0, t.property)()], m.prototype, "seeker", void 0), y([(0, t.property)()], m.prototype, "intermission", void 0), exports.LottiePlayer = m = y([(0, t.customElement)("lottie-player")], m);
  }, {
    "lit-element": "bhxD",
    "lottie-web/build/player/lottie": "xaRr",
    "./lottie-player.styles": "jFKs"
  }]
}, {}, ["M8c7"], null);
},{}],"script.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es7.string.trim-left");

require("core-js/modules/es7.string.trim-right");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

require("@lottiefiles/lottie-player");
},{"core-js/modules/es6.array.copy-within":"node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es7.array.flat-map":"node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.from":"node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.sort":"node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es6.array.species":"node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-primitive":"node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.to-string":"node_modules/core-js/modules/es6.object.to-string.js","core-js/modules/es6.object.is":"node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es7.object.values":"node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es7.string.trim-left":"node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right":"node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/es6.typed.array-buffer":"node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"node_modules/core-js/modules/es6.weak-set.js","core-js/modules/web.timers":"node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","@lottiefiles/lottie-player":"node_modules/@lottiefiles/lottie-player/dist/lottie-player.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58867" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59192" + '/');
>>>>>>> a4df3dec47256096b05d44cb3478b08030b7219b

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map