!function($, global, doc, dataAndEvents) {
  function ondata(s) {
    var k;
    var keyCode;
    var tagNameArr = [];
    var ti = 0;
    var nTokens = s.length;
    var padLength = 0;
    for (;ti < nTokens;) {
      if ((k = s[ti++]) <= 127) {
        tagNameArr.push(String.fromCharCode(k));
      } else {
        if (k > 191 && k <= 223) {
          keyCode = 31 & k;
          padLength = 1;
        } else {
          if (k <= 239) {
            keyCode = 15 & k;
            padLength = 2;
          } else {
            if (!(k <= 247)) {
              throw new Error(str);
            }
            keyCode = 7 & k;
            padLength = 3;
          }
        }
        var i = 0;
        for (;i < padLength;++i) {
          if ((k = s[ti++]) < 128 || k > 191) {
            throw new Error(str);
          }
          keyCode <<= 6;
          keyCode += 63 & k;
        }
        if (keyCode >= 55296 && keyCode <= 57343) {
          throw new Error(str);
        }
        if (keyCode > 1114111) {
          throw new Error(str);
        }
        if (keyCode <= 65535) {
          tagNameArr.push(String.fromCharCode(keyCode));
        } else {
          keyCode -= 65536;
          tagNameArr.push(String.fromCharCode(55296 + (keyCode >> 10)), String.fromCharCode(56320 + (1023 & keyCode)));
        }
      }
    }
    return tagNameArr.join("");
  }
  function _getText(uri) {
    var result = {
      status : 0,
      load : function(cb) {
        if (!result.status) {
          result.status = 1;
          loadScript({
            src : uri,
            onload : function() {
              result.status = 2;
              if (cb) {
                setTimeout(cb);
              }
            }
          });
        }
      }
    };
    return result;
  }
  function loadScript(params) {
    var el = doc.createElement("script");
    el.async = true;
    el.src = params.src;
    el.onload = params.onload;
    doc.body.appendChild(el);
  }
  function playSound() {
    var conditionIndex = 0;
    for (;conditionIndex < delayScripts.length;++conditionIndex) {
      !function(src) {
        setTimeout(function() {
          if (src.src) {
            loadScript(src);
          } else {
            if (src.onload) {
              src.onload();
            }
          }
        }, src.delay || 0);
      }(delayScripts[conditionIndex]);
    }
  }
  function encode(string, value) {
    return "hex" === string ? hexToBytes(value) : "base64" === string ? base64.decode.bytes(value) : "utf-8" !== string ? (new TextEncoding.TextEncoder(string, {
      NONSTANDARD_allowLegacyEncoding : true
    })).encode(value) : value;
  }
  function decode(secure, buf) {
    if ("hex" === secure) {
      return bytesToHex(buf);
    }
    if ("base64" === secure) {
      return base64.encode(buf);
    }
    if (global.Uint8Array) {
      return(new (global.TextDecoder || TextEncoding.TextDecoder)(secure)).decode(new Uint8Array(buf));
    }
    if ("utf-8" === secure) {
      return ondata(buf);
    }
    throw new Error("Browser is not suppored.");
  }
  function finish(deferred, promise) {
    return "hex" === deferred ? promise : "base64" === deferred ? base64.encode(hexToBytes(promise)) : void 0;
  }
  function remove(el, o) {
    return get(el.val(), o, encode);
  }
  function validate(input, value, elem) {
    if (false !== (value = get(value, elem, "hex" === elem.data("type") ? finish : decode))) {
      input.val(value);
    }
  }
  function get(key, second, callback) {
    if (second.length) {
      var r20 = second.find("option:selected").data("load-encoding");
      return!!loadEncodingLevel(r20) && callback(second.val(), key);
    }
    return key;
  }
  function update($, maxLength) {
    maxLength = maxLength || 64;
    var update = function(line) {
      if ("string" == typeof line) {
        line = utf8ToBytes(line);
      }
      if (line.length > maxLength) {
        line = $.array ? $.array(line) : hexToBytes($(line));
      }
      var ar = [];
      var header = [];
      i = 0;
      for (;i < maxLength;++i) {
        var xor = line[i] || 0;
        ar[i] = 92 ^ xor;
        header[i] = 54 ^ xor;
      }
      var that = this;
      this.current = $.update(header);
      this.update = function(val) {
        return that.current.update(val), that;
      };
      this.hex = function() {
        var tr = that.current.array ? that.current.array() : hexToBytes(that.current.hex());
        return $.update(ar).update(tr).hex();
      };
    };
    $.hmac = function(value, tr) {
      return(new update(value)).update(tr).hex();
    };
    $.hmac.update = function(val, newVal) {
      return(new update(val)).update(newVal);
    };
  }
  function init(el, callback) {
    var button = $("#remember-input");
    var $target = $("[data-remember]");
    var camelKey = localStorage.getItem(key);
    return el || (callback || (!camelKey || (button.prop("checked", true), $target.each(function() {
      var oldPagerPosition = localStorage.getItem(key + "_" + $(this).data("remember"));
      if (oldPagerPosition) {
        if ("checkbox" === this.type) {
          $(this).prop("checked", true);
        } else {
          $(this).val(oldPagerPosition);
        }
      }
    })))), button.bind("change", function() {
      if (button.prop("checked")) {
        camelKey = true;
        localStorage.setItem(key, "1");
        $target.trigger("input");
        if (callback) {
          callback = false;
          global.history.pushState({}, doc.title, location.pathname);
        }
      } else {
        camelKey = false;
        localStorage.removeItem(key);
        $target.each(function() {
          localStorage.removeItem(key + "_" + $(this).data("remember"));
        });
      }
    }), $target.bind("input", function() {
      if (camelKey) {
        var testKey = key + "_" + $(this).data("remember");
        if ("checkbox" === this.type) {
          if ($(this).prop("checked")) {
            localStorage.setItem(testKey, 1);
          } else {
            localStorage.removeItem(testKey);
          }
        } else {
          localStorage.setItem(testKey, $(this).val());
        }
      }
    }), $target.length || button.closest(".option-block").hide(), camelKey;
  }
  function initialize() {
    var revisionCheckbox = $("#share-link");
    var query = {};
    if (revisionCheckbox.length) {
      var uHostName = location.search.substring(1);
      var codeSegments = uHostName.split("&");
      var i = 0;
      for (;i < codeSegments.length;++i) {
        var kv = codeSegments[i].split("=");
        query[kv[0]] = decodeURIComponent(kv[1]);
      }
      var c = false;
      return $("[data-share]").each(function() {
        var i = $(this).data("share");
        var match = query[i];
        if (match) {
          if (match = match, "SELECT" === this.tagName) {
            var result = {};
            $(this).find("option").toArray().map(function(match) {
              result[match.value] = true;
            });
            if (result[match]) {
              $(this).val(match);
            }
          } else {
            if ("checkbox" === this.type) {
              $(this).prop("checked", true);
            } else {
              $(this).val(match);
            }
          }
          c = true;
        }
      }), c;
    }
  }
  function set() {
    var content = localStorage.getItem("SWAP") || "{}";
    localStorage.removeItem("SWAP");
    try {
      content = JSON.parse(content);
    } catch (e) {
      return false;
    }
    var codeSegments = Object.keys(content);
    var i = 0;
    for (;i < codeSegments.length;++i) {
      var v = codeSegments[i];
      var el = $(v);
      if (el.length) {
        if ("checkbox" === el[0].type) {
          el.prop("checked", true);
        } else {
          el.val(content[v]);
        }
      }
    }
    return codeSegments.length;
  }
  function check() {
    var $field = $("#share-link");
    if ($field.length) {
      var leaks = [];
      $("[data-share]").each(function() {
        var url = $(this).data("share");
        var q = "";
        if (q = "checkbox" === this.type ? $(this).prop("checked") ? "1" : "" : $(this).val()) {
          leaks.push(url + "=" + encodeURIComponent(q));
        }
      });
      var select = "";
      if (leaks.length) {
        select = location.origin + location.pathname + "?" + leaks.join("&");
      }
      $field.val(select);
    }
  }
  global.method = global.method || null;
  global.downloadMethod = global.downloadMethod || null;
  if (!Object.assign) {
    ++waitLoadCount;
    delayScripts.push({
      src : "https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/minified.js",
      onload : function() {
        methodLoad();
      }
    });
  }
  global.hexToBytes = function(hex) {
    if (!hex) {
      return[];
    }
    if (!hex.match(/^[0-9a-fA-F]+$/)) {
      throw new Error("Input is not a hex string.");
    }
    if (hex.length % 2 != 0) {
      hex = "0" + hex;
    }
    var eventPath = [];
    var i = 0;
    for (;i < hex.length;i += 2) {
      var cur = parseInt(hex.substr(i, 2), 16);
      eventPath.push(cur);
    }
    return eventPath;
  };
  global.bytesToHex = function(codeSegments) {
    var optsData = "";
    var i = 0;
    for (;i < codeSegments.length;++i) {
      optsData += ("0" + (255 & codeSegments[i]).toString(16)).slice(-2);
    }
    return optsData;
  };
  global.utf8ToBytes = function(input) {
    var n;
    var r = [];
    var il = input.length;
    var j = 0;
    i = 0;
    for (;i < il;++i) {
      n = input.charCodeAt(i);
      if (n < 128) {
        r[j++] = n;
      } else {
        if (n < 2048) {
          r[j++] = 192 | n >>> 6;
          r[j++] = 128 | 63 & n;
        } else {
          if (n < 55296 || n >= 57344) {
            r[j++] = 224 | n >>> 12;
            r[j++] = 128 | n >>> 6 & 63;
            r[j++] = 128 | 63 & n;
          } else {
            n = 65536 + ((1023 & n) << 10 | 1023 & input.charCodeAt(++i));
            r[j++] = 240 | n >>> 18;
            r[j++] = 128 | n >>> 12 & 63;
            r[j++] = 128 | n >>> 6 & 63;
            r[j++] = 128 | 63 & n;
          }
        }
      }
    }
    return r;
  };
  var str = "not a UTF-8 string";
  var self = {
    encoding : _getText("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/encoding.min.js?v=1"),
    encodingIndexes : _getText("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/encoding-indexes.min.js"),
    base64 : _getText("https://raw.githubusercontent.com/Py6Bxi/blogger/main/htmlescape/base64.min.js")
  };
  global.onDemandScripts = self;
  global.loadEncodingLevel = function(dataAndEvents) {
    return "base64" === dataAndEvents && 2 !== self.base64.status ? ($("#output").val("loading..."), self.base64.load(render), false) : 1 === dataAndEvents && 2 !== self.encoding.status ? ($("#output").val("loading..."), self.encoding.load(render), false) : 2 !== dataAndEvents || (2 === self.encodingIndexes.status || ($("#output").val("loading..."), self.encoding.load(render), self.encodingIndexes.load(render), false));
  };
  global.hmacable = function(scope) {
    var $this = $("#hmac");
    var $input = $("#hmac-enabled");
    var test = $("#hmac-input-type");
    var doc = $("#hmac-key");
    doc.bind("input propertychange", handle);
    test.bind("input propertychange change", handle);
    $input.click(function() {
      handle();
      var checked = $input.prop("checked");
      $this.toggle(checked);
    });
    var result;
    var loop = function(obj) {
      return $input.prop("checked") ? (scope.hmac || update(scope), scope.hmac(result, obj)) : scope(obj);
    };
    return loop.loadHmac = function() {
      return!$input.prop("checked") || false !== (result = remove(doc, test));
    }, scope.update && (loop.update = function(val) {
      return $input.prop("checked") ? (scope.hmac || update(scope), scope.hmac.update(result, val)) : scope.update(val);
    }), loop;
  };
  global.withOptions = function(item, params, callback) {
    callback = callback || 0;
    $("[data-option]").bind("input propertychange change", handle);
    var codeSegments = params.map(function(lhs) {
      var selected = $('[data-option="' + lhs + '"]');
      return{
        name : lhs,
        element : selected,
        type : selected.data("option-type"),
        inputType : $("#" + lhs + "-input-type")
      };
    });
    var update = function(callback) {
      return function() {
        var args = [];
        var i = 0;
        for (;i < codeSegments.length;++i) {
          var v = codeSegments[i];
          if ("encoding" === v.type) {
            var initialValue = remove(v.element, v.inputType);
            if (false === initialValue) {
              return;
            }
            args.push(initialValue);
          } else {
            var weight = v.element.val();
            if ("number" === v.element.attr("type")) {
              weight = parseFloat(weight);
            }
            args.push(weight);
          }
        }
        return args = Array.prototype.slice.call(arguments, 0).concat(args), callback.apply(this, args);
      };
    };
    var v = update(item);
    return item.update && (v.update = update(item.update)), item.hmac && (v.hmac = update(item.hmac), v.hmac.update = update(item.hmac.update)), v;
  };
  var key = "REMEMBER_INPUT";
  global.swap = function(path, args) {
    var hash = {};
    var i = 0;
    for (;i < args.length;++i) {
      var events = args[i];
      var targetInput = $(events[0]);
      hash[events[1]] = events[2] ? targetInput.prop("checked") ? "1" : "" : targetInput.val();
    }
    localStorage.setItem("SWAP", JSON.stringify(hash));
    location.href = path;
  };
  var render;
  var handle;
  $(doc).ready(function() {
    playSound();
    var failuresLink = set();
    var restoreScript = !failuresLink && initialize();
    var program = init(failuresLink, restoreScript);
    if ($("#hmac-enabled").prop("checked")) {
      $("#hmac").show();
    }
    var tref;
    var test = $("#input-type");
    var el = $("#input");
    var elem = $("#output-type");
    var option = $("#output");
    var radio = $("#auto-update");
    var dropZone = $("#droppable-zone");
    var link = $("#download");
    var $radio = $("#download-file-name");
    if (link.length) {
      link.click(function() {
        link.attr("download", $radio.val());
        var digit = $("#input").val();
        if (downloadMethod) {
          digit = downloadMethod(digit);
        }
        link.attr("href", "data:application/octet-stream;base64," + digit);
      });
    }
    handleOutput = function(value) {
      if (value instanceof Promise) {
        value.then(function(isXML) {
          validate(option, isXML, elem);
        }).catch(function(value) {
          option.val(value);
        });
      } else {
        validate(option, value, elem);
      }
    };
    var inverse = false;
    if (render = function() {
      if (j < waitLoadCount) {
        return inverse = true, void option.val("loading...");
      }
      try {
        if (check(), val = remove(el, test), false === val) {
          return;
        }
        if (method.loadHmac && false === method.loadHmac()) {
          return;
        }
        handleOutput(method(val));
      } catch (selected) {
        option.val(selected);
      }
    }, handle = function() {
      if (radio[0].checked) {
        if (tref) {
          clearTimeout(tref);
          tref = null;
        }
        tref = setTimeout(function() {
          render();
        }, 0);
      }
    }, radio.length > 0 && (el.bind("input propertychange", handle), test.bind("input propertychange change", handle), elem.bind("input propertychange change", handle), radio.click(handle)), dropZone.length > 0) {
      var item = $("#droppable-zone-text");
      if ($(doc.body).bind("dragover drop", function(types) {
        return types.preventDefault(), false;
      }), !global.FileReader) {
        return item.text("Your browser does not support."), void $("input").attr("disabled", true);
      }
      dropZone.bind("dragover", function() {
        dropZone.addClass("hover");
      });
      dropZone.bind("dragleave", function() {
        dropZone.removeClass("hover");
      });
      dropZone.bind("drop", function(e) {
        dropZone.removeClass("hover");
        value = e.originalEvent.dataTransfer.files[0];
        item.text(value.name);
        handle();
      });
      el.bind("change", function() {
        value = el[0].files[0];
        item.text(value.name);
        handle();
      });
      var value;
      var openElement;
      render = function() {
        if (value && (!method.loadHmac || false !== method.loadHmac())) {
          var element = new FileReader;
          if (openElement = element, method.update) {
            var start = 0;
            var len = value.size;
            var self = method;
            element.onload = function(e) {
              try {
                self = self.update(e.target.result);
                update();
              } catch (selected) {
                option.val(selected);
              }
            };
            var update = function() {
              if (openElement === element) {
                if (start < len) {
                  option.val("hashing..." + (start / len * 100).toFixed(2) + "%");
                  var index = Math.min(start + 2097152, len);
                  element.readAsArrayBuffer(value.slice(start, index));
                  start = index;
                } else {
                  handleOutput(self.hex());
                }
              }
            };
            update();
          } else {
            option.val("hashing...");
            element.onload = function(e) {
              try {
                handleOutput(method(e.target.result));
              } catch (selected) {
                option.val(selected);
              }
            };
            element.readAsArrayBuffer(value);
          }
        }
      };
    }
    $("#execute").click(render);
    var segs = location.pathname.split("/");
    $('a[href="' + segs[segs.length - 1] + '"]').addClass("active").closest(".nav-item").find(".nav-dropdown").addClass("active");
    var j = 0;
    global.methodLoad = function() {
      if (!(++j < waitLoadCount)) {
        if (failuresLink || (restoreScript || (program || inverse))) {
          render();
        }
        $(global).trigger("methodLoad");
      }
    };
  });
}(jQuery, window, document);
