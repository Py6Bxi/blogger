/**
 * @param {number} days
 * @return {undefined}
 */
function loophalaman(days) {
  /** @type {string} */
  var html = "";
  /** @type {number} */
  nomerkiri = parseInt(numshowpage / 2);
  if (nomerkiri == numshowpage - nomerkiri) {
    /** @type {number} */
    numshowpage = 2 * nomerkiri + 1;
  }
  /** @type {number} */
  mulai = nomerhal - nomerkiri;
  if (mulai < 1) {
    /** @type {number} */
    mulai = 1;
  }
  /** @type {number} */
  maksimal = parseInt(days / postperpage) + 1;
  if (maksimal - 1 == days / postperpage) {
    maksimal -= 1;
  }
  /** @type {number} */
  akhir = mulai + numshowpage - 1;
  if (akhir > maksimal) {
    /** @type {number} */
    akhir = maksimal;
  }
  html += "<span class='showpageOf'>Page " + nomerhal + " of " + maksimal + "</span>";
  /** @type {number} */
  var s = parseInt(nomerhal) - 1;
  if (nomerhal > 1) {
    html += 2 == nomerhal ? "page" == jenis ? '<span class="showpage"><a href="' + home_page + '">' + upPageWord + "</a></span>" : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">' + upPageWord + "</a></span>" : "page" == jenis ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + s + ');return false">' + upPageWord + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + s + ');return false">' + upPageWord + 
    "</a></span>";
  }
  if (mulai > 1) {
    html += "page" == jenis ? '<span class="showpageNum"><a href="' + home_page + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>';
  }
  if (mulai > 2) {
    html += "";
  }
  /** @type {number} */
  var r = mulai;
  for (;r <= akhir;r++) {
    html += nomerhal == r ? '<span class="showpagePoint">' + r + "</span>" : 1 == r ? "page" == jenis ? '<span class="showpageNum"><a href="' + home_page + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>' : "page" == jenis ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + r + ');return false">' + r + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + r + ');return false">' + 
    r + "</a></span>";
  }
  if (akhir < maksimal - 1) {
    html += "";
  }
  if (akhir < maksimal) {
    html += "page" == jenis ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + maksimal + ');return false">' + maksimal + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + maksimal + ');return false">' + maksimal + "</a></span>";
  }
  /** @type {number} */
  var n = parseInt(nomerhal) + 1;
  if (nomerhal < maksimal) {
    html += "page" == jenis ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + n + ');return false">' + downPageWord + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + n + ');return false">' + downPageWord + "</a></span>";
  }
  /** @type {NodeList} */
  var codeSegments = document.getElementsByName("pageArea");
  /** @type {(HTMLElement|null)} */
  var me = document.getElementById("blog-pager");
  /** @type {number} */
  var i = 0;
  for (;i < codeSegments.length;i++) {
    /** @type {string} */
    codeSegments[i].innerHTML = html;
  }
  if (codeSegments) {
    if (codeSegments.length > 0) {
      /** @type {string} */
      html = "";
    }
  }
  if (me) {
    /** @type {string} */
    me.innerHTML = html;
  }
}
/**
 * @param {Object} res
 * @return {undefined}
 */
function hitungtotaldata(res) {
  var data = res.feed;
  /** @type {number} */
  var days = parseInt(data.openSearch$totalResults.$t, 10);
  loophalaman(days);
}
/**
 * @return {undefined}
 */
function halamanblogger() {
  var whitespace = urlactivepage;
  if (-1 != whitespace.indexOf("/search/label/")) {
    lblname1 = -1 != whitespace.indexOf("?updated-max") ? whitespace.substring(whitespace.indexOf("/search/label/") + 14, whitespace.indexOf("?updated-max")) : whitespace.substring(whitespace.indexOf("/search/label/") + 14, whitespace.indexOf("?&max"));
  }
  if (-1 == whitespace.indexOf("?q=")) {
    if (-1 == whitespace.indexOf(".html")) {
      if (-1 == whitespace.indexOf("/search/label/")) {
        /** @type {string} */
        jenis = "page";
        nomerhal = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1;
        document.write('<script src="' + home_page + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata">\x3c/script>');
      } else {
        /** @type {string} */
        jenis = "label";
        if (-1 == whitespace.indexOf("&max-results=")) {
          /** @type {number} */
          postperpage = 20;
        }
        nomerhal = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1;
        document.write('<script src="' + home_page + "feeds/posts/summary/-/" + lblname1 + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" >\x3c/script>');
      }
    }
  }
}
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
function redirectpage(dataAndEvents) {
  /** @type {number} */
  jsonstart = (dataAndEvents - 1) * postperpage;
  /** @type {number} */
  nopage = dataAndEvents;
  var oHead = document.getElementsByTagName("head")[0];
  /** @type {Element} */
  var oScript = document.createElement("script");
  /** @type {string} */
  oScript.type = "text/javascript";
  oScript.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
  oHead.appendChild(oScript);
}
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
function redirectlabel(dataAndEvents) {
  /** @type {number} */
  jsonstart = (dataAndEvents - 1) * postperpage;
  /** @type {number} */
  nopage = dataAndEvents;
  var oHead = document.getElementsByTagName("head")[0];
  /** @type {Element} */
  var oScript = document.createElement("script");
  /** @type {string} */
  oScript.type = "text/javascript";
  oScript.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
  oHead.appendChild(oScript);
}
/**
 * @param {Object} data
 * @return {undefined}
 */
function finddatepost(data) {
  post = data.feed.entry[0];
  var encodedValue = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
  /** @type {string} */
  var redirect_uri = encodeURIComponent(encodedValue);
  if ("page" == jenis) {
    var loc = "/search?updated-max=" + redirect_uri + "&max-results=" + postperpage + "#PageNo=" + nopage
  } else {
    loc = "/search/label/" + lblname1 + "?updated-max=" + redirect_uri + "&max-results=" + postperpage + "#PageNo=" + nopage;
  }
  location.href = loc;
}
var nopage;
var jenis;
var nomerhal;
var lblname1;
halamanblogger();
