var Card;
this.Card || (this.Card = {}), Card = this.Card, Card.__meta = {
    id: "3500_v48919",
    progress: "progress",
    chunks: [{script: 3927, amount: 1, strategy: "stack", generations: [{}]}],
    events: {3927: {actions: {play_button: {name: "Нажал на кнопку 'Старт'", params: []}}, signals: {}}},
    player: "/players/player-1",
    supports: {grid: !0, sound: "v2", fullscreen: "v1", olymp_answer: "v1"}
}, Card.__assets = [], Card.draw_sbs = function (_, t) {
    Card.Player.draw_sbs(_, {
        id: "3500_v48919",
        progress: "progress",
        chunks: [{script: 3927, amount: 1, strategy: "stack", generations: [{}]}],
        events: {3927: {actions: {play_button: {name: "Нажал на кнопку 'Старт'", params: []}}, signals: {}}},
        player: "/players/player-1",
        supports: {grid: !0, sound: "v2", fullscreen: "v1", olymp_answer: "v1"}
    }, t)
}, Card.manage = function (_, t) {
    Card.Player.manage(_, t)
}, Card.play = function (_, t, r) {
    Card.__public_path = t, Card.Player.play(_, t, {
        id: "3500_v48919",
        progress: "progress",
        chunks: [{script: 3927, amount: 1, strategy: "stack", generations: [{}]}],
        events: {3927: {actions: {play_button: {name: "Нажал на кнопку 'Старт'", params: []}}, signals: {}}},
        player: "/players/player-1",
        supports: {grid: !0, sound: "v2", fullscreen: "v1", olymp_answer: "v1"}
    }, r)
}, window.Card.Script3927 = {}, function () {
    var t, r = [].indexOf || function (_) {
        for (var t = 0, r = this.length; r > t; t++) if (t in this && this[t] === _) return t;
        return -1
    };
    Card.Script3927.Script3927 = function () {
        function _(_, t, r, e) {
            this.place = _, this.tutor = t, this.graph_dev = r, this.graph_opt = null != e ? e : {}
        }

        return _
    }(), Card.Script3927.Script = Card.Script3927.Script3927, Card.Script3927.Script3927.__is_graph = !0, (t = Card.Script3927.Script3927).SBS || (t.SBS = {}), Card.Script3927.Script3927.SBS["graph.wrong"] = "[graph] mistake", Card.Script3927.Script3927.prototype.run = function (_) {
        var t, r, e, n, a;
        return this.salt = _, this.__graph_frames = {}, this.__graph_last_frame_id = 0, this.__graph_waits = {}, this.__graph_last_wait_id = 0, this.__start = (new Date).getTime() / 1e3, this.__graph_drags = {}, this.__graph_tick = 0, this.__graph_tick_steps = {}, this.__graph_next_sprite_id = 0, this.graph_dev.tab_processes && (t = {}, t.supports = {}, t.supports.state = (null != (r = this.graph_opt) ? null != (e = r.supports) ? e.state : void 0 : void 0) || "v1", this.__graph_processes = new Card.Script3927.GraphProcesses(this.graph_dev.tab_processes, this.__graph_frames, t), t = null), this.__graph_helper__prepare_state = "v2" === (null != (n = this.graph_opt) ? null != (a = n.supports) ? a.state : void 0 : void 0) ? this.__graph_helper__clone_state2 : this.__graph_helper__clone_state, this.__graph_script_3927(this.__graph_helper__create_frame())
    }, Card.Script3927.Script3927.prototype.__graph_helper__subscribe_drag = function (_, t, r) {
        var e, n;
        if ("drag_x" !== t && "drag_y" !== t && "drag" !== t) throw"unknown drag action";
        return n = {
            start: function () {
                return function () {
                    return r("start")
                }
            }(this), move: function () {
                return function () {
                    return r("move")
                }
            }(this), end: function () {
                return function () {
                    return r("end")
                }
            }(this), xOnly: "drag_x" === t, yOnly: "drag_y" === t
        }, e = Card.Script3927.drag(_, n), this.__graph_drags[_.attr("id")] = !1
    }, Card.Script3927.Script3927.prototype.__graph_helper__unsubscribe_drag = function (_) {
        return _.attr("id") in this.__graph_drags ? this.__graph_drags[_.attr("id")] = !0 : void 0
    }, Card.Script3927.Script3927.prototype.__graph_helper__subscribtion_on_tick_end = function () {
        return _(this.__graph_drags).each(function (_) {
            return function (t, r) {
                return t ? (console.log("tick end: unsubscribe drag " + r), Card.Script3927.drag_clear(_.place, r), delete _.__graph_drags[r]) : void 0
            }
        }(this)), _(this.__graph_waits).each(function (t) {
            return function (r, e) {
                var n, a;
                return a = 0, n = 0, _(t.__graph_frames).each(function (t) {
                    return _(r.ids).any(function (r) {
                        return -1 !== _(t.attaches).indexOf(r)
                    }) && (a += 1), _(r.waits).any(function (r) {
                        return -1 !== _(t.forks).indexOf(r)
                    }) ? n += 1 : void 0
                }), 0 === a && 1 >= n ? (delete t.__graph_waits[e], t["__graph_" + r.to](r.frame_id)) : void 0
            }
        }(this)), this.__graph_processes ? this.__graph_processes.on_tick_end() : void 0
    }, Card.Script3927.Script3927.prototype.__graph_helper__create_frame = function (_) {
        var t;
        return null == _ && (_ = null), t = _ ? {
            forks: this.__graph_helper__clone_obj(_.forks),
            state: this.__graph_helper__prepare_state(_.state),
            stack: this.__graph_helper__clone_obj(_.stack),
            vars: this.__graph_helper__clone_obj(_.vars),
            current_step: null,
            current_step_name: null,
            current_timeouts: [],
            current_objecs_with_animation: {},
            attaches: []
        } : {
            forks: [],
            state: {place: this.place, tutor: this.tutor, salt: this.salt},
            stack: [],
            vars: [],
            current_step: null,
            current_step_name: null,
            current_timeouts: [],
            current_objecs_with_animation: {},
            attaches: []
        }, this.__graph_frames["#" + (this.__graph_last_frame_id += 1)] = t, t.id = "#" + this.__graph_last_frame_id, this.__graph_processes && this.__graph_processes.on_new_frame(_, "#" + this.__graph_last_frame_id), "#" + this.__graph_last_frame_id
    }, Card.Script3927.Script3927.prototype.__graph_helper__clone_state = function (t) {
        var r;
        return r = {place: t.place, tutor: t.tutor, salt: t.salt}, _(t).each(function (_) {
            return function (t, e) {
                return "place" !== e && "tutor" !== e && "salt" !== e ? r[e] = _.__graph_helper__clone_obj(t) : void 0
            }
        }(this)), r
    }, Card.Script3927.Script3927.prototype.__graph_helper__clone_state2 = function (t) {
        var r;
        return r = {place: t.place, tutor: t.tutor, salt: t.salt}, _(t).each(function () {
            return function (_, t) {
                return "place" !== t && "tutor" !== t && "salt" !== t ? r[t] = _ : void 0
            }
        }(this)), r
    }, Card.Script3927.Script3927.prototype.__graph_helper__clone_obj = function (t) {
        var r;
        return t instanceof jQuery ? t : _.isArray(t) ? _(t).map(function (_) {
            return function (t) {
                return _.__graph_helper__clone_obj(t)
            }
        }(this)) : _.isObject(t) ? (r = {}, _(t).each(function (_) {
            return function (t, e) {
                return r[e] = _.__graph_helper__clone_obj(t)
            }
        }(this)), r) : t
    }, Card.Script3927.Script3927.prototype.__graph_helper__begin_step = function (_) {
        var t;
        return (t = this.__graph_tick_steps)[_] || (t[_] = 0), this.__graph_tick_steps[_] += 1
    }, Card.Script3927.Script3927.prototype.__graph_helper__end_step = function (t) {
        return this.__graph_tick_steps[t] -= 1, 0 === this.__graph_tick_steps[t] && delete this.__graph_tick_steps[t], 0 === _(this.__graph_tick_steps).size() ? (this.__graph_tick += 1, this.__graph_helper__subscribtion_on_tick_end()) : void 0
    }, Card.Script3927.Script3927.prototype.__graph_helper__add_wait = function (t, r, e, n) {
        return this.__graph_waits["#" + (this.__graph_last_wait_id += 1)] = {
            frame_id: t, ids: _(r).map(function () {
                return function (_) {
                    return _.attr("id")
                }
            }(this)), waits: e, to: n
        }
    }, Card.Script3927.Script3927.prototype.__graph_helper__wait = function (t) {
        return !_.chain(this.__graph_waits).values().any(function () {
            return function (_) {
                return _.frame_id === t
            }
        }(this)).value() && (delete this.__graph_frames[t], this.__graph_processes) ? this.__graph_processes.on_finish_frame(t) : void 0
    }, Card.Script3927.Script3927.prototype.__graph_log = function (t, r) {
        var e, n;
        return n = ((new Date).getTime() / 1e3 - this.__start).toFixed(1), e = _(this.__graph_frames).keys().length, this.__graph_processes ? this.__graph_processes.on_frame_event(t, n, this.__graph_tick, r) : void 0
    }, Card.Script3927.Script3927.prototype.__graph__set_uniq_id = function (_) {
        return _.attr("id") ? void 0 : _.attr("id", "sprite_" + (this.__graph_next_sprite_id += 1))
    }, Card.Script3927.Script3927.prototype.__check_and_init_objs = function (t, r, e) {
        var n;
        return n = [], _(r).each(function (r) {
            return function (a) {
                var i;
                if ("." === a[0]) return r.place.find(a).each(function (_, t) {
                    return n.push($(t))
                });
                if (i = "@" === a[0] ? a.slice(1, a.length) : a, e[i]) {
                    if (e[i] instanceof jQuery) return e[i].each(function (_, t) {
                        return n.push($(t))
                    });
                    if (_.isArray(e[i]) && _(e[i]).every(function (_) {
                        return _ instanceof jQuery
                    })) return _(e[i]).each(function (_) {
                        return _.each(function (_, t) {
                            return n.push($(t))
                        })
                    });
                    throw"[" + t + "] please pass only jquery objects or arrays from jquery objects"
                }
                throw"[" + t + "] undefined state variable " + a
            }
        }(this)), _(n).each(function (_) {
            return function (t) {
                return _.__graph__set_uniq_id(t)
            }
        }(this)), n
    }, Card.Script3927.Script3927.SBS["graph.script_3927"] = "[graph] script_3927", Card.Script3927.Script3927.prototype.__graph_script_3927 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("script_3927"), n = function (_) {
            return function () {
                return _.__graph___func_1(t)
            }
        }(this), this.script_3927 ? (this.__graph_log(t, "graph: script_3927"), this.tutor.event("graph.script_3927"), this.__graph_frames[t].current_step = "script_3927", this.__graph_frames[t].current_step_name = "script_3927", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`script_3927`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("script_3927"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`script_3927`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("script_3927")
            }
        }(this), this.script_3927.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: script_3927"), n()), this.__graph_helper__end_step("script_3927")
    }, Card.Script3927.Script3927.prototype.script_3927_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.prototype.__graph___func_1 = function (t) {
        return this.__graph_frames[t].stack.push("__noop__"), this.__graph_frames[t].vars.push(_.keys(this.__graph_frames[t].state)), this.__graph___func_1__font(t)
    }, Card.Script3927.Script3927.SBS["graph.__func_1.font"] = "[graph]  подключаем шрифт", Card.Script3927.Script3927.prototype.__graph___func_1__font = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__font"), n = function (_) {
            return function () {
                return _.__graph___func_1__restore(t)
            }
        }(this), this.__func_1__font ? (this.__graph_log(t, "graph: __func_1.font"), this.tutor.event("graph.__func_1.font"), this.__graph_frames[t].current_step = "__func_1__font", this.__graph_frames[t].current_step_name = "__func_1.font", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.font`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__font"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.font`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__font")
            }
        }(this), this.__func_1__font.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.font`"), n()), this.__graph_helper__end_step("__func_1__font")
    }, Card.Script3927.Script3927.prototype.__func_1__font_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.restore"] = "[graph]  восстонавливаем данные", Card.Script3927.Script3927.prototype.__graph___func_1__restore = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__restore"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_chocolate_scene(t)
            }
        }(this), this.__func_1__restore ? (this.__graph_log(t, "graph: __func_1.restore"), this.tutor.event("graph.__func_1.restore"), this.__graph_frames[t].current_step = "__func_1__restore", this.__graph_frames[t].current_step_name = "__func_1.restore", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.restore`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__restore"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.restore`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__restore")
            }
        }(this), this.__func_1__restore.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.restore`"), n()), this.__graph_helper__end_step("__func_1__restore")
    }, Card.Script3927.Script3927.prototype.__func_1__restore_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_chocolate_scene"] = "[graph]  отрисовка сцены для шоколадок", Card.Script3927.Script3927.prototype.__graph___func_1__render_chocolate_scene = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_chocolate_scene"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_chocolates(t)
            }
        }(this), this.__func_1__render_chocolate_scene ? (this.__graph_log(t, "graph: __func_1.render_chocolate_scene"), this.tutor.event("graph.__func_1.render_chocolate_scene"), this.__graph_frames[t].current_step = "__func_1__render_chocolate_scene", this.__graph_frames[t].current_step_name = "__func_1.render_chocolate_scene", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_chocolate_scene`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_chocolate_scene"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_chocolate_scene`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_chocolate_scene")
            }
        }(this), this.__func_1__render_chocolate_scene.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_chocolate_scene`"), n()), this.__graph_helper__end_step("__func_1__render_chocolate_scene")
    }, Card.Script3927.Script3927.prototype.__func_1__render_chocolate_scene_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_chocolates"] = "[graph]  отрисовка всех шоколадок", Card.Script3927.Script3927.prototype.__graph___func_1__render_chocolates = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_chocolates"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_primary_scene(t)
            }
        }(this), this.__func_1__render_chocolates ? (this.__graph_log(t, "graph: __func_1.render_chocolates"), this.tutor.event("graph.__func_1.render_chocolates"), this.__graph_frames[t].current_step = "__func_1__render_chocolates", this.__graph_frames[t].current_step_name = "__func_1.render_chocolates", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_chocolates`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_chocolates"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_chocolates`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_chocolates")
            }
        }(this), this.__func_1__render_chocolates.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_chocolates`"), n()), this.__graph_helper__end_step("__func_1__render_chocolates")
    }, Card.Script3927.Script3927.prototype.__func_1__render_chocolates_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_primary_scene"] = "[graph]  отрисовка начальной сцены", Card.Script3927.Script3927.prototype.__graph___func_1__render_primary_scene = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_primary_scene"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_final_scene(t)
            }
        }(this), this.__func_1__render_primary_scene ? (this.__graph_log(t, "graph: __func_1.render_primary_scene"), this.tutor.event("graph.__func_1.render_primary_scene"), this.__graph_frames[t].current_step = "__func_1__render_primary_scene", this.__graph_frames[t].current_step_name = "__func_1.render_primary_scene", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_primary_scene`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_primary_scene"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_primary_scene`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_primary_scene")
            }
        }(this), this.__func_1__render_primary_scene.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_primary_scene`"), n()), this.__graph_helper__end_step("__func_1__render_primary_scene")
    }, Card.Script3927.Script3927.prototype.__func_1__render_primary_scene_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_final_scene"] = "[graph]  отрисовка финальной сцены", Card.Script3927.Script3927.prototype.__graph___func_1__render_final_scene = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_final_scene"), n = function (_) {
            return function () {
                return _.__graph___func_1__primary_scene_update(t)
            }
        }(this), this.__func_1__render_final_scene ? (this.__graph_log(t, "graph: __func_1.render_final_scene"), this.tutor.event("graph.__func_1.render_final_scene"), this.__graph_frames[t].current_step = "__func_1__render_final_scene", this.__graph_frames[t].current_step_name = "__func_1.render_final_scene", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_final_scene`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_final_scene"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_final_scene`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_final_scene")
            }
        }(this), this.__func_1__render_final_scene.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_final_scene`"), n()), this.__graph_helper__end_step("__func_1__render_final_scene")
    }, Card.Script3927.Script3927.prototype.__func_1__render_final_scene_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.primary_scene_update"] = "[graph]  обновляем состояние главной сцены", Card.Script3927.Script3927.prototype.__graph___func_1__primary_scene_update = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__primary_scene_update"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeIn(t)
            }
        }(this), this.__func_1__primary_scene_update ? (this.__graph_log(t, "graph: __func_1.primary_scene_update"), this.tutor.event("graph.__func_1.primary_scene_update"), this.__graph_frames[t].current_step = "__func_1__primary_scene_update", this.__graph_frames[t].current_step_name = "__func_1.primary_scene_update", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.primary_scene_update`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__primary_scene_update"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.primary_scene_update`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__primary_scene_update")
            }
        }(this), this.__func_1__primary_scene_update.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.primary_scene_update`"), n()), this.__graph_helper__end_step("__func_1__primary_scene_update")
    }, Card.Script3927.Script3927.prototype.__func_1__primary_scene_update_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_fadeIn"] = "[graph]  появляем текущую сцену", Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_fadeIn = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_fadeIn"), n = function (_) {
            return function () {
                return _.__graph___func_1__store(t)
            }
        }(this), this.__func_1__current_scene_fadeIn ? (this.__graph_log(t, "graph: __func_1.current_scene_fadeIn"), this.tutor.event("graph.__func_1.current_scene_fadeIn"), this.__graph_frames[t].current_step = "__func_1__current_scene_fadeIn", this.__graph_frames[t].current_step_name = "__func_1.current_scene_fadeIn", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_fadeIn`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_fadeIn"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_fadeIn`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_fadeIn")
            }
        }(this), this.__func_1__current_scene_fadeIn.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_fadeIn`"), n()), this.__graph_helper__end_step("__func_1__current_scene_fadeIn")
    }, Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeIn_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.store"] = "[graph]  сохраняем данные", Card.Script3927.Script3927.prototype.__graph___func_1__store = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__store"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_clickables(t)
            }
        }(this), this.__func_1__store ? (this.__graph_log(t, "graph: __func_1.store"), this.tutor.event("graph.__func_1.store"), this.__graph_frames[t].current_step = "__func_1__store", this.__graph_frames[t].current_step_name = "__func_1.store", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.store`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__store"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.store`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__store")
            }
        }(this), this.__func_1__store.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.store`"), n()), this.__graph_helper__end_step("__func_1__store")
    }, Card.Script3927.Script3927.prototype.__func_1__store_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_clickables"] = "[graph] render_clickables", Card.Script3927.Script3927.prototype.__graph___func_1__render_clickables = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_clickables"), n = function (_) {
            return function () {
                return _.__graph___func_1__identify_device(t)
            }
        }(this), this.__func_1__render_clickables ? (this.__graph_log(t, "graph: __func_1.render_clickables"), this.tutor.event("graph.__func_1.render_clickables"), this.__graph_frames[t].current_step = "__func_1__render_clickables", this.__graph_frames[t].current_step_name = "__func_1.render_clickables", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_clickables`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_clickables"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_clickables`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_clickables")
            }
        }(this), this.__func_1__render_clickables.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_clickables`"), n()), this.__graph_helper__end_step("__func_1__render_clickables")
    }, Card.Script3927.Script3927.prototype.__func_1__render_clickables_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.identify_device"] = "[graph]  что за устройство", Card.Script3927.Script3927.prototype.__graph___func_1__identify_device = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__identify_device"), n = function (r) {
            return function (e) {
                var n, a, i, s, o;
                return console.log("`__func_1.identify_device` => " + e.join(", ")), i = [["touch", !1, "__func_1__main_click2"], ["mouse", !1, "__func_1__pre_fork"]], o = _(i).filter(function (t) {
                    return -1 !== _(e).indexOf(t[0])
                }), o.length > 1 ? (n = r.__graph_frames[t], s = [], _(o).each(function (_) {
                    var t;
                    return t = r.__graph_helper__create_frame(n), s.push({
                        frame_id: t,
                        method: "__graph_" + _[2],
                        error: _[1]
                    })
                }), r.__graph_log(t, "light fork [" + e.join(", ") + "] => " + s.map(function (_) {
                    return _.frame_id
                }).join(", ")), r.__graph_helper__wait(t), _(s).each(function (_) {
                    return _.error && r.tutor.wrong("graph.wrong"), r[_.method](_.frame_id)
                })) : 1 === o.length ? (a = o[0], a[1] && r.tutor.wrong("graph.wrong"), r["__graph_" + a[2]](t)) : r.__graph_helper__wait(t)
            }
        }(this), this.__func_1__identify_device ? (this.__graph_log(t, "graph: __func_1.identify_device"), this.tutor.event("graph.__func_1.identify_device"), this.__graph_frames[t].current_step = "__func_1__identify_device", this.__graph_frames[t].current_step_name = "__func_1.identify_device", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.identify_device`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__identify_device"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.identify_device`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__identify_device")
            }
        }(this), this.__func_1__identify_device.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.identify_device`"), n()), this.__graph_helper__end_step("__func_1__identify_device")
    }, Card.Script3927.Script3927.prototype.__func_1__identify_device_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.main_click2"] = "[graph] click(clickables)", Card.Script3927.Script3927.prototype.__graph___func_1__main_click2 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__main_click2"), n = function (_) {
            return function () {
                return _.__graph___func_1__is_clickable(t)
            }
        }(this), this.__func_1__main_click2 ? (this.__graph_log(t, "graph: __func_1.click(clickables)"), this.tutor.event("graph.__func_1.main_click2"), this.__graph_frames[t].current_step = "__func_1__main_click2", this.__graph_frames[t].current_step_name = "__func_1.click(clickables)", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.click(clickables)`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__main_click2"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.click(clickables)`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__main_click2")
            }
        }(this), this.__func_1__main_click2.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.click(clickables)`"), n()), this.__graph_helper__end_step("__func_1__main_click2")
    }, Card.Script3927.Script3927.prototype.__func_1__main_click2 = function (t, r) {
        return this.__objs = r.__check_and_init_objs("CLICK", ["clickables"], this), this.obj = null, this.event = null, this.action = null, _(this.__objs).each(function (r) {
            return function (e) {
                return e.addClass("pointerhand clickable").on(Card.Script3927.buttonDown(), function (n) {
                    var a, i, s, o, c, h;
                    return _(r.__objs).each(function (_) {
                        return _.removeClass("pointerhand clickable").off(Card.Script3927.buttonDown())
                    }), r.action = "click", r.obj = e, r.event = {
                        pageX: n.pageX || (null != (a = n.originalEvent) ? null != (i = a.touches) ? null != (s = i[0]) ? s.pageX : void 0 : void 0 : void 0),
                        pageY: n.pageY || (null != (o = n.originalEvent) ? null != (c = o.touches) ? null != (h = c[0]) ? h.pageY : void 0 : void 0 : void 0),
                        target: $(n.target)
                    }, t()
                })
            }
        }(this))
    }, Card.Script3927.Script3927.prototype.__func_1__main_click2_on_term = function () {
        return _(this.__objs).each(function () {
            return function (_) {
                return _.removeClass("pointerhand clickable").off(Card.Script3927.buttonDown())
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.is_clickable"] = "[graph]  элемент кликабельный?", Card.Script3927.Script3927.prototype.__graph___func_1__is_clickable = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__is_clickable"), n = function (r) {
            return function (e) {
                var n, a, i, s, o;
                return console.log("`__func_1.is_clickable` => " + e.join(", ")), i = [["no", !1, "__func_1__identify_device"], ["yes", !1, "__func_1__classify_obj"]], o = _(i).filter(function (t) {
                    return -1 !== _(e).indexOf(t[0])
                }), o.length > 1 ? (n = r.__graph_frames[t], s = [], _(o).each(function (_) {
                    var t;
                    return t = r.__graph_helper__create_frame(n), s.push({
                        frame_id: t,
                        method: "__graph_" + _[2],
                        error: _[1]
                    })
                }), r.__graph_log(t, "light fork [" + e.join(", ") + "] => " + s.map(function (_) {
                    return _.frame_id
                }).join(", ")), r.__graph_helper__wait(t), _(s).each(function (_) {
                    return _.error && r.tutor.wrong("graph.wrong"), r[_.method](_.frame_id)
                })) : 1 === o.length ? (a = o[0], a[1] && r.tutor.wrong("graph.wrong"), r["__graph_" + a[2]](t)) : r.__graph_helper__wait(t)
            }
        }(this), this.__func_1__is_clickable ? (this.__graph_log(t, "graph: __func_1.is_clickable"), this.tutor.event("graph.__func_1.is_clickable"), this.__graph_frames[t].current_step = "__func_1__is_clickable", this.__graph_frames[t].current_step_name = "__func_1.is_clickable", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.is_clickable`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__is_clickable"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.is_clickable`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__is_clickable")
            }
        }(this), this.__func_1__is_clickable.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.is_clickable`"), n()), this.__graph_helper__end_step("__func_1__is_clickable")
    }, Card.Script3927.Script3927.prototype.__func_1__is_clickable_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.pre_fork"] = "[graph]  подготовка к fork'у", Card.Script3927.Script3927.prototype.__graph___func_1__pre_fork = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__pre_fork"), n = function (_) {
            return function () {
                return _.__graph___func_1____func_fork_1(t)
            }
        }(this), this.__func_1__pre_fork ? (this.__graph_log(t, "graph: __func_1.pre_fork"), this.tutor.event("graph.__func_1.pre_fork"), this.__graph_frames[t].current_step = "__func_1__pre_fork", this.__graph_frames[t].current_step_name = "__func_1.pre_fork", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.pre_fork`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__pre_fork"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.pre_fork`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__pre_fork")
            }
        }(this), this.__func_1__pre_fork.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.pre_fork`"), n()), this.__graph_helper__end_step("__func_1__pre_fork")
    }, Card.Script3927.Script3927.prototype.__func_1__pre_fork_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.prototype.__graph___func_1____func_fork_1 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1____func_fork_1"), r = this.__graph_frames[t], n = [], e = this.__graph_helper__create_frame(r), this.__graph_frames[e].forks = _.uniq(this.__graph_frames[e].forks.concat("__func_1.__func_fork_1")), n.push({
            frame_id: e,
            method: "__graph___func_1__main_click"
        }), e = this.__graph_helper__create_frame(r), this.__graph_frames[e].forks = _.uniq(this.__graph_frames[e].forks.concat("__func_1.__func_fork_1")), n.push({
            frame_id: e,
            method: "__graph___func_1__hoverOn"
        }), this.__graph_log(t, "graph: __func_1.fork(1) => " + n.map(function () {
            return function (_) {
                return _.frame_id
            }
        }(this)).join(", ")), this.__graph_helper__wait(t), _(n).each(function (_) {
            return function (t) {
                return _[t.method](t.frame_id)
            }
        }(this)), this.__graph_helper__end_step("__func_1____func_fork_1")
    }, Card.Script3927.Script3927.SBS["graph.__func_1.main_click"] = "[graph] click(clickables)", Card.Script3927.Script3927.prototype.__graph___func_1__main_click = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__main_click"), n = function (_) {
            return function () {
                return _.__graph___func_1____func_join_1(t)
            }
        }(this), this.__func_1__main_click ? (this.__graph_log(t, "graph: __func_1.click(clickables)"), this.tutor.event("graph.__func_1.main_click"), this.__graph_frames[t].current_step = "__func_1__main_click", this.__graph_frames[t].current_step_name = "__func_1.click(clickables)", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.click(clickables)`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__main_click"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.click(clickables)`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__main_click")
            }
        }(this), this.__func_1__main_click.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.click(clickables)`"), n()), this.__graph_helper__end_step("__func_1__main_click")
    }, Card.Script3927.Script3927.prototype.__func_1__main_click = function (t, r) {
        return this.__objs = r.__check_and_init_objs("CLICK", ["clickables"], this), this.obj = null, this.event = null, this.action = null, _(this.__objs).each(function (r) {
            return function (e) {
                return e.addClass("pointerhand clickable").on(Card.Script3927.buttonDown(), function (n) {
                    var a, i, s, o, c, h;
                    return _(r.__objs).each(function (_) {
                        return _.removeClass("pointerhand clickable").off(Card.Script3927.buttonDown())
                    }), r.action = "click", r.obj = e, r.event = {
                        pageX: n.pageX || (null != (a = n.originalEvent) ? null != (i = a.touches) ? null != (s = i[0]) ? s.pageX : void 0 : void 0 : void 0),
                        pageY: n.pageY || (null != (o = n.originalEvent) ? null != (c = o.touches) ? null != (h = c[0]) ? h.pageY : void 0 : void 0 : void 0),
                        target: $(n.target)
                    }, t()
                })
            }
        }(this))
    }, Card.Script3927.Script3927.prototype.__func_1__main_click_on_term = function () {
        return _(this.__objs).each(function () {
            return function (_) {
                return _.removeClass("pointerhand clickable").off(Card.Script3927.buttonDown())
            }
        }(this))
    }, Card.Script3927.Script3927.prototype.__graph___func_1____func_join_1 = function (t) {
        var r, e;
        return this.__graph_helper__begin_step("__func_1____func_join_1"), r = "__func_1.__func_fork_1", e = [], _(this.__graph_frames).each(function (n) {
            return function (a, i) {
                return i !== t && -1 !== _(a.forks).indexOf(r) ? (a.current_step && (n.__graph_log(i, "`" + a.current_step_name + "` termed by " + t), e.push(i), n["" + a.current_step + "_on_term"] && n["" + a.current_step + "_on_term"].call(a.state, n, i)), n.__graph_helper__wait(i)) : void 0
            }
        }(this)), this.__graph_frames[t].forks = _(this.__graph_frames[t].forks).without(r), this.__graph_log(t, "termed: " + e.join(", ")), this.__graph_log(t, "graph: __func_1.join(1)"), this.__graph___func_1__hoverOff(t), this.__graph_helper__end_step("__func_1____func_join_1")
    }, Card.Script3927.Script3927.SBS["graph.__func_1.hoverOn"] = "[graph]  навешиваем ховер", Card.Script3927.Script3927.prototype.__graph___func_1__hoverOn = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__hoverOn"), n = function (_) {
            return function () {
                return _.__graph___func_1____func_join_1(t)
            }
        }(this), this.__func_1__hoverOn ? (this.__graph_log(t, "graph: __func_1.hoverOn"), this.tutor.event("graph.__func_1.hoverOn"), this.__graph_frames[t].current_step = "__func_1__hoverOn", this.__graph_frames[t].current_step_name = "__func_1.hoverOn", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.hoverOn`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__hoverOn"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.hoverOn`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__hoverOn")
            }
        }(this), this.__func_1__hoverOn.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.hoverOn`"), n()), this.__graph_helper__end_step("__func_1__hoverOn")
    }, Card.Script3927.Script3927.prototype.__func_1__hoverOn_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.hoverOff"] = "[graph]  снимаем ховер", Card.Script3927.Script3927.prototype.__graph___func_1__hoverOff = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__hoverOff"), n = function (_) {
            return function () {
                return _.__graph___func_1__is_clickable(t)
            }
        }(this), this.__func_1__hoverOff ? (this.__graph_log(t, "graph: __func_1.hoverOff"), this.tutor.event("graph.__func_1.hoverOff"), this.__graph_frames[t].current_step = "__func_1__hoverOff", this.__graph_frames[t].current_step_name = "__func_1.hoverOff", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.hoverOff`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__hoverOff"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.hoverOff`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__hoverOff")
            }
        }(this), this.__func_1__hoverOff.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.hoverOff`"), n()), this.__graph_helper__end_step("__func_1__hoverOff")
    }, Card.Script3927.Script3927.prototype.__func_1__hoverOff_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.classify_obj"] = "[graph]  классифицируем объект", Card.Script3927.Script3927.prototype.__graph___func_1__classify_obj = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__classify_obj"), n = function (r) {
            return function (e) {
                var n, a, i, s, o;
                return console.log("`__func_1.classify_obj` => " + e.join(", ")), i = [["done", !1, "__func_1__obj_hide"], ["save", !1, "__func_1__store_2"], ["restart", !1, "__func_1__current_scene_data_clear"], ["chocolate", !1, "__func_1__current_scene_fadeOut_2"], ["point", !1, "__func_1__update_current_scene_data"], ["exit", !1, "__func_1__obj_hide_2"], ["try_again", !1, "__func_1__obj_hide_3"]], o = _(i).filter(function (t) {
                    return -1 !== _(e).indexOf(t[0])
                }), o.length > 1 ? (n = r.__graph_frames[t], s = [], _(o).each(function (_) {
                    var t;
                    return t = r.__graph_helper__create_frame(n), s.push({
                        frame_id: t,
                        method: "__graph_" + _[2],
                        error: _[1]
                    })
                }), r.__graph_log(t, "light fork [" + e.join(", ") + "] => " + s.map(function (_) {
                    return _.frame_id
                }).join(", ")), r.__graph_helper__wait(t), _(s).each(function (_) {
                    return _.error && r.tutor.wrong("graph.wrong"), r[_.method](_.frame_id)
                })) : 1 === o.length ? (a = o[0], a[1] && r.tutor.wrong("graph.wrong"), r["__graph_" + a[2]](t)) : r.__graph_helper__wait(t)
            }
        }(this), this.__func_1__classify_obj ? (this.__graph_log(t, "graph: __func_1.classify_obj"), this.tutor.event("graph.__func_1.classify_obj"), this.__graph_frames[t].current_step = "__func_1__classify_obj", this.__graph_frames[t].current_step_name = "__func_1.classify_obj", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.classify_obj`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__classify_obj"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.classify_obj`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__classify_obj")
            }
        }(this), this.__func_1__classify_obj.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.classify_obj`"), n()), this.__graph_helper__end_step("__func_1__classify_obj")
    }, Card.Script3927.Script3927.prototype.__func_1__classify_obj_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.obj_hide"] = "[graph]  скрываем кнопку", Card.Script3927.Script3927.prototype.__graph___func_1__obj_hide = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__obj_hide"), n = function (_) {
            return function () {
                return _.__graph___func_1__validate_answer(t)
            }
        }(this), this.__func_1__obj_hide ? (this.__graph_log(t, "graph: __func_1.obj_hide"), this.tutor.event("graph.__func_1.obj_hide"), this.__graph_frames[t].current_step = "__func_1__obj_hide", this.__graph_frames[t].current_step_name = "__func_1.obj_hide", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.obj_hide`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__obj_hide"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.obj_hide`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__obj_hide")
            }
        }(this), this.__func_1__obj_hide.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.obj_hide`"), n()), this.__graph_helper__end_step("__func_1__obj_hide")
    }, Card.Script3927.Script3927.prototype.__func_1__obj_hide_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.validate_answer"] = "[graph]  валидация ответа", Card.Script3927.Script3927.prototype.__graph___func_1__validate_answer = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__validate_answer"), n = function (_) {
            return function () {
                return _.__graph___func_1__render_final_btns_n_text(t)
            }
        }(this), this.__func_1__validate_answer ? (this.__graph_log(t, "graph: __func_1.validate_answer"), this.tutor.event("graph.__func_1.validate_answer"), this.__graph_frames[t].current_step = "__func_1__validate_answer", this.__graph_frames[t].current_step_name = "__func_1.validate_answer", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.validate_answer`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__validate_answer"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.validate_answer`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__validate_answer")
            }
        }(this), this.__func_1__validate_answer.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.validate_answer`"), n()), this.__graph_helper__end_step("__func_1__validate_answer")
    }, Card.Script3927.Script3927.prototype.__func_1__validate_answer_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.render_final_btns_n_text"] = "[graph]  рендер кнопок и текста", Card.Script3927.Script3927.prototype.__graph___func_1__render_final_btns_n_text = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__render_final_btns_n_text"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeOut_4(t)
            }
        }(this), this.__func_1__render_final_btns_n_text ? (this.__graph_log(t, "graph: __func_1.render_final_btns_n_text"), this.tutor.event("graph.__func_1.render_final_btns_n_text"), this.__graph_frames[t].current_step = "__func_1__render_final_btns_n_text", this.__graph_frames[t].current_step_name = "__func_1.render_final_btns_n_text", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.render_final_btns_n_text`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__render_final_btns_n_text"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.render_final_btns_n_text`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__render_final_btns_n_text")
            }
        }(this), this.__func_1__render_final_btns_n_text.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.render_final_btns_n_text`"), n()), this.__graph_helper__end_step("__func_1__render_final_btns_n_text")
    }, Card.Script3927.Script3927.prototype.__func_1__render_final_btns_n_text_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_fadeOut_4"] = "[graph] current_scene_fadeOut_4", Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_fadeOut_4 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_fadeOut_4"), n = function (_) {
            return function () {
                return _.__graph___func_1__choose_final(t)
            }
        }(this), this.__func_1__current_scene_fadeOut ? (this.__graph_log(t, "graph: __func_1.current_scene_fadeOut"), this.tutor.event("graph.__func_1.current_scene_fadeOut_4"), this.__graph_frames[t].current_step = "__func_1__current_scene_fadeOut_4", this.__graph_frames[t].current_step_name = "__func_1.current_scene_fadeOut_4", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_fadeOut_4`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_fadeOut_4"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_fadeOut_4`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_fadeOut_4")
            }
        }(this), this.__func_1__current_scene_fadeOut.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_fadeOut_4`"), n()), this.__graph_helper__end_step("__func_1__current_scene_fadeOut_4")
    }, Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeOut_4_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.choose_final"] = "[graph]  на финальную сцену", Card.Script3927.Script3927.prototype.__graph___func_1__choose_final = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__choose_final"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeIn(t)
            }
        }(this), this.__func_1__choose_final ? (this.__graph_log(t, "graph: __func_1.choose_final"), this.tutor.event("graph.__func_1.choose_final"), this.__graph_frames[t].current_step = "__func_1__choose_final", this.__graph_frames[t].current_step_name = "__func_1.choose_final", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.choose_final`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__choose_final"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.choose_final`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__choose_final")
            }
        }(this), this.__func_1__choose_final.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.choose_final`"), n()), this.__graph_helper__end_step("__func_1__choose_final")
    }, Card.Script3927.Script3927.prototype.__func_1__choose_final_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.store_2"] = "[graph] store_2", Card.Script3927.Script3927.prototype.__graph___func_1__store_2 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__store_2"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeOut(t)
            }
        }(this), this.__func_1__store ? (this.__graph_log(t, "graph: __func_1.store"), this.tutor.event("graph.__func_1.store_2"), this.__graph_frames[t].current_step = "__func_1__store_2", this.__graph_frames[t].current_step_name = "__func_1.store_2", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.store_2`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__store_2"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.store_2`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__store_2")
            }
        }(this), this.__func_1__store.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.store_2`"), n()), this.__graph_helper__end_step("__func_1__store_2")
    }, Card.Script3927.Script3927.prototype.__func_1__store_2_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    }, Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_fadeOut"] = "[graph]  исчезаем текущую сцену",Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_fadeOut = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_fadeOut"), n = function (_) {
            return function () {
                return _.__graph___func_1__hide_chocolate(t)
            }
        }(this), this.__func_1__current_scene_fadeOut ? (this.__graph_log(t, "graph: __func_1.current_scene_fadeOut"), this.tutor.event("graph.__func_1.current_scene_fadeOut"), this.__graph_frames[t].current_step = "__func_1__current_scene_fadeOut", this.__graph_frames[t].current_step_name = "__func_1.current_scene_fadeOut", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_fadeOut`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_fadeOut"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_fadeOut`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_fadeOut")
            }
        }(this), this.__func_1__current_scene_fadeOut.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_fadeOut`"), n()), this.__graph_helper__end_step("__func_1__current_scene_fadeOut")
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeOut_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.hide_chocolate"] = "[graph]  скрываем шоколадку",Card.Script3927.Script3927.prototype.__graph___func_1__hide_chocolate = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__hide_chocolate"), n = function (_) {
            return function () {
                return _.__graph___func_1__primary_scene_update(t)
            }
        }(this), this.__func_1__hide_chocolate ? (this.__graph_log(t, "graph: __func_1.hide_chocolate"), this.tutor.event("graph.__func_1.hide_chocolate"), this.__graph_frames[t].current_step = "__func_1__hide_chocolate", this.__graph_frames[t].current_step_name = "__func_1.hide_chocolate", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.hide_chocolate`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__hide_chocolate"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.hide_chocolate`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__hide_chocolate")
            }
        }(this), this.__func_1__hide_chocolate.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.hide_chocolate`"), n()), this.__graph_helper__end_step("__func_1__hide_chocolate")
    },Card.Script3927.Script3927.prototype.__func_1__hide_chocolate_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_data_clear"] = "[graph]  очищаем данные текущей сцены",Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_data_clear = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_data_clear"), n = function (_) {
            return function () {
                return _.__graph___func_1__store(t)
            }
        }(this), this.__func_1__current_scene_data_clear ? (this.__graph_log(t, "graph: __func_1.current_scene_data_clear"), this.tutor.event("graph.__func_1.current_scene_data_clear"), this.__graph_frames[t].current_step = "__func_1__current_scene_data_clear", this.__graph_frames[t].current_step_name = "__func_1.current_scene_data_clear", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_data_clear`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_data_clear"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_data_clear`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_data_clear")
            }
        }(this), this.__func_1__current_scene_data_clear.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_data_clear`"), n()), this.__graph_helper__end_step("__func_1__current_scene_data_clear")
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_data_clear_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_fadeOut_2"] = "[graph] current_scene_fadeOut_2",Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_fadeOut_2 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_fadeOut_2"), n = function (_) {
            return function () {
                return _.__graph___func_1__choose_chocolate(t)
            }
        }(this), this.__func_1__current_scene_fadeOut ? (this.__graph_log(t, "graph: __func_1.current_scene_fadeOut"), this.tutor.event("graph.__func_1.current_scene_fadeOut_2"), this.__graph_frames[t].current_step = "__func_1__current_scene_fadeOut_2", this.__graph_frames[t].current_step_name = "__func_1.current_scene_fadeOut_2", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_fadeOut_2`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_fadeOut_2"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_fadeOut_2`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_fadeOut_2")
            }
        }(this), this.__func_1__current_scene_fadeOut.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_fadeOut_2`"), n()), this.__graph_helper__end_step("__func_1__current_scene_fadeOut_2")
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeOut_2_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.choose_chocolate"] = "[graph]  выбираем нужную шоколадку",Card.Script3927.Script3927.prototype.__graph___func_1__choose_chocolate = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__choose_chocolate"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeIn(t)
            }
        }(this), this.__func_1__choose_chocolate ? (this.__graph_log(t, "graph: __func_1.choose_chocolate"), this.tutor.event("graph.__func_1.choose_chocolate"), this.__graph_frames[t].current_step = "__func_1__choose_chocolate", this.__graph_frames[t].current_step_name = "__func_1.choose_chocolate", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.choose_chocolate`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__choose_chocolate"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.choose_chocolate`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__choose_chocolate")
            }
        }(this), this.__func_1__choose_chocolate.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.choose_chocolate`"), n()), this.__graph_helper__end_step("__func_1__choose_chocolate")
    },Card.Script3927.Script3927.prototype.__func_1__choose_chocolate_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.update_current_scene_data"] = "[graph]  обновляем данные текущей сцены",Card.Script3927.Script3927.prototype.__graph___func_1__update_current_scene_data = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__update_current_scene_data"), n = function (_) {
            return function () {
                return _.__graph___func_1__store(t)
            }
        }(this), this.__func_1__update_current_scene_data ? (this.__graph_log(t, "graph: __func_1.update_current_scene_data"), this.tutor.event("graph.__func_1.update_current_scene_data"), this.__graph_frames[t].current_step = "__func_1__update_current_scene_data", this.__graph_frames[t].current_step_name = "__func_1.update_current_scene_data", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.update_current_scene_data`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__update_current_scene_data"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.update_current_scene_data`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__update_current_scene_data")
            }
        }(this), this.__func_1__update_current_scene_data.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.update_current_scene_data`"), n()), this.__graph_helper__end_step("__func_1__update_current_scene_data")
    },Card.Script3927.Script3927.prototype.__func_1__update_current_scene_data_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.obj_hide_2"] = "[graph]  скрываем кнопку",Card.Script3927.Script3927.prototype.__graph___func_1__obj_hide_2 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__obj_hide_2"), n = function (_) {
            return function () {
                return _.__graph___func_1__the_end(t)
            }
        }(this), this.__func_1__obj_hide ? (this.__graph_log(t, "graph: __func_1.obj_hide"), this.tutor.event("graph.__func_1.obj_hide_2"), this.__graph_frames[t].current_step = "__func_1__obj_hide_2", this.__graph_frames[t].current_step_name = "__func_1.obj_hide_2", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.obj_hide_2`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__obj_hide_2"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.obj_hide_2`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__obj_hide_2")
            }
        }(this), this.__func_1__obj_hide.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.obj_hide_2`"), n()), this.__graph_helper__end_step("__func_1__obj_hide_2")
    },Card.Script3927.Script3927.prototype.__func_1__obj_hide_2_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.the_end"] = "[graph] the_end",Card.Script3927.Script3927.prototype.__graph___func_1__the_end = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__the_end"), n = function (_) {
            return function () {
                return _.__graph_helper__wait(t)
            }
        }(this), this.__func_1__the_end ? (this.__graph_log(t, "graph: __func_1.the_end"), this.tutor.event("graph.__func_1.the_end"), this.__graph_frames[t].current_step = "__func_1__the_end", this.__graph_frames[t].current_step_name = "__func_1.the_end", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.the_end`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__the_end"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.the_end`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__the_end")
            }
        }(this), this.__func_1__the_end.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.the_end`"), n()), this.__graph_helper__end_step("__func_1__the_end")
    },Card.Script3927.Script3927.prototype.__func_1__the_end_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.obj_hide_3"] = "[graph]  скрываем кнопку",Card.Script3927.Script3927.prototype.__graph___func_1__obj_hide_3 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__obj_hide_3"), n = function (_) {
            return function () {
                return _.__graph___func_1__show_hls(t)
            }
        }(this), this.__func_1__obj_hide ? (this.__graph_log(t, "graph: __func_1.obj_hide"), this.tutor.event("graph.__func_1.obj_hide_3"), this.__graph_frames[t].current_step = "__func_1__obj_hide_3", this.__graph_frames[t].current_step_name = "__func_1.obj_hide_3", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.obj_hide_3`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__obj_hide_3"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.obj_hide_3`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__obj_hide_3")
            }
        }(this), this.__func_1__obj_hide.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.obj_hide_3`"), n()), this.__graph_helper__end_step("__func_1__obj_hide_3")
    },Card.Script3927.Script3927.prototype.__func_1__obj_hide_3_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.show_hls"] = "[graph]  активируем подсветки",Card.Script3927.Script3927.prototype.__graph___func_1__show_hls = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__show_hls"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeOut_3(t)
            }
        }(this), this.__func_1__show_hls ? (this.__graph_log(t, "graph: __func_1.show_hls"), this.tutor.event("graph.__func_1.show_hls"), this.__graph_frames[t].current_step = "__func_1__show_hls", this.__graph_frames[t].current_step_name = "__func_1.show_hls", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.show_hls`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__show_hls"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.show_hls`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__show_hls")
            }
        }(this), this.__func_1__show_hls.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.show_hls`"), n()), this.__graph_helper__end_step("__func_1__show_hls")
    },Card.Script3927.Script3927.prototype.__func_1__show_hls_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.current_scene_fadeOut_3"] = "[graph] current_scene_fadeOut_3",Card.Script3927.Script3927.prototype.__graph___func_1__current_scene_fadeOut_3 = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__current_scene_fadeOut_3"), n = function (_) {
            return function () {
                return _.__graph___func_1__choose_primary(t)
            }
        }(this), this.__func_1__current_scene_fadeOut ? (this.__graph_log(t, "graph: __func_1.current_scene_fadeOut"), this.tutor.event("graph.__func_1.current_scene_fadeOut_3"), this.__graph_frames[t].current_step = "__func_1__current_scene_fadeOut_3", this.__graph_frames[t].current_step_name = "__func_1.current_scene_fadeOut_3", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.current_scene_fadeOut_3`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__current_scene_fadeOut_3"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.current_scene_fadeOut_3`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__current_scene_fadeOut_3")
            }
        }(this), this.__func_1__current_scene_fadeOut.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.current_scene_fadeOut_3`"), n()), this.__graph_helper__end_step("__func_1__current_scene_fadeOut_3")
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeOut_3_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.SBS["graph.__func_1.choose_primary"] = "[graph]  на главную сцену",Card.Script3927.Script3927.prototype.__graph___func_1__choose_primary = function (t) {
        var r, e, n;
        return this.__graph_helper__begin_step("__func_1__choose_primary"), n = function (_) {
            return function () {
                return _.__graph___func_1__current_scene_fadeIn(t)
            }
        }(this), this.__func_1__choose_primary ? (this.__graph_log(t, "graph: __func_1.choose_primary"), this.tutor.event("graph.__func_1.choose_primary"), this.__graph_frames[t].current_step = "__func_1__choose_primary", this.__graph_frames[t].current_step_name = "__func_1.choose_primary", e = 0, $.set_long_action_hook && $.set_long_action_hook(function (r) {
            return function (n, a) {
                var i, s;
                if (e > 0) throw"`__func_1.choose_primary`: анимация продолжалась после вызова cb или cb был вызван больше одного раза";
                return "timeout_start" === n ? r.__graph_frames[t].current_timeouts.push(a) : "timeout_end" === n ? r.__graph_frames[t].current_timeouts = _(r.__graph_frames[t].current_timeouts).without(a) : "animation_start" === n ? (r.__graph__set_uniq_id($(a)), (i = r.__graph_frames[t].current_objecs_with_animation)[s = $(a).attr("id")] || (i[s] = 0), r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] += 1) : "animation_end" === n && (r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] -= 1, 0 === r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")]) ? delete r.__graph_frames[t].current_objecs_with_animation[$(a).attr("id")] : void 0
            }
        }(this)), r = function (_) {
            return function () {
                if (_.__graph_helper__begin_step("__func_1__choose_primary"), _.__graph_frames[t].current_step = null, _.__graph_frames[t].current_step_name = null, _.__graph_frames[t].current_timeouts = [], _.__graph_frames[t].current_objecs_with_animation = {}, e += 1, e > 1) throw"`__func_1.choose_primary`: cb вызван несколько раз, а должен быть вызван только раз";
                return n(Array.prototype.slice.call(arguments, 0)), _.__graph_helper__end_step("__func_1__choose_primary")
            }
        }(this), this.__func_1__choose_primary.call(this.__graph_frames[t].state, r, this, t), $.set_long_action_hook && $.set_long_action_hook(null)) : (this.__graph_log(t, "graph: missed step `__func_1.choose_primary`"), n()), this.__graph_helper__end_step("__func_1__choose_primary")
    },Card.Script3927.Script3927.prototype.__func_1__choose_primary_on_term = function (t, r) {
        return _(t.__graph_frames[r].current_timeouts).each(function () {
            return function (_) {
                return clearTimeout(_)
            }
        }(this)), _(t.__graph_frames[r].current_objecs_with_animation).each(function (_) {
            return function (t, r) {
                return _.place.find("#" + r).stop(!0)
            }
        }(this))
    },Card.Script3927.Script3927.prototype.__func_1__font = function (_) {
        return Card.Script3927.fontCirceRounded(this.place), _()
    },Card.Script3927.Script3927.prototype.__func_1__restore = function (_) {
        var t;
        if (this.restored = Card.Script3927.restore(), null == this.chocoDatas && (this.chocoDatas = Card.Script3927.chocoDatas()), this.newBoards = {}, null == this.restored) {
            this.restored = {};
            for (t in this.chocoDatas) this.restored[t] = {animated: !1, states: [], paths: []}
        }
        return this.buttons = [], this.clickables = [], this.chocolates = {}, this.miniMe_s = {}, this.hls = {}, _()
    },Card.Script3927.Script3927.prototype.__func_1__render_chocolate_scene = function (_) {
        return this.chocoScene = $.div("scene choco").css({opacity: 0}).appendTo(this.place), $.div("line").html(this.tutor.t("choco_title")).appendTo(this.chocoScene), this.save = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("save")
        }).data({type: "save"}).appendTo(this.chocoScene), this.restart = Card.Script3927.buttonNext({
            klass: "button-next",
            text: this.tutor.t("restart")
        }).addClass("disabled").data({type: "restart"}).appendTo(this.chocoScene), this.buttons.push(this.save), this.buttons.push(this.restart), _()
    },Card.Script3927.Script3927.prototype.__func_1__render_chocolates = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g;
        p = this.chocoDatas;
        for (a in p) {
            if (e = p[a], this.newBoards[a] = [], i = Card.Script3927.create_chocolate(this.chocoScene, a, e, this.restored[a]), this.restored[a] = i.toStore, this.chocolates[a] = i.chocolate, 0 === this.restored[a].states.length) for (f = this.chocolates[a].cuts, o = 0, h = f.length; h > o; o++) t = f[o], this.restored[a].states.push(0); else for (d = this.restored[a].states, n = c = 0, u = d.length; u > c; n = ++c) s = d[n], s && (this.chocolates[a].cuts[n].addClass("final").show(), l = this.chocolates[a].cuts[n].data().points[0], r.call(this.newBoards[a], l) >= 0 || this.chocolates[a].cuts[n].data().points[0].data().onBoard || this.newBoards[a].push(this.chocolates[a].cuts[n].data().points[0].data({onBoard: !0})), g = this.chocolates[a].cuts[n].data().points[1], r.call(this.newBoards[a], g) >= 0 || this.chocolates[a].cuts[n].data().points[1].data().onBoard || this.newBoards[a].push(this.chocolates[a].cuts[n].data().points[1].data({onBoard: !0})));
            this.miniMe_s[a] = this.chocolates[a].body.clone().addClass("mini"), this.chocolates[a].body.hide()
        }
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__render_primary_scene = function (_) {
        var t;
        this.chocoScene.hide(), this.primaryScene = $.div("scene primary").css({opacity: 0}).appendTo(this.place), this.currentScene = this.primaryScene, $.div("line").html(this.tutor.t("primary_title")).appendTo(this.primaryScene), this.done = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("done")
        }).addClass("disabled").data({type: "done"}).appendTo(this.primaryScene), this.buttons.push(this.done), this.miniChocos = [];
        for (t in this.restored) this.miniChocos[t] = {
            body: $.div("miniChoco " + t).data({
                type: "chocolate",
                subType: t
            }).appendTo(this.primaryScene)
        };
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__render_final_scene = function (_) {
        return this.final = $.div("scene final").css({opacity: 0}).appendTo(this.place), this.message = $.div("line").appendTo(this.final).css({marginTop: 200}), this.exit = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("exit")
        }).data({type: "exit"}).appendTo(this.final).css({
            position: "absolute",
            bottom: 50,
            left: 600
        }), this.exit.hide(), this.try_again = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("change_answer")
        }).data({type: "try_again"}).appendTo(this.final).css({
            position: "absolute",
            bottom: 50,
            left: 300
        }), this.try_again.hide(), this.buttons.push(this.exit), this.buttons.push(this.try_again), this.final.hide(), _()
    },Card.Script3927.Script3927.prototype.__func_1__primary_scene_update = function (_) {
        var t, r, e, n;
        t = null != this.type ? [this.type] : this.restored, r = !0;
        for (e in t) r = r && this.restored[e].states.indexOf(1) + 1, this.restored[e].animated && (null != (n = this.miniChocos[e].choco) && n.remove(), this.miniChocos[e].body.addClass("modified"), this.miniChocos[e].choco = this.miniMe_s[e].appendTo(this.miniChocos[e].body), this.hls[e] = $.div("wrong_hl").css({opacity: 0}).appendTo(this.miniMe_s[e]));
        return this.done.toggleClass("disabled", !r), _()
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeIn = function (_) {
        var t;
        return this.currentScene.show(), t = this.currentScene.animate({opacity: 1}, 500), $.when(t).done(function (r) {
            return function () {
                return null != r.type && (r.restored[r.type].animated || (t = Card.Script3927.animate_eating(r.chocolates[r.type], r.chocoDatas[r.type].eating_idxs), r.restored[r.type].animated = !0)), $.when(t).done(function () {
                    return _()
                })
            }
        }(this))
    },Card.Script3927.Script3927.prototype.__func_1__store = function (_) {
        return Card.Script3927.store(this.restored), _()
    },Card.Script3927.Script3927.prototype.__func_1__render_clickables = function (_) {
        var t, e, n, a, i, s, o, c, h;
        this.clickables = [];
        for (e in this.restored) this.clickables.push(this.miniChocos[e].body);
        if (this.clickables = this.clickables.concat(this.buttons), null != this.type) {
            if (a = [], null != (o = this.obj) ? o.hasClass("point") : void 0) {
                c = this.obj.data().cuts;
                for (e in c) t = c[e], h = this.chocolates[this.type].points[e].data().idx, r.call(this.path, h) >= 0 || "none" === t.css("display") && a.push(this.chocolates[this.type].points[e])
            } else this.path = [], this.new_states = [], a = this.chocolates[this.type].points.filter(function (_) {
                return _.data().onBoard
            });
            for (i = 0, s = a.length; s > i; i++) n = a[i], n.removeClass("disabled").appendTo($(n.parent()));
            a = a.filter(function (_) {
                var r;
                r = _.data().cuts;
                for (e in r) if (t = r[e], "none" === t.css("display")) return !0;
                return _.addClass("disabled"), !1
            }), this.clickables = this.clickables.concat(a), this.restart.toggleClass("disabled", !(this.restored[this.type].states.indexOf(1) + 1 + this.path.length))
        }
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__identify_device = function (_) {
        var t;
        return t = /iPad/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) ? "touch" : "mouse", _(t)
    },Card.Script3927.Script3927.prototype.__func_1__is_clickable = function (_) {
        return _(this.obj.hasClass("disabled") ? "no" : "yes")
    },Card.Script3927.Script3927.prototype.__func_1__pre_fork = function (_) {
        var t, r, e, n;
        for (this.points_to_click = this.clickables.filter(function (_) {
            return _.hasClass("point")
        }), n = this.points_to_click, r = 0, e = n.length; e > r; r++) t = n[r], t.addClass("disabled");
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__hoverOn = function () {
        var _, t, r;
        return this.currentScene[0] === this.chocoScene[0] ? (t = (null != (r = this.path) ? r.length : void 0) > 0 ? this.chocolates[this.type].points[this.path[this.path.length - 1]] : null, this.current_point = null, _ = this.chocolates[this.type].body, _.on("mousemove", function (r) {
            return function (e) {
                var n, a, i, s, o, c, h, u, p, f, d, l, g, m, b, S, v, y;
                if (r.points_to_click.length > 0) {
                    for (o = e.pageX - _.offset().left, c = e.pageY - _.offset().top, a = r.points_to_click[0], i = Card.Script3927.offset(_, r.points_to_click[0]), n = Math.abs(i.top - c) + Math.abs(i.left - o), g = r.points_to_click, h = 0, f = g.length; f > h; h++) s = g[h], i = Card.Script3927.offset(_, s), n > Math.abs(i.top - c) + Math.abs(i.left - o) && (n = Math.abs(i.top - c) + Math.abs(i.left - o), a = s);
                    if (!(50 > n || null == t)) {
                        for (r.current_point = null, S = r.points_to_click, y = [], p = 0, l = S.length; l > p; p++) s = S[p], s.addClass("disabled").removeClass("hovered"), null != t ? y.push(t.data().cuts[s.data().idx].hide().removeClass("hovered")) : y.push(void 0);
                        return y
                    }
                    if (a[0] !== (null != (m = r.current_point) ? m[0] : void 0)) {
                        for (r.current_point = a, r.current_point.removeClass("disabled").addClass("hovered"), null != t && (r.chocolates[r.type].to_hide = t.data().cuts[r.current_point.data().idx], t.data().cuts[r.current_point.data().idx].show().addClass("hovered")), b = r.points_to_click.filter(function (_) {
                            return _[0] !== a[0]
                        }), v = [], u = 0, d = b.length; d > u; u++) s = b[u], s.addClass("disabled").removeClass("hovered"), null != t ? v.push(t.data().cuts[s.data().idx].hide().removeClass("hovered")) : v.push(void 0);
                        return v
                    }
                }
            }
        }(this))) : void 0
    },Card.Script3927.Script3927.prototype.__func_1__hoverOff = function (_) {
        return this.currentScene[0] === this.chocoScene[0] && (this.chocoScene.find(".hovered").removeClass("hovered"), this.chocolates[this.type].body.off("mousemove")), _()
    },Card.Script3927.Script3927.prototype.__func_1__classify_obj = function (_) {
        return _(this.obj.data().type)
    },Card.Script3927.Script3927.prototype.__func_1__obj_hide = function (_) {
        return this.obj.hide(), _()
    },Card.Script3927.Script3927.prototype.__func_1__validate_answer = function (_) {
        var t, r, e, n, a, i, s, o, c, h, u, p, f, d, l;
        this.wrong_types = [], e = {}, f = this.restored;
        for (o in f) for (s = f[o], e[o] = [], d = this.chocoDatas[o].answers, i = c = 0, u = d.length; u > c; i = ++c) for (t = d[i], e[o].push(!0), l = s.states, a = h = 0, p = l.length; p > h; a = ++h) n = l[a], e[o][i] = e[o][i] && t[a] === n, e[o][i];
        for (o in e) r = e[o], r.indexOf(!0) + 1 || this.wrong_types.push(o);
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__render_final_btns_n_text = function (_) {
        var t, r;
        return t = 0 === this.wrong_types.length, t && Card.Script3927.userEvent("__answer", {win: !0}), t ? (this.exit.show().css({left: 445}), this.try_again.hide(), r = this.tutor.t("right")) : (this.exit.show().css({left: 600}), this.try_again.show().css({left: 300}), r = this.tutor.t("wrong")), this.message.html(r), _()
    },Card.Script3927.Script3927.prototype.__func_1__choose_final = function (_) {
        return this.currentScene = this.final, _()
    },Card.Script3927.Script3927.prototype.__func_1__the_end = function (_) {
        return this.obj.remove(), this.place.find(".card_back").trigger(Card.Script3927.buttonDown("up")), _()
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_fadeOut = function (_) {
        var t, r, e, n, a;
        if ("save" === this.obj.data().type) for (a = this.chocolates[this.type].points, e = 0, n = a.length; n > e; e++) r = a[e], r.addClass("disabled");
        return t = this.currentScene.animate({opacity: 0}, 500), $.when(t).done(function (t) {
            return function () {
                return t.currentScene.hide(), _()
            }
        }(this))
    },Card.Script3927.Script3927.prototype.__func_1__hide_chocolate = function (_) {
        var t, r, e, n;
        this.miniMe_s[this.type] = this.chocolates[this.type].body.clone().addClass("mini"), this.currentScene = this.primaryScene, this.chocolates[this.type].body.hide(), t = 1, n = this.restored;
        for (r in n) e = n[r], t *= e.states.indexOf(1) + 1;
        return this.done.toggleClass("disabled", !t), this.type = null, _()
    },Card.Script3927.Script3927.prototype.__func_1__current_scene_data_clear = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g, m, b, S, v, y;
        if (null != (l = this.chocolates[this.type].points[this.path[0]]) && l.css({opacity: ""}), this.path.length > 1) {
            for (null != (g = this.chocolates[this.type].to_hide) && g.hide(), this.chocolates[this.type].points[this.path[0]].css({opacity: ""}), m = this.new_states, c = 0, p = m.length; p > c; c++) n = m[c], this.restored[this.type].states[n] = 0, this.chocolates[this.type].cuts[n].removeClass("final").hide();
            this.path = []
        } else if (0 === this.path.length && (this.path = this.restored[this.type].paths.pop(), null != this.path)) for (b = this.chocolates[this.type].points, s = h = 0, f = b.length; f > h; s = ++h) if (o = b[s], i = this.path.indexOf(o.data().idx), i + 1) {
            t = 0 === i || i === this.path.length - 1, o.data({onBoard: t}), S = o.data().cuts;
            for (a in S) e = S[a], v = parseInt(a), r.call(this.path, v) >= 0 && (e.removeClass("final").hide(), this.restored[this.type].states[e.data().idx] = 0)
        }
        for (y = this.chocolates[this.type].points, u = 0, d = y.length; d > u; u++) o = y[u], o.addClass("disabled");
        return this.save.removeClass("disabled"), _()
    },Card.Script3927.Script3927.prototype.__func_1__choose_chocolate = function (_) {
        var t;
        return this.type = this.obj.data().subType, "chocolate" === this.obj.data().type && null != (t = this.hls[this.type]) && t.css({opacity: 0}), this.currentScene = this.chocoScene, this.chocolates[this.type].body.show(), _()
    },Card.Script3927.Script3927.prototype.__func_1__update_current_scene_data = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g, m;
        for (s = this.clickables.filter(function (_) {
            return _.hasClass("point")
        }), o = 0, u = s.length; u > o; o++) i = s[o], i.addClass("disabled");
        if (this.path.length > 0 ? (t = this.obj.data().cuts[this.path[this.path.length - 1]], t.show(), this.new_states.push(t.data().idx)) : (this.save.addClass("disabled"), this.obj.css({opacity: 1})), this.obj.data().onBoard && this.path.length > 0) {
            for (this.save.removeClass("disabled"), d = this.path, e = c = 0, p = d.length; p > c; e = ++c) {
                n = d[e], e > 0 && this.newBoards[this.type].push(this.chocolates[this.type].points[n]), this.chocolates[this.type].points[n].data({onBoard: !0}), l = this.chocolates[this.type].points[n].data().cuts;
                for (a in l) t = l[a], g = parseInt(a), r.call(this.path.concat(this.obj.data().idx), g) >= 0 && t.addClass("final");
                for (m = this.new_states, h = 0, f = m.length; f > h; h++) n = m[h], this.restored[this.type].states[n] = 1
            }
            this.restored[this.type].paths.push(this.path.concat(this.obj.data().idx)), this.chocolates[this.type].points[this.path[0]].css({opacity: ""}), this.obj = null
        } else this.path.push(this.obj.data().idx);
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__show_hls = function (_) {
        var t, r, e, n;
        for (n = this.wrong_types, r = 0, e = n.length; e > r; r++) t = n[r], this.hls[t].css({opacity: 1});
        return _()
    },Card.Script3927.Script3927.prototype.__func_1__choose_primary = function (_) {
        return this.currentScene = this.primaryScene, this.done.show(), _()
    },Card.Script3927.typograph = function (_, t) {
        var r, e, n, a, i;
        return null == t && (t = {}), i = "([^\\d\\s]+)", a = "(\\s+|^|$)", e = function (_) {
            return new RegExp(_, "ig")
        }, n = function (_, t, r) {
            return _.replace(e("" + a + t + a), function (_, t, e) {
                return "" !== t && (t = "&nbsp;"), "" !== e && (e = "&nbsp;"), "" + t + r + e
            })
        }, r = e("" + i + "\\s+\\-\\-\\s+" + i), _ = "ru" === Card.Script3927.__locale ? _.replace(r, "$1&nbsp;&mdash;&nbsp;$2") : "ua" === Card.Script3927.__locale ? _.replace(r, "$1&nbsp;&mdash;&nbsp;$2") : "tat" === Card.Script3927.__locale ? _.replace(r, "$1&nbsp;&mdash;&nbsp;$2") : _.replace(r, "$1&nbsp;&ndash;&nbsp;$2"), _ = _.replace(e("" + i + "\\-" + i), "$1&#8208;$2"), _ = n(_, "\\-", "&minus;"), _ = _.replace(/\-(\d+)/g, "&minus;$1"), _ = t.multiplication_sign_is_times ? n(_, "\\*", "&times;") : n(_, "\\*", "&middot;"), _ = n(_, "/", ":"), _ = n(_, ">", "&gt;"), _ = n(_, "<", "&lt;"), _ = n(_, ">=", "&ge;"), _ = n(_, "<=", "&le;")
    },Card.Script3927.offset = function (_, t) {
        return {
            top: t.offset().top + parseInt(t.css("border-top-width")) - _.offset().top - parseInt(_.css("border-top-width")),
            left: t.offset().left + parseInt(t.css("border-left-width")) - _.offset().left - parseInt(_.css("border-left-width"))
        }
    },Card.Script3927.permutations3 = function (_, t) {
        return t || (t = 0), 0 === _ ? [[0, 1, 2], [2, 1, 0], [1, 0, 2]][t % 3] : 1 === _ ? [[0, 1, 2], [2, 0, 1], [1, 0, 2]][t % 3] : 2 === _ ? [[0, 1, 2], [2, 0, 1], [1, 2, 0]][t % 3] : void 0
    },Card.Script3927.permutations4 = function (t, r) {
        var e, n, a, i, s, o;
        if (r || (r = 0), e = [[0, 1, 2, 3], [1, 3, 0, 2], [3, 1, 2, 0], [2, 0, 3, 1], [0, 2, 3, 1], [2, 3, 1, 0], [1, 0, 3, 2], [2, 1, 0, 3]], 0 === t) return e[r % e.length];
        for (a = [0, 1, 2, 3], n = s = 1; t >= 1 ? t >= s : s >= t; n = t >= 1 ? ++s : --s) a.push(a.shift());
        for (i = Array.rep(0, 4), _(e[r % e.length]).each(function () {
            return function (_, t) {
                return i[t] = a[_]
            }
        }(this)), a = i, n = o = 1; t >= 1 ? t >= o : o >= t; n = t >= 1 ? ++o : --o) a.unshift(a.pop());
        return a
    },Card.Script3927.get_nearest_slot = function (t, r) {
        var e;
        return 0 === r.length ? null : (e = _.chain(r).map(function () {
            return function (_) {
                return {
                    item: _,
                    x: t.offset().left + t.width() / 2 - (_.slot.offset().left + _.slot.width() / 2),
                    y: t.offset().top + t.height() / 2 - (_.slot.offset().top + _.slot.height() / 2)
                }
            }
        }(this)).min(function () {
            return function (_) {
                return _.x * _.x + _.y * _.y
            }
        }(this)).value(), e.item.box.x0 < e.x && e.x < e.item.box.x1 && e.item.box.y0 < e.y && e.y < e.item.box.y1 ? e.item : null)
    },Card.Script3927.buttonDown = function (_) {
        var t;
        return t = /iPad/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) ? "touchstart" : "up" === _ ? "mouseup" : "mousedown"
    },Card.Script3927.getBrowserInfo = function () {
        var _, t;
        return t = function (_) {
            var t, r;
            return _ = _.toLowerCase(), t = /(opr)[\/]([\w.]+)/.exec(_) || /(chrome)[ \/]([\w.]+)/.exec(_) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(_) || /(webkit)[ \/]([\w.]+)/.exec(_) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(_) || /(msie) ([\w.]+)/.exec(_) || _.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(_) || _.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(_) || [], r = /(ipad)/.exec(_) || /(iphone)/.exec(_) || /(android)/.exec(_) || /(windows phone)/.exec(_) || /(win)/.exec(_) || /(mac)/.exec(_) || /(linux)/.exec(_) || [], {
                browser: t[3] || t[1] || "",
                version: t[2] || "0",
                platform: r[0] || ""
            }
        }, _ = t(window.navigator.userAgent)
    },Card.Script3927.play_button2 = function (t, r, e, n, a) {
        var i, s, o, c, h, u;
        return null == n && (n = {}), _.isFunction(n) && (_ASSERT(_.isUndefined(a)), a = n, n = {}), c = n.tutor, u = n.wall, e ? (r.addClass("under_start"), u && (h = $.div().addClass("btn_play_wall").appendTo(r)), i = $.div().addClass("btn_play").appendTo(t), o = $.div().addClass("triangle").appendTo(i), s = "ru" === Card.Script3927.__locale ? "старт" : "ua" === Card.Script3927.__locale ? "старт" : "tat" === Card.Script3927.__locale ? "старт" : "es" === Card.Script3927.__locale ? "start" : "start", $.span().text(s).appendTo(o), i.on(Card.Script3927.buttonDown(), function () {
            return function () {
                return null != c && c.event("play_button"), i.off(Card.Script3927.buttonDown()), r.addClass("started"), i.addClass("started"), $.delay(1e3, function () {
                    return u && h.remove(), i.remove(), r.removeClass("started").addClass("finished"), r.removeClass("under_start finished"), a()
                })
            }
        }(this))) : a()
    },Card.Script3927.play_button = function (_, t, r, e, n) {
        var a, i, s;
        return null == n && (n = null), r ? (t.addClass("under_start"), a = $.div().addClass("btn_play").appendTo(_), s = $.div().addClass("triangle").appendTo(a), i = "ru" === Card.Script3927.__locale ? "старт" : "ua" === Card.Script3927.__locale ? "старт" : "tat" === Card.Script3927.__locale ? "старт" : "es" === Card.Script3927.__locale ? "start" : "start", $.span().text(i).appendTo(s), a.on(Card.Script3927.buttonDown(), function () {
            return function () {
                return null != n && n.event("play_button"), a.off(Card.Script3927.buttonDown()), t.addClass("started"), a.addClass("started"), $.delay(1e3, function () {
                    return a.remove(), t.removeClass("started").addClass("finished"), e()
                })
            }
        }(this))) : e()
    },Card.Script3927.play_button_paper = function (_, t, r, e) {
        var n, a, i, s, o, c;
        return r ? (t.addClass("under_start"), "ru" === Card.Script3927.__locale ? (o = "Для решения этой задачи тебе может<br />понадобиться бумага и ручка.", a = "продолжить", i = "") : (o = "To solve these exercises<br />you may need a pencil and paper.", a = "continue", i = "en"), s = $.div().addClass("paper").addClass(i).appendTo(_), o = $.div().addClass("text").html(o).appendTo(s), n = $.div().addClass("btn_play").appendTo(s), c = $.div().addClass("triangle").appendTo(n), $.span().text(a).appendTo(c), n.on(Card.Script3927.buttonDown(), function () {
            return function () {
                return n.off(Card.Script3927.buttonDown()), t.addClass("started"), n.addClass("started"), s.fadeOut(1e3), $.delay(1e3, function () {
                    return s.remove(), n.remove(), t.removeClass("started").addClass("finished"), e()
                })
            }
        }(this))) : e()
    },Card.Script3927.pluralize = function (_, t) {
        switch (Card.Script3927.__locale) {
            case"en":
            case"es":
                if (t.length < 2) throw new Error("wrong number of words for " + Card.Script3927.__locale + " locale.");
                return 1 == _ ? t[0] : t[1];
            case"ru":
                if (t.length < 3) throw new Error("wrong number of words for " + Card.Script3927.__locale + " locale");
                var r = _ % 100, e = _ % 10;
                return r >= 11 && 14 >= r || e >= 5 && 9 >= e || 0 == e ? t[2] : 1 == e ? t[0] : t[1];
            case"ua":
                if (t.length < 3) throw new Error("wrong number of words for " + Card.Script3927.__locale + " locale");
                var r = _ % 100, e = _ % 10;
                return r >= 11 && 14 >= r || e >= 5 && 9 >= e || 0 == e ? t[2] : 1 == e ? t[0] : t[1];
            case"tat":
                if (t.length < 3) throw new Error("wrong number of words for " + Card.Script3927.__locale + " locale");
                var r = _ % 100, e = _ % 10;
                return r >= 11 && 14 >= r || e >= 5 && 9 >= e || 0 == e ? t[2] : 1 == e ? t[0] : t[1];
            default:
                throw new Error("unknown locale " + Card.Script3927.__locale)
        }
    },Card.Script3927.format = function (_, t) {
        var r;
        return r = _.replace(/\$(\d+)/g, function (_, r) {
            var e;
            return e = t[r - 1], null == e ? _ : t[r - 1]
        }), r = r.replace(/%(\d+)(({.*?})+)/g, function (_, r, e) {
            var n, a;
            return a = t[r - 1], null == a || "number" != typeof a || Math.floor(a) !== a ? _ : (n = e.slice(1, -1).split("}{"), Card.Script3927.pluralize(a, n))
        })
    },Card.Script3927.format2 = function (_, t) {
        return _.replace(/%(.*?)%/g, function (_, r) {
            return t[r]
        })
    },Card.Script3927.Steps = function () {
        function t() {
            var t, r, e, n;
            n = Array.prototype.slice.call(arguments, 0), this.raw = [], this.on_terminate_raw = [], this.nodes = {}, r = 0, this.rules = _.chain(n).map(function () {
                return function (_) {
                    return _.match(/^(.*?)( \[(.*?)\])? -> (.*?)$/)
                }
            }(this)).map(function () {
                return function (t) {
                    var e;
                    return e = {
                        cond: null,
                        end: !1,
                        end_index: null
                    }, e.from = t[1], "end" === t[4] ? (r += 1, e.to = "end_" + r, e.end = !0, e.end_index = r) : e.to = t[4], _.isUndefined(t[3]) || (e.cond = parseInt(t[3])), e
                }
            }(this)).value(), t = function (t) {
                return function (r, e, n) {
                    var a;
                    return a = _(t.nodes).filter(function (_) {
                        return _.level === n
                    }).length, t.nodes[r] = {
                        name: r,
                        input: [],
                        output: {},
                        sections: {},
                        end: e,
                        level: n,
                        index: a,
                        same_level_count: 0,
                        forked: !1
                    }
                }
            }(this), _(this.rules).each(function (r) {
                return function (e) {
                    var n, a;
                    return _(r.nodes).has(e.from) || t(e.from, !1, 0), _(r.nodes).has(e.to) || t(e.to, e.end, r.nodes[e.from].level + 1), n = _.isNull(e.cond) ? "null" : e.cond, (a = r.nodes[e.from].output)[n] || (a[n] = []), -1 === _(r.nodes[e.from].output[n]).indexOf(e.to) && r.nodes[e.from].output[n].push(e.to), -1 === _(r.nodes[e.to].input).indexOf(e.from) ? r.nodes[e.to].input.push(e.from) : void 0
                }
            }(this)), _(this.nodes).each(function (t) {
                return function (r) {
                    var e;
                    return r.same_level_count = _(t.nodes).filter(function (_) {
                        return _.level === r.level
                    }).length, e = 0, _(r.output).each(function (_) {
                        return e += _.length
                    }), e > 1 ? r.forked = !0 : void 0
                }
            }(this)), e = 0, _(this.nodes).each(function (t) {
                return function (r) {
                    return _(r.output).each(function (n) {
                        return n.length > 1 ? (e += 1, r.sections[e] = 0, _(n).each(function (_) {
                            return _ === r.name || t.nodes[_].end ? void 0 : t.nodes[_].sections[e] = 1
                        }), t._fill_section(t.nodes, e)) : void 0
                    })
                }
            }(this))
        }

        return t.prototype.add = function (_, t, r) {
            return this.raw.push({id: _, desc: t, func: r})
        }, t.prototype.find = function (t) {
            return _(this.raw).find(function () {
                return function (_) {
                    return t === _.id
                }
            }(this))
        }, t.prototype.desc = function (t) {
            return _(this.raw).find(function () {
                return function (_) {
                    return t === _.id
                }
            }(this)).desc
        }, t.prototype.on_terminate = function (_, t) {
            return this.on_terminate_raw.push({id: _, func: t})
        }, t.prototype.find_on_terminate = function (t) {
            return _(this.on_terminate_raw).find(function () {
                return function (_) {
                    return t === _.id
                }
            }(this)) || {
                id: t, func: function () {
                }
            }
        }, t.prototype.next_ids = function (t, r) {
            var e;
            return e = _.isUndefined(r) ? _(this.rules).filter(function () {
                return function (_) {
                    return _.from === t
                }
            }(this)) : _(this.rules).filter(function () {
                return function (_) {
                    return _.from === t && _.cond === r
                }
            }(this)), _(e).map(function () {
                return function (_) {
                    return _.to
                }
            }(this))
        }, t.prototype._fill_section = function (t, r) {
            var e, n, a, i;
            for (e = !0, n = 0; e;) e = !1, n += 1, _(t).each(function () {
                return function (a) {
                    return a.sections[r] === n ? _(a.output).each(function (a) {
                        return _(a).each(function (a) {
                            return "end" === a || _(t[a].sections).has(r) ? void 0 : (t[a].sections[r] = n + 1, e = !0)
                        })
                    }) : void 0
                }
            }(this));
            return a = _.chain(function () {
                i = [];
                for (var _ = 1; n >= 1 ? n >= _ : _ >= n; n >= 1 ? _++ : _--) i.push(_);
                return i
            }.apply(this)).map(function () {
                return function (e) {
                    return _(t).filter(function (_) {
                        return _.sections[r] === e && !_.end
                    }).length
                }
            }(this)).indexOf(1).value() + 1, _(t).each(function () {
                return function (t) {
                    return _(t.sections).has(r) && 0 !== t.sections[r] ? t.sections[r] !== a || t.end ? t.sections[r] === a && t.end ? t.sections[r] = 1 : t.sections[r] > 0 && t.sections[r] < a ? t.sections[r] = 1 : delete t.sections[r] : t.sections[r] = 2 : void 0
                }
            }(this))
        }, t
    }();
    var e, n, a, i, s, o, c, h, u, p, f, d;
    window.__dragOptions || (window.__dragOptions = {}), /iPad/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) ? (d = !0, h = "touchstart", c = "touchmove", o = "touchend") : (d = !1, h = "mousedown", c = "mousemove", o = "mouseup"), e = null, p = 0, f = 0, s = function (_) {
        var t, r, n, a;
        return _.preventDefault(), e || !d && (0 !== _.button || _.ctrlKey) ? void 0 : (n = d ? _.touches[0] : _, e = $(this), a = __dragOptions[e.attr("id")], $("body").addClass("dragging closedhand"), e.addClass("closedhand in_drag"), document.onselectstart = function () {
            return !1
        }, t = n.pageX - $(this).offset().left - $(this).position().left, r = n.pageY - $(this).offset().top - $(this).position().top, p = $(this).offset().left + t, f = $(this).offset().top + r, a.start(e))
    }, i = function (_) {
        var t, r, n, a, i, s, o, c, h;
        if (e) return i = __dragOptions[e.attr("id")], _.preventDefault(), d ? (n = _.touches[0], _.touches.length > 1 && (_.touches.length = 1)) : n = _, t = n.pageX - p, r = n.pageY - f, s = e.parent(), h = e.width(), a = e.height(), o = s.width() - h, c = s.height() - a, 0 > t ? t = 0 : t > o && (t = o), 0 > r ? r = 0 : r > c && (r = c), i.xOnly ? e.css({left: t}) : i.yOnly ? e.css({top: r}) : e.css({
            left: t,
            top: r
        }), i.move(e)
    }, n = function (_, t) {
        return null == t && (t = !0), d && _.touches.length < 1 || !d ? a(!0) : void 0
    }, a = function (_) {
        var t, r;
        if (e) return r = __dragOptions[e.attr("id")], $("body").removeClass("dragging closedhand"), e.removeClass("closedhand in_drag"), document.onselectstart = function () {
            return !0
        }, t = e, e = null, _ ? r.end(t) : void 0
    }, u = function (_) {
        var t;
        return _ = null != _ ? _ : {e: window.event}, t = _.relatedTarget || _.toElement, t && "HTML" !== t.nodeName || d || !e ? void 0 : n()
    }, Card.Script3927.drag = function (t, r) {
        if (null == r && (r = {}), !(t instanceof jQuery && 1 === t.length)) throw"drag works only with single object";
        return r = $.extend({}, {
            xOnly: !1, yOnly: !1, obj: t, start: function () {
            }, move: function () {
            }, end: function () {
            }
        }, r), t.attr("id") in __dragOptions || (t[0].addEventListener(h, s, !1), t.addClass("openhand"), 0 === _.size(__dragOptions) && ($("body")[0].addEventListener(c, i, !1), $("body")[0].addEventListener(o, n, !1), document.addEventListener("mouseout", u, !1), console.log("Drag: add body callbacks"))), __dragOptions[t.attr("id")] = r
    }, Card.Script3927.drag_clear = function (t, r) {
        var e;
        return a(!1), e = t.find("#" + r), e.length > 0 && (e[0].removeEventListener(h, s, !1), e.removeClass("openhand")), delete __dragOptions[r], 0 === _.size(__dragOptions) ? ($("body")[0].removeEventListener(c, i, !1), $("body")[0].removeEventListener(o, n, !1), document.removeEventListener("mouseout", u, !1), console.log("Drag: clear body callbacks")) : void 0
    };
    var l;
    Card.Script3927.animate_eating = function (_, t) {
        var r, e, n, a, i, s;
        for (r = $.Deferred(), a = [], e = 500, i = 0, s = t.length; s > i; i++) n = t[i], a.push(l(_, n, e)), e += 600;
        return $.when.apply(null, a).done(function () {
            return r.resolve()
        }), r.promise()
    }, l = function (_, t, r) {
        var e;
        return e = $.Deferred(), $.delay(r, function () {
            var r, n, a;
            for (n = 0, a = t.length; a > n; n++) r = t[n], _.slices[r].remove();
            return e.resolve()
        }), e.promise()
    }, function () {
        var t;
        return t = function (_) {
            return _.toUpperCase() === _
        }, Card.Script3927.buttonDone = function (r) {
            var e, n, a, i, s, o, c, h, u, p;
            return null == r && (r = {}), "object" != typeof r && (r = _(arguments[1] || {}).extend({klass: r})), i = r.klass || "button-done", h = r.text, s = r["case"], null == s && (s = t(h) ? "uc" : "default"), a = r.font || "cr", e = r.color || "blue", _ASSERT("uc" === s || "default" === s), _ASSERT("cr" === a || "pts" === a), _ASSERT("blue" === e || "white" === e || "green" === e), n = $.div().addClass(i).append(), o = $.div("" + i + "__placeholder").html(h).css({visibility: "hidden"}), c = $.div().addClass("" + i + "__right"), p = $.div().addClass("" + i + "__wrong"), u = $.div("" + i + "__text").html(h), n.append(o, p, c, u), null != r.size && n.addClass("" + i + "_size_" + r.size), "default" !== s && n.addClass("" + i + "_case_" + s), n.addClass("" + i + "_font_" + a), n.addClass("" + i + "_color_" + e), n.data({
                klass: r.klass,
                text: r.text,
                constructor_name: "buttonDone"
            }), n
        }, Card.Script3927.buttonDone__klass = function (_) {
            return _.data().klass || "button-done"
        }, Card.Script3927.buttonDone__clear = function (_) {
            var t;
            return t = Card.Script3927.buttonDone__klass(_), _.removeClass("" + t + "_right " + t + "_wrong " + t + "_wrong-end " + t + "_right-end"), _.toggleClass("inactive", _.data().inactive || !1)
        }, Card.Script3927.buttonDone__animate_right = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonDone__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonDone__clear(t), t.addClass("inactive"), t.addClass("" + i + "_right"), $.delay(a, function () {
                return function () {
                    return n.resolve()
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }, Card.Script3927.buttonDone__animate_wrong = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonDone__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonDone__clear(t), t.addClass("inactive"), t.addClass("" + i + "_wrong"), $.delay(1e3, function () {
                return function () {
                    return t.addClass("" + i + "_wrong-end").removeClass("" + i + "_wrong"), $.delay(a, function () {
                        return t.toggleClass("inactive", t.data().inactive || !1), n.resolve()
                    })
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }
    }(), function () {
        var t;
        return t = function (_) {
            return _.toUpperCase() === _
        }, Card.Script3927.buttonHere = function (r) {
            var e, n, a, i, s, o, c, h, u, p;
            return null == r && (r = {}), "object" != typeof r && (r = _(arguments[1] || {}).extend({klass: r})), i = r.klass || "button-here", h = r.text, s = r["case"], null == s && (s = t(h) ? "uc" : "default"), a = r.font || "cr", e = r.color || "blue", _ASSERT("uc" === s || "default" === s), _ASSERT("cr" === a || "pts" === a), _ASSERT("blue" === e || "white" === e), n = $.div().addClass(i).append(), o = $.div("" + i + "__placeholder").html(h).css({visibility: "hidden"}), c = $.div().addClass("" + i + "__right"), p = $.div().addClass("" + i + "__wrong"), u = $.div("" + i + "__text").html(h), n.append(o, p, c, u), null != r.size && n.addClass("" + i + "_size_" + r.size), "default" !== s && n.addClass("" + i + "_case_" + s), n.addClass("" + i + "_font_" + a), n.addClass("" + i + "_color_" + e), n.data({
                klass: r.klass,
                text: r.text,
                constructor_name: "buttonHere"
            }), n
        }, Card.Script3927.buttonHere__klass = function (_) {
            return _.data().klass || "button-here"
        }, Card.Script3927.buttonHere__clear = function (_) {
            var t;
            return t = Card.Script3927.buttonHere__klass(_), _.removeClass("" + t + "_right " + t + "_wrong " + t + "_wrong-end " + t + "_right-end"), _.toggleClass("inactive", _.data().inactive || !1)
        }, Card.Script3927.buttonHere__animate_right = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonHere__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonHere__clear(t), t.addClass("inactive"), t.addClass("" + i + "_right"), $.delay(a, function () {
                return function () {
                    return n.resolve()
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }, Card.Script3927.buttonHere__animate_wrong = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonHere__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonHere__clear(t), t.addClass("inactive"), t.addClass("" + i + "_wrong"), $.delay(1e3, function () {
                return function () {
                    return t.addClass("" + i + "_wrong-end").removeClass("" + i + "_wrong"), $.delay(a, function () {
                        return t.toggleClass("inactive", t.data().inactive || !1), n.resolve()
                    })
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }
    }(), function () {
        var t;
        return t = function (_) {
            return _.toUpperCase() === _
        }, Card.Script3927.buttonNext = function (r) {
            var e, n, a, i, s, o, c, h;
            return null == r && (r = {}), "object" != typeof r && (r = _(arguments[1] || {}).extend({klass: r})), i = r.klass || "button-next", c = r.text, s = r["case"], null == s && (s = t(c) ? "uc" : "default"), a = r.font || "cr", e = r.color || "blue", _ASSERT("uc" === s || "default" === s), _ASSERT("cr" === a || "pts" === a), _ASSERT("blue" === e || "white" === e), n = $.div().addClass(i).append(), o = $.div("" + i + "__placeholder").html(c).css({visibility: "hidden"}), h = $.div("" + i + "__text").html(c), n.append(o, h), null != r.size && n.addClass("" + i + "_size_" + r.size), "default" !== s && n.addClass("" + i + "_case_" + s), n.addClass("" + i + "_font_" + a), n.addClass("" + i + "_color_" + e), n.data({
                klass: r.klass,
                text: r.text,
                constructor_name: "buttonNext"
            }), n
        }, Card.Script3927.buttonNext__klass = function (_) {
            return _.data().klass || "button-next"
        }
    }(), function () {
        var t;
        return t = function (_) {
            return _.toUpperCase() === _
        }, Card.Script3927.buttonOk = function (r) {
            var e, n, a, i, s, o, c, h, u, p;
            return null == r && (r = {}), "object" != typeof r && (r = _(arguments[1] || {}).extend({klass: r})), i = r.klass || "button-ok", h = r.text, s = r["case"], null == s && (s = t(h) ? "uc" : "default"), a = r.font || "cr", e = r.color || "blue", _ASSERT("uc" === s || "default" === s), _ASSERT("cr" === a || "pts" === a), _ASSERT("blue" === e || "white" === e), n = $.div().addClass(i).append(), o = $.div("" + i + "__placeholder").html(h).css({visibility: "hidden"}), c = $.div().addClass("" + i + "__right"), p = $.div().addClass("" + i + "__wrong"), u = $.div("" + i + "__text").html(h), n.append(o, p, c, u), null != r.size && n.addClass("" + i + "_size_" + r.size), "default" !== s && n.addClass("" + i + "_case_" + s), n.addClass("" + i + "_font_" + a), n.addClass("" + i + "_color_" + e), n.data({
                klass: r.klass,
                text: r.text,
                constructor_name: "buttonOk"
            }), n
        }, Card.Script3927.buttonOk__klass = function (_) {
            return _.data().klass || "button-ok"
        }, Card.Script3927.buttonOk__clear = function (_) {
            var t;
            return t = Card.Script3927.buttonOk__klass(_), _.removeClass("" + t + "_right " + t + "_wrong " + t + "_wrong-end " + t + "_right-end"), _.toggleClass("inactive", _.data().inactive || !1)
        }, Card.Script3927.buttonOk__animate_right = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonOk__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonOk__clear(t), t.addClass("inactive"), t.addClass("" + i + "_right"), $.delay(a, function () {
                return function () {
                    return n.resolve()
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }, Card.Script3927.buttonOk__animate_wrong = function (t, r, e) {
            var n, a, i;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay_after ? r.delay_after : 0, i = Card.Script3927.buttonOk__klass(t), t.data().inactive = t.hasClass("inactive"), Card.Script3927.buttonOk__clear(t), t.addClass("inactive"), t.addClass("" + i + "_wrong"), $.delay(1e3, function () {
                return function () {
                    return t.addClass("" + i + "_wrong-end").removeClass("" + i + "_wrong"), $.delay(a, function () {
                        return t.toggleClass("inactive", t.data().inactive || !1), n.resolve()
                    })
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }
    }(), function () {
        var t;
        return t = function (_) {
            return _.toUpperCase() === _
        }, Card.Script3927.buttonRestart = function (r) {
            var e, n, a, i, s, o, c, h;
            return null == r && (r = {}), "object" != typeof r && (r = _(arguments[1] || {}).extend({klass: r})), i = r.klass || "button-restart", c = r.text, s = r["case"], null == s && (s = t(c) ? "uc" : "default"), a = r.font || "cr", e = r.color || "blue", _ASSERT("uc" === s || "default" === s), _ASSERT("cr" === a || "pts" === a), _ASSERT("blue-violet" === e), n = $.div().addClass(i).append(), o = $.div("" + i + "__placeholder").html(c).css({visibility: "hidden"}), h = $.div("" + i + "__text").html(c), n.append(o, h), null != r.size && n.addClass("" + i + "_size_" + r.size), "default" !== s && n.addClass("" + i + "_case_" + s), n.addClass("" + i + "_font_" + a), n.addClass("" + i + "_color_" + e), n.data({
                klass: r.klass,
                text: r.text,
                constructor_name: "buttonRestart"
            }), n
        }, Card.Script3927.buttonRestart__klass = function (_) {
            return _.data().klass || "button-restart"
        }, Card.Script3927.buttonRestart__animate_click = function (t, r, e) {
            var n, a;
            return null == r && (r = {}), n = $.Deferred(), _.isFunction(r) && (_ASSERT(_.isUndefined(e)), e = r, r = {}), a = null != r.delay ? r.delay : 300, t.addClass("active"), $.delay(a, function () {
                return function () {
                    return t.removeClass("active"), n.resolve()
                }
            }(this)), n.promise().done(function () {
                return function () {
                    return "function" == typeof e ? e() : void 0
                }
            }(this)), n.promise()
        }
    }();
    var r = [].indexOf || function (_) {
        for (var t = 0, r = this.length; r > t; t++) if (t in this && this[t] === _) return t;
        return -1
    };
    Card.Script3927.Script.prototype._mixin__choco__font = function (_) {
        return Card.Script3927.fontCirceRounded(this.place), _()
    }, Card.Script3927.Script.prototype._mixin__choco__restore = function (_) {
        var t;
        if (this.restored = Card.Script3927.restore(), null == this.chocoDatas && (this.chocoDatas = Card.Script3927.chocoDatas()), this.newBoards = {}, null == this.restored) {
            this.restored = {};
            for (t in this.chocoDatas) this.restored[t] = {animated: !1, states: [], paths: []}
        }
        return this.buttons = [], this.clickables = [], this.chocolates = {}, this.miniMe_s = {}, this.hls = {}, _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_chocolate_scene = function (_) {
        return this.chocoScene = $.div("scene choco").css({opacity: 0}).appendTo(this.place), $.div("line").html(this.tutor.t("choco_title")).appendTo(this.chocoScene), this.save = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("save")
        }).data({type: "save"}).appendTo(this.chocoScene), this.restart = Card.Script3927.buttonNext({
            klass: "button-next",
            text: this.tutor.t("restart")
        }).addClass("disabled").data({type: "restart"}).appendTo(this.chocoScene), this.buttons.push(this.save), this.buttons.push(this.restart), _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_chocolates = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g;
        p = this.chocoDatas;
        for (a in p) {
            if (e = p[a], this.newBoards[a] = [], i = Card.Script3927.create_chocolate(this.chocoScene, a, e, this.restored[a]), this.restored[a] = i.toStore, this.chocolates[a] = i.chocolate, 0 === this.restored[a].states.length) for (f = this.chocolates[a].cuts, o = 0, h = f.length; h > o; o++) t = f[o], this.restored[a].states.push(0); else for (d = this.restored[a].states, n = c = 0, u = d.length; u > c; n = ++c) s = d[n], s && (this.chocolates[a].cuts[n].addClass("final").show(), l = this.chocolates[a].cuts[n].data().points[0], r.call(this.newBoards[a], l) >= 0 || this.chocolates[a].cuts[n].data().points[0].data().onBoard || this.newBoards[a].push(this.chocolates[a].cuts[n].data().points[0].data({onBoard: !0})), g = this.chocolates[a].cuts[n].data().points[1], r.call(this.newBoards[a], g) >= 0 || this.chocolates[a].cuts[n].data().points[1].data().onBoard || this.newBoards[a].push(this.chocolates[a].cuts[n].data().points[1].data({onBoard: !0})));
            this.miniMe_s[a] = this.chocolates[a].body.clone().addClass("mini"), this.chocolates[a].body.hide()
        }
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_primary_scene = function (_) {
        var t;
        this.chocoScene.hide(), this.primaryScene = $.div("scene primary").css({opacity: 0}).appendTo(this.place), this.currentScene = this.primaryScene, $.div("line").html(this.tutor.t("primary_title")).appendTo(this.primaryScene), this.done = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("done")
        }).addClass("disabled").data({type: "done"}).appendTo(this.primaryScene), this.buttons.push(this.done), this.miniChocos = [];
        for (t in this.restored) this.miniChocos[t] = {
            body: $.div("miniChoco " + t).data({
                type: "chocolate",
                subType: t
            }).appendTo(this.primaryScene)
        };
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_final_scene = function (_) {
        return this.final = $.div("scene final").css({opacity: 0}).appendTo(this.place), this.message = $.div("line").appendTo(this.final).css({marginTop: 200}), this.exit = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("exit")
        }).data({type: "exit"}).appendTo(this.final).css({
            position: "absolute",
            bottom: 50,
            left: 600
        }), this.exit.hide(), this.try_again = Card.Script3927.buttonDone({
            klass: "button-done",
            text: this.tutor.t("change_answer")
        }).data({type: "try_again"}).appendTo(this.final).css({
            position: "absolute",
            bottom: 50,
            left: 300
        }), this.try_again.hide(), this.buttons.push(this.exit), this.buttons.push(this.try_again), this.final.hide(), _()
    }, Card.Script3927.Script.prototype._mixin__choco__primary_scene_update = function (_) {
        var t, r, e, n;
        t = null != this.type ? [this.type] : this.restored, r = !0;
        for (e in t) r = r && this.restored[e].states.indexOf(1) + 1, this.restored[e].animated && (null != (n = this.miniChocos[e].choco) && n.remove(), this.miniChocos[e].body.addClass("modified"), this.miniChocos[e].choco = this.miniMe_s[e].appendTo(this.miniChocos[e].body), this.hls[e] = $.div("wrong_hl").css({opacity: 0}).appendTo(this.miniMe_s[e]));
        return this.done.toggleClass("disabled", !r), _()
    }, Card.Script3927.Script.prototype._mixin__choco__current_scene_fadeIn = function (_) {
        var t;
        return this.currentScene.show(), t = this.currentScene.animate({opacity: 1}, 500), $.when(t).done(function (r) {
            return function () {
                return null != r.type && (r.restored[r.type].animated || (t = Card.Script3927.animate_eating(r.chocolates[r.type], r.chocoDatas[r.type].eating_idxs), r.restored[r.type].animated = !0)), $.when(t).done(function () {
                    return _()
                })
            }
        }(this))
    }, Card.Script3927.Script.prototype._mixin__choco__store = function (_) {
        return Card.Script3927.store(this.restored), _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_clickables = function (_) {
        var t, e, n, a, i, s, o, c, h;
        this.clickables = [];
        for (e in this.restored) this.clickables.push(this.miniChocos[e].body);
        if (this.clickables = this.clickables.concat(this.buttons), null != this.type) {
            if (a = [], null != (o = this.obj) ? o.hasClass("point") : void 0) {
                c = this.obj.data().cuts;
                for (e in c) t = c[e], h = this.chocolates[this.type].points[e].data().idx, r.call(this.path, h) >= 0 || "none" === t.css("display") && a.push(this.chocolates[this.type].points[e])
            } else this.path = [], this.new_states = [], a = this.chocolates[this.type].points.filter(function (_) {
                return _.data().onBoard
            });
            for (i = 0, s = a.length; s > i; i++) n = a[i], n.removeClass("disabled").appendTo($(n.parent()));
            a = a.filter(function (_) {
                var r;
                r = _.data().cuts;
                for (e in r) if (t = r[e], "none" === t.css("display")) return !0;
                return _.addClass("disabled"), !1
            }), this.clickables = this.clickables.concat(a), this.restart.toggleClass("disabled", !(this.restored[this.type].states.indexOf(1) + 1 + this.path.length))
        }
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__identify_device = function (_) {
        var t;
        return t = /iPad/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) ? "touch" : "mouse", _(t)
    }, Card.Script3927.Script.prototype._mixin__choco__is_clickable = function (_) {
        return _(this.obj.hasClass("disabled") ? "no" : "yes")
    }, Card.Script3927.Script.prototype._mixin__choco__pre_fork = function (_) {
        var t, r, e, n;
        for (this.points_to_click = this.clickables.filter(function (_) {
            return _.hasClass("point")
        }), n = this.points_to_click, r = 0, e = n.length; e > r; r++) t = n[r], t.addClass("disabled");
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__hoverOn = function () {
        var _, t, r;
        return this.currentScene[0] === this.chocoScene[0] ? (t = (null != (r = this.path) ? r.length : void 0) > 0 ? this.chocolates[this.type].points[this.path[this.path.length - 1]] : null, this.current_point = null, _ = this.chocolates[this.type].body, _.on("mousemove", function (r) {
            return function (e) {
                var n, a, i, s, o, c, h, u, p, f, d, l, g, m, b, S, v, y;
                if (r.points_to_click.length > 0) {
                    for (o = e.pageX - _.offset().left, c = e.pageY - _.offset().top, a = r.points_to_click[0], i = Card.Script3927.offset(_, r.points_to_click[0]), n = Math.abs(i.top - c) + Math.abs(i.left - o), g = r.points_to_click, h = 0, f = g.length; f > h; h++) s = g[h], i = Card.Script3927.offset(_, s), n > Math.abs(i.top - c) + Math.abs(i.left - o) && (n = Math.abs(i.top - c) + Math.abs(i.left - o), a = s);
                    if (!(50 > n || null == t)) {
                        for (r.current_point = null, S = r.points_to_click, y = [], p = 0, l = S.length; l > p; p++) s = S[p], s.addClass("disabled").removeClass("hovered"), null != t ? y.push(t.data().cuts[s.data().idx].hide().removeClass("hovered")) : y.push(void 0);
                        return y
                    }
                    if (a[0] !== (null != (m = r.current_point) ? m[0] : void 0)) {
                        for (r.current_point = a, r.current_point.removeClass("disabled").addClass("hovered"), null != t && (r.chocolates[r.type].to_hide = t.data().cuts[r.current_point.data().idx], t.data().cuts[r.current_point.data().idx].show().addClass("hovered")), b = r.points_to_click.filter(function (_) {
                            return _[0] !== a[0]
                        }), v = [], u = 0, d = b.length; d > u; u++) s = b[u], s.addClass("disabled").removeClass("hovered"), null != t ? v.push(t.data().cuts[s.data().idx].hide().removeClass("hovered")) : v.push(void 0);
                        return v
                    }
                }
            }
        }(this))) : void 0
    }, Card.Script3927.Script.prototype._mixin__choco__hoverOff = function (_) {
        return this.currentScene[0] === this.chocoScene[0] && (this.chocoScene.find(".hovered").removeClass("hovered"), this.chocolates[this.type].body.off("mousemove")), _()
    }, Card.Script3927.Script.prototype._mixin__choco__classify_obj = function (_) {
        return _(this.obj.data().type)
    }, Card.Script3927.Script.prototype._mixin__choco__obj_hide = function (_) {
        return this.obj.hide(), _()
    }, Card.Script3927.Script.prototype._mixin__choco__validate_answer = function (_) {
        var t, r, e, n, a, i, s, o, c, h, u, p, f, d, l;
        this.wrong_types = [], e = {}, f = this.restored;
        for (o in f) for (s = f[o], e[o] = [], d = this.chocoDatas[o].answers, i = c = 0, u = d.length; u > c; i = ++c) for (t = d[i], e[o].push(!0), l = s.states, a = h = 0, p = l.length; p > h; a = ++h) n = l[a], e[o][i] = e[o][i] && t[a] === n, e[o][i];
        for (o in e) r = e[o], r.indexOf(!0) + 1 || this.wrong_types.push(o);
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__render_final_btns_n_text = function (_) {
        var t, r;
        return t = 0 === this.wrong_types.length, t && Card.Script3927.userEvent("__answer", {win: !0}), t ? (this.exit.show().css({left: 445}), this.try_again.hide(), r = this.tutor.t("right")) : (this.exit.show().css({left: 600}), this.try_again.show().css({left: 300}), r = this.tutor.t("wrong")), this.message.html(r), _()
    }, Card.Script3927.Script.prototype._mixin__choco__choose_final = function (_) {
        return this.currentScene = this.final, _()
    }, Card.Script3927.Script.prototype._mixin__choco__the_end = function (_) {
        return this.obj.remove(), this.place.find(".card_back").trigger(Card.Script3927.buttonDown("up")), _()
    }, Card.Script3927.Script.prototype._mixin__choco__current_scene_fadeOut = function (_) {
        var t, r, e, n, a;
        if ("save" === this.obj.data().type) for (a = this.chocolates[this.type].points, e = 0, n = a.length; n > e; e++) r = a[e], r.addClass("disabled");
        return t = this.currentScene.animate({opacity: 0}, 500), $.when(t).done(function (t) {
            return function () {
                return t.currentScene.hide(), _()
            }
        }(this))
    }, Card.Script3927.Script.prototype._mixin__choco__hide_chocolate = function (_) {
        var t, r, e, n;
        this.miniMe_s[this.type] = this.chocolates[this.type].body.clone().addClass("mini"), this.currentScene = this.primaryScene, this.chocolates[this.type].body.hide(), t = 1, n = this.restored;
        for (r in n) e = n[r], t *= e.states.indexOf(1) + 1;
        return this.done.toggleClass("disabled", !t), this.type = null, _()
    }, Card.Script3927.Script.prototype._mixin__choco__current_scene_data_clear = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g, m, b, S, v, y;
        if (null != (l = this.chocolates[this.type].points[this.path[0]]) && l.css({opacity: ""}), this.path.length > 1) {
            for (null != (g = this.chocolates[this.type].to_hide) && g.hide(), this.chocolates[this.type].points[this.path[0]].css({opacity: ""}), m = this.new_states, c = 0, p = m.length; p > c; c++) n = m[c], this.restored[this.type].states[n] = 0, this.chocolates[this.type].cuts[n].removeClass("final").hide();
            this.path = []
        } else if (0 === this.path.length && (this.path = this.restored[this.type].paths.pop(), null != this.path)) for (b = this.chocolates[this.type].points, s = h = 0, f = b.length; f > h; s = ++h) if (o = b[s], i = this.path.indexOf(o.data().idx), i + 1) {
            t = 0 === i || i === this.path.length - 1, o.data({onBoard: t}), S = o.data().cuts;
            for (a in S) e = S[a], v = parseInt(a), r.call(this.path, v) >= 0 && (e.removeClass("final").hide(), this.restored[this.type].states[e.data().idx] = 0)
        }
        for (y = this.chocolates[this.type].points, u = 0, d = y.length; d > u; u++) o = y[u], o.addClass("disabled");
        return this.save.removeClass("disabled"), _()
    }, Card.Script3927.Script.prototype._mixin__choco__choose_chocolate = function (_) {
        var t;
        return this.type = this.obj.data().subType, "chocolate" === this.obj.data().type && null != (t = this.hls[this.type]) && t.css({opacity: 0}), this.currentScene = this.chocoScene, this.chocolates[this.type].body.show(), _()
    }, Card.Script3927.Script.prototype._mixin__choco__update_current_scene_data = function (_) {
        var t, e, n, a, i, s, o, c, h, u, p, f, d, l, g, m;
        for (s = this.clickables.filter(function (_) {
            return _.hasClass("point")
        }), o = 0, u = s.length; u > o; o++) i = s[o], i.addClass("disabled");
        if (this.path.length > 0 ? (t = this.obj.data().cuts[this.path[this.path.length - 1]], t.show(), this.new_states.push(t.data().idx)) : (this.save.addClass("disabled"), this.obj.css({opacity: 1})), this.obj.data().onBoard && this.path.length > 0) {
            for (this.save.removeClass("disabled"), d = this.path, e = c = 0, p = d.length; p > c; e = ++c) {
                n = d[e], e > 0 && this.newBoards[this.type].push(this.chocolates[this.type].points[n]), this.chocolates[this.type].points[n].data({onBoard: !0}), l = this.chocolates[this.type].points[n].data().cuts;
                for (a in l) t = l[a], g = parseInt(a), r.call(this.path.concat(this.obj.data().idx), g) >= 0 && t.addClass("final");
                for (m = this.new_states, h = 0, f = m.length; f > h; h++) n = m[h], this.restored[this.type].states[n] = 1
            }
            this.restored[this.type].paths.push(this.path.concat(this.obj.data().idx)), this.chocolates[this.type].points[this.path[0]].css({opacity: ""}), this.obj = null
        } else this.path.push(this.obj.data().idx);
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__show_hls = function (_) {
        var t, r, e, n;
        for (n = this.wrong_types, r = 0, e = n.length; e > r; r++) t = n[r], this.hls[t].css({opacity: 1});
        return _()
    }, Card.Script3927.Script.prototype._mixin__choco__choose_primary = function (_) {
        return this.currentScene = this.primaryScene, this.done.show(), _()
    };
    var g;
    g = 61, Card.Script3927.create_chocolate = function (_, t, r, e) {
        var n, a, i, s, o, c, h, u, p, f, d, l, m, b, S, v, y, w, C, k, j, x, O, T, A, B, D, E;
        for (c = {
            body: $.div("foil").appendTo(_),
            points: []
        }, n = $.div("chocolate").appendTo(c.body), u = [], y = [], w = r.width, b = {
            top: 0,
            left: 0
        }, D = r.form, d = C = 0, O = D.length; O > C; d = ++C) l = D[d], m = $.div("slice " + t).css(b).data({
            offset: {
                top: b.top,
                left: b.left
            }, inChoco: l
        }).appendTo(n), y.push(m), 0 === (d + 1) % w ? (b.top += g, b.left = 0) : b.left += g;
        for (d = k = 0, T = y.length; T > k; d = ++k) v = y[d], null != y[d - 1] && 0 !== d % w && (a = v.data().inChoco, i = null != y[d - 1].data() ? y[d - 1].data().inChoco : 0, s = null != y[d - w] ? y[d - w].data().inChoco : 0, o = null != y[d - w - 1] ? y[d - w - 1].data().inChoco : 0, a + i + s + o > 1 && (f = $.div("point_holder").css(v.data().offset).appendTo(n), S = $.div("point disabled").appendTo(f), S.append($.div("point_body")), v.data({point: S}), p = v.data().point, p.data({
            type: "point",
            wasThere: !1,
            cuts: {}
        }), c.points.push(S), S.data({idx: c.points.length - 1}), 4 > a + i + s + o && S.data({onBoard: !0}), o && (i && null != y[d - 1].data().point && (h = $.div("cut horizontal").appendTo(f), u.push(h), h.data({
            idx: u.length - 1,
            points: [p, y[d - 1].data().point]
        }), h.css(Card.Script3927.offset(n, h)).appendTo(n), h.hide(), p.data().cuts[y[d - 1].data().point.data().idx] = h, y[d - 1].data().point.data().cuts[p.data().idx] = h), s && null != y[d - w].data().point && (h = $.div("cut vertical").appendTo(f), u.push(h), h.data({
            idx: u.length - 1,
            points: [p, y[d - w].data().point]
        }), h.css(Card.Script3927.offset(n, h)).appendTo(n), h.hide(), p.data().cuts[y[d - w].data().point.data().idx] = h, y[d - w].data().point.data().cuts[p.data().idx] = h))), d + w >= y.length && y[d - 1].data().inChoco && v.data().inChoco && (f = $.div("point_holder").appendTo(n).css({
            top: v.data().offset.top + g,
            left: v.data().offset.left
        }), S = $.div("point disabled").appendTo(f), S.append($.div("point_body")), S.data({
            type: "point",
            wasThere: !1,
            onBoard: !0
        }), v.data({down_point: S}), v.data().down_point.data().cuts = {}, c.points.push(S), S.data({idx: c.points.length - 1}), a && null != v.data().point && (h = $.div("cut vertical").appendTo(f), u.push(h), h.data({
            idx: u.length - 1,
            points: [v.data().down_point, v.data().point]
        }), h.css(Card.Script3927.offset(n, h)).appendTo(n), h.hide(), v.data().down_point.data().cuts[v.data().point.data().idx] = h, v.data().point.data().cuts[v.data().down_point.data().idx] = h)));
        if (e.animated) for (j = 0, A = y.length; A > j; j++) v = y[j], v.data().inChoco || v.remove();
        for (c.slices = y, c.cuts = u, E = c.points, x = 0, B = E.length; B > x; x++) S = E[x], $(S.parent()).appendTo(n);
        return {chocolate: c, toStore: e}
    }, function () {
        var _;
        return _ = function (_) {
            return _.hasClass("uchiru-place") ? _ : _.parents(".uchiru-place:first")
        }, Card.Script3927.fontCirceRounded = function (t) {
            return _(t).addClass("cr").css({lineHeight: 1.29})
        }, Card.Script3927.fontPTSans = function (t) {
            return _(t).removeClass("cr").css({lineHeight: ""})
        }, Card.Script3927.get_place = function (t) {
            return _(t)
        }
    }(), Card.Script3927.olymp_draw_answer = function (_, t) {
        var r, e, n;
        try {
            if (t = JSON.parse(t), null == t) throw void 0;
            if (r = t.answer, null == r) throw void 0;
            return n = $.div("line big cr").css({textAlign: "left"}).appendTo(_), n.html(t.answer)
        } catch (a) {
            return e = a, _.empty()
        }
    }, Card.Script3927.store = function (_) {
        if (window.__olymp && window.localStorage) {
            try {
                window.localStorage[window.__olymp.key] = JSON.stringify(_)
            } catch (t) {
            }
            return window.__olymp.answer = JSON.stringify(_)
        }
    }, Card.Script3927.restore = function () {
        var _, t;
        if (window.__olymp && window.localStorage && window.localStorage[window.__olymp.key]) try {
            return t = JSON.parse(window.localStorage[window.__olymp.key])
        } catch (r) {
            return _ = r, console.log("Bad news: couldn't restore from localStorage")
        }
    }, Card.Script3927.userEvent = function (_, t) {
        return null == t && (t = {}), window.__olymp && window.__olymp.cb ? window.__olymp.cb(_, t) : void 0
    }, Card.Script3927.chocoDatas = function () {
        var _;
        return _ = {
            dark: {
                width: 10,
                form: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                eating_idxs: [[40, 41, 42, 43, 44, 30, 31, 32, 20], [21, 22, 10, 11, 12, 13, 0, 1, 2], [3, 4, 5, 6, 7, 8, 9, 17, 18], [19, 28, 29, 38, 39, 47, 48, 49]],
                answers: [[0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]]
            },
            white: {
                width: 10,
                form: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                eating_idxs: [[27, 28, 29, 35, 38, 39, 45, 46, 47, 48, 49], [5, 6, 7, 8, 9, 18, 19], [40, 41, 42, 43, 44, 30, 31], [0, 1, 2, 3, 4, 10, 11, 12, 20, 21]],
                answers: [[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0]]
            },
            orange: {
                width: 10,
                form: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                eating_idxs: [[8, 9, 18, 19, 28, 29, 38, 39], [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [30, 31, 32, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 10, 11, 12]],
                answers: [[0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1]]
            },
            milk: {
                width: 10,
                form: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                eating_idxs: [[0, 1, 2, 3, 4, 10, 11, 13, 14], [20, 21, 30, 31, 40, 41, 42], [5, 6, 7, 8, 9, 17, 18, 19, 28, 29], [37, 38, 39, 44, 45, 46, 47, 48, 49]],
                answers: [[0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]]
            }
        }
    }, Card.Script3927.GraphProcesses = function () {
        function t(_, t, r) {
            var e, n;
            this.tab = _, this.frames = t, this.graph_opt = null != r ? r : {}, this.dump_state = "v1" === (null != (e = this.graph_opt) ? null != (n = e.supports) ? n.state : void 0 : void 0)
        }

        return t.prototype.on_new_frame = function (_, t) {
            var r;
            return r = $.div("frame active").attr("id", this._frame_div_id(t)).prependTo(this.tab), $.div("title").html("<b>" + t + "</b>").appendTo(r), $.div("current_step").appendTo(r), $.div("state").appendTo(r), $.div("log").appendTo(r), _ ? r.find(".log").append($.div().html("created by " + _.id)) : void 0
        }, t.prototype.on_finish_frame = function (_) {
            var t;
            return t = this._div(_), t.removeClass("active"), t.find(".current_step").empty(), t.find(".state").empty()
        }, t.prototype.on_frame_event = function (_, t, r, e) {
            return this._div(_).find(".log").append($.div().html("<span class=log_time>" + t + "(" + r + ")</span> " + e))
        }, t.prototype.on_tick_end = function () {
            return _(this.frames).each(function (t) {
                return function (r, e) {
                    var n, a;
                    return t.dump_state && (a = t._div(e).find(".state"), a.empty(), _(r.state).each(function (_, r) {
                        return "place" !== r && "tutor" !== r && "salt" !== r && "__" !== r.slice(0, 2) ? a.append("<div>@" + r + " = " + t._dump(_) + "</div>") : void 0
                    })), n = t._div(e).find(".current_step"), r.current_step ? n.empty().html("Current step: <b>" + r.current_step_name + "</b>") : n.empty().html("Current step: <b>null</b>")
                }
            }(this))
        }, t.prototype._div = function (_) {
            return this.tab.find("#" + this._frame_div_id(_))
        }, t.prototype._frame_div_id = function (_) {
            return "frame-" + _.slice(1, _.length)
        }, t.prototype._dump = function (t) {
            var r;
            return t instanceof jQuery ? (r = [], t.each(function () {
                return function (_, t) {
                    return $(t).attr("id") ? r.push("#" + $(t).attr("id")) : r.push("elem")
                }
            }(this)), "$(" + r.join(", ") + ")") : _.isArray(t) ? "[" + _(t).map(function (_) {
                return function (t) {
                    return _._dump(t)
                }
            }(this)).join(", ") + "]" : _.isObject(t) ? "{" + _(t).map(function (_) {
                return function (t, r) {
                    return r + ": " + _._dump(t)
                }
            }(this)).join(", ") + "}" : t
        }, t
    }(), Card.Script3927.__supports = {}, Card.Script3927.__supports.resources = "v2", Card.Script3927.__const = {}, Card.Script3927.__const.primary_title = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.primary_title.ru = {}, Card.Script3927.__const.primary_title.ru.text = "Нажми на любую шоколадку, чтобы приступить к задаче.", Card.Script3927.__const.primary_title.base = {}, Card.Script3927.__const.primary_title.base.speaker_say = "first_time", Card.Script3927.__const.primary_title.en = {}, Card.Script3927.__const.primary_title.ua = {}, Card.Script3927.__const.primary_title.tat = {}, Card.Script3927.__const.primary_title.es = {}, Card.Script3927.__const.choco_title = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.choco_title.ru = {}, Card.Script3927.__const.choco_title.ru.text = "Раздели остаток шоколадки на три одинаковые по форме и размеру части.", Card.Script3927.__const.choco_title.base = {}, Card.Script3927.__const.choco_title.base.speaker_say = "first_time", Card.Script3927.__const.choco_title.en = {}, Card.Script3927.__const.choco_title.ua = {}, Card.Script3927.__const.choco_title.tat = {}, Card.Script3927.__const.choco_title.es = {}, Card.Script3927.__const.right = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.right.ru = {}, Card.Script3927.__const.right.ru.text = "Молодец!<br>Все шоколадки поделены верно.", Card.Script3927.__const.right.base = {}, Card.Script3927.__const.right.base.speaker_say = "first_time", Card.Script3927.__const.right.en = {}, Card.Script3927.__const.right.ua = {}, Card.Script3927.__const.right.tat = {}, Card.Script3927.__const.right.es = {}, Card.Script3927.__const.wrong = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.wrong.ru = {}, Card.Script3927.__const.wrong.ru.text = "Неверно. Подумай ещё.", Card.Script3927.__const.wrong.base = {}, Card.Script3927.__const.wrong.base.speaker_say = "first_time", Card.Script3927.__const.wrong.en = {}, Card.Script3927.__const.wrong.ua = {}, Card.Script3927.__const.wrong.tat = {}, Card.Script3927.__const.wrong.es = {}, Card.Script3927.__const.exit = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.exit.ru = {}, Card.Script3927.__const.exit.ru.text = "Выйти", Card.Script3927.__const.exit.base = {}, Card.Script3927.__const.exit.base.speaker_say = "first_time", Card.Script3927.__const.exit.en = {}, Card.Script3927.__const.exit.ua = {}, Card.Script3927.__const.exit.tat = {}, Card.Script3927.__const.exit.es = {}, Card.Script3927.__const.change_answer = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.change_answer.ru = {}, Card.Script3927.__const.change_answer.ru.text = "Изменить решение", Card.Script3927.__const.change_answer.base = {}, Card.Script3927.__const.change_answer.base.speaker_say = "first_time", Card.Script3927.__const.change_answer.en = {}, Card.Script3927.__const.change_answer.ua = {}, Card.Script3927.__const.change_answer.tat = {}, Card.Script3927.__const.change_answer.es = {}, Card.Script3927.__const.restart = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.restart.ru = {}, Card.Script3927.__const.restart.ru.text = "Отменить разрез", Card.Script3927.__const.restart.base = {}, Card.Script3927.__const.restart.base.speaker_say = "first_time", Card.Script3927.__const.restart.en = {}, Card.Script3927.__const.restart.ua = {}, Card.Script3927.__const.restart.tat = {}, Card.Script3927.__const.restart.es = {}, Card.Script3927.__const.save = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.save.ru = {}, Card.Script3927.__const.save.ru.text = "Сохранить", Card.Script3927.__const.save.base = {}, Card.Script3927.__const.save.base.speaker_say = "first_time", Card.Script3927.__const.save.en = {}, Card.Script3927.__const.save.ua = {}, Card.Script3927.__const.save.tat = {}, Card.Script3927.__const.save.es = {}, Card.Script3927.__const.done = {
        base: {},
        ru: {},
        en: {},
        ua: {},
        tat: {},
        es: {}
    }, Card.Script3927.__const.done.ru = {}, Card.Script3927.__const.done.ru.text = "Готово", Card.Script3927.__const.done.base = {}, Card.Script3927.__const.done.base.speaker_say = "first_time", Card.Script3927.__const.done.en = {}, Card.Script3927.__const.done.ua = {}, Card.Script3927.__const.done.tat = {}, Card.Script3927.__const.done.es = {}, Card.Script3927.__supports.graph = {}, Card.Script3927.__supports.graph.state = "v2", Card.Script3927.__supports.audio = {}, Card.Script3927.__supports.audio.preload = !1, Card.Script3927.__supports.keypad = "v1", Card.Script3927.__assets = ["/48919/3500/1.png", "/48919/3500/2.png", "/48919/3500/3.png", "/48919/3500/4.png", "/48919/3500/5.png", "/48919/3500/6.png", "/48919/3500/7.png", "/48919/3500/8.png", "/48919/3500/9.svg", "/48919/3500/10.svg", "/48919/3500/11.svg", "/48919/3500/12.png", "/48919/3500/13.svg", "/48919/3500/14.svg", "/48919/3500/15.svg", "/48919/3500/16.svg", "/48919/3500/17.svg", "/48919/3500/18.svg", "/48919/3500/19.svg"]
}.call(this);