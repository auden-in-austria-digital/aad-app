!(
  /**
   * Highcharts JS v11.4.6 (2024-07-08)
   *
   * Accessibility module
   *
   * (c) 2010-2024 Highsoft AS
   * Author: Oystein Moseng
   *
   * License: www.highcharts.com/license
   */ (function (e) {
    "object" == typeof module && module.exports
      ? ((e.default = e), (module.exports = e))
      : "function" == typeof define && define.amd
      ? define(
          "highcharts/modules/accessibility",
          ["highcharts"],
          function (t) {
            return e(t), (e.Highcharts = t), e;
          }
        )
      : e("undefined" != typeof Highcharts ? Highcharts : void 0);
  })(function (e) {
    "use strict";
    var t = e ? e._modules : {};
    function i(t, i, s, n) {
      t.hasOwnProperty(i) ||
        ((t[i] = n.apply(null, s)),
        "function" == typeof CustomEvent &&
          e.win.dispatchEvent(
            new CustomEvent("HighchartsModuleLoaded", {
              detail: { path: i, module: t[i] },
            })
          ));
    }
    i(
      t,
      "Accessibility/Utils/HTMLUtilities.js",
      [t["Core/Globals.js"], t["Core/Utilities.js"]],
      function (e, t) {
        let { doc: i, win: s } = e,
          { css: n } = t,
          o = (s.EventTarget && new s.EventTarget()) || "none";
        function r(e) {
          if ("function" == typeof s.MouseEvent)
            return new s.MouseEvent(e.type, e);
          if (i.createEvent) {
            let t = i.createEvent("MouseEvent");
            if (t.initMouseEvent)
              return (
                t.initMouseEvent(
                  e.type,
                  e.bubbles,
                  e.cancelable,
                  e.view || s,
                  e.detail,
                  e.screenX,
                  e.screenY,
                  e.clientX,
                  e.clientY,
                  e.ctrlKey,
                  e.altKey,
                  e.shiftKey,
                  e.metaKey,
                  e.button,
                  e.relatedTarget
                ),
                t
              );
          }
          return a(e.type);
        }
        function a(e, t, n) {
          let r = t || { x: 0, y: 0 };
          if ("function" == typeof s.MouseEvent)
            return new s.MouseEvent(e, {
              bubbles: !0,
              cancelable: !0,
              composed: !0,
              button: 0,
              buttons: 1,
              relatedTarget: n || o,
              view: s,
              detail: "click" === e ? 1 : 0,
              screenX: r.x,
              screenY: r.y,
              clientX: r.x,
              clientY: r.y,
            });
          if (i.createEvent) {
            let t = i.createEvent("MouseEvent");
            if (t.initMouseEvent)
              return (
                t.initMouseEvent(
                  e,
                  !0,
                  !0,
                  s,
                  "click" === e ? 1 : 0,
                  r.x,
                  r.y,
                  r.x,
                  r.y,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  null
                ),
                t
              );
          }
          return { type: e };
        }
        return {
          addClass: function (e, t) {
            e.classList
              ? e.classList.add(t)
              : 0 > e.className.indexOf(t) && (e.className += " " + t);
          },
          cloneMouseEvent: r,
          cloneTouchEvent: function (e) {
            let t = (e) => {
              let t = [];
              for (let i = 0; i < e.length; ++i) {
                let s = e.item(i);
                s && t.push(s);
              }
              return t;
            };
            if ("function" == typeof s.TouchEvent) {
              let i = new s.TouchEvent(e.type, {
                touches: t(e.touches),
                targetTouches: t(e.targetTouches),
                changedTouches: t(e.changedTouches),
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                metaKey: e.metaKey,
                bubbles: e.bubbles,
                cancelable: e.cancelable,
                composed: e.composed,
                detail: e.detail,
                view: e.view,
              });
              return e.defaultPrevented && i.preventDefault(), i;
            }
            let i = r(e);
            return (
              (i.touches = e.touches),
              (i.changedTouches = e.changedTouches),
              (i.targetTouches = e.targetTouches),
              i
            );
          },
          escapeStringForHTML: function (e) {
            return e
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#x27;")
              .replace(/\//g, "&#x2F;");
          },
          getElement: function (e) {
            return i.getElementById(e);
          },
          getFakeMouseEvent: a,
          getHeadingTagNameForElement: function (e) {
            let t = (e) => "h" + Math.min(6, parseInt(e.slice(1), 10) + 1),
              i = (e) => /^H[1-6]$/i.test(e),
              s = (e) => {
                let t = e;
                for (; (t = t.previousSibling); ) {
                  let e = t.tagName || "";
                  if (i(e)) return e;
                }
                return "";
              },
              n = (e) => {
                let o = s(e);
                if (o) return t(o);
                let r = e.parentElement;
                if (!r) return "p";
                let a = r.tagName;
                return i(a) ? t(a) : n(r);
              };
            return n(e);
          },
          removeChildNodes: function (e) {
            for (; e.lastChild; ) e.removeChild(e.lastChild);
          },
          removeClass: function (e, t) {
            e.classList
              ? e.classList.remove(t)
              : (e.className = e.className.replace(RegExp(t, "g"), ""));
          },
          removeElement: function (e) {
            e && e.parentNode && e.parentNode.removeChild(e);
          },
          reverseChildNodes: function (e) {
            let t = e.childNodes.length;
            for (; t--; ) e.appendChild(e.childNodes[t]);
          },
          simulatedEventTarget: o,
          stripHTMLTagsFromString: function (e, t = !1) {
            return "string" == typeof e
              ? t
                ? e.replace(/<\/?[^>]+(>|$)/g, "")
                : e.replace(/<\/?(?!\s)[^>]+(>|$)/g, "")
              : e;
          },
          visuallyHideElement: function (e) {
            n(e, {
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              clip: "rect(1px, 1px, 1px, 1px)",
              marginTop: "-3px",
              "-ms-filter":
                "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
              filter: "alpha(opacity=1)",
              opacity: 0.01,
            });
          },
        };
      }
    ),
      i(
        t,
        "Accessibility/A11yI18n.js",
        [t["Core/Templating.js"], t["Core/Utilities.js"]],
        function (e, t) {
          var i;
          let { format: s } = e,
            { getNestedProperty: n, pick: o } = t;
          return (
            (function (e) {
              function t(e, t, i) {
                let r = (e, t) => {
                    let i = e.slice(t || 0),
                      s = i.indexOf("{"),
                      n = i.indexOf("}");
                    if (s > -1 && n > s)
                      return {
                        statement: i.substring(s + 1, n),
                        begin: t + s + 1,
                        end: t + n,
                      };
                  },
                  a = [],
                  l,
                  h,
                  c = 0;
                do
                  (l = r(e, c)),
                    (h = e.substring(c, l && l.begin - 1)).length &&
                      a.push({ value: h, type: "constant" }),
                    l && a.push({ value: l.statement, type: "statement" }),
                    (c = l ? l.end + 1 : c + 1);
                while (l);
                return (
                  a.forEach((e) => {
                    "statement" === e.type &&
                      (e.value = (function (e, t) {
                        let i, s;
                        let r = e.indexOf("#each("),
                          a = e.indexOf("#plural("),
                          l = e.indexOf("["),
                          h = e.indexOf("]");
                        if (r > -1) {
                          let o = e.slice(r).indexOf(")") + r,
                            a = e.substring(0, r),
                            l = e.substring(o + 1),
                            h = e.substring(r + 6, o).split(","),
                            c = Number(h[1]),
                            d;
                          if (((s = ""), (i = n(h[0], t)))) {
                            d =
                              (c = isNaN(c) ? i.length : c) < 0
                                ? i.length + c
                                : Math.min(c, i.length);
                            for (let e = 0; e < d; ++e) s += a + i[e] + l;
                          }
                          return s.length ? s : "";
                        }
                        if (a > -1) {
                          var c;
                          let i = e.slice(a).indexOf(")") + a,
                            r = e.substring(a + 8, i).split(",");
                          switch (Number(n(r[0], t))) {
                            case 0:
                              s = o(r[4], r[1]);
                              break;
                            case 1:
                              s = o(r[2], r[1]);
                              break;
                            case 2:
                              s = o(r[3], r[1]);
                              break;
                            default:
                              s = r[1];
                          }
                          return s
                            ? ((c = s).trim && c.trim()) ||
                                c.replace(/^\s+|\s+$/g, "")
                            : "";
                        }
                        if (l > -1) {
                          let s;
                          let o = e.substring(0, l),
                            r = Number(e.substring(l + 1, h));
                          return (
                            (i = n(o, t)),
                            !isNaN(r) &&
                              i &&
                              (r < 0
                                ? void 0 === (s = i[i.length + r]) && (s = i[0])
                                : void 0 === (s = i[r]) &&
                                  (s = i[i.length - 1])),
                            void 0 !== s ? s : ""
                          );
                        }
                        return "{" + e + "}";
                      })(e.value, t));
                  }),
                  s(
                    a.reduce((e, t) => e + t.value, ""),
                    t,
                    i
                  )
                );
              }
              function i(e, i) {
                let s = e.split("."),
                  n = this.options.lang,
                  o = 0;
                for (; o < s.length; ++o) n = n && n[s[o]];
                return "string" == typeof n ? t(n, i, this) : "";
              }
              (e.compose = function (e) {
                let t = e.prototype;
                t.langFormat || (t.langFormat = i);
              }),
                (e.i18nFormat = t);
            })(i || (i = {})),
            i
          );
        }
      ),
      i(
        t,
        "Accessibility/Utils/ChartUtilities.js",
        [
          t["Core/Globals.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i) {
          let { doc: s } = e,
            { stripHTMLTagsFromString: n } = t,
            { defined: o, find: r, fireEvent: a } = i;
          function l(e) {
            if (e.points && e.points.length) {
              let t = r(e.points, (e) => !!e.graphic);
              return t && t.graphic && t.graphic.element;
            }
          }
          function h(e) {
            let t = l(e);
            return (
              (t && t.parentNode) ||
              (e.graph && e.graph.element) ||
              (e.group && e.group.element)
            );
          }
          return {
            fireEventOnWrappedOrUnwrappedElement: function e(t, i) {
              let n = i.type,
                o = t.hcEvents;
              s.createEvent && (t.dispatchEvent || t.fireEvent)
                ? t.dispatchEvent
                  ? t.dispatchEvent(i)
                  : t.fireEvent(n, i)
                : o && o[n]
                ? a(t, n, i)
                : t.element && e(t.element, i);
            },
            getChartTitle: function (e) {
              return n(
                e.options.title.text ||
                  e.langFormat("accessibility.defaultChartTitle", { chart: e }),
                e.renderer.forExport
              );
            },
            getAxisDescription: function (e) {
              return (
                e &&
                (e.options.accessibility?.description ||
                  e.axisTitle?.textStr ||
                  e.options.id ||
                  (e.categories && "categories") ||
                  (e.dateTime && "Time") ||
                  "values")
              );
            },
            getAxisRangeDescription: function (e) {
              let t = e.options || {};
              return t.accessibility &&
                void 0 !== t.accessibility.rangeDescription
                ? t.accessibility.rangeDescription
                : e.categories
                ? (function (e) {
                    let t = e.chart;
                    return e.dataMax && e.dataMin
                      ? t.langFormat("accessibility.axis.rangeCategories", {
                          chart: t,
                          axis: e,
                          numCategories: e.dataMax - e.dataMin + 1,
                        })
                      : "";
                  })(e)
                : e.dateTime && (0 === e.min || 0 === e.dataMin)
                ? (function (e) {
                    let t = e.chart,
                      i = {},
                      s = e.dataMin || e.min || 0,
                      n = e.dataMax || e.max || 0,
                      o = "Seconds";
                    (i.Seconds = (n - s) / 1e3),
                      (i.Minutes = i.Seconds / 60),
                      (i.Hours = i.Minutes / 60),
                      (i.Days = i.Hours / 24),
                      ["Minutes", "Hours", "Days"].forEach(function (e) {
                        i[e] > 2 && (o = e);
                      });
                    let r = i[o].toFixed(
                      "Seconds" !== o && "Minutes" !== o ? 1 : 0
                    );
                    return t.langFormat("accessibility.axis.timeRange" + o, {
                      chart: t,
                      axis: e,
                      range: r.replace(".0", ""),
                    });
                  })(e)
                : (function (e) {
                    let t = e.chart,
                      i = t.options,
                      s =
                        (i &&
                          i.accessibility &&
                          i.accessibility.screenReaderSection
                            .axisRangeDateFormat) ||
                        "",
                      n = {
                        min: e.dataMin || e.min || 0,
                        max: e.dataMax || e.max || 0,
                      },
                      o = function (i) {
                        return e.dateTime
                          ? t.time.dateFormat(s, n[i])
                          : n[i].toString();
                      };
                    return t.langFormat("accessibility.axis.rangeFromTo", {
                      chart: t,
                      axis: e,
                      rangeFrom: o("min"),
                      rangeTo: o("max"),
                    });
                  })(e);
            },
            getPointFromXY: function (e, t, i) {
              let s = e.length,
                n;
              for (; s--; )
                if (
                  (n = r(e[s].points || [], function (e) {
                    return e.x === t && e.y === i;
                  }))
                )
                  return n;
            },
            getSeriesFirstPointElement: l,
            getSeriesFromName: function (e, t) {
              return t
                ? (e.series || []).filter(function (e) {
                    return e.name === t;
                  })
                : e.series;
            },
            getSeriesA11yElement: h,
            unhideChartElementFromAT: function e(t, i) {
              i.setAttribute("aria-hidden", !1),
                i !== t.renderTo &&
                  i.parentNode &&
                  i.parentNode !== s.body &&
                  (Array.prototype.forEach.call(
                    i.parentNode.childNodes,
                    function (e) {
                      e.hasAttribute("aria-hidden") ||
                        e.setAttribute("aria-hidden", !0);
                    }
                  ),
                  e(t, i.parentNode));
            },
            hideSeriesFromAT: function (e) {
              let t = h(e);
              t && t.setAttribute("aria-hidden", !0);
            },
            scrollAxisToPoint: function (e) {
              let t = e.series.xAxis,
                i = e.series.yAxis,
                s = t && t.scrollbar ? t : i,
                n = s && s.scrollbar;
              if (n && o(n.to) && o(n.from)) {
                let t = n.to - n.from,
                  i = (function (e, t) {
                    if (!o(e.dataMin) || !o(e.dataMax)) return 0;
                    let i = e.toPixels(e.dataMin),
                      s = e.toPixels(e.dataMax),
                      n = "xAxis" === e.coll ? "x" : "y";
                    return (e.toPixels(t[n] || 0) - i) / (s - i);
                  })(s, e);
                n.updatePosition(i - t / 2, i + t / 2),
                  a(n, "changed", {
                    from: n.from,
                    to: n.to,
                    trigger: "scrollbar",
                    DOMEvent: null,
                  });
              }
            },
          };
        }
      ),
      i(
        t,
        "Accessibility/Utils/DOMElementProvider.js",
        [t["Core/Globals.js"], t["Accessibility/Utils/HTMLUtilities.js"]],
        function (e, t) {
          let { doc: i } = e,
            { removeElement: s } = t;
          return class {
            constructor() {
              this.elements = [];
            }
            createElement() {
              let e = i.createElement.apply(i, arguments);
              return this.elements.push(e), e;
            }
            removeElement(e) {
              s(e), this.elements.splice(this.elements.indexOf(e), 1);
            }
            destroyCreatedElements() {
              this.elements.forEach(function (e) {
                s(e);
              }),
                (this.elements = []);
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Utils/EventProvider.js",
        [t["Core/Globals.js"], t["Core/Utilities.js"]],
        function (e, t) {
          let { addEvent: i } = t;
          return class {
            constructor() {
              this.eventRemovers = [];
            }
            addEvent() {
              let t = i.apply(e, arguments);
              return (
                this.eventRemovers.push({ element: arguments[0], remover: t }),
                t
              );
            }
            removeEvent(e) {
              let t = this.eventRemovers.map((e) => e.remover).indexOf(e);
              this.eventRemovers[t].remover(), this.eventRemovers.splice(t, 1);
            }
            removeAddedEvents() {
              this.eventRemovers.map((e) => e.remover).forEach((e) => e()),
                (this.eventRemovers = []);
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/AccessibilityComponent.js",
        [
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/DOMElementProvider.js"],
          t["Accessibility/Utils/EventProvider.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { fireEventOnWrappedOrUnwrappedElement: o } = e,
            { getFakeMouseEvent: r } = s,
            { extend: a } = n;
          class l {
            initBase(e, s) {
              (this.chart = e),
                (this.eventProvider = new i()),
                (this.domElementProvider = new t()),
                (this.proxyProvider = s),
                (this.keyCodes = {
                  left: 37,
                  right: 39,
                  up: 38,
                  down: 40,
                  enter: 13,
                  space: 32,
                  esc: 27,
                  tab: 9,
                  pageUp: 33,
                  pageDown: 34,
                  end: 35,
                  home: 36,
                });
            }
            addEvent(e, t, i, s) {
              return this.eventProvider.addEvent(e, t, i, s);
            }
            createElement(e, t) {
              return this.domElementProvider.createElement(e, t);
            }
            fakeClickEvent(e) {
              o(e, r("click"));
            }
            destroyBase() {
              this.domElementProvider.destroyCreatedElements(),
                this.eventProvider.removeAddedEvents();
            }
          }
          return (
            a(l.prototype, {
              init() {},
              getKeyboardNavigation: function () {},
              onChartUpdate() {},
              onChartRender() {},
              destroy() {},
            }),
            l
          );
        }
      ),
      i(
        t,
        "Accessibility/KeyboardNavigationHandler.js",
        [t["Core/Utilities.js"]],
        function (e) {
          let { find: t } = e;
          return class {
            constructor(e, t) {
              (this.chart = e),
                (this.keyCodeMap = t.keyCodeMap || []),
                (this.validate = t.validate),
                (this.init = t.init),
                (this.terminate = t.terminate),
                (this.response = {
                  success: 1,
                  prev: 2,
                  next: 3,
                  noHandler: 4,
                  fail: 5,
                });
            }
            run(e) {
              let i = e.which || e.keyCode,
                s = this.response.noHandler,
                n = t(this.keyCodeMap, function (e) {
                  return e[0].indexOf(i) > -1;
                });
              return (
                n
                  ? (s = n[1].call(this, i, e))
                  : 9 === i &&
                    (s = this.response[e.shiftKey ? "prev" : "next"]),
                s
              );
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/ContainerComponent.js",
        [
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Core/Globals.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
        ],
        function (e, t, i, s, n) {
          let { unhideChartElementFromAT: o, getChartTitle: r } = i,
            { doc: a } = s,
            { stripHTMLTagsFromString: l } = n;
          return class extends e {
            onChartUpdate() {
              this.handleSVGTitleElement(),
                this.setSVGContainerLabel(),
                this.setGraphicContainerAttrs(),
                this.setRenderToAttrs(),
                this.makeCreditsAccessible();
            }
            handleSVGTitleElement() {
              let e = this.chart,
                t = "highcharts-title-" + e.index,
                i = l(
                  e.langFormat("accessibility.svgContainerTitle", {
                    chartTitle: r(e),
                  })
                );
              if (i.length) {
                let s = (this.svgTitleElement =
                  this.svgTitleElement ||
                  a.createElementNS("http://www.w3.org/2000/svg", "title"));
                (s.textContent = i),
                  (s.id = t),
                  e.renderTo.insertBefore(s, e.renderTo.firstChild);
              }
            }
            setSVGContainerLabel() {
              let e = this.chart,
                t = e.langFormat("accessibility.svgContainerLabel", {
                  chartTitle: r(e),
                });
              e.renderer.box &&
                t.length &&
                e.renderer.box.setAttribute("aria-label", t);
            }
            setGraphicContainerAttrs() {
              let e = this.chart,
                t = e.langFormat("accessibility.graphicContainerLabel", {
                  chartTitle: r(e),
                });
              t.length && e.container.setAttribute("aria-label", t);
            }
            setRenderToAttrs() {
              let e = this.chart,
                t = "disabled" !== e.options.accessibility.landmarkVerbosity,
                i = e.langFormat("accessibility.chartContainerLabel", {
                  title: r(e),
                  chart: e,
                });
              i &&
                (e.renderTo.setAttribute("role", t ? "region" : "group"),
                e.renderTo.setAttribute("aria-label", i));
            }
            makeCreditsAccessible() {
              let e = this.chart,
                t = e.credits;
              t &&
                (t.textStr &&
                  t.element.setAttribute(
                    "aria-label",
                    e.langFormat("accessibility.credits", {
                      creditsStr: l(t.textStr, e.renderer.forExport),
                    })
                  ),
                o(e, t.element));
            }
            getKeyboardNavigation() {
              let e = this.chart;
              return new t(e, {
                keyCodeMap: [],
                validate: function () {
                  return !0;
                },
                init: function () {
                  let t = e.accessibility;
                  t && t.keyboardNavigation.tabindexContainer.focus();
                },
              });
            }
            destroy() {
              this.chart.renderTo.setAttribute("aria-hidden", !0);
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/FocusBorder.js",
        [t["Core/Utilities.js"]],
        function (e) {
          var t;
          let { addEvent: i, pick: s } = e;
          return (
            (function (e) {
              let t = [
                "x",
                "y",
                "transform",
                "width",
                "height",
                "r",
                "d",
                "stroke-width",
              ];
              function n() {
                let e = this.focusElement,
                  t = this.options.accessibility.keyboardNavigation.focusBorder;
                e &&
                  (e.removeFocusBorder(),
                  t.enabled &&
                    e.addFocusBorder(t.margin, {
                      stroke: t.style.color,
                      strokeWidth: t.style.lineWidth,
                      r: t.style.borderRadius,
                    }));
              }
              function o(e, t) {
                let s =
                    this.options.accessibility.keyboardNavigation.focusBorder,
                  n = t || e.element;
                n &&
                  n.focus &&
                  ((n.hcEvents && n.hcEvents.focusin) ||
                    i(n, "focusin", function () {}),
                  n.focus(),
                  s.hideBrowserFocusOutline && (n.style.outline = "none")),
                  this.focusElement && this.focusElement.removeFocusBorder(),
                  (this.focusElement = e),
                  this.renderFocusBorder();
              }
              function r(e, i) {
                this.focusBorder && this.removeFocusBorder();
                let n = this.getBBox(),
                  o = s(e, 3),
                  r = this.parentGroup,
                  a = this.scaleX || (r && r.scaleX),
                  l = this.scaleY || (r && r.scaleY),
                  h = (a ? !l : l)
                    ? Math.abs(a || l || 1)
                    : (Math.abs(a || 1) + Math.abs(l || 1)) / 2;
                (n.x += this.translateX ? this.translateX : 0),
                  (n.y += this.translateY ? this.translateY : 0);
                let c = n.x - o,
                  d = n.y - o,
                  u = n.width + 2 * o,
                  p = n.height + 2 * o,
                  g = !!this.text;
                if ("text" === this.element.nodeName || g) {
                  let e, t;
                  let i = !!this.rotation,
                    s = g
                      ? { x: i ? 1 : 0, y: 0 }
                      : ((e = 0),
                        (t = 0),
                        "middle" === this.attr("text-anchor")
                          ? (e = t = 0.5)
                          : this.rotation
                          ? (e = 0.25)
                          : (t = 0.75),
                        { x: e, y: t }),
                    r = +this.attr("x"),
                    a = +this.attr("y");
                  if (
                    (isNaN(r) || (c = r - n.width * s.x - o),
                    isNaN(a) || (d = a - n.height * s.y - o),
                    g && i)
                  ) {
                    let e = u;
                    (u = p),
                      (p = e),
                      isNaN(r) || (c = r - n.height * s.x - o),
                      isNaN(a) || (d = a - n.width * s.y - o);
                  }
                }
                (this.focusBorder = this.renderer
                  .rect(
                    c,
                    d,
                    u,
                    p,
                    parseInt(((i && i.r) || 0).toString(), 10) / h
                  )
                  .addClass("highcharts-focus-border")
                  .attr({ zIndex: 99 })
                  .add(r)),
                  this.renderer.styledMode ||
                    this.focusBorder.attr({
                      stroke: i && i.stroke,
                      "stroke-width": ((i && i.strokeWidth) || 0) / h,
                    }),
                  (function (e, ...i) {
                    e.focusBorderUpdateHooks ||
                      ((e.focusBorderUpdateHooks = {}),
                      t.forEach((t) => {
                        let s = t + "Setter",
                          n = e[s] || e._defaultSetter;
                        (e.focusBorderUpdateHooks[s] = n),
                          (e[s] = function () {
                            let t = n.apply(e, arguments);
                            return e.addFocusBorder.apply(e, i), t;
                          });
                      }));
                  })(this, e, i),
                  (function (e) {
                    if (e.focusBorderDestroyHook) return;
                    let t = e.destroy;
                    (e.destroy = function () {
                      return (
                        e.focusBorder &&
                          e.focusBorder.destroy &&
                          e.focusBorder.destroy(),
                        t.apply(e, arguments)
                      );
                    }),
                      (e.focusBorderDestroyHook = t);
                  })(this);
              }
              function a() {
                var e;
                (e = this),
                  e.focusBorderUpdateHooks &&
                    (Object.keys(e.focusBorderUpdateHooks).forEach((t) => {
                      let i = e.focusBorderUpdateHooks[t];
                      i === e._defaultSetter ? delete e[t] : (e[t] = i);
                    }),
                    delete e.focusBorderUpdateHooks),
                  this.focusBorderDestroyHook &&
                    ((this.destroy = this.focusBorderDestroyHook),
                    delete this.focusBorderDestroyHook),
                  this.focusBorder &&
                    (this.focusBorder.destroy(), delete this.focusBorder);
              }
              e.compose = function (e, t) {
                let i = e.prototype,
                  s = t.prototype;
                i.renderFocusBorder ||
                  ((i.renderFocusBorder = n), (i.setFocusToElement = o)),
                  s.addFocusBorder ||
                    ((s.addFocusBorder = r), (s.removeFocusBorder = a));
              };
            })(t || (t = {})),
            t
          );
        }
      ),
      i(
        t,
        "Accessibility/Utils/Announcer.js",
        [
          t["Core/Renderer/HTML/AST.js"],
          t["Accessibility/Utils/DOMElementProvider.js"],
          t["Core/Globals.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { doc: o } = i,
            { addClass: r, visuallyHideElement: a } = s,
            { attr: l } = n;
          return class {
            constructor(e, i) {
              (this.chart = e),
                (this.domElementProvider = new t()),
                (this.announceRegion = this.addAnnounceRegion(i));
            }
            destroy() {
              this.domElementProvider.destroyCreatedElements();
            }
            announce(t) {
              e.setElementHTML(this.announceRegion, t),
                this.clearAnnouncementRegionTimer &&
                  clearTimeout(this.clearAnnouncementRegionTimer),
                (this.clearAnnouncementRegionTimer = setTimeout(() => {
                  (this.announceRegion.innerHTML = e.emptyHTML),
                    delete this.clearAnnouncementRegionTimer;
                }, 3e3));
            }
            addAnnounceRegion(e) {
              let t =
                  this.chart.announcerContainer ||
                  this.createAnnouncerContainer(),
                i = this.domElementProvider.createElement("div");
              return (
                l(i, { "aria-hidden": !1, "aria-live": e, "aria-atomic": !0 }),
                this.chart.styledMode
                  ? r(i, "highcharts-visually-hidden")
                  : a(i),
                t.appendChild(i),
                i
              );
            }
            createAnnouncerContainer() {
              let e = this.chart,
                t = o.createElement("div");
              return (
                l(t, {
                  "aria-hidden": !1,
                  class: "highcharts-announcer-container",
                }),
                (t.style.position = "relative"),
                e.renderTo.insertBefore(t, e.renderTo.firstChild),
                (e.announcerContainer = t),
                t
              );
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/AnnotationsA11y.js",
        [t["Accessibility/Utils/HTMLUtilities.js"]],
        function (e) {
          let { escapeStringForHTML: t, stripHTMLTagsFromString: i } = e;
          function s(e) {
            return (e.annotations || []).reduce(
              (e, t) => (
                t.options &&
                  !1 !== t.options.visible &&
                  (e = e.concat(t.labels)),
                e
              ),
              []
            );
          }
          function n(e) {
            return (
              (e.options &&
                e.options.accessibility &&
                e.options.accessibility.description) ||
              (e.graphic && e.graphic.text && e.graphic.text.textStr) ||
              ""
            );
          }
          function o(e) {
            let t =
              e.options &&
              e.options.accessibility &&
              e.options.accessibility.description;
            if (t) return t;
            let i = e.chart,
              s = n(e),
              o = e.points,
              r = (e) =>
                (e.graphic &&
                  e.graphic.element &&
                  e.graphic.element.getAttribute("aria-label")) ||
                "",
              a = o
                .filter((e) => !!e.graphic)
                .map((e) => {
                  let t =
                      (e.accessibility && e.accessibility.valueDescription) ||
                      r(e),
                    i = (e && e.series.name) || "";
                  return (i ? i + ", " : "") + "data point " + t;
                })
                .filter((e) => !!e),
              l = a.length,
              h = l > 1 ? "MultiplePoints" : l ? "SinglePoint" : "NoPoints",
              c = {
                annotationText: s,
                annotation: e,
                numPoints: l,
                annotationPoint: a[0],
                additionalAnnotationPoints: a.slice(1),
              };
            return i.langFormat(
              "accessibility.screenReaderSection.annotations.description" + h,
              c
            );
          }
          function r(e) {
            return s(e).map((s) => {
              let n = t(i(o(s), e.renderer.forExport));
              return n ? `<li>${n}</li>` : "";
            });
          }
          return {
            getAnnotationsInfoHTML: function (e) {
              let t = e.annotations;
              if (!(t && t.length)) return "";
              let i = r(e);
              return `<ul style="list-style-type: none">${i.join(" ")}</ul>`;
            },
            getAnnotationLabelDescription: o,
            getAnnotationListItems: r,
            getPointAnnotationTexts: function (e) {
              let t = s(e.series.chart).filter((t) => t.points.indexOf(e) > -1);
              return t.length ? t.map((e) => `${n(e)}`) : [];
            },
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/InfoRegionsComponent.js",
        [
          t["Accessibility/A11yI18n.js"],
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/Announcer.js"],
          t["Accessibility/Components/AnnotationsA11y.js"],
          t["Core/Renderer/HTML/AST.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Core/Templating.js"],
          t["Core/Globals.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n, o, r, a, l, h) {
          let { getAnnotationsInfoHTML: c } = s,
            {
              getAxisDescription: d,
              getAxisRangeDescription: u,
              getChartTitle: p,
              unhideChartElementFromAT: g,
            } = o,
            { format: m } = r,
            { doc: b } = a,
            {
              addClass: y,
              getElement: f,
              getHeadingTagNameForElement: x,
              stripHTMLTagsFromString: v,
              visuallyHideElement: A,
            } = l,
            { attr: C, pick: w, replaceNested: E } = h;
          function T(e) {
            return E(e, [/<([\w\-.:!]+)\b[^<>]*>\s*<\/\1>/g, ""]);
          }
          return class extends t {
            constructor() {
              super(...arguments), (this.screenReaderSections = {});
            }
            init() {
              let e = this.chart,
                t = this;
              this.initRegionsDefinitions(),
                this.addEvent(e, "aftergetTableAST", function (e) {
                  t.onDataTableCreated(e);
                }),
                this.addEvent(e, "afterViewData", function (e) {
                  e.wasHidden &&
                    ((t.dataTableDiv = e.element),
                    setTimeout(function () {
                      t.focusDataTable();
                    }, 300));
                }),
                this.addEvent(e, "afterHideData", function () {
                  t.viewDataTableButton &&
                    t.viewDataTableButton.setAttribute(
                      "aria-expanded",
                      "false"
                    );
                }),
                (this.announcer = new i(e, "assertive"));
            }
            initRegionsDefinitions() {
              let e = this,
                t = this.chart.options.accessibility;
              this.screenReaderSections = {
                before: {
                  element: null,
                  buildContent: function (i) {
                    let s = t.screenReaderSection.beforeChartFormatter;
                    return s ? s(i) : e.defaultBeforeChartFormatter(i);
                  },
                  insertIntoDOM: function (e, t) {
                    t.renderTo.insertBefore(e, t.renderTo.firstChild);
                  },
                  afterInserted: function () {
                    void 0 !== e.sonifyButtonId &&
                      e.initSonifyButton(e.sonifyButtonId),
                      void 0 !== e.dataTableButtonId &&
                        e.initDataTableButton(e.dataTableButtonId);
                  },
                },
                after: {
                  element: null,
                  buildContent: function (i) {
                    let s = t.screenReaderSection.afterChartFormatter;
                    return s ? s(i) : e.defaultAfterChartFormatter();
                  },
                  insertIntoDOM: function (e, t) {
                    t.renderTo.insertBefore(e, t.container.nextSibling);
                  },
                  afterInserted: function () {
                    e.chart.accessibility &&
                      t.keyboardNavigation.enabled &&
                      e.chart.accessibility.keyboardNavigation.updateExitAnchor();
                  },
                },
              };
            }
            onChartRender() {
              let e = this;
              (this.linkedDescriptionElement =
                this.getLinkedDescriptionElement()),
                this.setLinkedDescriptionAttrs(),
                Object.keys(this.screenReaderSections).forEach(function (t) {
                  e.updateScreenReaderSection(t);
                });
            }
            getLinkedDescriptionElement() {
              let e = this.chart.options.accessibility.linkedDescription;
              if (!e) return;
              if ("string" != typeof e) return e;
              let t = m(e, this.chart),
                i = b.querySelectorAll(t);
              if (1 === i.length) return i[0];
            }
            setLinkedDescriptionAttrs() {
              let e = this.linkedDescriptionElement;
              e &&
                (e.setAttribute("aria-hidden", "true"),
                y(e, "highcharts-linked-description"));
            }
            updateScreenReaderSection(e) {
              let t = this.chart,
                i = this.screenReaderSections[e],
                s = i.buildContent(t),
                o = (i.element = i.element || this.createElement("div")),
                r = o.firstChild || this.createElement("div");
              s
                ? (this.setScreenReaderSectionAttribs(o, e),
                  n.setElementHTML(r, s),
                  o.appendChild(r),
                  i.insertIntoDOM(o, t),
                  t.styledMode ? y(r, "highcharts-visually-hidden") : A(r),
                  g(t, r),
                  i.afterInserted && i.afterInserted())
                : (o.parentNode && o.parentNode.removeChild(o),
                  (i.element = null));
            }
            setScreenReaderSectionAttribs(e, t) {
              let i = this.chart,
                s = i.langFormat(
                  "accessibility.screenReaderSection." + t + "RegionLabel",
                  { chart: i, chartTitle: p(i) }
                );
              C(e, {
                id: `highcharts-screen-reader-region-${t}-${i.index}`,
                "aria-label": s || void 0,
              }),
                (e.style.position = "relative"),
                s &&
                  e.setAttribute(
                    "role",
                    "all" === i.options.accessibility.landmarkVerbosity
                      ? "region"
                      : "group"
                  );
            }
            defaultBeforeChartFormatter() {
              let t = this.chart,
                i =
                  t.options.accessibility.screenReaderSection.beforeChartFormat;
              if (!i) return "";
              let s = this.getAxesDescription(),
                n =
                  t.sonify &&
                  t.options.sonification &&
                  t.options.sonification.enabled,
                o = "highcharts-a11y-sonify-data-btn-" + t.index,
                r = "hc-linkto-highcharts-data-table-" + t.index,
                a = c(t),
                l = t.langFormat(
                  "accessibility.screenReaderSection.annotations.heading",
                  { chart: t }
                ),
                h = {
                  headingTagName: x(t.renderTo),
                  chartTitle: p(t),
                  typeDescription: this.getTypeDescriptionText(),
                  chartSubtitle: this.getSubtitleText(),
                  chartLongdesc: this.getLongdescText(),
                  xAxisDescription: s.xAxis,
                  yAxisDescription: s.yAxis,
                  playAsSoundButton: n ? this.getSonifyButtonText(o) : "",
                  viewTableButton: t.getCSV
                    ? this.getDataTableButtonText(r)
                    : "",
                  annotationsTitle: a ? l : "",
                  annotationsList: a,
                },
                d = e.i18nFormat(i, h, t);
              return (
                (this.dataTableButtonId = r), (this.sonifyButtonId = o), T(d)
              );
            }
            defaultAfterChartFormatter() {
              let t = this.chart,
                i =
                  t.options.accessibility.screenReaderSection.afterChartFormat;
              if (!i) return "";
              let s = { endOfChartMarker: this.getEndOfChartMarkerText() };
              return T(e.i18nFormat(i, s, t));
            }
            getLinkedDescription() {
              let e = this.linkedDescriptionElement;
              return v((e && e.innerHTML) || "", this.chart.renderer.forExport);
            }
            getLongdescText() {
              let e = this.chart.options,
                t = e.caption,
                i = t && t.text,
                s = this.getLinkedDescription();
              return e.accessibility.description || s || i || "";
            }
            getTypeDescriptionText() {
              let e = this.chart;
              return e.types
                ? e.options.accessibility.typeDescription ||
                    (function (e, t) {
                      let i = t[0],
                        s = (e.series && e.series[0]) || {},
                        n =
                          e.mapView &&
                          e.mapView.geoMap &&
                          e.mapView.geoMap.title,
                        o = {
                          numSeries: e.series.length,
                          numPoints: s.points && s.points.length,
                          chart: e,
                          mapTitle: n,
                        };
                      return i
                        ? "map" === i || "tiledwebmap" === i
                          ? o.mapTitle
                            ? e.langFormat(
                                "accessibility.chartTypes.mapTypeDescription",
                                o
                              )
                            : e.langFormat(
                                "accessibility.chartTypes.unknownMap",
                                o
                              )
                          : e.types.length > 1
                          ? e.langFormat(
                              "accessibility.chartTypes.combinationChart",
                              o
                            )
                          : (function (e, t, i) {
                              let s = t[0],
                                n = e.langFormat(
                                  "accessibility.seriesTypeDescriptions." + s,
                                  i
                                ),
                                o =
                                  e.series && e.series.length < 2
                                    ? "Single"
                                    : "Multiple";
                              return (
                                (e.langFormat(
                                  "accessibility.chartTypes." + s + o,
                                  i
                                ) ||
                                  e.langFormat(
                                    "accessibility.chartTypes.default" + o,
                                    i
                                  )) + (n ? " " + n : "")
                              );
                            })(e, t, o)
                        : e.langFormat(
                            "accessibility.chartTypes.emptyChart",
                            o
                          );
                    })(e, e.types)
                : "";
            }
            getDataTableButtonText(e) {
              let t = this.chart;
              return (
                '<button id="' +
                e +
                '">' +
                t.langFormat("accessibility.table.viewAsDataTableButtonText", {
                  chart: t,
                  chartTitle: p(t),
                }) +
                "</button>"
              );
            }
            getSonifyButtonText(e) {
              let t = this.chart;
              return t.options.sonification &&
                !1 === t.options.sonification.enabled
                ? ""
                : '<button id="' +
                    e +
                    '">' +
                    t.langFormat(
                      "accessibility.sonification.playAsSoundButtonText",
                      { chart: t, chartTitle: p(t) }
                    ) +
                    "</button>";
            }
            getSubtitleText() {
              let e = this.chart.options.subtitle;
              return v((e && e.text) || "", this.chart.renderer.forExport);
            }
            getEndOfChartMarkerText() {
              let e = f(`highcharts-end-of-chart-marker-${this.chart.index}`);
              if (e) return e.outerHTML;
              let t = this.chart,
                i = t.langFormat(
                  "accessibility.screenReaderSection.endOfChartMarker",
                  { chart: t }
                );
              return (
                '<div id="highcharts-end-of-chart-marker-' +
                t.index +
                '">' +
                i +
                "</div>"
              );
            }
            onDataTableCreated(e) {
              let t = this.chart;
              if (t.options.accessibility.enabled) {
                this.viewDataTableButton &&
                  this.viewDataTableButton.setAttribute(
                    "aria-expanded",
                    "true"
                  );
                let i = e.tree.attributes || {};
                (i.tabindex = -1),
                  (i.summary = t.langFormat(
                    "accessibility.table.tableSummary",
                    { chart: t }
                  )),
                  (e.tree.attributes = i);
              }
            }
            focusDataTable() {
              let e = this.dataTableDiv,
                t = e && e.getElementsByTagName("table")[0];
              t && t.focus && t.focus();
            }
            initSonifyButton(e) {
              let t = (this.sonifyButton = f(e)),
                i = this.chart,
                s = (e) => {
                  t &&
                    (t.setAttribute("aria-hidden", "true"),
                    t.setAttribute("aria-label", "")),
                    e.preventDefault(),
                    e.stopPropagation();
                  let s = i.langFormat(
                    "accessibility.sonification.playAsSoundClickAnnouncement",
                    { chart: i }
                  );
                  this.announcer.announce(s),
                    setTimeout(() => {
                      t &&
                        (t.removeAttribute("aria-hidden"),
                        t.removeAttribute("aria-label")),
                        i.sonify && i.sonify();
                    }, 1e3);
                };
              t &&
                i &&
                (t.setAttribute("tabindex", -1),
                (t.onclick = function (e) {
                  (
                    (i.options.accessibility &&
                      i.options.accessibility.screenReaderSection
                        .onPlayAsSoundClick) ||
                    s
                  ).call(this, e, i);
                }));
            }
            initDataTableButton(e) {
              let t = (this.viewDataTableButton = f(e)),
                i = this.chart,
                s = e.replace("hc-linkto-", "");
              t &&
                (C(t, { tabindex: -1, "aria-expanded": !!f(s) }),
                (t.onclick =
                  i.options.accessibility.screenReaderSection
                    .onViewDataTableClick ||
                  function () {
                    i.viewData();
                  }));
            }
            getAxesDescription() {
              let e = this.chart,
                t = function (t, i) {
                  let s = e[t];
                  return (
                    s.length > 1 ||
                    (s[0] &&
                      w(
                        s[0].options.accessibility &&
                          s[0].options.accessibility.enabled,
                        i
                      ))
                  );
                },
                i =
                  !!e.types &&
                  0 > e.types.indexOf("map") &&
                  0 > e.types.indexOf("treemap") &&
                  0 > e.types.indexOf("tilemap"),
                s = !!e.hasCartesianSeries,
                n = t("xAxis", !e.angular && s && i),
                o = t("yAxis", s && i),
                r = {};
              return (
                n && (r.xAxis = this.getAxisDescriptionText("xAxis")),
                o && (r.yAxis = this.getAxisDescriptionText("yAxis")),
                r
              );
            }
            getAxisDescriptionText(e) {
              let t = this.chart,
                i = t[e];
              return t.langFormat(
                "accessibility.axis." +
                  e +
                  "Description" +
                  (i.length > 1 ? "Plural" : "Singular"),
                {
                  chart: t,
                  names: i.map(function (e) {
                    return d(e);
                  }),
                  ranges: i.map(function (e) {
                    return u(e);
                  }),
                  numAxes: i.length,
                }
              );
            }
            destroy() {
              this.announcer && this.announcer.destroy();
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/MenuComponent.js",
        [
          t["Core/Utilities.js"],
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
        ],
        function (e, t, i, s, n) {
          let { attr: o } = e,
            { getChartTitle: r, unhideChartElementFromAT: a } = s,
            { getFakeMouseEvent: l } = n;
          function h(e) {
            return e.exportSVGElements && e.exportSVGElements[0];
          }
          class c extends t {
            init() {
              let e = this.chart,
                t = this;
              this.addEvent(e, "exportMenuShown", function () {
                t.onMenuShown();
              }),
                this.addEvent(e, "exportMenuHidden", function () {
                  t.onMenuHidden();
                }),
                this.createProxyGroup();
            }
            onMenuHidden() {
              let e = this.chart.exportContextMenu;
              e && e.setAttribute("aria-hidden", "true"),
                this.setExportButtonExpandedState("false");
            }
            onMenuShown() {
              let e = this.chart,
                t = e.exportContextMenu;
              t && (this.addAccessibleContextMenuAttribs(), a(e, t)),
                this.setExportButtonExpandedState("true");
            }
            setExportButtonExpandedState(e) {
              this.exportButtonProxy &&
                this.exportButtonProxy.innerElement.setAttribute(
                  "aria-expanded",
                  e
                );
            }
            onChartRender() {
              let e = this.chart,
                t = e.focusElement,
                i = e.accessibility;
              this.proxyProvider.clearGroup("chartMenu"),
                this.proxyMenuButton(),
                this.exportButtonProxy &&
                  t &&
                  t === e.exportingGroup &&
                  (t.focusBorder
                    ? e.setFocusToElement(
                        t,
                        this.exportButtonProxy.innerElement
                      )
                    : i && i.keyboardNavigation.tabindexContainer.focus());
            }
            proxyMenuButton() {
              let e = this.chart,
                t = this.proxyProvider,
                i = h(e);
              (function (e) {
                let t = e.options.exporting,
                  i = h(e);
                return !!(
                  t &&
                  !1 !== t.enabled &&
                  t.accessibility &&
                  t.accessibility.enabled &&
                  i &&
                  i.element
                );
              })(e) &&
                i &&
                (this.exportButtonProxy = t.addProxyElement(
                  "chartMenu",
                  { click: i },
                  "button",
                  {
                    "aria-label": e.langFormat(
                      "accessibility.exporting.menuButtonLabel",
                      { chart: e, chartTitle: r(e) }
                    ),
                    "aria-expanded": !1,
                    title: e.options.lang.contextButtonTitle || null,
                  }
                ));
            }
            createProxyGroup() {
              this.chart &&
                this.proxyProvider &&
                this.proxyProvider.addGroup("chartMenu");
            }
            addAccessibleContextMenuAttribs() {
              let e = this.chart,
                t = e.exportDivElements;
              if (t && t.length) {
                t.forEach((e) => {
                  e &&
                    ("LI" !== e.tagName || (e.children && e.children.length)
                      ? e.setAttribute("aria-hidden", "true")
                      : e.setAttribute("tabindex", -1));
                });
                let i = t[0] && t[0].parentNode;
                i &&
                  o(i, {
                    "aria-hidden": void 0,
                    "aria-label": e.langFormat(
                      "accessibility.exporting.chartMenuLabel",
                      { chart: e }
                    ),
                    role: "list",
                  });
              }
            }
            getKeyboardNavigation() {
              let e = this.keyCodes,
                t = this.chart,
                s = this;
              return new i(t, {
                keyCodeMap: [
                  [
                    [e.left, e.up],
                    function () {
                      return s.onKbdPrevious(this);
                    },
                  ],
                  [
                    [e.right, e.down],
                    function () {
                      return s.onKbdNext(this);
                    },
                  ],
                  [
                    [e.enter, e.space],
                    function () {
                      return s.onKbdClick(this);
                    },
                  ],
                ],
                validate: function () {
                  return (
                    !!t.exporting &&
                    !1 !== t.options.exporting.enabled &&
                    !1 !== t.options.exporting.accessibility.enabled
                  );
                },
                init: function () {
                  let e = s.exportButtonProxy,
                    i = s.chart.exportingGroup;
                  e && i && t.setFocusToElement(i, e.innerElement);
                },
                terminate: function () {
                  t.hideExportMenu();
                },
              });
            }
            onKbdPrevious(e) {
              let t = this.chart,
                i = t.options.accessibility,
                s = e.response,
                n = t.highlightedExportItemIx || 0;
              for (; n--; ) if (t.highlightExportItem(n)) return s.success;
              return i.keyboardNavigation.wrapAround
                ? (t.highlightLastExportItem(), s.success)
                : s.prev;
            }
            onKbdNext(e) {
              let t = this.chart,
                i = t.options.accessibility,
                s = e.response;
              for (
                let e = (t.highlightedExportItemIx || 0) + 1;
                e < t.exportDivElements.length;
                ++e
              )
                if (t.highlightExportItem(e)) return s.success;
              return i.keyboardNavigation.wrapAround
                ? (t.highlightExportItem(0), s.success)
                : s.next;
            }
            onKbdClick(e) {
              let t = this.chart,
                i = t.exportDivElements[t.highlightedExportItemIx],
                s = h(t).element;
              return (
                t.openMenu
                  ? this.fakeClickEvent(i)
                  : (this.fakeClickEvent(s), t.highlightExportItem(0)),
                e.response.success
              );
            }
          }
          return (
            (function (e) {
              function t() {
                let e = h(this);
                if (e) {
                  let t = e.element;
                  t.onclick && t.onclick(l("click"));
                }
              }
              function i() {
                let e = this.exportDivElements;
                e &&
                  this.exportContextMenu &&
                  this.openMenu &&
                  (e.forEach((e) => {
                    e &&
                      "highcharts-menu-item" === e.className &&
                      e.onmouseout &&
                      e.onmouseout(l("mouseout"));
                  }),
                  (this.highlightedExportItemIx = 0),
                  this.exportContextMenu.hideMenu(),
                  this.container.focus());
              }
              function s(e) {
                let t = this.exportDivElements && this.exportDivElements[e],
                  i =
                    this.exportDivElements &&
                    this.exportDivElements[this.highlightedExportItemIx];
                if (
                  t &&
                  "LI" === t.tagName &&
                  !(t.children && t.children.length)
                ) {
                  let s = !!(this.renderTo.getElementsByTagName("g")[0] || {})
                    .focus;
                  return (
                    t.focus && s && t.focus(),
                    i && i.onmouseout && i.onmouseout(l("mouseout")),
                    t.onmouseover && t.onmouseover(l("mouseover")),
                    (this.highlightedExportItemIx = e),
                    !0
                  );
                }
                return !1;
              }
              function n() {
                if (this.exportDivElements) {
                  let e = this.exportDivElements.length;
                  for (; e--; ) if (this.highlightExportItem(e)) return !0;
                }
                return !1;
              }
              e.compose = function (e) {
                let o = e.prototype;
                o.hideExportMenu ||
                  ((o.hideExportMenu = i),
                  (o.highlightExportItem = s),
                  (o.highlightLastExportItem = n),
                  (o.showExportMenu = t));
              };
            })(c || (c = {})),
            c
          );
        }
      ),
      i(
        t,
        "Accessibility/KeyboardNavigation.js",
        [
          t["Core/Globals.js"],
          t["Accessibility/Components/MenuComponent.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/EventProvider.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
        ],
        function (e, t, i, s, n) {
          let { doc: o, win: r } = e,
            { addEvent: a, defined: l, fireEvent: h } = i,
            { getElement: c, simulatedEventTarget: d } = n;
          class u {
            constructor(e, t) {
              (this.currentModuleIx = NaN),
                (this.modules = []),
                this.init(e, t);
            }
            init(e, t) {
              let i = (this.eventProvider = new s());
              (this.chart = e),
                (this.components = t),
                (this.modules = []),
                (this.currentModuleIx = 0),
                this.update(),
                i.addEvent(this.tabindexContainer, "keydown", (e) =>
                  this.onKeydown(e)
                ),
                i.addEvent(this.tabindexContainer, "focus", (e) =>
                  this.onFocus(e)
                ),
                ["mouseup", "touchend"].forEach((e) =>
                  i.addEvent(o, e, (e) => this.onMouseUp(e))
                ),
                ["mousedown", "touchstart"].forEach((t) =>
                  i.addEvent(e.renderTo, t, () => {
                    this.isClickingChart = !0;
                  })
                );
            }
            update(e) {
              let t = this.chart.options.accessibility,
                i = t && t.keyboardNavigation,
                s = this.components;
              this.updateContainerTabindex(),
                i && i.enabled && e && e.length
                  ? ((this.modules = e.reduce(function (e, t) {
                      let i = s[t].getKeyboardNavigation();
                      return e.concat(i);
                    }, [])),
                    this.updateExitAnchor())
                  : ((this.modules = []),
                    (this.currentModuleIx = 0),
                    this.removeExitAnchor());
            }
            updateExitAnchor() {
              let e = c(`highcharts-end-of-chart-marker-${this.chart.index}`);
              this.removeExitAnchor(),
                e
                  ? (this.makeElementAnExitAnchor(e), (this.exitAnchor = e))
                  : this.createExitAnchor();
            }
            move(e) {
              let t = this.modules && this.modules[this.currentModuleIx];
              t && t.terminate && t.terminate(e),
                this.chart.focusElement &&
                  this.chart.focusElement.removeFocusBorder(),
                (this.currentModuleIx += e);
              let i = this.modules && this.modules[this.currentModuleIx];
              if (i) {
                if (i.validate && !i.validate()) return this.move(e);
                if (i.init) return i.init(e), !0;
              }
              return (
                (this.currentModuleIx = 0),
                (this.exiting = !0),
                e > 0
                  ? this.exitAnchor && this.exitAnchor.focus()
                  : this.tabindexContainer.focus(),
                !1
              );
            }
            onFocus(e) {
              let t = this.chart,
                i = e.relatedTarget && t.container.contains(e.relatedTarget),
                s = t.options.accessibility,
                n = s && s.keyboardNavigation;
              if (
                n &&
                n.enabled &&
                !this.exiting &&
                !this.tabbingInBackwards &&
                !this.isClickingChart &&
                !i
              ) {
                let e = this.getFirstValidModuleIx();
                null !== e &&
                  ((this.currentModuleIx = e), this.modules[e].init(1));
              }
              (this.keyboardReset = !1), (this.exiting = !1);
            }
            onMouseUp(e) {
              if (
                (delete this.isClickingChart,
                !this.keyboardReset && e.relatedTarget !== d)
              ) {
                let t = this.chart;
                if (!e.target || !t.container.contains(e.target)) {
                  let e =
                    this.modules && this.modules[this.currentModuleIx || 0];
                  e && e.terminate && e.terminate(), (this.currentModuleIx = 0);
                }
                t.focusElement &&
                  (t.focusElement.removeFocusBorder(), delete t.focusElement),
                  (this.keyboardReset = !0);
              }
            }
            onKeydown(e) {
              let t;
              let i = e || r.event,
                s =
                  this.modules &&
                  this.modules.length &&
                  this.modules[this.currentModuleIx],
                n = i.target;
              if (
                (!n ||
                  "INPUT" !== n.nodeName ||
                  n.classList.contains("highcharts-a11y-proxy-element")) &&
                ((this.keyboardReset = !1), (this.exiting = !1), s)
              ) {
                let e = s.run(i);
                e === s.response.success
                  ? (t = !0)
                  : e === s.response.prev
                  ? (t = this.move(-1))
                  : e === s.response.next && (t = this.move(1)),
                  t && (i.preventDefault(), i.stopPropagation());
              }
            }
            updateContainerTabindex() {
              let e;
              let t = this.chart.options.accessibility,
                i = t && t.keyboardNavigation,
                s = !(i && !1 === i.enabled),
                n = this.chart,
                o = n.container;
              n.renderTo.hasAttribute("tabindex")
                ? (o.removeAttribute("tabindex"), (e = n.renderTo))
                : (e = o),
                (this.tabindexContainer = e);
              let r = e.getAttribute("tabindex");
              s && !r
                ? e.setAttribute("tabindex", "0")
                : s || n.container.removeAttribute("tabindex");
            }
            createExitAnchor() {
              let e = this.chart,
                t = (this.exitAnchor = o.createElement("div"));
              e.renderTo.appendChild(t), this.makeElementAnExitAnchor(t);
            }
            makeElementAnExitAnchor(e) {
              let t = this.tabindexContainer.getAttribute("tabindex") || 0;
              e.setAttribute("class", "highcharts-exit-anchor"),
                e.setAttribute("tabindex", t),
                e.setAttribute("aria-hidden", !1),
                this.addExitAnchorEventsToEl(e);
            }
            removeExitAnchor() {
              if (this.exitAnchor) {
                let e = this.eventProvider.eventRemovers.find(
                  (e) => e.element === this.exitAnchor
                );
                e && l(e.remover) && this.eventProvider.removeEvent(e.remover),
                  this.exitAnchor.parentNode &&
                    this.exitAnchor.parentNode.removeChild(this.exitAnchor),
                  delete this.exitAnchor;
              }
            }
            addExitAnchorEventsToEl(e) {
              let t = this.chart,
                i = this;
              this.eventProvider.addEvent(e, "focus", function (e) {
                let s = e || r.event,
                  n = !(
                    (s.relatedTarget &&
                      t.container.contains(s.relatedTarget)) ||
                    i.exiting
                  );
                if ((t.focusElement && delete t.focusElement, n)) {
                  if (
                    ((i.tabbingInBackwards = !0),
                    i.tabindexContainer.focus(),
                    delete i.tabbingInBackwards,
                    s.preventDefault(),
                    i.modules && i.modules.length)
                  ) {
                    i.currentModuleIx = i.modules.length - 1;
                    let e = i.modules[i.currentModuleIx];
                    e && e.validate && !e.validate()
                      ? i.move(-1)
                      : e && e.init(-1);
                  }
                } else i.exiting = !1;
              });
            }
            getFirstValidModuleIx() {
              let e = this.modules.length;
              for (let t = 0; t < e; ++t) {
                let e = this.modules[t];
                if (!e.validate || e.validate()) return t;
              }
              return null;
            }
            destroy() {
              this.removeExitAnchor(),
                this.eventProvider.removeAddedEvents(),
                this.chart.container.removeAttribute("tabindex");
            }
          }
          return (
            (function (i) {
              function s() {
                let e = this;
                h(this, "dismissPopupContent", {}, function () {
                  e.tooltip && e.tooltip.hide(0), e.hideExportMenu();
                });
              }
              function n(t) {
                27 === (t.which || t.keyCode) &&
                  e.charts &&
                  e.charts.forEach((e) => {
                    e && e.dismissPopupContent && e.dismissPopupContent();
                  });
              }
              i.compose = function (e) {
                t.compose(e);
                let i = e.prototype;
                return (
                  i.dismissPopupContent ||
                    ((i.dismissPopupContent = s), a(o, "keydown", n)),
                  e
                );
              };
            })(u || (u = {})),
            u
          );
        }
      ),
      i(
        t,
        "Accessibility/Components/LegendComponent.js",
        [
          t["Core/Animation/AnimationUtilities.js"],
          t["Core/Globals.js"],
          t["Core/Legend/Legend.js"],
          t["Core/Utilities.js"],
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
        ],
        function (e, t, i, s, n, o, r, a) {
          let { animObject: l } = e,
            { doc: h } = t,
            {
              addEvent: c,
              fireEvent: d,
              isNumber: u,
              pick: p,
              syncTimeout: g,
            } = s,
            { getChartTitle: m } = r,
            { stripHTMLTagsFromString: b, addClass: y, removeClass: f } = a;
          function x(e) {
            let t = e.legend && e.legend.allItems,
              i = e.options.legend.accessibility || {},
              s =
                e.colorAxis &&
                e.colorAxis.some(
                  (e) => !e.dataClasses || !e.dataClasses.length
                );
            return !!(t && t.length && !s && !1 !== i.enabled);
          }
          function v(e, t) {
            let i = t.legendItem || {};
            for (let s of (t.setState(e ? "hover" : "", !0),
            ["group", "label", "symbol"])) {
              let t = i[s],
                n = (t && t.element) || t;
              n && d(n, e ? "mouseover" : "mouseout");
            }
          }
          class A extends n {
            constructor() {
              super(...arguments),
                (this.highlightedLegendItemIx = NaN),
                (this.proxyGroup = null);
            }
            init() {
              let e = this;
              this.recreateProxies(),
                this.addEvent(i, "afterScroll", function () {
                  this.chart === e.chart &&
                    (e.proxyProvider.updateGroupProxyElementPositions("legend"),
                    e.updateLegendItemProxyVisibility(),
                    e.highlightedLegendItemIx > -1 &&
                      this.chart.highlightLegendItem(
                        e.highlightedLegendItemIx
                      ));
                }),
                this.addEvent(i, "afterPositionItem", function (t) {
                  this.chart === e.chart &&
                    this.chart.renderer &&
                    e.updateProxyPositionForItem(t.item);
                }),
                this.addEvent(i, "afterRender", function () {
                  this.chart === e.chart &&
                    this.chart.renderer &&
                    e.recreateProxies() &&
                    g(
                      () =>
                        e.proxyProvider.updateGroupProxyElementPositions(
                          "legend"
                        ),
                      l(p(this.chart.renderer.globalAnimation, !0)).duration
                    );
                });
            }
            updateLegendItemProxyVisibility() {
              let e;
              let t = this.chart,
                i = t.legend,
                s = i.allItems || [],
                n = i.currentPage || 1,
                o = i.clipHeight || 0;
              s.forEach((s) => {
                if (s.a11yProxyElement) {
                  let r = i.pages && i.pages.length,
                    a = s.a11yProxyElement.element,
                    l = !1;
                  if (((e = s.legendItem || {}), r)) {
                    let t = e.pageIx || 0;
                    l =
                      (e.y || 0) +
                        (e.label ? Math.round(e.label.getBBox().height) : 0) -
                        i.pages[t] >
                        o || t !== n - 1;
                  }
                  l
                    ? t.styledMode
                      ? y(a, "highcharts-a11y-invisible")
                      : (a.style.visibility = "hidden")
                    : (f(a, "highcharts-a11y-invisible"),
                      (a.style.visibility = ""));
                }
              });
            }
            onChartRender() {
              x(this.chart) || this.removeProxies();
            }
            highlightAdjacentLegendPage(e) {
              let t = this.chart,
                i = t.legend,
                s = (i.currentPage || 1) + e,
                n = i.pages || [];
              if (s > 0 && s <= n.length) {
                let e = 0;
                for (let n of i.allItems)
                  ((n.legendItem || {}).pageIx || 0) + 1 === s &&
                    t.highlightLegendItem(e) &&
                    (this.highlightedLegendItemIx = e),
                    ++e;
              }
            }
            updateProxyPositionForItem(e) {
              e.a11yProxyElement && e.a11yProxyElement.refreshPosition();
            }
            recreateProxies() {
              let e = h.activeElement,
                t = this.proxyGroup,
                i = e && t && t.contains(e);
              return (
                this.removeProxies(),
                !!x(this.chart) &&
                  (this.addLegendProxyGroup(),
                  this.proxyLegendItems(),
                  this.updateLegendItemProxyVisibility(),
                  this.updateLegendTitle(),
                  i &&
                    this.chart.highlightLegendItem(
                      this.highlightedLegendItemIx
                    ),
                  !0)
              );
            }
            removeProxies() {
              this.proxyProvider.removeGroup("legend");
            }
            updateLegendTitle() {
              let e = this.chart,
                t = b(
                  (
                    (e.legend &&
                      e.legend.options.title &&
                      e.legend.options.title.text) ||
                    ""
                  ).replace(/<br ?\/?>/g, " "),
                  e.renderer.forExport
                ),
                i = e.langFormat(
                  "accessibility.legend.legendLabel" + (t ? "" : "NoTitle"),
                  { chart: e, legendTitle: t, chartTitle: m(e) }
                );
              this.proxyProvider.updateGroupAttrs("legend", {
                "aria-label": i,
              });
            }
            addLegendProxyGroup() {
              let e =
                "all" === this.chart.options.accessibility.landmarkVerbosity
                  ? "region"
                  : null;
              this.proxyGroup = this.proxyProvider.addGroup("legend", "ul", {
                "aria-label": "_placeholder_",
                role: e,
              });
            }
            proxyLegendItems() {
              let e;
              let t = this;
              ((this.chart.legend || {}).allItems || []).forEach((i) => {
                (e = i.legendItem || {}).label &&
                  e.label.element &&
                  t.proxyLegendItem(i);
              });
            }
            proxyLegendItem(e) {
              let t = e.legendItem || {};
              if (!t.label || !t.group) return;
              let i = this.chart.langFormat("accessibility.legend.legendItem", {
                  chart: this.chart,
                  itemName: b(e.name, this.chart.renderer.forExport),
                  item: e,
                }),
                s = {
                  tabindex: -1,
                  "aria-pressed": e.visible,
                  "aria-label": i,
                },
                n = t.group.div ? t.label : t.group;
              e.a11yProxyElement = this.proxyProvider.addProxyElement(
                "legend",
                { click: t.label, visual: n.element },
                "button",
                s
              );
            }
            getKeyboardNavigation() {
              let e = this.keyCodes,
                t = this,
                i = this.chart;
              return new o(i, {
                keyCodeMap: [
                  [
                    [e.left, e.right, e.up, e.down],
                    function (e) {
                      return t.onKbdArrowKey(this, e);
                    },
                  ],
                  [
                    [e.enter, e.space],
                    function () {
                      return t.onKbdClick(this);
                    },
                  ],
                  [
                    [e.pageDown, e.pageUp],
                    function (i) {
                      let s = i === e.pageDown ? 1 : -1;
                      return (
                        t.highlightAdjacentLegendPage(s), this.response.success
                      );
                    },
                  ],
                ],
                validate: function () {
                  return t.shouldHaveLegendNavigation();
                },
                init: function () {
                  i.highlightLegendItem(0), (t.highlightedLegendItemIx = 0);
                },
                terminate: function () {
                  (t.highlightedLegendItemIx = -1),
                    i.legend.allItems.forEach((e) => v(!1, e));
                },
              });
            }
            onKbdArrowKey(e, t) {
              let {
                  keyCodes: { left: i, up: s },
                  highlightedLegendItemIx: n,
                  chart: o,
                } = this,
                r = o.legend.allItems.length,
                a = o.options.accessibility.keyboardNavigation.wrapAround,
                l = t === i || t === s ? -1 : 1;
              return (
                o.highlightLegendItem(n + l)
                  ? (this.highlightedLegendItemIx += l)
                  : a &&
                    r > 1 &&
                    ((this.highlightedLegendItemIx = l > 0 ? 0 : r - 1),
                    o.highlightLegendItem(this.highlightedLegendItemIx)),
                e.response.success
              );
            }
            onKbdClick(e) {
              let t = this.chart.legend.allItems[this.highlightedLegendItemIx];
              return (
                t && t.a11yProxyElement && t.a11yProxyElement.click(),
                e.response.success
              );
            }
            shouldHaveLegendNavigation() {
              if (!x(this.chart)) return !1;
              let e = this.chart,
                t = (e.options.legend || {}).accessibility || {};
              return !!(
                e.legend.display &&
                t.keyboardNavigation &&
                t.keyboardNavigation.enabled
              );
            }
            destroy() {
              this.removeProxies();
            }
          }
          return (
            (function (e) {
              function t(e) {
                let t = this.legend.allItems,
                  i =
                    this.accessibility &&
                    this.accessibility.components.legend
                      .highlightedLegendItemIx,
                  s = t[e],
                  n = s?.legendItem || {};
                if (s) {
                  u(i) && t[i] && v(!1, t[i]),
                    (function (e, t) {
                      let i = (e.allItems[t].legendItem || {}).pageIx,
                        s = e.currentPage;
                      void 0 !== i && i + 1 !== s && e.scroll(1 + i - s);
                    })(this.legend, e);
                  let o = n.label,
                    r = s.a11yProxyElement && s.a11yProxyElement.innerElement;
                  return (
                    o && o.element && r && this.setFocusToElement(o, r),
                    v(!0, s),
                    !0
                  );
                }
                return !1;
              }
              function i(e) {
                let t = this.chart.options.accessibility,
                  i = e.item;
                t.enabled &&
                  i &&
                  i.a11yProxyElement &&
                  i.a11yProxyElement.innerElement.setAttribute(
                    "aria-pressed",
                    e.visible ? "true" : "false"
                  );
              }
              e.compose = function (e, s) {
                let n = e.prototype;
                n.highlightLegendItem ||
                  ((n.highlightLegendItem = t), c(s, "afterColorizeItem", i));
              };
            })(A || (A = {})),
            A
          );
        }
      ),
      i(
        t,
        "Stock/Navigator/ChartNavigatorComposition.js",
        [t["Core/Globals.js"], t["Core/Utilities.js"]],
        function (e, t) {
          let i;
          let { isTouchDevice: s } = e,
            { addEvent: n, merge: o, pick: r } = t,
            a = [];
          function l() {
            this.navigator && this.navigator.setBaseSeries(null, !1);
          }
          function h() {
            let e, t, i;
            let s = this.legend,
              n = this.navigator;
            if (n) {
              (e = s && s.options), (t = n.xAxis), (i = n.yAxis);
              let { scrollbarHeight: o, scrollButtonSize: a } = n;
              this.inverted
                ? ((n.left = n.opposite
                    ? this.chartWidth - o - n.height
                    : this.spacing[3] + o),
                  (n.top = this.plotTop + a))
                : ((n.left = r(t.left, this.plotLeft + a)),
                  (n.top =
                    n.navigatorOptions.top ||
                    this.chartHeight -
                      n.height -
                      o -
                      (this.scrollbar?.options.margin || 0) -
                      this.spacing[2] -
                      (this.rangeSelector && this.extraBottomMargin
                        ? this.rangeSelector.getHeight()
                        : 0) -
                      (e &&
                      "bottom" === e.verticalAlign &&
                      "proximate" !== e.layout &&
                      e.enabled &&
                      !e.floating
                        ? s.legendHeight + r(e.margin, 10)
                        : 0) -
                      (this.titleOffset ? this.titleOffset[2] : 0))),
                t &&
                  i &&
                  (this.inverted
                    ? (t.options.left = i.options.left = n.left)
                    : (t.options.top = i.options.top = n.top),
                  t.setAxisSize(),
                  i.setAxisSize());
            }
          }
          function c(e) {
            !this.navigator &&
              !this.scroller &&
              (this.options.navigator.enabled ||
                this.options.scrollbar.enabled) &&
              ((this.scroller = this.navigator = new i(this)),
              r(e.redraw, !0) && this.redraw(e.animation));
          }
          function d() {
            let e = this.options;
            (e.navigator.enabled || e.scrollbar.enabled) &&
              (this.scroller = this.navigator = new i(this));
          }
          function u() {
            let e = this.options,
              t = e.navigator,
              i = e.rangeSelector;
            if (
              ((t && t.enabled) || (i && i.enabled)) &&
              ((!s && "x" === this.zooming.type) ||
                (s && "x" === this.zooming.pinchType))
            )
              return !1;
          }
          function p(e) {
            let t = e.navigator;
            if (t && e.xAxis[0]) {
              let i = e.xAxis[0].getExtremes();
              t.render(i.min, i.max);
            }
          }
          function g(e) {
            let t = e.options.navigator || {},
              i = e.options.scrollbar || {};
            !this.navigator &&
              !this.scroller &&
              (t.enabled || i.enabled) &&
              (o(!0, this.options.navigator, t),
              o(!0, this.options.scrollbar, i),
              delete e.options.navigator,
              delete e.options.scrollbar);
          }
          return {
            compose: function (e, s) {
              if (t.pushUnique(a, e)) {
                let t = e.prototype;
                (i = s),
                  t.callbacks.push(p),
                  n(e, "afterAddSeries", l),
                  n(e, "afterSetChartSize", h),
                  n(e, "afterUpdate", c),
                  n(e, "beforeRender", d),
                  n(e, "beforeShowResetZoom", u),
                  n(e, "update", g);
              }
            },
          };
        }
      ),
      i(
        t,
        "Core/Axis/NavigatorAxisComposition.js",
        [t["Core/Globals.js"], t["Core/Utilities.js"]],
        function (e, t) {
          let { isTouchDevice: i } = e,
            {
              addEvent: s,
              correctFloat: n,
              defined: o,
              isNumber: r,
              pick: a,
            } = t;
          function l() {
            this.navigatorAxis || (this.navigatorAxis = new c(this));
          }
          function h(e) {
            let t;
            let s = this.chart,
              n = s.options,
              r = n.navigator,
              a = this.navigatorAxis,
              l = s.zooming.pinchType,
              h = n.rangeSelector,
              c = s.zooming.type;
            if (this.isXAxis && (r?.enabled || h?.enabled)) {
              if ("y" === c && "zoom" === e.trigger) t = !1;
              else if (
                (("zoom" === e.trigger && "xy" === c) || (i && "xy" === l)) &&
                this.options.range
              ) {
                let t = a.previousZoom;
                o(e.min)
                  ? (a.previousZoom = [this.min, this.max])
                  : t &&
                    ((e.min = t[0]), (e.max = t[1]), (a.previousZoom = void 0));
              }
            }
            void 0 !== t && e.preventDefault();
          }
          class c {
            static compose(e) {
              e.keepProps.includes("navigatorAxis") ||
                (e.keepProps.push("navigatorAxis"),
                s(e, "init", l),
                s(e, "setExtremes", h));
            }
            constructor(e) {
              this.axis = e;
            }
            destroy() {
              this.axis = void 0;
            }
            toFixedRange(e, t, i, s) {
              let l = this.axis,
                h = (l.pointRange || 0) / 2,
                c = a(i, l.translate(e, !0, !l.horiz)),
                d = a(s, l.translate(t, !0, !l.horiz));
              return (
                o(i) || (c = n(c + h)),
                o(s) || (d = n(d - h)),
                (r(c) && r(d)) || (c = d = void 0),
                { min: c, max: d }
              );
            }
          }
          return c;
        }
      ),
      i(
        t,
        "Stock/Navigator/NavigatorDefaults.js",
        [t["Core/Color/Color.js"], t["Core/Series/SeriesRegistry.js"]],
        function (e, t) {
          let { parse: i } = e,
            { seriesTypes: s } = t;
          return {
            height: 40,
            margin: 25,
            maskInside: !0,
            handles: {
              width: 7,
              borderRadius: 0,
              height: 15,
              symbols: ["navigator-handle", "navigator-handle"],
              enabled: !0,
              lineWidth: 1,
              backgroundColor: "#f2f2f2",
              borderColor: "#999999",
            },
            maskFill: i("#667aff").setOpacity(0.3).get(),
            outlineColor: "#999999",
            outlineWidth: 1,
            series: {
              type: void 0 === s.areaspline ? "line" : "areaspline",
              fillOpacity: 0.05,
              lineWidth: 1,
              compare: null,
              sonification: { enabled: !1 },
              dataGrouping: {
                approximation: "average",
                enabled: !0,
                groupPixelWidth: 2,
                firstAnchor: "firstPoint",
                anchor: "middle",
                lastAnchor: "lastPoint",
                units: [
                  ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                  ["second", [1, 2, 5, 10, 15, 30]],
                  ["minute", [1, 2, 5, 10, 15, 30]],
                  ["hour", [1, 2, 3, 4, 6, 8, 12]],
                  ["day", [1, 2, 3, 4]],
                  ["week", [1, 2, 3]],
                  ["month", [1, 3, 6]],
                  ["year", null],
                ],
              },
              dataLabels: { enabled: !1, zIndex: 2 },
              id: "highcharts-navigator-series",
              className: "highcharts-navigator-series",
              lineColor: null,
              marker: { enabled: !1 },
              threshold: null,
            },
            xAxis: {
              className: "highcharts-navigator-xaxis",
              tickLength: 0,
              lineWidth: 0,
              gridLineColor: "#e6e6e6",
              id: "navigator-x-axis",
              gridLineWidth: 1,
              tickPixelInterval: 200,
              labels: {
                align: "left",
                style: {
                  color: "#000000",
                  fontSize: "0.7em",
                  opacity: 0.6,
                  textOutline: "2px contrast",
                },
                x: 3,
                y: -4,
              },
              crosshair: !1,
            },
            yAxis: {
              className: "highcharts-navigator-yaxis",
              gridLineWidth: 0,
              startOnTick: !1,
              endOnTick: !1,
              minPadding: 0.1,
              id: "navigator-y-axis",
              maxPadding: 0.1,
              labels: { enabled: !1 },
              crosshair: !1,
              title: { text: null },
              tickLength: 0,
              tickWidth: 0,
            },
          };
        }
      ),
      i(
        t,
        "Stock/Navigator/NavigatorSymbols.js",
        [t["Core/Renderer/SVG/Symbols.js"], t["Core/Utilities.js"]],
        function (e, t) {
          let { relativeLength: i } = t;
          return {
            "navigator-handle": function (t, s, n, o, r = {}) {
              let a = r.width ? r.width / 2 : n,
                l = i(r.borderRadius || 0, Math.min(2 * a, o));
              return [
                ["M", -1.5, (o = r.height || o) / 2 - 3.5],
                ["L", -1.5, o / 2 + 4.5],
                ["M", 0.5, o / 2 - 3.5],
                ["L", 0.5, o / 2 + 4.5],
                ...e.rect(-a - 1, 0.5, 2 * a + 1, o, { r: l }),
              ];
            },
          };
        }
      ),
      i(
        t,
        "Stock/Utilities/StockUtilities.js",
        [t["Core/Utilities.js"]],
        function (e) {
          let { defined: t } = e;
          return {
            setFixedRange: function (e) {
              let i = this.xAxis[0];
              t(i.dataMax) && t(i.dataMin) && e
                ? (this.fixedRange = Math.min(e, i.dataMax - i.dataMin))
                : (this.fixedRange = e);
            },
          };
        }
      ),
      i(
        t,
        "Stock/Navigator/NavigatorComposition.js",
        [
          t["Core/Defaults.js"],
          t["Core/Globals.js"],
          t["Core/Axis/NavigatorAxisComposition.js"],
          t["Stock/Navigator/NavigatorDefaults.js"],
          t["Stock/Navigator/NavigatorSymbols.js"],
          t["Core/Renderer/RendererRegistry.js"],
          t["Stock/Utilities/StockUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n, o, r, a) {
          let { setOptions: l } = e,
            { composed: h } = t,
            { getRendererType: c } = o,
            { setFixedRange: d } = r,
            { addEvent: u, extend: p, pushUnique: g } = a;
          function m() {
            this.chart.navigator &&
              !this.options.isInternal &&
              this.chart.navigator.setBaseSeries(null, !1);
          }
          return {
            compose: function (e, t, o) {
              i.compose(t),
                g(h, "Navigator") &&
                  ((e.prototype.setFixedRange = d),
                  p(c().prototype.symbols, n),
                  u(o, "afterUpdate", m),
                  l({ navigator: s }));
            },
          };
        }
      ),
      i(
        t,
        "Core/Axis/ScrollbarAxis.js",
        [t["Core/Globals.js"], t["Core/Utilities.js"]],
        function (e, t) {
          var i;
          let { composed: s } = e,
            { addEvent: n, defined: o, pick: r, pushUnique: a } = t;
          return (
            (function (e) {
              let t;
              function i(e) {
                let t = r(e.options && e.options.min, e.min),
                  i = r(e.options && e.options.max, e.max);
                return {
                  axisMin: t,
                  axisMax: i,
                  scrollMin: o(e.dataMin)
                    ? Math.min(t, e.min, e.dataMin, r(e.threshold, 1 / 0))
                    : t,
                  scrollMax: o(e.dataMax)
                    ? Math.max(i, e.max, e.dataMax, r(e.threshold, -1 / 0))
                    : i,
                };
              }
              function l() {
                let e = this.scrollbar,
                  t = e && !e.options.opposite,
                  i = this.horiz ? 2 : t ? 3 : 1;
                e &&
                  ((this.chart.scrollbarsOffsets = [0, 0]),
                  (this.chart.axisOffset[i] +=
                    e.size + (e.options.margin || 0)));
              }
              function h() {
                let e = this;
                e.options &&
                  e.options.scrollbar &&
                  e.options.scrollbar.enabled &&
                  ((e.options.scrollbar.vertical = !e.horiz),
                  (e.options.startOnTick = e.options.endOnTick = !1),
                  (e.scrollbar = new t(
                    e.chart.renderer,
                    e.options.scrollbar,
                    e.chart
                  )),
                  n(e.scrollbar, "changed", function (t) {
                    let s, n;
                    let {
                        axisMin: r,
                        axisMax: a,
                        scrollMin: l,
                        scrollMax: h,
                      } = i(e),
                      c = h - l;
                    if (o(r) && o(a)) {
                      if (
                        ((e.horiz && !e.reversed) || (!e.horiz && e.reversed)
                          ? ((s = l + c * this.to), (n = l + c * this.from))
                          : ((s = l + c * (1 - this.from)),
                            (n = l + c * (1 - this.to))),
                        this.shouldUpdateExtremes(t.DOMType))
                      ) {
                        let i =
                          "mousemove" !== t.DOMType &&
                          "touchmove" !== t.DOMType &&
                          void 0;
                        e.setExtremes(n, s, !0, i, t);
                      } else this.setRange(this.from, this.to);
                    }
                  }));
              }
              function c() {
                let e, t, s;
                let { scrollMin: n, scrollMax: r } = i(this),
                  a = this.scrollbar,
                  l = this.axisTitleMargin + (this.titleOffset || 0),
                  h = this.chart.scrollbarsOffsets,
                  c = this.options.margin || 0;
                if (a && h) {
                  if (this.horiz)
                    this.opposite || (h[1] += l),
                      a.position(
                        this.left,
                        this.top +
                          this.height +
                          2 +
                          h[1] -
                          (this.opposite ? c : 0),
                        this.width,
                        this.height
                      ),
                      this.opposite || (h[1] += c),
                      (e = 1);
                  else {
                    let t;
                    this.opposite && (h[0] += l),
                      (t = a.options.opposite
                        ? this.left +
                          this.width +
                          2 +
                          h[0] -
                          (this.opposite ? 0 : c)
                        : this.opposite
                        ? 0
                        : c),
                      a.position(t, this.top, this.width, this.height),
                      this.opposite && (h[0] += c),
                      (e = 0);
                  }
                  (h[e] += a.size + (a.options.margin || 0)),
                    isNaN(n) ||
                    isNaN(r) ||
                    !o(this.min) ||
                    !o(this.max) ||
                    this.min === this.max
                      ? a.setRange(0, 1)
                      : ((t = (this.min - n) / (r - n)),
                        (s = (this.max - n) / (r - n)),
                        (this.horiz && !this.reversed) ||
                        (!this.horiz && this.reversed)
                          ? a.setRange(t, s)
                          : a.setRange(1 - s, 1 - t));
                }
              }
              e.compose = function (e, i) {
                a(s, "Axis.Scrollbar") &&
                  ((t = i),
                  n(e, "afterGetOffset", l),
                  n(e, "afterInit", h),
                  n(e, "afterRender", c));
              };
            })(i || (i = {})),
            i
          );
        }
      ),
      i(t, "Stock/Scrollbar/ScrollbarDefaults.js", [], function () {
        return {
          height: 10,
          barBorderRadius: 5,
          buttonBorderRadius: 0,
          buttonsEnabled: !1,
          liveRedraw: void 0,
          margin: void 0,
          minWidth: 6,
          opposite: !0,
          step: 0.2,
          zIndex: 3,
          barBackgroundColor: "#cccccc",
          barBorderWidth: 0,
          barBorderColor: "#cccccc",
          buttonArrowColor: "#333333",
          buttonBackgroundColor: "#e6e6e6",
          buttonBorderColor: "#cccccc",
          buttonBorderWidth: 1,
          rifleColor: "none",
          trackBackgroundColor: "rgba(255, 255, 255, 0.001)",
          trackBorderColor: "#cccccc",
          trackBorderRadius: 5,
          trackBorderWidth: 1,
        };
      }),
      i(
        t,
        "Stock/Scrollbar/Scrollbar.js",
        [
          t["Core/Defaults.js"],
          t["Core/Globals.js"],
          t["Core/Axis/ScrollbarAxis.js"],
          t["Stock/Scrollbar/ScrollbarDefaults.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { defaultOptions: o } = e,
            {
              addEvent: r,
              correctFloat: a,
              crisp: l,
              defined: h,
              destroyObjectProperties: c,
              fireEvent: d,
              merge: u,
              pick: p,
              removeEvent: g,
            } = n;
          class m {
            static compose(e) {
              i.compose(e, m);
            }
            static swapXY(e, t) {
              return (
                t &&
                  e.forEach((e) => {
                    let t;
                    let i = e.length;
                    for (let s = 0; s < i; s += 2)
                      "number" == typeof (t = e[s + 1]) &&
                        ((e[s + 1] = e[s + 2]), (e[s + 2] = t));
                  }),
                e
              );
            }
            constructor(e, t, i) {
              (this._events = []),
                (this.chartX = 0),
                (this.chartY = 0),
                (this.from = 0),
                (this.scrollbarButtons = []),
                (this.scrollbarLeft = 0),
                (this.scrollbarStrokeWidth = 1),
                (this.scrollbarTop = 0),
                (this.size = 0),
                (this.to = 0),
                (this.trackBorderWidth = 1),
                (this.x = 0),
                (this.y = 0),
                this.init(e, t, i);
            }
            addEvents() {
              let e = this.options.inverted ? [1, 0] : [0, 1],
                t = this.scrollbarButtons,
                i = this.scrollbarGroup.element,
                s = this.track.element,
                n = this.mouseDownHandler.bind(this),
                o = this.mouseMoveHandler.bind(this),
                a = this.mouseUpHandler.bind(this),
                l = [
                  [t[e[0]].element, "click", this.buttonToMinClick.bind(this)],
                  [t[e[1]].element, "click", this.buttonToMaxClick.bind(this)],
                  [s, "click", this.trackClick.bind(this)],
                  [i, "mousedown", n],
                  [i.ownerDocument, "mousemove", o],
                  [i.ownerDocument, "mouseup", a],
                  [i, "touchstart", n],
                  [i.ownerDocument, "touchmove", o],
                  [i.ownerDocument, "touchend", a],
                ];
              l.forEach(function (e) {
                r.apply(null, e);
              }),
                (this._events = l);
            }
            buttonToMaxClick(e) {
              let t = (this.to - this.from) * p(this.options.step, 0.2);
              this.updatePosition(this.from + t, this.to + t),
                d(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: e,
                });
            }
            buttonToMinClick(e) {
              let t = a(this.to - this.from) * p(this.options.step, 0.2);
              this.updatePosition(a(this.from - t), a(this.to - t)),
                d(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: e,
                });
            }
            cursorToScrollbarPosition(e) {
              let t = this.options,
                i = t.minWidth > this.calculatedWidth ? t.minWidth : 0;
              return {
                chartX:
                  (e.chartX - this.x - this.xOffset) / (this.barWidth - i),
                chartY:
                  (e.chartY - this.y - this.yOffset) / (this.barWidth - i),
              };
            }
            destroy() {
              let e = this,
                t = e.chart.scroller;
              e.removeEvents(),
                [
                  "track",
                  "scrollbarRifles",
                  "scrollbar",
                  "scrollbarGroup",
                  "group",
                ].forEach(function (t) {
                  e[t] && e[t].destroy && (e[t] = e[t].destroy());
                }),
                t &&
                  e === t.scrollbar &&
                  ((t.scrollbar = null), c(t.scrollbarButtons));
            }
            drawScrollbarButton(e) {
              let t = this.renderer,
                i = this.scrollbarButtons,
                s = this.options,
                n = this.size,
                o = t.g().add(this.group);
              if ((i.push(o), s.buttonsEnabled)) {
                let r = t.rect().addClass("highcharts-scrollbar-button").add(o);
                this.chart.styledMode ||
                  r.attr({
                    stroke: s.buttonBorderColor,
                    "stroke-width": s.buttonBorderWidth,
                    fill: s.buttonBackgroundColor,
                  }),
                  r.attr(
                    r.crisp(
                      {
                        x: -0.5,
                        y: -0.5,
                        width: n,
                        height: n,
                        r: s.buttonBorderRadius,
                      },
                      r.strokeWidth()
                    )
                  );
                let a = t
                  .path(
                    m.swapXY(
                      [
                        ["M", n / 2 + (e ? -1 : 1), n / 2 - 3],
                        ["L", n / 2 + (e ? -1 : 1), n / 2 + 3],
                        ["L", n / 2 + (e ? 2 : -2), n / 2],
                      ],
                      s.vertical
                    )
                  )
                  .addClass("highcharts-scrollbar-arrow")
                  .add(i[e]);
                this.chart.styledMode || a.attr({ fill: s.buttonArrowColor });
              }
            }
            init(e, t, i) {
              (this.scrollbarButtons = []),
                (this.renderer = e),
                (this.userOptions = t),
                (this.options = u(s, o.scrollbar, t)),
                (this.options.margin = p(this.options.margin, 10)),
                (this.chart = i),
                (this.size = p(this.options.size, this.options.height)),
                t.enabled && (this.render(), this.addEvents());
            }
            mouseDownHandler(e) {
              let t = this.chart.pointer?.normalize(e) || e,
                i = this.cursorToScrollbarPosition(t);
              (this.chartX = i.chartX),
                (this.chartY = i.chartY),
                (this.initPositions = [this.from, this.to]),
                (this.grabbedCenter = !0);
            }
            mouseMoveHandler(e) {
              let t;
              let i = this.chart.pointer?.normalize(e) || e,
                s = this.options.vertical ? "chartY" : "chartX",
                n = this.initPositions || [];
              this.grabbedCenter &&
                (!e.touches || 0 !== e.touches[0][s]) &&
                ((t = this.cursorToScrollbarPosition(i)[s] - this[s]),
                (this.hasDragged = !0),
                this.updatePosition(n[0] + t, n[1] + t),
                this.hasDragged &&
                  d(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: e.type,
                    DOMEvent: e,
                  }));
            }
            mouseUpHandler(e) {
              this.hasDragged &&
                d(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMType: e.type,
                  DOMEvent: e,
                }),
                (this.grabbedCenter =
                  this.hasDragged =
                  this.chartX =
                  this.chartY =
                    null);
            }
            position(e, t, i, s) {
              let {
                  buttonsEnabled: n,
                  margin: o = 0,
                  vertical: r,
                } = this.options,
                a = this.rendered ? "animate" : "attr",
                l = s,
                h = 0;
              this.group.show(),
                (this.x = e),
                (this.y = t + this.trackBorderWidth),
                (this.width = i),
                (this.height = s),
                (this.xOffset = l),
                (this.yOffset = h),
                r
                  ? ((this.width = this.yOffset = i = h = this.size),
                    (this.xOffset = l = 0),
                    (this.yOffset = h = n ? this.size : 0),
                    (this.barWidth = s - (n ? 2 * i : 0)),
                    (this.x = e += o))
                  : ((this.height = s = this.size),
                    (this.xOffset = l = n ? this.size : 0),
                    (this.barWidth = i - (n ? 2 * s : 0)),
                    (this.y = this.y + o)),
                this.group[a]({ translateX: e, translateY: this.y }),
                this.track[a]({ width: i, height: s }),
                this.scrollbarButtons[1][a]({
                  translateX: r ? 0 : i - l,
                  translateY: r ? s - h : 0,
                });
            }
            removeEvents() {
              this._events.forEach(function (e) {
                g.apply(null, e);
              }),
                (this._events.length = 0);
            }
            render() {
              let e = this.renderer,
                t = this.options,
                i = this.size,
                s = this.chart.styledMode,
                n = e.g("scrollbar").attr({ zIndex: t.zIndex }).hide().add();
              (this.group = n),
                (this.track = e
                  .rect()
                  .addClass("highcharts-scrollbar-track")
                  .attr({ r: t.trackBorderRadius || 0, height: i, width: i })
                  .add(n)),
                s ||
                  this.track.attr({
                    fill: t.trackBackgroundColor,
                    stroke: t.trackBorderColor,
                    "stroke-width": t.trackBorderWidth,
                  });
              let o = (this.trackBorderWidth = this.track.strokeWidth());
              this.track.attr({ x: -l(0, o), y: -l(0, o) }),
                (this.scrollbarGroup = e.g().add(n)),
                (this.scrollbar = e
                  .rect()
                  .addClass("highcharts-scrollbar-thumb")
                  .attr({
                    height: i - o,
                    width: i - o,
                    r: t.barBorderRadius || 0,
                  })
                  .add(this.scrollbarGroup)),
                (this.scrollbarRifles = e
                  .path(
                    m.swapXY(
                      [
                        ["M", -3, i / 4],
                        ["L", -3, (2 * i) / 3],
                        ["M", 0, i / 4],
                        ["L", 0, (2 * i) / 3],
                        ["M", 3, i / 4],
                        ["L", 3, (2 * i) / 3],
                      ],
                      t.vertical
                    )
                  )
                  .addClass("highcharts-scrollbar-rifles")
                  .add(this.scrollbarGroup)),
                s ||
                  (this.scrollbar.attr({
                    fill: t.barBackgroundColor,
                    stroke: t.barBorderColor,
                    "stroke-width": t.barBorderWidth,
                  }),
                  this.scrollbarRifles.attr({
                    stroke: t.rifleColor,
                    "stroke-width": 1,
                  })),
                (this.scrollbarStrokeWidth = this.scrollbar.strokeWidth()),
                this.scrollbarGroup.translate(
                  -l(0, this.scrollbarStrokeWidth),
                  -l(0, this.scrollbarStrokeWidth)
                ),
                this.drawScrollbarButton(0),
                this.drawScrollbarButton(1);
            }
            setRange(e, t) {
              let i, s;
              let n = this.options,
                o = n.vertical,
                r = n.minWidth,
                l = this.barWidth,
                c =
                  !this.rendered ||
                  this.hasDragged ||
                  (this.chart.navigator && this.chart.navigator.hasDragged)
                    ? "attr"
                    : "animate";
              if (!h(l)) return;
              let d = l * Math.min(t, 1);
              (i = Math.ceil(l * (e = Math.max(e, 0)))),
                (this.calculatedWidth = s = a(d - i)),
                s < r && ((i = (l - r + s) * e), (s = r));
              let u = Math.floor(i + this.xOffset + this.yOffset),
                p = s / 2 - 0.5;
              (this.from = e),
                (this.to = t),
                o
                  ? (this.scrollbarGroup[c]({ translateY: u }),
                    this.scrollbar[c]({ height: s }),
                    this.scrollbarRifles[c]({ translateY: p }),
                    (this.scrollbarTop = u),
                    (this.scrollbarLeft = 0))
                  : (this.scrollbarGroup[c]({ translateX: u }),
                    this.scrollbar[c]({ width: s }),
                    this.scrollbarRifles[c]({ translateX: p }),
                    (this.scrollbarLeft = u),
                    (this.scrollbarTop = 0)),
                s <= 12
                  ? this.scrollbarRifles.hide()
                  : this.scrollbarRifles.show(),
                !1 === n.showFull &&
                  (e <= 0 && t >= 1 ? this.group.hide() : this.group.show()),
                (this.rendered = !0);
            }
            shouldUpdateExtremes(e) {
              return (
                p(
                  this.options.liveRedraw,
                  t.svg && !t.isTouchDevice && !this.chart.boosted
                ) ||
                "mouseup" === e ||
                "touchend" === e ||
                !h(e)
              );
            }
            trackClick(e) {
              let t = this.chart.pointer?.normalize(e) || e,
                i = this.to - this.from,
                s = this.y + this.scrollbarTop,
                n = this.x + this.scrollbarLeft;
              (this.options.vertical && t.chartY > s) ||
              (!this.options.vertical && t.chartX > n)
                ? this.updatePosition(this.from + i, this.to + i)
                : this.updatePosition(this.from - i, this.to - i),
                d(this, "changed", {
                  from: this.from,
                  to: this.to,
                  trigger: "scrollbar",
                  DOMEvent: e,
                });
            }
            update(e) {
              this.destroy(),
                this.init(
                  this.chart.renderer,
                  u(!0, this.options, e),
                  this.chart
                );
            }
            updatePosition(e, t) {
              t > 1 && ((e = a(1 - a(t - e))), (t = 1)),
                e < 0 && ((t = a(t - e)), (e = 0)),
                (this.from = e),
                (this.to = t);
            }
          }
          return (
            (m.defaultOptions = s),
            (o.scrollbar = u(!0, m.defaultOptions, o.scrollbar)),
            m
          );
        }
      ),
      i(
        t,
        "Stock/Navigator/Navigator.js",
        [
          t["Core/Axis/Axis.js"],
          t["Stock/Navigator/ChartNavigatorComposition.js"],
          t["Core/Defaults.js"],
          t["Core/Globals.js"],
          t["Core/Axis/NavigatorAxisComposition.js"],
          t["Stock/Navigator/NavigatorComposition.js"],
          t["Stock/Scrollbar/Scrollbar.js"],
          t["Core/Renderer/SVG/SVGRenderer.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n, o, r, a, l) {
          let { defaultOptions: h } = i,
            { isTouchDevice: c } = s,
            {
              prototype: { symbols: d },
            } = a,
            {
              addEvent: u,
              clamp: p,
              correctFloat: g,
              defined: m,
              destroyObjectProperties: b,
              erase: y,
              extend: f,
              find: x,
              fireEvent: v,
              isArray: A,
              isNumber: C,
              merge: w,
              pick: E,
              removeEvent: T,
              splat: M,
            } = l;
          function S(e, ...t) {
            let i = [].filter.call(t, C);
            if (i.length) return Math[e].apply(0, i);
          }
          class k {
            static compose(e, i, s) {
              t.compose(e, k), o.compose(e, i, s);
            }
            constructor(e) {
              (this.isDirty = !1), (this.scrollbarHeight = 0), this.init(e);
            }
            drawHandle(e, t, i, s) {
              let n = this.navigatorOptions.handles.height;
              this.handles[t][s](
                i
                  ? {
                      translateX: Math.round(this.left + this.height / 2),
                      translateY: Math.round(
                        this.top + parseInt(e, 10) + 0.5 - n
                      ),
                    }
                  : {
                      translateX: Math.round(this.left + parseInt(e, 10)),
                      translateY: Math.round(
                        this.top + this.height / 2 - n / 2 - 1
                      ),
                    }
              );
            }
            drawOutline(e, t, i, s) {
              let n = this.navigatorOptions.maskInside,
                o = this.outline.strokeWidth(),
                r = o / 2,
                a = (o % 2) / 2,
                l = this.scrollButtonSize,
                h = this.size,
                c = this.top,
                d = this.height,
                u = c - r,
                p = c + d,
                g = this.left,
                m,
                b;
              i
                ? ((m = c + t + a),
                  (t = c + e + a),
                  (b = [
                    ["M", g + d, c - l - a],
                    ["L", g + d, m],
                    ["L", g, m],
                    ["M", g, t],
                    ["L", g + d, t],
                    ["L", g + d, c + h + l],
                  ]),
                  n && b.push(["M", g + d, m - r], ["L", g + d, t + r]))
                : ((g -= l),
                  (e += g + l - a),
                  (t += g + l - a),
                  (b = [
                    ["M", g, u],
                    ["L", e, u],
                    ["L", e, p],
                    ["M", t, p],
                    ["L", t, u],
                    ["L", g + h + 2 * l, u],
                  ]),
                  n && b.push(["M", e - r, u], ["L", t + r, u])),
                this.outline[s]({ d: b });
            }
            drawMasks(e, t, i, s) {
              let n, o, r, a;
              let l = this.left,
                h = this.top,
                c = this.height;
              i
                ? ((r = [l, l, l]),
                  (a = [h, h + e, h + t]),
                  (o = [c, c, c]),
                  (n = [e, t - e, this.size - t]))
                : ((r = [l, l + e, l + t]),
                  (a = [h, h, h]),
                  (o = [e, t - e, this.size - t]),
                  (n = [c, c, c])),
                this.shades.forEach((e, t) => {
                  e[s]({ x: r[t], y: a[t], width: o[t], height: n[t] });
                });
            }
            renderElements() {
              let e = this,
                t = e.navigatorOptions,
                i = t.maskInside,
                s = e.chart,
                n = s.inverted,
                o = s.renderer,
                r = { cursor: n ? "ns-resize" : "ew-resize" },
                a =
                  e.navigatorGroup ??
                  (e.navigatorGroup = o
                    .g("navigator")
                    .attr({ zIndex: 8, visibility: "hidden" })
                    .add());
              if (
                ([!i, i, !i].forEach((i, n) => {
                  let l =
                    e.shades[n] ??
                    (e.shades[n] = o
                      .rect()
                      .addClass(
                        "highcharts-navigator-mask" +
                          (1 === n ? "-inside" : "-outside")
                      )
                      .add(a));
                  s.styledMode ||
                    (l.attr({ fill: i ? t.maskFill : "rgba(0,0,0,0)" }),
                    1 === n && l.css(r));
                }),
                e.outline ||
                  (e.outline = o
                    .path()
                    .addClass("highcharts-navigator-outline")
                    .add(a)),
                s.styledMode ||
                  e.outline.attr({
                    "stroke-width": t.outlineWidth,
                    stroke: t.outlineColor,
                  }),
                t.handles?.enabled)
              ) {
                let i = t.handles,
                  { height: n, width: l } = i;
                [0, 1].forEach((t) => {
                  let h = i.symbols[t];
                  if (e.handles[t]) {
                    if (h !== e.handles[t].symbolName) {
                      let i = d[h].call(d, -l / 2 - 1, 0, l, n);
                      e.handles[t].attr({ d: i }),
                        (e.handles[t].symbolName = h);
                    }
                  } else
                    (e.handles[t] = o.symbol(h, -l / 2 - 1, 0, l, n, i)),
                      e.handles[t]
                        .attr({ zIndex: 7 - t })
                        .addClass(
                          "highcharts-navigator-handle highcharts-navigator-handle-" +
                            ["left", "right"][t]
                        )
                        .add(a);
                  s.inverted &&
                    e.handles[t].attr({
                      rotation: 90,
                      rotationOriginX: Math.floor(-l / 2),
                      rotationOriginY: (n + l) / 2,
                    }),
                    s.styledMode ||
                      e.handles[t]
                        .attr({
                          fill: i.backgroundColor,
                          stroke: i.borderColor,
                          "stroke-width": i.lineWidth,
                          width: i.width,
                          height: i.height,
                          x: -l / 2 - 1,
                          y: 0,
                        })
                        .css(r);
                });
              }
            }
            update(e, t = !1) {
              let i = this.chart,
                s = i.options.chart.inverted !== i.scrollbar?.options.vertical;
              if (
                (w(!0, i.options.navigator, e),
                (this.navigatorOptions = i.options.navigator || {}),
                this.setOpposite(),
                m(e.enabled) || s)
              )
                return (
                  this.destroy(),
                  (this.navigatorEnabled = e.enabled || this.navigatorEnabled),
                  this.init(i)
                );
              if (
                this.navigatorEnabled &&
                ((this.isDirty = !0),
                !1 === e.adaptToUpdatedData &&
                  this.baseSeries.forEach((e) => {
                    T(e, "updatedData", this.updatedDataHandler);
                  }, this),
                e.adaptToUpdatedData &&
                  this.baseSeries.forEach((e) => {
                    e.eventsToUnbind.push(
                      u(e, "updatedData", this.updatedDataHandler)
                    );
                  }, this),
                (e.series || e.baseSeries) && this.setBaseSeries(void 0, !1),
                e.height || e.xAxis || e.yAxis)
              ) {
                this.height = e.height ?? this.height;
                let t = this.getXAxisOffsets();
                this.xAxis.update(
                  {
                    ...e.xAxis,
                    offsets: t,
                    [i.inverted ? "width" : "height"]: this.height,
                    [i.inverted ? "height" : "width"]: void 0,
                  },
                  !1
                ),
                  this.yAxis.update(
                    {
                      ...e.yAxis,
                      [i.inverted ? "width" : "height"]: this.height,
                    },
                    !1
                  );
              }
              t && i.redraw();
            }
            render(e, t, i, s) {
              let n = this.chart,
                o = this.xAxis,
                r = o.pointRange || 0,
                a = o.navigatorAxis.fake ? n.xAxis[0] : o,
                l = this.navigatorEnabled,
                h = this.rendered,
                c = n.inverted,
                d = n.xAxis[0].minRange,
                u = n.xAxis[0].options.maxRange,
                b = this.scrollButtonSize,
                y,
                f,
                x,
                A = this.scrollbarHeight,
                w,
                T;
              if (this.hasDragged && !m(i)) return;
              if (
                (this.isDirty && this.renderElements(),
                (e = g(e - r / 2)),
                (t = g(t + r / 2)),
                !C(e) || !C(t))
              ) {
                if (!h) return;
                (i = 0), (s = E(o.width, a.width));
              }
              this.left = E(o.left, n.plotLeft + b + (c ? n.plotWidth : 0));
              let M =
                (this.size =
                w =
                  E(o.len, (c ? n.plotHeight : n.plotWidth) - 2 * b));
              (y = c ? A : w + 2 * b),
                (i = E(i, o.toPixels(e, !0))),
                (s = E(s, o.toPixels(t, !0))),
                (C(i) && Math.abs(i) !== 1 / 0) || ((i = 0), (s = y));
              let S = o.toValue(i, !0),
                k = o.toValue(s, !0),
                P = Math.abs(g(k - S));
              P < d
                ? this.grabbedLeft
                  ? (i = o.toPixels(k - d - r, !0))
                  : this.grabbedRight && (s = o.toPixels(S + d + r, !0))
                : m(u) &&
                  g(P - r) > u &&
                  (this.grabbedLeft
                    ? (i = o.toPixels(k - u - r, !0))
                    : this.grabbedRight && (s = o.toPixels(S + u + r, !0))),
                (this.zoomedMax = p(Math.max(i, s), 0, M)),
                (this.zoomedMin = p(
                  this.fixedWidth
                    ? this.zoomedMax - this.fixedWidth
                    : Math.min(i, s),
                  0,
                  M
                )),
                (this.range = this.zoomedMax - this.zoomedMin),
                (M = Math.round(this.zoomedMax));
              let D = Math.round(this.zoomedMin);
              l &&
                (this.navigatorGroup.attr({ visibility: "inherit" }),
                (T = h && !this.hasDragged ? "animate" : "attr"),
                this.drawMasks(D, M, c, T),
                this.drawOutline(D, M, c, T),
                this.navigatorOptions.handles.enabled &&
                  (this.drawHandle(D, 0, c, T), this.drawHandle(M, 1, c, T))),
                this.scrollbar &&
                  (c
                    ? ((x = this.top - b),
                      (f =
                        this.left -
                        A +
                        (l || !a.opposite
                          ? 0
                          : (a.titleOffset || 0) + a.axisTitleMargin)),
                      (A = w + 2 * b))
                    : ((x = this.top + (l ? this.height : -A)),
                      (f = this.left - b)),
                  this.scrollbar.position(f, x, y, A),
                  this.scrollbar.setRange(
                    this.zoomedMin / (w || 1),
                    this.zoomedMax / (w || 1)
                  )),
                (this.rendered = !0),
                (this.isDirty = !1),
                v(this, "afterRender");
            }
            addMouseEvents() {
              let e = this,
                t = e.chart,
                i = t.container,
                s = [],
                n,
                o;
              (e.mouseMoveHandler = n =
                function (t) {
                  e.onMouseMove(t);
                }),
                (e.mouseUpHandler = o =
                  function (t) {
                    e.onMouseUp(t);
                  }),
                (s = e.getPartsEvents("mousedown")).push(
                  u(t.renderTo, "mousemove", n),
                  u(i.ownerDocument, "mouseup", o),
                  u(t.renderTo, "touchmove", n),
                  u(i.ownerDocument, "touchend", o)
                ),
                s.concat(e.getPartsEvents("touchstart")),
                (e.eventsToUnbind = s),
                e.series &&
                  e.series[0] &&
                  s.push(
                    u(e.series[0].xAxis, "foundExtremes", function () {
                      t.navigator.modifyNavigatorAxisExtremes();
                    })
                  );
            }
            getPartsEvents(e) {
              let t = this,
                i = [];
              return (
                ["shades", "handles"].forEach(function (s) {
                  t[s].forEach(function (n, o) {
                    i.push(
                      u(n.element, e, function (e) {
                        t[s + "Mousedown"](e, o);
                      })
                    );
                  });
                }),
                i
              );
            }
            shadesMousedown(e, t) {
              e = this.chart.pointer?.normalize(e) || e;
              let i = this.chart,
                s = this.xAxis,
                n = this.zoomedMin,
                o = this.size,
                r = this.range,
                a = this.left,
                l = e.chartX,
                h,
                c,
                d,
                u;
              i.inverted && ((l = e.chartY), (a = this.top)),
                1 === t
                  ? ((this.grabbedCenter = l),
                    (this.fixedWidth = r),
                    (this.dragOffset = l - n))
                  : ((u = l - a - r / 2),
                    0 === t
                      ? (u = Math.max(0, u))
                      : 2 === t &&
                        u + r >= o &&
                        ((u = o - r),
                        this.reversedExtremes
                          ? ((u -= r), (c = this.getUnionExtremes().dataMin))
                          : (h = this.getUnionExtremes().dataMax)),
                    u !== n &&
                      ((this.fixedWidth = r),
                      m(
                        (d = s.navigatorAxis.toFixedRange(u, u + r, c, h)).min
                      ) &&
                        v(this, "setRange", {
                          min: Math.min(d.min, d.max),
                          max: Math.max(d.min, d.max),
                          redraw: !0,
                          eventArguments: { trigger: "navigator" },
                        })));
            }
            handlesMousedown(e, t) {
              e = this.chart.pointer?.normalize(e) || e;
              let i = this.chart,
                s = i.xAxis[0],
                n = this.reversedExtremes;
              0 === t
                ? ((this.grabbedLeft = !0),
                  (this.otherHandlePos = this.zoomedMax),
                  (this.fixedExtreme = n ? s.min : s.max))
                : ((this.grabbedRight = !0),
                  (this.otherHandlePos = this.zoomedMin),
                  (this.fixedExtreme = n ? s.max : s.min)),
                i.setFixedRange(void 0);
            }
            onMouseMove(e) {
              let t = this,
                i = t.chart,
                s = t.navigatorSize,
                n = t.range,
                o = t.dragOffset,
                r = i.inverted,
                a = t.left,
                l;
              (!e.touches || 0 !== e.touches[0].pageX) &&
                ((l = (e = i.pointer?.normalize(e) || e).chartX),
                r && ((a = t.top), (l = e.chartY)),
                t.grabbedLeft
                  ? ((t.hasDragged = !0),
                    t.render(0, 0, l - a, t.otherHandlePos))
                  : t.grabbedRight
                  ? ((t.hasDragged = !0),
                    t.render(0, 0, t.otherHandlePos, l - a))
                  : t.grabbedCenter &&
                    ((t.hasDragged = !0),
                    l < o ? (l = o) : l > s + o - n && (l = s + o - n),
                    t.render(0, 0, l - o, l - o + n)),
                t.hasDragged &&
                  t.scrollbar &&
                  E(
                    t.scrollbar.options.liveRedraw,
                    !c && !this.chart.boosted
                  ) &&
                  ((e.DOMType = e.type),
                  setTimeout(function () {
                    t.onMouseUp(e);
                  }, 0)));
            }
            onMouseUp(e) {
              let t, i, s, n, o, r;
              let a = this.chart,
                l = this.xAxis,
                h = this.scrollbar,
                c = e.DOMEvent || e,
                d = a.inverted,
                u = this.rendered && !this.hasDragged ? "animate" : "attr";
              ((this.hasDragged && (!h || !h.hasDragged)) ||
                "scrollbar" === e.trigger) &&
                ((s = this.getUnionExtremes()),
                this.zoomedMin === this.otherHandlePos
                  ? (n = this.fixedExtreme)
                  : this.zoomedMax === this.otherHandlePos &&
                    (o = this.fixedExtreme),
                this.zoomedMax === this.size &&
                  (o = this.reversedExtremes ? s.dataMin : s.dataMax),
                0 === this.zoomedMin &&
                  (n = this.reversedExtremes ? s.dataMax : s.dataMin),
                m(
                  (r = l.navigatorAxis.toFixedRange(
                    this.zoomedMin,
                    this.zoomedMax,
                    n,
                    o
                  )).min
                ) &&
                  v(this, "setRange", {
                    min: Math.min(r.min, r.max),
                    max: Math.max(r.min, r.max),
                    redraw: !0,
                    animation: !this.hasDragged && null,
                    eventArguments: {
                      trigger: "navigator",
                      triggerOp: "navigator-drag",
                      DOMEvent: c,
                    },
                  })),
                "mousemove" !== e.DOMType &&
                  "touchmove" !== e.DOMType &&
                  (this.grabbedLeft =
                    this.grabbedRight =
                    this.grabbedCenter =
                    this.fixedWidth =
                    this.fixedExtreme =
                    this.otherHandlePos =
                    this.hasDragged =
                    this.dragOffset =
                      null),
                this.navigatorEnabled &&
                  C(this.zoomedMin) &&
                  C(this.zoomedMax) &&
                  ((i = Math.round(this.zoomedMin)),
                  (t = Math.round(this.zoomedMax)),
                  this.shades && this.drawMasks(i, t, d, u),
                  this.outline && this.drawOutline(i, t, d, u),
                  this.navigatorOptions.handles.enabled &&
                    Object.keys(this.handles).length === this.handles.length &&
                    (this.drawHandle(i, 0, d, u), this.drawHandle(t, 1, d, u)));
            }
            removeEvents() {
              this.eventsToUnbind &&
                (this.eventsToUnbind.forEach(function (e) {
                  e();
                }),
                (this.eventsToUnbind = void 0)),
                this.removeBaseSeriesEvents();
            }
            removeBaseSeriesEvents() {
              let e = this.baseSeries || [];
              this.navigatorEnabled &&
                e[0] &&
                (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                  e.forEach(function (e) {
                    T(e, "updatedData", this.updatedDataHandler);
                  }, this),
                e[0].xAxis &&
                  T(e[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
            }
            getXAxisOffsets() {
              return this.chart.inverted
                ? [this.scrollButtonSize, 0, -this.scrollButtonSize, 0]
                : [0, -this.scrollButtonSize, 0, this.scrollButtonSize];
            }
            init(t) {
              let i = t.options,
                s = i.navigator || {},
                o = s.enabled,
                a = i.scrollbar || {},
                l = a.enabled,
                h = (o && s.height) || 0,
                c = (l && a.height) || 0,
                d = (a.buttonsEnabled && c) || 0;
              (this.handles = []),
                (this.shades = []),
                (this.chart = t),
                this.setBaseSeries(),
                (this.height = h),
                (this.scrollbarHeight = c),
                (this.scrollButtonSize = d),
                (this.scrollbarEnabled = l),
                (this.navigatorEnabled = o),
                (this.navigatorOptions = s),
                (this.scrollbarOptions = a),
                this.setOpposite();
              let p = this,
                g = p.baseSeries,
                m = t.xAxis.length,
                b = t.yAxis.length,
                y = (g && g[0] && g[0].xAxis) || t.xAxis[0] || { options: {} };
              if (((t.isDirtyBox = !0), p.navigatorEnabled)) {
                let i = this.getXAxisOffsets();
                (p.xAxis = new e(
                  t,
                  w(
                    {
                      breaks: y.options.breaks,
                      ordinal: y.options.ordinal,
                      overscroll: y.options.overscroll,
                    },
                    s.xAxis,
                    {
                      type: "datetime",
                      index: m,
                      isInternal: !0,
                      offset: 0,
                      keepOrdinalPadding: !0,
                      startOnTick: !1,
                      endOnTick: !1,
                      minPadding: y.options.ordinal ? 0 : y.options.minPadding,
                      maxPadding: y.options.ordinal ? 0 : y.options.maxPadding,
                      zoomEnabled: !1,
                    },
                    t.inverted
                      ? { offsets: i, width: h }
                      : { offsets: i, height: h }
                  ),
                  "xAxis"
                )),
                  (p.yAxis = new e(
                    t,
                    w(
                      s.yAxis,
                      {
                        alignTicks: !1,
                        offset: 0,
                        index: b,
                        isInternal: !0,
                        reversed: E(
                          s.yAxis && s.yAxis.reversed,
                          t.yAxis[0] && t.yAxis[0].reversed,
                          !1
                        ),
                        zoomEnabled: !1,
                      },
                      t.inverted ? { width: h } : { height: h }
                    ),
                    "yAxis"
                  )),
                  g || s.series.data
                    ? p.updateNavigatorSeries(!1)
                    : 0 === t.series.length &&
                      (p.unbindRedraw = u(t, "beforeRedraw", function () {
                        t.series.length > 0 &&
                          !p.series &&
                          (p.setBaseSeries(), p.unbindRedraw());
                      })),
                  (p.reversedExtremes =
                    (t.inverted && !p.xAxis.reversed) ||
                    (!t.inverted && p.xAxis.reversed)),
                  p.renderElements(),
                  p.addMouseEvents();
              } else
                (p.xAxis = {
                  chart: t,
                  navigatorAxis: { fake: !0 },
                  translate: function (e, i) {
                    let s = t.xAxis[0],
                      n = s.getExtremes(),
                      o = s.len - 2 * d,
                      r = S("min", s.options.min, n.dataMin),
                      a = S("max", s.options.max, n.dataMax) - r;
                    return i ? (e * a) / o + r : (o * (e - r)) / a;
                  },
                  toPixels: function (e) {
                    return this.translate(e);
                  },
                  toValue: function (e) {
                    return this.translate(e, !0);
                  },
                }),
                  (p.xAxis.navigatorAxis.axis = p.xAxis),
                  (p.xAxis.navigatorAxis.toFixedRange =
                    n.prototype.toFixedRange.bind(p.xAxis.navigatorAxis));
              if (t.options.scrollbar.enabled) {
                let e = w(t.options.scrollbar, { vertical: t.inverted });
                !C(e.margin) &&
                  p.navigatorEnabled &&
                  (e.margin = t.inverted ? -3 : 3),
                  (t.scrollbar = p.scrollbar = new r(t.renderer, e, t)),
                  u(p.scrollbar, "changed", function (e) {
                    let t = p.size,
                      i = t * this.to,
                      s = t * this.from;
                    (p.hasDragged = p.scrollbar.hasDragged),
                      p.render(0, 0, s, i),
                      this.shouldUpdateExtremes(e.DOMType) &&
                        setTimeout(function () {
                          p.onMouseUp(e);
                        });
                  });
              }
              p.addBaseSeriesEvents(), p.addChartEvents();
            }
            setOpposite() {
              let e = this.navigatorOptions,
                t = this.navigatorEnabled,
                i = this.chart;
              this.opposite = E(e.opposite, !!(!t && i.inverted));
            }
            getUnionExtremes(e) {
              let t;
              let i = this.chart.xAxis[0],
                s = this.xAxis,
                n = s.options,
                o = i.options;
              return (
                (e && null === i.dataMin) ||
                  (t = {
                    dataMin: E(
                      n && n.min,
                      S("min", o.min, i.dataMin, s.dataMin, s.min)
                    ),
                    dataMax: E(
                      n && n.max,
                      S("max", o.max, i.dataMax, s.dataMax, s.max)
                    ),
                  }),
                t
              );
            }
            setBaseSeries(e, t) {
              let i = this.chart,
                s = (this.baseSeries = []);
              (e =
                e ||
                (i.options && i.options.navigator.baseSeries) ||
                (i.series.length
                  ? x(i.series, (e) => !e.options.isInternal).index
                  : 0)),
                (i.series || []).forEach((t, i) => {
                  !t.options.isInternal &&
                    (t.options.showInNavigator ||
                      ((i === e || t.options.id === e) &&
                        !1 !== t.options.showInNavigator)) &&
                    s.push(t);
                }),
                this.xAxis &&
                  !this.xAxis.navigatorAxis.fake &&
                  this.updateNavigatorSeries(!0, t);
            }
            updateNavigatorSeries(e, t) {
              let i = this,
                s = i.chart,
                n = i.baseSeries,
                o = {
                  enableMouseTracking: !1,
                  index: null,
                  linkedTo: null,
                  group: "nav",
                  padXAxis: !1,
                  xAxis: this.navigatorOptions.xAxis?.id,
                  yAxis: this.navigatorOptions.yAxis?.id,
                  showInLegend: !1,
                  stacking: void 0,
                  isInternal: !0,
                  states: { inactive: { opacity: 1 } },
                },
                r = (i.series = (i.series || []).filter((e) => {
                  let t = e.baseSeries;
                  return (
                    !(0 > n.indexOf(t)) ||
                    (t &&
                      (T(t, "updatedData", i.updatedDataHandler),
                      delete t.navigatorSeries),
                    e.chart && e.destroy(),
                    !1)
                  );
                })),
                a,
                l,
                c = i.navigatorOptions.series,
                d;
              n &&
                n.length &&
                n.forEach((e) => {
                  let u = e.navigatorSeries,
                    p = f(
                      { color: e.color, visible: e.visible },
                      A(c) ? h.navigator.series : c
                    );
                  if (u && !1 === i.navigatorOptions.adaptToUpdatedData) return;
                  (o.name = "Navigator " + n.length),
                    (d = (a = e.options || {}).navigatorOptions || {}),
                    (p.dataLabels = M(p.dataLabels)),
                    ((l = w(a, o, p, d)).pointRange = E(
                      p.pointRange,
                      d.pointRange,
                      h.plotOptions[l.type || "line"].pointRange
                    ));
                  let g = d.data || p.data;
                  (i.hasNavigatorData = i.hasNavigatorData || !!g),
                    (l.data = g || (a.data && a.data.slice(0))),
                    u && u.options
                      ? u.update(l, t)
                      : ((e.navigatorSeries = s.initSeries(l)),
                        s.setSortedData(),
                        (e.navigatorSeries.baseSeries = e),
                        r.push(e.navigatorSeries));
                }),
                ((c.data && !(n && n.length)) || A(c)) &&
                  ((i.hasNavigatorData = !1),
                  (c = M(c)).forEach((e, t) => {
                    (o.name = "Navigator " + (r.length + 1)),
                      ((l = w(
                        h.navigator.series,
                        {
                          color:
                            (s.series[t] &&
                              !s.series[t].options.isInternal &&
                              s.series[t].color) ||
                            s.options.colors[t] ||
                            s.options.colors[0],
                        },
                        o,
                        e
                      )).data = e.data),
                      l.data &&
                        ((i.hasNavigatorData = !0), r.push(s.initSeries(l)));
                  })),
                e && this.addBaseSeriesEvents();
            }
            addBaseSeriesEvents() {
              let e = this,
                t = e.baseSeries || [];
              t[0] &&
                t[0].xAxis &&
                t[0].eventsToUnbind.push(
                  u(t[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
                ),
                t.forEach((i) => {
                  i.eventsToUnbind.push(
                    u(i, "show", function () {
                      this.navigatorSeries &&
                        this.navigatorSeries.setVisible(!0, !1);
                    })
                  ),
                    i.eventsToUnbind.push(
                      u(i, "hide", function () {
                        this.navigatorSeries &&
                          this.navigatorSeries.setVisible(!1, !1);
                      })
                    ),
                    !1 !== this.navigatorOptions.adaptToUpdatedData &&
                      i.xAxis &&
                      i.eventsToUnbind.push(
                        u(i, "updatedData", this.updatedDataHandler)
                      ),
                    i.eventsToUnbind.push(
                      u(i, "remove", function () {
                        t && y(t, i),
                          this.navigatorSeries &&
                            (y(e.series, this.navigatorSeries),
                            m(this.navigatorSeries.options) &&
                              this.navigatorSeries.remove(!1),
                            delete this.navigatorSeries);
                      })
                    );
                });
            }
            getBaseSeriesMin(e) {
              return this.baseSeries.reduce(function (e, t) {
                return Math.min(e, t.xData && t.xData.length ? t.xData[0] : e);
              }, e);
            }
            modifyNavigatorAxisExtremes() {
              let e = this.xAxis;
              if (void 0 !== e.getExtremes) {
                let t = this.getUnionExtremes(!0);
                t &&
                  (t.dataMin !== e.min || t.dataMax !== e.max) &&
                  ((e.min = t.dataMin), (e.max = t.dataMax));
              }
            }
            modifyBaseAxisExtremes() {
              let e, t;
              let i = this.chart.navigator,
                s = this.getExtremes(),
                n = s.min,
                o = s.max,
                r = s.dataMin,
                a = s.dataMax,
                l = o - n,
                h = i.stickToMin,
                c = i.stickToMax,
                d = E(
                  this.ordinal?.convertOverscroll(this.options.overscroll),
                  0
                ),
                u = i.series && i.series[0],
                p = !!this.setExtremes;
              !(
                this.eventArgs &&
                "rangeSelectorButton" === this.eventArgs.trigger
              ) &&
                (h && (e = (t = r) + l),
                c &&
                  ((e = a + d),
                  h ||
                    (t = Math.max(
                      r,
                      e - l,
                      i.getBaseSeriesMin(
                        u && u.xData ? u.xData[0] : -Number.MAX_VALUE
                      )
                    ))),
                p &&
                  (h || c) &&
                  C(t) &&
                  ((this.min = this.userMin = t),
                  (this.max = this.userMax = e))),
                (i.stickToMin = i.stickToMax = null);
            }
            updatedDataHandler() {
              let e = this.chart.navigator,
                t = this.navigatorSeries,
                i = e.reversedExtremes
                  ? 0 === Math.round(e.zoomedMin)
                  : Math.round(e.zoomedMax) >= Math.round(e.size);
              (e.stickToMax = E(
                this.chart.options.navigator &&
                  this.chart.options.navigator.stickToMax,
                i
              )),
                (e.stickToMin = e.shouldStickToMin(this, e)),
                t &&
                  !e.hasNavigatorData &&
                  ((t.options.pointStart = this.xData[0]),
                  t.setData(this.options.data, !1, null, !1));
            }
            shouldStickToMin(e, t) {
              let i = t.getBaseSeriesMin(e.xData[0]),
                s = e.xAxis,
                n = s.max,
                o = s.min,
                r = s.options.range;
              return !!(C(n) && C(o)) && (r && n - i > 0 ? n - i < r : o <= i);
            }
            addChartEvents() {
              this.eventsToUnbind || (this.eventsToUnbind = []),
                this.eventsToUnbind.push(
                  u(this.chart, "redraw", function () {
                    let e = this.navigator,
                      t =
                        e &&
                        ((e.baseSeries &&
                          e.baseSeries[0] &&
                          e.baseSeries[0].xAxis) ||
                          this.xAxis[0]);
                    t && e.render(t.min, t.max);
                  }),
                  u(this.chart, "getMargins", function () {
                    let e = this.navigator,
                      t = e.opposite ? "plotTop" : "marginBottom";
                    this.inverted &&
                      (t = e.opposite ? "marginRight" : "plotLeft"),
                      (this[t] =
                        (this[t] || 0) +
                        (e.navigatorEnabled || !this.inverted
                          ? e.height + e.scrollbarHeight
                          : 0) +
                        e.navigatorOptions.margin);
                  }),
                  u(k, "setRange", function (e) {
                    this.chart.xAxis[0].setExtremes(
                      e.min,
                      e.max,
                      e.redraw,
                      e.animation,
                      e.eventArguments
                    );
                  })
                );
            }
            destroy() {
              this.removeEvents(),
                this.xAxis &&
                  (y(this.chart.xAxis, this.xAxis),
                  y(this.chart.axes, this.xAxis)),
                this.yAxis &&
                  (y(this.chart.yAxis, this.yAxis),
                  y(this.chart.axes, this.yAxis)),
                (this.series || []).forEach((e) => {
                  e.destroy && e.destroy();
                }),
                [
                  "series",
                  "xAxis",
                  "yAxis",
                  "shades",
                  "outline",
                  "scrollbarTrack",
                  "scrollbarRifles",
                  "scrollbarGroup",
                  "scrollbar",
                  "navigatorGroup",
                  "rendered",
                ].forEach((e) => {
                  this[e] && this[e].destroy && this[e].destroy(),
                    (this[e] = null);
                }),
                [this.handles].forEach((e) => {
                  b(e);
                }),
                (this.navigatorEnabled = !1);
            }
          }
          return k;
        }
      ),
      i(
        t,
        "Accessibility/Components/NavigatorComponent.js",
        [
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/Announcer.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Stock/Navigator/Navigator.js"],
          t["Core/Animation/AnimationUtilities.js"],
          t["Core/Templating.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
        ],
        function (e, t, i, s, n, o, r, a, l) {
          let { animObject: h } = n,
            { format: c } = o,
            { clamp: d, pick: u, syncTimeout: p } = r,
            { getFakeMouseEvent: g } = a,
            {
              getAxisRangeDescription: m,
              fireEventOnWrappedOrUnwrappedElement: b,
            } = l;
          return class extends e {
            init() {
              let e = this.chart,
                i = this;
              (this.announcer = new t(e, "polite")),
                this.addEvent(s, "afterRender", function () {
                  this.chart === i.chart &&
                    this.chart.renderer &&
                    p(() => {
                      i.proxyProvider.updateGroupProxyElementPositions(
                        "navigator"
                      ),
                        i.updateHandleValues();
                    }, h(u(this.chart.renderer.globalAnimation, !0)).duration);
                });
            }
            onChartUpdate() {
              let e = this.chart,
                t = e.options,
                i = t.navigator;
              if (i.enabled && i.accessibility?.enabled) {
                let i = t.accessibility.landmarkVerbosity,
                  s = t.lang.accessibility?.navigator.groupLabel;
                this.proxyProvider.removeGroup("navigator"),
                  this.proxyProvider.addGroup("navigator", "div", {
                    role: "all" === i ? "region" : "group",
                    "aria-label": c(s, { chart: e }, e),
                  });
                let n = t.lang.accessibility?.navigator.handleLabel;
                [0, 1].forEach((t) => {
                  let i = this.getHandleByIx(t);
                  if (i) {
                    let s = this.proxyProvider.addProxyElement(
                      "navigator",
                      { click: i },
                      "input",
                      {
                        type: "range",
                        "aria-label": c(n, { handleIx: t, chart: e }, e),
                      }
                    );
                    (this[t ? "maxHandleProxy" : "minHandleProxy"] =
                      s.innerElement),
                      (s.innerElement.style.pointerEvents = "none"),
                      (s.innerElement.oninput = () => this.updateNavigator());
                  }
                }),
                  this.updateHandleValues();
              } else this.proxyProvider.removeGroup("navigator");
            }
            getNavigatorHandleNavigation(e) {
              let t = this,
                s = this.chart,
                n = e ? this.maxHandleProxy : this.minHandleProxy,
                o = this.keyCodes;
              return new i(s, {
                keyCodeMap: [
                  [
                    [o.left, o.right, o.up, o.down],
                    function (i) {
                      if (n) {
                        let r = i === o.left || i === o.up ? -1 : 1;
                        (n.value = "" + d(parseFloat(n.value) + r, 0, 100)),
                          t.updateNavigator(() => {
                            let i = t.getHandleByIx(e);
                            i && s.setFocusToElement(i, n);
                          });
                      }
                      return this.response.success;
                    },
                  ],
                ],
                init: () => {
                  s.setFocusToElement(this.getHandleByIx(e), n);
                },
                validate: () =>
                  !!(
                    this.getHandleByIx(e) &&
                    n &&
                    s.options.navigator.accessibility?.enabled
                  ),
              });
            }
            getKeyboardNavigation() {
              return [
                this.getNavigatorHandleNavigation(0),
                this.getNavigatorHandleNavigation(1),
              ];
            }
            destroy() {
              this.updateNavigatorThrottleTimer &&
                clearTimeout(this.updateNavigatorThrottleTimer),
                this.proxyProvider.removeGroup("navigator"),
                this.announcer && this.announcer.destroy();
            }
            updateHandleValues() {
              let e = this.chart.navigator;
              if (e && this.minHandleProxy && this.maxHandleProxy) {
                let t = e.size;
                (this.minHandleProxy.value =
                  "" + Math.round((e.zoomedMin / t) * 100)),
                  (this.maxHandleProxy.value =
                    "" + Math.round((e.zoomedMax / t) * 100));
              }
            }
            getHandleByIx(e) {
              let t = this.chart.navigator;
              return t && t.handles && t.handles[e];
            }
            updateNavigator(e) {
              this.updateNavigatorThrottleTimer &&
                clearTimeout(this.updateNavigatorThrottleTimer),
                (this.updateNavigatorThrottleTimer = setTimeout(
                  ((e) => {
                    let t = this.chart,
                      { navigator: i, pointer: s } = t;
                    if (i && s && this.minHandleProxy && this.maxHandleProxy) {
                      let n = s.getChartPosition(),
                        o =
                          (parseFloat(this.minHandleProxy.value) / 100) *
                          i.size,
                        r =
                          (parseFloat(this.maxHandleProxy.value) / 100) *
                          i.size;
                      [
                        [0, "mousedown", i.zoomedMin],
                        [0, "mousemove", o],
                        [0, "mouseup", o],
                        [1, "mousedown", i.zoomedMax],
                        [1, "mousemove", r],
                        [1, "mouseup", r],
                      ].forEach(([e, t, s]) => {
                        let o = this.getHandleByIx(e)?.element;
                        o &&
                          b(
                            o,
                            g(
                              t,
                              { x: n.left + i.left + s, y: n.top + i.top },
                              o
                            )
                          );
                      }),
                        e && e();
                      let a =
                          t.options.lang.accessibility?.navigator
                            .changeAnnouncement,
                        l = m(t.xAxis[0]);
                      this.announcer.announce(
                        c(a, { axisRangeDescription: l, chart: t }, t)
                      );
                    }
                  }).bind(this, e),
                  20
                ));
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/SeriesComponent/SeriesDescriber.js",
        [
          t["Accessibility/Components/AnnotationsA11y.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Core/Templating.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { getPointAnnotationTexts: o } = e,
            {
              getAxisDescription: r,
              getSeriesFirstPointElement: a,
              getSeriesA11yElement: l,
              unhideChartElementFromAT: h,
            } = t,
            { format: c, numberFormat: d } = i,
            { reverseChildNodes: u, stripHTMLTagsFromString: p } = s,
            { find: g, isNumber: m, isString: b, pick: y, defined: f } = n;
          function x(e) {
            let t =
              e.chart.options.accessibility.series
                .pointDescriptionEnabledThreshold;
            return !!(!1 !== t && e.points && e.points.length >= +t);
          }
          function v(e, t) {
            let i = e.series,
              s = i.chart,
              n = s.options.accessibility.point || {},
              o =
                (i.options.accessibility && i.options.accessibility.point) ||
                {},
              r = i.tooltipOptions || {},
              a = s.options.lang;
            return m(t)
              ? d(
                  t,
                  o.valueDecimals || n.valueDecimals || r.valueDecimals || -1,
                  a.decimalPoint,
                  a.accessibility.thousandsSep || a.thousandsSep
                )
              : t;
          }
          function A(e, t) {
            let i = e[t];
            return e.chart.langFormat(
              "accessibility.series." + t + "Description",
              { name: r(i), series: e }
            );
          }
          function C(e) {
            let t = e.series,
              i = t.chart.series.length > 1 || t.options.name,
              s = (function (e) {
                let t = e.series,
                  i = t.chart,
                  s = t.options.accessibility,
                  n =
                    (s && s.point && s.point.valueDescriptionFormat) ||
                    i.options.accessibility.point.valueDescriptionFormat,
                  o = y(
                    t.xAxis &&
                      t.xAxis.options.accessibility &&
                      t.xAxis.options.accessibility.enabled,
                    !i.angular && "flowmap" !== t.type
                  ),
                  r = o
                    ? (function (e) {
                        let t = (function (e) {
                            let t = e.series,
                              i = t.chart,
                              s =
                                (t.options.accessibility &&
                                  t.options.accessibility.point) ||
                                {},
                              n = i.options.accessibility.point || {},
                              o = t.xAxis && t.xAxis.dateTime;
                            if (o) {
                              let t = o.getXDateFormat(
                                  e.x || 0,
                                  i.options.tooltip.dateTimeLabelFormats
                                ),
                                r =
                                  (s.dateFormatter && s.dateFormatter(e)) ||
                                  (n.dateFormatter && n.dateFormatter(e)) ||
                                  s.dateFormat ||
                                  n.dateFormat ||
                                  t;
                              return i.time.dateFormat(r, e.x || 0, void 0);
                            }
                          })(e),
                          i =
                            (e.series.xAxis || {}).categories &&
                            f(e.category) &&
                            ("" + e.category).replace("<br/>", " "),
                          s = f(e.id) && 0 > ("" + e.id).indexOf("highcharts-"),
                          n = "x, " + e.x;
                        return e.name || t || i || (s ? e.id : n);
                      })(e)
                    : "";
                return c(
                  n,
                  {
                    point: e,
                    index: f(e.index) ? e.index + 1 : "",
                    xDescription: r,
                    value: (function (e) {
                      let t = e.series,
                        i = t.chart.options.accessibility.point || {},
                        s =
                          (t.chart.options.accessibility &&
                            t.chart.options.accessibility.point) ||
                          {},
                        n = t.tooltipOptions || {},
                        o =
                          s.valuePrefix || i.valuePrefix || n.valuePrefix || "",
                        r =
                          s.valueSuffix || i.valueSuffix || n.valueSuffix || "",
                        a = void 0 !== e.value ? "value" : "y",
                        l = v(e, e[a]);
                      return e.isNull
                        ? t.chart.langFormat(
                            "accessibility.series.nullPointValue",
                            { point: e }
                          )
                        : t.pointArrayMap
                        ? (function (e, t, i) {
                            let s = t || "",
                              n = i || "",
                              o = function (t) {
                                let i = v(e, y(e[t], e.options[t]));
                                return void 0 !== i ? t + ": " + s + i + n : i;
                              };
                            return e.series.pointArrayMap.reduce(function (
                              e,
                              t
                            ) {
                              let i = o(t);
                              return i ? e + (e.length ? ", " : "") + i : e;
                            },
                            "");
                          })(e, o, r)
                        : o + l + r;
                    })(e),
                    separator: o ? ", " : "",
                  },
                  i
                );
              })(e),
              n =
                e.options &&
                e.options.accessibility &&
                e.options.accessibility.description,
              r = i ? " " + t.name + "." : "",
              a = (function (e) {
                let t = e.series.chart,
                  i = o(e);
                return i.length
                  ? t.langFormat(
                      "accessibility.series.pointAnnotationsDescription",
                      { point: e, annotations: i }
                    )
                  : "";
              })(e);
            return (
              (e.accessibility = e.accessibility || {}),
              (e.accessibility.valueDescription = s),
              s + (n ? " " + n : "") + r + (a ? " " + a : "")
            );
          }
          function w(e) {
            let t = e.chart,
              i = t.types || [],
              s = (function (e) {
                let t = (e.options.accessibility || {}).description;
                return (
                  (t &&
                    e.chart.langFormat("accessibility.series.description", {
                      description: t,
                      series: e,
                    })) ||
                  ""
                );
              })(e),
              n = function (i) {
                return t[i] && t[i].length > 1 && e[i];
              },
              o = e.index + 1,
              r = A(e, "xAxis"),
              a = A(e, "yAxis"),
              l = { seriesNumber: o, series: e, chart: t },
              h = i.length > 1 ? "Combination" : "",
              d =
                t.langFormat("accessibility.series.summary." + e.type + h, l) ||
                t.langFormat("accessibility.series.summary.default" + h, l),
              u =
                (n("yAxis") ? " " + a + "." : "") +
                (n("xAxis") ? " " + r + "." : "");
            return c(
              y(
                e.options.accessibility &&
                  e.options.accessibility.descriptionFormat,
                t.options.accessibility.series.descriptionFormat,
                ""
              ),
              {
                seriesDescription: d,
                authorDescription: s ? " " + s : "",
                axisDescription: u,
                series: e,
                chart: t,
                seriesNumber: o,
              },
              void 0
            );
          }
          return {
            defaultPointDescriptionFormatter: C,
            defaultSeriesDescriptionFormatter: w,
            describeSeries: function (e) {
              let t = e.chart,
                i = a(e),
                s = l(e),
                n = t.is3d && t.is3d();
              s &&
                (s.lastChild !== i || n || u(s),
                (function (e) {
                  let t = (function (e) {
                      let t = e.options.accessibility || {};
                      return !x(e) && !t.exposeAsGroupOnly;
                    })(e),
                    i = (function (e) {
                      let t =
                        e.chart.options.accessibility.keyboardNavigation
                          .seriesNavigation;
                      return !!(
                        e.points &&
                        (e.points.length < +t.pointNavigationEnabledThreshold ||
                          !1 === t.pointNavigationEnabledThreshold)
                      );
                    })(e),
                    s = e.chart.options.accessibility.point.describeNull;
                  (t || i) &&
                    e.points.forEach((i) => {
                      let n =
                          (i.graphic && i.graphic.element) ||
                          ((function (e) {
                            let t = e.series,
                              i = t && t.chart,
                              s = t && t.is("sunburst"),
                              n = e.isNull,
                              o =
                                i && i.options.accessibility.point.describeNull;
                            return n && !s && o;
                          })(i) &&
                            (function (e) {
                              let t = e.series,
                                i = (function (e) {
                                  let t = e.index;
                                  return (
                                    (e.series &&
                                      e.series.data &&
                                      f(t) &&
                                      g(e.series.data, function (e) {
                                        return !!(
                                          e &&
                                          void 0 !== e.index &&
                                          e.index > t &&
                                          e.graphic &&
                                          e.graphic.element
                                        );
                                      })) ||
                                    null
                                  );
                                })(e),
                                s = i && i.graphic,
                                n = s ? s.parentGroup : t.graph || t.group,
                                o = i
                                  ? {
                                      x: y(e.plotX, i.plotX, 0),
                                      y: y(e.plotY, i.plotY, 0),
                                    }
                                  : { x: y(e.plotX, 0), y: y(e.plotY, 0) },
                                r = (function (e, t) {
                                  let i = e.series.chart.renderer.rect(
                                    t.x,
                                    t.y,
                                    1,
                                    1
                                  );
                                  return (
                                    i.attr({
                                      class: "highcharts-a11y-mock-point",
                                      fill: "none",
                                      opacity: 0,
                                      "fill-opacity": 0,
                                      "stroke-opacity": 0,
                                    }),
                                    i
                                  );
                                })(e, o);
                              if (n && n.element)
                                return (
                                  (e.graphic = r),
                                  (e.hasMockGraphic = !0),
                                  r.add(n),
                                  n.element.insertBefore(
                                    r.element,
                                    s ? s.element : null
                                  ),
                                  r.element
                                );
                            })(i)),
                        o =
                          i.options &&
                          i.options.accessibility &&
                          !1 === i.options.accessibility.enabled;
                      if (n) {
                        if (i.isNull && !s) {
                          n.setAttribute("aria-hidden", !0);
                          return;
                        }
                        n.setAttribute("tabindex", "-1"),
                          e.chart.styledMode || (n.style.outline = "none"),
                          t && !o
                            ? (function (e, t) {
                                let i = e.series,
                                  s = i.options.accessibility?.point || {},
                                  n = i.chart.options.accessibility.point || {},
                                  o = p(
                                    (b(s.descriptionFormat) &&
                                      c(s.descriptionFormat, e, i.chart)) ||
                                      s.descriptionFormatter?.(e) ||
                                      (b(n.descriptionFormat) &&
                                        c(n.descriptionFormat, e, i.chart)) ||
                                      n.descriptionFormatter?.(e) ||
                                      C(e),
                                    i.chart.renderer.forExport
                                  );
                                t.setAttribute("role", "img"),
                                  t.setAttribute("aria-label", o);
                              })(i, n)
                            : n.setAttribute("aria-hidden", !0);
                      }
                    });
                })(e),
                h(t, s),
                (function (e) {
                  let t = e.chart,
                    i = t.options.chart,
                    s = i.options3d && i.options3d.enabled,
                    n = t.series.length > 1,
                    o = t.options.accessibility.series.describeSingleSeries,
                    r = (e.options.accessibility || {}).exposeAsGroupOnly;
                  return !(s && n) && (n || o || r || x(e));
                })(e)
                  ? (function (e, t) {
                      let i = e.options.accessibility || {},
                        s = e.chart.options.accessibility,
                        n = s.landmarkVerbosity;
                      i.exposeAsGroupOnly
                        ? t.setAttribute("role", "img")
                        : "all" === n
                        ? t.setAttribute("role", "region")
                        : t.setAttribute("role", "group"),
                        t.setAttribute("tabindex", "-1"),
                        e.chart.styledMode || (t.style.outline = "none"),
                        t.setAttribute(
                          "aria-label",
                          p(
                            (s.series.descriptionFormatter &&
                              s.series.descriptionFormatter(e)) ||
                              w(e),
                            e.chart.renderer.forExport
                          )
                        );
                    })(e, s)
                  : s.removeAttribute("aria-label"));
            },
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js",
        [
          t["Core/Globals.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/Announcer.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/EventProvider.js"],
          t["Accessibility/Components/SeriesComponent/SeriesDescriber.js"],
        ],
        function (e, t, i, s, n, o) {
          let { composed: r } = e,
            { addEvent: a, defined: l, pushUnique: h } = t,
            { getChartTitle: c } = s,
            {
              defaultPointDescriptionFormatter: d,
              defaultSeriesDescriptionFormatter: u,
            } = o;
          function p(e) {
            return !!e.options.accessibility.announceNewData.enabled;
          }
          class g {
            constructor(e) {
              (this.dirty = { allSeries: {} }),
                (this.lastAnnouncementTime = 0),
                (this.chart = e);
            }
            init() {
              let e = this.chart,
                t = e.options.accessibility.announceNewData.interruptUser
                  ? "assertive"
                  : "polite";
              (this.lastAnnouncementTime = 0),
                (this.dirty = { allSeries: {} }),
                (this.eventProvider = new n()),
                (this.announcer = new i(e, t)),
                this.addEventListeners();
            }
            destroy() {
              this.eventProvider.removeAddedEvents(), this.announcer.destroy();
            }
            addEventListeners() {
              let e = this,
                t = this.chart,
                i = this.eventProvider;
              i.addEvent(t, "afterApplyDrilldown", function () {
                e.lastAnnouncementTime = 0;
              }),
                i.addEvent(t, "afterAddSeries", function (t) {
                  e.onSeriesAdded(t.series);
                }),
                i.addEvent(t, "redraw", function () {
                  e.announceDirtyData();
                });
            }
            onSeriesAdded(e) {
              p(this.chart) &&
                ((this.dirty.hasDirty = !0),
                (this.dirty.allSeries[e.name + e.index] = e),
                (this.dirty.newSeries = l(this.dirty.newSeries) ? void 0 : e));
            }
            announceDirtyData() {
              let e = this.chart,
                t = this;
              if (
                e.options.accessibility.announceNewData &&
                this.dirty.hasDirty
              ) {
                let e = this.dirty.newPoint;
                e &&
                  (e = (function (e) {
                    let t = e.series.data.filter(
                      (t) => e.x === t.x && e.y === t.y
                    );
                    return 1 === t.length ? t[0] : e;
                  })(e)),
                  this.queueAnnouncement(
                    Object.keys(this.dirty.allSeries).map(
                      (e) => t.dirty.allSeries[e]
                    ),
                    this.dirty.newSeries,
                    e
                  ),
                  (this.dirty = { allSeries: {} });
              }
            }
            queueAnnouncement(e, t, i) {
              let s = this.chart.options.accessibility.announceNewData;
              if (s.enabled) {
                let n = +new Date(),
                  o = n - this.lastAnnouncementTime,
                  r = Math.max(0, s.minAnnounceInterval - o),
                  a = (function (e, t) {
                    let i = (e || [])
                      .concat(t || [])
                      .reduce((e, t) => ((e[t.name + t.index] = t), e), {});
                    return Object.keys(i).map((e) => i[e]);
                  })(
                    this.queuedAnnouncement && this.queuedAnnouncement.series,
                    e
                  ),
                  l = this.buildAnnouncementMessage(a, t, i);
                l &&
                  (this.queuedAnnouncement &&
                    clearTimeout(this.queuedAnnouncementTimer),
                  (this.queuedAnnouncement = {
                    time: n,
                    message: l,
                    series: a,
                  }),
                  (this.queuedAnnouncementTimer = setTimeout(() => {
                    this &&
                      this.announcer &&
                      ((this.lastAnnouncementTime = +new Date()),
                      this.announcer.announce(this.queuedAnnouncement.message),
                      delete this.queuedAnnouncement,
                      delete this.queuedAnnouncementTimer);
                  }, r)));
              }
            }
            buildAnnouncementMessage(t, i, s) {
              let n = this.chart,
                o = n.options.accessibility.announceNewData;
              if (o.announcementFormatter) {
                let e = o.announcementFormatter(t, i, s);
                if (!1 !== e) return e.length ? e : null;
              }
              let r = e.charts && e.charts.length > 1 ? "Multiple" : "Single",
                a = i
                  ? "newSeriesAnnounce" + r
                  : s
                  ? "newPointAnnounce" + r
                  : "newDataAnnounce",
                l = c(n);
              return n.langFormat("accessibility.announceNewData." + a, {
                chartTitle: l,
                seriesDesc: i ? u(i) : null,
                pointDesc: s ? d(s) : null,
                point: s,
                series: i,
              });
            }
          }
          return (
            (function (e) {
              function t(e) {
                let t = this.chart,
                  i = t.accessibility?.components.series.newDataAnnouncer;
                i &&
                  i.chart === t &&
                  p(t) &&
                  (i.dirty.newPoint = l(i.dirty.newPoint) ? void 0 : e.point);
              }
              function i() {
                let e = this.chart,
                  t = e.accessibility?.components.series.newDataAnnouncer;
                t &&
                  t.chart === e &&
                  p(e) &&
                  ((t.dirty.hasDirty = !0),
                  (t.dirty.allSeries[this.name + this.index] = this));
              }
              e.compose = function (e) {
                h(r, "A11y.NDA") &&
                  (a(e, "addPoint", t), a(e, "updatedData", i));
              };
            })(g || (g = {})),
            g
          );
        }
      ),
      i(
        t,
        "Accessibility/ProxyElement.js",
        [
          t["Core/Globals.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/EventProvider.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
        ],
        function (e, t, i, s, n) {
          let { doc: o } = e,
            { attr: r, css: a, merge: l } = t,
            { fireEventOnWrappedOrUnwrappedElement: h } = s,
            {
              cloneMouseEvent: c,
              cloneTouchEvent: d,
              getFakeMouseEvent: u,
              removeElement: p,
            } = n;
          return class {
            constructor(e, t, s = "button", n, r) {
              (this.chart = e),
                (this.target = t),
                (this.eventProvider = new i());
              let a = (this.innerElement = o.createElement(s)),
                l = (this.element = n ? o.createElement(n) : a);
              e.styledMode || this.hideElementVisually(a),
                n &&
                  ("li" !== n || e.styledMode || (l.style.listStyle = "none"),
                  l.appendChild(a),
                  (this.element = l)),
                this.updateTarget(t, r);
            }
            click() {
              let e = this.getTargetPosition();
              (e.x += e.width / 2), (e.y += e.height / 2);
              let t = u("click", e);
              h(this.target.click, t);
            }
            updateTarget(e, t) {
              (this.target = e), this.updateCSSClassName();
              let i = t || {};
              Object.keys(i).forEach((e) => {
                null === i[e] && delete i[e];
              });
              let s = this.getTargetAttr(e.click, "aria-label");
              r(this.innerElement, l(s ? { "aria-label": s } : {}, i)),
                this.eventProvider.removeAddedEvents(),
                this.addProxyEventsToElement(this.innerElement, e.click),
                this.refreshPosition();
            }
            refreshPosition() {
              let e = this.getTargetPosition();
              a(this.innerElement, {
                width: (e.width || 1) + "px",
                height: (e.height || 1) + "px",
                left: (Math.round(e.x) || 0) + "px",
                top: (Math.round(e.y) || 0) + "px",
              });
            }
            remove() {
              this.eventProvider.removeAddedEvents(), p(this.element);
            }
            updateCSSClassName() {
              let e = (e) => e.indexOf("highcharts-no-tooltip") > -1,
                t = this.chart.legend,
                i = t.group && t.group.div,
                s = e((i && i.className) || ""),
                n = e(this.getTargetAttr(this.target.click, "class") || "");
              this.innerElement.className =
                s || n
                  ? "highcharts-a11y-proxy-element highcharts-no-tooltip"
                  : "highcharts-a11y-proxy-element";
            }
            addProxyEventsToElement(e, t) {
              [
                "click",
                "touchstart",
                "touchend",
                "touchcancel",
                "touchmove",
                "mouseover",
                "mouseenter",
                "mouseleave",
                "mouseout",
              ].forEach((i) => {
                let s = 0 === i.indexOf("touch");
                this.eventProvider.addEvent(
                  e,
                  i,
                  (e) => {
                    let i = s ? d(e) : c(e);
                    t && h(t, i), e.stopPropagation(), s || e.preventDefault();
                  },
                  { passive: !1 }
                );
              });
            }
            hideElementVisually(e) {
              a(e, {
                borderWidth: 0,
                backgroundColor: "transparent",
                cursor: "pointer",
                outline: "none",
                opacity: 0.001,
                filter: "alpha(opacity=1)",
                zIndex: 999,
                overflow: "hidden",
                padding: 0,
                margin: 0,
                display: "block",
                position: "absolute",
                "-ms-filter":
                  "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
              });
            }
            getTargetPosition() {
              let e = this.target.click,
                t = e.element ? e.element : e,
                i = this.target.visual || t,
                s = this.chart.renderTo,
                n = this.chart.pointer;
              if (s && i?.getBoundingClientRect && n) {
                let e = i.getBoundingClientRect(),
                  t = n.getChartPosition();
                return {
                  x: (e.left - t.left) / t.scaleX,
                  y: (e.top - t.top) / t.scaleY,
                  width: e.right / t.scaleX - e.left / t.scaleX,
                  height: e.bottom / t.scaleY - e.top / t.scaleY,
                };
              }
              return { x: 0, y: 0, width: 1, height: 1 };
            }
            getTargetAttr(e, t) {
              return e.element ? e.element.getAttribute(t) : e.getAttribute(t);
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/ProxyProvider.js",
        [
          t["Core/Globals.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/DOMElementProvider.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Accessibility/ProxyElement.js"],
        ],
        function (e, t, i, s, n, o) {
          let { doc: r } = e,
            { attr: a, css: l } = t,
            { unhideChartElementFromAT: h } = i,
            { removeChildNodes: c } = n;
          return class {
            constructor(e) {
              (this.chart = e),
                (this.domElementProvider = new s()),
                (this.groups = {}),
                (this.groupOrder = []),
                (this.beforeChartProxyPosContainer =
                  this.createProxyPosContainer("before")),
                (this.afterChartProxyPosContainer =
                  this.createProxyPosContainer("after")),
                this.update();
            }
            addProxyElement(e, t, i = "button", s) {
              let n = this.groups[e];
              if (!n)
                throw Error(
                  "ProxyProvider.addProxyElement: Invalid group key " + e
                );
              let r = "ul" === n.type || "ol" === n.type ? "li" : void 0,
                a = new o(this.chart, t, i, r, s);
              return (
                n.proxyContainerElement.appendChild(a.element),
                n.proxyElements.push(a),
                a
              );
            }
            addGroup(e, t = "div", i) {
              let s;
              let n = this.groups[e];
              if (n) return n.groupElement;
              let o = this.domElementProvider.createElement(t);
              return (
                i && i.role && "div" !== t
                  ? (s =
                      this.domElementProvider.createElement("div")).appendChild(
                      o
                    )
                  : (s = o),
                (s.className =
                  "highcharts-a11y-proxy-group highcharts-a11y-proxy-group-" +
                  e.replace(/\W/g, "-")),
                (this.groups[e] = {
                  proxyContainerElement: o,
                  groupElement: s,
                  type: t,
                  proxyElements: [],
                }),
                a(s, i || {}),
                "ul" === t && o.setAttribute("role", "list"),
                this.afterChartProxyPosContainer.appendChild(s),
                this.updateGroupOrder(this.groupOrder),
                s
              );
            }
            updateGroupAttrs(e, t) {
              let i = this.groups[e];
              if (!i)
                throw Error(
                  "ProxyProvider.updateGroupAttrs: Invalid group key " + e
                );
              a(i.groupElement, t);
            }
            updateGroupOrder(e) {
              if (((this.groupOrder = e.slice()), this.isDOMOrderGroupOrder()))
                return;
              let t = e.indexOf("series"),
                i = t > -1 ? e.slice(0, t) : e,
                s = t > -1 ? e.slice(t + 1) : [],
                n = r.activeElement;
              ["before", "after"].forEach((e) => {
                let t =
                  this[
                    "before" === e
                      ? "beforeChartProxyPosContainer"
                      : "afterChartProxyPosContainer"
                  ];
                c(t),
                  ("before" === e ? i : s).forEach((e) => {
                    let i = this.groups[e];
                    i && t.appendChild(i.groupElement);
                  });
              }),
                (this.beforeChartProxyPosContainer.contains(n) ||
                  this.afterChartProxyPosContainer.contains(n)) &&
                  n &&
                  n.focus &&
                  n.focus();
            }
            clearGroup(e) {
              let t = this.groups[e];
              if (!t)
                throw Error("ProxyProvider.clearGroup: Invalid group key " + e);
              c(t.proxyContainerElement);
            }
            removeGroup(e) {
              let t = this.groups[e];
              t &&
                (this.domElementProvider.removeElement(t.groupElement),
                t.groupElement !== t.proxyContainerElement &&
                  this.domElementProvider.removeElement(
                    t.proxyContainerElement
                  ),
                delete this.groups[e]);
            }
            update() {
              this.updatePosContainerPositions(),
                this.updateGroupOrder(this.groupOrder),
                this.updateProxyElementPositions();
            }
            updateProxyElementPositions() {
              Object.keys(this.groups).forEach(
                this.updateGroupProxyElementPositions.bind(this)
              );
            }
            updateGroupProxyElementPositions(e) {
              let t = this.groups[e];
              t && t.proxyElements.forEach((e) => e.refreshPosition());
            }
            destroy() {
              this.domElementProvider.destroyCreatedElements();
            }
            createProxyPosContainer(e) {
              let t = this.domElementProvider.createElement("div");
              return (
                t.setAttribute("aria-hidden", "false"),
                (t.className =
                  "highcharts-a11y-proxy-container" + (e ? "-" + e : "")),
                l(t, { top: "0", left: "0" }),
                this.chart.styledMode ||
                  ((t.style.whiteSpace = "nowrap"),
                  (t.style.position = "absolute")),
                t
              );
            }
            getCurrentGroupOrderInDOM() {
              let e = (e) => {
                  let t = Object.keys(this.groups),
                    i = t.length;
                  for (; i--; ) {
                    let s = t[i],
                      n = this.groups[s];
                    if (n && e === n.groupElement) return s;
                  }
                },
                t = (t) => {
                  let i = [],
                    s = t.children;
                  for (let t = 0; t < s.length; ++t) {
                    let n = e(s[t]);
                    n && i.push(n);
                  }
                  return i;
                },
                i = t(this.beforeChartProxyPosContainer),
                s = t(this.afterChartProxyPosContainer);
              return i.push("series"), i.concat(s);
            }
            isDOMOrderGroupOrder() {
              let e = this.getCurrentGroupOrderInDOM(),
                t = this.groupOrder.filter(
                  (e) => "series" === e || !!this.groups[e]
                ),
                i = e.length;
              if (i !== t.length) return !1;
              for (; i--; ) if (e[i] !== t[i]) return !1;
              return !0;
            }
            updatePosContainerPositions() {
              let e = this.chart;
              if (e.renderer.forExport) return;
              let t = e.renderer.box;
              e.container.insertBefore(
                this.afterChartProxyPosContainer,
                t.nextSibling
              ),
                e.container.insertBefore(this.beforeChartProxyPosContainer, t),
                h(this.chart, this.afterChartProxyPosContainer),
                h(this.chart, this.beforeChartProxyPosContainer);
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/RangeSelectorComponent.js",
        [
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/Announcer.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { unhideChartElementFromAT: o, getAxisRangeDescription: r } = i,
            { addEvent: a, attr: l } = n;
          class h extends e {
            init() {
              let e = this.chart;
              this.announcer = new t(e, "polite");
            }
            onChartUpdate() {
              let e = this.chart,
                t = this,
                i = e.rangeSelector;
              i &&
                (this.updateSelectorVisibility(),
                this.setDropdownAttrs(),
                i.buttons &&
                  i.buttons.length &&
                  i.buttons.forEach((e) => {
                    t.setRangeButtonAttrs(e);
                  }),
                i.maxInput &&
                  i.minInput &&
                  ["minInput", "maxInput"].forEach(function (s, n) {
                    let r = i[s];
                    r &&
                      (o(e, r),
                      t.setRangeInputAttrs(
                        r,
                        "accessibility.rangeSelector." +
                          (n ? "max" : "min") +
                          "InputLabel"
                      ));
                  }));
            }
            updateSelectorVisibility() {
              let e = this.chart,
                t = e.rangeSelector,
                i = t && t.dropdown,
                s = (t && t.buttons) || [],
                n = (e) => e.setAttribute("aria-hidden", !0);
              t && t.hasVisibleDropdown && i
                ? (o(e, i), s.forEach((e) => n(e.element)))
                : (i && n(i), s.forEach((t) => o(e, t.element)));
            }
            setDropdownAttrs() {
              let e = this.chart,
                t = e.rangeSelector && e.rangeSelector.dropdown;
              if (t) {
                let i = e.langFormat(
                  "accessibility.rangeSelector.dropdownLabel",
                  { rangeTitle: e.options.lang.rangeSelectorZoom }
                );
                t.setAttribute("aria-label", i), t.setAttribute("tabindex", -1);
              }
            }
            setRangeButtonAttrs(e) {
              l(e.element, { tabindex: -1, role: "button" });
            }
            setRangeInputAttrs(e, t) {
              let i = this.chart;
              l(e, {
                tabindex: -1,
                "aria-label": i.langFormat(t, { chart: i }),
              });
            }
            onButtonNavKbdArrowKey(e, t) {
              let i = e.response,
                s = this.keyCodes,
                n = this.chart,
                o = n.options.accessibility.keyboardNavigation.wrapAround,
                r = t === s.left || t === s.up ? -1 : 1;
              return n.highlightRangeSelectorButton(
                n.highlightedRangeSelectorItemIx + r
              )
                ? i.success
                : o
                ? (e.init(r), i.success)
                : i[r > 0 ? "next" : "prev"];
            }
            onButtonNavKbdClick(e) {
              let t = e.response,
                i = this.chart;
              return (
                3 !== i.oldRangeSelectorItemState &&
                  this.fakeClickEvent(
                    i.rangeSelector.buttons[i.highlightedRangeSelectorItemIx]
                      .element
                  ),
                t.success
              );
            }
            onAfterBtnClick() {
              let e = this.chart,
                t = r(e.xAxis[0]),
                i = e.langFormat(
                  "accessibility.rangeSelector.clickButtonAnnouncement",
                  { chart: e, axisRangeDescription: t }
                );
              i && this.announcer.announce(i);
            }
            onInputKbdMove(e) {
              let t = this.chart,
                i = t.rangeSelector,
                s = (t.highlightedInputRangeIx =
                  (t.highlightedInputRangeIx || 0) + e);
              if (s > 1 || s < 0) {
                if (t.accessibility)
                  return (
                    (t.accessibility.keyboardNavigation.exiting = !0),
                    t.accessibility.keyboardNavigation.tabindexContainer.focus(),
                    t.accessibility.keyboardNavigation.move(e)
                  );
              } else if (i) {
                let e = i[s ? "maxDateBox" : "minDateBox"],
                  n = i[s ? "maxInput" : "minInput"];
                e && n && t.setFocusToElement(e, n);
              }
              return !0;
            }
            onInputNavInit(e) {
              let t = this,
                i = this.chart,
                s = e > 0 ? 0 : 1,
                n = i.rangeSelector,
                o = n && n[s ? "maxDateBox" : "minDateBox"],
                r = n && n.minInput,
                l = n && n.maxInput;
              if (((i.highlightedInputRangeIx = s), o && r && l)) {
                i.setFocusToElement(o, s ? l : r),
                  this.removeInputKeydownHandler &&
                    this.removeInputKeydownHandler();
                let e = (e) => {
                    (e.which || e.keyCode) === this.keyCodes.tab &&
                      t.onInputKbdMove(e.shiftKey ? -1 : 1) &&
                      (e.preventDefault(), e.stopPropagation());
                  },
                  n = a(r, "keydown", e),
                  h = a(l, "keydown", e);
                this.removeInputKeydownHandler = () => {
                  n(), h();
                };
              }
            }
            onInputNavTerminate() {
              let e = this.chart.rangeSelector || {};
              e.maxInput && e.hideInput("max"),
                e.minInput && e.hideInput("min"),
                this.removeInputKeydownHandler &&
                  (this.removeInputKeydownHandler(),
                  delete this.removeInputKeydownHandler);
            }
            initDropdownNav() {
              let e = this.chart,
                t = e.rangeSelector,
                i = t && t.dropdown;
              t &&
                i &&
                (e.setFocusToElement(t.buttonGroup, i),
                this.removeDropdownKeydownHandler &&
                  this.removeDropdownKeydownHandler(),
                (this.removeDropdownKeydownHandler = a(i, "keydown", (t) => {
                  let i = (t.which || t.keyCode) === this.keyCodes.tab,
                    s = e.accessibility;
                  i &&
                    (t.preventDefault(),
                    t.stopPropagation(),
                    s &&
                      (s.keyboardNavigation.tabindexContainer.focus(),
                      s.keyboardNavigation.move(t.shiftKey ? -1 : 1)));
                })));
            }
            getRangeSelectorButtonNavigation() {
              let e = this.chart,
                t = this.keyCodes,
                i = this;
              return new s(e, {
                keyCodeMap: [
                  [
                    [t.left, t.right, t.up, t.down],
                    function (e) {
                      return i.onButtonNavKbdArrowKey(this, e);
                    },
                  ],
                  [
                    [t.enter, t.space],
                    function () {
                      return i.onButtonNavKbdClick(this);
                    },
                  ],
                ],
                validate: function () {
                  return !!(
                    e.rangeSelector &&
                    e.rangeSelector.buttons &&
                    e.rangeSelector.buttons.length
                  );
                },
                init: function (t) {
                  let s = e.rangeSelector;
                  if (s && s.hasVisibleDropdown) i.initDropdownNav();
                  else if (s) {
                    let i = s.buttons.length - 1;
                    e.highlightRangeSelectorButton(t > 0 ? 0 : i);
                  }
                },
                terminate: function () {
                  i.removeDropdownKeydownHandler &&
                    (i.removeDropdownKeydownHandler(),
                    delete i.removeDropdownKeydownHandler);
                },
              });
            }
            getRangeSelectorInputNavigation() {
              let e = this.chart,
                t = this;
              return new s(e, {
                keyCodeMap: [],
                validate: function () {
                  return !!(
                    e.rangeSelector &&
                    e.rangeSelector.inputGroup &&
                    "hidden" !==
                      e.rangeSelector.inputGroup.element.style.visibility &&
                    !1 !== e.options.rangeSelector.inputEnabled &&
                    e.rangeSelector.minInput &&
                    e.rangeSelector.maxInput
                  );
                },
                init: function (e) {
                  t.onInputNavInit(e);
                },
                terminate: function () {
                  t.onInputNavTerminate();
                },
              });
            }
            getKeyboardNavigation() {
              return [
                this.getRangeSelectorButtonNavigation(),
                this.getRangeSelectorInputNavigation(),
              ];
            }
            destroy() {
              this.removeDropdownKeydownHandler &&
                this.removeDropdownKeydownHandler(),
                this.removeInputKeydownHandler &&
                  this.removeInputKeydownHandler(),
                this.announcer && this.announcer.destroy();
            }
          }
          return (
            (function (e) {
              function t(e) {
                let t =
                    (this.rangeSelector && this.rangeSelector.buttons) || [],
                  i = this.highlightedRangeSelectorItemIx,
                  s = this.rangeSelector && this.rangeSelector.selected;
                return (
                  void 0 !== i &&
                    t[i] &&
                    i !== s &&
                    t[i].setState(this.oldRangeSelectorItemState || 0),
                  (this.highlightedRangeSelectorItemIx = e),
                  !!t[e] &&
                    (this.setFocusToElement(t[e].box, t[e].element),
                    e !== s &&
                      ((this.oldRangeSelectorItemState = t[e].state),
                      t[e].setState(1)),
                    !0)
                );
              }
              function i() {
                let e = this.chart.accessibility;
                if (e && e.components.rangeSelector)
                  return e.components.rangeSelector.onAfterBtnClick();
              }
              e.compose = function (e, s) {
                let n = e.prototype;
                n.highlightRangeSelectorButton ||
                  ((n.highlightRangeSelectorButton = t),
                  a(s, "afterBtnClick", i));
              };
            })(h || (h = {})),
            h
          );
        }
      ),
      i(
        t,
        "Accessibility/Components/SeriesComponent/ForcedMarkers.js",
        [t["Core/Globals.js"], t["Core/Utilities.js"]],
        function (e, t) {
          var i;
          let { composed: s } = e,
            { addEvent: n, merge: o, pushUnique: r } = t;
          return (
            (function (e) {
              function t(e) {
                o(!0, e, {
                  marker: { enabled: !0, states: { normal: { opacity: 0 } } },
                });
              }
              function i(e) {
                return (
                  e.marker.states &&
                  e.marker.states.normal &&
                  e.marker.states.normal.opacity
                );
              }
              function a(e) {
                return !!(e._hasPointMarkers && e.points && e.points.length);
              }
              function l() {
                this.chart.styledMode &&
                  (this.markerGroup &&
                    this.markerGroup[
                      this.a11yMarkersForced ? "addClass" : "removeClass"
                    ]("highcharts-a11y-markers-hidden"),
                  a(this) &&
                    this.points.forEach((e) => {
                      e.graphic &&
                        (e.graphic[
                          e.hasForcedA11yMarker ? "addClass" : "removeClass"
                        ]("highcharts-a11y-marker-hidden"),
                        e.graphic[
                          !1 === e.hasForcedA11yMarker
                            ? "addClass"
                            : "removeClass"
                        ]("highcharts-a11y-marker-visible"));
                    }));
              }
              function h(e) {
                this.resetA11yMarkerOptions = o(
                  e.options.marker || {},
                  this.userOptions.marker || {}
                );
              }
              function c() {
                let e = this.options;
                (function (e) {
                  let t = e.chart.options.accessibility.enabled,
                    i =
                      !1 !==
                      (e.options.accessibility &&
                        e.options.accessibility.enabled);
                  return (
                    t &&
                    i &&
                    (function (e) {
                      let t = e.chart.options.accessibility;
                      return (
                        e.points.length <
                          t.series.pointDescriptionEnabledThreshold ||
                        !1 === t.series.pointDescriptionEnabledThreshold
                      );
                    })(e)
                  );
                })(this)
                  ? (e.marker &&
                      !1 === e.marker.enabled &&
                      ((this.a11yMarkersForced = !0), t(this.options)),
                    a(this) &&
                      (function (e) {
                        let s = e.points.length;
                        for (; s--; ) {
                          let n = e.points[s],
                            r = n.options,
                            a = n.hasForcedA11yMarker;
                          if ((delete n.hasForcedA11yMarker, r.marker)) {
                            let e = a && 0 === i(r);
                            r.marker.enabled && !e
                              ? (o(!0, r.marker, {
                                  states: { normal: { opacity: i(r) || 1 } },
                                }),
                                (n.hasForcedA11yMarker = !1))
                              : !1 === r.marker.enabled &&
                                (t(r), (n.hasForcedA11yMarker = !0));
                          }
                        }
                      })(this))
                  : this.a11yMarkersForced &&
                    (delete this.a11yMarkersForced,
                    (function (e) {
                      let t = e.resetA11yMarkerOptions;
                      if (t) {
                        let i =
                          t.states &&
                          t.states.normal &&
                          t.states.normal.opacity;
                        e.userOptions &&
                          e.userOptions.marker &&
                          (e.userOptions.marker.enabled = !0),
                          e.update({
                            marker: {
                              enabled: t.enabled,
                              states: { normal: { opacity: i } },
                            },
                          });
                      }
                    })(this),
                    delete this.resetA11yMarkerOptions);
              }
              function d() {
                this.boosted &&
                  this.a11yMarkersForced &&
                  (o(!0, this.options, { marker: { enabled: !1 } }),
                  delete this.a11yMarkersForced);
              }
              e.compose = function (e) {
                r(s, "A11y.FM") &&
                  (n(e, "afterSetOptions", h),
                  n(e, "render", c),
                  n(e, "afterRender", l),
                  n(e, "renderCanvas", d));
              };
            })(i || (i = {})),
            i
          );
        }
      ),
      i(
        t,
        "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js",
        [
          t["Core/Series/Point.js"],
          t["Core/Series/Series.js"],
          t["Core/Series/SeriesRegistry.js"],
          t["Core/Globals.js"],
          t["Core/Utilities.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Accessibility/Utils/EventProvider.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
        ],
        function (e, t, i, s, n, o, r, a) {
          let { seriesTypes: l } = i,
            { doc: h } = s,
            { defined: c, fireEvent: d } = n,
            {
              getPointFromXY: u,
              getSeriesFromName: p,
              scrollAxisToPoint: g,
            } = a;
          function m(e) {
            let t = e.index,
              i = e.series.points,
              s = i.length;
            if (i[t] === e) return t;
            for (; s--; ) if (i[s] === e) return s;
          }
          function b(e) {
            let t =
                e.chart.options.accessibility.keyboardNavigation
                  .seriesNavigation,
              i = e.options.accessibility || {},
              s = i.keyboardNavigation;
            return (
              (s && !1 === s.enabled) ||
              !1 === i.enabled ||
              !1 === e.options.enableMouseTracking ||
              !e.visible ||
              (t.pointNavigationEnabledThreshold &&
                +t.pointNavigationEnabledThreshold <= e.points.length)
            );
          }
          function y(e) {
            let t = e.series.chart.options.accessibility,
              i =
                e.options.accessibility &&
                !1 === e.options.accessibility.enabled;
            return (
              (e.isNull &&
                t.keyboardNavigation.seriesNavigation.skipNullPoints) ||
              !1 === e.visible ||
              !1 === e.isInside ||
              i ||
              b(e.series)
            );
          }
          function f(e) {
            let t = e.series || [],
              i = t.length;
            for (let e = 0; e < i; ++e)
              if (!b(t[e])) {
                let i = (function (e) {
                  let t = e.points || [],
                    i = t.length;
                  for (let e = 0; e < i; ++e) if (!y(t[e])) return t[e];
                  return null;
                })(t[e]);
                if (i) return i;
              }
            return null;
          }
          function x(e) {
            let t = e.series.length,
              i = !1;
            for (
              ;
              t-- &&
              ((e.highlightedPoint =
                e.series[t].points[e.series[t].points.length - 1]),
              !(i = e.series[t].highlightNextValidPoint()));

            );
            return i;
          }
          function v(e) {
            delete e.highlightedPoint;
            let t = f(e);
            return !!t && t.highlight();
          }
          class A {
            constructor(e, t) {
              (this.keyCodes = t), (this.chart = e);
            }
            init() {
              let i = this,
                s = this.chart,
                n = (this.eventProvider = new r());
              n.addEvent(t, "destroy", function () {
                return i.onSeriesDestroy(this);
              }),
                n.addEvent(s, "afterApplyDrilldown", function () {
                  !(function (e) {
                    let t = f(e);
                    t && t.highlight(!1);
                  })(this);
                }),
                n.addEvent(s, "drilldown", function (e) {
                  let t = e.point,
                    s = t.series;
                  i.lastDrilledDownPoint = {
                    x: t.x,
                    y: t.y,
                    seriesName: s ? s.name : "",
                  };
                }),
                n.addEvent(s, "drillupall", function () {
                  setTimeout(function () {
                    i.onDrillupAll();
                  }, 10);
                }),
                n.addEvent(e, "afterSetState", function () {
                  let e = this.graphic && this.graphic.element,
                    t = h.activeElement,
                    i = t && t.getAttribute("class"),
                    n = i && i.indexOf("highcharts-a11y-proxy-element") > -1;
                  s.highlightedPoint === this &&
                    t !== e &&
                    !n &&
                    e &&
                    e.focus &&
                    e.focus();
                });
            }
            onDrillupAll() {
              let e;
              let t = this.lastDrilledDownPoint,
                i = this.chart,
                s = t && p(i, t.seriesName);
              t && s && c(t.x) && c(t.y) && (e = u(s, t.x, t.y)),
                (e = e || f(i)),
                i.container && i.container.focus(),
                e && e.highlight && e.highlight(!1);
            }
            getKeyboardNavigationHandler() {
              let e = this,
                t = this.keyCodes,
                i = this.chart,
                s = i.inverted;
              return new o(i, {
                keyCodeMap: [
                  [
                    s ? [t.up, t.down] : [t.left, t.right],
                    function (t) {
                      return e.onKbdSideways(this, t);
                    },
                  ],
                  [
                    s ? [t.left, t.right] : [t.up, t.down],
                    function (t) {
                      return e.onKbdVertical(this, t);
                    },
                  ],
                  [
                    [t.enter, t.space],
                    function (e, t) {
                      let s = i.highlightedPoint;
                      if (s) {
                        let { plotLeft: e, plotTop: i } = this.chart,
                          { plotX: n = 0, plotY: o = 0 } = s;
                        (t = {
                          ...t,
                          chartX: e + n,
                          chartY: i + o,
                          point: s,
                          target: s.graphic?.element || t.target,
                        }),
                          d(s.series, "click", t),
                          s.firePointEvent("click", t);
                      }
                      return this.response.success;
                    },
                  ],
                  [
                    [t.home],
                    function () {
                      return v(i), this.response.success;
                    },
                  ],
                  [
                    [t.end],
                    function () {
                      return x(i), this.response.success;
                    },
                  ],
                  [
                    [t.pageDown, t.pageUp],
                    function (e) {
                      return (
                        i.highlightAdjacentSeries(e === t.pageDown),
                        this.response.success
                      );
                    },
                  ],
                ],
                init: function () {
                  return e.onHandlerInit(this);
                },
                validate: function () {
                  return !!f(i);
                },
                terminate: function () {
                  return e.onHandlerTerminate();
                },
              });
            }
            onKbdSideways(e, t) {
              let i = this.keyCodes,
                s = t === i.right || t === i.down;
              return this.attemptHighlightAdjacentPoint(e, s);
            }
            onHandlerInit(e) {
              let t = this.chart;
              return (
                t.options.accessibility.keyboardNavigation.seriesNavigation
                  .rememberPointFocus && t.highlightedPoint
                  ? t.highlightedPoint.highlight()
                  : v(t),
                e.response.success
              );
            }
            onKbdVertical(e, t) {
              let i = this.chart,
                s = this.keyCodes,
                n = t === s.down || t === s.right,
                o = i.options.accessibility.keyboardNavigation.seriesNavigation;
              if (o.mode && "serialize" === o.mode)
                return this.attemptHighlightAdjacentPoint(e, n);
              let r =
                i.highlightedPoint &&
                i.highlightedPoint.series.keyboardMoveVertical
                  ? "highlightAdjacentPointVertical"
                  : "highlightAdjacentSeries";
              return i[r](n), e.response.success;
            }
            onHandlerTerminate() {
              let e = this.chart,
                t = e.options.accessibility.keyboardNavigation;
              e.tooltip && e.tooltip.hide(0);
              let i = e.highlightedPoint && e.highlightedPoint.series;
              i && i.onMouseOut && i.onMouseOut(),
                e.highlightedPoint &&
                  e.highlightedPoint.onMouseOut &&
                  e.highlightedPoint.onMouseOut(),
                t.seriesNavigation.rememberPointFocus ||
                  delete e.highlightedPoint;
            }
            attemptHighlightAdjacentPoint(e, t) {
              let i = this.chart,
                s = i.options.accessibility.keyboardNavigation.wrapAround;
              return i.highlightAdjacentPoint(t)
                ? e.response.success
                : s && (t ? v(i) : x(i))
                ? e.response.success
                : e.response[t ? "next" : "prev"];
            }
            onSeriesDestroy(e) {
              let t = this.chart;
              t.highlightedPoint &&
                t.highlightedPoint.series === e &&
                (delete t.highlightedPoint,
                t.focusElement && t.focusElement.removeFocusBorder());
            }
            destroy() {
              this.eventProvider.removeAddedEvents();
            }
          }
          return (
            (function (e) {
              function t(e) {
                let t, i;
                let s = this.series,
                  n = this.highlightedPoint,
                  o = (n && m(n)) || 0,
                  r = (n && n.series.points) || [],
                  a = this.series && this.series[this.series.length - 1],
                  l = a && a.points && a.points[a.points.length - 1];
                if (!s[0] || !s[0].points) return !1;
                if (n) {
                  if (
                    ((t = s[n.series.index + (e ? 1 : -1)]),
                    (i = r[o + (e ? 1 : -1)]) ||
                      !t ||
                      (i = t.points[e ? 0 : t.points.length - 1]),
                    !i)
                  )
                    return !1;
                } else i = e ? s[0].points[0] : l;
                return y(i)
                  ? (b((t = i.series))
                      ? (this.highlightedPoint = e
                          ? t.points[t.points.length - 1]
                          : t.points[0])
                      : (this.highlightedPoint = i),
                    this.highlightAdjacentPoint(e))
                  : i.highlight();
              }
              function i(e) {
                let t = this.highlightedPoint,
                  i = 1 / 0,
                  s;
                return (
                  !!(c(t.plotX) && c(t.plotY)) &&
                  (this.series.forEach((n) => {
                    b(n) ||
                      n.points.forEach((o) => {
                        if (!c(o.plotY) || !c(o.plotX) || o === t) return;
                        let r = o.plotY - t.plotY,
                          a = Math.abs(o.plotX - t.plotX),
                          l = Math.abs(r) * Math.abs(r) + a * a * 4;
                        n.yAxis && n.yAxis.reversed && (r *= -1),
                          !((r <= 0 && e) || (r >= 0 && !e) || l < 5 || y(o)) &&
                            l < i &&
                            ((i = l), (s = o));
                      });
                  }),
                  !!s && s.highlight())
                );
              }
              function s(e) {
                let t, i, s;
                let n = this.highlightedPoint,
                  o = this.series && this.series[this.series.length - 1],
                  r = o && o.points && o.points[o.points.length - 1];
                return this.highlightedPoint
                  ? !!(
                      (t = this.series[n.series.index + (e ? -1 : 1)]) &&
                      (i = (function (e, t, i, s) {
                        let n = 1 / 0,
                          o,
                          r,
                          a,
                          l = t.points.length,
                          h = (e) => !(c(e.plotX) && c(e.plotY));
                        if (!h(e)) {
                          for (; l--; )
                            !h((o = t.points[l])) &&
                              (a =
                                (e.plotX - o.plotX) * (e.plotX - o.plotX) * 4 +
                                (e.plotY - o.plotY) * (e.plotY - o.plotY) * 1) <
                                n &&
                              ((n = a), (r = l));
                          return c(r) ? t.points[r] : void 0;
                        }
                      })(n, t, 0))
                    ) &&
                      (b(t)
                        ? (i.highlight(), (s = this.highlightAdjacentSeries(e)))
                          ? s
                          : (n.highlight(), !1)
                        : (i.highlight(), i.series.highlightNextValidPoint()))
                  : ((t = e ? this.series && this.series[0] : o),
                    !!(i = e ? t && t.points && t.points[0] : r) &&
                      i.highlight());
              }
              function n(e = !0) {
                let t = this.series.chart,
                  i = t.tooltip?.label?.element;
                !this.isNull && e
                  ? this.onMouseOver()
                  : t.tooltip && t.tooltip.hide(0),
                  g(this),
                  this.graphic &&
                    (t.setFocusToElement(this.graphic),
                    !e && t.focusElement && t.focusElement.removeFocusBorder()),
                  (t.highlightedPoint = this);
                let s = i?.getBoundingClientRect().top;
                if (i && s && s < 0) {
                  let e = window.scrollY;
                  window.scrollTo({ behavior: "smooth", top: e + s });
                }
                return this;
              }
              function o() {
                let e = this.chart.highlightedPoint,
                  t = (e && e.series) === this ? m(e) : 0,
                  i = this.points,
                  s = i.length;
                if (i && s) {
                  for (let e = t; e < s; ++e)
                    if (!y(i[e])) return i[e].highlight();
                  for (let e = t; e >= 0; --e)
                    if (!y(i[e])) return i[e].highlight();
                }
                return !1;
              }
              e.compose = function (e, r, a) {
                let h = e.prototype,
                  c = r.prototype,
                  d = a.prototype;
                h.highlightAdjacentPoint ||
                  ((h.highlightAdjacentPoint = t),
                  (h.highlightAdjacentPointVertical = i),
                  (h.highlightAdjacentSeries = s),
                  (c.highlight = n),
                  (d.keyboardMoveVertical = !0),
                  ["column", "gantt", "pie"].forEach((e) => {
                    l[e] && (l[e].prototype.keyboardMoveVertical = !1);
                  }),
                  (d.highlightNextValidPoint = o));
              };
            })(A || (A = {})),
            A
          );
        }
      ),
      i(
        t,
        "Accessibility/Components/SeriesComponent/SeriesComponent.js",
        [
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Components/SeriesComponent/ForcedMarkers.js"],
          t["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"],
          t["Accessibility/Components/SeriesComponent/SeriesDescriber.js"],
          t[
            "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js"
          ],
        ],
        function (e, t, i, s, n, o) {
          let { hideSeriesFromAT: r } = t,
            { describeSeries: a } = n;
          return class extends e {
            static compose(e, t, n) {
              s.compose(n), i.compose(n), o.compose(e, t, n);
            }
            init() {
              (this.newDataAnnouncer = new s(this.chart)),
                this.newDataAnnouncer.init(),
                (this.keyboardNavigation = new o(this.chart, this.keyCodes)),
                this.keyboardNavigation.init(),
                this.hideTooltipFromATWhenShown(),
                this.hideSeriesLabelsFromATWhenShown();
            }
            hideTooltipFromATWhenShown() {
              let e = this;
              this.chart.tooltip &&
                this.addEvent(
                  this.chart.tooltip.constructor,
                  "refresh",
                  function () {
                    this.chart === e.chart &&
                      this.label &&
                      this.label.element &&
                      this.label.element.setAttribute("aria-hidden", !0);
                  }
                );
            }
            hideSeriesLabelsFromATWhenShown() {
              this.addEvent(this.chart, "afterDrawSeriesLabels", function () {
                this.series.forEach(function (e) {
                  e.labelBySeries && e.labelBySeries.attr("aria-hidden", !0);
                });
              });
            }
            onChartRender() {
              this.chart.series.forEach(function (e) {
                !1 !==
                  (e.options.accessibility &&
                    e.options.accessibility.enabled) &&
                e.visible &&
                0 !== e.getPointsCollection().length
                  ? a(e)
                  : r(e);
              });
            }
            getKeyboardNavigation() {
              return this.keyboardNavigation.getKeyboardNavigationHandler();
            }
            destroy() {
              this.newDataAnnouncer.destroy(),
                this.keyboardNavigation.destroy();
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/Components/ZoomComponent.js",
        [
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Core/Utilities.js"],
        ],
        function (e, t, i, s, n) {
          let { unhideChartElementFromAT: o } = t,
            { getFakeMouseEvent: r } = i,
            { attr: a, pick: l } = n;
          return class extends e {
            constructor() {
              super(...arguments), (this.focusedMapNavButtonIx = -1);
            }
            init() {
              let e = this,
                t = this.chart;
              this.proxyProvider.addGroup("zoom", "div"),
                [
                  "afterShowResetZoom",
                  "afterApplyDrilldown",
                  "drillupall",
                ].forEach((i) => {
                  e.addEvent(t, i, function () {
                    e.updateProxyOverlays();
                  });
                });
            }
            onChartUpdate() {
              let e = this.chart,
                t = this;
              e.mapNavigation &&
                e.mapNavigation.navButtons.forEach((i, s) => {
                  o(e, i.element),
                    t.setMapNavButtonAttrs(
                      i.element,
                      "accessibility.zoom.mapZoom" + (s ? "Out" : "In")
                    );
                });
            }
            setMapNavButtonAttrs(e, t) {
              let i = this.chart;
              a(e, {
                tabindex: -1,
                role: "button",
                "aria-label": i.langFormat(t, { chart: i }),
              });
            }
            onChartRender() {
              this.updateProxyOverlays();
            }
            updateProxyOverlays() {
              let e = this.chart;
              if (
                (this.proxyProvider.clearGroup("zoom"),
                e.resetZoomButton &&
                  this.createZoomProxyButton(
                    e.resetZoomButton,
                    "resetZoomProxyButton",
                    e.langFormat("accessibility.zoom.resetZoomButton", {
                      chart: e,
                    })
                  ),
                e.drillUpButton && e.breadcrumbs && e.breadcrumbs.list)
              ) {
                let t = e.breadcrumbs.list[e.breadcrumbs.list.length - 1];
                this.createZoomProxyButton(
                  e.drillUpButton,
                  "drillUpProxyButton",
                  e.langFormat("accessibility.drillUpButton", {
                    chart: e,
                    buttonText: e.breadcrumbs.getButtonText(t),
                  })
                );
              }
            }
            createZoomProxyButton(e, t, i) {
              this[t] = this.proxyProvider.addProxyElement(
                "zoom",
                { click: e },
                "button",
                { "aria-label": i, tabindex: -1 }
              );
            }
            getMapZoomNavigation() {
              let e = this.keyCodes,
                t = this.chart,
                i = this;
              return new s(t, {
                keyCodeMap: [
                  [
                    [e.up, e.down, e.left, e.right],
                    function (e) {
                      return i.onMapKbdArrow(this, e);
                    },
                  ],
                  [
                    [e.tab],
                    function (e, t) {
                      return i.onMapKbdTab(this, t);
                    },
                  ],
                  [
                    [e.space, e.enter],
                    function () {
                      return i.onMapKbdClick(this);
                    },
                  ],
                ],
                validate: function () {
                  return !!(
                    t.mapView &&
                    t.mapNavigation &&
                    t.mapNavigation.navButtons.length
                  );
                },
                init: function (e) {
                  return i.onMapNavInit(e);
                },
              });
            }
            onMapKbdArrow(e, t) {
              let i = this.chart,
                s = this.keyCodes,
                n = i.container,
                o = t === s.up || t === s.down,
                a = t === s.left || t === s.up ? 1 : -1,
                l = ((o ? i.plotHeight : i.plotWidth) / 10) * a,
                h = 10 * Math.random(),
                c = {
                  x: n.offsetLeft + i.plotLeft + i.plotWidth / 2 + h,
                  y: n.offsetTop + i.plotTop + i.plotHeight / 2 + h,
                },
                d = o ? { x: c.x, y: c.y + l } : { x: c.x + l, y: c.y };
              return (
                [r("mousedown", c), r("mousemove", d), r("mouseup", d)].forEach(
                  (e) => n.dispatchEvent(e)
                ),
                e.response.success
              );
            }
            onMapKbdTab(e, t) {
              let i = this.chart,
                s = e.response,
                n = t.shiftKey,
                o =
                  (n && !this.focusedMapNavButtonIx) ||
                  (!n && this.focusedMapNavButtonIx);
              if (
                (i.mapNavigation.navButtons[
                  this.focusedMapNavButtonIx
                ].setState(0),
                o)
              )
                return i.mapView && i.mapView.zoomBy(), s[n ? "prev" : "next"];
              this.focusedMapNavButtonIx += n ? -1 : 1;
              let r = i.mapNavigation.navButtons[this.focusedMapNavButtonIx];
              return (
                i.setFocusToElement(r.box, r.element), r.setState(2), s.success
              );
            }
            onMapKbdClick(e) {
              let t =
                this.chart.mapNavigation.navButtons[this.focusedMapNavButtonIx]
                  .element;
              return this.fakeClickEvent(t), e.response.success;
            }
            onMapNavInit(e) {
              let t = this.chart,
                i = t.mapNavigation.navButtons[0],
                s = t.mapNavigation.navButtons[1],
                n = e > 0 ? i : s;
              t.setFocusToElement(n.box, n.element),
                n.setState(2),
                (this.focusedMapNavButtonIx = e > 0 ? 0 : 1);
            }
            simpleButtonNavigation(e, t, i) {
              let n = this.keyCodes,
                o = this,
                r = this.chart;
              return new s(r, {
                keyCodeMap: [
                  [
                    [n.tab, n.up, n.down, n.left, n.right],
                    function (e, t) {
                      let i =
                        (e === n.tab && t.shiftKey) ||
                        e === n.left ||
                        e === n.up;
                      return this.response[i ? "prev" : "next"];
                    },
                  ],
                  [
                    [n.space, n.enter],
                    function () {
                      return l(i(this, r), this.response.success);
                    },
                  ],
                ],
                validate: function () {
                  return r[e] && r[e].box && o[t].innerElement;
                },
                init: function () {
                  r.setFocusToElement(r[e].box, o[t].innerElement);
                },
              });
            }
            getKeyboardNavigation() {
              return [
                this.simpleButtonNavigation(
                  "resetZoomButton",
                  "resetZoomProxyButton",
                  function (e, t) {
                    t.zoomOut();
                  }
                ),
                this.simpleButtonNavigation(
                  "drillUpButton",
                  "drillUpProxyButton",
                  function (e, t) {
                    return t.drillUp(), e.response.prev;
                  }
                ),
                this.getMapZoomNavigation(),
              ];
            }
          };
        }
      ),
      i(
        t,
        "Accessibility/HighContrastMode.js",
        [t["Core/Globals.js"]],
        function (e) {
          let { doc: t, isMS: i, win: s } = e;
          return {
            isHighContrastModeActive: function () {
              let e = /(Edg)/.test(s.navigator.userAgent);
              if (s.matchMedia && e)
                return s.matchMedia("(-ms-high-contrast: active)").matches;
              if (i && s.getComputedStyle) {
                let e = t.createElement("div");
                (e.style.backgroundImage =
                  "url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)"),
                  t.body.appendChild(e);
                let i = (e.currentStyle || s.getComputedStyle(e))
                  .backgroundImage;
                return t.body.removeChild(e), "none" === i;
              }
              return (
                s.matchMedia && s.matchMedia("(forced-colors: active)").matches
              );
            },
            setHighContrastTheme: function (e) {
              e.highContrastModeActive = !0;
              let t = e.options.accessibility.highContrastTheme;
              e.update(t, !1);
              let i = t.colors?.length > 1;
              e.series.forEach(function (e) {
                let s = t.plotOptions[e.type] || {},
                  n =
                    i && void 0 !== e.colorIndex
                      ? t.colors[e.colorIndex]
                      : s.color || "window",
                  o = {
                    color: s.color || "windowText",
                    colors: i ? t.colors : [s.color || "windowText"],
                    borderColor: s.borderColor || "window",
                    fillColor: n,
                  };
                e.update(o, !1),
                  e.points &&
                    e.points.forEach(function (e) {
                      e.options &&
                        e.options.color &&
                        e.update(
                          {
                            color: s.color || "windowText",
                            borderColor: s.borderColor || "window",
                          },
                          !1
                        );
                    });
              }),
                e.redraw();
            },
          };
        }
      ),
      i(t, "Accessibility/HighContrastTheme.js", [], function () {
        return {
          chart: { backgroundColor: "window" },
          title: { style: { color: "windowText" } },
          subtitle: { style: { color: "windowText" } },
          colorAxis: {
            minColor: "windowText",
            maxColor: "windowText",
            stops: [],
            dataClasses: [],
          },
          colors: ["windowText"],
          xAxis: {
            gridLineColor: "windowText",
            labels: { style: { color: "windowText" } },
            lineColor: "windowText",
            minorGridLineColor: "windowText",
            tickColor: "windowText",
            title: { style: { color: "windowText" } },
          },
          yAxis: {
            gridLineColor: "windowText",
            labels: { style: { color: "windowText" } },
            lineColor: "windowText",
            minorGridLineColor: "windowText",
            tickColor: "windowText",
            title: { style: { color: "windowText" } },
          },
          tooltip: {
            backgroundColor: "window",
            borderColor: "windowText",
            style: { color: "windowText" },
          },
          plotOptions: {
            series: {
              lineColor: "windowText",
              fillColor: "window",
              borderColor: "windowText",
              edgeColor: "windowText",
              borderWidth: 1,
              dataLabels: {
                connectorColor: "windowText",
                color: "windowText",
                style: { color: "windowText", textOutline: "none" },
              },
              marker: { lineColor: "windowText", fillColor: "windowText" },
            },
            pie: {
              color: "window",
              colors: ["window"],
              borderColor: "windowText",
              borderWidth: 1,
            },
            boxplot: { fillColor: "window" },
            candlestick: { lineColor: "windowText", fillColor: "window" },
            errorbar: { fillColor: "window" },
          },
          legend: {
            backgroundColor: "window",
            itemStyle: { color: "windowText" },
            itemHoverStyle: { color: "windowText" },
            itemHiddenStyle: { color: "#555" },
            title: { style: { color: "windowText" } },
          },
          credits: { style: { color: "windowText" } },
          drilldown: {
            activeAxisLabelStyle: { color: "windowText" },
            activeDataLabelStyle: { color: "windowText" },
          },
          navigation: {
            buttonOptions: {
              symbolStroke: "windowText",
              theme: { fill: "window" },
            },
          },
          rangeSelector: {
            buttonTheme: {
              fill: "window",
              stroke: "windowText",
              style: { color: "windowText" },
              states: {
                hover: {
                  fill: "window",
                  stroke: "windowText",
                  style: { color: "windowText" },
                },
                select: {
                  fill: "#444",
                  stroke: "windowText",
                  style: { color: "windowText" },
                },
              },
            },
            inputBoxBorderColor: "windowText",
            inputStyle: { backgroundColor: "window", color: "windowText" },
            labelStyle: { color: "windowText" },
          },
          navigator: {
            handles: { backgroundColor: "window", borderColor: "windowText" },
            outlineColor: "windowText",
            maskFill: "transparent",
            series: { color: "windowText", lineColor: "windowText" },
            xAxis: { gridLineColor: "windowText" },
          },
          scrollbar: {
            barBackgroundColor: "#444",
            barBorderColor: "windowText",
            buttonArrowColor: "windowText",
            buttonBackgroundColor: "window",
            buttonBorderColor: "windowText",
            rifleColor: "windowText",
            trackBackgroundColor: "window",
            trackBorderColor: "windowText",
          },
        };
      }),
      i(t, "Accessibility/Options/A11yDefaults.js", [], function () {
        return {
          accessibility: {
            enabled: !0,
            screenReaderSection: {
              beforeChartFormat:
                "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
              afterChartFormat: "{endOfChartMarker}",
              axisRangeDateFormat: "%Y-%m-%d %H:%M:%S",
            },
            series: {
              descriptionFormat:
                "{seriesDescription}{authorDescription}{axisDescription}",
              describeSingleSeries: !1,
              pointDescriptionEnabledThreshold: 200,
            },
            point: {
              valueDescriptionFormat: "{xDescription}{separator}{value}.",
              describeNull: !0,
            },
            landmarkVerbosity: "all",
            linkedDescription:
              '*[data-highcharts-chart="{index}"] + .highcharts-description',
            highContrastMode: "auto",
            keyboardNavigation: {
              enabled: !0,
              focusBorder: {
                enabled: !0,
                hideBrowserFocusOutline: !0,
                style: { color: "#334eff", lineWidth: 2, borderRadius: 3 },
                margin: 2,
              },
              order: [
                "series",
                "zoom",
                "rangeSelector",
                "navigator",
                "legend",
                "chartMenu",
              ],
              wrapAround: !0,
              seriesNavigation: {
                skipNullPoints: !0,
                pointNavigationEnabledThreshold: !1,
                rememberPointFocus: !1,
              },
            },
            announceNewData: {
              enabled: !1,
              minAnnounceInterval: 5e3,
              interruptUser: !1,
            },
          },
          legend: {
            accessibility: { enabled: !0, keyboardNavigation: { enabled: !0 } },
          },
          exporting: { accessibility: { enabled: !0 } },
          navigator: { accessibility: { enabled: !0 } },
        };
      }),
      i(t, "Accessibility/Options/LangDefaults.js", [], function () {
        return {
          accessibility: {
            defaultChartTitle: "Chart",
            chartContainerLabel: "{title}. Highcharts interactive chart.",
            svgContainerLabel: "Interactive chart",
            drillUpButton: "{buttonText}",
            credits: "Chart credits: {creditsStr}",
            thousandsSep: ",",
            svgContainerTitle: "",
            graphicContainerLabel: "",
            screenReaderSection: {
              beforeRegionLabel: "",
              afterRegionLabel: "",
              annotations: {
                heading: "Chart annotations summary",
                descriptionSinglePoint:
                  "{annotationText}. Related to {annotationPoint}",
                descriptionMultiplePoints:
                  "{annotationText}. Related to {annotationPoint}{#each additionalAnnotationPoints}, also related to {this}{/each}",
                descriptionNoPoints: "{annotationText}",
              },
              endOfChartMarker: "End of interactive chart.",
            },
            sonification: {
              playAsSoundButtonText: "Play as sound, {chartTitle}",
              playAsSoundClickAnnouncement: "Play",
            },
            legend: {
              legendLabelNoTitle: "Toggle series visibility, {chartTitle}",
              legendLabel: "Chart legend: {legendTitle}",
              legendItem: "Show {itemName}",
            },
            zoom: {
              mapZoomIn: "Zoom chart",
              mapZoomOut: "Zoom out chart",
              resetZoomButton: "Reset zoom",
            },
            rangeSelector: {
              dropdownLabel: "{rangeTitle}",
              minInputLabel: "Select start date.",
              maxInputLabel: "Select end date.",
              clickButtonAnnouncement: "Viewing {axisRangeDescription}",
            },
            navigator: {
              handleLabel:
                "{#eq handleIx 0}Start, percent{else}End, percent{/eq}",
              groupLabel: "Axis zoom",
              changeAnnouncement: "{axisRangeDescription}",
            },
            table: {
              viewAsDataTableButtonText: "View as data table, {chartTitle}",
              tableSummary: "Table representation of chart.",
            },
            announceNewData: {
              newDataAnnounce: "Updated data for chart {chartTitle}",
              newSeriesAnnounceSingle: "New data series: {seriesDesc}",
              newPointAnnounceSingle: "New data point: {pointDesc}",
              newSeriesAnnounceMultiple:
                "New data series in chart {chartTitle}: {seriesDesc}",
              newPointAnnounceMultiple:
                "New data point in chart {chartTitle}: {pointDesc}",
            },
            seriesTypeDescriptions: {
              boxplot:
                "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
              arearange:
                "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
              areasplinerange:
                "These charts are line charts displaying a range between a lower and higher value for each point.",
              bubble:
                "Bubble charts are scatter charts where each data point also has a size value.",
              columnrange:
                "Columnrange charts are column charts displaying a range between a lower and higher value for each point.",
              errorbar:
                "Errorbar series are used to display the variability of the data.",
              funnel:
                "Funnel charts are used to display reduction of data in stages.",
              pyramid:
                "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
              waterfall:
                "A waterfall chart is a column chart where each column contributes towards a total end value.",
            },
            chartTypes: {
              emptyChart: "Empty chart",
              mapTypeDescription:
                "Map of {mapTitle} with {numSeries} data series.",
              unknownMap:
                "Map of unspecified region with {numSeries} data series.",
              combinationChart:
                "Combination chart with {numSeries} data series.",
              defaultSingle:
                "Chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
              defaultMultiple: "Chart with {numSeries} data series.",
              splineSingle:
                "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
              splineMultiple: "Line chart with {numSeries} lines.",
              lineSingle:
                "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
              lineMultiple: "Line chart with {numSeries} lines.",
              columnSingle:
                "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
              columnMultiple: "Bar chart with {numSeries} data series.",
              barSingle:
                "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
              barMultiple: "Bar chart with {numSeries} data series.",
              pieSingle:
                "Pie chart with {numPoints} {#eq numPoints 1}slice{else}slices{/eq}.",
              pieMultiple: "Pie chart with {numSeries} pies.",
              scatterSingle:
                "Scatter chart with {numPoints} {#eq numPoints 1}point{else}points{/eq}.",
              scatterMultiple: "Scatter chart with {numSeries} data series.",
              boxplotSingle:
                "Boxplot with {numPoints} {#eq numPoints 1}box{else}boxes{/eq}.",
              boxplotMultiple: "Boxplot with {numSeries} data series.",
              bubbleSingle:
                "Bubble chart with {numPoints} {#eq numPoints 1}bubbles{else}bubble{/eq}.",
              bubbleMultiple: "Bubble chart with {numSeries} data series.",
            },
            axis: {
              xAxisDescriptionSingular:
                "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
              xAxisDescriptionPlural:
                "The chart has {numAxes} X axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
              yAxisDescriptionSingular:
                "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}",
              yAxisDescriptionPlural:
                "The chart has {numAxes} Y axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
              timeRangeDays: "Data range: {range} days.",
              timeRangeHours: "Data range: {range} hours.",
              timeRangeMinutes: "Data range: {range} minutes.",
              timeRangeSeconds: "Data range: {range} seconds.",
              rangeFromTo: "Data ranges from {rangeFrom} to {rangeTo}.",
              rangeCategories: "Data range: {numCategories} categories.",
            },
            exporting: {
              chartMenuLabel: "Chart menu",
              menuButtonLabel: "View chart menu, {chartTitle}",
            },
            series: {
              summary: {
                default:
                  "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                defaultCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                line: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                lineCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                spline:
                  "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                splineCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                column:
                  "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                columnCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                bar: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                barCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                pie: "{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                pieCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                scatter:
                  "{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                scatterCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                boxplot:
                  "{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                boxplotCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                bubble:
                  "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                bubbleCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                map: "{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                mapCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                mapline:
                  "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                maplineCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                mapbubble:
                  "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                mapbubbleCombination:
                  "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
              },
              description: "{description}",
              xAxisDescription: "X axis, {name}",
              yAxisDescription: "Y axis, {name}",
              nullPointValue: "No value",
              pointAnnotationsDescription:
                "{#each annotations}Annotation: {this}{/each}",
            },
          },
        };
      }),
      i(
        t,
        "Accessibility/Options/DeprecatedOptions.js",
        [t["Core/Utilities.js"]],
        function (e) {
          let { error: t, pick: i } = e;
          function s(e, t, s) {
            let n = e,
              o,
              r = 0;
            for (; r < t.length - 1; ++r) n = n[(o = t[r])] = i(n[o], {});
            n[t[t.length - 1]] = s;
          }
          function n(e, i, n, o) {
            function r(e, t) {
              return t.reduce(function (e, t) {
                return e[t];
              }, e);
            }
            let a = r(e.options, i),
              l = r(e.options, n);
            Object.keys(o).forEach(function (r) {
              let h = a[r];
              void 0 !== h &&
                (s(l, o[r], h),
                t(32, !1, e, {
                  [i.join(".") + "." + r]: n.join(".") + "." + o[r].join("."),
                }));
            });
          }
          return function (e) {
            (function (e) {
              let i = e.options.chart,
                s = e.options.accessibility || {};
              ["description", "typeDescription"].forEach(function (n) {
                i[n] &&
                  ((s[n] = i[n]),
                  t(32, !1, e, { [`chart.${n}`]: `use accessibility.${n}` }));
              });
            })(e),
              (function (e) {
                e.axes.forEach(function (i) {
                  let s = i.options;
                  s &&
                    s.description &&
                    ((s.accessibility = s.accessibility || {}),
                    (s.accessibility.description = s.description),
                    t(32, !1, e, {
                      "axis.description": "use axis.accessibility.description",
                    }));
                });
              })(e),
              e.series &&
                (function (e) {
                  let i = {
                    description: ["accessibility", "description"],
                    exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"],
                    pointDescriptionFormatter: [
                      "accessibility",
                      "point",
                      "descriptionFormatter",
                    ],
                    skipKeyboardNavigation: [
                      "accessibility",
                      "keyboardNavigation",
                      "enabled",
                    ],
                    "accessibility.pointDescriptionFormatter": [
                      "accessibility",
                      "point",
                      "descriptionFormatter",
                    ],
                  };
                  e.series.forEach(function (n) {
                    Object.keys(i).forEach(function (o) {
                      let r = n.options[o];
                      "accessibility.pointDescriptionFormatter" === o &&
                        (r =
                          n.options.accessibility &&
                          n.options.accessibility.pointDescriptionFormatter),
                        void 0 !== r &&
                          (s(
                            n.options,
                            i[o],
                            "skipKeyboardNavigation" === o ? !r : r
                          ),
                          t(32, !1, e, {
                            [`series.${o}`]: "series." + i[o].join("."),
                          }));
                    });
                  });
                })(e),
              n(e, ["accessibility"], ["accessibility"], {
                pointDateFormat: ["point", "dateFormat"],
                pointDateFormatter: ["point", "dateFormatter"],
                pointDescriptionFormatter: ["point", "descriptionFormatter"],
                pointDescriptionThreshold: [
                  "series",
                  "pointDescriptionEnabledThreshold",
                ],
                pointNavigationThreshold: [
                  "keyboardNavigation",
                  "seriesNavigation",
                  "pointNavigationEnabledThreshold",
                ],
                pointValueDecimals: ["point", "valueDecimals"],
                pointValuePrefix: ["point", "valuePrefix"],
                pointValueSuffix: ["point", "valueSuffix"],
                screenReaderSectionFormatter: [
                  "screenReaderSection",
                  "beforeChartFormatter",
                ],
                describeSingleSeries: ["series", "describeSingleSeries"],
                seriesDescriptionFormatter: ["series", "descriptionFormatter"],
                onTableAnchorClick: [
                  "screenReaderSection",
                  "onViewDataTableClick",
                ],
                axisRangeDateFormat: [
                  "screenReaderSection",
                  "axisRangeDateFormat",
                ],
              }),
              n(
                e,
                ["accessibility", "keyboardNavigation"],
                ["accessibility", "keyboardNavigation", "seriesNavigation"],
                { skipNullPoints: ["skipNullPoints"], mode: ["mode"] }
              ),
              n(e, ["lang", "accessibility"], ["lang", "accessibility"], {
                legendItem: ["legend", "legendItem"],
                legendLabel: ["legend", "legendLabel"],
                mapZoomIn: ["zoom", "mapZoomIn"],
                mapZoomOut: ["zoom", "mapZoomOut"],
                resetZoomButton: ["zoom", "resetZoomButton"],
                screenReaderRegionLabel: [
                  "screenReaderSection",
                  "beforeRegionLabel",
                ],
                rangeSelectorButton: ["rangeSelector", "buttonText"],
                rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"],
                rangeSelectorMinInput: ["rangeSelector", "minInputLabel"],
                svgContainerEnd: ["screenReaderSection", "endOfChartMarker"],
                viewAsDataTable: ["table", "viewAsDataTableButtonText"],
                tableSummary: ["table", "tableSummary"],
              });
          };
        }
      ),
      i(
        t,
        "Accessibility/Accessibility.js",
        [
          t["Core/Defaults.js"],
          t["Core/Globals.js"],
          t["Core/Utilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Accessibility/A11yI18n.js"],
          t["Accessibility/Components/ContainerComponent.js"],
          t["Accessibility/FocusBorder.js"],
          t["Accessibility/Components/InfoRegionsComponent.js"],
          t["Accessibility/KeyboardNavigation.js"],
          t["Accessibility/Components/LegendComponent.js"],
          t["Accessibility/Components/MenuComponent.js"],
          t["Accessibility/Components/NavigatorComponent.js"],
          t["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"],
          t["Accessibility/ProxyProvider.js"],
          t["Accessibility/Components/RangeSelectorComponent.js"],
          t["Accessibility/Components/SeriesComponent/SeriesComponent.js"],
          t["Accessibility/Components/ZoomComponent.js"],
          t["Accessibility/HighContrastMode.js"],
          t["Accessibility/HighContrastTheme.js"],
          t["Accessibility/Options/A11yDefaults.js"],
          t["Accessibility/Options/LangDefaults.js"],
          t["Accessibility/Options/DeprecatedOptions.js"],
        ],
        function (
          e,
          t,
          i,
          s,
          n,
          o,
          r,
          a,
          l,
          h,
          c,
          d,
          u,
          p,
          g,
          m,
          b,
          y,
          f,
          x,
          v,
          A
        ) {
          let { defaultOptions: C } = e,
            { doc: w } = t,
            { addEvent: E, extend: T, fireEvent: M, merge: S } = i,
            { removeElement: k } = s;
          class P {
            constructor(e) {
              this.init(e);
            }
            init(e) {
              if (((this.chart = e), !w.addEventListener)) {
                (this.zombie = !0),
                  (this.components = {}),
                  e.renderTo.setAttribute("aria-hidden", !0);
                return;
              }
              A(e),
                (this.proxyProvider = new p(this.chart)),
                this.initComponents(),
                (this.keyboardNavigation = new l(e, this.components));
            }
            initComponents() {
              let e = this.chart,
                t = this.proxyProvider,
                i = e.options.accessibility;
              (this.components = {
                container: new o(),
                infoRegions: new a(),
                legend: new h(),
                chartMenu: new c(),
                rangeSelector: new g(),
                series: new m(),
                zoom: new b(),
                navigator: new d(),
              }),
                i.customComponents && T(this.components, i.customComponents);
              let s = this.components;
              this.getComponentOrder().forEach(function (i) {
                s[i].initBase(e, t), s[i].init();
              });
            }
            getComponentOrder() {
              return this.components
                ? this.components.series
                  ? ["series"].concat(
                      Object.keys(this.components).filter((e) => "series" !== e)
                    )
                  : Object.keys(this.components)
                : [];
            }
            update() {
              let e = this.components,
                t = this.chart,
                i = t.options.accessibility;
              M(t, "beforeA11yUpdate"), (t.types = this.getChartTypes());
              let s = i.keyboardNavigation.order;
              this.proxyProvider.updateGroupOrder(s),
                this.getComponentOrder().forEach(function (i) {
                  e[i].onChartUpdate(),
                    M(t, "afterA11yComponentUpdate", {
                      name: i,
                      component: e[i],
                    });
                }),
                this.keyboardNavigation.update(s),
                !t.highContrastModeActive &&
                  !1 !== i.highContrastMode &&
                  (y.isHighContrastModeActive() || !0 === i.highContrastMode) &&
                  y.setHighContrastTheme(t),
                M(t, "afterA11yUpdate", { accessibility: this });
            }
            destroy() {
              let e = this.chart || {},
                t = this.components;
              Object.keys(t).forEach(function (e) {
                t[e].destroy(), t[e].destroyBase();
              }),
                this.proxyProvider && this.proxyProvider.destroy(),
                e.announcerContainer && k(e.announcerContainer),
                this.keyboardNavigation && this.keyboardNavigation.destroy(),
                e.renderTo && e.renderTo.setAttribute("aria-hidden", !0),
                e.focusElement && e.focusElement.removeFocusBorder();
            }
            getChartTypes() {
              let e = {};
              return (
                this.chart.series.forEach(function (t) {
                  e[t.type] = 1;
                }),
                Object.keys(e)
              );
            }
          }
          return (
            (function (e) {
              function t() {
                this.accessibility && this.accessibility.destroy();
              }
              function i() {
                this.a11yDirty &&
                  this.renderTo &&
                  (delete this.a11yDirty, this.updateA11yEnabled());
                let e = this.accessibility;
                e &&
                  !e.zombie &&
                  (e.proxyProvider.updateProxyElementPositions(),
                  e.getComponentOrder().forEach(function (t) {
                    e.components[t].onChartRender();
                  }));
              }
              function s(e) {
                let t = e.options.accessibility;
                t &&
                  (t.customComponents &&
                    ((this.options.accessibility.customComponents =
                      t.customComponents),
                    delete t.customComponents),
                  S(!0, this.options.accessibility, t),
                  this.accessibility &&
                    this.accessibility.destroy &&
                    (this.accessibility.destroy(), delete this.accessibility)),
                  (this.a11yDirty = !0);
              }
              function o() {
                let t = this.accessibility,
                  i = this.options.accessibility;
                i && i.enabled
                  ? t && !t.zombie
                    ? t.update()
                    : ((this.accessibility = t = new e(this)),
                      t && !t.zombie && t.update())
                  : t
                  ? (t.destroy && t.destroy(), delete this.accessibility)
                  : this.renderTo.setAttribute("aria-hidden", !0);
              }
              function a() {
                this.series.chart.accessibility &&
                  (this.series.chart.a11yDirty = !0);
              }
              (e.i18nFormat = n.i18nFormat),
                (e.compose = function (e, d, p, b, y, f) {
                  l.compose(e),
                    u.compose(b),
                    h.compose(e, d),
                    c.compose(e),
                    m.compose(e, p, b),
                    n.compose(e),
                    r.compose(e, y),
                    f && g.compose(e, f);
                  let x = e.prototype;
                  x.updateA11yEnabled ||
                    ((x.updateA11yEnabled = o),
                    E(e, "destroy", t),
                    E(e, "render", i),
                    E(e, "update", s),
                    ["addSeries", "init"].forEach((t) => {
                      E(e, t, function () {
                        this.a11yDirty = !0;
                      });
                    }),
                    ["afterApplyDrilldown", "drillupall"].forEach((t) => {
                      E(e, t, function () {
                        let e = this.accessibility;
                        e && !e.zombie && e.update();
                      });
                    }),
                    E(p, "update", a),
                    ["update", "updatedData", "remove"].forEach((e) => {
                      E(b, e, function () {
                        this.chart.accessibility && (this.chart.a11yDirty = !0);
                      });
                    }));
                });
            })(P || (P = {})),
            S(!0, C, x, { accessibility: { highContrastTheme: f }, lang: v }),
            P
          );
        }
      ),
      i(
        t,
        "masters/modules/accessibility.src.js",
        [
          t["Core/Globals.js"],
          t["Accessibility/Accessibility.js"],
          t["Accessibility/AccessibilityComponent.js"],
          t["Accessibility/Utils/ChartUtilities.js"],
          t["Accessibility/Utils/HTMLUtilities.js"],
          t["Accessibility/KeyboardNavigationHandler.js"],
          t["Accessibility/Components/SeriesComponent/SeriesDescriber.js"],
        ],
        function (e, t, i, s, n, o, r) {
          return (
            (e.i18nFormat = t.i18nFormat),
            (e.A11yChartUtilities = s),
            (e.A11yHTMLUtilities = n),
            (e.AccessibilityComponent = i),
            (e.KeyboardNavigationHandler = o),
            (e.SeriesAccessibilityDescriber = r),
            t.compose(
              e.Chart,
              e.Legend,
              e.Point,
              e.Series,
              e.SVGElement,
              e.RangeSelector
            ),
            e
          );
        }
      );
  })
);
