var Arlina = {
  /**
   * @param {Object} action
   * @return {undefined}
   */
  init : function(action) {
    this.run(action);
    /** @type {string} */
    document.cookie = "nct=0;";
  },
  /**
   * @param {string} name
   * @return {?}
   */
  readData : function(name) {
    /** @type {string} */
    var nameEQ = name + "=";
    /** @type {Array.<string>} */
    var codeSegments = decodeURIComponent(document.cookie).split(";");
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      /** @type {string} */
      var c = codeSegments[i];
      for (;" " == c.charAt(0);) {
        /** @type {string} */
        c = c.substring(1);
      }
      if (0 == c.indexOf(nameEQ)) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return "";
  },
  /**
   * @param {Object} options
   * @return {undefined}
   */
  run : function(options) {
    var which = options.click;
    var interval = options.interval;
    /** @type {NodeList} */
    var codeSegments = document.getElementsByClassName("Arlina");
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var valuesLen = codeSegments.length;
    for (;i < valuesLen;i++) {
      codeSegments[i].addEventListener("click", function() {
        tn = Arlina.readData("nct");
        /** @type {number} */
        po = tn - 1 + 2;
        if (Arlina.changer(which, interval)) {
          /** @type {string} */
          document.cookie = "nct=" + po + ";";
        } else {
          Arlina.n("pointer-events:none;");
        }
      });
    }
  },
  /**
   * @param {number} object
   * @param {?} millis
   * @return {?}
   */
  changer : function(object, millis) {
    return tc = this.readData("nct") - 1 + 2, tc != object || (setTimeout(function() {
      /** @type {string} */
      document.cookie = "nct=0;";
      Arlina.n("pointer-events:cursor;");
    }, millis), false);
  },
  /**
   * @param {string} value
   * @return {undefined}
   */
  n : function(value) {
    /** @type {NodeList} */
    var cTaskName1 = document.getElementsByClassName("Arlina");
    /** @type {number} */
    var k = 0;
    /** @type {number} */
    var numrows = cTaskName1.length;
    for (;k < numrows;k++) {
      /** @type {string} */
      cTaskName1[k].style = value;
    }
  }
};
