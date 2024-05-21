!function(e, t, n, a) {
    function r(e) {
        for (var t, n, a = [], r = 0, o = e.length, i = 0; r < o; )
            if ((t = e[r++]) <= 127)
                a.push(String.fromCharCode(t));
            else {
                if (t > 191 && t <= 223)
                    n = 31 & t,
                    i = 1;
                else if (t <= 239)
                    n = 15 & t,
                    i = 2;
                else {
                    if (!(t <= 247))
                        throw new Error(x);
                    n = 7 & t,
                    i = 3
                }
                for (var c = 0; c < i; ++c) {
                    if ((t = e[r++]) < 128 || t > 191)
                        throw new Error(x);
                    n <<= 6,
                    n += 63 & t
                }
                if (n >= 55296 && n <= 57343)
                    throw new Error(x);
                if (n > 1114111)
                    throw new Error(x);
                n <= 65535 ? a.push(String.fromCharCode(n)) : (n -= 65536,
                a.push(String.fromCharCode(55296 + (n >> 10)), String.fromCharCode(56320 + (1023 & n))))
            }
        return a.join("")
    }
    function o(e) {
        var t = {
            status: 0,
            load: function(n) {
                t.status || (t.status = 1,
                c({
                    src: e,
                    onload: function() {
                        t.status = 2,
                        n && setTimeout(n)
                    }
                }))
            }
        };
        return t
    }
    function c(e) {
        var t = n.createElement("script");
        t.async = !0,
        t.src = e.src,
        t.onload = e.onload,
        n.body.appendChild(t)
    }
    function d() {
        for (var e = 0; e < delayScripts.length; ++e)
            !function(e) {
                setTimeout(function() {
                    e.src ? c(e) : e.onload && e.onload()
                }, e.delay || 0)
            }(delayScripts[e])
    }
    function u(e, t) {
        return "hex" === e ? hexToBytes(t) : "base64" === e ? base64.decode.bytes(t) : "utf-8" !== e ? new TextEncoding.TextEncoder(e,{
            NONSTANDARD_allowLegacyEncoding: !0
        }).encode(t) : t
    }
    function h(e, n) {
        if ("hex" === e)
            return bytesToHex(n);
        if ("base64" === e)
            return base64.encode(n);
        if (t.Uint8Array)
            return new (t.TextDecoder || TextEncoding.TextDecoder)(e).decode(new Uint8Array(n));
        if ("utf-8" === e)
            return r(n);
        throw new Error("Browser is not suppored.")
    }
    function l(e, t) {
        return "hex" === e ? t : "base64" === e ? base64.encode(hexToBytes(t)) : void 0
    }
    function s(e, t) {
        return f(e.val(), t, u)
    }
    function p(e, t, n) {
        !1 !== (t = f(t, n, "hex" === n.data("type") ? l : h)) && e.val(t)
    }
    function f(e, t, n) {
        if (t.length) {
            var a = t.find("option:selected").data("load-encoding");
            return !!loadEncodingLevel(a) && n(t.val(), e)
        }
        return e
    }
    function v(e, t) {
        t = t || 64;
        var n = function(n) {
            "string" == typeof n && (n = utf8ToBytes(n)),
            n.length > t && (n = e.array ? e.array(n) : hexToBytes(e(n)));
            var a = []
              , r = [];
            for (i = 0; i < t; ++i) {
                var o = n[i] || 0;
                a[i] = 92 ^ o,
                r[i] = 54 ^ o
            }
            var c = this;
            this.current = e.update(r),
            this.update = function(e) {
                return c.current.update(e),
                c
            }
            ,
            this.hex = function() {
                var t = c.current.array ? c.current.array() : hexToBytes(c.current.hex());
                return e.update(a).update(t).hex()
            }
        };
        e.hmac = function(e, t) {
            return new n(e).update(t).hex()
        }
        ,
        e.hmac.update = function(e, t) {
            return new n(e).update(t)
        }
    }
    function m(a, r) {
        var o = e("#remember-input")
          , i = e("[data-remember]")
          , c = localStorage.getItem(k);
        return a || r || !c || (o.prop("checked", !0),
        i.each(function() {
            var t = localStorage.getItem(k + "_" + e(this).data("remember"));
            t && ("checkbox" === this.type ? e(this).prop("checked", !0) : e(this).val(t))
        })),
        o.bind("change", function() {
            o.prop("checked") ? (c = !0,
            localStorage.setItem(k, "1"),
            i.trigger("input"),
            r && (r = !1,
            t.history.pushState({}, n.title, location.pathname))) : (c = !1,
            localStorage.removeItem(k),
            i.each(function() {
                localStorage.removeItem(k + "_" + e(this).data("remember"))
            }))
        }),
        i.bind("input", function() {
            if (c) {
                var t = k + "_" + e(this).data("remember");
                "checkbox" === this.type ? e(this).prop("checked") ? localStorage.setItem(t, 1) : localStorage.removeItem(t) : localStorage.setItem(t, e(this).val())
            }
        }),
        i.length || o.closest(".option-block").hide(),
        c
    }
    function g() {
        var t = e("#share-link")
          , n = {};
        if (t.length) {
            for (var a = location.search.substring(1), r = a.split("&"), o = 0; o < r.length; ++o) {
                var i = r[o].split("=");
                n[i[0]] = decodeURIComponent(i[1])
            }
            var c = !1;
            return e("[data-share]").each(function() {
                var t = e(this).data("share")
                  , a = n[t];
                if (a) {
                    if (a = a,
                    "SELECT" === this.tagName) {
                        var r = {};
                        e(this).find("option").toArray().map(function(e) {
                            r[e.value] = !0
                        }),
                        r[a] && e(this).val(a)
                    } else
                        "checkbox" === this.type ? e(this).prop("checked", !0) : e(this).val(a);
                    c = !0
                }
            }),
            c
        }
    }
    function y() {
        var t = localStorage.getItem("SWAP") || "{}";
        localStorage.removeItem("SWAP");
        try {
            t = JSON.parse(t)
        } catch (e) {
            return !1
        }
        for (var n = Object.keys(t), a = 0; a < n.length; ++a) {
            var r = n[a]
              , o = e(r);
            o.length && ("checkbox" === o[0].type ? o.prop("checked", !0) : o.val(t[r]))
        }
        return n.length
    }
    function b() {
        var t = e("#share-link");
        if (t.length) {
            var n = [];
            e("[data-share]").each(function() {
                var t = e(this).data("share")
                  , a = "";
                (a = "checkbox" === this.type ? e(this).prop("checked") ? "1" : "" : e(this).val()) && n.push(t + "=" + encodeURIComponent(a))
            });
            var a = "";
            n.length && (a = location.origin + location.pathname + "?" + n.join("&")),
            t.val(a)
        }
    }
    t.method = t.method || null,
    t.downloadMethod = t.downloadMethod || null,
    Object.assign || (++waitLoadCount,
    delayScripts.push({
        src: "https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/minified.js",
        onload: function() {
            methodLoad()
        }
    })),
    t.hexToBytes = function(e) {
        if (!e)
            return [];
        if (!e.match(/^[0-9a-fA-F]+$/))
            throw new Error("Input is not a hex string.");
        e.length % 2 != 0 && (e = "0" + e);
        for (var t = [], n = 0; n < e.length; n += 2) {
            var a = parseInt(e.substr(n, 2), 16);
            t.push(a)
        }
        return t
    }
    ,
    t.bytesToHex = function(e) {
        for (var t = "", n = 0; n < e.length; ++n)
            t += ("0" + (255 & e[n]).toString(16)).slice(-2);
        return t
    }
    ,
    t.utf8ToBytes = function(e) {
        var t, n = [], a = e.length, r = 0;
        for (i = 0; i < a; ++i)
            t = e.charCodeAt(i),
            t < 128 ? n[r++] = t : t < 2048 ? (n[r++] = 192 | t >>> 6,
            n[r++] = 128 | 63 & t) : t < 55296 || t >= 57344 ? (n[r++] = 224 | t >>> 12,
            n[r++] = 128 | t >>> 6 & 63,
            n[r++] = 128 | 63 & t) : (t = 65536 + ((1023 & t) << 10 | 1023 & e.charCodeAt(++i)),
            n[r++] = 240 | t >>> 18,
            n[r++] = 128 | t >>> 12 & 63,
            n[r++] = 128 | t >>> 6 & 63,
            n[r++] = 128 | 63 & t);
        return n
    }
    ;
    var x = "not a UTF-8 string"
      , w = {
        encoding: o("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/encoding.min.js?v=1"),
        encodingIndexes: o("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/encoding-indexes.min.js"),
        base64: o("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/base64.min.js")
    };
    t.onDemandScripts = w,
    t.loadEncodingLevel = function(t) {
        return "base64" === t && 2 !== w.base64.status ? (e("#output").val("loading..."),
        w.base64.load(S),
        !1) : 1 === t && 2 !== w.encoding.status ? (e("#output").val("loading..."),
        w.encoding.load(S),
        !1) : 2 !== t || 2 === w.encodingIndexes.status || (e("#output").val("loading..."),
        w.encoding.load(S),
        w.encodingIndexes.load(S),
        !1)
    }
    ,
    t.hmacable = function(t) {
        var n = e("#hmac")
          , a = e("#hmac-enabled")
          , r = e("#hmac-input-type")
          , o = e("#hmac-key");
        o.bind("input propertychange", T),
        r.bind("input propertychange change", T),
        a.click(function() {
            T();
            var e = a.prop("checked");
            n.toggle(e)
        });
        var i, c = function(e) {
            return a.prop("checked") ? (t.hmac || v(t),
            t.hmac(i, e)) : t(e)
        };
        return c.loadHmac = function() {
            return !a.prop("checked") || !1 !== (i = s(o, r))
        }
        ,
        t.update && (c.update = function(e) {
            return a.prop("checked") ? (t.hmac || v(t),
            t.hmac.update(i, e)) : t.update(e)
        }
        ),
        c
    }
    ,
    t.withOptions = function(t, n, a) {
        a = a || 0,
        e("[data-option]").bind("input propertychange change", T);
        var r = n.map(function(t) {
            var n = e('[data-option="' + t + '"]');
            return {
                name: t,
                element: n,
                type: n.data("option-type"),
                inputType: e("#" + t + "-input-type")
            }
        })
          , o = function(e) {
            return function() {
                for (var t = [], n = 0; n < r.length; ++n) {
                    var a = r[n];
                    if ("encoding" === a.type) {
                        var o = s(a.element, a.inputType);
                        if (!1 === o)
                            return;
                        t.push(o)
                    } else {
                        var i = a.element.val();
                        "number" === a.element.attr("type") && (i = parseFloat(i)),
                        t.push(i)
                    }
                }
                return t = Array.prototype.slice.call(arguments, 0).concat(t),
                e.apply(this, t)
            }
        }
          , i = o(t);
        return t.update && (i.update = o(t.update)),
        t.hmac && (i.hmac = o(t.hmac),
        i.hmac.update = o(t.hmac.update)),
        i
    }
    ;
    var k = "REMEMBER_INPUT";
    t.swap = function(t, n) {
        for (var a = {}, r = 0; r < n.length; ++r) {
            var o = n[r]
              , i = e(o[0]);
            a[o[1]] = o[2] ? i.prop("checked") ? "1" : "" : i.val()
        }
        localStorage.setItem("SWAP", JSON.stringify(a)),
        location.href = t
    }
    ;
    var S, T;
    e(n).ready(function() {
        d();
        var a = y()
          , r = !a && g()
          , o = m(a, r);
        e("#hmac-enabled").prop("checked") && e("#hmac").show();
        var i, c = e("#input-type"), u = e("#input"), h = e("#output-type"), l = e("#output"), f = e("#auto-update"), v = e("#droppable-zone"), x = e("#download"), w = e("#download-file-name");
        x.length && x.click(function() {
            x.attr("download", w.val());
            var t = e("#input").val();
            downloadMethod && (t = downloadMethod(t)),
            x.attr("href", "data:application/octet-stream;base64," + t)
        }),
        handleOutput = function(e) {
            e instanceof Promise ? e.then(function(e) {
                p(l, e, h)
            }).catch(function(e) {
                l.val(e)
            }) : p(l, e, h)
        }
        ;
        var k = !1;
        if (S = function() {
            if (j < waitLoadCount)
                return k = !0,
                void l.val("loading...");
            try {
                if (b(),
                val = s(u, c),
                !1 === val)
                    return;
                if (method.loadHmac && !1 === method.loadHmac())
                    return;
                handleOutput(method(val))
            } catch (e) {
                l.val(e)
            }
        }
        ,
        T = function() {
            f[0].checked && (i && (clearTimeout(i),
            i = null),
            i = setTimeout(function() {
                S()
            }, 0))
        }
        ,
        f.length > 0 && (u.bind("input propertychange", T),
        c.bind("input propertychange change", T),
        h.bind("input propertychange change", T),
        f.click(T)),
        v.length > 0) {
            var C = e("#droppable-zone-text");
            if (e(n.body).bind("dragover drop", function(e) {
                return e.preventDefault(),
                !1
            }),
            !t.FileReader)
                return C.text("Your browser does not support."),
                void e("input").attr("disabled", !0);
            v.bind("dragover", function() {
                v.addClass("hover")
            }),
            v.bind("dragleave", function() {
                v.removeClass("hover")
            }),
            v.bind("drop", function(e) {
                v.removeClass("hover"),
                E = e.originalEvent.dataTransfer.files[0],
                C.text(E.name),
                T()
            }),
            u.bind("change", function() {
                E = u[0].files[0],
                C.text(E.name),
                T()
            });
            var E, I;
            S = function() {
                if (E && (!method.loadHmac || !1 !== method.loadHmac())) {
                    var e = new FileReader;
                    if (I = e,
                    method.update) {
                        var t = 0
                          , n = E.size
                          , a = method;
                        e.onload = function(e) {
                            try {
                                a = a.update(e.target.result),
                                r()
                            } catch (e) {
                                l.val(e)
                            }
                        }
                        ;
                        var r = function() {
                            if (I === e)
                                if (t < n) {
                                    l.val("hashing..." + (t / n * 100).toFixed(2) + "%");
                                    var r = Math.min(t + 2097152, n);
                                    e.readAsArrayBuffer(E.slice(t, r)),
                                    t = r
                                } else
                                    handleOutput(a.hex())
                        };
                        r()
                    } else
                        l.val("hashing..."),
                        e.onload = function(e) {
                            try {
                                handleOutput(method(e.target.result))
                            } catch (e) {
                                l.val(e)
                            }
                        }
                        ,
                        e.readAsArrayBuffer(E)
                }
            }
        }
        e("#execute").click(S);
        var A = location.pathname.split("/");
        e('a[href="' + A[A.length - 1] + '"]').addClass("active").closest(".nav-item").find(".nav-dropdown").addClass("active");
        var j = 0;
        t.methodLoad = function() {
            ++j < waitLoadCount || ((a || r || o || k) && S(),
            e(t).trigger("methodLoad"))
        }
    })
}(jQuery, window, document);