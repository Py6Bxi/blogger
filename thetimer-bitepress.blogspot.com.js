!function(i) {
  var e$$1 = {
    init : function(e$$0) {
      var t = {
        timer : null,
        timerSeconds : 10,
        callback : function() {
        },
        timerCurrent : 0,
        showPercentage : false,
        fill : false,
        color : "#CCC"
      };
      return t = i.extend(t, e$$0), this.each(function() {
        var e = i(this);
        if (!e.data("pietimer")) {
          e.addClass("pietimer");
          e.css({
            fontSize : e.width()
          });
          e.data("pietimer", t);
          if (t.showPercentage) {
            e.find(".percent").show();
          }
          if (t.fill) {
            e.addClass("fill");
          }
          e.pietimer("start");
        }
      });
    },
    stopWatch : function() {
      var e = i(this).data("pietimer");
      if (e) {
        var t = (e.timerFinish - (new Date).getTime()) / 1E3;
        if (t <= 0) {
          clearInterval(e.timer);
          i(this).pietimer("drawTimer", 100);
          e.callback();
        } else {
          var r = 100 - t / e.timerSeconds * 100;
          i(this).pietimer("drawTimer", r);
        }
      }
    },
    drawTimer : function(e) {
      $this = i(this);
      var t = $this.data("pietimer");
      if (t) {
        $this.html('<div class="percent"></div><div class="slice' + (e > 50 ? ' gt50"' : '"') + '><div class="pie"></div>' + (e > 50 ? '<div class="pie fill"></div>' : "") + "</div>");
        var r = 3.6 * e;
        $this.find(".slice .pie").css({
          "-moz-transform" : "rotate(" + r + "deg)",
          "-webkit-transform" : "rotate(" + r + "deg)",
          "-o-transform" : "rotate(" + r + "deg)",
          transform : "rotate(" + r + "deg)"
        });
        $this.find(".percent").html(Math.round(e) + "%");
        if (t.showPercentage) {
          $this.find(".percent").show();
        }
        if ($this.hasClass("fill")) {
          $this.find(".slice .pie").css({
            backgroundColor : t.color
          });
        } else {
          $this.find(".slice .pie").css({
            borderColor : t.color
          });
        }
      }
    },
    start : function() {
      var e = i(this).data("pietimer");
      if (e) {
        e.timerFinish = (new Date).getTime() + 1E3 * e.timerSeconds;
        i(this).pietimer("drawTimer", 0);
        e.timer = setInterval("$this.pietimer('stopWatch')", 50);
      }
    },
    reset : function() {
      var e = i(this).data("pietimer");
      if (e) {
        clearInterval(e.timer);
        i(this).pietimer("drawTimer", 0);
      }
    }
  };
  i.fn.pietimer = function(t) {
    return e$$1[t] ? e$$1[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void i.error("Method " + t + " does not exist on jQuery.pietimer") : e$$1.init.apply(this, arguments);
  };
}(jQuery);
