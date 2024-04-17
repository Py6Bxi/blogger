!function() {
  /**
   * @return {undefined}
   */
  function start() {
    /** @type {Element} */
    var t = document.createElement("div");
    /** @type {string} */
    t.id = "arlinablock";
    /** @type {string} */
    t.innerHTML = '<div class="inner"> <div class="header"> <h2>Ad Blocker Detected</h2> </div> <div class="isi"> <p>Please consider supporting us by disabling your ad blocker</p> <div class="tombol"><button class="1 active">Adblock</button><button class="2">Adblock Plus</button></div> <div class="fixblock"> <div class="1 active"> <ol> <li>Click on the AdBlock icon in your browser<br><img src="11111" alt="Adblock"></li> <li>Choose, Don\'t run on pages on this domain<br><img src="22222" alt="Adblock" width="300px"></li> <li>A new window will appear. Click on the "Exclude" button<br><img src="33333" alt="Adblock"></li> <li>Refresh the page if it didn\'t refresh automatically. Thanks!</li> </ol> </div> <div class="2"> <ol> <li>Click on the AdBlock Plus icon in your browser<br><img src="4444" alt="Adblock"></li> <li>Click on "Enabled on this site" position<br><img src="55555" alt="Adblock" width="250px"></li> <li>Once clicked, it should change to "Disabled on this site"<br><img src="66666" alt="Adblock" width="250px"></li> <li>The browser icon should have turned grey<br><img src="77777" alt="Adblock"></li> <li>Refresh the page if it didn\'t refresh automatically. Thanks!</li> </ol> </div> </div> </div> </div>';
    document.body.append(t);
    /** @type {string} */
    document.body.style.overflow = "hidden";
    /** @type {NodeList} */
    var buttons = t.querySelectorAll("button");
    t.querySelector(".close");
    /** @type {NodeList} */
    var codeSegments = t.querySelectorAll(".fixblock > div");
    /** @type {number} */
    t = 0;
    for (;t < buttons.length;t++) {
      buttons[t].addEventListener("click", function(types) {
        types.preventDefault();
        types = this.getAttribute("class").split(" ")[0];
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          codeSegments[i].classList.remove("active");
          buttons[i].classList.remove("active");
        }
        buttons[types - 1].classList.add("active");
        codeSegments[types - 1].classList.add("active");
      });
    }
  }
  /** @type {Element} */
  var gads = document.createElement("script");
  /** @type {string} */
  gads.type = "text/javascript";
  /** @type {boolean} */
  gads.async = true;
  /** @type {string} */
  gads.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  /**
   * @return {undefined}
   */
  gads.onerror = function() {
    start();
    /** @type {boolean} */
    window.adblock = true;
  };
  var insertAt = document.getElementsByTagName("script")[0];
  insertAt.parentNode.insertBefore(gads, insertAt);
}();
