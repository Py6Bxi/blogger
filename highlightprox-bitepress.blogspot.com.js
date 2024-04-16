!function(factory) {
  /** @type {(Window|boolean)} */
  var root = "object" == typeof window && window || "object" == typeof self && self;
  if ("undefined" != typeof exports) {
    factory(exports);
  } else {
    if (root) {
      root.hljs = factory({});
      if ("function" == typeof define) {
        if (define.amd) {
          define([], function() {
            return root.hljs;
          });
        }
      }
    }
  }
}(function(self) {
  /**
   * @param {string} text
   * @return {?}
   */
  function escape(text) {
    return text.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
  }
  /**
   * @param {Node} node
   * @return {?}
   */
  function tag(node) {
    return node.nodeName.toLowerCase();
  }
  /**
   * @param {Object} re
   * @param {string} lexeme
   * @return {?}
   */
  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && 0 == match.index;
  }
  /**
   * @param {string} language
   * @return {?}
   */
  function scan(language) {
    return/^(no-?highlight|plain|text)$/i.test(language);
  }
  /**
   * @param {Element} block
   * @return {?}
   */
  function blockLanguage(block) {
    var i;
    var context;
    var l;
    /** @type {string} */
    var classes = block.className + " ";
    if (classes += block.parentNode ? block.parentNode.className : "", context = /\blang(?:uage)?-([\w-]+)\b/i.exec(classes)) {
      return fn(context[1]) ? context[1] : "no-highlight";
    }
    /** @type {Array.<string>} */
    classes = classes.split(/\s+/);
    /** @type {number} */
    i = 0;
    /** @type {number} */
    l = classes.length;
    for (;l > i;i++) {
      if (fn(classes[i]) || scan(classes[i])) {
        return classes[i];
      }
    }
  }
  /**
   * @param {?} obj
   * @param {?} opt_attributes
   * @return {?}
   */
  function clone(obj, opt_attributes) {
    var key;
    var res = {};
    for (key in obj) {
      res[key] = obj[key];
    }
    if (opt_attributes) {
      for (key in opt_attributes) {
        res[key] = opt_attributes[key];
      }
    }
    return res;
  }
  /**
   * @param {Element} node
   * @return {?}
   */
  function nodeStream(node) {
    /** @type {Array} */
    var result = [];
    return function _nodeStream(node, offset) {
      var child = node.firstChild;
      for (;child;child = child.nextSibling) {
        if (3 == child.nodeType) {
          offset += child.nodeValue.length;
        } else {
          if (1 == child.nodeType) {
            result.push({
              event : "start",
              offset : offset,
              node : child
            });
            offset = _nodeStream(child, offset);
            if (!tag(child).match(/br|hr|img|input/)) {
              result.push({
                event : "stop",
                offset : offset,
                node : child
              });
            }
          }
        }
      }
      return offset;
    }(node, 0), result;
  }
  /**
   * @param {string} stream1
   * @param {string} stream2
   * @param {string} value
   * @return {?}
   */
  function mergeStreams(stream1, stream2, value) {
    /**
     * @return {?}
     */
    function selectStream() {
      return stream1.length && stream2.length ? stream1[0].offset != stream2[0].offset ? stream1[0].offset < stream2[0].offset ? stream1 : stream2 : "start" == stream2[0].event ? stream1 : stream2 : stream1.length ? stream1 : stream2;
    }
    /**
     * @param {Element} node
     * @return {undefined}
     */
    function open(node) {
      /**
       * @param {Node} a
       * @return {?}
       */
      function attr_str(a) {
        return " " + a.nodeName + '="' + escape(a.value) + '"';
      }
      result += "<" + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join("") + ">";
    }
    /**
     * @param {Node} node
     * @return {undefined}
     */
    function close(node) {
      result += "</" + tag(node) + ">";
    }
    /**
     * @param {Object} event
     * @return {undefined}
     */
    function render(event) {
      ("start" == event.event ? open : close)(event.node);
    }
    /** @type {number} */
    var processed = 0;
    /** @type {string} */
    var result = "";
    /** @type {Array} */
    var eventPath = [];
    for (;stream1.length || stream2.length;) {
      var stream = selectStream();
      if (result += escape(value.substr(processed, stream[0].offset - processed)), processed = stream[0].offset, stream == stream1) {
        eventPath.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream == stream1 && (stream.length && stream[0].offset == processed));
        eventPath.reverse().forEach(open);
      } else {
        if ("start" == stream[0].event) {
          eventPath.push(stream[0].node);
        } else {
          eventPath.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }
  /**
   * @param {Object} language
   * @return {undefined}
   */
  function compileLanguage(language) {
    /**
     * @param {Object} re
     * @return {?}
     */
    function reStr(re) {
      return re && re.source || re;
    }
    /**
     * @param {string} value
     * @param {boolean} global
     * @return {?}
     */
    function langRe(value, global) {
      return new RegExp(reStr(value), "m" + (language.cI ? "i" : "") + (global ? "g" : ""));
    }
    /**
     * @param {Object} data
     * @param {boolean} parent
     * @return {undefined}
     */
    function compileMode(data, parent) {
      if (!data.compiled) {
        if (data.compiled = true, data.k = data.k || data.bK, data.k) {
          var k = {};
          /**
           * @param {string} var_args
           * @param {string} input
           * @return {undefined}
           */
          var flatten = function(var_args, input) {
            if (language.cI) {
              input = input.toLowerCase();
            }
            input.split(" ").forEach(function(moduleNames) {
              var pair = moduleNames.split("|");
              /** @type {Array} */
              k[pair[0]] = [var_args, pair[1] ? Number(pair[1]) : 1];
            });
          };
          if ("string" == typeof data.k) {
            flatten("keyword", data.k);
          } else {
            Object.keys(data.k).forEach(function(className) {
              flatten(className, data.k[className]);
            });
          }
          data.k = k;
        }
        data.lR = langRe(data.l || /\w+/, true);
        if (parent) {
          if (data.bK) {
            /** @type {string} */
            data.b = "\\b(" + data.bK.split(" ").join("|") + ")\\b";
          }
          if (!data.b) {
            /** @type {RegExp} */
            data.b = /\B|\b/;
          }
          data.bR = langRe(data.b);
          if (!data.e) {
            if (!data.eW) {
              /** @type {RegExp} */
              data.e = /\B|\b/;
            }
          }
          if (data.e) {
            data.eR = langRe(data.e);
          }
          data.tE = reStr(data.e) || "";
          if (data.eW) {
            if (parent.tE) {
              data.tE += (data.e ? "|" : "") + parent.tE;
            }
          }
        }
        if (data.i) {
          data.iR = langRe(data.i);
        }
        if (void 0 === data.r) {
          /** @type {number} */
          data.r = 1;
        }
        if (!data.c) {
          /** @type {Array} */
          data.c = [];
        }
        /** @type {Array} */
        var results = [];
        data.c.forEach(function(value) {
          if (value.v) {
            value.v.forEach(function(deep) {
              results.push(clone(value, deep));
            });
          } else {
            results.push("self" == value ? data : value);
          }
        });
        /** @type {Array} */
        data.c = results;
        data.c.forEach(function(inplace) {
          compileMode(inplace, data);
        });
        if (data.starts) {
          compileMode(data.starts, parent);
        }
        /** @type {Array.<*>} */
        var terminators = data.c.map(function(b) {
          return b.bK ? "\\.?(" + b.b + ")\\.?" : b.b;
        }).concat([data.tE, data.i]).map(reStr).filter(Boolean);
        data.t = terminators.length ? langRe(terminators.join("|"), true) : {
          /**
           * @return {?}
           */
          exec : function() {
            return null;
          }
        };
      }
    }
    compileMode(language);
  }
  /**
   * @param {string} name
   * @param {string} value
   * @param {boolean} ignore_illegals
   * @param {string} continuation
   * @return {?}
   */
  function highlight(name, value, ignore_illegals, continuation) {
    /**
     * @param {string} lexeme
     * @param {Object} top
     * @return {?}
     */
    function subMode(lexeme, top) {
      /** @type {number} */
      var i = 0;
      for (;i < top.c.length;i++) {
        if (testRe(top.c[i].bR, lexeme)) {
          return top.c[i];
        }
      }
    }
    /**
     * @param {string} mode
     * @param {string} lexeme
     * @return {?}
     */
    function endOfMode(mode, lexeme) {
      if (testRe(mode.eR, lexeme)) {
        for (;mode.endsParent && mode.parent;) {
          mode = mode.parent;
        }
        return mode;
      }
      return mode.eW ? endOfMode(mode.parent, lexeme) : void 0;
    }
    /**
     * @param {string} lexeme
     * @param {Object} mode
     * @return {?}
     */
    function isIllegal(lexeme, mode) {
      return!ignore_illegals && testRe(mode.iR, lexeme);
    }
    /**
     * @param {Object} t
     * @param {Array} match
     * @return {?}
     */
    function keywordMatch(t, match) {
      var k = language.cI ? match[0].toLowerCase() : match[0];
      return t.k.hasOwnProperty(k) && t.k[k];
    }
    /**
     * @param {string} classname
     * @param {string} insideSpan
     * @param {boolean} recurring
     * @param {boolean} noPrefix
     * @return {?}
     */
    function buildSpan(classname, insideSpan, recurring, noPrefix) {
      var classPrefix = noPrefix ? "" : options.classPrefix;
      /** @type {string} */
      var openSpan = '<span class="' + classPrefix;
      /** @type {string} */
      var closeSpan = recurring ? "" : "</span>";
      return openSpan += classname + '">', openSpan + insideSpan + closeSpan;
    }
    /**
     * @return {?}
     */
    function processKeywords() {
      if (!top.k) {
        return escape(text);
      }
      /** @type {string} */
      var result = "";
      /** @type {number} */
      var stringSegmentStart = 0;
      /** @type {number} */
      top.lR.lastIndex = 0;
      var match = top.lR.exec(text);
      for (;match;) {
        result += escape(text.substr(stringSegmentStart, match.index - stringSegmentStart));
        var keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        /** @type {number} */
        stringSegmentStart = top.lR.lastIndex;
        match = top.lR.exec(text);
      }
      return result + escape(text.substr(stringSegmentStart));
    }
    /**
     * @return {?}
     */
    function highlight() {
      /** @type {boolean} */
      var language = "string" == typeof top.sL;
      if (language && !languages[top.sL]) {
        return escape(text);
      }
      var result = language ? highlight(top.sL, text, true, panelTops[top.sL]) : highlightAuto(text, top.sL.length ? top.sL : void 0);
      return top.r > 0 && (relevance += result.r), language && (panelTops[top.sL] = result.top), buildSpan(result.language, result.value, false, true);
    }
    /**
     * @return {undefined}
     */
    function processBuffer() {
      ret += void 0 !== top.sL ? highlight() : processKeywords();
      /** @type {string} */
      text = "";
    }
    /**
     * @param {?} mode
     * @param {string} lexeme
     * @return {undefined}
     */
    function startNewMode(mode, lexeme) {
      ret += mode.cN ? buildSpan(mode.cN, "", true) : "";
      /** @type {Object} */
      top = Object.create(mode, {
        parent : {
          value : top
        }
      });
    }
    /**
     * @param {string} t
     * @param {string} lexeme
     * @return {?}
     */
    function processLexeme(t, lexeme) {
      if (text += t, void 0 === lexeme) {
        return processBuffer(), 0;
      }
      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        return new_mode.skip ? text += lexeme : (new_mode.eB && (text += lexeme), processBuffer(), new_mode.rB || (new_mode.eB || (text = lexeme))), startNewMode(new_mode, lexeme), new_mode.rB ? 0 : lexeme.length;
      }
      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (origin.skip) {
          text += lexeme;
        } else {
          if (!origin.rE) {
            if (!origin.eE) {
              text += lexeme;
            }
          }
          processBuffer();
          if (origin.eE) {
            /** @type {string} */
            text = lexeme;
          }
        }
        do {
          if (top.cN) {
            ret += "</span>";
          }
          if (!top.skip) {
            relevance += top.r;
          }
          top = top.parent;
        } while (top != end_mode.parent);
        return end_mode.starts && startNewMode(end_mode.starts, ""), origin.rE ? 0 : lexeme.length;
      }
      if (isIllegal(lexeme, top)) {
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.cN || "<unnamed>") + '"');
      }
      return text += lexeme, lexeme.length || 1;
    }
    var language = fn(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }
    compileLanguage(language);
    var current;
    var top = continuation || language;
    var panelTops = {};
    /** @type {string} */
    var ret = "";
    current = top;
    for (;current != language;current = current.parent) {
      if (current.cN) {
        ret = buildSpan(current.cN, "", true) + ret;
      }
    }
    /** @type {string} */
    var text = "";
    /** @type {number} */
    var relevance = 0;
    try {
      var match;
      var count;
      /** @type {number} */
      var index = 0;
      for (;;) {
        if (top.t.lastIndex = index, match = top.t.exec(value), !match) {
          break;
        }
        count = processLexeme(value.substr(index, match.index - index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      current = top;
      for (;current.parent;current = current.parent) {
        if (current.cN) {
          ret += "</span>";
        }
      }
      return{
        r : relevance,
        value : ret,
        language : name,
        top : top
      };
    } catch (exception) {
      if (-1 != exception.message.indexOf("Illegal")) {
        return{
          r : 0,
          value : escape(value)
        };
      }
      throw exception;
    }
  }
  /**
   * @param {string} text
   * @param {string} results
   * @return {?}
   */
  function highlightAuto(text, results) {
    results = results || (options.languages || Object.keys(languages));
    var result = {
      r : 0,
      value : escape(text)
    };
    var second_best = result;
    return results.filter(fn).forEach(function(key) {
      var current = highlight(key, text, false);
      /** @type {string} */
      current.language = key;
      if (current.r > second_best.r) {
        second_best = current;
      }
      if (current.r > result.r) {
        second_best = result;
        result = current;
      }
    }), second_best.language && (result.second_best = second_best), result;
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function fixMarkup(value) {
    return options.tabReplace && (value = value.replace(/^((<[^>]+>|\t)+)/gm, function(dataAndEvents, p1) {
      return p1.replace(/\t/g, options.tabReplace);
    })), options.useBR && (value = value.replace(/\n/g, "<br>")), value;
  }
  /**
   * @param {string} selector
   * @param {?} key
   * @param {string} obj
   * @return {?}
   */
  function clean(selector, key, obj) {
    var elem = key ? aliases[key] : obj;
    /** @type {Array} */
    var matched = [selector.trim()];
    return selector.match(/\bhljs\b/) || matched.push("hljs"), -1 === selector.indexOf(elem) && matched.push(elem), matched.join(" ").trim();
  }
  /**
   * @param {Element} block
   * @return {undefined}
   */
  function highlightBlock(block) {
    var language = blockLanguage(block);
    if (!scan(language)) {
      var node;
      if (options.useBR) {
        /** @type {Element} */
        node = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        node.innerHTML = block.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n");
      } else {
        /** @type {Element} */
        node = block;
      }
      var text = node.textContent;
      var result = language ? highlight(language, text, true) : highlightAuto(text);
      var original = nodeStream(node);
      if (original.length) {
        /** @type {Element} */
        var pre = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        pre.innerHTML = result.value;
        result.value = mergeStreams(original, nodeStream(pre), text);
      }
      result.value = fixMarkup(result.value);
      block.innerHTML = result.value;
      block.className = clean(block.className, language, result.language);
      block.result = {
        language : result.language,
        re : result.r
      };
      if (result.second_best) {
        block.second_best = {
          language : result.second_best.language,
          re : result.second_best.r
        };
      }
    }
  }
  /**
   * @param {?} attributes
   * @return {undefined}
   */
  function setup(attributes) {
    options = clone(options, attributes);
  }
  /**
   * @return {undefined}
   */
  function init() {
    if (!init.called) {
      /** @type {boolean} */
      init.called = true;
      /** @type {NodeList} */
      var uniqs = document.querySelectorAll("pre code");
      Array.prototype.forEach.call(uniqs, highlightBlock);
    }
  }
  /**
   * @return {undefined}
   */
  function loaded() {
    addEventListener("DOMContentLoaded", init, false);
    addEventListener("load", init, false);
  }
  /**
   * @param {string} name
   * @param {Function} setter
   * @return {undefined}
   */
  function prop(name, setter) {
    var lang = languages[name] = setter(self);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {
        /** @type {string} */
        aliases[alias] = name;
      });
    }
  }
  /**
   * @return {?}
   */
  function data() {
    return Object.keys(languages);
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function fn(name) {
    return name = (name || "").toLowerCase(), languages[name] || languages[aliases[name]];
  }
  var options = {
    classPrefix : "hljs-",
    tabReplace : null,
    useBR : false,
    languages : void 0
  };
  var languages = {};
  var aliases = {};
  return self.highlight = highlight, self.highlightAuto = highlightAuto, self.fixMarkup = fixMarkup, self.highlightBlock = highlightBlock, self.configure = setup, self.initHighlighting = init, self.initHighlightingOnLoad = loaded, self.registerLanguage = prop, self.listLanguages = data, self.getLanguage = fn, self.inherit = clone, self.IR = "[a-zA-Z]\\w*", self.UIR = "[a-zA-Z_]\\w*", self.NR = "\\b\\d+(\\.\\d+)?", self.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
  self.BNR = "\\b(0b[01]+)", self.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", self.BE = {
    b : "\\\\[\\s\\S]",
    r : 0
  }, self.ASM = {
    cN : "string",
    b : "'",
    e : "'",
    i : "\\n",
    c : [self.BE]
  }, self.QSM = {
    cN : "string",
    b : '"',
    e : '"',
    i : "\\n",
    c : [self.BE]
  }, self.PWM = {
    b : /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
  }, self.C = function(childrenVarArgs, fn, opt_attributes) {
    var obj = self.inherit({
      cN : "comment",
      b : childrenVarArgs,
      e : fn,
      c : []
    }, opt_attributes || {});
    return obj.c.push(self.PWM), obj.c.push({
      cN : "doctag",
      b : "(?:TODO|FIXME|NOTE|BUG|XXX):",
      r : 0
    }), obj;
  }, self.CLCM = self.C("//", "$"), self.CBCM = self.C("/\\*", "\\*/"), self.HCM = self.C("#", "$"), self.NM = {
    cN : "number",
    b : self.NR,
    r : 0
  }, self.CNM = {
    cN : "number",
    b : self.CNR,
    r : 0
  }, self.BNM = {
    cN : "number",
    b : self.BNR,
    r : 0
  }, self.CSSNM = {
    cN : "number",
    b : self.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    r : 0
  }, self.RM = {
    cN : "regexp",
    b : /\//,
    e : /\/[gimuy]*/,
    i : /\n/,
    c : [self.BE, {
      b : /\[/,
      e : /\]/,
      r : 0,
      c : [self.BE]
    }]
  }, self.TM = {
    cN : "title",
    b : self.IR,
    r : 0
  }, self.UTM = {
    cN : "title",
    b : self.UIR,
    r : 0
  }, self.METHOD_GUARD = {
    b : "\\.\\s*" + self.UIR,
    r : 0
  }, self.registerLanguage("apache", function(dataAndEvents) {
    var object = {
      cN : "number",
      b : "[\\$%]\\d+"
    };
    return{
      aliases : ["apacheconf"],
      cI : true,
      c : [dataAndEvents.HCM, {
        cN : "section",
        b : "</?",
        e : ">"
      }, {
        cN : "attribute",
        b : /\w+/,
        r : 0,
        k : {
          nomarkup : "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
        },
        starts : {
          e : /$/,
          r : 0,
          k : {
            literal : "on off all"
          },
          c : [{
            cN : "meta",
            b : "\\s\\[",
            e : "\\]$"
          }, {
            cN : "variable",
            b : "[\\$%]\\{",
            e : "\\}",
            c : ["self", object]
          }, object, dataAndEvents.QSM]
        }
      }],
      i : /\S/
    };
  }), self.registerLanguage("bash", function(hljs) {
    var params = {
      cN : "variable",
      v : [{
        b : /\$[\w\d#@][\w\d_]*/
      }, {
        b : /\$\{(.*?)}/
      }]
    };
    var object = {
      cN : "string",
      b : /"/,
      e : /"/,
      c : [hljs.BE, params, {
        cN : "variable",
        b : /\$\(/,
        e : /\)/,
        c : [hljs.BE]
      }]
    };
    var data = {
      cN : "string",
      b : /'/,
      e : /'/
    };
    return{
      aliases : ["sh", "zsh"],
      l : /-?[a-z\.]+/,
      k : {
        keyword : "if then else elif fi for while in do done case esac function",
        literal : "true false",
        built_in : "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
        _ : "-ne -eq -lt -gt -f -d -e -s -l -a"
      },
      c : [{
        cN : "meta",
        b : /^#![^\n]+sh\s*$/,
        r : 10
      }, {
        cN : "function",
        b : /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        rB : true,
        c : [hljs.inherit(hljs.TM, {
          b : /\w[\w\d_]*/
        })],
        r : 0
      }, hljs.HCM, object, data, params]
    };
  }), self.registerLanguage("coffeescript", function(o) {
    var OBJC_KEYWORDS = {
      keyword : "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
      literal : "true false null undefined yes no on off",
      built_in : "npm require console print module global window document"
    };
    /** @type {string} */
    var second = "[A-Za-z$_][0-9A-Za-z$_]*";
    var object = {
      cN : "subst",
      b : /#\{/,
      e : /}/,
      k : OBJC_KEYWORDS
    };
    /** @type {Array} */
    var children = [o.BNM, o.inherit(o.CNM, {
      starts : {
        e : "(\\s*/)?",
        r : 0
      }
    }), {
      cN : "string",
      v : [{
        b : /'''/,
        e : /'''/,
        c : [o.BE]
      }, {
        b : /'/,
        e : /'/,
        c : [o.BE]
      }, {
        b : /"""/,
        e : /"""/,
        c : [o.BE, object]
      }, {
        b : /"/,
        e : /"/,
        c : [o.BE, object]
      }]
    }, {
      cN : "regexp",
      v : [{
        b : "///",
        e : "///",
        c : [object, o.HCM]
      }, {
        b : "//[gim]*",
        r : 0
      }, {
        b : /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
      }]
    }, {
      b : "@" + second
    }, {
      b : "`",
      e : "`",
      eB : true,
      eE : true,
      sL : "javascript"
    }];
    /** @type {Array} */
    object.c = children;
    var c = o.inherit(o.TM, {
      b : second
    });
    /** @type {string} */
    var i = "(\\(.*\\))?\\s*\\B[-=]>";
    var gridCols = {
      cN : "params",
      b : "\\([^\\(]",
      rB : true,
      c : [{
        b : /\(/,
        e : /\)/,
        k : OBJC_KEYWORDS,
        c : ["self"].concat(children)
      }]
    };
    return{
      aliases : ["coffee", "cson", "iced"],
      k : OBJC_KEYWORDS,
      i : /\/\*/,
      c : children.concat([o.C("###", "###"), o.HCM, {
        cN : "function",
        b : "^\\s*" + second + "\\s*=\\s*" + i,
        e : "[-=]>",
        rB : true,
        c : [c, gridCols]
      }, {
        b : /[:\(,=]\s*/,
        r : 0,
        c : [{
          cN : "function",
          b : i,
          e : "[-=]>",
          rB : true,
          c : [gridCols]
        }]
      }, {
        cN : "class",
        bK : "class",
        e : "$",
        i : /[:="\[\]]/,
        c : [{
          bK : "extends",
          eW : true,
          i : /[:="\[\]]/,
          c : [c]
        }, c]
      }, {
        b : second + ":",
        e : ":",
        rB : true,
        rE : true,
        r : 0
      }])
    };
  }), self.registerLanguage("cpp", function(hljs) {
    var parent = {
      cN : "keyword",
      b : "\\b[a-z\\d_]*_t\\b"
    };
    var suiteView = {
      cN : "string",
      v : [hljs.inherit(hljs.QSM, {
        b : '((u8?|U)|L)?"'
      }), {
        b : '(u8?|U)?R"',
        e : '"',
        c : [hljs.BE]
      }, {
        b : "'\\\\?.",
        e : "'",
        i : "."
      }]
    };
    var params = {
      cN : "number",
      v : [{
        b : "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
      }, {
        b : hljs.CNR
      }],
      r : 0
    };
    var object = {
      cN : "meta",
      b : "#",
      e : "$",
      k : {
        "meta-keyword" : "if else elif endif define undef warning error line pragma ifdef ifndef"
      },
      c : [{
        b : /\\\n/,
        r : 0
      }, {
        bK : "include",
        e : "$",
        k : {
          "meta-keyword" : "include"
        },
        c : [hljs.inherit(suiteView, {
          cN : "meta-string"
        }), {
          cN : "meta-string",
          b : "<",
          e : ">",
          i : "\\n"
        }]
      }, suiteView, hljs.CLCM, hljs.CBCM]
    };
    /** @type {string} */
    var i = hljs.IR + "\\s*\\(";
    var D_KEYWORDS = {
      keyword : "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
      built_in : "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
      literal : "true false nullptr NULL"
    };
    /** @type {Array} */
    var stack = [parent, hljs.CLCM, hljs.CBCM, params, suiteView];
    return{
      aliases : ["c", "cc", "h", "c++", "h++", "hpp"],
      k : D_KEYWORDS,
      i : "</",
      c : stack.concat([object, {
        b : "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
        e : ">",
        k : D_KEYWORDS,
        c : ["self", parent]
      }, {
        b : hljs.IR + "::",
        k : D_KEYWORDS
      }, {
        v : [{
          b : /=/,
          e : /;/
        }, {
          b : /\(/,
          e : /\)/
        }, {
          bK : "new throw return else",
          e : /;/
        }],
        k : D_KEYWORDS,
        c : stack.concat([{
          b : /\(/,
          e : /\)/,
          c : stack.concat(["self"]),
          r : 0
        }]),
        r : 0
      }, {
        cN : "function",
        b : "(" + hljs.IR + "[\\*&\\s]+)+" + i,
        rB : true,
        e : /[{;=]/,
        eE : true,
        k : D_KEYWORDS,
        i : /[^\w\s\*&]/,
        c : [{
          b : i,
          rB : true,
          c : [hljs.TM],
          r : 0
        }, {
          cN : "params",
          b : /\(/,
          e : /\)/,
          k : D_KEYWORDS,
          r : 0,
          c : [hljs.CLCM, hljs.CBCM, suiteView, params]
        }, hljs.CLCM, hljs.CBCM, object]
      }])
    };
  }), self.registerLanguage("cs", function(parent) {
    var keywords = {
      keyword : "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
      literal : "null false true"
    };
    /** @type {string} */
    var r = parent.IR + "(<" + parent.IR + ">)?(\\[\\])?";
    return{
      aliases : ["csharp"],
      k : keywords,
      i : /::/,
      c : [parent.C("///", "$", {
        rB : true,
        c : [{
          cN : "doctag",
          v : [{
            b : "///",
            r : 0
          }, {
            b : "\x3c!--|--\x3e"
          }, {
            b : "</?",
            e : ">"
          }]
        }]
      }), parent.CLCM, parent.CBCM, {
        cN : "meta",
        b : "#",
        e : "$",
        k : {
          "meta-keyword" : "if else elif endif define undef warning error line region endregion pragma checksum"
        }
      }, {
        cN : "string",
        b : '@"',
        e : '"',
        c : [{
          b : '""'
        }]
      }, parent.ASM, parent.QSM, parent.CNM, {
        bK : "class interface",
        e : /[{;=]/,
        i : /[^\s:]/,
        c : [parent.TM, parent.CLCM, parent.CBCM]
      }, {
        bK : "namespace",
        e : /[{;=]/,
        i : /[^\s:]/,
        c : [parent.inherit(parent.TM, {
          b : "[a-zA-Z](\\.?\\w)*"
        }), parent.CLCM, parent.CBCM]
      }, {
        bK : "new return throw await",
        r : 0
      }, {
        cN : "function",
        b : "(" + r + "\\s+)+" + parent.IR + "\\s*\\(",
        rB : true,
        e : /[{;=]/,
        eE : true,
        k : keywords,
        c : [{
          b : parent.IR + "\\s*\\(",
          rB : true,
          c : [parent.TM],
          r : 0
        }, {
          cN : "params",
          b : /\(/,
          e : /\)/,
          eB : true,
          eE : true,
          k : keywords,
          r : 0,
          c : [parent.ASM, parent.QSM, parent.CNM, parent.CBCM]
        }, parent.CLCM, parent.CBCM]
      }]
    };
  }), self.registerLanguage("css", function(dataAndEvents) {
    /** @type {string} */
    var blue = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var c = {
      b : /[A-Z\_\.\-]+\s*:/,
      rB : true,
      e : ";",
      eW : true,
      c : [{
        cN : "attribute",
        b : /\S/,
        e : ":",
        eE : true,
        starts : {
          eW : true,
          eE : true,
          c : [{
            b : /[\w-]+\(/,
            rB : true,
            c : [{
              cN : "built_in",
              b : /[\w-]+/
            }, {
              b : /\(/,
              e : /\)/,
              c : [dataAndEvents.ASM, dataAndEvents.QSM]
            }]
          }, dataAndEvents.CSSNM, dataAndEvents.QSM, dataAndEvents.ASM, dataAndEvents.CBCM, {
            cN : "number",
            b : "#[0-9A-Fa-f]+"
          }, {
            cN : "meta",
            b : "!important"
          }]
        }
      }]
    };
    return{
      cI : true,
      i : /[=\/|'\$]/,
      c : [dataAndEvents.CBCM, {
        cN : "selector-id",
        b : /#[A-Za-z0-9_-]+/
      }, {
        cN : "selector-class",
        b : /\.[A-Za-z0-9_-]+/
      }, {
        cN : "selector-attr",
        b : /\[/,
        e : /\]/,
        i : "$"
      }, {
        cN : "selector-pseudo",
        b : /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
      }, {
        b : "@(font-face|page)",
        l : "[a-z-]+",
        k : "font-face page"
      }, {
        b : "@",
        e : "[{;]",
        i : /:/,
        c : [{
          cN : "keyword",
          b : /\w+/
        }, {
          b : /\s/,
          eW : true,
          eE : true,
          r : 0,
          c : [dataAndEvents.ASM, dataAndEvents.QSM, dataAndEvents.CSSNM]
        }]
      }, {
        cN : "selector-tag",
        b : blue,
        r : 0
      }, {
        b : "{",
        e : "}",
        i : /\S/,
        c : [dataAndEvents.CBCM, c]
      }]
    };
  }), self.registerLanguage("diff", function(dataAndEvents) {
    return{
      aliases : ["patch"],
      c : [{
        cN : "meta",
        r : 10,
        v : [{
          b : /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
        }, {
          b : /^\*\*\* +\d+,\d+ +\*\*\*\*$/
        }, {
          b : /^\-\-\- +\d+,\d+ +\-\-\-\-$/
        }]
      }, {
        cN : "comment",
        v : [{
          b : /Index: /,
          e : /$/
        }, {
          b : /=====/,
          e : /=====$/
        }, {
          b : /^\-\-\-/,
          e : /$/
        }, {
          b : /^\*{3} /,
          e : /$/
        }, {
          b : /^\+\+\+/,
          e : /$/
        }, {
          b : /\*{5}/,
          e : /\*{5}$/
        }]
      }, {
        cN : "addition",
        b : "^\\+",
        e : "$"
      }, {
        cN : "deletion",
        b : "^\\-",
        e : "$"
      }, {
        cN : "addition",
        b : "^\\!",
        e : "$"
      }]
    };
  }), self.registerLanguage("http", function(dataAndEvents) {
    /** @type {string} */
    var regexp = "HTTP/[0-9\\.]+";
    return{
      aliases : ["https"],
      i : "\\S",
      c : [{
        b : "^" + regexp,
        e : "$",
        c : [{
          cN : "number",
          b : "\\b\\d{3}\\b"
        }]
      }, {
        b : "^[A-Z]+ (.*?) " + regexp + "$",
        rB : true,
        e : "$",
        c : [{
          cN : "string",
          b : " ",
          e : " ",
          eB : true,
          eE : true
        }, {
          b : regexp
        }, {
          cN : "keyword",
          b : "[A-Z]+"
        }]
      }, {
        cN : "attribute",
        b : "^\\w",
        e : ": ",
        eE : true,
        i : "\\n|\\s|=",
        starts : {
          e : "$",
          r : 0
        }
      }, {
        b : "\\n\\n",
        starts : {
          sL : [],
          eW : true
        }
      }]
    };
  }), self.registerLanguage("ini", function(path) {
    var source = {
      cN : "string",
      c : [path.BE],
      v : [{
        b : "'''",
        e : "'''",
        r : 10
      }, {
        b : '"""',
        e : '"""',
        r : 10
      }, {
        b : '"',
        e : '"'
      }, {
        b : "'",
        e : "'"
      }]
    };
    return{
      aliases : ["toml"],
      cI : true,
      i : /\S/,
      c : [path.C(";", "$"), path.HCM, {
        cN : "section",
        b : /^\s*\[+/,
        e : /\]+/
      }, {
        b : /^[a-z0-9\[\]_-]+\s*=\s*/,
        e : "$",
        rB : true,
        c : [{
          cN : "attr",
          b : /[a-z0-9\[\]_-]+/
        }, {
          b : /=/,
          eW : true,
          r : 0,
          c : [{
            cN : "literal",
            b : /\bon|off|true|false|yes|no\b/
          }, {
            cN : "variable",
            v : [{
              b : /\$[\w\d"][\w\d_]*/
            }, {
              b : /\$\{(.*?)}/
            }]
          }, source, {
            cN : "number",
            b : /([\+\-]+)?[\d]+_[\d_]+/
          }, path.NM]
        }]
      }]
    };
  }), self.registerLanguage("java", function(sandboxOut) {
    /** @type {string} */
    var t = sandboxOut.UIR + "(<" + sandboxOut.UIR + "(\\s*,\\s*" + sandboxOut.UIR + ")*>)?";
    /** @type {string} */
    var k = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports";
    /** @type {string} */
    var blue = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?";
    var hcNormal = {
      cN : "number",
      b : blue,
      r : 0
    };
    return{
      aliases : ["jsp"],
      k : k,
      i : /<\/|#/,
      c : [sandboxOut.C("/\\*\\*", "\\*/", {
        r : 0,
        c : [{
          b : /\w+@/,
          r : 0
        }, {
          cN : "doctag",
          b : "@[A-Za-z]+"
        }]
      }), sandboxOut.CLCM, sandboxOut.CBCM, sandboxOut.ASM, sandboxOut.QSM, {
        cN : "class",
        bK : "class interface",
        e : /[{;=]/,
        eE : true,
        k : "class interface",
        i : /[:"\[\]]/,
        c : [{
          bK : "extends implements"
        }, sandboxOut.UTM]
      }, {
        bK : "new throw return else",
        r : 0
      }, {
        cN : "function",
        b : "(" + t + "\\s+)+" + sandboxOut.UIR + "\\s*\\(",
        rB : true,
        e : /[{;=]/,
        eE : true,
        k : k,
        c : [{
          b : sandboxOut.UIR + "\\s*\\(",
          rB : true,
          r : 0,
          c : [sandboxOut.UTM]
        }, {
          cN : "params",
          b : /\(/,
          e : /\)/,
          k : k,
          r : 0,
          c : [sandboxOut.ASM, sandboxOut.QSM, sandboxOut.CNM, sandboxOut.CBCM]
        }, sandboxOut.CLCM, sandboxOut.CBCM]
      }, hcNormal, {
        cN : "meta",
        b : "@[A-Za-z]+"
      }]
    };
  }), self.registerLanguage("javascript", function(hljs) {
    return{
      aliases : ["js", "jsx"],
      k : {
        keyword : "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
        literal : "true false null undefined NaN Infinity",
        built_in : "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
      },
      c : [{
        cN : "meta",
        r : 10,
        b : /^\s*['"]use (strict|asm)['"]/
      }, {
        cN : "meta",
        b : /^#!/,
        e : /$/
      }, hljs.ASM, hljs.QSM, {
        cN : "string",
        b : "`",
        e : "`",
        c : [hljs.BE, {
          cN : "subst",
          b : "\\$\\{",
          e : "\\}"
        }]
      }, hljs.CLCM, hljs.CBCM, {
        cN : "number",
        v : [{
          b : "\\b(0[bB][01]+)"
        }, {
          b : "\\b(0[oO][0-7]+)"
        }, {
          b : hljs.CNR
        }],
        r : 0
      }, {
        b : "(" + hljs.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k : "return throw case",
        c : [hljs.CLCM, hljs.CBCM, hljs.RM, {
          b : /</,
          e : /(\/\w+|\w+\/)>/,
          sL : "xml",
          c : [{
            b : /<\w+\s*\/>/,
            skip : true
          }, {
            b : /<\w+/,
            e : /(\/\w+|\w+\/)>/,
            skip : true,
            c : ["self"]
          }]
        }],
        r : 0
      }, {
        cN : "function",
        bK : "function",
        e : /\{/,
        eE : true,
        c : [hljs.inherit(hljs.TM, {
          b : /[A-Za-z$_][0-9A-Za-z$_]*/
        }), {
          cN : "params",
          b : /\(/,
          e : /\)/,
          eB : true,
          eE : true,
          c : [hljs.CLCM, hljs.CBCM]
        }],
        i : /\[|%/
      }, {
        b : /\$[(.]/
      }, hljs.METHOD_GUARD, {
        cN : "class",
        bK : "class",
        e : /[{;=]/,
        eE : true,
        i : /[:"\[\]]/,
        c : [{
          bK : "extends"
        }, hljs.UTM]
      }, {
        bK : "constructor",
        e : /\{/,
        eE : true
      }],
      i : /#(?!!)/
    };
  }), self.registerLanguage("json", function(_) {
    var k = {
      literal : "true false null"
    };
    /** @type {Array} */
    var self = [_.QSM, _.CNM];
    var reversed = {
      e : ",",
      eW : true,
      eE : true,
      c : self,
      k : k
    };
    var source = {
      b : "{",
      e : "}",
      c : [{
        cN : "attr",
        b : /"/,
        e : /"/,
        c : [_.BE],
        i : "\\n"
      }, _.inherit(reversed, {
        b : /:/
      })],
      i : "\\S"
    };
    var obj = {
      b : "\\[",
      e : "\\]",
      c : [_.inherit(reversed)],
      i : "\\S"
    };
    return self.splice(self.length, 0, source, obj), {
      c : self,
      k : k,
      i : "\\S"
    };
  }), self.registerLanguage("makefile", function(dataAndEvents) {
    var object = {
      cN : "variable",
      b : /\$\(/,
      e : /\)/,
      c : [dataAndEvents.BE]
    };
    return{
      aliases : ["mk", "mak"],
      c : [dataAndEvents.HCM, {
        b : /^\w+\s*\W*=/,
        rB : true,
        r : 0,
        starts : {
          e : /\s*\W*=/,
          eE : true,
          starts : {
            e : /$/,
            r : 0,
            c : [object]
          }
        }
      }, {
        cN : "section",
        b : /^[\w]+:\s*$/
      }, {
        cN : "meta",
        b : /^\.PHONY:/,
        e : /$/,
        k : {
          "meta-keyword" : ".PHONY"
        },
        l : /[\.\w]+/
      }, {
        b : /^\t+/,
        e : /$/,
        r : 0,
        c : [dataAndEvents.QSM, object]
      }]
    };
  }), self.registerLanguage("xml", function(sandboxOut) {
    /** @type {string} */
    var blue = "[A-Za-z0-9\\._:-]+";
    var c = {
      eW : true,
      i : /</,
      r : 0,
      c : [{
        cN : "attr",
        b : blue,
        r : 0
      }, {
        b : /=\s*/,
        r : 0,
        c : [{
          cN : "string",
          endsParent : true,
          v : [{
            b : /"/,
            e : /"/
          }, {
            b : /'/,
            e : /'/
          }, {
            b : /[^\s"'=<>`]+/
          }]
        }]
      }]
    };
    return{
      aliases : ["html", "xhtml", "rss", "atom", "xsl", "plist"],
      cI : true,
      c : [{
        cN : "meta",
        b : "<!DOCTYPE",
        e : ">",
        r : 10,
        c : [{
          b : "\\[",
          e : "\\]"
        }]
      }, sandboxOut.C("\x3c!--", "--\x3e", {
        r : 10
      }), {
        b : "<\\!\\[CDATA\\[",
        e : "\\]\\]>",
        r : 10
      }, {
        b : /<\?(php)?/,
        e : /\?>/,
        sL : "php",
        c : [{
          b : "/\\*",
          e : "\\*/",
          skip : true
        }]
      }, {
        cN : "tag",
        b : "<style(?=\\s|>|$)",
        e : ">",
        k : {
          name : "style"
        },
        c : [c],
        starts : {
          e : "</style>",
          rE : true,
          sL : ["css", "xml"]
        }
      }, {
        cN : "tag",
        b : "<script(?=\\s|>|$)",
        e : ">",
        k : {
          name : "script"
        },
        c : [c],
        starts : {
          e : "\x3c/script>",
          rE : true,
          sL : ["actionscript", "javascript", "handlebars", "xml"]
        }
      }, {
        cN : "meta",
        v : [{
          b : /<\?xml/,
          e : /\?>/,
          r : 10
        }, {
          b : /<\?\w+/,
          e : /\?>/
        }]
      }, {
        cN : "tag",
        b : "</?",
        e : "/?>",
        c : [{
          cN : "name",
          b : /[^\/><\s]+/,
          r : 0
        }, c]
      }]
    };
  }), self.registerLanguage("markdown", function(dataAndEvents) {
    return{
      aliases : ["md", "mkdown", "mkd"],
      c : [{
        cN : "section",
        v : [{
          b : "^#{1,6}",
          e : "$"
        }, {
          b : "^.+?\\n[=-]{2,}$"
        }]
      }, {
        b : "<",
        e : ">",
        sL : "xml",
        r : 0
      }, {
        cN : "bullet",
        b : "^([*+-]|(\\d+\\.))\\s+"
      }, {
        cN : "strong",
        b : "[*_]{2}.+?[*_]{2}"
      }, {
        cN : "emphasis",
        v : [{
          b : "\\*.+?\\*"
        }, {
          b : "_.+?_",
          r : 0
        }]
      }, {
        cN : "quote",
        b : "^>\\s+",
        e : "$"
      }, {
        cN : "code",
        v : [{
          b : "^```w*s*$",
          e : "^```s*$"
        }, {
          b : "`.+?`"
        }, {
          b : "^( {4}|\t)",
          e : "$",
          r : 0
        }]
      }, {
        b : "^[-\\*]{3,}",
        e : "$"
      }, {
        b : "\\[.+?\\][\\(\\[].*?[\\)\\]]",
        rB : true,
        c : [{
          cN : "string",
          b : "\\[",
          e : "\\]",
          eB : true,
          rE : true,
          r : 0
        }, {
          cN : "link",
          b : "\\]\\(",
          e : "\\)",
          eB : true,
          eE : true
        }, {
          cN : "symbol",
          b : "\\]\\[",
          e : "\\]",
          eB : true,
          eE : true
        }],
        r : 10
      }, {
        b : "^\\[.+\\]:",
        rB : true,
        c : [{
          cN : "symbol",
          b : "\\[",
          e : "\\]:",
          eB : true,
          eE : true,
          starts : {
            cN : "link",
            e : "$"
          }
        }]
      }]
    };
  }), self.registerLanguage("nginx", function(rgbaLayer) {
    var params = {
      cN : "variable",
      v : [{
        b : /\$\d+/
      }, {
        b : /\$\{/,
        e : /}/
      }, {
        b : "[\\$\\@]" + rgbaLayer.UIR
      }]
    };
    var hash = {
      eW : true,
      l : "[a-z/_]+",
      k : {
        literal : "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
      },
      r : 0,
      i : "=>",
      c : [rgbaLayer.HCM, {
        cN : "string",
        c : [rgbaLayer.BE, params],
        v : [{
          b : /"/,
          e : /"/
        }, {
          b : /'/,
          e : /'/
        }]
      }, {
        b : "([a-z]+):/",
        e : "\\s",
        eW : true,
        eE : true,
        c : [params]
      }, {
        cN : "regexp",
        c : [rgbaLayer.BE, params],
        v : [{
          b : "\\s\\^",
          e : "\\s|{|;",
          rE : true
        }, {
          b : "~\\*?\\s+",
          e : "\\s|{|;",
          rE : true
        }, {
          b : "\\*(\\.[a-z\\-]+)+"
        }, {
          b : "([a-z\\-]+\\.)+\\*"
        }]
      }, {
        cN : "number",
        b : "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
      }, {
        cN : "number",
        b : "\\b\\d+[kKmMgGdshdwy]*\\b",
        r : 0
      }, params]
    };
    return{
      aliases : ["nginxconf"],
      c : [rgbaLayer.HCM, {
        b : rgbaLayer.UIR + "\\s+{",
        rB : true,
        e : "{",
        c : [{
          cN : "section",
          b : rgbaLayer.UIR
        }],
        r : 0
      }, {
        b : rgbaLayer.UIR + "\\s",
        e : ";|{",
        rB : true,
        c : [{
          cN : "attribute",
          b : rgbaLayer.UIR,
          starts : hash
        }],
        r : 0
      }],
      i : "[^\\s\\}]"
    };
  }), self.registerLanguage("objectivec", function(dataAndEvents) {
    var object = {
      cN : "built_in",
      b : "(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"
    };
    var OBJC_KEYWORDS = {
      keyword : "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
      literal : "false true FALSE TRUE nil YES NO NULL",
      built_in : "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    };
    /** @type {RegExp} */
    var pX = /[a-zA-Z@][a-zA-Z0-9_]*/;
    /** @type {string} */
    var k = "@interface @class @protocol @implementation";
    return{
      aliases : ["mm", "objc", "obj-c"],
      k : OBJC_KEYWORDS,
      l : pX,
      i : "</",
      c : [object, dataAndEvents.CLCM, dataAndEvents.CBCM, dataAndEvents.CNM, dataAndEvents.QSM, {
        cN : "string",
        v : [{
          b : '@"',
          e : '"',
          i : "\\n",
          c : [dataAndEvents.BE]
        }, {
          b : "'",
          e : "[^\\\\]'",
          i : "[^\\\\][^']"
        }]
      }, {
        cN : "meta",
        b : "#",
        e : "$",
        c : [{
          cN : "meta-string",
          v : [{
            b : '"',
            e : '"'
          }, {
            b : "<",
            e : ">"
          }]
        }]
      }, {
        cN : "class",
        b : "(" + k.split(" ").join("|") + ")\\b",
        e : "({|$)",
        eE : true,
        k : k,
        l : pX,
        c : [dataAndEvents.UTM]
      }, {
        b : "\\." + dataAndEvents.UIR,
        r : 0
      }]
    };
  }), self.registerLanguage("perl", function(sandboxOut) {
    /** @type {string} */
    var k = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";
    var object = {
      cN : "subst",
      b : "[$@]\\{",
      e : "\\}",
      k : k
    };
    var b = {
      b : "->{",
      e : "}"
    };
    var a = {
      v : [{
        b : /\$\d/
      }, {
        b : /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
      }, {
        b : /[\$%@][^\s\w{]/,
        r : 0
      }]
    };
    /** @type {Array} */
    var removeCombos = [sandboxOut.BE, object, a];
    /** @type {Array} */
    var c = [a, sandboxOut.HCM, sandboxOut.C("^\\=\\w", "\\=cut", {
      eW : true
    }), b, {
      cN : "string",
      c : removeCombos,
      v : [{
        b : "q[qwxr]?\\s*\\(",
        e : "\\)",
        r : 5
      }, {
        b : "q[qwxr]?\\s*\\[",
        e : "\\]",
        r : 5
      }, {
        b : "q[qwxr]?\\s*\\{",
        e : "\\}",
        r : 5
      }, {
        b : "q[qwxr]?\\s*\\|",
        e : "\\|",
        r : 5
      }, {
        b : "q[qwxr]?\\s*\\<",
        e : "\\>",
        r : 5
      }, {
        b : "qw\\s+q",
        e : "q",
        r : 5
      }, {
        b : "'",
        e : "'",
        c : [sandboxOut.BE]
      }, {
        b : '"',
        e : '"'
      }, {
        b : "`",
        e : "`",
        c : [sandboxOut.BE]
      }, {
        b : "{\\w+}",
        c : [],
        r : 0
      }, {
        b : "-?\\w+\\s*\\=\\>",
        c : [],
        r : 0
      }]
    }, {
      cN : "number",
      b : "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      r : 0
    }, {
      b : "(\\/\\/|" + sandboxOut.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      k : "split return print reverse grep",
      r : 0,
      c : [sandboxOut.HCM, {
        cN : "regexp",
        b : "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
        r : 10
      }, {
        cN : "regexp",
        b : "(m|qr)?/",
        e : "/[a-z]*",
        c : [sandboxOut.BE],
        r : 0
      }]
    }, {
      cN : "function",
      bK : "sub",
      e : "(\\s*\\(.*?\\))?[;{]",
      eE : true,
      r : 5,
      c : [sandboxOut.TM]
    }, {
      b : "-\\w\\b",
      r : 0
    }, {
      b : "^__DATA__$",
      e : "^__END__$",
      sL : "mojolicious",
      c : [{
        b : "^@@.*",
        e : "$",
        cN : "comment"
      }]
    }];
    return object.c = c, b.c = c, {
      aliases : ["pl", "pm"],
      l : /[\w\.]+/,
      k : k,
      c : c
    };
  }), self.registerLanguage("php", function(parent) {
    var c = {
      b : "\\$+[a-zA-Z_\u007f-\u00c3\u00bf][a-zA-Z0-9_\u007f-\u00c3\u00bf]*"
    };
    var object = {
      cN : "meta",
      b : /<\?(php)?|\?>/
    };
    var source = {
      cN : "string",
      c : [parent.BE, object],
      v : [{
        b : 'b"',
        e : '"'
      }, {
        b : "b'",
        e : "'"
      }, parent.inherit(parent.ASM, {
        i : null
      }), parent.inherit(parent.QSM, {
        i : null
      })]
    };
    var v = {
      v : [parent.BNM, parent.CNM]
    };
    return{
      aliases : ["php3", "php4", "php5", "php6"],
      cI : true,
      k : "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
      c : [parent.HCM, parent.C("//", "$", {
        c : [object]
      }), parent.C("/\\*", "\\*/", {
        c : [{
          cN : "doctag",
          b : "@[A-Za-z]+"
        }]
      }), parent.C("__halt_compiler.+?;", false, {
        eW : true,
        k : "__halt_compiler",
        l : parent.UIR
      }), {
        cN : "string",
        b : /<<<['"]?\w+['"]?$/,
        e : /^\w+;?$/,
        c : [parent.BE, {
          cN : "subst",
          v : [{
            b : /\$\w+/
          }, {
            b : /\{\$/,
            e : /\}/
          }]
        }]
      }, object, c, {
        b : /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      }, {
        cN : "function",
        bK : "function",
        e : /[;{]/,
        eE : true,
        i : "\\$|\\[|%",
        c : [parent.UTM, {
          cN : "params",
          b : "\\(",
          e : "\\)",
          c : ["self", c, parent.CBCM, source, v]
        }]
      }, {
        cN : "class",
        bK : "class interface",
        e : "{",
        eE : true,
        i : /[:\(\$"]/,
        c : [{
          bK : "extends implements"
        }, parent.UTM]
      }, {
        bK : "namespace",
        e : ";",
        i : /[\.']/,
        c : [parent.UTM]
      }, {
        bK : "use",
        e : ";",
        c : [parent.UTM]
      }, {
        b : "=>"
      }, source, v]
    };
  }), self.registerLanguage("python", function(dataAndEvents) {
    var data = {
      cN : "meta",
      b : /^(>>>|\.\.\.) /
    };
    var source = {
      cN : "string",
      c : [dataAndEvents.BE],
      v : [{
        b : /(u|b)?r?'''/,
        e : /'''/,
        c : [data],
        r : 10
      }, {
        b : /(u|b)?r?"""/,
        e : /"""/,
        c : [data],
        r : 10
      }, {
        b : /(u|r|ur)'/,
        e : /'/,
        r : 10
      }, {
        b : /(u|r|ur)"/,
        e : /"/,
        r : 10
      }, {
        b : /(b|br)'/,
        e : /'/
      }, {
        b : /(b|br)"/,
        e : /"/
      }, dataAndEvents.ASM, dataAndEvents.QSM]
    };
    var message = {
      cN : "number",
      r : 0,
      v : [{
        b : dataAndEvents.BNR + "[lLjJ]?"
      }, {
        b : "\\b(0o[0-7]+)[lLjJ]?"
      }, {
        b : dataAndEvents.CNR + "[lLjJ]?"
      }]
    };
    var object = {
      cN : "params",
      b : /\(/,
      e : /\)/,
      c : ["self", data, message, source]
    };
    return{
      aliases : ["py", "gyp"],
      k : {
        keyword : "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
        built_in : "Ellipsis NotImplemented"
      },
      i : /(<\/|->|\?)/,
      c : [data, message, source, dataAndEvents.HCM, {
        v : [{
          cN : "function",
          bK : "def",
          r : 10
        }, {
          cN : "class",
          bK : "class"
        }],
        e : /:/,
        i : /[${=;\n,]/,
        c : [dataAndEvents.UTM, object, {
          b : /->/,
          eW : true,
          k : "None"
        }]
      }, {
        cN : "meta",
        b : /^[\t ]*@/,
        e : /$/
      }, {
        b : /\b(print|exec)\(/
      }]
    };
  }), self.registerLanguage("ruby", function(parent) {
    /** @type {string} */
    var blue = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
    var keywords = {
      keyword : "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
      literal : "true false nil"
    };
    var data = {
      cN : "doctag",
      b : "@[A-Za-z]+"
    };
    var c = {
      b : "#<",
      e : ">"
    };
    /** @type {Array} */
    var aArgs = [parent.C("#", "$", {
      c : [data]
    }), parent.C("^\\=begin", "^\\=end", {
      c : [data],
      r : 10
    }), parent.C("^__END__", "\\n$")];
    var props = {
      cN : "subst",
      b : "#\\{",
      e : "}",
      k : keywords
    };
    var message = {
      cN : "string",
      c : [parent.BE, props],
      v : [{
        b : /'/,
        e : /'/
      }, {
        b : /"/,
        e : /"/
      }, {
        b : /`/,
        e : /`/
      }, {
        b : "%[qQwWx]?\\(",
        e : "\\)"
      }, {
        b : "%[qQwWx]?\\[",
        e : "\\]"
      }, {
        b : "%[qQwWx]?{",
        e : "}"
      }, {
        b : "%[qQwWx]?<",
        e : ">"
      }, {
        b : "%[qQwWx]?/",
        e : "/"
      }, {
        b : "%[qQwWx]?%",
        e : "%"
      }, {
        b : "%[qQwWx]?-",
        e : "-"
      }, {
        b : "%[qQwWx]?\\|",
        e : "\\|"
      }, {
        b : /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
      }]
    };
    var object = {
      cN : "params",
      b : "\\(",
      e : "\\)",
      endsParent : true,
      k : keywords
    };
    /** @type {Array} */
    var name = [message, c, {
      cN : "class",
      bK : "class module",
      e : "$|;",
      i : /=/,
      c : [parent.inherit(parent.TM, {
        b : "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
      }), {
        b : "<\\s*",
        c : [{
          b : "(" + parent.IR + "::)?" + parent.IR
        }]
      }].concat(aArgs)
    }, {
      cN : "function",
      bK : "def",
      e : "$|;",
      c : [parent.inherit(parent.TM, {
        b : blue
      }), object].concat(aArgs)
    }, {
      b : parent.IR + "::"
    }, {
      cN : "symbol",
      b : parent.UIR + "(\\!|\\?)?:",
      r : 0
    }, {
      cN : "symbol",
      b : ":(?!\\s)",
      c : [message, {
        b : blue
      }],
      r : 0
    }, {
      cN : "number",
      b : "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      r : 0
    }, {
      b : "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
      cN : "params",
      b : /\|/,
      e : /\|/,
      k : keywords
    }, {
      b : "(" + parent.RSR + ")\\s*",
      c : [c, {
        cN : "regexp",
        c : [parent.BE, props],
        i : /\n/,
        v : [{
          b : "/",
          e : "/[a-z]*"
        }, {
          b : "%r{",
          e : "}[a-z]*"
        }, {
          b : "%r\\(",
          e : "\\)[a-z]*"
        }, {
          b : "%r!",
          e : "![a-z]*"
        }, {
          b : "%r\\[",
          e : "\\][a-z]*"
        }]
      }].concat(aArgs),
      r : 0
    }].concat(aArgs);
    /** @type {Array} */
    props.c = name;
    /** @type {Array} */
    object.c = name;
    /** @type {string} */
    var u = "[>?]>";
    /** @type {string} */
    var d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>";
    /** @type {string} */
    var b = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>";
    /** @type {Array} */
    var caseSensitive = [{
      b : /^\s*=>/,
      starts : {
        e : "$",
        c : name
      }
    }, {
      cN : "meta",
      b : "^(" + u + "|" + d + "|" + b + ")",
      starts : {
        e : "$",
        c : name
      }
    }];
    return{
      aliases : ["rb", "gemspec", "podspec", "thor", "irb"],
      k : keywords,
      i : /\/\*/,
      c : aArgs.concat(caseSensitive).concat(name)
    };
  }), self.registerLanguage("sql", function(path) {
    var name = path.C("--", "$");
    return{
      cI : true,
      i : /[<>{}*#]/,
      c : [{
        bK : "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
        e : /;/,
        eW : true,
        l : /[\w\.]+/,
        k : {
          keyword : "health fitness welness beauty healthy food medicine herbal fashion lifestyle",
          literal : "true false null",
          built_in : "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
        },
        c : [{
          cN : "string",
          b : "'",
          e : "'",
          c : [path.BE, {
            b : "''"
          }]
        }, {
          cN : "string",
          b : '"',
          e : '"',
          c : [path.BE, {
            b : '""'
          }]
        }, {
          cN : "string",
          b : "`",
          e : "`",
          c : [path.BE]
        }, path.CNM, path.CBCM, name]
      }, path.CBCM, name]
    };
  }), self;
});
hljs.initHighlighting();
