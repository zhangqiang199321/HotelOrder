!
function(e) {
    function t(n) {
        if (a[n]) return a[n].exports;
        var o = a[n] = {
            "exports": {},
            "id": n,
            "loaded": !1
        };
        return e[n].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var a = {};
    return t.m = e,
    t.c = a,
    t.p = "",
    t(0)
} ([function(e, t, a) {
    "use strict";
    var n = a(1),
    o = n.validMobileFormat,
    i = n.validPassWordFormat,
    c = n.validUnameFormat,
    r = a(2),
    d = r.ajax,
    s = a(3),
    l = s.INITURL,
    p = a(4),
    u = p.modules,
    m = a(5); !
    function() {
        function e(e) {
            for (var t in e) this[t] = e[t]
        }
        var t, a = function(e) {
            1 != u.scriptsMap[e] && m(e,
            function() {
                u.scriptsMap[e] = !0,
                t && (t.scriptsMap[e] = !0)
            },
            function() {
                u.scriptsMap[e] = !1,
                t && (t.scriptsMap[e] = !1)
            })
        },
        n = function(e, t, a) {
            function n(e, t, a) {
                return 1 == u.scriptsMap[e] ? t && t() : 0 == u.scriptsMap[e] ? a && a() : void setTimeout(function() {
                    n(e, t, a)
                },
                10)
            }
            if (e instanceof Array) {
                var o = 0,
                i = 0,
                c = e.length;
                for (var r in e) 0 != e.length && n(e[r],
                function() {
                    o++,
                    o == c ? t && t() : o + i == c && a && a()
                },
                function() {
                    i++,
                    e = [],
                    a && a()
                })
            } else n(e, t, a)
        };
        window.Fingerprint2 ? u.scriptsMap[u.fingerprint2Url] = !0 : a(u.fingerprint2Url),
        window.fingerPrint ? u.scriptsMap[u.fingerprint1Url] = !0 : a(u.fingerprint1Url),
        window.ppStore ? u.scriptsMap[u.ppstore] = !0 : a(u.ppstore),
        window.encryptString ? u.scriptsMap[u.rsaEncryptUrl] = !0 : a(u.rsaEncryptUrl),
        window.ISDCaptcha ? u.scriptsMap[u.slideCodeUrl] = !0 : a(u.slideCodeUrl),
        window.initchallenge ? u.scriptsMap[u.challengePopUrl] = !0 : a(u.challengePopUrl),
        window.SDK_CALLBACK_FUN = {
            "successFun": function(e) {
                return t.successFun(e)
            },
            "wxVerifyCallBack": function(e) {
                return t.wxVerifyCallBack(e)
            }
        },
        e.prototype.validMobileFormat = o,
        e.prototype.validPassWordFormat = i,
        e.prototype.validUnameFormat = c,
        e.prototype.ajax = d,
        e.prototype.successFun = function(e) {
            var t = this,
            a = this;
            if (e.data) if ("0" === e.data.action) {
                var o, i; !
                function() {
                    var n = function() {
                        a.isThirdNewUser ? a.ajax({
                            "url": a.isThirdNewUser,
                            "type": "get",
                            "data": {
                                "path": a.PATH
                            }
                        },
                        function(e) {
                            a.isThirdNewUser = "",
                            a.userCallBack(e)
                        }) : a.userCallBack(e)
                    };
                    if (e.data.crossdomain) for (o = 0, i = 0; i < e.data.crossdomain.length; i++) t.ajax({
                        "url": e.data.crossdomain[i],
                        "type": "get",
                        "data": {}
                    },
                    function() {
                        o++,
                        o === e.data.crossdomain.length && n()
                    },
                    function(t) {
                        200 !== t.status && 4 !== t.readyState || (o++, o === e.data.crossdomain.length && n())
                    });
                    else n()
                } ()
            } else "1" === e.data.action ? 2850 === e.code && "6" === e.data.challengeid ? (this.unLock = function() {
                a.challenge({
                    "resultData": e,
                    "challengeType": a.chellengetype
                },
                a.userCallBack)
            },
            this.userCallBack(e)) : this.userCallBack(e) : "2" === e.data.action ? (this.challenge({
                "resultData": e,
                "challengeType": a.chellengetype
            },
            this.userCallBack), this.userCallBack(e)) : "3" === e.data.action ? "1" === e.data.verifycodetype ? (a.scid = e.data.scid ? e.data.scid: a.scid, a.sctoken = e.data.sctoken ? e.data.sctoken: a.sctoken, n(a.slideCodeUrl,
            function() {
                var t = ISDCaptcha({
                    "element": a.codeElement,
                    "width": parseInt(e.data.scwidth),
                    "type": parseInt(e.data.sctype),
                    "showType": a.showType,
                    "sessionId": e.data.scid,
                    "winAutoShow": !0,
                    "successCallback": function(t) {
                        a.scsuccesstoken = t.successToken,
                        "function" == typeof a.pop_code_callback ? a.pop_code_callback(e) : a.codeCallBack ? a.codeCallBack(t) : a.userCallBack(t)
                    },
                    "failCallback": function(e) {}
                });
                t.init(),
                a.userCallBack(e)
            },
            function() {
                a.userCallBack(a.sourceErrMsg)
            })) : "0" === e.data.verifycodetype ? (a.vcodekey = e.data.vcodekey, this.userCallBack({
                "vcodeimgurl": a.getValidcode + ("?vcodekey=" + e.data.vcodekey + "&time=" + (new Date).getTime()),
                "code": 785,
                "msg": e.msg,
                "data": e.data
            })) : e.data.vcodekey && (a.vcodekey = e.data.vcodekey, this.userCallBack({
                "vcodeimgurl": a.getValidcode + ("?vcodekey=" + e.data.vcodekey + "&time=" + (new Date).getTime()),
                "code": 785,
                "msg": e.msg,
                "data": e.data
            })) : "4" === e.data.action ? window.location.href = e.data.url: "0" === e.code ? this.userCallBack(e) : "1538" === e.code ? this.userCallBack(e) : "1537" === e.code ? this.userCallBack(e) : this.userCallBack(e);
            else this.userCallBack(e)
        },
        e.prototype.init = function(e, t) {
            var a = this;
            l(e, a),
            n([a.fingerprint2Url, a.fingerprint1Url],
            function() {
                var e = function() {
                    a.ajax({
                        "url": a.fingerprintUrl,
                        "type": "get",
                        "data": {
                            "source": a.SOURCE,
                            "finger2": a.finger2
                        }
                    })
                };
                a.finger2 = (new Fingerprint2).get();
                var t = fingerPrint.getnew();
                t.indexOf("_000") !== -1 ? e() : a.fingerprint = t
            },
            function() {}),
            a.ajax({
                "url": a.initUrl,
                "type": "get",
                "data": {
                    "source": e.source ? e.source: "passport",
                    "path": encodeURIComponent(e.path),
                    "ismobilesecretreg": e.ismobilesecretreg
                }
            },
            function(e) {
                e.data && (a.unameLength = e.data.unamelength ? 1 * e.data.unamelength: a.unameLength, a.token = e.data.token ? e.data.token: a.token, a.totalTime = e.data.totalTime ? e.data.totalTime: a.totalTime, a.codeType = 0 === e.data.codetype || e.data.codetype ? e.data.codetype: a.codeType, a.tokenCode = e.data.tokencode ? e.data.tokencode: a.tokenCode, a.prompt = e.data.prompt ? parseInt(e.data.prompt.substr(e.data.prompt.length - 1)) : 0, (e.data.emailtype || 0 === e.data.emailtype) && (a.emailtype = e.data.emailtype)),
                "findPassWord" === a.type || "changePassWord" === a.type || "setPassWord" === a.type ? (a.userCallBack = t ? t: function() {},
                a.successFun(e)) : "changeBind" === a.type ? (a.changebindabilitydata = e.data, t && t(e)) : e.data && e.data.vcodekey ? (a.vcodekey = e.data.vcodekey, t({
                    "vcodeimgurl": a.getValidcode + ("?vcodekey=" + e.data.vcodekey + "&time=" + (new Date).getTime()),
                    "code": 0,
                    "data": e.data
                })) : t && t(e)
            }),
            this.ajax({
                "url": a.rsaUrl,
                "type": "get",
                "data": {
                    "source": e.source ? e.source: "passport"
                }
            },
            function(e) {
                e.data = e.data || {},
                a.rsaExponent = e.data.rsaExponent ? e.data.rsaExponent: a.rsaExponent,
                a.rsaModulus = e.data.rsaModulus ? e.data.rsaModulus: a.rsaModulus
            })
        },
        e.prototype.encrypt = function(e, t, a) {
            var n = this,
            o = 1411093327735 - (new Date).getTime(),
            i = (new Date).getTime() + o;
            return t && (n.rsaExponent = t),
            a && (n.rsaModulus = a),
            encryptString(i + encodeURIComponent(e), n.rsaExponent, n.rsaModulus)
        },
        e.prototype.isLoginState = function(e) {
            var t = this;
            this.ajax({
                "url": t.isLogin,
                "type": "get",
                "data": {
                    "source": t.SOURCE
                }
            },
            function(t) {
                return e(t)
            })
        },
        e.prototype.resetPassword = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {},
            this.validPassWordFormat(e.password, a.prompt, t) && n(a.rsaEncryptUrl,
            function() {
                a.ajax({
                    "url": a.resetPasswordUrl,
                    "type": "get",
                    "data": {
                        "path": a.PATH,
                        "account": e.account,
                        "source": a.SOURCE,
                        "login": !!e.login,
                        "password": a.encrypt(e.password),
                        "resettype": e.resettype,
                        "token": a.token,
                        "warnkey": a.warnkey
                    }
                },
                function(e) {
                    return a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.getVerificationCode = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {},
            a.codeCallBack = e.codeCallBack ? e.codeCallBack: a.codeCallBack,
            a.pop_code_callback = e.pop_code_callback,
            e.token && (a.token = e.token),
            e.codeElement && (a.codeElement = e.codeElement),
            e.abilitycode && (a.changebindabilitydata[e.abilitycode].token && (a.token = a.changebindabilitydata[e.abilitycode].token), a.changebindabilitydata[e.abilitycode].codetype && (a.codeType = a.changebindabilitydata[e.abilitycode].codetype)),
            e.isVerifyNum && !this.validMobileFormat(e.phoneNum, t) || n(a.rsaEncryptUrl,
            function() {
                a.ajax({
                    "url": a.getCode,
                    "type": "get",
                    "data": {
                        "path": a.PATH,
                        "mobile": a.encrypt(e.phoneNum),
                        "codetype": e.codetype ? e.codetype: a.codeType,
                        "token": a.token,
                        "warnkey": "findpassword" === a.warnkeyType ? a.token: a.warnkey,
                        "validcode": e.validcode ? e.validcode: "",
                        "vcodekey": a.vcodekey ? a.vcodekey: "",
                        "scsuccesstoken": a.scsuccesstoken,
                        "sctoken": a.sctoken,
                        "scid": a.scid,
                        "voicetype": e.voicetype ? e.voicetype: 0,
                        "resettype": e.resettype ? e.resettype: "",
                        "abilitycode": e.abilitycode ? e.abilitycode: "",
                        "source": a.SOURCE
                    }
                },
                function(e) {
                    e.data && (a.tokenCode = e.data.tokencode ? e.data.tokencode: a.tokenCode),
                    a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.getEmainCode = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {},
            a.codeCallBack = e.codeCallBack ? e.codeCallBack: a.codeCallBack,
            e.codeElement && (a.codeElement = e.codeElement);
            var o = {
                "source": a.SOURCE,
                "token": a.token,
                "validcode": e.validcode ? e.validcode: "",
                "vcodekey": a.vcodekey ? a.vcodekey: "",
                "scsuccesstoken": a.scsuccesstoken ? a.scsuccesstoken: "",
                "sctoken": a.sctoken,
                "scid": a.scid
            };
            n(a.rsaEncryptUrl,
            function() {
                e.email ? (o.email = a.encrypt(e.email), o.emailtype = a.emailtype) : (o.emailcodetype = a.emailcodetype, o.resettype = "3"),
                a.ajax({
                    "url": a.verifyEmainUrl,
                    "type": "get",
                    "data": o
                },
                function(e) {
                    e.data && (a.tokenCode = e.data.emailtoken ? e.data.emailtoken: a.tokenCode, a.tokenCode = e.data.tokencode ? e.data.tokencode: a.tokenCode),
                    a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.userNameLogin = function(e, t) {
            var a = this;
            if (e.isThirdNewUser && (a.PATH = e.isThirdNewUser), a.codeCallBack = e.codeCallBack ? e.codeCallBack: a.codeCallBack, a.chellengetype = e.chellengetype ? parseInt(e.chellengetype) : 0, a.isThirdNewUser = e.isThirdNewUser ? e.isThirdNewUser: "", this.userCallBack = t ? t: function() {},
            this.validUnameFormat(e.userName, 40, t)) {
                if (!e.passWord) return t({
                    "code": -1,
                    "msg": "请输入密码"
                }),
                !1;
                e.source ? a.SOURCE = e.source: "",
                e.path ? a.PATH = encodeURIComponent(e.path) : "",
                n([a.rsaEncryptUrl, a.fingerprint2Url],
                function() {
                    a.ajax({
                        "url": a.mobileLoginUrl,
                        "type": "post",
                        "callback": "SDK_CALLBACK_FUN.successFun",
                        "data": {
                            "username": e.userName ? e.userName: "",
                            "password": e.passWord ? a.encrypt(e.passWord) : "",
                            "token": a.token,
                            "source": a.SOURCE,
                            "path": a.PATH,
                            "validcode": e.validcode ? e.validcode: "",
                            "vcodekey": e.vcodekey ? e.vcodekey: a.vcodekey ? a.vcodekey: "",
                            "domain": e.domain ? e.domain: a.domain,
                            "scsuccesstoken": a.scsuccesstoken ? a.scsuccesstoken: "",
                            "sctoken": a.sctoken,
                            "scid": a.scid,
                            "finger2": a.finger2,
                            "tenantid": e.tenantid
                        }
                    })
                },
                function() {
                    t && t(a.sourceErrMsg)
                })
            }
        },
        e.prototype.phoneNumLogin = function(e, t) {
            var a = this;
            if (e.isThirdNewUser && (a.PATH = e.isThirdNewUser), a.chellengetype = e.chellengetype ? parseInt(e.chellengetype) : 0, a.isThirdNewUser = e.isThirdNewUser ? e.isThirdNewUser: "", this.userCallBack = t ? t: function() {},
            this.validMobileFormat(e.phoneNum, t)) {
                if (!e.verificationCode) return void t({
                    "code": -1,
                    "msg": "请输入动态码"
                });
                e.source ? a.SOURCE = e.source: "",
                e.path ? a.PATH = encodeURIComponent(e.path) : "",
                n([a.rsaEncryptUrl, a.fingerprint2Url, a.fingerprint1Url],
                function() {
                    a.ajax({
                        "url": a.mobileLoginUrl,
                        "type": "get",
                        "data": {
                            "mobile": e.phoneNum ? a.encrypt(e.phoneNum) : "",
                            "mobilecode": e.verificationCode ? e.verificationCode: "",
                            "source": a.SOURCE,
                            "path": a.PATH,
                            "domain": e.domain ? e.domain: a.domain,
                            "validcode": e.validcode ? e.validcode: "",
                            "vcodekey": e.vcodekey ? e.vcodekey: a.vcodekey ? a.vcodekey: "",
                            "isremember": e.isremember ? e.isremember: "",
                            "tokencode": e.tokenCode ? e.tokenCode: a.tokenCode ? a.tokenCode: "",
                            "token": a.token,
                            "finger2": a.finger2,
                            "fingerprint": a.fingerprint
                        }
                    },
                    function(e) {
                        return a.successFun(e)
                    })
                },
                function() {
                    t && t(a.sourceErrMsg)
                })
            }
        },
        e.prototype.verifyAccount = function(e, t) {
            var a = this,
            n = this;
            this.userCallBack = t ? t: function() {},
            this.ajax({
                "url": n.mobileLoginUrl,
                "type": "get",
                "data": {
                    "source": n.SOURCE,
                    "path": n.PATH,
                    "scsuccesstoken": n.scsuccesstoken,
                    "sctoken": n.sctoken,
                    "scid": n.scid,
                    "account": e.account,
                    "vcodekey": n.vcodekey,
                    "validcode": e.validcode,
                    "tenantid": e.tenantid
                }
            },
            function(e) {
                e.data && (n.token = e.data.token ? e.data.token: n.token, n.codeType = 0 === e.data.codetype || e.data.codetype ? e.data.codetype: n.codeType, n.emailcodetype = e.data.emailcodetype ? e.data.emailcodetype: n.emailcodetype, n.changebindabilitydata = e.data.resettypes ? e.data.resettypes: n.changebindabilitydata),
                a.successFun(e)
            })
        },
        e.prototype.verifyCode = function(e, t) {
            var a, o = this;
            this.userCallBack = t ? t: function() {},
            n(o.rsaEncryptUrl,
            function() {
                a = 3 === parseInt(e.resettype) ? {
                    "emailtoken": o.tokenCode,
                    "emailcode": e.emailcode,
                    "resettype": e.resettype ? e.resettype: "",
                    "abilitycode": e.abilitycode ? e.abilitycode: "",
                    "mobile": e.mobile ? o.encrypt(e.mobile) : "",
                    "codetype": o.codeType
                }: e.email ? {
                    "tokencode": o.tokenCode,
                    "emailcode": e.emailcode,
                    "email": o.encrypt(e.email),
                    "emailtype": o.emailtype
                }: {
                    "tokencode": o.tokenCode,
                    "mobilecode": e.mobilecode,
                    "resettype": e.resettype ? e.resettype: "",
                    "abilitycode": e.abilitycode ? e.abilitycode: "",
                    "mobile": e.mobile ? o.encrypt(e.mobile) : "",
                    "codetype": o.codeType
                },
                a.source = o.SOURCE,
                a.token = o.token,
                o.ajax({
                    "url": o.verifyCodeUrl,
                    "type": "get",
                    "data": a
                },
                function(t) {
                    0 === t.code ? (t.data && (o.prompt = t.data.prompt ? parseInt(t.data.prompt.substr(t.data.prompt.length - 1)) : 0, o.emailtype = t.data.emailtype ? t.data.emailtype: o.emailtype, o.token = t.data.token ? t.data.token: o.token, o.token = t.data.newToken ? t.data.newToken: o.token, o.codeType = 0 === t.data.codetype || t.data.codetype ? t.data.codetype: o.codeType, (0 === t.data.codetype || t.data.codetype) && o.changebindabilitydata[e.abilitycode] && (o.changebindabilitydata[e.abilitycode].codetype = t.data.codetype), t.data.newToken && o.changebindabilitydata[e.abilitycode] && (o.changebindabilitydata[e.abilitycode].token = t.data.newToken), 0 === t.data.ismobilebind ? o.ismobilebind = 0 : o.ismobilebind = t.data.ismobilebind ? t.data.ismobilebind: "", 1 === t.data.ismobilebind ? t.msg = "该账号是密保手机，未达到绑定上限，可注册": 2 === t.data.ismobilebind ? t.msg = "该账号已注册，不能继续注册": 3 === t.data.ismobilebind && (t.msg = "该账号是密保手机，已达到绑定上限，不能继续注册")), o.successFun(t)) : o.successFun(t)
                })
            },
            function() {
                t && t(o.sourceErrMsg)
            })
        },
        e.prototype.phoneNumRegister = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {},
            a.isThirdNewUser = e.isThirdNewUser ? e.isThirdNewUser: "",
            this.validUnameFormat(e.username, a.unameLength, t, !0) && this.validPassWordFormat(e.password, 0, t) && n([a.rsaEncryptUrl, a.fingerprint2Url, a.fingerprint1Url],
            function() {
                a.ajax({
                    "url": a.mobileLoginUrl,
                    "type": "get",
                    "data": {
                        "source": a.SOURCE,
                        "token": a.token,
                        "finger2": a.finger2,
                        "fingerprint": a.fingerprint,
                        "tokencode": a.tokenCode,
                        "ismobilebind": a.ismobilebind,
                        "mobile": a.encrypt(e.mobile),
                        "password": a.encrypt(e.password),
                        "mobilecode": e.mobilecode,
                        "username": e.username,
                        "tenantid": e.tenantid,
                        "ismobilesecretreg": a.ismobilesecretreg
                    }
                },
                function(e) {
                    return a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.bindCellPhone = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {};
            var o = {
                "source": a.SOURCE,
                "tokencode": a.tokenCode,
                "token": a.token,
                "abilitycode": e.abilitycode ? e.abilitycode: "",
                "warnkey": a.warnkey,
                "codetype": a.codeType
            };
            n(a.rsaEncryptUrl,
            function() {
                e.email ? (o.emailcode = e.emailcode, o.email = a.encrypt(e.email)) : (o.mobilecode = e.mobilecode, o.mobile = a.encrypt(e.mobile)),
                a.ajax({
                    "url": a.bindPhoneNumUrl,
                    "type": "get",
                    "data": o
                },
                function(e) {
                    a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.changePassWord = function(e, t) {
            var a = this;
            this.userCallBack = t ? t: function() {},
            this.validPassWordFormat(e.newpwd, a.prompt, t) && n([a.rsaEncryptUrl, a.fingerprint2Url],
            function() {
                a.ajax({
                    "url": a.mobileLoginUrl,
                    "type": "post",
                    "callback": "SDK_CALLBACK_FUN.successFun",
                    "data": {
                        "token": a.token,
                        "source": a.SOURCE,
                        "path": a.PATH,
                        "finger2": a.finger2,
                        "domain": a.domain,
                        "scsuccesstoken": a.scsuccesstoken,
                        "sctoken": a.sctoken,
                        "scid": a.scid,
                        "tokencode": a.tokenCode,
                        "vcodekey": a.vcodekey,
                        "validcode": e.validcode,
                        "oldpwd": a.encrypt(e.oldpwd),
                        "newpwd": a.encrypt(e.newpwd),
                        "password": a.encrypt(e.newpwd)
                    }
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.third = function(e, t) {
            var a = this,
            o = e.biz || "58";
            l(e, a),
            this.userCallBack = t ? t: function() {},
            "login" === e.type ? a.mobileLoginUrl = "//" + a.exchangeDomain + "/thd/" + o + "/oauthlogin/pc/" + e.thirdType: "bind" === e.type ? a.mobileLoginUrl = "//" + a.exchangeDomain + "/thd/" + o + "/oauthbind/pc/" + e.thirdType: a.mobileLoginUrl = "//" + a.exchangeDomain + "/thd/" + o + "/unbind/pc/" + e.thirdType,
            n([a.fingerprint2Url, a.fingerprint1Url],
            function() {
                var t = function() {
                    a.ajax({
                        "url": a.fingerprintUrl,
                        "type": "get",
                        "data": {
                            "source": a.SOURCE,
                            "finger2": a.finger2
                        }
                    })
                };
                a.finger2 = (new Fingerprint2).get();
                var n = fingerPrint.getnew();
                n.indexOf("_000") !== -1 ? t() : a.fingerprint = n,
                a.ajax({
                    "url": a.mobileLoginUrl,
                    "type": "get",
                    "data": {
                        "code": e.code ? e.code: "",
                        "source": e.source,
                        "path": e.path ? encodeURIComponent(e.path) : "",
                        "finger2": a.finger2,
                        "fingerprint": a.fingerprint
                    }
                },
                function(e) {
                    return a.successFun(e)
                })
            },
            function() {
                t && t(a.sourceErrMsg)
            })
        },
        e.prototype.logout = function(e, t) {
            var a = this;
            l(e, a),
            this.ajax({
                "url": a.logoutUrl,
                "type": "get",
                "data": {
                    "source": e.source ? e.source: a.SOURCE
                }
            },
            function(e) {
                return t && t(e)
            })
        },
        e.prototype.wxVerify = function(e, t) {
            var a = this,
            n = this;
            this.userCallBack = t ? t: function() {};
            var o = "//" + n.exchangeDomain + "/sec/" + n.biz + "/wechatauthchallenge/pc/frontenddata";
            n.warnkey = n.changebindabilitydata[e.resettype].warnkey,
            this.ajax({
                "url": o,
                "type": "get",
                "data": {
                    "warnkey": n.warnkey,
                    "source": n.SOURCE
                }
            },
            function(t) {
                t.code ? a.wxVerifyCallBack(t) : a.ajax({
                    "url": "//j1.58cdn.com.cn/js/login/weixinChallenge.js"
                },
                function() {
                    initWeixinChallenge({
                        "source": n.SOURCE,
                        "domain": n.domain,
                        "biz": n.biz,
                        "divid": e.divid,
                        "style": e.style ? e.style: "",
                        "href": e.href ? e.href: "",
                        "state": t.data.token,
                        "callback": "SDK_CALLBACK_FUN.wxVerifyCallBack"
                    })
                })
            })
        },
        e.prototype.challenge = function(e, t) {
            var a = this;
            e.skin && (a.skin = e.skin),
            e.logoHref && (a.logoHref = logoHref);
            var o = e.resultData,
            i = e.challengeType;
            a.warnkey = o.data.warnkey ? o.data.warnkey: o.data.challengeToken ? o.data.challengeToken: a.warnkey,
            a.getCode = "//" + a.exchangeDomain + "/sec/" + a.biz + "/mobile/getcode",
            o.data = o.data || {},
            e.modules = a,
            i ? o.data.url && (location.href = o.data.url) : n(a.challengePopUrl,
            function() {
                initchallenge(e, t)
            },
            function() {
                t(a.sourceErrMsg)
            })
        },
        e.prototype.wxVerifyCallBack = function(e) {
            var t = this,
            a = this,
            n = "//" + a.exchangeDomain + "/sec/" + a.biz + "/wechatauthchallenge/pc/wechatauth";
            this.ajax({
                "url": n,
                "type": "get",
                "data": {
                    "thirdToken": e.data.token,
                    "warnkey": a.warnkey,
                    "source": a.SOURCE
                }
            },
            function(e) {
                e.data = e.data || {},
                a.warnkey = e.data.warnkey ? e.data.warnkey: a.warnkey,
                t.userCallBack(e)
            })
        },
        window.SDK_PC = function() {
            return window.sdk_pc && (window.sdk_pc = void 0),
            t = new e(u)
        },
        window.sdk_pc = SDK_PC()
    } ()
},
function(e, t) {
    "use strict";
    var a = function(e, t) {
        if (!e) return t && t({
            "code": -1,
            "data": {},
            "msg": "请输入手机号"
        }),
        !1;
        var a = /^\d{11}$/,
        n = new RegExp(a);
        if (n.test(e)) {
            var o = /^(13|14|15|16|17|18|19)\d{9}$/,
            i = new RegExp(o);
            return !! i.test(e) || (t && t({
                "code": -1,
                "data": {},
                "msg": "请填写正确的手机号"
            }), !1)
        }
        return t && t({
            "code": -1,
            "data": {},
            "msg": "请填写正确的手机号"
        }),
        !1
    },
    n = function(e, t, a) {
        if (!e) return a && a({
            "code": -1,
            "data": {},
            "msg": "您还未输入密码"
        }),
        !1;
        var n = function(e) {
            for (var e = e.toLowerCase(), t = 0, a = 0; a < e.length; a++) {
                if (e.charCodeAt(a) != t + 1 && 0 != t) return ! 1;
                t = e.charCodeAt(a)
            }
            return ! 0
        },
        o = function(e) {
            for (var e = e.toLowerCase(), t = 0, a = 0; a < e.length; a++) {
                if (e.charCodeAt(a) != t && 0 != t) return ! 1;
                t = e.charCodeAt(a)
            }
            return ! 0
        },
        i = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？_]"),
        c = i.test(e),
        r = !!e.match("(.*[A-Z]+.*)"),
        d = !!e.match("(.*[a-z]+.*)"),
        s = !!e.match(".*[\\d]+.*"),
        l = 0;
        c && l++,
        r && l++,
        d && l++,
        s && l++;
        var p = function() {
            return ! (e.length < 6 || e.length > 16 || o(e) || n(e)) || (a && a({
                "code": -1,
                "data": {
                    "type": "base"
                },
                "msg": "密码长度为6-16位，且不能是相同或连续字符"
            }), !1)
        };
        return !! p() && (t > 3 && (t = 3), !(l < t) || (a && a({
            "code": -1,
            "data": {
                "type": "weak"
            },
            "msg": "至少包含大写字母、小写字母、数字、特殊字符任意" + t + "种"
        }), !1))
    },
    o = function(e, t, a, n) {
        var o;
        return e ? (e = e.replace(/^\s+|\s+$/g, ""), o = n ? e.replace(/[\u0391-\uFFE5]/g, "aa").length: e.length, !(o > t) || (a && a({
            "code": -1,
            "data": {
                "substr": i(e, t)
            },
            "msg": "用户名长度不合法"
        }), !1)) : (a && a({
            "code": -1,
            "data": {},
            "msg": "请输入用户名"
        }), !1)
    },
    i = function(e, t) {
        for (var a = 0,
        n = "",
        o = /[^\x00-\xff]/g,
        i = "",
        c = e.replace(o, "**").length, r = 0; r < c && (i = e.charAt(r).toString(), null != i.match(o) ? a += 2 : a++, !(a > t)); r++) n += i;
        return n
    };
    e.exports = {
        "validMobileFormat": a,
        "validPassWordFormat": n,
        "validUnameFormat": o
    }
},
function(e, t) {
    "use strict";
    var a = function(e) {
        var t = [];
        for (var a in e) t.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
        return t.join("&")
    },
    n = function(e) {
        var t = e.jsonpCallback || "JsonpCallBack" + (new Date).getTime() + Math.floor(1e3 * Math.random()),
        n = document.getElementsByTagName("head")[0];
        e.data["callback"] = t;
        var o = !!window.ActiveXObject && !window.XMLHttpRequest;
        e.time = e.time ? e.time: o ? 6e4: 5e3;
        var i = a(e.data),
        c = document.createElement("script");
        n.appendChild(c),
        c.loaded = !1,
        c.onreadystatechange = c.onload = function() {
            if (!this.readyState || "loaded" == this.readyState) {
                if (c.loaded) return;
                e.error && e.error({
                    "status": 200,
                    "readyState": 4,
                    "readyStateText": this.readyState
                },
                "ParseError"),
                c.onload = c.onreadystatechange = null
            }
        },
        n.appendChild(c),
        window[t] = function(a) {
            c.loaded = !0,
            n.removeChild(c),
            clearTimeout(c.timer),
            window[t] = null,
            e.success && e.success(a)
        },
        e.url.indexOf("?") == -1 ? c.src = e.url + "?" + i: c.src = e.url + "&" + i,
        e.time && (c.timer = setTimeout(function() {
            window[t] = null,
            n.removeChild(c),
            e.error && e.error({
                "message": "请求超时"
            },
            "TimeOut")
        },
        e.time))
    },
    o = function(e, t, a) {
        if (e.data || (e.data = {}), e.data["psdk-d"] = this.psdk_d, e.data["psdk-v"] = this.psdk_v, e.type = e.type || "GET", "POST" === e.type.toUpperCase()) {
            "undefined" != typeof fingerPrint && (this.fingerprint = fingerPrint.getnew(), this.fingerprint.indexOf("_000") !== -1 && (this.fingerprint = "")),
            e.data.fingerprint = this.fingerprint,
            e.data.callback = e.callback;
            var o = document.getElementsByTagName("body")[0],
            i = document.getElementById("iframeId"),
            c = document.getElementById("sdkSubmitForm");
            c && o.removeChild(c),
            i || (i = document.createElement("iframe")),
            i.name = "iframeName",
            i.id = "iframeId",
            i.style.cssText = "position: absolute;left: -1000px;top: -1000px;";
            var r = document.createElement("form");
            r.target = "iframeName",
            r.id = "sdkSubmitForm",
            r.method = "post",
            r.name = "formName",
            r.action = e.url,
            r.style.cssText = "position: absolute;left: -1000px;top: -1000px;";
            for (var d in e.data) if (e.data[d] || 0 === e.data[d]) {
                var s = document.createElement("input");
                s.name = d,
                s.value = e.data[d],
                s.type = "hidden",
                r.appendChild(s)
            }
            o.appendChild(i),
            o.appendChild(r),
            document.getElementById("iframeId").contentWindow.name = "iframeName",
            r.submit(),
            document.domain && 'localhost' && document.domain.indexOf("localhost") != -1 && (document.domain = "localhost")
        } else {
            for (var l in e.data) e.data[l] || 0 === e.data[l] || delete e.data[l];
            var p = {
                "url": e.url,
                "dataType": "jsonp",
                "data": e.data,
                "crossDomain": !0,
                "xhrFields": {
                    "withCredentials": !0
                },
                "success": function(e) {
                    return t && t(e)
                },
                "error": function(e, t, n) {
                    return a && a(e, t, n)
                }
            };
            e.callback && (p.jsonpCallback = e.callback),
            n(p)
        }
    };
    e.exports = {
        "ajax": o
    }
},
function(e, t) {
    "use strict";
    var a = function(e, t) {
        t.exchangeDomain = e.exchangeDomain ? e.exchangeDomain: "passport.58.com",
        t.SOURCE = e.source ? e.source: "",
        t.PATH = e.path ? encodeURIComponent(e.path) : "",
        t.codeElement = e.codeElement ? e.codeElement: "",
        t.type = e.type ? e.type: "",
        t.chellengetype = e.chellengetype ? e.chellengetype: 0,
        t.biz = e.biz ? e.biz: "58",
        t.domain = e.domain ? e.domain: "",
        t.codeCallBack = e.codeCallBack ? e.codeCallBack: "",
        t.showType = e.showType ? e.showType: "trigger",
        t.tenantid = e.tenantid ? e.tenantid: "",
        t.ismobilesecretreg = !!e.ismobilesecretreg && e.ismobilesecretreg,
        t.skin = e.skin,
        t.logoHref = e.logoHref,
        t.position = e.position || "inside",
        t.challengeShowType = e.challengeShowType || "pop",
        t.challengeElement = e.challengeElement || document.getElementsByTagName("body")[0],
        t.getCode = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/getcode",
        t.isLogin = "//" + t.exchangeDomain + "/" + t.biz + "/authorization/login",
        t.fingerprintUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/fingerprint",
        t.resetPasswordUrl = "//" + t.exchangeDomain + "/" + t.biz + "/forget/pc/resetpwd",
        t.getValidcode = "//" + t.exchangeDomain + "/sec/" + t.biz + "/validcode/get",
        t.warnkeyType = "challenge",
        t.rsaUrl = "//" + t.exchangeDomain + "/" + t.biz + "/rsa",
        t.logoutUrl = "//" + t.exchangeDomain + "/logout",
        "phoneNumLogin" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/init", t.mobileLoginUrl = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/pc/login") : "userNameLogin" === e.type ? ("/login/pc/dologin") : "findPassWord" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/" + t.biz + "/forget/pc/init", t.mobileLoginUrl = "//" + t.exchangeDomain + "/" + t.biz + "/forget/pc/confirmaccount", t.verifyEmainUrl = "//" + t.exchangeDomain + "/" + t.biz + "/forget/pc/sendemailcode", t.verifyCodeUrl = "//" + t.exchangeDomain + "/" + t.biz + "/forget/pc/validate", t.warnkeyType = "findpassword") : "phoneNumRegister" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/pc/reg/init", t.verifyCodeUrl = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/pc/reg/domobileregcheck", t.mobileLoginUrl = "//" + t.exchangeDomain + "/" + t.biz + "/mobile/pc/domobilereg") : "bindCellPhone" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/bindmobile/pc/frontenddata", t.verifyCodeUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/checkcode", t.getCode = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/getcode", t.bindPhoneNumUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/bindmobile/pc/bind") : "changeBind" === e.type ? (t.getCode = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/getcode", t.bindPhoneNumUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/changebind/pc/changebind", t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/changebind/pc/ability", t.verifyCodeUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/checkcode") : "changePassWord" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/modifypwd/pc/frontenddata", t.mobileLoginUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/modifypwd/pc/modify") : "setPassWord" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/setpassword/pc/frontenddata", t.mobileLoginUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/setpassword/pc/set") : "changeSecretMobile" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/secretmobile/changebind/pc/frontenddata", t.getCode = "//" + t.exchangeDomain + "/sec/" + t.biz + "/mobile/getcode", t.verifyCodeUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/secretmobile/changebind/pc/checksecretmobile", t.bindPhoneNumUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/secretmobile/changebind/pc/bindsecretmobile") : "bindEmail" === e.type ? (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/frontend/email/pc/binddata", t.verifyEmainUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/email/getcode", t.bindPhoneNumUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/email/pc/bind") : "changeBindEmail" === e.type && (t.initUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/frontend/email/pc/changebinddata", t.verifyCodeUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/email/pc/checkchangebind", t.verifyEmainUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/email/getcode", t.bindPhoneNumUrl = "//" + t.exchangeDomain + "/sec/" + t.biz + "/email/pc/changebind")
    };
    e.exports = {
        "INITURL": a
    }
},
function(e, t) {
    "use strict";
    var a = {
        "rsaExponent": "010001",
        "rsaModulus": "008baf14121377fc76eaf7794b8a8af17085628c3590df47e6534574efcfd81ef8635fcdc67d141c15f51649a89533df0db839331e30b8f8e4440ebf7ccbcc494f4ba18e9f492534b8aafc1b1057429ac851d3d9eb66e86fce1b04527c7b95a2431b07ea277cde2365876e2733325df04389a9d891c5d36b7bc752140db74cb69f",
        "bindPhoneNumUrl": "",
        "getValidcode": "",
        "prompt": "",
        "isLogin": "",
        "initUrl": "",
        "vcodekey": "",
        "codeType": "",
        "verifyCodeType": "",
        "tokenCode": "",
        "resetPasswordUrl": "",
        "rsaUrl": "//passport.58.com/rsa",
        "fingerprintUrl": "",
        "fingerprint": "",
        "finger2": "",
        "mobileLoginUrl": "",
        "token": "",
        "totalTime": "",
        "scriptsMap": {},
        "key1": "",
        "key2": "",
        "type": "",
        "getCode": "",
        "SOURCE": "",
        "PATH": "",
        "domain": "",
        "changebindabilitydata": {},
        "biz": "",
        "emailcodetype": "",
        "verifyEmainUrl": "",
        "verifyCodeUrl": "",
        "codeElement": "",
        "codeCallBack": "",
        "scid": "",
        "sctoken": "",
        "scsuccesstoken": "",
        "ismobilebind": "",
        "isThirdNewUser": "",
        "warnkey": "",
        "warnkeyType": "challenge",
        "chellengetype": 0,
        "showType": "trigger",
        "ismobilesecretreg": !1,
        "tenantid": "",
        "unameLength": 40,
        "exchangeDomain": "passport.58.com",
        "rsaEncryptUrl": "/anjuke/ppt_security.js",
        "fingerprint2Url": "/anjuke/passport_fingerprint2.js",
        "fingerprint1Url": "/anjuke/ppfingerprint.js",
        "ppstore": "/anjuke/ppstore.js",
        "challengePopUrl": "/anjuke/challenge_pop.js",
        "slideCodeUrl": "/anjuke/isd_captcha.js",
        "sourceErrMsg": {
            "code": -2,
            "data": {},
            "msg": "资源加载失败，请刷新重试！"
        },
        "psdk_d": "jsdk",
        "psdk_v": "1.0.1"
    };
    e.exports = {
        "modules": a
    }
},
function(e, t) {
    "use strict";
    e.exports = function(e, t, a) {
        var n = document.getElementsByTagName("head")[0],
        o = document.createElement("script");
        if (o.setAttribute("type", "text/javascript"), o.setAttribute("src", e), n.appendChild(o), o.onload = o.onreadystatechange = function() {
            this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (t && t(), o.onload = o.onreadystatechange = null, a && window.clearTimeout(i))
        },
        a) {
            var i = window.setTimeout(a, 5e3);
            o.error = function() {
                window.clearTimeout(i),
                a()
            }
        }
    }
}]);