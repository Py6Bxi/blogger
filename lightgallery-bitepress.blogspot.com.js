/*! lightgallery - v1.3.9 - 2017-02-05
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2017 Sachin N; Licensed GPLv3 */
!function(root, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(Zepto) {
      return factory(Zepto);
    });
  } else {
    if ("object" == typeof exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(root.jQuery);
    }
  }
}(this, function($) {
  !function() {
    /**
     * @param {Node} el
     * @param {?} options
     * @return {?}
     */
    function Plugin(el, options) {
      if (this.el = el, this.$el = $(el), this.s = $.extend({}, defaults, options), this.s.dynamic && ("undefined" !== this.s.dynamicEl && (this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length))) {
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      }
      return this.modules = {}, this.lGalleryOn = false, this.lgBusy = false, this.hideBartimeout = false, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = false), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = $(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find($(this.s.selector)) : this.$items = 
      this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this;
    }
    var defaults = {
      mode : "lg-slide",
      cssEasing : "ease",
      easing : "linear",
      speed : 600,
      height : "100%",
      width : "100%",
      addClass : "",
      startClass : "lg-start-zoom",
      backdropDuration : 150,
      hideBarsDelay : 6E3,
      useLeft : false,
      closable : true,
      loop : true,
      escKey : true,
      keyPress : true,
      controls : true,
      slideEndAnimatoin : true,
      hideControlOnEnd : false,
      mousewheel : true,
      getCaptionFromTitleOrAlt : true,
      appendSubHtmlTo : ".lg-sub-html",
      subHtmlSelectorRelative : false,
      preload : 1,
      showAfterLoad : true,
      selector : "",
      selectWithin : "",
      nextHtml : "",
      prevHtml : "",
      index : false,
      iframeMaxWidth : "100%",
      download : true,
      counter : true,
      appendCounterTo : ".lg-toolbar",
      swipeThreshold : 50,
      enableSwipe : true,
      enableDrag : true,
      dynamic : false,
      dynamicEl : [],
      galleryId : 1
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.init = function() {
      var self = this;
      if (self.s.preload > self.$items.length) {
        self.s.preload = self.$items.length;
      }
      /** @type {string} */
      var raw = window.location.hash;
      if (raw.indexOf("lg=" + this.s.galleryId) > 0) {
        /** @type {number} */
        self.index = parseInt(raw.split("&slide=")[1], 10);
        $("body").addClass("lg-from-hash");
        if (!$("body").hasClass("lg-on")) {
          setTimeout(function() {
            self.build(self.index);
          });
          $("body").addClass("lg-on");
        }
      }
      if (self.s.dynamic) {
        self.$el.trigger("onBeforeOpen.lg");
        self.index = self.s.index || 0;
        if (!$("body").hasClass("lg-on")) {
          setTimeout(function() {
            self.build(self.index);
            $("body").addClass("lg-on");
          });
        }
      } else {
        self.$items.on("click.lgcustom", function(ev) {
          try {
            ev.preventDefault();
            ev.preventDefault();
          } catch (a) {
            /** @type {boolean} */
            ev.returnValue = false;
          }
          self.$el.trigger("onBeforeOpen.lg");
          self.index = self.s.index || self.$items.index(this);
          if (!$("body").hasClass("lg-on")) {
            self.build(self.index);
            $("body").addClass("lg-on");
          }
        });
      }
    };
    /**
     * @param {?} _
     * @return {undefined}
     */
    Plugin.prototype.build = function(_) {
      var self = this;
      self.structure();
      $.each($.fn.lightGallery.modules, function(timeoutKey) {
        self.modules[timeoutKey] = new $.fn.lightGallery.modules[timeoutKey](self.el);
      });
      self.slide(_, false, false, false);
      if (self.s.keyPress) {
        self.keyPress();
      }
      if (self.$items.length > 1) {
        self.arrow();
        setTimeout(function() {
          self.enableDrag();
          self.enableSwipe();
        }, 50);
        if (self.s.mousewheel) {
          self.mousewheel();
        }
      }
      self.counter();
      self.closeGallery();
      self.$el.trigger("onAfterOpen.lg");
      self.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
        self.$outer.removeClass("lg-hide-items");
        clearTimeout(self.hideBartimeout);
        /** @type {number} */
        self.hideBartimeout = setTimeout(function() {
          self.$outer.addClass("lg-hide-items");
        }, self.s.hideBarsDelay);
      });
      self.$outer.trigger("mousemove.lg");
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.structure = function() {
      var lineSeparator;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var s = "";
      /** @type {number} */
      var index = 0;
      /** @type {string} */
      var inner = "";
      var options = this;
      $("body").append('<div class="lg-backdrop"></div>');
      $(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms");
      /** @type {number} */
      index = 0;
      for (;index < this.$items.length;index++) {
        optsData += '<div class="lg-item"></div>';
      }
      if (this.s.controls && (this.$items.length > 1 && (s = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>")), ".lg-sub-html" === this.s.appendSubHtmlTo && (inner = '<div class="lg-sub-html"></div>'), lineSeparator = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + optsData + 
      '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + s + inner + "</div></div>", $("body").append(lineSeparator), this.$outer = $(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), options.setTop(), $(window).on("resize.lg orientationchange.lg", function() {
        setTimeout(function() {
          options.setTop();
        }, 100);
      }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && (this.$items.length > 1 && this.$outer.addClass("lg-grab")), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
        var $this = this.$outer.find(".lg-inner");
        $this.css("transition-timing-function", this.s.cssEasing);
        $this.css("transition-duration", this.s.speed + "ms");
      }
      setTimeout(function() {
        $(".lg-backdrop").addClass("in");
      });
      setTimeout(function() {
        options.$outer.addClass("lg-visible");
      }, this.s.backdropDuration);
      if (this.s.download) {
        this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
      }
      this.prevScrollTop = $(window).scrollTop();
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.setTop = function() {
      if ("100%" !== this.s.height) {
        var averageSkillsetQuality = $(window).height();
        /** @type {number} */
        var curXpos = (averageSkillsetQuality - parseInt(this.s.height, 10)) / 2;
        var ballDiv = this.$outer.find(".lg");
        if (averageSkillsetQuality >= parseInt(this.s.height, 10)) {
          ballDiv.css("top", curXpos + "px");
        } else {
          ballDiv.css("top", "0px");
        }
      }
    };
    /**
     * @return {?}
     */
    Plugin.prototype.doCss = function() {
      /**
       * @return {?}
       */
      var findTransition = function() {
        /** @type {Array} */
        var props = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"];
        /** @type {Element} */
        var e = document.documentElement;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        i = 0;
        for (;i < props.length;i++) {
          if (props[i] in e.style) {
            return true;
          }
        }
      };
      return!!findTransition();
    };
    /**
     * @param {string} url
     * @param {number} i
     * @return {?}
     */
    Plugin.prototype.isVideo = function(url, i) {
      var feedUrl;
      if (feedUrl = this.s.dynamic ? this.s.dynamicEl[i].html : this.$items.eq(i).attr("data-html"), !url && feedUrl) {
        return{
          html5 : true
        };
      }
      var youtube = url.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);
      var vimeo = url.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
      var dailymotion = url.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
      var vk = url.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
      return youtube ? {
        youtube : youtube
      } : vimeo ? {
        vimeo : vimeo
      } : dailymotion ? {
        dailymotion : dailymotion
      } : vk ? {
        vk : vk
      } : void 0;
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.counter = function() {
      if (this.s.counter) {
        $(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>");
      }
    };
    /**
     * @param {number} i
     * @return {undefined}
     */
    Plugin.prototype.addHtml = function(i) {
      var filterFilePath;
      var row;
      /** @type {null} */
      var val = null;
      if (this.s.dynamic ? this.s.dynamicEl[i].subHtmlUrl ? filterFilePath = this.s.dynamicEl[i].subHtmlUrl : val = this.s.dynamicEl[i].subHtml : (row = this.$items.eq(i), row.attr("data-sub-html-url") ? filterFilePath = row.attr("data-sub-html-url") : (val = row.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && (!val && (val = row.attr("title") || row.find("img").first().attr("alt"))))), !filterFilePath) {
        if ("undefined" != typeof val && null !== val) {
          var elementClass = val.substring(0, 1);
          if (!("." !== elementClass && "#" !== elementClass)) {
            val = this.s.subHtmlSelectorRelative && !this.s.dynamic ? row.find(val).html() : $(val).html();
          }
        } else {
          /** @type {string} */
          val = "";
        }
      }
      if (".lg-sub-html" === this.s.appendSubHtmlTo) {
        if (filterFilePath) {
          this.$outer.find(this.s.appendSubHtmlTo).load(filterFilePath);
        } else {
          this.$outer.find(this.s.appendSubHtmlTo).html(val);
        }
      } else {
        if (filterFilePath) {
          this.$slide.eq(i).load(filterFilePath);
        } else {
          this.$slide.eq(i).append(val);
        }
      }
      if ("undefined" != typeof val) {
        if (null !== val) {
          if ("" === val) {
            this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html");
          } else {
            this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html");
          }
        }
      }
      this.$el.trigger("onAfterAppendSubHtml.lg", [i]);
    };
    /**
     * @param {number} index
     * @return {undefined}
     */
    Plugin.prototype.preload = function(index) {
      /** @type {number} */
      var numToRemove = 1;
      /** @type {number} */
      var remainder = 1;
      /** @type {number} */
      numToRemove = 1;
      for (;numToRemove <= this.s.preload && !(numToRemove >= this.$items.length - index);numToRemove++) {
        this.loadContent(index + numToRemove, false, 0);
      }
      /** @type {number} */
      remainder = 1;
      for (;remainder <= this.s.preload && !(index - remainder < 0);remainder++) {
        this.loadContent(index - remainder, false, 0);
      }
    };
    /**
     * @param {number} i
     * @param {boolean} recurring
     * @param {number} mayParseLabeledStatementInstead
     * @return {undefined}
     */
    Plugin.prototype.loadContent = function(i, recurring, mayParseLabeledStatementInstead) {
      var img;
      var name;
      var x;
      var thumbnail;
      var src;
      var o;
      var self = this;
      /** @type {boolean} */
      var j = false;
      /**
       * @param {Array} result
       * @return {undefined}
       */
      var error = function(result) {
        /** @type {Array} */
        var codeSegments = [];
        /** @type {Array} */
        var configList = [];
        /** @type {number} */
        var x = 0;
        for (;x < result.length;x++) {
          var arr = result[x].split(" ");
          if ("" === arr[0]) {
            arr.splice(0, 1);
          }
          configList.push(arr[0]);
          codeSegments.push(arr[1]);
        }
        var lft = $(window).width();
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          if (parseInt(codeSegments[i], 10) > lft) {
            name = configList[i];
            break;
          }
        }
      };
      if (self.s.dynamic) {
        if (self.s.dynamicEl[i].poster && (j = true, x = self.s.dynamicEl[i].poster), o = self.s.dynamicEl[i].html, name = self.s.dynamicEl[i].src, self.s.dynamicEl[i].responsive) {
          var expectationResult = self.s.dynamicEl[i].responsive.split(",");
          error(expectationResult);
        }
        thumbnail = self.s.dynamicEl[i].srcset;
        src = self.s.dynamicEl[i].sizes;
      } else {
        if (self.$items.eq(i).attr("data-poster") && (j = true, x = self.$items.eq(i).attr("data-poster")), o = self.$items.eq(i).attr("data-html"), name = self.$items.eq(i).attr("href") || self.$items.eq(i).attr("data-src"), self.$items.eq(i).attr("data-responsive")) {
          var model = self.$items.eq(i).attr("data-responsive").split(",");
          error(model);
        }
        thumbnail = self.$items.eq(i).attr("data-srcset");
        src = self.$items.eq(i).attr("data-sizes");
      }
      /** @type {boolean} */
      var p = false;
      if (self.s.dynamic) {
        if (self.s.dynamicEl[i].iframe) {
          /** @type {boolean} */
          p = true;
        }
      } else {
        if ("true" === self.$items.eq(i).attr("data-iframe")) {
          /** @type {boolean} */
          p = true;
        }
      }
      var s = self.isVideo(name, i);
      if (!self.$slide.eq(i).hasClass("lg-loaded")) {
        if (p) {
          self.$slide.eq(i).prepend('<div class="lg-video-cont" style="max-width:' + self.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + name + '"  allowfullscreen="true"></iframe></div></div>');
        } else {
          if (j) {
            /** @type {string} */
            var optsData = "";
            /** @type {string} */
            optsData = s && s.youtube ? "lg-has-youtube" : s && s.vimeo ? "lg-has-vimeo" : "lg-has-html5";
            self.$slide.eq(i).prepend('<div class="lg-video-cont ' + optsData + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + x + '" /></div></div>');
          } else {
            if (s) {
              self.$slide.eq(i).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>');
              self.$el.trigger("hasVideo.lg", [i, name, o]);
            } else {
              self.$slide.eq(i).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + name + '" /></div>');
            }
          }
        }
        if (self.$el.trigger("onAferAppendSlide.lg", [i]), img = self.$slide.eq(i).find(".lg-object"), src && img.attr("sizes", src), thumbnail) {
          img.attr("srcset", thumbnail);
          try {
            picturefill({
              elements : [img[0]]
            });
          } catch (a) {
            console.error("Make sure you have included Picturefill version 2");
          }
        }
        if (".lg-sub-html" !== this.s.appendSubHtmlTo) {
          self.addHtml(i);
        }
        self.$slide.eq(i).addClass("lg-loaded");
      }
      self.$slide.eq(i).find(".lg-object").on("load.lg error.lg", function() {
        /** @type {number} */
        var backoff = 0;
        if (mayParseLabeledStatementInstead) {
          if (!$("body").hasClass("lg-from-hash")) {
            /** @type {number} */
            backoff = mayParseLabeledStatementInstead;
          }
        }
        setTimeout(function() {
          self.$slide.eq(i).addClass("lg-complete");
          self.$el.trigger("onSlideItemLoad.lg", [i, mayParseLabeledStatementInstead || 0]);
        }, backoff);
      });
      if (s) {
        if (s.html5) {
          if (!j) {
            self.$slide.eq(i).addClass("lg-complete");
          }
        }
      }
      if (recurring === true) {
        if (self.$slide.eq(i).hasClass("lg-complete")) {
          self.preload(i);
        } else {
          self.$slide.eq(i).find(".lg-object").on("load.lg error.lg", function() {
            self.preload(i);
          });
        }
      }
    };
    /**
     * @param {number} index
     * @param {boolean} e
     * @param {boolean} recurring
     * @param {string} direction
     * @return {undefined}
     */
    Plugin.prototype.slide = function(index, e, recurring, direction) {
      var i = this.$outer.find(".lg-current").index();
      var self = this;
      if (!self.lGalleryOn || i !== index) {
        var len = this.$slide.length;
        var backoff = self.lGalleryOn ? this.s.speed : 0;
        if (!self.lgBusy) {
          if (this.s.download) {
            var _tmp;
            _tmp = self.s.dynamic ? self.s.dynamicEl[index].downloadUrl !== false && (self.s.dynamicEl[index].downloadUrl || self.s.dynamicEl[index].src) : "false" !== self.$items.eq(index).attr("data-download-url") && (self.$items.eq(index).attr("data-download-url") || (self.$items.eq(index).attr("href") || self.$items.eq(index).attr("data-src")));
            if (_tmp) {
              $("#lg-download").attr("href", _tmp);
              self.$outer.removeClass("lg-hide-download");
            } else {
              self.$outer.addClass("lg-hide-download");
            }
          }
          if (this.$el.trigger("onBeforeSlide.lg", [i, index, e, recurring]), self.lgBusy = true, clearTimeout(self.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
            self.addHtml(index);
          }, backoff), this.arrowDisable(index), direction || (index < i ? direction = "prev" : index > i && (direction = "next")), e) {
            this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
            var idx;
            var nextIndex;
            if (len > 2) {
              /** @type {number} */
              idx = index - 1;
              nextIndex = index + 1;
              if (0 === index && i === len - 1) {
                /** @type {number} */
                nextIndex = 0;
                /** @type {number} */
                idx = len - 1;
              } else {
                if (index === len - 1) {
                  if (0 === i) {
                    /** @type {number} */
                    nextIndex = 0;
                    /** @type {number} */
                    idx = len - 1;
                  }
                }
              }
            } else {
              /** @type {number} */
              idx = 0;
              /** @type {number} */
              nextIndex = 1;
            }
            if ("prev" === direction) {
              self.$slide.eq(nextIndex).addClass("lg-next-slide");
            } else {
              self.$slide.eq(idx).addClass("lg-prev-slide");
            }
            self.$slide.eq(index).addClass("lg-current");
          } else {
            self.$outer.addClass("lg-no-trans");
            this.$slide.removeClass("lg-prev-slide lg-next-slide");
            if ("prev" === direction) {
              this.$slide.eq(index).addClass("lg-prev-slide");
              this.$slide.eq(i).addClass("lg-next-slide");
            } else {
              this.$slide.eq(index).addClass("lg-next-slide");
              this.$slide.eq(i).addClass("lg-prev-slide");
            }
            setTimeout(function() {
              self.$slide.removeClass("lg-current");
              self.$slide.eq(index).addClass("lg-current");
              self.$outer.removeClass("lg-no-trans");
            }, 50);
          }
          if (self.lGalleryOn) {
            setTimeout(function() {
              self.loadContent(index, true, 0);
            }, this.s.speed + 50);
            setTimeout(function() {
              /** @type {boolean} */
              self.lgBusy = false;
              self.$el.trigger("onAfterSlide.lg", [i, index, e, recurring]);
            }, this.s.speed);
          } else {
            self.loadContent(index, true, self.s.backdropDuration);
            /** @type {boolean} */
            self.lgBusy = false;
            self.$el.trigger("onAfterSlide.lg", [i, index, e, recurring]);
          }
          /** @type {boolean} */
          self.lGalleryOn = true;
          if (this.s.counter) {
            $("#lg-counter-current").text(index + 1);
          }
        }
      }
    };
    /**
     * @param {boolean} dir
     * @return {undefined}
     */
    Plugin.prototype.goToNextSlide = function(dir) {
      var self = this;
      var _isLoop = self.s.loop;
      if (dir) {
        if (self.$slide.length < 3) {
          /** @type {boolean} */
          _isLoop = false;
        }
      }
      if (!self.lgBusy) {
        if (self.index + 1 < self.$slide.length) {
          self.index++;
          self.$el.trigger("onBeforeNextSlide.lg", [self.index]);
          self.slide(self.index, dir, false, "next");
        } else {
          if (_isLoop) {
            /** @type {number} */
            self.index = 0;
            self.$el.trigger("onBeforeNextSlide.lg", [self.index]);
            self.slide(self.index, dir, false, "next");
          } else {
            if (self.s.slideEndAnimatoin) {
              if (!dir) {
                self.$outer.addClass("lg-right-end");
                setTimeout(function() {
                  self.$outer.removeClass("lg-right-end");
                }, 400);
              }
            }
          }
        }
      }
    };
    /**
     * @param {boolean} data
     * @return {undefined}
     */
    Plugin.prototype.goToPrevSlide = function(data) {
      var self = this;
      var _isLoop = self.s.loop;
      if (data) {
        if (self.$slide.length < 3) {
          /** @type {boolean} */
          _isLoop = false;
        }
      }
      if (!self.lgBusy) {
        if (self.index > 0) {
          self.index--;
          self.$el.trigger("onBeforePrevSlide.lg", [self.index, data]);
          self.slide(self.index, data, false, "prev");
        } else {
          if (_isLoop) {
            /** @type {number} */
            self.index = self.$items.length - 1;
            self.$el.trigger("onBeforePrevSlide.lg", [self.index, data]);
            self.slide(self.index, data, false, "prev");
          } else {
            if (self.s.slideEndAnimatoin) {
              if (!data) {
                self.$outer.addClass("lg-left-end");
                setTimeout(function() {
                  self.$outer.removeClass("lg-left-end");
                }, 400);
              }
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.keyPress = function() {
      var self = this;
      if (this.$items.length > 1) {
        $(window).on("keyup.lg", function(event) {
          if (self.$items.length > 1) {
            if (37 === event.keyCode) {
              event.preventDefault();
              self.goToPrevSlide();
            }
            if (39 === event.keyCode) {
              event.preventDefault();
              self.goToNextSlide();
            }
          }
        });
      }
      $(window).on("keydown.lg", function(event) {
        if (self.s.escKey === true) {
          if (27 === event.keyCode) {
            event.preventDefault();
            if (self.$outer.hasClass("lg-thumb-open")) {
              self.$outer.removeClass("lg-thumb-open");
            } else {
              self.destroy();
            }
          }
        }
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.arrow = function() {
      var el = this;
      this.$outer.find(".lg-prev").on("click.lg", function() {
        el.goToPrevSlide();
      });
      this.$outer.find(".lg-next").on("click.lg", function() {
        el.goToNextSlide();
      });
    };
    /**
     * @param {number} index
     * @return {undefined}
     */
    Plugin.prototype.arrowDisable = function(index) {
      if (!this.s.loop) {
        if (this.s.hideControlOnEnd) {
          if (index + 1 < this.$slide.length) {
            this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled");
          } else {
            this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled");
          }
          if (index > 0) {
            this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled");
          } else {
            this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled");
          }
        }
      }
    };
    /**
     * @param {number} el
     * @param {number} x
     * @param {number} recurring
     * @return {undefined}
     */
    Plugin.prototype.setTranslate = function(el, x, recurring) {
      if (this.s.useLeft) {
        el.css("left", x);
      } else {
        el.css({
          transform : "translate3d(" + x + "px, " + recurring + "px, 0px)"
        });
      }
    };
    /**
     * @param {number} x
     * @param {number} y
     * @return {undefined}
     */
    Plugin.prototype.touchMove = function(x, y) {
      /** @type {number} */
      var distY = y - x;
      if (Math.abs(distY) > 15) {
        this.$outer.addClass("lg-dragging");
        this.setTranslate(this.$slide.eq(this.index), distY, 0);
        this.setTranslate($(".lg-prev-slide"), -this.$slide.eq(this.index).width() + distY, 0);
        this.setTranslate($(".lg-next-slide"), this.$slide.eq(this.index).width() + distY, 0);
      }
    };
    /**
     * @param {number} a
     * @return {undefined}
     */
    Plugin.prototype.touchEnd = function(a) {
      var self = this;
      if ("lg-slide" !== self.s.mode) {
        self.$outer.addClass("lg-slide");
      }
      this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0");
      setTimeout(function() {
        self.$outer.removeClass("lg-dragging");
        if (a < 0 && Math.abs(a) > self.s.swipeThreshold) {
          self.goToNextSlide(true);
        } else {
          if (a > 0 && Math.abs(a) > self.s.swipeThreshold) {
            self.goToPrevSlide(true);
          } else {
            if (Math.abs(a) < 5) {
              self.$el.trigger("onSlideClick.lg");
            }
          }
        }
        self.$slide.removeAttr("style");
      });
      setTimeout(function() {
        if (!self.$outer.hasClass("lg-dragging")) {
          if (!("lg-slide" === self.s.mode)) {
            self.$outer.removeClass("lg-slide");
          }
        }
      }, self.s.speed + 100);
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.enableSwipe = function() {
      var self = this;
      /** @type {number} */
      var _x = 0;
      /** @type {number} */
      var cx = 0;
      /** @type {boolean} */
      var d = false;
      if (self.s.enableSwipe) {
        if (self.isTouch) {
          if (self.doCss()) {
            self.$slide.on("touchstart.lg", function(e) {
              if (!self.$outer.hasClass("lg-zoomed")) {
                if (!self.lgBusy) {
                  e.preventDefault();
                  self.manageSwipeClass();
                  _x = e.originalEvent.targetTouches[0].pageX;
                }
              }
            });
            self.$slide.on("touchmove.lg", function(e) {
              if (!self.$outer.hasClass("lg-zoomed")) {
                e.preventDefault();
                cx = e.originalEvent.targetTouches[0].pageX;
                self.touchMove(_x, cx);
                /** @type {boolean} */
                d = true;
              }
            });
            self.$slide.on("touchend.lg", function() {
              if (!self.$outer.hasClass("lg-zoomed")) {
                if (d) {
                  /** @type {boolean} */
                  d = false;
                  self.touchEnd(cx - _x);
                } else {
                  self.$el.trigger("onSlideClick.lg");
                }
              }
            });
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.enableDrag = function() {
      var self = this;
      /** @type {number} */
      var _x = 0;
      /** @type {number} */
      var cx = 0;
      /** @type {boolean} */
      var e = false;
      /** @type {boolean} */
      var f = false;
      if (self.s.enableDrag) {
        if (!self.isTouch) {
          if (self.doCss()) {
            self.$slide.on("mousedown.lg", function(touch) {
              if (!self.$outer.hasClass("lg-zoomed")) {
                if ($(touch.target).hasClass("lg-object") || $(touch.target).hasClass("lg-video-play")) {
                  touch.preventDefault();
                  if (!self.lgBusy) {
                    self.manageSwipeClass();
                    _x = touch.pageX;
                    /** @type {boolean} */
                    e = true;
                    self.$outer.scrollLeft += 1;
                    self.$outer.scrollLeft -= 1;
                    self.$outer.removeClass("lg-grab").addClass("lg-grabbing");
                    self.$el.trigger("onDragstart.lg");
                  }
                }
              }
            });
            $(window).on("mousemove.lg", function(t) {
              if (e) {
                /** @type {boolean} */
                f = true;
                cx = t.pageX;
                self.touchMove(_x, cx);
                self.$el.trigger("onDragmove.lg");
              }
            });
            $(window).on("mouseup.lg", function(ev) {
              if (f) {
                /** @type {boolean} */
                f = false;
                self.touchEnd(cx - _x);
                self.$el.trigger("onDragend.lg");
              } else {
                if ($(ev.target).hasClass("lg-object") || $(ev.target).hasClass("lg-video-play")) {
                  self.$el.trigger("onSlideClick.lg");
                }
              }
              if (e) {
                /** @type {boolean} */
                e = false;
                self.$outer.removeClass("lg-grabbing").addClass("lg-grab");
              }
            });
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.manageSwipeClass = function() {
      var index = this.index + 1;
      /** @type {number} */
      var next = this.index - 1;
      if (this.s.loop) {
        if (this.$slide.length > 2) {
          if (0 === this.index) {
            /** @type {number} */
            next = this.$slide.length - 1;
          } else {
            if (this.index === this.$slide.length - 1) {
              /** @type {number} */
              index = 0;
            }
          }
        }
      }
      this.$slide.removeClass("lg-next-slide lg-prev-slide");
      if (next > -1) {
        this.$slide.eq(next).addClass("lg-prev-slide");
      }
      this.$slide.eq(index).addClass("lg-next-slide");
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.mousewheel = function() {
      var el = this;
      el.$outer.on("mousewheel.lg", function(event) {
        if (event.deltaY) {
          if (event.deltaY > 0) {
            el.goToPrevSlide();
          } else {
            el.goToNextSlide();
          }
          event.preventDefault();
        }
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.closeGallery = function() {
      var self = this;
      /** @type {boolean} */
      var c = false;
      this.$outer.find(".lg-close").on("click.lg", function() {
        self.destroy();
      });
      if (self.s.closable) {
        self.$outer.on("mousedown.lg", function(ev) {
          /** @type {boolean} */
          c = !!($(ev.target).is(".lg-outer") || ($(ev.target).is(".lg-item ") || $(ev.target).is(".lg-img-wrap")));
        });
        self.$outer.on("mouseup.lg", function(ev) {
          if ($(ev.target).is(".lg-outer") || ($(ev.target).is(".lg-item ") || $(ev.target).is(".lg-img-wrap") && c)) {
            if (!self.$outer.hasClass("lg-dragging")) {
              self.destroy();
            }
          }
        });
      }
    };
    /**
     * @param {?} removeResizeFix
     * @return {undefined}
     */
    Plugin.prototype.destroy = function(removeResizeFix) {
      var self = this;
      if (!removeResizeFix) {
        self.$el.trigger("onBeforeClose.lg");
        $(window).scrollTop(self.prevScrollTop);
      }
      if (removeResizeFix) {
        if (!self.s.dynamic) {
          this.$items.off("click.lg click.lgcustom");
        }
        $.removeData(self.el, "lightGallery");
      }
      this.$el.off(".lg.tm");
      $.each($.fn.lightGallery.modules, function(index) {
        if (self.modules[index]) {
          self.modules[index].destroy();
        }
      });
      /** @type {boolean} */
      this.lGalleryOn = false;
      clearTimeout(self.hideBartimeout);
      /** @type {boolean} */
      this.hideBartimeout = false;
      $(window).off(".lg");
      $("body").removeClass("lg-on lg-from-hash");
      if (self.$outer) {
        self.$outer.removeClass("lg-visible");
      }
      $(".lg-backdrop").removeClass("in");
      setTimeout(function() {
        if (self.$outer) {
          self.$outer.remove();
        }
        $(".lg-backdrop").remove();
        if (!removeResizeFix) {
          self.$el.trigger("onCloseAfter.lg");
        }
      }, self.s.backdropDuration + 50);
    };
    /**
     * @param {EventTarget} options
     * @return {?}
     */
    $.fn.lightGallery = function(options) {
      return this.each(function() {
        if ($.data(this, "lightGallery")) {
          try {
            $(this).data("lightGallery").init();
          } catch (a) {
            console.error("lightGallery has not initiated properly");
          }
        } else {
          $.data(this, "lightGallery", new Plugin(this, options));
        }
      });
    };
    $.fn.lightGallery.modules = {};
  }();
});
!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(Zepto) {
      return factory(Zepto);
    });
  } else {
    if ("object" == typeof exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }
}(this, function($) {
  !function() {
    var details = {
      thumbnail : true,
      animateThumb : true,
      currentPagerPosition : "middle",
      thumbWidth : 100,
      thumbContHeight : 100,
      thumbMargin : 5,
      exThumbImage : false,
      showThumbByDefault : true,
      toogleThumb : true,
      pullCaptionUp : true,
      enableThumbDrag : true,
      enableThumbSwipe : true,
      swipeThreshold : 50,
      loadYoutubeThumbnail : true,
      youtubeThumbSize : 1,
      loadVimeoThumbnail : true,
      vimeoThumbSize : "thumbnail_small",
      loadDailymotionThumbnail : true
    };
    /**
     * @param {?} element
     * @return {?}
     */
    var init = function(element) {
      return this.core = $(element).data("lightGallery"), this.core.s = $.extend({}, details, this.core.s), this.$el = $(element), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this;
    };
    /**
     * @return {undefined}
     */
    init.prototype.init = function() {
      var self = this;
      if (this.core.s.thumbnail) {
        if (this.core.$items.length > 1) {
          if (this.core.s.showThumbByDefault) {
            setTimeout(function() {
              self.core.$outer.addClass("lg-thumb-open");
            }, 700);
          }
          if (this.core.s.pullCaptionUp) {
            this.core.$outer.addClass("lg-pull-caption-up");
          }
          this.build();
          if (this.core.s.animateThumb) {
            if (this.core.s.enableThumbDrag) {
              if (!this.core.isTouch) {
                if (this.core.doCss()) {
                  this.enableThumbDrag();
                }
              }
            }
            if (this.core.s.enableThumbSwipe) {
              if (this.core.isTouch) {
                if (this.core.doCss()) {
                  this.enableThumbSwipe();
                }
              }
            }
            /** @type {boolean} */
            this.thumbClickable = false;
          } else {
            /** @type {boolean} */
            this.thumbClickable = true;
          }
          this.toogle();
          this.thumbkeyPress();
        }
      }
    };
    /**
     * @return {undefined}
     */
    init.prototype.build = function() {
      /**
       * @param {string} src
       * @param {(Function|string)} param
       * @param {number} program
       * @return {undefined}
       */
      function init(src, param, program) {
        var name;
        var Popcorn = self.core.isVideo(src, program) || {};
        /** @type {string} */
        var expires = "";
        if (Popcorn.youtube || (Popcorn.vimeo || Popcorn.dailymotion)) {
          if (Popcorn.youtube) {
            name = self.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + Popcorn.youtube[1] + "/" + self.core.s.youtubeThumbSize + ".jpg" : param;
          } else {
            if (Popcorn.vimeo) {
              if (self.core.s.loadVimeoThumbnail) {
                /** @type {string} */
                name = "//i.vimeocdn.com/video/error_" + optsData + ".jpg";
                expires = Popcorn.vimeo[1];
              } else {
                /** @type {(Function|string)} */
                name = param;
              }
            } else {
              if (Popcorn.dailymotion) {
                name = self.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + Popcorn.dailymotion[1] : param;
              }
            }
          }
        } else {
          /** @type {(Function|string)} */
          name = param;
        }
        escaped += '<div data-vimeo-id="' + expires + '" class="lg-thumb-item" style="width:' + self.core.s.thumbWidth + "px; margin-right: " + self.core.s.thumbMargin + 'px"><img src="' + name + '" /></div>';
        /** @type {string} */
        expires = "";
      }
      var tabs;
      var self = this;
      /** @type {string} */
      var escaped = "";
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var lineSeparator = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
      switch(this.core.s.vimeoThumbSize) {
        case "thumbnail_large":
          /** @type {string} */
          optsData = "640";
          break;
        case "thumbnail_medium":
          /** @type {string} */
          optsData = "200x150";
          break;
        case "thumbnail_small":
          /** @type {string} */
          optsData = "100x75";
      }
      if (self.core.$outer.addClass("lg-has-thumb"), self.core.$outer.find(".lg").append(lineSeparator), self.$thumbOuter = self.core.$outer.find(".lg-thumb-outer"), self.thumbOuterWidth = self.$thumbOuter.width(), self.core.s.animateThumb && self.core.$outer.find(".lg-thumb").css({
        width : self.thumbTotalWidth + "px",
        position : "relative"
      }), this.core.s.animateThumb && self.$thumbOuter.css("height", self.core.s.thumbContHeight + "px"), self.core.s.dynamic) {
        /** @type {number} */
        var i = 0;
        for (;i < self.core.s.dynamicEl.length;i++) {
          init(self.core.s.dynamicEl[i].src, self.core.s.dynamicEl[i].thumb, i);
        }
      } else {
        self.core.$items.each(function(environment) {
          if (self.core.s.exThumbImage) {
            init($(this).attr("href") || $(this).attr("data-src"), $(this).attr(self.core.s.exThumbImage), environment);
          } else {
            init($(this).attr("href") || $(this).attr("data-src"), $(this).find("img").attr("src"), environment);
          }
        });
      }
      self.core.$outer.find(".lg-thumb").html(escaped);
      tabs = self.core.$outer.find(".lg-thumb-item");
      tabs.each(function() {
        var $slide = $(this);
        var data_vimeo_id = $slide.attr("data-vimeo-id");
        if (data_vimeo_id) {
          $.getJSON("//www.vimeo.com/api/v2/video/" + data_vimeo_id + ".json?callback=?", {
            format : "json"
          }, function(dataAndEvents) {
            $slide.find("img").attr("src", dataAndEvents[0][self.core.s.vimeoThumbSize]);
          });
        }
      });
      tabs.eq(self.core.index).addClass("active");
      self.core.$el.on("onBeforeSlide.lg.tm", function() {
        tabs.removeClass("active");
        tabs.eq(self.core.index).addClass("active");
      });
      tabs.on("click.lg touchend.lg", function() {
        var pos = $(this);
        setTimeout(function() {
          if (self.thumbClickable && !self.core.lgBusy || !self.core.doCss()) {
            self.core.index = pos.index();
            self.core.slide(self.core.index, false, true, false);
          }
        }, 50);
      });
      self.core.$el.on("onBeforeSlide.lg.tm", function() {
        self.animateThumb(self.core.index);
      });
      $(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
        setTimeout(function() {
          self.animateThumb(self.core.index);
          self.thumbOuterWidth = self.$thumbOuter.width();
        }, 200);
      });
    };
    /**
     * @param {number} v00
     * @return {undefined}
     */
    init.prototype.setTranslate = function(v00) {
      this.core.$outer.find(".lg-thumb").css({
        transform : "translate3d(-" + v00 + "px, 0px, 0px)"
      });
    };
    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    init.prototype.animateThumb = function(dataAndEvents) {
      var $elem = this.core.$outer.find(".lg-thumb");
      if (this.core.s.animateThumb) {
        var left;
        switch(this.core.s.currentPagerPosition) {
          case "left":
            /** @type {number} */
            left = 0;
            break;
          case "middle":
            /** @type {number} */
            left = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
            break;
          case "right":
            /** @type {number} */
            left = this.thumbOuterWidth - this.core.s.thumbWidth;
        }
        /** @type {number} */
        this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * dataAndEvents - 1 - left;
        if (this.left > this.thumbTotalWidth - this.thumbOuterWidth) {
          /** @type {number} */
          this.left = this.thumbTotalWidth - this.thumbOuterWidth;
        }
        if (this.left < 0) {
          /** @type {number} */
          this.left = 0;
        }
        if (this.core.lGalleryOn) {
          if (!$elem.hasClass("on")) {
            this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms");
          }
          if (!this.core.doCss()) {
            $elem.animate({
              left : -this.left + "px"
            }, this.core.s.speed);
          }
        } else {
          if (!this.core.doCss()) {
            $elem.css("left", -this.left + "px");
          }
        }
        this.setTranslate(this.left);
      }
    };
    /**
     * @return {undefined}
     */
    init.prototype.enableThumbDrag = function() {
      var self = this;
      /** @type {number} */
      var mouseX = 0;
      /** @type {number} */
      var nx = 0;
      /** @type {boolean} */
      var e = false;
      /** @type {boolean} */
      var f = false;
      /** @type {number} */
      var x = 0;
      self.$thumbOuter.addClass("lg-grab");
      self.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(event) {
        if (self.thumbTotalWidth > self.thumbOuterWidth) {
          event.preventDefault();
          mouseX = event.pageX;
          /** @type {boolean} */
          e = true;
          self.core.$outer.scrollLeft += 1;
          self.core.$outer.scrollLeft -= 1;
          /** @type {boolean} */
          self.thumbClickable = false;
          self.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing");
        }
      });
      $(window).on("mousemove.lg.thumb", function(touches) {
        if (e) {
          x = self.left;
          /** @type {boolean} */
          f = true;
          nx = touches.pageX;
          self.$thumbOuter.addClass("lg-dragging");
          x -= nx - mouseX;
          if (x > self.thumbTotalWidth - self.thumbOuterWidth) {
            /** @type {number} */
            x = self.thumbTotalWidth - self.thumbOuterWidth;
          }
          if (x < 0) {
            /** @type {number} */
            x = 0;
          }
          self.setTranslate(x);
        }
      });
      $(window).on("mouseup.lg.thumb", function() {
        if (f) {
          /** @type {boolean} */
          f = false;
          self.$thumbOuter.removeClass("lg-dragging");
          self.left = x;
          if (Math.abs(nx - mouseX) < self.core.s.swipeThreshold) {
            /** @type {boolean} */
            self.thumbClickable = true;
          }
        } else {
          /** @type {boolean} */
          self.thumbClickable = true;
        }
        if (e) {
          /** @type {boolean} */
          e = false;
          self.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab");
        }
      });
    };
    /**
     * @return {undefined}
     */
    init.prototype.enableThumbSwipe = function() {
      var self = this;
      /** @type {number} */
      var minX = 0;
      /** @type {number} */
      var maxX = 0;
      /** @type {boolean} */
      var d = false;
      /** @type {number} */
      var x = 0;
      self.core.$outer.find(".lg-thumb").on("touchstart.lg", function(e) {
        if (self.thumbTotalWidth > self.thumbOuterWidth) {
          e.preventDefault();
          minX = e.originalEvent.targetTouches[0].pageX;
          /** @type {boolean} */
          self.thumbClickable = false;
        }
      });
      self.core.$outer.find(".lg-thumb").on("touchmove.lg", function(e) {
        if (self.thumbTotalWidth > self.thumbOuterWidth) {
          e.preventDefault();
          maxX = e.originalEvent.targetTouches[0].pageX;
          /** @type {boolean} */
          d = true;
          self.$thumbOuter.addClass("lg-dragging");
          x = self.left;
          x -= maxX - minX;
          if (x > self.thumbTotalWidth - self.thumbOuterWidth) {
            /** @type {number} */
            x = self.thumbTotalWidth - self.thumbOuterWidth;
          }
          if (x < 0) {
            /** @type {number} */
            x = 0;
          }
          self.setTranslate(x);
        }
      });
      self.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
        if (self.thumbTotalWidth > self.thumbOuterWidth && d) {
          /** @type {boolean} */
          d = false;
          self.$thumbOuter.removeClass("lg-dragging");
          if (Math.abs(maxX - minX) < self.core.s.swipeThreshold) {
            /** @type {boolean} */
            self.thumbClickable = true;
          }
          self.left = x;
        } else {
          /** @type {boolean} */
          self.thumbClickable = true;
        }
      });
    };
    /**
     * @return {undefined}
     */
    init.prototype.toogle = function() {
      var self = this;
      if (self.core.s.toogleThumb) {
        self.core.$outer.addClass("lg-can-toggle");
        self.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>');
        self.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
          self.core.$outer.toggleClass("lg-thumb-open");
        });
      }
    };
    /**
     * @return {undefined}
     */
    init.prototype.thumbkeyPress = function() {
      var self = this;
      $(window).on("keydown.lg.thumb", function(event) {
        if (38 === event.keyCode) {
          event.preventDefault();
          self.core.$outer.addClass("lg-thumb-open");
        } else {
          if (40 === event.keyCode) {
            event.preventDefault();
            self.core.$outer.removeClass("lg-thumb-open");
          }
        }
      });
    };
    /**
     * @return {undefined}
     */
    init.prototype.destroy = function() {
      if (this.core.s.thumbnail) {
        if (this.core.$items.length > 1) {
          $(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb");
          this.$thumbOuter.remove();
          this.core.$outer.removeClass("lg-has-thumb");
        }
      }
    };
    /** @type {function (?): ?} */
    $.fn.lightGallery.modules.Thumbnail = init;
  }();
});


/*! lg-fullscreen - v1.0.1 - 2016-09-30
* http://sachinchoolur.github.io/lightGallery
* Copyright (c) 2016 Sachin N; Licensed GPLv3 */
!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], function(Zepto) {
      return factory(Zepto);
    });
  } else {
    if ("object" == typeof exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }
}(this, function($) {
  !function() {
    var details = {
      fullScreen : true
    };
    /**
     * @param {?} element
     * @return {?}
     */
    var Plugin = function(element) {
      return this.core = $(element).data("lightGallery"), this.$el = $(element), this.core.s = $.extend({}, details, this.core.s), this.init(), this;
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.init = function() {
      /** @type {string} */
      var htmlString = "";
      if (this.core.s.fullScreen) {
        if (!(document.fullscreenEnabled || (document.webkitFullscreenEnabled || (document.mozFullScreenEnabled || document.msFullscreenEnabled)))) {
          return;
        }
        /** @type {string} */
        htmlString = '<span class="lg-fullscreen lg-icon"></span>';
        this.core.$outer.find(".lg-toolbar").append(htmlString);
        this.fullScreen();
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.requestFullscreen = function() {
      /** @type {Element} */
      var element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else {
        if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else {
          if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else {
            if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.exitFullscreen = function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else {
        if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else {
            if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.fullScreen = function() {
      var self = this;
      $(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
        self.core.$outer.toggleClass("lg-fullscreen-on");
      });
      this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
        if (document.fullscreenElement || (document.mozFullScreenElement || (document.webkitFullscreenElement || document.msFullscreenElement))) {
          self.exitFullscreen();
        } else {
          self.requestFullscreen();
        }
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.destroy = function() {
      this.exitFullscreen();
      $(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg");
    };
    /** @type {function (?): ?} */
    $.fn.lightGallery.modules.fullscreen = Plugin;
  }();
});

