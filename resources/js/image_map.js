! function(a) {
    var b = 0,
        c = {},
        d = {
            defaults: {
                src: "",
                file: "",
                style: {
                    fill: "#666",
                    stroke: "#333",
                    strokeWidth: "1",
                    opacity: "0.6",
                    cursor: "pointer"
                },
                pointStyle: {
                    fill: "#fff",
                    stroke: "#333",
                    strokeWidth: "1",
                    opacity: "0.6",
                    cursor: "pointer"
                },
                event: {
                    init: function() {},
                    update: function() {},
                    addArea: function() {},
                    removeArea: function() {}
                },
                input: {
                    active: {
                        selector: 'input[name^="im["][name$="][active]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    },
                    shape: {
                        selector: 'select[name^="im["][name$="][shape]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    },
                    href: {
                        selector: 'input[name^="im["][name$="][href]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    },
                    title: {
                        selector: 'input[name^="im["][name$="][title]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    },
                    target: {
                        selector: 'select[name^="im["][name$="][target]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    },
                    remove: {
                        selector: 'button[name^="im["][name$="][remove]"]',
                        fn: function() {
                            return a(this).attr("name").match(/im\[([\d]+)\]\[([^\)]+)\]/).slice(1)
                        }
                    }
                }
            },
            init: function(e, f) {
                var g = this,
                    h = a(this),
                    f = f || {};
                if (!e) {
                    f = a.extend(!0, d.defaults, f), c[b] = {
                        state: {
                            isLoaded: !1,
                            areaIndex: 0,
                            areaLength: 0
                        },
                        area: [],
                        options: f
                    }, e = b, h.data("imageMapper", b++), h.addClass("image-mapper"), h.html('<img class="image-mapper-img" /><svg class="image-mapper-svg" />');
                    var i = a(".image-mapper-img", h);
                    i[0].onload = function() {
                        c[e].state.isLoaded = !0
                    }, c[e].options.src.length > 0 && i.attr("src", c[e].options.src), d.bindEvents.apply(this, [e]), d.bindInputs.apply(this, [e]), d.addArea(e, "rect"), "function" == typeof c[e].options.event.init && c[e].options.event.init.apply(g), d.bindValues(e)
                }
            },
            update: function(b, e) {
                var f = this,
                    g = a(this),
                    e = e || {};
                if (b >= 0) {
                    e = a.extend(!0, c[b].options, e), c[b] = {
                        state: {
                            isLoaded: !1,
                            areaIndex: 0,
                            areaLength: 0
                        },
                        area: [],
                        options: e
                    };
                    var h = a(".image-mapper-img", g);
                    "src" in e && h.attr("src", c[b].options.src), d.addArea(b, "rect"), d.refresh.apply(this, [b]), "function" == typeof c[b].options.event.update && c[b].options.event.update.apply(f)
                }
            },
            bindEvents: function(b) {
                var e = this,
                    f = a(this);
                a(window).on("resize", function() {
                    d.refresh.apply(e, [b])
                }), f.on("click", function(a) {
                    var f = d.getPosition.apply(e, [b, a]);
                    d.addPoint.apply(e, [b, f]), "function" == typeof c[b].options.event.update && c[b].options.event.update.apply(e)
                });
                var g, h;
                f.on("mousemove touchmove", function(f) {
                    if (!g) return !0;
                    var i = "undefined" != typeof f.originalEvent.touches || !1,
                        j = d.getPosition.apply(e, [b, f, i]),
                        k = d.getClientPosition.apply(e, [b, j]),
                        l = d.getRatio.apply(e),
                        m = g.data("areaIndex"),
                        n = a(".image-mapper-img", e),
                        o = [],
                        p = !1;
                    a.each(c[b].area[m].coords, function(a, b) {
                        var c = {
                            naturalX: b.naturalX + Math.round((k.clientX - h.clientX) * l.ratioX),
                            naturalY: b.naturalY + Math.round((k.clientY - h.clientY) * l.ratioY)
                        };
                        c.naturalX < 0 || c.naturalX >= n[0].naturalWidth ? p = !0 : (c.naturalY < 0 || c.naturalY >= n[0].naturalHeight) && (p = !0), o[a] = c
                    }), p || (c[b].area[m].coords = o, d.refresh.apply(e, [b])), h = k, f.preventDefault(), f.stopImmediatePropagation()
                }), f.on("mouseup touchend mouseleave touchleave", function(a) {
                    var b = "undefined" != typeof a.originalEvent.touches || !1;
                    g && (0 === a.button || b) && (g = !1)
                }), f.on("mousedown touchstart", ".image-mapper-shape", function(c) {
                    var f = "undefined" != typeof c.originalEvent.touches || !1;
                    if (0 === c.button || f) {
                        var i = d.getPosition.apply(e, [b, c, f]),
                            j = d.getClientPosition.apply(e, [b, i]);
                        g = a(this), h = j
                    }
                });
                var i;
                f.on("mousemove touchmove", function(a) {
                    if (!i) return !0;
                    var f = "undefined" != typeof a.originalEvent.touches || !1,
                        g = d.getPosition.apply(e, [b, a, f]),
                        h = d.getClientPosition.apply(e, [b, g]);
                    c[b].area[i.data("areaIndex")].coords[i.data("coordIndex")] = g, i.attr("cx", h.clientX).attr("cy", h.clientY), d.renderSVG.apply(e, [b]), a.preventDefault(), a.stopImmediatePropagation()
                }), f.on("mouseup touchend mouseleave touchleave", function(a) {
                    var b = "undefined" != typeof a.originalEvent.touches || !1;
                    i && (0 === a.button || b) && (i = !1)
                }), f.on("mousedown touchstart", ".image-mapper-point", function(b) {
                    var c = "undefined" != typeof b.originalEvent.touches || !1;
                    (0 === b.button || c) && (i = a(this))
                }), f.on("click", ".image-mapper-point", function(a) {
                    a.preventDefault(), a.stopImmediatePropagation()
                }), f.on("mouseup touchend", ".image-mapper-point", function(f) {
                    2 == f.button && (c[b].area[a(this).data("areaIndex")].coords.splice(a(this).data("coordIndex"), 1), d.refresh.apply(e, [b]))
                }), f.on("contextmenu", function(a) {
                    a.preventDefault()
                })
            },
            bindValues: function(b) {
                a.each(c[b].options.input, function(d, e) {
                    var f = a(e.selector);
                    f.each(function() {
                        var d = e.fn.apply(this);
                        "active" == d[1] ? a(this).attr("checked", d[0] == c[b].state.areaIndex ? "checked" : !1) : a(this).val(c[b].area[d[0]][d[1]])
                    })
                })
            },
            bindInputs: function(b) {
                var e = this;
                a.each(c[b].options.input, function(f, g) {
                    var h = a(g.selector);
                    h.is("button") ? a(document).on("click", g.selector, function() {
                        var a = g.fn.apply(this);
                        "remove" == a[1] && (d.removeArea.apply(e, [b, a[0]]), d.refresh.apply(e, [b]))
                    }) : a(document).on("change", g.selector, function() {
                        var f = a(this),
                            h = g.fn.apply(this),
                            i = f.val();
                        "active" == h[1] ? (a(g.selector).not(this).attr("checked", !1), c[b].state.areaIndex = h[0], d.refresh.apply(e, [b])) : c[b].area[h[0]][h[1]] = i
                    })
                })
            },
            getData: function(a) {
                return c[a]
            },
            getRatio: function() {
                var b = a(".image-mapper-img", this);
                return {
                    ratioX: b[0].naturalWidth / b[0].clientWidth,
                    ratioY: b[0].naturalHeight / b[0].clientHeight
                }
            },
            getPosition: function(b, c, e) {
                var f = a(".image-mapper-img", this),
                    g = f.offset(),
                    h = d.getRatio.apply(this, [b]),
                    i = {
                        naturalX: 0,
                        naturalY: 0
                    };
                return e ? (i.naturalX = Math.round((c.originalEvent.targetTouches[0].pageX - g.left) * h.ratioX), i.naturalY = Math.round((c.originalEvent.targetTouches[0].pageY - g.top) * h.ratioY)) : (i.naturalX = Math.round((c.clientX + (window.scrollX || window.pageXOffset) - g.left) * h.ratioX), i.naturalY = Math.round((c.clientY + (window.scrollY || window.pageYOffset) - g.top) * h.ratioY)), i
            },
            getClientPosition: function(b, c) {
                var e = a(".image-mapper-img", this),
                    f = (e.offset(), d.getRatio.apply(this, [b])),
                    g = {
                        clientX: 0,
                        clientY: 0
                    };
                return g.clientX = Math.round(c.naturalX / f.ratioX), g.clientY = Math.round(c.naturalY / f.ratioY), g
            },
            refresh: function(a) {
                d.renderSVG.apply(this, [a]), d.renderPoints.apply(this, [a])
            },
            addPoint: function(a, b) {
                d.addCoord(a, b), d.refresh.apply(this, [a])
            },
            addArea: function(b, d) {
                1 == arguments.length && (d = b, b = a(this).data("imageMapper")), c[b].area[c[b].state.areaLength] = {
                    el: !1,
                    shape: d,
                    href: "",
                    title: "",
                    target: "",
                    coords: []
                }, c[b].state.areaLength++, "function" == typeof c[b].options.event.addArea && c[b].options.event.addArea.apply(this)
            },
            removeArea: function(a, b) {
                c[a].area.splice(b, 1), c[a].state.areaLength--, c[a].state.areaIndex >= c[a].state.areaLength ? c[a].state.areaIndex = 0 : c[a].state.areaIndex == b && 0 !== b && c[a].state.areaIndex--, 0 === c[a].state.areaLength && d.addArea(a, "rect"), "function" == typeof c[a].options.event.removeArea && c[a].options.event.removeArea.apply(this)
            },
            addCoord: function(a, b) {
                var d = c[a].state.areaIndex,
                    e = c[a].area[d].shape;
                (-1 == ["circle", "rect"].indexOf(e) || 2 != c[a].area[d].coords.length) && c[a].area[d].coords.push(b)
            },
            renderSVG: function(b) {
                var e = this,
                    f = a(".image-mapper-svg", this);
                f.css("width", "100%"), a(".image-mapper-shape", f).remove(), a.each(c[b].area, function(g, h) {
                    var i, j = [];
                    a.each(h.coords, function(a, c) {
                        var f = d.getClientPosition.apply(e, [b, c]);
                        j.push(f.clientX, f.clientY)
                    }), h.el && (i = h.el), "poly" == h.shape ? (i || (i = a(document.createElementNS("http://www.w3.org/2000/svg", "polygon"))), i.attr("points", j.join(","))) : "circle" == h.shape ? j.length >= 4 && (i || (i = a(document.createElementNS("http://www.w3.org/2000/svg", "circle"))), i.attr("cx", j[0]).attr("cy", j[1]), i.attr("r", Math.sqrt(Math.pow(j[2] - j[0], 2) + Math.pow(j[3] - j[1], 2)))) : j.length >= 4 && (i || (i = a(document.createElementNS("http://www.w3.org/2000/svg", "rect"))), i.attr("x", Math.min(j[0], j[2])).attr("y", Math.min(j[1], j[3])), i.attr("width", Math.abs(j[2] - j[0])).attr("height", Math.abs(j[3] - j[1]))), i && (i.attr("class", "image-mapper-shape"), i.attr("data-area-index", g), i.css(c[b].options.style), f.prepend(i), c[b].area[g].el = i)
                })
            },
            renderPoints: function(b) {
                var e = this,
                    f = a(".image-mapper-svg", this);
                a(".image-mapper-point", f).remove();
                var g = c[b].state.areaIndex,
                    h = c[b].area[g];
                a.each(h.coords, function(h, i) {
                    var j = a(document.createElementNS("http://www.w3.org/2000/svg", "circle")),
                        k = d.getClientPosition.apply(e, [b, i]);
                    j.attr("cx", k.clientX).attr("cy", k.clientY), j.attr("r", 5), j.attr("class", "image-mapper-point"), j.attr("data-area-index", g), j.attr("data-coord-index", h), j.css(c[b].options.pointStyle), f.append(j)
                })
            },
            asHTML: function(b) {
                var d = a("<img />"),
                    e = c[b].options.src;
                c[b].options.file.length > 0 && (e = c[b].options.file), d.attr("src", e), d.attr("usemap", "#image-map");
                var f = a("<map />");
                f.attr("name", "image-map");
                var g = [];
                a.each(c[b].area, function(d, e) {
                    var f = [];
                    if (a.each(e.coords, function(a, b) {
                            f.push(b.naturalX, b.naturalY)
                        }), "circle" == e.shape) {
                        var h = Math.round(Math.sqrt(Math.pow(f[2] - f[0], 2) + Math.pow(f[3] - f[1], 2)));
                        f = f.slice(0, 2), f.push(h)
                    }
                    var i = a("<area />");
                    i.attr("target", c[b].area[d].target), i.attr("alt", c[b].area[d].title), i.attr("title", c[b].area[d].title), i.attr("href", c[b].area[d].href), i.attr("coords", f.join(",")), i.attr("shape", c[b].area[d].shape), g.push(i[0].outerHTML)
                }), f.append("\n    " + g.join("\n    ") + "\n");
                var h = "<!-- Image Map Generated by http://www.image-map.net/ -->";
                return h + "\n" + d[0].outerHTML + "\n\n" + f[0].outerHTML
            }
        };
    a.fn.imageMapper = function() {
        var b = "string" == typeof arguments[0] ? arguments[0] : "init",
            c = ("object" == typeof arguments[0] ? 0 : 1) || {},
            e = Array.prototype.slice.call(arguments, c),
            f = a(this).data("imageMapper");
        return "getData" == b ? d.getData(f) : "asHTML" == b ? d.asHTML(f) : (e.unshift(f), this.each(function() {
            "function" == typeof d[b] && d[b].apply(this, e)
        }))
    }
}(jQuery),
function(a) {
    a(document).on("init", function() {
        function b(a) {
            for (var b = "", c = new Uint8Array(a), d = c.byteLength, e = 0; d > e; e++) b += String.fromCharCode(c[e]);
            return window.btoa(b)
        }
        imageMapperRow = a("#image-mapper-table tbody").html();
        a(document).on("click", "button.add-row", function(b) {
            a("#image-map").imageMapper("addArea").trigger("update"), b.preventDefault()
        }), a(document).on("update", "#image-map", function() {
            var b = a(this).imageMapper("getData"),
                c = a("#image-mapper-table"),
                d = imageMapperRow;
            a("tbody", c).html(""), a.each(b.area, function(b) {
                d = d.replace(/im\[[\d]+\]/gi, "im[" + b + "]"), a("tbody", c).append(d)
            }), a(this).imageMapper("bindValues")
        }), a(document).on("update", "#image-map", function() {
            var b = a(this),
                c = b.imageMapper("getData");
            0 == c.options.src.length ? a(".toggle-content").hide() : a(".toggle-content").show()
        }), a("#image-map").imageMapper({
            src: "",
            event: {
                init: function() {
                    a("#image-map").trigger("update")
                },
                update: function() {
                    a("#image-map").trigger("update")
                },
                removeArea: function() {
                    a("#image-map").trigger("update")
                }
            }
        }), a(document).on("show.bs.modal", "#modal-code", function() {
            var b = a("#image-map").imageMapper("asHTML");
            a("#modal-code-result").text(b).css("whiteSpace", "pre")
        }), a(document).on("click", "#image-mapper-button", function() {
            var b = a("#image-map").imageMapper("asHTML");
            a("#image-mapper-output").text(b).css("whiteSpace", "pre")
        }), a(document).on("click", "#image-mapper-upload", function() {
            a("#image-mapper-file").trigger("click")
        });
        var c = {
            success: function() {
                var b = a("#image-mapper-dialog");
                a("#image-mapper-continue", b).attr("disabled", !1), a(".input-group", b).addClass("has-success").removeClass("has-error").removeClass("has-warning"), a(".input-group-addon > span", b).attr("class", "glyphicon glyphicon-ok")
            },
            error: function() {
                var b = a("#image-mapper-dialog");
                a("#image-mapper-continue", b).attr("disabled", "disabled"), a(".input-group", b).addClass("has-error").removeClass("has-success").removeClass("has-warning"), a(".input-group-addon > span", b).attr("class", "glyphicon glyphicon-remove")
            }
        };
        a(document).on("keydown keyup", "#image-mapper-url", function() {
            var b = a(this).val().match(/(((([A-Za-z]{3,9}):(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/),
                d = ["http", "https"];
            null != b && -1 != d.indexOf(b[4]) ? c.success() : c.error()
        }), a(document).on("show.bs.modal", "#image-mapper-load", function() {
            var b = a("#image-mapper-dialog");
            a("#image-mapper-url", b).val(""), c.error()
        }), a(document).on("click", "#image-mapper-continue", function() {
            var b = a("#image-mapper-dialog");
            a("#image-map").imageMapper("update", {
                src: a("#image-mapper-url", b).val(),
                file: ""
            }), a("#image-mapper-load").modal("hide")
        }), a(document).on("change", "#image-mapper-file", function() {
            var c = this.files[0],
                d = new FileReader;
            d.onloadend = function(d) {
                var e = b(d.target.result);
                a("#image-map").imageMapper("update", {
                    src: "data:" + c.type + ";base64," + e,
                    file: c.name
                })
            }, c ? d.readAsArrayBuffer(c) : a("#image-map").imageMapper("update", {
                src: "",
                file: ""
            })
        })
    })
}(jQuery);