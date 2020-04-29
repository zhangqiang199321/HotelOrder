(function () {
	'use strict';

	var ENVIRONMENT = "production";

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var base64 = createCommonjsModule(function (module, exports) {

	  (function (global, factory) {
	     module.exports = factory(global) ;
	  })(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal, function (global) {

	    global = global || {};
	    var _Base64 = global.Base64;
	    var version = "2.5.1"; // if node.js and NOT React Native, we use Buffer

	    var buffer;

	    if ( module.exports) {
	      try {
	        buffer = eval("require('buffer').Buffer");
	      } catch (err) {
	        buffer = undefined;
	      }
	    } // constants


	    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	    var b64tab = function (bin) {
	      var t = {};

	      for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;

	      return t;
	    }(b64chars);

	    var fromCharCode = String.fromCharCode; // encoder stuff

	    var cb_utob = function (c) {
	      if (c.length < 2) {
	        var cc = c.charCodeAt(0);
	        return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
	      } else {
	        var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
	        return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
	      }
	    };

	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

	    var utob = function (u) {
	      return u.replace(re_utob, cb_utob);
	    };

	    var cb_encode = function (ccc) {
	      var padlen = [0, 2, 1][ccc.length % 3],
	          ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
	          chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
	      return chars.join('');
	    };

	    var btoa = global.btoa ? function (b) {
	      return global.btoa(b);
	    } : function (b) {
	      return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };

	    var _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (u) {
	      return (u.constructor === buffer.constructor ? u : buffer.from(u)).toString('base64');
	    } : function (u) {
	      return (u.constructor === buffer.constructor ? u : new buffer(u)).toString('base64');
	    } : function (u) {
	      return btoa(utob(u));
	    };

	    var encode = function (u, urisafe) {
	      return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
	        return m0 == '+' ? '-' : '_';
	      }).replace(/=/g, '');
	    };

	    var encodeURI = function (u) {
	      return encode(u, true);
	    }; // decoder stuff


	    var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');

	    var cb_btou = function (cccc) {
	      switch (cccc.length) {
	        case 4:
	          var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
	              offset = cp - 0x10000;
	          return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);

	        case 3:
	          return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));

	        default:
	          return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
	      }
	    };

	    var btou = function (b) {
	      return b.replace(re_btou, cb_btou);
	    };

	    var cb_decode = function (cccc) {
	      var len = cccc.length,
	          padlen = len % 4,
	          n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
	          chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
	      chars.length -= [0, 0, 2, 1][padlen];
	      return chars.join('');
	    };

	    var _atob = global.atob ? function (a) {
	      return global.atob(a);
	    } : function (a) {
	      return a.replace(/\S{1,4}/g, cb_decode);
	    };

	    var atob = function (a) {
	      return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
	    };

	    var _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (a) {
	      return (a.constructor === buffer.constructor ? a : buffer.from(a, 'base64')).toString();
	    } : function (a) {
	      return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
	    } : function (a) {
	      return btou(_atob(a));
	    };

	    var decode = function (a) {
	      return _decode(String(a).replace(/[-_]/g, function (m0) {
	        return m0 == '-' ? '+' : '/';
	      }).replace(/[^A-Za-z0-9\+\/]/g, ''));
	    };

	    var noConflict = function () {
	      var Base64 = global.Base64;
	      global.Base64 = _Base64;
	      return Base64;
	    }; // export Base64


	    global.Base64 = {
	      VERSION: version,
	      atob: atob,
	      btoa: btoa,
	      fromBase64: decode,
	      toBase64: encode,
	      utob: utob,
	      encode: encode,
	      encodeURI: encodeURI,
	      btou: btou,
	      decode: decode,
	      noConflict: noConflict,
	      __buffer__: buffer
	    }; // if ES5 is available, make Base64.extendString() available

	    if (typeof Object.defineProperty === 'function') {
	      var noEnum = function (v) {
	        return {
	          value: v,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        };
	      };

	      global.Base64.extendString = function () {
	        Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
	          return decode(this);
	        }));
	        Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
	          return encode(this, urisafe);
	        }));
	        Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
	          return encode(this, true);
	        }));
	      };
	    } //
	    // export Base64 to the namespace
	    //


	    if (global['Meteor']) {
	      // Meteor.js
	      Base64 = global.Base64;
	    } // module.exports and AMD are mutually exclusive.
	    // module.exports has precedence.


	    if ( module.exports) {
	      module.exports.Base64 = global.Base64;
	    } // that's it!


	    return {
	      Base64: global.Base64
	    };
	  });
	});
	var base64_1 = base64.Base64;

	function login(callback, ticket, type, path) {
	  var ajkReg = /.anjuke.com$/;
	  var wubaReg = /.58.com$/;
	  var host = window.location.host;
	  path = path || window.location.href;

	  if (ajkReg.test(host)) {
	    window.location.href = "//login.anjuke.com/login/form?history=" + base64_1.encode(path);
	  } else if (wubaReg.test(host)) {
	    window.location.href = window.location.protocol + "//passport.58.com/login/?path=" + encodeURIComponent(path);
	  }
	}

	function logout(path) {
	  var ajkReg = /.anjuke.com$/;
	  var wubaReg = /.58.com$/;
	  var host = window.location.host;
	  path = path || window.location.href;

	  if (ajkReg.test(host)) {
	    if (window.navigator.userAgent.indexOf('Mobile') > -1 || window.navigator.userAgent.indexOf('mobile') > -1) {
	      window.location.href = window.location.protocol + "//m.anjuke.com/member/logout/?history=" + base64_1.encode(path);
	    } else {
	      window.location.href = window.location.protocol + "//member.anjuke.com/user/logout/?history=" + base64_1.encode(path);
	    }
	  } else if (wubaReg.test(host)) {
	    window.location.href = window.location.protocol + "//passport.58.com/logout?path=" + encodeURIComponent(path) + "&back=now";
	  }
	}

	function pageshow(callback) {
	  if (callback === void 0) {
	    callback = function () {};
	  }

	  window.addEventListener('pageshow', function (e) {
	    if (e.persisted) {
	      callback();
	    }
	  });
	}

	/**
	 * m,wx,mp 路由跳转
	 * @param url
	 */

	function redirect(params, backReload) {
	  if (backReload === void 0) {
	    backReload = false;
	  }

	  this.debug && this.debug.log(params, '调用路由跳转param参数');

	  if (!params) {
	    return;
	  }

	  if (backReload) {
	    pageshow(window.location.reload);
	  }

	  if (typeof params === 'string') {
	    window.location.href = params;
	    return;
	  } else {
	    var url = params.content && params.content.url || '';

	    if (!url) {
	      return;
	    }

	    window.location.href = url;
	  }
	}

	function back() {
	  window.history.back();
	}

	/**
	 * 设置标题
	 */
	function setTitle(title) {
	  if (title === void 0) {
	    title = '';
	  }

	  document.title = title;
	}

	function reload() {
	  window.location.reload();
	}

	/**
	 * 动态添加js,请求回来之后在回调函数里面执行你的操作
	 * @param {string} url js地址.
	 * @param {function} callback 加载完毕的回调函数.
	 * @param {string} async 是否异步加载.
	 */
	function loadjs (url, callback, async) {
	  if (async === void 0) {
	    async = true;
	  }

	  if (!url) {
	    return;
	  }

	  function onload() {
	    var readyState = script.readyState;

	    if (typeof readyState == 'undefined' || /^(loaded|complete)$/.test(readyState)) {
	      script.onload = script.onreadystatechange = null;
	      script = null;
	      callback && callback();
	    }
	  }

	  var script = document.createElement('script');
	  script.async = async;

	  if (script.readyState) {
	    script.onreadystatechange = onload;
	  } else {
	    script.onload = onload;
	  }

	  script.src = url;
	  var parent = document.getElementsByTagName('head')[0] || document.body;
	  parent.appendChild(script) && (parent = null);
	}

	var hasLoadJs = false;

	function callApp(params) {
	  this.debug && this.debug.log(params, '调起app方法param参数');
	  var ajkReg = /.anjuke.com$/;
	  var wubaReg = /.58.com$/;
	  var host = window.location.host;

	  if (!params.url) {
	    return;
	  }

	  if (params.url.slice(0, 2) === '//') {
	    params.url = window.location.protocol + params.url;
	  }

	  if (params.callHost === 'ajk') {
	    ajkCallApp(params);
	  } else if (params.callHost === 'wuba') {
	    wubaCallApp(params);
	  } else if (ajkReg.test(host)) {
	    ajkCallApp(params);
	  } else if (wubaReg.test(host)) {
	    wubaCallApp(params);
	  } else {
	    this.debug && this.debug.log(host, 'callApp invoke domain error');
	  }
	}

	function ajkCallApp(params) {
	  if (params.url.indexOf('title=') < 0) {
	    if (params.url.indexOf('?') > -1) {
	      params.url += '&title=' + params.title;
	    } else {
	      params.url += '?title=' + params.title;
	    }
	  }

	  window.location.href = "https://m.anjuke.com/wake/app?jump_target=" + encodeURIComponent(params.url);
	}

	function wubaCallApp(params) {
	  delete params.callHost;

	  if (params.callType == 'jump') {
	    delete params.callType;
	    delete params.callback;
	    window.location.href = "//fangfe.58.com/spage/common/pullApp?params=wbmain://jump/core/" + (params.pagetype === 'link' ? 'link' : 'common') + "?params=" + encodeURIComponent(JSON.stringify(params));
	  } else {
	    delete params.callType;

	    if (hasLoadJs) {
	      if (typeof window.callWbApp === 'function') {
	        if (params.callback && typeof params.callback === 'function') {
	          params.callback();
	        } else {
	          window.callWbApp('#callWbApp', 'other', {
	            jump: 'wbmian://jump/core/common?params=' + encodeURIComponent(JSON.stringify(params))
	          });
	        }
	      }
	    } else {
	      loadjs('//down.58.com/js/callWbApp_2019_min.js', function () {
	        hasLoadJs = true;

	        if (typeof window.callWbApp === 'function') {
	          if (params.callback && typeof params.callback === 'function') {
	            params.callback();
	          } else {
	            window.callWbApp('#callWbApp', 'other', {
	              jump: 'wbmian://jump/core/common?params=' + encodeURIComponent(JSON.stringify(params))
	            });
	          }
	        }
	      });
	    }
	  }
	}

	var ie886SDK = '/anjuke/IE886SDK_20200313_01.js';
	function ie886Init(config, loadjs) {
	  loadjs(ie886SDK, function () {
	    if (window.IE886SDK) {
	      window.IE886SDK(config);
	    }
	  });
	}

	var mSubClass =
	/** @class */
	function () {
	  function mSubClass(resources) {
	    this.defaultConfig = {
	      autoLoadSwitch: true,
	      autoLoadDefault: true,
	      autoLoadArr: [],
	      needIe886: false
	    };
	    this.autoLoadArr = [];
	    this.login = login;
	    this.logout = logout;
	    this.redirect = redirect;
	    this.back = back;
	    this.setTitle = setTitle;
	    this.pageshow = pageshow;
	    this.reload = reload;
	    this.callApp = callApp;
	    this.ie8Proceed();
	    var autoLoadArr = resources.config.autoLoadArr;

	    if (resources.fun && resources.fun.debug) {
	      this.debug = resources.fun.debug;
	    }

	    if (resources.fun && 'function' === typeof resources.fun.deepAssign) {
	      resources.fun.deepAssign(this.defaultConfig, resources.config);
	    }

	    if (this.defaultConfig.autoLoadDefault === false) {
	      this.defaultConfig.autoLoadArr = autoLoadArr;
	    } else {
	      this.defaultConfig.autoLoadArr = this.autoLoadArr.concat(autoLoadArr);
	    }

	    this.debug.log(this.defaultConfig, 'pc.init.config');

	    if (resources.fun && resources.fun.autoLoad) {
	      this.mixAutoLoad = resources.fun.autoLoad;

	      if (this.defaultConfig.autoLoadSwitch === false) {
	        this.mixAutoLoad.autoLoad([]);
	      } else {
	        this.mixAutoLoad.autoLoad(this.defaultConfig.autoLoadArr);
	      }
	    }

	    if (this.defaultConfig.needIe886 === true) {
	      ie886Init(this.defaultConfig.ie886Config || {}, resources.fun.loadjs);
	    }
	  }

	  mSubClass.prototype.ie8Proceed = function () {
	    if (!Array.prototype.forEach) {
	      Array.prototype.forEach = function forEach(callback, thisArg) {
	        var T, k;

	        if (this == null) {
	          throw new TypeError("this is null or not defined");
	        }

	        var O = Object(this);
	        var len = O.length >>> 0;

	        if (typeof callback !== "function") {
	          throw new TypeError(callback + " is not a function");
	        }

	        if (arguments.length > 1) {
	          T = thisArg;
	        }

	        k = 0;

	        while (k < len) {
	          var kValue;

	          if (k in O) {
	            kValue = O[k];
	            callback.call(T, kValue, k, O);
	          }

	          k++;
	        }
	      };
	    }

	    if (!Array.prototype.indexOf) {
	      Array.prototype.indexOf = function (elt
	      /*, from*/
	      ) {
	        var len = this.length >>> 0;
	        var from = Number(arguments[1]) || 0;
	        from = from < 0 ? Math.ceil(from) : Math.floor(from);
	        if (from < 0) from += len;

	        for (; from < len; from++) {
	          if (from in this && this[from] === elt) return from;
	        }

	        return -1;
	      };
	    }
	  };

	  mSubClass.prototype.share = function () {};

	  mSubClass.prototype.ready = function (callback) {
	    this.mixAutoLoad.ready(callback);
	  }; //#region m环境不支持的方法


	  mSubClass.prototype.extendBtn = function () {};

	  mSubClass.prototype.searchCommunity = function () {};

	  mSubClass.prototype.areaInput = function () {};

	  mSubClass.prototype.priceInput = function () {};

	  mSubClass.prototype.nativeSelect = function () {};

	  mSubClass.prototype.controlBack = function () {};

	  mSubClass.prototype.controlGesture = function () {};

	  mSubClass.prototype.getVersion = function () {
	    return '';
	  };

	  mSubClass.prototype.compareVersion = function () {
	    return -1;
	  };

	  mSubClass.prototype.realAuth = function () {};

	  mSubClass.prototype.wechatPay = function () {};

	  mSubClass.prototype.ajkSelectPhoto = function () {};

	  mSubClass.prototype.saveImages = function () {};

	  mSubClass.prototype.hideTitlePanel = function () {};

	  mSubClass.prototype.ajkWbFBPhoto = function () {};

	  mSubClass.prototype.checkPageType = function () {};

	  return mSubClass;
	}();
	window.FlibInit = mSubClass;

}());
