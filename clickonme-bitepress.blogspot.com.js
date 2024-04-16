var Arlina = {
  init : function(n) {
    this.run(n);
    document.cookie = "nct=0;";
  },
  readData : function(n) {
    var e = n + "=";
    var t = decodeURIComponent(document.cookie).split(";");
    var o = 0;
    for (;o < t.length;o++) {
      var c = t[o];
      for (;" " == c.charAt(0);) {
        c = c.substring(1);
      }
      if (0 == c.indexOf(e)) {
        return c.substring(e.length, c.length);
      }
    }
    return "";
  },
  run : function(n) {
    var e = n.click;
    var t = n.interval;
    var o = document.getElementsByClassName("Arlina");
    var c = 0;
    var r = o.length;
    for (;c < r;c++) {
      o[c].addEventListener("click", function() {
        tn = Arlina.readData("nct");
        po = tn - 1 + 2;
        if (Arlina.changer(e, t)) {
          document.cookie = "nct=" + po + ";";
        } else {
          Arlina.n("pointer-events:none;");
        }
      });
    }
  },
  changer : function(n, e) {
    return tc = this.readData("nct") - 1 + 2, tc != n || (setTimeout(function() {
      document.cookie = "nct=0;";
      Arlina.n("pointer-events:cursor;");
    }, e), false);
  },
  n : function(n) {
    var e = document.getElementsByClassName("Arlina");
    var t = 0;
    var o = e.length;
    for (;t < o;t++) {
      e[t].style = n;
    }
  }
};
