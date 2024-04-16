!function(element, proceed) {
  if ("object" == typeof module && "object" == typeof module.exports) {
    module.exports = element.document ? proceed(element, true) : function(element) {
      if (!element.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return proceed(element);
    };
  } else {
    proceed(element);
  }
}("undefined" != typeof window ? window : this, function(win, dataAndEvents) {
  /**
   * @param {string} cycle
   * @return {?}
   */
  function isArraylike(cycle) {
    var value = "length" in cycle && cycle.length;
    var type = jQuery.type(cycle);
    return "function" === type || jQuery.isWindow(cycle) ? false : 1 === cycle.nodeType && value ? true : "array" === type || (0 === value || "number" == typeof value && (value > 0 && value - 1 in cycle));
  }
  /**
   * @param {?} elements
   * @param {string} cycle
   * @param {boolean} isXML
   * @return {?}
   */
  function winnow(elements, cycle, isXML) {
    if (jQuery.isFunction(cycle)) {
      return jQuery.grep(elements, function(w, mapper) {
        return!!cycle.call(w, mapper, w) !== isXML;
      });
    }
    if (cycle.nodeType) {
      return jQuery.grep(elements, function(dataAndEvents) {
        return dataAndEvents === cycle !== isXML;
      });
    }
    if ("string" == typeof cycle) {
      if (reWhitespace.test(cycle)) {
        return jQuery.filter(cycle, elements, isXML);
      }
      cycle = jQuery.filter(cycle, elements);
    }
    return jQuery.grep(elements, function(arg) {
      return jQuery.inArray(arg, cycle) >= 0 !== isXML;
    });
  }
  /**
   * @param {Object} cur
   * @param {string} dir
   * @return {?}
   */
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && 1 !== cur.nodeType);
    return cur;
  }
  /**
   * @param {string} options
   * @return {?}
   */
  function createOptions(options) {
    var buf = optionsCache[options] = {};
    return jQuery.each(options.match(core_rnotwhite) || [], function(dataAndEvents, off) {
      /** @type {boolean} */
      buf[off] = true;
    }), buf;
  }
  /**
   * @return {undefined}
   */
  function domReady() {
    if (element.addEventListener) {
      element.removeEventListener("DOMContentLoaded", init, false);
      win.removeEventListener("load", init, false);
    } else {
      element.detachEvent("onreadystatechange", init);
      win.detachEvent("onload", init);
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    if (element.addEventListener || ("load" === event.type || "complete" === element.readyState)) {
      domReady();
      jQuery.ready();
    }
  }
  /**
   * @param {string} cycle
   * @param {(Error|string)} key
   * @param {Object} data
   * @return {?}
   */
  function dataAttr(cycle, key, data) {
    if (void 0 === data && 1 === cycle.nodeType) {
      var name = "data-" + key.replace(r20, "-$1").toLowerCase();
      if (data = cycle.getAttribute(name), "string" == typeof data) {
        try {
          data = "true" === data ? true : "false" === data ? false : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {
        }
        jQuery.data(cycle, key, data);
      } else {
        data = void 0;
      }
    }
    return data;
  }
  /**
   * @param {Object} obj
   * @return {?}
   */
  function filter(obj) {
    var name;
    for (name in obj) {
      if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) {
        return false;
      }
    }
    return true;
  }
  /**
   * @param {Object} elem
   * @param {string} data
   * @param {boolean} state
   * @param {Object} dataAndEvents
   * @return {?}
   */
  function callback(elem, data, state, dataAndEvents) {
    if (jQuery.acceptData(elem)) {
      var sortby;
      var item;
      var internalKey = jQuery.expando;
      var isNode = elem.nodeType;
      var cache = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      if (id && (cache[id] && (dataAndEvents || cache[id].data)) || (void 0 !== state || "string" != typeof data)) {
        return id || (id = isNode ? elem[internalKey] = core_deletedIds.pop() || jQuery.guid++ : internalKey), cache[id] || (cache[id] = isNode ? {} : {
          toJSON : jQuery.noop
        }), ("object" == typeof data || "function" == typeof data) && (dataAndEvents ? cache[id] = jQuery.extend(cache[id], data) : cache[id].data = jQuery.extend(cache[id].data, data)), item = cache[id], dataAndEvents || (item.data || (item.data = {}), item = item.data), void 0 !== state && (item[jQuery.camelCase(data)] = state), "string" == typeof data ? (sortby = item[data], null == sortby && (sortby = item[jQuery.camelCase(data)])) : sortby = item, sortby;
      }
    }
  }
  /**
   * @param {Object} elem
   * @param {Object} name
   * @param {boolean} keepData
   * @return {undefined}
   */
  function remove(elem, name, keepData) {
    if (jQuery.acceptData(elem)) {
      var cache;
      var i;
      var isNode = elem.nodeType;
      var response = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[jQuery.expando] : jQuery.expando;
      if (response[id]) {
        if (name && (cache = keepData ? response[id] : response[id].data)) {
          if (jQuery.isArray(name)) {
            name = name.concat(jQuery.map(name, jQuery.camelCase));
          } else {
            if (name in cache) {
              /** @type {Array} */
              name = [name];
            } else {
              name = jQuery.camelCase(name);
              name = name in cache ? [name] : name.split(" ");
            }
          }
          i = name.length;
          for (;i--;) {
            delete cache[name[i]];
          }
          if (keepData ? !filter(cache) : !jQuery.isEmptyObject(cache)) {
            return;
          }
        }
        if (keepData || (delete response[id].data, filter(response[id]))) {
          if (isNode) {
            jQuery.cleanData([elem], true);
          } else {
            if (support.deleteExpando || response != response.window) {
              delete response[id];
            } else {
              /** @type {null} */
              response[id] = null;
            }
          }
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function returnTrue() {
    return true;
  }
  /**
   * @return {?}
   */
  function returnFalse() {
    return false;
  }
  /**
   * @return {?}
   */
  function safeActiveElement() {
    try {
      return element.activeElement;
    } catch (a) {
    }
  }
  /**
   * @param {(Document|DocumentFragment)} context
   * @return {?}
   */
  function create(context) {
    /** @type {Array.<string>} */
    var braceStack = uHostName.split("|");
    var frag = context.createDocumentFragment();
    if (frag.createElement) {
      for (;braceStack.length;) {
        frag.createElement(braceStack.pop());
      }
    }
    return frag;
  }
  /**
   * @param {Node} context
   * @param {Object} tag
   * @return {?}
   */
  function getAll(context, tag) {
    var opt_nodes;
    var node;
    /** @type {number} */
    var i = 0;
    var ret = typeof context.getElementsByTagName !== text ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== text ? context.querySelectorAll(tag || "*") : void 0;
    if (!ret) {
      /** @type {Array} */
      ret = [];
      opt_nodes = context.childNodes || context;
      for (;null != (node = opt_nodes[i]);i++) {
        if (!tag || jQuery.nodeName(node, tag)) {
          ret.push(node);
        } else {
          jQuery.merge(ret, getAll(node, tag));
        }
      }
    }
    return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  /**
   * @param {Element} elem
   * @return {undefined}
   */
  function set(elem) {
    if (manipulation_rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  /**
   * @param {Node} elem
   * @param {Array} content
   * @return {?}
   */
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  /**
   * @param {Object} elem
   * @return {?}
   */
  function restoreScript(elem) {
    return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, elem;
  }
  /**
   * @param {Object} elem
   * @return {?}
   */
  function fn(elem) {
    /** @type {(Array.<string>|null)} */
    var match = rscriptTypeMasked.exec(elem.type);
    return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
  }
  /**
   * @param {(Array|NodeList)} elems
   * @param {Array} refElements
   * @return {undefined}
   */
  function setGlobalEval(elems, refElements) {
    var node;
    /** @type {number} */
    var i = 0;
    for (;null != (node = elems[i]);i++) {
      jQuery._data(node, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
  }
  /**
   * @param {Object} src
   * @param {Object} dest
   * @return {undefined}
   */
  function cloneCopyEvent(src, dest) {
    if (1 === dest.nodeType && jQuery.hasData(src)) {
      var type;
      var i;
      var ilen;
      var oldData = jQuery._data(src);
      var curData = jQuery._data(dest, oldData);
      var events = oldData.events;
      if (events) {
        delete curData.handle;
        curData.events = {};
        for (type in events) {
          /** @type {number} */
          i = 0;
          ilen = events[type].length;
          for (;ilen > i;i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
      if (curData.data) {
        curData.data = jQuery.extend({}, curData.data);
      }
    }
  }
  /**
   * @param {Element} src
   * @param {Object} dest
   * @return {undefined}
   */
  function cloneFixAttributes(src, dest) {
    var name;
    var type;
    var pdataCur;
    if (1 === dest.nodeType) {
      if (name = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
        pdataCur = jQuery._data(dest);
        for (type in pdataCur.events) {
          jQuery.removeEvent(dest, type, pdataCur.handle);
        }
        dest.removeAttribute(jQuery.expando);
      }
      if ("script" === name && dest.text !== src.text) {
        restoreScript(dest).text = src.text;
        fn(dest);
      } else {
        if ("object" === name) {
          if (dest.parentNode) {
            dest.outerHTML = src.outerHTML;
          }
          if (support.html5Clone) {
            if (src.innerHTML) {
              if (!jQuery.trim(dest.innerHTML)) {
                dest.innerHTML = src.innerHTML;
              }
            }
          }
        } else {
          if ("input" === name && manipulation_rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
              dest.value = src.value;
            }
          } else {
            if ("option" === name) {
              dest.defaultSelected = dest.selected = src.defaultSelected;
            } else {
              if ("input" === name || "textarea" === name) {
                dest.defaultValue = src.defaultValue;
              }
            }
          }
        }
      }
    }
  }
  /**
   * @param {?} name
   * @param {Document} doc
   * @return {?}
   */
  function actualDisplay(name, doc) {
    var result;
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body);
    var f = win.getDefaultComputedStyle && (result = win.getDefaultComputedStyle(elem[0])) ? result.display : jQuery.css(elem[0], "display");
    return elem.detach(), f;
  }
  /**
   * @param {?} nodeName
   * @return {?}
   */
  function defaultDisplay(nodeName) {
    var doc = element;
    var display = elemdisplay[nodeName];
    return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display;
  }
  /**
   * @param {?} require
   * @param {Function} hookFn
   * @return {?}
   */
  function addGetHookIf(require, hookFn) {
    return{
      /**
       * @return {?}
       */
      get : function() {
        var Block = require();
        if (null != Block) {
          return Block ? void delete this.get : (this.get = hookFn).apply(this, arguments);
        }
      }
    };
  }
  /**
   * @param {Object} style
   * @param {string} name
   * @return {?}
   */
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1);
    /** @type {string} */
    var origName = name;
    /** @type {number} */
    var i = cssPrefixes.length;
    for (;i--;) {
      if (name = cssPrefixes[i] + capName, name in style) {
        return name;
      }
    }
    return origName;
  }
  /**
   * @param {Array} elements
   * @param {boolean} show
   * @return {?}
   */
  function showHide(elements, show) {
    var display;
    var elem;
    var hidden;
    /** @type {Array} */
    var values = [];
    /** @type {number} */
    var index = 0;
    var length = elements.length;
    for (;length > index;index++) {
      elem = elements[index];
      if (elem.style) {
        values[index] = jQuery._data(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
          if (!values[index]) {
            if (!("none" !== display)) {
              /** @type {string} */
              elem.style.display = "";
            }
          }
          if ("" === elem.style.display) {
            if (cycle(elem)) {
              values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
            }
          }
        } else {
          hidden = cycle(elem);
          if (display && "none" !== display || !hidden) {
            jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
          }
        }
      }
    }
    /** @type {number} */
    index = 0;
    for (;length > index;index++) {
      elem = elements[index];
      if (elem.style) {
        if (!(show && ("none" !== elem.style.display && "" !== elem.style.display))) {
          elem.style.display = show ? values[index] || "" : "none";
        }
      }
    }
    return elements;
  }
  /**
   * @param {string} num
   * @param {string} value
   * @param {string} keepData
   * @return {?}
   */
  function setPositiveNumber(num, value, keepData) {
    /** @type {(Array.<string>|null)} */
    var iterator = rrelNum.exec(value);
    return iterator ? Math.max(0, iterator[1] - (keepData || 0)) + (iterator[2] || "px") : value;
  }
  /**
   * @param {string} elem
   * @param {string} keepData
   * @param {string} extra
   * @param {boolean} isBorderBox
   * @param {boolean} styles
   * @return {?}
   */
  function augmentWidthOrHeight(elem, keepData, extra, isBorderBox, styles) {
    /** @type {number} */
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === keepData ? 1 : 0;
    /** @type {number} */
    var val = 0;
    for (;4 > i;i += 2) {
      if ("margin" === extra) {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if ("content" === extra) {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if ("margin" !== extra) {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if ("padding" !== extra) {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  /**
   * @param {string} elem
   * @param {string} name
   * @param {string} extra
   * @return {?}
   */
  function getWidthOrHeight(elem, name, extra) {
    /** @type {boolean} */
    var valueIsBorderBox = true;
    var val = "width" === name ? elem.offsetWidth : elem.offsetHeight;
    var styles = getStyles(elem);
    /** @type {boolean} */
    var isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
    if (0 >= val || null == val) {
      if (val = get(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      /** @type {number} */
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  /**
   * @param {string} selector
   * @param {string} context
   * @param {string} prop
   * @param {string} end
   * @param {string} easing
   * @return {?}
   */
  function Tween(selector, context, prop, end, easing) {
    return new Tween.prototype.init(selector, context, prop, end, easing);
  }
  /**
   * @return {?}
   */
  function createFxNow() {
    return setTimeout(function() {
      fxNow = void 0;
    }), fxNow = jQuery.now();
  }
  /**
   * @param {string} type
   * @param {boolean} includeWidth
   * @return {?}
   */
  function genFx(type, includeWidth) {
    var which;
    var attrs = {
      height : type
    };
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    includeWidth = includeWidth ? 1 : 0;
    for (;4 > i;i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  /**
   * @param {?} value
   * @param {?} prop
   * @param {?} animation
   * @return {?}
   */
  function createTween(value, prop, animation) {
    var tween;
    var q = (cache[prop] || []).concat(cache["*"]);
    /** @type {number} */
    var i = 0;
    var l = q.length;
    for (;l > i;i++) {
      if (tween = q[i].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  /**
   * @param {string} elem
   * @param {Object} props
   * @param {Object} opts
   * @return {undefined}
   */
  function defaultPrefilter(elem, props, opts) {
    var prop;
    var value;
    var thisp;
    var tween;
    var hooks;
    var oldfire;
    var oldDisplay;
    var type;
    var anim = this;
    var orig = {};
    var style = elem.style;
    var hidden = elem.nodeType && cycle(elem);
    var dataShow = jQuery._data(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (null == hooks.unqueued) {
        /** @type {number} */
        hooks.unqueued = 0;
        /** @type {function (): undefined} */
        oldfire = hooks.empty.fire;
        /**
         * @return {undefined}
         */
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (1 === elem.nodeType) {
      if ("height" in props || "width" in props) {
        /** @type {Array} */
        opts.overflow = [style.overflow, style.overflowX, style.overflowY];
        oldDisplay = jQuery.css(elem, "display");
        type = "none" === oldDisplay ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : oldDisplay;
        if ("inline" === type) {
          if ("none" === jQuery.css(elem, "float")) {
            if (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName)) {
              /** @type {number} */
              style.zoom = 1;
            } else {
              /** @type {string} */
              style.display = "inline-block";
            }
          }
        }
      }
    }
    if (opts.overflow) {
      /** @type {string} */
      style.overflow = "hidden";
      if (!support.shrinkWrapBlocks()) {
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (prop in props) {
      if (value = props[prop], rplusequals.exec(value)) {
        if (delete props[prop], thisp = thisp || "toggle" === value, value === (hidden ? "hide" : "show")) {
          if ("show" !== value || (!dataShow || void 0 === dataShow[prop])) {
            continue;
          }
          /** @type {boolean} */
          hidden = true;
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        oldDisplay = void 0;
      }
    }
    if (jQuery.isEmptyObject(orig)) {
      if ("inline" === ("none" === oldDisplay ? defaultDisplay(elem.nodeName) : oldDisplay)) {
        style.display = oldDisplay;
      }
    } else {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = jQuery._data(elem, "fxshow", {});
      }
      if (thisp) {
        /** @type {boolean} */
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        jQuery._removeData(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            /** @type {number} */
            tween.start = "width" === prop || "height" === prop ? 1 : 0;
          }
        }
      }
    }
  }
  /**
   * @param {Object} object
   * @param {Object} paramMap
   * @return {undefined}
   */
  function propFilter(object, paramMap) {
    var key;
    var name;
    var value;
    var data;
    var hooks;
    for (key in object) {
      if (name = jQuery.camelCase(key), value = paramMap[name], data = object[key], jQuery.isArray(data) && (value = data[1], data = object[key] = data[0]), key !== name && (object[name] = data, delete object[key]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
        data = hooks.expand(data);
        delete object[name];
        for (key in data) {
          if (!(key in object)) {
            object[key] = data[key];
            paramMap[key] = value;
          }
        }
      } else {
        paramMap[name] = value;
      }
    }
  }
  /**
   * @param {string} elem
   * @param {?} properties
   * @param {Object} options
   * @return {?}
   */
  function Animation(elem, properties, options) {
    var result;
    var e;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var length = animationPrefilters.length;
    var deferred = jQuery.Deferred().always(function() {
      delete tick.elem;
    });
    /**
     * @return {?}
     */
    var tick = function() {
      if (e) {
        return false;
      }
      var currentTime = fxNow || createFxNow();
      /** @type {number} */
      var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
      /** @type {number} */
      var temp = remaining / animation.duration || 0;
      /** @type {number} */
      var percent = 1 - temp;
      /** @type {number} */
      var index = 0;
      var startOffset = animation.tweens.length;
      for (;startOffset > index;index++) {
        animation.tweens[index].run(percent);
      }
      return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && startOffset ? remaining : (deferred.resolveWith(elem, [animation]), false);
    };
    var animation = deferred.promise({
      elem : elem,
      props : jQuery.extend({}, properties),
      opts : jQuery.extend(true, {
        specialEasing : {}
      }, options),
      originalProperties : properties,
      originalOptions : options,
      startTime : fxNow || createFxNow(),
      duration : options.duration,
      tweens : [],
      /**
       * @param {?} prop
       * @param {string} end
       * @return {?}
       */
      createTween : function(prop, end) {
        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        return animation.tweens.push(tween), tween;
      },
      /**
       * @param {boolean} gotoEnd
       * @return {?}
       */
      stop : function(gotoEnd) {
        /** @type {number} */
        var index = 0;
        var length = gotoEnd ? animation.tweens.length : 0;
        if (e) {
          return this;
        }
        /** @type {boolean} */
        e = true;
        for (;length > index;index++) {
          animation.tweens[index].run(1);
        }
        return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this;
      }
    });
    var scripts = animation.props;
    propFilter(scripts, animation.opts.specialEasing);
    for (;length > index;index++) {
      if (result = animationPrefilters[index].call(animation, elem, scripts, animation.opts)) {
        return result;
      }
    }
    return jQuery.map(scripts, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      elem : elem,
      anim : animation,
      queue : animation.opts.queue
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  /**
   * @param {Array} structure
   * @return {?}
   */
  function addToPrefiltersOrTransports(structure) {
    return function(selector, fn) {
      if ("string" != typeof selector) {
        /** @type {(Function|string)} */
        fn = selector;
        /** @type {string} */
        selector = "*";
      }
      var node;
      /** @type {number} */
      var i = 0;
      var elem = selector.toLowerCase().match(core_rnotwhite) || [];
      if (jQuery.isFunction(fn)) {
        for (;node = elem[i++];) {
          if ("+" === node.charAt(0)) {
            node = node.slice(1) || "*";
            (structure[node] = structure[node] || []).unshift(fn);
          } else {
            (structure[node] = structure[node] || []).push(fn);
          }
        }
      }
    };
  }
  /**
   * @param {?} structure
   * @param {?} options
   * @param {Object} originalOptions
   * @param {?} jqXHR
   * @return {?}
   */
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    /**
     * @param {string} key
     * @return {?}
     */
    function inspect(key) {
      var oldName;
      return old[key] = true, jQuery.each(structure[key] || [], function(dataAndEvents, prefilterOrFactory) {
        var name = prefilterOrFactory(options, originalOptions, jqXHR);
        return "string" != typeof name || (seekingTransport || old[name]) ? seekingTransport ? !(oldName = name) : void 0 : (options.dataTypes.unshift(name), inspect(name), false);
      }), oldName;
    }
    var old = {};
    /** @type {boolean} */
    var seekingTransport = structure === transports;
    return inspect(options.dataTypes[0]) || !old["*"] && inspect("*");
  }
  /**
   * @param {(Object|string)} target
   * @param {Object} src
   * @return {?}
   */
  function ajaxExtend(target, src) {
    var deep;
    var key;
    var flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (void 0 !== src[key]) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }
  /**
   * @param {Object} s
   * @param {XMLHttpRequest} jqXHR
   * @param {Object} responses
   * @return {?}
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType;
    var ct;
    var finalDataType;
    var type;
    var contents = s.contents;
    var dataTypes = s.dataTypes;
    for (;"*" === dataTypes[0];) {
      dataTypes.shift();
      if (void 0 === ct) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          /** @type {string} */
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          /** @type {string} */
          firstDataType = type;
        }
      }
      /** @type {(string|undefined)} */
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0;
  }
  /**
   * @param {Object} s
   * @param {(Object|string)} response
   * @param {?} jqXHR
   * @param {Object} isSuccess
   * @return {?}
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2;
    var current;
    var conv;
    var tmp;
    var prev;
    var converters = {};
    var dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    for (;current;) {
      if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && (isSuccess && (s.dataFilter && (response = s.dataFilter(response, s.dataType)))), prev = current, current = dataTypes.shift()) {
        if ("*" === current) {
          current = prev;
        } else {
          if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) {
              for (conv2 in converters) {
                if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else {
                    if (converters[conv2] !== true) {
                      /** @type {string} */
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                  }
                  break;
                }
              }
            }
            if (conv !== true) {
              if (conv && s["throws"]) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return{
                    state : "parsererror",
                    error : conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
    }
    return{
      state : "success",
      data : response
    };
  }
  /**
   * @param {string} prefix
   * @param {string} cycle
   * @param {boolean} traditional
   * @param {Function} add
   * @return {undefined}
   */
  function buildParams(prefix, cycle, traditional, add) {
    var name;
    if (jQuery.isArray(cycle)) {
      jQuery.each(cycle, function(i, v) {
        if (traditional || rmargin.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }
      });
    } else {
      if (traditional || "object" !== jQuery.type(cycle)) {
        add(prefix, cycle);
      } else {
        for (name in cycle) {
          buildParams(prefix + "[" + name + "]", cycle[name], traditional, add);
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function createStandardXHR() {
    try {
      return new win.XMLHttpRequest;
    } catch (b) {
    }
  }
  /**
   * @return {?}
   */
  function createActiveXHR() {
    try {
      return new win.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {
    }
  }
  /**
   * @param {Object} elem
   * @return {?}
   */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : false;
  }
  /** @type {Array} */
  var core_deletedIds = [];
  /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
  var core_slice = core_deletedIds.slice;
  /** @type {function (this:*, ...[*]): Array} */
  var core_concat = core_deletedIds.concat;
  /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
  var core_push = core_deletedIds.push;
  /** @type {function (this:(Array.<T>|string|{length: number}), T, number=): number} */
  var core_indexOf = core_deletedIds.indexOf;
  var class2type = {};
  /** @type {function (this:*): string} */
  var core_toString = class2type.toString;
  /** @type {function (this:Object, *): boolean} */
  var core_hasOwn = class2type.hasOwnProperty;
  var support = {};
  /** @type {string} */
  var core_version = "1.11.3";
  /**
   * @param {string} selector
   * @param {string} context
   * @return {?}
   */
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  };
  /** @type {RegExp} */
  var badChars = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  /** @type {RegExp} */
  var rmsPrefix = /^-ms-/;
  /** @type {RegExp} */
  var emptyParagraphRegexp = /-([\da-z])/gi;
  /**
   * @param {?} all
   * @param {string} letter
   * @return {?}
   */
  var fcamelCase = function(all, letter) {
    return letter.toUpperCase();
  };
  jQuery.fn = jQuery.prototype = {
    jquery : core_version,
    /** @type {function (string, string): ?} */
    constructor : jQuery,
    selector : "",
    length : 0,
    /**
     * @return {?}
     */
    toArray : function() {
      return core_slice.call(this);
    },
    /**
     * @param {string} num
     * @return {?}
     */
    get : function(num) {
      return null != num ? 0 > num ? this[num + this.length] : this[num] : core_slice.call(this);
    },
    /**
     * @param {Array} elems
     * @return {?}
     */
    pushStack : function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      return ret.prevObject = this, ret.context = this.context, ret;
    },
    /**
     * @param {Function} opt_attributes
     * @param {Function} args
     * @return {?}
     */
    each : function(opt_attributes, args) {
      return jQuery.each(this, opt_attributes, args);
    },
    /**
     * @param {Function} callback
     * @return {?}
     */
    map : function(callback) {
      return this.pushStack(jQuery.map(this, function(el, operation) {
        return callback.call(el, operation, el);
      }));
    },
    /**
     * @return {?}
     */
    slice : function() {
      return this.pushStack(core_slice.apply(this, arguments));
    },
    /**
     * @return {?}
     */
    first : function() {
      return this.eq(0);
    },
    /**
     * @return {?}
     */
    last : function() {
      return this.eq(-1);
    },
    /**
     * @param {number} value
     * @return {?}
     */
    eq : function(value) {
      var l = this.length;
      var i = +value + (0 > value ? l : 0);
      return this.pushStack(i >= 0 && l > i ? [this[i]] : []);
    },
    /**
     * @return {?}
     */
    end : function() {
      return this.prevObject || this.constructor(null);
    },
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    push : core_push,
    /** @type {function (this:(Array.<T>|{length: number}), function (T, T): number=): ?} */
    sort : core_deletedIds.sort,
    /** @type {function (this:(Array.<T>|{length: number}), *=, *=, ...[T]): Array.<T>} */
    splice : core_deletedIds.splice
  };
  /** @type {function (): ?} */
  jQuery.extend = jQuery.fn.extend = function() {
    var src;
    var copyIsArray;
    var copy;
    var name;
    var options;
    var clone;
    var target = arguments[0] || {};
    /** @type {number} */
    var i = 1;
    /** @type {number} */
    var l = arguments.length;
    /** @type {boolean} */
    var deep = false;
    if ("boolean" == typeof target) {
      /** @type {boolean} */
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (!("object" == typeof target)) {
      if (!jQuery.isFunction(target)) {
        target = {};
      }
    }
    if (i === l) {
      target = this;
      i--;
    }
    for (;l > i;i++) {
      if (null != (options = arguments[i])) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target !== copy) {
            if (deep && (copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))))) {
              if (copyIsArray) {
                /** @type {boolean} */
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              target[name] = jQuery.extend(deep, clone, copy);
            } else {
              if (void 0 !== copy) {
                target[name] = copy;
              }
            }
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    isReady : true,
    /**
     * @param {string} type
     * @return {?}
     */
    error : function(type) {
      throw new Error(type);
    },
    /**
     * @return {undefined}
     */
    noop : function() {
    },
    /**
     * @param {string} obj
     * @return {?}
     */
    isFunction : function(obj) {
      return "function" === jQuery.type(obj);
    },
    /** @type {function (*): boolean} */
    isArray : Array.isArray || function(type) {
      return "array" === jQuery.type(type);
    },
    /**
     * @param {Object} obj
     * @return {?}
     */
    isWindow : function(obj) {
      return null != obj && obj == obj.window;
    },
    /**
     * @param {string} val
     * @return {?}
     */
    isNumeric : function(val) {
      return!jQuery.isArray(val) && val - parseFloat(val) + 1 >= 0;
    },
    /**
     * @param {?} obj
     * @return {?}
     */
    isEmptyObject : function(obj) {
      var prop;
      for (prop in obj) {
        return false;
      }
      return true;
    },
    /**
     * @param {string} obj
     * @return {?}
     */
    isPlainObject : function(obj) {
      var key;
      if (!obj || ("object" !== jQuery.type(obj) || (obj.nodeType || jQuery.isWindow(obj)))) {
        return false;
      }
      try {
        if (obj.constructor && (!core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))) {
          return false;
        }
      } catch (c) {
        return false;
      }
      if (support.ownLast) {
        for (key in obj) {
          return core_hasOwn.call(obj, key);
        }
      }
      for (key in obj) {
      }
      return void 0 === key || core_hasOwn.call(obj, key);
    },
    /**
     * @param {string} type
     * @return {?}
     */
    type : function(type) {
      return null == type ? type + "" : "object" == typeof type || "function" == typeof type ? class2type[core_toString.call(type)] || "object" : typeof type;
    },
    /**
     * @param {?} data
     * @return {undefined}
     */
    globalEval : function(data) {
      if (data) {
        if (jQuery.trim(data)) {
          (win.execScript || function(expr) {
            win.eval.call(win, expr);
          })(data);
        }
      }
    },
    /**
     * @param {string} string
     * @return {?}
     */
    camelCase : function(string) {
      return string.replace(rmsPrefix, "ms-").replace(emptyParagraphRegexp, fcamelCase);
    },
    /**
     * @param {Node} elem
     * @param {string} name
     * @return {?}
     */
    nodeName : function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    /**
     * @param {Function} opt_attributes
     * @param {Function} fn
     * @param {Object} args
     * @return {?}
     */
    each : function(opt_attributes, fn, args) {
      var value;
      /** @type {number} */
      var i = 0;
      var l = opt_attributes.length;
      var isArray = isArraylike(opt_attributes);
      if (args) {
        if (isArray) {
          for (;l > i;i++) {
            if (value = fn.apply(opt_attributes[i], args), value === false) {
              break;
            }
          }
        } else {
          for (i in opt_attributes) {
            if (value = fn.apply(opt_attributes[i], args), value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (;l > i;i++) {
            if (value = fn.call(opt_attributes[i], i, opt_attributes[i]), value === false) {
              break;
            }
          }
        } else {
          for (i in opt_attributes) {
            if (value = fn.call(opt_attributes[i], i, opt_attributes[i]), value === false) {
              break;
            }
          }
        }
      }
      return opt_attributes;
    },
    /**
     * @param {Object} text
     * @return {?}
     */
    trim : function(text) {
      return null == text ? "" : (text + "").replace(badChars, "");
    },
    /**
     * @param {?} arr
     * @param {Array} results
     * @return {?}
     */
    makeArray : function(arr, results) {
      var ret = results || [];
      return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : core_push.call(ret, arr)), ret;
    },
    /**
     * @param {string} elem
     * @param {Array} arr
     * @param {number} i
     * @return {?}
     */
    inArray : function(elem, arr, i) {
      var len;
      if (arr) {
        if (core_indexOf) {
          return core_indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? 0 > i ? Math.max(0, len + i) : i : 0;
        for (;len > i;i++) {
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return-1;
    },
    /**
     * @param {(Function|string)} first
     * @param {?} second
     * @return {?}
     */
    merge : function(first, second) {
      /** @type {number} */
      var jlen = +second.length;
      /** @type {number} */
      var j = 0;
      var i = first.length;
      for (;jlen > j;) {
        first[i++] = second[j++];
      }
      if (jlen !== jlen) {
        for (;void 0 !== second[j];) {
          first[i++] = second[j++];
        }
      }
      return first.length = i, first;
    },
    /**
     * @param {?} elems
     * @param {Function} callback
     * @param {?} inv
     * @return {?}
     */
    grep : function(elems, callback, inv) {
      var val;
      /** @type {Array} */
      var ret = [];
      /** @type {number} */
      var i = 0;
      var l = elems.length;
      /** @type {boolean} */
      var skip = !inv;
      for (;l > i;i++) {
        /** @type {boolean} */
        val = !callback(elems[i], i);
        if (val !== skip) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    /**
     * @param {Object} elems
     * @param {Function} callback
     * @param {string} arg
     * @return {?}
     */
    map : function(elems, callback, arg) {
      var value;
      /** @type {number} */
      var i = 0;
      var l = elems.length;
      var isArray = isArraylike(elems);
      /** @type {Array} */
      var ret = [];
      if (isArray) {
        for (;l > i;i++) {
          value = callback(elems[i], i, arg);
          if (null != value) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (null != value) {
            ret.push(value);
          }
        }
      }
      return core_concat.apply([], ret);
    },
    guid : 1,
    /**
     * @param {Function} fn
     * @param {(Function|string)} context
     * @return {?}
     */
    proxy : function(fn, context) {
      var args;
      var proxy;
      var tmp;
      return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
        return fn.apply(context || this, args.concat(core_slice.call(arguments)));
      }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
    },
    /**
     * @return {?}
     */
    now : function() {
      return+new Date;
    },
    support : support
  });
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(dataAndEvents, m3) {
    class2type["[object " + m3 + "]"] = m3.toLowerCase();
  });
  var Sizzle = function(win) {
    /**
     * @param {string} selector
     * @param {Object} context
     * @param {Array} results
     * @param {?} seed
     * @return {?}
     */
    function Sizzle(selector, context, results, seed) {
      var match;
      var elem;
      var m;
      var type;
      var i;
      var groups;
      var old;
      var nid;
      var newContext;
      var newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== doc && setDocument(context), context = context || doc, results = results || [], type = context.nodeType, "string" != typeof selector || (!selector || 1 !== type && (9 !== type && 11 !== type))) {
        return results;
      }
      if (!seed && documentIsHTML) {
        if (11 !== type && (match = rquickExpr.exec(selector))) {
          if (m = match[1]) {
            if (9 === type) {
              if (elem = context.getElementById(m), !elem || !elem.parentNode) {
                return results;
              }
              if (elem.id === m) {
                return results.push(elem), results;
              }
            } else {
              if (context.ownerDocument && ((elem = context.ownerDocument.getElementById(m)) && (contains(context, elem) && elem.id === m))) {
                return results.push(elem), results;
              }
            }
          } else {
            if (match[2]) {
              return push.apply(results, context.getElementsByTagName(selector)), results;
            }
            if ((m = match[3]) && support.getElementsByClassName) {
              return push.apply(results, context.getElementsByClassName(m)), results;
            }
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          if (nid = old = expando, newContext = context, newSelector = 1 !== type && selector, 1 === type && "object" !== context.nodeName.toLowerCase()) {
            groups = tokenize(selector);
            if (old = context.getAttribute("id")) {
              nid = old.replace(r20, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            /** @type {string} */
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            for (;i--;) {
              /** @type {string} */
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              return push.apply(results, newContext.querySelectorAll(newSelector)), results;
            } catch (y) {
            } finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * @return {?}
     */
    function createCache() {
      /**
       * @param {string} key
       * @param {?} value
       * @return {?}
       */
      function cache(key, value) {
        return buf.push(key + " ") > Expr.cacheLength && delete cache[buf.shift()], cache[key + " "] = value;
      }
      /** @type {Array} */
      var buf = [];
      return cache;
    }
    /**
     * @param {Function} fn
     * @return {?}
     */
    function markFunction(fn) {
      return fn[expando] = true, fn;
    }
    /**
     * @param {Function} fn
     * @return {?}
     */
    function assert(fn) {
      var t = doc.createElement("div");
      try {
        return!!fn(t);
      } catch (c) {
        return false;
      } finally {
        if (t.parentNode) {
          t.parentNode.removeChild(t);
        }
        /** @type {null} */
        t = null;
      }
    }
    /**
     * @param {string} attrs
     * @param {Function} handler
     * @return {undefined}
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|");
      var i = attrs.length;
      for (;i--;) {
        /** @type {Function} */
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    function siblingCheck(a, b) {
      var cur = b && a;
      var diff = cur && (1 === a.nodeType && (1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE)));
      if (diff) {
        return diff;
      }
      if (cur) {
        for (;cur = cur.nextSibling;) {
          if (cur === b) {
            return-1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    function createInputPseudo(type) {
      return function(elem) {
        var b = elem.nodeName.toLowerCase();
        return "input" === b && elem.type === type;
      };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    function createButtonPseudo(type) {
      return function(elem) {
        var NULL = elem.nodeName.toLowerCase();
        return("input" === NULL || "button" === NULL) && elem.type === type;
      };
    }
    /**
     * @param {Function} fn
     * @return {?}
     */
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        return argument = +argument, markFunction(function(seed, matches) {
          var j;
          var matchIndexes = fn([], seed.length, argument);
          var i = matchIndexes.length;
          for (;i--;) {
            if (seed[j = matchIndexes[i]]) {
              /** @type {boolean} */
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * @param {Object} context
     * @return {?}
     */
    function testContext(context) {
      return context && ("undefined" != typeof context.getElementsByTagName && context);
    }
    /**
     * @return {undefined}
     */
    function setFilters() {
    }
    /**
     * @param {Array} tokens
     * @return {?}
     */
    function toSelector(tokens) {
      /** @type {number} */
      var i = 0;
      var nTokens = tokens.length;
      /** @type {string} */
      var selector = "";
      for (;nTokens > i;i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    /**
     * @param {Function} matcher
     * @param {Object} combinator
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function addCombinator(matcher, combinator, dataAndEvents) {
      var dir = combinator.dir;
      var e = dataAndEvents && "parentNode" === dir;
      /** @type {number} */
      var doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        for (;elem = elem[dir];) {
          if (1 === elem.nodeType || e) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache;
        var outerCache;
        /** @type {Array} */
        var newCache = [dirruns, doneName];
        if (xml) {
          for (;elem = elem[dir];) {
            if ((1 === elem.nodeType || e) && matcher(elem, context, xml)) {
              return true;
            }
          }
        } else {
          for (;elem = elem[dir];) {
            if (1 === elem.nodeType || e) {
              if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && (oldCache[0] === dirruns && oldCache[1] === doneName)) {
                return newCache[2] = oldCache[2];
              }
              if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        }
      };
    }
    /**
     * @param {Array} matchers
     * @return {?}
     */
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        for (;i--;) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    /**
     * @param {string} selector
     * @param {Array} contexts
     * @param {?} results
     * @return {?}
     */
    function multipleContexts(selector, contexts, results) {
      /** @type {number} */
      var i = 0;
      var len = contexts.length;
      for (;len > i;i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    /**
     * @param {Array} unmatched
     * @param {Object} map
     * @param {string} filter
     * @param {Object} context
     * @param {Object} xml
     * @return {?}
     */
    function condense(unmatched, map, filter, context, xml) {
      var elem;
      /** @type {Array} */
      var newUnmatched = [];
      /** @type {number} */
      var i = 0;
      var len = unmatched.length;
      /** @type {boolean} */
      var change = null != map;
      for (;len > i;i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (change) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    /**
     * @param {string} preFilter
     * @param {Object} selector
     * @param {boolean} matcher
     * @param {Object} postFilter
     * @param {Object} postFinder
     * @param {Object} postSelector
     * @return {?}
     */
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      return postFilter && (!postFilter[expando] && (postFilter = setMatcher(postFilter))), postFinder && (!postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector))), markFunction(function(seed, results, context, xml) {
        var fix;
        var i;
        var elem;
        /** @type {Array} */
        var preMap = [];
        /** @type {Array} */
        var postMap = [];
        var preexisting = results.length;
        var elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []);
        var matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml);
        var matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) {
          fix = condense(matcherOut, postMap);
          postFilter(fix, [], context, xml);
          i = fix.length;
          for (;i--;) {
            if (elem = fix[i]) {
              /** @type {boolean} */
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              /** @type {Array} */
              fix = [];
              i = matcherOut.length;
              for (;i--;) {
                if (elem = matcherOut[i]) {
                  fix.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], fix, xml);
            }
            i = matcherOut.length;
            for (;i--;) {
              if (elem = matcherOut[i]) {
                if ((fix = postFinder ? sortFunction(seed, elem) : preMap[i]) > -1) {
                  /** @type {boolean} */
                  seed[fix] = !(results[fix] = elem);
                }
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    /**
     * @param {Object} tokens
     * @return {?}
     */
    function matcherFromTokens(tokens) {
      var a;
      var matcher;
      var j;
      var len = tokens.length;
      var leadingRelative = Expr.relative[tokens[0].type];
      var implicitRelative = leadingRelative || Expr.relative[" "];
      /** @type {number} */
      var i = leadingRelative ? 1 : 0;
      var matchContext = addCombinator(function(out) {
        return out === a;
      }, implicitRelative, true);
      var matchAnyContext = addCombinator(function(walkers) {
        return sortFunction(a, walkers) > -1;
      }, implicitRelative, true);
      /** @type {Array} */
      var matchers = [function(elem, context, xml) {
        var e = !leadingRelative && (xml || context !== outermostContext) || ((a = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        return a = null, e;
      }];
      for (;len > i;i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          /** @type {Array} */
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            /** @type {number} */
            j = ++i;
            for (;len > j;j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value : " " === tokens[i - 2].type ? "*" : ""
            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    /**
     * @param {Array} elementMatchers
     * @param {Array} setMatchers
     * @return {?}
     */
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      /** @type {boolean} */
      var bySet = setMatchers.length > 0;
      /** @type {boolean} */
      var triggerElem = elementMatchers.length > 0;
      /**
       * @param {HTMLElement} dataAndEvents
       * @param {Function} context
       * @param {?} xml
       * @param {Array} results
       * @param {Element} seed
       * @return {?}
       */
      var superMatcher = function(dataAndEvents, context, xml, results, seed) {
        var elem;
        var j;
        var matcher;
        /** @type {number} */
        var matchedCount = 0;
        /** @type {string} */
        var i = "0";
        var unmatched = dataAndEvents && [];
        /** @type {Array} */
        var setMatched = [];
        var contextBackup = outermostContext;
        var elems = dataAndEvents || triggerElem && Expr.find.TAG("*", seed);
        var dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || 0.1;
        var len = elems.length;
        if (seed) {
          outermostContext = context !== doc && context;
        }
        for (;i !== len && null != (elem = elems[i]);i++) {
          if (triggerElem && elem) {
            /** @type {number} */
            j = 0;
            for (;matcher = elementMatchers[j++];) {
              if (matcher(elem, context, xml)) {
                results.push(elem);
                break;
              }
            }
            if (seed) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (dataAndEvents) {
              unmatched.push(elem);
            }
          }
        }
        if (matchedCount += i, bySet && i !== matchedCount) {
          /** @type {number} */
          j = 0;
          for (;matcher = setMatchers[j++];) {
            matcher(unmatched, setMatched, context, xml);
          }
          if (dataAndEvents) {
            if (matchedCount > 0) {
              for (;i--;) {
                if (!unmatched[i]) {
                  if (!setMatched[i]) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
            }
            setMatched = condense(setMatched);
          }
          push.apply(results, setMatched);
          if (seed) {
            if (!dataAndEvents) {
              if (setMatched.length > 0) {
                if (matchedCount + setMatchers.length > 1) {
                  Sizzle.uniqueSort(results);
                }
              }
            }
          }
        }
        return seed && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    var i;
    var support;
    var Expr;
    var getText;
    var objectToString;
    var tokenize;
    var compile;
    var select;
    var outermostContext;
    var sortInput;
    var l;
    var setDocument;
    var doc;
    var docElem;
    var documentIsHTML;
    var rbuggyQSA;
    var rbuggyMatches;
    var matches;
    var contains;
    /** @type {string} */
    var expando = "sizzle" + 1 * new Date;
    var preferredDoc = win.document;
    /** @type {number} */
    var dirruns = 0;
    /** @type {number} */
    var done = 0;
    var classCache = createCache();
    var tokenCache = createCache();
    var compilerCache = createCache();
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    var sortOrder = function(a, b) {
      return a === b && (l = true), 0;
    };
    /** @type {number} */
    var MAX_NEGATIVE = 1 << 31;
    /** @type {function (this:Object, *): boolean} */
    var hasOwn = {}.hasOwnProperty;
    /** @type {Array} */
    var arr = [];
    /** @type {function (this:(Array.<T>|{length: number})): T} */
    var pop = arr.pop;
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    var push_native = arr.push;
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    var push = arr.push;
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var slice = arr.slice;
    /**
     * @param {Object} a
     * @param {?} obj
     * @return {?}
     */
    var sortFunction = function(a, obj) {
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        if (a[i] === obj) {
          return i;
        }
      }
      return-1;
    };
    /** @type {string} */
    var booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
    /** @type {string} */
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    /** @type {string} */
    var characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+";
    /** @type {string} */
    var identifier = characterEncoding.replace("w", "w#");
    /** @type {string} */
    var attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]";
    /** @type {string} */
    var pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)";
    /** @type {RegExp} */
    var regexp = new RegExp(whitespace + "+", "g");
    /** @type {RegExp} */
    var rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
    /** @type {RegExp} */
    var rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*");
    /** @type {RegExp} */
    var rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*");
    /** @type {RegExp} */
    var rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g");
    /** @type {RegExp} */
    var rpseudo = new RegExp(pseudos);
    /** @type {RegExp} */
    var ridentifier = new RegExp("^" + identifier + "$");
    var matchExpr = {
      ID : new RegExp("^#(" + characterEncoding + ")"),
      CLASS : new RegExp("^\\.(" + characterEncoding + ")"),
      TAG : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
      ATTR : new RegExp("^" + attributes),
      PSEUDO : new RegExp("^" + pseudos),
      CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      bool : new RegExp("^(?:" + booleans + ")$", "i"),
      needsContext : new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    };
    /** @type {RegExp} */
    var rinputs = /^(?:input|select|textarea|button)$/i;
    /** @type {RegExp} */
    var rheader = /^h\d$/i;
    /** @type {RegExp} */
    var rnative = /^[^{]+\{\s*\[native \w/;
    /** @type {RegExp} */
    var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    /** @type {RegExp} */
    var rsibling = /[+~]/;
    /** @type {RegExp} */
    var r20 = /'|\\/g;
    /** @type {RegExp} */
    var runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig");
    /**
     * @param {?} _
     * @param {(number|string)} escaped
     * @param {boolean} escapedWhitespace
     * @return {?}
     */
    var funescape = function(_, escaped, escapedWhitespace) {
      /** @type {number} */
      var high = "0x" + escaped - 65536;
      return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
    };
    /**
     * @return {undefined}
     */
    var onComplete = function() {
      setDocument();
    };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (fa) {
      push = {
        /** @type {function (?, ?): undefined} */
        apply : arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, a) {
          var j = target.length;
          /** @type {number} */
          var ia = 0;
          for (;target[j++] = a[ia++];) {
          }
          /** @type {number} */
          target.length = j - 1;
        }
      };
    }
    support = Sizzle.support = {};
    /** @type {function (Object): ?} */
    objectToString = Sizzle.isXML = function(elem) {
      var node = elem && (elem.ownerDocument || elem).documentElement;
      return node ? "HTML" !== node.nodeName : false;
    };
    /** @type {function (boolean): ?} */
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare;
      var parent;
      var d = node ? node.ownerDocument || node : preferredDoc;
      return d !== doc && (9 === d.nodeType && d.documentElement) ? (doc = d, docElem = d.documentElement, parent = d.defaultView, parent && (parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", onComplete, false) : parent.attachEvent && parent.attachEvent("onunload", onComplete))), documentIsHTML = !objectToString(d), support.attributes = assert(function(div) {
        return div.className = "i", !div.getAttribute("className");
      }), support.getElementsByTagName = assert(function(div) {
        return div.appendChild(d.createComment("")), !div.getElementsByTagName("*").length;
      }), support.getElementsByClassName = rnative.test(d.getElementsByClassName), support.getById = assert(function(div) {
        return docElem.appendChild(div).id = expando, !d.getElementsByName || !d.getElementsByName(expando).length;
      }), support.getById ? (Expr.find.ID = function(id, context) {
        if ("undefined" != typeof context.getElementById && documentIsHTML) {
          var m = context.getElementById(id);
          return m && m.parentNode ? [m] : [];
        }
      }, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(elem) {
          return elem.getAttribute("id") === attrId;
        };
      }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(elem) {
          var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
          return node && node.value === attrId;
        };
      }), Expr.find.TAG = support.getElementsByTagName ? function(selector, el) {
        return "undefined" != typeof el.getElementsByTagName ? el.getElementsByTagName(selector) : support.qsa ? el.querySelectorAll(selector) : void 0;
      } : function(tag, from) {
        var elem;
        /** @type {Array} */
        var results = [];
        /** @type {number} */
        var ri = 0;
        var tmp = from.getElementsByTagName(tag);
        if ("*" === tag) {
          for (;elem = tmp[ri++];) {
            if (1 === elem.nodeType) {
              results.push(elem);
            }
          }
          return results;
        }
        return tmp;
      }, Expr.find.CLASS = support.getElementsByClassName && function(m, c) {
        return documentIsHTML ? c.getElementsByClassName(m) : void 0;
      }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(d.querySelectorAll)) && (assert(function(div) {
        /** @type {string} */
        docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>";
        if (div.querySelectorAll("[msallowcapture^='']").length) {
          rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
        }
        if (!div.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
        }
        if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
          rbuggyQSA.push("~=");
        }
        if (!div.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }
        if (!div.querySelectorAll("a#" + expando + "+*").length) {
          rbuggyQSA.push(".#.+[+~]");
        }
      }), assert(function(div) {
        var input = d.createElement("input");
        input.setAttribute("type", "hidden");
        div.appendChild(input).setAttribute("name", "D");
        if (div.querySelectorAll("[name=d]").length) {
          rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
        }
        if (!div.querySelectorAll(":enabled").length) {
          rbuggyQSA.push(":enabled", ":disabled");
        }
        div.querySelectorAll("*,:x");
        rbuggyQSA.push(",.*:");
      })), (support.matchesSelector = rnative.test(matches = docElem.matches || (docElem.webkitMatchesSelector || (docElem.mozMatchesSelector || (docElem.oMatchesSelector || docElem.msMatchesSelector))))) && assert(function(div) {
        support.disconnectedMatch = matches.call(div, "div");
        matches.call(div, "[s!='']:x");
        rbuggyMatches.push("!=", pseudos);
      }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = 9 === a.nodeType ? a.documentElement : a;
        var bup = b && b.parentNode;
        return a === bup || !(!bup || (1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup))));
      } : function(a, b) {
        if (b) {
          for (;b = b.parentNode;) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      }, sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          return l = true, 0;
        }
        /** @type {number} */
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === d || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === d || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? sortFunction(sortInput, a) - sortFunction(sortInput, b) : 0 : 4 & compare ? -1 : 1);
      } : function(a, b) {
        if (a === b) {
          return l = true, 0;
        }
        var cur;
        /** @type {number} */
        var i = 0;
        var aup = a.parentNode;
        var bup = b.parentNode;
        /** @type {Array} */
        var ap = [a];
        /** @type {Array} */
        var bp = [b];
        if (!aup || !bup) {
          return a === d ? -1 : b === d ? 1 : aup ? -1 : bup ? 1 : sortInput ? sortFunction(sortInput, a) - sortFunction(sortInput, b) : 0;
        }
        if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        for (;cur = cur.parentNode;) {
          ap.unshift(cur);
        }
        cur = b;
        for (;cur = cur.parentNode;) {
          bp.unshift(cur);
        }
        for (;ap[i] === bp[i];) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      }, d) : doc;
    };
    /**
     * @param {?} expr
     * @param {string} set
     * @return {?}
     */
    Sizzle.matches = function(expr, set) {
      return Sizzle(expr, null, null, set);
    };
    /**
     * @param {?} elem
     * @param {string} expr
     * @return {?}
     */
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== doc && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || (!documentIsHTML || (rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || (support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType)) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, doc, null, [elem]).length > 0;
    };
    /**
     * @param {Object} context
     * @param {?} b
     * @return {?}
     */
    Sizzle.contains = function(context, b) {
      return(context.ownerDocument || context) !== doc && setDocument(context), contains(context, b);
    };
    /**
     * @param {string} elem
     * @param {Object} name
     * @return {?}
     */
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== doc) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()];
      var val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    /**
     * @param {string} type
     * @return {?}
     */
    Sizzle.error = function(type) {
      throw new Error("Syntax error, unrecognized expression: " + type);
    };
    /**
     * @param {Array} results
     * @return {?}
     */
    Sizzle.uniqueSort = function(results) {
      var elem;
      /** @type {Array} */
      var duplicates = [];
      /** @type {number} */
      var j = 0;
      /** @type {number} */
      var i = 0;
      if (l = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), l) {
        for (;elem = results[i++];) {
          if (elem === results[i]) {
            /** @type {number} */
            j = duplicates.push(i);
          }
        }
        for (;j--;) {
          results.splice(duplicates[j], 1);
        }
      }
      return sortInput = null, results;
    };
    /** @type {function (string): ?} */
    getText = Sizzle.getText = function(a) {
      var node;
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      var ia = 0;
      var type = a.nodeType;
      if (type) {
        if (1 === type || (9 === type || 11 === type)) {
          if ("string" == typeof a.textContent) {
            return a.textContent;
          }
          a = a.firstChild;
          for (;a;a = a.nextSibling) {
            ret += getText(a);
          }
        } else {
          if (3 === type || 4 === type) {
            return a.nodeValue;
          }
        }
      } else {
        for (;node = a[ia++];) {
          ret += getText(node);
        }
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength : 50,
      /** @type {function (Function): ?} */
      createPseudo : markFunction,
      match : matchExpr,
      attrHandle : {},
      find : {},
      relative : {
        ">" : {
          dir : "parentNode",
          first : true
        },
        " " : {
          dir : "parentNode"
        },
        "+" : {
          dir : "previousSibling",
          first : true
        },
        "~" : {
          dir : "previousSibling"
        }
      },
      preFilter : {
        /**
         * @param {Array} match
         * @return {?}
         */
        ATTR : function(match) {
          return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || (match[4] || (match[5] || ""))).replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
        },
        /**
         * @param {Array} match
         * @return {?}
         */
        CHILD : function(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match;
        },
        /**
         * @param {Array} match
         * @return {?}
         */
        PSEUDO : function(match) {
          var excess;
          var unquoted = !match[6] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || (match[5] || "") : unquoted && (rpseudo.test(unquoted) && ((excess = tokenize(unquoted, true)) && ((excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess))))), match.slice(0, 3));
        }
      },
      filter : {
        /**
         * @param {string} nodeNameSelector
         * @return {?}
         */
        TAG : function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return "*" === nodeNameSelector ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        /**
         * @param {string} className
         * @return {?}
         */
        CLASS : function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test("string" == typeof elem.className && elem.className || ("undefined" != typeof elem.getAttribute && elem.getAttribute("class") || ""));
          });
        },
        /**
         * @param {Object} name
         * @param {string} not
         * @param {string} check
         * @return {?}
         */
        ATTR : function(name, not, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            return null == result ? "!=" === not : not ? (result += "", "=" === not ? result === check : "!=" === not ? result !== check : "^=" === not ? check && 0 === result.indexOf(check) : "*=" === not ? check && result.indexOf(check) > -1 : "$=" === not ? check && result.slice(-check.length) === check : "~=" === not ? (" " + result.replace(regexp, " ") + " ").indexOf(check) > -1 : "|=" === not ? result === check || result.slice(0, check.length + 1) === check + "-" : false) : true;
          };
        },
        /**
         * @param {string} type
         * @param {string} argument
         * @param {?} dataAndEvents
         * @param {number} first
         * @param {number} last
         * @return {?}
         */
        CHILD : function(type, argument, dataAndEvents, first, last) {
          /** @type {boolean} */
          var simple = "nth" !== type.slice(0, 3);
          /** @type {boolean} */
          var forward = "last" !== type.slice(-4);
          /** @type {boolean} */
          var value = "of-type" === argument;
          return 1 === first && 0 === last ? function(contestant) {
            return!!contestant.parentNode;
          } : function(elem, dataAndEvents, computed) {
            var cache;
            var outerCache;
            var node;
            var diff;
            var nodeIndex;
            var eventPath;
            /** @type {string} */
            var which = simple !== forward ? "nextSibling" : "previousSibling";
            var parent = elem.parentNode;
            var attrNames = value && elem.nodeName.toLowerCase();
            /** @type {boolean} */
            var useCache = !computed && !value;
            if (parent) {
              if (simple) {
                for (;which;) {
                  /** @type {Node} */
                  node = elem;
                  for (;node = node[which];) {
                    if (value ? node.nodeName.toLowerCase() === attrNames : 1 === node.nodeType) {
                      return false;
                    }
                  }
                  /** @type {(boolean|string)} */
                  eventPath = which = "only" === type && (!eventPath && "nextSibling");
                }
                return true;
              }
              if (eventPath = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                for (;node = ++nodeIndex && (node && node[which]) || ((diff = nodeIndex = 0) || eventPath.pop());) {
                  if (1 === node.nodeType && (++diff && node === elem)) {
                    /** @type {Array} */
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache && ((cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns)) {
                  diff = cache[1];
                } else {
                  for (;node = ++nodeIndex && (node && node[which]) || ((diff = nodeIndex = 0) || eventPath.pop());) {
                    if ((value ? node.nodeName.toLowerCase() === attrNames : 1 === node.nodeType) && (++diff && (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node === elem))) {
                      break;
                    }
                  }
                }
              }
              return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        /**
         * @param {string} pseudo
         * @param {?} context
         * @return {?}
         */
        PSEUDO : function(pseudo, context) {
          var args;
          var fn = Expr.pseudos[pseudo] || (Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo));
          return fn[expando] ? fn(context) : fn.length > 1 ? (args = [pseudo, pseudo, "", context], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(a, cssRules) {
            var i;
            var ret = fn(a, context);
            var len = ret.length;
            for (;len--;) {
              i = sortFunction(a, ret[len]);
              /** @type {boolean} */
              a[i] = !(cssRules[i] = ret[len]);
            }
          }) : function(err) {
            return fn(err, 0, args);
          }) : fn;
        }
      },
      pseudos : {
        not : markFunction(function(selector) {
          /** @type {Array} */
          var elem = [];
          /** @type {Array} */
          var memory = [];
          var matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, qs, dataAndEvents, xml) {
            var val;
            var unmatched = matcher(seed, null, xml, []);
            var i = seed.length;
            for (;i--;) {
              if (val = unmatched[i]) {
                /** @type {boolean} */
                seed[i] = !(qs[i] = val);
              }
            }
          }) : function(value, dataAndEvents, xml) {
            return elem[0] = value, matcher(elem, null, xml, memory), elem[0] = null, !memory.pop();
          };
        }),
        has : markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains : markFunction(function(id) {
          return id = id.replace(runescape, funescape), function(elem) {
            return(elem.textContent || (elem.innerText || getText(elem))).indexOf(id) > -1;
          };
        }),
        lang : markFunction(function(lang) {
          return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
              }
            } while ((elem = elem.parentNode) && 1 === elem.nodeType);
            return false;
          };
        }),
        /**
         * @param {string} type
         * @return {?}
         */
        target : function(type) {
          var models = win.location && win.location.hash;
          return models && models.slice(1) === type.id;
        },
        /**
         * @param {undefined} elem
         * @return {?}
         */
        root : function(elem) {
          return elem === docElem;
        },
        /**
         * @param {string} type
         * @return {?}
         */
        focus : function(type) {
          return type === doc.activeElement && ((!doc.hasFocus || doc.hasFocus()) && !!(type.type || (type.href || ~type.tabIndex)));
        },
        /**
         * @param {EventTarget} a
         * @return {?}
         */
        enabled : function(a) {
          return a.disabled === false;
        },
        /**
         * @param {EventTarget} elem
         * @return {?}
         */
        disabled : function(elem) {
          return elem.disabled === true;
        },
        /**
         * @param {Node} node
         * @return {?}
         */
        checked : function(node) {
          var b = node.nodeName.toLowerCase();
          return "input" === b && !!node.checked || "option" === b && !!node.selected;
        },
        /**
         * @param {Node} elem
         * @return {?}
         */
        selected : function(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === true;
        },
        /**
         * @param {HTMLElement} elem
         * @return {?}
         */
        empty : function(elem) {
          elem = elem.firstChild;
          for (;elem;elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        /**
         * @param {string} elem
         * @return {?}
         */
        parent : function(elem) {
          return!Expr.pseudos.empty(elem);
        },
        /**
         * @param {Node} elem
         * @return {?}
         */
        header : function(elem) {
          return rheader.test(elem.nodeName);
        },
        /**
         * @param {Node} elem
         * @return {?}
         */
        input : function(elem) {
          return rinputs.test(elem.nodeName);
        },
        /**
         * @param {Node} elem
         * @return {?}
         */
        button : function(elem) {
          var b = elem.nodeName.toLowerCase();
          return "input" === b && "button" === elem.type || "button" === b;
        },
        /**
         * @param {string} type
         * @return {?}
         */
        text : function(type) {
          var evt;
          return "input" === type.nodeName.toLowerCase() && ("text" === type.type && (null == (evt = type.getAttribute("type")) || "text" === evt.toLowerCase()));
        },
        first : createPositionalPseudo(function() {
          return[0];
        }),
        last : createPositionalPseudo(function(dataAndEvents, deepDataAndEvents) {
          return[deepDataAndEvents - 1];
        }),
        eq : createPositionalPseudo(function(dataAndEvents, length, index) {
          return[0 > index ? index + length : index];
        }),
        even : createPositionalPseudo(function(assigns, dataAndEvents) {
          /** @type {number} */
          var vvar = 0;
          for (;dataAndEvents > vvar;vvar += 2) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        odd : createPositionalPseudo(function(assigns, dataAndEvents) {
          /** @type {number} */
          var vvar = 1;
          for (;dataAndEvents > vvar;vvar += 2) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        lt : createPositionalPseudo(function(assigns, length, index) {
          var vvar = 0 > index ? index + length : index;
          for (;--vvar >= 0;) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        gt : createPositionalPseudo(function(assigns, length, index) {
          var vvar = 0 > index ? index + length : index;
          for (;++vvar < length;) {
            assigns.push(vvar);
          }
          return assigns;
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    for (i in{
      radio : true,
      checkbox : true,
      file : true,
      password : true,
      image : true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in{
      submit : true,
      reset : true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters;
    /** @type {function (string, boolean): ?} */
    tokenize = Sizzle.tokenize = function(cycle, parseOnly) {
      var matched;
      var match;
      var tokens;
      var type;
      var soFar;
      var groups;
      var preFilters;
      var cached = tokenCache[cycle + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      /** @type {string} */
      soFar = cycle;
      /** @type {Array} */
      groups = [];
      preFilters = Expr.preFilter;
      for (;soFar;) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        /** @type {boolean} */
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          /** @type {string} */
          matched = match.shift();
          tokens.push({
            value : matched,
            type : match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if (!!(match = matchExpr[type].exec(soFar))) {
            if (!(preFilters[type] && !(match = preFilters[type](match)))) {
              matched = match.shift();
              tokens.push({
                value : matched,
                type : type,
                matches : match
              });
              soFar = soFar.slice(matched.length);
            }
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(cycle) : tokenCache(cycle, groups).slice(0);
    };
    return compile = Sizzle.compile = function(selector, group) {
      var i;
      /** @type {Array} */
      var setMatchers = [];
      /** @type {Array} */
      var elementMatchers = [];
      var cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        for (;i--;) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        /** @type {Object} */
        cached.selector = selector;
      }
      return cached;
    }, select = Sizzle.select = function(selector, context, results, cycle) {
      var i;
      var tokens;
      var token;
      var type;
      var find;
      /** @type {(Function|boolean)} */
      var compiled = "function" == typeof selector && selector;
      var match = !cycle && tokenize(selector = compiled.selector || selector);
      if (results = results || [], 1 === match.length) {
        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && ("ID" === (token = tokens[0]).type && (support.getById && (9 === context.nodeType && (documentIsHTML && Expr.relative[tokens[1].type]))))) {
          if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) {
            return results;
          }
          if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        for (;i--;) {
          if (token = tokens[i], Expr.relative[type = token.type]) {
            break;
          }
          if ((find = Expr.find[type]) && (cycle = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
            if (tokens.splice(i, 1), selector = cycle.length && toSelector(tokens), !selector) {
              return push.apply(results, cycle), results;
            }
            break;
          }
        }
      }
      return(compiled || compile(selector, match))(cycle, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), results;
    }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!l, setDocument(), support.sortDetached = assert(function(div1) {
      return 1 & div1.compareDocumentPosition(doc.createElement("div"));
    }), assert(function(div) {
      return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
    }) || addHandle("type|href|height|width", function(elem, name, flag_xml) {
      return flag_xml ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
    }), support.attributes && assert(function(div) {
      return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
    }) || addHandle("value", function(target, dataAndEvents, defaultValue) {
      return defaultValue || "input" !== target.nodeName.toLowerCase() ? void 0 : target.defaultValue;
    }), assert(function(div) {
      return null == div.getAttribute("disabled");
    }) || addHandle(booleans, function(elem, name, dataAndEvents) {
      var val;
      return dataAndEvents ? void 0 : elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    }), Sizzle;
  }(win);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  /** @type {RegExp} */
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  /** @type {RegExp} */
  var reWhitespace = /^.[^:#\[\.,]*$/;
  /**
   * @param {string} type
   * @param {?} obj
   * @param {Object} value
   * @return {?}
   */
  jQuery.filter = function(type, obj, value) {
    var elem = obj[0];
    return value && (type = ":not(" + type + ")"), 1 === obj.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, type) ? [elem] : [] : jQuery.find.matches(type, jQuery.grep(obj, function(dest) {
      return 1 === dest.nodeType;
    }));
  };
  jQuery.fn.extend({
    /**
     * @param {string} selector
     * @return {?}
     */
    find : function(selector) {
      var i;
      /** @type {Array} */
      var ret = [];
      var self = this;
      var len = self.length;
      if ("string" != typeof selector) {
        return this.pushStack(jQuery(selector).filter(function() {
          /** @type {number} */
          i = 0;
          for (;len > i;i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      /** @type {number} */
      i = 0;
      for (;len > i;i++) {
        jQuery.find(selector, self[i], ret);
      }
      return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret;
    },
    /**
     * @param {string} type
     * @return {?}
     */
    filter : function(type) {
      return this.pushStack(winnow(this, type || [], false));
    },
    /**
     * @param {Array} selector
     * @return {?}
     */
    not : function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    /**
     * @param {string} selector
     * @return {?}
     */
    is : function(selector) {
      return!!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery;
  var element = win.document;
  /** @type {RegExp} */
  var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  /** @type {function (string, Object): ?} */
  var T = jQuery.fn.init = function(selector, context) {
    var match;
    var elem;
    if (!selector) {
      return this;
    }
    if ("string" == typeof selector) {
      if (match = "<" === selector.charAt(0) && (">" === selector.charAt(selector.length - 1) && selector.length >= 3) ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) {
        return!context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
      }
      if (match[1]) {
        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : element, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
          for (match in context) {
            if (jQuery.isFunction(this[match])) {
              this[match](context[match]);
            } else {
              this.attr(match, context[match]);
            }
          }
        }
        return this;
      }
      if (elem = element.getElementById(match[2]), elem && elem.parentNode) {
        if (elem.id !== match[2]) {
          return rootjQuery.find(selector);
        }
        /** @type {number} */
        this.length = 1;
        this[0] = elem;
      }
      return this.context = element, this.selector = selector, this;
    }
    return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
  };
  T.prototype = jQuery.fn;
  rootjQuery = jQuery(element);
  /** @type {RegExp} */
  var rparentsprev = /^(?:parents|prev(?:Until|All))/;
  var guaranteedUnique = {
    children : true,
    contents : true,
    next : true,
    prev : true
  };
  jQuery.extend({
    /**
     * @param {Object} elem
     * @param {string} dir
     * @param {number} until
     * @return {?}
     */
    dir : function(elem, dir, until) {
      /** @type {Array} */
      var matched = [];
      var scripts = elem[dir];
      for (;scripts && (9 !== scripts.nodeType && (void 0 === until || (1 !== scripts.nodeType || !jQuery(scripts).is(until))));) {
        if (1 === scripts.nodeType) {
          matched.push(scripts);
        }
        scripts = scripts[dir];
      }
      return matched;
    },
    /**
     * @param {Object} n
     * @param {Object} elem
     * @return {?}
     */
    sibling : function(n, elem) {
      /** @type {Array} */
      var r = [];
      for (;n;n = n.nextSibling) {
        if (1 === n.nodeType) {
          if (n !== elem) {
            r.push(n);
          }
        }
      }
      return r;
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} scripts
     * @return {?}
     */
    has : function(scripts) {
      var i;
      var targets = jQuery(scripts, this);
      var l = targets.length;
      return this.filter(function() {
        /** @type {number} */
        i = 0;
        for (;l > i;i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    /**
     * @param {string} selectors
     * @param {Object} context
     * @return {?}
     */
    closest : function(selectors, context) {
      var cur;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      /** @type {Array} */
      var matched = [];
      var pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0;
      for (;l > i;i++) {
        cur = this[i];
        for (;cur && cur !== context;cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    /**
     * @param {string} elem
     * @return {?}
     */
    index : function(elem) {
      return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    /**
     * @param {string} selector
     * @param {string} options
     * @return {?}
     */
    add : function(selector, options) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, options))));
    },
    /**
     * @param {string} cycle
     * @return {?}
     */
    addBack : function(cycle) {
      return this.add(null == cycle ? this.prevObject : this.prevObject.filter(cycle));
    }
  });
  jQuery.each({
    /**
     * @param {Node} elem
     * @return {?}
     */
    parent : function(elem) {
      var parent = elem.parentNode;
      return parent && 11 !== parent.nodeType ? parent : null;
    },
    /**
     * @param {string} elem
     * @return {?}
     */
    parents : function(elem) {
      return jQuery.dir(elem, "parentNode");
    },
    /**
     * @param {Object} elem
     * @param {string} i
     * @param {number} until
     * @return {?}
     */
    parentsUntil : function(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until);
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    next : function(elem) {
      return sibling(elem, "nextSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    prev : function(elem) {
      return sibling(elem, "previousSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    nextAll : function(elem) {
      return jQuery.dir(elem, "nextSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    prevAll : function(elem) {
      return jQuery.dir(elem, "previousSibling");
    },
    /**
     * @param {Object} elem
     * @param {?} i
     * @param {number} until
     * @return {?}
     */
    nextUntil : function(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until);
    },
    /**
     * @param {Object} elem
     * @param {?} i
     * @param {number} until
     * @return {?}
     */
    prevUntil : function(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until);
    },
    /**
     * @param {HTMLElement} elem
     * @return {?}
     */
    siblings : function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    /**
     * @param {Node} elem
     * @return {?}
     */
    children : function(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    /**
     * @param {Element} elem
     * @return {?}
     */
    contents : function(elem) {
      return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    /**
     * @param {string} until
     * @param {string} cycle
     * @return {?}
     */
    jQuery.fn[name] = function(until, cycle) {
      var ret = jQuery.map(this, fn, until);
      return "Until" !== name.slice(-5) && (cycle = until), cycle && ("string" == typeof cycle && (ret = jQuery.filter(cycle, ret))), this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), this.pushStack(ret);
    };
  });
  /** @type {RegExp} */
  var core_rnotwhite = /\S+/g;
  var optionsCache = {};
  /**
   * @param {Object} options
   * @return {?}
   */
  jQuery.Callbacks = function(options) {
    options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var r;
    var memory;
    var d;
    var i;
    var firingIndex;
    var firingStart;
    /** @type {Array} */
    var list = [];
    /** @type {(Array|boolean)} */
    var stack = !options.once && [];
    /**
     * @param {Array} data
     * @return {undefined}
     */
    var fire = function(data) {
      memory = options.memory && data;
      /** @type {boolean} */
      d = true;
      firingIndex = firingStart || 0;
      /** @type {number} */
      firingStart = 0;
      i = list.length;
      /** @type {boolean} */
      r = true;
      for (;list && i > firingIndex;firingIndex++) {
        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
          /** @type {boolean} */
          memory = false;
          break;
        }
      }
      /** @type {boolean} */
      r = false;
      if (list) {
        if (stack) {
          if (stack.length) {
            fire(stack.shift());
          }
        } else {
          if (memory) {
            /** @type {Array} */
            list = [];
          } else {
            self.disable();
          }
        }
      }
    };
    var self = {
      /**
       * @return {?}
       */
      add : function() {
        if (list) {
          var start = list.length;
          !function add(attributes) {
            jQuery.each(attributes, function(dataAndEvents, cycle) {
              var type = jQuery.type(cycle);
              if ("function" === type) {
                if (!(options.unique && self.has(cycle))) {
                  list.push(cycle);
                }
              } else {
                if (cycle) {
                  if (cycle.length) {
                    if ("string" !== type) {
                      add(cycle);
                    }
                  }
                }
              }
            });
          }(arguments);
          if (r) {
            i = list.length;
          } else {
            if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
        }
        return this;
      },
      /**
       * @return {?}
       */
      remove : function() {
        return list && jQuery.each(arguments, function(dataAndEvents, arg) {
          var index;
          for (;(index = jQuery.inArray(arg, list, index)) > -1;) {
            list.splice(index, 1);
            if (r) {
              if (i >= index) {
                i--;
              }
              if (firingIndex >= index) {
                firingIndex--;
              }
            }
          }
        }), this;
      },
      /**
       * @param {string} fn
       * @return {?}
       */
      has : function(fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
      },
      /**
       * @return {?}
       */
      empty : function() {
        return list = [], i = 0, this;
      },
      /**
       * @return {?}
       */
      disable : function() {
        return list = stack = memory = void 0, this;
      },
      /**
       * @return {?}
       */
      disabled : function() {
        return!list;
      },
      /**
       * @return {?}
       */
      lock : function() {
        return stack = void 0, memory || self.disable(), this;
      },
      /**
       * @return {?}
       */
      locked : function() {
        return!stack;
      },
      /**
       * @param {?} context
       * @param {Array} args
       * @return {?}
       */
      fireWith : function(context, args) {
        return!list || (d && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], r ? stack.push(args) : fire(args))), this;
      },
      /**
       * @return {?}
       */
      fire : function() {
        return self.fireWith(this, arguments), this;
      },
      /**
       * @return {?}
       */
      fired : function() {
        return!!d;
      }
    };
    return self;
  };
  jQuery.extend({
    /**
     * @param {Function} func
     * @return {?}
     */
    Deferred : function(func) {
      /** @type {Array} */
      var attributes = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]];
      /** @type {string} */
      var state = "pending";
      var promise = {
        /**
         * @return {?}
         */
        state : function() {
          return state;
        },
        /**
         * @return {?}
         */
        always : function() {
          return deferred.done(arguments).fail(arguments), this;
        },
        /**
         * @return {?}
         */
        then : function() {
          /** @type {Arguments} */
          var fns = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(attributes, function(i, tuple) {
              var fn = jQuery.isFunction(fns[i]) && fns[i];
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                } else {
                  newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                }
              });
            });
            /** @type {null} */
            fns = null;
          }).promise();
        },
        /**
         * @param {string} obj
         * @return {?}
         */
        promise : function(obj) {
          return null != obj ? jQuery.extend(obj, promise) : promise;
        }
      };
      var deferred = {};
      return promise.pipe = promise.then, jQuery.each(attributes, function(dataAndEvents, tuple) {
        var list = tuple[2];
        var stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, attributes[1 ^ dataAndEvents][2].disable, attributes[2][2].lock);
        }
        /**
         * @return {?}
         */
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    /**
     * @param {Object} subordinate
     * @return {?}
     */
    when : function(subordinate) {
      /** @type {number} */
      var i = 0;
      /** @type {Array.<?>} */
      var resolveValues = core_slice.call(arguments);
      /** @type {number} */
      var length = resolveValues.length;
      /** @type {number} */
      var remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0;
      var deferred = 1 === remaining ? subordinate : jQuery.Deferred();
      /**
       * @param {number} i
       * @param {(Array|NodeList)} contexts
       * @param {Array} values
       * @return {?}
       */
      var updateFunc = function(i, contexts, values) {
        return function(value) {
          contexts[i] = this;
          values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
          if (values === progressValues) {
            deferred.notifyWith(contexts, values);
          } else {
            if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          }
        };
      };
      var progressValues;
      var progressContexts;
      var resolveContexts;
      if (length > 1) {
        /** @type {Array} */
        progressValues = new Array(length);
        /** @type {Array} */
        progressContexts = new Array(length);
        /** @type {Array} */
        resolveContexts = new Array(length);
        for (;length > i;i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
    }
  });
  var readyList;
  /**
   * @param {string} cycle
   * @return {?}
   */
  jQuery.fn.ready = function(cycle) {
    return jQuery.ready.promise().done(cycle), this;
  };
  jQuery.extend({
    isReady : false,
    readyWait : 1,
    /**
     * @param {?} hold
     * @return {undefined}
     */
    holdReady : function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    /**
     * @param {boolean} wait
     * @return {?}
     */
    ready : function(wait) {
      if (wait === true ? !--jQuery.readyWait : !jQuery.isReady) {
        if (!element.body) {
          return setTimeout(jQuery.ready);
        }
        /** @type {boolean} */
        jQuery.isReady = true;
        if (!(wait !== true && --jQuery.readyWait > 0)) {
          readyList.resolveWith(element, [jQuery]);
          if (jQuery.fn.triggerHandler) {
            jQuery(element).triggerHandler("ready");
            jQuery(element).off("ready");
          }
        }
      }
    }
  });
  /**
   * @param {string} obj
   * @return {?}
   */
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      if (readyList = jQuery.Deferred(), "complete" === element.readyState) {
        setTimeout(jQuery.ready);
      } else {
        if (element.addEventListener) {
          element.addEventListener("DOMContentLoaded", init, false);
          win.addEventListener("load", init, false);
        } else {
          element.attachEvent("onreadystatechange", init);
          win.attachEvent("onload", init);
          /** @type {boolean} */
          var t = false;
          try {
            t = null == win.frameElement && element.documentElement;
          } catch (d) {
          }
          if (t) {
            if (t.doScroll) {
              !function doScrollCheck() {
                if (!jQuery.isReady) {
                  try {
                    t.doScroll("left");
                  } catch (a) {
                    return setTimeout(doScrollCheck, 50);
                  }
                  domReady();
                  jQuery.ready();
                }
              }();
            }
          }
        }
      }
    }
    return readyList.promise(obj);
  };
  /** @type {string} */
  var text = "undefined";
  var i;
  for (i in jQuery(support)) {
    break;
  }
  /** @type {boolean} */
  support.ownLast = "0" !== i;
  /** @type {boolean} */
  support.inlineBlockNeedsLayout = false;
  jQuery(function() {
    var xhrSupported;
    var div;
    var body;
    var container;
    body = element.getElementsByTagName("body")[0];
    if (body) {
      if (body.style) {
        div = element.createElement("div");
        container = element.createElement("div");
        /** @type {string} */
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);
        if (typeof div.style.zoom !== text) {
          /** @type {string} */
          div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
          /** @type {boolean} */
          support.inlineBlockNeedsLayout = xhrSupported = 3 === div.offsetWidth;
          if (xhrSupported) {
            /** @type {number} */
            body.style.zoom = 1;
          }
        }
        body.removeChild(container);
      }
    }
  });
  (function() {
    var closer = element.createElement("div");
    if (null == support.deleteExpando) {
      /** @type {boolean} */
      support.deleteExpando = true;
      try {
        delete closer.test;
      } catch (b) {
        /** @type {boolean} */
        support.deleteExpando = false;
      }
    }
    /** @type {null} */
    closer = null;
  })();
  /**
   * @param {Node} elem
   * @return {?}
   */
  jQuery.acceptData = function(elem) {
    var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()];
    /** @type {number} */
    var code = +elem.nodeType || 1;
    return 1 !== code && 9 !== code ? false : !noData || noData !== true && elem.getAttribute("classid") === noData;
  };
  /** @type {RegExp} */
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  /** @type {RegExp} */
  var r20 = /([A-Z])/g;
  jQuery.extend({
    cache : {},
    noData : {
      "applet " : true,
      "embed " : true,
      "object " : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    hasData : function(elem) {
      return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !filter(elem);
    },
    /**
     * @param {string} type
     * @param {?} obj
     * @param {Object} value
     * @return {?}
     */
    data : function(type, obj, value) {
      return callback(type, obj, value);
    },
    /**
     * @param {string} key
     * @param {string} name
     * @return {?}
     */
    removeData : function(key, name) {
      return remove(key, name);
    },
    /**
     * @param {?} owner
     * @param {string} data
     * @param {boolean} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    _data : function(owner, data, expectedNumberOfNonCommentArgs) {
      return callback(owner, data, expectedNumberOfNonCommentArgs, true);
    },
    /**
     * @param {string} owner
     * @param {string} name
     * @return {?}
     */
    _removeData : function(owner, name) {
      return remove(owner, name, true);
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @param {?} obj
     * @return {?}
     */
    data : function(type, obj) {
      var len;
      var name;
      var data;
      var elem = this[0];
      var attrs = elem && elem.attributes;
      if (void 0 === type) {
        if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
          len = attrs.length;
          for (;len--;) {
            if (attrs[len]) {
              name = attrs[len].name;
              if (0 === name.indexOf("data-")) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
          }
          jQuery._data(elem, "parsedAttrs", true);
        }
        return data;
      }
      return "object" == typeof type ? this.each(function() {
        jQuery.data(this, type);
      }) : arguments.length > 1 ? this.each(function() {
        jQuery.data(this, type, obj);
      }) : elem ? dataAttr(elem, type, jQuery.data(elem, type)) : void 0;
    },
    /**
     * @param {string} key
     * @return {?}
     */
    removeData : function(key) {
      return this.each(function() {
        jQuery.removeData(this, key);
      });
    }
  });
  jQuery.extend({
    /**
     * @param {Object} elem
     * @param {string} type
     * @param {Object} data
     * @return {?}
     */
    queue : function(elem, type, data) {
      var queue;
      return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0;
    },
    /**
     * @param {string} elem
     * @param {string} type
     * @return {undefined}
     */
    dequeue : function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type);
      var ln = queue.length;
      var fn = queue.shift();
      var hooks = jQuery._queueHooks(elem, type);
      /**
       * @return {undefined}
       */
      var next = function() {
        jQuery.dequeue(elem, type);
      };
      if ("inprogress" === fn) {
        fn = queue.shift();
        ln--;
      }
      if (fn) {
        if ("fx" === type) {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!ln) {
        if (hooks) {
          hooks.empty.fire();
        }
      }
    },
    /**
     * @param {string} elem
     * @param {string} type
     * @return {?}
     */
    _queueHooks : function(elem, type) {
      /** @type {string} */
      var key = type + "queueHooks";
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty : jQuery.Callbacks("once memory").add(function() {
          jQuery._removeData(elem, type + "queue");
          jQuery._removeData(elem, key);
        })
      });
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @param {Object} data
     * @return {?}
     */
    queue : function(type, data) {
      /** @type {number} */
      var setter = 2;
      return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if ("fx" === type) {
          if ("inprogress" !== queue[0]) {
            jQuery.dequeue(this, type);
          }
        }
      });
    },
    /**
     * @param {string} type
     * @return {?}
     */
    dequeue : function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    /**
     * @param {string} type
     * @return {?}
     */
    clearQueue : function(type) {
      return this.queue(type || "fx", []);
    },
    /**
     * @param {string} type
     * @param {string} obj
     * @return {?}
     */
    promise : function(type, obj) {
      var body;
      /** @type {number} */
      var d = 1;
      var defer = jQuery.Deferred();
      var elements = this;
      var i = this.length;
      /**
       * @return {undefined}
       */
      var resolve = function() {
        if (!--d) {
          defer.resolveWith(elements, [elements]);
        }
      };
      if ("string" != typeof type) {
        /** @type {string} */
        obj = type;
        type = void 0;
      }
      type = type || "fx";
      for (;i--;) {
        body = jQuery._data(elements[i], type + "queueHooks");
        if (body) {
          if (body.empty) {
            d++;
            body.empty.add(resolve);
          }
        }
      }
      return resolve(), defer.promise(obj);
    }
  });
  /** @type {string} */
  var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  /** @type {Array} */
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  /**
   * @param {Object} b
   * @param {Function} a
   * @return {?}
   */
  var cycle = function(b, a) {
    return b = a || b, "none" === jQuery.css(b, "display") || !jQuery.contains(b.ownerDocument, b);
  };
  /** @type {function (Object, Function, string, string, boolean, string, boolean): ?} */
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    /** @type {boolean} */
    var bulk = null == key;
    if ("object" === jQuery.type(key)) {
      /** @type {boolean} */
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else {
      if (void 0 !== value && (chainable = true, jQuery.isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(scripts, event, value) {
        return bulk.call(jQuery(scripts), value);
      })), fn)) {
        for (;length > i;i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
  };
  /** @type {RegExp} */
  var manipulation_rcheckableType = /^(?:checkbox|radio)$/i;
  !function() {
    var input = element.createElement("input");
    var div = element.createElement("div");
    var fragment = element.createDocumentFragment();
    if (div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== element.createElement("nav").cloneNode(true).outerHTML, input.type = "checkbox", input.checked = true, fragment.appendChild(input), support.appendChecked = input.checked, div.innerHTML = 
    "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue, fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked, support.noCloneEvent = true, div.attachEvent && (div.attachEvent("onclick", function() {
      /** @type {boolean} */
      support.noCloneEvent = false;
    }), div.cloneNode(true).click()), null == support.deleteExpando) {
      /** @type {boolean} */
      support.deleteExpando = true;
      try {
        delete div.test;
      } catch (d) {
        /** @type {boolean} */
        support.deleteExpando = false;
      }
    }
  }();
  (function() {
    var i;
    var eventName;
    var div = element.createElement("div");
    for (i in{
      submit : true,
      change : true,
      focusin : true
    }) {
      /** @type {string} */
      eventName = "on" + i;
      if (!(support[i + "Bubbles"] = eventName in win)) {
        div.setAttribute(eventName, "t");
        /** @type {boolean} */
        support[i + "Bubbles"] = div.attributes[eventName].expando === false;
      }
    }
    /** @type {null} */
    div = null;
  })();
  /** @type {RegExp} */
  var rformElems = /^(?:input|select|textarea)$/i;
  /** @type {RegExp} */
  var rmouseEvent = /^key/;
  /** @type {RegExp} */
  var rkeyEvent = /^(?:mouse|pointer|contextmenu)|click/;
  /** @type {RegExp} */
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  /** @type {RegExp} */
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  jQuery.event = {
    global : {},
    /**
     * @param {Object} elem
     * @param {Object} types
     * @param {Function} handler
     * @param {Object} e
     * @param {(Function|string)} selector
     * @return {undefined}
     */
    add : function(elem, types, handler, e, selector) {
      var segmentMatch;
      var events;
      var t;
      var handleObjIn;
      var special;
      var eventHandle;
      var handleObj;
      var handlers;
      var type;
      var namespaces;
      var origType;
      var elemData = jQuery._data(elem);
      if (elemData) {
        if (handler.handler) {
          /** @type {Function} */
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (!handler.guid) {
          /** @type {number} */
          handler.guid = jQuery.guid++;
        }
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          /** @type {function (Object): ?} */
          eventHandle = elemData.handle = function(src) {
            return typeof jQuery === text || src && jQuery.event.triggered === src.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
          };
          /** @type {Object} */
          eventHandle.elem = elem;
        }
        types = (types || "").match(core_rnotwhite) || [""];
        t = types.length;
        for (;t--;) {
          /** @type {Array} */
          segmentMatch = rtypenamespace.exec(types[t]) || [];
          type = origType = segmentMatch[1];
          namespaces = (segmentMatch[2] || "").split(".").sort();
          if (type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            handleObj = jQuery.extend({
              type : type,
              origType : origType,
              data : e,
              /** @type {Function} */
              handler : handler,
              guid : handler.guid,
              selector : selector,
              needsContext : selector && jQuery.expr.match.needsContext.test(selector),
              namespace : namespaces.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              /** @type {Array} */
              handlers = events[type] = [];
              /** @type {number} */
              handlers.delegateCount = 0;
              if (!(special.setup && special.setup.call(elem, e, namespaces, eventHandle) !== false)) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle, false);
                } else {
                  if (elem.attachEvent) {
                    elem.attachEvent("on" + type, eventHandle);
                  }
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            /** @type {boolean} */
            jQuery.event.global[type] = true;
          }
        }
        /** @type {null} */
        elem = null;
      }
    },
    /**
     * @param {string} elem
     * @param {Object} types
     * @param {Function} handler
     * @param {boolean} selector
     * @param {boolean} keepData
     * @return {undefined}
     */
    remove : function(elem, types, handler, selector, keepData) {
      var j;
      var handleObj;
      var tmp;
      var origCount;
      var t;
      var events;
      var special;
      var handlers;
      var type;
      var namespaces;
      var origType;
      var elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (elemData && (events = elemData.events)) {
        types = (types || "").match(core_rnotwhite) || [""];
        t = types.length;
        for (;t--;) {
          if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            for (;j--;) {
              handleObj = handlers[j];
              if (!(!keepData && origType !== handleObj.origType)) {
                if (!(handler && handler.guid !== handleObj.guid)) {
                  if (!(tmp && !tmp.test(handleObj.namespace))) {
                    if (!(selector && (selector !== handleObj.selector && ("**" !== selector || !handleObj.selector)))) {
                      handlers.splice(j, 1);
                      if (handleObj.selector) {
                        handlers.delegateCount--;
                      }
                      if (special.remove) {
                        special.remove.call(elem, handleObj);
                      }
                    }
                  }
                }
              }
            }
            if (origCount) {
              if (!handlers.length) {
                if (!(special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== false)) {
                  jQuery.removeEvent(elem, type, elemData.handle);
                }
                delete events[type];
              }
            }
          } else {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
          }
        }
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          jQuery._removeData(elem, "events");
        }
      }
    },
    /**
     * @param {string} event
     * @param {?} obj
     * @param {Object} data
     * @param {boolean} extra
     * @return {?}
     */
    trigger : function(event, obj, data, extra) {
      var handle;
      var ontype;
      var cur;
      var bubbleType;
      var special;
      var tmp;
      var i;
      /** @type {Array} */
      var eventPath = [data || element];
      var type = core_hasOwn.call(event, "type") ? event.type : event;
      var namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if (cur = tmp = data = data || element, 3 !== data.nodeType && (8 !== data.nodeType && (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = extra ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? 
      new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = data), obj = null == obj ? [event] : jQuery.makeArray(obj, [event]), special = jQuery.event.special[type] || {}, extra || (!special.trigger || special.trigger.apply(data, obj) !== false))))) {
        if (!extra && (!special.noBubble && !jQuery.isWindow(data))) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (;cur;cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (data.ownerDocument || element)) {
            eventPath.push(tmp.defaultView || (tmp.parentWindow || win));
          }
        }
        /** @type {number} */
        i = 0;
        for (;(cur = eventPath[i++]) && !event.isPropagationStopped();) {
          event.type = i > 1 ? bubbleType : special.bindType || type;
          handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
          if (handle) {
            handle.apply(cur, obj);
          }
          handle = ontype && cur[ontype];
          if (handle) {
            if (handle.apply) {
              if (jQuery.acceptData(cur)) {
                event.result = handle.apply(cur, obj);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
          }
        }
        if (event.type = type, !extra && (!event.isDefaultPrevented() && ((!special._default || special._default.apply(eventPath.pop(), obj) === false) && (jQuery.acceptData(data) && (ontype && (data[type] && !jQuery.isWindow(data))))))) {
          tmp = data[ontype];
          if (tmp) {
            /** @type {null} */
            data[ontype] = null;
          }
          jQuery.event.triggered = type;
          try {
            data[type]();
          } catch (r) {
          }
          jQuery.event.triggered = void 0;
          if (tmp) {
            data[ontype] = tmp;
          }
        }
        return event.result;
      }
    },
    /**
     * @param {Object} event
     * @return {?}
     */
    dispatch : function(event) {
      event = jQuery.event.fix(event);
      var i;
      var ret;
      var handleObj;
      var matched;
      var j;
      /** @type {Array} */
      var handlerQueue = [];
      /** @type {Array.<?>} */
      var args = core_slice.call(arguments);
      var handlers = (jQuery._data(this, "events") || {})[event.type] || [];
      var special = jQuery.event.special[event.type] || {};
      if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== false) {
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        /** @type {number} */
        i = 0;
        for (;(matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
          event.currentTarget = matched.elem;
          /** @type {number} */
          j = 0;
          for (;(handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (void 0 !== ret) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        return special.postDispatch && special.postDispatch.call(this, event), event.result;
      }
    },
    /**
     * @param {Event} event
     * @param {Object} handlers
     * @return {?}
     */
    handlers : function(event, handlers) {
      var sel;
      var handleObj;
      var matches;
      var j;
      /** @type {Array} */
      var handlerQueue = [];
      var delegateCount = handlers.delegateCount;
      var cur = event.target;
      if (delegateCount && (cur.nodeType && (!event.button || "click" !== event.type))) {
        for (;cur != this;cur = cur.parentNode || this) {
          if (1 === cur.nodeType && (cur.disabled !== true || "click" !== event.type)) {
            /** @type {Array} */
            matches = [];
            /** @type {number} */
            j = 0;
            for (;delegateCount > j;j++) {
              handleObj = handlers[j];
              /** @type {string} */
              sel = handleObj.selector + " ";
              if (void 0 === matches[sel]) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem : cur,
                handlers : matches
              });
            }
          }
        }
      }
      return delegateCount < handlers.length && handlerQueue.push({
        elem : this,
        handlers : handlers.slice(delegateCount)
      }), handlerQueue;
    },
    /**
     * @param {Object} event
     * @return {?}
     */
    fix : function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i;
      var prop;
      var copy;
      var type = event.type;
      /** @type {Object} */
      var originalEvent = event;
      var fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rkeyEvent.test(type) ? this.mouseHooks : rmouseEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      for (;i--;) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      return event.target || (event.target = originalEvent.srcElement || element), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks : {},
    keyHooks : {
      props : "char charCode key keyCode".split(" "),
      /**
       * @param {string} type
       * @param {?} event
       * @return {?}
       */
      filter : function(type, event) {
        return null == type.which && (type.which = null != event.charCode ? event.charCode : event.keyCode), type;
      }
    },
    mouseHooks : {
      props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      /**
       * @param {string} type
       * @param {?} event
       * @return {?}
       */
      filter : function(type, event) {
        var b;
        var d;
        var de;
        var old = event.button;
        var fromElement = event.fromElement;
        return null == type.pageX && (null != event.clientX && (d = type.target.ownerDocument || element, de = d.documentElement, b = d.body, type.pageX = event.clientX + (de && de.scrollLeft || (b && b.scrollLeft || 0)) - (de && de.clientLeft || (b && b.clientLeft || 0)), type.pageY = event.clientY + (de && de.scrollTop || (b && b.scrollTop || 0)) - (de && de.clientTop || (b && b.clientTop || 0)))), !type.relatedTarget && (fromElement && (type.relatedTarget = fromElement === type.target ? event.toElement : 
        fromElement)), type.which || (void 0 === old || (type.which = 1 & old ? 1 : 2 & old ? 3 : 4 & old ? 2 : 0)), type;
      }
    },
    special : {
      load : {
        noBubble : true
      },
      focus : {
        /**
         * @return {?}
         */
        trigger : function() {
          if (this !== safeActiveElement() && this.focus) {
            try {
              return this.focus(), false;
            } catch (a) {
            }
          }
        },
        delegateType : "focusin"
      },
      blur : {
        /**
         * @return {?}
         */
        trigger : function() {
          return this === safeActiveElement() && this.blur ? (this.blur(), false) : void 0;
        },
        delegateType : "focusout"
      },
      click : {
        /**
         * @return {?}
         */
        trigger : function() {
          return jQuery.nodeName(this, "input") && ("checkbox" === this.type && this.click) ? (this.click(), false) : void 0;
        },
        /**
         * @param {Function} selector
         * @return {?}
         */
        _default : function(selector) {
          return jQuery.nodeName(selector.target, "a");
        }
      },
      beforeunload : {
        /**
         * @param {Object} event
         * @return {undefined}
         */
        postDispatch : function(event) {
          if (void 0 !== event.result) {
            if (event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      }
    },
    /**
     * @param {string} type
     * @param {Object} elem
     * @param {Event} event
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    simulate : function(type, elem, event, dataAndEvents) {
      var cycle = jQuery.extend(new jQuery.Event, event, {
        type : type,
        isSimulated : true,
        originalEvent : {}
      });
      if (dataAndEvents) {
        jQuery.event.trigger(cycle, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, cycle);
      }
      if (cycle.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  /** @type {function (?, ?, ?): undefined} */
  jQuery.removeEvent = element.removeEventListener ? function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  } : function(elem, keepData, listener) {
    /** @type {string} */
    var type = "on" + keepData;
    if (elem.detachEvent) {
      if (typeof elem[type] === text) {
        /** @type {null} */
        elem[type] = null;
      }
      elem.detachEvent(type, listener);
    }
  };
  /**
   * @param {Object} src
   * @param {?} props
   * @return {?}
   */
  jQuery.Event = function(src, props) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === false ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = true)) : new jQuery.Event(src, props);
  };
  jQuery.Event.prototype = {
    /** @type {function (): ?} */
    isDefaultPrevented : returnFalse,
    /** @type {function (): ?} */
    isPropagationStopped : returnFalse,
    /** @type {function (): ?} */
    isImmediatePropagationStopped : returnFalse,
    /**
     * @return {undefined}
     */
    preventDefault : function() {
      var e = this.originalEvent;
      /** @type {function (): ?} */
      this.isDefaultPrevented = returnTrue;
      if (e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          /** @type {boolean} */
          e.returnValue = false;
        }
      }
    },
    /**
     * @return {undefined}
     */
    stopPropagation : function() {
      var e = this.originalEvent;
      /** @type {function (): ?} */
      this.isPropagationStopped = returnTrue;
      if (e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        /** @type {boolean} */
        e.cancelBubble = true;
      }
    },
    /**
     * @return {undefined}
     */
    stopImmediatePropagation : function() {
      var e = this.originalEvent;
      /** @type {function (): ?} */
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        if (e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter : "mouseover",
    mouseleave : "mouseout",
    pointerenter : "pointerover",
    pointerleave : "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType : fix,
      bindType : fix,
      /**
       * @param {Object} event
       * @return {?}
       */
      handle : function(event) {
        var returnValue;
        var target = this;
        var related = event.relatedTarget;
        var handleObj = event.handleObj;
        return(!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, returnValue = handleObj.handler.apply(this, arguments), event.type = fix), returnValue;
      }
    };
  });
  if (!support.submitBubbles) {
    jQuery.event.special.submit = {
      /**
       * @return {?}
       */
      setup : function() {
        return jQuery.nodeName(this, "form") ? false : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
          var elem = e.target;
          var dest = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
          if (dest) {
            if (!jQuery._data(dest, "submitBubbles")) {
              jQuery.event.add(dest, "submit._submit", function(event) {
                /** @type {boolean} */
                event._submit_bubble = true;
              });
              jQuery._data(dest, "submitBubbles", true);
            }
          }
        });
      },
      /**
       * @param {Event} event
       * @return {undefined}
       */
      postDispatch : function(event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode) {
            if (!event.isTrigger) {
              jQuery.event.simulate("submit", this.parentNode, event, true);
            }
          }
        }
      },
      /**
       * @return {?}
       */
      teardown : function() {
        return jQuery.nodeName(this, "form") ? false : void jQuery.event.remove(this, "._submit");
      }
    };
  }
  if (!support.changeBubbles) {
    jQuery.event.special.change = {
      /**
       * @return {?}
       */
      setup : function() {
        return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
          if ("checked" === event.originalEvent.propertyName) {
            /** @type {boolean} */
            this._just_changed = true;
          }
        }), jQuery.event.add(this, "click._change", function(event) {
          if (this._just_changed) {
            if (!event.isTrigger) {
              /** @type {boolean} */
              this._just_changed = false;
            }
          }
          jQuery.event.simulate("change", this, event, true);
        })), false) : void jQuery.event.add(this, "beforeactivate._change", function(ev) {
          var node = ev.target;
          if (rformElems.test(node.nodeName)) {
            if (!jQuery._data(node, "changeBubbles")) {
              jQuery.event.add(node, "change._change", function(event) {
                if (!!this.parentNode) {
                  if (!event.isSimulated) {
                    if (!event.isTrigger) {
                      jQuery.event.simulate("change", this.parentNode, event, true);
                    }
                  }
                }
              });
              jQuery._data(node, "changeBubbles", true);
            }
          }
        });
      },
      /**
       * @param {Event} event
       * @return {?}
       */
      handle : function(event) {
        var current = event.target;
        return this !== current || (event.isSimulated || (event.isTrigger || "radio" !== current.type && "checkbox" !== current.type)) ? event.handleObj.handler.apply(this, arguments) : void 0;
      },
      /**
       * @return {?}
       */
      teardown : function() {
        return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
      }
    };
  }
  if (!support.focusinBubbles) {
    jQuery.each({
      focus : "focusin",
      blur : "focusout"
    }, function(name, fix) {
      /**
       * @param {Object} event
       * @return {undefined}
       */
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        /**
         * @return {undefined}
         */
        setup : function() {
          var target = this.ownerDocument || this;
          var targets = jQuery._data(target, fix);
          if (!targets) {
            target.addEventListener(name, handler, true);
          }
          jQuery._data(target, fix, (targets || 0) + 1);
        },
        /**
         * @return {undefined}
         */
        teardown : function() {
          var node = this.ownerDocument || this;
          /** @type {number} */
          var value = jQuery._data(node, fix) - 1;
          if (value) {
            jQuery._data(node, fix, value);
          } else {
            node.removeEventListener(name, handler, true);
            jQuery._removeData(node, fix);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @param {Object} selector
     * @param {Object} data
     * @param {Object} fn
     * @param {(number|string)} one
     * @return {?}
     */
    on : function(type, selector, data, fn, one) {
      var event;
      var origFn;
      if ("object" == typeof type) {
        if ("string" != typeof selector) {
          data = data || selector;
          selector = void 0;
        }
        for (event in type) {
          this.on(event, selector, data, type[event], one);
        }
        return this;
      }
      if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === false) {
        /** @type {function (): ?} */
        fn = returnFalse;
      } else {
        if (!fn) {
          return this;
        }
      }
      return 1 === one && (origFn = fn, fn = function(event) {
        return jQuery().off(event), origFn.apply(this, arguments);
      }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
        jQuery.event.add(this, type, fn, data, selector);
      });
    },
    /**
     * @param {string} name
     * @param {Function} callback
     * @param {Object} data
     * @param {Object} fn
     * @return {?}
     */
    one : function(name, callback, data, fn) {
      return this.on(name, callback, data, fn, 1);
    },
    /**
     * @param {string} types
     * @param {Object} selector
     * @param {Object} fn
     * @return {?}
     */
    off : function(types, selector, fn) {
      var handleObj;
      var type;
      if (types && (types.preventDefault && types.handleObj)) {
        return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      }
      if ("object" == typeof types) {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      return(selector === false || "function" == typeof selector) && (fn = selector, selector = void 0), fn === false && (fn = returnFalse), this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    /**
     * @param {string} type
     * @param {?} obj
     * @return {?}
     */
    trigger : function(type, obj) {
      return this.each(function() {
        jQuery.event.trigger(type, obj, this);
      });
    },
    /**
     * @param {string} cycle
     * @param {?} qualifier
     * @return {?}
     */
    triggerHandler : function(cycle, qualifier) {
      var pdataCur = this[0];
      return pdataCur ? jQuery.event.trigger(cycle, qualifier, pdataCur, true) : void 0;
    }
  });
  /** @type {string} */
  var uHostName = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
  /** @type {RegExp} */
  var normalizr = / jQuery\d+="(?:null|\d+)"/g;
  /** @type {RegExp} */
  var regexp = new RegExp("<(?:" + uHostName + ")[\\s/>]", "i");
  /** @type {RegExp} */
  var rtagName = /^\s+/;
  /** @type {RegExp} */
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
  /** @type {RegExp} */
  var matches = /<([\w:]+)/;
  /** @type {RegExp} */
  var rhtml = /<tbody/i;
  /** @type {RegExp} */
  var selector = /<|&#?\w+;/;
  /** @type {RegExp} */
  var rchecked = /<(?:script|style|link)/i;
  /** @type {RegExp} */
  var BEGIN_TAG_REGEXP = /checked\s*(?:[^=]|=\s*.checked.)/i;
  /** @type {RegExp} */
  var stopParent = /^$|\/(?:java|ecma)script/i;
  /** @type {RegExp} */
  var rscriptTypeMasked = /^true\/(.*)/;
  /** @type {RegExp} */
  var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  var wrapMap = {
    option : [1, "<select multiple='multiple'>", "</select>"],
    legend : [1, "<fieldset>", "</fieldset>"],
    area : [1, "<map>", "</map>"],
    param : [1, "<object>", "</object>"],
    thead : [1, "<table>", "</table>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default : support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  var wrap = create(element);
  var fragmentDiv = wrap.appendChild(element.createElement("div"));
  /** @type {Array} */
  wrapMap.optgroup = wrapMap.option;
  /** @type {Array} */
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  /** @type {Array} */
  wrapMap.th = wrapMap.td;
  jQuery.extend({
    /**
     * @param {Object} node
     * @param {boolean} dataAndEvents
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    clone : function(node, dataAndEvents, deepDataAndEvents) {
      var destElements;
      var elem;
      var clone;
      var i;
      var tmp;
      var inPage = jQuery.contains(node.ownerDocument, node);
      if (support.html5Clone || (jQuery.isXMLDoc(node) || !regexp.test("<" + node.nodeName + ">")) ? clone = node.cloneNode(true) : (fragmentDiv.innerHTML = node.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || (1 !== node.nodeType && 11 !== node.nodeType || jQuery.isXMLDoc(node)))) {
        destElements = getAll(clone);
        tmp = getAll(node);
        /** @type {number} */
        i = 0;
        for (;null != (elem = tmp[i]);++i) {
          if (destElements[i]) {
            cloneFixAttributes(elem, destElements[i]);
          }
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          tmp = tmp || getAll(node);
          destElements = destElements || getAll(clone);
          /** @type {number} */
          i = 0;
          for (;null != (elem = tmp[i]);i++) {
            cloneCopyEvent(elem, destElements[i]);
          }
        } else {
          cloneCopyEvent(node, clone);
        }
      }
      return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(node, "script")), destElements = tmp = elem = null, clone;
    },
    /**
     * @param {Array} elems
     * @param {Document} context
     * @param {boolean} scripts
     * @param {Object} selection
     * @return {?}
     */
    buildFragment : function(elems, context, scripts, selection) {
      var j;
      var elem;
      var contains;
      var tmp;
      var tag;
      var tbody;
      var wrap;
      var l = elems.length;
      var safe = create(context);
      /** @type {Array} */
      var nodes = [];
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        if (elem = elems[i], elem || 0 === elem) {
          if ("object" === jQuery.type(elem)) {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else {
            if (selector.test(elem)) {
              tmp = tmp || safe.appendChild(context.createElement("div"));
              tag = (matches.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
              j = wrap[0];
              for (;j--;) {
                tmp = tmp.lastChild;
              }
              if (!support.leadingWhitespace && (rtagName.test(elem) && nodes.push(context.createTextNode(rtagName.exec(elem)[0]))), !support.tbody) {
                elem = "table" !== tag || rhtml.test(elem) ? "<table>" !== wrap[1] || rhtml.test(elem) ? 0 : tmp : tmp.firstChild;
                j = elem && elem.childNodes.length;
                for (;j--;) {
                  if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody")) {
                    if (!tbody.childNodes.length) {
                      elem.removeChild(tbody);
                    }
                  }
                }
              }
              jQuery.merge(nodes, tmp.childNodes);
              /** @type {string} */
              tmp.textContent = "";
              for (;tmp.firstChild;) {
                tmp.removeChild(tmp.firstChild);
              }
              tmp = safe.lastChild;
            } else {
              nodes.push(context.createTextNode(elem));
            }
          }
        }
      }
      if (tmp) {
        safe.removeChild(tmp);
      }
      if (!support.appendChecked) {
        jQuery.grep(getAll(nodes, "input"), set);
      }
      /** @type {number} */
      i = 0;
      for (;elem = nodes[i++];) {
        if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)) {
          /** @type {number} */
          j = 0;
          for (;elem = tmp[j++];) {
            if (stopParent.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return tmp = null, safe;
    },
    /**
     * @param {Array} elems
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    cleanData : function(elems, dataAndEvents) {
      var elem;
      var type;
      var id;
      var data;
      /** @type {number} */
      var i = 0;
      var expando = jQuery.expando;
      var cache = jQuery.cache;
      /** @type {boolean} */
      var deleteExpando = support.deleteExpando;
      var special = jQuery.event.special;
      for (;null != (elem = elems[i]);i++) {
        if ((dataAndEvents || jQuery.acceptData(elem)) && (id = elem[expando], data = id && cache[id])) {
          if (data.events) {
            for (type in data.events) {
              if (special[type]) {
                jQuery.event.remove(elem, type);
              } else {
                jQuery.removeEvent(elem, type, data.handle);
              }
            }
          }
          if (cache[id]) {
            delete cache[id];
            if (deleteExpando) {
              delete elem[expando];
            } else {
              if (typeof elem.removeAttribute !== text) {
                elem.removeAttribute(expando);
              } else {
                /** @type {null} */
                elem[expando] = null;
              }
            }
            core_deletedIds.push(id);
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @return {?}
     */
    text : function(type) {
      return access(this, function(text) {
        return void 0 === text ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || element).createTextNode(text));
      }, null, type, arguments.length);
    },
    /**
     * @return {?}
     */
    append : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || (11 === this.nodeType || 9 === this.nodeType)) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    /**
     * @return {?}
     */
    prepend : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || (11 === this.nodeType || 9 === this.nodeType)) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    /**
     * @return {?}
     */
    before : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    /**
     * @return {?}
     */
    after : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    /**
     * @param {string} cycle
     * @param {string} keepData
     * @return {?}
     */
    remove : function(cycle, keepData) {
      var elem;
      var curLoop = cycle ? jQuery.filter(cycle, this) : this;
      /** @type {number} */
      var i = 0;
      for (;null != (elem = curLoop[i]);i++) {
        if (!keepData) {
          if (!(1 !== elem.nodeType)) {
            jQuery.cleanData(getAll(elem));
          }
        }
        if (elem.parentNode) {
          if (keepData) {
            if (jQuery.contains(elem.ownerDocument, elem)) {
              setGlobalEval(getAll(elem, "script"));
            }
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    /**
     * @return {?}
     */
    empty : function() {
      var elem;
      /** @type {number} */
      var unlock = 0;
      for (;null != (elem = this[unlock]);unlock++) {
        if (1 === elem.nodeType) {
          jQuery.cleanData(getAll(elem, false));
        }
        for (;elem.firstChild;) {
          elem.removeChild(elem.firstChild);
        }
        if (elem.options) {
          if (jQuery.nodeName(elem, "select")) {
            /** @type {number} */
            elem.options.length = 0;
          }
        }
      }
      return this;
    },
    /**
     * @param {boolean} dataAndEvents
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    clone : function(dataAndEvents, deepDataAndEvents) {
      return dataAndEvents = null == dataAndEvents ? false : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    /**
     * @param {string} value
     * @return {?}
     */
    html : function(value) {
      return access(this, function(value) {
        var elem = this[0] || {};
        /** @type {number} */
        var i = 0;
        var l = this.length;
        if (void 0 === value) {
          return 1 === elem.nodeType ? elem.innerHTML.replace(normalizr, "") : void 0;
        }
        if (!("string" != typeof value || (rchecked.test(value) || (!support.htmlSerialize && regexp.test(value) || (!support.leadingWhitespace && rtagName.test(value) || wrapMap[(matches.exec(value) || ["", ""])[1].toLowerCase()]))))) {
          /** @type {string} */
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (;l > i;i++) {
              elem = this[i] || {};
              if (1 === elem.nodeType) {
                jQuery.cleanData(getAll(elem, false));
                /** @type {string} */
                elem.innerHTML = value;
              }
            }
            /** @type {number} */
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    /**
     * @return {?}
     */
    replaceWith : function() {
      var arg = arguments[0];
      return this.domManip(arguments, function(s) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(s, this);
        }
      }), arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    /**
     * @param {string} selector
     * @return {?}
     */
    detach : function(selector) {
      return this.remove(selector, true);
    },
    /**
     * @param {Object} args
     * @param {Function} callback
     * @return {?}
     */
    domManip : function(args, callback) {
      /** @type {Array} */
      args = core_concat.apply([], args);
      var first;
      var node;
      var _len;
      var scripts;
      var doc;
      var fragment;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      var set = this;
      /** @type {number} */
      var iNoClone = l - 1;
      var html = args[0];
      var isFunction = jQuery.isFunction(html);
      if (isFunction || l > 1 && ("string" == typeof html && (!support.checkClone && BEGIN_TAG_REGEXP.test(html)))) {
        return this.each(function(index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = html.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
        scripts = jQuery.map(getAll(fragment, "script"), restoreScript);
        _len = scripts.length;
        for (;l > i;i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (_len) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(this[i], node, i);
        }
        if (_len) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, fn);
          /** @type {number} */
          i = 0;
          for (;_len > i;i++) {
            node = scripts[i];
            if (stopParent.test(node.type || "")) {
              if (!jQuery._data(node, "globalEval")) {
                if (jQuery.contains(doc, node)) {
                  if (node.src) {
                    if (jQuery._evalUrl) {
                      jQuery._evalUrl(node.src);
                    }
                  } else {
                    jQuery.globalEval((node.text || (node.textContent || (node.innerHTML || ""))).replace(rcleanScript, ""));
                  }
                }
              }
            }
          }
        }
        /** @type {null} */
        fragment = first = null;
      }
      return this;
    }
  });
  jQuery.each({
    appendTo : "append",
    prependTo : "prepend",
    insertBefore : "before",
    insertAfter : "after",
    replaceAll : "replaceWith"
  }, function(original, method) {
    /**
     * @param {string} scripts
     * @return {?}
     */
    jQuery.fn[original] = function(scripts) {
      var resp;
      /** @type {number} */
      var i = 0;
      /** @type {Array} */
      var ret = [];
      var insert = jQuery(scripts);
      /** @type {number} */
      var segments = insert.length - 1;
      for (;segments >= i;i++) {
        resp = i === segments ? this : this.clone(true);
        jQuery(insert[i])[method](resp);
        core_push.apply(ret, resp.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe;
  var elemdisplay = {};
  !function() {
    var shrinkWrapBlocks;
    /**
     * @return {?}
     */
    support.shrinkWrapBlocks = function() {
      if (null != shrinkWrapBlocks) {
        return shrinkWrapBlocks;
      }
      /** @type {boolean} */
      shrinkWrapBlocks = false;
      var div;
      var target;
      var container;
      return target = element.getElementsByTagName("body")[0], target && target.style ? (div = element.createElement("div"), container = element.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", target.appendChild(container).appendChild(div), typeof div.style.zoom !== text && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
      div.appendChild(element.createElement("div")).style.width = "5px", shrinkWrapBlocks = 3 !== div.offsetWidth), target.removeChild(container), shrinkWrapBlocks) : void 0;
    };
  }();
  /** @type {RegExp} */
  var rbracket = /^margin/;
  /** @type {RegExp} */
  var rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles;
  var get;
  /** @type {RegExp} */
  var eventSplitter = /^(top|right|bottom|left)$/;
  if (win.getComputedStyle) {
    /**
     * @param {Node} elem
     * @return {?}
     */
    getStyles = function(elem) {
      return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : win.getComputedStyle(elem, null);
    };
    /**
     * @param {string} elem
     * @param {?} prop
     * @param {boolean} computed
     * @return {?}
     */
    get = function(elem, prop, computed) {
      var width;
      var minWidth;
      var maxWidth;
      var ret;
      var style = elem.style;
      return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(prop) || computed[prop] : void 0, computed && ("" !== ret || (jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, prop))), rnumnonpx.test(ret) && (rbracket.test(prop) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = 
      maxWidth))), void 0 === ret ? ret : ret + "";
    };
  } else {
    if (element.documentElement.currentStyle) {
      /**
       * @param {Node} type
       * @return {?}
       */
      getStyles = function(type) {
        return type.currentStyle;
      };
      /**
       * @param {Node} elem
       * @param {string} name
       * @param {boolean} data
       * @return {?}
       */
      get = function(elem, name, data) {
        var left;
        var rs;
        var rsLeft;
        var ret;
        var style = elem.style;
        return data = data || getStyles(elem), ret = data ? data[name] : void 0, null == ret && (style && (style[name] && (ret = style[name]))), rnumnonpx.test(ret) && (!eventSplitter.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft))), void 0 === ret ? ret : ret + "" || "auto";
      };
    }
  }
  !function() {
    var div;
    var style;
    var domNode;
    var stack;
    var memory;
    var g;
    var h;
    if (div = element.createElement("div"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", domNode = div.getElementsByTagName("a")[0], style = domNode && domNode.style) {
      /** @type {string} */
      style.cssText = "float:left;opacity:.5";
      /** @type {boolean} */
      support.opacity = "0.5" === style.opacity;
      /** @type {boolean} */
      support.cssFloat = !!style.cssFloat;
      /** @type {string} */
      div.style.backgroundClip = "content-box";
      /** @type {string} */
      div.cloneNode(true).style.backgroundClip = "";
      /** @type {boolean} */
      support.clearCloneStyle = "content-box" === div.style.backgroundClip;
      /** @type {boolean} */
      support.boxSizing = "" === style.boxSizing || ("" === style.MozBoxSizing || "" === style.WebkitBoxSizing);
      jQuery.extend(support, {
        /**
         * @return {?}
         */
        reliableHiddenOffsets : function() {
          return null == g && getSize(), g;
        },
        /**
         * @return {?}
         */
        boxSizingReliable : function() {
          return null == memory && getSize(), memory;
        },
        /**
         * @return {?}
         */
        pixelPosition : function() {
          return null == stack && getSize(), stack;
        },
        /**
         * @return {?}
         */
        reliableMarginRight : function() {
          return null == h && getSize(), h;
        }
      });
      /**
       * @return {undefined}
       */
      var getSize = function() {
        var div;
        var body;
        var container;
        var marginDiv;
        body = element.getElementsByTagName("body")[0];
        if (body) {
          if (body.style) {
            div = element.createElement("div");
            container = element.createElement("div");
            /** @type {string} */
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            /** @type {string} */
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            /** @type {boolean} */
            stack = memory = false;
            /** @type {boolean} */
            h = true;
            if (win.getComputedStyle) {
              /** @type {boolean} */
              stack = "1%" !== (win.getComputedStyle(div, null) || {}).top;
              /** @type {boolean} */
              memory = "4px" === (win.getComputedStyle(div, null) || {
                width : "4px"
              }).width;
              marginDiv = div.appendChild(element.createElement("div"));
              /** @type {string} */
              marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
              /** @type {string} */
              marginDiv.style.marginRight = marginDiv.style.width = "0";
              /** @type {string} */
              div.style.width = "1px";
              /** @type {boolean} */
              h = !parseFloat((win.getComputedStyle(marginDiv, null) || {}).marginRight);
              div.removeChild(marginDiv);
            }
            /** @type {string} */
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            marginDiv = div.getElementsByTagName("td");
            /** @type {string} */
            marginDiv[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            /** @type {boolean} */
            g = 0 === marginDiv[0].offsetHeight;
            if (g) {
              /** @type {string} */
              marginDiv[0].style.display = "";
              /** @type {string} */
              marginDiv[1].style.display = "none";
              /** @type {boolean} */
              g = 0 === marginDiv[0].offsetHeight;
            }
            body.removeChild(container);
          }
        }
      };
    }
  }();
  /**
   * @param {Element} elem
   * @param {Object} options
   * @param {Function} callback
   * @param {Array} args
   * @return {?}
   */
  jQuery.swap = function(elem, options, callback, args) {
    var ret;
    var name;
    var old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  /** @type {RegExp} */
  var ralpha = /alpha\([^)]*\)/i;
  /** @type {RegExp} */
  var emptyType = /opacity\s*=\s*([^)]*)/;
  /** @type {RegExp} */
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  /** @type {RegExp} */
  var rrelNum = new RegExp("^(" + core_pnum + ")(.*)$", "i");
  /** @type {RegExp} */
  var rnumsplit = new RegExp("^([+-])=(" + core_pnum + ")", "i");
  var props = {
    position : "absolute",
    visibility : "hidden",
    display : "block"
  };
  var cssNormalTransform = {
    letterSpacing : "0",
    fontWeight : "400"
  };
  /** @type {Array} */
  var cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  jQuery.extend({
    cssHooks : {
      opacity : {
        /**
         * @param {string} key
         * @param {boolean} keepData
         * @return {?}
         */
        get : function(key, keepData) {
          if (keepData) {
            var value = get(key, "opacity");
            return "" === value ? "1" : value;
          }
        }
      }
    },
    cssNumber : {
      columnCount : true,
      fillOpacity : true,
      flexGrow : true,
      flexShrink : true,
      fontWeight : true,
      lineHeight : true,
      opacity : true,
      order : true,
      orphans : true,
      widows : true,
      zIndex : true,
      zoom : true
    },
    cssProps : {
      "float" : support.cssFloat ? "cssFloat" : "styleFloat"
    },
    /**
     * @param {string} type
     * @param {?} name
     * @param {Object} value
     * @param {string} extra
     * @return {?}
     */
    style : function(type, name, value, extra) {
      if (type && (3 !== type.nodeType && (8 !== type.nodeType && type.style))) {
        var ret;
        var current;
        var hooks;
        var origName = jQuery.camelCase(name);
        var style = type.style;
        if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) {
          return hooks && ("get" in hooks && void 0 !== (ret = hooks.get(type, false, extra))) ? ret : style[name];
        }
        if (current = typeof value, "string" === current && ((ret = rnumsplit.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(type, name)), current = "number")), null != value && (value === value && ("number" !== current || (jQuery.cssNumber[origName] || (value += "px")), support.clearCloneStyle || ("" !== value || (0 !== name.indexOf("background") || (style[name] = "inherit"))), !(hooks && ("set" in hooks && void 0 === (value = hooks.set(type, value, extra))))))) {
          try {
            /** @type {Object} */
            style[name] = value;
          } catch (j) {
          }
        }
      }
    },
    /**
     * @param {string} arg
     * @param {?} name
     * @param {boolean} recurring
     * @param {boolean} fn
     * @return {?}
     */
    css : function(arg, name, recurring, fn) {
      var value;
      var val;
      var result;
      var origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(arg.style, origName)), result = jQuery.cssHooks[name] || jQuery.cssHooks[origName], result && ("get" in result && (val = result.get(arg, true, recurring))), void 0 === val && (val = get(arg, name, fn)), "normal" === val && (name in cssNormalTransform && (val = cssNormalTransform[name])), "" === recurring || recurring ? (value = parseFloat(val), recurring === true || jQuery.isNumeric(value) ? value || 0 : 
      val) : val;
    }
  });
  jQuery.each(["height", "width"], function(dataAndEvents, name) {
    jQuery.cssHooks[name] = {
      /**
       * @param {string} elem
       * @param {Object} keepData
       * @param {string} extra
       * @return {?}
       */
      get : function(elem, keepData, extra) {
        return keepData ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, props, function() {
          return getWidthOrHeight(elem, name, extra);
        }) : getWidthOrHeight(elem, name, extra) : void 0;
      },
      /**
       * @param {string} elem
       * @param {Object} value
       * @param {Object} extra
       * @return {?}
       */
      set : function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles), styles) : 0);
      }
    };
  });
  if (!support.opacity) {
    jQuery.cssHooks.opacity = {
      /**
       * @param {Object} elem
       * @param {boolean} computed
       * @return {?}
       */
      get : function(elem, computed) {
        return emptyType.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
      },
      /**
       * @param {Node} elem
       * @param {Object} value
       * @return {undefined}
       */
      set : function(elem, value) {
        var elemStyle = elem.style;
        var currentStyle = elem.currentStyle;
        /** @type {string} */
        var opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "";
        var filter = currentStyle && currentStyle.filter || (elemStyle.filter || "");
        /** @type {number} */
        elemStyle.zoom = 1;
        if (!((value >= 1 || "" === value) && ("" === jQuery.trim(filter.replace(ralpha, "")) && (elemStyle.removeAttribute && (elemStyle.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter))))) {
          elemStyle.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
        }
      }
    };
  }
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(cur, value) {
    return value ? jQuery.swap(cur, {
      display : "inline-block"
    }, get, [cur, "marginRight"]) : void 0;
  });
  jQuery.each({
    margin : "",
    padding : "",
    border : "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      /**
       * @param {string} line
       * @return {?}
       */
      expand : function(line) {
        /** @type {number} */
        var i = 0;
        var expanded = {};
        /** @type {Array} */
        var tokens = "string" == typeof line ? line.split(" ") : [line];
        for (;4 > i;i++) {
          expanded[prefix + cssExpand[i] + suffix] = tokens[i] || (tokens[i - 2] || tokens[0]);
        }
        return expanded;
      }
    };
    if (!rbracket.test(prefix)) {
      /** @type {function (string, string, string): ?} */
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} name
     * @param {?} value
     * @return {?}
     */
    css : function(name, value) {
      return access(this, function(cycle, prop, value) {
        var styles;
        var _len;
        var map = {};
        /** @type {number} */
        var name = 0;
        if (jQuery.isArray(prop)) {
          styles = getStyles(cycle);
          _len = prop.length;
          for (;_len > name;name++) {
            map[prop[name]] = jQuery.css(cycle, prop[name], false, styles);
          }
          return map;
        }
        return void 0 !== value ? jQuery.style(cycle, prop, value) : jQuery.css(cycle, prop);
      }, name, value, arguments.length > 1);
    },
    /**
     * @return {?}
     */
    show : function() {
      return showHide(this, true);
    },
    /**
     * @return {?}
     */
    hide : function() {
      return showHide(this);
    },
    /**
     * @param {?} state
     * @return {?}
     */
    toggle : function(state) {
      return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
        if (cycle(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  /** @type {function (string, string, string, string, string): ?} */
  jQuery.Tween = Tween;
  Tween.prototype = {
    /** @type {function (string, string, string, string, string): ?} */
    constructor : Tween,
    /**
     * @param {string} type
     * @param {Object} options
     * @param {string} prop
     * @param {?} to
     * @param {string} easing
     * @param {string} unit
     * @return {undefined}
     */
    init : function(type, options, prop, to, easing, unit) {
      /** @type {string} */
      this.elem = type;
      /** @type {string} */
      this.prop = prop;
      this.easing = easing || "swing";
      /** @type {Object} */
      this.options = options;
      this.start = this.now = this.cur();
      this.end = to;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    /**
     * @return {?}
     */
    cur : function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    /**
     * @param {number} percent
     * @return {?}
     */
    run : function(percent) {
      var eased;
      var hooks = Tween.propHooks[this.prop];
      return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default : {
      /**
       * @param {Object} tween
       * @return {?}
       */
      get : function(tween) {
        var node;
        return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (node = jQuery.css(tween.elem, tween.prop, ""), node && "auto" !== node ? node : 0) : tween.elem[tween.prop];
      },
      /**
       * @param {Object} tween
       * @return {undefined}
       */
      set : function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else {
          if (tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    /**
     * @param {Object} tween
     * @return {undefined}
     */
    set : function(tween) {
      if (tween.elem.nodeType) {
        if (tween.elem.parentNode) {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  jQuery.easing = {
    /**
     * @param {?} t
     * @return {?}
     */
    linear : function(t) {
      return t;
    },
    /**
     * @param {number} p
     * @return {?}
     */
    swing : function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  /** @type {function (string, Object, string, ?, string, string): undefined} */
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow;
  var scrollIntervalId;
  /** @type {RegExp} */
  var rplusequals = /^(?:toggle|show|hide)$/;
  /** @type {RegExp} */
  var rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i");
  /** @type {RegExp} */
  var numbers = /queueHooks$/;
  /** @type {Array} */
  var animationPrefilters = [defaultPrefilter];
  var cache = {
    "*" : [function(prop, value) {
      var tween = this.createTween(prop, value);
      var l0 = tween.cur();
      /** @type {(Array.<string>|null)} */
      var parts = rfxnum.exec(value);
      /** @type {string} */
      var unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
      var start = (jQuery.cssNumber[prop] || "px" !== unit && +l0) && rfxnum.exec(jQuery.css(tween.elem, prop));
      /** @type {number} */
      var scale = 1;
      /** @type {number} */
      var i = 20;
      if (start && start[3] !== unit) {
        unit = unit || start[3];
        /** @type {Array} */
        parts = parts || [];
        /** @type {number} */
        start = +l0 || 1;
        do {
          /** @type {(number|string)} */
          scale = scale || ".5";
          start /= scale;
          jQuery.style(tween.elem, prop, start + unit);
        } while (scale !== (scale = tween.cur() / l0) && (1 !== scale && --i));
      }
      return parts && (start = tween.start = +start || (+l0 || 0), tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
    }]
  };
  jQuery.Animation = jQuery.extend(Animation, {
    /**
     * @param {Object} elements
     * @param {Function} settings
     * @return {undefined}
     */
    tweener : function(elements, settings) {
      if (jQuery.isFunction(elements)) {
        /** @type {Object} */
        settings = elements;
        /** @type {Array} */
        elements = ["*"];
      } else {
        elements = elements.split(" ");
      }
      var prop;
      /** @type {number} */
      var i = 0;
      var ilen = elements.length;
      for (;ilen > i;i++) {
        prop = elements[i];
        cache[prop] = cache[prop] || [];
        cache[prop].unshift(settings);
      }
    },
    /**
     * @param {?} callback
     * @param {?} prepend
     * @return {undefined}
     */
    prefilter : function(callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  /**
   * @param {Object} speed
   * @param {Object} easing
   * @param {Object} fn
   * @return {?}
   */
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
      complete : fn || (!fn && easing || jQuery.isFunction(speed) && speed),
      duration : speed,
      easing : fn && easing || easing && (!jQuery.isFunction(easing) && easing)
    };
    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === true) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    }, opt;
  };
  jQuery.fn.extend({
    /**
     * @param {number} speed
     * @param {(number|string)} to
     * @param {Object} callback
     * @param {Object} _callback
     * @return {?}
     */
    fadeTo : function(speed, to, callback, _callback) {
      return this.filter(cycle).css("opacity", 0).show().end().animate({
        opacity : to
      }, speed, callback, _callback);
    },
    /**
     * @param {?} prop
     * @param {number} speed
     * @param {Object} easing
     * @param {Object} callback
     * @return {?}
     */
    animate : function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop);
      var optall = jQuery.speed(speed, easing, callback);
      /**
       * @return {undefined}
       */
      var doAnimation = function() {
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        if (empty || jQuery._data(this, "finish")) {
          anim.stop(true);
        }
      };
      return doAnimation.finish = doAnimation, empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    /**
     * @param {string} type
     * @param {string} clearQueue
     * @param {Object} gotoEnd
     * @return {?}
     */
    stop : function(type, clearQueue, gotoEnd) {
      /**
       * @param {Object} e
       * @return {undefined}
       */
      var stop = function(e) {
        var stop = e.stop;
        delete e.stop;
        stop(gotoEnd);
      };
      return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && (type !== false && this.queue(type || "fx", [])), this.each(function() {
        /** @type {boolean} */
        var dequeue = true;
        var i = null != type && type + "queueHooks";
        /** @type {Array} */
        var timers = jQuery.timers;
        var gradient = jQuery._data(this);
        if (i) {
          if (gradient[i]) {
            if (gradient[i].stop) {
              stop(gradient[i]);
            }
          }
        } else {
          for (i in gradient) {
            if (gradient[i]) {
              if (gradient[i].stop) {
                if (numbers.test(i)) {
                  stop(gradient[i]);
                }
              }
            }
          }
        }
        /** @type {number} */
        i = timers.length;
        for (;i--;) {
          if (!(timers[i].elem !== this)) {
            if (!(null != type && timers[i].queue !== type)) {
              timers[i].anim.stop(gotoEnd);
              /** @type {boolean} */
              dequeue = false;
              timers.splice(i, 1);
            }
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    /**
     * @param {string} type
     * @return {?}
     */
    finish : function(type) {
      return type !== false && (type = type || "fx"), this.each(function() {
        var index;
        var data = jQuery._data(this);
        var array = data[type + "queue"];
        var event = data[type + "queueHooks"];
        /** @type {Array} */
        var timers = jQuery.timers;
        var length = array ? array.length : 0;
        /** @type {boolean} */
        data.finish = true;
        jQuery.queue(this, type, []);
        if (event) {
          if (event.stop) {
            event.stop.call(this, true);
          }
        }
        /** @type {number} */
        index = timers.length;
        for (;index--;) {
          if (timers[index].elem === this) {
            if (timers[index].queue === type) {
              timers[index].anim.stop(true);
              timers.splice(index, 1);
            }
          }
        }
        /** @type {number} */
        index = 0;
        for (;length > index;index++) {
          if (array[index]) {
            if (array[index].finish) {
              array[index].finish.call(this);
            }
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(dataAndEvents, name) {
    var matcherFunction = jQuery.fn[name];
    /**
     * @param {number} speed
     * @param {Object} callback
     * @param {Object} next_callback
     * @return {?}
     */
    jQuery.fn[name] = function(speed, callback, next_callback) {
      return null == speed || "boolean" == typeof speed ? matcherFunction.apply(this, arguments) : this.animate(genFx(name, true), speed, callback, next_callback);
    };
  });
  jQuery.each({
    slideDown : genFx("show"),
    slideUp : genFx("hide"),
    slideToggle : genFx("toggle"),
    fadeIn : {
      opacity : "show"
    },
    fadeOut : {
      opacity : "hide"
    },
    fadeToggle : {
      opacity : "toggle"
    }
  }, function(original, props) {
    /**
     * @param {number} speed
     * @param {Object} callback
     * @param {Object} next_callback
     * @return {?}
     */
    jQuery.fn[original] = function(speed, callback, next_callback) {
      return this.animate(props, speed, callback, next_callback);
    };
  });
  /** @type {Array} */
  jQuery.timers = [];
  /**
   * @return {undefined}
   */
  jQuery.fx.tick = function() {
    var last;
    /** @type {Array} */
    var timers = jQuery.timers;
    /** @type {number} */
    var i = 0;
    fxNow = jQuery.now();
    for (;i < timers.length;i++) {
      last = timers[i];
      if (!last()) {
        if (!(timers[i] !== last)) {
          timers.splice(i--, 1);
        }
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = void 0;
  };
  /**
   * @param {?} timer
   * @return {undefined}
   */
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  /** @type {number} */
  jQuery.fx.interval = 13;
  /**
   * @return {undefined}
   */
  jQuery.fx.start = function() {
    if (!scrollIntervalId) {
      /** @type {number} */
      scrollIntervalId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  /**
   * @return {undefined}
   */
  jQuery.fx.stop = function() {
    clearInterval(scrollIntervalId);
    /** @type {null} */
    scrollIntervalId = null;
  };
  jQuery.fx.speeds = {
    slow : 600,
    fast : 200,
    _default : 400
  };
  /**
   * @param {Object} time
   * @param {string} type
   * @return {?}
   */
  jQuery.fn.delay = function(time, type) {
    return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, event) {
      /** @type {number} */
      var timeout = setTimeout(next, time);
      /**
       * @return {undefined}
       */
      event.stop = function() {
        clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input;
    var d;
    var select;
    var e;
    var opt;
    d = element.createElement("div");
    d.setAttribute("className", "t");
    /** @type {string} */
    d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    e = d.getElementsByTagName("a")[0];
    select = element.createElement("select");
    opt = select.appendChild(element.createElement("option"));
    input = d.getElementsByTagName("input")[0];
    /** @type {string} */
    e.style.cssText = "top:1px";
    /** @type {boolean} */
    support.getSetAttribute = "t" !== d.className;
    /** @type {boolean} */
    support.style = /top/.test(e.getAttribute("style"));
    /** @type {boolean} */
    support.hrefNormalized = "/a" === e.getAttribute("href");
    /** @type {boolean} */
    support.checkOn = !!input.value;
    support.optSelected = opt.selected;
    /** @type {boolean} */
    support.enctype = !!element.createElement("form").enctype;
    /** @type {boolean} */
    select.disabled = true;
    /** @type {boolean} */
    support.optDisabled = !opt.disabled;
    input = element.createElement("input");
    input.setAttribute("value", "");
    /** @type {boolean} */
    support.input = "" === input.getAttribute("value");
    /** @type {string} */
    input.value = "t";
    input.setAttribute("type", "radio");
    /** @type {boolean} */
    support.radioValue = "t" === input.value;
  })();
  /** @type {RegExp} */
  var rreturn = /\r/g;
  jQuery.fn.extend({
    /**
     * @param {Function} value
     * @return {?}
     */
    val : function(value) {
      var hooks;
      var ret;
      var isFunction;
      var elem = this[0];
      if (arguments.length) {
        return isFunction = jQuery.isFunction(value), this.each(function(i) {
          var val;
          if (1 === this.nodeType) {
            val = isFunction ? value.call(this, i, jQuery(this).val()) : value;
            if (null == val) {
              /** @type {string} */
              val = "";
            } else {
              if ("number" == typeof val) {
                val += "";
              } else {
                if (jQuery.isArray(val)) {
                  val = jQuery.map(val, function(month) {
                    return null == month ? "" : month + "";
                  });
                }
              }
            }
            hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!(hooks && ("set" in hooks && void 0 !== hooks.set(this, val, "value")))) {
              this.value = val;
            }
          }
        });
      }
      if (elem) {
        return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && ("get" in hooks && void 0 !== (ret = hooks.get(elem, "value"))) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
      }
    }
  });
  jQuery.extend({
    valHooks : {
      option : {
        /**
         * @param {string} type
         * @return {?}
         */
        get : function(type) {
          var text = jQuery.find.attr(type, "value");
          return null != text ? text : jQuery.trim(jQuery.text(type));
        }
      },
      select : {
        /**
         * @param {Element} elem
         * @return {?}
         */
        get : function(elem) {
          var copies;
          var option;
          var options = elem.options;
          var index = elem.selectedIndex;
          /** @type {boolean} */
          var one = "select-one" === elem.type || 0 > index;
          /** @type {(Array|null)} */
          var out = one ? null : [];
          var max = one ? index + 1 : options.length;
          var i = 0 > index ? max : one ? index : 0;
          for (;max > i;i++) {
            if (option = options[i], !(!option.selected && i !== index || ((support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup")))) {
              if (copies = jQuery(option).val(), one) {
                return copies;
              }
              out.push(copies);
            }
          }
          return out;
        },
        /**
         * @param {Element} b
         * @param {Object} value
         * @return {?}
         */
        set : function(b, value) {
          var selected;
          var elem;
          var nodes = b.options;
          var values = jQuery.makeArray(value);
          var i = nodes.length;
          for (;i--;) {
            if (elem = nodes[i], jQuery.inArray(jQuery.valHooks.option.get(elem), values) >= 0) {
              try {
                /** @type {boolean} */
                elem.selected = selected = true;
              } catch (h) {
                elem.scrollHeight;
              }
            } else {
              /** @type {boolean} */
              elem.selected = false;
            }
          }
          return selected || (b.selectedIndex = -1), nodes;
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      /**
       * @param {string} elem
       * @param {Object} values
       * @return {?}
       */
      set : function(elem, values) {
        return jQuery.isArray(values) ? elem.checked = jQuery.inArray(jQuery(elem).val(), values) >= 0 : void 0;
      }
    };
    if (!support.checkOn) {
      /**
       * @param {?} elem
       * @return {?}
       */
      jQuery.valHooks[this].get = function(elem) {
        return null === elem.getAttribute("value") ? "on" : elem.value;
      };
    }
  });
  var nodeHook;
  var boolHook;
  var object = jQuery.expr.attrHandle;
  /** @type {RegExp} */
  var exclude = /^(?:checked|selected)$/i;
  var getSetAttribute = support.getSetAttribute;
  var str = support.input;
  jQuery.fn.extend({
    /**
     * @param {string} name
     * @param {boolean} val
     * @return {?}
     */
    attr : function(name, val) {
      return access(this, jQuery.attr, name, val, arguments.length > 1);
    },
    /**
     * @param {string} name
     * @return {?}
     */
    removeAttr : function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    /**
     * @param {string} elem
     * @param {Object} name
     * @param {Object} value
     * @return {?}
     */
    attr : function(elem, name, value) {
      var hooks;
      var ret;
      var nodeType = elem.nodeType;
      if (elem && (3 !== nodeType && (8 !== nodeType && 2 !== nodeType))) {
        return typeof elem.getAttribute === text ? jQuery.prop(elem, name, value) : (1 === nodeType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && ("get" in hooks && null !== (ret = hooks.get(elem, name))) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret) : null !== value ? hooks && ("set" in hooks && void 0 !== (ret = hooks.set(elem, value, name))) ? 
        ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name));
      }
    },
    /**
     * @param {Object} elem
     * @param {string} value
     * @return {undefined}
     */
    removeAttr : function(elem, value) {
      var name;
      var propName;
      /** @type {number} */
      var i = 0;
      var attrNames = value && value.match(core_rnotwhite);
      if (attrNames && 1 === elem.nodeType) {
        for (;name = attrNames[i++];) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            if (str && getSetAttribute || !exclude.test(name)) {
              /** @type {boolean} */
              elem[propName] = false;
            } else {
              /** @type {boolean} */
              elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
            }
          } else {
            jQuery.attr(elem, name, "");
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
        }
      }
    },
    attrHooks : {
      type : {
        /**
         * @param {Element} elem
         * @param {Object} value
         * @return {?}
         */
        set : function(elem, value) {
          if (!support.radioValue && ("radio" === value && jQuery.nodeName(elem, "input"))) {
            var val = elem.value;
            return elem.setAttribute("type", value), val && (elem.value = val), value;
          }
        }
      }
    }
  });
  boolHook = {
    /**
     * @param {Object} elem
     * @param {Object} value
     * @param {string} name
     * @return {?}
     */
    set : function(elem, value, name) {
      return value === false ? jQuery.removeAttr(elem, name) : str && getSetAttribute || !exclude.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = true, name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(dataAndEvents, name) {
    var getter = object[name] || jQuery.find.attr;
    /** @type {function (string, Object, Object): ?} */
    object[name] = str && getSetAttribute || !exclude.test(name) ? function(elem, name, isXML) {
      var source;
      var value;
      return isXML || (value = object[name], object[name] = source, source = null != getter(elem, name, isXML) ? name.toLowerCase() : null, object[name] = value), source;
    } : function(dataAndEvents, name, deepDataAndEvents) {
      return deepDataAndEvents ? void 0 : dataAndEvents[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
    };
  });
  if (!(str && getSetAttribute)) {
    jQuery.attrHooks.value = {
      /**
       * @param {string} elem
       * @param {Object} value
       * @param {string} name
       * @return {?}
       */
      set : function(elem, value, name) {
        return jQuery.nodeName(elem, "input") ? void(elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
      }
    };
  }
  if (!getSetAttribute) {
    nodeHook = {
      /**
       * @param {Object} elem
       * @param {string} value
       * @param {string} name
       * @return {?}
       */
      set : function(elem, value, name) {
        var ret = elem.getAttributeNode(name);
        return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : void 0;
      }
    };
    /** @type {function (Object, ?, boolean): ?} */
    object.id = object.name = object.coords = function(elem, name, isXML) {
      var weight;
      return isXML ? void 0 : (weight = elem.getAttributeNode(name)) && "" !== weight.value ? weight.value : null;
    };
    jQuery.valHooks.button = {
      /**
       * @param {Object} elem
       * @param {boolean} name
       * @return {?}
       */
      get : function(elem, name) {
        var node = elem.getAttributeNode(name);
        return node && node.specified ? node.value : void 0;
      },
      /** @type {function (Object, string, string): ?} */
      set : nodeHook.set
    };
    jQuery.attrHooks.contenteditable = {
      /**
       * @param {string} elem
       * @param {Object} value
       * @param {string} name
       * @return {undefined}
       */
      set : function(elem, value, name) {
        nodeHook.set(elem, "" === value ? false : value, name);
      }
    };
    jQuery.each(["width", "height"], function(dataAndEvents, name) {
      jQuery.attrHooks[name] = {
        /**
         * @param {?} elem
         * @param {Object} value
         * @return {?}
         */
        set : function(elem, value) {
          return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
        }
      };
    });
  }
  if (!support.style) {
    jQuery.attrHooks.style = {
      /**
       * @param {string} second
       * @return {?}
       */
      get : function(second) {
        return second.style.cssText || void 0;
      },
      /**
       * @param {string} b
       * @param {Object} value
       * @return {?}
       */
      set : function(b, value) {
        return b.style.cssText = value + "";
      }
    };
  }
  /** @type {RegExp} */
  var rinputs = /^(?:input|select|textarea|button|object)$/i;
  /** @type {RegExp} */
  var rheader = /^(?:a|area)$/i;
  jQuery.fn.extend({
    /**
     * @param {string} name
     * @param {Object} value
     * @return {?}
     */
    prop : function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    /**
     * @param {Text} name
     * @return {?}
     */
    removeProp : function(name) {
      return name = jQuery.propFix[name] || name, this.each(function() {
        try {
          this[name] = void 0;
          delete this[name];
        } catch (b) {
        }
      });
    }
  });
  jQuery.extend({
    propFix : {
      "for" : "htmlFor",
      "class" : "className"
    },
    /**
     * @param {string} elem
     * @param {Object} name
     * @param {Object} value
     * @return {?}
     */
    prop : function(elem, name, value) {
      var ret;
      var hooks;
      var n;
      var nodeType = elem.nodeType;
      if (elem && (3 !== nodeType && (8 !== nodeType && 2 !== nodeType))) {
        return n = 1 !== nodeType || !jQuery.isXMLDoc(elem), n && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && ("set" in hooks && void 0 !== (ret = hooks.set(elem, value, name))) ? ret : elem[name] = value : hooks && ("get" in hooks && null !== (ret = hooks.get(elem, name))) ? ret : elem[name];
      }
    },
    propHooks : {
      tabIndex : {
        /**
         * @param {(Object|string)} elem
         * @return {?}
         */
        get : function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rinputs.test(elem.nodeName) || rheader.test(elem.nodeName) && elem.href ? 0 : -1;
        }
      }
    }
  });
  if (!support.hrefNormalized) {
    jQuery.each(["href", "src"], function(dataAndEvents, name) {
      jQuery.propHooks[name] = {
        /**
         * @param {string} elem
         * @return {?}
         */
        get : function(elem) {
          return elem.getAttribute(name, 4);
        }
      };
    });
  }
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      /**
       * @param {string} elem
       * @return {?}
       */
      get : function(elem) {
        var parent = elem.parentNode;
        return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null;
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  if (!support.enctype) {
    /** @type {string} */
    jQuery.propFix.enctype = "encoding";
  }
  /** @type {RegExp} */
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    /**
     * @param {string} value
     * @return {?}
     */
    addClass : function(value) {
      var classes;
      var elem;
      var cur;
      var clazz;
      var j;
      var finalValue;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      /** @type {(boolean|string)} */
      var proceed = "string" == typeof value && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(core_rnotwhite) || [];
        for (;l > i;i++) {
          if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
            /** @type {number} */
            j = 0;
            for (;clazz = classes[j++];) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    /**
     * @param {string} value
     * @return {?}
     */
    removeClass : function(value) {
      var res;
      var elem;
      var cur;
      var apn;
      var resLength;
      var finalValue;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      /** @type {(boolean|string)} */
      var j = 0 === arguments.length || "string" == typeof value && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (j) {
        res = (value || "").match(core_rnotwhite) || [];
        for (;l > i;i++) {
          if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
            /** @type {number} */
            resLength = 0;
            for (;apn = res[resLength++];) {
              for (;cur.indexOf(" " + apn + " ") >= 0;) {
                /** @type {string} */
                cur = cur.replace(" " + apn + " ", " ");
              }
            }
            finalValue = value ? jQuery.trim(cur) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    /**
     * @param {string} value
     * @param {boolean} stateVal
     * @return {?}
     */
    toggleClass : function(value, stateVal) {
      /** @type {string} */
      var type = typeof value;
      return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      } : function() {
        if ("string" === type) {
          var className;
          /** @type {number} */
          var i = 0;
          var self = jQuery(this);
          var classNames = value.match(core_rnotwhite) || [];
          for (;className = classNames[i++];) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else {
          if (type === text || "boolean" === type) {
            if (this.className) {
              jQuery._data(this, "__className__", this.className);
            }
            this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
          }
        }
      });
    },
    /**
     * @param {string} type
     * @return {?}
     */
    hasClass : function(type) {
      /** @type {string} */
      var tval = " " + type + " ";
      /** @type {number} */
      var i = 0;
      var l = this.length;
      for (;l > i;i++) {
        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(tval) >= 0) {
          return true;
        }
      }
      return false;
    }
  });
  jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(dataAndEvents, fix) {
    /**
     * @param {Object} data
     * @param {Object} fn
     * @return {?}
     */
    jQuery.fn[fix] = function(data, fn) {
      return arguments.length > 0 ? this.on(fix, null, data, fn) : this.trigger(fix);
    };
  });
  jQuery.fn.extend({
    /**
     * @param {undefined} fnOver
     * @param {Object} fnOut
     * @return {?}
     */
    hover : function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    /**
     * @param {string} type
     * @param {Function} data
     * @param {Object} fn
     * @return {?}
     */
    bind : function(type, data, fn) {
      return this.on(type, null, data, fn);
    },
    /**
     * @param {string} type
     * @param {Object} fn
     * @return {?}
     */
    unbind : function(type, fn) {
      return this.off(type, null, fn);
    },
    /**
     * @param {Object} selector
     * @param {string} action
     * @param {Object} data
     * @param {Object} fn
     * @return {?}
     */
    delegate : function(selector, action, data, fn) {
      return this.on(action, selector, data, fn);
    },
    /**
     * @param {string} selector
     * @param {string} event
     * @param {Object} fn
     * @return {?}
     */
    undelegate : function(selector, event, fn) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(event, selector || "**", fn);
    }
  });
  var iIdCounter = jQuery.now();
  /** @type {RegExp} */
  var rquery = /\?/;
  /** @type {RegExp} */
  var rSlash = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  /**
   * @param {Object} data
   * @return {?}
   */
  jQuery.parseJSON = function(data) {
    if (win.JSON && win.JSON.parse) {
      return win.JSON.parse(data + "");
    }
    var result;
    /** @type {null} */
    var deferred = null;
    var s = jQuery.trim(data + "");
    return s && !jQuery.trim(s.replace(rSlash, function(promise, err2, err, dataAndEvents) {
      return result && (err2 && (deferred = 0)), 0 === deferred ? promise : (result = err || err2, deferred += !dataAndEvents - !err, "");
    })) ? Function("return " + s)() : jQuery.error("Invalid JSON: " + data);
  };
  /**
   * @param {string} data
   * @return {?}
   */
  jQuery.parseXML = function(data) {
    var xml;
    var tmp;
    if (!data || "string" != typeof data) {
      return null;
    }
    try {
      if (win.DOMParser) {
        /** @type {DOMParser} */
        tmp = new DOMParser;
        /** @type {(Document|null)} */
        xml = tmp.parseFromString(data, "text/xml");
      } else {
        xml = new ActiveXObject("Microsoft.XMLDOM");
        /** @type {string} */
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = void 0;
    }
    return xml && (xml.documentElement && !xml.getElementsByTagName("parsererror").length) || jQuery.error("Invalid XML: " + data), xml;
  };
  var prop;
  var ajaxLocation;
  /** @type {RegExp} */
  var currDirRegExp = /#.*$/;
  /** @type {RegExp} */
  var rts = /([?&])_=[^&]*/;
  /** @type {RegExp} */
  var re = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
  /** @type {RegExp} */
  var fnTest = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  /** @type {RegExp} */
  var rnoContent = /^(?:GET|HEAD)$/;
  /** @type {RegExp} */
  var rprotocol = /^\/\//;
  /** @type {RegExp} */
  var quickExpr = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;
  var prefilters = {};
  var transports = {};
  /** @type {string} */
  var Jb = "*/".concat("*");
  try {
    /** @type {string} */
    ajaxLocation = location.href;
  } catch (Kb) {
    ajaxLocation = element.createElement("a");
    /** @type {string} */
    ajaxLocation.href = "";
    /** @type {string} */
    ajaxLocation = ajaxLocation.href;
  }
  /** @type {Array} */
  prop = quickExpr.exec(ajaxLocation.toLowerCase()) || [];
  jQuery.extend({
    active : 0,
    lastModified : {},
    etag : {},
    ajaxSettings : {
      url : ajaxLocation,
      type : "GET",
      isLocal : fnTest.test(prop[1]),
      global : true,
      processData : true,
      async : true,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      accepts : {
        "*" : Jb,
        text : "text/plain",
        html : "text/html",
        xml : "application/xml, text/xml",
        json : "application/json, text/javascript"
      },
      contents : {
        xml : /xml/,
        html : /html/,
        json : /json/
      },
      responseFields : {
        xml : "responseXML",
        text : "responseText",
        json : "responseJSON"
      },
      converters : {
        /** @type {function (new:String, *=): string} */
        "* text" : String,
        "text html" : true,
        /** @type {function (Object): ?} */
        "text json" : jQuery.parseJSON,
        /** @type {function (string): ?} */
        "text xml" : jQuery.parseXML
      },
      flatOptions : {
        url : true,
        context : true
      }
    },
    /**
     * @param {(Object|string)} target
     * @param {Object} settings
     * @return {?}
     */
    ajaxSetup : function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
    ajaxTransport : addToPrefiltersOrTransports(transports),
    /**
     * @param {Object} url
     * @param {Object} options
     * @return {?}
     */
    ajax : function(url, options) {
      /**
       * @param {number} status
       * @param {(number|string)} nativeStatusText
       * @param {Object} responses
       * @param {string} total
       * @return {undefined}
       */
      function done(status, nativeStatusText, responses, total) {
        var isSuccess;
        var success;
        var error;
        var response;
        var modified;
        /** @type {(number|string)} */
        var statusText = nativeStatusText;
        if (2 !== number) {
          /** @type {number} */
          number = 2;
          if (tref) {
            clearTimeout(tref);
          }
          transport = void 0;
          value = total || "";
          /** @type {number} */
          jqXHR.readyState = status > 0 ? 4 : 0;
          /** @type {boolean} */
          isSuccess = status >= 200 && 300 > status || 304 === status;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (204 === status || "HEAD" === s.type) {
              /** @type {string} */
              statusText = "nocontent";
            } else {
              if (304 === status) {
                /** @type {string} */
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                /** @type {boolean} */
                isSuccess = !error;
              }
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              /** @type {string} */
              statusText = "error";
              if (0 > status) {
                /** @type {number} */
                status = 0;
              }
            }
          }
          /** @type {number} */
          jqXHR.status = status;
          /** @type {string} */
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(scripts, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(scripts, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (h) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(scripts, [jqXHR, statusText]);
          if (h) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
      }
      if ("object" == typeof url) {
        /** @type {Object} */
        options = url;
        url = void 0;
      }
      options = options || {};
      var c;
      var i;
      var cacheURL;
      var value;
      var tref;
      var h;
      var transport;
      var target;
      var s = jQuery.ajaxSetup({}, options);
      var scripts = s.context || s;
      var globalEventContext = s.context && (scripts.nodeType || scripts.jquery) ? jQuery(scripts) : jQuery.event;
      var deferred = jQuery.Deferred();
      var completeDeferred = jQuery.Callbacks("once memory");
      var statusCode = s.statusCode || {};
      var requestHeaders = {};
      var requestHeadersNames = {};
      /** @type {number} */
      var number = 0;
      /** @type {string} */
      var strAbort = "canceled";
      var jqXHR = {
        readyState : 0,
        /**
         * @param {string} key
         * @return {?}
         */
        getResponseHeader : function(key) {
          var src;
          if (2 === number) {
            if (!target) {
              target = {};
              for (;src = re.exec(value);) {
                /** @type {string} */
                target[src[1].toLowerCase()] = src[2];
              }
            }
            src = target[key.toLowerCase()];
          }
          return null == src ? null : src;
        },
        /**
         * @return {?}
         */
        getAllResponseHeaders : function() {
          return 2 === number ? value : null;
        },
        /**
         * @param {string} name
         * @param {?} value
         * @return {?}
         */
        setRequestHeader : function(name, value) {
          var lname = name.toLowerCase();
          return number || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this;
        },
        /**
         * @param {(Object|number)} type
         * @return {?}
         */
        overrideMimeType : function(type) {
          return number || (s.mimeType = type), this;
        },
        /**
         * @param {Object} map
         * @return {?}
         */
        statusCode : function(map) {
          var letter;
          if (map) {
            if (2 > number) {
              for (letter in map) {
                /** @type {Array} */
                statusCode[letter] = [statusCode[letter], map[letter]];
              }
            } else {
              jqXHR.always(map[jqXHR.status]);
            }
          }
          return this;
        },
        /**
         * @param {string} statusText
         * @return {?}
         */
        abort : function(statusText) {
          var finalText = statusText || strAbort;
          return transport && transport.abort(finalText), done(0, finalText), this;
        }
      };
      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || (s.url || ajaxLocation)) + "").replace(currDirRegExp, "").replace(rprotocol, prop[1] + "//"), s.type = options.method || (options.type || (s.method || s.type)), s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], null == s.crossDomain && (c = quickExpr.exec(s.url.toLowerCase()), s.crossDomain = !(!c || c[1] === prop[1] && (c[2] === 
      prop[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (prop[3] || ("http:" === prop[1] ? "80" : "443"))))), s.data && (s.processData && ("string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)))), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === number) {
        return jqXHR;
      }
      h = jQuery.event && s.global;
      if (h) {
        if (0 === jQuery.active++) {
          jQuery.event.trigger("ajaxStart");
        }
      }
      s.type = s.type.toUpperCase();
      /** @type {boolean} */
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          /** @type {string} */
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + iIdCounter++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + iIdCounter++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && (s.hasContent && s.contentType !== false) || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(scripts, jqXHR, s) === false || 2 === number)) {
        return jqXHR.abort();
      }
      /** @type {string} */
      strAbort = "abort";
      for (i in{
        success : 1,
        error : 1,
        complete : 1
      }) {
        jqXHR[i](s[i]);
      }
      if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        /** @type {number} */
        jqXHR.readyState = 1;
        if (h) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async) {
          if (s.timeout > 0) {
            /** @type {number} */
            tref = setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
        }
        try {
          /** @type {number} */
          number = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (!(2 > number)) {
            throw e;
          }
          done(-1, e);
        }
      } else {
        done(-1, "No Transport");
      }
      return jqXHR;
    },
    /**
     * @param {string} elem
     * @param {boolean} name
     * @param {string} callback
     * @return {?}
     */
    getJSON : function(elem, name, callback) {
      return jQuery.get(elem, name, callback, "json");
    },
    /**
     * @param {string} elem
     * @param {string} callback
     * @return {?}
     */
    getScript : function(elem, callback) {
      return jQuery.get(elem, void 0, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(dataAndEvents, method) {
    /**
     * @param {string} requestUrl
     * @param {(Function|string)} html
     * @param {(Function|string)} success
     * @param {Object} dataType
     * @return {?}
     */
    jQuery[method] = function(requestUrl, html, success, dataType) {
      return jQuery.isFunction(html) && (dataType = dataType || success, success = html, html = void 0), jQuery.ajax({
        url : requestUrl,
        type : method,
        dataType : dataType,
        data : html,
        success : success
      });
    };
  });
  /**
   * @param {string} url
   * @return {?}
   */
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url : url,
      type : "GET",
      dataType : "script",
      async : false,
      global : false,
      "throws" : true
    });
  };
  jQuery.fn.extend({
    /**
     * @param {string} qualifier
     * @return {?}
     */
    wrapAll : function(qualifier) {
      if (jQuery.isFunction(qualifier)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(qualifier.call(this, i));
        });
      }
      if (this[0]) {
        var wrap = jQuery(qualifier, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var sandbox = this;
          for (;sandbox.firstChild && 1 === sandbox.firstChild.nodeType;) {
            sandbox = sandbox.firstChild;
          }
          return sandbox;
        }).append(this);
      }
      return this;
    },
    /**
     * @param {Function} html
     * @return {?}
     */
    wrapInner : function(html) {
      return this.each(jQuery.isFunction(html) ? function(i) {
        jQuery(this).wrapInner(html.call(this, i));
      } : function() {
        var self = jQuery(this);
        var contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    /**
     * @param {Function} html
     * @return {?}
     */
    wrap : function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    /**
     * @return {?}
     */
    unwrap : function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  /**
   * @param {string} type
   * @return {?}
   */
  jQuery.expr.filters.hidden = function(type) {
    return type.offsetWidth <= 0 && type.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (type.style && type.style.display || jQuery.css(type, "display"));
  };
  /**
   * @param {string} cycle
   * @return {?}
   */
  jQuery.expr.filters.visible = function(cycle) {
    return!jQuery.expr.filters.hidden(cycle);
  };
  /** @type {RegExp} */
  var rQuot = /%20/g;
  /** @type {RegExp} */
  var rmargin = /\[\]$/;
  /** @type {RegExp} */
  var rCRLF = /\r?\n/g;
  /** @type {RegExp} */
  var mouseTypeRegex = /^(?:submit|button|image|reset|file)$/i;
  /** @type {RegExp} */
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  /**
   * @param {Object} a
   * @param {Object} traditional
   * @return {?}
   */
  jQuery.param = function(a, traditional) {
    var prefix;
    /** @type {Array} */
    var klass = [];
    /**
     * @param {?} key
     * @param {string} value
     * @return {undefined}
     */
    var add = function(key, value) {
      value = jQuery.isFunction(value) ? value() : null == value ? "" : value;
      /** @type {string} */
      klass[klass.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return klass.join("&").replace(rQuot, "+");
  };
  jQuery.fn.extend({
    /**
     * @return {?}
     */
    serialize : function() {
      return jQuery.param(this.serializeArray());
    },
    /**
     * @return {?}
     */
    serializeArray : function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && (!jQuery(this).is(":disabled") && (rsubmittable.test(this.nodeName) && (!mouseTypeRegex.test(type) && (this.checked || !manipulation_rcheckableType.test(type)))));
      }).map(function(dataAndEvents, elem) {
        var val = jQuery(this).val();
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return{
            name : elem.name,
            value : val.replace(rCRLF, "\r\n")
          };
        }) : {
          name : elem.name,
          value : val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  /** @type {function (): ?} */
  jQuery.ajaxSettings.xhr = void 0 !== win.ActiveXObject ? function() {
    return!this.isLocal && (/^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR()) || createActiveXHR();
  } : createStandardXHR;
  /** @type {number} */
  var rightId = 0;
  var map = {};
  var nativeXHR = jQuery.ajaxSettings.xhr();
  if (win.attachEvent) {
    win.attachEvent("onunload", function() {
      var letter;
      for (letter in map) {
        map[letter](void 0, true);
      }
    });
  }
  /** @type {boolean} */
  support.cors = !!nativeXHR && "withCredentials" in nativeXHR;
  /** @type {boolean} */
  nativeXHR = support.ajax = !!nativeXHR;
  if (nativeXHR) {
    jQuery.ajaxTransport(function(s) {
      if (!s.crossDomain || support.cors) {
        var callback;
        return{
          /**
           * @param {Object} headers
           * @param {Function} complete
           * @return {undefined}
           */
          send : function(headers, complete) {
            var i;
            var xhr = s.xhr();
            /** @type {number} */
            var id = ++rightId;
            if (xhr.open(s.type, s.url, s.async, s.username, s.password), s.xhrFields) {
              for (i in s.xhrFields) {
                xhr[i] = s.xhrFields[i];
              }
            }
            if (s.mimeType) {
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType(s.mimeType);
              }
            }
            if (!s.crossDomain) {
              if (!headers["X-Requested-With"]) {
                /** @type {string} */
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
            }
            for (i in headers) {
              if (void 0 !== headers[i]) {
                xhr.setRequestHeader(i, headers[i] + "");
              }
            }
            xhr.send(s.hasContent && s.data || null);
            /**
             * @param {?} opt_attributes
             * @param {boolean} isAbort
             * @return {undefined}
             */
            callback = function(opt_attributes, isAbort) {
              var e;
              var statusText;
              var responses;
              if (callback && (isAbort || 4 === xhr.readyState)) {
                if (delete map[id], callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) {
                  if (4 !== xhr.readyState) {
                    xhr.abort();
                  }
                } else {
                  responses = {};
                  e = xhr.status;
                  if ("string" == typeof xhr.responseText) {
                    /** @type {string} */
                    responses.text = xhr.responseText;
                  }
                  try {
                    statusText = xhr.statusText;
                  } catch (k) {
                    /** @type {string} */
                    statusText = "";
                  }
                  if (e || (!s.isLocal || s.crossDomain)) {
                    if (1223 === e) {
                      /** @type {number} */
                      e = 204;
                    }
                  } else {
                    /** @type {number} */
                    e = responses.text ? 200 : 404;
                  }
                }
              }
              if (responses) {
                complete(e, statusText, responses, xhr.getAllResponseHeaders());
              }
            };
            if (s.async) {
              if (4 === xhr.readyState) {
                setTimeout(callback);
              } else {
                /** @type {function (?, boolean): undefined} */
                xhr.onreadystatechange = map[id] = callback;
              }
            } else {
              callback();
            }
          },
          /**
           * @return {undefined}
           */
          abort : function() {
            if (callback) {
              callback(void 0, true);
            }
          }
        };
      }
    });
  }
  jQuery.ajaxSetup({
    accepts : {
      script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents : {
      script : /(?:java|ecma)script/
    },
    converters : {
      /**
       * @param {?} value
       * @return {?}
       */
      "text script" : function(value) {
        return jQuery.globalEval(value), value;
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (void 0 === s.cache) {
      /** @type {boolean} */
      s.cache = false;
    }
    if (s.crossDomain) {
      /** @type {string} */
      s.type = "GET";
      /** @type {boolean} */
      s.global = false;
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script;
      var head = element.head || (jQuery("head")[0] || element.documentElement);
      return{
        /**
         * @param {?} _
         * @param {Function} callback
         * @return {undefined}
         */
        send : function(_, callback) {
          script = element.createElement("script");
          /** @type {boolean} */
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          /** @type {function (?, boolean): undefined} */
          script.onload = script.onreadystatechange = function(evt, aEvt) {
            if (aEvt || (!script.readyState || /loaded|complete/.test(script.readyState))) {
              /** @type {null} */
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
              /** @type {null} */
              script = null;
              if (!aEvt) {
                callback(200, "success");
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        /**
         * @return {undefined}
         */
        abort : function() {
          if (script) {
            script.onload(void 0, true);
          }
        }
      };
    }
  });
  /** @type {Array} */
  var eventPath = [];
  /** @type {RegExp} */
  var rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp : "callback",
    /**
     * @return {?}
     */
    jsonpCallback : function() {
      var unlock = eventPath.pop() || jQuery.expando + "_" + iIdCounter++;
      return this[unlock] = true, unlock;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName;
    var overwritten;
    var responseContainer;
    /** @type {(boolean|string)} */
    var jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && (!(s.contentType || "").indexOf("application/x-www-form-urlencoded") && (rjsonp.test(s.data) && "data")));
    return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
      return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
    }, s.dataTypes[0] = "json", overwritten = win[callbackName], win[callbackName] = function() {
      /** @type {Arguments} */
      responseContainer = arguments;
    }, jqXHR.always(function() {
      win[callbackName] = overwritten;
      if (s[callbackName]) {
        s.jsonpCallback = originalSettings.jsonpCallback;
        eventPath.push(callbackName);
      }
      if (responseContainer) {
        if (jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
      }
      responseContainer = overwritten = void 0;
    }), "script") : void 0;
  });
  /**
   * @param {?} data
   * @param {Object} context
   * @param {(Function|string)} keepScripts
   * @return {?}
   */
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || "string" != typeof data) {
      return null;
    }
    if ("boolean" == typeof context) {
      /** @type {Object} */
      keepScripts = context;
      /** @type {boolean} */
      context = false;
    }
    context = context || element;
    /** @type {(Array.<string>|null)} */
    var parsed = rsingleTag.exec(data);
    /** @type {(Array|boolean)} */
    var scripts = !keepScripts && [];
    return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && (scripts.length && jQuery(scripts).remove()), jQuery.merge([], parsed.childNodes));
  };
  /** @type {function (string, Object, Object): ?} */
  var matcherFunction = jQuery.fn.load;
  /**
   * @param {string} url
   * @param {Object} data
   * @param {Object} attributes
   * @return {?}
   */
  jQuery.fn.load = function(url, data, attributes) {
    if ("string" != typeof url && matcherFunction) {
      return matcherFunction.apply(this, arguments);
    }
    var selector;
    var response;
    var type;
    var self = this;
    var off = url.indexOf(" ");
    return off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), jQuery.isFunction(data) ? (attributes = data, data = void 0) : data && ("object" == typeof data && (type = "POST")), self.length > 0 && jQuery.ajax({
      url : url,
      type : type,
      dataType : "html",
      data : data
    }).done(function(responseText) {
      /** @type {Arguments} */
      response = arguments;
      self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
    }).complete(attributes && function(type, obj) {
      self.each(attributes, response || [type.responseText, obj, type]);
    }), this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(dataAndEvents, name) {
    /**
     * @param {Object} selector
     * @return {?}
     */
    jQuery.fn[name] = function(selector) {
      return this.on(name, selector);
    };
  });
  /**
   * @param {undefined} elem
   * @return {?}
   */
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = win.document.documentElement;
  jQuery.offset = {
    /**
     * @param {string} elem
     * @param {Object} options
     * @param {number} i
     * @return {undefined}
     */
    setOffset : function(elem, options, i) {
      var curPosition;
      var curLeft;
      var curCSSTop;
      var curTop;
      var curOffset;
      var curCSSLeft;
      var j;
      var position = jQuery.css(elem, "position");
      var curElem = jQuery(elem);
      var props = {};
      if ("static" === position) {
        /** @type {string} */
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      /** @type {boolean} */
      j = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
      if (j) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        /** @type {number} */
        curTop = parseFloat(curCSSTop) || 0;
        /** @type {number} */
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (null != options.top) {
        /** @type {number} */
        props.top = options.top - curOffset.top + curTop;
      }
      if (null != options.left) {
        /** @type {number} */
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @return {?}
     */
    offset : function(type) {
      if (arguments.length) {
        return void 0 === type ? this : this.each(function(dataName) {
          jQuery.offset.setOffset(this, type, dataName);
        });
      }
      var doc;
      var win;
      var animation = {
        top : 0,
        left : 0
      };
      var b = this[0];
      var elem = b && b.ownerDocument;
      if (elem) {
        return doc = elem.documentElement, jQuery.contains(doc, b) ? (typeof b.getBoundingClientRect !== text && (animation = b.getBoundingClientRect()), win = getWindow(elem), {
          top : animation.top + (win.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
          left : animation.left + (win.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        }) : animation;
      }
    },
    /**
     * @return {?}
     */
    position : function() {
      if (this[0]) {
        var offsetParent;
        var offset;
        var parentOffset = {
          top : 0,
          left : 0
        };
        var n = this[0];
        return "fixed" === jQuery.css(n, "position") ? offset = n.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)), {
          top : offset.top - parentOffset.top - jQuery.css(n, "marginTop", true),
          left : offset.left - parentOffset.left - jQuery.css(n, "marginLeft", true)
        };
      }
    },
    /**
     * @return {?}
     */
    offsetParent : function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        for (;offsetParent && (!jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"));) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft : "pageXOffset",
    scrollTop : "pageYOffset"
  }, function(name, key) {
    /** @type {boolean} */
    var raw = /Y/.test(key);
    /**
     * @param {string} isXML
     * @return {?}
     */
    jQuery.fn[name] = function(isXML) {
      return access(this, function(elem, method, value) {
        var scripts = getWindow(elem);
        return void 0 === value ? scripts ? key in scripts ? scripts[key] : scripts.document.documentElement[method] : elem[method] : void(scripts ? scripts.scrollTo(raw ? jQuery(scripts).scrollLeft() : value, raw ? value : jQuery(scripts).scrollTop()) : elem[method] = value);
      }, name, isXML, arguments.length, null);
    };
  });
  jQuery.each(["top", "left"], function(dataAndEvents, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(dest, val) {
      return val ? (val = get(dest, prop), rnumnonpx.test(val) ? jQuery(dest).position()[prop] + "px" : val) : void 0;
    });
  });
  jQuery.each({
    Height : "height",
    Width : "width"
  }, function(name, type) {
    jQuery.each({
      padding : "inner" + name,
      content : type,
      "" : "outer" + name
    }, function(defaultExtra, original) {
      /**
       * @param {?} margin
       * @param {boolean} value
       * @return {?}
       */
      jQuery.fn[original] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
        var extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, prop, value) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, prop, extra) : jQuery.style(elem, prop, value, extra);
        }, type, chainable ? margin : void 0, chainable, null);
      };
    });
  });
  /**
   * @return {?}
   */
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if ("function" == typeof define) {
    if (define.amd) {
      define("jquery", [], function() {
        return jQuery;
      });
    }
  }
  var $ = win.jQuery;
  var _$ = win.$;
  return jQuery.noConflict = function(deep) {
    return win.$ === jQuery && (win.$ = _$), deep && (win.jQuery === jQuery && (win.jQuery = $)), jQuery;
  }, typeof dataAndEvents === text && (win.jQuery = win.$ = jQuery), jQuery;
});
if ("undefined" == typeof jQuery) {
  throw new Error("Bootstrap's JavaScript requires jQuery");
}
+function($) {
  var b = $.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || (1 == b[0] && (9 == b[1] && b[2] < 1) || b[0] > 3)) {
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
  }
}(jQuery), +function($) {
  /**
   * @return {?}
   */
  function transitionEnd() {
    /** @type {Element} */
    var el = document.createElement("bootstrap");
    var transEndEventNames = {
      WebkitTransition : "webkitTransitionEnd",
      MozTransition : "transitionend",
      OTransition : "oTransitionEnd otransitionend",
      transition : "transitionend"
    };
    var name;
    for (name in transEndEventNames) {
      if (void 0 !== el.style[name]) {
        return{
          end : transEndEventNames[name]
        };
      }
    }
    return false;
  }
  /**
   * @param {number} duration
   * @return {?}
   */
  $.fn.emulateTransitionEnd = function(duration) {
    /** @type {boolean} */
    var c = false;
    var $el = this;
    $(this).one("bsTransitionEnd", function() {
      /** @type {boolean} */
      c = true;
    });
    /**
     * @return {undefined}
     */
    var callback = function() {
      if (!c) {
        $($el).trigger($.support.transition.end);
      }
    };
    return setTimeout(callback, duration), this;
  };
  $(function() {
    $.support.transition = transitionEnd();
    if ($.support.transition) {
      $.event.special.bsTransitionEnd = {
        bindType : $.support.transition.end,
        delegateType : $.support.transition.end,
        /**
         * @param {Event} event
         * @return {?}
         */
        handle : function(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments);
          }
        }
      };
    }
  });
}(jQuery), +function($) {
  /**
   * @param {?} type
   * @return {?}
   */
  function setValue(type) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.alert");
      if (!data) {
        $this.data("bs.alert", data = new Alert(this));
      }
      if ("string" == typeof type) {
        data[type].call($this);
      }
    });
  }
  /** @type {string} */
  var one = '[data-dismiss="alert"]';
  /**
   * @param {string} selector
   * @return {undefined}
   */
  var Alert = function(selector) {
    $(selector).on("click", one, this.close);
  };
  /** @type {string} */
  Alert.VERSION = "3.3.7";
  /** @type {number} */
  Alert.TRANSITION_DURATION = 150;
  /**
   * @param {Object} e
   * @return {undefined}
   */
  Alert.prototype.close = function(e) {
    /**
     * @return {undefined}
     */
    function removeElement() {
      $parent.detach().trigger("closed.bs.alert").remove();
    }
    var $this = $(this);
    var value = $this.attr("data-target");
    if (!value) {
      value = $this.attr("href");
      value = value && value.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = $("#" === value ? [] : value);
    if (e) {
      e.preventDefault();
    }
    if (!$parent.length) {
      $parent = $this.closest(".alert");
    }
    $parent.trigger(e = $.Event("close.bs.alert"));
    if (!e.isDefaultPrevented()) {
      $parent.removeClass("in");
      if ($.support.transition && $parent.hasClass("fade")) {
        $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION);
      } else {
        removeElement();
      }
    }
  };
  var old = $.fn.alert;
  /** @type {function (?): ?} */
  $.fn.alert = setValue;
  /** @type {function (string): undefined} */
  $.fn.alert.Constructor = Alert;
  /**
   * @return {?}
   */
  $.fn.alert.noConflict = function() {
    return $.fn.alert = old, this;
  };
  $(document).on("click.bs.alert.data-api", one, Alert.prototype.close);
}(jQuery), +function($) {
  /**
   * @param {string} option
   * @return {?}
   */
  function init(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.button");
      var options = "object" == typeof option && option;
      if (!data) {
        $this.data("bs.button", data = new Button(this, options));
      }
      if ("toggle" == option) {
        data.toggle();
      } else {
        if (option) {
          data.setState(option);
        }
      }
    });
  }
  /**
   * @param {string} selector
   * @param {?} options
   * @return {undefined}
   */
  var Button = function(selector, options) {
    this.$element = $(selector);
    this.options = $.extend({}, Button.DEFAULTS, options);
    /** @type {boolean} */
    this.isLoading = false;
  };
  /** @type {string} */
  Button.VERSION = "3.3.7";
  Button.DEFAULTS = {
    loadingText : "loading..."
  };
  /**
   * @param {string} state
   * @return {undefined}
   */
  Button.prototype.setState = function(state) {
    /** @type {string} */
    var elem = "disabled";
    var $el = this.$element;
    /** @type {string} */
    var val = $el.is("input") ? "val" : "html";
    var data = $el.data();
    state += "Text";
    if (null == data.resetText) {
      $el.data("resetText", $el[val]());
    }
    setTimeout($.proxy(function() {
      $el[val](null == data[state] ? this.options[state] : data[state]);
      if ("loadingText" == state) {
        /** @type {boolean} */
        this.isLoading = true;
        $el.addClass(elem).attr(elem, elem).prop(elem, true);
      } else {
        if (this.isLoading) {
          /** @type {boolean} */
          this.isLoading = false;
          $el.removeClass(elem).removeAttr(elem).prop(elem, false);
        }
      }
    }, this), 0);
  };
  /**
   * @return {undefined}
   */
  Button.prototype.toggle = function() {
    /** @type {boolean} */
    var a = true;
    var $shcell = this.$element.closest('[data-toggle="buttons"]');
    if ($shcell.length) {
      var $input = this.$element.find("input");
      if ("radio" == $input.prop("type")) {
        if ($input.prop("checked")) {
          /** @type {boolean} */
          a = false;
        }
        $shcell.find(".active").removeClass("active");
        this.$element.addClass("active");
      } else {
        if ("checkbox" == $input.prop("type")) {
          if ($input.prop("checked") !== this.$element.hasClass("active")) {
            /** @type {boolean} */
            a = false;
          }
          this.$element.toggleClass("active");
        }
      }
      $input.prop("checked", this.$element.hasClass("active"));
      if (a) {
        $input.trigger("change");
      }
    } else {
      this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
      this.$element.toggleClass("active");
    }
  };
  var old = $.fn.button;
  /** @type {function (string): ?} */
  $.fn.button = init;
  /** @type {function (string, ?): undefined} */
  $.fn.button.Constructor = Button;
  /**
   * @return {?}
   */
  $.fn.button.noConflict = function() {
    return $.fn.button = old, this;
  };
  $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(evt) {
    var self = $(evt.target).closest(".btn");
    init.call(self, "toggle");
    if (!$(evt.target).is('input[type="radio"], input[type="checkbox"]')) {
      evt.preventDefault();
      if (self.is("input,button")) {
        self.trigger("focus");
      } else {
        self.find("input:visible,button:visible").first().trigger("focus");
      }
    }
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
    $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
  });
}(jQuery), +function($) {
  /**
   * @param {number} option
   * @return {?}
   */
  function init(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.carousel");
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option);
      var action = "string" == typeof option ? option : options.slide;
      if (!data) {
        $this.data("bs.carousel", data = new Carousel(this, options));
      }
      if ("number" == typeof option) {
        data.to(option);
      } else {
        if (action) {
          data[action]();
        } else {
          if (options.interval) {
            data.pause().cycle();
          }
        }
      }
    });
  }
  /**
   * @param {string} selector
   * @param {Object} options
   * @return {undefined}
   */
  var Carousel = function(selector, options) {
    this.$element = $(selector);
    this.$indicators = this.$element.find(".carousel-indicators");
    /** @type {Object} */
    this.options = options;
    /** @type {null} */
    this.paused = null;
    /** @type {null} */
    this.sliding = null;
    /** @type {null} */
    this.interval = null;
    /** @type {null} */
    this.$active = null;
    /** @type {null} */
    this.$items = null;
    if (this.options.keyboard) {
      this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
    }
    if ("hover" == this.options.pause) {
      if (!("ontouchstart" in document.documentElement)) {
        this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
      }
    }
  };
  /** @type {string} */
  Carousel.VERSION = "3.3.7";
  /** @type {number} */
  Carousel.TRANSITION_DURATION = 600;
  Carousel.DEFAULTS = {
    interval : 5E3,
    pause : "hover",
    wrap : true,
    keyboard : true
  };
  /**
   * @param {Event} e
   * @return {undefined}
   */
  Carousel.prototype.keydown = function(e) {
    if (!/input|textarea/i.test(e.target.tagName)) {
      switch(e.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return;
      }
      e.preventDefault();
    }
  };
  /**
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  Carousel.prototype.cycle = function(dataAndEvents) {
    return dataAndEvents || (this.paused = false), this.interval && clearInterval(this.interval), this.options.interval && (!this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))), this;
  };
  /**
   * @param {?} item
   * @return {?}
   */
  Carousel.prototype.getItemIndex = function(item) {
    return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
  };
  /**
   * @param {string} b
   * @param {?} relativeToItem
   * @return {?}
   */
  Carousel.prototype.getItemForDirection = function(b, relativeToItem) {
    var index = this.getItemIndex(relativeToItem);
    /** @type {boolean} */
    var d = "prev" == b && 0 === index || "next" == b && index == this.$items.length - 1;
    if (d && !this.options.wrap) {
      return relativeToItem;
    }
    /** @type {number} */
    var count = "prev" == b ? -1 : 1;
    /** @type {number} */
    var udataCur = (index + count) % this.$items.length;
    return this.$items.eq(udataCur);
  };
  /**
   * @param {number} pos
   * @return {?}
   */
  Carousel.prototype.to = function(pos) {
    var that = this;
    var activePos = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (!(pos > this.$items.length - 1 || pos < 0)) {
      return this.sliding ? this.$element.one("slid.bs.carousel", function() {
        that.to(pos);
      }) : activePos == pos ? this.pause().cycle() : this.slide(pos > activePos ? "next" : "prev", this.$items.eq(pos));
    }
  };
  /**
   * @param {boolean} $vid
   * @return {?}
   */
  Carousel.prototype.pause = function($vid) {
    return $vid || (this.paused = true), this.$element.find(".next, .prev").length && ($.support.transition && (this.$element.trigger($.support.transition.end), this.cycle(true))), this.interval = clearInterval(this.interval), this;
  };
  /**
   * @return {?}
   */
  Carousel.prototype.next = function() {
    if (!this.sliding) {
      return this.slide("next");
    }
  };
  /**
   * @return {?}
   */
  Carousel.prototype.prev = function() {
    if (!this.sliding) {
      return this.slide("prev");
    }
  };
  /**
   * @param {string} b
   * @param {string} ui
   * @return {?}
   */
  Carousel.prototype.slide = function(b, ui) {
    var $active = this.$element.find(".item.active");
    var node = ui || this.getItemForDirection(b, $active);
    var isCycling = this.interval;
    /** @type {string} */
    var direction = "next" == b ? "left" : "right";
    var that = this;
    if (node.hasClass("active")) {
      return this.sliding = false;
    }
    var previous = node[0];
    var cycle = $.Event("slide.bs.carousel", {
      relatedTarget : previous,
      direction : direction
    });
    if (this.$element.trigger(cycle), !cycle.isDefaultPrevented()) {
      if (this.sliding = true, isCycling && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var $listing = $(this.$indicators.children()[this.getItemIndex(node)]);
        if ($listing) {
          $listing.addClass("active");
        }
      }
      var fix = $.Event("slid.bs.carousel", {
        relatedTarget : previous,
        direction : direction
      });
      return $.support.transition && this.$element.hasClass("slide") ? (node.addClass(b), node[0].offsetWidth, $active.addClass(direction), node.addClass(direction), $active.one("bsTransitionEnd", function() {
        node.removeClass([b, direction].join(" ")).addClass("active");
        $active.removeClass(["active", direction].join(" "));
        /** @type {boolean} */
        that.sliding = false;
        setTimeout(function() {
          that.$element.trigger(fix);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), node.addClass("active"), this.sliding = false, this.$element.trigger(fix)), isCycling && this.cycle(), this;
    }
  };
  var old = $.fn.carousel;
  /** @type {function (number): ?} */
  $.fn.carousel = init;
  /** @type {function (string, Object): undefined} */
  $.fn.carousel.Constructor = Carousel;
  /**
   * @return {?}
   */
  $.fn.carousel.noConflict = function() {
    return $.fn.carousel = old, this;
  };
  /**
   * @param {?} event
   * @return {undefined}
   */
  var start = function(event) {
    var href;
    var $this = $(this);
    var panel = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
    if (panel.hasClass("carousel")) {
      var next = $.extend({}, panel.data(), $this.data());
      var slideIndex = $this.attr("data-slide-to");
      if (slideIndex) {
        /** @type {boolean} */
        next.interval = false;
      }
      init.call(panel, next);
      if (slideIndex) {
        panel.data("bs.carousel").to(slideIndex);
      }
      event.preventDefault();
    }
  };
  $(document).on("click.bs.carousel.data-api", "[data-slide]", start).on("click.bs.carousel.data-api", "[data-slide-to]", start);
  $(window).on("load", function() {
    $('[data-ride="carousel"]').each(function() {
      var self = $(this);
      init.call(self, self.data());
    });
  });
}(jQuery), +function($) {
  /**
   * @param {HTMLElement} $this
   * @return {?}
   */
  function getParent($this) {
    var href;
    var statsTemplate = $this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
    return $(statsTemplate);
  }
  /**
   * @param {boolean} options
   * @return {?}
   */
  function build(options) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.collapse");
      var settings = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof options && options);
      if (!data) {
        if (settings.toggle) {
          if (/show|hide/.test(options)) {
            /** @type {boolean} */
            settings.toggle = false;
          }
        }
      }
      if (!data) {
        $this.data("bs.collapse", data = new Collapse(this, settings));
      }
      if ("string" == typeof options) {
        data[options]();
      }
    });
  }
  /**
   * @param {string} selector
   * @param {?} options
   * @return {undefined}
   */
  var Collapse = function(selector, options) {
    this.$element = $(selector);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + selector.id + '"],[data-toggle="collapse"][data-target="#' + selector.id + '"]');
    /** @type {null} */
    this.transitioning = null;
    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }
    if (this.options.toggle) {
      this.toggle();
    }
  };
  /** @type {string} */
  Collapse.VERSION = "3.3.7";
  /** @type {number} */
  Collapse.TRANSITION_DURATION = 350;
  Collapse.DEFAULTS = {
    toggle : true
  };
  /**
   * @return {?}
   */
  Collapse.prototype.dimension = function() {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height";
  };
  /**
   * @return {?}
   */
  Collapse.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var hasData;
      var self = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(self && (self.length && (hasData = self.data("bs.collapse"), hasData && hasData.transitioning)))) {
        var cycle = $.Event("show.bs.collapse");
        if (this.$element.trigger(cycle), !cycle.isDefaultPrevented()) {
          if (self) {
            if (self.length) {
              build.call(self, "hide");
              if (!hasData) {
                self.data("bs.collapse", null);
              }
            }
          }
          var dimension = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
          this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
          /** @type {number} */
          this.transitioning = 1;
          /**
           * @return {undefined}
           */
          var complete = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
            /** @type {number} */
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse");
          };
          if (!$.support.transition) {
            return complete.call(this);
          }
          var scrollSize = $.camelCase(["scroll", dimension].join("-"));
          this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
        }
      }
    }
  };
  /**
   * @return {?}
   */
  Collapse.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var cycle = $.Event("hide.bs.collapse");
      if (this.$element.trigger(cycle), !cycle.isDefaultPrevented()) {
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
        this.$trigger.addClass("collapsed").attr("aria-expanded", false);
        /** @type {number} */
        this.transitioning = 1;
        /**
         * @return {undefined}
         */
        var complete = function() {
          /** @type {number} */
          this.transitioning = 0;
          this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };
        return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
      }
    }
  };
  /**
   * @return {undefined}
   */
  Collapse.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };
  /**
   * @return {?}
   */
  Collapse.prototype.getParent = function() {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(dataAndEvents, selector) {
      var elem = $(selector);
      this.addAriaAndCollapsedClass(getParent(elem), elem);
    }, this)).end();
  };
  /**
   * @param {HTMLElement} element
   * @param {?} item
   * @return {undefined}
   */
  Collapse.prototype.addAriaAndCollapsedClass = function(element, item) {
    var source = element.hasClass("in");
    element.attr("aria-expanded", source);
    item.toggleClass("collapsed", !source).attr("aria-expanded", source);
  };
  var old = $.fn.collapse;
  /** @type {function (boolean): ?} */
  $.fn.collapse = build;
  /** @type {function (string, ?): undefined} */
  $.fn.collapse.Constructor = Collapse;
  /**
   * @return {?}
   */
  $.fn.collapse.noConflict = function() {
    return $.fn.collapse = old, this;
  };
  $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(types) {
    var $this = $(this);
    if (!$this.attr("data-target")) {
      types.preventDefault();
    }
    var value = getParent($this);
    var data = value.data("bs.collapse");
    var option = data ? "toggle" : $this.data();
    build.call(value, option);
  });
}(jQuery), +function($) {
  /**
   * @param {Element} $this
   * @return {?}
   */
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && (/#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }
  /**
   * @param {Object} e
   * @return {undefined}
   */
  function clearMenus(e) {
    if (!(e && 3 === e.which)) {
      $(backdrop).remove();
      $(selector).each(function() {
        var $this = $(this);
        var $parent = getParent($this);
        var relatedTarget = {
          relatedTarget : this
        };
        if ($parent.hasClass("open")) {
          if (!(e && ("click" == e.type && (/input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))))) {
            $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
            if (!e.isDefaultPrevented()) {
              $this.attr("aria-expanded", "false");
              $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget));
            }
          }
        }
      });
    }
  }
  /**
   * @param {?} type
   * @return {?}
   */
  function setValue(type) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.dropdown");
      if (!data) {
        $this.data("bs.dropdown", data = new Dropdown(this));
      }
      if ("string" == typeof type) {
        data[type].call($this);
      }
    });
  }
  /** @type {string} */
  var backdrop = ".dropdown-backdrop";
  /** @type {string} */
  var selector = '[data-toggle="dropdown"]';
  /**
   * @param {string} selector
   * @return {undefined}
   */
  var Dropdown = function(selector) {
    $(selector).on("click.bs.dropdown", this.toggle);
  };
  /** @type {string} */
  Dropdown.VERSION = "3.3.7";
  /**
   * @param {Object} e
   * @return {?}
   */
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this);
    if (!$this.is(".disabled, :disabled")) {
      var $parent = getParent($this);
      var isActive = $parent.hasClass("open");
      if (clearMenus(), !isActive) {
        if ("ontouchstart" in document.documentElement) {
          if (!$parent.closest(".navbar-nav").length) {
            $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
          }
        }
        var relatedTarget = {
          relatedTarget : this
        };
        if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) {
          return;
        }
        $this.trigger("focus").attr("aria-expanded", "true");
        $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget));
      }
      return false;
    }
  };
  /**
   * @param {Event} e
   * @return {?}
   */
  Dropdown.prototype.keydown = function(e) {
    if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
      var $this = $(this);
      if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
        var $parent = getParent($this);
        var isActive = $parent.hasClass("open");
        if (!isActive && 27 != e.which || isActive && 27 == e.which) {
          return 27 == e.which && $parent.find(selector).trigger("focus"), $this.trigger("click");
        }
        /** @type {string} */
        var desc = " li:not(.disabled):visible a";
        var div = $parent.find(".dropdown-menu" + desc);
        if (div.length) {
          var i = div.index(e.target);
          if (38 == e.which) {
            if (i > 0) {
              i--;
            }
          }
          if (40 == e.which) {
            if (i < div.length - 1) {
              i++;
            }
          }
          if (!~i) {
            /** @type {number} */
            i = 0;
          }
          div.eq(i).trigger("focus");
        }
      }
    }
  };
  var old = $.fn.dropdown;
  /** @type {function (?): ?} */
  $.fn.dropdown = setValue;
  /** @type {function (string): undefined} */
  $.fn.dropdown.Constructor = Dropdown;
  /**
   * @return {?}
   */
  $.fn.dropdown.noConflict = function() {
    return $.fn.dropdown = old, this;
  };
  $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(event) {
    event.stopPropagation();
  }).on("click.bs.dropdown.data-api", selector, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", selector, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function($) {
  /**
   * @param {boolean} option
   * @param {Object} val
   * @return {?}
   */
  function init(option, val) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.modal");
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
      if (!data) {
        $this.data("bs.modal", data = new Modal(this, options));
      }
      if ("string" == typeof option) {
        data[option](val);
      } else {
        if (options.show) {
          data.show(val);
        }
      }
    });
  }
  /**
   * @param {string} selector
   * @param {Object} options
   * @return {undefined}
   */
  var Modal = function(selector, options) {
    /** @type {Object} */
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(selector);
    this.$dialog = this.$element.find(".modal-dialog");
    /** @type {null} */
    this.$backdrop = null;
    /** @type {null} */
    this.isShown = null;
    /** @type {null} */
    this.originalBodyPad = null;
    /** @type {number} */
    this.scrollbarWidth = 0;
    /** @type {boolean} */
    this.ignoreBackdropClick = false;
    if (this.options.remote) {
      this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
        this.$element.trigger("loaded.bs.modal");
      }, this));
    }
  };
  /** @type {string} */
  Modal.VERSION = "3.3.7";
  /** @type {number} */
  Modal.TRANSITION_DURATION = 300;
  /** @type {number} */
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop : true,
    keyboard : true,
    show : true
  };
  /**
   * @param {Object} callback
   * @return {?}
   */
  Modal.prototype.toggle = function(callback) {
    return this.isShown ? this.hide() : this.show(callback);
  };
  /**
   * @param {Function} duration
   * @return {undefined}
   */
  Modal.prototype.show = function(duration) {
    var that = this;
    var cycle = $.Event("show.bs.modal", {
      /** @type {Function} */
      relatedTarget : duration
    });
    this.$element.trigger(cycle);
    if (!this.isShown) {
      if (!cycle.isDefaultPrevented()) {
        /** @type {boolean} */
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass("modal-open");
        this.escape();
        this.resize();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
          that.$element.one("mouseup.dismiss.bs.modal", function(ev) {
            if ($(ev.target).is(that.$element)) {
              /** @type {boolean} */
              that.ignoreBackdropClick = true;
            }
          });
        });
        this.backdrop(function() {
          var e = $.support.transition && that.$element.hasClass("fade");
          if (!that.$element.parent().length) {
            that.$element.appendTo(that.$body);
          }
          that.$element.show().scrollTop(0);
          that.adjustDialog();
          if (e) {
            that.$element[0].offsetWidth;
          }
          that.$element.addClass("in");
          that.enforceFocus();
          var cycle = $.Event("shown.bs.modal", {
            /** @type {Function} */
            relatedTarget : duration
          });
          if (e) {
            that.$dialog.one("bsTransitionEnd", function() {
              that.$element.trigger("focus").trigger(cycle);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION);
          } else {
            that.$element.trigger("focus").trigger(cycle);
          }
        });
      }
    }
  };
  /**
   * @param {string} cycle
   * @return {undefined}
   */
  Modal.prototype.hide = function(cycle) {
    if (cycle) {
      cycle.preventDefault();
    }
    cycle = $.Event("hide.bs.modal");
    this.$element.trigger(cycle);
    if (this.isShown) {
      if (!cycle.isDefaultPrevented()) {
        /** @type {boolean} */
        this.isShown = false;
        this.escape();
        this.resize();
        $(document).off("focusin.bs.modal");
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
        this.$dialog.off("mousedown.dismiss.bs.modal");
        if ($.support.transition && this.$element.hasClass("fade")) {
          this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION);
        } else {
          this.hideModal();
        }
      }
    }
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.enforceFocus = function() {
    $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
      if (!(document === e.target)) {
        if (!(this.$element[0] === e.target)) {
          if (!this.$element.has(e.target).length) {
            this.$element.trigger("focus");
          }
        }
      }
    }, this));
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.escape = function() {
    if (this.isShown && this.options.keyboard) {
      this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(event) {
        if (27 == event.which) {
          this.hide();
        }
      }, this));
    } else {
      if (!this.isShown) {
        this.$element.off("keydown.dismiss.bs.modal");
      }
    }
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.resize = function() {
    if (this.isShown) {
      $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
    } else {
      $(window).off("resize.bs.modal");
    }
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.hideModal = function() {
    var data = this;
    this.$element.hide();
    this.backdrop(function() {
      data.$body.removeClass("modal-open");
      data.resetAdjustments();
      data.resetScrollbar();
      data.$element.trigger("hidden.bs.modal");
    });
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.removeBackdrop = function() {
    if (this.$backdrop) {
      this.$backdrop.remove();
    }
    /** @type {null} */
    this.$backdrop = null;
  };
  /**
   * @param {Function} callback
   * @return {undefined}
   */
  Modal.prototype.backdrop = function(callback) {
    var that = this;
    /** @type {string} */
    var animate = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = false) : void(e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) {
        return;
      }
      if (doAnimate) {
        this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
      } else {
        callback();
      }
    } else {
      if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        /**
         * @return {undefined}
         */
        var removeElement = function() {
          that.removeBackdrop();
          if (callback) {
            callback();
          }
        };
        if ($.support.transition && this.$element.hasClass("fade")) {
          this.$backdrop.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
        } else {
          removeElement();
        }
      } else {
        if (callback) {
          callback();
        }
      }
    }
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.handleUpdate = function() {
    this.adjustDialog();
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.adjustDialog = function() {
    /** @type {boolean} */
    var needsFlash = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft : !this.bodyIsOverflowing && needsFlash ? this.scrollbarWidth : "",
      paddingRight : this.bodyIsOverflowing && !needsFlash ? this.scrollbarWidth : ""
    });
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.resetAdjustments = function() {
    this.$element.css({
      paddingLeft : "",
      paddingRight : ""
    });
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.checkScrollbar = function() {
    /** @type {number} */
    var windowInnerWidth = window.innerWidth;
    if (!windowInnerWidth) {
      /** @type {(ClientRect|null)} */
      var d = document.documentElement.getBoundingClientRect();
      /** @type {number} */
      windowInnerWidth = d.right - Math.abs(d.left);
    }
    /** @type {boolean} */
    this.bodyIsOverflowing = document.body.clientWidth < windowInnerWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.setScrollbar = function() {
    /** @type {number} */
    var top = parseInt(this.$body.css("padding-right") || 0, 10);
    /** @type {(number|string)} */
    this.originalBodyPad = document.body.style.paddingRight || "";
    if (this.bodyIsOverflowing) {
      this.$body.css("padding-right", top + this.scrollbarWidth);
    }
  };
  /**
   * @return {undefined}
   */
  Modal.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad);
  };
  /**
   * @return {?}
   */
  Modal.prototype.measureScrollbar = function() {
    /** @type {Element} */
    var n = document.createElement("div");
    /** @type {string} */
    n.className = "modal-scrollbar-measure";
    this.$body.append(n);
    /** @type {number} */
    var e = n.offsetWidth - n.clientWidth;
    return this.$body[0].removeChild(n), e;
  };
  var old = $.fn.modal;
  /** @type {function (boolean, Object): ?} */
  $.fn.modal = init;
  /** @type {function (string, Object): undefined} */
  $.fn.modal.Constructor = Modal;
  /**
   * @return {?}
   */
  $.fn.modal.noConflict = function() {
    return $.fn.modal = old, this;
  };
  $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(types) {
    var $this = $(this);
    var href = $this.attr("href");
    var self = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
    var entityType = self.data("bs.modal") ? "toggle" : $.extend({
      remote : !/#/.test(href) && href
    }, self.data(), $this.data());
    if ($this.is("a")) {
      types.preventDefault();
    }
    self.one("show.bs.modal", function(event) {
      if (!event.isDefaultPrevented()) {
        self.one("hidden.bs.modal", function() {
          if ($this.is(":visible")) {
            $this.trigger("focus");
          }
        });
      }
    });
    init.call(self, entityType, this);
  });
}(jQuery), +function($) {
  /**
   * @param {number} arg
   * @return {?}
   */
  function initialize(arg) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.tooltip");
      var options = "object" == typeof arg && arg;
      if (!(!data && /destroy|hide/.test(arg))) {
        if (!data) {
          $this.data("bs.tooltip", data = new Tooltip(this, options));
        }
        if ("string" == typeof arg) {
          data[arg]();
        }
      }
    });
  }
  /**
   * @param {string} selector
   * @param {string} options
   * @return {undefined}
   */
  var Tooltip = function(selector, options) {
    /** @type {null} */
    this.type = null;
    /** @type {null} */
    this.options = null;
    /** @type {null} */
    this.enabled = null;
    /** @type {null} */
    this.timeout = null;
    /** @type {null} */
    this.hoverState = null;
    /** @type {null} */
    this.$element = null;
    /** @type {null} */
    this.inState = null;
    this.init("tooltip", selector, options);
  };
  /** @type {string} */
  Tooltip.VERSION = "3.3.7";
  /** @type {number} */
  Tooltip.TRANSITION_DURATION = 150;
  Tooltip.DEFAULTS = {
    animation : true,
    placement : "top",
    selector : false,
    template : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger : "hover focus",
    title : "",
    delay : 0,
    html : false,
    container : false,
    viewport : {
      selector : "body",
      padding : 0
    }
  };
  /**
   * @param {string} type
   * @param {string} element
   * @param {string} options
   * @return {undefined}
   */
  Tooltip.prototype.init = function(type, element, options) {
    if (this.enabled = true, this.type = type, this.$element = $(element), this.options = this.getOptions(options), this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
      click : false,
      hover : false,
      focus : false
    }, this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    }
    var params = this.options.trigger.split(" ");
    var l = params.length;
    for (;l--;) {
      var param = params[l];
      if ("click" == param) {
        this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else {
        if ("manual" != param) {
          /** @type {string} */
          var eventIn = "hover" == param ? "mouseenter" : "focusin";
          /** @type {string} */
          var eventOut = "hover" == param ? "mouseleave" : "focusout";
          this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
          this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
        }
      }
    }
    if (this.options.selector) {
      this._options = $.extend({}, this.options, {
        trigger : "manual",
        selector : ""
      });
    } else {
      this.fixTitle();
    }
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.getDefaults = function() {
    return Tooltip.DEFAULTS;
  };
  /**
   * @param {Object} options
   * @return {?}
   */
  Tooltip.prototype.getOptions = function(options) {
    return options = $.extend({}, this.getDefaults(), this.$element.data(), options), options.delay && ("number" == typeof options.delay && (options.delay = {
      show : options.delay,
      hide : options.delay
    })), options;
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.getDelegateOptions = function() {
    var flags = {};
    var defaults = this.getDefaults();
    return this._options && $.each(this._options, function(key, value) {
      if (defaults[key] != value) {
        flags[key] = value;
      }
    }), flags;
  };
  /**
   * @param {Object} obj
   * @return {?}
   */
  Tooltip.prototype.enter = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
    return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = true), self.tip().hasClass("in") || "in" == self.hoverState ? void(self.hoverState = "in") : (clearTimeout(self.timeout), self.hoverState = "in", self.options.delay && self.options.delay.show ? void(self.timeout = setTimeout(function() {
      if ("in" == self.hoverState) {
        self.show();
      }
    }, self.options.delay.show)) : self.show());
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.isInStateTrue = function() {
    var unlock;
    for (unlock in this.inState) {
      if (this.inState[unlock]) {
        return true;
      }
    }
    return false;
  };
  /**
   * @param {Object} obj
   * @return {?}
   */
  Tooltip.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
    if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = false), !self.isInStateTrue()) {
      return clearTimeout(self.timeout), self.hoverState = "out", self.options.delay && self.options.delay.hide ? void(self.timeout = setTimeout(function() {
        if ("out" == self.hoverState) {
          self.hide();
        }
      }, self.options.delay.hide)) : self.hide();
    }
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.show = function() {
    var cycle = $.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(cycle);
      var d = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (cycle.isDefaultPrevented() || !d) {
        return;
      }
      var self = this;
      var $tip = this.tip();
      var tr = this.getUID(this.type);
      this.setContent();
      $tip.attr("id", tr);
      this.$element.attr("aria-describedby", tr);
      if (this.options.animation) {
        $tip.addClass("fade");
      }
      var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      /** @type {RegExp} */
      var autoToken = /\s?auto?\s?/i;
      /** @type {boolean} */
      var autoPlace = autoToken.test(placement);
      if (autoPlace) {
        placement = placement.replace(autoToken, "") || "top";
      }
      $tip.detach().css({
        top : 0,
        left : 0,
        display : "block"
      }).addClass(placement).data("bs." + this.type, this);
      if (this.options.container) {
        $tip.appendTo(this.options.container);
      } else {
        $tip.insertAfter(this.$element);
      }
      this.$element.trigger("inserted.bs." + this.type);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;
      if (autoPlace) {
        var orgPlacement = placement;
        var p = this.getPosition(this.$viewport);
        placement = "bottom" == placement && pos.bottom + actualHeight > p.bottom ? "top" : "top" == placement && pos.top - actualHeight < p.top ? "bottom" : "right" == placement && pos.right + actualWidth > p.width ? "left" : "left" == placement && pos.left - actualWidth < p.left ? "right" : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement);
      /**
       * @return {undefined}
       */
      var complete = function() {
        var text = self.hoverState;
        self.$element.trigger("shown.bs." + self.type);
        /** @type {null} */
        self.hoverState = null;
        if ("out" == text) {
          self.leave(self);
        }
      };
      if ($.support.transition && this.$tip.hasClass("fade")) {
        $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION);
      } else {
        complete();
      }
    }
  };
  /**
   * @param {string} cycle
   * @param {string} placement
   * @return {undefined}
   */
  Tooltip.prototype.applyPlacement = function(cycle, placement) {
    var $tip = this.tip();
    var x = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;
    /** @type {number} */
    var num2 = parseInt($tip.css("margin-top"), 10);
    /** @type {number} */
    var paddingLeft = parseInt($tip.css("margin-left"), 10);
    if (isNaN(num2)) {
      /** @type {number} */
      num2 = 0;
    }
    if (isNaN(paddingLeft)) {
      /** @type {number} */
      paddingLeft = 0;
    }
    cycle.top += num2;
    cycle.left += paddingLeft;
    $.offset.setOffset($tip[0], $.extend({
      /**
       * @param {?} props
       * @return {undefined}
       */
      using : function(props) {
        $tip.css({
          top : Math.round(props.top),
          left : Math.round(props.left)
        });
      }
    }, cycle), 0);
    $tip.addClass("in");
    var udataCur = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if ("top" == placement) {
      if (actualHeight != height) {
        /** @type {number} */
        cycle.top = cycle.top + height - actualHeight;
      }
    }
    var imageOffset = this.getViewportAdjustedDelta(placement, cycle, udataCur, actualHeight);
    if (imageOffset.left) {
      cycle.left += imageOffset.left;
    } else {
      cycle.top += imageOffset.top;
    }
    /** @type {boolean} */
    var isHorizontal = /top|bottom/.test(placement);
    var _position = isHorizontal ? 2 * imageOffset.left - x + udataCur : 2 * imageOffset.top - height + actualHeight;
    /** @type {string} */
    var sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";
    $tip.offset(cycle);
    this.replaceArrow(_position, $tip[0][sizingDomProperty], isHorizontal);
  };
  /**
   * @param {number} position
   * @param {number} dimension
   * @param {boolean} horizontal
   * @return {undefined}
   */
  Tooltip.prototype.replaceArrow = function(position, dimension, horizontal) {
    this.arrow().css(horizontal ? "left" : "top", 50 * (1 - position / dimension) + "%").css(horizontal ? "top" : "left", "");
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.setContent = function() {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right");
  };
  /**
   * @param {Function} callback
   * @return {?}
   */
  Tooltip.prototype.hide = function(callback) {
    /**
     * @return {undefined}
     */
    function complete() {
      if ("in" != self.hoverState) {
        $tip.detach();
      }
      if (self.$element) {
        self.$element.removeAttr("aria-describedby").trigger("hidden.bs." + self.type);
      }
      if (callback) {
        callback();
      }
    }
    var self = this;
    var $tip = $(this.$tip);
    var cycle = $.Event("hide.bs." + this.type);
    if (this.$element.trigger(cycle), !cycle.isDefaultPrevented()) {
      return $tip.removeClass("in"), $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), this.hoverState = null, this;
    }
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.fixTitle = function() {
    var $e = this.$element;
    if ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) {
      $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.hasContent = function() {
    return this.getTitle();
  };
  /**
   * @param {Object} $element
   * @return {?}
   */
  Tooltip.prototype.getPosition = function($element) {
    $element = $element || this.$element;
    var element = $element[0];
    /** @type {boolean} */
    var bShow = "BODY" == element.tagName;
    var rect = element.getBoundingClientRect();
    if (null == rect.width) {
      rect = $.extend({}, rect, {
        width : rect.right - rect.left,
        height : rect.bottom - rect.top
      });
    }
    var f = window.SVGElement && element instanceof window.SVGElement;
    var platformVersions = bShow ? {
      top : 0,
      left : 0
    } : f ? null : $element.offset();
    var copy = {
      scroll : bShow ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
    };
    /** @type {(null|{height: ?, width: ?})} */
    var newOpts = bShow ? {
      width : $(window).width(),
      height : $(window).height()
    } : null;
    return $.extend({}, rect, copy, newOpts, platformVersions);
  };
  /**
   * @param {string} str
   * @param {?} pos
   * @param {number} actualWidth
   * @param {number} actualHeight
   * @return {?}
   */
  Tooltip.prototype.getCalculatedOffset = function(str, pos, actualWidth, actualHeight) {
    return "bottom" == str ? {
      top : pos.top + pos.height,
      left : pos.left + pos.width / 2 - actualWidth / 2
    } : "top" == str ? {
      top : pos.top - actualHeight,
      left : pos.left + pos.width / 2 - actualWidth / 2
    } : "left" == str ? {
      top : pos.top + pos.height / 2 - actualHeight / 2,
      left : pos.left - actualWidth
    } : {
      top : pos.top + pos.height / 2 - actualHeight / 2,
      left : pos.left + pos.width
    };
  };
  /**
   * @param {string} placement
   * @param {Object} layout
   * @param {?} value
   * @param {number} actualHeight
   * @return {?}
   */
  Tooltip.prototype.getViewportAdjustedDelta = function(placement, layout, value, actualHeight) {
    var result = {
      top : 0,
      left : 0
    };
    if (!this.$viewport) {
      return result;
    }
    var bounce = this.options.viewport && this.options.viewport.padding || 0;
    var p = this.getPosition(this.$viewport);
    if (/right|left/.test(placement)) {
      /** @type {number} */
      var y = layout.top - bounce - p.scroll;
      var imageHeight = layout.top + bounce - p.scroll + actualHeight;
      if (y < p.top) {
        /** @type {number} */
        result.top = p.top - y;
      } else {
        if (imageHeight > p.top + p.height) {
          /** @type {number} */
          result.top = p.top + p.height - imageHeight;
        }
      }
    } else {
      /** @type {number} */
      var x = layout.left - bounce;
      var position = layout.left + bounce + value;
      if (x < p.left) {
        /** @type {number} */
        result.left = p.left - x;
      } else {
        if (position > p.right) {
          /** @type {number} */
          result.left = p.left + p.width - position;
        }
      }
    }
    return result;
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.getTitle = function() {
    var a;
    var $e = this.$element;
    var o = this.options;
    return a = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
  };
  /**
   * @param {number} id
   * @return {?}
   */
  Tooltip.prototype.getUID = function(id) {
    do {
      id += ~~(1E6 * Math.random());
    } while (document.getElementById(id));
    return id;
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.tip = function() {
    if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) {
      throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    }
    return this.$tip;
  };
  /**
   * @return {?}
   */
  Tooltip.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.enable = function() {
    /** @type {boolean} */
    this.enabled = true;
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.disable = function() {
    /** @type {boolean} */
    this.enabled = false;
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.toggleEnabled = function() {
    /** @type {boolean} */
    this.enabled = !this.enabled;
  };
  /**
   * @param {Event} e
   * @return {undefined}
   */
  Tooltip.prototype.toggle = function(e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data("bs." + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data("bs." + this.type, self);
      }
    }
    if (e) {
      /** @type {boolean} */
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) {
        self.enter(self);
      } else {
        self.leave(self);
      }
    } else {
      if (self.tip().hasClass("in")) {
        self.leave(self);
      } else {
        self.enter(self);
      }
    }
  };
  /**
   * @return {undefined}
   */
  Tooltip.prototype.destroy = function() {
    var self = this;
    clearTimeout(this.timeout);
    this.hide(function() {
      self.$element.off("." + self.type).removeData("bs." + self.type);
      if (self.$tip) {
        self.$tip.detach();
      }
      /** @type {null} */
      self.$tip = null;
      /** @type {null} */
      self.$arrow = null;
      /** @type {null} */
      self.$viewport = null;
      /** @type {null} */
      self.$element = null;
    });
  };
  var old = $.fn.tooltip;
  /** @type {function (number): ?} */
  $.fn.tooltip = initialize;
  /** @type {function (string, string): undefined} */
  $.fn.tooltip.Constructor = Tooltip;
  /**
   * @return {?}
   */
  $.fn.tooltip.noConflict = function() {
    return $.fn.tooltip = old, this;
  };
}(jQuery), +function($) {
  /**
   * @param {number} arg
   * @return {?}
   */
  function initialize(arg) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.popover");
      var options = "object" == typeof arg && arg;
      if (!(!data && /destroy|hide/.test(arg))) {
        if (!data) {
          $this.data("bs.popover", data = new Popover(this, options));
        }
        if ("string" == typeof arg) {
          data[arg]();
        }
      }
    });
  }
  /**
   * @param {string} selector
   * @param {string} options
   * @return {undefined}
   */
  var Popover = function(selector, options) {
    this.init("popover", selector, options);
  };
  if (!$.fn.tooltip) {
    throw new Error("Popover requires tooltip.js");
  }
  /** @type {string} */
  Popover.VERSION = "3.3.7";
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement : "right",
    trigger : "click",
    content : "",
    template : '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  /** @type {function (string, string): undefined} */
  Popover.prototype.constructor = Popover;
  /**
   * @return {?}
   */
  Popover.prototype.getDefaults = function() {
    return Popover.DEFAULTS;
  };
  /**
   * @return {undefined}
   */
  Popover.prototype.setContent = function() {
    var $tip = this.tip();
    var title = this.getTitle();
    var err = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof err ? "html" : "append" : "text"](err);
    $tip.removeClass("fade top bottom left right in");
    if (!$tip.find(".popover-title").html()) {
      $tip.find(".popover-title").hide();
    }
  };
  /**
   * @return {?}
   */
  Popover.prototype.hasContent = function() {
    return this.getTitle() || this.getContent();
  };
  /**
   * @return {?}
   */
  Popover.prototype.getContent = function() {
    var $e = this.$element;
    var o = this.options;
    return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
  };
  /**
   * @return {?}
   */
  Popover.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  var old = $.fn.popover;
  /** @type {function (number): ?} */
  $.fn.popover = initialize;
  /** @type {function (string, string): undefined} */
  $.fn.popover.Constructor = Popover;
  /**
   * @return {?}
   */
  $.fn.popover.noConflict = function() {
    return $.fn.popover = old, this;
  };
}(jQuery), +function($) {
  /**
   * @param {string} selector
   * @param {?} options
   * @return {undefined}
   */
  function ScrollSpy(selector, options) {
    this.$body = $(document.body);
    this.$scrollElement = $($(selector).is(document.body) ? window : selector);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    /** @type {string} */
    this.selector = (this.options.target || "") + " .nav li > a";
    /** @type {Array} */
    this.offsets = [];
    /** @type {Array} */
    this.targets = [];
    /** @type {null} */
    this.activeTarget = null;
    /** @type {number} */
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
    this.refresh();
    this.process();
  }
  /**
   * @param {number} arg
   * @return {?}
   */
  function init(arg) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.scrollspy");
      var options = "object" == typeof arg && arg;
      if (!data) {
        $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
      }
      if ("string" == typeof arg) {
        data[arg]();
      }
    });
  }
  /** @type {string} */
  ScrollSpy.VERSION = "3.3.7";
  ScrollSpy.DEFAULTS = {
    offset : 10
  };
  /**
   * @return {?}
   */
  ScrollSpy.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };
  /**
   * @return {undefined}
   */
  ScrollSpy.prototype.refresh = function() {
    var self = this;
    /** @type {string} */
    var i = "offset";
    /** @type {number} */
    var nub_height = 0;
    /** @type {Array} */
    this.offsets = [];
    /** @type {Array} */
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    if (!$.isWindow(this.$scrollElement[0])) {
      /** @type {string} */
      i = "position";
      nub_height = this.$scrollElement.scrollTop();
    }
    this.$body.find(this.selector).map(function() {
      var $el = $(this);
      var href = $el.data("target") || $el.attr("href");
      var codeSegments = /^#./.test(href) && $(href);
      return codeSegments && (codeSegments.length && (codeSegments.is(":visible") && [[codeSegments[i]().top + nub_height, href]])) || null;
    }).sort(function(mat0, mat1) {
      return mat0[0] - mat1[0];
    }).each(function() {
      self.offsets.push(this[0]);
      self.targets.push(this[1]);
    });
  };
  /**
   * @return {?}
   */
  ScrollSpy.prototype.process = function() {
    var i;
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var offset = this.getScrollHeight();
    /** @type {number} */
    var maxScroll = this.options.offset + offset - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    if (this.scrollHeight != offset && this.refresh(), scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }
    if (activeTarget && scrollTop < offsets[0]) {
      return this.activeTarget = null, this.clear();
    }
    i = offsets.length;
    for (;i--;) {
      if (activeTarget != targets[i]) {
        if (scrollTop >= offsets[i]) {
          if (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1]) {
            this.activate(targets[i]);
          }
        }
      }
    }
  };
  /**
   * @param {Error} target
   * @return {undefined}
   */
  ScrollSpy.prototype.activate = function(target) {
    /** @type {Error} */
    this.activeTarget = target;
    this.clear();
    /** @type {string} */
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents("li").addClass("active");
    if (active.parent(".dropdown-menu").length) {
      active = active.closest("li.dropdown").addClass("active");
    }
    active.trigger("activate.bs.scrollspy");
  };
  /**
   * @return {undefined}
   */
  ScrollSpy.prototype.clear = function() {
    $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  var old = $.fn.scrollspy;
  /** @type {function (number): ?} */
  $.fn.scrollspy = init;
  /** @type {function (string, ?): undefined} */
  $.fn.scrollspy.Constructor = ScrollSpy;
  /**
   * @return {?}
   */
  $.fn.scrollspy.noConflict = function() {
    return $.fn.scrollspy = old, this;
  };
  $(window).on("load.bs.scrollspy.data-api", function() {
    $('[data-spy="scroll"]').each(function() {
      var self = $(this);
      init.call(self, self.data());
    });
  });
}(jQuery), +function($) {
  /**
   * @param {?} selector
   * @return {?}
   */
  function init(selector) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.tab");
      if (!data) {
        $this.data("bs.tab", data = new Tab(this));
      }
      if ("string" == typeof selector) {
        data[selector]();
      }
    });
  }
  /**
   * @param {string} selector
   * @return {undefined}
   */
  var Tab = function(selector) {
    this.element = $(selector);
  };
  /** @type {string} */
  Tab.VERSION = "3.3.7";
  /** @type {number} */
  Tab.TRANSITION_DURATION = 150;
  /**
   * @return {undefined}
   */
  Tab.prototype.show = function() {
    var $this = this.element;
    var $ul = $this.closest("ul:not(.dropdown-menu)");
    var selector = $this.data("target");
    if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), !$this.parent("li").hasClass("active")) {
      var elm = $ul.find(".active:last a");
      var cycle = $.Event("hide.bs.tab", {
        relatedTarget : $this[0]
      });
      var fix = $.Event("show.bs.tab", {
        relatedTarget : elm[0]
      });
      if (elm.trigger(cycle), $this.trigger(fix), !fix.isDefaultPrevented() && !cycle.isDefaultPrevented()) {
        var $target = $(selector);
        this.activate($this.closest("li"), $ul);
        this.activate($target, $target.parent(), function() {
          elm.trigger({
            type : "hidden.bs.tab",
            relatedTarget : $this[0]
          });
          $this.trigger({
            type : "shown.bs.tab",
            relatedTarget : elm[0]
          });
        });
      }
    }
  };
  /**
   * @param {Object} element
   * @param {Object} container
   * @param {Object} callback
   * @return {undefined}
   */
  Tab.prototype.activate = function(element, container, callback) {
    /**
     * @return {undefined}
     */
    function next() {
      $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
      element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
      if (showAddButton) {
        element[0].offsetWidth;
        element.addClass("in");
      } else {
        element.removeClass("fade");
      }
      if (element.parent(".dropdown-menu").length) {
        element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true);
      }
      if (callback) {
        callback();
      }
    }
    var $active = container.find("> .active");
    var showAddButton = callback && ($.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length));
    if ($active.length && showAddButton) {
      $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION);
    } else {
      next();
    }
    $active.removeClass("in");
  };
  var old = $.fn.tab;
  /** @type {function (?): ?} */
  $.fn.tab = init;
  /** @type {function (string): undefined} */
  $.fn.tab.Constructor = Tab;
  /**
   * @return {?}
   */
  $.fn.tab.noConflict = function() {
    return $.fn.tab = old, this;
  };
  /**
   * @param {?} event
   * @return {undefined}
   */
  var stop = function(event) {
    event.preventDefault();
    init.call($(this), "show");
  };
  $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', stop).on("click.bs.tab.data-api", '[data-toggle="pill"]', stop);
}(jQuery), +function($) {
  /**
   * @param {number} arg
   * @return {?}
   */
  function init(arg) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.affix");
      var options = "object" == typeof arg && arg;
      if (!data) {
        $this.data("bs.affix", data = new Affix(this, options));
      }
      if ("string" == typeof arg) {
        data[arg]();
      }
    });
  }
  /**
   * @param {string} selector
   * @param {?} options
   * @return {undefined}
   */
  var Affix = function(selector, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(selector);
    /** @type {null} */
    this.affixed = null;
    /** @type {null} */
    this.unpin = null;
    /** @type {null} */
    this.pinnedOffset = null;
    this.checkPosition();
  };
  /** @type {string} */
  Affix.VERSION = "3.3.7";
  /** @type {string} */
  Affix.RESET = "affix affix-top affix-bottom";
  Affix.DEFAULTS = {
    offset : 0,
    target : window
  };
  /**
   * @param {number} value
   * @param {?} el
   * @param {string} top
   * @param {number} stateName
   * @return {?}
   */
  Affix.prototype.getState = function(value, el, top, stateName) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var wiewHeight = this.$target.height();
    if (null != top && "top" == this.affixed) {
      return scrollTop < top && "top";
    }
    if ("bottom" == this.affixed) {
      return null != top ? !(scrollTop + this.unpin <= position.top) && "bottom" : !(scrollTop + wiewHeight <= value - stateName) && "bottom";
    }
    /** @type {boolean} */
    var isWindow = null == this.affixed;
    var current = isWindow ? scrollTop : position.top;
    var container = isWindow ? wiewHeight : el;
    return null != top && scrollTop <= top ? "top" : null != stateName && (current + container >= value - stateName && "bottom");
  };
  /**
   * @return {?}
   */
  Affix.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) {
      return this.pinnedOffset;
    }
    this.$element.removeClass(Affix.RESET).addClass("affix");
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };
  /**
   * @return {undefined}
   */
  Affix.prototype.checkPositionWithEventLoop = function() {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };
  /**
   * @return {undefined}
   */
  Affix.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var failuresLink = this.$element.height();
      var offset = this.options.offset;
      var offsetTop = offset.top;
      var offsetBottom = offset.bottom;
      /** @type {number} */
      var udataCur = Math.max($(document).height(), $(document.body).height());
      if ("object" != typeof offset) {
        offsetBottom = offsetTop = offset;
      }
      if ("function" == typeof offsetTop) {
        offsetTop = offset.top(this.$element);
      }
      if ("function" == typeof offsetBottom) {
        offsetBottom = offset.bottom(this.$element);
      }
      var affix = this.getState(udataCur, failuresLink, offsetTop, offsetBottom);
      if (this.affixed != affix) {
        if (null != this.unpin) {
          this.$element.css("top", "");
        }
        /** @type {string} */
        var affixType = "affix" + (affix ? "-" + affix : "");
        var cycle = $.Event(affixType + ".bs.affix");
        if (this.$element.trigger(cycle), cycle.isDefaultPrevented()) {
          return;
        }
        this.affixed = affix;
        this.unpin = "bottom" == affix ? this.getPinnedOffset() : null;
        this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
      }
      if ("bottom" == affix) {
        this.$element.offset({
          top : udataCur - failuresLink - offsetBottom
        });
      }
    }
  };
  var old = $.fn.affix;
  /** @type {function (number): ?} */
  $.fn.affix = init;
  /** @type {function (string, ?): undefined} */
  $.fn.affix.Constructor = Affix;
  /**
   * @return {?}
   */
  $.fn.affix.noConflict = function() {
    return $.fn.affix = old, this;
  };
  $(window).on("load", function() {
    $('[data-spy="affix"]').each(function() {
      var self = $(this);
      var options = self.data();
      options.offset = options.offset || {};
      if (null != options.offsetBottom) {
        options.offset.bottom = options.offsetBottom;
      }
      if (null != options.offsetTop) {
        options.offset.top = options.offsetTop;
      }
      init.call(self, options);
    });
  });
}(jQuery);
(function($) {
  var app = {
    /**
     * @param {string} type
     * @return {?}
     */
    init : function(type) {
      var options = {
        timer : null,
        timerSeconds : 10,
        /**
         * @return {undefined}
         */
        callback : function() {
        },
        timerCurrent : 0,
        showPercentage : false,
        fill : false,
        color : "#CCC"
      };
      options = $.extend(options, type);
      return this.each(function() {
        var element = $(this);
        var pietimer = element.data("pietimer");
        if (!pietimer) {
          element.addClass("pietimer");
          element.css({
            fontSize : element.width()
          });
          element.data("pietimer", options);
          if (options.showPercentage) {
            element.find(".percent").show();
          }
          if (options.fill) {
            element.addClass("fill");
          }
          element.pietimer("start");
        }
      });
    },
    /**
     * @return {undefined}
     */
    stopWatch : function() {
      var self = $(this).data("pietimer");
      if (self) {
        /** @type {number} */
        var scale = (self.timerFinish - (new Date).getTime()) / 1E3;
        if (scale <= 0) {
          clearInterval(self.timer);
          $(this).pietimer("drawTimer", 100);
          self.callback();
        } else {
          /** @type {number} */
          var r20 = 100 - scale / self.timerSeconds * 100;
          $(this).pietimer("drawTimer", r20);
        }
      }
    },
    /**
     * @param {number} i
     * @return {undefined}
     */
    drawTimer : function(i) {
      $this = $(this);
      var options = $this.data("pietimer");
      if (options) {
        $this.html('<div class="percent"></div><div class="slice' + (i > 50 ? ' gt50"' : '"') + '><div class="pie"></div>' + (i > 50 ? '<div class="pie fill"></div>' : "") + "</div>");
        /** @type {number} */
        var n = 360 / 100 * i;
        $this.find(".slice .pie").css({
          "-moz-transform" : "rotate(" + n + "deg)",
          "-webkit-transform" : "rotate(" + n + "deg)",
          "-o-transform" : "rotate(" + n + "deg)",
          "transform" : "rotate(" + n + "deg)"
        });
        $this.find(".percent").html(Math.round(i) + "%");
        if (options.showPercentage) {
          $this.find(".percent").show();
        }
        if ($this.hasClass("fill")) {
          $this.find(".slice .pie").css({
            backgroundColor : options.color
          });
        } else {
          $this.find(".slice .pie").css({
            borderColor : options.color
          });
        }
      }
    },
    /**
     * @return {undefined}
     */
    start : function() {
      var timer = $(this).data("pietimer");
      if (timer) {
        /** @type {number} */
        timer.timerFinish = (new Date).getTime() + timer.timerSeconds * 1E3;
        $(this).pietimer("drawTimer", 0);
        /** @type {number} */
        timer.timer = setInterval("$this.pietimer('stopWatch')", 50);
      }
    },
    /**
     * @return {undefined}
     */
    reset : function() {
      var iv = $(this).data("pietimer");
      if (iv) {
        clearInterval(iv.timer);
        $(this).pietimer("drawTimer", 0);
      }
    }
  };
  /**
   * @param {string} method
   * @return {?}
   */
  $.fn.pietimer = function(method) {
    if (app[method]) {
      return app[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof method === "object" || !method) {
        return app.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist on jQuery.pietimer");
      }
    }
  };
})(jQuery);
!function($) {
  /**
   * @param {string} selector
   * @param {?} options
   * @return {undefined}
   */
  function Carousel(selector, options) {
    this.options = $.extend({}, Carousel.DEFAULTS, options);
    this.$sidebar = $(selector);
    /** @type {boolean} */
    this.$sidebarInner = false;
    this.$container = this.$sidebar.closest(this.options.containerSelector);
    /** @type {string} */
    this.affixedType = "static";
    /** @type {boolean} */
    this._initialized = false;
    /** @type {boolean} */
    this._breakpoint = false;
    /** @type {Array} */
    this._resizeListeners = [];
    this.dimensions = {
      translateY : 0,
      topSpacing : 0,
      bottomSpacing : 0,
      sidebarHeight : 0,
      sidebarWidth : 0,
      containerTop : 0,
      containerHeight : 0,
      viewportHeight : 0,
      viewportTop : 0,
      lastViewportTop : 0
    };
    this.initialize();
  }
  /**
   * @param {number} path
   * @return {?}
   */
  function build(path) {
    return this.each(function() {
      var $spy = $(this);
      var qualifier = $(this).data("stickySidebar");
      if (qualifier || (qualifier = new Carousel(this, "object" == typeof path && path), $spy.data("stickySidebar", qualifier)), "string" == typeof path) {
        if (void 0 === qualifier[path] && -1 != ["destory", "updateSticky"].indexOf(path)) {
          throw new Error('No method named "' + path + '"');
        }
        qualifier[path]();
      }
    });
  }
  var $window = $(window);
  /** @type {string} */
  Carousel.VERSION = "1.0.0";
  /** @type {string} */
  Carousel.EVENT_KEY = ".stickySidebar";
  Carousel.DEFAULTS = {
    topSpacing : 0,
    bottomSpacing : 0,
    containerSelector : false,
    innerWrapperClass : "inner-wrapper-sticky",
    stickyClass : "is-affixed",
    resizeSensor : true,
    minWidth : false
  };
  /**
   * @return {?}
   */
  Carousel.isIE = function() {
    return Boolean(navigator.userAgent.match(/Trident/));
  };
  /**
   * @param {boolean} isXML
   * @return {?}
   */
  Carousel.supportTransform = function(isXML) {
    /** @type {boolean} */
    var supportedValue = false;
    /** @type {string} */
    var ret = isXML ? "perspective" : "transform";
    /** @type {string} */
    var camel = ret.charAt(0).toUpperCase() + ret.slice(1);
    /** @type {Array.<string>} */
    var domPrefs = "Webkit Moz O ms".split(" ");
    var styleDeclaration = $("<support>").get(0).style;
    return $.each((ret + " " + domPrefs.join(camel + " ") + camel).split(" "), function(dataAndEvents, propertyName) {
      if (void 0 !== styleDeclaration[propertyName]) {
        return supportedValue = propertyName, false;
      }
    }), supportedValue;
  };
  Carousel.prototype = {
    /**
     * @return {undefined}
     */
    initialize : function() {
      if (this.$sidebar.trigger("initialize" + Carousel.EVENT_KEY), this.options.innerWrapperClass && (this.$sidebarInner = this.$sidebar.find("." + this.options.innerWrapperClass), 0 === this.$sidebarInner.length && (this.$sidebarInner = false)), !this.$sidebarInner) {
        var anchor = $('<div class="' + this.options.innerWrapperClass + '" />');
        /** @type {string} */
        var sel = "> div";
        if (this.options.innerWrapSelector) {
          /** @type {string} */
          sel = "." + this.options.innerWrapSelector;
        }
        this.$sidebar.wrapInner(anchor);
        this.$sidebarInner = this.$sidebar.find(sel);
      }
      if (!this.$container.length) {
        this.$container = this.$sidebar.parent();
      }
      if ("function" != typeof this.options.topSpacing) {
        /** @type {number} */
        this.options.topSpacing = parseInt(this.options.topSpacing) || 0;
      }
      if ("function" != typeof this.options.bottomSpacing) {
        /** @type {number} */
        this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0;
      }
      this._widthBreakpoint();
      this.calcDimensions();
      this.stickyPosition();
      this.bindEvents();
      /** @type {boolean} */
      this._initialized = true;
      this.$sidebar.trigger("initialized" + Carousel.EVENT_KEY);
    },
    /**
     * @return {undefined}
     */
    bindEvents : function() {
      this.options;
      $window.on("resize." + Carousel.EVENT_KEY, $.proxy(this._onResize, this)).on("scroll." + Carousel.EVENT_KEY, $.proxy(this._onScroll, this));
      this.$sidebar.on("recalcDimenstions." + Carousel.EVENT_KEY, $.proxy(this.updateSticky, this));
      if (this.options.resizeSensor) {
        this.addResizerListener(this.$sidebarInner, $.proxy(this.updateSticky, this));
        this.addResizerListener(this.$container, $.proxy(this.updateSticky, this));
      }
    },
    /**
     * @param {?} event
     * @return {undefined}
     */
    _onScroll : function(event) {
      if (this.$sidebar.is(":visible")) {
        this.animateSticky();
      }
    },
    /**
     * @param {?} e
     * @return {undefined}
     */
    _onResize : function(e) {
      requestAnimationFrame($.proxy(function() {
        this._widthBreakpoint();
        this.updateSticky();
      }, this));
    },
    /**
     * @return {undefined}
     */
    calcDimensions : function() {
      if (!this._breakpoint) {
        var data = this.dimensions;
        data.containerTop = this.$container.offset().top;
        data.containerHeight = this.$container.outerHeight();
        data.containerBottom = data.containerTop + data.containerHeight;
        data.sidebarHeight = this.$sidebarInner.outerHeight();
        data.sidebarWidth = this.$sidebar.outerWidth();
        data.viewportHeight = $window.prop("innerHeight");
        this._calcDimensionsWithScroll();
      }
    },
    /**
     * @return {undefined}
     */
    _calcDimensionsWithScroll : function() {
      var data = this.dimensions;
      data.sidebarLeft = this.$sidebar.offset().left;
      /** @type {number} */
      data.viewportTop = document.documentElement.scrollTop || document.body.scrollTop;
      data.viewportBottom = data.viewportTop + data.viewportHeight;
      /** @type {number} */
      data.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      data.topSpacing = this.options.topSpacing;
      data.bottomSpacing = this.options.bottomSpacing;
      if ("function" == typeof data.topSpacing) {
        /** @type {number} */
        data.topSpacing = parseInt(data.topSpacing(this.$sidebar)) || 0;
      }
      if ("function" == typeof data.bottomSpacing) {
        /** @type {number} */
        data.bottomSpacing = parseInt(data.bottomSpacing(this.$sidebar)) || 0;
      }
    },
    /**
     * @return {?}
     */
    isSidebarFitsViewport : function() {
      return this.dimensions.sidebarHeight < this.dimensions.viewportHeight;
    },
    /**
     * @return {?}
     */
    isScrollingTop : function() {
      return this.dimensions.viewportTop < this.dimensions.lastViewportTop;
    },
    /**
     * @return {?}
     */
    getAffixType : function() {
      var data = this.dimensions;
      /** @type {boolean} */
      var STATIC = false;
      this._calcDimensionsWithScroll();
      var len = data.sidebarHeight + data.containerTop;
      var i = data.viewportTop + data.topSpacing;
      /** @type {number} */
      var start = data.viewportBottom - data.bottomSpacing;
      return this.isScrollingTop() ? i <= data.containerTop ? (data.translateY = 0, STATIC = "STATIC") : i <= data.translateY + data.containerTop ? (data.translateY = i - data.containerTop, STATIC = "VIEWPORT-TOP") : !this.isSidebarFitsViewport() && (data.containerTop <= i && (STATIC = "VIEWPORT-UNBOTTOM")) : this.isSidebarFitsViewport() ? data.sidebarHeight + i >= data.containerBottom ? (data.translateY = data.containerBottom - len, STATIC = "CONTAINER-BOTTOM") : i >= data.containerTop && (data.translateY = 
      i - data.containerTop, STATIC = "VIEWPORT-TOP") : data.containerBottom <= start ? (data.translateY = data.containerBottom - len, STATIC = "CONTAINER-BOTTOM") : len + data.translateY <= start ? (data.translateY = start - len, STATIC = "VIEWPORT-BOTTOM") : data.containerTop + data.translateY <= i && (STATIC = "VIEWPORT-UNBOTTOM"), data.lastViewportTop = data.viewportTop, STATIC;
    },
    /**
     * @param {string} v11
     * @return {?}
     */
    _getStyle : function(v11) {
      if (void 0 !== v11) {
        var self = {
          inner : {},
          outer : {}
        };
        var ret = this.dimensions;
        switch(v11) {
          case "VIEWPORT-TOP":
            self.inner = {
              position : "fixed",
              top : this.options.topSpacing,
              left : ret.sidebarLeft - ret.viewportLeft,
              width : ret.sidebarWidth
            };
            break;
          case "VIEWPORT-BOTTOM":
            self.inner = {
              position : "fixed",
              top : "auto",
              left : ret.sidebarLeft,
              bottom : this.options.bottomSpacing,
              width : ret.sidebarWidth
            };
            break;
          case "CONTAINER-BOTTOM":
          ;
          case "VIEWPORT-UNBOTTOM":
            self.inner = {
              position : "absolute",
              top : ret.containerTop + ret.translateY
            };
            if (Carousel.supportTransform(translate3d = true)) {
              self.inner = {
                transform : "translate3d(0, " + ret.translateY + "px, 0)"
              };
            } else {
              if (Carousel.supportTransform()) {
                self.inner = {
                  transform : "translate(0, " + ret.translateY + "px)"
                };
              }
            }
          ;
        }
        switch(v11) {
          case "VIEWPORT-TOP":
          ;
          case "VIEWPORT-BOTTOM":
          ;
          case "VIEWPORT-UNBOTTOM":
          ;
          case "CONTAINER-BOTTOM":
            self.outer = {
              minHeight : ret.translateY + ret.sidebarHeight
            };
        }
        return self.outer = $.extend({}, {
          minHeight : ""
        }, self.outer), self.inner = $.extend({}, {
          position : "relative",
          top : "",
          left : "",
          bottom : "",
          width : "",
          transform : ""
        }, self.inner), self;
      }
    },
    /**
     * @return {undefined}
     */
    stickyPosition : function() {
      if (this.$sidebar.is(":visible") && !this._breakpoint) {
        var y = (this.options.topSpacing, this.options.bottomSpacing, this.getAffixType());
        var s = this._getStyle(y);
        if (this.affixedType != y && y) {
          var cycle = $.Event("affix." + y.replace("viewport-", "") + Carousel.EVENT_KEY);
          this.$sidebar.trigger(cycle);
          if ("static" === y) {
            this.$sidebar.removeClass(this.options.stickyClass);
          } else {
            this.$sidebar.addClass(this.options.stickyClass);
          }
          var fix = $.Event("affixed." + y.replace("viewport", "") + Carousel.EVENT_KEY);
          this.$sidebarInner.css(s.inner);
          this.$sidebar.trigger(fix);
        }
        if (this._initialized) {
          this.$sidebarInner.css("left", s.inner.left);
        }
        this.$sidebar.css(s.outer);
        this.affixedType = y;
      }
    },
    /**
     * @return {undefined}
     */
    _widthBreakpoint : function() {
      if ($window.innerWidth() <= this.options.minWidth) {
        /** @type {boolean} */
        this._breakpoint = true;
        /** @type {string} */
        this.affixedType = "static";
        this.$sidebar.removeAttr("style").removeClass(this.options.stickyClass);
        this.$sidebarInner.removeAttr("style");
      } else {
        /** @type {boolean} */
        this._breakpoint = false;
      }
    },
    /**
     * @return {undefined}
     */
    updateSticky : function() {
      this.calcDimensions();
      this.stickyPosition();
    },
    /**
     * @return {undefined}
     */
    animateSticky : function() {
      requestAnimationFrame($.proxy(function() {
        this.stickyPosition();
      }, this));
    },
    /**
     * @param {?} selector
     * @param {?} spaceName
     * @return {undefined}
     */
    addResizerListener : function(selector, spaceName) {
      var elem = $(selector);
      if (!elem.prop("resizeListeners")) {
        elem.prop("resizeListeners", []);
        this._appendResizeSensor(elem);
      }
      elem.prop("resizeListeners").push(spaceName);
    },
    /**
     * @param {?} scope
     * @param {?} el
     * @return {undefined}
     */
    removeResizeListener : function(scope, el) {
      var clone = $(scope);
      var excludes = clone.prop("resizeListeners");
      var index = excludes.indexOf(el);
      if (this._resizeListeners.splice(index, 1), clone.prop("resizeListeners").length) {
        var container = clone.prop("resizeTrigger");
        $(container.contentDocument.defaultView).off("resize", this._resizeListener);
        container = clone.find(container).remove();
      }
    },
    /**
     * @param {?} selector
     * @return {undefined}
     */
    _appendResizeSensor : function(selector) {
      var elem = $(selector);
      if ("static" == elem.css("position")) {
        elem.css("position", "relative");
      }
      var p = $("<object>");
      p.attr("style", "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%;overflow: hidden; pointer-events: none; z-index: -1;");
      p.prop("resizeElement", elem[0]);
      var binding = this;
      p.on("load", function(dataAndEvents) {
        this.contentDocument.defaultView.resizeTrigger = this.resizeElement;
        $(this.contentDocument.defaultView).on("resize", binding._resizeListener);
      });
      p.prop("type", "text/html");
      if (Carousel.isIE()) {
        p.prop(data, "about:blank");
      }
      elem.prop("resizeTrigger", p.get(0));
      elem.append(p);
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    _resizeListener : function(event) {
      var SmoothScroller = event.target || event.srcElement;
      cancelAnimationFrame(SmoothScroller.resizeSensorRAF);
      /** @type {number} */
      SmoothScroller.resizeSensorRAF = requestAnimationFrame(function() {
        var self = SmoothScroller.resizeTrigger;
        self.resizeListeners.forEach(function(fn) {
          fn.call(self, event);
        });
      });
    },
    /**
     * @return {undefined}
     */
    destroy : function() {
      $window.off("resize" + Carousel.EVENT_KEY).off("scroll" + Carousel.EVENT_KEY);
      this.$sidebar.removeClass(this.options.stickyClass).css({
        minHeight : ""
      }).off("recalcDimenstions" + Carousel.EVENT_KEY).removeData("stickySidebar");
      this.$sidebarInner.css({
        position : "",
        top : "",
        left : "",
        bottom : "",
        width : "",
        transform : ""
      });
      if (this.options.resizeSensor) {
        this.removeResizeListener(this.$sidebarInner, $.proxy(this.updateSticky, this));
        this.removeResizeListener(this.$container, $.proxy(this.updateSticky, this));
      }
    }
  };
  /** @type {function (number): ?} */
  $.fn.stickySidebar = build;
  /** @type {function (string, ?): undefined} */
  $.fn.stickySidebar.Constructor = Carousel;
  /** @type {function (number): ?} */
  var stickySidebar = $.fn.stickySidebar;
  /**
   * @return {?}
   */
  $.fn.stickySidebar.noConflict = function() {
    return $.fn.stickySidebar = stickySidebar, this;
  };
  $window.on("load", function() {
    $("[data-sticky-sidebar]").each(function() {
      var self = $(this);
      var cfg = self.data() || {};
      var baseUri = self.closest("[data-sticky-sidebar-container]");
      if (baseUri.length) {
        cfg.containerSelector = baseUri;
      }
      build.call(self, cfg);
    });
  });
}(jQuery);
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
  return function(l) {
    /**
     * @param {number} i
     * @return {?}
     */
    function result(i) {
      if (t[i]) {
        return t[i].exports;
      }
      var m = t[i] = {
        i : i,
        l : false,
        exports : {}
      };
      return l[i].call(m.exports, m, m.exports, result), m.l = true, m.exports;
    }
    var t = {};
    return result.m = l, result.c = t, result.i = function(b) {
      return b;
    }, result.d = function(ctx, key, dataAndEvents) {
      if (!result.o(ctx, key)) {
        Object.defineProperty(ctx, key, {
          configurable : false,
          enumerable : true,
          /** @type {Function} */
          get : dataAndEvents
        });
      }
    }, result.n = function(c) {
      /** @type {function (): ?} */
      var node = c && c.__esModule ? function() {
        return c.default;
      } : function() {
        return c;
      };
      return result.d(node, "a", node), node;
    }, result.o = function(action, options) {
      return Object.prototype.hasOwnProperty.call(action, options);
    }, result.p = "", result(result.s = 3);
  }([function(context, me, $sanitize) {
    var fn;
    var args;
    var css;
    !function(recurring, tmp) {
      /** @type {Array} */
      args = [context, $sanitize(7)];
      /** @type {function (Object, Function): undefined} */
      fn = tmp;
      if (void 0 !== (css = "function" == typeof fn ? fn.apply(me, args) : fn)) {
        /** @type {(function (Object, Function): undefined|undefined)} */
        context.exports = css;
      }
    }(0, function(module, url) {
      /**
       * @param {?} value
       * @param {Function} type
       * @return {undefined}
       */
      function round(value, type) {
        if (!(value instanceof type)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var obj = function(url) {
        return url && url.__esModule ? url : {
          /** @type {Function} */
          default : url
        };
      }(url);
      /** @type {function (Object): ?} */
      var fn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(second) {
        return typeof second;
      } : function(b) {
        return b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
      };
      var A = function() {
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
      var JsDiff = function() {
        /**
         * @param {?} event
         * @return {undefined}
         */
        function n(event) {
          round(this, n);
          this.resolveOptions(event);
          this.initSelection();
        }
        return A(n, [{
          key : "resolveOptions",
          /**
           * @return {undefined}
           */
          value : function() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
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
            this.selectedText = (0, obj.default)(this.fakeElem);
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
            this.selectedText = (0, obj.default)(this.target);
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
            } catch (e) {
              /** @type {boolean} */
              r20 = false;
            }
            this.handleResult(r20);
          }
        }, {
          key : "handleResult",
          /**
           * @param {string} type
           * @return {undefined}
           */
          value : function(type) {
            this.emitter.emit(type ? "success" : "error", {
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
            var action = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
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
           * @param {Object} elem
           * @return {undefined}
           */
          set : function(elem) {
            if (void 0 !== elem) {
              if (!elem || ("object" !== (void 0 === elem ? "undefined" : fn(elem)) || 1 !== elem.nodeType)) {
                throw new Error('Invalid "target" value, use a valid Element');
              }
              if ("copy" === this.action && elem.hasAttribute("disabled")) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
              }
              if ("cut" === this.action && (elem.hasAttribute("readonly") || elem.hasAttribute("disabled"))) {
                throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
              }
              /** @type {Object} */
              this._target = elem;
            }
          },
          /**
           * @return {?}
           */
          get : function() {
            return this._target;
          }
        }]), n;
      }();
      module.exports = JsDiff;
    });
  }, function(module, dataAndEvents, matches) {
    /**
     * @param {Object} node
     * @param {?} opts
     * @param {?} selector
     * @return {?}
     */
    function filter(node, opts, selector) {
      if (!node && (!opts && !selector)) {
        throw new Error("Missing required arguments");
      }
      if (!options.string(opts)) {
        throw new TypeError("Second argument must be a String");
      }
      if (!options.fn(selector)) {
        throw new TypeError("Third argument must be a Function");
      }
      if (options.node(node)) {
        return close(node, opts, selector);
      }
      if (options.nodeList(node)) {
        return initialize(node, opts, selector);
      }
      if (options.string(node)) {
        return f(node, opts, selector);
      }
      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
    }
    /**
     * @param {Object} context
     * @param {?} name
     * @param {?} cb
     * @return {?}
     */
    function close(context, name, cb) {
      return context.addEventListener(name, cb), {
        /**
         * @return {undefined}
         */
        destroy : function() {
          context.removeEventListener(name, cb);
        }
      };
    }
    /**
     * @param {Object} elems
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    function initialize(elems, name, callback) {
      return Array.prototype.forEach.call(elems, function(frame) {
        frame.addEventListener(name, callback);
      }), {
        /**
         * @return {undefined}
         */
        destroy : function() {
          Array.prototype.forEach.call(elems, function(frame) {
            frame.removeEventListener(name, callback);
          });
        }
      };
    }
    /**
     * @param {Object} n
     * @param {?} ctx
     * @param {?} array
     * @return {?}
     */
    function f(n, ctx, array) {
      return callback(document.body, n, ctx, array);
    }
    var options = matches(6);
    var callback = matches(5);
    /** @type {function (Object, ?, ?): ?} */
    module.exports = filter;
  }, function(module, dataAndEvents) {
    /**
     * @return {undefined}
     */
    function MicroEvent() {
    }
    MicroEvent.prototype = {
      /**
       * @param {string} type
       * @param {Object} fn
       * @param {Function} data
       * @return {?}
       */
      on : function(type, fn, data) {
        var special = this.e || (this.e = {});
        return(special[type] || (special[type] = [])).push({
          fn : fn,
          /** @type {Function} */
          ctx : data
        }), this;
      },
      /**
       * @param {string} type
       * @param {Function} listener
       * @param {?} context
       * @return {?}
       */
      once : function(type, listener, context) {
        /**
         * @return {undefined}
         */
        function one() {
          obj.off(type, one);
          listener.apply(context, arguments);
        }
        var obj = this;
        return one._ = listener, this.on(type, one, context);
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
        i;
        for (;i < len;i++) {
          qs[i].fn.apply(qs[i].ctx, args);
        }
        return this;
      },
      /**
       * @param {string} type
       * @param {Function} fn
       * @return {?}
       */
      off : function(type, fn) {
        var object = this.e || (this.e = {});
        var arr = object[type];
        /** @type {Array} */
        var value = [];
        if (arr && fn) {
          /** @type {number} */
          var i = 0;
          var e = arr.length;
          for (;i < e;i++) {
            if (arr[i].fn !== fn) {
              if (arr[i].fn._ !== fn) {
                value.push(arr[i]);
              }
            }
          }
        }
        return value.length ? object[type] = value : delete object[type], this;
      }
    };
    /** @type {function (): undefined} */
    module.exports = MicroEvent;
  }, function(context, me, $sanitize) {
    var fn;
    var args;
    var css;
    !function(recurring, tmp) {
      /** @type {Array} */
      args = [context, $sanitize(0), $sanitize(2), $sanitize(1)];
      /** @type {function (Object, Function, Function, Function): undefined} */
      fn = tmp;
      if (void 0 !== (css = "function" == typeof fn ? fn.apply(me, args) : fn)) {
        /** @type {(function (Object, Function, Function, Function): undefined|undefined)} */
        context.exports = css;
      }
    }(0, function(module, name, data, style) {
      /**
       * @param {Function} name
       * @return {?}
       */
      function normalize(name) {
        return name && name.__esModule ? name : {
          /** @type {Function} */
          default : name
        };
      }
      /**
       * @param {?} actual
       * @param {Function} expected
       * @return {undefined}
       */
      function compare(actual, expected) {
        if (!(actual instanceof expected)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @param {string} dataAndEvents
       * @param {?} object
       * @return {?}
       */
      function traverse(dataAndEvents, object) {
        if (!dataAndEvents) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return!object || "object" != typeof object && "function" != typeof object ? dataAndEvents : object;
      }
      /**
       * @param {Object} klass
       * @param {Object} extend
       * @return {undefined}
       */
      function create(klass, extend) {
        if ("function" != typeof extend && null !== extend) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof extend);
        }
        /** @type {Object} */
        klass.prototype = Object.create(extend && extend.prototype, {
          constructor : {
            value : klass,
            enumerable : false,
            writable : true,
            configurable : true
          }
        });
        if (extend) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(klass, extend);
          } else {
            /** @type {Object} */
            klass.__proto__ = extend;
          }
        }
      }
      /**
       * @param {string} name
       * @param {Node} elem
       * @return {?}
       */
      function fn(name, elem) {
        /** @type {string} */
        var attr = "data-clipboard-" + name;
        if (elem.hasAttribute(attr)) {
          return elem.getAttribute(attr);
        }
      }
      var value = normalize(name);
      var obj = normalize(data);
      var target = normalize(style);
      /** @type {function (?): ?} */
      var $ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(dataAndEvents) {
        return typeof dataAndEvents;
      } : function(b) {
        return b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
      };
      var lookupIterator = function() {
        /**
         * @param {Function} object
         * @param {Array} d
         * @return {undefined}
         */
        function defineProperty(object, d) {
          /** @type {number} */
          var i = 0;
          for (;i < d.length;i++) {
            var desc = d[i];
            desc.enumerable = desc.enumerable || false;
            /** @type {boolean} */
            desc.configurable = true;
            if ("value" in desc) {
              /** @type {boolean} */
              desc.writable = true;
            }
            Object.defineProperty(object, desc.key, desc);
          }
        }
        return function(x, current, a) {
          return current && defineProperty(x.prototype, current), a && defineProperty(x, a), x;
        };
      }();
      var JsDiff = function(options) {
        /**
         * @param {?} newValue
         * @param {?} shim
         * @return {?}
         */
        function value(newValue, shim) {
          compare(this, value);
          var tree = traverse(this, (value.__proto__ || Object.getPrototypeOf(value)).call(this));
          return tree.resolveOptions(shim), tree.listenClick(newValue), tree;
        }
        return create(value, options), lookupIterator(value, [{
          key : "resolveOptions",
          /**
           * @return {undefined}
           */
          value : function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.action = "function" == typeof e.action ? e.action : this.defaultAction;
            this.target = "function" == typeof e.target ? e.target : this.defaultTarget;
            this.text = "function" == typeof e.text ? e.text : this.defaultText;
            this.container = "object" === $(e.container) ? e.container : document.body;
          }
        }, {
          key : "listenClick",
          /**
           * @param {string} type
           * @return {undefined}
           */
          value : function(type) {
            var data = this;
            this.listener = (0, target.default)(type, "click", function(d) {
              return data.onClick(d);
            });
          }
        }, {
          key : "onClick",
          /**
           * @param {string} type
           * @return {undefined}
           */
          value : function(type) {
            var cycle = type.delegateTarget || type.currentTarget;
            if (this.clipboardAction) {
              /** @type {null} */
              this.clipboardAction = null;
            }
            this.clipboardAction = new value.default({
              action : this.action(cycle),
              target : this.target(cycle),
              text : this.text(cycle),
              container : this.container,
              trigger : cycle,
              emitter : this
            });
          }
        }, {
          key : "defaultAction",
          /**
           * @param {string} type
           * @return {?}
           */
          value : function(type) {
            return fn("action", type);
          }
        }, {
          key : "defaultTarget",
          /**
           * @param {string} type
           * @return {?}
           */
          value : function(type) {
            var q = fn("target", type);
            if (q) {
              return document.querySelector(q);
            }
          }
        }, {
          key : "defaultText",
          /**
           * @param {string} type
           * @return {?}
           */
          value : function(type) {
            return fn("text", type);
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
            var opts = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"];
            var asserterNames = "string" == typeof opts ? [opts] : opts;
            /** @type {boolean} */
            var skipStatic = !!document.queryCommandSupported;
            return asserterNames.forEach(function(command) {
              skipStatic = skipStatic && !!document.queryCommandSupported(command);
            }), skipStatic;
          }
        }]), value;
      }(obj.default);
      module.exports = JsDiff;
    });
  }, function(module, dataAndEvents) {
    /**
     * @param {Object} node
     * @param {?} arg
     * @return {?}
     */
    function select(node, arg) {
      for (;node && node.nodeType !== ELEMENT_NODE;) {
        if ("function" == typeof node.matches && node.matches(arg)) {
          return node;
        }
        node = node.parentNode;
      }
    }
    /** @type {number} */
    var ELEMENT_NODE = 9;
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      /** @type {function (this:Element, string, (Node|NodeList|null)=): boolean} */
      proto.matches = proto.matchesSelector || (proto.mozMatchesSelector || (proto.msMatchesSelector || (proto.oMatchesSelector || proto.webkitMatchesSelector)));
    }
    /** @type {function (Object, ?): ?} */
    module.exports = select;
  }, function(module, dataAndEvents, $sanitize) {
    /**
     * @param {?} instance
     * @param {?} deepDataAndEvents
     * @param {?} name
     * @param {?} socket
     * @param {?} obj
     * @return {?}
     */
    function check(instance, deepDataAndEvents, name, socket, obj) {
      var handle = after.apply(this, arguments);
      return instance.addEventListener(name, handle, obj), {
        /**
         * @return {undefined}
         */
        destroy : function() {
          instance.removeEventListener(name, handle, obj);
        }
      };
    }
    /**
     * @param {?} select
     * @param {?} deepDataAndEvents
     * @param {?} name
     * @param {?} callback
     * @param {?} defs
     * @return {?}
     */
    function init(select, deepDataAndEvents, name, callback, defs) {
      return "function" == typeof select.addEventListener ? check.apply(null, arguments) : "function" == typeof name ? check.bind(null, document).apply(null, arguments) : ("string" == typeof select && (select = document.querySelectorAll(select)), Array.prototype.map.call(select, function(config) {
        return check(config, deepDataAndEvents, name, callback, defs);
      }));
    }
    /**
     * @param {?} elems
     * @param {?} element
     * @param {?} times
     * @param {Function} fn
     * @return {?}
     */
    function after(elems, element, times, fn) {
      return function(event) {
        event.delegateTarget = $(event.target, element);
        if (event.delegateTarget) {
          fn.call(elems, event);
        }
      };
    }
    var $ = $sanitize(4);
    /** @type {function (?, ?, ?, ?, ?): ?} */
    module.exports = init;
  }, function(dataAndEvents, value) {
    /**
     * @param {Object} node
     * @return {?}
     */
    value.node = function(node) {
      return void 0 !== node && (node instanceof HTMLElement && 1 === node.nodeType);
    };
    /**
     * @param {Object} elems
     * @return {?}
     */
    value.nodeList = function(elems) {
      /** @type {string} */
      var isArray = Object.prototype.toString.call(elems);
      return void 0 !== elems && (("[object NodeList]" === isArray || "[object HTMLCollection]" === isArray) && ("length" in elems && (0 === elems.length || value.node(elems[0]))));
    };
    /**
     * @param {?} b
     * @return {?}
     */
    value.string = function(b) {
      return "string" == typeof b || b instanceof String;
    };
    /**
     * @param {?} scope
     * @return {?}
     */
    value.fn = function(scope) {
      return "[object Function]" === Object.prototype.toString.call(scope);
    };
  }, function(module, dataAndEvents) {
    /**
     * @param {Element} elem
     * @return {?}
     */
    function init(elem) {
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
    }
    /** @type {function (Element): ?} */
    module.exports = init;
  }]);
});
/**
 * @param {string} name
 * @param {string} k
 * @param {number} i
 * @return {undefined}
 */
function ASSetCookie(name, k, i) {
  /** @type {Date} */
  var date = new Date;
  date.setDate(date.getDate() + i);
  /** @type {string} */
  var value = escape(k) + (0 == i ? ";path=/" : "; expires=" + date.toUTCString()) + ";path=/";
  /** @type {string} */
  document.cookie = name + "=" + value;
}
/**
 * @param {string} operator
 * @return {?}
 */
function ASGetCookie(operator) {
  var i;
  var style;
  var code;
  /** @type {Array.<string>} */
  var ARRcookies = document.cookie.split(";");
  /** @type {number} */
  i = 0;
  for (;i < ARRcookies.length;i++) {
    if (style = ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")), code = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1), style = style.replace(/^\s+|\s+$/g, ""), style == operator) {
      return unescape(code);
    }
  }
}
/**
 * @param {string} n
 * @param {number} classNames
 * @return {undefined}
 */
function ASSetCookieAds(n, classNames) {
  var cDigit = ASGetCookie(n);
  if (void 0 != cDigit && "" != cDigit) {
    /** @type {number} */
    ASTheCookieInt = parseInt(cDigit) + 1;
    ASSetCookie(n, ASTheCookieInt.toString(), 0);
  } else {
    ASSetCookie(n, "1", classNames);
  }
}
/**
 * @param {string} n
 * @param {number} opt_attributes
 * @return {?}
 */
function ASMaxClick(n, opt_attributes) {
  var cDigit = ASGetCookie(n);
  return void 0 != cDigit && parseInt(cDigit) >= opt_attributes;
}
jQuery(document).ready(function($) {
  /** @type {string} */
  var zip_bl = "adsShield";
  /** @type {string} */
  var el = ".adsShield";
  /** @type {boolean} */
  var i = false;
  if (ASMaxClick(zip_bl, 3)) {
    $(el).hide("fast");
  }
  $(el).bind("mouseover", function() {
    /** @type {boolean} */
    i = true;
  }).bind("mouseout", function() {
    /** @type {boolean} */
    i = false;
  });
  $(window).on("beforeunload", function() {
    if (i) {
      if (ASMaxClick(zip_bl, 3)) {
        $(el).hide("fast");
      } else {
        ASSetCookieAds(zip_bl, 7);
      }
    }
  });
});
