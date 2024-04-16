!function(dataAndEvents, factory) {
  if ("object" == typeof exports && "object" == typeof module) {
    module.exports = factory();
  } else {
    if ("function" == typeof define && define.amd) {
      define([], factory);
    } else {
      if ("object" == typeof exports) {
        exports.ClipboardJS = factory();
      } else {
        dataAndEvents.ClipboardJS = factory();
      }
    }
  }
}(this, function() {
  return function(processors) {
    /**
     * @param {number} name
     * @return {?}
     */
    function r(name) {
      if (t[name]) {
        return t[name].exports;
      }
      var m = t[name] = {
        i : name,
        l : false,
        exports : {}
      };
      return processors[name].call(m.exports, m, m.exports, r), m.l = true, m.exports;
    }
    var t = {};
    return r.m = processors, r.c = t, r.d = function(ctx, e, f) {
      if (!r.o(ctx, e)) {
        Object.defineProperty(ctx, e, {
          enumerable : true,
          /** @type {Function} */
          get : f
        });
      }
    }, r.r = function(context) {
      if ("undefined" != typeof Symbol) {
        if (Symbol.toStringTag) {
          Object.defineProperty(context, Symbol.toStringTag, {
            value : "Module"
          });
        }
      }
      Object.defineProperty(context, "__esModule", {
        value : true
      });
    }, r.t = function(string, a) {
      if (1 & a && (string = r(string)), 8 & a) {
        return string;
      }
      if (4 & a && ("object" == typeof string && (string && string.__esModule))) {
        return string;
      }
      /** @type {Object} */
      var ctx = Object.create(null);
      if (r.r(ctx), Object.defineProperty(ctx, "default", {
        enumerable : true,
        value : string
      }), 2 & a && "string" != typeof string) {
        var i;
        for (i in string) {
          r.d(ctx, i, function(key) {
            return string[key];
          }.bind(null, i));
        }
      }
      return ctx;
    }, r.n = function(c) {
      /** @type {function (): ?} */
      var a = c && c.__esModule ? function() {
        return c.default;
      } : function() {
        return c;
      };
      return r.d(a, "a", a), a;
    }, r.o = function(action, options) {
      return Object.prototype.hasOwnProperty.call(action, options);
    }, r.p = "", r(r.s = 0);
  }([function(module, dataAndEvents, $sanitize) {
    /**
     * @param {Object} options
     * @return {?}
     */
    function getOptions(options) {
      return options && options.__esModule ? options : {
        default : options
      };
    }
    /**
     * @param {string} state
     * @param {Node} el
     * @return {?}
     */
    function $(state, el) {
      /** @type {string} */
      var attribute = "data-clipboard-" + state;
      if (el.hasAttribute(attribute)) {
        return el.getAttribute(attribute);
      }
    }
    /** @type {function (?): ?} */
    var fn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(dataAndEvents) {
      return typeof dataAndEvents;
    } : function(b) {
      return b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
    };
    var forOwn = function() {
      /**
       * @param {Function} proto
       * @param {Array} name
       * @return {undefined}
       */
      function defineProperty(proto, name) {
        /** @type {number} */
        var i = 0;
        for (;i < name.length;i++) {
          var desc = name[i];
          desc.enumerable = desc.enumerable || false;
          /** @type {boolean} */
          desc.configurable = true;
          if ("value" in desc) {
            /** @type {boolean} */
            desc.writable = true;
          }
          Object.defineProperty(proto, desc.key, desc);
        }
      }
      return function(context, name, tag) {
        return name && defineProperty(context.prototype, name), tag && defineProperty(context, tag), context;
      };
    }();
    var opt = getOptions($sanitize(1));
    var obj = getOptions($sanitize(3));
    var opts = getOptions($sanitize(4));
    var JsDiff = function(dataAndEvents) {
      /**
       * @param {?} map
       * @param {?} list
       * @return {?}
       */
      function object(map, list) {
        !function(dataAndEvents, collection) {
          if (!(dataAndEvents instanceof collection)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }(this, object);
        var util = function(dataAndEvents, fn) {
          if (!dataAndEvents) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return!fn || "object" != typeof fn && "function" != typeof fn ? dataAndEvents : fn;
        }(this, (object.__proto__ || Object.getPrototypeOf(object)).call(this));
        return util.resolveOptions(list), util.listenClick(map), util;
      }
      return function(self, b) {
        if ("function" != typeof b && null !== b) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        }
        /** @type {Object} */
        self.prototype = Object.create(b && b.prototype, {
          constructor : {
            /** @type {function (?, ?): ?} */
            value : self,
            enumerable : false,
            writable : true,
            configurable : true
          }
        });
        if (b) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(self, b);
          } else {
            /** @type {Object} */
            self.__proto__ = b;
          }
        }
      }(object, obj.default), forOwn(object, [{
        key : "resolveOptions",
        /**
         * @return {undefined}
         */
        value : function() {
          var self = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          this.action = "function" == typeof self.action ? self.action : this.defaultAction;
          this.target = "function" == typeof self.target ? self.target : this.defaultTarget;
          this.text = "function" == typeof self.text ? self.text : this.defaultText;
          this.container = "object" === fn(self.container) ? self.container : document.body;
        }
      }, {
        key : "listenClick",
        /**
         * @param {?} newValue
         * @return {undefined}
         */
        value : function(newValue) {
          var data = this;
          this.listener = (0, opts.default)(newValue, "click", function(d) {
            return data.onClick(d);
          });
        }
      }, {
        key : "onClick",
        /**
         * @param {Event} event
         * @return {undefined}
         */
        value : function(event) {
          var text = event.delegateTarget || event.currentTarget;
          if (this.clipboardAction) {
            /** @type {null} */
            this.clipboardAction = null;
          }
          this.clipboardAction = new opt.default({
            action : this.action(text),
            target : this.target(text),
            text : this.text(text),
            container : this.container,
            trigger : text,
            emitter : this
          });
        }
      }, {
        key : "defaultAction",
        /**
         * @param {Node} p
         * @return {?}
         */
        value : function(p) {
          return $("action", p);
        }
      }, {
        key : "defaultTarget",
        /**
         * @param {Node} elem
         * @return {?}
         */
        value : function(elem) {
          var target = $("target", elem);
          if (target) {
            return document.querySelector(target);
          }
        }
      }, {
        key : "defaultText",
        /**
         * @param {Node} p
         * @return {?}
         */
        value : function(p) {
          return $("text", p);
        }
      }, {
        key : "destroy",
        /**
         * @return {undefined}
         */
        value : function() {
          this.listener.destroy();
          if (this.clipboardAction) {
            this.clipboardAction.destroy();
            /** @type {null} */
            this.clipboardAction = null;
          }
        }
      }], [{
        key : "isSupported",
        /**
         * @return {?}
         */
        value : function() {
          var opts = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"];
          var asserterNames = "string" == typeof opts ? [opts] : opts;
          /** @type {boolean} */
          var skipStatic = !!document.queryCommandSupported;
          return asserterNames.forEach(function(command) {
            skipStatic = skipStatic && !!document.queryCommandSupported(command);
          }), skipStatic;
        }
      }]), object;
    }();
    module.exports = JsDiff;
  }, function(module, dataAndEvents, require) {
    var options;
    /** @type {function (Object): ?} */
    var fn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(clicked) {
      return typeof clicked;
    } : function(b) {
      return b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
    };
    var setDirty = function() {
      /**
       * @param {Function} proto
       * @param {Array} name
       * @return {undefined}
       */
      function defineProperty(proto, name) {
        /** @type {number} */
        var i = 0;
        for (;i < name.length;i++) {
          var desc = name[i];
          desc.enumerable = desc.enumerable || false;
          /** @type {boolean} */
          desc.configurable = true;
          if ("value" in desc) {
            /** @type {boolean} */
            desc.writable = true;
          }
          Object.defineProperty(proto, desc.key, desc);
        }
      }
      return function(context, name, tag) {
        return name && defineProperty(context.prototype, name), tag && defineProperty(context, tag), context;
      };
    }();
    var url = require(2);
    var opts = (options = url) && options.__esModule ? options : {
      default : options
    };
    var JsDiff = function() {
      /**
       * @param {?} ctxt
       * @return {undefined}
       */
      function core(ctxt) {
        !function(dataAndEvents, core) {
          if (!(dataAndEvents instanceof core)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }(this, core);
        this.resolveOptions(ctxt);
        this.initSelection();
      }
      return setDirty(core, [{
        key : "resolveOptions",
        /**
         * @return {undefined}
         */
        value : function() {
          var options = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          this.action = options.action;
          this.container = options.container;
          this.emitter = options.emitter;
          this.target = options.target;
          this.text = options.text;
          this.trigger = options.trigger;
          /** @type {string} */
          this.selectedText = "";
        }
      }, {
        key : "initSelection",
        /**
         * @return {undefined}
         */
        value : function() {
          if (this.text) {
            this.selectFake();
          } else {
            if (this.target) {
              this.selectTarget();
            }
          }
        }
      }, {
        key : "selectFake",
        /**
         * @return {undefined}
         */
        value : function() {
          var removeFake = this;
          /** @type {boolean} */
          var isLeft = "rtl" == document.documentElement.getAttribute("dir");
          this.removeFake();
          /**
           * @return {?}
           */
          this.fakeHandlerCallback = function() {
            return removeFake.removeFake();
          };
          this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
          /** @type {Element} */
          this.fakeElem = document.createElement("textarea");
          /** @type {string} */
          this.fakeElem.style.fontSize = "12pt";
          /** @type {string} */
          this.fakeElem.style.border = "0";
          /** @type {string} */
          this.fakeElem.style.padding = "0";
          /** @type {string} */
          this.fakeElem.style.margin = "0";
          /** @type {string} */
          this.fakeElem.style.position = "absolute";
          /** @type {string} */
          this.fakeElem.style[isLeft ? "right" : "left"] = "-9999px";
          /** @type {number} */
          var newTop = window.pageYOffset || document.documentElement.scrollTop;
          /** @type {string} */
          this.fakeElem.style.top = newTop + "px";
          this.fakeElem.setAttribute("readonly", "");
          this.fakeElem.value = this.text;
          this.container.appendChild(this.fakeElem);
          this.selectedText = (0, opts.default)(this.fakeElem);
          this.copyText();
        }
      }, {
        key : "removeFake",
        /**
         * @return {undefined}
         */
        value : function() {
          if (this.fakeHandler) {
            this.container.removeEventListener("click", this.fakeHandlerCallback);
            /** @type {null} */
            this.fakeHandler = null;
            /** @type {null} */
            this.fakeHandlerCallback = null;
          }
          if (this.fakeElem) {
            this.container.removeChild(this.fakeElem);
            /** @type {null} */
            this.fakeElem = null;
          }
        }
      }, {
        key : "selectTarget",
        /**
         * @return {undefined}
         */
        value : function() {
          this.selectedText = (0, opts.default)(this.target);
          this.copyText();
        }
      }, {
        key : "copyText",
        /**
         * @return {undefined}
         */
        value : function() {
          var r20 = void 0;
          try {
            r20 = document.execCommand(this.action);
          } catch (t) {
            /** @type {boolean} */
            r20 = false;
          }
          this.handleResult(r20);
        }
      }, {
        key : "handleResult",
        /**
         * @param {boolean} o
         * @return {undefined}
         */
        value : function(o) {
          this.emitter.emit(o ? "success" : "error", {
            action : this.action,
            text : this.selectedText,
            trigger : this.trigger,
            clearSelection : this.clearSelection.bind(this)
          });
        }
      }, {
        key : "clearSelection",
        /**
         * @return {undefined}
         */
        value : function() {
          if (this.trigger) {
            this.trigger.focus();
          }
          window.getSelection().removeAllRanges();
        }
      }, {
        key : "destroy",
        /**
         * @return {undefined}
         */
        value : function() {
          this.removeFake();
        }
      }, {
        key : "action",
        /**
         * @return {undefined}
         */
        set : function() {
          var action = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "copy";
          if (this._action = action, "copy" !== this._action && "cut" !== this._action) {
            throw new Error('Invalid "action" value, use either "copy" or "cut"');
          }
        },
        /**
         * @return {?}
         */
        get : function() {
          return this._action;
        }
      }, {
        key : "target",
        /**
         * @param {Object} el
         * @return {undefined}
         */
        set : function(el) {
          if (void 0 !== el) {
            if (!el || ("object" !== (void 0 === el ? "undefined" : fn(el)) || 1 !== el.nodeType)) {
              throw new Error('Invalid "target" value, use a valid Element');
            }
            if ("copy" === this.action && el.hasAttribute("disabled")) {
              throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            if ("cut" === this.action && (el.hasAttribute("readonly") || el.hasAttribute("disabled"))) {
              throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
            }
            /** @type {Object} */
            this._target = el;
          }
        },
        /**
         * @return {?}
         */
        get : function() {
          return this._target;
        }
      }]), core;
    }();
    module.exports = JsDiff;
  }, function(module, dataAndEvents) {
    /**
     * @param {Element} elem
     * @return {?}
     */
    module.exports = function(elem) {
      var ret;
      if ("SELECT" === elem.nodeName) {
        elem.focus();
        ret = elem.value;
      } else {
        if ("INPUT" === elem.nodeName || "TEXTAREA" === elem.nodeName) {
          var readonly2 = elem.hasAttribute("readonly");
          if (!readonly2) {
            elem.setAttribute("readonly", "");
          }
          elem.select();
          elem.setSelectionRange(0, elem.value.length);
          if (!readonly2) {
            elem.removeAttribute("readonly");
          }
          ret = elem.value;
        } else {
          if (elem.hasAttribute("contenteditable")) {
            elem.focus();
          }
          /** @type {(Selection|null)} */
          var selection = window.getSelection();
          /** @type {(Range|null)} */
          var range = document.createRange();
          range.selectNodeContents(elem);
          selection.removeAllRanges();
          selection.addRange(range);
          /** @type {string} */
          ret = selection.toString();
        }
      }
      return ret;
    };
  }, function(module, dataAndEvents) {
    /**
     * @return {undefined}
     */
    function MicroEvent() {
    }
    MicroEvent.prototype = {
      /**
       * @param {?} types
       * @param {Function} fn
       * @param {Object} context
       * @return {?}
       */
      on : function(types, fn, context) {
        var options = this.e || (this.e = {});
        return(options[types] || (options[types] = [])).push({
          /** @type {Function} */
          fn : fn,
          ctx : context
        }), this;
      },
      /**
       * @param {?} event
       * @param {Function} fn
       * @param {Object} context
       * @return {?}
       */
      once : function(event, fn, context) {
        /**
         * @return {undefined}
         */
        function on() {
          self.off(event, on);
          fn.apply(context, arguments);
        }
        var self = this;
        return on._ = fn, this.on(event, on, context);
      },
      /**
       * @param {string} evt
       * @return {?}
       */
      emit : function(evt) {
        /** @type {Array.<?>} */
        var args = [].slice.call(arguments, 1);
        var qs = ((this.e || (this.e = {}))[evt] || []).slice();
        /** @type {number} */
        var i = 0;
        var len = qs.length;
        for (;i < len;i++) {
          qs[i].fn.apply(qs[i].ctx, args);
        }
        return this;
      },
      /**
       * @param {?} eventName
       * @param {Function} fn
       * @return {?}
       */
      off : function(eventName, fn) {
        var c = this.e || (this.e = {});
        var fns = c[eventName];
        /** @type {Array} */
        var value = [];
        if (fns && fn) {
          /** @type {number} */
          var i = 0;
          var l = fns.length;
          for (;i < l;i++) {
            if (fns[i].fn !== fn) {
              if (fns[i].fn._ !== fn) {
                value.push(fns[i]);
              }
            }
          }
        }
        return value.length ? c[eventName] = value : delete c[eventName], this;
      }
    };
    /** @type {function (): undefined} */
    module.exports = MicroEvent;
  }, function(module, dataAndEvents, values) {
    var v = values(5);
    var callback = values(6);
    /**
     * @param {Object} table
     * @param {?} token
     * @param {?} data
     * @return {?}
     */
    module.exports = function(table, token, data) {
      if (!table && (!token && !data)) {
        throw new Error("Missing required arguments");
      }
      if (!v.string(token)) {
        throw new TypeError("Second argument must be a String");
      }
      if (!v.fn(data)) {
        throw new TypeError("Third argument must be a Function");
      }
      if (v.node(table)) {
        return name = token, completed = data, (node = table).addEventListener(name, completed), {
          /**
           * @return {undefined}
           */
          destroy : function() {
            node.removeEventListener(name, completed);
          }
        };
      }
      if (v.nodeList(table)) {
        return ret = table, orig = token, handle = data, Array.prototype.forEach.call(ret, function(buffer) {
          buffer.addEventListener(orig, handle);
        }), {
          /**
           * @return {undefined}
           */
          destroy : function() {
            Array.prototype.forEach.call(ret, function(buffer) {
              buffer.removeEventListener(orig, handle);
            });
          }
        };
      }
      if (v.string(table)) {
        return feed = table, res = token, doneResults = data, callback(document.body, feed, res, doneResults);
      }
      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var feed;
      var res;
      var doneResults;
      var ret;
      var orig;
      var handle;
      var node;
      var name;
      var completed;
    };
  }, function(dataAndEvents, ctx) {
    /**
     * @param {Object} node
     * @return {?}
     */
    ctx.node = function(node) {
      return void 0 !== node && (node instanceof HTMLElement && 1 === node.nodeType);
    };
    /**
     * @param {Object} nodes
     * @return {?}
     */
    ctx.nodeList = function(nodes) {
      /** @type {string} */
      var node = Object.prototype.toString.call(nodes);
      return void 0 !== nodes && (("[object NodeList]" === node || "[object HTMLCollection]" === node) && ("length" in nodes && (0 === nodes.length || ctx.node(nodes[0]))));
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ctx.string = function(str) {
      return "string" == typeof str || str instanceof String;
    };
    /**
     * @param {?} connection
     * @return {?}
     */
    ctx.fn = function(connection) {
      return "[object Function]" === Object.prototype.toString.call(connection);
    };
  }, function(module, dataAndEvents, $sanitize) {
    /**
     * @param {?} el
     * @param {?} index
     * @param {?} ev
     * @param {?} encoding
     * @param {?} bubble
     * @return {?}
     */
    function end(el, index, ev, encoding, bubble) {
      var handle = function(opt_scope, element, dataAndEvents, handler) {
        return function(event) {
          event.delegateTarget = $(event.target, element);
          if (event.delegateTarget) {
            handler.call(opt_scope, event);
          }
        };
      }.apply(this, arguments);
      return el.addEventListener(ev, handle, bubble), {
        /**
         * @return {undefined}
         */
        destroy : function() {
          el.removeEventListener(ev, handle, bubble);
        }
      };
    }
    var $ = $sanitize(7);
    /**
     * @param {?} str
     * @param {?} _
     * @param {?} opts
     * @param {?} encoding
     * @param {?} shallow
     * @return {?}
     */
    module.exports = function(str, _, opts, encoding, shallow) {
      return "function" == typeof str.addEventListener ? end.apply(null, arguments) : "function" == typeof opts ? end.bind(null, document).apply(null, arguments) : ("string" == typeof str && (str = document.querySelectorAll(str)), Array.prototype.map.call(str, function(e) {
        return end(e, _, opts, encoding, shallow);
      }));
    };
  }, function(module, dataAndEvents) {
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      /** @type {function (this:Element, string, (Node|NodeList|null)=): boolean} */
      proto.matches = proto.matchesSelector || (proto.mozMatchesSelector || (proto.msMatchesSelector || (proto.oMatchesSelector || proto.webkitMatchesSelector)));
    }
    /**
     * @param {Object} node
     * @param {?} expr
     * @return {?}
     */
    module.exports = function(node, expr) {
      for (;node && 9 !== node.nodeType;) {
        if ("function" == typeof node.matches && node.matches(expr)) {
          return node;
        }
        node = node.parentNode;
      }
    };
  }]);
});
