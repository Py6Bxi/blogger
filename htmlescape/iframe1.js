!function() {
  var name;
  var responses;
  var src;
  /** @type {string} */
  name = "__tcfapiLocator";
  /** @type {Array} */
  responses = [];
  if (!(src = window.frames[name])) {
    (function init() {
      /** @type {Document} */
      var doc = window.document;
      /** @type {boolean} */
      var a = !!src;
      if (!a) {
        if (doc.body) {
          /** @type {Element} */
          var iframe = doc.createElement("iframe");
          /** @type {string} */
          iframe.style.cssText = "display:none";
          iframe.name = name;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(init, 5);
        }
      }
      return!a;
    })();
    /**
     * @return {?}
     */
    window.__tcfapi = function() {
      var arg;
      /** @type {Array} */
      var args = [];
      /** @type {number} */
      var i = 0;
      for (;i < arguments.length;i++) {
        args[i] = arguments[i];
      }
      if (!args.length) {
        return responses;
      }
      if ("setGdprApplies" === args[0]) {
        if (3 < args.length) {
          if (2 === parseInt(args[1], 10)) {
            if ("boolean" == typeof args[3]) {
              arg = args[3];
              if ("function" == typeof args[2]) {
                args[2]("set", true);
              }
            }
          }
        }
      } else {
        if ("ping" === args[0]) {
          var message = {
            gdprApplies : arg,
            cmpLoaded : false,
            cmpStatus : "stubCMP",
            apiVersion : 2
          };
          if ("function" == typeof args[2]) {
            args[2](message, true);
          }
        } else {
          responses.push(args);
        }
      }
    };
    window.addEventListener("message", function(event) {
      /** @type {boolean} */
      var Data = "string" == typeof event.data;
      var res = {};
      try {
        /** @type {*} */
        res = Data ? JSON.parse(event.data) : event.data;
      } catch (e) {
      }
      var data = res.__tcfapiCall;
      if (data) {
        window.__tcfapi(data.command, data.version, function(returnValue, successCallback) {
          var files = {
            __tcfapiReturn : {
              returnValue : returnValue,
              /** @type {Function} */
              success : successCallback,
              callId : data.callId
            }
          };
          if (Data) {
            /** @type {string} */
            files = JSON.stringify(files);
          }
          event.source.postMessage(files, "*");
        }, data.parameter);
      }
    }, false);
  }
}();
!function() {
  var name;
  var out;
  var src;
  /** @type {string} */
  name = "__uspapiLocator";
  /** @type {Array} */
  out = [];
  if (!(src = window.frames[name])) {
    (function init() {
      /** @type {Document} */
      var doc = window.document;
      /** @type {boolean} */
      var n = !!src;
      if (!src) {
        if (doc.body) {
          /** @type {Element} */
          var iframe = doc.createElement("iframe");
          /** @type {string} */
          iframe.style.cssText = "display:none";
          iframe.name = name;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(init, 5);
        }
      }
      return!n;
    })();
    /**
     * @return {?}
     */
    window.__uspapi = function() {
      /** @type {Array} */
      var copies = [];
      /** @type {number} */
      var i = 0;
      for (;i < arguments.length;i++) {
        copies[i] = arguments[i];
      }
      if (!copies.length) {
        return out;
      }
      if ("ping" === copies[0]) {
        if ("function" == typeof copies[2]) {
          copies[2]({
            cmpLoaded : false,
            cmpStatus : "stubCMP"
          }, true);
        }
      } else {
        out.push(copies);
      }
    };
    window.addEventListener("message", function(event) {
      /** @type {boolean} */
      var e = "string" == typeof event.data;
      var evt = {};
      try {
        /** @type {*} */
        evt = e ? JSON.parse(event.data) : event.data;
      } catch (a) {
      }
      var data = evt.__uspapiCall;
      if (data) {
        window.__uspapi(data.command, data.version, function(returnValue, successCallback) {
          var files = {
            __uspapiReturn : {
              returnValue : returnValue,
              /** @type {Function} */
              success : successCallback,
              callId : data.callId
            }
          };
          if (e) {
            /** @type {string} */
            files = JSON.stringify(files);
          }
          event.source.postMessage(files, "*");
        }, data.parameter);
      }
    }, false);
  }
}();
