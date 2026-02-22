var v1 = Object.defineProperty;
var w1 = (n, i, r) => i in n ? v1(n, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[i] = r;
var S = (n, i, r) => (w1(n, typeof i != "symbol" ? i + "" : i, r), r);
import { openBlock as k, createElementBlock as I, createElementVNode as T, inject as xe, resolveComponent as wt, Fragment as oe, renderList as ve, normalizeStyle as se, createVNode as At, normalizeClass as Re, createTextVNode as Dt, toDisplayString as q, defineComponent as An, createCommentVNode as de, createBlock as lo, ref as Ce, reactive as _e, computed as ro, createApp as $t, provide as ke, h as zt } from "vue";
function _1(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function b1(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    })
  ]);
}
function x1(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function uo(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 4.5v15m7.5-7.5h-15"
    })
  ]);
}
function y1(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    })
  ]);
}
function hu(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const E1 = {
  components: {
    PlusIcon: uo
  },
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    lastRender: 0,
    hovered: {
      type: "",
      i: -1
    }
  }),
  created() {
  },
  async mounted() {
    await this.update();
  },
  methods: {
    async update() {
      const n = performance.now();
      if (this.lastRender > n - 100 || this.state.bids.length === 0 && this.state.asks.length === 0)
        return;
      const i = {
        askPrice: [],
        askQty: [],
        askTotal: [],
        bidPrice: [],
        bidQty: [],
        bidTotal: []
      };
      let r = [], o = [], l = 0;
      for (let d = 0; d < this.state.bids.length; d++) {
        const { price: v, qty: w } = this.state.bids[d];
        l += w, o.push(w), i.bidPrice.push(
          `<li>${v.toFixed(this.state.pricePrecision)}</li>`
        ), i.bidQty.push(`<li>${w.toFixed(this.state.qtyPrecision)}</li>`), i.bidTotal.push(
          `<li>${l.toFixed(this.state.qtyPrecision)}</li>`
        );
      }
      let a = 0;
      for (let d = 0; d < this.state.asks.length; d++) {
        const { price: v, qty: w } = this.state.asks[d];
        a += w, r.push(w), i.askPrice.push(
          `<li>${v.toFixed(this.state.pricePrecision)}</li>`
        ), i.askQty.push(`<li>${w.toFixed(this.state.qtyPrecision)}</li>`), i.askTotal.push(
          `<li>${a.toFixed(this.state.qtyPrecision)}</li>`
        );
      }
      i.askPrice.reverse(), i.askQty.reverse(), i.askTotal.reverse();
      for (const d in i) {
        const v = this.$refs[d];
        v && (v.innerHTML = i[d].join(""));
      }
      const c = Math.max(...r, ...o), h = this.$refs.askQtyViz, p = this.$refs.bidQtyViz;
      for (let d = 0; d < r.length; d++) {
        const v = r[r.length - d - 1], w = o[d];
        h && (h.children[d].style.width = `${v / c * 100}%`), p && (p.children[d].style.width = `${w / c * 100}%`);
      }
      this.lastRender === 0 && this.onFirstRender(), this.lastRender = performance.now();
    },
    async onFirstRender() {
      setTimeout(() => {
        const n = this.$refs.asks;
        n && (n.scrollTop = n.scrollHeight);
        const i = this.$refs.bids;
        i && (i.scrollTop = 0);
      }, 100);
    }
  },
  watch: {
    "state.asks"() {
      this.update();
    },
    "state.bids"() {
      this.update();
    }
  }
}, S1 = `.asks li,.bids li,.bid-or-ask-bg-color{height:1.5rem}
`, ze = (n, i) => {
  const r = n.__vccOpts || n;
  for (const [o, l] of i)
    r[o] = l;
  return r;
}, T1 = { class: "flex flex-col h-full bg-[#171717] text-gray-200" }, M1 = {
  ref: "asks",
  class: "asks relative flex gap-2 grow overflow-y-auto border border-black"
}, C1 = {
  key: 0,
  class: "flex items-center justify-center w-full text-gray-400"
}, P1 = { class: "relative pointer-events-none z-[1] h-full shrink-0 mr-2" }, A1 = { class: "relative pointer-events-none z-[1] h-full grow text-down-500" }, R1 = {
  ref: "askPrice",
  class: "w-min mr-auto"
}, k1 = { class: "relative pointer-events-none z-[1] h-full grow" }, B1 = {
  ref: "askQty",
  class: "w-min text-right"
}, I1 = { class: "relative pointer-events-none z-[1] h-full grow" }, L1 = {
  ref: "askTotal",
  class: "w-min text-right"
}, N1 = { class: "absolute top-0 right-0 h-full w-6/12 pointer-events-none" }, O1 = { ref: "askQtyViz" }, D1 = { class: "absolute top-0 left-0 h-full w-full" }, F1 = ["onMouseenter"], $1 = {
  ref: "bids",
  class: "bids relative flex gap-2 grow overflow-y-auto border border-black"
}, z1 = {
  key: 0,
  class: "flex items-center justify-center w-full text-gray-400"
}, U1 = { class: "relative pointer-events-none z-[1] h-full shrink-0 mr-2" }, V1 = { class: "relative pointer-events-none z-[1] h-full grow" }, H1 = {
  ref: "bidPrice",
  class: "w-min mr-auto text-up-500 opacity-80"
}, W1 = { class: "relative pointer-events-none z-[1] h-full grow" }, q1 = {
  ref: "bidQty",
  class: "w-min text-right"
}, Y1 = { class: "relative pointer-events-none z-[1] h-full grow" }, G1 = {
  ref: "bidTotal",
  class: "w-min text-right"
}, Q1 = { class: "absolute top-0 right-0 h-full w-6/12 pointer-events-none" }, K1 = { ref: "bidQtyViz" }, X1 = { class: "absolute top-0 left-0 h-full w-full" }, Z1 = ["onMouseenter"];
function J1(n, i, r, o, l, a) {
  const c = wt("PlusIcon");
  return k(), I("div", T1, [
    T("div", M1, [
      o.state.asks.length ? (k(), I(oe, { key: 1 }, [
        T("div", P1, [
          T("ul", null, [
            (k(!0), I(oe, null, ve(o.state.asks.length, (h) => (k(), I("li", { key: h }, [...i[2] || (i[2] = [
              T("div", { class: "h-4 w-4" }, null, -1)
            ])]))), 128))
          ])
        ]),
        T("div", A1, [
          T("ul", R1, null, 512)
        ]),
        T("div", k1, [
          T("ul", B1, null, 512)
        ]),
        T("div", I1, [
          T("ul", L1, null, 512)
        ]),
        T("div", N1, [
          T("ul", O1, [
            (k(!0), I(oe, null, ve(o.state.bids.length, (h) => (k(), I("li", {
              key: h,
              class: "bid-or-ask-bg-color bg-down-950 z-0 ml-auto"
            }))), 128))
          ], 512)
        ]),
        T("div", D1, [
          (k(!0), I(oe, null, ve(o.state.asks.length, (h) => (k(), I("div", {
            key: h,
            class: "bid-or-ask-bg-color bg-down-950 border border-down-500 w-full z-0",
            style: se({
              opacity: n.hovered.type === "ASK" && n.hovered.i === h ? 1 : 0
            }),
            onMouseenter: (p) => n.hovered = { type: "ASK", i: h },
            onMouseleave: i[0] || (i[0] = (p) => n.hovered = { type: "", i: -1 })
          }, [
            T("button", {
              class: "button-scale-in w-full h-full ml-1",
              style: se({
                opacity: n.hovered.type === "ASK" && n.hovered.i === h ? 1 : 0
              })
            }, [
              At(c, { class: "text-down-600 border border-down-600 w-4 h-4" })
            ], 4)
          ], 44, F1))), 128))
        ])
      ], 64)) : (k(), I("div", C1, " No asks. "))
    ], 512),
    T("div", {
      class: Re(["shrink-0 text-center p-2 text-xl border", {
        "text-up-500 border-up-500": o.state.lastTrade && o.state.lastTrade.side === "BUY",
        "text-down-500 border-down-500": o.state.lastTrade && o.state.lastTrade.side === "SELL"
      }])
    }, [
      o.state.lastTrade ? (k(), I(oe, { key: 1 }, [
        Dt(q(o.state.lastTrade.price.toFixed(o.state.pricePrecision)), 1)
      ], 64)) : (k(), I(oe, { key: 0 }, [
        Dt("No Activity")
      ], 64))
    ], 2),
    T("div", $1, [
      o.state.bids.length ? (k(), I(oe, { key: 1 }, [
        T("div", U1, [
          T("ul", null, [
            (k(!0), I(oe, null, ve(o.state.bids.length, (h) => (k(), I("li", { key: h }, [...i[3] || (i[3] = [
              T("div", { class: "h-4 w-4" }, null, -1)
            ])]))), 128))
          ])
        ]),
        T("div", V1, [
          T("ul", H1, null, 512)
        ]),
        T("div", W1, [
          T("ul", q1, null, 512)
        ]),
        T("div", Y1, [
          T("ul", G1, null, 512)
        ]),
        T("div", Q1, [
          T("ul", K1, [
            (k(!0), I(oe, null, ve(o.state.bids.length, (h) => (k(), I("li", {
              key: h,
              class: "bid-or-ask-bg-color bg-up-950 z-0 ml-auto"
            }))), 128))
          ], 512)
        ]),
        T("div", X1, [
          (k(!0), I(oe, null, ve(o.state.bids.length, (h) => (k(), I("div", {
            key: h,
            class: "bid-or-ask-bg-color bg-up-950 border border-up-500 w-full z-0",
            style: se({
              opacity: n.hovered.type === "BID" && n.hovered.i === h ? 1 : 0
            }),
            onMouseenter: (p) => n.hovered = { type: "BID", i: h },
            onMouseleave: i[1] || (i[1] = (p) => n.hovered = { type: "", i: -1 })
          }, [
            T("button", {
              class: "button-scale-in w-full h-full ml-1",
              style: se({
                opacity: n.hovered.type === "BID" && n.hovered.i === h ? 1 : 0
              })
            }, [
              At(c, { class: "text-up-600 border border-up-600 w-4 h-4" })
            ], 4)
          ], 44, Z1))), 128))
        ])
      ], 64)) : (k(), I("div", z1, " No bids. "))
    ], 512)
  ]);
}
const Yl = /* @__PURE__ */ ze(E1, [["render", J1], ["styles", [S1]]]), j1 = An({
  components: {
    XMarkIcon: hu
  },
  props: {
    ordersMap: {
      type: Object,
      required: !0
    },
    minPrice: {
      type: Number,
      required: !0
    },
    maxPrice: {
      type: Number,
      required: !0
    },
    increment: {
      type: Number,
      required: !0
    },
    side: {
      type: String,
      required: !0
    },
    onDecreaseSize: {
      type: Function,
      required: !0
    }
  },
  setup() {
    return {
      state: xe("state"),
      settings: xe("settings")
    };
  },
  data: () => ({
    priceRange: []
  }),
  methods: {
    async syncPriceRange() {
      this.priceRange = [], await this.$nextTick();
      const n = [];
      for (let i = this.maxPrice; i >= this.minPrice; i -= this.settings.grouping)
        n.push(i);
      this.priceRange = n;
    }
  },
  watch: {
    minPrice() {
      this.syncPriceRange();
    },
    maxPrice() {
      this.syncPriceRange();
    }
  }
}), em = `button:disabled{opacity:.5;cursor:not-allowed}
`, tm = {
  key: 0,
  class: "relative"
}, nm = ["onClick", "disabled"];
function rm(n, i, r, o, l, a) {
  const c = wt("XMarkIcon");
  return n.priceRange.length ? (k(), I("ul", tm, [
    (k(!0), I(oe, null, ve(n.priceRange, (h) => (k(), I("li", {
      key: h,
      class: "w-full viper__dom-row"
    }, [
      n.ordersMap[h] ? (k(), I("div", {
        key: 0,
        class: Re(["flex items-center justify-end w-full gap-1 text-white", {
          "flex-row-reverse": n.side === "ASK"
        }])
      }, [
        T("span", null, q(n.ordersMap[h].qty.toFixed(n.state.qtyPrecision)), 1),
        T("button", {
          onClick: () => n.onDecreaseSize({
            side: n.side,
            price: h / n.increment,
            qty: n.ordersMap[h].qty
          }),
          disabled: n.ordersMap[h].orders.some((p) => p.isCancelling),
          class: Re(["text-gray-50", {
            "bg-up-700": n.side === "BID",
            "bg-down-700": n.side === "ASK"
          }])
        }, [
          At(c, { class: "w-4 h-4" })
        ], 10, nm)
      ], 2)) : de("", !0)
    ]))), 128))
  ])) : de("", !0);
}
const im = /* @__PURE__ */ ze(j1, [["render", rm], ["styles", [em]]]), sm = 16, om = 5, am = {
  components: {
    PlusIcon: uo,
    DOMOrders: im
  },
  props: {
    onPlaceOrders: {
      type: Function,
      required: !0
    },
    onDecreaseSize: {
      type: Function,
      required: !0
    }
  },
  setup() {
    const n = xe("state"), i = xe("settings"), r = xe("shadowRoot");
    return {
      state: n,
      settings: i,
      shadowRoot: r,
      id: "_" + Math.random().toString(36).substr(2, 9),
      styleTag: document.createElement("style")
    };
  },
  data: () => ({
    lastRender: 0,
    selected: {
      type: "",
      startPrice: null,
      endPrice: null,
      isDragging: !1
    },
    prices: [],
    volumeProfile: {},
    allExecutedTrades: [],
    lastTradedBids: {},
    lastTradedAsks: {},
    centerPrice: null,
    containerHeight: 0,
    _scrollDelta: 0,
    resizeObserver: null,
    _updateInterval: null,
    _interval: null
  }),
  computed: {
    ordersMap() {
      const n = {
        BID: {},
        ASK: {}
      };
      for (const i of this.state.orders) {
        const o = `${this.getPrice(i.price)}`;
        n[i.side][o] || (n[i.side][o] = {
          qty: 0,
          orders: []
        }), n[i.side][o].qty += i.qty, n[i.side][o].orders.push(i);
      }
      return n;
    },
    /**
     * Increment of the price level grouping
     */
    increment() {
      return Math.pow(10, this.state.pricePrecision);
    },
    maxDepth() {
      return Math.ceil(this.containerHeight / sm / 2);
    },
    pixelsPerRow() {
      return +(this.containerHeight / (this.maxDepth * 2)).toFixed(2);
    },
    pricePrecision() {
      let { pricePrecision: n } = this.state;
      return this.settings.grouping.toString().endsWith("5") && (n += 1), n;
    },
    selectedPrices() {
      const { startPrice: n, endPrice: i } = this.selected;
      if (n === null || i === null)
        return [];
      const { grouping: r } = this.settings;
      return n < i ? Array.from(
        { length: Math.abs(i - n) / r + 1 },
        (o, l) => n + l * r
      ) : Array.from(
        { length: Math.abs(i - n) / r + 1 },
        (o, l) => n - l * r
      );
    },
    activePositionTop() {
      const { activePosition: n } = this.state;
      return n ? this.prices.indexOf(this.getPrice(n.price).toString()) * this.pixelsPerRow : -1;
    },
    maxExecutedVolume() {
      let n = 0;
      for (const i of this.prices) {
        const r = this.volumeProfile[i];
        r && (n = Math.max(n, r.bidQty, r.askQty));
      }
      return n;
    }
  },
  async mounted() {
    this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.$refs.domContainer), await this.update(), window.addEventListener("keydown", this.onKeyDown), (this.shadowRoot ?? document.head).appendChild(this.styleTag), this._updateInterval = setInterval(this.update.bind(this), 33), this._interval = setInterval(() => {
      this.resyncVolumeProfile();
      const i = performance.now();
      for (const r in this.lastTradedBids)
        i - this.lastTradedBids[r] > 1e3 && delete this.lastTradedBids[r];
      for (const r in this.lastTradedAsks)
        i - this.lastTradedAsks[r] > 1e3 && delete this.lastTradedAsks[r];
    }, 5e3);
  },
  beforeDestroy() {
    var i;
    (i = this.resizeObserver) == null || i.disconnect(), window.removeEventListener("keydown", this.onKeyDown), (this.shadowRoot ?? document.head).removeChild(this.styleTag), clearInterval(this._interval), clearInterval(this._updateInterval);
  },
  methods: {
    onKeyDown(n) {
      n.key === "Escape" && this.selected.isDragging && (this.selected.isDragging = !1, this.clearSelectedRow());
    },
    onWheel(n) {
      if (!n.deltaY)
        return;
      n.preventDefault();
      const i = Math.ceil(Math.abs(n.deltaY) / om);
      let r = 0;
      n.deltaY < 0 ? r = Math.max(this.maxDepth - 2 - i, 0) : r = Math.min(this.maxDepth + i, this.prices.length - 1), this.state.centerPrice = +this.prices[r] / this.increment;
    },
    getPrice(n) {
      let i = Math.round(n * this.increment);
      return this.settings.grouping > 1 && (i -= i % this.settings.grouping), i;
    },
    generatePriceMap() {
      var a, c;
      const { pricePrecision: n } = this.state, { grouping: i } = this.settings;
      let r = 0;
      if (this.centerPrice)
        r = this.centerPrice;
      else if (this.state.centerPrice)
        r = this.getPrice(this.state.centerPrice);
      else {
        let h = this.getPrice((a = this.state.bids[0]) == null ? void 0 : a.price), p = this.getPrice((c = this.state.asks[0]) == null ? void 0 : c.price);
        const d = isNaN(h), v = isNaN(p);
        if (d && v)
          return null;
        if (v) {
          const w = 1 / Math.pow(10, n);
          p = +this.toFixed(h - w, n);
        } else if (d) {
          const w = 1 / Math.pow(10, n);
          h = +this.toFixed(p + w, n);
        }
        r = Math.round(h + (p - h) / 2), i > 1 && (r -= r % i);
      }
      let o = {};
      const { maxDepth: l } = this;
      for (let h = r - l * i; h < r + l * i; h += i)
        o[h] = {
          bidQty: 0,
          askQty: 0
        };
      return o;
    },
    async update() {
      if (!this.settings.autoscroll && !this.state.centerPrice && (this.state.centerPrice = +this.prices[this.maxDepth] / this.increment), this.state.bids.length === 0 && this.state.asks.length === 0)
        return;
      const n = this.generatePriceMap();
      if (!n)
        return;
      const i = (a) => n[this.getPrice(a.price)];
      this.state.bids.forEach((a) => {
        const c = i(a);
        c && (c.bidQty += a.qty);
      }), this.state.asks.forEach((a) => {
        const c = i(a);
        c && (c.askQty += a.qty);
      });
      const r = {
        bidQty: [],
        bidQtyViz: [],
        price: [],
        askQty: [],
        askQtyViz: []
      };
      let o = 0;
      for (const a in n) {
        const { bidQty: c, askQty: h } = n[a];
        o = Math.max(o, c, h);
      }
      const l = Object.keys(n).sort((a, c) => +c - +a);
      for (let a = 0; a < l.length; a++) {
        const c = l[a], { bidQty: h, askQty: p } = n[c], d = this.lastTradedBids[c], v = this.lastTradedAsks[c];
        r.bidQty.push(
          `<li
            class="px-1 border-b viper__dom-row border-up-900"
            data-index="${a}"
            data-type="BID"
            style="
            ${d ? `
              animation: viper__trade-executed-buy 300ms linear;
              animation-delay: -${performance.now() - d}ms;` : ""}"
          >
            ${h > 0 ? this.toFixed(h, this.state.qtyPrecision) : ""}
          </li>`
        ), o > 0 && r.bidQtyViz.push(
          `<li
            class="ml-auto viper__dom-row bg-up-900"
            style="width:${h / o * 100}%"
          ></li>`
        ), r.price.push(
          `<li
            class="border-b viper__dom-row border-zinc-700"
            style="padding:0.01rem 0.25rem;font-size: 0.7rem;"
          >
            ${this.toFixed(
            +c / Math.pow(10, this.state.pricePrecision),
            this.pricePrecision
          )}
          </li>`
        ), r.askQty.push(
          `<li
            class="px-1 border-b viper__dom-row border-down-900"
            data-index="${a}"
            data-type="ASK"
            style="
            ${v ? `
              animation: viper__trade-executed-sell 300ms linear;
              animation-delay: -${performance.now() - v}ms;` : ""}
            "
          >
            ${p > 0 ? this.toFixed(p, this.state.qtyPrecision) : ""}
          </li>`
        ), o > 0 && r.askQtyViz.push(
          `<li
            class="viper__dom-row bg-down-9000"
            style="width:${p / o * 100}%"
          ></li>`
        );
      }
      this.prices = l;
      for (const a in r) {
        if (["myBids", "myAsks"].includes(a)) {
          if (r[a].join("") === this.computedHtml[a].join(""))
            continue;
          this.computedHtml[a] = r[a];
        }
        const c = this.$refs[a];
        c && (c.innerHTML = r[a].join(""));
      }
      this.styleTag.textContent = `
        #${this.id} .viper__dom-row {
          height: ${this.pixelsPerRow}px;
        }
      `, this.lastRender === 0 && this.onFirstRender(), this.lastRender = performance.now();
    },
    async onFirstRender() {
      setTimeout(this.onResize, 100);
    },
    onResize() {
      const n = this.$refs.domContainer;
      n && (this.containerHeight = n.clientHeight);
    },
    recenter() {
      this.state.centerPrice = void 0;
    },
    newTrade(n) {
      const i = this.getPrice(n.price);
      n.side === "BUY" ? this.lastTradedBids[i] = performance.now() : this.lastTradedAsks[i] = performance.now(), this.settings.enableVolumeProfile !== !1 && (this.allExecutedTrades.unshift(n), this.allExecutedTrades.length > 1e4 && this.allExecutedTrades.pop(), this.volumeProfile[i] || (this.volumeProfile[i] = {
        bidQty: 0,
        askQty: 0
      }), n.side === "BUY" ? this.volumeProfile[i].bidQty += Math.abs(n.qty) : this.volumeProfile[i].askQty += Math.abs(n.qty));
    },
    resyncVolumeProfile() {
      const n = {};
      if (this.settings.enableVolumeProfile !== !1)
        for (const i of this.allExecutedTrades) {
          const { filterOutVolumeOlderThanSeconds: r } = this.settings, o = r ? Date.now() - r * 1e3 : 0;
          if (i.time < o)
            break;
          const l = this.getPrice(+i.price);
          n[l] || (n[l] = {
            bidQty: 0,
            askQty: 0
          }), i.side === "BUY" ? n[l].bidQty += Math.abs(i.qty) : n[l].askQty += Math.abs(i.qty);
        }
      this.volumeProfile = n;
    },
    setSelectedPrice(n, i) {
      this.settings.enableTrading !== !1 && (this.selected.isDragging ? this.selected.endPrice = i : (this.selected.type = n, this.selected.startPrice = i, this.selected.endPrice = i));
    },
    clearSelectedRow() {
      this.selected.isDragging || (this.selected.startPrice = this.selected.endPrice, this.centerPrice = null);
    },
    onMouseDownRow(n, i) {
      this.settings.enableTrading !== !1 && (this.setSelectedPrice(n, i), this.centerPrice = +this.prices[this.maxDepth - 1], this.selected.isDragging = !0);
    },
    onMouseUpRow() {
      if (!this.selected.isDragging || (this.selected.isDragging = !1, this.settings.enableTrading === !1))
        return;
      const n = [];
      for (const i of this.selectedPrices) {
        const r = +i / this.increment;
        let o = this.selected.type;
        if (o === "" || !r)
          return;
        let l = "LIMIT";
        (o === "BID" && +r >= +this.state.asks[0].price || o === "ASK" && +r <= +this.state.bids[0].price) && (l = "MARKET"), n.push({
          type: l,
          side: o === "BID" ? "BUY" : "SELL",
          price: +r
        });
      }
      this.onPlaceOrders(n), this.clearSelectedRow();
    },
    resetVolumeProfile() {
      this.allExecutedTrades = [], this.resyncVolumeProfile();
    },
    toFixed(n, i) {
      if (i >= 0)
        return n.toFixed(i);
      {
        const r = Math.pow(10, -i);
        return Math.floor(n / r) * r;
      }
    }
  },
  watch: {
    "settings.enableVolumeProfile"() {
      this.resetVolumeProfile();
    },
    "settings.autoscroll"() {
      this.settings.autoscroll || (this.state.centerPrice = void 0);
    }
  }
}, lm = `.viper__dom-row{width:100%}.viper__dom-row>button{width:1rem;--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1));font-weight:700}.viper__dom-row>button[data-action=cancel]{--tw-bg-opacity: 1;background-color:rgb(220 38 38 / var(--tw-bg-opacity, 1))}@keyframes viper__trade-executed-buy{0%{background-color:#6da602;color:#000}to{background-color:transparent;color:unset}}@keyframes viper__trade-executed-sell{0%{background-color:#c32648;color:#000}to{background-color:transparent;color:unset}}
`, um = ["id"], cm = {
  ref: "dom",
  class: "relative overflow-y-hidden text-xs grow"
}, hm = { class: "flex text-gray-200" }, fm = { class: "relative w-[6rem] shrink-0" }, dm = {
  ref: "bidQty",
  class: "relative flex flex-col text-right text-up-500 z-[2] pointer-events-none border-l border-up-900"
}, pm = { class: "absolute top-0 right-0 h-full w-11/12 z-[1] pointer-events-none" }, gm = {
  ref: "bidQtyViz",
  class: "flex flex-col"
}, mm = { class: "absolute top-0 h-full w-full z-[0]" }, vm = ["onMouseenter", "onMousedown"], wm = { class: "text-center shrink-0" }, _m = {
  ref: "price",
  class: "border-x border-zinc-700"
}, bm = {
  ref: "askQty",
  class: "relative grow text-left text-down-500 z-[2] pointer-events-none border-r border-down-900"
}, xm = { class: "absolute top-0 h-full w-11/12 z-[1] pointer-events-none" }, ym = { ref: "askQtyViz" }, Em = { class: "absolute top-0 h-full w-full z-[0]" }, Sm = ["onMouseenter", "onMousedown"], Tm = { class: "relative w-[6rem] shrink-0" }, Mm = {
  key: 0,
  class: "relative w-[3rem]"
}, Cm = { class: "relative text-right text-up-500 z-[2] pointer-events-none border-l border-gray-800" }, Pm = { class: "px-1 border-b border-gray-800 viper__dom-row" }, Am = { class: "absolute top-0 right-0 h-full w-11/12 z-[1] pointer-events-none" }, Rm = { class: "viper__dom-row" }, km = {
  key: 1,
  class: "relative w-[3rem]"
}, Bm = { class: "relative text-right text-down-500 z-[2] pointer-events-none border-r border-gray-800" }, Im = { class: "px-1 border-b border-gray-800 viper__dom-row" }, Lm = { class: "absolute top-0 left-0 h-full w-11/12 z-[1] pointer-events-none" }, Nm = { class: "viper__dom-row" };
function Om(n, i, r, o, l, a) {
  const c = wt("DOMOrders");
  return k(), I("div", {
    id: o.id,
    ref: "domContainer",
    class: "flex flex-col h-full bg-[#171717]",
    onWheel: i[6] || (i[6] = (...h) => a.onWheel && a.onWheel(...h))
  }, [
    T("div", cm, [
      T("div", hm, [
        T("div", fm, [
          At(c, {
            ordersMap: a.ordersMap.BID,
            minPrice: +n.prices[n.prices.length - 1],
            maxPrice: +n.prices[0],
            side: "BID",
            increment: a.increment,
            onDecreaseSize: r.onDecreaseSize
          }, null, 8, ["ordersMap", "minPrice", "maxPrice", "increment", "onDecreaseSize"])
        ]),
        T("div", {
          class: Re(["relative w-[3rem] shrink-0", {
            "cursor-pointer": o.settings.enableTrading !== !1
          }])
        }, [
          T("ul", dm, null, 512),
          T("div", pm, [
            T("ul", gm, null, 512)
          ]),
          T("div", mm, [
            T("ul", {
              onMouseleave: i[2] || (i[2] = () => {
                n.selected.isDragging = !1, a.clearSelectedRow();
              })
            }, [
              (k(!0), I(oe, null, ve(n.prices, (h) => (k(), I("li", {
                key: h,
                style: se({
                  opacity: n.selected.type === "BID" && a.selectedPrices.includes(+h) ? 1 : 0
                }),
                onMouseenter: (p) => a.setSelectedPrice("BID", +h),
                onMouseleave: i[0] || (i[0] = (...p) => a.clearSelectedRow && a.clearSelectedRow(...p)),
                onMousedown: (p) => a.onMouseDownRow("BID", +h),
                onMouseup: i[1] || (i[1] = (...p) => a.onMouseUpRow && a.onMouseUpRow(...p)),
                class: "w-full viper__dom-row bg-up-950"
              }, null, 44, vm))), 128))
            ], 32)
          ])
        ], 2),
        T("div", wm, [
          T("ul", _m, null, 512)
        ]),
        T("div", {
          class: Re(["relative w-[3rem] shrink-0", {
            "cursor-pointer": o.settings.enableTrading !== !1
          }])
        }, [
          T("ul", bm, null, 512),
          T("div", xm, [
            T("ul", ym, null, 512)
          ]),
          T("div", Em, [
            T("ul", {
              onMouseleave: i[5] || (i[5] = () => {
                n.selected.isDragging = !1, a.clearSelectedRow();
              })
            }, [
              (k(!0), I(oe, null, ve(n.prices, (h) => (k(), I("li", {
                key: h,
                style: se({
                  opacity: n.selected.type === "ASK" && a.selectedPrices.includes(+h) ? 1 : 0
                }),
                onMouseenter: (p) => a.setSelectedPrice("ASK", +h),
                onMouseleave: i[3] || (i[3] = (...p) => a.clearSelectedRow && a.clearSelectedRow(...p)),
                onMousedown: (p) => a.onMouseDownRow("ASK", +h),
                onMouseup: i[4] || (i[4] = (...p) => a.onMouseUpRow && a.onMouseUpRow(...p)),
                class: "w-full viper__dom-row bg-down-950"
              }, null, 44, Sm))), 128))
            ], 32)
          ])
        ], 2),
        T("div", Tm, [
          At(c, {
            ordersMap: a.ordersMap.ASK,
            minPrice: +n.prices[n.prices.length - 1],
            maxPrice: +n.prices[0],
            side: "ASK",
            increment: a.increment,
            onDecreaseSize: r.onDecreaseSize
          }, null, 8, ["ordersMap", "minPrice", "maxPrice", "increment", "onDecreaseSize"])
        ]),
        o.settings.enableVolumeProfile !== !1 ? (k(), I("div", Mm, [
          T("ul", Cm, [
            (k(!0), I(oe, null, ve(n.prices, (h) => {
              var p;
              return k(), I("li", Pm, [
                (p = n.volumeProfile[h]) != null && p.bidQty ? (k(), I(oe, { key: 0 }, [
                  Dt(q(n.volumeProfile[h].bidQty.toFixed(o.state.qtyPrecision)), 1)
                ], 64)) : de("", !0)
              ]);
            }), 256))
          ]),
          T("div", Am, [
            T("ul", null, [
              (k(!0), I(oe, null, ve(n.prices, (h) => (k(), I("li", Rm, [
                n.volumeProfile[h] ? (k(), I("div", {
                  key: 0,
                  class: "h-full ml-auto bg-up-900",
                  style: se(`width:${n.volumeProfile[h].bidQty / a.maxExecutedVolume * 100}%`)
                }, null, 4)) : de("", !0)
              ]))), 256))
            ])
          ])
        ])) : de("", !0),
        o.settings.enableVolumeProfile !== !1 ? (k(), I("div", km, [
          T("ul", Bm, [
            (k(!0), I(oe, null, ve(n.prices, (h) => {
              var p;
              return k(), I("li", Im, [
                (p = n.volumeProfile[h]) != null && p.askQty ? (k(), I(oe, { key: 0 }, [
                  Dt(q(n.volumeProfile[h].askQty.toFixed(o.state.qtyPrecision)), 1)
                ], 64)) : de("", !0)
              ]);
            }), 256))
          ]),
          T("div", Lm, [
            T("ul", null, [
              (k(!0), I(oe, null, ve(n.prices, (h) => (k(), I("li", Nm, [
                n.volumeProfile[h] ? (k(), I("div", {
                  key: 0,
                  class: "h-full bg-down-900",
                  style: se(`width:${n.volumeProfile[h].askQty / a.maxExecutedVolume * 100}%`)
                }, null, 4)) : de("", !0)
              ]))), 256))
            ])
          ])
        ])) : de("", !0)
      ]),
      o.state.activePosition && a.activePositionTop !== -1 ? (k(), I("div", {
        key: 0,
        class: Re(["absolute h-4 border-solid pointer-events-none select-none", {
          "border-up-800": o.state.activePosition.qty >= 0,
          "border-down-800": o.state.activePosition.qty < 0
        }]),
        style: se([{ left: "0%", width: "100%", "border-width": "2px", "z-index": "2" }, `
            top: ${a.activePositionTop}px;
          `])
      }, null, 6)) : de("", !0)
    ], 512)
  ], 40, um);
}
const Gl = /* @__PURE__ */ ze(am, [["render", Om], ["styles", [lm]]]), Dm = {
  components: {
    ChevronDownIcon: _1
  },
  props: {
    trade: {
      type: Object,
      required: !0
    },
    prevTrade: {
      type: Object,
      default: null
    }
  },
  computed: {
    slippage() {
      if (!this.prevTrade)
        return 0;
      const n = Math.max(this.trade.price, this.prevTrade.price), i = Math.min(this.trade.price, this.prevTrade.price);
      return n - i;
    }
  }
}, Fm = { key: 0 };
function $m(n, i, r, o, l, a) {
  var h;
  const c = wt("ChevronDownIcon");
  return a.slippage ? (k(), I("div", Fm, [
    ((h = r.prevTrade) == null ? void 0 : h.price) !== void 0 ? (k(), lo(c, {
      key: 0,
      class: Re(["w-[16px] h-[16px]", {
        "rotate-180": r.trade.price > r.prevTrade.price
      }])
    }, null, 8, ["class"])) : de("", !0)
  ])) : de("", !0);
}
const zm = /* @__PURE__ */ ze(Dm, [["render", $m]]), Um = {
  components: { TradeSlippage: zm },
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    renderedTrades: [],
    updateTradesInterval: null,
    updateTimeInterval: null
  }),
  created() {
    this.updateTradesInterval = setInterval(this.updateTrades.bind(this), 200);
  },
  unmounted() {
    clearInterval(this.updateTradesInterval);
  },
  methods: {
    updateTrades() {
      this.renderedTrades = this.state.trades;
    },
    tradeTsToTime(n) {
      const i = new Date(n), r = String(i.getHours()).padStart(2, "0"), o = String(i.getMinutes()).padStart(2, "0"), l = String(i.getSeconds()).padStart(2, "0");
      return `${r}:${o}:${l}`;
    }
  },
  watch: {
    "settings.minQty"() {
      this.state.trades = [], this.renderedTrades = [];
    },
    "settings.maxQty"() {
      this.state.trades = [], this.renderedTrades = [];
    }
  }
}, Vm = `li{border-left-width:1px;border-right-width:1px;border-bottom-width:1px;--tw-border-opacity: 1;border-color:rgb(39 39 42 / var(--tw-border-opacity, 1));padding-left:.5rem;padding-right:.5rem}li:first-child{border-top-width:1px}
`, Hm = { class: "flex flex-col h-full bg-[#161616]" }, Wm = { key: 0 }, qm = {
  key: 1,
  class: "grow overflow-auto text-gray-50 text-xs"
}, Ym = { class: "h-full aspect-square p-[2px]" }, Gm = ["src"], Qm = { class: "flex items-center w-[16px] sm:w-[24px]" }, Km = { class: "flex-1" }, Xm = { class: "flex-1 text-right" }, Zm = ["title"];
function Jm(n, i, r, o, l, a) {
  const c = wt("TradeSlippage");
  return k(), I("div", Hm, [
    n.renderedTrades.length ? (k(), I("ul", qm, [
      (k(!0), I(oe, null, ve(n.renderedTrades, (h, p) => (k(), I("li", {
        key: h.id,
        class: Re(["flex gap-2 h-[16px]", {
          "text-up-500": h.side === "BUY",
          "text-down-500": h.side === "SELL"
        }])
      }, [
        T("span", Ym, [
          h.exchangeLogo ? (k(), I("img", {
            key: 0,
            src: h.exchangeLogo
          }, null, 8, Gm)) : de("", !0)
        ]),
        T("span", Qm, [
          At(c, {
            trade: h,
            prevTrade: n.renderedTrades[p + 1]
          }, null, 8, ["trade", "prevTrade"])
        ]),
        T("span", Km, q(h.price), 1),
        T("span", Xm, q(h.qty), 1),
        T("span", {
          class: "flex-1 text-right text-gray-500",
          title: new Date(h.time).toLocaleString()
        }, q(a.tradeTsToTime(h.time)), 9, Zm)
      ], 2))), 128))
    ])) : (k(), I("div", Wm, [...i[0] || (i[0] = [
      T("div", { class: "flex items-center justify-center my-2 h-full text-gray-500" }, " No trades matching your filters yet. ", -1)
    ])]))
  ]);
}
const Ql = /* @__PURE__ */ ze(Um, [["render", Jm], ["styles", [Vm]]]), Zn = (n, i, r, o) => {
  const l = i - n, c = (o - n) / l;
  return -Math.floor(c * r - r);
}, co = (n, i, r, o) => {
  const l = i - n, c = (o - n) / l;
  return Math.floor(c * r);
}, jm = (n, i, r, o) => {
  const l = i - n, c = (1 - o / r) * l;
  return n + c;
}, ev = (n, i, r, o) => {
  const l = i - n, c = o / r * l;
  return n + c;
}, Kl = (n, i) => n < 0 ? Math.min(n, -i) : Math.max(n, i), Tt = (n, i = 2) => `0000000000000000${n}`.substr(-i);
class tv {
  constructor(i) {
    S(this, "value");
    this.value = new Date(i);
  }
  time() {
    return this.value.getTime();
  }
  ms() {
    return this.value.getMilliseconds();
  }
  s() {
    return this.value.getSeconds();
  }
  m() {
    return this.value.getMinutes();
  }
  h() {
    return this.value.getHours();
  }
  d() {
    return Math.floor(this.value.getTime() / (6e4 * 60 * 24));
  }
}
function nv(n) {
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2] > 0.179 ? [0, 0, 0, 1] : [1, 1, 1, 1];
}
function Qn(n) {
  return `rgb(${n[0] * 255}, ${n[1] * 255}, ${n[2] * 255})`;
}
function rv(n) {
  return `rgba(${n[0] * 255}, ${n[1] * 255}, ${n[2] * 255}, ${n[3]})`;
}
function fu(n) {
  var r;
  if (typeof n == "string" && (n = parseFloat(n)), n === 0)
    return "0";
  if (Math.abs(n) >= 1)
    return n.toFixed(3);
  {
    const [, o] = n.toFixed(20).split("."), l = ((r = o.match(/^0*/)) == null ? void 0 : r[0]) || "", a = o.slice(
      l.length,
      l.length + 3
    );
    return `0.0${l.length.toString().split("").map((h) => "₀₁₂₃₄₅₆₇₈₉"[parseInt(h)]).join("")}${a}`;
  }
}
const iv = {
  components: {
    PlusIcon: uo
  },
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    lastRender: 0,
    hovered: {
      type: "",
      i: -1
    },
    grouping: 1,
    maxDepth: 100,
    totalBid: 0,
    totalAsk: 0,
    middlePrice: 0,
    rangeMin: 0,
    rangeMax: 0,
    frameInterval: null
  }),
  created() {
  },
  async mounted() {
    this.frameInterval = setInterval(
      () => window.requestAnimationFrame(this.render),
      100
    );
  },
  unmounted() {
    clearInterval(this.frameInterval);
  },
  methods: {
    getPrice(n) {
      let i = Math.floor(n * this.increment);
      return this.grouping > 1 && (i -= i % this.grouping), i;
    },
    generatePriceMap(n, i) {
      n = this.getPrice(n), i = this.getPrice(i);
      let r = Math.round(n + (i - n) / 2);
      this.grouping > 1 && (r -= r % this.grouping), this.middlePrice = r / this.increment;
      const o = {}, l = {};
      for (let a = r - this.maxDepth * this.grouping; a <= r; a += this.grouping)
        o[a] = [0, 0];
      for (let a = r; a <= r + this.maxDepth * this.grouping; a += this.grouping)
        l[a] = [0, 0];
      return { bidMap: o, askMap: l };
    },
    render() {
      const n = performance.now();
      if (this.lastRender > n - 100)
        return;
      const { canvas: i, ctx: r } = this;
      i.width = Math.max(i.clientWidth, 400), i.height = Math.max(i.clientHeight, 400), r.fillStyle = "#171717", r.fillRect(0, 0, i.width, i.height);
      const o = Object.entries(this.state.bids), l = Object.entries(this.state.asks);
      if (o.length === 0 || l.length === 0)
        return;
      const a = this.generatePriceMap(
        // @ts-ignore
        Math.max(...Object.keys(this.state.bids)),
        // @ts-ignore
        Math.min(...Object.keys(this.state.asks))
      );
      for (const [C, B] of o) {
        const z = this.getPrice(+C);
        a.bidMap[z] !== void 0 && (a.bidMap[z][0] += B);
      }
      for (const [C, B] of l) {
        const z = this.getPrice(+C);
        a.askMap[z] !== void 0 && (a.askMap[z][0] += B);
      }
      if (this.state.bids2)
        for (const [C, B] of Object.entries(this.state.bids2)) {
          const z = this.getPrice(+C);
          a.bidMap[z] !== void 0 && (a.bidMap[z][1] += B);
        }
      if (this.state.asks2)
        for (const [C, B] of Object.entries(this.state.asks2)) {
          const z = this.getPrice(+C);
          a.askMap[z] !== void 0 && (a.askMap[z][1] += B);
        }
      const c = Object.entries(a.bidMap);
      c.reverse();
      const h = Object.entries(a.askMap), p = {
        min: +c[c.length - 1][0],
        max: +h[h.length - 1][0]
      }, d = {
        maxBid: 0,
        maxAsk: 0,
        totalBid: 0,
        totalAsk: 0
      };
      for (const [C, B] of c)
        d.maxBid = Math.max(d.maxBid, B[0]), d.totalBid += B[0] + B[1];
      for (const [C, B] of h)
        d.maxAsk = Math.max(d.maxAsk, B[0]), d.totalAsk += B[0] + B[1];
      const v = Math.max(d.maxBid, d.maxAsk), w = Math.max(d.totalBid, d.totalAsk);
      let b = 0, P = 0;
      for (const [C, B] of c) {
        const z = i.width, $ = Zn(
          p.min,
          p.max,
          i.height,
          Number(C)
        );
        b += B[0], P += B[1];
        const H = this.pixelsPerPrice;
        let Z = b / w * i.width * 0.8;
        r.fillStyle = "#39590e", r.fillRect(z, $, -Z, H);
        let ce = P / w * i.width * 0.8;
        r.fillStyle = "#1b2909", r.fillRect(z - Z, $, -ce, H), Z = B[0] / v * i.width, r.fillStyle = "#8fdd05", r.fillRect(z, $, -Z * 0.4, H);
      }
      let F = 0, R = 0;
      for (const [C, B] of h) {
        const z = i.width, $ = Zn(
          p.min,
          p.max,
          i.height,
          Number(C)
        );
        F += B[0], R += B[1];
        const H = this.pixelsPerPrice;
        let Z = F / w * i.width * 0.8;
        r.fillStyle = "#8e0d3b", r.fillRect(z, $, -Z, -H);
        let ce = R / w * i.width * 0.8;
        r.fillStyle = "#5e0a28", r.fillRect(z - Z, $, -ce, -H), Z = B[0] / v * i.width, r.fillStyle = "#fe3a64", r.fillRect(z, $, -Z * 0.4, -H);
      }
      this.totalBid = b, this.totalAsk = F, this.rangeMin = p.min / this.increment, this.rangeMax = p.max / this.increment, this.lastRender = performance.now();
    },
    onScroll(n) {
      n.deltaY > 0 ? this.maxDepth += 5 : this.maxDepth -= 5;
    }
  },
  computed: {
    pixelsPerPrice() {
      return this.$refs.canvas.height / (this.maxDepth * 2);
    },
    increment() {
      return Math.pow(10, this.state.pricePrecision);
    },
    bidAskTotalDelta() {
      return this.totalBid - this.totalAsk;
    },
    canvas() {
      return this.$refs.canvas;
    },
    ctx() {
      return this.canvas.getContext("2d");
    }
  }
}, sv = `.asks li,.bids li,.bid-or-ask-bg-color{height:1.5rem}
`, ov = {
  ref: "canvas",
  class: "w-full h-full bg-black"
}, av = { class: "absolute flex flex-col justify-between top-0 left-0 h-full w-full p-4 text-zinc-100" }, lv = { class: "text-xs" }, uv = { class: "text-down-500" }, cv = { class: "text-sm" }, hv = { class: "text-xs" }, fv = { class: "text-up-500" };
function dv(n, i, r, o, l, a) {
  return k(), I("div", {
    ref: "depthChart",
    onMousewheel: i[0] || (i[0] = (...c) => a.onScroll && a.onScroll(...c)),
    class: "relative h-full w-full font-bold"
  }, [
    T("canvas", ov, null, 512),
    T("div", av, [
      T("div", lv, [
        T("div", null, q(n.rangeMax.toFixed(o.state.pricePrecision)), 1),
        T("span", uv, q(n.totalAsk.toFixed(o.state.qtyPrecision)), 1)
      ]),
      T("div", null, [
        T("div", cv, q(n.middlePrice.toFixed(o.state.pricePrecision)), 1),
        T("div", {
          class: Re(["text-xs", {
            "text-down-500": a.bidAskTotalDelta < 0,
            "text-up-500": a.bidAskTotalDelta >= 0
          }])
        }, q(a.bidAskTotalDelta.toFixed(o.state.qtyPrecision)), 3)
      ]),
      T("div", hv, [
        T("div", null, q(n.rangeMin.toFixed(o.state.pricePrecision)), 1),
        T("span", fv, q(n.totalBid.toFixed(o.state.qtyPrecision)), 1)
      ])
    ])
  ], 544);
}
const Xl = /* @__PURE__ */ ze(iv, [["render", dv], ["styles", [sv]]]), pv = {
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  computed: {
    lastValue() {
      const n = this.state.data;
      if (!n.length)
        return "";
      const i = n[n.length - 1];
      return i >= 1e3 ? i.toFixed(0) : i.toFixed(2);
    },
    points() {
      const { data: n } = this.state, { width: i, height: r } = this.settings;
      if (n.length < 2)
        return "";
      let o = 1 / 0, l = -1 / 0;
      for (let w = 0; w < n.length; w++)
        n[w] < o && (o = n[w]), n[w] > l && (l = n[w]);
      const a = l - o || 1, c = 2, h = r - c * 2, d = (i - c * 2) / (n.length - 1), v = [];
      for (let w = 0; w < n.length; w++) {
        const b = c + w * d, P = c + h - (n[w] - o) / a * h;
        v.push(`${b.toFixed(1)},${P.toFixed(1)}`);
      }
      return v.join(" ");
    }
  }
}, gv = { class: "inline-flex items-center gap-1" }, mv = ["width", "height", "viewBox"], vv = ["points", "stroke", "stroke-width"];
function wv(n, i, r, o, l, a) {
  return k(), I("div", gv, [
    (k(), I("svg", {
      width: o.settings.width,
      height: o.settings.height,
      viewBox: `0 0 ${o.settings.width} ${o.settings.height}`
    }, [
      a.points.length >= 2 ? (k(), I("polyline", {
        key: 0,
        points: a.points,
        fill: "none",
        stroke: o.settings.color,
        "stroke-width": o.settings.lineWidth,
        "stroke-linejoin": "round",
        "stroke-linecap": "round"
      }, null, 8, vv)) : de("", !0)
    ], 8, mv)),
    o.settings.showLastValue && o.state.data.length ? (k(), I("span", {
      key: 0,
      class: "text-xxs tabular-nums",
      style: se({ color: o.settings.color })
    }, q(a.lastValue), 5)) : de("", !0)
  ]);
}
const Zl = /* @__PURE__ */ ze(pv, [["render", wv]]), _v = {
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    scrollOffset: 0,
    paused: !1,
    animationId: null,
    lastTimestamp: 0,
    singleSetWidth: 0
  }),
  computed: {
    doubledItems() {
      return [...this.state.items, ...this.state.items];
    }
  },
  mounted() {
    this.measureWidth(), this.lastTimestamp = performance.now(), this.animate(this.lastTimestamp);
  },
  unmounted() {
    this.animationId !== null && cancelAnimationFrame(this.animationId);
  },
  methods: {
    measureWidth() {
      const n = this.$refs.track;
      n && (this.singleSetWidth = n.scrollWidth / 2);
    },
    animate(n) {
      const i = (n - this.lastTimestamp) / 1e3;
      this.lastTimestamp = n, !this.paused && this.singleSetWidth > 0 && (this.scrollOffset += this.settings.scrollSpeed * i, this.scrollOffset >= this.singleSetWidth && (this.scrollOffset -= this.singleSetWidth)), this.animationId = requestAnimationFrame(this.animate);
    },
    onMouseEnter() {
      this.settings.pauseOnHover && (this.paused = !0);
    },
    onMouseLeave() {
      this.paused = !1;
    }
  },
  watch: {
    "state.items"() {
      this.$nextTick(() => this.measureWidth());
    }
  }
}, bv = `:host{display:block;height:100%}
`, xv = { class: "text-zinc-300 font-medium" }, yv = { class: "text-zinc-100 tabular-nums" };
function Ev(n, i, r, o, l, a) {
  return k(), I("div", {
    ref: "container",
    class: "h-full w-full overflow-hidden bg-[#0a0a0b] border-b border-zinc-800",
    onMouseenter: i[0] || (i[0] = (...c) => a.onMouseEnter && a.onMouseEnter(...c)),
    onMouseleave: i[1] || (i[1] = (...c) => a.onMouseLeave && a.onMouseLeave(...c))
  }, [
    T("div", {
      ref: "track",
      class: "flex items-center h-full whitespace-nowrap",
      style: se({ transform: `translateX(${-n.scrollOffset}px)` })
    }, [
      (k(!0), I(oe, null, ve(a.doubledItems, (c, h) => (k(), I("div", {
        key: h,
        class: "inline-flex items-center gap-2 px-4 h-full border-r border-zinc-800 text-xs"
      }, [
        T("span", xv, q(c.symbol), 1),
        T("span", yv, q(c.price.toFixed(2)), 1),
        T("span", {
          class: Re(["tabular-nums font-medium", {
            "text-up-500": c.change >= 0,
            "text-down-500": c.change < 0
          }])
        }, q(c.change >= 0 ? "+" : "") + q(c.change.toFixed(2)), 3),
        T("span", {
          class: Re(["tabular-nums", {
            "text-up-400": c.changePercent >= 0,
            "text-down-400": c.changePercent < 0
          }])
        }, " (" + q(c.changePercent >= 0 ? "+" : "") + q(c.changePercent.toFixed(2)) + "%) ", 3)
      ]))), 128))
    ], 4)
  ], 544);
}
const Jl = /* @__PURE__ */ ze(_v, [["render", Ev], ["styles", [bv]]]), Sv = {
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    containerWidth: 0,
    containerHeight: 0,
    tooltip: { visible: !1, x: 0, y: 0, label: "", change: 0 },
    resizeObserver: null
  }),
  mounted() {
    this.measure(), this.resizeObserver = new ResizeObserver(() => this.measure()), this.resizeObserver.observe(this.$refs.container);
  },
  unmounted() {
    this.resizeObserver && this.resizeObserver.disconnect();
  },
  computed: {
    layoutSectors() {
      const { sectors: n } = this.state;
      if (!n.length || !this.containerWidth || !this.containerHeight)
        return [];
      const i = n.map(
        (l) => l.children.reduce((a, c) => a + Math.abs(c.marketCap), 0)
      ), r = this.squarify(i, {
        x: 0,
        y: 0,
        w: this.containerWidth,
        h: this.containerHeight
      }), o = [];
      for (let l = 0; l < n.length; l++) {
        const a = r[l];
        if (!a || a.w < 1 || a.h < 1) {
          o.push({ x: 0, y: 0, w: 0, h: 0, headerH: 0, children: [] });
          continue;
        }
        const c = a.w - 4, h = a.h - 4, p = Math.min(16, h * 0.15), d = n[l].children.map((b) => Math.abs(b.marketCap)), w = this.squarify(d, {
          x: 0,
          y: 0,
          w: c,
          h: h - p
        }).map((b) => ({
          x: b.x + 1,
          y: b.y + 1,
          w: Math.max(0, b.w - 2),
          h: Math.max(0, b.h - 2)
        }));
        o.push({
          x: a.x,
          y: a.y,
          w: a.w,
          h: a.h,
          headerH: p,
          children: w
        });
      }
      return o;
    }
  },
  methods: {
    measure() {
      const n = this.$refs.container;
      n && (this.containerWidth = n.clientWidth, this.containerHeight = n.clientHeight);
    },
    formatChange(n) {
      return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
    },
    changeToColor(n) {
      const { minChange: i, maxChange: r } = this.settings, o = Math.max(0, Math.min(1, (n - i) / (r - i)));
      let l, a, c;
      if (o < 0.5) {
        const h = o / 0.5;
        l = Math.round(199 * (1 - h) + 42 * h), a = Math.round(9 * (1 - h) + 42 * h), c = Math.round(63 * (1 - h) + 46 * h);
      } else {
        const h = (o - 0.5) / 0.5;
        l = Math.round(42 * (1 - h) + 83 * h), a = Math.round(42 * (1 - h) + 134 * h), c = Math.round(46 * (1 - h) + 5 * h);
      }
      return `rgb(${l},${a},${c})`;
    },
    squarify(n, i) {
      if (n.reduce((d, v) => d + v, 0) === 0 || n.length === 0)
        return [];
      const o = [];
      let { x: l, y: a, w: c, h } = i;
      const p = n.map((d, v) => ({ value: d, index: v }));
      for (; p.length > 0; ) {
        const d = c >= h, v = d ? h : c, w = p.reduce((C, B) => C + B.value, 0), b = [];
        let P = 0;
        for (let C = 0; C < p.length; C++) {
          const B = p[C], z = B.value / w * c * h, $ = P + z;
          if (b.length === 0) {
            b.push(B), P = $;
            continue;
          }
          const H = this.worstAspect(
            b.map((ce) => ce.value / w * c * h),
            v
          );
          if (b.push(B), P = $, this.worstAspect(
            b.map((ce) => ce.value / w * c * h),
            v
          ) > H) {
            b.pop(), P -= z;
            break;
          }
        }
        const F = P / v;
        let R = 0;
        for (const C of b) {
          const z = C.value / w * c * h / F;
          d ? o[C.index] = { x: l + R, y: a, w: z, h: F } : o[C.index] = { x: l, y: a + R, w: F, h: z }, R += z;
        }
        d ? (a += F, h -= F) : (l += F, c -= F), p.splice(0, b.length);
      }
      return o;
    },
    worstAspect(n, i) {
      const o = n.reduce((a, c) => a + c, 0) / i;
      let l = 0;
      for (const a of n) {
        const c = a / o, h = Math.max(o / c, c / o);
        l = Math.max(l, h);
      }
      return l;
    },
    onCellEnter(n, i, r) {
      const o = this.state.sectors[i].children[r];
      this.tooltip = {
        visible: !0,
        x: n.clientX + 12,
        y: n.clientY + 12,
        label: o.ticker,
        change: o.change
      };
    }
  }
}, Tv = `.heatmap-cell{transition:filter .1s ease;cursor:default}.heatmap-cell:hover{filter:brightness(1.25)}
`, Mv = {
  ref: "container",
  class: "h-full w-full bg-[#0a0a0b] relative overflow-hidden"
}, Cv = ["onMouseenter"], Pv = { class: "font-medium" };
function Av(n, i, r, o, l, a) {
  return k(), I("div", Mv, [
    (k(!0), I(oe, null, ve(a.layoutSectors, (c, h) => (k(), I("div", {
      key: "s-" + h,
      class: "absolute",
      style: se({
        left: c.x + "px",
        top: c.y + "px",
        width: c.w + "px",
        height: c.h + "px",
        padding: "2px"
      })
    }, [
      T("div", {
        class: "w-full bg-[#1a1a1e] text-[#a0a0a8] font-bold truncate px-1 flex items-center",
        style: se({ height: c.headerH + "px", fontSize: "10px" })
      }, q(o.state.sectors[h].name), 5),
      T("div", {
        class: "relative",
        style: se({ height: c.h - 4 - c.headerH + "px" })
      }, [
        (k(!0), I(oe, null, ve(c.children, (p, d) => (k(), I("div", {
          key: "c-" + d,
          class: "heatmap-cell absolute flex flex-col items-center justify-center overflow-hidden",
          style: se({
            left: p.x + "px",
            top: p.y + "px",
            width: p.w + "px",
            height: p.h + "px",
            backgroundColor: a.changeToColor(o.state.sectors[h].children[d].change)
          }),
          onMouseenter: (v) => a.onCellEnter(v, h, d),
          onMouseleave: i[0] || (i[0] = (v) => n.tooltip.visible = !1)
        }, [
          p.w > 28 && p.h > 14 ? (k(), I("span", {
            key: 0,
            class: "text-[#e0e0e0] font-bold truncate leading-none",
            style: se({ fontSize: Math.min(11, Math.max(8, p.w / 6)) + "px" })
          }, q(o.state.sectors[h].children[d].ticker), 5)) : de("", !0),
          p.w > 28 && p.h > 28 ? (k(), I("span", {
            key: 1,
            class: "tabular-nums text-[#e0e0e0] leading-none",
            style: se({ fontSize: Math.min(9, Math.max(7, p.w / 7)) + "px" })
          }, q(a.formatChange(o.state.sectors[h].children[d].change)), 5)) : de("", !0)
        ], 44, Cv))), 128))
      ], 4)
    ], 4))), 128)),
    n.tooltip.visible ? (k(), I("div", {
      key: 0,
      class: "fixed z-50 pointer-events-none bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 shadow-lg",
      style: se({ left: n.tooltip.x + "px", top: n.tooltip.y + "px" })
    }, [
      T("div", Pv, q(n.tooltip.label), 1),
      T("div", {
        class: Re(["tabular-nums", {
          "text-up-500": n.tooltip.change >= 0,
          "text-down-500": n.tooltip.change < 0
        }])
      }, q(a.formatChange(n.tooltip.change)), 3)
    ], 4)) : de("", !0)
  ], 512);
}
const jl = /* @__PURE__ */ ze(Sv, [["render", Av], ["styles", [Tv]]]), eu = [
  "#8fdd05",
  "#fe3a64",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#10b981",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#e11d48",
  "#84cc16",
  "#0ea5e9",
  "#a855f7"
];
function Ei(n, i) {
  return { x: n * Math.cos(i), y: n * Math.sin(i) };
}
function Rv(n, i, r, o) {
  const l = o - r > Math.PI ? 1 : 0, a = Ei(n, r), c = Ei(n, o), h = Ei(i, r), p = Ei(i, o);
  return i > 0 ? [
    `M ${a.x} ${a.y}`,
    `A ${n} ${n} 0 ${l} 1 ${c.x} ${c.y}`,
    `L ${p.x} ${p.y}`,
    `A ${i} ${i} 0 ${l} 0 ${h.x} ${h.y}`,
    "Z"
  ].join(" ") : [
    "M 0 0",
    `L ${a.x} ${a.y}`,
    `A ${n} ${n} 0 ${l} 1 ${c.x} ${c.y}`,
    "Z"
  ].join(" ");
}
const kv = {
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    hoveredSlice: null
  }),
  computed: {
    viewSize() {
      return 200;
    },
    cx() {
      return this.viewSize / 2;
    },
    cy() {
      return this.viewSize / 2;
    },
    computedSlices() {
      const i = 100 - this.state.slices.reduce((r, o) => r + o.value, 0);
      return i > 1e-3 ? [...this.state.slices, { label: "Other", value: i }] : this.state.slices;
    },
    total() {
      return this.computedSlices.reduce((n, i) => n + i.value, 0);
    },
    slicePaths() {
      const n = this.computedSlices, i = this.total;
      if (!n.length || i === 0)
        return [];
      const r = this.viewSize / 2 - 4, o = r * this.settings.innerRadiusRatio;
      let l = -Math.PI / 2;
      const a = [];
      for (let c = 0; c < n.length; c++) {
        const h = n[c].value / i * (Math.PI * 2), p = l + Math.min(h, Math.PI * 2 - 1e-3);
        a.push({ d: Rv(r, o, l, p) }), l += h;
      }
      return a;
    }
  },
  methods: {
    getSliceColor(n) {
      const i = this.computedSlices[n];
      return i.label === "Other" && !i.color ? "#3f3f46" : i.color || eu[n % eu.length];
    }
  }
}, Bv = `.pie-slice{transition:transform .15s ease;transform-origin:0 0}.pie-slice--hovered{transform:scale(1.03);filter:brightness(1.15)}
`, Iv = { class: "flex h-full w-full bg-[#0a0a0b] overflow-hidden" }, Lv = { class: "relative flex-1 flex items-center justify-center min-w-0 p-2" }, Nv = ["viewBox"], Ov = ["transform"], Dv = ["d", "fill", "onMouseenter"], Fv = {
  key: 0,
  class: "absolute flex flex-col items-center justify-center pointer-events-none"
}, $v = {
  key: 0,
  class: "text-zinc-400 text-xxs"
}, zv = {
  key: 1,
  class: "text-zinc-100 text-sm font-medium tabular-nums"
}, Uv = {
  key: 1,
  class: "absolute bottom-2 left-2 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 pointer-events-none"
}, Vv = { class: "font-medium tabular-nums" }, Hv = { class: "text-zinc-400" }, Wv = {
  key: 0,
  class: "flex flex-col justify-center gap-1 px-3 py-2 text-xs overflow-auto max-w-[40%]"
}, qv = ["onMouseenter"], Yv = { class: "text-zinc-300 truncate" }, Gv = { class: "text-zinc-500 tabular-nums ml-auto" };
function Qv(n, i, r, o, l, a) {
  return k(), I("div", Iv, [
    T("div", Lv, [
      (k(), I("svg", {
        ref: "svg",
        viewBox: `0 0 ${a.viewSize} ${a.viewSize}`,
        class: "w-full h-full",
        style: { "max-width": "100%", "max-height": "100%" }
      }, [
        T("g", {
          transform: `translate(${a.cx}, ${a.cy})`
        }, [
          (k(!0), I(oe, null, ve(a.slicePaths, (c, h) => (k(), I("path", {
            key: h,
            d: c.d,
            fill: a.getSliceColor(h),
            stroke: "#0a0a0b",
            "stroke-width": 1.5,
            class: Re(["pie-slice", { "pie-slice--hovered": n.hoveredSlice === h }]),
            onMouseenter: (p) => n.hoveredSlice = h,
            onMouseleave: i[0] || (i[0] = (p) => n.hoveredSlice = null)
          }, null, 42, Dv))), 128))
        ], 8, Ov)
      ], 8, Nv)),
      o.state.centerLabel || o.state.centerValue ? (k(), I("div", Fv, [
        o.state.centerLabel ? (k(), I("div", $v, q(o.state.centerLabel), 1)) : de("", !0),
        o.state.centerValue ? (k(), I("div", zv, q(o.state.centerValue), 1)) : de("", !0)
      ])) : de("", !0),
      n.hoveredSlice !== null ? (k(), I("div", Uv, [
        T("span", {
          style: se({ color: a.getSliceColor(n.hoveredSlice) })
        }, "●", 4),
        Dt(" " + q(a.computedSlices[n.hoveredSlice].label) + ": ", 1),
        T("span", Vv, q(a.computedSlices[n.hoveredSlice].value.toFixed(2)), 1),
        T("span", Hv, " (" + q((a.computedSlices[n.hoveredSlice].value / a.total * 100).toFixed(1)) + "%) ", 1)
      ])) : de("", !0)
    ]),
    o.settings.showLegend ? (k(), I("div", Wv, [
      (k(!0), I(oe, null, ve(a.computedSlices, (c, h) => (k(), I("div", {
        key: h,
        class: "flex items-center gap-2 whitespace-nowrap cursor-default",
        onMouseenter: (p) => n.hoveredSlice = h,
        onMouseleave: i[1] || (i[1] = (p) => n.hoveredSlice = null)
      }, [
        T("span", {
          class: "w-2.5 h-2.5 rounded-sm flex-shrink-0",
          style: se({ backgroundColor: a.getSliceColor(h) })
        }, null, 4),
        T("span", Yv, q(c.label), 1),
        T("span", Gv, q((c.value / a.total * 100).toFixed(1)) + "% ", 1)
      ], 40, qv))), 128))
    ])) : de("", !0)
  ]);
}
const tu = /* @__PURE__ */ ze(kv, [["render", Qv], ["styles", [Bv]]]), Kv = {
  setup() {
    const n = xe("state"), i = xe("settings");
    return { state: n, settings: i };
  },
  data: () => ({
    tooltip: {
      visible: !1,
      x: 0,
      y: 0,
      value: 0,
      rowSymbol: "",
      colSymbol: ""
    }
  }),
  methods: {
    correlationColor(n) {
      const i = (n + 1) / 2;
      let r, o, l;
      if (i < 0.5) {
        const a = i / 0.5;
        r = Math.round(199 * (1 - a) + 42 * a), o = Math.round(9 * (1 - a) + 42 * a), l = Math.round(63 * (1 - a) + 46 * a);
      } else {
        const a = (i - 0.5) / 0.5;
        r = Math.round(42 * (1 - a) + 83 * a), o = Math.round(42 * (1 - a) + 134 * a), l = Math.round(46 * (1 - a) + 5 * a);
      }
      return `rgb(${r},${o},${l})`;
    },
    onCellEnter(n, i, r, o) {
      this.tooltip = {
        visible: !0,
        x: n.clientX + 12,
        y: n.clientY + 12,
        value: o,
        rowSymbol: this.state.symbols[i],
        colSymbol: this.state.symbols[r]
      };
    }
  }
}, Xv = `.corr-header-corner{width:48px;min-width:48px}.corr-col-header{font-size:9px;font-weight:700;color:#a0a0a8;text-align:center;padding:2px 2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.corr-row-header{font-size:9px;font-weight:700;color:#a0a0a8;text-align:right;padding-right:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:48px}.corr-cell{text-align:center;vertical-align:middle;padding:0;min-width:28px;height:28px;border:1px solid #0a0a0b;cursor:default;transition:filter .1s ease}.corr-cell:hover{filter:brightness(1.3)}.corr-cell-text{font-size:9px;font-family:Inter,system-ui,sans-serif;font-variant-numeric:tabular-nums;color:#808088}.corr-cell-text--strong{color:#e0e0e0}
`, Zv = { class: "h-full w-full bg-[#0a0a0b] overflow-auto p-2" }, Jv = {
  key: 0,
  class: "w-full border-collapse"
}, jv = { class: "corr-row-header" }, ew = ["onMouseenter"], tw = { class: "font-medium" };
function nw(n, i, r, o, l, a) {
  return k(), I("div", Zv, [
    o.state.symbols.length ? (k(), I("table", Jv, [
      T("thead", null, [
        T("tr", null, [
          i[1] || (i[1] = T("th", { class: "corr-header-corner" }, null, -1)),
          (k(!0), I(oe, null, ve(o.state.symbols, (c) => (k(), I("th", {
            key: "col-" + c,
            class: "corr-col-header"
          }, q(c), 1))), 128))
        ])
      ]),
      T("tbody", null, [
        (k(!0), I(oe, null, ve(o.state.matrix, (c, h) => (k(), I("tr", { key: h }, [
          T("td", jv, q(o.state.symbols[h]), 1),
          (k(!0), I(oe, null, ve(c, (p, d) => (k(), I("td", {
            key: d,
            class: "corr-cell",
            style: se({ backgroundColor: a.correlationColor(p) }),
            onMouseenter: (v) => a.onCellEnter(v, h, d, p),
            onMouseleave: i[0] || (i[0] = (v) => n.tooltip.visible = !1)
          }, [
            T("span", {
              class: Re(["corr-cell-text", { "corr-cell-text--strong": Math.abs(p) > 0.3 }])
            }, q(p.toFixed(o.settings.precision)), 3)
          ], 44, ew))), 128))
        ]))), 128))
      ])
    ])) : de("", !0),
    n.tooltip.visible ? (k(), I("div", {
      key: 1,
      class: "fixed z-50 pointer-events-none bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 shadow-lg",
      style: se({ left: n.tooltip.x + "px", top: n.tooltip.y + "px" })
    }, [
      T("div", tw, q(n.tooltip.rowSymbol) + " / " + q(n.tooltip.colSymbol), 1),
      T("div", {
        class: "tabular-nums font-medium",
        style: se({ color: a.correlationColor(n.tooltip.value) })
      }, q(n.tooltip.value.toFixed(o.settings.precision)), 5)
    ], 4)) : de("", !0)
  ]);
}
const nu = /* @__PURE__ */ ze(Kv, [["render", nw], ["styles", [Xv]]]), rw = `*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-2{bottom:.5rem}.left-0{left:0}.left-2{left:.5rem}.right-0{right:0}.right-2{right:.5rem}.top-0{top:0}.top-2{top:.5rem}.z-0{z-index:0}.z-50{z-index:50}.z-\\[0\\]{z-index:0}.z-\\[1\\]{z-index:1}.z-\\[2\\]{z-index:2}.col-span-1{grid-column:span 1 / span 1}.m-2{margin:.5rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.ml-1{margin-left:.25rem}.ml-auto{margin-left:auto}.mr-2{margin-right:.5rem}.mr-auto{margin-right:auto}.block{display:block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.aspect-square{aspect-ratio:1 / 1}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-4{height:1rem}.h-\\[16px\\]{height:16px}.h-\\[1px\\]{height:1px}.h-\\[1rem\\]{height:1rem}.h-full{height:100%}.h-screen{height:100vh}.max-h-\\[90dvh\\]{max-height:90dvh}.w-11\\/12{width:91.666667%}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-4{width:1rem}.w-6\\/12{width:50%}.w-\\[16px\\]{width:16px}.w-\\[3rem\\]{width:3rem}.w-\\[6rem\\]{width:6rem}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.w-min{width:-moz-min-content;width:min-content}.w-screen{width:100vw}.min-w-0{min-width:0px}.min-w-full{min-width:100%}.max-w-\\[40\\%\\]{max-width:40%}.max-w-\\[90dvw\\]{max-width:90dvw}.flex-1{flex:1 1 0%}.flex-shrink-0,.shrink-0{flex-shrink:0}.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.cursor-crosshair{cursor:crosshair}.cursor-default{cursor:default}.cursor-ew-resize{cursor:ew-resize}.cursor-not-allowed{cursor:not-allowed}.cursor-ns-resize{cursor:ns-resize}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize{resize:both}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-row-reverse{flex-direction:row-reverse}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-hidden{overflow-y:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.whitespace-nowrap{white-space:nowrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-sm{border-radius:.125rem}.border{border-width:1px}.border-x{border-left-width:1px;border-right-width:1px}.border-b{border-bottom-width:1px}.border-l{border-left-width:1px}.border-r{border-right-width:1px}.border-solid{border-style:solid}.border-dashed{border-style:dashed}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity, 1))}.border-down-500{--tw-border-opacity: 1;border-color:rgb(254 58 100 / var(--tw-border-opacity, 1))}.border-down-600{--tw-border-opacity: 1;border-color:rgb(236 18 75 / var(--tw-border-opacity, 1))}.border-down-800{--tw-border-opacity: 1;border-color:rgb(167 10 61 / var(--tw-border-opacity, 1))}.border-down-900{--tw-border-opacity: 1;border-color:rgb(142 13 59 / var(--tw-border-opacity, 1))}.border-gray-400{--tw-border-opacity: 1;border-color:rgb(156 163 175 / var(--tw-border-opacity, 1))}.border-gray-800{--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity, 1))}.border-up-500{--tw-border-opacity: 1;border-color:rgb(143 221 5 / var(--tw-border-opacity, 1))}.border-up-600{--tw-border-opacity: 1;border-color:rgb(109 177 0 / var(--tw-border-opacity, 1))}.border-up-800{--tw-border-opacity: 1;border-color:rgb(67 105 11 / var(--tw-border-opacity, 1))}.border-up-900{--tw-border-opacity: 1;border-color:rgb(57 89 14 / var(--tw-border-opacity, 1))}.border-zinc-700{--tw-border-opacity: 1;border-color:rgb(63 63 70 / var(--tw-border-opacity, 1))}.border-zinc-800{--tw-border-opacity: 1;border-color:rgb(39 39 42 / var(--tw-border-opacity, 1))}.bg-\\[\\#0a0a0b\\]{--tw-bg-opacity: 1;background-color:rgb(10 10 11 / var(--tw-bg-opacity, 1))}.bg-\\[\\#11111122\\]{background-color:#1112}.bg-\\[\\#161616\\]{--tw-bg-opacity: 1;background-color:rgb(22 22 22 / var(--tw-bg-opacity, 1))}.bg-\\[\\#171717\\]{--tw-bg-opacity: 1;background-color:rgb(23 23 23 / var(--tw-bg-opacity, 1))}.bg-\\[\\#1a1a1e\\]{--tw-bg-opacity: 1;background-color:rgb(26 26 30 / var(--tw-bg-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-down-700{--tw-bg-opacity: 1;background-color:rgb(199 9 63 / var(--tw-bg-opacity, 1))}.bg-down-900{--tw-bg-opacity: 1;background-color:rgb(142 13 59 / var(--tw-bg-opacity, 1))}.bg-down-950{--tw-bg-opacity: 1;background-color:rgb(80 1 26 / var(--tw-bg-opacity, 1))}.bg-gray-800{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-transparent{background-color:transparent}.bg-up-700{--tw-bg-opacity: 1;background-color:rgb(83 134 5 / var(--tw-bg-opacity, 1))}.bg-up-900{--tw-bg-opacity: 1;background-color:rgb(57 89 14 / var(--tw-bg-opacity, 1))}.bg-up-950{--tw-bg-opacity: 1;background-color:rgb(28 50 1 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-zinc-900{--tw-bg-opacity: 1;background-color:rgb(24 24 27 / var(--tw-bg-opacity, 1))}.p-1{padding:.25rem}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-\\[2px\\]{padding:2px}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-\\[10px\\]{font-size:10px}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.text-xxs{font-size:.65rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.leading-none{line-height:1}.text-\\[\\#a0a0a8\\]{--tw-text-opacity: 1;color:rgb(160 160 168 / var(--tw-text-opacity, 1))}.text-\\[\\#e0e0e0\\]{--tw-text-opacity: 1;color:rgb(224 224 224 / var(--tw-text-opacity, 1))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity, 1))}.text-down-400{--tw-text-opacity: 1;color:rgb(255 105 134 / var(--tw-text-opacity, 1))}.text-down-50{--tw-text-opacity: 1;color:rgb(255 240 242 / var(--tw-text-opacity, 1))}.text-down-500{--tw-text-opacity: 1;color:rgb(254 58 100 / var(--tw-text-opacity, 1))}.text-down-600{--tw-text-opacity: 1;color:rgb(236 18 75 / var(--tw-text-opacity, 1))}.text-gray-200{--tw-text-opacity: 1;color:rgb(229 231 235 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-50{--tw-text-opacity: 1;color:rgb(249 250 251 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-up-400{--tw-text-opacity: 1;color:rgb(175 246 37 / var(--tw-text-opacity, 1))}.text-up-50{--tw-text-opacity: 1;color:rgb(249 255 229 / var(--tw-text-opacity, 1))}.text-up-500{--tw-text-opacity: 1;color:rgb(143 221 5 / var(--tw-text-opacity, 1))}.text-up-600{--tw-text-opacity: 1;color:rgb(109 177 0 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-zinc-100{--tw-text-opacity: 1;color:rgb(244 244 245 / var(--tw-text-opacity, 1))}.text-zinc-300{--tw-text-opacity: 1;color:rgb(212 212 216 / var(--tw-text-opacity, 1))}.text-zinc-400{--tw-text-opacity: 1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.text-zinc-500{--tw-text-opacity: 1;color:rgb(113 113 122 / var(--tw-text-opacity, 1))}.opacity-50{opacity:.5}.opacity-80{opacity:.8}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}:root,:host{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}@media (min-width: 640px){.sm\\:w-\\[24px\\]{width:24px}}
`;
function du(n, i = /* @__PURE__ */ new Set()) {
  if (i.has(n))
    return [];
  i.add(n);
  const r = [];
  n.styles && r.push(...n.styles);
  const o = n.components;
  if (o)
    for (const l of Object.values(o))
      r.push(...du(l, i));
  return r;
}
function Ut(n, i) {
  const r = document.createElement("div");
  r.style.height = "100%", r.style.width = "100%", n.appendChild(r);
  const o = r.attachShadow({ mode: "open" }), l = document.createElement("style"), a = du(i);
  l.textContent = rw + `
` + a.join(`
`), o.appendChild(l);
  const c = document.createElement("div");
  return c.style.height = "100%", c.style.width = "100%", o.appendChild(c), { shadowRoot: o, mountPoint: c, shadowHost: r };
}
const iw = (n) => ({
  visible: Ce(!1),
  time: _e({
    x: 0,
    time: 0
  }),
  value: _e({
    y: {},
    value: 0
  }),
  mousepos: { x: 0, y: 0 },
  isMovingObject: !1,
  setCrosshairFromValues(i, r) {
    this.visible.value = !0;
    const o = n.getXCoordByTimestamp(i);
    this.time.x = o, this.time.time = i;
    for (const l of n.screens)
      this.value.y[l.id] = n.getYCoordByValue(l.id, r);
    this.value.value = r;
  },
  setCrosshairFromPixels(i, r) {
    this.visible.value = !0;
    const o = n.getTimestampByXCoord(i), l = n.getScreenByYCoord(r), a = n.getValueByYCoord(l.id, r);
    this.time.x = i, this.time.time = o;
    for (const c of n.screens)
      this.value.y[c.id] = n.getYCoordByValue(c.id, a);
    this.value.value = a;
  },
  clearCrosshair() {
    this.visible.value = !1;
  }
}), ru = {
  xScaleHeight: 20,
  yScaleWidth: 50
}, sw = (n) => ({
  width: Ce(0),
  height: Ce(0),
  main: {
    height: Ce(0),
    width: Ce(0),
    screens: {}
  },
  valueScale: {
    height: Ce(0),
    width: Ce(ru.yScaleWidth)
  },
  timeScale: {
    height: Ce(ru.xScaleHeight),
    width: Ce(0)
  },
  canvasEl: Ce(null),
  canvasContainerEl: Ce(null),
  resolution: ro(() => ({
    height: n.stores.dimensions.main.height.value * window.devicePixelRatio,
    width: n.stores.dimensions.main.width.value * window.devicePixelRatio
  })),
  setDimensions(i, r) {
    this.height.value = i, this.width.value = r;
    const o = i - this.timeScale.height.value, l = r - this.valueScale.width.value;
    this.main.height.value = o, this.main.width.value = l, this.main.screens = {};
    for (let a = 0; a < n.screens.length; a++) {
      const c = n.screens[a], h = this.main.height.value * (c.top / 100), p = this.main.height.value * (c.height / 100), d = this.main.width.value;
      this.main.screens[a] = {
        top: h,
        width: d,
        height: p,
        resolution: {
          bottom: (o - h - p) * window.devicePixelRatio,
          width: d * window.devicePixelRatio,
          height: p * window.devicePixelRatio
        }
      };
    }
    this.valueScale.height = this.main.height, this.timeScale.width = this.main.width, n.setScreenRange();
  },
  recompute() {
    this.setDimensions(this.height.value, this.width.value);
  }
});
function ow() {
  return [Math.random(), Math.random(), Math.random(), 1];
}
function Ci(n, i) {
  const r = n.indexOf(i);
  if (r > -1)
    return { insertIndex: r, exact: !0 };
  let o = 0, l = n.length;
  for (; o < l; ) {
    const a = Math.floor((o + l) / 2);
    n[a] < i ? o = a + 1 : l = a;
  }
  return { insertIndex: o, exact: !1 };
}
function Jn(n, i) {
  let r = 0, o = n.length;
  for (; r < o; ) {
    const l = Math.floor((r + o) / 2);
    n[l] < i ? r = l + 1 : o = l;
  }
  return r;
}
function jn(n, i) {
  let r = 0, o = n.length;
  for (; r < o; ) {
    const l = Math.floor((r + o) / 2);
    n[l] > i ? o = l : r = l + 1;
  }
  return r - 1;
}
var Tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function e2(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Pi = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Pi.exports;
(function(n, i) {
  (function() {
    var r, o = "4.17.23", l = 200, a = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", c = "Expected a function", h = "Invalid `variable` option passed into `_.template`", p = "__lodash_hash_undefined__", d = 500, v = "__lodash_placeholder__", w = 1, b = 2, P = 4, F = 1, R = 2, C = 1, B = 2, z = 4, $ = 8, H = 16, Z = 32, ce = 64, he = 128, ee = 256, Ue = 512, Ke = 30, qe = "...", tn = 800, Rn = 16, kn = 1, Ne = 2, me = 3, vn = 1 / 0, nn = 9007199254740991, Cu = 17976931348623157e292, Rr = 0 / 0, Rt = 4294967295, Pu = Rt - 1, Au = Rt >>> 1, Ru = [
      ["ary", he],
      ["bind", C],
      ["bindKey", B],
      ["curry", $],
      ["curryRight", H],
      ["flip", Ue],
      ["partial", Z],
      ["partialRight", ce],
      ["rearg", ee]
    ], Bn = "[object Arguments]", kr = "[object Array]", ku = "[object AsyncFunction]", rr = "[object Boolean]", ir = "[object Date]", Bu = "[object DOMException]", Br = "[object Error]", Ir = "[object Function]", go = "[object GeneratorFunction]", _t = "[object Map]", sr = "[object Number]", Iu = "[object Null]", Vt = "[object Object]", mo = "[object Promise]", Lu = "[object Proxy]", or = "[object RegExp]", bt = "[object Set]", ar = "[object String]", Lr = "[object Symbol]", Nu = "[object Undefined]", lr = "[object WeakMap]", Ou = "[object WeakSet]", ur = "[object ArrayBuffer]", In = "[object DataView]", Oi = "[object Float32Array]", Di = "[object Float64Array]", Fi = "[object Int8Array]", $i = "[object Int16Array]", zi = "[object Int32Array]", Ui = "[object Uint8Array]", Vi = "[object Uint8ClampedArray]", Hi = "[object Uint16Array]", Wi = "[object Uint32Array]", Du = /\b__p \+= '';/g, Fu = /\b(__p \+=) '' \+/g, $u = /(__e\(.*?\)|\b__t\)) \+\n'';/g, vo = /&(?:amp|lt|gt|quot|#39);/g, wo = /[&<>"']/g, zu = RegExp(vo.source), Uu = RegExp(wo.source), Vu = /<%-([\s\S]+?)%>/g, Hu = /<%([\s\S]+?)%>/g, _o = /<%=([\s\S]+?)%>/g, Wu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, qu = /^\w*$/, Yu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, qi = /[\\^$.*+?()[\]{}|]/g, Gu = RegExp(qi.source), Yi = /^\s+/, Qu = /\s/, Ku = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Xu = /\{\n\/\* \[wrapped with (.+)\] \*/, Zu = /,? & /, Ju = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ju = /[()=,{}\[\]\/\s]/, ec = /\\(\\)?/g, tc = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, bo = /\w*$/, nc = /^[-+]0x[0-9a-f]+$/i, rc = /^0b[01]+$/i, ic = /^\[object .+?Constructor\]$/, sc = /^0o[0-7]+$/i, oc = /^(?:0|[1-9]\d*)$/, ac = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Nr = /($^)/, lc = /['\n\r\u2028\u2029\\]/g, Or = "\\ud800-\\udfff", uc = "\\u0300-\\u036f", cc = "\\ufe20-\\ufe2f", hc = "\\u20d0-\\u20ff", xo = uc + cc + hc, yo = "\\u2700-\\u27bf", Eo = "a-z\\xdf-\\xf6\\xf8-\\xff", fc = "\\xac\\xb1\\xd7\\xf7", dc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", pc = "\\u2000-\\u206f", gc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", So = "A-Z\\xc0-\\xd6\\xd8-\\xde", To = "\\ufe0e\\ufe0f", Mo = fc + dc + pc + gc, Gi = "['’]", mc = "[" + Or + "]", Co = "[" + Mo + "]", Dr = "[" + xo + "]", Po = "\\d+", vc = "[" + yo + "]", Ao = "[" + Eo + "]", Ro = "[^" + Or + Mo + Po + yo + Eo + So + "]", Qi = "\\ud83c[\\udffb-\\udfff]", wc = "(?:" + Dr + "|" + Qi + ")", ko = "[^" + Or + "]", Ki = "(?:\\ud83c[\\udde6-\\uddff]){2}", Xi = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ln = "[" + So + "]", Bo = "\\u200d", Io = "(?:" + Ao + "|" + Ro + ")", _c = "(?:" + Ln + "|" + Ro + ")", Lo = "(?:" + Gi + "(?:d|ll|m|re|s|t|ve))?", No = "(?:" + Gi + "(?:D|LL|M|RE|S|T|VE))?", Oo = wc + "?", Do = "[" + To + "]?", bc = "(?:" + Bo + "(?:" + [ko, Ki, Xi].join("|") + ")" + Do + Oo + ")*", xc = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", yc = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Fo = Do + Oo + bc, Ec = "(?:" + [vc, Ki, Xi].join("|") + ")" + Fo, Sc = "(?:" + [ko + Dr + "?", Dr, Ki, Xi, mc].join("|") + ")", Tc = RegExp(Gi, "g"), Mc = RegExp(Dr, "g"), Zi = RegExp(Qi + "(?=" + Qi + ")|" + Sc + Fo, "g"), Cc = RegExp([
      Ln + "?" + Ao + "+" + Lo + "(?=" + [Co, Ln, "$"].join("|") + ")",
      _c + "+" + No + "(?=" + [Co, Ln + Io, "$"].join("|") + ")",
      Ln + "?" + Io + "+" + Lo,
      Ln + "+" + No,
      yc,
      xc,
      Po,
      Ec
    ].join("|"), "g"), Pc = RegExp("[" + Bo + Or + xo + To + "]"), Ac = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Rc = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], kc = -1, Ee = {};
    Ee[Oi] = Ee[Di] = Ee[Fi] = Ee[$i] = Ee[zi] = Ee[Ui] = Ee[Vi] = Ee[Hi] = Ee[Wi] = !0, Ee[Bn] = Ee[kr] = Ee[ur] = Ee[rr] = Ee[In] = Ee[ir] = Ee[Br] = Ee[Ir] = Ee[_t] = Ee[sr] = Ee[Vt] = Ee[or] = Ee[bt] = Ee[ar] = Ee[lr] = !1;
    var ye = {};
    ye[Bn] = ye[kr] = ye[ur] = ye[In] = ye[rr] = ye[ir] = ye[Oi] = ye[Di] = ye[Fi] = ye[$i] = ye[zi] = ye[_t] = ye[sr] = ye[Vt] = ye[or] = ye[bt] = ye[ar] = ye[Lr] = ye[Ui] = ye[Vi] = ye[Hi] = ye[Wi] = !0, ye[Br] = ye[Ir] = ye[lr] = !1;
    var Bc = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Ic = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Lc = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Nc = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Oc = parseFloat, Dc = parseInt, $o = typeof Tr == "object" && Tr && Tr.Object === Object && Tr, Fc = typeof self == "object" && self && self.Object === Object && self, De = $o || Fc || Function("return this")(), Ji = i && !i.nodeType && i, wn = Ji && !0 && n && !n.nodeType && n, zo = wn && wn.exports === Ji, ji = zo && $o.process, ut = function() {
      try {
        var y = wn && wn.require && wn.require("util").types;
        return y || ji && ji.binding && ji.binding("util");
      } catch {
      }
    }(), Uo = ut && ut.isArrayBuffer, Vo = ut && ut.isDate, Ho = ut && ut.isMap, Wo = ut && ut.isRegExp, qo = ut && ut.isSet, Yo = ut && ut.isTypedArray;
    function tt(y, A, M) {
      switch (M.length) {
        case 0:
          return y.call(A);
        case 1:
          return y.call(A, M[0]);
        case 2:
          return y.call(A, M[0], M[1]);
        case 3:
          return y.call(A, M[0], M[1], M[2]);
      }
      return y.apply(A, M);
    }
    function $c(y, A, M, V) {
      for (var j = -1, fe = y == null ? 0 : y.length; ++j < fe; ) {
        var Be = y[j];
        A(V, Be, M(Be), y);
      }
      return V;
    }
    function ct(y, A) {
      for (var M = -1, V = y == null ? 0 : y.length; ++M < V && A(y[M], M, y) !== !1; )
        ;
      return y;
    }
    function zc(y, A) {
      for (var M = y == null ? 0 : y.length; M-- && A(y[M], M, y) !== !1; )
        ;
      return y;
    }
    function Go(y, A) {
      for (var M = -1, V = y == null ? 0 : y.length; ++M < V; )
        if (!A(y[M], M, y))
          return !1;
      return !0;
    }
    function rn(y, A) {
      for (var M = -1, V = y == null ? 0 : y.length, j = 0, fe = []; ++M < V; ) {
        var Be = y[M];
        A(Be, M, y) && (fe[j++] = Be);
      }
      return fe;
    }
    function Fr(y, A) {
      var M = y == null ? 0 : y.length;
      return !!M && Nn(y, A, 0) > -1;
    }
    function es(y, A, M) {
      for (var V = -1, j = y == null ? 0 : y.length; ++V < j; )
        if (M(A, y[V]))
          return !0;
      return !1;
    }
    function Se(y, A) {
      for (var M = -1, V = y == null ? 0 : y.length, j = Array(V); ++M < V; )
        j[M] = A(y[M], M, y);
      return j;
    }
    function sn(y, A) {
      for (var M = -1, V = A.length, j = y.length; ++M < V; )
        y[j + M] = A[M];
      return y;
    }
    function ts(y, A, M, V) {
      var j = -1, fe = y == null ? 0 : y.length;
      for (V && fe && (M = y[++j]); ++j < fe; )
        M = A(M, y[j], j, y);
      return M;
    }
    function Uc(y, A, M, V) {
      var j = y == null ? 0 : y.length;
      for (V && j && (M = y[--j]); j--; )
        M = A(M, y[j], j, y);
      return M;
    }
    function ns(y, A) {
      for (var M = -1, V = y == null ? 0 : y.length; ++M < V; )
        if (A(y[M], M, y))
          return !0;
      return !1;
    }
    var Vc = rs("length");
    function Hc(y) {
      return y.split("");
    }
    function Wc(y) {
      return y.match(Ju) || [];
    }
    function Qo(y, A, M) {
      var V;
      return M(y, function(j, fe, Be) {
        if (A(j, fe, Be))
          return V = fe, !1;
      }), V;
    }
    function $r(y, A, M, V) {
      for (var j = y.length, fe = M + (V ? 1 : -1); V ? fe-- : ++fe < j; )
        if (A(y[fe], fe, y))
          return fe;
      return -1;
    }
    function Nn(y, A, M) {
      return A === A ? nh(y, A, M) : $r(y, Ko, M);
    }
    function qc(y, A, M, V) {
      for (var j = M - 1, fe = y.length; ++j < fe; )
        if (V(y[j], A))
          return j;
      return -1;
    }
    function Ko(y) {
      return y !== y;
    }
    function Xo(y, A) {
      var M = y == null ? 0 : y.length;
      return M ? ss(y, A) / M : Rr;
    }
    function rs(y) {
      return function(A) {
        return A == null ? r : A[y];
      };
    }
    function is(y) {
      return function(A) {
        return y == null ? r : y[A];
      };
    }
    function Zo(y, A, M, V, j) {
      return j(y, function(fe, Be, we) {
        M = V ? (V = !1, fe) : A(M, fe, Be, we);
      }), M;
    }
    function Yc(y, A) {
      var M = y.length;
      for (y.sort(A); M--; )
        y[M] = y[M].value;
      return y;
    }
    function ss(y, A) {
      for (var M, V = -1, j = y.length; ++V < j; ) {
        var fe = A(y[V]);
        fe !== r && (M = M === r ? fe : M + fe);
      }
      return M;
    }
    function os(y, A) {
      for (var M = -1, V = Array(y); ++M < y; )
        V[M] = A(M);
      return V;
    }
    function Gc(y, A) {
      return Se(A, function(M) {
        return [M, y[M]];
      });
    }
    function Jo(y) {
      return y && y.slice(0, na(y) + 1).replace(Yi, "");
    }
    function nt(y) {
      return function(A) {
        return y(A);
      };
    }
    function as(y, A) {
      return Se(A, function(M) {
        return y[M];
      });
    }
    function cr(y, A) {
      return y.has(A);
    }
    function jo(y, A) {
      for (var M = -1, V = y.length; ++M < V && Nn(A, y[M], 0) > -1; )
        ;
      return M;
    }
    function ea(y, A) {
      for (var M = y.length; M-- && Nn(A, y[M], 0) > -1; )
        ;
      return M;
    }
    function Qc(y, A) {
      for (var M = y.length, V = 0; M--; )
        y[M] === A && ++V;
      return V;
    }
    var Kc = is(Bc), Xc = is(Ic);
    function Zc(y) {
      return "\\" + Nc[y];
    }
    function Jc(y, A) {
      return y == null ? r : y[A];
    }
    function On(y) {
      return Pc.test(y);
    }
    function jc(y) {
      return Ac.test(y);
    }
    function eh(y) {
      for (var A, M = []; !(A = y.next()).done; )
        M.push(A.value);
      return M;
    }
    function ls(y) {
      var A = -1, M = Array(y.size);
      return y.forEach(function(V, j) {
        M[++A] = [j, V];
      }), M;
    }
    function ta(y, A) {
      return function(M) {
        return y(A(M));
      };
    }
    function on(y, A) {
      for (var M = -1, V = y.length, j = 0, fe = []; ++M < V; ) {
        var Be = y[M];
        (Be === A || Be === v) && (y[M] = v, fe[j++] = M);
      }
      return fe;
    }
    function zr(y) {
      var A = -1, M = Array(y.size);
      return y.forEach(function(V) {
        M[++A] = V;
      }), M;
    }
    function th(y) {
      var A = -1, M = Array(y.size);
      return y.forEach(function(V) {
        M[++A] = [V, V];
      }), M;
    }
    function nh(y, A, M) {
      for (var V = M - 1, j = y.length; ++V < j; )
        if (y[V] === A)
          return V;
      return -1;
    }
    function rh(y, A, M) {
      for (var V = M + 1; V--; )
        if (y[V] === A)
          return V;
      return V;
    }
    function Dn(y) {
      return On(y) ? sh(y) : Vc(y);
    }
    function xt(y) {
      return On(y) ? oh(y) : Hc(y);
    }
    function na(y) {
      for (var A = y.length; A-- && Qu.test(y.charAt(A)); )
        ;
      return A;
    }
    var ih = is(Lc);
    function sh(y) {
      for (var A = Zi.lastIndex = 0; Zi.test(y); )
        ++A;
      return A;
    }
    function oh(y) {
      return y.match(Zi) || [];
    }
    function ah(y) {
      return y.match(Cc) || [];
    }
    var lh = function y(A) {
      A = A == null ? De : Fn.defaults(De.Object(), A, Fn.pick(De, Rc));
      var M = A.Array, V = A.Date, j = A.Error, fe = A.Function, Be = A.Math, we = A.Object, us = A.RegExp, uh = A.String, ht = A.TypeError, Ur = M.prototype, ch = fe.prototype, $n = we.prototype, Vr = A["__core-js_shared__"], Hr = ch.toString, pe = $n.hasOwnProperty, hh = 0, ra = function() {
        var e = /[^.]+$/.exec(Vr && Vr.keys && Vr.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Wr = $n.toString, fh = Hr.call(we), dh = De._, ph = us(
        "^" + Hr.call(pe).replace(qi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), qr = zo ? A.Buffer : r, an = A.Symbol, Yr = A.Uint8Array, ia = qr ? qr.allocUnsafe : r, Gr = ta(we.getPrototypeOf, we), sa = we.create, oa = $n.propertyIsEnumerable, Qr = Ur.splice, aa = an ? an.isConcatSpreadable : r, hr = an ? an.iterator : r, _n = an ? an.toStringTag : r, Kr = function() {
        try {
          var e = Sn(we, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), gh = A.clearTimeout !== De.clearTimeout && A.clearTimeout, mh = V && V.now !== De.Date.now && V.now, vh = A.setTimeout !== De.setTimeout && A.setTimeout, Xr = Be.ceil, Zr = Be.floor, cs = we.getOwnPropertySymbols, wh = qr ? qr.isBuffer : r, la = A.isFinite, _h = Ur.join, bh = ta(we.keys, we), Ie = Be.max, Ve = Be.min, xh = V.now, yh = A.parseInt, ua = Be.random, Eh = Ur.reverse, hs = Sn(A, "DataView"), fr = Sn(A, "Map"), fs = Sn(A, "Promise"), zn = Sn(A, "Set"), dr = Sn(A, "WeakMap"), pr = Sn(we, "create"), Jr = dr && new dr(), Un = {}, Sh = Tn(hs), Th = Tn(fr), Mh = Tn(fs), Ch = Tn(zn), Ph = Tn(dr), jr = an ? an.prototype : r, gr = jr ? jr.valueOf : r, ca = jr ? jr.toString : r;
      function g(e) {
        if (Me(e) && !te(e) && !(e instanceof le)) {
          if (e instanceof ft)
            return e;
          if (pe.call(e, "__wrapped__"))
            return hl(e);
        }
        return new ft(e);
      }
      var Vn = function() {
        function e() {
        }
        return function(t) {
          if (!Te(t))
            return {};
          if (sa)
            return sa(t);
          e.prototype = t;
          var s = new e();
          return e.prototype = r, s;
        };
      }();
      function ei() {
      }
      function ft(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = r;
      }
      g.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Vu,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Hu,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: _o,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: g
        }
      }, g.prototype = ei.prototype, g.prototype.constructor = g, ft.prototype = Vn(ei.prototype), ft.prototype.constructor = ft;
      function le(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Rt, this.__views__ = [];
      }
      function Ah() {
        var e = new le(this.__wrapped__);
        return e.__actions__ = Xe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Xe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Xe(this.__views__), e;
      }
      function Rh() {
        if (this.__filtered__) {
          var e = new le(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function kh() {
        var e = this.__wrapped__.value(), t = this.__dir__, s = te(e), u = t < 0, f = s ? e.length : 0, m = Wf(0, f, this.__views__), _ = m.start, x = m.end, E = x - _, L = u ? x : _ - 1, N = this.__iteratees__, D = N.length, U = 0, W = Ve(E, this.__takeCount__);
        if (!s || !u && f == E && W == E)
          return La(e, this.__actions__);
        var K = [];
        e:
          for (; E-- && U < W; ) {
            L += t;
            for (var re = -1, X = e[L]; ++re < D; ) {
              var ae = N[re], ue = ae.iteratee, st = ae.type, Qe = ue(X);
              if (st == Ne)
                X = Qe;
              else if (!Qe) {
                if (st == kn)
                  continue e;
                break e;
              }
            }
            K[U++] = X;
          }
        return K;
      }
      le.prototype = Vn(ei.prototype), le.prototype.constructor = le;
      function bn(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function Bh() {
        this.__data__ = pr ? pr(null) : {}, this.size = 0;
      }
      function Ih(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function Lh(e) {
        var t = this.__data__;
        if (pr) {
          var s = t[e];
          return s === p ? r : s;
        }
        return pe.call(t, e) ? t[e] : r;
      }
      function Nh(e) {
        var t = this.__data__;
        return pr ? t[e] !== r : pe.call(t, e);
      }
      function Oh(e, t) {
        var s = this.__data__;
        return this.size += this.has(e) ? 0 : 1, s[e] = pr && t === r ? p : t, this;
      }
      bn.prototype.clear = Bh, bn.prototype.delete = Ih, bn.prototype.get = Lh, bn.prototype.has = Nh, bn.prototype.set = Oh;
      function Ht(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function Dh() {
        this.__data__ = [], this.size = 0;
      }
      function Fh(e) {
        var t = this.__data__, s = ti(t, e);
        if (s < 0)
          return !1;
        var u = t.length - 1;
        return s == u ? t.pop() : Qr.call(t, s, 1), --this.size, !0;
      }
      function $h(e) {
        var t = this.__data__, s = ti(t, e);
        return s < 0 ? r : t[s][1];
      }
      function zh(e) {
        return ti(this.__data__, e) > -1;
      }
      function Uh(e, t) {
        var s = this.__data__, u = ti(s, e);
        return u < 0 ? (++this.size, s.push([e, t])) : s[u][1] = t, this;
      }
      Ht.prototype.clear = Dh, Ht.prototype.delete = Fh, Ht.prototype.get = $h, Ht.prototype.has = zh, Ht.prototype.set = Uh;
      function Wt(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function Vh() {
        this.size = 0, this.__data__ = {
          hash: new bn(),
          map: new (fr || Ht)(),
          string: new bn()
        };
      }
      function Hh(e) {
        var t = di(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Wh(e) {
        return di(this, e).get(e);
      }
      function qh(e) {
        return di(this, e).has(e);
      }
      function Yh(e, t) {
        var s = di(this, e), u = s.size;
        return s.set(e, t), this.size += s.size == u ? 0 : 1, this;
      }
      Wt.prototype.clear = Vh, Wt.prototype.delete = Hh, Wt.prototype.get = Wh, Wt.prototype.has = qh, Wt.prototype.set = Yh;
      function xn(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.__data__ = new Wt(); ++t < s; )
          this.add(e[t]);
      }
      function Gh(e) {
        return this.__data__.set(e, p), this;
      }
      function Qh(e) {
        return this.__data__.has(e);
      }
      xn.prototype.add = xn.prototype.push = Gh, xn.prototype.has = Qh;
      function yt(e) {
        var t = this.__data__ = new Ht(e);
        this.size = t.size;
      }
      function Kh() {
        this.__data__ = new Ht(), this.size = 0;
      }
      function Xh(e) {
        var t = this.__data__, s = t.delete(e);
        return this.size = t.size, s;
      }
      function Zh(e) {
        return this.__data__.get(e);
      }
      function Jh(e) {
        return this.__data__.has(e);
      }
      function jh(e, t) {
        var s = this.__data__;
        if (s instanceof Ht) {
          var u = s.__data__;
          if (!fr || u.length < l - 1)
            return u.push([e, t]), this.size = ++s.size, this;
          s = this.__data__ = new Wt(u);
        }
        return s.set(e, t), this.size = s.size, this;
      }
      yt.prototype.clear = Kh, yt.prototype.delete = Xh, yt.prototype.get = Zh, yt.prototype.has = Jh, yt.prototype.set = jh;
      function ha(e, t) {
        var s = te(e), u = !s && Mn(e), f = !s && !u && fn(e), m = !s && !u && !f && Yn(e), _ = s || u || f || m, x = _ ? os(e.length, uh) : [], E = x.length;
        for (var L in e)
          (t || pe.call(e, L)) && !(_ && // Safari 9 has enumerable `arguments.length` in strict mode.
          (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          f && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          m && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
          Qt(L, E))) && x.push(L);
        return x;
      }
      function fa(e) {
        var t = e.length;
        return t ? e[Es(0, t - 1)] : r;
      }
      function ef(e, t) {
        return pi(Xe(e), yn(t, 0, e.length));
      }
      function tf(e) {
        return pi(Xe(e));
      }
      function ds(e, t, s) {
        (s !== r && !Et(e[t], s) || s === r && !(t in e)) && qt(e, t, s);
      }
      function mr(e, t, s) {
        var u = e[t];
        (!(pe.call(e, t) && Et(u, s)) || s === r && !(t in e)) && qt(e, t, s);
      }
      function ti(e, t) {
        for (var s = e.length; s--; )
          if (Et(e[s][0], t))
            return s;
        return -1;
      }
      function nf(e, t, s, u) {
        return ln(e, function(f, m, _) {
          t(u, f, s(f), _);
        }), u;
      }
      function da(e, t) {
        return e && Bt(t, Oe(t), e);
      }
      function rf(e, t) {
        return e && Bt(t, Je(t), e);
      }
      function qt(e, t, s) {
        t == "__proto__" && Kr ? Kr(e, t, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        }) : e[t] = s;
      }
      function ps(e, t) {
        for (var s = -1, u = t.length, f = M(u), m = e == null; ++s < u; )
          f[s] = m ? r : Qs(e, t[s]);
        return f;
      }
      function yn(e, t, s) {
        return e === e && (s !== r && (e = e <= s ? e : s), t !== r && (e = e >= t ? e : t)), e;
      }
      function dt(e, t, s, u, f, m) {
        var _, x = t & w, E = t & b, L = t & P;
        if (s && (_ = f ? s(e, u, f, m) : s(e)), _ !== r)
          return _;
        if (!Te(e))
          return e;
        var N = te(e);
        if (N) {
          if (_ = Yf(e), !x)
            return Xe(e, _);
        } else {
          var D = He(e), U = D == Ir || D == go;
          if (fn(e))
            return Da(e, x);
          if (D == Vt || D == Bn || U && !f) {
            if (_ = E || U ? {} : nl(e), !x)
              return E ? Nf(e, rf(_, e)) : Lf(e, da(_, e));
          } else {
            if (!ye[D])
              return f ? e : {};
            _ = Gf(e, D, x);
          }
        }
        m || (m = new yt());
        var W = m.get(e);
        if (W)
          return W;
        m.set(e, _), kl(e) ? e.forEach(function(X) {
          _.add(dt(X, t, s, X, e, m));
        }) : Al(e) && e.forEach(function(X, ae) {
          _.set(ae, dt(X, t, s, ae, e, m));
        });
        var K = L ? E ? Ls : Is : E ? Je : Oe, re = N ? r : K(e);
        return ct(re || e, function(X, ae) {
          re && (ae = X, X = e[ae]), mr(_, ae, dt(X, t, s, ae, e, m));
        }), _;
      }
      function sf(e) {
        var t = Oe(e);
        return function(s) {
          return pa(s, e, t);
        };
      }
      function pa(e, t, s) {
        var u = s.length;
        if (e == null)
          return !u;
        for (e = we(e); u--; ) {
          var f = s[u], m = t[f], _ = e[f];
          if (_ === r && !(f in e) || !m(_))
            return !1;
        }
        return !0;
      }
      function ga(e, t, s) {
        if (typeof e != "function")
          throw new ht(c);
        return Er(function() {
          e.apply(r, s);
        }, t);
      }
      function vr(e, t, s, u) {
        var f = -1, m = Fr, _ = !0, x = e.length, E = [], L = t.length;
        if (!x)
          return E;
        s && (t = Se(t, nt(s))), u ? (m = es, _ = !1) : t.length >= l && (m = cr, _ = !1, t = new xn(t));
        e:
          for (; ++f < x; ) {
            var N = e[f], D = s == null ? N : s(N);
            if (N = u || N !== 0 ? N : 0, _ && D === D) {
              for (var U = L; U--; )
                if (t[U] === D)
                  continue e;
              E.push(N);
            } else
              m(t, D, u) || E.push(N);
          }
        return E;
      }
      var ln = Va(kt), ma = Va(ms, !0);
      function of(e, t) {
        var s = !0;
        return ln(e, function(u, f, m) {
          return s = !!t(u, f, m), s;
        }), s;
      }
      function ni(e, t, s) {
        for (var u = -1, f = e.length; ++u < f; ) {
          var m = e[u], _ = t(m);
          if (_ != null && (x === r ? _ === _ && !it(_) : s(_, x)))
            var x = _, E = m;
        }
        return E;
      }
      function af(e, t, s, u) {
        var f = e.length;
        for (s = ne(s), s < 0 && (s = -s > f ? 0 : f + s), u = u === r || u > f ? f : ne(u), u < 0 && (u += f), u = s > u ? 0 : Il(u); s < u; )
          e[s++] = t;
        return e;
      }
      function va(e, t) {
        var s = [];
        return ln(e, function(u, f, m) {
          t(u, f, m) && s.push(u);
        }), s;
      }
      function Fe(e, t, s, u, f) {
        var m = -1, _ = e.length;
        for (s || (s = Kf), f || (f = []); ++m < _; ) {
          var x = e[m];
          t > 0 && s(x) ? t > 1 ? Fe(x, t - 1, s, u, f) : sn(f, x) : u || (f[f.length] = x);
        }
        return f;
      }
      var gs = Ha(), wa = Ha(!0);
      function kt(e, t) {
        return e && gs(e, t, Oe);
      }
      function ms(e, t) {
        return e && wa(e, t, Oe);
      }
      function ri(e, t) {
        return rn(t, function(s) {
          return Kt(e[s]);
        });
      }
      function En(e, t) {
        t = cn(t, e);
        for (var s = 0, u = t.length; e != null && s < u; )
          e = e[It(t[s++])];
        return s && s == u ? e : r;
      }
      function _a(e, t, s) {
        var u = t(e);
        return te(e) ? u : sn(u, s(e));
      }
      function Ye(e) {
        return e == null ? e === r ? Nu : Iu : _n && _n in we(e) ? Hf(e) : nd(e);
      }
      function vs(e, t) {
        return e > t;
      }
      function lf(e, t) {
        return e != null && pe.call(e, t);
      }
      function uf(e, t) {
        return e != null && t in we(e);
      }
      function cf(e, t, s) {
        return e >= Ve(t, s) && e < Ie(t, s);
      }
      function ws(e, t, s) {
        for (var u = s ? es : Fr, f = e[0].length, m = e.length, _ = m, x = M(m), E = 1 / 0, L = []; _--; ) {
          var N = e[_];
          _ && t && (N = Se(N, nt(t))), E = Ve(N.length, E), x[_] = !s && (t || f >= 120 && N.length >= 120) ? new xn(_ && N) : r;
        }
        N = e[0];
        var D = -1, U = x[0];
        e:
          for (; ++D < f && L.length < E; ) {
            var W = N[D], K = t ? t(W) : W;
            if (W = s || W !== 0 ? W : 0, !(U ? cr(U, K) : u(L, K, s))) {
              for (_ = m; --_; ) {
                var re = x[_];
                if (!(re ? cr(re, K) : u(e[_], K, s)))
                  continue e;
              }
              U && U.push(K), L.push(W);
            }
          }
        return L;
      }
      function hf(e, t, s, u) {
        return kt(e, function(f, m, _) {
          t(u, s(f), m, _);
        }), u;
      }
      function wr(e, t, s) {
        t = cn(t, e), e = ol(e, t);
        var u = e == null ? e : e[It(gt(t))];
        return u == null ? r : tt(u, e, s);
      }
      function ba(e) {
        return Me(e) && Ye(e) == Bn;
      }
      function ff(e) {
        return Me(e) && Ye(e) == ur;
      }
      function df(e) {
        return Me(e) && Ye(e) == ir;
      }
      function _r(e, t, s, u, f) {
        return e === t ? !0 : e == null || t == null || !Me(e) && !Me(t) ? e !== e && t !== t : pf(e, t, s, u, _r, f);
      }
      function pf(e, t, s, u, f, m) {
        var _ = te(e), x = te(t), E = _ ? kr : He(e), L = x ? kr : He(t);
        E = E == Bn ? Vt : E, L = L == Bn ? Vt : L;
        var N = E == Vt, D = L == Vt, U = E == L;
        if (U && fn(e)) {
          if (!fn(t))
            return !1;
          _ = !0, N = !1;
        }
        if (U && !N)
          return m || (m = new yt()), _ || Yn(e) ? ja(e, t, s, u, f, m) : Uf(e, t, E, s, u, f, m);
        if (!(s & F)) {
          var W = N && pe.call(e, "__wrapped__"), K = D && pe.call(t, "__wrapped__");
          if (W || K) {
            var re = W ? e.value() : e, X = K ? t.value() : t;
            return m || (m = new yt()), f(re, X, s, u, m);
          }
        }
        return U ? (m || (m = new yt()), Vf(e, t, s, u, f, m)) : !1;
      }
      function gf(e) {
        return Me(e) && He(e) == _t;
      }
      function _s(e, t, s, u) {
        var f = s.length, m = f, _ = !u;
        if (e == null)
          return !m;
        for (e = we(e); f--; ) {
          var x = s[f];
          if (_ && x[2] ? x[1] !== e[x[0]] : !(x[0] in e))
            return !1;
        }
        for (; ++f < m; ) {
          x = s[f];
          var E = x[0], L = e[E], N = x[1];
          if (_ && x[2]) {
            if (L === r && !(E in e))
              return !1;
          } else {
            var D = new yt();
            if (u)
              var U = u(L, N, E, e, t, D);
            if (!(U === r ? _r(N, L, F | R, u, D) : U))
              return !1;
          }
        }
        return !0;
      }
      function xa(e) {
        if (!Te(e) || Zf(e))
          return !1;
        var t = Kt(e) ? ph : ic;
        return t.test(Tn(e));
      }
      function mf(e) {
        return Me(e) && Ye(e) == or;
      }
      function vf(e) {
        return Me(e) && He(e) == bt;
      }
      function wf(e) {
        return Me(e) && bi(e.length) && !!Ee[Ye(e)];
      }
      function ya(e) {
        return typeof e == "function" ? e : e == null ? je : typeof e == "object" ? te(e) ? Ta(e[0], e[1]) : Sa(e) : Wl(e);
      }
      function bs(e) {
        if (!yr(e))
          return bh(e);
        var t = [];
        for (var s in we(e))
          pe.call(e, s) && s != "constructor" && t.push(s);
        return t;
      }
      function _f(e) {
        if (!Te(e))
          return td(e);
        var t = yr(e), s = [];
        for (var u in e)
          u == "constructor" && (t || !pe.call(e, u)) || s.push(u);
        return s;
      }
      function xs(e, t) {
        return e < t;
      }
      function Ea(e, t) {
        var s = -1, u = Ze(e) ? M(e.length) : [];
        return ln(e, function(f, m, _) {
          u[++s] = t(f, m, _);
        }), u;
      }
      function Sa(e) {
        var t = Os(e);
        return t.length == 1 && t[0][2] ? il(t[0][0], t[0][1]) : function(s) {
          return s === e || _s(s, e, t);
        };
      }
      function Ta(e, t) {
        return Fs(e) && rl(t) ? il(It(e), t) : function(s) {
          var u = Qs(s, e);
          return u === r && u === t ? Ks(s, e) : _r(t, u, F | R);
        };
      }
      function ii(e, t, s, u, f) {
        e !== t && gs(t, function(m, _) {
          if (f || (f = new yt()), Te(m))
            bf(e, t, _, s, ii, u, f);
          else {
            var x = u ? u(zs(e, _), m, _ + "", e, t, f) : r;
            x === r && (x = m), ds(e, _, x);
          }
        }, Je);
      }
      function bf(e, t, s, u, f, m, _) {
        var x = zs(e, s), E = zs(t, s), L = _.get(E);
        if (L) {
          ds(e, s, L);
          return;
        }
        var N = m ? m(x, E, s + "", e, t, _) : r, D = N === r;
        if (D) {
          var U = te(E), W = !U && fn(E), K = !U && !W && Yn(E);
          N = E, U || W || K ? te(x) ? N = x : Pe(x) ? N = Xe(x) : W ? (D = !1, N = Da(E, !0)) : K ? (D = !1, N = Fa(E, !0)) : N = [] : Sr(E) || Mn(E) ? (N = x, Mn(x) ? N = Ll(x) : (!Te(x) || Kt(x)) && (N = nl(E))) : D = !1;
        }
        D && (_.set(E, N), f(N, E, u, m, _), _.delete(E)), ds(e, s, N);
      }
      function Ma(e, t) {
        var s = e.length;
        if (s)
          return t += t < 0 ? s : 0, Qt(t, s) ? e[t] : r;
      }
      function Ca(e, t, s) {
        t.length ? t = Se(t, function(m) {
          return te(m) ? function(_) {
            return En(_, m.length === 1 ? m[0] : m);
          } : m;
        }) : t = [je];
        var u = -1;
        t = Se(t, nt(G()));
        var f = Ea(e, function(m, _, x) {
          var E = Se(t, function(L) {
            return L(m);
          });
          return { criteria: E, index: ++u, value: m };
        });
        return Yc(f, function(m, _) {
          return If(m, _, s);
        });
      }
      function xf(e, t) {
        return Pa(e, t, function(s, u) {
          return Ks(e, u);
        });
      }
      function Pa(e, t, s) {
        for (var u = -1, f = t.length, m = {}; ++u < f; ) {
          var _ = t[u], x = En(e, _);
          s(x, _) && br(m, cn(_, e), x);
        }
        return m;
      }
      function yf(e) {
        return function(t) {
          return En(t, e);
        };
      }
      function ys(e, t, s, u) {
        var f = u ? qc : Nn, m = -1, _ = t.length, x = e;
        for (e === t && (t = Xe(t)), s && (x = Se(e, nt(s))); ++m < _; )
          for (var E = 0, L = t[m], N = s ? s(L) : L; (E = f(x, N, E, u)) > -1; )
            x !== e && Qr.call(x, E, 1), Qr.call(e, E, 1);
        return e;
      }
      function Aa(e, t) {
        for (var s = e ? t.length : 0, u = s - 1; s--; ) {
          var f = t[s];
          if (s == u || f !== m) {
            var m = f;
            Qt(f) ? Qr.call(e, f, 1) : Ms(e, f);
          }
        }
        return e;
      }
      function Es(e, t) {
        return e + Zr(ua() * (t - e + 1));
      }
      function Ef(e, t, s, u) {
        for (var f = -1, m = Ie(Xr((t - e) / (s || 1)), 0), _ = M(m); m--; )
          _[u ? m : ++f] = e, e += s;
        return _;
      }
      function Ss(e, t) {
        var s = "";
        if (!e || t < 1 || t > nn)
          return s;
        do
          t % 2 && (s += e), t = Zr(t / 2), t && (e += e);
        while (t);
        return s;
      }
      function ie(e, t) {
        return Us(sl(e, t, je), e + "");
      }
      function Sf(e) {
        return fa(Gn(e));
      }
      function Tf(e, t) {
        var s = Gn(e);
        return pi(s, yn(t, 0, s.length));
      }
      function br(e, t, s, u) {
        if (!Te(e))
          return e;
        t = cn(t, e);
        for (var f = -1, m = t.length, _ = m - 1, x = e; x != null && ++f < m; ) {
          var E = It(t[f]), L = s;
          if (E === "__proto__" || E === "constructor" || E === "prototype")
            return e;
          if (f != _) {
            var N = x[E];
            L = u ? u(N, E, x) : r, L === r && (L = Te(N) ? N : Qt(t[f + 1]) ? [] : {});
          }
          mr(x, E, L), x = x[E];
        }
        return e;
      }
      var Ra = Jr ? function(e, t) {
        return Jr.set(e, t), e;
      } : je, Mf = Kr ? function(e, t) {
        return Kr(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Zs(t),
          writable: !0
        });
      } : je;
      function Cf(e) {
        return pi(Gn(e));
      }
      function pt(e, t, s) {
        var u = -1, f = e.length;
        t < 0 && (t = -t > f ? 0 : f + t), s = s > f ? f : s, s < 0 && (s += f), f = t > s ? 0 : s - t >>> 0, t >>>= 0;
        for (var m = M(f); ++u < f; )
          m[u] = e[u + t];
        return m;
      }
      function Pf(e, t) {
        var s;
        return ln(e, function(u, f, m) {
          return s = t(u, f, m), !s;
        }), !!s;
      }
      function si(e, t, s) {
        var u = 0, f = e == null ? u : e.length;
        if (typeof t == "number" && t === t && f <= Au) {
          for (; u < f; ) {
            var m = u + f >>> 1, _ = e[m];
            _ !== null && !it(_) && (s ? _ <= t : _ < t) ? u = m + 1 : f = m;
          }
          return f;
        }
        return Ts(e, t, je, s);
      }
      function Ts(e, t, s, u) {
        var f = 0, m = e == null ? 0 : e.length;
        if (m === 0)
          return 0;
        t = s(t);
        for (var _ = t !== t, x = t === null, E = it(t), L = t === r; f < m; ) {
          var N = Zr((f + m) / 2), D = s(e[N]), U = D !== r, W = D === null, K = D === D, re = it(D);
          if (_)
            var X = u || K;
          else
            L ? X = K && (u || U) : x ? X = K && U && (u || !W) : E ? X = K && U && !W && (u || !re) : W || re ? X = !1 : X = u ? D <= t : D < t;
          X ? f = N + 1 : m = N;
        }
        return Ve(m, Pu);
      }
      function ka(e, t) {
        for (var s = -1, u = e.length, f = 0, m = []; ++s < u; ) {
          var _ = e[s], x = t ? t(_) : _;
          if (!s || !Et(x, E)) {
            var E = x;
            m[f++] = _ === 0 ? 0 : _;
          }
        }
        return m;
      }
      function Ba(e) {
        return typeof e == "number" ? e : it(e) ? Rr : +e;
      }
      function rt(e) {
        if (typeof e == "string")
          return e;
        if (te(e))
          return Se(e, rt) + "";
        if (it(e))
          return ca ? ca.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -vn ? "-0" : t;
      }
      function un(e, t, s) {
        var u = -1, f = Fr, m = e.length, _ = !0, x = [], E = x;
        if (s)
          _ = !1, f = es;
        else if (m >= l) {
          var L = t ? null : $f(e);
          if (L)
            return zr(L);
          _ = !1, f = cr, E = new xn();
        } else
          E = t ? [] : x;
        e:
          for (; ++u < m; ) {
            var N = e[u], D = t ? t(N) : N;
            if (N = s || N !== 0 ? N : 0, _ && D === D) {
              for (var U = E.length; U--; )
                if (E[U] === D)
                  continue e;
              t && E.push(D), x.push(N);
            } else
              f(E, D, s) || (E !== x && E.push(D), x.push(N));
          }
        return x;
      }
      function Ms(e, t) {
        t = cn(t, e);
        var s = -1, u = t.length;
        if (!u)
          return !0;
        for (var f = e == null || typeof e != "object" && typeof e != "function"; ++s < u; ) {
          var m = t[s];
          if (typeof m == "string") {
            if (m === "__proto__" && !pe.call(e, "__proto__"))
              return !1;
            if (m === "constructor" && s + 1 < u && typeof t[s + 1] == "string" && t[s + 1] === "prototype") {
              if (f && s === 0)
                continue;
              return !1;
            }
          }
        }
        var _ = ol(e, t);
        return _ == null || delete _[It(gt(t))];
      }
      function Ia(e, t, s, u) {
        return br(e, t, s(En(e, t)), u);
      }
      function oi(e, t, s, u) {
        for (var f = e.length, m = u ? f : -1; (u ? m-- : ++m < f) && t(e[m], m, e); )
          ;
        return s ? pt(e, u ? 0 : m, u ? m + 1 : f) : pt(e, u ? m + 1 : 0, u ? f : m);
      }
      function La(e, t) {
        var s = e;
        return s instanceof le && (s = s.value()), ts(t, function(u, f) {
          return f.func.apply(f.thisArg, sn([u], f.args));
        }, s);
      }
      function Cs(e, t, s) {
        var u = e.length;
        if (u < 2)
          return u ? un(e[0]) : [];
        for (var f = -1, m = M(u); ++f < u; )
          for (var _ = e[f], x = -1; ++x < u; )
            x != f && (m[f] = vr(m[f] || _, e[x], t, s));
        return un(Fe(m, 1), t, s);
      }
      function Na(e, t, s) {
        for (var u = -1, f = e.length, m = t.length, _ = {}; ++u < f; ) {
          var x = u < m ? t[u] : r;
          s(_, e[u], x);
        }
        return _;
      }
      function Ps(e) {
        return Pe(e) ? e : [];
      }
      function As(e) {
        return typeof e == "function" ? e : je;
      }
      function cn(e, t) {
        return te(e) ? e : Fs(e, t) ? [e] : cl(ge(e));
      }
      var Af = ie;
      function hn(e, t, s) {
        var u = e.length;
        return s = s === r ? u : s, !t && s >= u ? e : pt(e, t, s);
      }
      var Oa = gh || function(e) {
        return De.clearTimeout(e);
      };
      function Da(e, t) {
        if (t)
          return e.slice();
        var s = e.length, u = ia ? ia(s) : new e.constructor(s);
        return e.copy(u), u;
      }
      function Rs(e) {
        var t = new e.constructor(e.byteLength);
        return new Yr(t).set(new Yr(e)), t;
      }
      function Rf(e, t) {
        var s = t ? Rs(e.buffer) : e.buffer;
        return new e.constructor(s, e.byteOffset, e.byteLength);
      }
      function kf(e) {
        var t = new e.constructor(e.source, bo.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function Bf(e) {
        return gr ? we(gr.call(e)) : {};
      }
      function Fa(e, t) {
        var s = t ? Rs(e.buffer) : e.buffer;
        return new e.constructor(s, e.byteOffset, e.length);
      }
      function $a(e, t) {
        if (e !== t) {
          var s = e !== r, u = e === null, f = e === e, m = it(e), _ = t !== r, x = t === null, E = t === t, L = it(t);
          if (!x && !L && !m && e > t || m && _ && E && !x && !L || u && _ && E || !s && E || !f)
            return 1;
          if (!u && !m && !L && e < t || L && s && f && !u && !m || x && s && f || !_ && f || !E)
            return -1;
        }
        return 0;
      }
      function If(e, t, s) {
        for (var u = -1, f = e.criteria, m = t.criteria, _ = f.length, x = s.length; ++u < _; ) {
          var E = $a(f[u], m[u]);
          if (E) {
            if (u >= x)
              return E;
            var L = s[u];
            return E * (L == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function za(e, t, s, u) {
        for (var f = -1, m = e.length, _ = s.length, x = -1, E = t.length, L = Ie(m - _, 0), N = M(E + L), D = !u; ++x < E; )
          N[x] = t[x];
        for (; ++f < _; )
          (D || f < m) && (N[s[f]] = e[f]);
        for (; L--; )
          N[x++] = e[f++];
        return N;
      }
      function Ua(e, t, s, u) {
        for (var f = -1, m = e.length, _ = -1, x = s.length, E = -1, L = t.length, N = Ie(m - x, 0), D = M(N + L), U = !u; ++f < N; )
          D[f] = e[f];
        for (var W = f; ++E < L; )
          D[W + E] = t[E];
        for (; ++_ < x; )
          (U || f < m) && (D[W + s[_]] = e[f++]);
        return D;
      }
      function Xe(e, t) {
        var s = -1, u = e.length;
        for (t || (t = M(u)); ++s < u; )
          t[s] = e[s];
        return t;
      }
      function Bt(e, t, s, u) {
        var f = !s;
        s || (s = {});
        for (var m = -1, _ = t.length; ++m < _; ) {
          var x = t[m], E = u ? u(s[x], e[x], x, s, e) : r;
          E === r && (E = e[x]), f ? qt(s, x, E) : mr(s, x, E);
        }
        return s;
      }
      function Lf(e, t) {
        return Bt(e, Ds(e), t);
      }
      function Nf(e, t) {
        return Bt(e, el(e), t);
      }
      function ai(e, t) {
        return function(s, u) {
          var f = te(s) ? $c : nf, m = t ? t() : {};
          return f(s, e, G(u, 2), m);
        };
      }
      function Hn(e) {
        return ie(function(t, s) {
          var u = -1, f = s.length, m = f > 1 ? s[f - 1] : r, _ = f > 2 ? s[2] : r;
          for (m = e.length > 3 && typeof m == "function" ? (f--, m) : r, _ && Ge(s[0], s[1], _) && (m = f < 3 ? r : m, f = 1), t = we(t); ++u < f; ) {
            var x = s[u];
            x && e(t, x, u, m);
          }
          return t;
        });
      }
      function Va(e, t) {
        return function(s, u) {
          if (s == null)
            return s;
          if (!Ze(s))
            return e(s, u);
          for (var f = s.length, m = t ? f : -1, _ = we(s); (t ? m-- : ++m < f) && u(_[m], m, _) !== !1; )
            ;
          return s;
        };
      }
      function Ha(e) {
        return function(t, s, u) {
          for (var f = -1, m = we(t), _ = u(t), x = _.length; x--; ) {
            var E = _[e ? x : ++f];
            if (s(m[E], E, m) === !1)
              break;
          }
          return t;
        };
      }
      function Of(e, t, s) {
        var u = t & C, f = xr(e);
        function m() {
          var _ = this && this !== De && this instanceof m ? f : e;
          return _.apply(u ? s : this, arguments);
        }
        return m;
      }
      function Wa(e) {
        return function(t) {
          t = ge(t);
          var s = On(t) ? xt(t) : r, u = s ? s[0] : t.charAt(0), f = s ? hn(s, 1).join("") : t.slice(1);
          return u[e]() + f;
        };
      }
      function Wn(e) {
        return function(t) {
          return ts(Vl(Ul(t).replace(Tc, "")), e, "");
        };
      }
      function xr(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var s = Vn(e.prototype), u = e.apply(s, t);
          return Te(u) ? u : s;
        };
      }
      function Df(e, t, s) {
        var u = xr(e);
        function f() {
          for (var m = arguments.length, _ = M(m), x = m, E = qn(f); x--; )
            _[x] = arguments[x];
          var L = m < 3 && _[0] !== E && _[m - 1] !== E ? [] : on(_, E);
          if (m -= L.length, m < s)
            return Ka(
              e,
              t,
              li,
              f.placeholder,
              r,
              _,
              L,
              r,
              r,
              s - m
            );
          var N = this && this !== De && this instanceof f ? u : e;
          return tt(N, this, _);
        }
        return f;
      }
      function qa(e) {
        return function(t, s, u) {
          var f = we(t);
          if (!Ze(t)) {
            var m = G(s, 3);
            t = Oe(t), s = function(x) {
              return m(f[x], x, f);
            };
          }
          var _ = e(t, s, u);
          return _ > -1 ? f[m ? t[_] : _] : r;
        };
      }
      function Ya(e) {
        return Gt(function(t) {
          var s = t.length, u = s, f = ft.prototype.thru;
          for (e && t.reverse(); u--; ) {
            var m = t[u];
            if (typeof m != "function")
              throw new ht(c);
            if (f && !_ && fi(m) == "wrapper")
              var _ = new ft([], !0);
          }
          for (u = _ ? u : s; ++u < s; ) {
            m = t[u];
            var x = fi(m), E = x == "wrapper" ? Ns(m) : r;
            E && $s(E[0]) && E[1] == (he | $ | Z | ee) && !E[4].length && E[9] == 1 ? _ = _[fi(E[0])].apply(_, E[3]) : _ = m.length == 1 && $s(m) ? _[x]() : _.thru(m);
          }
          return function() {
            var L = arguments, N = L[0];
            if (_ && L.length == 1 && te(N))
              return _.plant(N).value();
            for (var D = 0, U = s ? t[D].apply(this, L) : N; ++D < s; )
              U = t[D].call(this, U);
            return U;
          };
        });
      }
      function li(e, t, s, u, f, m, _, x, E, L) {
        var N = t & he, D = t & C, U = t & B, W = t & ($ | H), K = t & Ue, re = U ? r : xr(e);
        function X() {
          for (var ae = arguments.length, ue = M(ae), st = ae; st--; )
            ue[st] = arguments[st];
          if (W)
            var Qe = qn(X), ot = Qc(ue, Qe);
          if (u && (ue = za(ue, u, f, W)), m && (ue = Ua(ue, m, _, W)), ae -= ot, W && ae < L) {
            var Ae = on(ue, Qe);
            return Ka(
              e,
              t,
              li,
              X.placeholder,
              s,
              ue,
              Ae,
              x,
              E,
              L - ae
            );
          }
          var St = D ? s : this, Zt = U ? St[e] : e;
          return ae = ue.length, x ? ue = rd(ue, x) : K && ae > 1 && ue.reverse(), N && E < ae && (ue.length = E), this && this !== De && this instanceof X && (Zt = re || xr(Zt)), Zt.apply(St, ue);
        }
        return X;
      }
      function Ga(e, t) {
        return function(s, u) {
          return hf(s, e, t(u), {});
        };
      }
      function ui(e, t) {
        return function(s, u) {
          var f;
          if (s === r && u === r)
            return t;
          if (s !== r && (f = s), u !== r) {
            if (f === r)
              return u;
            typeof s == "string" || typeof u == "string" ? (s = rt(s), u = rt(u)) : (s = Ba(s), u = Ba(u)), f = e(s, u);
          }
          return f;
        };
      }
      function ks(e) {
        return Gt(function(t) {
          return t = Se(t, nt(G())), ie(function(s) {
            var u = this;
            return e(t, function(f) {
              return tt(f, u, s);
            });
          });
        });
      }
      function ci(e, t) {
        t = t === r ? " " : rt(t);
        var s = t.length;
        if (s < 2)
          return s ? Ss(t, e) : t;
        var u = Ss(t, Xr(e / Dn(t)));
        return On(t) ? hn(xt(u), 0, e).join("") : u.slice(0, e);
      }
      function Ff(e, t, s, u) {
        var f = t & C, m = xr(e);
        function _() {
          for (var x = -1, E = arguments.length, L = -1, N = u.length, D = M(N + E), U = this && this !== De && this instanceof _ ? m : e; ++L < N; )
            D[L] = u[L];
          for (; E--; )
            D[L++] = arguments[++x];
          return tt(U, f ? s : this, D);
        }
        return _;
      }
      function Qa(e) {
        return function(t, s, u) {
          return u && typeof u != "number" && Ge(t, s, u) && (s = u = r), t = Xt(t), s === r ? (s = t, t = 0) : s = Xt(s), u = u === r ? t < s ? 1 : -1 : Xt(u), Ef(t, s, u, e);
        };
      }
      function hi(e) {
        return function(t, s) {
          return typeof t == "string" && typeof s == "string" || (t = mt(t), s = mt(s)), e(t, s);
        };
      }
      function Ka(e, t, s, u, f, m, _, x, E, L) {
        var N = t & $, D = N ? _ : r, U = N ? r : _, W = N ? m : r, K = N ? r : m;
        t |= N ? Z : ce, t &= ~(N ? ce : Z), t & z || (t &= ~(C | B));
        var re = [
          e,
          t,
          f,
          W,
          D,
          K,
          U,
          x,
          E,
          L
        ], X = s.apply(r, re);
        return $s(e) && al(X, re), X.placeholder = u, ll(X, e, t);
      }
      function Bs(e) {
        var t = Be[e];
        return function(s, u) {
          if (s = mt(s), u = u == null ? 0 : Ve(ne(u), 292), u && la(s)) {
            var f = (ge(s) + "e").split("e"), m = t(f[0] + "e" + (+f[1] + u));
            return f = (ge(m) + "e").split("e"), +(f[0] + "e" + (+f[1] - u));
          }
          return t(s);
        };
      }
      var $f = zn && 1 / zr(new zn([, -0]))[1] == vn ? function(e) {
        return new zn(e);
      } : eo;
      function Xa(e) {
        return function(t) {
          var s = He(t);
          return s == _t ? ls(t) : s == bt ? th(t) : Gc(t, e(t));
        };
      }
      function Yt(e, t, s, u, f, m, _, x) {
        var E = t & B;
        if (!E && typeof e != "function")
          throw new ht(c);
        var L = u ? u.length : 0;
        if (L || (t &= ~(Z | ce), u = f = r), _ = _ === r ? _ : Ie(ne(_), 0), x = x === r ? x : ne(x), L -= f ? f.length : 0, t & ce) {
          var N = u, D = f;
          u = f = r;
        }
        var U = E ? r : Ns(e), W = [
          e,
          t,
          s,
          u,
          f,
          N,
          D,
          m,
          _,
          x
        ];
        if (U && ed(W, U), e = W[0], t = W[1], s = W[2], u = W[3], f = W[4], x = W[9] = W[9] === r ? E ? 0 : e.length : Ie(W[9] - L, 0), !x && t & ($ | H) && (t &= ~($ | H)), !t || t == C)
          var K = Of(e, t, s);
        else
          t == $ || t == H ? K = Df(e, t, x) : (t == Z || t == (C | Z)) && !f.length ? K = Ff(e, t, s, u) : K = li.apply(r, W);
        var re = U ? Ra : al;
        return ll(re(K, W), e, t);
      }
      function Za(e, t, s, u) {
        return e === r || Et(e, $n[s]) && !pe.call(u, s) ? t : e;
      }
      function Ja(e, t, s, u, f, m) {
        return Te(e) && Te(t) && (m.set(t, e), ii(e, t, r, Ja, m), m.delete(t)), e;
      }
      function zf(e) {
        return Sr(e) ? r : e;
      }
      function ja(e, t, s, u, f, m) {
        var _ = s & F, x = e.length, E = t.length;
        if (x != E && !(_ && E > x))
          return !1;
        var L = m.get(e), N = m.get(t);
        if (L && N)
          return L == t && N == e;
        var D = -1, U = !0, W = s & R ? new xn() : r;
        for (m.set(e, t), m.set(t, e); ++D < x; ) {
          var K = e[D], re = t[D];
          if (u)
            var X = _ ? u(re, K, D, t, e, m) : u(K, re, D, e, t, m);
          if (X !== r) {
            if (X)
              continue;
            U = !1;
            break;
          }
          if (W) {
            if (!ns(t, function(ae, ue) {
              if (!cr(W, ue) && (K === ae || f(K, ae, s, u, m)))
                return W.push(ue);
            })) {
              U = !1;
              break;
            }
          } else if (!(K === re || f(K, re, s, u, m))) {
            U = !1;
            break;
          }
        }
        return m.delete(e), m.delete(t), U;
      }
      function Uf(e, t, s, u, f, m, _) {
        switch (s) {
          case In:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case ur:
            return !(e.byteLength != t.byteLength || !m(new Yr(e), new Yr(t)));
          case rr:
          case ir:
          case sr:
            return Et(+e, +t);
          case Br:
            return e.name == t.name && e.message == t.message;
          case or:
          case ar:
            return e == t + "";
          case _t:
            var x = ls;
          case bt:
            var E = u & F;
            if (x || (x = zr), e.size != t.size && !E)
              return !1;
            var L = _.get(e);
            if (L)
              return L == t;
            u |= R, _.set(e, t);
            var N = ja(x(e), x(t), u, f, m, _);
            return _.delete(e), N;
          case Lr:
            if (gr)
              return gr.call(e) == gr.call(t);
        }
        return !1;
      }
      function Vf(e, t, s, u, f, m) {
        var _ = s & F, x = Is(e), E = x.length, L = Is(t), N = L.length;
        if (E != N && !_)
          return !1;
        for (var D = E; D--; ) {
          var U = x[D];
          if (!(_ ? U in t : pe.call(t, U)))
            return !1;
        }
        var W = m.get(e), K = m.get(t);
        if (W && K)
          return W == t && K == e;
        var re = !0;
        m.set(e, t), m.set(t, e);
        for (var X = _; ++D < E; ) {
          U = x[D];
          var ae = e[U], ue = t[U];
          if (u)
            var st = _ ? u(ue, ae, U, t, e, m) : u(ae, ue, U, e, t, m);
          if (!(st === r ? ae === ue || f(ae, ue, s, u, m) : st)) {
            re = !1;
            break;
          }
          X || (X = U == "constructor");
        }
        if (re && !X) {
          var Qe = e.constructor, ot = t.constructor;
          Qe != ot && "constructor" in e && "constructor" in t && !(typeof Qe == "function" && Qe instanceof Qe && typeof ot == "function" && ot instanceof ot) && (re = !1);
        }
        return m.delete(e), m.delete(t), re;
      }
      function Gt(e) {
        return Us(sl(e, r, pl), e + "");
      }
      function Is(e) {
        return _a(e, Oe, Ds);
      }
      function Ls(e) {
        return _a(e, Je, el);
      }
      var Ns = Jr ? function(e) {
        return Jr.get(e);
      } : eo;
      function fi(e) {
        for (var t = e.name + "", s = Un[t], u = pe.call(Un, t) ? s.length : 0; u--; ) {
          var f = s[u], m = f.func;
          if (m == null || m == e)
            return f.name;
        }
        return t;
      }
      function qn(e) {
        var t = pe.call(g, "placeholder") ? g : e;
        return t.placeholder;
      }
      function G() {
        var e = g.iteratee || Js;
        return e = e === Js ? ya : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function di(e, t) {
        var s = e.__data__;
        return Xf(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
      }
      function Os(e) {
        for (var t = Oe(e), s = t.length; s--; ) {
          var u = t[s], f = e[u];
          t[s] = [u, f, rl(f)];
        }
        return t;
      }
      function Sn(e, t) {
        var s = Jc(e, t);
        return xa(s) ? s : r;
      }
      function Hf(e) {
        var t = pe.call(e, _n), s = e[_n];
        try {
          e[_n] = r;
          var u = !0;
        } catch {
        }
        var f = Wr.call(e);
        return u && (t ? e[_n] = s : delete e[_n]), f;
      }
      var Ds = cs ? function(e) {
        return e == null ? [] : (e = we(e), rn(cs(e), function(t) {
          return oa.call(e, t);
        }));
      } : to, el = cs ? function(e) {
        for (var t = []; e; )
          sn(t, Ds(e)), e = Gr(e);
        return t;
      } : to, He = Ye;
      (hs && He(new hs(new ArrayBuffer(1))) != In || fr && He(new fr()) != _t || fs && He(fs.resolve()) != mo || zn && He(new zn()) != bt || dr && He(new dr()) != lr) && (He = function(e) {
        var t = Ye(e), s = t == Vt ? e.constructor : r, u = s ? Tn(s) : "";
        if (u)
          switch (u) {
            case Sh:
              return In;
            case Th:
              return _t;
            case Mh:
              return mo;
            case Ch:
              return bt;
            case Ph:
              return lr;
          }
        return t;
      });
      function Wf(e, t, s) {
        for (var u = -1, f = s.length; ++u < f; ) {
          var m = s[u], _ = m.size;
          switch (m.type) {
            case "drop":
              e += _;
              break;
            case "dropRight":
              t -= _;
              break;
            case "take":
              t = Ve(t, e + _);
              break;
            case "takeRight":
              e = Ie(e, t - _);
              break;
          }
        }
        return { start: e, end: t };
      }
      function qf(e) {
        var t = e.match(Xu);
        return t ? t[1].split(Zu) : [];
      }
      function tl(e, t, s) {
        t = cn(t, e);
        for (var u = -1, f = t.length, m = !1; ++u < f; ) {
          var _ = It(t[u]);
          if (!(m = e != null && s(e, _)))
            break;
          e = e[_];
        }
        return m || ++u != f ? m : (f = e == null ? 0 : e.length, !!f && bi(f) && Qt(_, f) && (te(e) || Mn(e)));
      }
      function Yf(e) {
        var t = e.length, s = new e.constructor(t);
        return t && typeof e[0] == "string" && pe.call(e, "index") && (s.index = e.index, s.input = e.input), s;
      }
      function nl(e) {
        return typeof e.constructor == "function" && !yr(e) ? Vn(Gr(e)) : {};
      }
      function Gf(e, t, s) {
        var u = e.constructor;
        switch (t) {
          case ur:
            return Rs(e);
          case rr:
          case ir:
            return new u(+e);
          case In:
            return Rf(e, s);
          case Oi:
          case Di:
          case Fi:
          case $i:
          case zi:
          case Ui:
          case Vi:
          case Hi:
          case Wi:
            return Fa(e, s);
          case _t:
            return new u();
          case sr:
          case ar:
            return new u(e);
          case or:
            return kf(e);
          case bt:
            return new u();
          case Lr:
            return Bf(e);
        }
      }
      function Qf(e, t) {
        var s = t.length;
        if (!s)
          return e;
        var u = s - 1;
        return t[u] = (s > 1 ? "& " : "") + t[u], t = t.join(s > 2 ? ", " : " "), e.replace(Ku, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Kf(e) {
        return te(e) || Mn(e) || !!(aa && e && e[aa]);
      }
      function Qt(e, t) {
        var s = typeof e;
        return t = t ?? nn, !!t && (s == "number" || s != "symbol" && oc.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ge(e, t, s) {
        if (!Te(s))
          return !1;
        var u = typeof t;
        return (u == "number" ? Ze(s) && Qt(t, s.length) : u == "string" && t in s) ? Et(s[t], e) : !1;
      }
      function Fs(e, t) {
        if (te(e))
          return !1;
        var s = typeof e;
        return s == "number" || s == "symbol" || s == "boolean" || e == null || it(e) ? !0 : qu.test(e) || !Wu.test(e) || t != null && e in we(t);
      }
      function Xf(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function $s(e) {
        var t = fi(e), s = g[t];
        if (typeof s != "function" || !(t in le.prototype))
          return !1;
        if (e === s)
          return !0;
        var u = Ns(s);
        return !!u && e === u[0];
      }
      function Zf(e) {
        return !!ra && ra in e;
      }
      var Jf = Vr ? Kt : no;
      function yr(e) {
        var t = e && e.constructor, s = typeof t == "function" && t.prototype || $n;
        return e === s;
      }
      function rl(e) {
        return e === e && !Te(e);
      }
      function il(e, t) {
        return function(s) {
          return s == null ? !1 : s[e] === t && (t !== r || e in we(s));
        };
      }
      function jf(e) {
        var t = wi(e, function(u) {
          return s.size === d && s.clear(), u;
        }), s = t.cache;
        return t;
      }
      function ed(e, t) {
        var s = e[1], u = t[1], f = s | u, m = f < (C | B | he), _ = u == he && s == $ || u == he && s == ee && e[7].length <= t[8] || u == (he | ee) && t[7].length <= t[8] && s == $;
        if (!(m || _))
          return e;
        u & C && (e[2] = t[2], f |= s & C ? 0 : z);
        var x = t[3];
        if (x) {
          var E = e[3];
          e[3] = E ? za(E, x, t[4]) : x, e[4] = E ? on(e[3], v) : t[4];
        }
        return x = t[5], x && (E = e[5], e[5] = E ? Ua(E, x, t[6]) : x, e[6] = E ? on(e[5], v) : t[6]), x = t[7], x && (e[7] = x), u & he && (e[8] = e[8] == null ? t[8] : Ve(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = f, e;
      }
      function td(e) {
        var t = [];
        if (e != null)
          for (var s in we(e))
            t.push(s);
        return t;
      }
      function nd(e) {
        return Wr.call(e);
      }
      function sl(e, t, s) {
        return t = Ie(t === r ? e.length - 1 : t, 0), function() {
          for (var u = arguments, f = -1, m = Ie(u.length - t, 0), _ = M(m); ++f < m; )
            _[f] = u[t + f];
          f = -1;
          for (var x = M(t + 1); ++f < t; )
            x[f] = u[f];
          return x[t] = s(_), tt(e, this, x);
        };
      }
      function ol(e, t) {
        return t.length < 2 ? e : En(e, pt(t, 0, -1));
      }
      function rd(e, t) {
        for (var s = e.length, u = Ve(t.length, s), f = Xe(e); u--; ) {
          var m = t[u];
          e[u] = Qt(m, s) ? f[m] : r;
        }
        return e;
      }
      function zs(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var al = ul(Ra), Er = vh || function(e, t) {
        return De.setTimeout(e, t);
      }, Us = ul(Mf);
      function ll(e, t, s) {
        var u = t + "";
        return Us(e, Qf(u, id(qf(u), s)));
      }
      function ul(e) {
        var t = 0, s = 0;
        return function() {
          var u = xh(), f = Rn - (u - s);
          if (s = u, f > 0) {
            if (++t >= tn)
              return arguments[0];
          } else
            t = 0;
          return e.apply(r, arguments);
        };
      }
      function pi(e, t) {
        var s = -1, u = e.length, f = u - 1;
        for (t = t === r ? u : t; ++s < t; ) {
          var m = Es(s, f), _ = e[m];
          e[m] = e[s], e[s] = _;
        }
        return e.length = t, e;
      }
      var cl = jf(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Yu, function(s, u, f, m) {
          t.push(f ? m.replace(ec, "$1") : u || s);
        }), t;
      });
      function It(e) {
        if (typeof e == "string" || it(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -vn ? "-0" : t;
      }
      function Tn(e) {
        if (e != null) {
          try {
            return Hr.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function id(e, t) {
        return ct(Ru, function(s) {
          var u = "_." + s[0];
          t & s[1] && !Fr(e, u) && e.push(u);
        }), e.sort();
      }
      function hl(e) {
        if (e instanceof le)
          return e.clone();
        var t = new ft(e.__wrapped__, e.__chain__);
        return t.__actions__ = Xe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function sd(e, t, s) {
        (s ? Ge(e, t, s) : t === r) ? t = 1 : t = Ie(ne(t), 0);
        var u = e == null ? 0 : e.length;
        if (!u || t < 1)
          return [];
        for (var f = 0, m = 0, _ = M(Xr(u / t)); f < u; )
          _[m++] = pt(e, f, f += t);
        return _;
      }
      function od(e) {
        for (var t = -1, s = e == null ? 0 : e.length, u = 0, f = []; ++t < s; ) {
          var m = e[t];
          m && (f[u++] = m);
        }
        return f;
      }
      function ad() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = M(e - 1), s = arguments[0], u = e; u--; )
          t[u - 1] = arguments[u];
        return sn(te(s) ? Xe(s) : [s], Fe(t, 1));
      }
      var ld = ie(function(e, t) {
        return Pe(e) ? vr(e, Fe(t, 1, Pe, !0)) : [];
      }), ud = ie(function(e, t) {
        var s = gt(t);
        return Pe(s) && (s = r), Pe(e) ? vr(e, Fe(t, 1, Pe, !0), G(s, 2)) : [];
      }), cd = ie(function(e, t) {
        var s = gt(t);
        return Pe(s) && (s = r), Pe(e) ? vr(e, Fe(t, 1, Pe, !0), r, s) : [];
      });
      function hd(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : ne(t), pt(e, t < 0 ? 0 : t, u)) : [];
      }
      function fd(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : ne(t), t = u - t, pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function dd(e, t) {
        return e && e.length ? oi(e, G(t, 3), !0, !0) : [];
      }
      function pd(e, t) {
        return e && e.length ? oi(e, G(t, 3), !0) : [];
      }
      function gd(e, t, s, u) {
        var f = e == null ? 0 : e.length;
        return f ? (s && typeof s != "number" && Ge(e, t, s) && (s = 0, u = f), af(e, t, s, u)) : [];
      }
      function fl(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = s == null ? 0 : ne(s);
        return f < 0 && (f = Ie(u + f, 0)), $r(e, G(t, 3), f);
      }
      function dl(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = u - 1;
        return s !== r && (f = ne(s), f = s < 0 ? Ie(u + f, 0) : Ve(f, u - 1)), $r(e, G(t, 3), f, !0);
      }
      function pl(e) {
        var t = e == null ? 0 : e.length;
        return t ? Fe(e, 1) : [];
      }
      function md(e) {
        var t = e == null ? 0 : e.length;
        return t ? Fe(e, vn) : [];
      }
      function vd(e, t) {
        var s = e == null ? 0 : e.length;
        return s ? (t = t === r ? 1 : ne(t), Fe(e, t)) : [];
      }
      function wd(e) {
        for (var t = -1, s = e == null ? 0 : e.length, u = {}; ++t < s; ) {
          var f = e[t];
          u[f[0]] = f[1];
        }
        return u;
      }
      function gl(e) {
        return e && e.length ? e[0] : r;
      }
      function _d(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = s == null ? 0 : ne(s);
        return f < 0 && (f = Ie(u + f, 0)), Nn(e, t, f);
      }
      function bd(e) {
        var t = e == null ? 0 : e.length;
        return t ? pt(e, 0, -1) : [];
      }
      var xd = ie(function(e) {
        var t = Se(e, Ps);
        return t.length && t[0] === e[0] ? ws(t) : [];
      }), yd = ie(function(e) {
        var t = gt(e), s = Se(e, Ps);
        return t === gt(s) ? t = r : s.pop(), s.length && s[0] === e[0] ? ws(s, G(t, 2)) : [];
      }), Ed = ie(function(e) {
        var t = gt(e), s = Se(e, Ps);
        return t = typeof t == "function" ? t : r, t && s.pop(), s.length && s[0] === e[0] ? ws(s, r, t) : [];
      });
      function Sd(e, t) {
        return e == null ? "" : _h.call(e, t);
      }
      function gt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : r;
      }
      function Td(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = u;
        return s !== r && (f = ne(s), f = f < 0 ? Ie(u + f, 0) : Ve(f, u - 1)), t === t ? rh(e, t, f) : $r(e, Ko, f, !0);
      }
      function Md(e, t) {
        return e && e.length ? Ma(e, ne(t)) : r;
      }
      var Cd = ie(ml);
      function ml(e, t) {
        return e && e.length && t && t.length ? ys(e, t) : e;
      }
      function Pd(e, t, s) {
        return e && e.length && t && t.length ? ys(e, t, G(s, 2)) : e;
      }
      function Ad(e, t, s) {
        return e && e.length && t && t.length ? ys(e, t, r, s) : e;
      }
      var Rd = Gt(function(e, t) {
        var s = e == null ? 0 : e.length, u = ps(e, t);
        return Aa(e, Se(t, function(f) {
          return Qt(f, s) ? +f : f;
        }).sort($a)), u;
      });
      function kd(e, t) {
        var s = [];
        if (!(e && e.length))
          return s;
        var u = -1, f = [], m = e.length;
        for (t = G(t, 3); ++u < m; ) {
          var _ = e[u];
          t(_, u, e) && (s.push(_), f.push(u));
        }
        return Aa(e, f), s;
      }
      function Vs(e) {
        return e == null ? e : Eh.call(e);
      }
      function Bd(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (s && typeof s != "number" && Ge(e, t, s) ? (t = 0, s = u) : (t = t == null ? 0 : ne(t), s = s === r ? u : ne(s)), pt(e, t, s)) : [];
      }
      function Id(e, t) {
        return si(e, t);
      }
      function Ld(e, t, s) {
        return Ts(e, t, G(s, 2));
      }
      function Nd(e, t) {
        var s = e == null ? 0 : e.length;
        if (s) {
          var u = si(e, t);
          if (u < s && Et(e[u], t))
            return u;
        }
        return -1;
      }
      function Od(e, t) {
        return si(e, t, !0);
      }
      function Dd(e, t, s) {
        return Ts(e, t, G(s, 2), !0);
      }
      function Fd(e, t) {
        var s = e == null ? 0 : e.length;
        if (s) {
          var u = si(e, t, !0) - 1;
          if (Et(e[u], t))
            return u;
        }
        return -1;
      }
      function $d(e) {
        return e && e.length ? ka(e) : [];
      }
      function zd(e, t) {
        return e && e.length ? ka(e, G(t, 2)) : [];
      }
      function Ud(e) {
        var t = e == null ? 0 : e.length;
        return t ? pt(e, 1, t) : [];
      }
      function Vd(e, t, s) {
        return e && e.length ? (t = s || t === r ? 1 : ne(t), pt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Hd(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : ne(t), t = u - t, pt(e, t < 0 ? 0 : t, u)) : [];
      }
      function Wd(e, t) {
        return e && e.length ? oi(e, G(t, 3), !1, !0) : [];
      }
      function qd(e, t) {
        return e && e.length ? oi(e, G(t, 3)) : [];
      }
      var Yd = ie(function(e) {
        return un(Fe(e, 1, Pe, !0));
      }), Gd = ie(function(e) {
        var t = gt(e);
        return Pe(t) && (t = r), un(Fe(e, 1, Pe, !0), G(t, 2));
      }), Qd = ie(function(e) {
        var t = gt(e);
        return t = typeof t == "function" ? t : r, un(Fe(e, 1, Pe, !0), r, t);
      });
      function Kd(e) {
        return e && e.length ? un(e) : [];
      }
      function Xd(e, t) {
        return e && e.length ? un(e, G(t, 2)) : [];
      }
      function Zd(e, t) {
        return t = typeof t == "function" ? t : r, e && e.length ? un(e, r, t) : [];
      }
      function Hs(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = rn(e, function(s) {
          if (Pe(s))
            return t = Ie(s.length, t), !0;
        }), os(t, function(s) {
          return Se(e, rs(s));
        });
      }
      function vl(e, t) {
        if (!(e && e.length))
          return [];
        var s = Hs(e);
        return t == null ? s : Se(s, function(u) {
          return tt(t, r, u);
        });
      }
      var Jd = ie(function(e, t) {
        return Pe(e) ? vr(e, t) : [];
      }), jd = ie(function(e) {
        return Cs(rn(e, Pe));
      }), e0 = ie(function(e) {
        var t = gt(e);
        return Pe(t) && (t = r), Cs(rn(e, Pe), G(t, 2));
      }), t0 = ie(function(e) {
        var t = gt(e);
        return t = typeof t == "function" ? t : r, Cs(rn(e, Pe), r, t);
      }), n0 = ie(Hs);
      function r0(e, t) {
        return Na(e || [], t || [], mr);
      }
      function i0(e, t) {
        return Na(e || [], t || [], br);
      }
      var s0 = ie(function(e) {
        var t = e.length, s = t > 1 ? e[t - 1] : r;
        return s = typeof s == "function" ? (e.pop(), s) : r, vl(e, s);
      });
      function wl(e) {
        var t = g(e);
        return t.__chain__ = !0, t;
      }
      function o0(e, t) {
        return t(e), e;
      }
      function gi(e, t) {
        return t(e);
      }
      var a0 = Gt(function(e) {
        var t = e.length, s = t ? e[0] : 0, u = this.__wrapped__, f = function(m) {
          return ps(m, e);
        };
        return t > 1 || this.__actions__.length || !(u instanceof le) || !Qt(s) ? this.thru(f) : (u = u.slice(s, +s + (t ? 1 : 0)), u.__actions__.push({
          func: gi,
          args: [f],
          thisArg: r
        }), new ft(u, this.__chain__).thru(function(m) {
          return t && !m.length && m.push(r), m;
        }));
      });
      function l0() {
        return wl(this);
      }
      function u0() {
        return new ft(this.value(), this.__chain__);
      }
      function c0() {
        this.__values__ === r && (this.__values__ = Bl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? r : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function h0() {
        return this;
      }
      function f0(e) {
        for (var t, s = this; s instanceof ei; ) {
          var u = hl(s);
          u.__index__ = 0, u.__values__ = r, t ? f.__wrapped__ = u : t = u;
          var f = u;
          s = s.__wrapped__;
        }
        return f.__wrapped__ = e, t;
      }
      function d0() {
        var e = this.__wrapped__;
        if (e instanceof le) {
          var t = e;
          return this.__actions__.length && (t = new le(this)), t = t.reverse(), t.__actions__.push({
            func: gi,
            args: [Vs],
            thisArg: r
          }), new ft(t, this.__chain__);
        }
        return this.thru(Vs);
      }
      function p0() {
        return La(this.__wrapped__, this.__actions__);
      }
      var g0 = ai(function(e, t, s) {
        pe.call(e, s) ? ++e[s] : qt(e, s, 1);
      });
      function m0(e, t, s) {
        var u = te(e) ? Go : of;
        return s && Ge(e, t, s) && (t = r), u(e, G(t, 3));
      }
      function v0(e, t) {
        var s = te(e) ? rn : va;
        return s(e, G(t, 3));
      }
      var w0 = qa(fl), _0 = qa(dl);
      function b0(e, t) {
        return Fe(mi(e, t), 1);
      }
      function x0(e, t) {
        return Fe(mi(e, t), vn);
      }
      function y0(e, t, s) {
        return s = s === r ? 1 : ne(s), Fe(mi(e, t), s);
      }
      function _l(e, t) {
        var s = te(e) ? ct : ln;
        return s(e, G(t, 3));
      }
      function bl(e, t) {
        var s = te(e) ? zc : ma;
        return s(e, G(t, 3));
      }
      var E0 = ai(function(e, t, s) {
        pe.call(e, s) ? e[s].push(t) : qt(e, s, [t]);
      });
      function S0(e, t, s, u) {
        e = Ze(e) ? e : Gn(e), s = s && !u ? ne(s) : 0;
        var f = e.length;
        return s < 0 && (s = Ie(f + s, 0)), xi(e) ? s <= f && e.indexOf(t, s) > -1 : !!f && Nn(e, t, s) > -1;
      }
      var T0 = ie(function(e, t, s) {
        var u = -1, f = typeof t == "function", m = Ze(e) ? M(e.length) : [];
        return ln(e, function(_) {
          m[++u] = f ? tt(t, _, s) : wr(_, t, s);
        }), m;
      }), M0 = ai(function(e, t, s) {
        qt(e, s, t);
      });
      function mi(e, t) {
        var s = te(e) ? Se : Ea;
        return s(e, G(t, 3));
      }
      function C0(e, t, s, u) {
        return e == null ? [] : (te(t) || (t = t == null ? [] : [t]), s = u ? r : s, te(s) || (s = s == null ? [] : [s]), Ca(e, t, s));
      }
      var P0 = ai(function(e, t, s) {
        e[s ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function A0(e, t, s) {
        var u = te(e) ? ts : Zo, f = arguments.length < 3;
        return u(e, G(t, 4), s, f, ln);
      }
      function R0(e, t, s) {
        var u = te(e) ? Uc : Zo, f = arguments.length < 3;
        return u(e, G(t, 4), s, f, ma);
      }
      function k0(e, t) {
        var s = te(e) ? rn : va;
        return s(e, _i(G(t, 3)));
      }
      function B0(e) {
        var t = te(e) ? fa : Sf;
        return t(e);
      }
      function I0(e, t, s) {
        (s ? Ge(e, t, s) : t === r) ? t = 1 : t = ne(t);
        var u = te(e) ? ef : Tf;
        return u(e, t);
      }
      function L0(e) {
        var t = te(e) ? tf : Cf;
        return t(e);
      }
      function N0(e) {
        if (e == null)
          return 0;
        if (Ze(e))
          return xi(e) ? Dn(e) : e.length;
        var t = He(e);
        return t == _t || t == bt ? e.size : bs(e).length;
      }
      function O0(e, t, s) {
        var u = te(e) ? ns : Pf;
        return s && Ge(e, t, s) && (t = r), u(e, G(t, 3));
      }
      var D0 = ie(function(e, t) {
        if (e == null)
          return [];
        var s = t.length;
        return s > 1 && Ge(e, t[0], t[1]) ? t = [] : s > 2 && Ge(t[0], t[1], t[2]) && (t = [t[0]]), Ca(e, Fe(t, 1), []);
      }), vi = mh || function() {
        return De.Date.now();
      };
      function F0(e, t) {
        if (typeof t != "function")
          throw new ht(c);
        return e = ne(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function xl(e, t, s) {
        return t = s ? r : t, t = e && t == null ? e.length : t, Yt(e, he, r, r, r, r, t);
      }
      function yl(e, t) {
        var s;
        if (typeof t != "function")
          throw new ht(c);
        return e = ne(e), function() {
          return --e > 0 && (s = t.apply(this, arguments)), e <= 1 && (t = r), s;
        };
      }
      var Ws = ie(function(e, t, s) {
        var u = C;
        if (s.length) {
          var f = on(s, qn(Ws));
          u |= Z;
        }
        return Yt(e, u, t, s, f);
      }), El = ie(function(e, t, s) {
        var u = C | B;
        if (s.length) {
          var f = on(s, qn(El));
          u |= Z;
        }
        return Yt(t, u, e, s, f);
      });
      function Sl(e, t, s) {
        t = s ? r : t;
        var u = Yt(e, $, r, r, r, r, r, t);
        return u.placeholder = Sl.placeholder, u;
      }
      function Tl(e, t, s) {
        t = s ? r : t;
        var u = Yt(e, H, r, r, r, r, r, t);
        return u.placeholder = Tl.placeholder, u;
      }
      function Ml(e, t, s) {
        var u, f, m, _, x, E, L = 0, N = !1, D = !1, U = !0;
        if (typeof e != "function")
          throw new ht(c);
        t = mt(t) || 0, Te(s) && (N = !!s.leading, D = "maxWait" in s, m = D ? Ie(mt(s.maxWait) || 0, t) : m, U = "trailing" in s ? !!s.trailing : U);
        function W(Ae) {
          var St = u, Zt = f;
          return u = f = r, L = Ae, _ = e.apply(Zt, St), _;
        }
        function K(Ae) {
          return L = Ae, x = Er(ae, t), N ? W(Ae) : _;
        }
        function re(Ae) {
          var St = Ae - E, Zt = Ae - L, ql = t - St;
          return D ? Ve(ql, m - Zt) : ql;
        }
        function X(Ae) {
          var St = Ae - E, Zt = Ae - L;
          return E === r || St >= t || St < 0 || D && Zt >= m;
        }
        function ae() {
          var Ae = vi();
          if (X(Ae))
            return ue(Ae);
          x = Er(ae, re(Ae));
        }
        function ue(Ae) {
          return x = r, U && u ? W(Ae) : (u = f = r, _);
        }
        function st() {
          x !== r && Oa(x), L = 0, u = E = f = x = r;
        }
        function Qe() {
          return x === r ? _ : ue(vi());
        }
        function ot() {
          var Ae = vi(), St = X(Ae);
          if (u = arguments, f = this, E = Ae, St) {
            if (x === r)
              return K(E);
            if (D)
              return Oa(x), x = Er(ae, t), W(E);
          }
          return x === r && (x = Er(ae, t)), _;
        }
        return ot.cancel = st, ot.flush = Qe, ot;
      }
      var $0 = ie(function(e, t) {
        return ga(e, 1, t);
      }), z0 = ie(function(e, t, s) {
        return ga(e, mt(t) || 0, s);
      });
      function U0(e) {
        return Yt(e, Ue);
      }
      function wi(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new ht(c);
        var s = function() {
          var u = arguments, f = t ? t.apply(this, u) : u[0], m = s.cache;
          if (m.has(f))
            return m.get(f);
          var _ = e.apply(this, u);
          return s.cache = m.set(f, _) || m, _;
        };
        return s.cache = new (wi.Cache || Wt)(), s;
      }
      wi.Cache = Wt;
      function _i(e) {
        if (typeof e != "function")
          throw new ht(c);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function V0(e) {
        return yl(2, e);
      }
      var H0 = Af(function(e, t) {
        t = t.length == 1 && te(t[0]) ? Se(t[0], nt(G())) : Se(Fe(t, 1), nt(G()));
        var s = t.length;
        return ie(function(u) {
          for (var f = -1, m = Ve(u.length, s); ++f < m; )
            u[f] = t[f].call(this, u[f]);
          return tt(e, this, u);
        });
      }), qs = ie(function(e, t) {
        var s = on(t, qn(qs));
        return Yt(e, Z, r, t, s);
      }), Cl = ie(function(e, t) {
        var s = on(t, qn(Cl));
        return Yt(e, ce, r, t, s);
      }), W0 = Gt(function(e, t) {
        return Yt(e, ee, r, r, r, t);
      });
      function q0(e, t) {
        if (typeof e != "function")
          throw new ht(c);
        return t = t === r ? t : ne(t), ie(e, t);
      }
      function Y0(e, t) {
        if (typeof e != "function")
          throw new ht(c);
        return t = t == null ? 0 : Ie(ne(t), 0), ie(function(s) {
          var u = s[t], f = hn(s, 0, t);
          return u && sn(f, u), tt(e, this, f);
        });
      }
      function G0(e, t, s) {
        var u = !0, f = !0;
        if (typeof e != "function")
          throw new ht(c);
        return Te(s) && (u = "leading" in s ? !!s.leading : u, f = "trailing" in s ? !!s.trailing : f), Ml(e, t, {
          leading: u,
          maxWait: t,
          trailing: f
        });
      }
      function Q0(e) {
        return xl(e, 1);
      }
      function K0(e, t) {
        return qs(As(t), e);
      }
      function X0() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return te(e) ? e : [e];
      }
      function Z0(e) {
        return dt(e, P);
      }
      function J0(e, t) {
        return t = typeof t == "function" ? t : r, dt(e, P, t);
      }
      function j0(e) {
        return dt(e, w | P);
      }
      function ep(e, t) {
        return t = typeof t == "function" ? t : r, dt(e, w | P, t);
      }
      function tp(e, t) {
        return t == null || pa(e, t, Oe(t));
      }
      function Et(e, t) {
        return e === t || e !== e && t !== t;
      }
      var np = hi(vs), rp = hi(function(e, t) {
        return e >= t;
      }), Mn = ba(function() {
        return arguments;
      }()) ? ba : function(e) {
        return Me(e) && pe.call(e, "callee") && !oa.call(e, "callee");
      }, te = M.isArray, ip = Uo ? nt(Uo) : ff;
      function Ze(e) {
        return e != null && bi(e.length) && !Kt(e);
      }
      function Pe(e) {
        return Me(e) && Ze(e);
      }
      function sp(e) {
        return e === !0 || e === !1 || Me(e) && Ye(e) == rr;
      }
      var fn = wh || no, op = Vo ? nt(Vo) : df;
      function ap(e) {
        return Me(e) && e.nodeType === 1 && !Sr(e);
      }
      function lp(e) {
        if (e == null)
          return !0;
        if (Ze(e) && (te(e) || typeof e == "string" || typeof e.splice == "function" || fn(e) || Yn(e) || Mn(e)))
          return !e.length;
        var t = He(e);
        if (t == _t || t == bt)
          return !e.size;
        if (yr(e))
          return !bs(e).length;
        for (var s in e)
          if (pe.call(e, s))
            return !1;
        return !0;
      }
      function up(e, t) {
        return _r(e, t);
      }
      function cp(e, t, s) {
        s = typeof s == "function" ? s : r;
        var u = s ? s(e, t) : r;
        return u === r ? _r(e, t, r, s) : !!u;
      }
      function Ys(e) {
        if (!Me(e))
          return !1;
        var t = Ye(e);
        return t == Br || t == Bu || typeof e.message == "string" && typeof e.name == "string" && !Sr(e);
      }
      function hp(e) {
        return typeof e == "number" && la(e);
      }
      function Kt(e) {
        if (!Te(e))
          return !1;
        var t = Ye(e);
        return t == Ir || t == go || t == ku || t == Lu;
      }
      function Pl(e) {
        return typeof e == "number" && e == ne(e);
      }
      function bi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= nn;
      }
      function Te(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Me(e) {
        return e != null && typeof e == "object";
      }
      var Al = Ho ? nt(Ho) : gf;
      function fp(e, t) {
        return e === t || _s(e, t, Os(t));
      }
      function dp(e, t, s) {
        return s = typeof s == "function" ? s : r, _s(e, t, Os(t), s);
      }
      function pp(e) {
        return Rl(e) && e != +e;
      }
      function gp(e) {
        if (Jf(e))
          throw new j(a);
        return xa(e);
      }
      function mp(e) {
        return e === null;
      }
      function vp(e) {
        return e == null;
      }
      function Rl(e) {
        return typeof e == "number" || Me(e) && Ye(e) == sr;
      }
      function Sr(e) {
        if (!Me(e) || Ye(e) != Vt)
          return !1;
        var t = Gr(e);
        if (t === null)
          return !0;
        var s = pe.call(t, "constructor") && t.constructor;
        return typeof s == "function" && s instanceof s && Hr.call(s) == fh;
      }
      var Gs = Wo ? nt(Wo) : mf;
      function wp(e) {
        return Pl(e) && e >= -nn && e <= nn;
      }
      var kl = qo ? nt(qo) : vf;
      function xi(e) {
        return typeof e == "string" || !te(e) && Me(e) && Ye(e) == ar;
      }
      function it(e) {
        return typeof e == "symbol" || Me(e) && Ye(e) == Lr;
      }
      var Yn = Yo ? nt(Yo) : wf;
      function _p(e) {
        return e === r;
      }
      function bp(e) {
        return Me(e) && He(e) == lr;
      }
      function xp(e) {
        return Me(e) && Ye(e) == Ou;
      }
      var yp = hi(xs), Ep = hi(function(e, t) {
        return e <= t;
      });
      function Bl(e) {
        if (!e)
          return [];
        if (Ze(e))
          return xi(e) ? xt(e) : Xe(e);
        if (hr && e[hr])
          return eh(e[hr]());
        var t = He(e), s = t == _t ? ls : t == bt ? zr : Gn;
        return s(e);
      }
      function Xt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = mt(e), e === vn || e === -vn) {
          var t = e < 0 ? -1 : 1;
          return t * Cu;
        }
        return e === e ? e : 0;
      }
      function ne(e) {
        var t = Xt(e), s = t % 1;
        return t === t ? s ? t - s : t : 0;
      }
      function Il(e) {
        return e ? yn(ne(e), 0, Rt) : 0;
      }
      function mt(e) {
        if (typeof e == "number")
          return e;
        if (it(e))
          return Rr;
        if (Te(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Te(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = Jo(e);
        var s = rc.test(e);
        return s || sc.test(e) ? Dc(e.slice(2), s ? 2 : 8) : nc.test(e) ? Rr : +e;
      }
      function Ll(e) {
        return Bt(e, Je(e));
      }
      function Sp(e) {
        return e ? yn(ne(e), -nn, nn) : e === 0 ? e : 0;
      }
      function ge(e) {
        return e == null ? "" : rt(e);
      }
      var Tp = Hn(function(e, t) {
        if (yr(t) || Ze(t)) {
          Bt(t, Oe(t), e);
          return;
        }
        for (var s in t)
          pe.call(t, s) && mr(e, s, t[s]);
      }), Nl = Hn(function(e, t) {
        Bt(t, Je(t), e);
      }), yi = Hn(function(e, t, s, u) {
        Bt(t, Je(t), e, u);
      }), Mp = Hn(function(e, t, s, u) {
        Bt(t, Oe(t), e, u);
      }), Cp = Gt(ps);
      function Pp(e, t) {
        var s = Vn(e);
        return t == null ? s : da(s, t);
      }
      var Ap = ie(function(e, t) {
        e = we(e);
        var s = -1, u = t.length, f = u > 2 ? t[2] : r;
        for (f && Ge(t[0], t[1], f) && (u = 1); ++s < u; )
          for (var m = t[s], _ = Je(m), x = -1, E = _.length; ++x < E; ) {
            var L = _[x], N = e[L];
            (N === r || Et(N, $n[L]) && !pe.call(e, L)) && (e[L] = m[L]);
          }
        return e;
      }), Rp = ie(function(e) {
        return e.push(r, Ja), tt(Ol, r, e);
      });
      function kp(e, t) {
        return Qo(e, G(t, 3), kt);
      }
      function Bp(e, t) {
        return Qo(e, G(t, 3), ms);
      }
      function Ip(e, t) {
        return e == null ? e : gs(e, G(t, 3), Je);
      }
      function Lp(e, t) {
        return e == null ? e : wa(e, G(t, 3), Je);
      }
      function Np(e, t) {
        return e && kt(e, G(t, 3));
      }
      function Op(e, t) {
        return e && ms(e, G(t, 3));
      }
      function Dp(e) {
        return e == null ? [] : ri(e, Oe(e));
      }
      function Fp(e) {
        return e == null ? [] : ri(e, Je(e));
      }
      function Qs(e, t, s) {
        var u = e == null ? r : En(e, t);
        return u === r ? s : u;
      }
      function $p(e, t) {
        return e != null && tl(e, t, lf);
      }
      function Ks(e, t) {
        return e != null && tl(e, t, uf);
      }
      var zp = Ga(function(e, t, s) {
        t != null && typeof t.toString != "function" && (t = Wr.call(t)), e[t] = s;
      }, Zs(je)), Up = Ga(function(e, t, s) {
        t != null && typeof t.toString != "function" && (t = Wr.call(t)), pe.call(e, t) ? e[t].push(s) : e[t] = [s];
      }, G), Vp = ie(wr);
      function Oe(e) {
        return Ze(e) ? ha(e) : bs(e);
      }
      function Je(e) {
        return Ze(e) ? ha(e, !0) : _f(e);
      }
      function Hp(e, t) {
        var s = {};
        return t = G(t, 3), kt(e, function(u, f, m) {
          qt(s, t(u, f, m), u);
        }), s;
      }
      function Wp(e, t) {
        var s = {};
        return t = G(t, 3), kt(e, function(u, f, m) {
          qt(s, f, t(u, f, m));
        }), s;
      }
      var qp = Hn(function(e, t, s) {
        ii(e, t, s);
      }), Ol = Hn(function(e, t, s, u) {
        ii(e, t, s, u);
      }), Yp = Gt(function(e, t) {
        var s = {};
        if (e == null)
          return s;
        var u = !1;
        t = Se(t, function(m) {
          return m = cn(m, e), u || (u = m.length > 1), m;
        }), Bt(e, Ls(e), s), u && (s = dt(s, w | b | P, zf));
        for (var f = t.length; f--; )
          Ms(s, t[f]);
        return s;
      });
      function Gp(e, t) {
        return Dl(e, _i(G(t)));
      }
      var Qp = Gt(function(e, t) {
        return e == null ? {} : xf(e, t);
      });
      function Dl(e, t) {
        if (e == null)
          return {};
        var s = Se(Ls(e), function(u) {
          return [u];
        });
        return t = G(t), Pa(e, s, function(u, f) {
          return t(u, f[0]);
        });
      }
      function Kp(e, t, s) {
        t = cn(t, e);
        var u = -1, f = t.length;
        for (f || (f = 1, e = r); ++u < f; ) {
          var m = e == null ? r : e[It(t[u])];
          m === r && (u = f, m = s), e = Kt(m) ? m.call(e) : m;
        }
        return e;
      }
      function Xp(e, t, s) {
        return e == null ? e : br(e, t, s);
      }
      function Zp(e, t, s, u) {
        return u = typeof u == "function" ? u : r, e == null ? e : br(e, t, s, u);
      }
      var Fl = Xa(Oe), $l = Xa(Je);
      function Jp(e, t, s) {
        var u = te(e), f = u || fn(e) || Yn(e);
        if (t = G(t, 4), s == null) {
          var m = e && e.constructor;
          f ? s = u ? new m() : [] : Te(e) ? s = Kt(m) ? Vn(Gr(e)) : {} : s = {};
        }
        return (f ? ct : kt)(e, function(_, x, E) {
          return t(s, _, x, E);
        }), s;
      }
      function jp(e, t) {
        return e == null ? !0 : Ms(e, t);
      }
      function eg(e, t, s) {
        return e == null ? e : Ia(e, t, As(s));
      }
      function tg(e, t, s, u) {
        return u = typeof u == "function" ? u : r, e == null ? e : Ia(e, t, As(s), u);
      }
      function Gn(e) {
        return e == null ? [] : as(e, Oe(e));
      }
      function ng(e) {
        return e == null ? [] : as(e, Je(e));
      }
      function rg(e, t, s) {
        return s === r && (s = t, t = r), s !== r && (s = mt(s), s = s === s ? s : 0), t !== r && (t = mt(t), t = t === t ? t : 0), yn(mt(e), t, s);
      }
      function ig(e, t, s) {
        return t = Xt(t), s === r ? (s = t, t = 0) : s = Xt(s), e = mt(e), cf(e, t, s);
      }
      function sg(e, t, s) {
        if (s && typeof s != "boolean" && Ge(e, t, s) && (t = s = r), s === r && (typeof t == "boolean" ? (s = t, t = r) : typeof e == "boolean" && (s = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = Xt(e), t === r ? (t = e, e = 0) : t = Xt(t)), e > t) {
          var u = e;
          e = t, t = u;
        }
        if (s || e % 1 || t % 1) {
          var f = ua();
          return Ve(e + f * (t - e + Oc("1e-" + ((f + "").length - 1))), t);
        }
        return Es(e, t);
      }
      var og = Wn(function(e, t, s) {
        return t = t.toLowerCase(), e + (s ? zl(t) : t);
      });
      function zl(e) {
        return Xs(ge(e).toLowerCase());
      }
      function Ul(e) {
        return e = ge(e), e && e.replace(ac, Kc).replace(Mc, "");
      }
      function ag(e, t, s) {
        e = ge(e), t = rt(t);
        var u = e.length;
        s = s === r ? u : yn(ne(s), 0, u);
        var f = s;
        return s -= t.length, s >= 0 && e.slice(s, f) == t;
      }
      function lg(e) {
        return e = ge(e), e && Uu.test(e) ? e.replace(wo, Xc) : e;
      }
      function ug(e) {
        return e = ge(e), e && Gu.test(e) ? e.replace(qi, "\\$&") : e;
      }
      var cg = Wn(function(e, t, s) {
        return e + (s ? "-" : "") + t.toLowerCase();
      }), hg = Wn(function(e, t, s) {
        return e + (s ? " " : "") + t.toLowerCase();
      }), fg = Wa("toLowerCase");
      function dg(e, t, s) {
        e = ge(e), t = ne(t);
        var u = t ? Dn(e) : 0;
        if (!t || u >= t)
          return e;
        var f = (t - u) / 2;
        return ci(Zr(f), s) + e + ci(Xr(f), s);
      }
      function pg(e, t, s) {
        e = ge(e), t = ne(t);
        var u = t ? Dn(e) : 0;
        return t && u < t ? e + ci(t - u, s) : e;
      }
      function gg(e, t, s) {
        e = ge(e), t = ne(t);
        var u = t ? Dn(e) : 0;
        return t && u < t ? ci(t - u, s) + e : e;
      }
      function mg(e, t, s) {
        return s || t == null ? t = 0 : t && (t = +t), yh(ge(e).replace(Yi, ""), t || 0);
      }
      function vg(e, t, s) {
        return (s ? Ge(e, t, s) : t === r) ? t = 1 : t = ne(t), Ss(ge(e), t);
      }
      function wg() {
        var e = arguments, t = ge(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var _g = Wn(function(e, t, s) {
        return e + (s ? "_" : "") + t.toLowerCase();
      });
      function bg(e, t, s) {
        return s && typeof s != "number" && Ge(e, t, s) && (t = s = r), s = s === r ? Rt : s >>> 0, s ? (e = ge(e), e && (typeof t == "string" || t != null && !Gs(t)) && (t = rt(t), !t && On(e)) ? hn(xt(e), 0, s) : e.split(t, s)) : [];
      }
      var xg = Wn(function(e, t, s) {
        return e + (s ? " " : "") + Xs(t);
      });
      function yg(e, t, s) {
        return e = ge(e), s = s == null ? 0 : yn(ne(s), 0, e.length), t = rt(t), e.slice(s, s + t.length) == t;
      }
      function Eg(e, t, s) {
        var u = g.templateSettings;
        s && Ge(e, t, s) && (t = r), e = ge(e), t = yi({}, t, u, Za);
        var f = yi({}, t.imports, u.imports, Za), m = Oe(f), _ = as(f, m), x, E, L = 0, N = t.interpolate || Nr, D = "__p += '", U = us(
          (t.escape || Nr).source + "|" + N.source + "|" + (N === _o ? tc : Nr).source + "|" + (t.evaluate || Nr).source + "|$",
          "g"
        ), W = "//# sourceURL=" + (pe.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++kc + "]") + `
`;
        e.replace(U, function(X, ae, ue, st, Qe, ot) {
          return ue || (ue = st), D += e.slice(L, ot).replace(lc, Zc), ae && (x = !0, D += `' +
__e(` + ae + `) +
'`), Qe && (E = !0, D += `';
` + Qe + `;
__p += '`), ue && (D += `' +
((__t = (` + ue + `)) == null ? '' : __t) +
'`), L = ot + X.length, X;
        }), D += `';
`;
        var K = pe.call(t, "variable") && t.variable;
        if (!K)
          D = `with (obj) {
` + D + `
}
`;
        else if (ju.test(K))
          throw new j(h);
        D = (E ? D.replace(Du, "") : D).replace(Fu, "$1").replace($u, "$1;"), D = "function(" + (K || "obj") + `) {
` + (K ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (x ? ", __e = _.escape" : "") + (E ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + D + `return __p
}`;
        var re = Hl(function() {
          return fe(m, W + "return " + D).apply(r, _);
        });
        if (re.source = D, Ys(re))
          throw re;
        return re;
      }
      function Sg(e) {
        return ge(e).toLowerCase();
      }
      function Tg(e) {
        return ge(e).toUpperCase();
      }
      function Mg(e, t, s) {
        if (e = ge(e), e && (s || t === r))
          return Jo(e);
        if (!e || !(t = rt(t)))
          return e;
        var u = xt(e), f = xt(t), m = jo(u, f), _ = ea(u, f) + 1;
        return hn(u, m, _).join("");
      }
      function Cg(e, t, s) {
        if (e = ge(e), e && (s || t === r))
          return e.slice(0, na(e) + 1);
        if (!e || !(t = rt(t)))
          return e;
        var u = xt(e), f = ea(u, xt(t)) + 1;
        return hn(u, 0, f).join("");
      }
      function Pg(e, t, s) {
        if (e = ge(e), e && (s || t === r))
          return e.replace(Yi, "");
        if (!e || !(t = rt(t)))
          return e;
        var u = xt(e), f = jo(u, xt(t));
        return hn(u, f).join("");
      }
      function Ag(e, t) {
        var s = Ke, u = qe;
        if (Te(t)) {
          var f = "separator" in t ? t.separator : f;
          s = "length" in t ? ne(t.length) : s, u = "omission" in t ? rt(t.omission) : u;
        }
        e = ge(e);
        var m = e.length;
        if (On(e)) {
          var _ = xt(e);
          m = _.length;
        }
        if (s >= m)
          return e;
        var x = s - Dn(u);
        if (x < 1)
          return u;
        var E = _ ? hn(_, 0, x).join("") : e.slice(0, x);
        if (f === r)
          return E + u;
        if (_ && (x += E.length - x), Gs(f)) {
          if (e.slice(x).search(f)) {
            var L, N = E;
            for (f.global || (f = us(f.source, ge(bo.exec(f)) + "g")), f.lastIndex = 0; L = f.exec(N); )
              var D = L.index;
            E = E.slice(0, D === r ? x : D);
          }
        } else if (e.indexOf(rt(f), x) != x) {
          var U = E.lastIndexOf(f);
          U > -1 && (E = E.slice(0, U));
        }
        return E + u;
      }
      function Rg(e) {
        return e = ge(e), e && zu.test(e) ? e.replace(vo, ih) : e;
      }
      var kg = Wn(function(e, t, s) {
        return e + (s ? " " : "") + t.toUpperCase();
      }), Xs = Wa("toUpperCase");
      function Vl(e, t, s) {
        return e = ge(e), t = s ? r : t, t === r ? jc(e) ? ah(e) : Wc(e) : e.match(t) || [];
      }
      var Hl = ie(function(e, t) {
        try {
          return tt(e, r, t);
        } catch (s) {
          return Ys(s) ? s : new j(s);
        }
      }), Bg = Gt(function(e, t) {
        return ct(t, function(s) {
          s = It(s), qt(e, s, Ws(e[s], e));
        }), e;
      });
      function Ig(e) {
        var t = e == null ? 0 : e.length, s = G();
        return e = t ? Se(e, function(u) {
          if (typeof u[1] != "function")
            throw new ht(c);
          return [s(u[0]), u[1]];
        }) : [], ie(function(u) {
          for (var f = -1; ++f < t; ) {
            var m = e[f];
            if (tt(m[0], this, u))
              return tt(m[1], this, u);
          }
        });
      }
      function Lg(e) {
        return sf(dt(e, w));
      }
      function Zs(e) {
        return function() {
          return e;
        };
      }
      function Ng(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Og = Ya(), Dg = Ya(!0);
      function je(e) {
        return e;
      }
      function Js(e) {
        return ya(typeof e == "function" ? e : dt(e, w));
      }
      function Fg(e) {
        return Sa(dt(e, w));
      }
      function $g(e, t) {
        return Ta(e, dt(t, w));
      }
      var zg = ie(function(e, t) {
        return function(s) {
          return wr(s, e, t);
        };
      }), Ug = ie(function(e, t) {
        return function(s) {
          return wr(e, s, t);
        };
      });
      function js(e, t, s) {
        var u = Oe(t), f = ri(t, u);
        s == null && !(Te(t) && (f.length || !u.length)) && (s = t, t = e, e = this, f = ri(t, Oe(t)));
        var m = !(Te(s) && "chain" in s) || !!s.chain, _ = Kt(e);
        return ct(f, function(x) {
          var E = t[x];
          e[x] = E, _ && (e.prototype[x] = function() {
            var L = this.__chain__;
            if (m || L) {
              var N = e(this.__wrapped__), D = N.__actions__ = Xe(this.__actions__);
              return D.push({ func: E, args: arguments, thisArg: e }), N.__chain__ = L, N;
            }
            return E.apply(e, sn([this.value()], arguments));
          });
        }), e;
      }
      function Vg() {
        return De._ === this && (De._ = dh), this;
      }
      function eo() {
      }
      function Hg(e) {
        return e = ne(e), ie(function(t) {
          return Ma(t, e);
        });
      }
      var Wg = ks(Se), qg = ks(Go), Yg = ks(ns);
      function Wl(e) {
        return Fs(e) ? rs(It(e)) : yf(e);
      }
      function Gg(e) {
        return function(t) {
          return e == null ? r : En(e, t);
        };
      }
      var Qg = Qa(), Kg = Qa(!0);
      function to() {
        return [];
      }
      function no() {
        return !1;
      }
      function Xg() {
        return {};
      }
      function Zg() {
        return "";
      }
      function Jg() {
        return !0;
      }
      function jg(e, t) {
        if (e = ne(e), e < 1 || e > nn)
          return [];
        var s = Rt, u = Ve(e, Rt);
        t = G(t), e -= Rt;
        for (var f = os(u, t); ++s < e; )
          t(s);
        return f;
      }
      function e1(e) {
        return te(e) ? Se(e, It) : it(e) ? [e] : Xe(cl(ge(e)));
      }
      function t1(e) {
        var t = ++hh;
        return ge(e) + t;
      }
      var n1 = ui(function(e, t) {
        return e + t;
      }, 0), r1 = Bs("ceil"), i1 = ui(function(e, t) {
        return e / t;
      }, 1), s1 = Bs("floor");
      function o1(e) {
        return e && e.length ? ni(e, je, vs) : r;
      }
      function a1(e, t) {
        return e && e.length ? ni(e, G(t, 2), vs) : r;
      }
      function l1(e) {
        return Xo(e, je);
      }
      function u1(e, t) {
        return Xo(e, G(t, 2));
      }
      function c1(e) {
        return e && e.length ? ni(e, je, xs) : r;
      }
      function h1(e, t) {
        return e && e.length ? ni(e, G(t, 2), xs) : r;
      }
      var f1 = ui(function(e, t) {
        return e * t;
      }, 1), d1 = Bs("round"), p1 = ui(function(e, t) {
        return e - t;
      }, 0);
      function g1(e) {
        return e && e.length ? ss(e, je) : 0;
      }
      function m1(e, t) {
        return e && e.length ? ss(e, G(t, 2)) : 0;
      }
      return g.after = F0, g.ary = xl, g.assign = Tp, g.assignIn = Nl, g.assignInWith = yi, g.assignWith = Mp, g.at = Cp, g.before = yl, g.bind = Ws, g.bindAll = Bg, g.bindKey = El, g.castArray = X0, g.chain = wl, g.chunk = sd, g.compact = od, g.concat = ad, g.cond = Ig, g.conforms = Lg, g.constant = Zs, g.countBy = g0, g.create = Pp, g.curry = Sl, g.curryRight = Tl, g.debounce = Ml, g.defaults = Ap, g.defaultsDeep = Rp, g.defer = $0, g.delay = z0, g.difference = ld, g.differenceBy = ud, g.differenceWith = cd, g.drop = hd, g.dropRight = fd, g.dropRightWhile = dd, g.dropWhile = pd, g.fill = gd, g.filter = v0, g.flatMap = b0, g.flatMapDeep = x0, g.flatMapDepth = y0, g.flatten = pl, g.flattenDeep = md, g.flattenDepth = vd, g.flip = U0, g.flow = Og, g.flowRight = Dg, g.fromPairs = wd, g.functions = Dp, g.functionsIn = Fp, g.groupBy = E0, g.initial = bd, g.intersection = xd, g.intersectionBy = yd, g.intersectionWith = Ed, g.invert = zp, g.invertBy = Up, g.invokeMap = T0, g.iteratee = Js, g.keyBy = M0, g.keys = Oe, g.keysIn = Je, g.map = mi, g.mapKeys = Hp, g.mapValues = Wp, g.matches = Fg, g.matchesProperty = $g, g.memoize = wi, g.merge = qp, g.mergeWith = Ol, g.method = zg, g.methodOf = Ug, g.mixin = js, g.negate = _i, g.nthArg = Hg, g.omit = Yp, g.omitBy = Gp, g.once = V0, g.orderBy = C0, g.over = Wg, g.overArgs = H0, g.overEvery = qg, g.overSome = Yg, g.partial = qs, g.partialRight = Cl, g.partition = P0, g.pick = Qp, g.pickBy = Dl, g.property = Wl, g.propertyOf = Gg, g.pull = Cd, g.pullAll = ml, g.pullAllBy = Pd, g.pullAllWith = Ad, g.pullAt = Rd, g.range = Qg, g.rangeRight = Kg, g.rearg = W0, g.reject = k0, g.remove = kd, g.rest = q0, g.reverse = Vs, g.sampleSize = I0, g.set = Xp, g.setWith = Zp, g.shuffle = L0, g.slice = Bd, g.sortBy = D0, g.sortedUniq = $d, g.sortedUniqBy = zd, g.split = bg, g.spread = Y0, g.tail = Ud, g.take = Vd, g.takeRight = Hd, g.takeRightWhile = Wd, g.takeWhile = qd, g.tap = o0, g.throttle = G0, g.thru = gi, g.toArray = Bl, g.toPairs = Fl, g.toPairsIn = $l, g.toPath = e1, g.toPlainObject = Ll, g.transform = Jp, g.unary = Q0, g.union = Yd, g.unionBy = Gd, g.unionWith = Qd, g.uniq = Kd, g.uniqBy = Xd, g.uniqWith = Zd, g.unset = jp, g.unzip = Hs, g.unzipWith = vl, g.update = eg, g.updateWith = tg, g.values = Gn, g.valuesIn = ng, g.without = Jd, g.words = Vl, g.wrap = K0, g.xor = jd, g.xorBy = e0, g.xorWith = t0, g.zip = n0, g.zipObject = r0, g.zipObjectDeep = i0, g.zipWith = s0, g.entries = Fl, g.entriesIn = $l, g.extend = Nl, g.extendWith = yi, js(g, g), g.add = n1, g.attempt = Hl, g.camelCase = og, g.capitalize = zl, g.ceil = r1, g.clamp = rg, g.clone = Z0, g.cloneDeep = j0, g.cloneDeepWith = ep, g.cloneWith = J0, g.conformsTo = tp, g.deburr = Ul, g.defaultTo = Ng, g.divide = i1, g.endsWith = ag, g.eq = Et, g.escape = lg, g.escapeRegExp = ug, g.every = m0, g.find = w0, g.findIndex = fl, g.findKey = kp, g.findLast = _0, g.findLastIndex = dl, g.findLastKey = Bp, g.floor = s1, g.forEach = _l, g.forEachRight = bl, g.forIn = Ip, g.forInRight = Lp, g.forOwn = Np, g.forOwnRight = Op, g.get = Qs, g.gt = np, g.gte = rp, g.has = $p, g.hasIn = Ks, g.head = gl, g.identity = je, g.includes = S0, g.indexOf = _d, g.inRange = ig, g.invoke = Vp, g.isArguments = Mn, g.isArray = te, g.isArrayBuffer = ip, g.isArrayLike = Ze, g.isArrayLikeObject = Pe, g.isBoolean = sp, g.isBuffer = fn, g.isDate = op, g.isElement = ap, g.isEmpty = lp, g.isEqual = up, g.isEqualWith = cp, g.isError = Ys, g.isFinite = hp, g.isFunction = Kt, g.isInteger = Pl, g.isLength = bi, g.isMap = Al, g.isMatch = fp, g.isMatchWith = dp, g.isNaN = pp, g.isNative = gp, g.isNil = vp, g.isNull = mp, g.isNumber = Rl, g.isObject = Te, g.isObjectLike = Me, g.isPlainObject = Sr, g.isRegExp = Gs, g.isSafeInteger = wp, g.isSet = kl, g.isString = xi, g.isSymbol = it, g.isTypedArray = Yn, g.isUndefined = _p, g.isWeakMap = bp, g.isWeakSet = xp, g.join = Sd, g.kebabCase = cg, g.last = gt, g.lastIndexOf = Td, g.lowerCase = hg, g.lowerFirst = fg, g.lt = yp, g.lte = Ep, g.max = o1, g.maxBy = a1, g.mean = l1, g.meanBy = u1, g.min = c1, g.minBy = h1, g.stubArray = to, g.stubFalse = no, g.stubObject = Xg, g.stubString = Zg, g.stubTrue = Jg, g.multiply = f1, g.nth = Md, g.noConflict = Vg, g.noop = eo, g.now = vi, g.pad = dg, g.padEnd = pg, g.padStart = gg, g.parseInt = mg, g.random = sg, g.reduce = A0, g.reduceRight = R0, g.repeat = vg, g.replace = wg, g.result = Kp, g.round = d1, g.runInContext = y, g.sample = B0, g.size = N0, g.snakeCase = _g, g.some = O0, g.sortedIndex = Id, g.sortedIndexBy = Ld, g.sortedIndexOf = Nd, g.sortedLastIndex = Od, g.sortedLastIndexBy = Dd, g.sortedLastIndexOf = Fd, g.startCase = xg, g.startsWith = yg, g.subtract = p1, g.sum = g1, g.sumBy = m1, g.template = Eg, g.times = jg, g.toFinite = Xt, g.toInteger = ne, g.toLength = Il, g.toLower = Sg, g.toNumber = mt, g.toSafeInteger = Sp, g.toString = ge, g.toUpper = Tg, g.trim = Mg, g.trimEnd = Cg, g.trimStart = Pg, g.truncate = Ag, g.unescape = Rg, g.uniqueId = t1, g.upperCase = kg, g.upperFirst = Xs, g.each = _l, g.eachRight = bl, g.first = gl, js(g, function() {
        var e = {};
        return kt(g, function(t, s) {
          pe.call(g.prototype, s) || (e[s] = t);
        }), e;
      }(), { chain: !1 }), g.VERSION = o, ct(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        g[e].placeholder = g;
      }), ct(["drop", "take"], function(e, t) {
        le.prototype[e] = function(s) {
          s = s === r ? 1 : Ie(ne(s), 0);
          var u = this.__filtered__ && !t ? new le(this) : this.clone();
          return u.__filtered__ ? u.__takeCount__ = Ve(s, u.__takeCount__) : u.__views__.push({
            size: Ve(s, Rt),
            type: e + (u.__dir__ < 0 ? "Right" : "")
          }), u;
        }, le.prototype[e + "Right"] = function(s) {
          return this.reverse()[e](s).reverse();
        };
      }), ct(["filter", "map", "takeWhile"], function(e, t) {
        var s = t + 1, u = s == kn || s == me;
        le.prototype[e] = function(f) {
          var m = this.clone();
          return m.__iteratees__.push({
            iteratee: G(f, 3),
            type: s
          }), m.__filtered__ = m.__filtered__ || u, m;
        };
      }), ct(["head", "last"], function(e, t) {
        var s = "take" + (t ? "Right" : "");
        le.prototype[e] = function() {
          return this[s](1).value()[0];
        };
      }), ct(["initial", "tail"], function(e, t) {
        var s = "drop" + (t ? "" : "Right");
        le.prototype[e] = function() {
          return this.__filtered__ ? new le(this) : this[s](1);
        };
      }), le.prototype.compact = function() {
        return this.filter(je);
      }, le.prototype.find = function(e) {
        return this.filter(e).head();
      }, le.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, le.prototype.invokeMap = ie(function(e, t) {
        return typeof e == "function" ? new le(this) : this.map(function(s) {
          return wr(s, e, t);
        });
      }), le.prototype.reject = function(e) {
        return this.filter(_i(G(e)));
      }, le.prototype.slice = function(e, t) {
        e = ne(e);
        var s = this;
        return s.__filtered__ && (e > 0 || t < 0) ? new le(s) : (e < 0 ? s = s.takeRight(-e) : e && (s = s.drop(e)), t !== r && (t = ne(t), s = t < 0 ? s.dropRight(-t) : s.take(t - e)), s);
      }, le.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, le.prototype.toArray = function() {
        return this.take(Rt);
      }, kt(le.prototype, function(e, t) {
        var s = /^(?:filter|find|map|reject)|While$/.test(t), u = /^(?:head|last)$/.test(t), f = g[u ? "take" + (t == "last" ? "Right" : "") : t], m = u || /^find/.test(t);
        f && (g.prototype[t] = function() {
          var _ = this.__wrapped__, x = u ? [1] : arguments, E = _ instanceof le, L = x[0], N = E || te(_), D = function(ae) {
            var ue = f.apply(g, sn([ae], x));
            return u && U ? ue[0] : ue;
          };
          N && s && typeof L == "function" && L.length != 1 && (E = N = !1);
          var U = this.__chain__, W = !!this.__actions__.length, K = m && !U, re = E && !W;
          if (!m && N) {
            _ = re ? _ : new le(this);
            var X = e.apply(_, x);
            return X.__actions__.push({ func: gi, args: [D], thisArg: r }), new ft(X, U);
          }
          return K && re ? e.apply(this, x) : (X = this.thru(D), K ? u ? X.value()[0] : X.value() : X);
        });
      }), ct(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Ur[e], s = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", u = /^(?:pop|shift)$/.test(e);
        g.prototype[e] = function() {
          var f = arguments;
          if (u && !this.__chain__) {
            var m = this.value();
            return t.apply(te(m) ? m : [], f);
          }
          return this[s](function(_) {
            return t.apply(te(_) ? _ : [], f);
          });
        };
      }), kt(le.prototype, function(e, t) {
        var s = g[t];
        if (s) {
          var u = s.name + "";
          pe.call(Un, u) || (Un[u] = []), Un[u].push({ name: t, func: s });
        }
      }), Un[li(r, B).name] = [{
        name: "wrapper",
        func: r
      }], le.prototype.clone = Ah, le.prototype.reverse = Rh, le.prototype.value = kh, g.prototype.at = a0, g.prototype.chain = l0, g.prototype.commit = u0, g.prototype.next = c0, g.prototype.plant = f0, g.prototype.reverse = d0, g.prototype.toJSON = g.prototype.valueOf = g.prototype.value = p0, g.prototype.first = g.prototype.head, hr && (g.prototype[hr] = h0), g;
    }, Fn = lh();
    wn ? ((wn.exports = Fn)._ = Fn, Ji._ = Fn) : De._ = Fn;
  }).call(Tr);
})(Pi, Pi.exports);
var pu = Pi.exports;
const at = 100, Nt = 4;
function lt(n, i) {
  const r = i * at;
  return n - n % r;
}
class Bi {
  constructor(i) {
    S(this, "id");
    S(this, "chart");
    S(this, "visible", !0);
    /** Show a label for this line */
    S(this, "label");
    S(this, "mode");
    S(this, "absoluteVolume", 1e5);
    /** Render latest value line */
    S(this, "latestValueLine", !1);
    S(this, "_visibleMin", 0);
    S(this, "_visibleMax", 0);
    S(this, "_visibleFirst", 0);
    S(this, "_latestValue", 0);
    S(this, "_screen", 0);
    this.chart = i, this.id = pu.uniqueId(), this.mode = "ABSOLUTE";
  }
  /**
   * Set which screen this series should render on.
   * If the screen doesn't exist, it will be created.
   * @param screen - Screen index (0 is the main chart)
   * @param options - Optional configuration for the new screen
   */
  setScreen(i, r) {
    if (!this.chart.screens[i]) {
      const o = (r == null ? void 0 : r.height) ?? 20;
      let l = r == null ? void 0 : r.top;
      if (l === void 0) {
        let a = 0;
        for (const c of this.chart.screens)
          c && (a = Math.max(
            a,
            c.top + c.height
          ));
        if (a + o <= 100)
          l = a;
        else {
          const c = Math.min(
            o,
            this.chart.screens[0].height - 10
          );
          this.chart.screens[0].height -= c;
          for (let h = 1; h < this.chart.screens.length; h++)
            this.chart.screens[h] && (this.chart.screens[h].top -= c);
          l = a - c;
        }
      }
      this.chart.screens[i] = {
        id: this.chart.screens.length,
        minValue: 1 / 0,
        maxValue: -1 / 0,
        top: l,
        height: o,
        lockedYScale: !0
      };
    }
    this.chart.stores.dimensions.recompute(), this._screen = i, this.chart.setScreenRange({ screen: i });
  }
}
class t2 extends Bi {
  constructor(r) {
    super(r);
    S(this, "type", "Line");
    S(this, "batches");
    /** Used in Rendering Engine (Do Not Touch) */
    S(this, "activeBatches");
    /** Minimum number of points to render the series */
    S(this, "MIN_RENDER_LENGTH", 2);
    /** Number of value points per batch */
    S(this, "VALUES_PER_TIME", 1);
    /** Total number of values per batch */
    S(this, "VALUES_PER_BATCH", at * this.VALUES_PER_TIME);
    /** Color as RGBA value */
    S(this, "_color");
    S(this, "lineWidth", 1);
    S(this, "_valueColor");
    this.batches = {}, this.activeBatches = [], this._color = _e([...ow()]), this._valueColor = this._color;
  }
  get color() {
    return this._color;
  }
  set color(r) {
    this._color[0] = r[0], this._color[1] = r[1], this._color[2] = r[2], this._color[3] = r[3];
  }
  update(r, o) {
    var p, d, v;
    const { engine: l } = this.chart.stores, a = this.chart.timeframe.value;
    l.updateMinTime(r);
    const c = /* @__PURE__ */ new Set();
    for (let w = 0; w < r.length; w++) {
      const b = l.getAdjustedTime(r[w], a), P = o[w], F = lt(r[w], a), R = this._getOrCreateBatch(F), { insertIndex: C, exact: B } = Ci(R.times, b);
      if (B ? (R.values[C] = P, (p = R._values) == null || p.call(R, R.values)) : (R.times.splice(C, 0, b), R.values.splice(C, 0, P)), C === 0) {
        const $ = R.startTime - a * at, H = this._getOrCreateBatch($), { insertIndex: Z, exact: ce } = Ci(
          H.times,
          b
        );
        ce ? H.values[Z] = P : (H.times.splice(Z, 0, b), H.values.splice(Z, 0, P)), c.add(H);
      }
      c.add(R);
    }
    const h = Math.max(
      ...Array.from(c).map((w) => w.startTime)
    );
    for (const w of Array.from(c))
      (d = w._times) == null || d.call(w, w.times), (v = w._values) == null || v.call(w, w.values), h === w.startTime && (this._latestValue = w.values[w.values.length - 1]);
    this._valueColor = this.color, this.chart.setScreenRange();
  }
  _getOrCreateBatch(r) {
    if (this.batches[r])
      return this.batches[r];
    const { regl: o } = this.chart.stores.engine;
    return this.batches[r] = {
      startTime: r,
      times: [],
      values: [],
      _times: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: (at + 1) * Nt
      }) : void 0,
      _values: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: (this.VALUES_PER_BATCH + 1) * Nt
      }) : void 0
    };
  }
  _getAllBatchesInRange(r, o) {
    const l = this.chart.timeframe.value, a = lt(r, l), c = lt(o, l), h = this.chart.stores.engine.getAdjustedTime(r, l), p = this.chart.stores.engine.getAdjustedTime(o, l);
    let d = [];
    const v = [];
    for (let w = a; w <= c; w += l * at) {
      const b = this._getOrCreateBatch(w);
      if (!b._times || !b._values || b.times.length < this.MIN_RENDER_LENGTH)
        continue;
      v.push(b);
      const P = w === a, F = w === c;
      if (P && F) {
        const R = Jn(b.times, h), C = jn(b.times, p);
        d = b.values.slice(R, C);
      } else if (P) {
        const R = Jn(b.times, h);
        d = b.values.slice(R, b.values.length);
      } else if (F) {
        const R = jn(b.times, p);
        d = d.concat(...b.values.slice(0, R));
      } else
        d = d.concat(...b.values);
    }
    if (this.activeBatches = v, !!d.length)
      return {
        batches: v,
        first: d[0],
        min: Math.min(...d),
        max: Math.max(...d)
      };
  }
  _cleanup() {
    var r, o;
    for (const l in this.batches) {
      const a = this.batches[l];
      (r = a._times) == null || r.destroy(), (o = a._values) == null || o.destroy();
    }
    this.batches = {}, this.activeBatches = [];
  }
  remove() {
    this._cleanup(), delete this.chart.series[this.id];
  }
}
class n2 extends Bi {
  constructor(r) {
    super(r);
    S(this, "type", "Candlestick");
    S(this, "batches");
    /** Used in Rendering Engine (Do Not Touch) */
    S(this, "activeBatches");
    /** Minimum number of points to render the series */
    S(this, "MIN_RENDER_LENGTH", 1);
    /** Number of value points per batch */
    S(this, "VALUES_PER_TIME", 4);
    /** Total number of values per batch */
    S(this, "VALUES_PER_BATCH", at * this.VALUES_PER_TIME);
    /** Color as RGBA value - defaults to theme positive color */
    S(this, "upColor");
    /** Color as RGBA value - defaults to theme negative color */
    S(this, "downColor");
    S(this, "visible", !0);
    S(this, "lineWidth", 1);
    S(this, "_valueColor", [0, 0, 0, 0]);
    this.upColor = [...r.theme.positive], this.downColor = [...r.theme.negative], this.batches = {}, this.activeBatches = [];
  }
  /**
   * Update series data
   * @param times - Array of times
   * @param values - Array of { o: number; h: number; l: number; c: number } objects
   */
  update(r, o) {
    var p, d;
    const { engine: l } = this.chart.stores, a = this.chart.timeframe.value;
    l.updateMinTime(r);
    const c = /* @__PURE__ */ new Set();
    for (let v = 0; v < r.length; v++) {
      const w = l.getAdjustedTime(r[v], a), b = o[v], P = lt(r[v], a), F = this._getOrCreateBatch(P), R = [b.o, b.h, b.l, b.c];
      this._updateBatch(F, w, R), c.add(F);
    }
    const h = Math.max(
      ...Array.from(c).map((v) => v.startTime)
    );
    for (const v of Array.from(c))
      if ((p = v._times) == null || p.call(v, v.times), (d = v._values) == null || d.call(v, v.values), h === v.startTime) {
        const w = v.values[v.values.length - 4], b = v.values[v.values.length - 1];
        this._valueColor = b > w ? this.upColor : this.downColor, this._latestValue = v.values[v.values.length - 1];
      }
    this.chart.setScreenRange();
  }
  _getOrCreateBatch(r) {
    if (this.batches[r])
      return this.batches[r];
    const { regl: o } = this.chart.stores.engine;
    return this.batches[r] = {
      startTime: r,
      times: [],
      values: [],
      _times: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: at * Nt
      }) : void 0,
      _values: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: this.VALUES_PER_BATCH * Nt
      }) : void 0
    };
  }
  _updateBatch(r, o, l) {
    var p;
    const { insertIndex: a, exact: c } = Ci(r.times, o), h = a * this.VALUES_PER_TIME;
    return c ? (r.values.splice(h, this.VALUES_PER_TIME, ...l), (p = r._values) == null || p.call(r, r.values)) : (r.times.splice(h, 0, o), r.values.splice(h, 0, ...l)), a;
  }
  _getAllBatchesInRange(r, o) {
    const l = this.chart.timeframe.value, a = lt(r, l), c = lt(o, l), h = this.chart.stores.engine.getAdjustedTime(r, l), p = this.chart.stores.engine.getAdjustedTime(o, l);
    let d = [];
    const v = [];
    for (let w = a; w <= c; w += l * at) {
      const b = this._getOrCreateBatch(w);
      if (!b._times || !b._values || b.times.length < this.MIN_RENDER_LENGTH)
        continue;
      v.push(b);
      const P = w === a, F = w === c;
      if (P && F) {
        const R = Jn(b.times, h) * this.VALUES_PER_TIME, C = jn(b.times, p) * this.VALUES_PER_TIME;
        d = b.values.slice(R, C);
      } else if (P) {
        const R = Jn(b.times, h) * this.VALUES_PER_TIME;
        d = b.values.slice(R, b.values.length);
      } else if (F) {
        const R = jn(b.times, p) * this.VALUES_PER_TIME;
        d = d.concat(...b.values.slice(0, R));
      } else
        d = d.concat(...b.values);
    }
    if (this.activeBatches = v, !!v.length)
      return {
        batches: v,
        first: d[0],
        min: Math.min(...d),
        max: Math.max(...d)
      };
  }
  _cleanup() {
    var r, o;
    for (const l in this.batches) {
      const a = this.batches[l];
      (r = a._times) == null || r.destroy(), (o = a._values) == null || o.destroy();
    }
    this.batches = {}, this.activeBatches = [];
  }
  remove() {
    this._cleanup(), delete this.chart.series[this.id];
  }
}
class r2 extends Bi {
  constructor(r) {
    super(r);
    S(this, "chart");
    S(this, "id");
    S(this, "type", "Footprint");
    S(this, "batches");
    /** Used in Rendering Engine (Do Not Touch) */
    S(this, "activeBatches");
    /** Minimum number of points to render the series */
    S(this, "MIN_RENDER_LENGTH", 1);
    /** Buy color - defaults to theme positive color */
    S(this, "buyColor");
    /** Sell color - defaults to theme negative color */
    S(this, "sellColor");
    S(this, "_valueColor", [0, 0, 0, 0]);
    S(this, "visible", !0);
    S(this, "tickSize", 0);
    S(this, "qtySize", 0);
    S(this, "_visibleMin", 0);
    S(this, "_visibleMax", 0);
    S(this, "_visibleFirst", 0);
    S(this, "_visibleMaxVolume", 0);
    this.chart = r, this.id = pu.uniqueId(), this.buyColor = [...r.theme.positive], this.sellColor = [...r.theme.negative], this.batches = {}, this.activeBatches = [];
  }
  onTrade(r, o, l, a) {
    const { engine: c } = this.chart.stores, h = this.chart.timeframe.value, p = r - r % h, d = o - o % this.tickSize;
    a = +a, c.updateMinTime([r]);
    const v = lt(r, h), w = this._getOrCreateBatch(v);
    w.points[p] || (w.points[p] = {}), w.points[p][d] || (w.points[p][d] = {
      buy: 0,
      sell: 0
    }), this._latestValue = d, this._valueColor = l === "buy" ? this.buyColor : this.sellColor;
    const b = w.points[p][d], P = b[l] + a;
    b[l] = P - P % this.qtySize, this._syncBatch(w), this.chart.setScreenRange();
  }
  _getOrCreateBatch(r) {
    if (this.batches[r])
      return this.batches[r];
    const { regl: o } = this.chart.stores.engine, l = at * 50;
    return this.batches[r] = {
      startTime: r,
      points: {},
      times: [],
      values: [],
      volumes: [],
      maxVolumes: [],
      _times: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: l * Nt
      }) : void 0,
      _values: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: l * Nt
      }) : void 0,
      _volumes: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: l * 2 * Nt
      }) : void 0,
      _maxVolumes: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: l * Nt
      }) : void 0
    };
  }
  _syncBatch(r) {
    var v, w, b, P;
    const { engine: o } = this.chart.stores, l = this.chart.timeframe.value;
    let a = [];
    const c = [], h = [];
    let p = [];
    const d = Object.keys(r.points).map(Number).sort((F, R) => F - R);
    for (const F of d) {
      const R = r.points[F], C = o.getAdjustedTime(F, l), B = [];
      for (const $ in R) {
        const { buy: H, sell: Z } = R[+$];
        a.push(C), c.push(+$), h.push(H), h.push(-Z), B.push(Math.max(H, Z));
      }
      const z = B.length > 0 ? Math.max(...B) : 0;
      for (let $ = 0; $ < B.length; $++)
        p.push(z);
    }
    (this.mode = "ABSOLUTE") && (p = new Array(p.length).fill(this.absoluteVolume)), r.times = a, r.values = c, r.volumes = h, r.maxVolumes = p, (v = r._times) == null || v.call(r, a), (w = r._values) == null || w.call(r, c), (b = r._volumes) == null || b.call(r, h), (P = r._maxVolumes) == null || P.call(r, p);
  }
  _getAllBatchesInRange(r, o) {
    const l = this.chart.timeframe.value, a = lt(r, l), c = lt(o, l);
    let h = [], p = [];
    const d = [];
    for (let v = a; v <= c; v += l * at) {
      const w = this.batches[v];
      if (w && !(!w._times || w.times.length < this.MIN_RENDER_LENGTH)) {
        d.push(w), h = h.concat(w.values);
        for (let b = 0; b < w.volumes.length; b++)
          p.push(Math.abs(w.volumes[b]));
      }
    }
    if (this.activeBatches = d, !!h.length)
      return this._visibleMaxVolume = Math.max(...p), {
        batches: d,
        first: h[0],
        min: Math.min(...h),
        max: Math.max(...h) + this.tickSize
      };
  }
  _cleanup() {
    var r, o, l, a;
    for (const c in this.batches) {
      const h = this.batches[c];
      (r = h._times) == null || r.destroy(), (o = h._values) == null || o.destroy(), (l = h._volumes) == null || l.destroy(), (a = h._maxVolumes) == null || a.destroy();
    }
    this.batches = {}, this.activeBatches = [];
  }
  remove() {
    this._cleanup(), delete this.chart.series[this.id];
  }
}
class i2 extends Bi {
  constructor(r) {
    super(r);
    S(this, "type", "Volume");
    S(this, "batches");
    /** Used in Rendering Engine (Do Not Touch) */
    S(this, "activeBatches");
    /** Minimum number of points to render the series */
    S(this, "MIN_RENDER_LENGTH", 1);
    /** Number of value points per batch (volume, open, close) */
    S(this, "VALUES_PER_TIME", 3);
    /** Total number of values per batch */
    S(this, "VALUES_PER_BATCH", at * this.VALUES_PER_TIME);
    /** Color for up volume bars (close > open) - defaults to theme positive color */
    S(this, "upColor");
    /** Color for down volume bars (close <= open) - defaults to theme negative color */
    S(this, "downColor");
    /** Height configuration - either percentage or pixels */
    S(this, "height", { type: "percent", value: 20 });
    S(this, "visible", !0);
    /** Maximum volume in visible range (used for scaling bars) */
    S(this, "_maxVolume", 0);
    S(this, "_valueColor", [0, 0, 0, 0]);
    const o = [...r.theme.positive], l = [...r.theme.negative];
    o[3] = 0.5, l[3] = 0.5, this.upColor = o, this.downColor = l, this.batches = {}, this.activeBatches = [];
  }
  /**
   * Update series data
   * @param times - Array of times
   * @param values - Array of { volume: number; open: number; close: number } objects
   */
  update(r, o) {
    var h, p;
    const { engine: l } = this.chart.stores, a = this.chart.timeframe.value;
    l.updateMinTime(r);
    const c = /* @__PURE__ */ new Set();
    for (let d = 0; d < r.length; d++) {
      const v = l.getAdjustedTime(r[d], a), w = o[d], b = lt(r[d], a), P = this._getOrCreateBatch(b), F = [w.volume, w.open, w.close];
      this._updateBatch(P, v, F), c.add(P);
    }
    for (const d of Array.from(c))
      (h = d._times) == null || h.call(d, d.times), (p = d._values) == null || p.call(d, d.values);
    this.chart.setScreenRange();
  }
  _getOrCreateBatch(r) {
    if (this.batches[r])
      return this.batches[r];
    const { regl: o } = this.chart.stores.engine;
    return this.batches[r] = {
      startTime: r,
      times: [],
      values: [],
      _times: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: at * Nt
      }) : void 0,
      _values: o ? o.buffer({
        type: "float32",
        usage: "dynamic",
        length: this.VALUES_PER_BATCH * Nt
      }) : void 0
    };
  }
  _updateBatch(r, o, l) {
    var p;
    const { insertIndex: a, exact: c } = Ci(r.times, o), h = a * this.VALUES_PER_TIME;
    return c ? (r.values.splice(h, this.VALUES_PER_TIME, ...l), (p = r._values) == null || p.call(r, r.values)) : (r.times.splice(a, 0, o), r.values.splice(h, 0, ...l)), a;
  }
  _getAllBatchesInRange(r, o) {
    const l = this.chart.timeframe.value, a = lt(r, l), c = lt(o, l), h = this.chart.stores.engine.getAdjustedTime(r, l), p = this.chart.stores.engine.getAdjustedTime(o, l);
    let d = [];
    const v = [];
    for (let w = a; w <= c; w += l * at) {
      const b = this._getOrCreateBatch(w);
      if (!b._times || !b._values || b.times.length < this.MIN_RENDER_LENGTH)
        continue;
      v.push(b);
      const P = w === a, F = w === c, R = (C, B, z) => {
        const $ = [];
        for (let H = B; H < z; H += this.VALUES_PER_TIME)
          $.push(C[H]);
        return $;
      };
      if (P && F) {
        const C = Jn(b.times, h) * this.VALUES_PER_TIME, B = jn(b.times, p) * this.VALUES_PER_TIME;
        d = R(b.values, C, B);
      } else if (P) {
        const C = Jn(b.times, h) * this.VALUES_PER_TIME;
        d = R(b.values, C, b.values.length);
      } else if (F) {
        const C = jn(b.times, p) * this.VALUES_PER_TIME;
        d = d.concat(R(b.values, 0, C));
      } else
        d = d.concat(
          R(b.values, 0, b.values.length)
        );
    }
    if (this.activeBatches = v, !!d.length)
      return this._maxVolume = Math.max(...d), {
        batches: v,
        first: d[0],
        min: Math.min(...d),
        max: Math.max(...d)
      };
  }
  /** Get the height in pixels based on the current configuration */
  getHeightPixels(r) {
    return this.height.type === "pixels" ? Math.min(this.height.value, r) : this.height.value / 100 * r;
  }
  _cleanup() {
    var r, o;
    for (const l in this.batches) {
      const a = this.batches[l];
      (r = a._times) == null || r.destroy(), (o = a._values) == null || o.destroy();
    }
    this.batches = {}, this.activeBatches = [];
  }
  remove() {
    this._cleanup(), delete this.chart.series[this.id];
  }
}
class aw {
  constructor(i) {
    S(this, "chart");
    S(this, "regl", null);
    S(this, "minTime", 1 / 0);
    this.chart = i;
  }
  setRegl(i) {
    var r, o;
    this.regl = i;
    for (const l in this.chart.series) {
      const a = this.chart.series[l];
      if ("batches" in a)
        for (const c in a.batches) {
          const h = a.batches[c];
          delete a.batches[c];
          const p = a._getOrCreateBatch(+c);
          p.times = h.times, p.values = h.values, (r = p._times) == null || r.call(p, p.times), (o = p._values) == null || o.call(p, p.values);
        }
    }
    this.chart.setScreenRange();
  }
  updateMinTime(i) {
    if (this.minTime !== 1 / 0)
      return;
    const r = this.minTime, o = lt(
      Math.min.apply(this, i),
      this.chart.timeframe.value
    ), l = Math.min(r, o);
    isNaN(l) || r === l || (this.minTime = l);
  }
  getAdjustedTime(i, r) {
    return (i - this.minTime) / r;
  }
  fromAdjustedTime(i, r) {
    return i * r + this.minTime;
  }
  destroy() {
    this.regl && this.regl.destroy();
  }
}
/*!
 *  decimal.js v10.6.0
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var Kn = 9e15, mn = 1e9, io = "0123456789abcdef", Ai = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Ri = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", so = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -Kn,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: Kn,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, gu, en, J = !0, Ii = "[DecimalError] ", gn = Ii + "Invalid argument: ", mu = Ii + "Precision limit exceeded", vu = Ii + "crypto unavailable", wu = "[object Decimal]", We = Math.floor, Le = Math.pow, lw = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, uw = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, cw = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, _u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Pt = 1e7, Q = 7, hw = 9007199254740991, fw = Ai.length - 1, oo = Ri.length - 1, O = { toStringTag: wu };
O.absoluteValue = O.abs = function() {
  var n = new this.constructor(this);
  return n.s < 0 && (n.s = 1), Y(n);
};
O.ceil = function() {
  return Y(new this.constructor(this), this.e + 1, 2);
};
O.clampedTo = O.clamp = function(n, i) {
  var r, o = this, l = o.constructor;
  if (n = new l(n), i = new l(i), !n.s || !i.s)
    return new l(NaN);
  if (n.gt(i))
    throw Error(gn + i);
  return r = o.cmp(n), r < 0 ? n : o.cmp(i) > 0 ? i : new l(o);
};
O.comparedTo = O.cmp = function(n) {
  var i, r, o, l, a = this, c = a.d, h = (n = new a.constructor(n)).d, p = a.s, d = n.s;
  if (!c || !h)
    return !p || !d ? NaN : p !== d ? p : c === h ? 0 : !c ^ p < 0 ? 1 : -1;
  if (!c[0] || !h[0])
    return c[0] ? p : h[0] ? -d : 0;
  if (p !== d)
    return p;
  if (a.e !== n.e)
    return a.e > n.e ^ p < 0 ? 1 : -1;
  for (o = c.length, l = h.length, i = 0, r = o < l ? o : l; i < r; ++i)
    if (c[i] !== h[i])
      return c[i] > h[i] ^ p < 0 ? 1 : -1;
  return o === l ? 0 : o > l ^ p < 0 ? 1 : -1;
};
O.cosine = O.cos = function() {
  var n, i, r = this, o = r.constructor;
  return r.d ? r.d[0] ? (n = o.precision, i = o.rounding, o.precision = n + Math.max(r.e, r.sd()) + Q, o.rounding = 1, r = dw(o, Su(o, r)), o.precision = n, o.rounding = i, Y(en == 2 || en == 3 ? r.neg() : r, n, i, !0)) : new o(1) : new o(NaN);
};
O.cubeRoot = O.cbrt = function() {
  var n, i, r, o, l, a, c, h, p, d, v = this, w = v.constructor;
  if (!v.isFinite() || v.isZero())
    return new w(v);
  for (J = !1, a = v.s * Le(v.s * v, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (r = $e(v.d), n = v.e, (a = (n - r.length + 1) % 3) && (r += a == 1 || a == -2 ? "0" : "00"), a = Le(r, 1 / 3), n = We((n + 1) / 3) - (n % 3 == (n < 0 ? -1 : 2)), a == 1 / 0 ? r = "5e" + n : (r = a.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + n), o = new w(r), o.s = v.s) : o = new w(a.toString()), c = (n = w.precision) + 3; ; )
    if (h = o, p = h.times(h).times(h), d = p.plus(v), o = be(d.plus(v).times(h), d.plus(p), c + 2, 1), $e(h.d).slice(0, c) === (r = $e(o.d)).slice(0, c))
      if (r = r.slice(c - 3, c + 1), r == "9999" || !l && r == "4999") {
        if (!l && (Y(h, n + 1, 0), h.times(h).times(h).eq(v))) {
          o = h;
          break;
        }
        c += 4, l = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (Y(o, n + 1, 1), i = !o.times(o).times(o).eq(v));
        break;
      }
  return J = !0, Y(o, n, w.rounding, i);
};
O.decimalPlaces = O.dp = function() {
  var n, i = this.d, r = NaN;
  if (i) {
    if (n = i.length - 1, r = (n - We(this.e / Q)) * Q, n = i[n], n)
      for (; n % 10 == 0; n /= 10)
        r--;
    r < 0 && (r = 0);
  }
  return r;
};
O.dividedBy = O.div = function(n) {
  return be(this, new this.constructor(n));
};
O.dividedToIntegerBy = O.divToInt = function(n) {
  var i = this, r = i.constructor;
  return Y(be(i, new r(n), 0, 1, 1), r.precision, r.rounding);
};
O.equals = O.eq = function(n) {
  return this.cmp(n) === 0;
};
O.floor = function() {
  return Y(new this.constructor(this), this.e + 1, 3);
};
O.greaterThan = O.gt = function(n) {
  return this.cmp(n) > 0;
};
O.greaterThanOrEqualTo = O.gte = function(n) {
  var i = this.cmp(n);
  return i == 1 || i === 0;
};
O.hyperbolicCosine = O.cosh = function() {
  var n, i, r, o, l, a = this, c = a.constructor, h = new c(1);
  if (!a.isFinite())
    return new c(a.s ? 1 / 0 : NaN);
  if (a.isZero())
    return h;
  r = c.precision, o = c.rounding, c.precision = r + Math.max(a.e, a.sd()) + 4, c.rounding = 1, l = a.d.length, l < 32 ? (n = Math.ceil(l / 3), i = (1 / Ni(4, n)).toString()) : (n = 16, i = "2.3283064365386962890625e-10"), a = er(c, 1, a.times(i), new c(1), !0);
  for (var p, d = n, v = new c(8); d--; )
    p = a.times(a), a = h.minus(p.times(v.minus(p.times(v))));
  return Y(a, c.precision = r, c.rounding = o, !0);
};
O.hyperbolicSine = O.sinh = function() {
  var n, i, r, o, l = this, a = l.constructor;
  if (!l.isFinite() || l.isZero())
    return new a(l);
  if (i = a.precision, r = a.rounding, a.precision = i + Math.max(l.e, l.sd()) + 4, a.rounding = 1, o = l.d.length, o < 3)
    l = er(a, 2, l, l, !0);
  else {
    n = 1.4 * Math.sqrt(o), n = n > 16 ? 16 : n | 0, l = l.times(1 / Ni(5, n)), l = er(a, 2, l, l, !0);
    for (var c, h = new a(5), p = new a(16), d = new a(20); n--; )
      c = l.times(l), l = l.times(h.plus(c.times(p.times(c).plus(d))));
  }
  return a.precision = i, a.rounding = r, Y(l, i, r, !0);
};
O.hyperbolicTangent = O.tanh = function() {
  var n, i, r = this, o = r.constructor;
  return r.isFinite() ? r.isZero() ? new o(r) : (n = o.precision, i = o.rounding, o.precision = n + 7, o.rounding = 1, be(r.sinh(), r.cosh(), o.precision = n, o.rounding = i)) : new o(r.s);
};
O.inverseCosine = O.acos = function() {
  var n = this, i = n.constructor, r = n.abs().cmp(1), o = i.precision, l = i.rounding;
  return r !== -1 ? r === 0 ? n.isNeg() ? Ot(i, o, l) : new i(0) : new i(NaN) : n.isZero() ? Ot(i, o + 4, l).times(0.5) : (i.precision = o + 6, i.rounding = 1, n = new i(1).minus(n).div(n.plus(1)).sqrt().atan(), i.precision = o, i.rounding = l, n.times(2));
};
O.inverseHyperbolicCosine = O.acosh = function() {
  var n, i, r = this, o = r.constructor;
  return r.lte(1) ? new o(r.eq(1) ? 0 : NaN) : r.isFinite() ? (n = o.precision, i = o.rounding, o.precision = n + Math.max(Math.abs(r.e), r.sd()) + 4, o.rounding = 1, J = !1, r = r.times(r).minus(1).sqrt().plus(r), J = !0, o.precision = n, o.rounding = i, r.ln()) : new o(r);
};
O.inverseHyperbolicSine = O.asinh = function() {
  var n, i, r = this, o = r.constructor;
  return !r.isFinite() || r.isZero() ? new o(r) : (n = o.precision, i = o.rounding, o.precision = n + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, o.rounding = 1, J = !1, r = r.times(r).plus(1).sqrt().plus(r), J = !0, o.precision = n, o.rounding = i, r.ln());
};
O.inverseHyperbolicTangent = O.atanh = function() {
  var n, i, r, o, l = this, a = l.constructor;
  return l.isFinite() ? l.e >= 0 ? new a(l.abs().eq(1) ? l.s / 0 : l.isZero() ? l : NaN) : (n = a.precision, i = a.rounding, o = l.sd(), Math.max(o, n) < 2 * -l.e - 1 ? Y(new a(l), n, i, !0) : (a.precision = r = o - l.e, l = be(l.plus(1), new a(1).minus(l), r + n, 1), a.precision = n + 4, a.rounding = 1, l = l.ln(), a.precision = n, a.rounding = i, l.times(0.5))) : new a(NaN);
};
O.inverseSine = O.asin = function() {
  var n, i, r, o, l = this, a = l.constructor;
  return l.isZero() ? new a(l) : (i = l.abs().cmp(1), r = a.precision, o = a.rounding, i !== -1 ? i === 0 ? (n = Ot(a, r + 4, o).times(0.5), n.s = l.s, n) : new a(NaN) : (a.precision = r + 6, a.rounding = 1, l = l.div(new a(1).minus(l.times(l)).sqrt().plus(1)).atan(), a.precision = r, a.rounding = o, l.times(2)));
};
O.inverseTangent = O.atan = function() {
  var n, i, r, o, l, a, c, h, p, d = this, v = d.constructor, w = v.precision, b = v.rounding;
  if (d.isFinite()) {
    if (d.isZero())
      return new v(d);
    if (d.abs().eq(1) && w + 4 <= oo)
      return c = Ot(v, w + 4, b).times(0.25), c.s = d.s, c;
  } else {
    if (!d.s)
      return new v(NaN);
    if (w + 4 <= oo)
      return c = Ot(v, w + 4, b).times(0.5), c.s = d.s, c;
  }
  for (v.precision = h = w + 10, v.rounding = 1, r = Math.min(28, h / Q + 2 | 0), n = r; n; --n)
    d = d.div(d.times(d).plus(1).sqrt().plus(1));
  for (J = !1, i = Math.ceil(h / Q), o = 1, p = d.times(d), c = new v(d), l = d; n !== -1; )
    if (l = l.times(p), a = c.minus(l.div(o += 2)), l = l.times(p), c = a.plus(l.div(o += 2)), c.d[i] !== void 0)
      for (n = i; c.d[n] === a.d[n] && n--; )
        ;
  return r && (c = c.times(2 << r - 1)), J = !0, Y(c, v.precision = w, v.rounding = b, !0);
};
O.isFinite = function() {
  return !!this.d;
};
O.isInteger = O.isInt = function() {
  return !!this.d && We(this.e / Q) > this.d.length - 2;
};
O.isNaN = function() {
  return !this.s;
};
O.isNegative = O.isNeg = function() {
  return this.s < 0;
};
O.isPositive = O.isPos = function() {
  return this.s > 0;
};
O.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
O.lessThan = O.lt = function(n) {
  return this.cmp(n) < 0;
};
O.lessThanOrEqualTo = O.lte = function(n) {
  return this.cmp(n) < 1;
};
O.logarithm = O.log = function(n) {
  var i, r, o, l, a, c, h, p, d = this, v = d.constructor, w = v.precision, b = v.rounding, P = 5;
  if (n == null)
    n = new v(10), i = !0;
  else {
    if (n = new v(n), r = n.d, n.s < 0 || !r || !r[0] || n.eq(1))
      return new v(NaN);
    i = n.eq(10);
  }
  if (r = d.d, d.s < 0 || !r || !r[0] || d.eq(1))
    return new v(r && !r[0] ? -1 / 0 : d.s != 1 ? NaN : r ? 0 : 1 / 0);
  if (i)
    if (r.length > 1)
      a = !0;
    else {
      for (l = r[0]; l % 10 === 0; )
        l /= 10;
      a = l !== 1;
    }
  if (J = !1, h = w + P, c = pn(d, h), o = i ? ki(v, h + 10) : pn(n, h), p = be(c, o, h, 1), Cr(p.d, l = w, b))
    do
      if (h += 10, c = pn(d, h), o = i ? ki(v, h + 10) : pn(n, h), p = be(c, o, h, 1), !a) {
        +$e(p.d).slice(l + 1, l + 15) + 1 == 1e14 && (p = Y(p, w + 1, 0));
        break;
      }
    while (Cr(p.d, l += 10, b));
  return J = !0, Y(p, w, b);
};
O.minus = O.sub = function(n) {
  var i, r, o, l, a, c, h, p, d, v, w, b, P = this, F = P.constructor;
  if (n = new F(n), !P.d || !n.d)
    return !P.s || !n.s ? n = new F(NaN) : P.d ? n.s = -n.s : n = new F(n.d || P.s !== n.s ? P : NaN), n;
  if (P.s != n.s)
    return n.s = -n.s, P.plus(n);
  if (d = P.d, b = n.d, h = F.precision, p = F.rounding, !d[0] || !b[0]) {
    if (b[0])
      n.s = -n.s;
    else if (d[0])
      n = new F(P);
    else
      return new F(p === 3 ? -0 : 0);
    return J ? Y(n, h, p) : n;
  }
  if (r = We(n.e / Q), v = We(P.e / Q), d = d.slice(), a = v - r, a) {
    for (w = a < 0, w ? (i = d, a = -a, c = b.length) : (i = b, r = v, c = d.length), o = Math.max(Math.ceil(h / Q), c) + 2, a > o && (a = o, i.length = 1), i.reverse(), o = a; o--; )
      i.push(0);
    i.reverse();
  } else {
    for (o = d.length, c = b.length, w = o < c, w && (c = o), o = 0; o < c; o++)
      if (d[o] != b[o]) {
        w = d[o] < b[o];
        break;
      }
    a = 0;
  }
  for (w && (i = d, d = b, b = i, n.s = -n.s), c = d.length, o = b.length - c; o > 0; --o)
    d[c++] = 0;
  for (o = b.length; o > a; ) {
    if (d[--o] < b[o]) {
      for (l = o; l && d[--l] === 0; )
        d[l] = Pt - 1;
      --d[l], d[o] += Pt;
    }
    d[o] -= b[o];
  }
  for (; d[--c] === 0; )
    d.pop();
  for (; d[0] === 0; d.shift())
    --r;
  return d[0] ? (n.d = d, n.e = Li(d, r), J ? Y(n, h, p) : n) : new F(p === 3 ? -0 : 0);
};
O.modulo = O.mod = function(n) {
  var i, r = this, o = r.constructor;
  return n = new o(n), !r.d || !n.s || n.d && !n.d[0] ? new o(NaN) : !n.d || r.d && !r.d[0] ? Y(new o(r), o.precision, o.rounding) : (J = !1, o.modulo == 9 ? (i = be(r, n.abs(), 0, 3, 1), i.s *= n.s) : i = be(r, n, 0, o.modulo, 1), i = i.times(n), J = !0, r.minus(i));
};
O.naturalExponential = O.exp = function() {
  return ao(this);
};
O.naturalLogarithm = O.ln = function() {
  return pn(this);
};
O.negated = O.neg = function() {
  var n = new this.constructor(this);
  return n.s = -n.s, Y(n);
};
O.plus = O.add = function(n) {
  var i, r, o, l, a, c, h, p, d, v, w = this, b = w.constructor;
  if (n = new b(n), !w.d || !n.d)
    return !w.s || !n.s ? n = new b(NaN) : w.d || (n = new b(n.d || w.s === n.s ? w : NaN)), n;
  if (w.s != n.s)
    return n.s = -n.s, w.minus(n);
  if (d = w.d, v = n.d, h = b.precision, p = b.rounding, !d[0] || !v[0])
    return v[0] || (n = new b(w)), J ? Y(n, h, p) : n;
  if (a = We(w.e / Q), o = We(n.e / Q), d = d.slice(), l = a - o, l) {
    for (l < 0 ? (r = d, l = -l, c = v.length) : (r = v, o = a, c = d.length), a = Math.ceil(h / Q), c = a > c ? a + 1 : c + 1, l > c && (l = c, r.length = 1), r.reverse(); l--; )
      r.push(0);
    r.reverse();
  }
  for (c = d.length, l = v.length, c - l < 0 && (l = c, r = v, v = d, d = r), i = 0; l; )
    i = (d[--l] = d[l] + v[l] + i) / Pt | 0, d[l] %= Pt;
  for (i && (d.unshift(i), ++o), c = d.length; d[--c] == 0; )
    d.pop();
  return n.d = d, n.e = Li(d, o), J ? Y(n, h, p) : n;
};
O.precision = O.sd = function(n) {
  var i, r = this;
  if (n !== void 0 && n !== !!n && n !== 1 && n !== 0)
    throw Error(gn + n);
  return r.d ? (i = bu(r.d), n && r.e + 1 > i && (i = r.e + 1)) : i = NaN, i;
};
O.round = function() {
  var n = this, i = n.constructor;
  return Y(new i(n), n.e + 1, i.rounding);
};
O.sine = O.sin = function() {
  var n, i, r = this, o = r.constructor;
  return r.isFinite() ? r.isZero() ? new o(r) : (n = o.precision, i = o.rounding, o.precision = n + Math.max(r.e, r.sd()) + Q, o.rounding = 1, r = gw(o, Su(o, r)), o.precision = n, o.rounding = i, Y(en > 2 ? r.neg() : r, n, i, !0)) : new o(NaN);
};
O.squareRoot = O.sqrt = function() {
  var n, i, r, o, l, a, c = this, h = c.d, p = c.e, d = c.s, v = c.constructor;
  if (d !== 1 || !h || !h[0])
    return new v(!d || d < 0 && (!h || h[0]) ? NaN : h ? c : 1 / 0);
  for (J = !1, d = Math.sqrt(+c), d == 0 || d == 1 / 0 ? (i = $e(h), (i.length + p) % 2 == 0 && (i += "0"), d = Math.sqrt(i), p = We((p + 1) / 2) - (p < 0 || p % 2), d == 1 / 0 ? i = "5e" + p : (i = d.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + p), o = new v(i)) : o = new v(d.toString()), r = (p = v.precision) + 3; ; )
    if (a = o, o = a.plus(be(c, a, r + 2, 1)).times(0.5), $e(a.d).slice(0, r) === (i = $e(o.d)).slice(0, r))
      if (i = i.slice(r - 3, r + 1), i == "9999" || !l && i == "4999") {
        if (!l && (Y(a, p + 1, 0), a.times(a).eq(c))) {
          o = a;
          break;
        }
        r += 4, l = 1;
      } else {
        (!+i || !+i.slice(1) && i.charAt(0) == "5") && (Y(o, p + 1, 1), n = !o.times(o).eq(c));
        break;
      }
  return J = !0, Y(o, p, v.rounding, n);
};
O.tangent = O.tan = function() {
  var n, i, r = this, o = r.constructor;
  return r.isFinite() ? r.isZero() ? new o(r) : (n = o.precision, i = o.rounding, o.precision = n + 10, o.rounding = 1, r = r.sin(), r.s = 1, r = be(r, new o(1).minus(r.times(r)).sqrt(), n + 10, 0), o.precision = n, o.rounding = i, Y(en == 2 || en == 4 ? r.neg() : r, n, i, !0)) : new o(NaN);
};
O.times = O.mul = function(n) {
  var i, r, o, l, a, c, h, p, d, v = this, w = v.constructor, b = v.d, P = (n = new w(n)).d;
  if (n.s *= v.s, !b || !b[0] || !P || !P[0])
    return new w(!n.s || b && !b[0] && !P || P && !P[0] && !b ? NaN : !b || !P ? n.s / 0 : n.s * 0);
  for (r = We(v.e / Q) + We(n.e / Q), p = b.length, d = P.length, p < d && (a = b, b = P, P = a, c = p, p = d, d = c), a = [], c = p + d, o = c; o--; )
    a.push(0);
  for (o = d; --o >= 0; ) {
    for (i = 0, l = p + o; l > o; )
      h = a[l] + P[o] * b[l - o - 1] + i, a[l--] = h % Pt | 0, i = h / Pt | 0;
    a[l] = (a[l] + i) % Pt | 0;
  }
  for (; !a[--c]; )
    a.pop();
  return i ? ++r : a.shift(), n.d = a, n.e = Li(a, r), J ? Y(n, w.precision, w.rounding) : n;
};
O.toBinary = function(n, i) {
  return ho(this, 2, n, i);
};
O.toDecimalPlaces = O.toDP = function(n, i) {
  var r = this, o = r.constructor;
  return r = new o(r), n === void 0 ? r : (et(n, 0, mn), i === void 0 ? i = o.rounding : et(i, 0, 8), Y(r, n + r.e + 1, i));
};
O.toExponential = function(n, i) {
  var r, o = this, l = o.constructor;
  return n === void 0 ? r = Ft(o, !0) : (et(n, 0, mn), i === void 0 ? i = l.rounding : et(i, 0, 8), o = Y(new l(o), n + 1, i), r = Ft(o, !0, n + 1)), o.isNeg() && !o.isZero() ? "-" + r : r;
};
O.toFixed = function(n, i) {
  var r, o, l = this, a = l.constructor;
  return n === void 0 ? r = Ft(l) : (et(n, 0, mn), i === void 0 ? i = a.rounding : et(i, 0, 8), o = Y(new a(l), n + l.e + 1, i), r = Ft(o, !1, n + o.e + 1)), l.isNeg() && !l.isZero() ? "-" + r : r;
};
O.toFraction = function(n) {
  var i, r, o, l, a, c, h, p, d, v, w, b, P = this, F = P.d, R = P.constructor;
  if (!F)
    return new R(P);
  if (d = r = new R(1), o = p = new R(0), i = new R(o), a = i.e = bu(F) - P.e - 1, c = a % Q, i.d[0] = Le(10, c < 0 ? Q + c : c), n == null)
    n = a > 0 ? i : d;
  else {
    if (h = new R(n), !h.isInt() || h.lt(d))
      throw Error(gn + h);
    n = h.gt(i) ? a > 0 ? i : d : h;
  }
  for (J = !1, h = new R($e(F)), v = R.precision, R.precision = a = F.length * Q * 2; w = be(h, i, 0, 1, 1), l = r.plus(w.times(o)), l.cmp(n) != 1; )
    r = o, o = l, l = d, d = p.plus(w.times(l)), p = l, l = i, i = h.minus(w.times(l)), h = l;
  return l = be(n.minus(r), o, 0, 1, 1), p = p.plus(l.times(d)), r = r.plus(l.times(o)), p.s = d.s = P.s, b = be(d, o, a, 1).minus(P).abs().cmp(be(p, r, a, 1).minus(P).abs()) < 1 ? [d, o] : [p, r], R.precision = v, J = !0, b;
};
O.toHexadecimal = O.toHex = function(n, i) {
  return ho(this, 16, n, i);
};
O.toNearest = function(n, i) {
  var r = this, o = r.constructor;
  if (r = new o(r), n == null) {
    if (!r.d)
      return r;
    n = new o(1), i = o.rounding;
  } else {
    if (n = new o(n), i === void 0 ? i = o.rounding : et(i, 0, 8), !r.d)
      return n.s ? r : n;
    if (!n.d)
      return n.s && (n.s = r.s), n;
  }
  return n.d[0] ? (J = !1, r = be(r, n, 0, i, 1).times(n), J = !0, Y(r)) : (n.s = r.s, r = n), r;
};
O.toNumber = function() {
  return +this;
};
O.toOctal = function(n, i) {
  return ho(this, 8, n, i);
};
O.toPower = O.pow = function(n) {
  var i, r, o, l, a, c, h = this, p = h.constructor, d = +(n = new p(n));
  if (!h.d || !n.d || !h.d[0] || !n.d[0])
    return new p(Le(+h, d));
  if (h = new p(h), h.eq(1))
    return h;
  if (o = p.precision, a = p.rounding, n.eq(1))
    return Y(h, o, a);
  if (i = We(n.e / Q), i >= n.d.length - 1 && (r = d < 0 ? -d : d) <= hw)
    return l = xu(p, h, r, o), n.s < 0 ? new p(1).div(l) : Y(l, o, a);
  if (c = h.s, c < 0) {
    if (i < n.d.length - 1)
      return new p(NaN);
    if (n.d[i] & 1 || (c = 1), h.e == 0 && h.d[0] == 1 && h.d.length == 1)
      return h.s = c, h;
  }
  return r = Le(+h, d), i = r == 0 || !isFinite(r) ? We(d * (Math.log("0." + $e(h.d)) / Math.LN10 + h.e + 1)) : new p(r + "").e, i > p.maxE + 1 || i < p.minE - 1 ? new p(i > 0 ? c / 0 : 0) : (J = !1, p.rounding = h.s = 1, r = Math.min(12, (i + "").length), l = ao(n.times(pn(h, o + r)), o), l.d && (l = Y(l, o + 5, 1), Cr(l.d, o, a) && (i = o + 10, l = Y(ao(n.times(pn(h, i + r)), i), i + 5, 1), +$e(l.d).slice(o + 1, o + 15) + 1 == 1e14 && (l = Y(l, o + 1, 0)))), l.s = c, J = !0, p.rounding = a, Y(l, o, a));
};
O.toPrecision = function(n, i) {
  var r, o = this, l = o.constructor;
  return n === void 0 ? r = Ft(o, o.e <= l.toExpNeg || o.e >= l.toExpPos) : (et(n, 1, mn), i === void 0 ? i = l.rounding : et(i, 0, 8), o = Y(new l(o), n, i), r = Ft(o, n <= o.e || o.e <= l.toExpNeg, n)), o.isNeg() && !o.isZero() ? "-" + r : r;
};
O.toSignificantDigits = O.toSD = function(n, i) {
  var r = this, o = r.constructor;
  return n === void 0 ? (n = o.precision, i = o.rounding) : (et(n, 1, mn), i === void 0 ? i = o.rounding : et(i, 0, 8)), Y(new o(r), n, i);
};
O.toString = function() {
  var n = this, i = n.constructor, r = Ft(n, n.e <= i.toExpNeg || n.e >= i.toExpPos);
  return n.isNeg() && !n.isZero() ? "-" + r : r;
};
O.truncated = O.trunc = function() {
  return Y(new this.constructor(this), this.e + 1, 1);
};
O.valueOf = O.toJSON = function() {
  var n = this, i = n.constructor, r = Ft(n, n.e <= i.toExpNeg || n.e >= i.toExpPos);
  return n.isNeg() ? "-" + r : r;
};
function $e(n) {
  var i, r, o, l = n.length - 1, a = "", c = n[0];
  if (l > 0) {
    for (a += c, i = 1; i < l; i++)
      o = n[i] + "", r = Q - o.length, r && (a += dn(r)), a += o;
    c = n[i], o = c + "", r = Q - o.length, r && (a += dn(r));
  } else if (c === 0)
    return "0";
  for (; c % 10 === 0; )
    c /= 10;
  return a + c;
}
function et(n, i, r) {
  if (n !== ~~n || n < i || n > r)
    throw Error(gn + n);
}
function Cr(n, i, r, o) {
  var l, a, c, h;
  for (a = n[0]; a >= 10; a /= 10)
    --i;
  return --i < 0 ? (i += Q, l = 0) : (l = Math.ceil((i + 1) / Q), i %= Q), a = Le(10, Q - i), h = n[l] % a | 0, o == null ? i < 3 ? (i == 0 ? h = h / 100 | 0 : i == 1 && (h = h / 10 | 0), c = r < 4 && h == 99999 || r > 3 && h == 49999 || h == 5e4 || h == 0) : c = (r < 4 && h + 1 == a || r > 3 && h + 1 == a / 2) && (n[l + 1] / a / 100 | 0) == Le(10, i - 2) - 1 || (h == a / 2 || h == 0) && (n[l + 1] / a / 100 | 0) == 0 : i < 4 ? (i == 0 ? h = h / 1e3 | 0 : i == 1 ? h = h / 100 | 0 : i == 2 && (h = h / 10 | 0), c = (o || r < 4) && h == 9999 || !o && r > 3 && h == 4999) : c = ((o || r < 4) && h + 1 == a || !o && r > 3 && h + 1 == a / 2) && (n[l + 1] / a / 1e3 | 0) == Le(10, i - 3) - 1, c;
}
function Si(n, i, r) {
  for (var o, l = [0], a, c = 0, h = n.length; c < h; ) {
    for (a = l.length; a--; )
      l[a] *= i;
    for (l[0] += io.indexOf(n.charAt(c++)), o = 0; o < l.length; o++)
      l[o] > r - 1 && (l[o + 1] === void 0 && (l[o + 1] = 0), l[o + 1] += l[o] / r | 0, l[o] %= r);
  }
  return l.reverse();
}
function dw(n, i) {
  var r, o, l;
  if (i.isZero())
    return i;
  o = i.d.length, o < 32 ? (r = Math.ceil(o / 3), l = (1 / Ni(4, r)).toString()) : (r = 16, l = "2.3283064365386962890625e-10"), n.precision += r, i = er(n, 1, i.times(l), new n(1));
  for (var a = r; a--; ) {
    var c = i.times(i);
    i = c.times(c).minus(c).times(8).plus(1);
  }
  return n.precision -= r, i;
}
var be = function() {
  function n(o, l, a) {
    var c, h = 0, p = o.length;
    for (o = o.slice(); p--; )
      c = o[p] * l + h, o[p] = c % a | 0, h = c / a | 0;
    return h && o.unshift(h), o;
  }
  function i(o, l, a, c) {
    var h, p;
    if (a != c)
      p = a > c ? 1 : -1;
    else
      for (h = p = 0; h < a; h++)
        if (o[h] != l[h]) {
          p = o[h] > l[h] ? 1 : -1;
          break;
        }
    return p;
  }
  function r(o, l, a, c) {
    for (var h = 0; a--; )
      o[a] -= h, h = o[a] < l[a] ? 1 : 0, o[a] = h * c + o[a] - l[a];
    for (; !o[0] && o.length > 1; )
      o.shift();
  }
  return function(o, l, a, c, h, p) {
    var d, v, w, b, P, F, R, C, B, z, $, H, Z, ce, he, ee, Ue, Ke, qe, tn, Rn = o.constructor, kn = o.s == l.s ? 1 : -1, Ne = o.d, me = l.d;
    if (!Ne || !Ne[0] || !me || !me[0])
      return new Rn(
        // Return NaN if either NaN, or both Infinity or 0.
        !o.s || !l.s || (Ne ? me && Ne[0] == me[0] : !me) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          Ne && Ne[0] == 0 || !me ? kn * 0 : kn / 0
        )
      );
    for (p ? (P = 1, v = o.e - l.e) : (p = Pt, P = Q, v = We(o.e / P) - We(l.e / P)), qe = me.length, Ue = Ne.length, B = new Rn(kn), z = B.d = [], w = 0; me[w] == (Ne[w] || 0); w++)
      ;
    if (me[w] > (Ne[w] || 0) && v--, a == null ? (ce = a = Rn.precision, c = Rn.rounding) : h ? ce = a + (o.e - l.e) + 1 : ce = a, ce < 0)
      z.push(1), F = !0;
    else {
      if (ce = ce / P + 2 | 0, w = 0, qe == 1) {
        for (b = 0, me = me[0], ce++; (w < Ue || b) && ce--; w++)
          he = b * p + (Ne[w] || 0), z[w] = he / me | 0, b = he % me | 0;
        F = b || w < Ue;
      } else {
        for (b = p / (me[0] + 1) | 0, b > 1 && (me = n(me, b, p), Ne = n(Ne, b, p), qe = me.length, Ue = Ne.length), ee = qe, $ = Ne.slice(0, qe), H = $.length; H < qe; )
          $[H++] = 0;
        tn = me.slice(), tn.unshift(0), Ke = me[0], me[1] >= p / 2 && ++Ke;
        do
          b = 0, d = i(me, $, qe, H), d < 0 ? (Z = $[0], qe != H && (Z = Z * p + ($[1] || 0)), b = Z / Ke | 0, b > 1 ? (b >= p && (b = p - 1), R = n(me, b, p), C = R.length, H = $.length, d = i(R, $, C, H), d == 1 && (b--, r(R, qe < C ? tn : me, C, p))) : (b == 0 && (d = b = 1), R = me.slice()), C = R.length, C < H && R.unshift(0), r($, R, H, p), d == -1 && (H = $.length, d = i(me, $, qe, H), d < 1 && (b++, r($, qe < H ? tn : me, H, p))), H = $.length) : d === 0 && (b++, $ = [0]), z[w++] = b, d && $[0] ? $[H++] = Ne[ee] || 0 : ($ = [Ne[ee]], H = 1);
        while ((ee++ < Ue || $[0] !== void 0) && ce--);
        F = $[0] !== void 0;
      }
      z[0] || z.shift();
    }
    if (P == 1)
      B.e = v, gu = F;
    else {
      for (w = 1, b = z[0]; b >= 10; b /= 10)
        w++;
      B.e = w + v * P - 1, Y(B, h ? a + B.e + 1 : a, c, F);
    }
    return B;
  };
}();
function Y(n, i, r, o) {
  var l, a, c, h, p, d, v, w, b, P = n.constructor;
  e:
    if (i != null) {
      if (w = n.d, !w)
        return n;
      for (l = 1, h = w[0]; h >= 10; h /= 10)
        l++;
      if (a = i - l, a < 0)
        a += Q, c = i, v = w[b = 0], p = v / Le(10, l - c - 1) % 10 | 0;
      else if (b = Math.ceil((a + 1) / Q), h = w.length, b >= h)
        if (o) {
          for (; h++ <= b; )
            w.push(0);
          v = p = 0, l = 1, a %= Q, c = a - Q + 1;
        } else
          break e;
      else {
        for (v = h = w[b], l = 1; h >= 10; h /= 10)
          l++;
        a %= Q, c = a - Q + l, p = c < 0 ? 0 : v / Le(10, l - c - 1) % 10 | 0;
      }
      if (o = o || i < 0 || w[b + 1] !== void 0 || (c < 0 ? v : v % Le(10, l - c - 1)), d = r < 4 ? (p || o) && (r == 0 || r == (n.s < 0 ? 3 : 2)) : p > 5 || p == 5 && (r == 4 || o || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (a > 0 ? c > 0 ? v / Le(10, l - c) : 0 : w[b - 1]) % 10 & 1 || r == (n.s < 0 ? 8 : 7)), i < 1 || !w[0])
        return w.length = 0, d ? (i -= n.e + 1, w[0] = Le(10, (Q - i % Q) % Q), n.e = -i || 0) : w[0] = n.e = 0, n;
      if (a == 0 ? (w.length = b, h = 1, b--) : (w.length = b + 1, h = Le(10, Q - a), w[b] = c > 0 ? (v / Le(10, l - c) % Le(10, c) | 0) * h : 0), d)
        for (; ; )
          if (b == 0) {
            for (a = 1, c = w[0]; c >= 10; c /= 10)
              a++;
            for (c = w[0] += h, h = 1; c >= 10; c /= 10)
              h++;
            a != h && (n.e++, w[0] == Pt && (w[0] = 1));
            break;
          } else {
            if (w[b] += h, w[b] != Pt)
              break;
            w[b--] = 0, h = 1;
          }
      for (a = w.length; w[--a] === 0; )
        w.pop();
    }
  return J && (n.e > P.maxE ? (n.d = null, n.e = NaN) : n.e < P.minE && (n.e = 0, n.d = [0])), n;
}
function Ft(n, i, r) {
  if (!n.isFinite())
    return Eu(n);
  var o, l = n.e, a = $e(n.d), c = a.length;
  return i ? (r && (o = r - c) > 0 ? a = a.charAt(0) + "." + a.slice(1) + dn(o) : c > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (n.e < 0 ? "e" : "e+") + n.e) : l < 0 ? (a = "0." + dn(-l - 1) + a, r && (o = r - c) > 0 && (a += dn(o))) : l >= c ? (a += dn(l + 1 - c), r && (o = r - l - 1) > 0 && (a = a + "." + dn(o))) : ((o = l + 1) < c && (a = a.slice(0, o) + "." + a.slice(o)), r && (o = r - c) > 0 && (l + 1 === c && (a += "."), a += dn(o))), a;
}
function Li(n, i) {
  var r = n[0];
  for (i *= Q; r >= 10; r /= 10)
    i++;
  return i;
}
function ki(n, i, r) {
  if (i > fw)
    throw J = !0, r && (n.precision = r), Error(mu);
  return Y(new n(Ai), i, 1, !0);
}
function Ot(n, i, r) {
  if (i > oo)
    throw Error(mu);
  return Y(new n(Ri), i, r, !0);
}
function bu(n) {
  var i = n.length - 1, r = i * Q + 1;
  if (i = n[i], i) {
    for (; i % 10 == 0; i /= 10)
      r--;
    for (i = n[0]; i >= 10; i /= 10)
      r++;
  }
  return r;
}
function dn(n) {
  for (var i = ""; n--; )
    i += "0";
  return i;
}
function xu(n, i, r, o) {
  var l, a = new n(1), c = Math.ceil(o / Q + 4);
  for (J = !1; ; ) {
    if (r % 2 && (a = a.times(i), su(a.d, c) && (l = !0)), r = We(r / 2), r === 0) {
      r = a.d.length - 1, l && a.d[r] === 0 && ++a.d[r];
      break;
    }
    i = i.times(i), su(i.d, c);
  }
  return J = !0, a;
}
function iu(n) {
  return n.d[n.d.length - 1] & 1;
}
function yu(n, i, r) {
  for (var o, l, a = new n(i[0]), c = 0; ++c < i.length; ) {
    if (l = new n(i[c]), !l.s) {
      a = l;
      break;
    }
    o = a.cmp(l), (o === r || o === 0 && a.s === r) && (a = l);
  }
  return a;
}
function ao(n, i) {
  var r, o, l, a, c, h, p, d = 0, v = 0, w = 0, b = n.constructor, P = b.rounding, F = b.precision;
  if (!n.d || !n.d[0] || n.e > 17)
    return new b(n.d ? n.d[0] ? n.s < 0 ? 0 : 1 / 0 : 1 : n.s ? n.s < 0 ? 0 : n : 0 / 0);
  for (i == null ? (J = !1, p = F) : p = i, h = new b(0.03125); n.e > -2; )
    n = n.times(h), w += 5;
  for (o = Math.log(Le(2, w)) / Math.LN10 * 2 + 5 | 0, p += o, r = a = c = new b(1), b.precision = p; ; ) {
    if (a = Y(a.times(n), p, 1), r = r.times(++v), h = c.plus(be(a, r, p, 1)), $e(h.d).slice(0, p) === $e(c.d).slice(0, p)) {
      for (l = w; l--; )
        c = Y(c.times(c), p, 1);
      if (i == null)
        if (d < 3 && Cr(c.d, p - o, P, d))
          b.precision = p += 10, r = a = h = new b(1), v = 0, d++;
        else
          return Y(c, b.precision = F, P, J = !0);
      else
        return b.precision = F, c;
    }
    c = h;
  }
}
function pn(n, i) {
  var r, o, l, a, c, h, p, d, v, w, b, P = 1, F = 10, R = n, C = R.d, B = R.constructor, z = B.rounding, $ = B.precision;
  if (R.s < 0 || !C || !C[0] || !R.e && C[0] == 1 && C.length == 1)
    return new B(C && !C[0] ? -1 / 0 : R.s != 1 ? NaN : C ? 0 : R);
  if (i == null ? (J = !1, v = $) : v = i, B.precision = v += F, r = $e(C), o = r.charAt(0), Math.abs(a = R.e) < 15e14) {
    for (; o < 7 && o != 1 || o == 1 && r.charAt(1) > 3; )
      R = R.times(n), r = $e(R.d), o = r.charAt(0), P++;
    a = R.e, o > 1 ? (R = new B("0." + r), a++) : R = new B(o + "." + r.slice(1));
  } else
    return d = ki(B, v + 2, $).times(a + ""), R = pn(new B(o + "." + r.slice(1)), v - F).plus(d), B.precision = $, i == null ? Y(R, $, z, J = !0) : R;
  for (w = R, p = c = R = be(R.minus(1), R.plus(1), v, 1), b = Y(R.times(R), v, 1), l = 3; ; ) {
    if (c = Y(c.times(b), v, 1), d = p.plus(be(c, new B(l), v, 1)), $e(d.d).slice(0, v) === $e(p.d).slice(0, v))
      if (p = p.times(2), a !== 0 && (p = p.plus(ki(B, v + 2, $).times(a + ""))), p = be(p, new B(P), v, 1), i == null)
        if (Cr(p.d, v - F, z, h))
          B.precision = v += F, d = c = R = be(w.minus(1), w.plus(1), v, 1), b = Y(R.times(R), v, 1), l = h = 1;
        else
          return Y(p, B.precision = $, z, J = !0);
      else
        return B.precision = $, p;
    p = d, l += 2;
  }
}
function Eu(n) {
  return String(n.s * n.s / 0);
}
function Ti(n, i) {
  var r, o, l;
  for ((r = i.indexOf(".")) > -1 && (i = i.replace(".", "")), (o = i.search(/e/i)) > 0 ? (r < 0 && (r = o), r += +i.slice(o + 1), i = i.substring(0, o)) : r < 0 && (r = i.length), o = 0; i.charCodeAt(o) === 48; o++)
    ;
  for (l = i.length; i.charCodeAt(l - 1) === 48; --l)
    ;
  if (i = i.slice(o, l), i) {
    if (l -= o, n.e = r = r - o - 1, n.d = [], o = (r + 1) % Q, r < 0 && (o += Q), o < l) {
      for (o && n.d.push(+i.slice(0, o)), l -= Q; o < l; )
        n.d.push(+i.slice(o, o += Q));
      i = i.slice(o), o = Q - i.length;
    } else
      o -= l;
    for (; o--; )
      i += "0";
    n.d.push(+i), J && (n.e > n.constructor.maxE ? (n.d = null, n.e = NaN) : n.e < n.constructor.minE && (n.e = 0, n.d = [0]));
  } else
    n.e = 0, n.d = [0];
  return n;
}
function pw(n, i) {
  var r, o, l, a, c, h, p, d, v;
  if (i.indexOf("_") > -1) {
    if (i = i.replace(/(\d)_(?=\d)/g, "$1"), _u.test(i))
      return Ti(n, i);
  } else if (i === "Infinity" || i === "NaN")
    return +i || (n.s = NaN), n.e = NaN, n.d = null, n;
  if (uw.test(i))
    r = 16, i = i.toLowerCase();
  else if (lw.test(i))
    r = 2;
  else if (cw.test(i))
    r = 8;
  else
    throw Error(gn + i);
  for (a = i.search(/p/i), a > 0 ? (p = +i.slice(a + 1), i = i.substring(2, a)) : i = i.slice(2), a = i.indexOf("."), c = a >= 0, o = n.constructor, c && (i = i.replace(".", ""), h = i.length, a = h - a, l = xu(o, new o(r), a, a * 2)), d = Si(i, r, Pt), v = d.length - 1, a = v; d[a] === 0; --a)
    d.pop();
  return a < 0 ? new o(n.s * 0) : (n.e = Li(d, v), n.d = d, J = !1, c && (n = be(n, l, h * 4)), p && (n = n.times(Math.abs(p) < 54 ? Le(2, p) : vt.pow(2, p))), J = !0, n);
}
function gw(n, i) {
  var r, o = i.d.length;
  if (o < 3)
    return i.isZero() ? i : er(n, 2, i, i);
  r = 1.4 * Math.sqrt(o), r = r > 16 ? 16 : r | 0, i = i.times(1 / Ni(5, r)), i = er(n, 2, i, i);
  for (var l, a = new n(5), c = new n(16), h = new n(20); r--; )
    l = i.times(i), i = i.times(a.plus(l.times(c.times(l).minus(h))));
  return i;
}
function er(n, i, r, o, l) {
  var a, c, h, p, d = n.precision, v = Math.ceil(d / Q);
  for (J = !1, p = r.times(r), h = new n(o); ; ) {
    if (c = be(h.times(p), new n(i++ * i++), d, 1), h = l ? o.plus(c) : o.minus(c), o = be(c.times(p), new n(i++ * i++), d, 1), c = h.plus(o), c.d[v] !== void 0) {
      for (a = v; c.d[a] === h.d[a] && a--; )
        ;
      if (a == -1)
        break;
    }
    a = h, h = o, o = c, c = a;
  }
  return J = !0, c.d.length = v + 1, c;
}
function Ni(n, i) {
  for (var r = n; --i; )
    r *= n;
  return r;
}
function Su(n, i) {
  var r, o = i.s < 0, l = Ot(n, n.precision, 1), a = l.times(0.5);
  if (i = i.abs(), i.lte(a))
    return en = o ? 4 : 1, i;
  if (r = i.divToInt(l), r.isZero())
    en = o ? 3 : 2;
  else {
    if (i = i.minus(r.times(l)), i.lte(a))
      return en = iu(r) ? o ? 2 : 3 : o ? 4 : 1, i;
    en = iu(r) ? o ? 1 : 4 : o ? 3 : 2;
  }
  return i.minus(l).abs();
}
function ho(n, i, r, o) {
  var l, a, c, h, p, d, v, w, b, P = n.constructor, F = r !== void 0;
  if (F ? (et(r, 1, mn), o === void 0 ? o = P.rounding : et(o, 0, 8)) : (r = P.precision, o = P.rounding), !n.isFinite())
    v = Eu(n);
  else {
    for (v = Ft(n), c = v.indexOf("."), F ? (l = 2, i == 16 ? r = r * 4 - 3 : i == 8 && (r = r * 3 - 2)) : l = i, c >= 0 && (v = v.replace(".", ""), b = new P(1), b.e = v.length - c, b.d = Si(Ft(b), 10, l), b.e = b.d.length), w = Si(v, 10, l), a = p = w.length; w[--p] == 0; )
      w.pop();
    if (!w[0])
      v = F ? "0p+0" : "0";
    else {
      if (c < 0 ? a-- : (n = new P(n), n.d = w, n.e = a, n = be(n, b, r, o, 0, l), w = n.d, a = n.e, d = gu), c = w[r], h = l / 2, d = d || w[r + 1] !== void 0, d = o < 4 ? (c !== void 0 || d) && (o === 0 || o === (n.s < 0 ? 3 : 2)) : c > h || c === h && (o === 4 || d || o === 6 && w[r - 1] & 1 || o === (n.s < 0 ? 8 : 7)), w.length = r, d)
        for (; ++w[--r] > l - 1; )
          w[r] = 0, r || (++a, w.unshift(1));
      for (p = w.length; !w[p - 1]; --p)
        ;
      for (c = 0, v = ""; c < p; c++)
        v += io.charAt(w[c]);
      if (F) {
        if (p > 1)
          if (i == 16 || i == 8) {
            for (c = i == 16 ? 4 : 3, --p; p % c; p++)
              v += "0";
            for (w = Si(v, l, i), p = w.length; !w[p - 1]; --p)
              ;
            for (c = 1, v = "1."; c < p; c++)
              v += io.charAt(w[c]);
          } else
            v = v.charAt(0) + "." + v.slice(1);
        v = v + (a < 0 ? "p" : "p+") + a;
      } else if (a < 0) {
        for (; ++a; )
          v = "0" + v;
        v = "0." + v;
      } else if (++a > p)
        for (a -= p; a--; )
          v += "0";
      else
        a < p && (v = v.slice(0, a) + "." + v.slice(a));
    }
    v = (i == 16 ? "0x" : i == 2 ? "0b" : i == 8 ? "0o" : "") + v;
  }
  return n.s < 0 ? "-" + v : v;
}
function su(n, i) {
  if (n.length > i)
    return n.length = i, !0;
}
function mw(n) {
  return new this(n).abs();
}
function vw(n) {
  return new this(n).acos();
}
function ww(n) {
  return new this(n).acosh();
}
function _w(n, i) {
  return new this(n).plus(i);
}
function bw(n) {
  return new this(n).asin();
}
function xw(n) {
  return new this(n).asinh();
}
function yw(n) {
  return new this(n).atan();
}
function Ew(n) {
  return new this(n).atanh();
}
function Sw(n, i) {
  n = new this(n), i = new this(i);
  var r, o = this.precision, l = this.rounding, a = o + 4;
  return !n.s || !i.s ? r = new this(NaN) : !n.d && !i.d ? (r = Ot(this, a, 1).times(i.s > 0 ? 0.25 : 0.75), r.s = n.s) : !i.d || n.isZero() ? (r = i.s < 0 ? Ot(this, o, l) : new this(0), r.s = n.s) : !n.d || i.isZero() ? (r = Ot(this, a, 1).times(0.5), r.s = n.s) : i.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(be(n, i, a, 1)), i = Ot(this, a, 1), this.precision = o, this.rounding = l, r = n.s < 0 ? r.minus(i) : r.plus(i)) : r = this.atan(be(n, i, a, 1)), r;
}
function Tw(n) {
  return new this(n).cbrt();
}
function Mw(n) {
  return Y(n = new this(n), n.e + 1, 2);
}
function Cw(n, i, r) {
  return new this(n).clamp(i, r);
}
function Pw(n) {
  if (!n || typeof n != "object")
    throw Error(Ii + "Object expected");
  var i, r, o, l = n.defaults === !0, a = [
    "precision",
    1,
    mn,
    "rounding",
    0,
    8,
    "toExpNeg",
    -Kn,
    0,
    "toExpPos",
    0,
    Kn,
    "maxE",
    0,
    Kn,
    "minE",
    -Kn,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < a.length; i += 3)
    if (r = a[i], l && (this[r] = so[r]), (o = n[r]) !== void 0)
      if (We(o) === o && o >= a[i + 1] && o <= a[i + 2])
        this[r] = o;
      else
        throw Error(gn + r + ": " + o);
  if (r = "crypto", l && (this[r] = so[r]), (o = n[r]) !== void 0)
    if (o === !0 || o === !1 || o === 0 || o === 1)
      if (o)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[r] = !0;
        else
          throw Error(vu);
      else
        this[r] = !1;
    else
      throw Error(gn + r + ": " + o);
  return this;
}
function Aw(n) {
  return new this(n).cos();
}
function Rw(n) {
  return new this(n).cosh();
}
function Tu(n) {
  var i, r, o;
  function l(a) {
    var c, h, p, d = this;
    if (!(d instanceof l))
      return new l(a);
    if (d.constructor = l, ou(a)) {
      d.s = a.s, J ? !a.d || a.e > l.maxE ? (d.e = NaN, d.d = null) : a.e < l.minE ? (d.e = 0, d.d = [0]) : (d.e = a.e, d.d = a.d.slice()) : (d.e = a.e, d.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (p = typeof a, p === "number") {
      if (a === 0) {
        d.s = 1 / a < 0 ? -1 : 1, d.e = 0, d.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, d.s = -1) : d.s = 1, a === ~~a && a < 1e7) {
        for (c = 0, h = a; h >= 10; h /= 10)
          c++;
        J ? c > l.maxE ? (d.e = NaN, d.d = null) : c < l.minE ? (d.e = 0, d.d = [0]) : (d.e = c, d.d = [a]) : (d.e = c, d.d = [a]);
        return;
      }
      if (a * 0 !== 0) {
        a || (d.s = NaN), d.e = NaN, d.d = null;
        return;
      }
      return Ti(d, a.toString());
    }
    if (p === "string")
      return (h = a.charCodeAt(0)) === 45 ? (a = a.slice(1), d.s = -1) : (h === 43 && (a = a.slice(1)), d.s = 1), _u.test(a) ? Ti(d, a) : pw(d, a);
    if (p === "bigint")
      return a < 0 ? (a = -a, d.s = -1) : d.s = 1, Ti(d, a.toString());
    throw Error(gn + a);
  }
  if (l.prototype = O, l.ROUND_UP = 0, l.ROUND_DOWN = 1, l.ROUND_CEIL = 2, l.ROUND_FLOOR = 3, l.ROUND_HALF_UP = 4, l.ROUND_HALF_DOWN = 5, l.ROUND_HALF_EVEN = 6, l.ROUND_HALF_CEIL = 7, l.ROUND_HALF_FLOOR = 8, l.EUCLID = 9, l.config = l.set = Pw, l.clone = Tu, l.isDecimal = ou, l.abs = mw, l.acos = vw, l.acosh = ww, l.add = _w, l.asin = bw, l.asinh = xw, l.atan = yw, l.atanh = Ew, l.atan2 = Sw, l.cbrt = Tw, l.ceil = Mw, l.clamp = Cw, l.cos = Aw, l.cosh = Rw, l.div = kw, l.exp = Bw, l.floor = Iw, l.hypot = Lw, l.ln = Nw, l.log = Ow, l.log10 = Fw, l.log2 = Dw, l.max = $w, l.min = zw, l.mod = Uw, l.mul = Vw, l.pow = Hw, l.random = Ww, l.round = qw, l.sign = Yw, l.sin = Gw, l.sinh = Qw, l.sqrt = Kw, l.sub = Xw, l.sum = Zw, l.tan = Jw, l.tanh = jw, l.trunc = e_, n === void 0 && (n = {}), n && n.defaults !== !0)
    for (o = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], i = 0; i < o.length; )
      n.hasOwnProperty(r = o[i++]) || (n[r] = this[r]);
  return l.config(n), l;
}
function kw(n, i) {
  return new this(n).div(i);
}
function Bw(n) {
  return new this(n).exp();
}
function Iw(n) {
  return Y(n = new this(n), n.e + 1, 3);
}
function Lw() {
  var n, i, r = new this(0);
  for (J = !1, n = 0; n < arguments.length; )
    if (i = new this(arguments[n++]), i.d)
      r.d && (r = r.plus(i.times(i)));
    else {
      if (i.s)
        return J = !0, new this(1 / 0);
      r = i;
    }
  return J = !0, r.sqrt();
}
function ou(n) {
  return n instanceof vt || n && n.toStringTag === wu || !1;
}
function Nw(n) {
  return new this(n).ln();
}
function Ow(n, i) {
  return new this(n).log(i);
}
function Dw(n) {
  return new this(n).log(2);
}
function Fw(n) {
  return new this(n).log(10);
}
function $w() {
  return yu(this, arguments, -1);
}
function zw() {
  return yu(this, arguments, 1);
}
function Uw(n, i) {
  return new this(n).mod(i);
}
function Vw(n, i) {
  return new this(n).mul(i);
}
function Hw(n, i) {
  return new this(n).pow(i);
}
function Ww(n) {
  var i, r, o, l, a = 0, c = new this(1), h = [];
  if (n === void 0 ? n = this.precision : et(n, 1, mn), o = Math.ceil(n / Q), this.crypto)
    if (crypto.getRandomValues)
      for (i = crypto.getRandomValues(new Uint32Array(o)); a < o; )
        l = i[a], l >= 429e7 ? i[a] = crypto.getRandomValues(new Uint32Array(1))[0] : h[a++] = l % 1e7;
    else if (crypto.randomBytes) {
      for (i = crypto.randomBytes(o *= 4); a < o; )
        l = i[a] + (i[a + 1] << 8) + (i[a + 2] << 16) + ((i[a + 3] & 127) << 24), l >= 214e7 ? crypto.randomBytes(4).copy(i, a) : (h.push(l % 1e7), a += 4);
      a = o / 4;
    } else
      throw Error(vu);
  else
    for (; a < o; )
      h[a++] = Math.random() * 1e7 | 0;
  for (o = h[--a], n %= Q, o && n && (l = Le(10, Q - n), h[a] = (o / l | 0) * l); h[a] === 0; a--)
    h.pop();
  if (a < 0)
    r = 0, h = [0];
  else {
    for (r = -1; h[0] === 0; r -= Q)
      h.shift();
    for (o = 1, l = h[0]; l >= 10; l /= 10)
      o++;
    o < Q && (r -= Q - o);
  }
  return c.e = r, c.d = h, c;
}
function qw(n) {
  return Y(n = new this(n), n.e + 1, this.rounding);
}
function Yw(n) {
  return n = new this(n), n.d ? n.d[0] ? n.s : 0 * n.s : n.s || NaN;
}
function Gw(n) {
  return new this(n).sin();
}
function Qw(n) {
  return new this(n).sinh();
}
function Kw(n) {
  return new this(n).sqrt();
}
function Xw(n, i) {
  return new this(n).sub(i);
}
function Zw() {
  var n = 0, i = arguments, r = new this(i[n]);
  for (J = !1; r.s && ++n < i.length; )
    r = r.plus(i[n]);
  return J = !0, Y(r, this.precision, this.rounding);
}
function Jw(n) {
  return new this(n).tan();
}
function jw(n) {
  return new this(n).tanh();
}
function e_(n) {
  return Y(n = new this(n), n.e + 1, 1);
}
O[Symbol.for("nodejs.util.inspect.custom")] = O.toString;
O[Symbol.toStringTag] = "Decimal";
var vt = O.constructor = Tu(so);
Ai = new vt(Ai);
Ri = new vt(Ri);
const jt = 1, t_ = jt * 100, Jt = jt * 1e3, Ct = Jt * 60, n_ = Ct * 5, r_ = Ct * 15, Lt = Ct * 60, i_ = Lt * 4, s_ = Lt * 12, Mt = Lt * 24, fo = Mt * 7, Cn = fo * 4, Pn = Mt * 365, o_ = [
  Pn * 10,
  Pn * 5,
  Pn * 3,
  Pn * 2,
  Pn,
  Cn * 6,
  Cn * 4,
  Cn * 3,
  Cn * 2,
  Cn,
  Mt * 15,
  Mt * 10,
  Mt * 7,
  Mt * 5,
  Mt * 3,
  Mt * 2,
  Mt,
  Lt * 12,
  Lt * 6,
  Lt * 4,
  Lt * 2,
  Lt,
  Ct * 30,
  Ct * 15,
  Ct * 10,
  Ct * 5,
  Ct * 2,
  Ct,
  Jt * 30,
  Jt * 15,
  Jt * 10,
  Jt * 5,
  Jt * 2,
  Jt,
  jt * 500,
  jt * 250,
  jt * 100,
  jt * 50,
  jt
], Mi = {
  ms: jt,
  s: Jt,
  m: Ct,
  h: Lt,
  d: Mt,
  w: fo,
  mo: Cn,
  y: Pn
}, a_ = [
  {
    short: "Jan",
    long: "January"
  },
  {
    short: "Feb",
    long: "February"
  },
  {
    short: "Mar",
    long: "March"
  },
  {
    short: "Apr",
    long: "April"
  },
  {
    short: "May",
    long: "May"
  },
  {
    short: "Jun",
    long: "June"
  },
  {
    short: "Jul",
    long: "July"
  },
  {
    short: "Aug",
    long: "August"
  },
  {
    short: "Sep",
    long: "September"
  },
  {
    short: "Oct",
    long: "October"
  },
  {
    short: "Nov",
    long: "November"
  },
  {
    short: "Dec",
    long: "December"
  }
];
function l_(n) {
  const i = Object.keys(Mi);
  for (let r = 0; r < i.length; r++)
    if (n / Mi[i[r]] < 1) {
      const o = i[r - 1];
      return `${n / Mi[o]}${o}`;
    }
}
const u_ = {
  LIGHT: {
    BACKGROUND: "#FFF"
  },
  DARK: {
    BACKGROUND: "#000"
  }
}, c_ = {
  LIGHT: {
    BACKGROUND: [1, 1, 1, 1]
  },
  DARK: {
    BACKGROUND: [0, 0, 0, 1]
  }
}, Mr = {
  MILLISECOND: jt,
  MILLISECOND100: t_,
  SECOND: Jt,
  MINUTE: Ct,
  MINUTE5: n_,
  MINUTE15: r_,
  HOUR: Lt,
  HOUR4: i_,
  HOUR12: s_,
  DAY: Mt,
  WEEK: fo,
  MONTH: Cn,
  YEAR: Pn,
  TIMESCALES: o_,
  TIMEFRAMES: Mi,
  MONTHS: a_,
  getTimeframeText: l_,
  HEX_THEMES: u_,
  RGBA_THEMES: c_
}, Xn = {
  /** Visible range percent: ((value - first) / |first|) * 100 */
  percent(n, i) {
    const r = (i == null ? void 0 : i.first) ?? n[0], o = Math.abs(r);
    return n.map((l) => (l - r) / o * 100);
  },
  /** Normalized to 0-100: ((value - min) / (max - min)) * 100 */
  normalized(n, i) {
    const r = (i == null ? void 0 : i.min) ?? Math.min(...n), l = ((i == null ? void 0 : i.max) ?? Math.max(...n)) - r;
    return l === 0 ? n.map(() => 0) : n.map((a) => (a - r) / l * 100);
  },
  /** Simple Moving Average */
  sma(n, i) {
    const r = [];
    for (let o = 0; o < n.length; o++) {
      if (o < i - 1) {
        r.push(NaN);
        continue;
      }
      let l = 0;
      for (let a = o - i + 1; a <= o; a++)
        l += n[a];
      r.push(l / i);
    }
    return r;
  },
  /** Bollinger Bands: returns { upper, middle, lower } arrays */
  bbands(n, i, r) {
    const o = Xn.sma(n, i), l = [], a = [];
    for (let c = 0; c < n.length; c++) {
      if (c < i - 1) {
        l.push(NaN), a.push(NaN);
        continue;
      }
      let h = 0;
      for (let d = c - i + 1; d <= c; d++) {
        const v = n[d] - o[c];
        h += v * v;
      }
      const p = Math.sqrt(h / i);
      l.push(o[c] + r * p), a.push(o[c] - r * p);
    }
    return { upper: l, middle: o, lower: a };
  },
  /** Bollinger Band %B: (price - lower) / (upper - lower) */
  bbpb(n, i, r) {
    const { upper: o, lower: l } = Xn.bbands(n, i, r), a = [];
    for (let c = 0; c < n.length; c++) {
      if (isNaN(o[c]) || isNaN(l[c])) {
        a.push(NaN);
        continue;
      }
      const h = o[c] - l[c];
      if (h === 0) {
        a.push(0);
        continue;
      }
      a.push((n[c] - l[c]) / h);
    }
    return a;
  },
  /** Bollinger Band Width: (upper - lower) / middle */
  bbw(n, i, r) {
    const { upper: o, middle: l, lower: a } = Xn.bbands(
      n,
      i,
      r
    ), c = [];
    for (let h = 0; h < n.length; h++) {
      if (isNaN(o[h]) || isNaN(a[h]) || isNaN(l[h])) {
        c.push(NaN);
        continue;
      }
      if (l[h] === 0) {
        c.push(0);
        continue;
      }
      c.push((o[h] - a[h]) / l[h]);
    }
    return c;
  }
}, h_ = (n) => ({
  time: Ce([]),
  value: _e({}),
  labels: _e({}),
  _widths: [],
  generateXScales() {
    this.time.value = f_(
      n.pixelsPerElement.value,
      n.timeframe.value,
      n.startTime.value,
      n.endTime.value,
      n.stores.dimensions.width.value
    );
  },
  generateYScales(i) {
    const r = n.stores.dimensions.main.screens[i.id], o = d_(
      i.minValue,
      i.maxValue,
      r.height,
      n.scaleType.value,
      n.valueScaleDecimalPrecision.value
    ), l = p_({
      minValue: i.minValue,
      maxValue: i.maxValue,
      height: r.height,
      valuePrecision: n.valueScaleDecimalPrecision.value,
      scaleType: n.scaleType.value,
      serieses: Object.values(n.series).filter(
        (a) => a._screen === i.id
      )
    });
    if (this.value[i.id] = o, this.labels[i.id] = l, this._widths[i.id] = 0, o.length) {
      const a = Math.max(...o.map((c) => c.text.length)) * 8;
      this._widths[i.id] = a;
    }
    this.generateValueScaleWidth();
  },
  /** Generate the maximum px width required for the value scale based on scales */
  generateValueScaleWidth() {
    const { valueScale: i } = n.stores.dimensions, r = Math.max(...this._widths, i.width.value);
    r !== i.width.value && (i.width.value = r, setTimeout(() => n.stores.dimensions.recompute()));
  }
});
function f_(n, i, r, o, l) {
  const a = [];
  let h = 0;
  for (let d = Mr.TIMESCALES.indexOf(i); d >= 0; d--)
    if (n * (Mr.TIMESCALES[d] / i) >= 100) {
      h = Mr.TIMESCALES[d];
      break;
    }
  const p = (d) => co(r, o, l, d);
  for (let d = r - r % h; d < o; d += h)
    a.push({
      x: p(d),
      time: d,
      text: g_(d, i)
    });
  return a;
}
function d_(n, i, r, o, l) {
  const a = [];
  if (n === 1 / 0 || i === -1 / 0)
    return [];
  const c = new vt(i - n), h = new vt(+c.toExponential().split("e")[1]);
  let p = new vt(10).pow(h);
  const d = new vt(p);
  let v = 1;
  const w = [0.5, 0.25, 0.1, 0.05, 0.025, 1e-3];
  for (; (i - n) / p.toNumber() < Math.floor(r / 100) && w[v]; )
    p = d.times(w[v]), v++;
  let b = new vt(n).minus(new vt(n).modulo(p)).toNumber(), P = new vt(i).plus(p.minus(new vt(i).modulo(p))).toNumber();
  const F = (B) => Zn(n, i, r, B), C = (P - b) * 1.05;
  for (let B = 0; B < C / p.toNumber(); B++) {
    const z = p.times(B).add(b).toNumber();
    a.push({
      y: F(z),
      value: z,
      text: po(z, o, l)
    });
  }
  return a;
}
function p_({
  minValue: n,
  maxValue: i,
  height: r,
  valuePrecision: o,
  scaleType: l,
  serieses: a
}) {
  const c = [], h = (p) => Zn(n, i, r, p);
  for (const p of a) {
    if (p.visible !== !0 || !p.label || !p._latestValue || !("_valueColor" in p))
      continue;
    let d = p._latestValue;
    const v = {
      first: p._visibleFirst,
      min: p._visibleMin,
      max: p._visibleMax
    };
    l === 1 ? d = Xn.percent([p._latestValue], v)[0] : l === 2 && (d = Xn.normalized([p._latestValue], v)[0]), c.push({
      y: h(d),
      value: po(d, l, o),
      label: p.label,
      backgroundColor: p._valueColor,
      textColor: nv(p._valueColor)
    });
  }
  return c;
}
function po(n, i, r) {
  let o = `${n.toFixed(r)}`;
  return n < 1 && (o = fu(n)), i === 1 ? o = `${n >= 0 ? "+" : ""}${n.toFixed(2)}%` : i === 2 && (o = `${n.toFixed(2)}`), o;
}
function g_(n, i) {
  let r = "";
  const o = new tv(n);
  if (n / Mr.DAY % 1 === 0) {
    const a = o.value.getMonth() + 1, c = o.value.getDate() + 1;
    c === 1 ? r = `${Mr.MONTHS[o.value.getMonth()].short}` : r = `${a}/${c}`;
  } else
    i < 6e4 ? r = `${Tt(o.m())}:${Tt(o.s())}` : i < 6e4 * 60 ? r = `${Tt(o.h())}:${Tt(o.m())}` : i < 6e4 * 60 * 24 ? r = `${Tt(o.h())}:${Tt(o.m())}` : r = `${Tt(o.d())}d:${Tt(o.h())}h`;
  return r;
}
function m_(n) {
  const i = [0, 1];
  return n({
    vert: `
      precision highp float;

      uniform mat4 projection;
      uniform vec2 screen;
      uniform float width;
      uniform int isHorizontal;

      attribute float vertex;
      attribute float position;

      void main() {
        vec2 pos;

        if (isHorizontal == 1) {
          // Horizontal line: position is Y, vertex interpolates X from 0 to screen.x
          pos = vec2(vertex * screen.x, position);
        } else {
          // Vertical line: position is X, vertex interpolates Y from 0 to screen.y
          pos = vec2(position, vertex * screen.y);
        }

        gl_Position = projection * vec4(pos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;

      uniform vec4 color;

      void main() {
        gl_FragColor = color;
      }
    `,
    attributes: {
      vertex: {
        buffer: n.buffer(i),
        divisor: 0
      },
      position: {
        buffer: n.prop("positions"),
        divisor: 1
      }
    },
    uniforms: {
      projection: n.prop("projection"),
      screen: n.prop("screen"),
      color: n.prop("color"),
      width: n.prop("width"),
      isHorizontal: n.prop("isHorizontal")
    },
    primitive: "lines",
    count: 2,
    instances: n.prop("count"),
    lineWidth: 1,
    // Note: lineWidth > 1 may not work on all platforms
    blend: {
      enable: !0,
      func: {
        srcRGB: "src alpha",
        srcAlpha: 1,
        dstRGB: "one minus src alpha",
        dstAlpha: 1
      },
      equation: {
        rgb: "add",
        alpha: "add"
      },
      color: [0, 0, 0, 0]
    }
  });
}
const tr = `
  precision highp float;

  uniform vec2 timeBound;
  uniform vec2 valueBound;
  uniform vec2 screen;
  uniform mat4 projection;

  uniform int scaleType;

  uniform float seriesMin;
  uniform float seriesMax;
  uniform float seriesFirst;  
`, Pr = (n) => ({
  timeBound: n.prop("timeBound"),
  valueBound: n.prop("valueBound"),
  screen: n.prop("screen"),
  projection: n.prop("projection"),
  scaleType: n.prop("scaleType"),
  seriesMin: n.prop("seriesMin"),
  seriesMax: n.prop("seriesMax"),
  seriesFirst: n.prop("seriesFirst")
}), nr = `
  vec2 worldToScreenSpace(vec2 coords) {
    if (scaleType == 1) {
      coords.y = ((coords.y - seriesFirst) / abs(seriesFirst)) * 100.0;
    }
    else if (scaleType == 2) {
      coords.y = (coords.y - seriesMin) / (seriesMax - seriesMin) * 100.0;
    }

    float minTime = timeBound.x;
    float maxTime = timeBound.y;
    float minValue = valueBound.x;
    float maxValue = valueBound.y;

    float timeRange = maxTime - minTime;
    float valueRange = maxValue - minValue;

    float xp = (coords.x - minTime) / timeRange;
    float yp = (coords.y - minValue) / valueRange;
    return vec2(xp * screen.x, yp * screen.y);
  }
`;
function v_(n) {
  const i = [
    [0, 1, -1],
    [0, 1, 1],
    [1, 0, -1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 0, -1]
  ];
  return n({
    vert: `
      ${tr}

      uniform float PI;
      uniform float width;

      attribute vec3 position;
      attribute float time_a;
      attribute float value_a;
      attribute float time_b;
      attribute float value_b;

      ${nr}

      vec2 rotate2D(vec2 vector, float rotationAngle) {
        float sine = sin(rotationAngle);
        float cosine = cos(rotationAngle);
        
        return vec2(
          cosine * vector.x - 
          sine * vector.y, 
          sine * vector.x + 
          cosine * vector.y
        );
      }

      void main() {
        vec2 a = worldToScreenSpace(vec2(time_a, value_a));
        vec2 b = worldToScreenSpace(vec2(time_b, value_b));

        // Get vector direction of line
        vec2 a_to_b_direction = b - a;

        // Rotate 90deg to get how far out we should translate to draw traingles to form line
        vec2 a_to_b_rotated_dir = rotate2D(a_to_b_direction, PI / 2.0);

        vec2 nrd = normalize(a_to_b_rotated_dir) * width / 2.0;

        vec2 pos = vec2(0.0);
        pos = pos + (a * vec2(position.x));
        pos = pos + (b * vec2(position.y));
        pos = pos + (nrd * vec2(position.z));

        gl_Position = projection * vec4(pos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;
  
      uniform vec4 color;
      
      void main() {
        gl_FragColor = color;
      }`,
    attributes: {
      position: n.buffer(i),
      time_a: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      value_a: {
        buffer: n.prop("values"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      time_b: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 1,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      value_b: {
        buffer: n.prop("values"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 1,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      }
    },
    uniforms: {
      ...Pr(n),
      PI: 3.141592653589793,
      width: n.prop("width"),
      color: n.prop("color")
    },
    count: i.length,
    instances: n.prop("segments")
  });
}
function w_(n) {
  const i = [
    //[h, l, w]
    [1, 0, -1],
    [1, 0, 1],
    [0, 1, -1],
    [0, 1, -1],
    [1, 0, 1],
    [0, 1, 1]
  ];
  return n({
    vert: `
      ${tr}
    
      uniform vec4 upColor;
      uniform vec4 downColor;

      attribute vec3 position;
      attribute float time;
      attribute float high;
      attribute float low;
      attribute float open;
      attribute float close;

      varying vec4 color;
      
      ${nr}

      void main() {
        vec2 h = worldToScreenSpace(vec2(time, high));
        vec2 l = worldToScreenSpace(vec2(time, low));

        // Calculate candle width
        float timeRange = timeBound.y - timeBound.x;
        float w = 0.5;

        // Adjust position
        vec2 pos = vec2(0.0);
        pos = pos + (h * vec2(position.x));
        pos = pos + (l * vec2(position.y));
        pos.x = pos.x + (w * position.z);

        // Color based on change
        float change = close - open;
        color = vec4(0.0);
        color = color + (downColor * step(0.0, -change));
        color = color + (upColor * step(0.0, change));

        gl_Position = projection * vec4(pos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }
    `,
    attributes: {
      position: {
        buffer: n.buffer(i),
        divisor: 0
      },
      time: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      open: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      },
      high: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 1,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      },
      low: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      },
      close: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 3,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      }
    },
    uniforms: {
      upColor: n.prop("upColor"),
      downColor: n.prop("downColor"),
      timeframe: n.prop("timeframe"),
      scaleType: n.prop("scaleType"),
      seriesMin: n.prop("seriesMin"),
      seriesMax: n.prop("seriesMax"),
      seriesFirst: n.prop("seriesFirst"),
      timeBound: n.prop("timeBound"),
      valueBound: n.prop("valueBound"),
      screen: n.prop("screen"),
      projection: n.prop("projection")
    },
    count: i.length,
    instances: n.prop("segments")
  });
}
function __(n) {
  const i = [
    //[o, c, w]
    [1, 0, -1],
    [1, 0, 1],
    [0, 1, -1],
    [0, 1, -1],
    [1, 0, 1],
    [0, 1, 1]
  ];
  return n({
    vert: `
      ${tr}

      uniform vec4 upColor;
      uniform vec4 downColor;

      attribute vec3 position;
      attribute float time;
      attribute float open;
      attribute float close;

      varying vec4 color;
      
      ${nr}

      void main() {
        vec2 o = worldToScreenSpace(vec2(time, open));
        vec2 c = worldToScreenSpace(vec2(time, close));

        // Calculate candle width
        float timeRange = timeBound.y - timeBound.x;
        float w = max(screen.x / timeRange / 2.0 * 0.9, 1.0);

        // Adjust position
        vec2 pos = vec2(0.0);
        pos = pos + (o * vec2(position.x));
        pos = pos + (c * vec2(position.y));
        pos.x = pos.x + (w * position.z);

        // Color based on change
        float change = close - open;
        color = vec4(0.0);
        color = color + (downColor * step(0.0, -change));
        color = color + (upColor * step(0.0, change));

        gl_Position = projection * vec4(pos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }
    `,
    attributes: {
      position: {
        buffer: n.buffer(i),
        divisor: 0
      },
      time: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      open: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      },
      close: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 3,
        stride: Float32Array.BYTES_PER_ELEMENT * 4
      }
    },
    uniforms: {
      ...Pr(n),
      upColor: n.prop("upColor"),
      downColor: n.prop("downColor")
    },
    count: i.length,
    instances: n.prop("segments")
  });
}
function b_(n) {
  const i = [
    // setup up, width
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ];
  return n({
    vert: `
      ${tr}

      uniform vec4 buyColor;
      uniform vec4 sellColor;
      uniform float tickSize;

      attribute vec2 segment;
      attribute float time;
      attribute float price;
      attribute float volume;
      attribute float maxVolume;

      varying vec4 color;

      ${nr}

      void main() {
        vec2 pos = vec2(time, price);
        pos.x += (volume / maxVolume) * segment.x * 0.5 * 0.9;
        pos.y += tickSize * segment.y;

        vec2 pos2 = worldToScreenSpace(pos);

        if (volume >= 0.0) {
          color = buyColor;
        } else {
          color = sellColor;
        }

        gl_Position = projection * vec4(pos2, 0.0, 1.0);
      }`,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }`,
    attributes: {
      segment: {
        buffer: n.buffer(i),
        divisor: 0
      },
      time: {
        buffer: n.prop("times"),
        divisor: 2,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      price: {
        buffer: n.prop("prices"),
        divisor: 2,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      maxVolume: {
        buffer: n.prop("maxVolumes"),
        divisor: 2,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      volume: {
        buffer: n.prop("volumes"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      }
    },
    uniforms: {
      ...Pr(n),
      buyColor: n.prop("buyColor"),
      sellColor: n.prop("sellColor"),
      tickSize: n.prop("tickSize")
    },
    count: i.length,
    instances: n.prop("segments")
  });
}
function x_(n) {
  const i = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ];
  return n({
    vert: `
      precision highp float;

      uniform mat4 projection;
      uniform vec2 timeBound;
      uniform vec2 screen;
      uniform float maxVolume;
      uniform float volumeHeight;

      uniform vec4 upColor;
      uniform vec4 downColor;

      attribute vec2 segment;
      attribute float time;
      attribute float volume;
      attribute float open;
      attribute float close;

      varying vec4 color;

      void main() {
        float timeRange = timeBound.y - timeBound.x;

        float barWidth = max(screen.x / timeRange / 2.0 * 0.9, 1.0);
        float xPos = (time - timeBound.x) / timeRange * screen.x + (segment.x - 0.5) * barWidth * 2.0;
        float yPos = segment.y * (volume / maxVolume) * volumeHeight;

        float change = close - open;
        color = vec4(0.0);
        color = color + (downColor * step(0.0, -change));
        color = color + (upColor * step(0.0, change));

        gl_Position = projection * vec4(xPos, yPos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }
    `,
    attributes: {
      segment: {
        buffer: n.buffer(i),
        divisor: 0
      },
      time: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      volume: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      },
      open: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 1,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      },
      close: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      }
    },
    uniforms: {
      projection: n.prop("projection"),
      timeBound: n.prop("timeBound"),
      screen: n.prop("screen"),
      maxVolume: n.prop("maxVolume"),
      volumeHeight: n.prop("volumeHeight"),
      upColor: n.prop("upColor"),
      downColor: n.prop("downColor")
    },
    count: i.length,
    instances: n.prop("segments"),
    blend: {
      enable: !0,
      func: {
        srcRGB: "src alpha",
        srcAlpha: 1,
        dstRGB: "one minus src alpha",
        dstAlpha: 1
      },
      equation: {
        rgb: "add",
        alpha: "add"
      },
      color: [0, 0, 0, 0]
    }
  });
}
function y_(n) {
  const i = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ];
  return n({
    vert: `
      ${tr}

      uniform vec4 upColor;
      uniform vec4 downColor;

      attribute vec2 segment;
      attribute float time;
      attribute float volume;
      attribute float open;
      attribute float close;

      varying vec4 color;

      ${nr}

      void main() {
        float timeRange = timeBound.y - timeBound.x;

        float barWidth = max(screen.x / timeRange / 2.0 * 0.9, 1.0);

        vec2 bottom = worldToScreenSpace(vec2(time, 0));
        vec2 top = worldToScreenSpace(vec2(time, volume));

        float xPos = bottom.x + (segment.x - 0.5) * barWidth * 2.0;
        float yPos = mix(bottom.y, top.y, segment.y);

        float change = close - open;
        color = vec4(0.0);
        color = color + (downColor * step(0.0, -change));
        color = color + (upColor * step(0.0, change));

        gl_Position = projection * vec4(xPos, yPos, 0.0, 1.0);
      }
    `,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }
    `,
    attributes: {
      segment: {
        buffer: n.buffer(i),
        divisor: 0
      },
      time: {
        buffer: n.prop("times"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      volume: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      },
      open: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 1,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      },
      close: {
        buffer: n.prop("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
        stride: Float32Array.BYTES_PER_ELEMENT * 3
      }
    },
    uniforms: {
      ...Pr(n),
      upColor: n.prop("upColor"),
      downColor: n.prop("downColor")
    },
    count: i.length,
    instances: n.prop("segments"),
    blend: {
      enable: !0,
      func: {
        srcRGB: "src alpha",
        srcAlpha: 1,
        dstRGB: "one minus src alpha",
        dstAlpha: 1
      },
      equation: {
        rgb: "add",
        alpha: "add"
      },
      color: [0, 0, 0, 0]
    }
  });
}
function E_(n) {
  const i = [
    // width, step up
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ];
  return n({
    vert: `
      ${tr}

      uniform vec4 bidsColor;
      uniform vec4 asksColor;
      uniform float maxVolume;
      uniform float stepSize;

      attribute vec2 segment;
      attribute float price;
      attribute float volume;
      
      varying vec4 color;

      ${nr}

      void main() {
        float wp = abs(volume) / maxVolume;
        float timeRange = timeBound.y - timeBound.x;

        vec2 p = vec2(0.0);
        p.x = timeBound.y - (timeRange * 0.25 * wp * segment.x);
        p.y = price + (stepSize * segment.y);
        
        // Adjust price position
        p.y += step(0.0, stepSize -0.5) * 0.25;

        vec2 pos = worldToScreenSpace(p);

        // Color based on is bid or ask
        color = vec4(0.0);
        color += (bidsColor * step(0.0, volume));
        color += (asksColor * step(0.0, -volume));

        gl_Position = projection * vec4(pos, 0.0, 1.0);
      }`,
    frag: `
      precision highp float;

      varying vec4 color;

      void main() {
        gl_FragColor = color;
      }`,
    attributes: {
      segment: {
        buffer: n.buffer(i),
        divisor: 0
      },
      price: {
        buffer: n.prop("prices"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      },
      volume: {
        buffer: n.prop("volumes"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 1
      }
    },
    uniforms: {
      ...Pr(n),
      bidsColor: n.prop("bidsColor"),
      asksColor: n.prop("asksColor"),
      maxVolume: n.prop("maxVolume"),
      stepSize: n.prop("stepSize")
    },
    count: i.length,
    instances: n.prop("segments"),
    blend: {
      enable: !0,
      func: {
        srcRGB: "src alpha",
        srcAlpha: 1,
        dstRGB: "one minus src alpha",
        dstAlpha: 1
      },
      equation: {
        rgb: "add",
        alpha: "add"
      },
      color: [0, 0, 0, 0]
    }
  });
}
var au = typeof Float32Array < "u" ? Float32Array : Array;
function lu() {
  var n = new au(16);
  return au != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function S_(n, i, r, o, l, a, c) {
  var h = 1 / (i - r), p = 1 / (o - l), d = 1 / (a - c);
  return n[0] = -2 * h, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * p, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * d, n[11] = 0, n[12] = (i + r) * h, n[13] = (l + o) * p, n[14] = (c + a) * d, n[15] = 1, n;
}
var uu = S_;
class T_ {
  constructor(i, r) {
    S(this, "chart");
    S(this, "engine");
    S(this, "canvas");
    S(this, "programs");
    // Reusable buffers for grid lines
    S(this, "gridBuffers");
    S(this, "tick");
    S(this, "lastFrameTime", -1);
    // Performance tracking
    S(this, "frameTimeHistory", []);
    S(this, "lastFpsUpdate", 0);
    S(this, "frameCount", 0);
    if (this.chart = i, this.engine = i.stores.engine, this.canvas = r, !this.engine.regl)
      throw new Error("Regl instance not found");
    this.programs = {
      gridLine: m_(this.engine.regl),
      line: v_(this.engine.regl),
      candleBody: __(this.engine.regl),
      candleStick: w_(this.engine.regl),
      footprint: b_(this.engine.regl),
      activeVolumeProfile: E_(this.engine.regl),
      absoluteVolume: x_(this.engine.regl),
      traditionalVolume: y_(this.engine.regl)
    }, this.gridBuffers = {
      horizontal: this.engine.regl.buffer({
        type: "float32",
        usage: "dynamic",
        length: 100 * 4
        // Initial size for 100 lines
      }),
      vertical: this.engine.regl.buffer({
        type: "float32",
        usage: "dynamic",
        length: 100 * 4
      })
    }, this.tick = this.engine.regl.frame(this.draw.bind(this));
  }
  draw() {
    const i = performance.now(), r = this.chart.startTime.value, o = this.chart.endTime.value, l = this.chart.timeframe.value, a = this.chart.scaleType.value, c = this.chart.stores.dimensions.resolution.value;
    this.canvas.width = c.width, this.canvas.height = c.height;
    const h = performance.now();
    this.lastFrameTime === -1 && (this.lastFrameTime = h);
    const p = h - this.lastFrameTime;
    this.lastFrameTime = h;
    let d = 0, v = 0, w = 0;
    if (!this.engine.regl || r === 1 / 0 || o === 1 / 0)
      return;
    const b = (r - this.engine.minTime) / l, P = (o - this.engine.minTime) / l;
    if (this.engine.regl.clear({
      color: [
        this.chart.theme.background[0],
        this.chart.theme.background[1],
        this.chart.theme.background[2],
        this.chart.theme.background[3]
      ],
      depth: 1,
      stencil: 0
    }), Math.abs(b) === 1 / 0 || Math.abs(P) === 1 / 0 || this.chart.screens[0].minValue === 1 / 0 || this.chart.screens[0].maxValue === -1 / 0)
      return;
    const F = this.engine.regl._gl;
    F.enable(F.SCISSOR_TEST);
    for (const R of this.chart.screens) {
      const C = this.chart.stores.dimensions.main.screens[R.id], { bottom: B, height: z, width: $ } = C.resolution;
      F.scissor(0, B, $, z), F.viewport(0, B, $, z);
      const H = uu(lu(), 0, $, 0, z, 0, -1), Z = this.chart.stores.scales.value[R.id];
      this.drawGrid(H, Z, { width: $, height: z });
    }
    for (const R in this.chart.series) {
      const C = this.chart.series[R];
      if (!C.visible || "activeBatches" in C && !C.activeBatches.length)
        continue;
      w++;
      const B = this.chart.screens[C._screen], z = this.chart.stores.dimensions.main.screens[B.id], { bottom: $, height: H, width: Z } = z.resolution;
      F.scissor(0, $, Z, H), F.viewport(0, $, Z, H);
      const ce = uu(lu(), 0, Z, 0, H, 0, -1), he = {
        timeBound: [b, P],
        valueBound: [B.minValue, B.maxValue],
        screen: [Z, H],
        projection: ce,
        scaleType: a,
        seriesMin: C._visibleMin,
        seriesMax: C._visibleMax,
        seriesFirst: C._visibleFirst
      };
      switch (C.type) {
        case "Line":
          for (const ee of C.activeBatches)
            this.programs.line({
              times: ee._times,
              values: ee._values,
              color: C.color,
              width: C.lineWidth * window.devicePixelRatio,
              ...he,
              segments: ee.times.length - 1
            }), d++, v += ee.times.length;
          C.latestValueLine && (this.programs.line({
            times: [b, P],
            values: [C._latestValue, C._latestValue],
            color: C.color,
            width: 1,
            ...he,
            segments: 1
          }), d++);
          break;
        case "Candlestick":
          for (const ee of C.activeBatches)
            this.programs.candleStick({
              ...he,
              times: ee._times,
              points: ee._values,
              upColor: C.upColor,
              downColor: C.downColor,
              segments: ee.times.length
            }), d++, this.programs.candleBody({
              ...he,
              times: ee._times,
              points: ee._values,
              upColor: C.upColor,
              downColor: C.downColor,
              segments: ee.times.length
            }), d++, v += ee.times.length;
          C.latestValueLine && (this.programs.line({
            times: [b, P],
            values: [C._latestValue, C._latestValue],
            color: C._valueColor,
            width: 1,
            ...he,
            segments: 1
          }), d++);
          break;
        case "Volume":
          for (const ee of C.activeBatches)
            Object.values(this.chart.series).filter(
              (Ke) => Ke.visible && Ke._screen === B.id
            ).length === 1 ? this.programs.traditionalVolume({
              times: ee._times,
              points: ee._values,
              maxVolume: C._maxVolume,
              upColor: C.upColor,
              downColor: C.downColor,
              ...he,
              segments: ee.times.length
            }) : this.programs.absoluteVolume({
              times: ee._times,
              points: ee._values,
              maxVolume: C._maxVolume,
              volumeHeight: C.getHeightPixels(c.height),
              upColor: C.upColor,
              downColor: C.downColor,
              ...he,
              segments: ee.times.length
            }), d++, v += ee.times.length;
          break;
        case "Footprint":
          for (const ee of C.activeBatches)
            ee.times.length !== 0 && (this.programs.footprint({
              ...he,
              times: ee._times,
              prices: ee._values,
              volumes: ee._volumes,
              maxVolumes: ee._maxVolumes,
              tickSize: C.tickSize,
              buyColor: C.buyColor,
              sellColor: C.sellColor,
              segments: ee.times.length * 2
            }), d++, v += ee.times.length);
          C.latestValueLine && (this.programs.line({
            times: [b, P],
            values: [C._latestValue, C._latestValue],
            color: C._valueColor,
            width: 1,
            ...he,
            segments: 1
          }), d++);
          break;
      }
      if (this.chart.stores.crosshair.visible.value) {
        const { time: ee, value: Ue } = this.chart.stores.crosshair, Ke = this.engine.getAdjustedTime(ee.time, l);
        this.programs.line({
          times: [b, P],
          values: [Ue.value, Ue.value],
          color: this.chart.theme.crosshair,
          width: 1,
          ...he,
          // Override scale type to 0 (normal) for anything thats already adjusted for visible range on CPU
          scaleType: 0,
          segments: 1
        }), this.programs.line({
          times: [Ke, Ke],
          values: [B.minValue, B.maxValue],
          color: this.chart.theme.crosshair,
          width: 1,
          ...he,
          // Override scale type to 0 (normal) for anything thats already adjusted for visible range on CPU
          scaleType: 0,
          segments: 1
        });
      }
    }
    if (this.chart.settings.autoscroll && this.chart.setScreenRange({
      startTime: r + p,
      endTime: o + p
    }), this.chart.debug.value) {
      const R = performance.now(), C = R - i;
      if (this.frameTimeHistory.push(C), this.frameTimeHistory.length > 60 && this.frameTimeHistory.shift(), this.frameCount++, R - this.lastFpsUpdate >= 500) {
        const z = (R - this.lastFpsUpdate) / 1e3;
        this.chart.performanceMetrics.fps = Math.round(
          this.frameCount / z
        ), this.frameCount = 0, this.lastFpsUpdate = R;
      }
      const B = this.chart.performanceMetrics;
      B.frameTime = Math.round(C * 100) / 100, B.avgFrameTime = Math.round(
        this.frameTimeHistory.reduce((z, $) => z + $, 0) / this.frameTimeHistory.length * 100
      ) / 100, B.minFrameTime = Math.round(Math.min(...this.frameTimeHistory) * 100) / 100, B.maxFrameTime = Math.round(Math.max(...this.frameTimeHistory) * 100) / 100, B.drawCalls = d, B.visibleSeries = w, B.dataPoints = v;
    }
    F.disable(F.SCISSOR_TEST);
  }
  drawGrid(i, r, o) {
    const { time: l } = this.chart.stores.scales, a = window.devicePixelRatio;
    if (r.length > 0) {
      const c = r.map(
        (h) => (o.height / a - h.y) * a
      );
      this.gridBuffers.horizontal(c), this.programs.gridLine({
        positions: this.gridBuffers.horizontal,
        projection: i,
        screen: [o.width, o.height],
        color: this.chart.theme.gridLine,
        width: 1,
        isHorizontal: 1,
        count: c.length
      });
    }
    if (l.value.length > 0) {
      const c = l.value.map((h) => h.x * a);
      this.gridBuffers.vertical(c), this.programs.gridLine({
        positions: this.gridBuffers.vertical,
        projection: i,
        screen: [o.width, o.height],
        color: this.chart.theme.gridLine,
        width: 1,
        isHorizontal: 0,
        count: c.length
      });
    }
  }
  destroy() {
    this.gridBuffers.horizontal.destroy(), this.gridBuffers.vertical.destroy(), this.tick.cancel();
  }
}
function M_(n, i) {
  return k(), I("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    T("path", {
      "fill-rule": "evenodd",
      d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const C_ = An({
  components: {
    XMarkIcon: hu
  },
  props: {
    order: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const n = xe("chart");
    return {
      chart: n,
      canvasContainer: n.stores.dimensions.canvasContainerEl.value
    };
  },
  data: () => ({
    nextPrice: 0,
    isDragging: !1,
    isAPIMoving: !1
  }),
  computed: {
    top() {
      let n = this.order.price;
      return (this.isDragging || this.isAPIMoving) && (n = this.nextPrice), this.chart.getYCoordByValue(0, n);
    },
    disabled() {
      return this.isAPIMoving || this.order.isCancelling;
    }
  },
  methods: {
    glRGBAToCSSRGBA: rv,
    toSigZeroNotation: fu,
    onMouseDown() {
      this.disabled || this.chart.onMoveOrder && (this.isDragging = !0, this.nextPrice = this.order.price, this.canvasContainer.addEventListener("mousemove", this.onMouseMove), this.canvasContainer.addEventListener("mouseout", this.onMouseOut), this.canvasContainer.addEventListener("mouseup", this.onMouseUp));
    },
    onMouseMove(n) {
      if (!this.isDragging)
        return;
      const { layerY: i } = n;
      this.nextPrice = this.chart.getValueByYCoord(0, i);
    },
    onMouseOut(n) {
      n.target === this.canvasContainer && this.reset();
    },
    async onMouseUp() {
      this.isDragging && this.chart.onMoveOrder && (this.reset(), this.isAPIMoving = !0, await this.chart.onMoveOrder(this.order.id, this.nextPrice), this.isAPIMoving = !1);
    },
    reset() {
      this.isDragging = !1, this.canvasContainer.removeEventListener("mousemove", this.onMouseMove), this.canvasContainer.removeEventListener("mouseout", this.onMouseOut), this.canvasContainer.removeEventListener("mouseup", this.onMouseUp);
    }
  },
  watch: {
    isDragging(n) {
      this.chart.stores.crosshair.isMovingObject = n;
    }
  }
}), P_ = `.viper-order__components>*{padding:0 .25rem}
`, A_ = { class: "w-max" };
function R_(n, i, r, o, l, a) {
  const c = wt("XMarkIcon");
  return k(), I(oe, null, [
    T("div", {
      class: Re(["viper-order absolute left-0 z-[1] w-full select-none pointer-events-none h-[1px] border border-dashed", {
        "border-up-900": n.order.side === "BID",
        "border-down-900": n.order.side === "ASK",
        "opacity-50": n.disabled
      }]),
      style: se({
        transform: `translateY(${n.top}px)`
      })
    }, null, 6),
    T("div", {
      onMousedown: i[1] || (i[1] = (...h) => n.onMouseDown && n.onMouseDown(...h)),
      class: Re(["viper-order__components right-0 absolute flex items-center pointer-events-auto h-[1rem] bg-gray-900 border border-solid text-xxs z-[2] select-none", {
        "border-up-900 text-up-50": n.order.side === "BID",
        "border-down-900 text-down-50": n.order.side === "ASK",
        "cursor-pointer": !n.disabled && n.chart.onMoveOrder,
        "cursor-not-allowed opacity-50": n.disabled
      }]),
      style: se({
        transform: `translate(-2rem, calc(${n.top}px - 0.5rem))`
      })
    }, [
      T("div", A_, [
        n.order.label ? (k(), I(oe, { key: 0 }, [
          Dt(q(n.order.label), 1)
        ], 64)) : (k(), I(oe, { key: 1 }, [
          Dt(q(n.order.side), 1)
        ], 64))
      ]),
      T("div", {
        class: Re(["text-white", {
          "bg-up-900": n.order.side === "BID",
          "bg-down-900": n.order.side === "ASK"
        }])
      }, q(n.toSigZeroNotation(n.order.price)), 3),
      T("div", null, q(n.order.qty), 1),
      n.chart.onCancelOrder ? (k(), I("button", {
        key: 0,
        onClick: i[0] || (i[0] = (h) => n.chart.onCancelOrder(n.order.id)),
        class: Re(["h-full text-white", {
          "bg-up-900": n.order.side === "BID",
          "bg-down-900": n.order.side === "ASK"
        }])
      }, [
        At(c, { class: "h-full aspect-square" })
      ], 2)) : de("", !0)
    ], 38)
  ], 64);
}
const k_ = /* @__PURE__ */ ze(C_, [["render", R_], ["styles", [P_]]]), B_ = An({
  setup() {
    const n = xe("chart"), i = ro(() => n.performanceMetrics), r = ro(() => {
      const l = i.value.fps;
      return l >= 55 ? "#00ff88" : l >= 30 ? "#ffcc00" : "#ff4444";
    });
    return {
      chart: n,
      metrics: i,
      fpsColor: r,
      formatNumber: (l) => l >= 1e6 ? (l / 1e6).toFixed(1) + "M" : l >= 1e3 ? (l / 1e3).toFixed(1) + "K" : l.toString(),
      devicePixelRatio: window.devicePixelRatio,
      rgbaToCSS: Ar
    };
  }
}), I_ = `@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}
`, L_ = { class: "flex items-center gap-2 mb-4" }, N_ = { class: "grid grid-cols-4 gap-2" }, O_ = { class: "flex flex-col col-span-1" }, D_ = { class: "flex flex-col col-span-1" }, F_ = { class: "flex flex-col col-span-1" }, $_ = { class: "flex flex-col col-span-1" }, z_ = { class: "flex flex-col col-span-1" }, U_ = { class: "flex flex-col col-span-1" }, V_ = { class: "flex flex-col col-span-1" }, H_ = { class: "flex flex-col col-span-1" }, W_ = { class: "flex flex-col col-span-1" };
function q_(n, i, r, o, l, a) {
  return n.chart.debug.value ? (k(), I("div", {
    key: 0,
    class: "absolute top-2 right-2 text-xs p-3 rounded-lg pointer-events-none select-none z-50",
    style: se({
      background: n.rgbaToCSS(n.chart.theme.foreground),
      color: n.rgbaToCSS(n.chart.theme.textColor),
      minWidth: "180px"
    })
  }, [
    T("div", L_, [
      T("div", {
        class: "w-2 h-2 rounded-full animate-pulse",
        style: se({ background: n.fpsColor })
      }, null, 4),
      i[0] || (i[0] = T("span", { class: "font-bold text-sm" }, "Performance", -1))
    ]),
    T("div", N_, [
      T("div", O_, [
        i[1] || (i[1] = T("span", { class: "text-gray-400 text-[10px]" }, "FPS", -1)),
        T("span", {
          style: se({ color: n.fpsColor })
        }, q(n.metrics.fps), 5)
      ]),
      T("div", D_, [
        i[3] || (i[3] = T("span", { class: "text-gray-400 text-[10px]" }, "Frame time", -1)),
        T("span", null, [
          Dt(q(n.metrics.frameTime) + " ", 1),
          i[2] || (i[2] = T("span", { class: "text-xs" }, "ms", -1))
        ])
      ]),
      T("div", F_, [
        i[5] || (i[5] = T("span", { class: "text-gray-400 text-[10px]" }, "Avg frame time", -1)),
        T("span", null, [
          Dt(q(n.metrics.avgFrameTime) + " ", 1),
          i[4] || (i[4] = T("span", { class: "text-xs" }, "ms", -1))
        ])
      ]),
      T("div", $_, [
        i[7] || (i[7] = T("span", { class: "text-gray-400 text-[10px]" }, "Min/Max", -1)),
        T("span", null, [
          Dt(q(n.metrics.minFrameTime) + "/" + q(n.metrics.maxFrameTime) + " ", 1),
          i[6] || (i[6] = T("span", { class: "text-xs" }, "ms", -1))
        ])
      ]),
      T("div", z_, [
        i[8] || (i[8] = T("span", { class: "text-gray-400 text-[10px]" }, "Draw Calls", -1)),
        T("span", null, q(n.metrics.drawCalls), 1)
      ]),
      T("div", U_, [
        i[9] || (i[9] = T("span", { class: "text-gray-400 text-[10px]" }, "Series", -1)),
        T("span", null, q(n.metrics.visibleSeries), 1)
      ]),
      T("div", V_, [
        i[10] || (i[10] = T("span", { class: "text-gray-400 text-[10px]" }, "Points", -1)),
        T("span", null, q(n.formatNumber(n.metrics.dataPoints)), 1)
      ]),
      T("div", H_, [
        i[11] || (i[11] = T("span", { class: "text-gray-400 text-[10px]" }, "Resolution", -1)),
        T("span", null, q(n.chart.stores.dimensions.resolution.value.width) + "x" + q(n.chart.stores.dimensions.resolution.value.height), 1)
      ]),
      T("div", W_, [
        i[12] || (i[12] = T("span", { class: "text-gray-400 text-[10px]" }, "DPR", -1)),
        T("span", null, q(n.devicePixelRatio), 1)
      ])
    ])
  ], 4)) : de("", !0);
}
const Y_ = /* @__PURE__ */ ze(B_, [["render", q_], ["styles", [I_]]]);
class G_ {
  constructor(i, r, o) {
    S(this, "chart");
    S(this, "canvas");
    S(this, "ctx");
    this.chart = i, this.canvas = r, this.ctx = o;
  }
  /**
   * Draw a box with raw x & y coordinate values
   * @param color RGBA [0-1] color value
   * @param coords [x, y, w, h] coords
   */
  drawBox(i, r) {
    this.ctx.fillStyle = Qn(i), this.ctx.fillRect(
      r[0],
      r[1],
      Kl(r[2], 1),
      Kl(r[3], 1)
    );
  }
  /**
   * Draw text at raw x & y coordinate pair
   * @param color RGBA [0-1] color value
   * @param coords [x left, y bottom] coords (x & y = center of text box)
   */
  drawText(i, r, o, l) {
    if (this.ctx.textAlign = (l == null ? void 0 : l.textAlign) || "center", this.ctx.font = (l == null ? void 0 : l.font) || "10px Arial", this.ctx.fillStyle = Qn(i), l != null && l.stroke) {
      this.ctx.strokeText(o, r[0], r[1]);
      return;
    }
    this.ctx.fillText(o, r[0], r[1]);
  }
  /**
   *
   * @param screen Screen Id (0 if only one screen)
   * @param color RGBA [0-1] color value
   * @param coords [time, value1, value2]
   * @param width (0.0 - 1.0) - % of element (time) to cover (0.5 = 50%)
   */
  drawBoxByPriceAndPercWidthOfTime(i, r, o, l) {
    const a = this.chart.pixelsPerElement.value * l, c = this.chart.getXCoordByTimestamp(o[0]), h = this.chart.getYCoordByValue(i, o[1]), d = this.chart.getYCoordByValue(i, o[2]) - h;
    d >= 0 ? this.drawBox(r, [c - a / 2, h, Math.max(a, 1), Math.max(d, 1)]) : this.drawBox(r, [c - a / 2, h, Math.max(a, 1), Math.min(d, 1)]);
  }
  /**
   * Draw a line with 2 pairs of raw [x, y] coords
   * @param color RGBA [0-1] color value
   * @param coords [x1, y1, x2, y2] coords
   * @param linewidth Line width in px (default 1)
   */
  drawLine(i, r, o = 1) {
    this.ctx.strokeStyle = Qn(i), this.ctx.lineWidth = o, this.ctx.beginPath(), this.ctx.moveTo(Math.floor(r[0]), Math.floor(r[1])), this.ctx.lineTo(Math.floor(r[2]), Math.floor(r[3])), this.ctx.stroke(), this.ctx.closePath();
  }
  /**
   * Draw a complex infinite point polygon
   * @param color RGBA [0-1] color value
   * @param coords [x1, y1, x2, y2, ...] coords
   */
  drawPolygon(i, r) {
    this.ctx.beginPath(), this.ctx.fillStyle = Qn(i), this.ctx.moveTo(r[0], r[1]);
    for (let o = 2; o < r.length; o += 2)
      this.ctx.lineTo(r[o], r[o + 1]);
    this.ctx.fill(), this.ctx.closePath();
  }
  /**
   * Draw a line with a time & price coordinate pair
   * @param screen Screen Id (0 if only one screen)
   * @param color RGBA [0-1] color value
   * @param coords [x1, y1, x2, y2] coords
   */
  drawLineByPriceAndTime(i, r, o) {
    this.ctx.strokeStyle = Qn(r), this.ctx.beginPath();
    const l = this.chart.getXCoordByTimestamp(o[0]), a = this.chart.getYCoordByValue(i, o[1]);
    this.ctx.moveTo(l, a);
    const c = this.chart.getXCoordByTimestamp(o[2]), h = this.chart.getYCoordByValue(i, o[3]);
    this.ctx.lineTo(c, h), this.ctx.stroke(), this.ctx.closePath();
  }
  /**
   * Draw text at a time & price coordinate pair
   * @param color RGBA [0-1] color value
   * @param coords [x left, y bottom] coords (x & y = center of text box)
   */
  drawTextAtPriceAndTime(i, r, o) {
    this.ctx.textAlign = "center", this.ctx.fillStyle = Qn(i);
    const l = this.chart.getXCoordByTimestamp(r[0]);
    this.ctx.fillText(o, l, r[1]);
  }
}
class Q_ {
  constructor(i, r) {
    S(this, "chart");
    S(this, "engine");
    S(this, "canvas");
    S(this, "lastFrameTime", -1);
    S(this, "frameRequest", -1);
    this.chart = i, this.engine = i.stores.engine;
    const o = r.getContext("2d");
    if (!o)
      throw new Error("No 2D CPU canvas context found");
    this.canvas = new G_(this.chart, r, o), requestAnimationFrame(this.recursiveDraw.bind(this));
  }
  recursiveDraw() {
    this.draw(), this.frameRequest = requestAnimationFrame(this.recursiveDraw.bind(this));
  }
  draw() {
    const i = this.chart.stores.dimensions.resolution.value, r = this.chart.stores.dimensions.main, o = this.chart.pixelsPerElement.value;
    this.canvas.ctx.clearRect(0, 0, i.width, i.height);
    for (const l of this.chart.screens) {
      const { height: a, width: c } = r.screens[l.id].resolution, h = Object.values(this.chart.series).filter(
        (w) => w._screen === l.id
      ), p = (w) => this.chart.stores.engine.fromAdjustedTime(
        w,
        this.chart.timeframe.value
      ), d = (w) => co(
        this.chart.startTime.value,
        this.chart.endTime.value,
        c,
        w
      ), v = (w) => Zn(l.minValue, l.maxValue, a, w);
      for (const w of h)
        switch (w.type) {
          case "Footprint":
            if (!w.activeBatches.length || !w.activeBatches[0].times.length)
              break;
            const b = [1, 1, 1, 1], P = v(0) - v(w.tickSize);
            if (o >= 50 && P >= 16) {
              const F = Math.min(P * 0.5, 48), R = `${F}px Arial`, C = Math.max(
                0,
                -Math.floor(Math.log10(w.qtySize))
              );
              for (const B of w.activeBatches)
                for (let z = 0; z < B.times.length; z++) {
                  const $ = p(B.times[z]), H = B.values[z];
                  B.maxVolumes[z];
                  for (const Z of [
                    B.volumes[z * 2],
                    B.volumes[z * 2 + 1]
                  ]) {
                    if (Z === 0)
                      continue;
                    Z >= 0 ? w.buyColor : w.sellColor;
                    const ce = d($), he = v(H), ee = he - P, Ue = Z.toFixed(C), Ke = Math.ceil(
                      this.canvas.ctx.measureText(Ue).width
                    ), qe = ce + (Z >= 0 ? Ke / 2 + 4 : -(Ke / 2 + 4)), tn = (he + ee) / 2 + F / 2;
                    this.canvas.drawText(b, [qe, tn], Ue, {
                      font: R
                    });
                  }
                }
            }
            break;
        }
    }
  }
  destroy() {
    cancelAnimationFrame(this.frameRequest);
  }
}
const K_ = An({
  components: {
    Order: k_,
    VDebugOverlay: Y_,
    PlusCircleIcon: M_
  },
  setup() {
    return {
      chart: xe("chart"),
      CPURenderingEngine: null,
      GPURenderingEngine: null,
      rgbaToCSS: Ar,
      selectedScreen: void 0
    };
  },
  data: () => ({
    change: {
      x: 0,
      y: 0
    }
  }),
  async mounted() {
    const { engine: n, dimensions: i } = this.chart.stores, r = (await import("./regl-97dbaffa.js").then((o) => o.r)).default;
    n.setRegl(
      r({
        canvas: this.$refs.GPU_Canvas,
        attributes: {
          antialias: !0,
          stencil: !1,
          depth: !1
        },
        extensions: ["ANGLE_instanced_arrays"]
      })
    ), i.canvasEl.value = this.$refs.GPU_Canvas, i.canvasContainerEl.value = this.$refs.canvasContainer, this.CPURenderingEngine = new Q_(
      this.chart,
      this.$refs.CPU_Canvas
    ), this.GPURenderingEngine = new T_(
      this.chart,
      this.$refs.GPU_Canvas
    );
  },
  unmounted() {
    var n, i;
    window.removeEventListener("mousemove", this.onDragToResize.bind(this)), window.removeEventListener("mouseup", this.onMouseUp.bind(this)), (n = this.CPURenderingEngine) == null || n.destroy(), (i = this.GPURenderingEngine) == null || i.destroy(), this.chart.stores.engine.destroy();
  },
  methods: {
    onWheel(n) {
      if (this.chart.settings.lockedTimeScale)
        return;
      n.preventDefault();
      const { dimensions: i, crosshair: r } = this.chart.stores;
      let { deltaX: o, deltaY: l, offsetY: a } = n;
      const c = i.main.width.value, h = r.time, p = r.value;
      if (h === void 0 || p === void 0)
        return;
      let d = this.chart.startTime.value, v = this.chart.endTime.value;
      const w = this.chart.getScreenByYCoord(a);
      let { minValue: b, maxValue: P } = w;
      const F = Math.abs(l), R = Math.abs(o);
      if (R > F) {
        const C = this.chart.pixelsPerElement.value, B = this.chart.timeframe.value, z = o, $ = (z > 0 ? z * 100 : -z * -100) * (c / C) * (B / 6e4);
        d += $, v += $, this.chart.setScreenRange({ startTime: d, endTime: v });
      } else if (F > R) {
        const C = n.ctrlKey || n.shiftKey, B = !n.shiftKey;
        if (C) {
          w.lockedYScale = !1;
          const z = 0, $ = i.main.height.value, H = this.chart.screens.indexOf(w), Z = (p.y[H] - z) / $, ce = 1 - Z, he = P - b;
          n.shiftKey && (l = -l), l < 0 ? (P -= he * Z / 10, b += he * ce / 10) : (P += he * Z / 10, b -= he * ce / 10);
        }
        if (B) {
          const z = h.x / c, $ = 1 - z, H = v - d;
          l > 0 ? (d -= H * z / 10, v += H * $ / 10) : (d += H * z / 10, v -= H * $ / 10);
        }
        this.chart.setScreenRange({
          startTime: d,
          endTime: v,
          minValue: b,
          maxValue: P
        });
      }
    },
    onMouseMove(n) {
      const i = n.currentTarget.getBoundingClientRect(), r = n.clientX - i.left, o = n.clientY - i.top;
      this.chart.stores.crosshair.mousepos = { x: r, y: o }, this.chart.stores.crosshair.setCrosshairFromPixels(r, o);
    },
    onMouseDown(n) {
      this.selectedScreen = this.chart.getScreenByYCoord(n.offsetY), window.addEventListener("mousemove", this.onDragToResize), window.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseUp() {
      window.removeEventListener("mousemove", this.onDragToResize), window.removeEventListener("mouseup", this.onMouseUp), this.selectedScreen = void 0;
    },
    onMouseLeave() {
      this.chart.stores.crosshair.mousepos = { x: -1, y: -1 }, this.chart.stores.crosshair.clearCrosshair();
    },
    onDragToResize(n) {
      if (this.chart.settings.lockedTimeScale)
        return;
      const { movementX: i, movementY: r, offsetY: o } = n, l = this.selectedScreen;
      this.change.x += i, this.change.y += r;
      let a = this.chart.startTime.value, c = this.chart.endTime.value, { minValue: h, maxValue: p } = l;
      const d = this.chart.pixelsPerElement.value, v = this.chart.timeframe.value, w = this.change.x / d, b = v * w;
      if (a -= b, c -= b, !l.lockedYScale) {
        const { height: P } = this.chart.stores.dimensions.main.screens[l.id], F = P / (p - h), R = this.change.y / F;
        h += R, p += R;
      }
      this.chart.setScreenRange({
        startTime: a,
        endTime: c,
        minValue: h,
        maxValue: p
      }), this.change = { x: 0, y: 0 };
    },
    onRequestPlaceOrder() {
      this.chart.stores.crosshair.visible.value && this.chart.onPlaceOrder && this.chart.onPlaceOrder(this.chart.stores.crosshair.value.value);
    }
  }
}), X_ = ["width", "height"], Z_ = {
  ref: "GPU_Canvas",
  class: "w-full h-full cursor-crosshair"
};
function J_(n, i, r, o, l, a) {
  const c = wt("Order"), h = wt("PlusCircleIcon"), p = wt("VDebugOverlay");
  return k(), I("div", {
    class: "relative",
    ref: "canvasContainer",
    onWheel: i[1] || (i[1] = (...d) => n.onWheel && n.onWheel(...d)),
    onMousemove: i[2] || (i[2] = (...d) => n.onMouseMove && n.onMouseMove(...d)),
    onMousedown: i[3] || (i[3] = (...d) => n.onMouseDown && n.onMouseDown(...d)),
    onMouseleave: i[4] || (i[4] = (...d) => n.onMouseLeave && n.onMouseLeave(...d)),
    style: se({
      width: `${n.chart.stores.dimensions.main.width.value}px`,
      height: `${n.chart.stores.dimensions.main.height.value}px`,
      background: n.rgbaToCSS(n.chart.theme.background)
    })
  }, [
    n.chart.stores.dimensions.canvasEl.value ? (k(!0), I(oe, { key: 0 }, ve(n.chart.orders, (d) => (k(), lo(c, { order: d }, null, 8, ["order"]))), 256)) : de("", !0),
    n.chart.stores.crosshair.visible.value && n.chart.onPlaceOrder ? (k(), I("button", {
      key: 1,
      onClick: i[0] || (i[0] = (...d) => n.onRequestPlaceOrder && n.onRequestPlaceOrder(...d)),
      class: "absolute h-4 aspect-square 0bg-zinc-90",
      style: se({
        top: `${n.chart.stores.crosshair.value.y[0]}px`,
        right: "0px",
        transform: "translateY(-50%)"
      })
    }, [
      At(h, { class: "h-full text-white" })
    ], 4)) : de("", !0),
    T("canvas", {
      ref: "CPU_Canvas",
      class: "absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none",
      width: n.chart.stores.dimensions.resolution.value.width,
      height: n.chart.stores.dimensions.resolution.value.height
    }, null, 8, X_),
    T("canvas", Z_, null, 512),
    At(p)
  ], 36);
}
const j_ = /* @__PURE__ */ ze(K_, [["render", J_]]), eb = An({
  components: {
    PlusCircleIcon: x1
  },
  props: {
    screen: {
      type: Number,
      required: !0
    }
  },
  data: () => ({
    previousTouch: null
  }),
  setup() {
    return {
      chart: xe("chart"),
      rgbaToCSS: Ar
    };
  },
  computed: {
    crosshairText() {
      if (!this.chart.stores.crosshair.visible.value)
        return "";
      const { value: n } = this.chart.stores.crosshair.value;
      return po(
        n,
        this.chart.scaleType.value,
        this.chart.valueScaleDecimalPrecision.value
      );
    },
    pos() {
      const { dimensions: n } = this.chart.stores, i = n.main.screens[this.screen];
      return {
        top: `${i.top}px`,
        left: `${n.main.width.value}px`,
        width: `${n.valueScale.width.value}px`,
        height: `${i.height}px`
      };
    }
  },
  methods: {
    onDoubleClick() {
      this.chart.settings.lockedPriceScale || (this.chart.screens[this.screen].lockedYScale = !0, this.chart.setScreenRange({
        screen: this.screen,
        startTime: this.chart.startTime.value,
        endTime: this.chart.endTime.value
      }));
    },
    onMouseDown(n) {
      this.chart.settings.lockedPriceScale || (n.stopPropagation(), n.preventDefault(), window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("touchend", this.onMouseUp), window.addEventListener("mousemove", this.onDragToResize), window.addEventListener("touchmove", this.onDragToResize));
    },
    onMouseUp() {
      this.chart.settings.lockedPriceScale || (window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("touchend", this.onMouseUp), window.removeEventListener("mousemove", this.onDragToResize), window.removeEventListener("touchmove", this.onDragToResize), this.previousTouch = null);
    },
    onDragToResize(n) {
      if (this.chart.settings.lockedPriceScale)
        return;
      n.preventDefault();
      let i = 0;
      n instanceof MouseEvent && (i = n.movementY), "touches" in n && n.touches.length && (this.previousTouch && (i = n.touches[0].clientY - this.previousTouch.clientY), this.previousTouch = n.touches[0]);
      const r = this.chart.screens[this.screen];
      let { minValue: o, maxValue: l } = r;
      const c = (l - o) * 0.01, h = -i * c;
      o += h, l -= h, r.lockedYScale = !1, this.chart.setScreenRange({ screen: this.screen, minValue: o, maxValue: l });
    }
  }
}), tb = ["screen-id"], nb = { class: "relative w-full h-full overflow-hidden select-none" }, rb = { class: "w-full" }, ib = {
  class: "min-w-full bg-[#11111122]",
  style: { height: "0.75rem", "font-size": "0.5rem" }
};
function sb(n, i, r, o, l, a) {
  return k(), I("div", {
    ref: "priceScale",
    class: Re(["absolute border-l-1 border-b-1 border-z-8", {
      "cursor-ns-resize": !n.chart.settings.lockedPriceScale
    }]),
    style: se({
      ...n.pos,
      touchAction: "none",
      color: n.rgbaToCSS(n.chart.theme.textColor),
      backgroundColor: n.rgbaToCSS(n.chart.theme.foreground)
    }),
    onDblclick: i[0] || (i[0] = (...c) => n.onDoubleClick && n.onDoubleClick(...c)),
    onMousedown: i[1] || (i[1] = (...c) => n.onMouseDown && n.onMouseDown(...c)),
    draggable: "false",
    "screen-id": n.screen
  }, [
    T("div", nb, [
      (k(!0), I(oe, null, ve(n.chart.stores.scales.value[n.screen], (c) => (k(), I("div", {
        class: "absolute w-full text-center text-z-5 text-xxs",
        style: se({
          top: `${c.y}px`,
          left: "0px",
          transform: "translateY(-50%)"
        })
      }, q(c.text), 5))), 256)),
      (k(!0), I(oe, null, ve(n.chart.stores.scales.labels[n.screen], (c) => (k(), I("div", {
        class: "absolute w-full text-center rounded-sm text-z-5 text-xxs",
        style: se({
          top: `${c.y}px`,
          left: "0px",
          transform: "translateY(-50%)",
          color: n.rgbaToCSS(c.textColor),
          backgroundColor: n.rgbaToCSS(c.backgroundColor)
        })
      }, [
        T("div", rb, q(c.value), 1),
        T("div", ib, q(c.label), 1)
      ], 4))), 256)),
      n.chart.stores.crosshair.visible.value ? (k(), I("div", {
        key: 0,
        class: "absolute flex items-center justify-center w-full p-1 font-bold text-center text-xxs text-z-3 whitespace-nowrap bg-zinc-900",
        style: se({
          top: `${n.chart.stores.crosshair.value.y[n.screen]}px`,
          transform: "translateY(-50%)",
          color: n.rgbaToCSS(n.chart.theme.textColor),
          backgroundColor: n.rgbaToCSS(n.chart.theme.foreground)
        })
      }, q(n.crosshairText), 5)) : de("", !0)
    ])
  ], 46, tb);
}
const ob = /* @__PURE__ */ ze(eb, [["render", sb]]), ab = An({
  components: {},
  setup() {
    return {
      chart: xe("chart"),
      rgbaToCSS: Ar
    };
  },
  data: () => ({}),
  computed: {
    x() {
      return this.chart.stores.crosshair.time.x;
    },
    time() {
      return this.chart.stores.crosshair.time.time;
    },
    crosshairLabel() {
      if (this.x === void 0 || this.time === void 0)
        return "";
      const n = new Date(this.time), i = n.getDate(), r = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ][n.getMonth()], o = n.getFullYear(), l = Tt(n.getHours()), a = Tt(n.getMinutes()), c = Tt(n.getSeconds());
      return `${i} ${r} ${o} ${l}:${a}:${c}`;
    }
  },
  methods: {
    onDoubleClick() {
      this.chart.settings.lockedTimeScale || this.chart.setInitialScreenRange();
    }
  }
}), lb = { class: "relative w-full h-full overflow-hidden select-none" };
function ub(n, i, r, o, l, a) {
  return k(), I("div", {
    ref: "timeScale",
    class: Re(["absolute w-full select-none overflow-inherit", {
      "cursor-ew-resize": !n.chart.settings.lockedTimeScale
    }]),
    onDblclick: i[0] || (i[0] = (...c) => n.onDoubleClick && n.onDoubleClick(...c)),
    style: se({
      left: "0px",
      top: `${n.chart.stores.dimensions.main.height.value}px`,
      width: `${n.chart.stores.dimensions.timeScale.width.value}px`,
      height: `${n.chart.stores.dimensions.timeScale.height.value}px`,
      color: n.rgbaToCSS(n.chart.theme.textColor),
      backgroundColor: n.rgbaToCSS(n.chart.theme.foreground)
    })
  }, [
    T("div", lb, [
      (k(!0), I(oe, null, ve(n.chart.stores.scales.time.value, (c) => (k(), I("div", {
        class: "absolute text-center text-z-5 text-xxs",
        style: se({
          left: `${c.x}px`,
          transform: "translateX(-50%)"
        })
      }, q(c.text), 5))), 256)),
      n.chart.stores.crosshair.visible.value ? (k(), I("div", {
        key: 0,
        class: "absolute flex items-center justify-center h-full px-2 text-xs font-bold text-center text-z-3 bg-zinc-9000 whitespace-nowrap",
        style: se({
          left: `${n.x}px`,
          transform: "translateX(-50%)",
          color: n.rgbaToCSS(n.chart.theme.textColor),
          backgroundColor: n.rgbaToCSS(n.chart.theme.foreground)
        })
      }, q(n.crosshairLabel), 5)) : de("", !0)
    ])
  ], 38);
}
const cb = /* @__PURE__ */ ze(ab, [["render", ub]]);
function s2(n, i = 1) {
  const r = n.replace("#", ""), o = parseInt(r.slice(0, 2), 16) / 255, l = parseInt(r.slice(2, 4), 16) / 255, a = parseInt(r.slice(4, 6), 16) / 255;
  return [o, l, a, i];
}
function Ar(n) {
  const [i, r, o, l] = n;
  return `rgba(${Math.round(i * 255)}, ${Math.round(r * 255)}, ${Math.round(
    o * 255
  )}, ${l})`;
}
function o2(n) {
  const [i, r, o] = n, l = (a) => Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${l(i)}${l(r)}${l(o)}`;
}
const Mu = {
  positive: [0.561, 0.867, 0.02, 1],
  negative: [0.996, 0.227, 0.392, 1],
  background: [0.035, 0.035, 0.043, 1],
  foreground: [0.102, 0.102, 0.102, 1],
  gridLine: [0.2, 0.2, 0.2, 0.3],
  crosshair: [0.7, 0.7, 0.7, 0.5],
  textColor: [0.831, 0.831, 0.847, 1]
}, hb = {
  positive: [0.18, 0.635, 0.349, 1],
  negative: [0.863, 0.196, 0.282, 1],
  background: [1, 1, 1, 1],
  foreground: [0.976, 0.976, 0.976, 1],
  gridLine: [0.7, 0.7, 0.7, 0.3],
  crosshair: [0.2, 0.2, 0.2, 0.5],
  textColor: [0.15, 0.15, 0.18, 1]
}, a2 = {
  dark: Mu,
  light: hb
};
function fb(n, i) {
  for (const r of Object.keys(i))
    n[r] = [...i[r]];
}
const db = An({
  components: {
    VCanvas: j_,
    VValueScale: ob,
    VTimeScale: cb,
    SunIcon: y1,
    MoonIcon: b1
  },
  setup() {
    return {
      chart: xe("chart"),
      rgbaToCSS: Ar
    };
  },
  data: () => ({
    resizeObserver: null
  }),
  async mounted() {
    this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.$refs.container), await this.$nextTick(), this.onResize();
  },
  beforeUnmount() {
    var n;
    (n = this.resizeObserver) == null || n.disconnect();
    for (const i in this.chart.series)
      this.chart.series[i].remove();
  },
  methods: {
    onResize() {
      const n = this.$refs.container;
      this.chart.stores.dimensions.setDimensions(
        n.clientHeight,
        n.clientWidth
      );
    }
  }
});
function pb(n, i, r, o, l, a) {
  const c = wt("VCanvas"), h = wt("VValueScale"), p = wt("VTimeScale");
  return k(), I("div", {
    ref: "container",
    class: "relative w-full h-full overflow-hidden",
    style: se({
      background: n.rgbaToCSS(n.chart.theme.foreground)
    })
  }, [
    n.chart.stores.dimensions.width.value > 0 && n.chart.stores.dimensions.height.value > 0 ? (k(), I(oe, { key: 0 }, [
      At(c),
      (k(!0), I(oe, null, ve(n.chart.screens, (d, v) => (k(), lo(h, {
        key: v,
        screen: v
      }, null, 8, ["screen"]))), 128)),
      At(p),
      (k(!0), I(oe, null, ve(n.chart.screens.slice(0, -1), (d, v) => (k(), I("div", {
        key: `divider-${v}`,
        class: "absolute pointer-events-none",
        style: se({
          top: `${n.chart.stores.dimensions.main.screens[v].top + n.chart.stores.dimensions.main.screens[v].height}px`,
          left: "0px",
          width: `${n.chart.stores.dimensions.main.width.value + n.chart.stores.dimensions.valueScale.width.value}px`,
          height: "1px",
          backgroundColor: n.rgbaToCSS(n.chart.theme.crosshair)
        })
      }, null, 4))), 128))
    ], 64)) : de("", !0)
  ], 4);
}
const cu = /* @__PURE__ */ ze(db, [["render", pb]]), gb = 1, mb = 5, vb = 10, wb = 15, _b = 25, bb = 50, xb = 100, yb = 250, Eb = 500, Sb = 1e3, Tb = 5 * 1e3, Mb = 10 * 1e3, Cb = 15 * 1e3, Pb = 30 * 1e3, Ab = 45 * 1e3, Rb = 60 * 1e3, kb = 2 * 60 * 1e3, Bb = 3 * 60 * 1e3, Ib = 5 * 60 * 1e3, Lb = 10 * 60 * 1e3, Nb = 15 * 60 * 1e3, Ob = 30 * 60 * 1e3, Db = 45 * 60 * 1e3, Fb = 60 * 60 * 1e3, $b = 2 * 60 * 60 * 1e3, zb = 3 * 60 * 60 * 1e3, Ub = 4 * 60 * 60 * 1e3, Vb = 6 * 60 * 60 * 1e3, Hb = 8 * 60 * 60 * 1e3, Wb = 12 * 60 * 60 * 1e3, qb = 24 * 60 * 60 * 1e3, Yb = 2 * 24 * 60 * 60 * 1e3, Gb = 3 * 24 * 60 * 60 * 1e3, Qb = 7 * 24 * 60 * 60 * 1e3, Kb = 2 * 7 * 24 * 60 * 60 * 1e3, Xb = {
  // Milliseconds
  MILLISECONDS_1: gb,
  MILLISECONDS_5: mb,
  MILLISECONDS_10: vb,
  MILLISECONDS_15: wb,
  MILLISECONDS_25: _b,
  MILLISECONDS_50: bb,
  MILLISECONDS_100: xb,
  MILLISECONDS_250: yb,
  MILLISECONDS_500: Eb,
  // Seconds
  SECONDS_1: Sb,
  SECONDS_5: Tb,
  SECONDS_10: Mb,
  SECONDS_15: Cb,
  SECONDS_30: Pb,
  SECONDS_45: Ab,
  // Minutes
  MINUTES_1: Rb,
  MINUTES_2: kb,
  MINUTES_3: Bb,
  MINUTES_5: Ib,
  MINUTES_10: Lb,
  MINUTES_15: Nb,
  MINUTES_30: Ob,
  MINUTES_45: Db,
  // Hours
  HOURS_1: Fb,
  HOURS_2: $b,
  HOURS_3: zb,
  HOURS_4: Ub,
  HOURS_6: Vb,
  HOURS_8: Hb,
  HOURS_12: Wb,
  // Days
  DAYS_1: qb,
  DAYS_2: Yb,
  DAYS_3: Gb,
  // Weeks
  WEEKS_1: Qb,
  WEEKS_2: Kb
};
var Zb = /* @__PURE__ */ ((n) => (n[n.Default = 0] = "Default", n[n.Percent = 1] = "Percent", n[n.Normalized = 2] = "Normalized", n))(Zb || {});
class l2 {
  constructor({ el: i, theme: r }) {
    S(this, "el");
    S(this, "autoScroll");
    S(this, "scaleType");
    S(this, "timeframe");
    S(this, "valueScaleDecimalPrecision");
    /** Enable debug overlay with performance metrics */
    S(this, "debug");
    /** Performance metrics (updated each frame when debug is enabled) */
    S(this, "performanceMetrics");
    S(this, "crosshair");
    S(this, "orders");
    S(this, "startTime");
    S(this, "endTime");
    S(this, "pixelsPerElement");
    S(this, "screens", _e([
      {
        id: 0,
        minValue: 1 / 0,
        maxValue: -1 / 0,
        top: 0,
        height: 100,
        lockedYScale: !0
      }
    ]));
    S(this, "series");
    S(this, "stores");
    S(this, "onPlaceOrder", null);
    S(this, "onMoveOrder", null);
    S(this, "onCancelOrder", null);
    S(this, "settings");
    S(this, "_theme", _e({}));
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i, this.theme = r ?? Mu, this.autoScroll = Ce(!1), this.scaleType = Ce(
      0
      /* Default */
    ), this.timeframe = Ce(Xb.HOURS_1), this.valueScaleDecimalPrecision = Ce(0), this.debug = Ce(!1), this.performanceMetrics = _e({
      fps: 0,
      frameTime: 0,
      avgFrameTime: 0,
      minFrameTime: 0,
      maxFrameTime: 0,
      drawCalls: 0,
      visibleSeries: 0,
      dataPoints: 0
    }), this.crosshair = Ce(null), this.orders = _e([]), this.startTime = Ce(NaN), this.endTime = Ce(NaN), this.pixelsPerElement = Ce(NaN), this.series = {}, this.settings = {
      autoscroll: !1,
      lockedPriceScale: !0,
      lockedTimeScale: !0
    }, this.stores = {
      crosshair: iw(this),
      dimensions: sw(this),
      engine: new aw(this),
      scales: h_(this)
    };
    const { shadowHost: o, mountPoint: l } = Ut(this.el, cu);
    this.shadowHost = o, this.vueApp = $t({
      setup: () => {
        ke("chart", this);
      },
      render() {
        return zt(cu);
      }
    }), this.vueApp.mount(l), this.stores.dimensions.setDimensions(i.clientHeight, i.clientWidth);
  }
  get theme() {
    return this._theme;
  }
  set theme(i) {
    fb(this._theme, i);
  }
  addSeries(i) {
    const r = new i(this);
    return this.series[r.id] = r, r;
  }
  removeSeries(i) {
    const r = this.series[i];
    r && r.remove();
  }
  setInitialScreenRange() {
    const i = this.timeframe.value, r = Date.now(), o = r - r % i;
    let l = o - i * 150, a = o + i * 20;
    this.setScreenRange({
      startTime: l,
      endTime: a
    });
  }
  setScreenRange(i = void 0) {
    const r = this.stores.dimensions.main.width.value, o = this.timeframe.value;
    if (this.stores.crosshair.isMovingObject)
      return;
    const l = (i == null ? void 0 : i.screen) || 0;
    let { startTime: a = this.startTime.value, endTime: c = this.endTime.value } = i ?? {};
    if (Math.abs(a) === 1 / 0 || isNaN(a) || Math.abs(c) === 1 / 0 || isNaN(c)) {
      this.setInitialScreenRange();
      return;
    }
    const h = a - a % o, p = c + c % o + o, d = {
      0: { mins: [], maxs: [], serieses: [] }
    };
    for (const w in this.series) {
      const b = this.series[w];
      if (!b.visible || {
        Line: !0,
        Candlestick: !0,
        Volume: !0,
        Footprint: !0
      }[b.type] !== !0)
        continue;
      const P = b._getAllBatchesInRange(h, p);
      if (!P)
        continue;
      let { first: F, min: R, max: C } = P;
      if (b._visibleFirst = F, b._visibleMin = R, b._visibleMax = C, b.type === "Volume" && b._screen === 0)
        continue;
      this.scaleType.value === 1 ? [R, C] = Xn.percent([R, C], P) : this.scaleType.value === 2 && (R = 0, C = 100);
      const { _screen: B } = b;
      d[B] || (d[B] = { mins: [], maxs: [], serieses: [] }), d[B].mins.push(R), d[B].maxs.push(C), d[B].serieses.push(b);
    }
    for (const [w, b] of Object.entries(d)) {
      const { mins: P, maxs: F } = b, R = this.screens[+w];
      let C = R.minValue, B = R.maxValue;
      if (l === +w && ((i == null ? void 0 : i.minValue) !== void 0 && (C = i.minValue), (i == null ? void 0 : i.maxValue) !== void 0 && (B = i.maxValue)), R.lockedYScale) {
        let z = Math.min.apply(this, P), $ = Math.max.apply(this, F);
        this.scaleType.value === 2 && (z = 0, $ = 100);
        const H = ($ - z) * 0.1;
        C = z - H, B = $ + H;
      }
      R.minValue = C, R.maxValue = B;
    }
    const v = c - a;
    this.pixelsPerElement.value = r / (v / o), this.startTime.value = a, this.endTime.value = c, this.stores.crosshair.visible.value && this.stores.crosshair.setCrosshairFromPixels(
      this.stores.crosshair.mousepos.x,
      this.stores.crosshair.mousepos.y
    ), this.stores.scales.generateXScales();
    for (const w of this.screens)
      this.stores.scales.generateYScales(w);
  }
  /** Get the Screen that cooresponds to a y px coordinate */
  getScreenByYCoord(i) {
    for (const r of this.screens) {
      const { top: o, height: l } = this.stores.dimensions.main.screens[r.id];
      if (o <= i && i <= o + l)
        return this.screens[r.id];
    }
    return this.screens[this.screens.length - 1];
  }
  getXCoordByTimestamp(i) {
    const { width: r } = this.stores.dimensions.main;
    return co(
      this.startTime.value,
      this.endTime.value,
      r.value,
      i
    );
  }
  getYCoordByValue(i, r) {
    const { height: o } = this.stores.dimensions.main.screens[i], l = this.screens[i];
    return Zn(l.minValue, l.maxValue, o, r);
  }
  getTimestampByXCoord(i) {
    const { width: r } = this.stores.dimensions.main;
    return ev(
      this.startTime.value,
      this.endTime.value,
      r.value,
      i
    );
  }
  getValueByYCoord(i, r) {
    const { top: o, height: l } = this.stores.dimensions.main.screens[i], a = this.screens[i];
    return jm(a.minValue, a.maxValue, l, r - o);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class u2 {
  constructor({
    el: i,
    state: r = {
      bids: [],
      asks: [],
      qtyPrecision: 0,
      pricePrecision: 0
    },
    settings: o = {
      enableTrading: !0
    }
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "onPostOrder");
    S(this, "onDestroyOrder");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e(r);
    this.state = l;
    const a = _e(o);
    this.settings = a, this.onPostOrder = () => {
    }, this.onDestroyOrder = () => {
    };
    const { shadowHost: c, mountPoint: h } = Ut(this.el, Yl);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(Yl);
      }
    }), this.vueApp.mount(h);
  }
  /** Unmount and destroy component */
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class c2 {
  constructor({
    el: i,
    state: r = {},
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({
      trades: [],
      ...r
    });
    this.state = l;
    const a = _e({
      maxTrades: 250,
      minQty: "",
      maxQty: "",
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, Ql);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(Ql, {});
      }
    }), this.vueApp.mount(h);
  }
  /** Add trades to trades feed */
  addTrade(i) {
    for (let r = i.length - 1; r >= 0; r--) {
      const o = i[r];
      this.settings.minQty !== "" && o.qty < Number(this.settings.minQty) || this.settings.maxQty !== "" && o.qty > Number(this.settings.maxQty) || this.state.trades.unshift(o);
    }
    this.state.trades = this.state.trades.slice(0, this.settings.maxTrades);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class h2 {
  constructor({
    el: i,
    state: r,
    settings: o = {
      maxDepth: 20,
      grouping: 1,
      enableTrading: !1
    }
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "onPlaceOrders");
    S(this, "onDecreaseSize");
    S(this, "vueApp");
    S(this, "instance");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({
      bids: [],
      asks: [],
      qtyPrecision: 0,
      pricePrecision: 0,
      orders: [],
      trades: [],
      activePosition: null,
      ...r
    });
    this.state = l;
    const a = _e(o);
    this.settings = a, this.onPlaceOrders = () => {
    }, this.onDecreaseSize = () => {
    };
    const { shadowRoot: c, shadowHost: h, mountPoint: p } = Ut(
      this.el,
      Gl
    );
    this.shadowHost = h, this.vueApp = $t({
      setup() {
        return ke("state", l), ke("settings", a), ke("shadowRoot", c), {
          app: Ce(null)
        };
      },
      render: () => zt(Gl, {
        ref: "app",
        onPlaceOrders: (d) => this.onPlaceOrders(d),
        onDecreaseSize: (d) => this.onDecreaseSize(d)
      })
    }), this.instance = this.vueApp.mount(p);
  }
  recenter() {
    this.instance.$refs.app.recenter();
  }
  newTrade(i) {
    this.instance.$refs.app.newTrade(i);
  }
  resetVolumeProfile() {
    this.instance.$refs.app.newTrade(trade);
  }
  /** Unmount and destroy component */
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class f2 {
  constructor({
    el: i,
    state: r = {
      bids: {},
      asks: {},
      bids2: {},
      asks2: {},
      qtyPrecision: 0,
      pricePrecision: 0
    },
    settings: o = {
      enableTrading: !0
    }
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "onPostOrder");
    S(this, "onDestroyOrder");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e(r);
    this.state = l;
    const a = _e(o);
    this.settings = a, this.onPostOrder = () => {
    }, this.onDestroyOrder = () => {
    };
    const { shadowHost: c, mountPoint: h } = Ut(this.el, Xl);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(Xl);
      }
    }), this.vueApp.mount(h);
  }
  setBid(i, r) {
    this.state.bids[i] = r;
  }
  setAsk(i, r) {
    this.state.asks[i] = r;
  }
  /** Unmount and destroy component */
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class d2 {
  constructor({
    el: i,
    state: r = { data: [] },
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({ data: [], ...r });
    this.state = l;
    const a = _e({
      width: 80,
      height: 32,
      color: "#8fdd05",
      showLastValue: !1,
      lineWidth: 1.5,
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, Zl);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(Zl);
      }
    }), this.vueApp.mount(h);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class p2 {
  constructor({
    el: i,
    state: r = { items: [] },
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({ items: [], ...r });
    this.state = l;
    const a = _e({
      scrollSpeed: 50,
      pauseOnHover: !0,
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, Jl);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(Jl);
      }
    }), this.vueApp.mount(h);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class g2 {
  constructor({
    el: i,
    state: r = { sectors: [] },
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({ sectors: [], ...r });
    this.state = l;
    const a = _e({
      minChange: -5,
      maxChange: 5,
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, jl);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(jl);
      }
    }), this.vueApp.mount(h);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class m2 {
  constructor({
    el: i,
    state: r = { slices: [] },
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({ slices: [], ...r });
    this.state = l;
    const a = _e({
      innerRadiusRatio: 0.6,
      showLegend: !0,
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, tu);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(tu);
      }
    }), this.vueApp.mount(h);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
class v2 {
  constructor({
    el: i,
    state: r = { symbols: [], matrix: [] },
    settings: o = {}
  }) {
    S(this, "el");
    S(this, "state");
    S(this, "settings");
    S(this, "vueApp");
    S(this, "shadowHost");
    this.el = i;
    const l = _e({ symbols: [], matrix: [], ...r });
    this.state = l;
    const a = _e({
      precision: 2,
      ...o
    });
    this.settings = a;
    const { shadowHost: c, mountPoint: h } = Ut(this.el, nu);
    this.shadowHost = c, this.vueApp = $t({
      setup() {
        ke("state", l), ke("settings", a);
      },
      render() {
        return zt(nu);
      }
    }), this.vueApp.mount(h);
  }
  unmount() {
    this.vueApp.unmount(), this.shadowHost.remove();
  }
}
export {
  at as B,
  v2 as C,
  h2 as D,
  r2 as F,
  t2 as L,
  d2 as M,
  u2 as O,
  m2 as P,
  g2 as S,
  c2 as T,
  i2 as V,
  f2 as a,
  p2 as b,
  Tr as c,
  Xn as d,
  Zb as e,
  l2 as f,
  e2 as g,
  Nt as h,
  lt as i,
  n2 as j,
  s2 as k,
  o2 as l,
  Mu as m,
  hb as n,
  a2 as o,
  fb as p,
  Ar as r
};
