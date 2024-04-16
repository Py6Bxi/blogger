/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
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
   * @param {Object} code
   * @param {Object} el
   * @param {(Function|string)} context
   * @return {undefined}
   */
  function next(code, el, context) {
    var key;
    var scriptID;
    var script = (context = context || doc).createElement("script");
    if (script.text = code, el) {
      for (key in options) {
        if (scriptID = el[key] || el.getAttribute && el.getAttribute(key)) {
          script.setAttribute(key, scriptID);
        }
      }
    }
    context.head.appendChild(script).parentNode.removeChild(script);
  }
  /**
   * @param {string} obj
   * @return {?}
   */
  function type(obj) {
    return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj;
  }
  /**
   * @param {Object} obj
   * @return {?}
   */
  function isArraylike(obj) {
    var length = !!obj && ("length" in obj && obj.length);
    var keys = type(obj);
    return!isFunction(obj) && (!isWindow(obj) && ("array" === keys || (0 === length || "number" == typeof length && (0 < length && length - 1 in obj))));
  }
  /**
   * @param {Object} a
   * @param {string} name
   * @return {?}
   */
  function callback(a, name) {
    return a.nodeName && a.nodeName.toLowerCase() === name.toLowerCase();
  }
  /**
   * @param {string} c
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  function _char(c, dataAndEvents) {
    return dataAndEvents ? "\x00" === c ? "\ufffd" : c.slice(0, -1) + "\\" + c.charCodeAt(c.length - 1).toString(16) + " " : "\\" + c;
  }
  /**
   * @param {string} elements
   * @param {?} qualifier
   * @param {boolean} not
   * @return {?}
   */
  function winnow(elements, qualifier, not) {
    return isFunction(qualifier) ? jQuery.grep(elements, function(elem, i) {
      return!!qualifier.call(elem, i, elem) !== not;
    }) : qualifier.nodeType ? jQuery.grep(elements, function(elem) {
      return elem === qualifier !== not;
    }) : "string" != typeof qualifier ? jQuery.grep(elements, function(elem) {
      return-1 < core_indexOf.call(qualifier, elem) !== not;
    }) : jQuery.filter(qualifier, elements, not);
  }
  /**
   * @param {Object} cur
   * @param {string} dir
   * @return {?}
   */
  function _singleSibling(cur, dir) {
    for (;(cur = cur[dir]) && 1 !== cur.nodeType;) {
    }
    return cur;
  }
  /**
   * @param {?} key
   * @return {?}
   */
  function index(key) {
    return key;
  }
  /**
   * @param {?} i
   * @return {?}
   */
  function data(i) {
    throw i;
  }
  /**
   * @param {?} item
   * @param {Function} callback
   * @param {Function} fn
   * @param {boolean} args
   * @return {undefined}
   */
  function require(item, callback, fn, args) {
    var a;
    try {
      if (item && isFunction(a = item.promise)) {
        a.call(item).done(callback).fail(fn);
      } else {
        if (item && isFunction(a = item.then)) {
          a.call(item, callback, fn);
        } else {
          callback.apply(void 0, [item].slice(args));
        }
      }
    } catch (handleEl) {
      fn.apply(void 0, [handleEl]);
    }
  }
  /**
   * @return {undefined}
   */
  function completed() {
    doc.removeEventListener("DOMContentLoaded", completed);
    win.removeEventListener("load", completed);
    jQuery.ready();
  }
  /**
   * @param {?} all
   * @param {string} letter
   * @return {?}
   */
  function fcamelCase(all, letter) {
    return letter.toUpperCase();
  }
  /**
   * @param {string} string
   * @return {?}
   */
  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(newlineRe, fcamelCase);
  }
  /**
   * @return {undefined}
   */
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  /**
   * @param {Object} elem
   * @param {string} udataCur
   * @param {Object} data
   * @return {?}
   */
  function dataAttr(elem, udataCur, data) {
    var name;
    var key;
    if (void 0 === data && 1 === elem.nodeType) {
      if (name = "data-" + udataCur.replace(r20, "-$&").toLowerCase(), "string" == typeof(data = elem.getAttribute(name))) {
        try {
          /** @type {*} */
          data = "true" === (key = data) || "false" !== key && ("null" === key ? null : key === +key + "" ? +key : isint.test(key) ? JSON.parse(key) : key);
        } catch (e) {
        }
        data_user.set(elem, udataCur, data);
      } else {
        data = void 0;
      }
    }
    return data;
  }
  /**
   * @param {Object} elem
   * @param {string} prop
   * @param {Object} parts
   * @param {Object} t
   * @return {?}
   */
  function get(elem, prop, parts, t) {
    var end;
    var o;
    /** @type {number} */
    var a = 20;
    /** @type {function (): ?} */
    var flag = t ? function() {
      return t.cur();
    } : function() {
      return jQuery.css(elem, prop, "");
    };
    var obj = flag();
    var unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
    var start = elem.nodeType && ((jQuery.cssNumber[prop] || "px" !== unit && +obj) && regexp.exec(jQuery.css(elem, prop)));
    if (start && start[3] !== unit) {
      obj /= 2;
      unit = unit || start[3];
      /** @type {number} */
      start = +obj || 1;
      for (;a--;) {
        jQuery.style(elem, prop, start + unit);
        if ((1 - o) * (1 - (o = flag() / obj || 0.5)) <= 0) {
          /** @type {number} */
          a = 0;
        }
        start /= o;
      }
      start *= 2;
      jQuery.style(elem, prop, start + unit);
      parts = parts || [];
    }
    return parts && (start = +start || (+obj || 0), end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2], t && (t.unit = unit, t.start = start, t.end = end)), end;
  }
  /**
   * @param {Array} values
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  function update(values, dataAndEvents) {
    var data;
    var cur;
    var tmp;
    var elem;
    var doc;
    var tagName;
    var display;
    /** @type {Array} */
    var origDisplay = [];
    /** @type {number} */
    var i = 0;
    var valuesLen = values.length;
    for (;i < valuesLen;i++) {
      if ((cur = values[i]).style) {
        data = cur.style.display;
        if (dataAndEvents) {
          if ("none" === data) {
            origDisplay[i] = data_priv.get(cur, "display") || null;
            if (!origDisplay[i]) {
              /** @type {string} */
              cur.style.display = "";
            }
          }
          if ("" === cur.style.display) {
            if (isHidden(cur)) {
              origDisplay[i] = (display = doc = elem = void 0, doc = (tmp = cur).ownerDocument, tagName = tmp.nodeName, (display = elemdisplay[tagName]) || (elem = doc.body.appendChild(doc.createElement(tagName)), display = jQuery.css(elem, "display"), elem.parentNode.removeChild(elem), "none" === display && (display = "block"), elemdisplay[tagName] = display));
            }
          }
        } else {
          if ("none" !== data) {
            /** @type {string} */
            origDisplay[i] = "none";
            data_priv.set(cur, "display", data);
          }
        }
      }
    }
    /** @type {number} */
    i = 0;
    for (;i < valuesLen;i++) {
      if (null != origDisplay[i]) {
        values[i].style.display = origDisplay[i];
      }
    }
    return values;
  }
  /**
   * @param {Object} context
   * @param {string} tag
   * @return {?}
   */
  function getAll(context, tag) {
    var ret;
    return ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [], void 0 === tag || tag && callback(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  /**
   * @param {(Array|NodeList)} elems
   * @param {Array} refElements
   * @return {undefined}
   */
  function setGlobalEval(elems, refElements) {
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    for (;i < length;i++) {
      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
  }
  /**
   * @param {Array} elems
   * @param {Document} context
   * @param {boolean} scripts
   * @param {Object} values
   * @param {Array} str
   * @return {?}
   */
  function parse(elems, context, scripts, values, str) {
    var elem;
    var tmp;
    var tag;
    var wrap;
    var cs;
    var j;
    var fragment = context.createDocumentFragment();
    /** @type {Array} */
    var nodes = [];
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    for (;i < length;i++) {
      if ((elem = elems[i]) || 0 === elem) {
        if ("object" === type(elem)) {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else {
          if (rhtml.test(elem)) {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
            j = wrap[0];
            for (;j--;) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            /** @type {string} */
            (tmp = fragment.firstChild).textContent = "";
          } else {
            nodes.push(context.createTextNode(elem));
          }
        }
      }
    }
    /** @type {string} */
    fragment.textContent = "";
    /** @type {number} */
    i = 0;
    for (;elem = nodes[i++];) {
      if (values && -1 < jQuery.inArray(elem, values)) {
        if (str) {
          str.push(elem);
        }
      } else {
        if (cs = getComputedStyle(elem), tmp = getAll(fragment.appendChild(elem), "script"), cs && setGlobalEval(tmp), scripts) {
          /** @type {number} */
          j = 0;
          for (;elem = tmp[j++];) {
            if (rchecked.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
    }
    return fragment;
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
   * @param {Object} object
   * @param {Object} type
   * @param {Object} selector
   * @param {Object} data
   * @param {Object} fn
   * @param {(number|string)} deepDataAndEvents
   * @return {?}
   */
  function on(object, type, selector, data, fn, deepDataAndEvents) {
    var origFn;
    var eventType;
    if ("object" == typeof type) {
      for (eventType in "string" != typeof selector && (data = data || selector, selector = void 0), type) {
        on(object, eventType, selector, data, type[eventType], deepDataAndEvents);
      }
      return object;
    }
    if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), false === fn) {
      /** @type {function (): ?} */
      fn = returnFalse;
    } else {
      if (!fn) {
        return object;
      }
    }
    return 1 === deepDataAndEvents && (origFn = fn, (fn = function(event) {
      return jQuery().off(event), origFn.apply(this, arguments);
    }).guid = origFn.guid || (origFn.guid = jQuery.guid++)), object.each(function() {
      jQuery.event.add(this, type, fn, data, selector);
    });
  }
  /**
   * @param {Object} dest
   * @param {string} type
   * @param {boolean} keepData
   * @return {undefined}
   */
  function remove(dest, type, keepData) {
    if (keepData) {
      data_priv.set(dest, type, false);
      jQuery.event.add(dest, type, {
        namespace : false,
        /**
         * @param {Object} event
         * @return {?}
         */
        handler : function(event) {
          var queue;
          var data = data_priv.get(this, type);
          if (1 & event.isTrigger && this[type]) {
            if (data) {
              if ((jQuery.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }
            } else {
              if (data = slice.call(arguments), data_priv.set(this, type, data), this[type](), queue = data_priv.get(this, type), data_priv.set(this, type, false), data !== queue) {
                return event.stopImmediatePropagation(), event.preventDefault(), queue;
              }
            }
          } else {
            if (data) {
              data_priv.set(this, type, jQuery.event.trigger(data[0], data.slice(1), this));
              event.stopPropagation();
              /** @type {function (): ?} */
              event.isImmediatePropagationStopped = returnTrue;
            }
          }
        }
      });
    } else {
      if (void 0 === data_priv.get(dest, type)) {
        jQuery.event.add(dest, type, returnTrue);
      }
    }
  }
  /**
   * @param {Object} elem
   * @param {Node} content
   * @return {?}
   */
  function manipulationTarget(elem, content) {
    return callback(elem, "table") && (callback(11 !== content.nodeType ? content : content.firstChild, "tr") && jQuery(elem).children("tbody")[0]) || elem;
  }
  /**
   * @param {Element} elem
   * @return {?}
   */
  function disableScript(elem) {
    return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
  }
  /**
   * @param {Element} elem
   * @return {?}
   */
  function restoreScript(elem) {
    return "true/" === (elem.type || "").slice(0, 5) ? elem.type = elem.type.slice(5) : elem.removeAttribute("type"), elem;
  }
  /**
   * @param {Object} src
   * @param {Object} dest
   * @return {undefined}
   */
  function cloneCopyEvent(src, dest) {
    var i;
    var valsLength;
    var type;
    var udataOld;
    var udataCur;
    var events;
    if (1 === dest.nodeType) {
      if (data_priv.hasData(src) && (events = data_priv.get(src).events)) {
        for (type in data_priv.remove(dest, "handle events"), events) {
          /** @type {number} */
          i = 0;
          valsLength = events[type].length;
          for (;i < valsLength;i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
      if (data_user.hasData(src)) {
        udataOld = data_user.access(src);
        udataCur = jQuery.extend({}, udataOld);
        data_user.set(dest, udataCur);
      }
    }
  }
  /**
   * @param {Array} elements
   * @param {Object} args
   * @param {Function} callback
   * @param {Object} atts
   * @return {?}
   */
  function load(elements, args, callback, atts) {
    args = MAP(args);
    var fragment;
    var first;
    var scripts;
    var valsLength;
    var node;
    var doc;
    /** @type {number} */
    var i = 0;
    var l = elements.length;
    /** @type {number} */
    var iNoClone = l - 1;
    var value = args[0];
    var func = isFunction(value);
    if (func || 1 < l && ("string" == typeof value && (!support.checkClone && rRadial.test(value)))) {
      return elements.each(function(index) {
        var el = elements.eq(index);
        if (func) {
          args[0] = value.call(this, index, el.html());
        }
        load(el, args, callback, atts);
      });
    }
    if (l && (first = (fragment = parse(args, elements[0].ownerDocument, false, elements, atts)).firstChild, 1 === fragment.childNodes.length && (fragment = first), first || atts)) {
      valsLength = (scripts = jQuery.map(getAll(fragment, "script"), disableScript)).length;
      for (;i < l;i++) {
        node = fragment;
        if (i !== iNoClone) {
          node = jQuery.clone(node, true, true);
          if (valsLength) {
            jQuery.merge(scripts, getAll(node, "script"));
          }
        }
        callback.call(elements[i], node, i);
      }
      if (valsLength) {
        doc = scripts[scripts.length - 1].ownerDocument;
        jQuery.map(scripts, restoreScript);
        /** @type {number} */
        i = 0;
        for (;i < valsLength;i++) {
          node = scripts[i];
          if (rchecked.test(node.type || "")) {
            if (!data_priv.access(node, "globalEval")) {
              if (jQuery.contains(doc, node)) {
                if (node.src && "module" !== (node.type || "").toLowerCase()) {
                  if (jQuery._evalUrl) {
                    if (!node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce : node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  }
                } else {
                  next(node.textContent.replace(normalizr, ""), node, doc);
                }
              }
            }
          }
        }
      }
    }
    return elements;
  }
  /**
   * @param {string} elements
   * @param {?} selector
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  function init(elements, selector, dataAndEvents) {
    var elem;
    var elems = selector ? jQuery.filter(selector, elements) : elements;
    /** @type {number} */
    var i = 0;
    for (;null != (elem = elems[i]);i++) {
      if (!dataAndEvents) {
        if (!(1 !== elem.nodeType)) {
          jQuery.cleanData(getAll(elem));
        }
      }
      if (elem.parentNode) {
        if (dataAndEvents) {
          if (getComputedStyle(elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
        }
        elem.parentNode.removeChild(elem);
      }
    }
    return elements;
  }
  /**
   * @param {Object} elem
   * @param {string} prop
   * @param {Object} computed
   * @return {?}
   */
  function css(elem, prop, computed) {
    var width;
    var minWidth;
    var maxWidth;
    var val;
    /** @type {boolean} */
    var p = props.test(prop);
    var style = elem.style;
    return(computed = computed || getStyles(elem)) && (val = computed.getPropertyValue(prop) || computed[prop], p && (val && (val = val.replace(rtrim, "$1") || void 0)), "" !== val || (getComputedStyle(elem) || (val = jQuery.style(elem, prop))), !support.pixelBoxStyles() && (rnumnonpx.test(val) && (regex.test(prop) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = val, val = computed.width, style.width = width, style.minWidth = 
    minWidth, style.maxWidth = maxWidth)))), void 0 !== val ? val + "" : val;
  }
  /**
   * @param {?} $timeout
   * @param {Function} hookFn
   * @return {?}
   */
  function addGetHookIf($timeout, hookFn) {
    return{
      /**
       * @return {?}
       */
      get : function() {
        if (!$timeout()) {
          return(this.get = hookFn).apply(this, arguments);
        }
        delete this.get;
      }
    };
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function camelize(name) {
    var t = jQuery.cssProps[name] || methods[name];
    return t || (name in elem ? name : methods[name] = function(propName) {
      var capitalized = propName[0].toUpperCase() + propName.slice(1);
      /** @type {number} */
      var length = VENDOR_PREFIXES.length;
      for (;length--;) {
        if ((propName = VENDOR_PREFIXES[length] + capitalized) in elem) {
          return propName;
        }
      }
    }(name) || name);
  }
  /**
   * @param {Object} owner
   * @param {string} value
   * @param {Object} actual
   * @return {?}
   */
  function set(owner, value, actual) {
    /** @type {(Array.<string>|null)} */
    var iterator = regexp.exec(value);
    return iterator ? Math.max(0, iterator[2] - (actual || 0)) + (iterator[3] || "px") : value;
  }
  /**
   * @param {Object} elem
   * @param {string} args
   * @param {string} extra
   * @param {boolean} error
   * @param {?} styles
   * @param {number} count
   * @return {?}
   */
  function fn(elem, args, extra, error, styles, count) {
    /** @type {number} */
    var i = "width" === args ? 1 : 0;
    /** @type {number} */
    var baseHeight = 0;
    /** @type {number} */
    var val = 0;
    /** @type {number} */
    var operator = 0;
    if (extra === (error ? "border" : "content")) {
      return 0;
    }
    for (;i < 4;i += 2) {
      if ("margin" === extra) {
        operator += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (error) {
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
        } else {
          baseHeight += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return!error && (0 <= count && (val += Math.max(0, Math.ceil(elem["offset" + args[0].toUpperCase() + args.slice(1)] - count - val - baseHeight - 0.5)) || 0)), val + operator;
  }
  /**
   * @param {Object} elem
   * @param {string} prop
   * @param {(Function|string)} extra
   * @return {?}
   */
  function getWidthOrHeight(elem, prop, extra) {
    var value = getStyles(elem);
    var isBorderBox = (!support.boxSizingReliable() || extra) && "border-box" === jQuery.css(elem, "boxSizing", false, value);
    var onError = isBorderBox;
    var val = css(elem, prop, value);
    var propName = "offset" + prop[0].toUpperCase() + prop.slice(1);
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }
      /** @type {string} */
      val = "auto";
    }
    return(!support.boxSizingReliable() && isBorderBox || (!support.reliableTrDimensions() && callback(elem, "tr") || ("auto" === val || !parseFloat(val) && "inline" === jQuery.css(elem, "display", false, value)))) && (elem.getClientRects().length && (isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", false, value), (onError = propName in elem) && (val = elem[propName]))), (val = parseFloat(val) || 0) + fn(elem, prop, extra || (isBorderBox ? "border" : "content"), onError, value, val) + 
    "px";
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
   * @return {undefined}
   */
  function animate() {
    if (ut) {
      if (false === doc.hidden && win.requestAnimationFrame) {
        win.requestAnimationFrame(animate);
      } else {
        win.setTimeout(animate, jQuery.fx.interval);
      }
      jQuery.fx.tick();
    }
  }
  /**
   * @return {?}
   */
  function createFxNow() {
    return win.setTimeout(function() {
      fxNow = void 0;
    }), fxNow = Date.now();
  }
  /**
   * @param {string} type
   * @param {boolean} includeWidth
   * @return {?}
   */
  function genFx(type, includeWidth) {
    var which;
    /** @type {number} */
    var i = 0;
    var attrs = {
      height : type
    };
    /** @type {number} */
    includeWidth = includeWidth ? 1 : 0;
    for (;i < 4;i += 2 - includeWidth) {
      attrs["margin" + (which = cssExpand[i])] = attrs["padding" + which] = type;
    }
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  /**
   * @param {?} value
   * @param {string} prop
   * @param {Object} animation
   * @return {?}
   */
  function createTween(value, prop, animation) {
    var tween;
    var codeSegments = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]);
    /** @type {number} */
    var i = 0;
    var valuesLen = codeSegments.length;
    for (;i < valuesLen;i++) {
      if (tween = codeSegments[i].call(animation, prop, value)) {
        return tween;
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
    var a;
    /** @type {number} */
    var i = 0;
    var valuesLen = Animation.prefilters.length;
    var deferred = jQuery.Deferred().always(function() {
      delete tick.elem;
    });
    /**
     * @return {?}
     */
    var tick = function() {
      if (a) {
        return false;
      }
      var currentTime = fxNow || createFxNow();
      /** @type {number} */
      var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
      /** @type {number} */
      var percent = 1 - (remaining / animation.duration || 0);
      /** @type {number} */
      var index = 0;
      var length = animation.tweens.length;
      for (;index < length;index++) {
        animation.tweens[index].run(percent);
      }
      return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (length || deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation]), false);
    };
    var animation = deferred.promise({
      elem : elem,
      props : jQuery.extend({}, properties),
      opts : jQuery.extend(true, {
        specialEasing : {},
        easing : jQuery.easing._default
      }, options),
      originalProperties : properties,
      originalOptions : options,
      startTime : fxNow || createFxNow(),
      duration : options.duration,
      tweens : [],
      /**
       * @param {string} prop
       * @param {?} end
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
        if (a) {
          return this;
        }
        /** @type {boolean} */
        a = true;
        for (;index < length;index++) {
          animation.tweens[index].run(1);
        }
        return gotoEnd ? (deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation, gotoEnd])) : deferred.rejectWith(elem, [animation, gotoEnd]), this;
      }
    });
    var val = animation.props;
    !function(obj, members) {
      var key;
      var name;
      var member;
      var value;
      var hooks;
      for (key in obj) {
        if (member = members[name = camelCase(key)], value = obj[key], Array.isArray(value) && (member = value[1], value = obj[key] = value[0]), key !== name && (obj[name] = value, delete obj[key]), (hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
          for (key in value = hooks.expand(value), delete obj[name], value) {
            if (!(key in obj)) {
              obj[key] = value[key];
              members[key] = member;
            }
          }
        } else {
          members[name] = member;
        }
      }
    }(val, animation.opts.specialEasing);
    for (;i < valuesLen;i++) {
      if (result = Animation.prefilters[i].call(animation, elem, val, animation.opts)) {
        return isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result)), result;
      }
    }
    return jQuery.map(val, createTween, animation), isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always), jQuery.fx.timer(jQuery.extend(tick, {
      elem : elem,
      anim : animation,
      queue : animation.opts.queue
    })), animation;
  }
  /**
   * @param {string} pre
   * @return {?}
   */
  function join(pre) {
    return(pre.match(core_rnotwhite) || []).join(" ");
  }
  /**
   * @param {Element} text
   * @return {?}
   */
  function trim(text) {
    return text.getAttribute && text.getAttribute("class") || "";
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function isArray(value) {
    return Array.isArray(value) ? value : "string" == typeof value && value.match(core_rnotwhite) || [];
  }
  /**
   * @param {string} prefix
   * @param {Object} obj
   * @param {boolean} traditional
   * @param {Function} add
   * @return {undefined}
   */
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (Array.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add);
        }
      });
    } else {
      if (traditional || "object" !== type(obj)) {
        add(prefix, obj);
      } else {
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }
      }
    }
  }
  /**
   * @param {Object} structure
   * @return {?}
   */
  function addToPrefiltersOrTransports(structure) {
    return function(v, source) {
      if ("string" != typeof v) {
        /** @type {(Function|string)} */
        source = v;
        /** @type {string} */
        v = "*";
      }
      var node;
      /** @type {number} */
      var i = 0;
      var elem = v.toLowerCase().match(core_rnotwhite) || [];
      if (isFunction(source)) {
        for (;node = elem[i++];) {
          if ("+" === node[0]) {
            node = node.slice(1) || "*";
            (structure[node] = structure[node] || []).unshift(source);
          } else {
            (structure[node] = structure[node] || []).push(source);
          }
        }
      }
    };
  }
  /**
   * @param {?} structure
   * @param {?} options
   * @param {Object} target
   * @param {?} jqXHR
   * @return {?}
   */
  function inspectPrefiltersOrTransports(structure, options, target, jqXHR) {
    /**
     * @param {string} key
     * @return {?}
     */
    function inspect(key) {
      var oldName;
      return old[key] = true, jQuery.each(structure[key] || [], function(dataAndEvents, prefilterOrFactory) {
        var name = prefilterOrFactory(options, target, jqXHR);
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
    var key;
    var deep;
    var flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (void 0 !== src[key]) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }
  /** @type {Array} */
  var arr = [];
  /** @type {function (Object): (Object|null)} */
  var getPrototypeOf = Object.getPrototypeOf;
  var slice = arr.slice;
  /** @type {function (Object): ?} */
  var MAP = arr.flat ? function(elems) {
    return arr.flat.call(elems);
  } : function(elems) {
    return arr.concat.apply([], elems);
  };
  var core_push = arr.push;
  var core_indexOf = arr.indexOf;
  var class2type = {};
  /** @type {function (this:*): string} */
  var core_toString = class2type.toString;
  /** @type {function (this:Object, *): boolean} */
  var hasOwn = class2type.hasOwnProperty;
  /** @type {function (this:Function): string} */
  var ostring = hasOwn.toString;
  /** @type {string} */
  var events = ostring.call(Object);
  var support = {};
  /**
   * @param {Object} obj
   * @return {?}
   */
  var isFunction = function(obj) {
    return "function" == typeof obj && ("number" != typeof obj.nodeType && "function" != typeof obj.item);
  };
  /**
   * @param {Object} obj
   * @return {?}
   */
  var isWindow = function(obj) {
    return null != obj && obj === obj.window;
  };
  var doc = win.document;
  var options = {
    type : true,
    src : true,
    nonce : true,
    noModule : true
  };
  /** @type {string} */
  var core_version = "3.7.1";
  /** @type {RegExp} */
  var supportedTransforms = /HTML$/i;
  /**
   * @param {string} selector
   * @param {Function} context
   * @return {?}
   */
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  };
  jQuery.fn = jQuery.prototype = {
    jquery : core_version,
    /** @type {function (string, Function): ?} */
    constructor : jQuery,
    length : 0,
    /**
     * @return {?}
     */
    toArray : function() {
      return slice.call(this);
    },
    /**
     * @param {string} num
     * @return {?}
     */
    get : function(num) {
      return null == num ? slice.call(this) : num < 0 ? this[num + this.length] : this[num];
    },
    /**
     * @param {Array} elems
     * @return {?}
     */
    pushStack : function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      return ret.prevObject = this, ret;
    },
    /**
     * @param {Function} opt_attributes
     * @return {?}
     */
    each : function(opt_attributes) {
      return jQuery.each(this, opt_attributes);
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
      return this.pushStack(slice.apply(this, arguments));
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
     * @return {?}
     */
    even : function() {
      return this.pushStack(jQuery.grep(this, function(dataAndEvents, deepDataAndEvents) {
        return(deepDataAndEvents + 1) % 2;
      }));
    },
    /**
     * @return {?}
     */
    odd : function() {
      return this.pushStack(jQuery.grep(this, function(dataAndEvents, deepDataAndEvents) {
        return deepDataAndEvents % 2;
      }));
    },
    /**
     * @param {number} i
     * @return {?}
     */
    eq : function(i) {
      var len = this.length;
      var idx = +i + (i < 0 ? len : 0);
      return this.pushStack(0 <= idx && idx < len ? [this[idx]] : []);
    },
    /**
     * @return {?}
     */
    end : function() {
      return this.prevObject || this.constructor();
    },
    push : core_push,
    sort : arr.sort,
    splice : arr.splice
  };
  /** @type {function (): ?} */
  jQuery.extend = jQuery.fn.extend = function() {
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
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
      if (!isFunction(target)) {
        target = {};
      }
    }
    if (i === l) {
      target = this;
      i--;
    }
    for (;i < l;i++) {
      if (null != (options = arguments[i])) {
        for (name in options) {
          copy = options[name];
          if ("__proto__" !== name) {
            if (target !== copy) {
              if (deep && (copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))))) {
                src = target[name];
                clone = copyIsArray && !Array.isArray(src) ? [] : copyIsArray || jQuery.isPlainObject(src) ? src : {};
                /** @type {boolean} */
                copyIsArray = false;
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
    }
    return target;
  };
  jQuery.extend({
    expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    isReady : true,
    /**
     * @param {string} str
     * @return {?}
     */
    error : function(str) {
      throw new Error(str);
    },
    /**
     * @return {undefined}
     */
    noop : function() {
    },
    /**
     * @param {Object} obj
     * @return {?}
     */
    isPlainObject : function(obj) {
      var node;
      var it;
      return!(!obj || "[object Object]" !== core_toString.call(obj)) && (!(node = getPrototypeOf(obj)) || "function" == typeof(it = hasOwn.call(node, "constructor") && node.constructor) && ostring.call(it) === events);
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
     * @param {?} code
     * @param {?} data
     * @param {(Array|string)} deepDataAndEvents
     * @return {undefined}
     */
    globalEval : function(code, data, deepDataAndEvents) {
      next(code, {
        nonce : data && data.nonce
      }, deepDataAndEvents);
    },
    /**
     * @param {Function} obj
     * @param {Function} callback
     * @return {?}
     */
    each : function(obj, callback) {
      var l;
      /** @type {number} */
      var i = 0;
      if (isArraylike(obj)) {
        l = obj.length;
        for (;i < l;i++) {
          if (false === callback.call(obj[i], i, obj[i])) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (false === callback.call(obj[i], i, obj[i])) {
            break;
          }
        }
      }
      return obj;
    },
    /**
     * @param {Node} elem
     * @return {?}
     */
    text : function(elem) {
      var node;
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      var i = 0;
      var nodeType = elem.nodeType;
      if (!nodeType) {
        for (;node = elem[i++];) {
          ret += jQuery.text(node);
        }
      }
      return 1 === nodeType || 11 === nodeType ? elem.textContent : 9 === nodeType ? elem.documentElement.textContent : 3 === nodeType || 4 === nodeType ? elem.nodeValue : ret;
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
     * @param {?} arr
     * @param {?} i
     * @return {?}
     */
    inArray : function(elem, arr, i) {
      return null == arr ? -1 : core_indexOf.call(arr, elem, i);
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    isXMLDoc : function(elem) {
      var nType = elem && elem.namespaceURI;
      var domNode = elem && (elem.ownerDocument || elem).documentElement;
      return!supportedTransforms.test(nType || (domNode && domNode.nodeName || "HTML"));
    },
    /**
     * @param {Array} first
     * @param {Array} second
     * @return {?}
     */
    merge : function(first, second) {
      /** @type {number} */
      var subLn = +second.length;
      /** @type {number} */
      var j = 0;
      var i = first.length;
      for (;j < subLn;j++) {
        first[i++] = second[j];
      }
      return first.length = i, first;
    },
    /**
     * @param {Array} elems
     * @param {Function} callback
     * @param {?} invert
     * @return {?}
     */
    grep : function(elems, callback, invert) {
      /** @type {Array} */
      var ret = [];
      /** @type {number} */
      var i = 0;
      var length = elems.length;
      /** @type {boolean} */
      var callbackExpect = !invert;
      for (;i < length;i++) {
        if (!callback(elems[i], i) !== callbackExpect) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    /**
     * @param {Object} elems
     * @param {Function} callback
     * @param {?} arg
     * @return {?}
     */
    map : function(elems, callback, arg) {
      var valsLength;
      var value;
      /** @type {number} */
      var i = 0;
      /** @type {Array} */
      var elements = [];
      if (isArraylike(elems)) {
        valsLength = elems.length;
        for (;i < valsLength;i++) {
          if (null != (value = callback(elems[i], i, arg))) {
            elements.push(value);
          }
        }
      } else {
        for (i in elems) {
          if (null != (value = callback(elems[i], i, arg))) {
            elements.push(value);
          }
        }
      }
      return MAP(elements);
    },
    guid : 1,
    support : support
  });
  if ("function" == typeof Symbol) {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(dataAndEvents, m3) {
    class2type["[object " + m3 + "]"] = m3.toLowerCase();
  });
  var h = arr.pop;
  var pop = arr.sort;
  var f = arr.splice;
  /** @type {string} */
  var param = "[\\x20\\t\\r\\n\\f]";
  /** @type {RegExp} */
  var rtrim = new RegExp("^" + param + "+|((?:^|[^\\\\])(?:\\\\.)*)" + param + "+$", "g");
  /**
   * @param {Object} a
   * @param {Object} b
   * @return {?}
   */
  jQuery.contains = function(a, b) {
    var bup = b && b.parentNode;
    return a === bup || !(!bup || (1 !== bup.nodeType || !(a.contains ? a.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup))));
  };
  /** @type {RegExp} */
  var rQuot = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  /**
   * @param {(number|string)} str
   * @return {?}
   */
  jQuery.escapeSelector = function(str) {
    return(str + "").replace(rQuot, _char);
  };
  var container = doc;
  var func = core_push;
  !function() {
    /**
     * @param {string} selector
     * @param {Function} node
     * @param {Object} results
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function $(selector, node, results, deepDataAndEvents) {
      var m;
      var i;
      var elem;
      var id;
      var match;
      var group;
      var elements;
      var context = node && node.ownerDocument;
      var view = node ? node.nodeType : 9;
      if (results = results || [], "string" != typeof selector || (!selector || 1 !== view && (9 !== view && 11 !== view))) {
        return results;
      }
      if (!deepDataAndEvents && (Sizzle(node), node = node || doc, documentIsHTML)) {
        if (11 !== view && (match = rquickExpr.exec(selector))) {
          if (m = match[1]) {
            if (9 === view) {
              if (!(elem = node.getElementById(m))) {
                return results;
              }
              if (elem.id === m) {
                return push.call(results, elem), results;
              }
            } else {
              if (context && ((elem = context.getElementById(m)) && ($.contains(node, elem) && elem.id === m))) {
                return push.call(results, elem), results;
              }
            }
          } else {
            if (match[2]) {
              return push.apply(results, node.getElementsByTagName(selector)), results;
            }
            if ((m = match[3]) && node.getElementsByClassName) {
              return push.apply(results, node.getElementsByClassName(m)), results;
            }
          }
        }
        if (!(isA[selector + " "] || rbuggyQSA && rbuggyQSA.test(selector))) {
          if (elements = selector, context = node, 1 === view && (RE_SIMPLE_SELECTOR.test(selector) || rsibling.test(selector))) {
            if (!((context = splittable.test(selector) && find(node.parentNode) || node) == node && support.scope)) {
              if (id = node.getAttribute("id")) {
                id = jQuery.escapeSelector(id);
              } else {
                node.setAttribute("id", id = expando);
              }
            }
            i = (group = tokenize(selector)).length;
            for (;i--;) {
              /** @type {string} */
              group[i] = (id ? "#" + id : ":scope") + " " + toSelector(group[i]);
            }
            elements = group.join(",");
          }
          try {
            return push.apply(results, context.querySelectorAll(elements)), results;
          } catch (e) {
            isA(selector, true);
          } finally {
            if (id === expando) {
              node.removeAttribute("id");
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), node, results, deepDataAndEvents);
    }
    /**
     * @return {?}
     */
    function createCache() {
      /** @type {Array} */
      var buf = [];
      return function cache(key, value) {
        return buf.push(key + " ") > Expr.cacheLength && delete cache[buf.shift()], cache[key + " "] = value;
      };
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
      var el = doc.createElement("fieldset");
      try {
        return!!fn(el);
      } catch (e) {
        return false;
      } finally {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        /** @type {null} */
        el = null;
      }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    function createInputPseudo(type) {
      return function(exports) {
        return callback(exports, "input") && exports.type === type;
      };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    function createButtonPseudo(type) {
      return function(elem) {
        return(callback(elem, "input") || callback(elem, "button")) && elem.type === type;
      };
    }
    /**
     * @param {?} val
     * @return {?}
     */
    function init(val) {
      return function(option) {
        return "form" in option ? option.parentNode && false === option.disabled ? "label" in option ? "label" in option.parentNode ? option.parentNode.disabled === val : option.disabled === val : option.isDisabled === val || option.isDisabled !== !val && getter(option) === val : option.disabled === val : "label" in option && option.disabled === val;
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
    function find(context) {
      return context && ("undefined" != typeof context.getElementsByTagName && context);
    }
    /**
     * @param {Function} context
     * @return {?}
     */
    function Sizzle(context) {
      var view;
      var e = context ? context.ownerDocument || context : container;
      return e != doc && (9 === e.nodeType && (e.documentElement && (el = (doc = e).documentElement, documentIsHTML = !jQuery.isXMLDoc(doc), matches = el.matches || (el.webkitMatchesSelector || el.msMatchesSelector), el.msMatchesSelector && (container != doc && ((view = doc.defaultView) && (view.top !== view && view.addEventListener("unload", scrolling)))), support.getById = assert(function(i) {
        return el.appendChild(i).id = jQuery.expando, !doc.getElementsByName || !doc.getElementsByName(jQuery.expando).length;
      }), support.disconnectedMatch = assert(function(qualifier) {
        return matches.call(qualifier, "*");
      }), support.scope = assert(function() {
        return doc.querySelectorAll(":scope");
      }), support.cssHas = assert(function() {
        try {
          return doc.querySelector(":has(*,:jqfake)"), false;
        } catch (e) {
          return true;
        }
      }), support.getById ? (Expr.filter.ID = function(match) {
        var attrId = match.replace(regexp, funescape);
        return function(elem) {
          return elem.getAttribute("id") === attrId;
        };
      }, Expr.find.ID = function(id, context) {
        if ("undefined" != typeof context.getElementById && documentIsHTML) {
          var m = context.getElementById(id);
          return m ? [m] : [];
        }
      }) : (Expr.filter.ID = function(match) {
        var text = match.replace(regexp, funescape);
        return function(elem) {
          var item = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
          return item && item.value === text;
        };
      }, Expr.find.ID = function(id, context) {
        if ("undefined" != typeof context.getElementById && documentIsHTML) {
          var element;
          var i;
          var nodes;
          var elem = context.getElementById(id);
          if (elem) {
            if ((element = elem.getAttributeNode("id")) && element.value === id) {
              return[elem];
            }
            nodes = context.getElementsByName(id);
            /** @type {number} */
            i = 0;
            for (;elem = nodes[i++];) {
              if ((element = elem.getAttributeNode("id")) && element.value === id) {
                return[elem];
              }
            }
          }
          return[];
        }
      }), Expr.find.TAG = function(context, d) {
        return "undefined" != typeof d.getElementsByTagName ? d.getElementsByTagName(context) : d.querySelectorAll(context);
      }, Expr.find.CLASS = function(className, context) {
        if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      }, rbuggyQSA = [], assert(function(element) {
        var input;
        /** @type {string} */
        el.appendChild(element).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
        if (!element.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + param + "*(?:value|" + f + ")");
        }
        if (!element.querySelectorAll("[id~=" + expando + "-]").length) {
          rbuggyQSA.push("~=");
        }
        if (!element.querySelectorAll("a#" + expando + "+*").length) {
          rbuggyQSA.push(".#.+[+~]");
        }
        if (!element.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }
        (input = doc.createElement("input")).setAttribute("type", "hidden");
        element.appendChild(input).setAttribute("name", "D");
        /** @type {boolean} */
        el.appendChild(element).disabled = true;
        if (2 !== element.querySelectorAll(":disabled").length) {
          rbuggyQSA.push(":enabled", ":disabled");
        }
        (input = doc.createElement("input")).setAttribute("name", "");
        element.appendChild(input);
        if (!element.querySelectorAll("[name='']").length) {
          rbuggyQSA.push("\\[" + param + "*name" + param + "*=" + param + "*(?:''|\"\")");
        }
      }), support.cssHas || rbuggyQSA.push(":has"), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), sortOrder = function(a, b) {
        if (a === b) {
          return stability = true, 0;
        }
        /** @type {number} */
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return compare || (1 & (compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1) || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument == container && $.contains(container, a) ? -1 : b === doc || b.ownerDocument == container && $.contains(container, b) ? 1 : qualifier ? core_indexOf.call(qualifier, a) - core_indexOf.call(qualifier, b) : 0 : 4 & compare ? -1 : 1);
      }))), doc;
    }
    /**
     * @return {undefined}
     */
    function setFilters() {
    }
    /**
     * @param {string} selector
     * @param {boolean} parseOnly
     * @return {?}
     */
    function tokenize(selector, parseOnly) {
      var matched;
      var match;
      var tokens;
      var type;
      var soFar;
      var groups;
      var preFilters;
      var cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      /** @type {string} */
      soFar = selector;
      /** @type {Array} */
      groups = [];
      preFilters = Expr.preFilter;
      for (;soFar;) {
        for (type in matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = false, (match = rsibling.exec(soFar)) && (matched = match.shift(), tokens.push({
          value : matched,
          type : match[0].replace(rtrim, " ")
        }), soFar = soFar.slice(matched.length)), Expr.filter) {
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
      return parseOnly ? soFar.length : soFar ? $.error(selector) : tokenCache(selector, groups).slice(0);
    }
    /**
     * @param {Array} tokens
     * @return {?}
     */
    function toSelector(tokens) {
      /** @type {number} */
      var ti = 0;
      var nTokens = tokens.length;
      /** @type {string} */
      var selector = "";
      for (;ti < nTokens;ti++) {
        selector += tokens[ti].value;
      }
      return selector;
    }
    /**
     * @param {Function} done
     * @param {Object} d
     * @param {boolean} signal_eof
     * @return {?}
     */
    function next(done, d, signal_eof) {
      var p = d.dir;
      var tag = d.next;
      var name = tag || p;
      var khtml = signal_eof && "parentNode" === name;
      /** @type {number} */
      var c = n++;
      return d.first ? function(e, profile, code) {
        for (;e = e[p];) {
          if (1 === e.nodeType || khtml) {
            return done(e, profile, code);
          }
        }
        return false;
      } : function(context, profile, code) {
        var s;
        var obj;
        /** @type {Array} */
        var ret = [dirruns, c];
        if (code) {
          for (;context = context[p];) {
            if ((1 === context.nodeType || khtml) && done(context, profile, code)) {
              return true;
            }
          }
        } else {
          for (;context = context[p];) {
            if (1 === context.nodeType || khtml) {
              if (obj = context[expando] || (context[expando] = {}), tag && callback(context, tag)) {
                context = context[p] || context;
              } else {
                if ((s = obj[name]) && (s[0] === dirruns && s[1] === c)) {
                  return ret[2] = s[2];
                }
                if ((obj[name] = ret)[2] = done(context, profile, code)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };
    }
    /**
     * @param {Array} buffer
     * @return {?}
     */
    function elementMatcher(buffer) {
      return 1 < buffer.length ? function(context, tag, id) {
        var combinator = buffer.length;
        for (;combinator--;) {
          if (!buffer[combinator](context, tag, id)) {
            return false;
          }
        }
        return true;
      } : buffer[0];
    }
    /**
     * @param {Array} values
     * @param {Object} dest
     * @param {Function} a
     * @param {Object} o
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function MAP(values, dest, a, o, deepDataAndEvents) {
      var cur;
      /** @type {Array} */
      var eventPath = [];
      /** @type {number} */
      var i = 0;
      var valuesLen = values.length;
      /** @type {boolean} */
      var l = null != dest;
      for (;i < valuesLen;i++) {
        if (cur = values[i]) {
          if (!(a && !a(cur, o, deepDataAndEvents))) {
            eventPath.push(cur);
            if (l) {
              dest.push(i);
            }
          }
        }
      }
      return eventPath;
    }
    /**
     * @param {string} obj
     * @param {string} scope
     * @param {?} callback
     * @param {Object} handler
     * @param {Object} fn
     * @param {string} options
     * @return {?}
     */
    function bind(obj, scope, callback, handler, fn, options) {
      return handler && (!handler[expando] && (handler = bind(handler))), fn && (!fn[expando] && (fn = bind(fn, options))), markFunction(function(qualifier, results, context, deepDataAndEvents) {
        var data;
        var i;
        var value;
        var args;
        /** @type {Array} */
        var clone = [];
        /** @type {Array} */
        var list = [];
        var preexisting = results.length;
        var progressValues = qualifier || function(dest, values, extra) {
          /** @type {number} */
          var i = 0;
          var valuesLen = values.length;
          for (;i < valuesLen;i++) {
            $(dest, values[i], extra);
          }
          return extra;
        }(scope || "*", context.nodeType ? [context] : context, []);
        var result = !obj || !qualifier && scope ? progressValues : MAP(progressValues, clone, obj, context, deepDataAndEvents);
        if (callback ? callback(result, args = fn || (qualifier ? obj : preexisting || handler) ? [] : results, context, deepDataAndEvents) : args = result, handler) {
          data = MAP(args, list);
          handler(data, [], context, deepDataAndEvents);
          i = data.length;
          for (;i--;) {
            if (value = data[i]) {
              /** @type {boolean} */
              args[list[i]] = !(result[list[i]] = value);
            }
          }
        }
        if (qualifier) {
          if (fn || obj) {
            if (fn) {
              /** @type {Array} */
              data = [];
              i = args.length;
              for (;i--;) {
                if (value = args[i]) {
                  data.push(result[i] = value);
                }
              }
              fn(null, args = [], data, deepDataAndEvents);
            }
            /** @type {number} */
            i = args.length;
            for (;i--;) {
              if (value = args[i]) {
                if (-1 < (data = fn ? core_indexOf.call(qualifier, value) : clone[i])) {
                  /** @type {boolean} */
                  qualifier[data] = !(results[data] = value);
                }
              }
            }
          }
        } else {
          args = MAP(args === results ? args.splice(preexisting, args.length) : args);
          if (fn) {
            fn(null, results, args, deepDataAndEvents);
          } else {
            push.apply(results, args);
          }
        }
      });
    }
    /**
     * @param {Object} tokens
     * @return {?}
     */
    function matcherFromTokens(tokens) {
      var qualifier;
      var num;
      var j;
      var len = tokens.length;
      var leadingRelative = Expr.relative[tokens[0].type];
      var implicitRelative = leadingRelative || Expr.relative[" "];
      /** @type {number} */
      var i = leadingRelative ? 1 : 0;
      var matchContext = next(function(elem) {
        return elem === qualifier;
      }, implicitRelative, true);
      var matchAnyContext = next(function(elem) {
        return-1 < core_indexOf.call(qualifier, elem);
      }, implicitRelative, true);
      /** @type {Array} */
      var data = [function(elem, context, xml) {
        var r = !leadingRelative && (xml || context != queuedFn) || ((qualifier = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        return qualifier = null, r;
      }];
      for (;i < len;i++) {
        if (num = Expr.relative[tokens[i].type]) {
          /** @type {Array} */
          data = [next(elementMatcher(data), num)];
        } else {
          if ((num = Expr.filter[tokens[i].type].apply(null, tokens[i].matches))[expando]) {
            /** @type {number} */
            j = ++i;
            for (;j < len;j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return bind(1 < i && elementMatcher(data), 1 < i && toSelector(tokens.slice(0, i - 1).concat({
              value : " " === tokens[i - 2].type ? "*" : ""
            })).replace(rtrim, "$1"), num, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          data.push(num);
        }
      }
      return elementMatcher(data);
    }
    /**
     * @param {string} selector
     * @param {Array} group
     * @return {?}
     */
    function compile(selector, group) {
      var i;
      var res;
      var data;
      var bySet;
      var getDelegate;
      var superMatcher;
      /** @type {Array} */
      var tmp = [];
      /** @type {Array} */
      var ret = [];
      var cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        for (;i--;) {
          if ((cached = matcherFromTokens(group[i]))[expando]) {
            tmp.push(cached);
          } else {
            ret.push(cached);
          }
        }
        /** @type {string} */
        (cached = compilerCache(selector, (res = ret, bySet = 0 < (data = tmp).length, getDelegate = 0 < res.length, superMatcher = function(opt_values, message, collection, results, event) {
          var value;
          var j;
          var callback;
          /** @type {number} */
          var matchedCount = 0;
          /** @type {string} */
          var i = "0";
          var bucket = opt_values && [];
          /** @type {Array} */
          var args = [];
          var fn = queuedFn;
          var values = opt_values || getDelegate && Expr.find.TAG("*", event);
          var dirrunsUnique = dirruns += null == fn ? 1 : Math.random() || 0.1;
          var len = values.length;
          if (event) {
            queuedFn = message == doc || (message || event);
          }
          for (;i !== len && null != (value = values[i]);i++) {
            if (getDelegate && value) {
              /** @type {number} */
              j = 0;
              if (!message) {
                if (!(value.ownerDocument == doc)) {
                  Sizzle(value);
                  /** @type {boolean} */
                  collection = !documentIsHTML;
                }
              }
              for (;callback = res[j++];) {
                if (callback(value, message || doc, collection)) {
                  push.call(results, value);
                  break;
                }
              }
              if (event) {
                dirruns = dirrunsUnique;
              }
            }
            if (bySet) {
              if (value = !callback && value) {
                matchedCount--;
              }
              if (opt_values) {
                bucket.push(value);
              }
            }
          }
          if (matchedCount += i, bySet && i !== matchedCount) {
            /** @type {number} */
            j = 0;
            for (;callback = data[j++];) {
              callback(bucket, args, message, collection);
            }
            if (opt_values) {
              if (0 < matchedCount) {
                for (;i--;) {
                  if (!bucket[i]) {
                    if (!args[i]) {
                      args[i] = h.call(results);
                    }
                  }
                }
              }
              args = MAP(args);
            }
            push.apply(results, args);
            if (event) {
              if (!opt_values) {
                if (0 < args.length) {
                  if (1 < matchedCount + data.length) {
                    jQuery.uniqueSort(results);
                  }
                }
              }
            }
          }
          return event && (dirruns = dirrunsUnique, queuedFn = fn), bucket;
        }, bySet ? markFunction(superMatcher) : superMatcher))).selector = selector;
      }
      return cached;
    }
    /**
     * @param {Object} selector
     * @param {Object} node
     * @param {Array} results
     * @param {Object} seed
     * @return {?}
     */
    function select(selector, node, results, seed) {
      var i;
      var tokens;
      var token;
      var type;
      var callback;
      /** @type {(Function|boolean)} */
      var compiled = "function" == typeof selector && selector;
      var name = !seed && tokenize(selector = compiled.selector || selector);
      if (results = results || [], 1 === name.length) {
        if (2 < (tokens = name[0] = name[0].slice(0)).length && ("ID" === (token = tokens[0]).type && (9 === node.nodeType && (documentIsHTML && Expr.relative[tokens[1].type])))) {
          if (!(node = (Expr.find.ID(token.matches[0].replace(regexp, funescape), node) || [])[0])) {
            return results;
          }
          if (compiled) {
            node = node.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        for (;i--;) {
          if (token = tokens[i], Expr.relative[type = token.type]) {
            break;
          }
          if ((callback = Expr.find[type]) && (seed = callback(token.matches[0].replace(regexp, funescape), splittable.test(tokens[0].type) && find(node.parentNode) || node))) {
            if (tokens.splice(i, 1), !(selector = seed.length && toSelector(tokens))) {
              return push.apply(results, seed), results;
            }
            break;
          }
        }
      }
      return(compiled || compile(selector, name))(seed, node, !documentIsHTML, results, !node || (splittable.test(selector) && find(node.parentNode) || node)), results;
    }
    var i;
    var Expr;
    var queuedFn;
    var qualifier;
    var stability;
    var doc;
    var el;
    var documentIsHTML;
    var rbuggyQSA;
    var matches;
    var push = func;
    var expando = jQuery.expando;
    /** @type {number} */
    var dirruns = 0;
    /** @type {number} */
    var n = 0;
    var classCache = createCache();
    var tokenCache = createCache();
    var compilerCache = createCache();
    var isA = createCache();
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    var sortOrder = function(a, b) {
      return a === b && (stability = true), 0;
    };
    /** @type {string} */
    var f = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
    /** @type {string} */
    var ele = "(?:\\\\[\\da-fA-F]{1,6}" + param + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+";
    /** @type {string} */
    var attributes = "\\[" + param + "*(" + ele + ")(?:" + param + "*([*^$|!~]?=)" + param + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ele + "))|)" + param + "*\\]";
    /** @type {string} */
    var regexString = ":(" + ele + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)";
    /** @type {RegExp} */
    var rclass = new RegExp(param + "+", "g");
    /** @type {RegExp} */
    var rcomma = new RegExp("^" + param + "*," + param + "*");
    /** @type {RegExp} */
    var rsibling = new RegExp("^" + param + "*([>+~]|" + param + ")" + param + "*");
    /** @type {RegExp} */
    var RE_SIMPLE_SELECTOR = new RegExp(param + "|>");
    /** @type {RegExp} */
    var regex = new RegExp(regexString);
    /** @type {RegExp} */
    var ridentifier = new RegExp("^" + ele + "$");
    var matchExpr = {
      ID : new RegExp("^#(" + ele + ")"),
      CLASS : new RegExp("^\\.(" + ele + ")"),
      TAG : new RegExp("^(" + ele + "|[*])"),
      ATTR : new RegExp("^" + attributes),
      PSEUDO : new RegExp("^" + regexString),
      CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + param + "*(even|odd|(([+-]|)(\\d*)n|)" + param + "*(?:([+-]|)" + param + "*(\\d+)|))" + param + "*\\)|)", "i"),
      bool : new RegExp("^(?:" + f + ")$", "i"),
      needsContext : new RegExp("^" + param + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + param + "*((?:-\\d)?\\d*)" + param + "*\\)|)(?=[^-]|$)", "i")
    };
    /** @type {RegExp} */
    var rinputs = /^(?:input|select|textarea|button)$/i;
    /** @type {RegExp} */
    var rheader = /^h\d$/i;
    /** @type {RegExp} */
    var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    /** @type {RegExp} */
    var splittable = /[+~]/;
    /** @type {RegExp} */
    var regexp = new RegExp("\\\\[\\da-fA-F]{1,6}" + param + "?|\\\\([^\\r\\n\\f])", "g");
    /**
     * @param {Object} _
     * @param {string} escaped
     * @return {?}
     */
    var funescape = function(_, escaped) {
      /** @type {number} */
      var zeroCode = "0x" + _.slice(1) - 65536;
      return escaped || (zeroCode < 0 ? String.fromCharCode(zeroCode + 65536) : String.fromCharCode(zeroCode >> 10 | 55296, 1023 & zeroCode | 56320));
    };
    /**
     * @return {undefined}
     */
    var scrolling = function() {
      Sizzle();
    };
    var getter = next(function(exports) {
      return true === exports.disabled && callback(exports, "fieldset");
    }, {
      dir : "parentNode",
      next : "legend"
    });
    try {
      push.apply(arr = slice.call(container.childNodes), container.childNodes);
      arr[container.childNodes.length].nodeType;
    } catch (e) {
      push = {
        /**
         * @param {?} target
         * @param {Object} array
         * @return {undefined}
         */
        apply : function(target, array) {
          func.apply(target, slice.call(array));
        },
        /**
         * @param {Object} obj
         * @return {undefined}
         */
        call : function(obj) {
          func.apply(obj, slice.call(arguments, 1));
        }
      };
    }
    for (i in $.matches = function(expr, deepDataAndEvents) {
      return $(expr, null, null, deepDataAndEvents);
    }, $.matchesSelector = function(elem, expr) {
      if (Sizzle(elem), documentIsHTML && (!isA[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr)))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || (support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType)) {
            return ret;
          }
        } catch (e) {
          isA(expr, true);
        }
      }
      return 0 < $(expr, doc, null, [elem]).length;
    }, $.contains = function(context, b) {
      return(context.ownerDocument || context) != doc && Sizzle(context), jQuery.contains(context, b);
    }, $.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) != doc) {
        Sizzle(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()];
      var r = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      return void 0 !== r ? r : elem.getAttribute(name);
    }, $.error = function(str) {
      throw new Error("Syntax error, unrecognized expression: " + str);
    }, jQuery.uniqueSort = function(results) {
      var elem;
      /** @type {Array} */
      var hash = [];
      /** @type {number} */
      var key = 0;
      /** @type {number} */
      var i = 0;
      if (stability = !support.sortStable, qualifier = !support.sortStable && slice.call(results, 0), pop.call(results, sortOrder), stability) {
        for (;elem = results[i++];) {
          if (elem === results[i]) {
            /** @type {number} */
            key = hash.push(i);
          }
        }
        for (;key--;) {
          f.call(results, hash[key], 1);
        }
      }
      return qualifier = null, results;
    }, jQuery.fn.uniqueSort = function() {
      return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
    }, (Expr = jQuery.expr = {
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
          return match[1] = match[1].replace(regexp, funescape), match[3] = (match[3] || (match[4] || (match[5] || ""))).replace(regexp, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
        },
        /**
         * @param {Array} match
         * @return {?}
         */
        CHILD : function(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || $.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && $.error(match[0]), match;
        },
        /**
         * @param {Array} match
         * @return {?}
         */
        PSEUDO : function(match) {
          var excess;
          var unquoted = !match[6] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || (match[5] || "") : unquoted && (regex.test(unquoted) && ((excess = tokenize(unquoted, true)) && ((excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess))))), match.slice(0, 3));
        }
      },
      filter : {
        /**
         * @param {string} match
         * @return {?}
         */
        TAG : function(match) {
          var pkgs = match.replace(regexp, funescape).toLowerCase();
          return "*" === match ? function() {
            return true;
          } : function(exports) {
            return callback(exports, pkgs);
          };
        },
        /**
         * @param {string} className
         * @return {?}
         */
        CLASS : function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + param + ")" + className + "(" + param + "|$)")) && classCache(className, function(elem) {
            return pattern.test("string" == typeof elem.className && elem.className || ("undefined" != typeof elem.getAttribute && elem.getAttribute("class") || ""));
          });
        },
        /**
         * @param {string} name
         * @param {string} not
         * @param {string} b
         * @return {?}
         */
        ATTR : function(name, not, b) {
          return function(elem) {
            var a = $.attr(elem, name);
            return null == a ? "!=" === not : !not || (a += "", "=" === not ? a === b : "!=" === not ? a !== b : "^=" === not ? b && 0 === a.indexOf(b) : "*=" === not ? b && -1 < a.indexOf(b) : "$=" === not ? b && a.slice(-b.length) === b : "~=" === not ? -1 < (" " + a.replace(rclass, " ") + " ").indexOf(b) : "|=" === not && (a === b || a.slice(0, b.length + 1) === b + "-"));
          };
        },
        /**
         * @param {string} type
         * @param {string} argument
         * @param {?} dataAndEvents
         * @param {boolean} first
         * @param {number} last
         * @return {?}
         */
        CHILD : function(type, argument, dataAndEvents, first, last) {
          /** @type {boolean} */
          var simple = "nth" !== type.slice(0, 3);
          /** @type {boolean} */
          var forward = "last" !== type.slice(-4);
          /** @type {boolean} */
          var err = "of-type" === argument;
          return 1 === first && 0 === last ? function(contestant) {
            return!!contestant.parentNode;
          } : function(node, dataAndEvents, silent) {
            var cache;
            var outerCache;
            var elem;
            var nodeIndex;
            var start;
            /** @type {string} */
            var dir = simple !== forward ? "nextSibling" : "previousSibling";
            var parent = node.parentNode;
            var pkgs = err && node.nodeName.toLowerCase();
            /** @type {boolean} */
            var useCache = !silent && !err;
            /** @type {boolean} */
            var diff = false;
            if (parent) {
              if (simple) {
                for (;dir;) {
                  /** @type {Node} */
                  elem = node;
                  for (;elem = elem[dir];) {
                    if (err ? callback(elem, pkgs) : 1 === elem.nodeType) {
                      return false;
                    }
                  }
                  /** @type {(boolean|string)} */
                  start = dir = "only" === type && (!start && "nextSibling");
                }
                return true;
              }
              if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                diff = (nodeIndex = (cache = (outerCache = parent[expando] || (parent[expando] = {}))[type] || [])[0] === dirruns && cache[1]) && cache[2];
                elem = nodeIndex && parent.childNodes[nodeIndex];
                for (;elem = ++nodeIndex && (elem && elem[dir]) || ((diff = nodeIndex = 0) || start.pop());) {
                  if (1 === elem.nodeType && (++diff && elem === node)) {
                    /** @type {Array} */
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache && (diff = nodeIndex = (cache = (outerCache = node[expando] || (node[expando] = {}))[type] || [])[0] === dirruns && cache[1]), false === diff) {
                  for (;elem = ++nodeIndex && (elem && elem[dir]) || ((diff = nodeIndex = 0) || start.pop());) {
                    if ((err ? callback(elem, pkgs) : 1 === elem.nodeType) && (++diff && (useCache && ((outerCache = elem[expando] || (elem[expando] = {}))[type] = [dirruns, diff]), elem === node))) {
                      break;
                    }
                  }
                }
              }
              return(diff -= last) === first || diff % first == 0 && 0 <= diff / first;
            }
          };
        },
        /**
         * @param {string} pseudo
         * @param {?} argument
         * @return {?}
         */
        PSEUDO : function(pseudo, argument) {
          var args;
          var fn = Expr.pseudos[pseudo] || (Expr.setFilters[pseudo.toLowerCase()] || $.error("unsupported pseudo: " + pseudo));
          return fn[expando] ? fn(argument) : 1 < fn.length ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(arr, old) {
            var i;
            var object = fn(arr, argument);
            var name = object.length;
            for (;name--;) {
              /** @type {boolean} */
              arr[i = core_indexOf.call(arr, object[name])] = !(old[i] = object[name]);
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
        has : markFunction(function(sel) {
          return function(elem) {
            return 0 < $(sel, elem).length;
          };
        }),
        contains : markFunction(function(str) {
          return str = str.replace(regexp, funescape), function(node) {
            return-1 < (node.textContent || jQuery.text(node)).indexOf(str);
          };
        }),
        lang : markFunction(function(lang) {
          return ridentifier.test(lang || "") || $.error("unsupported lang: " + lang), lang = lang.replace(regexp, funescape).toLowerCase(), function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                return(elemLang = elemLang.toLowerCase()) === lang || 0 === elemLang.indexOf(lang + "-");
              }
            } while ((elem = elem.parentNode) && 1 === elem.nodeType);
            return false;
          };
        }),
        /**
         * @param {Object} a
         * @return {?}
         */
        target : function(a) {
          var models = win.location && win.location.hash;
          return models && models.slice(1) === a.id;
        },
        /**
         * @param {number} cur
         * @return {?}
         */
        root : function(cur) {
          return cur === el;
        },
        /**
         * @param {Element} elem
         * @return {?}
         */
        focus : function(elem) {
          return elem === function() {
            try {
              return doc.activeElement;
            } catch (e) {
            }
          }() && (doc.hasFocus() && !!(elem.type || (elem.href || ~elem.tabIndex)));
        },
        enabled : init(false),
        disabled : init(true),
        /**
         * @param {Object} config
         * @return {?}
         */
        checked : function(config) {
          return callback(config, "input") && !!config.checked || callback(config, "option") && !!config.selected;
        },
        /**
         * @param {Node} elem
         * @return {?}
         */
        selected : function(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, true === elem.selected;
        },
        /**
         * @param {Node} elem
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
         * @param {Node} elem
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
         * @param {Object} elem
         * @return {?}
         */
        button : function(elem) {
          return callback(elem, "input") && "button" === elem.type || callback(elem, "button");
        },
        /**
         * @param {Object} elem
         * @return {?}
         */
        text : function(elem) {
          var evt;
          return callback(elem, "input") && ("text" === elem.type && (null == (evt = elem.getAttribute("type")) || "text" === evt.toLowerCase()));
        },
        first : createPositionalPseudo(function() {
          return[0];
        }),
        last : createPositionalPseudo(function(dataAndEvents, deepDataAndEvents) {
          return[deepDataAndEvents - 1];
        }),
        eq : createPositionalPseudo(function(dataAndEvents, length, argument) {
          return[argument < 0 ? argument + length : argument];
        }),
        even : createPositionalPseudo(function(assigns, dataAndEvents) {
          /** @type {number} */
          var vvar = 0;
          for (;vvar < dataAndEvents;vvar += 2) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        odd : createPositionalPseudo(function(assigns, dataAndEvents) {
          /** @type {number} */
          var vvar = 1;
          for (;vvar < dataAndEvents;vvar += 2) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        lt : createPositionalPseudo(function(assigns, max, n) {
          var vvar;
          vvar = n < 0 ? n + max : max < n ? max : n;
          for (;0 <= --vvar;) {
            assigns.push(vvar);
          }
          return assigns;
        }),
        gt : createPositionalPseudo(function(assigns, length, argument) {
          var vvar = argument < 0 ? argument + length : argument;
          for (;++vvar < length;) {
            assigns.push(vvar);
          }
          return assigns;
        })
      }
    }).pseudos.nth = Expr.pseudos.eq, {
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
    /** @type {boolean} */
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    Sizzle();
    support.sortDetached = assert(function(a) {
      return 1 & a.compareDocumentPosition(doc.createElement("fieldset"));
    });
    /** @type {function (string, Function, Object, ?): ?} */
    jQuery.find = $;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    /** @type {function (Object): ?} */
    jQuery.unique = jQuery.uniqueSort;
    /** @type {function (string, Array): ?} */
    $.compile = compile;
    /** @type {function (Object, Object, Array, Object): ?} */
    $.select = select;
    /** @type {function (Function): ?} */
    $.setDocument = Sizzle;
    /** @type {function (string, boolean): ?} */
    $.tokenize = tokenize;
    /** @type {function ((number|string)): ?} */
    $.escape = jQuery.escapeSelector;
    $.getText = jQuery.text;
    $.isXML = jQuery.isXMLDoc;
    $.selectors = jQuery.expr;
    $.support = jQuery.support;
    /** @type {function (Object): ?} */
    $.uniqueSort = jQuery.uniqueSort;
  }();
  /**
   * @param {Object} elem
   * @param {string} dir
   * @param {string} until
   * @return {?}
   */
  var dir = function(elem, dir, until) {
    /** @type {Array} */
    var matched = [];
    /** @type {boolean} */
    var truncate = void 0 !== until;
    for (;(elem = elem[dir]) && 9 !== elem.nodeType;) {
      if (1 === elem.nodeType) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  /**
   * @param {Node} n
   * @param {Node} elem
   * @return {?}
   */
  var sibling = function(n, elem) {
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
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  /** @type {RegExp} */
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  /**
   * @param {string} expr
   * @param {string} elems
   * @param {boolean} not
   * @return {?}
   */
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(dest) {
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
      var ret;
      var l = this.length;
      var self = this;
      if ("string" != typeof selector) {
        return this.pushStack(jQuery(selector).filter(function() {
          /** @type {number} */
          i = 0;
          for (;i < l;i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      ret = this.pushStack([]);
      /** @type {number} */
      i = 0;
      for (;i < l;i++) {
        jQuery.find(selector, self[i], ret);
      }
      return 1 < l ? jQuery.uniqueSort(ret) : ret;
    },
    /**
     * @param {Function} selector
     * @return {?}
     */
    filter : function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
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
  var object;
  /** @type {RegExp} */
  var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (jQuery.fn.init = function(selector, context, rootjQuery) {
    var match;
    var length;
    if (!selector) {
      return this;
    }
    if (rootjQuery = rootjQuery || object, "string" == typeof selector) {
      if (!(match = "<" === selector[0] && (">" === selector[selector.length - 1] && 3 <= selector.length) ? [null, selector, null] : rquickExpr.exec(selector)) || !match[1] && context) {
        return!context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
      }
      if (match[1]) {
        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : doc, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
          for (match in context) {
            if (isFunction(this[match])) {
              this[match](context[match]);
            } else {
              this.attr(match, context[match]);
            }
          }
        }
        return this;
      }
      return(length = doc.getElementById(match[2])) && (this[0] = length, this.length = 1), this;
    }
    return selector.nodeType ? (this[0] = selector, this.length = 1, this) : isFunction(selector) ? void 0 !== rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : jQuery.makeArray(selector, this);
  }).prototype = jQuery.fn;
  object = jQuery(doc);
  /** @type {RegExp} */
  var rparentsprev = /^(?:parents|prev(?:Until|All))/;
  var guaranteedUnique = {
    children : true,
    contents : true,
    next : true,
    prev : true
  };
  jQuery.fn.extend({
    /**
     * @param {string} target
     * @return {?}
     */
    has : function(target) {
      var targets = jQuery(target, this);
      var l = targets.length;
      return this.filter(function() {
        /** @type {number} */
        var i = 0;
        for (;i < l;i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    /**
     * @param {string} selectors
     * @param {string} context
     * @return {?}
     */
    closest : function(selectors, context) {
      var cur;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      /** @type {Array} */
      var matched = [];
      var pos = "string" != typeof selectors && jQuery(selectors);
      if (!rneedsContext.test(selectors)) {
        for (;i < l;i++) {
          cur = this[i];
          for (;cur && cur !== context;cur = cur.parentNode) {
            if (cur.nodeType < 11 && (pos ? -1 < pos.index(cur) : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }
      return this.pushStack(1 < matched.length ? jQuery.uniqueSort(matched) : matched);
    },
    /**
     * @param {string} elem
     * @return {?}
     */
    index : function(elem) {
      return elem ? "string" == typeof elem ? core_indexOf.call(jQuery(elem), this[0]) : core_indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    /**
     * @param {Object} selector
     * @param {?} context
     * @return {?}
     */
    add : function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    /**
     * @param {Object} selector
     * @return {?}
     */
    addBack : function(selector) {
      return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
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
     * @param {Object} elem
     * @return {?}
     */
    parents : function(elem) {
      return dir(elem, "parentNode");
    },
    /**
     * @param {Object} elem
     * @param {?} i
     * @param {string} until
     * @return {?}
     */
    parentsUntil : function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    next : function(elem) {
      return _singleSibling(elem, "nextSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    prev : function(elem) {
      return _singleSibling(elem, "previousSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    nextAll : function(elem) {
      return dir(elem, "nextSibling");
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    prevAll : function(elem) {
      return dir(elem, "previousSibling");
    },
    /**
     * @param {Object} elem
     * @param {?} i
     * @param {string} until
     * @return {?}
     */
    nextUntil : function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    /**
     * @param {Object} elem
     * @param {?} i
     * @param {string} until
     * @return {?}
     */
    prevUntil : function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    /**
     * @param {Node} elem
     * @return {?}
     */
    siblings : function(elem) {
      return sibling((elem.parentNode || {}).firstChild, elem);
    },
    /**
     * @param {Element} node
     * @return {?}
     */
    children : function(node) {
      return sibling(node.firstChild);
    },
    /**
     * @param {Object} elem
     * @return {?}
     */
    contents : function(elem) {
      return null != elem.contentDocument && getPrototypeOf(elem.contentDocument) ? elem.contentDocument : (callback(elem, "template") && (elem = elem.content || elem), jQuery.merge([], elem.childNodes));
    }
  }, function(name, fn) {
    /**
     * @param {?} until
     * @param {?} selector
     * @return {?}
     */
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      return "Until" !== name.slice(-5) && (selector = until), selector && ("string" == typeof selector && (matched = jQuery.filter(selector, matched))), 1 < this.length && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched);
    };
  });
  /** @type {RegExp} */
  var core_rnotwhite = /[^\x20\t\r\n\f]+/g;
  /**
   * @param {(number|string)} options
   * @return {?}
   */
  jQuery.Callbacks = function(options) {
    var value;
    var buf;
    options = "string" == typeof options ? (value = options, buf = {}, jQuery.each(value.match(core_rnotwhite) || [], function(dataAndEvents, off) {
      /** @type {boolean} */
      buf[off] = true;
    }), buf) : jQuery.extend({}, options);
    var memory;
    var data;
    var stack;
    var port;
    /** @type {Array} */
    var list = [];
    /** @type {Array} */
    var messages = [];
    /** @type {number} */
    var count = -1;
    /**
     * @return {undefined}
     */
    var fire = function() {
      port = port || options.once;
      /** @type {boolean} */
      stack = memory = true;
      for (;messages.length;count = -1) {
        data = messages.shift();
        for (;++count < list.length;) {
          if (false === list[count].apply(data[0], data[1])) {
            if (options.stopOnFalse) {
              count = list.length;
              /** @type {boolean} */
              data = false;
            }
          }
        }
      }
      if (!options.memory) {
        /** @type {boolean} */
        data = false;
      }
      /** @type {boolean} */
      memory = false;
      if (port) {
        /** @type {(Array|string)} */
        list = data ? [] : "";
      }
    };
    var self = {
      /**
       * @return {?}
       */
      add : function() {
        return list && (data && (!memory && (count = list.length - 1, messages.push(data))), function add(args) {
          jQuery.each(args, function(dataAndEvents, arg) {
            if (isFunction(arg)) {
              if (!(options.unique && self.has(arg))) {
                list.push(arg);
              }
            } else {
              if (arg) {
                if (arg.length) {
                  if ("string" !== type(arg)) {
                    add(arg);
                  }
                }
              }
            }
          });
        }(arguments), data && (!memory && fire())), this;
      },
      /**
       * @return {?}
       */
      remove : function() {
        return jQuery.each(arguments, function(dataAndEvents, arg) {
          var index;
          for (;-1 < (index = jQuery.inArray(arg, list, index));) {
            list.splice(index, 1);
            if (index <= count) {
              count--;
            }
          }
        }), this;
      },
      /**
       * @param {string} fn
       * @return {?}
       */
      has : function(fn) {
        return fn ? -1 < jQuery.inArray(fn, list) : 0 < list.length;
      },
      /**
       * @return {?}
       */
      empty : function() {
        return list && (list = []), this;
      },
      /**
       * @return {?}
       */
      disable : function() {
        return port = messages = [], list = data = "", this;
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
        return port = messages = [], data || (memory || (list = data = "")), this;
      },
      /**
       * @return {?}
       */
      locked : function() {
        return!!port;
      },
      /**
       * @param {?} context
       * @param {Array} args
       * @return {?}
       */
      fireWith : function(context, args) {
        return port || (args = [context, (args = args || []).slice ? args.slice() : args], messages.push(args), memory || fire()), this;
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
        return!!stack;
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
      var which = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]];
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
         * @param {Object} onRejected
         * @return {?}
         */
        "catch" : function(onRejected) {
          return promise.then(null, onRejected);
        },
        /**
         * @return {?}
         */
        pipe : function() {
          /** @type {Arguments} */
          var args = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(which, function(dataAndEvents, tuple) {
              var fn = isFunction(args[tuple[4]]) && args[tuple[4]];
              deferred[tuple[1]](function() {
                var value = fn && fn.apply(this, arguments);
                if (value && isFunction(value.promise)) {
                  value.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](this, fn ? [value] : arguments);
                }
              });
            });
            /** @type {null} */
            args = null;
          }).promise();
        },
        /**
         * @param {Function} value
         * @param {Function} onFulfilled
         * @param {Function} selector
         * @return {?}
         */
        then : function(value, onFulfilled, selector) {
          /**
           * @param {number} y
           * @param {?} item
           * @param {Function} event
           * @param {boolean} name
           * @return {?}
           */
          function fn(y, item, event, name) {
            return function() {
              var self = this;
              /** @type {Arguments} */
              var args = arguments;
              /**
               * @return {undefined}
               */
              var error = function() {
                var a;
                var val;
                if (!(y < i)) {
                  if ((a = event.apply(self, args)) === item.promise()) {
                    throw new TypeError("Thenable self-resolution");
                  }
                  val = a && (("object" == typeof a || "function" == typeof a) && a.then);
                  if (isFunction(val)) {
                    if (name) {
                      val.call(a, fn(i, item, index, name), fn(i, item, data, name));
                    } else {
                      i++;
                      val.call(a, fn(i, item, index, name), fn(i, item, data, name), fn(i, item, index, item.notifyWith));
                    }
                  } else {
                    if (event !== index) {
                      self = void 0;
                      /** @type {Array} */
                      args = [a];
                    }
                    (name || item.resolveWith)(self, args);
                  }
                }
              };
              /** @type {function (): undefined} */
              var fn = name ? error : function() {
                try {
                  error();
                } catch (context) {
                  if (jQuery.Deferred.exceptionHook) {
                    jQuery.Deferred.exceptionHook(context, fn.error);
                  }
                  if (i <= y + 1) {
                    if (event !== data) {
                      self = void 0;
                      /** @type {Array} */
                      args = [context];
                    }
                    item.rejectWith(self, args);
                  }
                }
              };
              if (y) {
                fn();
              } else {
                if (jQuery.Deferred.getErrorHook) {
                  fn.error = jQuery.Deferred.getErrorHook();
                } else {
                  if (jQuery.Deferred.getStackHook) {
                    fn.error = jQuery.Deferred.getStackHook();
                  }
                }
                win.setTimeout(fn);
              }
            };
          }
          /** @type {number} */
          var i = 0;
          return jQuery.Deferred(function(i) {
            which[0][3].add(fn(0, i, isFunction(selector) ? selector : index, i.notifyWith));
            which[1][3].add(fn(0, i, isFunction(value) ? value : index));
            which[2][3].add(fn(0, i, isFunction(onFulfilled) ? onFulfilled : data));
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
      return jQuery.each(which, function(dataAndEvents, tuple) {
        var list = tuple[2];
        var stateString = tuple[5];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, which[3 - dataAndEvents][2].disable, which[3 - dataAndEvents][3].disable, which[0][2].lock, which[0][3].lock);
        }
        list.add(tuple[3].fire);
        /**
         * @return {?}
         */
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    /**
     * @param {?} props
     * @return {?}
     */
    when : function(props) {
      /** @type {number} */
      var len = arguments.length;
      var i = len;
      /** @type {Array} */
      var result = Array(i);
      var args = slice.call(arguments);
      var d = jQuery.Deferred();
      /**
       * @param {number} i
       * @return {?}
       */
      var updateFunc = function(i) {
        return function(value) {
          result[i] = this;
          args[i] = 1 < arguments.length ? slice.call(arguments) : value;
          if (!--len) {
            d.resolveWith(result, args);
          }
        };
      };
      if (len <= 1 && (require(props, d.done(updateFunc(i)).resolve, d.reject, !len), "pending" === d.state() || isFunction(args[i] && args[i].then))) {
        return d.then();
      }
      for (;i--;) {
        require(args[i], updateFunc(i), d.reject);
      }
      return d.promise();
    }
  });
  /** @type {RegExp} */
  var rinlinejQuery = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  /**
   * @param {(Error|string)} e
   * @param {?} err
   * @return {undefined}
   */
  jQuery.Deferred.exceptionHook = function(e, err) {
    if (win.console) {
      if (win.console.warn) {
        if (e) {
          if (rinlinejQuery.test(e.name)) {
            win.console.warn("jQuery.Deferred exception: " + e.message, e.stack, err);
          }
        }
      }
    }
  };
  /**
   * @param {?} dataAndEvents
   * @return {undefined}
   */
  jQuery.readyException = function(dataAndEvents) {
    win.setTimeout(function() {
      throw dataAndEvents;
    });
  };
  var promise = jQuery.Deferred();
  /**
   * @param {Object} func
   * @return {?}
   */
  jQuery.fn.ready = function(func) {
    return promise.then(func)["catch"](function(node) {
      jQuery.readyException(node);
    }), this;
  };
  jQuery.extend({
    isReady : false,
    readyWait : 1,
    /**
     * @param {boolean} wait
     * @return {undefined}
     */
    ready : function(wait) {
      if (!(true === wait ? --jQuery.readyWait : jQuery.isReady)) {
        if (!((jQuery.isReady = true) !== wait && 0 < --jQuery.readyWait)) {
          promise.resolveWith(doc, [jQuery]);
        }
      }
    }
  });
  jQuery.ready.then = promise.then;
  if ("complete" === doc.readyState || "loading" !== doc.readyState && !doc.documentElement.doScroll) {
    win.setTimeout(jQuery.ready);
  } else {
    doc.addEventListener("DOMContentLoaded", completed);
    win.addEventListener("load", completed);
  }
  /**
   * @param {Object} elems
   * @param {Function} fn
   * @param {Object} key
   * @param {Function} value
   * @param {boolean} chainable
   * @param {string} emptyGet
   * @param {boolean} raw
   * @return {?}
   */
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    /** @type {number} */
    var i = 0;
    var length = elems.length;
    /** @type {boolean} */
    var bulk = null == key;
    if ("object" === type(key)) {
      for (i in chainable = true, key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else {
      if (void 0 !== value && (chainable = true, isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, event, value) {
        return bulk.call(jQuery(elem), value);
      })), fn)) {
        for (;i < length;i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
  };
  /** @type {RegExp} */
  var rmsPrefix = /^-ms-/;
  /** @type {RegExp} */
  var newlineRe = /-([a-z])/g;
  /**
   * @param {Object} elem
   * @return {?}
   */
  var $ = function(elem) {
    return 1 === elem.nodeType || (9 === elem.nodeType || !+elem.nodeType);
  };
  /** @type {number} */
  Data.uid = 1;
  Data.prototype = {
    /**
     * @param {Object} owner
     * @return {?}
     */
    cache : function(owner) {
      var unlock = owner[this.expando];
      return unlock || (unlock = {}, $(owner) && (owner.nodeType ? owner[this.expando] = unlock : Object.defineProperty(owner, this.expando, {
        value : unlock,
        configurable : true
      }))), unlock;
    },
    /**
     * @param {Object} owner
     * @param {string} data
     * @param {Object} value
     * @return {?}
     */
    set : function(owner, data, value) {
      var prop;
      var cache = this.cache(owner);
      if ("string" == typeof data) {
        /** @type {Object} */
        cache[camelCase(data)] = value;
      } else {
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    /**
     * @param {Object} owner
     * @param {string} value
     * @return {?}
     */
    get : function(owner, value) {
      return void 0 === value ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(value)];
    },
    /**
     * @param {Object} owner
     * @param {string} key
     * @param {boolean} value
     * @return {?}
     */
    access : function(owner, key, value) {
      return void 0 === key || key && ("string" == typeof key && void 0 === value) ? this.get(owner, key) : (this.set(owner, key, value), void 0 !== value ? value : key);
    },
    /**
     * @param {Object} owner
     * @param {Object} key
     * @return {undefined}
     */
    remove : function(owner, key) {
      var i;
      var cache = owner[this.expando];
      if (void 0 !== cache) {
        if (void 0 !== key) {
          i = (key = Array.isArray(key) ? key.map(camelCase) : (key = camelCase(key)) in cache ? [key] : key.match(core_rnotwhite) || []).length;
          for (;i--;) {
            delete cache[key[i]];
          }
        }
        if (void 0 === key || jQuery.isEmptyObject(cache)) {
          if (owner.nodeType) {
            owner[this.expando] = void 0;
          } else {
            delete owner[this.expando];
          }
        }
      }
    },
    /**
     * @param {Object} owner
     * @return {?}
     */
    hasData : function(owner) {
      var cache = owner[this.expando];
      return void 0 !== cache && !jQuery.isEmptyObject(cache);
    }
  };
  var data_priv = new Data;
  var data_user = new Data;
  /** @type {RegExp} */
  var isint = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  /** @type {RegExp} */
  var r20 = /[A-Z]/g;
  jQuery.extend({
    /**
     * @param {Object} elem
     * @return {?}
     */
    hasData : function(elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    /**
     * @param {string} elem
     * @param {string} name
     * @param {boolean} data
     * @return {?}
     */
    data : function(elem, name, data) {
      return data_user.access(elem, name, data);
    },
    /**
     * @param {Object} elem
     * @param {Object} name
     * @return {undefined}
     */
    removeData : function(elem, name) {
      data_user.remove(elem, name);
    },
    /**
     * @param {Object} src
     * @param {string} name
     * @param {boolean} data
     * @return {?}
     */
    _data : function(src, name, data) {
      return data_priv.access(src, name, data);
    },
    /**
     * @param {Object} elem
     * @param {Object} name
     * @return {undefined}
     */
    _removeData : function(elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} key
     * @param {Function} value
     * @return {?}
     */
    data : function(key, value) {
      var len;
      var name;
      var data;
      var elem = this[0];
      var attrs = elem && elem.attributes;
      if (void 0 === key) {
        if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
          len = attrs.length;
          for (;len--;) {
            if (attrs[len]) {
              if (0 === (name = attrs[len].name).indexOf("data-")) {
                name = camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
          }
          data_priv.set(elem, "hasDataAttrs", true);
        }
        return data;
      }
      return "object" == typeof key ? this.each(function() {
        data_user.set(this, key);
      }) : access(this, function(value) {
        var data;
        if (elem && void 0 === value) {
          return void 0 !== (data = data_user.get(elem, key)) ? data : void 0 !== (data = dataAttr(elem, key)) ? data : void 0;
        }
        this.each(function() {
          data_user.set(this, key, value);
        });
      }, null, value, 1 < arguments.length, null, true);
    },
    /**
     * @param {Object} name
     * @return {?}
     */
    removeData : function(name) {
      return this.each(function() {
        data_user.remove(this, name);
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
      if (elem) {
        return type = (type || "fx") + "queue", queue = data_priv.get(elem, type), data && (!queue || Array.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || [];
      }
    },
    /**
     * @param {Object} elem
     * @param {string} type
     * @return {undefined}
     */
    dequeue : function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type);
      var ln = queue.length;
      var matches = queue.shift();
      var hooks = jQuery._queueHooks(elem, type);
      if ("inprogress" === matches) {
        matches = queue.shift();
        ln--;
      }
      if (matches) {
        if ("fx" === type) {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        matches.call(elem, function() {
          jQuery.dequeue(elem, type);
        }, hooks);
      }
      if (!ln) {
        if (hooks) {
          hooks.empty.fire();
        }
      }
    },
    /**
     * @param {Object} elem
     * @param {string} type
     * @return {?}
     */
    _queueHooks : function(elem, type) {
      /** @type {string} */
      var key = type + "queueHooks";
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty : jQuery.Callbacks("once memory").add(function() {
          data_priv.remove(elem, [type + "queue", key]);
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
      var r = 1;
      var defer = jQuery.Deferred();
      var elements = this;
      var i = this.length;
      /**
       * @return {undefined}
       */
      var resolve = function() {
        if (!--r) {
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
        if (body = data_priv.get(elements[i], type + "queueHooks")) {
          if (body.empty) {
            r++;
            body.empty.add(resolve);
          }
        }
      }
      return resolve(), defer.promise(obj);
    }
  });
  /** @type {string} */
  var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  /** @type {RegExp} */
  var regexp = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i");
  /** @type {Array} */
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var docElem = doc.documentElement;
  /**
   * @param {Object} b
   * @return {?}
   */
  var getComputedStyle = function(b) {
    return jQuery.contains(b.ownerDocument, b);
  };
  var bi = {
    composed : true
  };
  if (docElem.getRootNode) {
    /**
     * @param {Object} b
     * @return {?}
     */
    getComputedStyle = function(b) {
      return jQuery.contains(b.ownerDocument, b) || b.getRootNode(bi) === b.ownerDocument;
    };
  }
  /**
   * @param {Object} elem
   * @param {Function} el
   * @return {?}
   */
  var isHidden = function(elem, el) {
    return "none" === (elem = el || elem).style.display || "" === elem.style.display && (getComputedStyle(elem) && "none" === jQuery.css(elem, "display"));
  };
  var elemdisplay = {};
  jQuery.fn.extend({
    /**
     * @return {?}
     */
    show : function() {
      return update(this, true);
    },
    /**
     * @return {?}
     */
    hide : function() {
      return update(this);
    },
    /**
     * @param {?} state
     * @return {?}
     */
    toggle : function(state) {
      return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var form;
  var input;
  /** @type {RegExp} */
  var rfocusable = /^(?:checkbox|radio)$/i;
  /** @type {RegExp} */
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  /** @type {RegExp} */
  var rchecked = /^$|^module$|\/(?:java|ecma)script/i;
  form = doc.createDocumentFragment().appendChild(doc.createElement("div"));
  (input = doc.createElement("input")).setAttribute("type", "radio");
  input.setAttribute("checked", "checked");
  input.setAttribute("name", "t");
  form.appendChild(input);
  support.checkClone = form.cloneNode(true).cloneNode(true).lastChild.checked;
  /** @type {string} */
  form.innerHTML = "<textarea>x</textarea>";
  /** @type {boolean} */
  support.noCloneChecked = !!form.cloneNode(true).lastChild.defaultValue;
  /** @type {string} */
  form.innerHTML = "<option></option>";
  /** @type {boolean} */
  support.option = !!form.lastChild;
  var wrapMap = {
    thead : [1, "<table>", "</table>"],
    col : [2, "<table><colgroup>", "</colgroup></table>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default : [0, "", ""]
  };
  /** @type {Array} */
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  /** @type {Array} */
  wrapMap.th = wrapMap.td;
  if (!support.option) {
    /** @type {Array} */
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }
  /** @type {RegExp} */
  var rhtml = /<|&#?\w+;/;
  /** @type {RegExp} */
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  jQuery.event = {
    global : {},
    /**
     * @param {Object} elem
     * @param {Object} types
     * @param {Function} handler
     * @param {Object} e
     * @param {Object} selector
     * @return {undefined}
     */
    add : function(elem, types, handler, e, selector) {
      var handleObjIn;
      var eventHandle;
      var segmentMatch;
      var events;
      var t;
      var handleObj;
      var special;
      var handlers;
      var type;
      var namespaces;
      var origType;
      var elemData = data_priv.get(elem);
      if ($(elem)) {
        if (handler.handler) {
          handler = (handleObjIn = handler).handler;
          selector = handleObjIn.selector;
        }
        if (selector) {
          jQuery.find.matchesSelector(docElem, selector);
        }
        if (!handler.guid) {
          /** @type {number} */
          handler.guid = jQuery.guid++;
        }
        if (!(events = elemData.events)) {
          /** @type {Object} */
          events = elemData.events = Object.create(null);
        }
        if (!(eventHandle = elemData.handle)) {
          /** @type {function (Event): ?} */
          eventHandle = elemData.handle = function(e) {
            return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
          };
        }
        t = (types = (types || "").match(core_rnotwhite) || [""]).length;
        for (;t--;) {
          type = origType = (segmentMatch = rtypenamespace.exec(types[t]) || [])[1];
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
              /** @type {number} */
              (handlers = events[type] = []).delegateCount = 0;
              if (!(special.setup && false !== special.setup.call(elem, e, namespaces, eventHandle))) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
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
      }
    },
    /**
     * @param {Object} elem
     * @param {Object} types
     * @param {Function} handler
     * @param {Object} selector
     * @param {boolean} keepData
     * @return {undefined}
     */
    remove : function(elem, types, handler, selector, keepData) {
      var j;
      var origCount;
      var tmp;
      var events;
      var t;
      var handleObj;
      var special;
      var handlers;
      var type;
      var namespaces;
      var origType;
      var elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (elemData && (events = elemData.events)) {
        t = (types = (types || "").match(core_rnotwhite) || [""]).length;
        for (;t--;) {
          if (type = origType = (tmp = rtypenamespace.exec(types[t]) || [])[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
            special = jQuery.event.special[type] || {};
            handlers = events[type = (selector ? special.delegateType : special.bindType) || type] || [];
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
                if (!(special.teardown && false !== special.teardown.call(elem, namespaces, elemData.handle))) {
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
          data_priv.remove(elem, "handle events");
        }
      }
    },
    /**
     * @param {Event} e
     * @return {?}
     */
    dispatch : function(e) {
      var i;
      var j;
      var ret;
      var matched;
      var handleObj;
      var handlerQueue;
      /** @type {Array} */
      var args = new Array(arguments.length);
      var event = jQuery.event.fix(e);
      var handlers = (data_priv.get(this, "events") || Object.create(null))[event.type] || [];
      var special = jQuery.event.special[event.type] || {};
      args[0] = event;
      /** @type {number} */
      i = 1;
      for (;i < arguments.length;i++) {
        args[i] = arguments[i];
      }
      if (event.delegateTarget = this, !special.preDispatch || false !== special.preDispatch.call(this, event)) {
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        /** @type {number} */
        i = 0;
        for (;(matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
          event.currentTarget = matched.elem;
          /** @type {number} */
          j = 0;
          for (;(handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
            if (!(event.rnamespace && (false !== handleObj.namespace && !event.rnamespace.test(handleObj.namespace)))) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              if (void 0 !== (ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args))) {
                if (false === (event.result = ret)) {
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
      var i;
      var handleObj;
      var sel;
      var matches;
      var selMatch;
      /** @type {Array} */
      var handlerQueue = [];
      var delegateCount = handlers.delegateCount;
      var cur = event.target;
      if (delegateCount && (cur.nodeType && !("click" === event.type && 1 <= event.button))) {
        for (;cur !== this;cur = cur.parentNode || this) {
          if (1 === cur.nodeType && ("click" !== event.type || true !== cur.disabled)) {
            /** @type {Array} */
            matches = [];
            selMatch = {};
            /** @type {number} */
            i = 0;
            for (;i < delegateCount;i++) {
              if (void 0 === selMatch[sel = (handleObj = handlers[i]).selector + " "]) {
                selMatch[sel] = handleObj.needsContext ? -1 < jQuery(sel, this).index(cur) : jQuery.find(sel, this, null, [cur]).length;
              }
              if (selMatch[sel]) {
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
      return cur = this, delegateCount < handlers.length && handlerQueue.push({
        elem : cur,
        handlers : handlers.slice(delegateCount)
      }), handlerQueue;
    },
    /**
     * @param {?} prop
     * @param {Object} setter
     * @return {undefined}
     */
    addProp : function(prop, setter) {
      Object.defineProperty(jQuery.Event.prototype, prop, {
        enumerable : true,
        configurable : true,
        /** @type {function (): ?} */
        get : isFunction(setter) ? function() {
          if (this.originalEvent) {
            return setter(this.originalEvent);
          }
        } : function() {
          if (this.originalEvent) {
            return this.originalEvent[prop];
          }
        },
        /**
         * @param {string} elem
         * @return {undefined}
         */
        set : function(elem) {
          Object.defineProperty(this, prop, {
            enumerable : true,
            configurable : true,
            writable : true,
            value : elem
          });
        }
      });
    },
    /**
     * @param {Event} event
     * @return {?}
     */
    fix : function(event) {
      return event[jQuery.expando] ? event : new jQuery.Event(event);
    },
    special : {
      load : {
        noBubble : true
      },
      click : {
        /**
         * @param {?} opt_attributes
         * @return {?}
         */
        setup : function(opt_attributes) {
          var elem = this || opt_attributes;
          return rfocusable.test(elem.type) && (elem.click && (callback(elem, "input") && remove(elem, "click", true))), false;
        },
        /**
         * @param {Function} type
         * @return {?}
         */
        trigger : function(type) {
          var elem = this || type;
          return rfocusable.test(elem.type) && (elem.click && (callback(elem, "input") && remove(elem, "click"))), true;
        },
        /**
         * @param {Event} ev
         * @return {?}
         */
        _default : function(ev) {
          var elem = ev.target;
          return rfocusable.test(elem.type) && (elem.click && (callback(elem, "input") && data_priv.get(elem, "click"))) || callback(elem, "a");
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
    }
  };
  /**
   * @param {Object} elem
   * @param {?} type
   * @param {?} handle
   * @return {undefined}
   */
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  /**
   * @param {Object} src
   * @param {Array} props
   * @return {?}
   */
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      /** @type {Object} */
      this.originalEvent = src;
      this.type = src.type;
      /** @type {function (): ?} */
      this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && false === src.returnValue ? returnTrue : returnFalse;
      this.target = src.target && 3 === src.target.nodeType ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;
    } else {
      /** @type {Object} */
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || Date.now();
    /** @type {boolean} */
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    /** @type {function (Object, Array): ?} */
    constructor : jQuery.Event,
    /** @type {function (): ?} */
    isDefaultPrevented : returnFalse,
    /** @type {function (): ?} */
    isPropagationStopped : returnFalse,
    /** @type {function (): ?} */
    isImmediatePropagationStopped : returnFalse,
    isSimulated : false,
    /**
     * @return {undefined}
     */
    preventDefault : function() {
      var e = this.originalEvent;
      /** @type {function (): ?} */
      this.isDefaultPrevented = returnTrue;
      if (e) {
        if (!this.isSimulated) {
          e.preventDefault();
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
        if (!this.isSimulated) {
          e.stopPropagation();
        }
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
        if (!this.isSimulated) {
          e.stopImmediatePropagation();
        }
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    altKey : true,
    bubbles : true,
    cancelable : true,
    changedTouches : true,
    ctrlKey : true,
    detail : true,
    eventPhase : true,
    metaKey : true,
    pageX : true,
    pageY : true,
    shiftKey : true,
    view : true,
    "char" : true,
    code : true,
    charCode : true,
    key : true,
    keyCode : true,
    button : true,
    buttons : true,
    clientX : true,
    clientY : true,
    offsetX : true,
    offsetY : true,
    pointerId : true,
    pointerType : true,
    screenX : true,
    screenY : true,
    targetTouches : true,
    toElement : true,
    touches : true,
    which : true
  }, jQuery.event.addProp);
  jQuery.each({
    focus : "focusin",
    blur : "focusout"
  }, function(name, type) {
    /**
     * @param {Event} event
     * @return {undefined}
     */
    function handler(event) {
      if (doc.documentMode) {
        var fix = data_priv.get(this, "handle");
        var evt = jQuery.event.fix(event);
        /** @type {string} */
        evt.type = "focusin" === event.type ? "focus" : "blur";
        /** @type {boolean} */
        evt.isSimulated = true;
        fix(event);
        if (evt.target === evt.currentTarget) {
          fix(evt);
        }
      } else {
        jQuery.event.simulate(type, event.target, jQuery.event.fix(event));
      }
    }
    jQuery.event.special[name] = {
      /**
       * @return {?}
       */
      setup : function() {
        var queue;
        if (remove(this, name, true), !doc.documentMode) {
          return false;
        }
        if (!(queue = data_priv.get(this, type))) {
          this.addEventListener(type, handler);
        }
        data_priv.set(this, type, (queue || 0) + 1);
      },
      /**
       * @return {?}
       */
      trigger : function() {
        return remove(this, name), true;
      },
      /**
       * @return {?}
       */
      teardown : function() {
        var data;
        if (!doc.documentMode) {
          return false;
        }
        if (data = data_priv.get(this, type) - 1) {
          data_priv.set(this, type, data);
        } else {
          this.removeEventListener(type, handler);
          data_priv.remove(this, type);
        }
      },
      /**
       * @param {Event} event
       * @return {?}
       */
      _default : function(event) {
        return data_priv.get(event.target, name);
      },
      delegateType : type
    };
    jQuery.event.special[type] = {
      /**
       * @return {undefined}
       */
      setup : function() {
        var p = this.ownerDocument || (this.document || this);
        var cur = doc.documentMode ? this : p;
        var key = data_priv.get(cur, type);
        if (!key) {
          if (doc.documentMode) {
            this.addEventListener(type, handler);
          } else {
            p.addEventListener(name, handler, true);
          }
        }
        data_priv.set(cur, type, (key || 0) + 1);
      },
      /**
       * @return {undefined}
       */
      teardown : function() {
        var p = this.ownerDocument || (this.document || this);
        var elem = doc.documentMode ? this : p;
        /** @type {number} */
        var data = data_priv.get(elem, type) - 1;
        if (data) {
          data_priv.set(elem, type, data);
        } else {
          if (doc.documentMode) {
            this.removeEventListener(type, handler);
          } else {
            p.removeEventListener(name, handler, true);
          }
          data_priv.remove(elem, type);
        }
      }
    };
  });
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
        var related = event.relatedTarget;
        var handleObj = event.handleObj;
        return related && (related === this || jQuery.contains(this, related)) || (event.type = handleObj.origType, returnValue = handleObj.handler.apply(this, arguments), event.type = fix), returnValue;
      }
    };
  });
  jQuery.fn.extend({
    /**
     * @param {string} name
     * @param {Function} selector
     * @param {Object} one
     * @param {Object} fn
     * @return {?}
     */
    on : function(name, selector, one, fn) {
      return on(this, name, selector, one, fn);
    },
    /**
     * @param {Object} type
     * @param {Object} selector
     * @param {Object} callback
     * @param {Object} types
     * @return {?}
     */
    one : function(type, selector, callback, types) {
      return on(this, type, selector, callback, types, 1);
    },
    /**
     * @param {Object} types
     * @param {Function} selector
     * @param {Function} fn
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
      return false !== selector && "function" != typeof selector || (fn = selector, selector = void 0), false === fn && (fn = returnFalse), this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  /** @type {RegExp} */
  var exclude = /<script|<style|<link/i;
  /** @type {RegExp} */
  var rRadial = /checked\s*(?:[^=]|=\s*.checked.)/i;
  /** @type {RegExp} */
  var normalizr = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  jQuery.extend({
    /**
     * @param {string} second
     * @return {?}
     */
    htmlPrefilter : function(second) {
      return second;
    },
    /**
     * @param {Object} elem
     * @param {boolean} dataAndEvents
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    clone : function(elem, dataAndEvents, deepDataAndEvents) {
      var i;
      var l;
      var srcElements;
      var destElements;
      var src;
      var dest;
      var _undefined;
      var clone = elem.cloneNode(true);
      var inPage = getComputedStyle(elem);
      if (!(support.noCloneChecked || (1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))) {
        destElements = getAll(clone);
        /** @type {number} */
        i = 0;
        l = (srcElements = getAll(elem)).length;
        for (;i < l;i++) {
          src = srcElements[i];
          dest = destElements[i];
          void 0;
          if ("input" === (_undefined = dest.nodeName.toLowerCase()) && rfocusable.test(src.type)) {
            dest.checked = src.checked;
          } else {
            if (!("input" !== _undefined && "textarea" !== _undefined)) {
              dest.defaultValue = src.defaultValue;
            }
          }
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          /** @type {number} */
          i = 0;
          l = srcElements.length;
          for (;i < l;i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      return 0 < (destElements = getAll(clone, "script")).length && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone;
    },
    /**
     * @param {?} elems
     * @return {undefined}
     */
    cleanData : function(elems) {
      var data;
      var elem;
      var type;
      var special = jQuery.event.special;
      /** @type {number} */
      var i = 0;
      for (;void 0 !== (elem = elems[i]);i++) {
        if ($(elem)) {
          if (data = elem[data_priv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[data_priv.expando] = void 0;
          }
          if (elem[data_user.expando]) {
            elem[data_user.expando] = void 0;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    /**
     * @param {?} selector
     * @return {?}
     */
    detach : function(selector) {
      return init(this, selector, true);
    },
    /**
     * @param {Object} selector
     * @return {?}
     */
    remove : function(selector) {
      return init(this, selector);
    },
    /**
     * @param {Object} elems
     * @return {?}
     */
    text : function(elems) {
      return access(this, function(textString) {
        return void 0 === textString ? jQuery.text(this) : this.empty().each(function() {
          if (!(1 !== this.nodeType && (11 !== this.nodeType && 9 !== this.nodeType))) {
            /** @type {string} */
            this.textContent = textString;
          }
        });
      }, null, elems, arguments.length);
    },
    /**
     * @return {?}
     */
    append : function() {
      return load(this, arguments, function(elem) {
        if (!(1 !== this.nodeType && (11 !== this.nodeType && 9 !== this.nodeType))) {
          manipulationTarget(this, elem).appendChild(elem);
        }
      });
    },
    /**
     * @return {?}
     */
    prepend : function() {
      return load(this, arguments, function(elem) {
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
      return load(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    /**
     * @return {?}
     */
    after : function() {
      return load(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
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
          /** @type {string} */
          elem.textContent = "";
        }
      }
      return this;
    },
    /**
     * @param {Object} dataAndEvents
     * @param {Object} deepDataAndEvents
     * @return {?}
     */
    clone : function(dataAndEvents, deepDataAndEvents) {
      return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    /**
     * @param {Function} value
     * @return {?}
     */
    html : function(value) {
      return access(this, function(value) {
        var elem = this[0] || {};
        /** @type {number} */
        var i = 0;
        var l = this.length;
        if (void 0 === value && 1 === elem.nodeType) {
          return elem.innerHTML;
        }
        if ("string" == typeof value && (!exclude.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (;i < l;i++) {
              if (1 === (elem = this[i] || {}).nodeType) {
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
      /** @type {Array} */
      var selection = [];
      return load(this, arguments, function(relatedNode) {
        var node = this.parentNode;
        if (jQuery.inArray(this, selection) < 0) {
          jQuery.cleanData(getAll(this));
          if (node) {
            node.replaceChild(relatedNode, this);
          }
        }
      }, selection);
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
      /** @type {Array} */
      var ret = [];
      var insert = jQuery(scripts);
      /** @type {number} */
      var last = insert.length - 1;
      /** @type {number} */
      var i = 0;
      for (;i <= last;i++) {
        resp = i === last ? this : this.clone(true);
        jQuery(insert[i])[method](resp);
        core_push.apply(ret, resp.get());
      }
      return this.pushStack(ret);
    };
  });
  /** @type {RegExp} */
  var rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i");
  /** @type {RegExp} */
  var props = /^--/;
  /**
   * @param {Object} elem
   * @return {?}
   */
  var getStyles = function(elem) {
    var defaultView = elem.ownerDocument.defaultView;
    return defaultView && defaultView.opener || (defaultView = win), defaultView.getComputedStyle(elem);
  };
  /**
   * @param {Object} context
   * @param {Object} obj1
   * @param {Function} action
   * @return {?}
   */
  var cb = function(context, obj1, action) {
    var result;
    var name;
    var old = {};
    for (name in obj1) {
      old[name] = context.style[name];
      context.style[name] = obj1[name];
    }
    for (name in result = action.call(context), obj1) {
      context.style[name] = old[name];
    }
    return result;
  };
  /** @type {RegExp} */
  var regex = new RegExp(cssExpand.join("|"), "i");
  !function() {
    /**
     * @return {undefined}
     */
    function init() {
      if (div) {
        /** @type {string} */
        container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
        /** @type {string} */
        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
        docElem.appendChild(container).appendChild(div);
        var info = win.getComputedStyle(div);
        /** @type {boolean} */
        n = "1%" !== info.top;
        /** @type {boolean} */
        s = 12 === isNumber(info.marginLeft);
        /** @type {string} */
        div.style.right = "60%";
        /** @type {boolean} */
        o = 36 === isNumber(info.right);
        /** @type {boolean} */
        r = 36 === isNumber(info.width);
        /** @type {string} */
        div.style.position = "absolute";
        /** @type {boolean} */
        i = 12 === isNumber(div.offsetWidth / 3);
        docElem.removeChild(container);
        /** @type {null} */
        div = null;
      }
    }
    /**
     * @param {?} n
     * @return {?}
     */
    function isNumber(n) {
      return Math.round(parseFloat(n));
    }
    var n;
    var r;
    var i;
    var o;
    var a;
    var s;
    var container = doc.createElement("div");
    var div = doc.createElement("div");
    if (div.style) {
      /** @type {string} */
      div.style.backgroundClip = "content-box";
      /** @type {string} */
      div.cloneNode(true).style.backgroundClip = "";
      /** @type {boolean} */
      support.clearCloneStyle = "content-box" === div.style.backgroundClip;
      jQuery.extend(support, {
        /**
         * @return {?}
         */
        boxSizingReliable : function() {
          return init(), r;
        },
        /**
         * @return {?}
         */
        pixelBoxStyles : function() {
          return init(), o;
        },
        /**
         * @return {?}
         */
        pixelPosition : function() {
          return init(), n;
        },
        /**
         * @return {?}
         */
        reliableMarginLeft : function() {
          return init(), s;
        },
        /**
         * @return {?}
         */
        scrollboxSize : function() {
          return init(), i;
        },
        /**
         * @return {?}
         */
        reliableTrDimensions : function() {
          var parent;
          var container;
          var testElement;
          var style;
          return null == a && (parent = doc.createElement("table"), container = doc.createElement("tr"), testElement = doc.createElement("div"), parent.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", container.style.cssText = "box-sizing:content-box;border:1px solid", container.style.height = "1px", testElement.style.height = "9px", testElement.style.display = "block", docElem.appendChild(parent).appendChild(container).appendChild(testElement), style = win.getComputedStyle(container), 
          a = parseInt(style.height, 10) + parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10) === container.offsetHeight, docElem.removeChild(parent)), a;
        }
      });
    }
  }();
  /** @type {Array} */
  var VENDOR_PREFIXES = ["Webkit", "Moz", "ms"];
  var elem = doc.createElement("div").style;
  var methods = {};
  /** @type {RegExp} */
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  var s = {
    position : "absolute",
    visibility : "hidden",
    display : "block"
  };
  var cssNormalTransform = {
    letterSpacing : "0",
    fontWeight : "400"
  };
  jQuery.extend({
    cssHooks : {
      opacity : {
        /**
         * @param {Object} owner
         * @param {string} value
         * @return {?}
         */
        get : function(owner, value) {
          if (value) {
            var buffer = css(owner, "opacity");
            return "" === buffer ? "1" : buffer;
          }
        }
      }
    },
    cssNumber : {
      animationIterationCount : true,
      aspectRatio : true,
      borderImageSlice : true,
      columnCount : true,
      flexGrow : true,
      flexShrink : true,
      fontWeight : true,
      gridArea : true,
      gridColumn : true,
      gridColumnEnd : true,
      gridColumnStart : true,
      gridRow : true,
      gridRowEnd : true,
      gridRowStart : true,
      lineHeight : true,
      opacity : true,
      order : true,
      orphans : true,
      scale : true,
      widows : true,
      zIndex : true,
      zoom : true,
      fillOpacity : true,
      floodOpacity : true,
      stopOpacity : true,
      strokeMiterlimit : true,
      strokeOpacity : true
    },
    cssProps : {},
    /**
     * @param {Object} elem
     * @param {string} prop
     * @param {string} val
     * @param {Object} value
     * @return {?}
     */
    style : function(elem, prop, val, value) {
      if (elem && (3 !== elem.nodeType && (8 !== elem.nodeType && elem.style))) {
        var parts;
        var current;
        var hooks;
        var p = camelCase(prop);
        /** @type {boolean} */
        var m = props.test(prop);
        var style = elem.style;
        if (m || (prop = camelize(p)), hooks = jQuery.cssHooks[prop] || jQuery.cssHooks[p], void 0 === val) {
          return hooks && ("get" in hooks && void 0 !== (parts = hooks.get(elem, false, value))) ? parts : style[prop];
        }
        if ("string" === (current = typeof val)) {
          if (parts = regexp.exec(val)) {
            if (parts[1]) {
              val = get(elem, prop, parts);
              /** @type {string} */
              current = "number";
            }
          }
        }
        if (null != val) {
          if (val == val) {
            if (!("number" !== current)) {
              if (!m) {
                val += parts && parts[3] || (jQuery.cssNumber[p] ? "" : "px");
              }
            }
            if (!support.clearCloneStyle) {
              if (!("" !== val)) {
                if (!(0 !== prop.indexOf("background"))) {
                  /** @type {string} */
                  style[prop] = "inherit";
                }
              }
            }
            if (!(hooks && ("set" in hooks && void 0 === (val = hooks.set(elem, val, value))))) {
              if (m) {
                style.setProperty(prop, val);
              } else {
                /** @type {string} */
                style[prop] = val;
              }
            }
          }
        }
      }
    },
    /**
     * @param {Object} elem
     * @param {string} prop
     * @param {boolean} recurring
     * @param {?} val
     * @return {?}
     */
    css : function(elem, prop, recurring, val) {
      var ret;
      var result;
      var hooks;
      var name = camelCase(prop);
      return props.test(prop) || (prop = camelize(name)), (hooks = jQuery.cssHooks[prop] || jQuery.cssHooks[name]) && ("get" in hooks && (ret = hooks.get(elem, true, recurring))), void 0 === ret && (ret = css(elem, prop, val)), "normal" === ret && (prop in cssNormalTransform && (ret = cssNormalTransform[prop])), "" === recurring || recurring ? (result = parseFloat(ret), true === recurring || isFinite(result) ? result || 0 : ret) : ret;
    }
  });
  jQuery.each(["height", "width"], function(dataAndEvents, prop) {
    jQuery.cssHooks[prop] = {
      /**
       * @param {Object} elem
       * @param {string} value
       * @param {boolean} extra
       * @return {?}
       */
      get : function(elem, value, extra) {
        if (value) {
          return!rdisplayswap.test(jQuery.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? getWidthOrHeight(elem, prop, extra) : cb(elem, s, function() {
            return getWidthOrHeight(elem, prop, extra);
          });
        }
      },
      /**
       * @param {Object} elem
       * @param {string} data
       * @param {boolean} value
       * @return {?}
       */
      set : function(elem, data, value) {
        var match;
        var styles = getStyles(elem);
        /** @type {boolean} */
        var userInitiated = !support.scrollboxSize() && "absolute" === styles.position;
        var onError = (userInitiated || value) && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
        var objId = value ? fn(elem, prop, value, onError, styles) : 0;
        return onError && (userInitiated && (objId -= Math.ceil(elem["offset" + prop[0].toUpperCase() + prop.slice(1)] - parseFloat(styles[prop]) - fn(elem, prop, "border", false, styles) - 0.5))), objId && ((match = regexp.exec(data)) && ("px" !== (match[3] || "px") && (elem.style[prop] = data, data = jQuery.css(elem, prop)))), set(0, data, objId);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, dataAndEvents) {
    if (dataAndEvents) {
      return(parseFloat(css(elem, "marginLeft")) || elem.getBoundingClientRect().left - cb(elem, {
        marginLeft : 0
      }, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.each({
    margin : "",
    padding : "",
    border : "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      /**
       * @param {string} str
       * @return {?}
       */
      expand : function(str) {
        /** @type {number} */
        var i = 0;
        var expanded = {};
        /** @type {Array} */
        var tokens = "string" == typeof str ? str.split(" ") : [str];
        for (;i < 4;i++) {
          expanded[prefix + cssExpand[i] + suffix] = tokens[i] || (tokens[i - 2] || tokens[0]);
        }
        return expanded;
      }
    };
    if ("margin" !== prefix) {
      /** @type {function (Object, string, Object): ?} */
      jQuery.cssHooks[prefix + suffix].set = set;
    }
  });
  jQuery.fn.extend({
    /**
     * @param {Object} elem
     * @param {string} value
     * @return {?}
     */
    css : function(elem, value) {
      return access(this, function(elem, name, value) {
        var styles;
        var valsLength;
        var map = {};
        /** @type {number} */
        var i = 0;
        if (Array.isArray(name)) {
          styles = getStyles(elem);
          valsLength = name.length;
          for (;i < valsLength;i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, elem, value, 1 < arguments.length);
    }
  });
  ((jQuery.Tween = Tween).prototype = {
    /** @type {function (string, string, string, string, string): ?} */
    constructor : Tween,
    /**
     * @param {?} allBindingsAccessor
     * @param {Object} options
     * @param {?} prop
     * @param {?} to
     * @param {string} easing
     * @param {string} unit
     * @return {undefined}
     */
    init : function(allBindingsAccessor, options, prop, to, easing, unit) {
      this.elem = allBindingsAccessor;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
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
  }).init.prototype = Tween.prototype;
  (Tween.propHooks = {
    _default : {
      /**
       * @param {Object} elem
       * @return {?}
       */
      get : function(elem) {
        var result;
        return 1 !== elem.elem.nodeType || null != elem.elem[elem.prop] && null == elem.elem.style[elem.prop] ? elem.elem[elem.prop] : (result = jQuery.css(elem.elem, elem.prop, "")) && "auto" !== result ? result : 0;
      },
      /**
       * @param {Object} tween
       * @return {undefined}
       */
      set : function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else {
          if (1 !== tween.elem.nodeType || !jQuery.cssHooks[tween.prop] && null == tween.elem.style[camelize(tween.prop)]) {
            tween.elem[tween.prop] = tween.now;
          } else {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          }
        }
      }
    }
  }).scrollTop = Tween.propHooks.scrollLeft = {
    /**
     * @param {Object} elem
     * @return {undefined}
     */
    set : function(elem) {
      if (elem.elem.nodeType) {
        if (elem.elem.parentNode) {
          elem.elem[elem.prop] = elem.now;
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
    },
    _default : "swing"
  };
  /** @type {function (?, Object, ?, ?, string, string): undefined} */
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow;
  var ut;
  var field;
  var opt;
  /** @type {RegExp} */
  var spaceRe = /^(?:toggle|show|hide)$/;
  /** @type {RegExp} */
  var numbers = /queueHooks$/;
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners : {
      "*" : [function(prop, value) {
        var tween = this.createTween(prop, value);
        return get(tween.elem, prop, regexp.exec(value), tween), tween;
      }]
    },
    /**
     * @param {Object} options
     * @param {Function} callback
     * @return {undefined}
     */
    tweener : function(options, callback) {
      if (isFunction(options)) {
        /** @type {Object} */
        callback = options;
        /** @type {Array} */
        options = ["*"];
      } else {
        options = options.match(core_rnotwhite);
      }
      var option;
      /** @type {number} */
      var i = 0;
      var len = options.length;
      for (;i < len;i++) {
        option = options[i];
        Animation.tweeners[option] = Animation.tweeners[option] || [];
        Animation.tweeners[option].unshift(callback);
      }
    },
    prefilters : [function(elem, props, item) {
      var prop;
      var value;
      var thisp;
      var hooks;
      var oldfire;
      var tween;
      var val;
      var type;
      /** @type {boolean} */
      var f = "width" in props || "height" in props;
      var anim = this;
      var cache = {};
      var style = elem.style;
      var hidden = elem.nodeType && isHidden(elem);
      var dataShow = data_priv.get(elem, "fxshow");
      for (prop in item.queue || (null == (hooks = jQuery._queueHooks(elem, "fx")).unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
        if (!hooks.unqueued) {
          oldfire();
        }
      }), hooks.unqueued++, anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      })), props) {
        if (value = props[prop], spaceRe.test(value)) {
          if (delete props[prop], thisp = thisp || "toggle" === value, value === (hidden ? "hide" : "show")) {
            if ("show" !== value || (!dataShow || void 0 === dataShow[prop])) {
              continue;
            }
            /** @type {boolean} */
            hidden = true;
          }
          cache[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
      }
      if ((tween = !jQuery.isEmptyObject(props)) || !jQuery.isEmptyObject(cache)) {
        for (prop in f && (1 === elem.nodeType && (item.overflow = [style.overflow, style.overflowX, style.overflowY], null == (val = dataShow && dataShow.display) && (val = data_priv.get(elem, "display")), "none" === (type = jQuery.css(elem, "display")) && (val ? type = val : (update([elem], true), val = elem.style.display || val, type = jQuery.css(elem, "display"), update([elem]))), ("inline" === type || "inline-block" === type && null != val) && ("none" === jQuery.css(elem, "float") && (tween || 
        (anim.done(function() {
          style.display = val;
        }), null == val && (type = style.display, val = "none" === type ? "" : type)), style.display = "inline-block")))), item.overflow && (style.overflow = "hidden", anim.always(function() {
          style.overflow = item.overflow[0];
          style.overflowX = item.overflow[1];
          style.overflowY = item.overflow[2];
        })), tween = false, cache) {
          if (!tween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = data_priv.access(elem, "fxshow", {
                display : val
              });
            }
            if (thisp) {
              /** @type {boolean} */
              dataShow.hidden = !hidden;
            }
            if (hidden) {
              update([elem], true);
            }
            anim.done(function() {
              for (prop in hidden || update([elem]), data_priv.remove(elem, "fxshow"), cache) {
                jQuery.style(elem, prop, cache[prop]);
              }
            });
          }
          tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = tween.start;
            if (hidden) {
              tween.end = tween.start;
              /** @type {number} */
              tween.start = 0;
            }
          }
        }
      }
    }],
    /**
     * @param {?} suite
     * @param {?} prepend
     * @return {undefined}
     */
    prefilter : function(suite, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(suite);
      } else {
        Animation.prefilters.push(suite);
      }
    }
  });
  /**
   * @param {string} speed
   * @param {boolean} easing
   * @param {string} fn
   * @return {?}
   */
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
      complete : fn || (!fn && easing || isFunction(speed) && speed),
      duration : speed,
      easing : fn && easing || easing && (!isFunction(easing) && easing)
    };
    return jQuery.fx.off ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in jQuery.fx.speeds ? opt.duration = jQuery.fx.speeds[opt.duration] : opt.duration = jQuery.fx.speeds._default), null != opt.queue && true !== opt.queue || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    }, opt;
  };
  jQuery.fn.extend({
    /**
     * @param {string} speed
     * @param {(number|string)} to
     * @param {boolean} callback
     * @param {string} _callback
     * @return {?}
     */
    fadeTo : function(speed, to, callback, _callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({
        opacity : to
      }, speed, callback, _callback);
    },
    /**
     * @param {?} prop
     * @param {string} speed
     * @param {boolean} easing
     * @param {string} callback
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
        if (empty || data_priv.get(this, "finish")) {
          anim.stop(true);
        }
      };
      return doAnimation.finish = doAnimation, empty || false === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    /**
     * @param {Object} type
     * @param {Object} clearQueue
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
      return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && this.queue(type || "fx", []), this.each(function() {
        /** @type {boolean} */
        var e = true;
        var i = null != type && type + "queueHooks";
        /** @type {Array} */
        var timers = jQuery.timers;
        var gradient = data_priv.get(this);
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
              e = false;
              timers.splice(i, 1);
            }
          }
        }
        if (!(!e && gotoEnd)) {
          jQuery.dequeue(this, type);
        }
      });
    },
    /**
     * @param {string} type
     * @return {?}
     */
    finish : function(type) {
      return false !== type && (type = type || "fx"), this.each(function() {
        var index;
        var data = data_priv.get(this);
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
        for (;index < length;index++) {
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
     * @param {string} speed
     * @param {boolean} callback
     * @param {string} next_callback
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
     * @param {string} speed
     * @param {boolean} callback
     * @param {string} next_callback
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
    var s;
    /** @type {number} */
    var i = 0;
    /** @type {Array} */
    var timers = jQuery.timers;
    /** @type {number} */
    fxNow = Date.now();
    for (;i < timers.length;i++) {
      if (!(s = timers[i])()) {
        if (!(timers[i] !== s)) {
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
    jQuery.fx.start();
  };
  /** @type {number} */
  jQuery.fx.interval = 13;
  /**
   * @return {undefined}
   */
  jQuery.fx.start = function() {
    if (!ut) {
      /** @type {boolean} */
      ut = true;
      animate();
    }
  };
  /**
   * @return {undefined}
   */
  jQuery.fx.stop = function() {
    /** @type {null} */
    ut = null;
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
    return time = jQuery.fx && jQuery.fx.speeds[time] || time, type = type || "fx", this.queue(type, function(next, event) {
      var timeout = win.setTimeout(next, time);
      /**
       * @return {undefined}
       */
      event.stop = function() {
        win.clearTimeout(timeout);
      };
    });
  };
  field = doc.createElement("input");
  opt = doc.createElement("select").appendChild(doc.createElement("option"));
  /** @type {string} */
  field.type = "checkbox";
  /** @type {boolean} */
  support.checkOn = "" !== field.value;
  support.optSelected = opt.selected;
  /** @type {string} */
  (field = doc.createElement("input")).value = "t";
  /** @type {string} */
  field.type = "radio";
  /** @type {boolean} */
  support.radioValue = "t" === field.value;
  var boolHook;
  var files = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    /**
     * @param {Object} name
     * @param {string} value
     * @return {?}
     */
    attr : function(name, value) {
      return access(this, jQuery.attr, name, value, 1 < arguments.length);
    },
    /**
     * @param {Object} name
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
     * @param {Object} elem
     * @param {string} name
     * @param {string} value
     * @return {?}
     */
    attr : function(elem, name, value) {
      var ret;
      var hooks;
      var nodeType = elem.nodeType;
      if (3 !== nodeType && (8 !== nodeType && 2 !== nodeType)) {
        return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nodeType && jQuery.isXMLDoc(elem) || (hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && ("set" in hooks && void 0 !== (ret = hooks.set(elem, value, name))) ? ret : (elem.setAttribute(name, value + ""), value) : hooks && ("get" in hooks && null !== (ret = hooks.get(elem, 
        name))) ? ret : null == (ret = jQuery.find.attr(elem, name)) ? void 0 : ret);
      }
    },
    attrHooks : {
      type : {
        /**
         * @param {Object} elem
         * @param {string} value
         * @return {?}
         */
        set : function(elem, value) {
          if (!support.radioValue && ("radio" === value && callback(elem, "input"))) {
            var val = elem.value;
            return elem.setAttribute("type", value), val && (elem.value = val), value;
          }
        }
      }
    },
    /**
     * @param {Object} elem
     * @param {string} value
     * @return {undefined}
     */
    removeAttr : function(elem, value) {
      var name;
      /** @type {number} */
      var i = 0;
      var attrNames = value && value.match(core_rnotwhite);
      if (attrNames && 1 === elem.nodeType) {
        for (;name = attrNames[i++];) {
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {
    /**
     * @param {Object} elem
     * @param {string} value
     * @param {Object} name
     * @return {?}
     */
    set : function(elem, value, name) {
      return false === value ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(dataAndEvents, name) {
    var callback = files[name] || jQuery.find.attr;
    /**
     * @param {Object} body
     * @param {string} header
     * @param {string} arg
     * @return {?}
     */
    files[name] = function(body, header, arg) {
      var value;
      var file;
      var name = header.toLowerCase();
      return arg || (file = files[name], files[name] = value, value = null != callback(body, header, arg) ? name : null, files[name] = file), value;
    };
  });
  /** @type {RegExp} */
  var rinputs = /^(?:input|select|textarea|button)$/i;
  /** @type {RegExp} */
  var rheader = /^(?:a|area)$/i;
  jQuery.fn.extend({
    /**
     * @param {Object} name
     * @param {?} value
     * @return {?}
     */
    prop : function(name, value) {
      return access(this, jQuery.prop, name, value, 1 < arguments.length);
    },
    /**
     * @param {?} name
     * @return {?}
     */
    removeProp : function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    /**
     * @param {Object} elem
     * @param {string} name
     * @param {string} value
     * @return {?}
     */
    prop : function(elem, name, value) {
      var ret;
      var hooks;
      var nodeType = elem.nodeType;
      if (3 !== nodeType && (8 !== nodeType && 2 !== nodeType)) {
        return 1 === nodeType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && ("set" in hooks && void 0 !== (ret = hooks.set(elem, value, name))) ? ret : elem[name] = value : hooks && ("get" in hooks && null !== (ret = hooks.get(elem, name))) ? ret : elem[name];
      }
    },
    propHooks : {
      tabIndex : {
        /**
         * @param {Object} elem
         * @return {?}
         */
        get : function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rinputs.test(elem.nodeName) || rheader.test(elem.nodeName) && elem.href ? 0 : -1;
        }
      }
    },
    propFix : {
      "for" : "htmlFor",
      "class" : "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      /**
       * @param {Object} elem
       * @return {?}
       */
      get : function(elem) {
        var parent = elem.parentNode;
        return parent && (parent.parentNode && parent.parentNode.selectedIndex), null;
      },
      /**
       * @param {Object} elem
       * @return {undefined}
       */
      set : function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  jQuery.fn.extend({
    /**
     * @param {Function} value
     * @return {?}
     */
    addClass : function(value) {
      var parts;
      var dir;
      var ret;
      var part;
      var i;
      var path;
      return isFunction(value) ? this.each(function(j) {
        jQuery(this).addClass(value.call(this, j, trim(this)));
      }) : (parts = isArray(value)).length ? this.each(function() {
        if (ret = trim(this), dir = 1 === this.nodeType && " " + join(ret) + " ") {
          /** @type {number} */
          i = 0;
          for (;i < parts.length;i++) {
            part = parts[i];
            if (dir.indexOf(" " + part + " ") < 0) {
              dir += part + " ";
            }
          }
          path = join(dir);
          if (ret !== path) {
            this.setAttribute("class", path);
          }
        }
      }) : this;
    },
    /**
     * @param {Function} value
     * @return {?}
     */
    removeClass : function(value) {
      var parts;
      var dir;
      var ret;
      var part;
      var i;
      var path;
      return isFunction(value) ? this.each(function(j) {
        jQuery(this).removeClass(value.call(this, j, trim(this)));
      }) : arguments.length ? (parts = isArray(value)).length ? this.each(function() {
        if (ret = trim(this), dir = 1 === this.nodeType && " " + join(ret) + " ") {
          /** @type {number} */
          i = 0;
          for (;i < parts.length;i++) {
            part = parts[i];
            for (;-1 < dir.indexOf(" " + part + " ");) {
              /** @type {string} */
              dir = dir.replace(" " + part + " ", " ");
            }
          }
          path = join(dir);
          if (ret !== path) {
            this.setAttribute("class", path);
          }
        }
      }) : this : this.attr("class", "");
    },
    /**
     * @param {Object} value
     * @param {?} stateVal
     * @return {?}
     */
    toggleClass : function(value, stateVal) {
      var codeSegments;
      var header;
      var i;
      var container;
      /** @type {string} */
      var type = typeof value;
      /** @type {boolean} */
      var boolean = "string" === type || Array.isArray(value);
      return isFunction(value) ? this.each(function(i) {
        jQuery(this).toggleClass(value.call(this, i, trim(this), stateVal), stateVal);
      }) : "boolean" == typeof stateVal && boolean ? stateVal ? this.addClass(value) : this.removeClass(value) : (codeSegments = isArray(value), this.each(function() {
        if (boolean) {
          container = jQuery(this);
          /** @type {number} */
          i = 0;
          for (;i < codeSegments.length;i++) {
            header = codeSegments[i];
            if (container.hasClass(header)) {
              container.removeClass(header);
            } else {
              container.addClass(header);
            }
          }
        } else {
          if (!(void 0 !== value && "boolean" !== type)) {
            if (header = trim(this)) {
              data_priv.set(this, "__className__", header);
            }
            if (this.setAttribute) {
              this.setAttribute("class", header || false === value ? "" : data_priv.get(this, "__className__") || "");
            }
          }
        }
      }));
    },
    /**
     * @param {string} callback
     * @return {?}
     */
    hasClass : function(callback) {
      var tval;
      var content;
      /** @type {number} */
      var r = 0;
      /** @type {string} */
      tval = " " + callback + " ";
      for (;content = this[r++];) {
        if (1 === content.nodeType && -1 < (" " + join(trim(content)) + " ").indexOf(tval)) {
          return true;
        }
      }
      return false;
    }
  });
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
      var valid;
      var elem = this[0];
      return arguments.length ? (valid = isFunction(value), this.each(function(j) {
        var val;
        if (1 === this.nodeType) {
          if (null == (val = valid ? value.call(this, j, jQuery(this).val()) : value)) {
            /** @type {string} */
            val = "";
          } else {
            if ("number" == typeof val) {
              val += "";
            } else {
              if (Array.isArray(val)) {
                val = jQuery.map(val, function(month) {
                  return null == month ? "" : month + "";
                });
              }
            }
          }
          if (!((hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && ("set" in hooks && void 0 !== hooks.set(this, val, "value")))) {
            this.value = val;
          }
        }
      })) : elem ? (hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]) && ("get" in hooks && void 0 !== (ret = hooks.get(elem, "value"))) ? ret : "string" == typeof(ret = elem.value) ? ret.replace(rreturn, "") : null == ret ? "" : ret : void 0;
    }
  });
  jQuery.extend({
    valHooks : {
      option : {
        /**
         * @param {Object} elem
         * @return {?}
         */
        get : function(elem) {
          var handle = jQuery.find.attr(elem, "value");
          return null != handle ? handle : join(jQuery.text(elem));
        }
      },
      select : {
        /**
         * @param {Object} elem
         * @return {?}
         */
        get : function(elem) {
          var copies;
          var option;
          var i;
          var options = elem.options;
          var index = elem.selectedIndex;
          /** @type {boolean} */
          var one = "select-one" === elem.type;
          /** @type {(Array|null)} */
          var out = one ? null : [];
          var max = one ? index + 1 : options.length;
          i = index < 0 ? max : one ? index : 0;
          for (;i < max;i++) {
            if (((option = options[i]).selected || i === index) && (!option.disabled && (!option.parentNode.disabled || !callback(option.parentNode, "optgroup")))) {
              if (copies = jQuery(option).val(), one) {
                return copies;
              }
              out.push(copies);
            }
          }
          return out;
        },
        /**
         * @param {Object} elem
         * @param {string} value
         * @return {?}
         */
        set : function(elem, value) {
          var n;
          var cur;
          var options = elem.options;
          var values = jQuery.makeArray(value);
          var i = options.length;
          for (;i--;) {
            if ((cur = options[i]).selected = -1 < jQuery.inArray(jQuery.valHooks.option.get(cur), values)) {
              /** @type {boolean} */
              n = true;
            }
          }
          return n || (elem.selectedIndex = -1), values;
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      /**
       * @param {Object} elem
       * @param {string} data
       * @return {?}
       */
      set : function(elem, data) {
        if (Array.isArray(data)) {
          return elem.checked = -1 < jQuery.inArray(jQuery(elem).val(), data);
        }
      }
    };
    if (!support.checkOn) {
      /**
       * @param {Object} elem
       * @return {?}
       */
      jQuery.valHooks[this].get = function(elem) {
        return null === elem.getAttribute("value") ? "on" : elem.value;
      };
    }
  });
  var a = win.location;
  var newFeedItem = {
    guid : Date.now()
  };
  /** @type {RegExp} */
  var rquery = /\?/;
  /**
   * @param {string} string
   * @return {?}
   */
  jQuery.parseXML = function(string) {
    var doc;
    var node;
    if (!string || "string" != typeof string) {
      return null;
    }
    try {
      doc = (new win.DOMParser).parseFromString(string, "text/xml");
    } catch (e) {
    }
    return node = doc && doc.getElementsByTagName("parsererror")[0], doc && !node || jQuery.error("Invalid XML: " + (node ? jQuery.map(node.childNodes, function(tel) {
      return tel.textContent;
    }).join("\n") : string)), doc;
  };
  /** @type {RegExp} */
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  /**
   * @param {?} ev
   * @return {undefined}
   */
  var onTransitionEnd = function(ev) {
    ev.stopPropagation();
  };
  jQuery.extend(jQuery.event, {
    /**
     * @param {Object} event
     * @param {?} data
     * @param {Object} elem
     * @param {boolean} onlyHandlers
     * @return {?}
     */
    trigger : function(event, data, elem, onlyHandlers) {
      var i;
      var cur;
      var tmp;
      var bubbleType;
      var ontype;
      var handle;
      var special;
      var el;
      /** @type {Array} */
      var eventPath = [elem || doc];
      var type = hasOwn.call(event, "type") ? event.type : event;
      var namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if (cur = el = tmp = elem = elem || doc, 3 !== elem.nodeType && (8 !== elem.nodeType && (!rfocusMorph.test(type + jQuery.event.triggered) && (-1 < type.indexOf(".") && (type = (namespaces = type.split(".")).shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, (event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event)).isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + 
      namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || (!special.trigger || false !== special.trigger.apply(elem, data)))))) {
        if (!onlyHandlers && (!special.noBubble && !isWindow(elem))) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (;cur;cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || doc)) {
            eventPath.push(tmp.defaultView || (tmp.parentWindow || win));
          }
        }
        /** @type {number} */
        i = 0;
        for (;(cur = eventPath[i++]) && !event.isPropagationStopped();) {
          el = cur;
          event.type = 1 < i ? bubbleType : special.bindType || type;
          if (handle = (data_priv.get(cur, "events") || Object.create(null))[event.type] && data_priv.get(cur, "handle")) {
            handle.apply(cur, data);
          }
          if (handle = ontype && cur[ontype]) {
            if (handle.apply) {
              if ($(cur)) {
                event.result = handle.apply(cur, data);
                if (false === event.result) {
                  event.preventDefault();
                }
              }
            }
          }
        }
        return event.type = type, onlyHandlers || (event.isDefaultPrevented() || (special._default && false !== special._default.apply(eventPath.pop(), data) || (!$(elem) || ontype && (isFunction(elem[type]) && (!isWindow(elem) && ((tmp = elem[ontype]) && (elem[ontype] = null), jQuery.event.triggered = type, event.isPropagationStopped() && el.addEventListener(type, onTransitionEnd), elem[type](), event.isPropagationStopped() && el.removeEventListener(type, onTransitionEnd), jQuery.event.triggered = 
        void 0, tmp && (elem[ontype] = tmp))))))), event.result;
      }
    },
    /**
     * @param {string} type
     * @param {Object} elem
     * @param {?} event
     * @return {undefined}
     */
    simulate : function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type : type,
        isSimulated : true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    /**
     * @param {string} type
     * @param {?} data
     * @return {?}
     */
    trigger : function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    /**
     * @param {Object} type
     * @param {?} data
     * @return {?}
     */
    triggerHandler : function(type, data) {
      var parent = this[0];
      if (parent) {
        return jQuery.event.trigger(type, data, parent, true);
      }
    }
  });
  /** @type {RegExp} */
  var rbracket = /\[\]$/;
  /** @type {RegExp} */
  var rCRLF = /\r?\n/g;
  /** @type {RegExp} */
  var manipulation_rcheckableType = /^(?:submit|button|image|reset|file)$/i;
  /** @type {RegExp} */
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  /**
   * @param {Object} a
   * @param {boolean} traditional
   * @return {?}
   */
  jQuery.param = function(a, traditional) {
    var prefix;
    /** @type {Array} */
    var klass = [];
    /**
     * @param {?} key
     * @param {Object} value
     * @return {undefined}
     */
    var add = function(key, value) {
      var val = isFunction(value) ? value() : value;
      /** @type {string} */
      klass[klass.length] = encodeURIComponent(key) + "=" + encodeURIComponent(null == val ? "" : val);
    };
    if (null == a) {
      return "";
    }
    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return klass.join("&");
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
        return this.name && (!jQuery(this).is(":disabled") && (rsubmittable.test(this.nodeName) && (!manipulation_rcheckableType.test(type) && (this.checked || !rfocusable.test(type)))));
      }).map(function(dataAndEvents, elem) {
        var val = jQuery(this).val();
        return null == val ? null : Array.isArray(val) ? jQuery.map(val, function(val) {
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
  /** @type {RegExp} */
  var rclass = /%20/g;
  /** @type {RegExp} */
  var trimRight = /#.*$/;
  /** @type {RegExp} */
  var reParent = /([?&])_=[^&]*/;
  /** @type {RegExp} */
  var re = /^(.*?):[ \t]*([^\r\n]*)$/gm;
  /** @type {RegExp} */
  var getOrPostRegEx = /^(?:GET|HEAD)$/;
  /** @type {RegExp} */
  var path = /^\/\//;
  var prefilters = {};
  var transports = {};
  /** @type {string} */
  var zt = "*/".concat("*");
  var l = doc.createElement("a");
  l.href = a.href;
  jQuery.extend({
    active : 0,
    lastModified : {},
    etag : {},
    ajaxSettings : {
      url : a.href,
      type : "GET",
      isLocal : /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(a.protocol),
      global : true,
      processData : true,
      async : true,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      accepts : {
        "*" : zt,
        text : "text/plain",
        html : "text/html",
        xml : "application/xml, text/xml",
        json : "application/json, text/javascript"
      },
      contents : {
        xml : /\bxml\b/,
        html : /\bhtml/,
        json : /\bjson\b/
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
        /** @type {function (this:JSONType, string, function (string, *): *=): *} */
        "text json" : JSON.parse,
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
     * @param {Object} arg
     * @param {Object} opts
     * @return {?}
     */
    ajax : function(arg, opts) {
      /**
       * @param {number} status
       * @param {Node} nativeStatusText
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
        /** @type {Node} */
        var statusText = nativeStatusText;
        if (!raw) {
          /** @type {boolean} */
          raw = true;
          if (resizeId) {
            win.clearTimeout(resizeId);
          }
          transport = void 0;
          value = total || "";
          /** @type {number} */
          jqXHR.readyState = 0 < status ? 4 : 0;
          /** @type {boolean} */
          isSuccess = 200 <= status && status < 300 || 304 === status;
          if (responses) {
            response = function(s, jqXHR, responses) {
              var ct;
              var type;
              var finalDataType;
              var firstDataType;
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
              if (finalDataType) {
                return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType];
              }
            }(options, jqXHR, responses);
          }
          if (!isSuccess) {
            if (-1 < jQuery.inArray("script", options.dataTypes)) {
              if (jQuery.inArray("json", options.dataTypes) < 0) {
                /**
                 * @return {undefined}
                 */
                options.converters["text script"] = function() {
                };
              }
            }
          }
          response = function(s, response, jqXHR, isSuccess) {
            var type;
            var current;
            var conv;
            var m;
            var prev;
            var types = {};
            var parts = s.dataTypes.slice();
            if (parts[1]) {
              for (conv in s.converters) {
                types[conv.toLowerCase()] = s.converters[conv];
              }
            }
            current = parts.shift();
            for (;current;) {
              if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && (isSuccess && (s.dataFilter && (response = s.dataFilter(response, s.dataType)))), prev = current, current = parts.shift()) {
                if ("*" === current) {
                  current = prev;
                } else {
                  if ("*" !== prev && prev !== current) {
                    if (!(conv = types[prev + " " + current] || types["* " + current])) {
                      for (type in types) {
                        if ((m = type.split(" "))[1] === current && (conv = types[prev + " " + m[0]] || types["* " + m[0]])) {
                          if (true === conv) {
                            conv = types[type];
                          } else {
                            if (true !== types[type]) {
                              /** @type {string} */
                              current = m[0];
                              parts.unshift(m[1]);
                            }
                          }
                          break;
                        }
                      }
                    }
                    if (true !== conv) {
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
          }(options, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (options.ifModified) {
              if (modified = jqXHR.getResponseHeader("Last-Modified")) {
                jQuery.lastModified[url] = modified;
              }
              if (modified = jqXHR.getResponseHeader("etag")) {
                jQuery.etag[url] = modified;
              }
            }
            if (204 === status || "HEAD" === options.type) {
              /** @type {string} */
              statusText = "nocontent";
            } else {
              if (304 === status) {
                /** @type {string} */
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                /** @type {boolean} */
                isSuccess = !(error = response.error);
              }
            }
          } else {
            error = statusText;
            if (!(!status && statusText)) {
              /** @type {string} */
              statusText = "error";
              if (status < 0) {
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
            deferred.resolveWith(context, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(context, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (ajaxSend) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, options, isSuccess ? success : error]);
          }
          self.fireWith(context, [jqXHR, statusText]);
          if (ajaxSend) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, options]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
      }
      if ("object" == typeof arg) {
        /** @type {Object} */
        opts = arg;
        arg = void 0;
      }
      opts = opts || {};
      var transport;
      var url;
      var value;
      var fn;
      var resizeId;
      var params;
      var raw;
      var ajaxSend;
      var i;
      var port;
      var options = jQuery.ajaxSetup({}, opts);
      var context = options.context || options;
      var globalEventContext = options.context && (context.nodeType || context.jquery) ? jQuery(context) : jQuery.event;
      var deferred = jQuery.Deferred();
      var self = jQuery.Callbacks("once memory");
      var statusCode = options.statusCode || {};
      var requestHeaders = {};
      var requestHeadersNames = {};
      /** @type {string} */
      var strAbort = "canceled";
      var jqXHR = {
        readyState : 0,
        /**
         * @param {string} key
         * @return {?}
         */
        getResponseHeader : function(key) {
          var tmp;
          if (raw) {
            if (!fn) {
              fn = {};
              for (;tmp = re.exec(value);) {
                fn[tmp[1].toLowerCase() + " "] = (fn[tmp[1].toLowerCase() + " "] || []).concat(tmp[2]);
              }
            }
            tmp = fn[key.toLowerCase() + " "];
          }
          return null == tmp ? null : tmp.join(", ");
        },
        /**
         * @return {?}
         */
        getAllResponseHeaders : function() {
          return raw ? value : null;
        },
        /**
         * @param {string} name
         * @param {?} value
         * @return {?}
         */
        setRequestHeader : function(name, value) {
          return null == raw && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name, requestHeaders[name] = value), this;
        },
        /**
         * @param {?} type
         * @return {?}
         */
        overrideMimeType : function(type) {
          return null == raw && (options.mimeType = type), this;
        },
        /**
         * @param {Object} map
         * @return {?}
         */
        statusCode : function(map) {
          var letter;
          if (map) {
            if (raw) {
              jqXHR.always(map[jqXHR.status]);
            } else {
              for (letter in map) {
                /** @type {Array} */
                statusCode[letter] = [statusCode[letter], map[letter]];
              }
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
      if (deferred.promise(jqXHR), options.url = ((arg || (options.url || a.href)) + "").replace(path, a.protocol + "//"), options.type = opts.method || (opts.type || (options.method || options.type)), options.dataTypes = (options.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], null == options.crossDomain) {
        params = doc.createElement("a");
        try {
          /** @type {string} */
          params.href = options.url;
          /** @type {string} */
          params.href = params.href;
          /** @type {boolean} */
          options.crossDomain = l.protocol + "//" + l.host != params.protocol + "//" + params.host;
        } catch (e) {
          /** @type {boolean} */
          options.crossDomain = true;
        }
      }
      if (options.data && (options.processData && ("string" != typeof options.data && (options.data = jQuery.param(options.data, options.traditional)))), inspectPrefiltersOrTransports(prefilters, options, opts, jqXHR), raw) {
        return jqXHR;
      }
      for (i in(ajaxSend = jQuery.event && options.global) && (0 == jQuery.active++ && jQuery.event.trigger("ajaxStart")), options.type = options.type.toUpperCase(), options.hasContent = !getOrPostRegEx.test(options.type), url = options.url.replace(trimRight, ""), options.hasContent ? options.data && (options.processData && (0 === (options.contentType || "").indexOf("application/x-www-form-urlencoded") && (options.data = options.data.replace(rclass, "+")))) : (port = options.url.slice(url.length), 
      options.data && ((options.processData || "string" == typeof options.data) && (url += (rquery.test(url) ? "&" : "?") + options.data, delete options.data)), false === options.cache && (url = url.replace(reParent, "$1"), port = (rquery.test(url) ? "&" : "?") + "_=" + newFeedItem.guid++ + port), options.url = url + port), options.ifModified && (jQuery.lastModified[url] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[url]), jQuery.etag[url] && jqXHR.setRequestHeader("If-None-Match", 
      jQuery.etag[url])), (options.data && (options.hasContent && false !== options.contentType) || opts.contentType) && jqXHR.setRequestHeader("Content-Type", options.contentType), jqXHR.setRequestHeader("Accept", options.dataTypes[0] && options.accepts[options.dataTypes[0]] ? options.accepts[options.dataTypes[0]] + ("*" !== options.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : options.accepts["*"]), options.headers) {
        jqXHR.setRequestHeader(i, options.headers[i]);
      }
      if (options.beforeSend && (false === options.beforeSend.call(context, jqXHR, options) || raw)) {
        return jqXHR.abort();
      }
      if (strAbort = "abort", self.add(options.complete), jqXHR.done(options.success), jqXHR.fail(options.error), transport = inspectPrefiltersOrTransports(transports, options, opts, jqXHR)) {
        if (jqXHR.readyState = 1, ajaxSend && globalEventContext.trigger("ajaxSend", [jqXHR, options]), raw) {
          return jqXHR;
        }
        if (options.async) {
          if (0 < options.timeout) {
            resizeId = win.setTimeout(function() {
              jqXHR.abort("timeout");
            }, options.timeout);
          }
        }
        try {
          /** @type {boolean} */
          raw = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (raw) {
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
     * @param {Object} cur
     * @param {string} data
     * @param {boolean} callback
     * @return {?}
     */
    getJSON : function(cur, data, callback) {
      return jQuery.get(cur, data, callback, "json");
    },
    /**
     * @param {Object} cur
     * @param {boolean} callback
     * @return {?}
     */
    getScript : function(cur, callback) {
      return jQuery.get(cur, void 0, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(dataAndEvents, method) {
    /**
     * @param {string} value
     * @param {Object} params
     * @param {Function} success
     * @param {string} dataType
     * @return {?}
     */
    jQuery[method] = function(value, params, success, dataType) {
      return isFunction(params) && (dataType = dataType || success, success = params, params = void 0), jQuery.ajax(jQuery.extend({
        url : value,
        type : method,
        dataType : dataType,
        data : params,
        /** @type {Function} */
        success : success
      }, jQuery.isPlainObject(value) && value));
    };
  });
  jQuery.ajaxPrefilter(function(settings) {
    var name;
    for (name in settings.headers) {
      if ("content-type" === name.toLowerCase()) {
        settings.contentType = settings.headers[name] || "";
      }
    }
  });
  /**
   * @param {string} url
   * @param {?} values
   * @param {string} deepDataAndEvents
   * @return {?}
   */
  jQuery._evalUrl = function(url, values, deepDataAndEvents) {
    return jQuery.ajax({
      url : url,
      type : "GET",
      dataType : "script",
      cache : true,
      async : false,
      global : false,
      converters : {
        /**
         * @return {undefined}
         */
        "text script" : function() {
        }
      },
      /**
       * @param {?} data
       * @return {undefined}
       */
      dataFilter : function(data) {
        jQuery.globalEval(data, values, deepDataAndEvents);
      }
    });
  };
  jQuery.fn.extend({
    /**
     * @param {Function} html
     * @return {?}
     */
    wrapAll : function(html) {
      var wrap;
      return this[0] && (isFunction(html) && (html = html.call(this[0])), wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
        var elem = this;
        for (;elem.firstElementChild;) {
          elem = elem.firstElementChild;
        }
        return elem;
      }).append(this)), this;
    },
    /**
     * @param {Function} html
     * @return {?}
     */
    wrapInner : function(html) {
      return isFunction(html) ? this.each(function(i) {
        jQuery(this).wrapInner(html.call(this, i));
      }) : this.each(function() {
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
     * @param {Function} structure
     * @return {?}
     */
    wrap : function(structure) {
      var func = isFunction(structure);
      return this.each(function(index) {
        jQuery(this).wrapAll(func ? structure.call(this, index) : structure);
      });
    },
    /**
     * @param {Node} fn
     * @return {?}
     */
    unwrap : function(fn) {
      return this.parent(fn).not("body").each(function() {
        jQuery(this).replaceWith(this.childNodes);
      }), this;
    }
  });
  /**
   * @param {Object} a
   * @return {?}
   */
  jQuery.expr.pseudos.hidden = function(a) {
    return!jQuery.expr.pseudos.visible(a);
  };
  /**
   * @param {Element} node
   * @return {?}
   */
  jQuery.expr.pseudos.visible = function(node) {
    return!!(node.offsetWidth || (node.offsetHeight || node.getClientRects().length));
  };
  /**
   * @return {?}
   */
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new win.XMLHttpRequest;
    } catch (e) {
    }
  };
  var xhrSuccessStatus = {
    0 : 200,
    1223 : 204
  };
  var xhrSupported = jQuery.ajaxSettings.xhr();
  /** @type {boolean} */
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  /** @type {boolean} */
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback;
    var onerror;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return{
        /**
         * @param {Object} headers
         * @param {Function} complete
         * @return {undefined}
         */
        send : function(headers, complete) {
          var i;
          var xhr = options.xhr();
          if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          for (i in options.mimeType && (xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType)), options.crossDomain || (headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest")), headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          /**
           * @param {string} status
           * @return {?}
           */
          callback = function(status) {
            return function() {
              if (callback) {
                /** @type {null} */
                callback = onerror = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                if ("abort" === status) {
                  xhr.abort();
                } else {
                  if ("error" === status) {
                    if ("number" != typeof xhr.status) {
                      complete(0, "error");
                    } else {
                      complete(xhr.status, xhr.statusText);
                    }
                  } else {
                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                      binary : xhr.response
                    } : {
                      text : xhr.responseText
                    }, xhr.getAllResponseHeaders());
                  }
                }
              }
            };
          };
          xhr.onload = callback();
          onerror = xhr.onerror = xhr.ontimeout = callback("error");
          if (void 0 !== xhr.onabort) {
            xhr.onabort = onerror;
          } else {
            /**
             * @return {undefined}
             */
            xhr.onreadystatechange = function() {
              if (4 === xhr.readyState) {
                win.setTimeout(function() {
                  if (callback) {
                    onerror();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        /**
         * @return {undefined}
         */
        abort : function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain) {
      /** @type {boolean} */
      options.contents.script = false;
    }
  });
  jQuery.ajaxSetup({
    accepts : {
      script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents : {
      script : /\b(?:java|ecma)script\b/
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
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    var script;
    var callback;
    if (s.crossDomain || s.scriptAttrs) {
      return{
        /**
         * @param {?} _
         * @param {Function} complete
         * @return {undefined}
         */
        send : function(_, complete) {
          script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
            charset : s.scriptCharset,
            src : s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            /** @type {null} */
            callback = null;
            if (evt) {
              complete("error" === evt.type ? 404 : 200, evt.type);
            }
          });
          doc.head.appendChild(script[0]);
        },
        /**
         * @return {undefined}
         */
        abort : function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var parentEl;
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
      var unlock = eventPath.pop() || jQuery.expando + "_" + newFeedItem.guid++;
      return this[unlock] = true, unlock;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName;
    var func;
    var objects;
    /** @type {(boolean|string)} */
    var jsonProp = false !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && (0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (rjsonp.test(s.data) && "data")));
    if (jsonProp || "jsonp" === s.dataTypes[0]) {
      return callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : false !== s.jsonp && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
        return objects || jQuery.error(callbackName + " was not called"), objects[0];
      }, s.dataTypes[0] = "json", func = win[callbackName], win[callbackName] = function() {
        /** @type {Arguments} */
        objects = arguments;
      }, jqXHR.always(function() {
        if (void 0 === func) {
          jQuery(win).removeProp(callbackName);
        } else {
          win[callbackName] = func;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          eventPath.push(callbackName);
        }
        if (objects) {
          if (isFunction(func)) {
            func(objects[0]);
          }
        }
        objects = func = void 0;
      }), "script";
    }
  });
  /** @type {boolean} */
  support.createHTMLDocument = ((parentEl = doc.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === parentEl.childNodes.length);
  /**
   * @param {?} data
   * @param {Object} context
   * @param {Function} keepScripts
   * @return {?}
   */
  jQuery.parseHTML = function(data, context, keepScripts) {
    return "string" != typeof data ? [] : ("boolean" == typeof context && (keepScripts = context, context = false), context || (support.createHTMLDocument ? ((baseTag = (context = doc.implementation.createHTMLDocument("")).createElement("base")).href = doc.location.href, context.head.appendChild(baseTag)) : context = doc), scripts = !keepScripts && [], (parsed = rsingleTag.exec(data)) ? [context.createElement(parsed[1])] : (parsed = parse([data], context, scripts), scripts && (scripts.length && jQuery(scripts).remove()), 
    jQuery.merge([], parsed.childNodes)));
    var baseTag;
    var parsed;
    var scripts;
  };
  /**
   * @param {(Function|string)} source
   * @param {Object} data
   * @param {string} callback
   * @return {?}
   */
  jQuery.fn.load = function(source, data, callback) {
    var selector;
    var method;
    var args;
    var self = this;
    var n = source.indexOf(" ");
    return-1 < n && (selector = join(source.slice(n)), source = source.slice(0, n)), isFunction(data) ? (callback = data, data = void 0) : data && ("object" == typeof data && (method = "POST")), 0 < self.length && jQuery.ajax({
      url : source,
      type : method || "GET",
      dataType : "html",
      data : data
    }).done(function(responseText) {
      /** @type {Arguments} */
      args = arguments;
      self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
    }).always(callback && function(elem, dataAndEvents) {
      self.each(function() {
        callback.apply(this, args || [elem.responseText, dataAndEvents, elem]);
      });
    }), this;
  };
  /**
   * @param {number} elem
   * @return {?}
   */
  jQuery.expr.pseudos.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  jQuery.offset = {
    /**
     * @param {Object} elem
     * @param {Object} options
     * @param {?} i
     * @return {undefined}
     */
    setOffset : function(elem, options, i) {
      var result;
      var n;
      var curCSSTop;
      var curTop;
      var position;
      var curCSSLeft;
      var mode = jQuery.css(elem, "position");
      var curElem = jQuery(elem);
      var cur = {};
      if ("static" === mode) {
        /** @type {string} */
        elem.style.position = "relative";
      }
      position = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      if (("absolute" === mode || "fixed" === mode) && -1 < (curCSSTop + curCSSLeft).indexOf("auto")) {
        curTop = (result = curElem.position()).top;
        n = result.left;
      } else {
        /** @type {number} */
        curTop = parseFloat(curCSSTop) || 0;
        /** @type {number} */
        n = parseFloat(curCSSLeft) || 0;
      }
      if (isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, position));
      }
      if (null != options.top) {
        /** @type {number} */
        cur.top = options.top - position.top + curTop;
      }
      if (null != options.left) {
        /** @type {number} */
        cur.left = options.left - position.left + n;
      }
      if ("using" in options) {
        options.using.call(elem, cur);
      } else {
        curElem.css(cur);
      }
    }
  };
  jQuery.fn.extend({
    /**
     * @param {number} options
     * @return {?}
     */
    offset : function(options) {
      if (arguments.length) {
        return void 0 === options ? this : this.each(function(dataName) {
          jQuery.offset.setOffset(this, options, dataName);
        });
      }
      var box;
      var win;
      var node = this[0];
      return node ? node.getClientRects().length ? (box = node.getBoundingClientRect(), win = node.ownerDocument.defaultView, {
        top : box.top + win.pageYOffset,
        left : box.left + win.pageXOffset
      }) : {
        top : 0,
        left : 0
      } : void 0;
    },
    /**
     * @return {?}
     */
    position : function() {
      if (this[0]) {
        var el;
        var offset;
        var doc;
        var elem = this[0];
        var parentOffset = {
          top : 0,
          left : 0
        };
        if ("fixed" === jQuery.css(elem, "position")) {
          offset = elem.getBoundingClientRect();
        } else {
          offset = this.offset();
          doc = elem.ownerDocument;
          el = elem.offsetParent || doc.documentElement;
          for (;el && ((el === doc.body || el === doc.documentElement) && "static" === jQuery.css(el, "position"));) {
            el = el.parentNode;
          }
          if (el) {
            if (el !== elem) {
              if (1 === el.nodeType) {
                (parentOffset = jQuery(el).offset()).top += jQuery.css(el, "borderTopWidth", true);
                parentOffset.left += jQuery.css(el, "borderLeftWidth", true);
              }
            }
          }
        }
        return{
          top : offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
          left : offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
      }
    },
    /**
     * @return {?}
     */
    offsetParent : function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        for (;offsetParent && "static" === jQuery.css(offsetParent, "position");) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft : "pageXOffset",
    scrollTop : "pageYOffset"
  }, function(name, prop) {
    /** @type {boolean} */
    var top = "pageYOffset" === prop;
    /**
     * @param {Function} isXML
     * @return {?}
     */
    jQuery.fn[name] = function(isXML) {
      return access(this, function(elem, method, val) {
        var win;
        if (isWindow(elem) ? win = elem : 9 === elem.nodeType && (win = elem.defaultView), void 0 === val) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset);
        } else {
          /** @type {number} */
          elem[method] = val;
        }
      }, name, isXML, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(dataAndEvents, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, val) {
      if (val) {
        return val = css(elem, prop), rnumnonpx.test(val) ? jQuery(elem).position()[prop] + "px" : val;
      }
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
       * @param {(number|string)} margin
       * @param {boolean} dataAndEvents
       * @return {?}
       */
      jQuery.fn[original] = function(margin, dataAndEvents) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
        var value = defaultExtra || (true === margin || true === dataAndEvents ? "margin" : "border");
        return access(this, function(elem, prop, args) {
          var doc;
          return isWindow(elem) ? 0 === original.indexOf("outer") ? elem["inner" + name] : elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === args ? jQuery.css(elem, prop, value) : jQuery.style(elem, prop, args, value);
        }, type, chainable ? margin : void 0, chainable);
      };
    });
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(dataAndEvents, name) {
    /**
     * @param {Function} selector
     * @return {?}
     */
    jQuery.fn[name] = function(selector) {
      return this.on(name, selector);
    };
  });
  jQuery.fn.extend({
    /**
     * @param {string} name
     * @param {Object} one
     * @param {Object} fn
     * @return {?}
     */
    bind : function(name, one, fn) {
      return this.on(name, null, one, fn);
    },
    /**
     * @param {Object} types
     * @param {Function} fn
     * @return {?}
     */
    unbind : function(types, fn) {
      return this.off(types, null, fn);
    },
    /**
     * @param {Function} selector
     * @param {string} ev
     * @param {Object} data
     * @param {Object} fn
     * @return {?}
     */
    delegate : function(selector, ev, data, fn) {
      return this.on(ev, selector, data, fn);
    },
    /**
     * @param {string} selector
     * @param {Object} types
     * @param {Function} fn
     * @return {?}
     */
    undelegate : function(selector, types, fn) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    /**
     * @param {Function} selector
     * @param {string} context
     * @return {?}
     */
    hover : function(selector, context) {
      return this.on("mouseenter", selector).on("mouseleave", context || selector);
    }
  });
  jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(dataAndEvents, name) {
    /**
     * @param {Object} one
     * @param {Object} fn
     * @return {?}
     */
    jQuery.fn[name] = function(one, fn) {
      return 0 < arguments.length ? this.on(name, null, one, fn) : this.trigger(name);
    };
  });
  /** @type {RegExp} */
  var badChars = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  /**
   * @param {Object} fn
   * @param {Object} context
   * @return {?}
   */
  jQuery.proxy = function(fn, context) {
    var tmp;
    var args;
    var proxy;
    if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), isFunction(fn)) {
      return args = slice.call(arguments, 2), (proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      }).guid = fn.guid = fn.guid || jQuery.guid++, proxy;
    }
  };
  /**
   * @param {?} hold
   * @return {undefined}
   */
  jQuery.holdReady = function(hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };
  /** @type {function (*): boolean} */
  jQuery.isArray = Array.isArray;
  /** @type {function (this:JSONType, string, function (string, *): *=): *} */
  jQuery.parseJSON = JSON.parse;
  /** @type {function (Object, string): ?} */
  jQuery.nodeName = callback;
  /** @type {function (Object): ?} */
  jQuery.isFunction = isFunction;
  /** @type {function (Object): ?} */
  jQuery.isWindow = isWindow;
  /** @type {function (string): ?} */
  jQuery.camelCase = camelCase;
  /** @type {function (string): ?} */
  jQuery.type = type;
  /** @type {function (): number} */
  jQuery.now = Date.now;
  /**
   * @param {string} obj
   * @return {?}
   */
  jQuery.isNumeric = function(obj) {
    var type = jQuery.type(obj);
    return("number" === type || "string" === type) && !isNaN(obj - parseFloat(obj));
  };
  /**
   * @param {(number|string)} s
   * @return {?}
   */
  jQuery.trim = function(s) {
    return null == s ? "" : (s + "").replace(badChars, "$1");
  };
  if ("function" == typeof define) {
    if (define.amd) {
      define("jquery", [], function() {
        return jQuery;
      });
    }
  }
  var _jQuery = win.jQuery;
  var _$ = win.$;
  return jQuery.noConflict = function(deep) {
    return win.$ === jQuery && (win.$ = _$), deep && (win.jQuery === jQuery && (win.jQuery = _jQuery)), jQuery;
  }, "undefined" == typeof dataAndEvents && (win.jQuery = win.$ = jQuery), jQuery;
});

