!function(c) {
    "use strict";
    c("#vertical-menu-btn").on("click", function(e) {
        e.preventDefault(),
        c("body").toggleClass("sidebar-enable"),
        992 <= c(window).width() ? c("body").toggleClass("vertical-collpsed") : c("body").removeClass("vertical-collpsed")
    }),
    c("#sidebar-menu a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        this.href == e && (c(this).addClass("active"),
        c(this).parent().addClass("mm-active"),
        c(this).parent().parent().addClass("mm-show"),
        c(this).parent().parent().prev().addClass("mm-active"),
        c(this).parent().parent().parent().addClass("mm-active"),
        c(this).parent().parent().parent().parent().addClass("mm-show"),
        c(this).parent().parent().parent().parent().parent().addClass("mm-active"))
    }),
    c(document).ready(function() {
        var e;
        0 < c("#sidebar-menu").length && 0 < c("#sidebar-menu .mm-active .active").length && (300 < (e = c("#sidebar-menu .mm-active .active").offset().top) && (e -= 300,
        c(".vertical-menu .simplebar-content-wrapper").animate({
            scrollTop: e
        }, "slow")))
    }),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
        return new bootstrap.Tooltip(e)
    }),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
        return new bootstrap.Popover(e)
    }),
    [].slice.call(document.querySelectorAll(".offcanvas")).map(function(e) {
        return new bootstrap.Offcanvas(e)
    }),
    c("#checkAll").on("change", function() {
        c(".table-check .form-check-input").prop("checked", c(this).prop("checked"))
    }),
    c(".table-check .form-check-input").change(function() {
        c(".table-check .form-check-input:checked").length == c(".table-check .form-check-input").length ? c("#checkAll").prop("checked", !0) : c("#checkAll").prop("checked", !1)
    }),
    c("img.json-minus, img.json-plus").click(function() {
        var e = c(this)
          , t = e.attr("collapseId")
          , a = c(".json-collapse-" + t);
        a.is(":visible") ? (c(e).attr("src", `${_appVersion}/images/plus.gif`),
        a.hide()) : (c(e).attr("src", `/${_appVersion}/images/minus.gif`),
        a.show())
    })
}(jQuery);
function __expandAll() {
    console.log('expanding all!!!');
    $('.js-json-output :hidden').show();
    $('.js-json-output img').each(function(i, el) {
        const src = $(el).attr('src');
        $(el).attr('src', src.replaceAll('plus.gif', 'minus.gif'));
    });
}
/*!
* clipboard.js v1.5.10
* https://zenorocha.github.io/clipboard.js
*
* Licensed MIT © Zeno Rocha
*/
!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        e.Clipboard = t()
    }
}(function() {
    var t, e, n;
    return function t(e, n, o) {
        function i(c, a) {
            if (!n[c]) {
                if (!e[c]) {
                    var s = "function" == typeof require && require;
                    if (!a && s)
                        return s(c, !0);
                    if (r)
                        return r(c, !0);
                    var l = new Error("Cannot find module '" + c + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var u = n[c] = {
                    exports: {}
                };
                e[c][0].call(u.exports, function(t) {
                    var n = e[c][1][t];
                    return i(n ? n : t)
                }, u, u.exports, t, e, n, o)
            }
            return n[c].exports
        }
        for (var r = "function" == typeof require && require, c = 0; c < o.length; c++)
            i(o[c]);
        return i
    }({
        1: [function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document; ) {
                    if (o(i, e))
                        return i;
                    i = i.parentNode
                }
            }
        }
        , {
            "matches-selector": 5
        }],
        2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var c = i.apply(this, arguments);
                return t.addEventListener(n, c, r),
                {
                    destroy: function() {
                        t.removeEventListener(n, c, r)
                    }
                }
            }
            function i(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, e, !0),
                    n.delegateTarget && o.call(t, n)
                }
            }
            var r = t("closest");
            e.exports = o
        }
        , {
            closest: 1
        }],
        3: [function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }
            ,
            n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length"in t && (0 === t.length || n.node(t[0]))
            }
            ,
            n.string = function(t) {
                return "string" == typeof t || t instanceof String
            }
            ,
            n.fn = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e
            }
        }
        , {}],
        4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n)
                    throw new Error("Missing required arguments");
                if (!a.string(e))
                    throw new TypeError("Second argument must be a String");
                if (!a.fn(n))
                    throw new TypeError("Third argument must be a Function");
                if (a.node(t))
                    return i(t, e, n);
                if (a.nodeList(t))
                    return r(t, e, n);
                if (a.string(t))
                    return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }
            function i(t, e, n) {
                return t.addEventListener(e, n),
                {
                    destroy: function() {
                        t.removeEventListener(e, n)
                    }
                }
            }
            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n)
                }),
                {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }
            function c(t, e, n) {
                return s(document.body, t, e, n)
            }
            var a = t("./is")
              , s = t("delegate");
            e.exports = o
        }
        , {
            "./is": 3,
            delegate: 2
        }],
        5: [function(t, e, n) {
            function o(t, e) {
                if (r)
                    return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o)
                    if (n[o] == t)
                        return !0;
                return !1
            }
            var i = Element.prototype
              , r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o
        }
        , {}],
        6: [function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName)
                    t.focus(),
                    t.setSelectionRange(0, t.value.length),
                    e = t.value;
                else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection()
                      , o = document.createRange();
                    o.selectNodeContents(t),
                    n.removeAllRanges(),
                    n.addRange(o),
                    e = n.toString()
                }
                return e
            }
            e.exports = o
        }
        , {}],
        7: [function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }),
                    this
                },
                once: function(t, e, n) {
                    function o() {
                        i.off(t, o),
                        e.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = e,
                    this.on(t, o, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1)
                      , n = ((this.e || (this.e = {}))[t] || []).slice()
                      , o = 0
                      , i = n.length;
                    for (o; i > o; o++)
                        n[o].fn.apply(n[o].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {})
                      , o = n[t]
                      , i = [];
                    if (o && e)
                        for (var r = 0, c = o.length; c > r; r++)
                            o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t],
                    this
                }
            },
            e.exports = o
        }
        , {}],
        8: [function(e, n, o) {
            !function(i, r) {
                if ("function" == typeof t && t.amd)
                    t(["module", "select"], r);
                else if ("undefined" != typeof o)
                    r(n, e("select"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.select),
                    i.clipboardAction = c.exports
                }
            }(this, function(t, e) {
                "use strict";
                function n(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                function o(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = n(e)
                  , r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
                }
                  , c = function() {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(t, o.key, o)
                        }
                    }
                    return function(e, n, o) {
                        return n && t(e.prototype, n),
                        o && t(e, o),
                        e
                    }
                }()
                  , a = function() {
                    function t(e) {
                        o(this, t),
                        this.resolveOptions(e),
                        this.initSelection()
                    }
                    return t.prototype.resolveOptions = function t() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = e.action,
                        this.emitter = e.emitter,
                        this.target = e.target,
                        this.text = e.text,
                        this.trigger = e.trigger,
                        this.selectedText = ""
                    }
                    ,
                    t.prototype.initSelection = function t() {
                        this.text ? this.selectFake() : this.target && this.selectTarget()
                    }
                    ,
                    t.prototype.selectFake = function t() {
                        var e = this
                          , n = "rtl" == document.documentElement.getAttribute("dir");
                        this.removeFake(),
                        this.fakeHandler = document.body.addEventListener("click", function() {
                            return e.removeFake()
                        }),
                        this.fakeElem = document.createElement("textarea"),
                        this.fakeElem.style.fontSize = "12pt",
                        this.fakeElem.style.border = "0",
                        this.fakeElem.style.padding = "0",
                        this.fakeElem.style.margin = "0",
                        this.fakeElem.style.position = "fixed",
                        this.fakeElem.style[n ? "right" : "left"] = "-9999px",
                        this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px",
                        this.fakeElem.setAttribute("readonly", ""),
                        this.fakeElem.value = this.text,
                        document.body.appendChild(this.fakeElem),
                        this.selectedText = (0,
                        i.default)(this.fakeElem),
                        this.copyText()
                    }
                    ,
                    t.prototype.removeFake = function t() {
                        this.fakeHandler && (document.body.removeEventListener("click"),
                        this.fakeHandler = null),
                        this.fakeElem && (document.body.removeChild(this.fakeElem),
                        this.fakeElem = null)
                    }
                    ,
                    t.prototype.selectTarget = function t() {
                        this.selectedText = (0,
                        i.default)(this.target),
                        this.copyText()
                    }
                    ,
                    t.prototype.copyText = function t() {
                        var e = void 0;
                        try {
                            e = document.execCommand(this.action)
                        } catch (n) {
                            e = !1
                        }
                        this.handleResult(e)
                    }
                    ,
                    t.prototype.handleResult = function t(e) {
                        e ? this.emitter.emit("success", {
                            action: this.action,
                            text: this.selectedText,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        }) : this.emitter.emit("error", {
                            action: this.action,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        })
                    }
                    ,
                    t.prototype.clearSelection = function t() {
                        this.target && this.target.blur(),
                        window.getSelection().removeAllRanges()
                    }
                    ,
                    t.prototype.destroy = function t() {
                        this.removeFake()
                    }
                    ,
                    c(t, [{
                        key: "action",
                        set: function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                            if (this._action = e,
                            "copy" !== this._action && "cut" !== this._action)
                                throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function t() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function t(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e)) || 1 !== e.nodeType)
                                    throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled"))
                                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled")))
                                    throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        },
                        get: function t() {
                            return this._target
                        }
                    }]),
                    t
                }();
                t.exports = a
            })
        }
        , {
            select: 6
        }],
        9: [function(e, n, o) {
            !function(i, r) {
                if ("function" == typeof t && t.amd)
                    t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o)
                    r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.clipboardAction, i.tinyEmitter, i.goodListener),
                    i.clipboard = c.exports
                }
            }(this, function(t, e, n, o) {
                "use strict";
                function i(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }
                function r(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                function c(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }
                function a(t, e) {
                    if ("function" != typeof e && null !== e)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                function s(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n))
                        return e.getAttribute(n)
                }
                var l = i(e)
                  , u = i(n)
                  , f = i(o)
                  , d = function(t) {
                    function e(n, o) {
                        r(this, e);
                        var i = c(this, t.call(this));
                        return i.resolveOptions(o),
                        i.listenClick(n),
                        i
                    }
                    return a(e, t),
                    e.prototype.resolveOptions = function t() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction,
                        this.target = "function" == typeof e.target ? e.target : this.defaultTarget,
                        this.text = "function" == typeof e.text ? e.text : this.defaultText
                    }
                    ,
                    e.prototype.listenClick = function t(e) {
                        var n = this;
                        this.listener = (0,
                        f.default)(e, "click", function(t) {
                            return n.onClick(t)
                        })
                    }
                    ,
                    e.prototype.onClick = function t(e) {
                        var n = e.delegateTarget || e.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null),
                        this.clipboardAction = new l.default({
                            action: this.action(n),
                            target: this.target(n),
                            text: this.text(n),
                            trigger: n,
                            emitter: this
                        })
                    }
                    ,
                    e.prototype.defaultAction = function t(e) {
                        __expandAll();
                        return s("action", e)
                    }
                    ,
                    e.prototype.defaultTarget = function t(e) {
                        var n = s("target", e);
                        return n ? document.querySelector(n) : void 0
                    }
                    ,
                    e.prototype.defaultText = function t(e) {
                        return s("text", e)
                    }
                    ,
                    e.prototype.destroy = function t() {
                        this.listener.destroy(),
                        this.clipboardAction && (this.clipboardAction.destroy(),
                        this.clipboardAction = null)
                    }
                    ,
                    e
                }(u.default);
                t.exports = d
            })
        }
        , {
            "./clipboard-action": 8,
            "good-listener": 4,
            "tiny-emitter": 7
        }]
    }, {}, [9])(9)
});
new Clipboard('#copyToClipboard');
/*!
* The MIT License
*
* Copyright © 2016 Eli Grey.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(a, b) {
    if ("function" == typeof define && define.amd)
        define([], b);
    else if ("undefined" != typeof exports)
        b();
    else {
        b(),
        a.FileSaver = {
            exports: {}
        }.exports
    }
}
)(this, function() {
    "use strict";
    function b(a, b) {
        return "undefined" == typeof b ? b = {
            autoBom: !1
        } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"),
        b = {
            autoBom: !b
        }),
        b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a],{
            type: a.type
        }) : a
    }
    function c(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a),
        d.responseType = "blob",
        d.onload = function() {
            g(d.response, b, c)
        }
        ,
        d.onerror = function() {
            console.error("could not download file")
        }
        ,
        d.send()
    }
    function d(a) {
        var b = new XMLHttpRequest;
        b.open("HEAD", a, !1);
        try {
            b.send()
        } catch (a) {}
        return 200 <= b.status && 299 >= b.status
    }
    function e(a) {
        try {
            a.dispatchEvent(new MouseEvent("click"))
        } catch (c) {
            var b = document.createEvent("MouseEvents");
            b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null),
            a.dispatchEvent(b)
        }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0
      , a = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)
      , g = f.saveAs || ("object" != typeof window || window !== f ? function() {}
    : "download"in HTMLAnchorElement.prototype && !a ? function(b, g, h) {
        var i = f.URL || f.webkitURL
          , j = document.createElement("a");
        g = g || b.name || "download",
        j.download = g,
        j.rel = "noopener",
        "string" == typeof b ? (j.href = b,
        j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b),
        setTimeout(function() {
            i.revokeObjectURL(j.href)
        }, 4E4),
        setTimeout(function() {
            e(j)
        }, 0))
    }
    : "msSaveOrOpenBlob"in navigator ? function(f, g, h) {
        if (g = g || f.name || "download",
        "string" != typeof f)
            navigator.msSaveOrOpenBlob(b(f, h), g);
        else if (d(f))
            c(f, g, h);
        else {
            var i = document.createElement("a");
            i.href = f,
            i.target = "_blank",
            setTimeout(function() {
                e(i)
            })
        }
    }
    : function(b, d, e, g) {
        if (g = g || open("", "_blank"),
        g && (g.document.title = g.document.body.innerText = "downloading..."),
        "string" == typeof b)
            return c(b, d, e);
        var h = "application/octet-stream" === b.type
          , i = /constructor/i.test(f.HTMLElement) || f.safari
          , j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
            var k = new FileReader;
            k.onloadend = function() {
                var a = k.result;
                a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"),
                g ? g.location.href = a : location = a,
                g = null
            }
            ,
            k.readAsDataURL(b)
        } else {
            var l = f.URL || f.webkitURL
              , m = l.createObjectURL(b);
            g ? g.location = m : location.href = m,
            g = null,
            setTimeout(function() {
                l.revokeObjectURL(m)
            }, 4E4)
        }
    }
    );
    f.saveAs = g.saveAs = g,
    "undefined" != typeof module && (module.exports = g)
});
jQuery.extend({
    __stringPrototype: {
        JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
        ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
        specialChar: {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\\': '\\\\'
        },
        blank: function(s) {
            return /^\s*$/.test(this.s(s) || ' ');
        },
        camelize: function(s) {
            var a = this.s(s).split('-'), i;
            s = [a[0]];
            for (i = 1; i < a.length; i++) {
                s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
            }
            s = s.join('');
            return this.r(arguments, 0, s);
        },
        capitalize: function(s) {
            s = this.s(s);
            s = s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
            return this.r(arguments, 0, s);
        },
        dasherize: function(s) {
            s = this.s(s).split('_').join('-');
            return this.r(arguments, 0, s);
        },
        empty: function(s) {
            return this.s(s) === '';
        },
        endsWith: function(pattern, s) {
            s = this.s(s);
            var d = s.length - pattern.length;
            return d >= 0 && s.lastIndexOf(pattern) === d;
        },
        escapeHTML: function(s) {
            s = this.s(s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return this.r(arguments, 0, s);
        },
        evalJSON: function(sanitize, s) {
            s = this.s(s);
            var json = this.unfilterJSON(false, s);
            try {
                if (!sanitize || this.isJSON(json)) {
                    return eval('(' + json + ')');
                }
            } catch (e) {}
            throw new SyntaxError('Badly formed JSON string: ' + s);
        },
        evalScripts: function(s) {
            var scriptTags = this.extractScripts(this.s(s))
              , results = [];
            if (scriptTags.length > 0) {
                for (var i = 0; i < scriptTags.length; i++) {
                    results.push(eval(scriptTags[i]));
                }
            }
            return results;
        },
        extractScripts: function(s) {
            var matchAll = new RegExp(this.ScriptFragment,'img')
              , matchOne = new RegExp(this.ScriptFragment,'im')
              , scriptMatches = this.s(s).match(matchAll) || []
              , scriptTags = [];
            if (scriptMatches.length > 0) {
                for (var i = 0; i < scriptMatches.length; i++) {
                    scriptTags.push(scriptMatches[i].match(matchOne)[1] || '');
                }
            }
            return scriptTags;
        },
        gsub: function(pattern, replacement, s) {
            s = this.s(s);
            if (jQuery.isFunction(replacement)) {
                s = this.sub(pattern, replacement, -1, s);
            } else {
                s = s.split(pattern).join(replacement);
            }
            return this.r(arguments, 2, s);
        },
        include: function(pattern, s) {
            return this.s(s).indexOf(pattern) > -1;
        },
        inspect: function(useDoubleQuotes, s) {
            s = this.s(s);
            var escapedString;
            try {
                escapedString = this.sub(/[\x00-\x1f\\]/, function(match) {
                    var character = jQuery.__stringPrototype.specialChar[match[0]];
                    return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
                }, -1, s);
            } catch (e) {
                escapedString = s;
            }
            s = (useDoubleQuotes) ? '"' + escapedString.replace(/"/g, '\\"') + '"' : "'" + escapedString.replace(/'/g, '\\\'') + "'";
            return this.r(arguments, 1, s);
        },
        interpolate: function(obj, pattern, s) {
            s = this.s(s);
            if (!pattern) {
                pattern = /(\#\{\s*(\w+)\s*\})/;
            }
            var gpattern = new RegExp(pattern.source,"g");
            var matches = s.match(gpattern), i;
            for (i = 0; i < matches.length; i++) {
                s = s.replace(matches[i], obj[matches[i].match(pattern)[2]]);
            }
            return this.r(arguments, 2, s);
        },
        isJSON: function(s) {
            s = this.s(s);
            if (this.blank(s)) {
                return false;
            }
            s = s.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
            return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(s);
        },
        scan: function(pattern, replacement, s) {
            s = this.s(s);
            this.sub(pattern, replacement, -1, s);
            return this.r(arguments, 2, s);
        },
        startsWith: function(pattern, s) {
            return this.s(s).indexOf(pattern) === 0;
        },
        strip: function(s) {
            s = jQuery.trim(this.s(s));
            return this.r(arguments, 0, s);
        },
        stripScripts: function(s) {
            s = this.s(s).replace(new RegExp(this.ScriptFragment,'img'), '');
            return this.r(arguments, 0, s);
        },
        stripTags: function(s) {
            s = this.s(s).replace(/<\/?[^>]+>/gi, '');
            return this.r(arguments, 0, s);
        },
        sub: function(pattern, replacement, count, s) {
            s = this.s(s);
            if (pattern.source && !pattern.global) {
                var patternMods = (pattern.ignoreCase) ? "ig" : "g";
                patternMods += (pattern.multiline) ? "m" : "";
                pattern = new RegExp(pattern.source,patternMods);
            }
            var sarray = s.split(pattern)
              , matches = s.match(pattern);
            if (jQuery.browser.msie) {
                if (s.indexOf(matches[0]) == 0)
                    sarray.unshift("");
                if (s.lastIndexOf(matches[matches.length - 1]) == s.length - matches[matches.length - 1].length)
                    sarray.push("");
            }
            count = (count < 0) ? (sarray.length - 1) : count || 1;
            s = sarray[0];
            for (var i = 1; i < sarray.length; i++) {
                if (i <= count) {
                    if (jQuery.isFunction(replacement)) {
                        s += replacement(matches[i - 1] || matches) + sarray[i];
                    } else {
                        s += replacement + sarray[i];
                    }
                } else {
                    s += (matches[i - 1] || matches) + sarray[i];
                }
            }
            return this.r(arguments, 3, s);
        },
        succ: function(s) {
            s = this.s(s);
            s = s.slice(0, s.length - 1) + String.fromCharCode(s.charCodeAt(s.length - 1) + 1);
            return this.r(arguments, 0, s);
        },
        times: function(count, s) {
            s = this.s(s);
            var newS = "";
            for (var i = 0; i < count; i++) {
                newS += s;
            }
            return this.r(arguments, 1, newS);
        },
        toJSON: function(s) {
            return this.r(arguments, 0, this.inspect(true, this.s(s)));
        },
        toQueryParams: function(separator, s) {
            s = this.s(s);
            var paramsList = s.substring(s.indexOf('?') + 1).split('#')[0].split(separator || '&'), params = {}, i, key, value, pair;
            for (i = 0; i < paramsList.length; i++) {
                pair = paramsList[i].split('=');
                key = decodeURIComponent(pair[0]);
                value = (pair[1]) ? decodeURIComponent(pair[1]) : undefined;
                if (params[key]) {
                    if (typeof params[key] == "string") {
                        params[key] = [params[key]];
                    }
                    params[key].push(value);
                } else {
                    params[key] = value;
                }
            }
            return params;
        },
        truncate: function(length, truncation, s) {
            s = this.s(s);
            length = length || 30;
            truncation = (!truncation) ? '...' : truncation;
            s = (s.length > length) ? s.slice(0, length - truncation.length) + truncation : String(s);
            return this.r(arguments, 2, s);
        },
        underscore: function(s) {
            s = this.sub(/[A-Z]/, function(c) {
                return "_" + c.toLowerCase();
            }, -1, this.s(s));
            if (s.charAt(0) == "_")
                s = s.substring(1);
            return this.r(arguments, 0, s);
        },
        unescapeHTML: function(s) {
            s = this.stripTags(this.s(s)).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return this.r(arguments, 0, s);
        },
        unfilterJSON: function(filter, s) {
            s = this.s(s);
            filter = filter || this.JSONFilter;
            var filtered = s.match(filter);
            s = (filtered !== null) ? filtered[1] : s;
            return this.r(arguments, 1, jQuery.trim(s));
        },
        r: function(args, size, s) {
            if (args.length > size || this.str === undefined) {
                return s;
            } else {
                this.str = '' + s;
                return this;
            }
            ;
        },
        s: function(s) {
            if (s === '' || s) {
                return s;
            }
            if (this.str === '' || this.str) {
                return this.str;
            }
            return this;
        }
    },
    string: function(str) {
        if (str === String.prototype) {
            jQuery.extend(String.prototype, jQuery.__stringPrototype);
        } else {
            return jQuery.extend({
                str: str
            }, jQuery.__stringPrototype);
        }
    }
});
jQuery.__stringPrototype.parseQuery = jQuery.__stringPrototype.toQueryParams;
const FF = {
    assertFileSize: selector=>{
        const $upload = $(selector);
        if ($upload.length && $upload.prop('files') && $upload.prop('files').length) {
            const file = $upload.prop('files')[0];
            if (file.size > 2 * 1024 * 1024) {
                FF.notifications('Selected file is over 2 megabytes', 'danger');
                return false;
            }
        }
        return true;
    }
    ,
    notifications: (message,level)=>{
        const html = `<div class="alert alert-${level} alert-dismissible fade show mb-3" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        const $notifications = $('#notifications');
        $notifications.html(html);
        $notifications[0].scrollIntoView();
    }
};
$(document).on('click', 'button.btn-close', function() {
    $(this).parent('div.alert').remove();
});
(function($) {
    $.isBlank = function(obj) {
        return (!obj || $.trim(obj) === "");
    }
    ;
}
)(jQuery);
$(function() {
    const $search = $('#searchbar');
    $search.on('input', function() {
        const searchText = $search.val().toUpperCase();
        console.log(searchText);
        $('#sidebar-menu a').each(function() {
            const textValue = this.innerText.toUpperCase();
            console.log(textValue);
            if (searchText === '' || textValue.toUpperCase().indexOf(searchText) > -1) {
                $(this).removeClass('d-none');
            } else {
                $(this).addClass('d-none');
            }
        });
    });
});