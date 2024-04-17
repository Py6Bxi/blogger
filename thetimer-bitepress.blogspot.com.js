!function($) {
  var app = {
    /**
     * @param {?} config
     * @return {?}
     */
    init : function(config) {
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
      return options = $.extend(options, config), this.each(function() {
        var element = $(this);
        if (!element.data("pietimer")) {
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
        var n = 3.6 * i;
        $this.find(".slice .pie").css({
          "-moz-transform" : "rotate(" + n + "deg)",
          "-webkit-transform" : "rotate(" + n + "deg)",
          "-o-transform" : "rotate(" + n + "deg)",
          transform : "rotate(" + n + "deg)"
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
        timer.timerFinish = (new Date).getTime() + 1E3 * timer.timerSeconds;
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
   * @param {Object} prop
   * @return {?}
   */
  $.fn.pietimer = function(prop) {
    return app[prop] ? app[prop].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof prop && prop ? void $.error("Method " + prop + " does not exist on jQuery.pietimer") : app.init.apply(this, arguments);
  };
}(jQuery);
