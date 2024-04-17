/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function(Math, className) {
  var C = {};
  var C_lib = C.lib = {};
  /**
   * @return {undefined}
   */
  var F = function() {
  };
  var Base = C_lib.Base = {
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    extend : function(opt_attributes) {
      F.prototype = this;
      var subtype = new F;
      if (opt_attributes) {
        subtype.mixIn(opt_attributes);
      }
      if (!subtype.hasOwnProperty("init")) {
        /**
         * @return {undefined}
         */
        subtype.init = function() {
          subtype.$super.init.apply(this, arguments);
        };
      }
      subtype.init.prototype = subtype;
      subtype.$super = this;
      return subtype;
    },
    /**
     * @return {?}
     */
    create : function() {
      var instance = this.extend();
      instance.init.apply(instance, arguments);
      return instance;
    },
    /**
     * @return {undefined}
     */
    init : function() {
    },
    /**
     * @param {Object} properties
     * @return {undefined}
     */
    mixIn : function(properties) {
      var entry;
      for (entry in properties) {
        if (properties.hasOwnProperty(entry)) {
          this[entry] = properties[entry];
        }
      }
      if (properties.hasOwnProperty("toString")) {
        this.toString = properties.toString;
      }
    },
    /**
     * @return {?}
     */
    clone : function() {
      return this.init.prototype.extend(this);
    }
  };
  var WordArray = C_lib.WordArray = Base.extend({
    /**
     * @param {Array} words
     * @param {number} c
     * @return {undefined}
     */
    init : function(words, c) {
      words = this.words = words || [];
      this.sigBytes = c != className ? c : 4 * words.length;
    },
    /**
     * @param {number} formatter
     * @return {?}
     */
    toString : function(formatter) {
      return(formatter || v).stringify(this);
    },
    /**
     * @param {number} s
     * @return {?}
     */
    concat : function(s) {
      var newArgs = this.words;
      var words = s.words;
      var thisSigBytes = this.sigBytes;
      s = s.sigBytes;
      this.clamp();
      if (thisSigBytes % 4) {
        /** @type {number} */
        var i = 0;
        for (;i < s;i++) {
          newArgs[thisSigBytes + i >>> 2] |= (words[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 24 - 8 * ((thisSigBytes + i) % 4);
        }
      } else {
        if (65535 < words.length) {
          /** @type {number} */
          i = 0;
          for (;i < s;i += 4) {
            newArgs[thisSigBytes + i >>> 2] = words[i >>> 2];
          }
        } else {
          newArgs.push.apply(newArgs, words);
        }
      }
      this.sigBytes += s;
      return this;
    },
    /**
     * @return {undefined}
     */
    clamp : function() {
      var words = this.words;
      var sigBytes = this.sigBytes;
      words[sigBytes >>> 2] &= 4294967295 << 32 - 8 * (sigBytes % 4);
      /** @type {number} */
      words.length = Math.ceil(sigBytes / 4);
    },
    /**
     * @return {?}
     */
    clone : function() {
      var clone = Base.clone.call(this);
      clone.words = this.words.slice(0);
      return clone;
    },
    /**
     * @param {number} nBytes
     * @return {?}
     */
    random : function(nBytes) {
      /** @type {Array} */
      var words = [];
      /** @type {number} */
      var offset = 0;
      for (;offset < nBytes;offset += 4) {
        words.push(4294967296 * Math.random() | 0);
      }
      return new WordArray.init(words, nBytes);
    }
  });
  var C_enc = C.enc = {};
  var v = C_enc.Hex = {
    /**
     * @param {number} key
     * @return {?}
     */
    stringify : function(key) {
      var words = key.words;
      key = key.sigBytes;
      /** @type {Array} */
      var tagNameArr = [];
      /** @type {number} */
      var i = 0;
      for (;i < key;i++) {
        /** @type {number} */
        var bite = words[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
        tagNameArr.push((bite >>> 4).toString(16));
        tagNameArr.push((bite & 15).toString(16));
      }
      return tagNameArr.join("");
    },
    /**
     * @param {string} str
     * @return {?}
     */
    parse : function(str) {
      var hexStrLength = str.length;
      /** @type {Array} */
      var words = [];
      /** @type {number} */
      var i = 0;
      for (;i < hexStrLength;i += 2) {
        words[i >>> 3] |= parseInt(str.substr(i, 2), 16) << 24 - 4 * (i % 8);
      }
      return new WordArray.init(words, hexStrLength / 2);
    }
  };
  var exports = C_enc.Latin1 = {
    /**
     * @param {number} key
     * @return {?}
     */
    stringify : function(key) {
      var words = key.words;
      key = key.sigBytes;
      /** @type {Array} */
      var tagNameArr = [];
      /** @type {number} */
      var i = 0;
      for (;i < key;i++) {
        tagNameArr.push(String.fromCharCode(words[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
      }
      return tagNameArr.join("");
    },
    /**
     * @param {string} str
     * @return {?}
     */
    parse : function(str) {
      var latin1StrLength = str.length;
      /** @type {Array} */
      var words = [];
      /** @type {number} */
      var i = 0;
      for (;i < latin1StrLength;i++) {
        words[i >>> 2] |= (str.charCodeAt(i) & 255) << 24 - 8 * (i % 4);
      }
      return new WordArray.init(words, latin1StrLength);
    }
  };
  var fmt = C_enc.Utf8 = {
    /**
     * @param {number} input
     * @return {?}
     */
    stringify : function(input) {
      try {
        return decodeURIComponent(escape(exports.stringify(input)));
      } catch (c) {
        throw Error("Malformed UTF-8 data");
      }
    },
    /**
     * @param {string} str
     * @return {?}
     */
    parse : function(str) {
      return exports.parse(unescape(encodeURIComponent(str)));
    }
  };
  var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
    /**
     * @return {undefined}
     */
    reset : function() {
      this._data = new WordArray.init;
      /** @type {number} */
      this._nDataBytes = 0;
    },
    /**
     * @param {(number|string)} data
     * @return {undefined}
     */
    _append : function(data) {
      if ("string" == typeof data) {
        data = fmt.parse(data);
      }
      this._data.concat(data);
      this._nDataBytes += data.sigBytes;
    },
    /**
     * @param {number} n
     * @return {?}
     */
    _process : function(n) {
      var data = this._data;
      var words = data.words;
      var dataSigBytes = data.sigBytes;
      var blockSize = this.blockSize;
      /** @type {number} */
      var nBlocksReady = dataSigBytes / (4 * blockSize);
      /** @type {number} */
      nBlocksReady = n ? Math.ceil(nBlocksReady) : Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
      /** @type {number} */
      n = nBlocksReady * blockSize;
      /** @type {number} */
      dataSigBytes = Math.min(4 * n, dataSigBytes);
      if (n) {
        /** @type {number} */
        var offset = 0;
        for (;offset < n;offset += blockSize) {
          this._doProcessBlock(words, offset);
        }
        offset = words.splice(0, n);
        data.sigBytes -= dataSigBytes;
      }
      return new WordArray.init(offset, dataSigBytes);
    },
    /**
     * @return {?}
     */
    clone : function() {
      var clone = Base.clone.call(this);
      clone._data = this._data.clone();
      return clone;
    },
    _minBufferSize : 0
  });
  C_lib.Hasher = BufferedBlockAlgorithm.extend({
    cfg : Base.extend(),
    /**
     * @param {?} cfg
     * @return {undefined}
     */
    init : function(cfg) {
      this.cfg = this.cfg.extend(cfg);
      this.reset();
    },
    /**
     * @return {undefined}
     */
    reset : function() {
      BufferedBlockAlgorithm.reset.call(this);
      this._doReset();
    },
    /**
     * @param {string} bytes
     * @return {?}
     */
    update : function(bytes) {
      this._append(bytes);
      this._process();
      return this;
    },
    /**
     * @param {number} messageUpdate
     * @return {?}
     */
    finalize : function(messageUpdate) {
      if (messageUpdate) {
        this._append(messageUpdate);
      }
      return this._doFinalize();
    },
    blockSize : 16,
    /**
     * @param {?} hasher
     * @return {?}
     */
    _createHelper : function(hasher) {
      return function(messageUpdate, cfg) {
        return(new hasher.init(cfg)).finalize(messageUpdate);
      };
    },
    /**
     * @param {Array} hasher
     * @return {?}
     */
    _createHmacHelper : function(hasher) {
      return function(messageUpdate, key) {
        return(new C_algo.HMAC.init(hasher, key)).finalize(messageUpdate);
      };
    }
  });
  var C_algo = C.algo = {};
  return C;
}(Math);
(function() {
  var C = CryptoJS;
  var Suite = C.lib.WordArray;
  C.enc.Base64 = {
    /**
     * @param {Array} key
     * @return {?}
     */
    stringify : function(key) {
      var buf = key.words;
      var len = key.sigBytes;
      var map = this._map;
      key.clamp();
      /** @type {Array} */
      key = [];
      /** @type {number} */
      var i = 0;
      for (;i < len;i += 3) {
        /** @type {number} */
        var w = (buf[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 16 | (buf[i + 1 >>> 2] >>> 24 - 8 * ((i + 1) % 4) & 255) << 8 | buf[i + 2 >>> 2] >>> 24 - 8 * ((i + 2) % 4) & 255;
        /** @type {number} */
        var HOUR = 0;
        for (;4 > HOUR && i + 0.75 * HOUR < len;HOUR++) {
          key.push(map.charAt(w >>> 6 * (3 - HOUR) & 63));
        }
      }
      if (buf = map.charAt(64)) {
        for (;key.length % 4;) {
          key.push(buf);
        }
      }
      return key.join("");
    },
    /**
     * @param {string} chars
     * @return {?}
     */
    parse : function(chars) {
      var numChars = chars.length;
      var map = this._map;
      var A = map.charAt(64);
      if (A) {
        A = chars.indexOf(A);
        if (-1 != A) {
          numChars = A;
        }
      }
      /** @type {Array} */
      A = [];
      /** @type {number} */
      var title = 0;
      /** @type {number} */
      var i = 0;
      for (;i < numChars;i++) {
        if (i % 4) {
          /** @type {number} */
          var b1 = map.indexOf(chars.charAt(i - 1)) << 2 * (i % 4);
          /** @type {number} */
          var b2 = map.indexOf(chars.charAt(i)) >>> 6 - 2 * (i % 4);
          A[title >>> 2] |= (b1 | b2) << 24 - 8 * (title % 4);
          title++;
        }
      }
      return Suite.create(A, title);
    },
    _map : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  };
})();
(function(Math) {
  /**
   * @param {number} a
   * @param {?} b
   * @param {?} c
   * @param {?} d
   * @param {?} str
   * @param {number} opt_attributes
   * @param {?} n
   * @return {?}
   */
  function e(a, b, c, d, str, opt_attributes, n) {
    a = a + (b & c | ~b & d) + str + n;
    return(a << opt_attributes | a >>> 32 - opt_attributes) + b;
  }
  /**
   * @param {number} a
   * @param {?} b
   * @param {?} c
   * @param {?} d
   * @param {?} str
   * @param {number} opt_attributes
   * @param {?} s
   * @return {?}
   */
  function d(a, b, c, d, str, opt_attributes, s) {
    a = a + (b & d | c & ~d) + str + s;
    return(a << opt_attributes | a >>> 32 - opt_attributes) + b;
  }
  /**
   * @param {number} id
   * @param {?} b
   * @param {?} c
   * @param {?} d
   * @param {?} str
   * @param {number} opt_attributes
   * @param {?} __
   * @return {?}
   */
  function callback(id, b, c, d, str, opt_attributes, __) {
    id = id + (b ^ c ^ d) + str + __;
    return(id << opt_attributes | id >>> 32 - opt_attributes) + b;
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {?} name
   * @param {?} e
   * @param {?} str
   * @param {number} opt_attributes
   * @param {?} s
   * @return {?}
   */
  function fn(a, b, name, e, str, opt_attributes, s) {
    a = a + (name ^ (b | ~e)) + str + s;
    return(a << opt_attributes | a >>> 32 - opt_attributes) + b;
  }
  var C = CryptoJS;
  var C_lib = C.lib;
  var WordArray = C_lib.WordArray;
  var Hasher = C_lib.Hasher;
  C_lib = C.algo;
  /** @type {Array} */
  var oSpace = [];
  /** @type {number} */
  var n = 0;
  for (;64 > n;n++) {
    /** @type {number} */
    oSpace[n] = 4294967296 * Math.abs(Math.sin(n + 1)) | 0;
  }
  C_lib = C_lib.MD5 = Hasher.extend({
    /**
     * @return {undefined}
     */
    _doReset : function() {
      this._hash = new WordArray.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    /**
     * @param {?} words
     * @param {number} offset
     * @return {undefined}
     */
    _doProcessBlock : function(words, offset) {
      /** @type {number} */
      var s = 0;
      for (;16 > s;s++) {
        var prop = offset + s;
        var str = words[prop];
        /** @type {number} */
        words[prop] = (str << 8 | str >>> 24) & 16711935 | (str << 24 | str >>> 8) & 4278255360;
      }
      s = this._hash.words;
      prop = words[offset + 0];
      str = words[offset + 1];
      var options = words[offset + 2];
      var qualifier = words[offset + 3];
      var theChar = words[offset + 4];
      var errStr = words[offset + 5];
      var simple = words[offset + 6];
      var expectedArgs = words[offset + 7];
      var boundary = words[offset + 8];
      var resultText = words[offset + 9];
      var ok = words[offset + 10];
      var letter = words[offset + 11];
      var errorMessage = words[offset + 12];
      var ms = words[offset + 13];
      var pair = words[offset + 14];
      var xhtml = words[offset + 15];
      var m = s[0];
      var n = s[1];
      var o = s[2];
      var p = s[3];
      m = e(m, n, o, p, prop, 7, oSpace[0]);
      p = e(p, m, n, o, str, 12, oSpace[1]);
      o = e(o, p, m, n, options, 17, oSpace[2]);
      n = e(n, o, p, m, qualifier, 22, oSpace[3]);
      m = e(m, n, o, p, theChar, 7, oSpace[4]);
      p = e(p, m, n, o, errStr, 12, oSpace[5]);
      o = e(o, p, m, n, simple, 17, oSpace[6]);
      n = e(n, o, p, m, expectedArgs, 22, oSpace[7]);
      m = e(m, n, o, p, boundary, 7, oSpace[8]);
      p = e(p, m, n, o, resultText, 12, oSpace[9]);
      o = e(o, p, m, n, ok, 17, oSpace[10]);
      n = e(n, o, p, m, letter, 22, oSpace[11]);
      m = e(m, n, o, p, errorMessage, 7, oSpace[12]);
      p = e(p, m, n, o, ms, 12, oSpace[13]);
      o = e(o, p, m, n, pair, 17, oSpace[14]);
      n = e(n, o, p, m, xhtml, 22, oSpace[15]);
      m = d(m, n, o, p, str, 5, oSpace[16]);
      p = d(p, m, n, o, simple, 9, oSpace[17]);
      o = d(o, p, m, n, letter, 14, oSpace[18]);
      n = d(n, o, p, m, prop, 20, oSpace[19]);
      m = d(m, n, o, p, errStr, 5, oSpace[20]);
      p = d(p, m, n, o, ok, 9, oSpace[21]);
      o = d(o, p, m, n, xhtml, 14, oSpace[22]);
      n = d(n, o, p, m, theChar, 20, oSpace[23]);
      m = d(m, n, o, p, resultText, 5, oSpace[24]);
      p = d(p, m, n, o, pair, 9, oSpace[25]);
      o = d(o, p, m, n, qualifier, 14, oSpace[26]);
      n = d(n, o, p, m, boundary, 20, oSpace[27]);
      m = d(m, n, o, p, ms, 5, oSpace[28]);
      p = d(p, m, n, o, options, 9, oSpace[29]);
      o = d(o, p, m, n, expectedArgs, 14, oSpace[30]);
      n = d(n, o, p, m, errorMessage, 20, oSpace[31]);
      m = callback(m, n, o, p, errStr, 4, oSpace[32]);
      p = callback(p, m, n, o, boundary, 11, oSpace[33]);
      o = callback(o, p, m, n, letter, 16, oSpace[34]);
      n = callback(n, o, p, m, pair, 23, oSpace[35]);
      m = callback(m, n, o, p, str, 4, oSpace[36]);
      p = callback(p, m, n, o, theChar, 11, oSpace[37]);
      o = callback(o, p, m, n, expectedArgs, 16, oSpace[38]);
      n = callback(n, o, p, m, ok, 23, oSpace[39]);
      m = callback(m, n, o, p, ms, 4, oSpace[40]);
      p = callback(p, m, n, o, prop, 11, oSpace[41]);
      o = callback(o, p, m, n, qualifier, 16, oSpace[42]);
      n = callback(n, o, p, m, simple, 23, oSpace[43]);
      m = callback(m, n, o, p, resultText, 4, oSpace[44]);
      p = callback(p, m, n, o, errorMessage, 11, oSpace[45]);
      o = callback(o, p, m, n, xhtml, 16, oSpace[46]);
      n = callback(n, o, p, m, options, 23, oSpace[47]);
      m = fn(m, n, o, p, prop, 6, oSpace[48]);
      p = fn(p, m, n, o, expectedArgs, 10, oSpace[49]);
      o = fn(o, p, m, n, pair, 15, oSpace[50]);
      n = fn(n, o, p, m, errStr, 21, oSpace[51]);
      m = fn(m, n, o, p, errorMessage, 6, oSpace[52]);
      p = fn(p, m, n, o, qualifier, 10, oSpace[53]);
      o = fn(o, p, m, n, ok, 15, oSpace[54]);
      n = fn(n, o, p, m, str, 21, oSpace[55]);
      m = fn(m, n, o, p, boundary, 6, oSpace[56]);
      p = fn(p, m, n, o, xhtml, 10, oSpace[57]);
      o = fn(o, p, m, n, simple, 15, oSpace[58]);
      n = fn(n, o, p, m, ms, 21, oSpace[59]);
      m = fn(m, n, o, p, theChar, 6, oSpace[60]);
      p = fn(p, m, n, o, letter, 10, oSpace[61]);
      o = fn(o, p, m, n, options, 15, oSpace[62]);
      n = fn(n, o, p, m, resultText, 21, oSpace[63]);
      /** @type {number} */
      s[0] = s[0] + m | 0;
      /** @type {number} */
      s[1] = s[1] + n | 0;
      /** @type {number} */
      s[2] = s[2] + o | 0;
      /** @type {number} */
      s[3] = s[3] + p | 0;
    },
    /**
     * @return {?}
     */
    _doFinalize : function() {
      var data = this._data;
      var target = data.words;
      /** @type {number} */
      var t = 8 * this._nDataBytes;
      /** @type {number} */
      var src = 8 * data.sigBytes;
      target[src >>> 5] |= 128 << 24 - src % 32;
      /** @type {number} */
      var w = Math.floor(t / 4294967296);
      /** @type {number} */
      target[(src + 64 >>> 9 << 4) + 15] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360;
      /** @type {number} */
      target[(src + 64 >>> 9 << 4) + 14] = (t << 8 | t >>> 24) & 16711935 | (t << 24 | t >>> 8) & 4278255360;
      /** @type {number} */
      data.sigBytes = 4 * (target.length + 1);
      this._process();
      data = this._hash;
      target = data.words;
      /** @type {number} */
      t = 0;
      for (;4 > t;t++) {
        src = target[t];
        /** @type {number} */
        target[t] = (src << 8 | src >>> 24) & 16711935 | (src << 24 | src >>> 8) & 4278255360;
      }
      return data;
    },
    /**
     * @return {?}
     */
    clone : function() {
      var clone = Hasher.clone.call(this);
      clone._hash = this._hash.clone();
      return clone;
    }
  });
  C.MD5 = Hasher._createHelper(C_lib);
  C.HmacMD5 = Hasher._createHmacHelper(C_lib);
})(Math);
(function() {
  var C = CryptoJS;
  var C_lib = C.lib;
  var Base = C_lib.Base;
  var WordArray = C_lib.WordArray;
  C_lib = C.algo;
  var build = C_lib.EvpKDF = Base.extend({
    cfg : Base.extend({
      keySize : 4,
      hasher : C_lib.MD5,
      iterations : 1
    }),
    /**
     * @param {?} cfg
     * @return {undefined}
     */
    init : function(cfg) {
      this.cfg = this.cfg.extend(cfg);
    },
    /**
     * @param {?} data
     * @param {number} key
     * @return {?}
     */
    compute : function(data, key) {
      var cfg = this.cfg;
      var hmac = cfg.hasher.create();
      var derivedKey = WordArray.create();
      var derivedKeyWords = derivedKey.words;
      var keySize = cfg.keySize;
      cfg = cfg.iterations;
      for (;derivedKeyWords.length < keySize;) {
        if (message) {
          hmac.update(message);
        }
        var message = hmac.update(data).finalize(key);
        hmac.reset();
        /** @type {number} */
        var a = 1;
        for (;a < cfg;a++) {
          message = hmac.finalize(message);
          hmac.reset();
        }
        derivedKey.concat(message);
      }
      /** @type {number} */
      derivedKey.sigBytes = 4 * keySize;
      return derivedKey;
    }
  });
  /**
   * @param {?} password
   * @param {number} salt
   * @param {?} cfg
   * @return {?}
   */
  C.EvpKDF = function(password, salt, cfg) {
    return build.create(cfg).compute(password, salt);
  };
})();
if (!CryptoJS.lib.Cipher) {
  (function(dataAndEvents) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
    var Base64 = C.enc.Base64;
    var EvpKDF = C.algo.EvpKDF;
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
      cfg : Base.extend(),
      /**
       * @param {string} key
       * @param {string} cfg
       * @return {?}
       */
      createEncryptor : function(key, cfg) {
        return this.create(this._ENC_XFORM_MODE, key, cfg);
      },
      /**
       * @param {string} key
       * @param {string} cfg
       * @return {?}
       */
      createDecryptor : function(key, cfg) {
        return this.create(this._DEC_XFORM_MODE, key, cfg);
      },
      /**
       * @param {?} xformMode
       * @param {number} allBindingsAccessor
       * @param {?} cfg
       * @return {undefined}
       */
      init : function(xformMode, allBindingsAccessor, cfg) {
        this.cfg = this.cfg.extend(cfg);
        this._xformMode = xformMode;
        /** @type {number} */
        this._key = allBindingsAccessor;
        this.reset();
      },
      /**
       * @return {undefined}
       */
      reset : function() {
        BufferedBlockAlgorithm.reset.call(this);
        this._doReset();
      },
      /**
       * @param {(number|string)} info
       * @return {?}
       */
      process : function(info) {
        this._append(info);
        return this._process();
      },
      /**
       * @param {number} messageUpdate
       * @return {?}
       */
      finalize : function(messageUpdate) {
        if (messageUpdate) {
          this._append(messageUpdate);
        }
        return this._doFinalize();
      },
      keySize : 4,
      ivSize : 4,
      _ENC_XFORM_MODE : 1,
      _DEC_XFORM_MODE : 2,
      /**
       * @param {string} cipher
       * @return {?}
       */
      _createHelper : function(cipher) {
        return{
          /**
           * @param {Window} message
           * @param {Object} key
           * @param {Object} cfg
           * @return {?}
           */
          encrypt : function(message, key, cfg) {
            return("string" == typeof key ? e : SerializableCipher).encrypt(cipher, message, key, cfg);
          },
          /**
           * @param {string} ciphertext
           * @param {string} key
           * @param {string} cfg
           * @return {?}
           */
          decrypt : function(ciphertext, key, cfg) {
            return("string" == typeof key ? e : SerializableCipher).decrypt(cipher, ciphertext, key, cfg);
          }
        };
      }
    });
    C_lib.StreamCipher = Cipher.extend({
      /**
       * @return {?}
       */
      _doFinalize : function() {
        return this._process(true);
      },
      blockSize : 1
    });
    var type = C.mode = {};
    /**
     * @param {?} words
     * @param {number} offset
     * @param {number} blockSize
     * @return {undefined}
     */
    var xorBlock = function(words, offset, blockSize) {
      var block = this._iv;
      if (block) {
        this._iv = dataAndEvents;
      } else {
        block = this._prevBlock;
      }
      /** @type {number} */
      var i = 0;
      for (;i < blockSize;i++) {
        words[offset + i] ^= block[i];
      }
    };
    var CBC = (C_lib.BlockCipherMode = Base.extend({
      /**
       * @param {string} cipher
       * @param {string} iv
       * @return {?}
       */
      createEncryptor : function(cipher, iv) {
        return this.Encryptor.create(cipher, iv);
      },
      /**
       * @param {string} cipher
       * @param {string} iv
       * @return {?}
       */
      createDecryptor : function(cipher, iv) {
        return this.Decryptor.create(cipher, iv);
      },
      /**
       * @param {?} cipher
       * @param {?} allBindingsAccessor
       * @return {undefined}
       */
      init : function(cipher, allBindingsAccessor) {
        this._cipher = cipher;
        this._iv = allBindingsAccessor;
      }
    })).extend();
    CBC.Encryptor = CBC.extend({
      /**
       * @param {Object} words
       * @param {number} offset
       * @return {undefined}
       */
      processBlock : function(words, offset) {
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        xorBlock.call(this, words, offset, blockSize);
        cipher.encryptBlock(words, offset);
        this._prevBlock = words.slice(offset, offset + blockSize);
      }
    });
    CBC.Decryptor = CBC.extend({
      /**
       * @param {Object} words
       * @param {number} offset
       * @return {undefined}
       */
      processBlock : function(words, offset) {
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var thisBlock = words.slice(offset, offset + blockSize);
        cipher.decryptBlock(words, offset);
        xorBlock.call(this, words, offset, blockSize);
        this._prevBlock = thisBlock;
      }
    });
    type = type.CBC = CBC;
    CBC = (C.pad = {}).Pkcs7 = {
      /**
       * @param {(Array|number)} l
       * @param {number} d
       * @return {undefined}
       */
      pad : function(l, d) {
        /** @type {number} */
        var r = 4 * d;
        /** @type {number} */
        r = r - l.sigBytes % r;
        /** @type {number} */
        var seg = r << 24 | r << 16 | r << 8 | r;
        /** @type {Array} */
        var data = [];
        /** @type {number} */
        var x = 0;
        for (;x < r;x += 4) {
          data.push(seg);
        }
        r = WordArray.create(data, r);
        l.concat(r);
      },
      /**
       * @param {?} data
       * @return {undefined}
       */
      unpad : function(data) {
        data.sigBytes -= data.words[data.sigBytes - 1 >>> 2] & 255;
      }
    };
    C_lib.BlockCipher = Cipher.extend({
      cfg : Cipher.cfg.extend({
        mode : type,
        padding : CBC
      }),
      /**
       * @return {undefined}
       */
      reset : function() {
        Cipher.reset.call(this);
        var mode = this.cfg;
        var iv = mode.iv;
        mode = mode.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          var modeCreator = mode.createEncryptor
        } else {
          modeCreator = mode.createDecryptor;
          /** @type {number} */
          this._minBufferSize = 1;
        }
        this._mode = modeCreator.call(mode, this, iv && iv.words);
      },
      /**
       * @param {Object} words
       * @param {number} offset
       * @return {undefined}
       */
      _doProcessBlock : function(words, offset) {
        this._mode.processBlock(words, offset);
      },
      /**
       * @return {?}
       */
      _doFinalize : function() {
        var padding = this.cfg.padding;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          padding.pad(this._data, this.blockSize);
          var finalProcessedBlocks = this._process(true);
        } else {
          finalProcessedBlocks = this._process(true);
          padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
      },
      blockSize : 4
    });
    var CipherParams = C_lib.CipherParams = Base.extend({
      /**
       * @param {Object} attributes
       * @return {undefined}
       */
      init : function(attributes) {
        this.mixIn(attributes);
      },
      /**
       * @param {Object} formatter
       * @return {?}
       */
      toString : function(formatter) {
        return(formatter || this.formatter).stringify(this);
      }
    });
    type = (C.format = {}).OpenSSL = {
      /**
       * @param {number} obj
       * @return {?}
       */
      stringify : function(obj) {
        var s = obj.ciphertext;
        obj = obj.salt;
        return(obj ? WordArray.create([1398893684, 1701076831]).concat(obj).concat(s) : s).toString(Base64);
      },
      /**
       * @param {string} data
       * @return {?}
       */
      parse : function(data) {
        data = Base64.parse(data);
        var words = data.words;
        if (1398893684 == words[0] && 1701076831 == words[1]) {
          var salt = WordArray.create(words.slice(2, 4));
          words.splice(0, 4);
          data.sigBytes -= 16;
        }
        return CipherParams.create({
          ciphertext : data,
          salt : salt
        });
      }
    };
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
      cfg : Base.extend({
        format : type
      }),
      /**
       * @param {string} cipher
       * @param {number} message
       * @param {string} key
       * @param {string} cfg
       * @return {?}
       */
      encrypt : function(cipher, message, key, cfg) {
        cfg = this.cfg.extend(cfg);
        var self = cipher.createEncryptor(key, cfg);
        message = self.finalize(message);
        self = self.cfg;
        return CipherParams.create({
          ciphertext : message,
          key : key,
          iv : self.iv,
          algorithm : cipher,
          mode : self.mode,
          padding : self.padding,
          blockSize : cipher.blockSize,
          formatter : cfg.format
        });
      },
      /**
       * @param {string} cipher
       * @param {(number|string)} ciphertext
       * @param {string} key
       * @param {string} cfg
       * @return {?}
       */
      decrypt : function(cipher, ciphertext, key, cfg) {
        cfg = this.cfg.extend(cfg);
        ciphertext = this._parse(ciphertext, cfg.format);
        return cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
      },
      /**
       * @param {string} str
       * @param {JSONType} obj
       * @return {?}
       */
      _parse : function(str, obj) {
        return "string" == typeof str ? obj.parse(str, this) : str;
      }
    });
    C = (C.kdf = {}).OpenSSL = {
      /**
       * @param {Object} data
       * @param {number} keySize
       * @param {Array} ivSize
       * @param {number} salt
       * @return {?}
       */
      execute : function(data, keySize, ivSize, salt) {
        if (!salt) {
          salt = WordArray.random(8);
        }
        data = EvpKDF.create({
          keySize : keySize + ivSize
        }).compute(data, salt);
        ivSize = WordArray.create(data.words.slice(keySize), 4 * ivSize);
        /** @type {number} */
        data.sigBytes = 4 * keySize;
        return CipherParams.create({
          key : data,
          iv : ivSize,
          salt : salt
        });
      }
    };
    var e = C_lib.PasswordBasedCipher = SerializableCipher.extend({
      cfg : SerializableCipher.cfg.extend({
        kdf : C
      }),
      /**
       * @param {(Element|string)} cipher
       * @param {Object} val
       * @param {Object} data
       * @param {Object} cfg
       * @return {?}
       */
      encrypt : function(cipher, val, data, cfg) {
        cfg = this.cfg.extend(cfg);
        data = cfg.kdf.execute(data, cipher.keySize, cipher.ivSize);
        cfg.iv = data.iv;
        cipher = SerializableCipher.encrypt.call(this, cipher, val, data.key, cfg);
        cipher.mixIn(data);
        return cipher;
      },
      /**
       * @param {string} cipher
       * @param {Object} ciphertext
       * @param {Object} data
       * @param {Object} cfg
       * @return {?}
       */
      decrypt : function(cipher, ciphertext, data, cfg) {
        cfg = this.cfg.extend(cfg);
        ciphertext = this._parse(ciphertext, cfg.format);
        data = cfg.kdf.execute(data, cipher.keySize, cipher.ivSize, ciphertext.salt);
        cfg.iv = data.iv;
        return SerializableCipher.decrypt.call(this, cipher, ciphertext, data.key, cfg);
      }
    });
  })();
}
(function() {
  var C = CryptoJS;
  var BlockCipher = C.lib.BlockCipher;
  var AES = C.algo;
  /** @type {Array} */
  var SBOX = [];
  /** @type {Array} */
  var INV_SBOX = [];
  /** @type {Array} */
  var SUB_MIX_0 = [];
  /** @type {Array} */
  var SUB_MIX_1 = [];
  /** @type {Array} */
  var SUB_MIX_2 = [];
  /** @type {Array} */
  var SUB_MIX_3 = [];
  /** @type {Array} */
  var INV_SUB_MIX_0 = [];
  /** @type {Array} */
  var INV_SUB_MIX_1 = [];
  /** @type {Array} */
  var INV_SUB_MIX_2 = [];
  /** @type {Array} */
  var INV_SUB_MIX_3 = [];
  /** @type {Array} */
  var d = [];
  /** @type {number} */
  var flen = 0;
  for (;256 > flen;flen++) {
    /** @type {number} */
    d[flen] = 128 > flen ? flen << 1 : flen << 1 ^ 283;
  }
  /** @type {number} */
  var x = 0;
  /** @type {number} */
  var xi = 0;
  /** @type {number} */
  flen = 0;
  for (;256 > flen;flen++) {
    /** @type {number} */
    var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
    /** @type {number} */
    sx = sx >>> 8 ^ sx & 255 ^ 99;
    /** @type {number} */
    SBOX[x] = sx;
    /** @type {number} */
    INV_SBOX[sx] = x;
    var x2 = d[x];
    var x4 = d[x2];
    var x8 = d[x4];
    /** @type {number} */
    var t = 257 * d[sx] ^ 16843008 * sx;
    /** @type {number} */
    SUB_MIX_0[x] = t << 24 | t >>> 8;
    /** @type {number} */
    SUB_MIX_1[x] = t << 16 | t >>> 16;
    /** @type {number} */
    SUB_MIX_2[x] = t << 8 | t >>> 24;
    /** @type {number} */
    SUB_MIX_3[x] = t;
    /** @type {number} */
    t = 16843009 * x8 ^ 65537 * x4 ^ 257 * x2 ^ 16843008 * x;
    /** @type {number} */
    INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
    /** @type {number} */
    INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
    /** @type {number} */
    INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
    /** @type {number} */
    INV_SUB_MIX_3[sx] = t;
    if (x) {
      /** @type {number} */
      x = x2 ^ d[d[d[x8 ^ x2]]];
      xi ^= d[d[xi]];
    } else {
      /** @type {number} */
      x = xi = 1;
    }
  }
  /** @type {Array} */
  var H = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
  AES = AES.AES = BlockCipher.extend({
    /**
     * @return {undefined}
     */
    _doReset : function() {
      var pos = this._key;
      var c = pos.words;
      /** @type {number} */
      var b = pos.sigBytes / 4;
      /** @type {number} */
      pos = 4 * ((this._nRounds = b + 6) + 1);
      /** @type {Array} */
      var keySchedule = this._keySchedule = [];
      /** @type {number} */
      var a = 0;
      for (;a < pos;a++) {
        if (a < b) {
          keySchedule[a] = c[a];
        } else {
          var t = keySchedule[a - 1];
          if (a % b) {
            if (6 < b) {
              if (4 == a % b) {
                /** @type {number} */
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
              }
            }
          } else {
            /** @type {number} */
            t = t << 8 | t >>> 24;
            /** @type {number} */
            t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
            t ^= H[a / b | 0] << 24;
          }
          /** @type {number} */
          keySchedule[a] = keySchedule[a - b] ^ t;
        }
      }
      /** @type {Array} */
      c = this._invKeySchedule = [];
      /** @type {number} */
      b = 0;
      for (;b < pos;b++) {
        /** @type {number} */
        a = pos - b;
        t = b % 4 ? keySchedule[a] : keySchedule[a - 4];
        c[b] = 4 > b || 4 >= a ? t : INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
      }
    },
    /**
     * @param {Object} M
     * @param {number} offset
     * @return {undefined}
     */
    encryptBlock : function(M, offset) {
      this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    },
    /**
     * @param {Object} M
     * @param {number} offset
     * @return {undefined}
     */
    decryptBlock : function(M, offset) {
      var t = M[offset + 1];
      M[offset + 1] = M[offset + 3];
      M[offset + 3] = t;
      this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
      t = M[offset + 1];
      M[offset + 1] = M[offset + 3];
      M[offset + 3] = t;
    },
    /**
     * @param {Object} M
     * @param {number} offset
     * @param {Array} keySchedule
     * @param {Array} SUB_MIX_0
     * @param {Array} SUB_MIX_1
     * @param {Array} SUB_MIX_2
     * @param {Array} SUB_MIX_3
     * @param {Array} SBOX
     * @return {undefined}
     */
    _doCryptBlock : function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
      var nRounds = this._nRounds;
      /** @type {number} */
      var s2 = M[offset] ^ keySchedule[0];
      /** @type {number} */
      var s0 = M[offset + 1] ^ keySchedule[1];
      /** @type {number} */
      var s1 = M[offset + 2] ^ keySchedule[2];
      /** @type {number} */
      var s3 = M[offset + 3] ^ keySchedule[3];
      /** @type {number} */
      var ksRow = 4;
      /** @type {number} */
      var round = 1;
      for (;round < nRounds;round++) {
        /** @type {number} */
        var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow++];
        /** @type {number} */
        var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow++];
        /** @type {number} */
        var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow++];
        /** @type {number} */
        s3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow++];
        /** @type {number} */
        s2 = t2;
        /** @type {number} */
        s0 = t0;
        /** @type {number} */
        s1 = t1;
      }
      /** @type {number} */
      t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow++];
      /** @type {number} */
      t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow++];
      /** @type {number} */
      t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow++];
      /** @type {number} */
      s3 = (SBOX[s3 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow++];
      /** @type {number} */
      M[offset] = t2;
      /** @type {number} */
      M[offset + 1] = t0;
      /** @type {number} */
      M[offset + 2] = t1;
      /** @type {number} */
      M[offset + 3] = s3;
    },
    keySize : 8
  });
  C.AES = BlockCipher._createHelper(AES);
})();
/*
*
* Created By Anas RAR
* NihLink v2.6.5
* Author : Anas RAR
* Date	 : 10 April 2019
* URL 	 : anasrar.github.io
* Repository : https://github.com/anasrar/NihLink-Safelink-Template-Blogger
* License : https://github.com/anasrar/NihLink-Safelink-Template-Blogger/blob/master/LICENSE
*
*/
var nihlinkgenerate = function(arr, config){
    Array.prototype.forEach.call(document.querySelectorAll('a'),function(a){
        if(a.hostname.length && arr.indexOf(a.hostname.toLowerCase()) === -1){
            var data= {};
            data.url = a.href;
            data.countdown = config.countdown;
            a.href = config.url + '/' + config.page + '?u=' + encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), config.keyit));
        }
    });
    console.log('NihLink Auto Generate');
}
// Example
// nihlinkgenerate(['anasrar.github.io', 'codepen.io'], {url: 'https://nihlink.blogspot.com', page: 'p/lanjut.html', keyit: 'AnasRAR', countdown: true})
// ([blacklist domain in array], {config json})
