!(function (a) {
  a.fn.preloadinator = function (e) {
    "use strict";
    var o = a.extend(
        {
          scroll: !1,
          minTime: 0,
          animation: "fadeOut",
          animationDuration: 400,
          afterDisableScroll: function () {},
          afterEnableScroll: function () {},
          afterRemovePreloader: function () {},
        },
        e
      ),
      n = this,
      r = new Date().getTime();
    return (
      (a.fn.preloadinator.disableScroll = function () {
        a("body").css("overflow", "hidden"),
          "function" == typeof o.afterDisableScroll &&
            o.afterDisableScroll.call(this);
      }),
      (a.fn.preloadinator.enableScroll = function () {
        a("body").css("overflow", "auto"),
          "function" == typeof o.afterEnableScroll &&
            o.afterEnableScroll.call(this);
      }),
      (a.fn.preloadinator.removePreloader = function () {
        a(n)[o.animation](o.animationDuration, function () {
          !1 === o.scroll && a.fn.preloadinator.enableScroll(),
            "function" == typeof o.afterRemovePreloader &&
              o.afterRemovePreloader.call(this);
        });
      }),
      (a.fn.preloadinator.minTimeElapsed = function () {
        return new Date().getTime() - r >= o.minTime;
      }),
      !1 === o.scroll && a.fn.preloadinator.disableScroll(),
      a(window).on("load", function () {
        if (a.fn.preloadinator.minTimeElapsed())
          a.fn.preloadinator.removePreloader();
        else {
          var e = new Date().getTime() - r;
          setTimeout(a.fn.preloadinator.removePreloader, o.minTime - e);
        }
      }),
      this
    );
  };
})(jQuery);
