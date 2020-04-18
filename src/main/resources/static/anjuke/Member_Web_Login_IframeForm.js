var APF = {
    log: function(v) {
/*
*/
    }
};

APF.Namespace = {
    register: function(ns){
        var nsParts = ns.split(".");
        var root = window;
        for (var i = 0; i < nsParts.length; i++) {
            if (typeof root[nsParts[i]] == "undefined") {
                root[nsParts[i]] = new Object();
            }
            root = root[nsParts[i]];
        }
        return root;
    }
}

APF.Utils = {
    getWindowSize: function() {
        var myWidth = 0, myHeight = 0;
            if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {
            width: myWidth,
            height: myHeight
        };
    },

    getScroll: function() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return {
            left: scrOfX,
            top: scrOfY
        };
    },

    // http://techpatterns.com/downloads/javascript_cookies.php
    setCookie: function(name, value, expires, path, domain, secure) {
        // set time, it's in milliseconds
        var today = new Date();
        today.setTime(today.getTime());
        /*
            if the expires variable is set, make the correct
            expires time, the current script below will set
            it for x number of days, to make it for hours,
            delete * 24, for minutes, delete * 60 * 24
        */
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));

        document.cookie = name + "=" +escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "" ) +
            ((secure) ? ";secure" : "" );
    },

    // this fixes an issue with the old method, ambiguous values
    // with this test document.cookie.indexOf( name + "=" );
    getCookie: function(check_name) {
        // first we'll split this cookie up into name/value pairs
        // note: document.cookie only returns name=value, not the other components
        var a_all_cookies = document.cookie.split( ';' );
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false; // set boolean t/f default f

        for (i = 0; i < a_all_cookies.length; i++) {
            // now we'll split apart each name=value pair
            a_temp_cookie = a_all_cookies[i].split( '=' );

            // and trim left/right whitespace while we're at it
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            // if the extracted name matches passed check_name
            if (cookie_name == check_name) {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if (a_temp_cookie.length > 1) {
                    cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
            }
            a_temp_cookie = null;
            cookie_name = '';
        }
        if (!b_cookie_found) {
            return null;
        }
    },

    // this deletes the cookie when called
    deleteCookie: function(name, path, domain) {
        if (this.getCookie(name)) {
            document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    setScrollTop: function (n){
        if (document.body) {
            document.body.scrollTop = n;
            if(document.body.scrollTop == 0){
                if (document.documentElement) document.documentElement.scrollTop = n;
            }
        }else if (document.documentElement) {
            document.documentElement.scrollTop = n;
        }
    },

    getScrollTop: function (){
        return document.body ? document.body.scrollTop || document.documentElement.scrollTop : document.documentElement.scrollTop;
    },

    /*
    *
    * APF.Utils.gotoScrollTop(e, s); 这个函数可传两个参数
    * e 是滚动条滚动到什么地方(end)的缩写，如果不传默认是 0
    * s 是滚动条滚动的速度 ，参数值是默认滚动速度的倍数，比如想要加快滚动速度为默认2倍，输入2 ，如果想放慢速度
    *   到默认速度的一半，输入 0.5 。 如果不传默认是 1，就是默认速度。
    */
    gotoScrollTop: function (e, s){
        var t = APF.Utils.getScrollTop(), n = 0, c = 0;
        var s = s || 1;
        var e = e || 0;
        var i = t > e ? 1 : 0;
        (function() {
            t = APF.Utils.getScrollTop();
            n = i ? t - e : e - t;
            c = i ? t - n / 15 * s : t + 1 + n / 15 * s ;
            APF.Utils.setScrollTop( c );
            if (n <= 0 || t == APF.Utils.getScrollTop()) return;
            setTimeout(arguments.callee, 10);
        })();
    }
};
/*
    json2.js
    2015-05-03
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See http://www.JSON.org/js.html
    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html
    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
    This file creates a global JSON object containing two methods: stringify
    and parse. This file is provides the ES5 JSON capability to ES3 systems.
    If a project might run on IE8 or earlier, then this file should be included.
    This file does nothing on ES5 systems.
        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.
            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.
            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.
            This method produces a JSON text from a JavaScript value.
            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value
            For example, this would serialize Dates as ISO strings.
                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 
                            ? '0' + n 
                            : n;
                    }
                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };
            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.
            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.
            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.
            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.
            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.
            Example:
            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'
            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date 
                    ? 'Date(' + this[key] + ')' 
                    : value;
            });
            // text is '["Date(---current time---)"]'
        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.
            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.
            Example:
            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.
            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });
            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });
    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint 
    eval, for, this 
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';
    
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 
            ? '0' + n 
            : n;
    }
    
    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) 
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' 
            : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) 
                ? String(value) 
                : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, '@')
                        .replace(rx_three, ']')
                        .replace(rx_four, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());APF.Namespace.register('ajk');
(function(){
    var logger;
    var siteName = (function(){
        var hostData = document.location.host.match(/^(\w+)\.(\w+)\./);
        if( hostData ){
            return 'pc'
        }else{
            return 'unknown'
        }
    })();

    var rAf = function(callback) {
        window.setTimeout(callback, 1000 / 10);
    };

    ajk.Logger = logger = {
        sojSite:'',
        sojPage:'',
        sojPageName:'',
        errorSite:siteName
    };

    logger.setSite = function(site){
        this.sojSite = site||'';
    }
    logger.setPage = function(page){
        this.sojPage = page||'';
    }
    logger.setPageName = function(pagename){
        this.sojPageName = pagename||'';
    }
    logger.setCtid = function(ctid){
        this.ctid = ctid||'';
    }

    logger.config = {
        devLogURL: '//s.anjuke.test/ts.html?',
        logURL: '//m.anjuke.com/ts.html?',
        devSojURL: '//s.anjuke.test/stb',
        isDev: /dev|test/.test(document.domain),
        blackList: ['Player', 'baiduboxapphomepagetag', 'onTouchMoveInPage']
    };

    logger.isblack = function(str) {
        var self = this;
        var i,
            reg,
            length,
            blackList = self.config.blackList;
        if (typeof str !== 'string') { // 对于非字符串默认黑名单
            return true;
        }
        for (i = 0, length = blackList.length; i < length; i++) {
            reg = new RegExp(blackList[i], 'g');
            if (reg.test(str)) {
                return true;
            }
        };
    }

    logger.sendError = function(params) {
        var self = this;
        var errorinfo = 'tp=error&site='+self.errorSite+'&msg=',
            key,
            url,
            arr = [],
            image,
            msg;
        if (typeof params === 'string') {
            msg = params;
        }
        if (typeof params === 'object') {
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    arr.push(key + ':' + encodeURIComponent(JSON.stringify(params[key])));
                }
            }
            msg = arr.join(',');
        }
        if (self.isblack(msg)) {
            return false;
        }
        image = new Image();
        if (self.config.isDev) {
            url = self.config.devLogURL + errorinfo + msg;
        } else {
            url = self.config.logURL + errorinfo + msg;
        }
        image.src = url;
        return true;
    }

    var getScreen = function() {
        var sinfo = {};
        sinfo.w = $(window).width().toString();
        sinfo.h = $(window).height().toString();
        sinfo.r = (window.devicePixelRatio&&window.devicePixelRatio >= 2 ? 1 : 0).toString();
        getScreen = function() {
            return sinfo;
        };
        return sinfo;
    };

    logger.sendSoj = function(op) {
        var self = this;
        var _site = op.site || self.sojSite,
            soj = new SiteTracker(),
            t_params;
        if (op.customparam) {
            soj.setCustomParam(op.customparam);
        }
        if (self.config.isDev) {
            t_params = {
                'target_url': self.config.devSojURL
            }
        }
        var _page = op.page || self.sojPage, _ctid = self.ctid,
            _pageName = op.pageName || self.sojPageName || _page;
        soj.setPage(_page);
        soj.setPageName(_pageName);
        soj.setSite(_site);
        soj.setScreen(getScreen());
        soj.setNCtid(_ctid);
        soj.setReferer(op.r||document.referrer);
        if( op.NGuid ){
            soj.setNGuid( op.NGuid );
        }
        if( op.NUid ){
            soj.setNUid( op.NUid );
        }
        if(op.h){
            if(!t_params) t_params = {};
            t_params.h = op.h;
        }
        soj.track(t_params);
        // 58 统计
        try{
            if(!/npv/.test(_site)){
                var trackUrl = soj.getParams();
                delete trackUrl.cp;
                delete trackUrl.sc;
                window._trackURL = JSON.stringify(trackUrl);
                loadTrackjs()
            }
        }catch(e){

        }
        function loadTrackjs(){
             var s = document.createElement('script');
             s.type = 'text/javascript';
             s.async = true;
             s.src = '//tracklog.58.com/referrer_anjuke_pc.js?_=' + Math.random();
             var b = document.body;
             s.onload = function () {
                soj.setSite(_site+'-npv');
                soj.setPage(_page+"_tracklog");
                soj.setPageName(_pageName+"_tracklog");
                soj.track(t_params);
             }
             s.onerror = function () {
                soj.setSite(_site+'-npv');
                soj.setPage(_page+"_tracklog_error");
                soj.setPageName(_pageName+"_tracklog_error");
                soj.track(t_params);
             }
             b.appendChild(s);
        }

    }

    logger.addLinkSoj = function(selector, attr, param) {
        $('body').on('click', selector, function(e) {

            var soj = $(this).data(attr || 'soj') || $(this).attr(attr || '_soj'), // 默认使用data，如果取不到，使用attr
                _soj = $.trim(soj), // 去空格
                href = $.trim($(this).attr('href')),
                _param = param || 'from', // 默认是from
                _target = $(this).attr('target'),//兼容各种target
                _hasTarget = _target !== undefined ,
                _href;

            if(!_soj){//如果没获取到soj直接退出让它自己执行自己的href
                return;
            }

            if (!href) { // 此处链接不做合法性检查
                return;
            }
            if (href.toLowerCase().indexOf('javascript') === 0) {
                return;
            }
            //if (!_soj) { // 如果无soj,直接跳转
            //    location.href = href;
            //    return ;
            //}
            e.preventDefault();
            e.stopPropagation();
            href = href.replace(/(&from=(.)*$)|(\?from=(.)*$)/,''); //移除原本url中的from
            _href = (href.indexOf('?') !== -1)? href+'&'+_param+'='+_soj : href+'?'+_param+'='+_soj; //拼接url
            if(_hasTarget){  //是否含有target
               if(!/*@cc_on!@*/0){  //若非ie
                    var winoper = window.open(_href,_target);
                    winoper && winoper.focus();
               }else{
                    var _el = document.createElement('a');
                    _el.href = _href;
                    _el.target = _target;
                    $(_el).appendTo('body').get(0).click();
                    $(_el).remove();
               }
            }else{
               location.href = _href;
            }

        });
    }

    logger.Exposure = function(op) {
        var defaults = {
            site:'',
            trackTag: 'data-trace',
            delay: 50,
            page:'',
            pageName: '',
            NUid:'',
            NGuid:'',
            prefix: ''
        };
        this.ops = $.extend(defaults, op);
        this.domCache = []; // 保存内容
        this.pageViewHeight = $(window).height(); // 页面可视区域高度
        this.timer = null;
        this.dataCache = [];
        this.expStatus = false;
        this.init();
    };
    logger.Exposure.prototype = {
        constructor: logger.Exposure,
        add: function(list) {
            var _this = this;
            this.expStatus = true;
            list.each(function(index, el) {
                _this.domCache.push($(el));
            });
        },
        init: function() {
            var wd = $(window), self = this;
            wd.resize($.proxy(this.resize, this)); // resize
            wd.on('beforeunload', $.proxy(this.beforeunload, this));
            rAf(scroll);
            function scroll(){
                rAf(scroll);
                if (!self.expStatus) {
                    return;
                }
                clearTimeout(self.timer);
                if (self.domCache.length === 0) {
                    self.expStatus = false;
                    self.buildData();
                    return;
                }
                self.timer = setTimeout(function(){
                    $.proxy(self.addData, self)();
                }, self.ops.delay);
            }
        },
        resize: function() {
            this.pageViewHeight = $(window).height();
        },
        beforeunload: function() {
            this.buildData();
        },
        scroll: function() {
        },
        sendExp: function(result) {
            logger.sendSoj({
                'NGuid':this.ops.NGuid,
                'NUid':this.ops.NUid,
                'site':this.ops.site,
                'page':this.ops.prefix + this.ops.page,
                'pageName':this.ops.prefix + this.ops.pageName,
                'customparam':result
            });
        },
        addData: function() {
            var pageViewHeight = this.pageViewHeight,
                topY = $(window).scrollTop(),
                botY = topY + pageViewHeight,
                _this = this;
            if (this.domCache.length === 0) {
                return;
            }
            $.each(this.domCache, function(index, val) {
                var _topY,
                    attr;
                if (!val) {
                    return;
                }
                _topY = val.offset ? val.offset().top : 0;
                if (_topY > topY && _topY < botY) {
                    attr = val.attr(_this.ops.trackTag);
                    if (attr) {
                        _this.dataCache.push(attr);
                    }
                    delete _this.domCache[index];
                }
            });
            this.buildData();
        },
        buildData: function() {
            var _this = this,
                result = {},
                r = [],
                exp,
                key,
                length,
                i;
            /**
             * "{aa:'123'}"
             * 这种格式的数据JSON.parse解析不了，必须用eval才能转成json
             */
            if (this.dataCache.length === 0) { // 如果没有数据就不发送
                return;
            }
            exp = eval('([' + this.dataCache.join(',') + '])');
            this.dataCache = []; // 清除要发送的数据
            for (i = 0, length = exp.length; i < length; i++) {
                for (key in exp[i]) {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push(exp[i][key]);
                }
            }
            for (key in result) { // 不考虑兼容pc 此循环可以用JSON.stringify替换
                r.push('"' + key + '"' + ':[' + result[key].join(',') + ']');
            }
            this.sendExp('{"exposure":{' + r.join(',') + '}}');
            $.each(this.domCache, function(index, val) {
                if (!val) {
                    _this.domCache.splice(index, 1); // 删除已统计过的dom
                }
            });
        }
    };

    // 初始化 jserror
    window.onerror = function(msg, url, line) {
        logger.sendError({
            message: msg,
            url: url,
            line: line
        });
    }

    // 初始化 from
    $(function(){
        logger.addLinkSoj('a[_soj]');
    });
})();;
/**
 * 
 * init pc site login status.
 * 
 * */
var Cloud = {};

Cloud.Base = (function() {
    var uniqInstance;

    function init() {
        var sdk_pc = SDK_PC()
        var isDev = /dev|test/.test(location.href);
        var SOURCE = 'ajk-anjuke-pc',
            SOURCE_FRAME = 'ajk-anjuke-pc',
            PATH = location.origin + '/login/iframeform/',
            DOMAIN = isDev ? 'anjuke.test' : 'anjuke.com',
            BIZ = 'ajk',
            SOURCE2 = 'ajk-anjuke-pc',
            LOGO = '',
            exchangeDomain = 'localhost'
            if(window.self !== window.top) {
                SOURCE = SOURCE_FRAME;
            }
        //  initLoginSite
        var initPhoneLoginSite = function(callback) {
                try {
                    sdk_pc.init({
                        type: 'phoneNumLogin',
                        source: SOURCE,
                        isCheckLoginState: false,
                        domain: DOMAIN,
                        biz: BIZ,
                        path: PATH,
                        exchangeDomain: exchangeDomain,
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO
                    }, function(res){
                        callback(res)
                    })
                } catch (e) {
                    console.log("initPhoneLoginSite", e);
                }
            },
            initUserLoginSite = function(callback) {
                try {
                    sdk_pc.init({
                        type: 'userNameLogin',
                        source: SOURCE,
                        isCheckLoginState: false,
                        domain: DOMAIN,
                        biz: BIZ,
                        path: PATH,
                        exchangeDomain: exchangeDomain,
                        //codeElement: "login-slidecode",
                        //challengeElement: "login-slidecode",
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO
                    }, callback)
                } catch (e) {
                    console.log("initUserLoginSite", e);
                }
            },
            initIframePhoneLoginSite = function(callback) {
                try {
                    sdk_pc.init({
                        type: 'phoneNumLogin',
                        source: SOURCE2,
                        isCheckLoginState: false,
                        domain: DOMAIN,
                        biz: BIZ,
                        path: PATH,
                        exchangeDomain: exchangeDomain,
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green'
                    }, callback)
                } catch (e) {
                    console.log("initIframePhoneLoginSite", e);
                }
            },
            // Get dynamic verification code
            getVerificationCodeBySdk = function(info, callback) {
                // console.log("phone", info.phone);
                // console.log("callback", callback);
                // console.log("vcodekey", info.vcodekey);
                // console.log("voicetype", info.voicetype);
                // console.log("resettype", info.resettype);
                // console.log("abilitycode", info.abilitycode);
                try {
                    sdk_pc.getVerificationCode({
                        source: SOURCE,
                        domain: DOMAIN,
                        biz: BIZ,
                        path: PATH,
                        phoneNum: info.phone,
                        validcode: info.vcodekey,
                        voicetype: info.voicetype,
                        resettype: info.resettype,
                        abilitycode: info.abilitycode,
                        codeElement: "login-slidecode",
                        showType: "embed"
                    }, function(res) {
                        callback(res)
                    });
                } catch (e) {
                    console.log("getVerificationCodeBySdk", e);
                }
            },
            phoneNumberlogin = function(form, verificationCode, callback) {
                // console.log("form", form);
                // console.log("verificationCode", verificationCode);
                // console.log("SOURCE", SOURCE);
                try {
                    sdk_pc.phoneNumLogin({
                        source: SOURCE,
                        path: form.path,
                        phoneNum: form.phoneNum,
                        isThirdNewUser: form.thirdLoginUrl,
                        verificationCode: verificationCode
                    }, function(res) {
                        callback(res)
                    });
                } catch (e) {
                    console.log('sdk_pc.phoneNumLogin', e);
                }
            },
            userNameLogin = function(userName, passWord, validCode, path, callback) {
                // console.log("userName", userName);
                // console.log("passWord", passWord);
                // console.log("validCode", validCode);
                try {
                    sdk_pc.userNameLogin({
                        source: SOURCE,
                        path: path,
                        userName: userName,
                        passWord: passWord,
                        validcode: validCode,
                        codeElement: "login-slidecode",
                        showType: "embed"
                    }, function(res) {
                        callback(res)
                    });
                } catch (e) {
                    console.log("userNameLogin", e);
                }
            },
            thirdLogin = function(thirdInfo, callback) {
                console.log("thirdInfo", thirdInfo);
                try {
                    if (thirdInfo != undefined && thirdInfo != null) {
                        sdk_pc.third({
                            type: thirdInfo.type, //业务类型  login：登录 bind：绑定 untie：解绑
                            thirdType: thirdInfo.thirdType, //第三方账号类型  qq：qq  sina：微博
                            code: thirdInfo.code || '', //授权码
                            chellengetype: thirdInfo.chellengetype || 0,
                            source: SOURCE, //来源  字符串
                            path: thirdInfo.path, //异常流程跳转路径 字符串
                            domain: DOMAIN, //域名  字符串
                            exchangeDomain: exchangeDomain,
                            logoHref: LOGO,
                            challengeElement: thirdInfo.challengeElement,
                            challengeShowType: 'embed',
                            showType: 'embed',
                            skin: 'green',
                            biz: BIZ //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        }, thirdInfo.callback)
                    }
                } catch (e) {
                    console.log('sdk_pc.third', e);
                }
            },
            thirdNewUser = function(bindUrl, callback) {
                try {
                    if (bindUrl != "" && bindUrl != undefined) {
                        sdk_pc.thirdNewUser({
                            url: bindUrl, //后置绑定url  上文中获取
                            path: PATH //目标地址
                        }, callback)
                    }
                } catch (e) {
                    console.log('sdk_pc.thirdNewUser', e);
                }
            },
            initFindPassWordSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "findPassWord", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback)
                } catch (e) {
                    console.log('sdk_pc.init', e);
                }
            },
            findPassWordGetVerificationCode = function(phoneInfo, callback) {
                try {
                    if (phoneInfo != undefined && phoneInfo != null) {
                        sdk_pc.getVerificationCode({
                            source: SOURCE, // 来源 字符串 不传默认是init方法中
                            path: PATH, // 异常流程跳转路径  字符串 不传默认是init方法中
                            phoneNum: phoneInfo.phone, //手机号
                            vcodekey: phoneInfo.vcodekey, //验证码
                            voicetype: phoneInfo.voicetype, //动态码类型 number 0：图片 1：语音  不传默认0
                            codeElement: '' //滑块验证码绑定的元素id(会更换init时传递的元素)
                        }, callback) //获取动态码方法的回调  登录结果会在回调方法参数中带出
                    }
                } catch (e) {
                    console.log('sdk_pc.getVerificationCode', e);
                }
            },
            findPassWordVerificationPhone = function(phoneInfo, callback) {
                try {
                    if (phoneInfo != undefined && phoneInfo != null) {
                        sdk_pc.verifyPhone({
                            source: SOURCE, //来源  字符串
                            path: PATH, //异常流程跳转路径 字符串
                            phoneNum: phoneInfo.phone, //手机号
                            verificationCode: phoneInfo.verificationCode //动态码
                        }, callback) //验证手机号回调 res => 信息
                    }
                } catch (e) {
                    console.log('sdk_pc.getVerificationCode', e);
                }
            },
            resetPassword = function(accountInfo, callback) {
                try {
                    //console.log("accountInfo", accountInfo);
                    if (accountInfo) {
                        // console.log("password", accountInfo.password);
                        // console.log("bIsLogin", accountInfo.bIsLogin);
                        // console.log("resettype", accountInfo.resettype);
                        sdk_pc.resetPassword({
                            source: SOURCE, // 来源 字符串 不传默认是init方法中
                            path: PATH, // 异常流程跳转路径  字符串 不传默认是init方法中
                            account: accountInfo.account, //账号
                            password: accountInfo.password, //密码
                            login: accountInfo.bIsLogin, // 是否自动登录
                            resettype: accountInfo.resettype // 找回密码类型  1-认证手机 2-密保手机 3-邮箱
                        }, callback); // 回调  结果会在回调方法参数中带出
                    }
                } catch (e) {
                    console.log('sdk_pc.resetPassword', e);
                }
            },
            initChangePassWordSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "changePassWord", //  固定 字符串
                        source: SOURCE, //  来源  字符串
                        path: PATH, //  异常流程跳转路径 字符串
                        domain: DOMAIN, //  域名  字符串
                        biz: BIZ, //  区分业务,对应域名( 58.com 对应58, anjuke.com 对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //  滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback) //  res.code === 0验证成功 
                } catch (e) {
                    console.log('sdk_pc.init', e);
                }
            },
            changePassWord = function(account, callback) {
                try {
                    //console.log("account", account);
                    if (account != undefined && account != null) {
                        console.log("sdk_pc.changePassWord");
                        sdk_pc.changePassWord({
                            type: "changePassWord",
                            source: SOURCE, // 来源  字符串
                            path: PATH, // 异常流程跳转路径 字符串
                            validcode: account.validcode,
                            oldpwd: account.oldpwd,
                            newpwd: account.newpwd
                        }, callback);
                    }
                } catch (e) {
                    console.log("sdk_pc.changePassWord", e);
                }
            },
            initSetPassWordSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "setPassWord", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        logoHref: LOGO,
                        skin: 'green'
                    }, callback) //code === 0验证成功 && res.vcodeimgurl : 验证码
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            setPassWord = function(account, callback) {
                try {
                    //console.log("account", account);
                    if (account != undefined && account != null) {
                        sdk_pc.changePassWord({
                            type: "setPassWord", //类型  
                            source: SOURCE, //来源  字符串
                            path: PATH, //异常流程跳转路径 字符串
                            validcode: account.validcode, //验证码（根据策略出）
                            newpwd: account.newpwd //密码
                        }, callback) //回调 res => 信息
                    }
                } catch (e) {
                    console.log("sdk_pc.changePassWord", e);
                }
            },
            verifyCode = function(accountInfo, callback) {
                var mobile = accountInfo.mobile;
                var mobilecode = accountInfo.mobilecode;
                var abilitycode = accountInfo.abilitycode;
                var resettype = accountInfo.resettype;
                try {
                    sdk_pc.verifyCode({
                        mobile: mobile,
                        mobilecode: mobilecode,
                        abilitycode: abilitycode,
                        resettype: resettype
                    }, callback) //code === 0验证成功
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            initBindEmailSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "bindEmail", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback) //code === 0验证成功
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            initChangeBindEmailSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "changeBindEmail", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback) //code === 0验证成功
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            getEmailCode = function (emailInfo, callback) {
                console.log('emailinfo:', emailInfo)
                try {
                    sdk_pc.getEmainCode({
                        email: emailInfo.email, //邮箱
                        validcode: emailInfo.emailcode //邮箱动态码
                    }, callback)
                } catch (e) {
                    console.log("sdk_pc.verifyCode", e);
                }
            },
            unbindEmailVerifyCode = function(emailInfo, callback) {
                try {
                    sdk_pc.verifyCode({
                        email: emailInfo.email, //邮箱
                        emailcode: emailInfo.emailcode//邮箱动态码
                    }, callback)
                } catch (e) {
                    console.log("sdk_pc.verifyCode", e);
                }
            },
            bindEmail = function(emailInfo, callback) {
                try {
                    sdk_pc.bindCellPhone({
                        email: emailInfo.email, //邮箱
                        emailcode: emailInfo.emailcode //邮箱动态码
                    }, callback)
                } catch (e) {
                    console.log("sdk_pc.bindCellPhone", e);
                }
            },
            initChangePhoneSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "changeBind", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback) //code === 0验证成功
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            initBindPhoneSite = function(callback) {
                try {
                    sdk_pc.init({
                        exchangeDomain: exchangeDomain,
                        type: "bindCellPhone", //固定  字符串
                        source: SOURCE, //来源  字符串
                        path: PATH, //异常流程跳转路径 字符串
                        domain: DOMAIN, //域名  字符串
                        biz: BIZ, //区分业务,对应域名(58.com对应58，anjuke.com对应ajk,不传默认为空)
                        showType: "embed",
                        challengeShowType: 'embed',
                        skin: 'green',
                        logoHref: LOGO,
                        codeCallBack: callback //滑块验证码验证成功的回调（不传会走当前方法的回调）
                    }, callback) //code === 0验证成功
                } catch (e) {
                    console.log("sdk_pc.init", e);
                }
            },
            bindPhoneGetVerificationCode = function(account, callback) {
                try {
                    console.log("account", account);
                    if (account != undefined && account != null) {
                        sdk_pc.getVerificationCode({
                            phoneNum: account.phoneNum, //手机号
                            vcodekey: account.vcodekey, //验证码
                            voicetype: account.voicetype, //动态码类型 0：图片 1：语音  不传默认0
                            codeElement: '' //滑块验证码绑定的元素id(会更换init时传递的元素)
                        }, callback); //获取动态码方法的回调  登录结果会在回调方法参数中带出
                    }
                } catch (e) {
                    console.log("sdk_pc.getVerificationCode", e);
                }
            },
            bindPhoneVerifyPhone = function(account, callback) {
                try {
                    //console.log("account", account);
                    if (account != undefined && account != null) {
                        sdk_pc.verifyPhone({
                            source: SOURCE, //来源  字符串
                            path: PATH, //异常流程跳转路径 字符串
                            phoneNum: account.phoneNum, //手机号
                            verificationCode: account.verificationCode //动态码
                        }, callback) //验证手机号回调 res => 信息
                    }
                } catch (e) {
                    console.log("sdk_pc.verifyPhone", e);
                }
            },
            bindCellPhone = function(accountInfo, callback) {
                try {
                    //console.log("account", accountInfo);
                    if (accountInfo) {
                        sdk_pc.bindCellPhone({
                            source: SOURCE, //来源  字符串
                            path: PATH, //异常流程跳转路径 字符串
                            mobile: accountInfo.mobile, //手机号
                            mobilecode: accountInfo.mobilecode, //动态码
                            abilitycode: accountInfo.abilitycode
                        }, callback) //绑定手机号回调 res => 信息
                    }
                } catch (e) {
                    console.log("sdk_pc.bindCellPhone", e);
                }
            },
            verifyAccount = function(accountInfo, callback) {
                try {
                    console.log("account", accountInfo);
                    var account = accountInfo.account;
                    var validcode = accountInfo.validcode;
                    if (accountInfo) {
                        sdk_pc.verifyAccount({
                            source: SOURCE, // 来源 字符串 不传默认是init方法中
                            path: PATH, // 异常流程跳转路径  字符串 不传默认是init方法中
                            account: account, //账号
                            validcode: validcode
                        }, callback) //绑定手机号回调 res => 信息
                    }
                } catch (e) {
                    console.log("sdk_pc.verifyAccount", e);
                }
            },
            loginOut = function(callback) {
                try {
                    sdk_pc.logout({
                        source: SOURCE,
                        exchangeDomain: exchangeDomain
                    }, callback)
                } catch (e) {
                    console.log('sdk_pc.logout', e);
                }
            }

        return {
            initPhoneLoginSite: initPhoneLoginSite,
            initUserLoginSite: initUserLoginSite,
            initFindPassWordSite: initFindPassWordSite,
            initChangePassWordSite: initChangePassWordSite,
            initSetPassWordSite: initSetPassWordSite,
            initBindEmailSite: initBindEmailSite,
            initChangeBindEmailSite: initChangeBindEmailSite,
            initBindPhoneSite: initBindPhoneSite,
            initChangePhoneSite: initChangePhoneSite,
            initIframePhoneLoginSite: initIframePhoneLoginSite,
            getVerificationCodeBySdk: getVerificationCodeBySdk,
            phoneNumberlogin: phoneNumberlogin,
            userNameLogin: userNameLogin,
            thirdLogin: thirdLogin,
            thirdNewUser: thirdNewUser,
            findPassWordGetVerificationCode: findPassWordGetVerificationCode,
            findPassWordVerificationPhone: findPassWordVerificationPhone,
            resetPassword: resetPassword,
            changePassWord: changePassWord,
            setPassWord: setPassWord,
            getEmailCode: getEmailCode,
            unbindEmailVerifyCode: unbindEmailVerifyCode,
            bindPhoneGetVerificationCode: bindPhoneGetVerificationCode,
            bindPhoneVerifyPhone: bindPhoneVerifyPhone,
            bindCellPhone: bindCellPhone,
            bindEmail: bindEmail,
            verifyCode: verifyCode,
            loginOut: loginOut,
            verifyAccount: verifyAccount
        }
    }

    return {
        getInstance: function() {
            if (!uniqInstance) {
                uniqInstance = init();
            }
            return uniqInstance;
        }
    }
})();
/**
 *     __  ___
 *    /  |/  /___   _____ _____ ___   ____   ____ _ ___   _____
 *   / /|_/ // _ \ / ___// ___// _ \ / __ \ / __ `// _ \ / ___/
 *  / /  / //  __/(__  )(__  )/  __// / / // /_/ //  __// /
 * /_/  /_/ \___//____//____/ \___//_/ /_/ \__, / \___//_/
 *                                        /____/
 *
 * @description MessengerJS, a common cross-document communicate solution.
 * @author biqing kwok
 * @version 2.0
 * @license release under MIT license
 */

window.Messenger = (function(){

    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
    // !注意 消息前缀应使用字符串类型
    var prefix = "[PROJECT_NAME]",
        supportPostMessage = 'postMessage' in window;

    // Target 类, 消息对象
    function Target(target, name, prefix){
        var errMsg = '';
        if(arguments.length < 2){
            errMsg = 'target error - target and name are both required';
        } else if (typeof target != 'object'){
            errMsg = 'target error - target itself must be window object';
        } else if (typeof name != 'string'){
            errMsg = 'target error - target name must be string type';
        }
        if(errMsg){
            throw new Error(errMsg);
        }
        this.target = target;
        this.name = name;
        this.prefix = prefix;
    }

    // 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
    if ( supportPostMessage ){
        // IE8+ 以及现代浏览器支持
        Target.prototype.send = function(msg){
            this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
        };
    } else {
        // 兼容IE 6/7
        Target.prototype.send = function(msg){
            var targetFunc = window.navigator[this.prefix + this.name];
            if ( typeof targetFunc == 'function' ) {
                targetFunc(this.prefix + '|' + this.name + '__Messenger__' + msg, window);
            } else {
                throw new Error("target callback function is not defined");
            }
        };
    }

    // 信使类
    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
    function Messenger(messengerName, projectName){
        this.targets = {};
        this.name = messengerName;
        this.listenFunc = [];
        this.prefix = projectName || prefix;
        this.initListen();
    }

    // 添加一个消息对象
    Messenger.prototype.addTarget = function(target, name){
        var targetObj = new Target(target, name,  this.prefix);
        this.targets[name] = targetObj;
    };

    // 初始化消息监听
    Messenger.prototype.initListen = function(){
        var self = this;
        var generalCallback = function(msg){
            if(typeof msg == 'object' && msg.data){
                msg = msg.data;
            }

            // 防止其他postMessage方法向内部传递消息引发错误
            if ( !msg.split ) {
                return false;
            }

            var msgPairs = msg.split('__Messenger__');
            var msg = msgPairs[1];
            var pairs = msgPairs[0].split('|');
            var prefix = pairs[0];
            var name = pairs[1];


            for(var i = 0; i < self.listenFunc.length; i++){

                if (prefix + name === self.prefix + self.name) {
                    self.listenFunc[i](msg);
                }
            }
        };

        if ( supportPostMessage ){
            if ( 'addEventListener' in document ) {
                window.addEventListener('message', generalCallback, false);
            } else if ( 'attachEvent' in document ) {
                window.attachEvent('onmessage', generalCallback);
            }
        } else {
            // 兼容IE 6/7
            window.navigator[this.prefix + this.name] = generalCallback;
        }
    };

    // 监听消息
    Messenger.prototype.listen = function(callback){
        var i = 0;
        var len = this.listenFunc.length;
        var cbIsExist = false;
        for (; i < len; i++) {
            if (this.listenFunc[i] == callback) {
                cbIsExist = true;
                break;
            }
        }
        if (!cbIsExist) {
            this.listenFunc.push(callback);
        }
    };
    // 注销监听
    Messenger.prototype.clear = function(){
        this.listenFunc = [];
    };
    // 广播消息
    Messenger.prototype.send = function(msg){
        var targets = this.targets,
            target;
        for(target in targets){
            if(targets.hasOwnProperty(target)){
                targets[target].send(msg);
            }
        }
    };

    return Messenger;
})();
/**
 * 用户中心登录的iframe页面
 * 文档：http://gitlab.corp.anjuke.com/_site/docs/blob/master/API/%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83/%E6%96%B0%E7%89%88%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83%E6%8E%A5%E5%8F%A3.md
 * developer: yaohuiwang@anjuke.com & guolichen 2016-08-01
 */
;APF.Namespace.register("ajk");
(function($, ns) {

    ns.phoneForm = function(op) {
        var self = this;
        self.custom_class = op.custom_class;
        self.defaults = {
            countTime           : 60,                      // 倒计时多长时间(s)
            autoSustain         : true,                    // captcha验证成功后是否执行自动点击
            submitAutoSustain   : false,                   // captcha验证成功后是否执行自动提交
            countInterval       : 1000,                    // 倒计时的速度（ms）
            smsLength           : [4,5,6],                       // smscode是几位的
            captchaLength       : 4,                       // captcha是几位的
            phoneLength         : 11,                      // 手机号是几位的
            curTabClassName     : "cur",                   // 当前tabclass名
            hiddenClassName     : "hidden",                // 隐藏元素class名
            noneClassName       : "none",                  // 隐藏元素class名
            activeItemClassName : "active-item",           // 激活的输入框class名
            checkedClassName    : "checkbox-fake-checked",           // 激活的输入框class名
            errorItemClassName  : "error-item",            // 报错输入框class名
            autoUlHoverClassName : "cur",                  // 报错输入框class名
            smsHideClassName    : "control-item-sms-hide", // 使sms框隐藏的class名,显示captcha
            domainNodeClass     : ".domainNode",           // 自动补全邮箱的class名
            emailNodeClass      : ".emailNode",            // 自动补全邮箱的class名
            smsDisableClassName : "sms-disabel-btn",       // 禁用获取sms按钮的class名
            submitDisableClassName : "submit-disable-btn", // 禁用提交按钮的class名
            tipWrongNum         : "请输入正确手机号码",
            tipWrongNumOrSms    : "验证码错误",
            submiting_text      : "登录中，请稍后...",
            submit_text         : "立即登录",
            submiting_function  : 1,
            phoneEmptyTip       : "请输入手机号码",
            smsEmptyTip         : "请输入动态码",
            captchaEmptyTip     : "请输入验证码",
            userNameEmptyTip    : "请输入手机号、邮箱或安居客用户名",
            pwdEmptyTip         : "请输入密码",
            bHasSend            : false,
            bShowPassword       : true,
            resettypes          : 0,
            voicetype           : 0,
            sPsswordOpenImg     : '/layui/images/img/icon_eyeopen@3x.png',
            sPsswordCloseImg    : '/layui/images/img/icon_eyeclose@3x.png'
        };
        self.ops = $.extend({}, self.defaults, op);
        self.nodes = {
            autoUl           : $("#autoUl" + self.custom_class),
            //smsCheckboxLabel : $("#smsCheckboxLabel"),
            errorItemTop     : $("#errorItemTop" + self.custom_class),
            phoneIpt              : $("#phoneIpt" + self.custom_class),
            phoneCleanBtn         : $("#phoneCleanBtn" + self.custom_class),
            smsTitle              : $("#smsTitle" + self.custom_class),
            smsCaptchaRefreshBtn  : $("#smsCaptchaRefreshBtn" + self.custom_class),
            smsLoginForm          : $("#smsLoginForm" + self.custom_class),
            sendSmsBtn            : $("#sendSmsBtn" + self.custom_class),
            smsIpt                : $("#smsIpt" + self.custom_class),
            smsIptItem            : $("#smsIptItem" + self.custom_class),
            smsCleanBtn           : $("#smsCleanBtn" + self.custom_class),
            //smsCheckbox           : $("#smsCheckbox"),
            smsCaptchaIpt         : $("#smsCaptchaIpt" + self.custom_class),
            smsTransitionNode     : $("#smsTransitionNode" + self.custom_class),
            smsSubmitBtn          : $("#smsSubmitBtn" + self.custom_class),
            vcodeblock            : $("#vcodeblock" + self.custom_class),
            oVoiceCode            : $("#oVoiceCode" + self.custom_class),
            oVoiceCodeBtn         : $("#oVoiceCodeBtn" + self.custom_class),
            loginSlidecode        : $("#login-slidecode")
        };

        self.initSmsBtnHtml = self.nodes.sendSmsBtn.html();

        // 存放表单字段是否合法的状态
        self.state = {
            agree       : true,  // 标记：是否同意＊
            captcha     : false, // 标记：captcha是否合法＊
            captchaFrom : "",    // 标记：出现验证码是因为点击了“sms”还是“submit”
            captchaShowed : false, //  标记：captcha输入框是否在页面上
            needCaptcha : false, // 标记：是否需要出现captcha
            canSendSms  : false, // 标记：是否可以发送验证码（点击发送验证码看这个）
            canSmsSubmit : false, // 标记：是否可以登录
            counting    : false, // 标记：正在倒计时
            sms         : false, // 标记：smscode合法＊
            phone       : false, // 标记：手机号合法＊
            submit      : false, // 标记：在@trySubmitSmsForm里设置提交表单时是否需要验证码
            submiting   : false  // 标记：正在提交
        };

        self._init();
    }

    ns.phoneForm.prototype._init = function() {
        var self = this;
        self._bindEvent();
        self.nodes.phoneIpt.focus();
    }

    ns.phoneForm.prototype._bindEvent = function() {
        var self = this;

        // 刷新captcha
        self.nodes.smsCaptchaRefreshBtn.on("click", function(e) {
            self.refreshCaptcha();
        });

        self.nodes.vcodeblock.on("click", function(e) {
            self.refreshCaptcha();
        });

        // 输入手机号码（sms）
        self.nodes.phoneIpt.on("input propertychange change", function(e) {
            if (self.nodes.phoneIpt.val().length > 0 && self.nodes.phoneIpt.val().length < 11) {
                self.nodes.phoneCleanBtn.show();
            } else {
                self.nodes.phoneCleanBtn.hide();
            }
            self.validateEmpty()
            self.validatePhoneEmpty();
        });

        self.nodes.phoneIpt.on("focus", function(e) {
            if (self.nodes.phoneIpt.val().length > 0 && self.nodes.phoneIpt.val().length < 11) {
                self.nodes.phoneCleanBtn.show();
            }
            if (!self.nodes.phoneIpt.attr('readonly')) {
                self.toggleFocus(this, true);
            }
            self.validatePhoneEmpty();
            self.phoneIptHandler();
        });

        self.nodes.phoneIpt.on("blur", function(e) {
            setTimeout(function(){
                self.nodes.phoneCleanBtn.hide();
            }, 300)
            self.toggleFocus(this, false);
            self.phoneIptHandler();
        });

        // 清除手机号
        self.nodes.phoneCleanBtn.on("click", function(e) {
            self.nodes.phoneCleanBtn.hide();
            self.nodes.phoneIpt.val("");
            self.nodes.phoneIpt.focus();
        })

        // sms ipt
        self.nodes.smsIpt.on("focus", function(e) {
            if (self.nodes.smsIpt.val().length > 0 && self.nodes.smsIpt.val().length < 11) {
                self.nodes.smsCleanBtn.show();
            }
            self.toggleFocus(this, true);
        });

        self.nodes.smsIpt.on("input propertychange", function(e) {
            var val = self.nodes.smsIpt.val();
            if (val.length > 0) {
                self.nodes.smsCleanBtn.show();
            } else {
                self.nodes.smsCleanBtn.hide();
            }
            self.validateEmpty()
        });

        self.nodes.smsIpt.on("blur", function(e) {
            self.toggleFocus(this, false);
            self.validateSms();
        });

        // 清除验证码
        self.nodes.smsCleanBtn.on("click", function(e) {
            self.nodes.smsIpt.focus();
            self.nodes.smsIpt.val("");
            self.nodes.smsCleanBtn.hide();
        })

        /**
         * getVerifyCode
         */
        self.nodes.sendSmsBtn.on('click', function(e) {
            var phone = self.getPhone();

            self.validatePhone();
            if ( !self.state.phone ) {
                return;
            }

            if (self.ops.submiting_function == 1) {
                //登录逻辑
                try {
                    self.getEconomicInfo(phone, function(data) {
                        try {
                            if (data.code === 0) {
                                self.getVerifyCode();
                            } else {
                                self.toast('经纪人账号不能登录');
                            }
                        } catch (e) {
                            self.toast('经纪人账号不能登录');
                            console.log(e);
                        }
                    });
                } catch (e) {
                    console.log('e', e);
                    // alert(e);
                }
            } else if (self.ops.submiting_function == 2) {
                //找回密码逻辑
                self.getVerifyCode();
            } else if (self.ops.submiting_function == 3 || self.ops.submiting_function == 4 || self.ops.submiting_function == 5) {
                self.getVerifyCode();
            } else if (self.ops.submiting_function == 6) {
                
            }

            
        });

        self.nodes.oVoiceCodeBtn.on("click", function(e) {
            self.ops.voicetype = 1;
            self.getVerifyCode();
            return false;
        })

        // captcha(sms)
        self.nodes.smsCaptchaIpt.on("focus", function(e) {
            self.toggleFocus(this, true);
        });

        self.nodes.smsCaptchaIpt.on("blur change keyup", function(e) {
            var val = $.trim($(this).val());
            // console.log(e.type);
            if(e.type === 'change' || e.type === 'keyup') {
                if(val.length !== self.ops.captchaLength) {
                    return ;
                }
            }
            e.stopImmediatePropagation();
            self.toggleFocus(this, false);
            self.validateCaptcha("sms");
        });

        /**
         *  登录
         */
        self.nodes.smsSubmitBtn.on('click', function(e) {
            if ($(this).hasClass("common-btn")) return;
            self.triggeVerifyCode();
        });

    } // bindEvent -end

    // 提交表单之前的设置
    ns.phoneForm.prototype.beforeSubmit = function() {
        var self = this;
        var countingDown = self.nodes.sendSmsBtn.html().match(/\d+/);
        if (countingDown) {
            self.nodes.continueCountTimeNode.val( countingDown[0] );
        }
    }

    // 登录中 请稍后
    ns.phoneForm.prototype.setSubmitting = function(form) {
        var self = this;
        var btn = self.nodes[form + "SubmitBtn"];
        btn.addClass( self.ops.submitDisableClassName ).val( self.ops.submiting_text );
    }

    // 判断smsForm能否提交
    ns.phoneForm.prototype.canSmsFormSubmit = function(synced) {
        var self = this;
        var state = self.state;
        var sync = state.agree && state.phone && state.sms;
        if (synced) {
            return sync;
        }
        var first = sync && state.submit;
        if ( state.needCaptcha ) {
            return first && state.captcha;
        } else {
            return first;
        }
    }

    // 输入框聚焦，显示聚焦样式，去除与node相对应的错误提示
    ns.phoneForm.prototype.toggleFocus = function(node, b, errorOnTop, pwd) {
        var self = this;
        var controlItemNode = $(node).parents(".controlItemNode");
        if (b) {
            controlItemNode.addClass( self.ops.activeItemClassName );
        } else {
            controlItemNode.removeClass( self.ops.activeItemClassName );
        }
    }

    // 控制captcha的显隐
    ns.phoneForm.prototype.toggleCaptcha = function(b) {
        var self = this;
        var state = self.state;
        var captchaIpt = self.nodes.smsCaptchaIpt;
        var fowordIpt = self.nodes.smsIpt;
        var captchaRefreshBtn = self.nodes.smsCaptchaRefreshBtn;
        var transitionNode = self.nodes.smsIptItem;
        state.captchaShowed = b;
        if (b) {
            captchaIpt.val("");
            state.captcha = false;
            captchaRefreshBtn.click();
            transitionNode.addClass( self.ops.smsHideClassName );
            captchaIpt.prop("tabindex", 3);
            fowordIpt.prop("tabindex", -1);
            captchaIpt.prop("readonly", false);
        } else {
            transitionNode.removeClass( self.ops.smsHideClassName );
            captchaIpt.prop("tabindex", -1);
            fowordIpt.prop("tabindex", 2);
            captchaIpt.prop("readonly", true);
        }
        $("body").focus(); // trigger captcha & smsIpt blur，防止captcha卡住
    }

    // 开始倒计时
    ns.phoneForm.prototype.countDown = function(defaultCountTime) {
        var self = this;
        var initHtml = self.nodes.sendSmsBtn.html();
        var againHtml = "重新发送";
        var countTime = defaultCountTime || self.ops.countTime;
        self.state.counting = true;
        self.nodes.sendSmsBtn.addClass( self.ops.smsDisableClassName );
        setTimeout(function countTimer() {
            if ( countTime-- === 0 ) { // 倒计时结束
                self.state.counting = false;
                if ( self.state.canSendSms ) { // 可以发送短信
                    self.nodes.sendSmsBtn.html(againHtml);
                    self.nodes.sendSmsBtn.removeClass( self.ops.smsDisableClassName );
                } else { // 不可发送短信（当前手机号非法或captcha尚未通过验证）
                    self.nodes.sendSmsBtn.html(self.initSmsBtnHtml);
                }
            } else {
                self.nodes.sendSmsBtn.html(countTime + "s后重新发送");
                setTimeout(countTimer, self.ops.countInterval);
            }
        }, self.ops.countInterval);
    }

    // 验证captcha
    ns.phoneForm.prototype.validateCaptcha = function(form) {
        var self = this;
        var state = self.state;
        var captchaIpt = self.nodes[form + "CaptchaIpt"];
        var val = captchaIpt.val()
        
        self["inputedCaptcha" + form] = val;

        if ( captchaIpt.prop("readonly") || !state.needCaptcha ) {
            return false;
        }

        self.triggerValidateImageCode();
    }

    //验证
    ns.phoneForm.prototype.triggeVerifyCode = function() {
        var self = this;
        // initLoginSite(triggerPhoneLoginCallBack);

        if (!self.validateSubmit('sms')) {
            return
        }

        if (self.ops.bHasSend) {
            if (self.ops.submiting_function == 1){
                self.getEconomicInfo(self.getPhone(), function(data) {
                    if (data.code === 0) {

                        var form = {
                            phoneNum: self.getPhone()
                        };
                        if (self.ops.thirdLoginUrl) {
                            form.thirdLoginUrl = self.ops.thirdLoginUrl
                        }
                        var smsCode = self.nodes.smsIpt.val();
                        Cloud.Base.getInstance().phoneNumberlogin(form, smsCode, function(response){
                            //console.log("loginSuccessResponse", response);

                            if (response.code === 0) {
                                //self._sendSuccess();
                                //top.location.href = self.ops.history || top.location.href;
                            
                                location.href = '/login/success' + location.search;
                                
                                //window.location.href = $('#redirect_uri').val();
                                return;
                            }
                            // 2578 出滑块，不需要toast

                            self.toast(response.msg);
                            if(response.code == 2578) {
                                return ;
                            }

                            if (response.code == 1548 && self.ops.thirdLoginUrl) {
                                setTimeout(function(){
                                    top.location.href = self.ops.history || top.location.href;
                                }, 1500)
                                
                                //window.location.href = $('#redirect_uri').val();
                                return;
                            }
                        });
                    } else {
                        self.toast('经纪人账号不能登录');
                    }
                });
            } else if (self.ops.submiting_function == 2) {
                Cloud.Base.getInstance().verifyCode({
                    mobilecode: self.nodes.smsIpt.val(),
                    resettype: 1
                }, function(response) {
                    if (response.code === 0){
                        $('#phoneForm').hide();
                        $('#pwdForm').show();
                        //top.location.href = self.ops.history || location.origin;
                    } else {
                        self.toast(response.msg);
                    }
                })
            } else if (self.ops.submiting_function == 3) {
                Cloud.Base.getInstance().verifyCode({
                    mobile: self.getPhone(),
                    mobilecode: self.nodes.smsIpt.val(),
                    abilitycode: 11
                }, function(response) {
                    if (response.code === 0){
                        $('#unbindPhone').addClass('none');
                        $('#bindPhone').removeClass('none');
                        //top.location.href = self.ops.history || location.origin;
                    } else {
                        self.toast(response.msg);
                    }
                })
            } else if (self.ops.submiting_function == 4) {
                Cloud.Base.getInstance().bindCellPhone({
                    mobile: self.getPhone(),
                    mobilecode: self.nodes.smsIpt.val(),
                    abilitycode: 11
                }, function(response) {
                    if (response.code === 0){
                        location.href = '/user/profile';
                        //top.location.href = self.ops.history || location.origin;
                    } else {
                        self.toast(response.msg);
                    }
                })
            } else if (self.ops.submiting_function == 5) {
                Cloud.Base.getInstance().bindCellPhone({
                    mobile: self.getPhone(),
                    mobilecode: self.nodes.smsIpt.val()
                }, function(response) {
                    if (response.code === 0){
                        location.href = '/user/profile';
                        //top.location.href = self.ops.history || location.origin;
                    } else {
                        self.toast(response.msg);
                    }
                })
            }
            
        } else {
            self.toast('请获取验证码');
        }
    }

    ns.phoneForm.prototype.bindThirdNewUser = function() {
        var self = this;
        var cloudUtilInstance = CloudUtil.Singleton.getInstance(),
            cloudBaseInstance = Cloud.Base.getInstance();

        var bindUrl = localStorage.getItem("thridLoginUrl");

        return bindUrl;
    }

    ns.phoneForm.prototype.getEconomicInfo = function(account, success, fail){
        var economicUrl = location.origin + '/login/checkbroker';
        $.ajax({
            url: economicUrl,
            type: 'get',
            data: {
                account: account
            },
            dataType: 'json',
            success: function(data) {
                success(data);
            },
            error: function(err) {
                console.log(err);
                fail(err);
            }
        });
    }

    ns.phoneForm.prototype.triggerValidateImageCode = function() {
        var self = this;
        var data = {
            phone: self.getPhone(),
            voicetype : self.ops.voicetype,
            vcodekey: self.nodes.smsCaptchaIpt.val()
        };

        if (self.ops.submiting_function == 2) {
            data.resettype = 1;
        }

        if (self.ops.submiting_function == 3 || self.ops.submiting_function == 4) {
            data.abilitycode = 11;
        }
        Cloud.Base.getInstance().getVerificationCodeBySdk(data, function(response) {
            self.toast(response.msg);

            if (response.code === 0) {
                self.toggleCaptcha(false);
                self.ops.bHasSend = true;
                self.countDown(self.ops.continueCountTime);
            } else if (response.data && response.data.verifycodetype === '1') {
                        
            } else if (response.code !== 0) {
                self.toast(response.msg);
                // refreshVerifyCode(response.vcodeimgurl)
            } else {
                // alert("msg"+response.msg);
                // cloudUtilInstance.toast("imge");
                self.toast(response.msg);
            }
            //console.log("handleValidateImageCodeResponse", response);
        });        
        
    }

    ns.phoneForm.prototype.getVerifyCode = function() {
        var self = this;
        self.getVerificationCodeCallBack();
        return;
    }

    /**
     * init login callback method
     *
     * @param {*} response
     */
    ns.phoneForm.prototype.getVerificationCodeCallBack = function(response) {
        var self = this;
        //console.log('getVerificationCode', response);

        var data = {
            phone: self.getPhone(),
            voicetype : self.ops.voicetype,
            vcodekey: ''
        };

        if (self.ops.submiting_function == 2) {
            data.resettype = 1;
        }

        if (self.ops.submiting_function == 3 || self.ops.submiting_function == 4) {
            data.abilitycode = 11;
        }

        Cloud.Base.getInstance().getVerificationCodeBySdk(data, function(response) {
            // handle image verify code.
            if (response.vcodeimgurl) {
                self.state.needCaptcha = true;
                self.refreshVerifyCode(response.vcodeimgurl);
            } else if (response.data && response.data.verifycodetype === '1') {
                // slide verifyCode
                // $('#login-slidecode').show();
                // console.log("login-slidecode");
            } else if (response.code && response.code !== 0) {
                self.toast(response.msg);
            } else if (response.code === 0) {
                self.ops.bHasSend = true;
                self.countDown(self.ops.continueCountTime);
                self.nodes.oVoiceCode.show();
            }
            if (response.responseId) {
                //Cloud.Base.getInstance().getVerificationCodeBySdk(self.getPhone(), '', 0, handleSlideVerificationCodeResponse);
                //console.log("response.responseId", response.responseId);
            } else {
                self.toast(response.msg);
            }
            // handle slide code
            //console.log("handleDynamicCodeResponse", response);
        });
    }

    ns.phoneForm.prototype.refreshVerifyCode = function(vcodeimgurl) {
        var self = this;
        //console.log("response.vcodeimgurl", vcodeimgurl);
        self.nodes.vcodeblock.attr('src', vcodeimgurl);
        self.toggleCaptcha(true);
    }

    ns.phoneForm.prototype.getPhone = function() {
        var self = this;
        return self.nodes.phoneIpt.val();
    }

    // 验证账号为空
    ns.phoneForm.prototype.validateSubmit = function(type) {
        var self = this;
        if ( self.state.phone && self.state.sms ) {
            return true;
        } else {
            return false;
        }
    }

    // 检测submit按钮是否被点亮
    ns.phoneForm.prototype.validateEmpty = function() {
        var self = this;
        var nodes = [self.nodes.phoneIpt, self.nodes.smsIpt];
        var tip = true;
        nodes.forEach(function(node){
            var val = node.val();
            if (!val) {
                tip = false;
            }
        })

        if (tip) {
            self.nodes.smsSubmitBtn.addClass('active');
            self.nodes.smsSubmitBtn.attr("disabled", false);  
        } else {
            self.nodes.smsSubmitBtn.removeClass('active');
            self.nodes.smsSubmitBtn.attr("disabled", true);  
        }
    }

    // 验证sms
    ns.phoneForm.prototype.validateSms = function() {
        var self = this;
        var val = self.nodes.smsIpt.val();
        if ( $.inArray(val.length, self.ops.smsLength) !== -1) {
            self.hideError(self.nodes.smsIpt, false);
            self.state.sms = true;
            return true;
        } else {
            if ( val.length === 0 ) { // 为空
                self.showError(self.nodes.smsIpt, self.ops.smsEmptyTip, false);
            } else {
                self.showError(self.nodes.smsIpt, self.ops.tipWrongNumOrSms, false);
            }
            self.state.sms = false;
            return false;
        }
    }

    // 验证手机号输入 
    ns.phoneForm.prototype.validatePhoneEmpty = function(callback) {
        var self = this;
        var telNum = self.nodes.phoneIpt.val();
        if ( telNum.length > 0 ) {
            self.toggleSmsBtn(true);
            return true;
        } else {
            self.toggleSmsBtn(false);
            return false;
        }
    }

    // 验证手机号
    ns.phoneForm.prototype.validatePhone = function(callback) {
        var self = this;
        var telNum = self.nodes.phoneIpt.val();
        var telPattern = /^1\d{10}$/;
        if ( telPattern.test(telNum) ) {
            self.state.phone = true;
            self.validateSubmit('sms');
            self.hideError(self.nodes.phoneIpt);
            return true;
        } else { // 手机号格式错误
            if ( telNum.length === 0 ) { // 手机号为空
                self.showError(self.nodes.phoneIpt, self.ops.phoneEmptyTip);
            } else {
                self.showError(self.nodes.phoneIpt, self.ops.tipWrongNum);
            }
            self.state.phone = false;
            return false;
        }
    }

    // 开关发送sms按钮状态
    ns.phoneForm.prototype.toggleSmsBtn = function(b) {
        var self = this;
        self.state.canSendSms = b;
        if (self.state.counting) {
            return false;
        }
        if (b) {
            self.nodes.sendSmsBtn.removeClass( self.ops.smsDisableClassName );
        } else {
            self.nodes.sendSmsBtn.addClass( self.ops.smsDisableClassName );
        }
    }

    // 开关提交按钮状态
    ns.phoneForm.prototype.toggleSubmitBtn = function(b) {
        var self = this;
        var state = self.state;
        state.agree = b;
        if (b) {
            self.nodes[form + "SubmitBtn"].removeClass( self.ops.submitDisableClassName );
        } else {
            self.nodes[form + "SubmitBtn"].addClass( self.ops.submitDisableClassName );
        }
    }

    // 显示错误（文案＋边框）
    ns.phoneForm.prototype.showError = function(node, msg, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = $(node).parents(".controlItemNode");
        if ( showErrorOnTop ) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        if ( msg ) {
            errorNode.html(msg);
        }
        self.visable(errorNode);
        controlItemNode.addClass( self.ops.errorItemClassName )
    }

    // 隐藏错误（文案＋边框）
    ns.phoneForm.prototype.hideError = function(node, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = itemNode.find(".controlItemNode");
        if (showErrorOnTop) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        self.hidden(errorNode);
        controlItemNode.removeClass( self.ops.errorItemClassName )
    }

    // 刷新captcha
    ns.phoneForm.prototype.refreshCaptcha = function() {
        var self = this;
        var img = self.nodes.vcodeblock;
        var img_src = img.attr('src');
        img_src = img_src.substr(0, img_src.indexOf('time')) + 'time=' + new Date().getTime();
        img.attr('src', img_src);
    }

    // 处理手机号输入逻辑
    ns.phoneForm.prototype.phoneIptHandler = function() {
        var self = this;
        var inputedNum = self.nodes.phoneIpt.val();
        if ( inputedNum.length > 0 ) {
            self.validatePhone();
        } else {
            self.state.phone = false;
            //self.toggleSmsBtn(false); // self.state.canSendSms = b;
        }
    }

    ns.phoneForm.prototype.hidden = function(o) {
        var self = this;
        $(o).addClass( self.ops.hiddenClassName );
    }

    ns.phoneForm.prototype.visable = function(o) {
        var self = this;
        $(o).removeClass( self.ops.hiddenClassName );
    }

    ns.phoneForm.prototype.show = function(o) {
        var self = this;
        $(o).removeClass( self.ops.noneClassName );
    }

    ns.phoneForm.prototype.hide = function(o) {
        var self = this;
        $(o).addClass( self.ops.noneClassName );
    }

    // 向外层发送消息（只能是{}）
    ns.phoneForm.prototype.send = function(msg) {
        if ( ajk && ajk.loginInner ){
            ajk.loginInner.send(msg);
        }
    }

    // 通知外层登录成功
    ns.phoneForm.prototype._sendSuccess = function(msg) {
        var self = this;
        var callbackParams = $.extend({
            loginSuccess : "1", // 登录成功：1，其它失败
            name : "showSuccess",
            history : "www.anjuke.com"
        }, self.ops);
        self.send(callbackParams);
    }

    // toast提示
    ns.phoneForm.prototype.toast = function(msg) {
        $('.toast').text(msg);
        $('.toast').show();
        setTimeout(function(){
            $('.toast').hide();
        },1500);
    }

})(jQuery, ajk);/**
 * 用户中心登录的iframe页面
 * 文档：http://gitlab.corp.anjuke.com/_site/docs/blob/master/API/%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83/%E6%96%B0%E7%89%88%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83%E6%8E%A5%E5%8F%A3.md
 * developer: yaohuiwang@anjuke.com & guolichen 2016-08-01
 */
;APF.Namespace.register("ajk");
(function($, ns) {

    ns.pwdForm = function(op) {
        var self = this;
        self.defaults = {
            countTime           : 60,                      // 倒计时多长时间(s)
            autoSustain         : true,                    // captcha验证成功后是否执行自动点击
            submitAutoSustain   : false,                   // captcha验证成功后是否执行自动提交
            countInterval       : 1000,                    // 倒计时的速度（ms）
            smsLength           : [4,5,6],                 // smscode是几位的
            captchaLength       : 4,                       // captcha是几位的
            phoneLength         : 11,                      // 手机号是几位的
            curTabClassName     : "cur",                   // 当前tabclass名
            hiddenClassName     : "hidden",                // 隐藏元素class名
            noneClassName       : "none",                  // 隐藏元素class名
            activeItemClassName : "active-item",           // 激活的输入框class名
            checkedClassName    : "checkbox-fake-checked",           // 激活的输入框class名
            errorItemClassName  : "error-item",            // 报错输入框class名
            autoUlHoverClassName : "cur",                  // 报错输入框class名
            smsHideClassName    : "control-item-sms-hide", // 使sms框隐藏的class名,显示captcha
            domainNodeClass     : ".domainNode",           // 自动补全邮箱的class名
            emailNodeClass      : ".emailNode",            // 自动补全邮箱的class名
            smsDisableClassName : "sms-disabel-btn",       // 禁用获取sms按钮的class名
            submitDisableClassName : "submit-disable-btn", // 禁用提交按钮的class名
            tipWrongNum         : "请输入正确手机号码",
            tipWrongNumOrSms    : "验证码错误",
            submiting_text      : "登录中，请稍后...",
            submit_text         : "立即登录",
            submiting_function  : 1,
            phoneEmptyTip       : "请输入手机号码",
            smsEmptyTip         : "请输入动态码",
            captchaEmptyTip     : "请输入验证码",
            userNameEmptyTip    : "请输入手机号、邮箱或安居客用户名",
            pwdEmptyTip         : "请输入密码",
            bHasSend            : false,
            bShowPassword       : true,
            sPsswordOpenImg     : '/layui/images/img/icon_eyeopen@3x.png',
            sPsswordCloseImg    : '/layui/images/img/icon_eyeclose@3x.png'
        };
        self.ops = $.extend({}, self.defaults, op);
        self.nodes = {
            autoUl           : $("#autoUl"),
            //smsCheckboxLabel : $("#smsCheckboxLabel"),
            pwdCheckboxLabel : $("#pwdCheckboxLabel"),
            errorItemTop     : $("#errorItemTop"),
            errorItemTopPwd  : $("#errorItemTopPwd"),
            pwdTitle         : $("#pwdTitle"),
            pwdLoginForm     : $("#pwdLoginForm"),
            pwdTab           : $("#pwdTab"),
            pwdCheckbox      : $("#pwdCheckbox"),
            pwdCaptchaIpt    : $("#pwdCaptchaIpt"),
            pwdSubmitBtn     : $("#pwdSubmitBtn"),
            pwdUserNameIpt   : $("#pwdUserNameIpt"),
            userNameCleanBtn : $("#userNameCleanBtn"),
            pwdIpt           : $("#pwdIpt"),
            pwdIptItem       : $("#pwdIptItem"),
            pwdCleanBtn      : $("#pwdCleanBtn"),
            pwdVisible       : $("#pwdVisible"),
            pwdCaptchaRefreshBtn  : $("#pwdCaptchaRefreshBtn"),
            pwdTransitionNode     : $("#pwdTransitionNode"),
            loginSlidecode  : $("#login-slidecode"),
            vcodeblock : $("#verificationImageCode")
        };

        // 存放表单字段是否合法的状态
        self.state = {
            agree          : true, // *
            captcha        : false, // *
            needCaptcha    : false,
            captchaFrom    : "",
            captchaShowed  : false,
            submit         : false, // *
            canSmsSubmit   : false, // 标记：是否可以登录
            userName       : false,
            pwd            : false, // *
            submiting      : false
        };

        self._init();
    }

    ns.pwdForm.prototype._init = function() {
        var self = this;
        //Cloud.Base.getInstance().initUserLoginSite(pageOnloadUserLoginInitCallBack);
        self._bindEvent();

        // function pageOnloadUserLoginInitCallBack(response) {
        //     console.log("pageOnloadUserLoginInitCallBack", response);
        //     if (response.code === 0) {
        //         console.log("UserLoginInit 页面初始化成功.");
        //     } else {
        //         console.log("UserLoginInit 页面初始化失败");
        //     }
        // }
    }

    ns.pwdForm.prototype._bindEvent = function() {
        var self = this;

        // 刷新captcha
        self.nodes.pwdCaptchaRefreshBtn.on("click", function(e) {
            self.refreshCaptcha(this);
        });

        // captcha(pwd)
        self.nodes.pwdCaptchaIpt.on("focus", function(e) {
            self.toggleFocus(this, true);
        });
        self.nodes.pwdCaptchaIpt.on("blur change keyup", function(e) {
            var val = $.trim($(this).val());
            // console.log(e.type);
            if(e.type === 'change' || e.type === 'keyup') {
                if(val.length !== self.ops.captchaLength) {
                    return ;
                }
            }
            e.stopImmediatePropagation();
            self.toggleFocus(this, false);
            self.validateCaptcha("pwd");
        });

        // 用户名（pwd）
        self.nodes.pwdUserNameIpt.on("focus", function(e) {
            self.toggleFocus(this, true, true, true);
            self.autoCompleteUserName();
        });

        self.nodes.pwdUserNameIpt.on("blur", function(e) {
            self.validateUserName(this, self.ops.userNameEmptyTip, "userName");
            self.toggleFocus(this, false);
            if ( !self.nodes.autoUl.find( "." + self.ops.curTabClassName ).length ) {
                self.hide( self.nodes.autoUl );
            }
        });

        // 密码（pwd）
        self.nodes.pwdIpt.on("focus", function(e) {
            self.toggleFocus(this, true, true, true);
            self.hide( self.nodes.autoUl );
        });

        self.nodes.pwdIpt.on("blur", function(e) {
            self.validatePwd(this, self.ops.pwdEmptyTip, "pwd");
            self.toggleFocus(this, false);
        });

        self.nodes.pwdVisible.on('click', function(e) {
            self.showPasswordIcon({
                bShowPassword: self.ops.bShowPassWord = !self.ops.bShowPassWord,
                id: 'pwdIpt',
                oDom: self.nodes.pwdVisible,
                openImg: self.ops.sPsswordOpenImg,
                closeImg: self.ops.sPsswordCloseImg
            });
        });

        // 用户名邮箱自动补全
        self.nodes.pwdUserNameIpt.on("input propertychange", function(e) {
            var val = self.nodes.pwdUserNameIpt.val();
            if (val.length > 0) {
                self.nodes.userNameCleanBtn.show();
            } else {
                self.nodes.userNameCleanBtn.hide();
            }
            self.validateEmpty();
            self.autoCompleteUserName();
        });

        self.nodes.pwdIpt.on("input propertychange", function(e) {
            var val = self.nodes.pwdIpt.val();
            if (val.length > 0) {
                self.nodes.pwdCleanBtn.show();
            } else {
                self.nodes.pwdCleanBtn.hide();
            }
            self.validateEmpty();
        })

        // 清除账号
        self.nodes.userNameCleanBtn.on("click", function(e) {
            self.nodes.pwdUserNameIpt.val("");
            self.nodes.pwdUserNameIpt.focus();
            self.nodes.userNameCleanBtn.hide();
        })

        // 清除密码
        self.nodes.pwdCleanBtn.on("click", function(e) {
            self.nodes.pwdIpt.val("");
            self.nodes.pwdIpt.focus();
            self.nodes.pwdCleanBtn.hide();
        })

        // 自动补全hover
        self.nodes.autoUl.on("mouseenter", "li", function(e) {
            $(this).addClass( self.ops.autoUlHoverClassName ).siblings().removeClass( self.ops.autoUlHoverClassName );
        });
        self.nodes.autoUl.on("mouseleave", "li", function(e) {
            $(this).removeClass( self.ops.autoUlHoverClassName );
        });
        self.nodes.autoUl.on("click", "li", function(e) {
            var valIpted = $(this).find( self.ops.domainNodeClass ).html() + $(this).find( self.ops.emailNodeClass ).html();
            self.nodes.pwdUserNameIpt.val( valIpted );
            self.hide( self.nodes.autoUl );
        });

        self.nodes.pwdSubmitBtn.on('click', function(e) {
            if ($(this).hasClass("common-btn")) return;
            self.triggerUserNameLogin();
        });

    } // bindEvent -end

    // 登录中 请稍后
    ns.pwdForm.prototype.setSubmitting = function(form) {
        var self = this;
        var btn = self.nodes[form + "SubmitBtn"];
        btn.addClass( self.ops.submitDisableClassName ).val( self.ops.submiting_text );
    }

    // 输入框聚焦，显示聚焦样式，去除与node相对应的错误提示
    ns.pwdForm.prototype.toggleFocus = function(node, b, errorOnTop, pwd) {
        var self = this;
        var controlItemNode = $(node).parents(".controlItemNode");
        if (b) {
            controlItemNode.addClass( self.ops.activeItemClassName );
        } else {
            controlItemNode.removeClass( self.ops.activeItemClassName );
        }
    }

    // 控制captcha的显隐
    ns.pwdForm.prototype.toggleCaptcha = function(b) {
        var self = this;
        var state = self.state;
        var captchaIpt = self.nodes.pwdCaptchaIpt;
        var fowordIpt = self.nodes.pwdIpt;
        var captchaRefreshBtn = self.nodes.pwdCaptchaRefreshBtn;
        var transitionNode = self.nodes.pwdIptItem;
        state.captchaShowed = b;
        if (b) {
            captchaIpt.val("");
            state.captcha = false;
            captchaRefreshBtn.click();
            transitionNode.addClass( self.ops.smsHideClassName );
            captchaIpt.prop("tabindex", 3);
            fowordIpt.prop("tabindex", -1);
            captchaIpt.prop("readonly", false);
        } else {
            transitionNode.removeClass( self.ops.smsHideClassName );
            captchaIpt.prop("tabindex", -1);
            fowordIpt.prop("tabindex", 2);
            captchaIpt.prop("readonly", true);
        }

        $("body").focus(); // trigger captcha & smsIpt blur，防止captcha卡住
    }

    // 验证captcha
    ns.pwdForm.prototype.validateCaptcha = function(form) {
        var self = this;
        var state = self.state;
        var captchaIpt = self.nodes[form + "CaptchaIpt"];
        var val = captchaIpt.val()

        var captchaData = {
            captcha : val
        };

        if ( captchaIpt.prop("readonly") || !state.needCaptcha ) {
            return false;
        }

        self.triggerUserNameLogin();
    }

    //登录
    ns.pwdForm.prototype.triggerUserNameLogin = function() {
        var self = this;
        var cloudBaseInstance = Cloud.Base.getInstance();

        var userName = self.nodes.pwdUserNameIpt.val();
        var pwd = self.nodes.pwdIpt.val();
        var captcha = '';

        if (self.state.needCaptcha) {
            captcha = self.nodes.pwdCaptchaIpt.val();
        }

        if (!self.validateSubmit('pwd')) {
            return;
        }

        self.nodes.pwdSubmitBtn.text(self.ops.submiting_text);
        try {
            self.getEconomicInfo(userName, function(data) {
                if (data.code === 0) {
                    cloudBaseInstance.userNameLogin(userName, pwd, captcha, self.ops.history, function(response){
                        //console.log("response userNameLoginResponse userNameLoginResponse", response);
                        if (response.vcodeimgurl) {
                            self.state.needCaptcha = true;
                            self.refreshVerifyCode(response.vcodeimgurl);
                        } else if (response.code === 0) {
                            var isThird = self.bindThirdNewUser();
                            if (isThird) {
                                // 第三方绑定流程过来
                                top.location.href = $('#redirect_uri').val();
                            } else {
                                setTimeout(function(){
                                    location.href = location.origin + '/login/success' + location.search;
                                },300);
                            }
                        } else if (response.code == 18) {
                            self.nodes.loginSlidecode.show();
                        } else if (response.code == 772){
                            self.nodes.pwdSubmitBtn.text(self.ops.submit_text);
                            self.toggleCaptcha(false);
                            if(response && response.responseId) {
                                return;
                            }
                            self.toast(response.msg);
                        } else {
                            self.toast(response.msg);
                        }
                    });
                } else {
                    //  cloudUtilInstance.toast(e);
                    self.toast('经纪人账号不能登录');
                }
            });
        } catch (e) {
            alert(e);
        }

    }

    //验证
    ns.pwdForm.prototype.triggeVerifyCode = function() {

    }

    //绑定
    ns.pwdForm.prototype.triggeBindCellPhone = function() {

    }

    ns.pwdForm.prototype.bindThirdNewUser = function() {
        return 0;
    }

    ns.pwdForm.prototype.getEconomicInfo = function(account, success, fail){
        var economicUrl = location.origin + '/login/checkbroker';
        $.ajax({
            url: economicUrl,
            type: 'get',
            data: {
                account: account
            },
            dataType: 'json',
            success: function(data) {
                //console.log(data);
                success(data);
            },
            error: function(err) {
                console.log(err);
                fail(err);
            }
        });
    }

    ns.pwdForm.prototype.refreshVerifyCode = function(vcodeimgurl) {
        var self = this;
        //console.log("response.vcodeimgurl", vcodeimgurl);
        self.nodes.vcodeblock.attr('src', vcodeimgurl);
        self.toggleCaptcha(true);
    }

    // 刷新captcha
    ns.pwdForm.prototype.refreshCaptcha = function(btn) {
        var self = this;
        var img = self.nodes.vcodeblock;
        var img_src = img.attr('src');
        img_src = img_src.substr(0, img_src.indexOf('time')) + 'time=' + new Date().getTime();
        img.attr('src', img_src);
    }

    ns.pwdForm.prototype.getUserName = function() {
        var self = this;
        return self.nodes.pwdUserNameIpt.val();
    }

    // 验证submit
    ns.pwdForm.prototype.validateSubmit = function(type) {
        var self = this;
        if (self.state.needCaptcha && !self.nodes.pwdCaptchaIpt.val()) {
            self.state.needCaptcha = false;
            return false;
        }

        if ( self.state.userName && self.state.pwd ) {
            return true;
        } else {
            return false;
        }
    }

    // 验证账号为空
    ns.pwdForm.prototype.validateUserName = function(iptNode, msg, stateItem) {
        var self = this;
        var val = $(iptNode).val();
        if ( val.length > 0 ) {
            self.hideError(iptNode, true, true);
            self.state[stateItem] = true;
            return true;
        } else {
            self.showError(iptNode, msg, true, true);
            self.state[stateItem] = false;
            return false;
        }
    }

    //验证密码为空
    ns.pwdForm.prototype.validatePwd = function(iptNode, msg, stateItem) {
        var self = this;
        var val = $(iptNode).val();
        if ( val.length > 0 ) {
            self.hideError(iptNode, false, false);
            self.state[stateItem] = true;
            return true;
        } else {
            self.showError(iptNode, msg, false, false);
            self.state[stateItem] = false;
            return false;
        }
    }

    // 检测submit按钮是否被点亮
    ns.pwdForm.prototype.validateEmpty = function() {
        var self = this;
        var nodes = [self.nodes.pwdIpt, self.nodes.pwdUserNameIpt];
        var tip = true;
        nodes.forEach(function(node){
            var val = node.val();
            if (!val) {
                tip = false;
            }
        })

        if (tip) {
            self.nodes.pwdSubmitBtn.addClass('active');
            self.nodes.pwdSubmitBtn.attr("disabled", false);  
        } else {
            self.nodes.pwdSubmitBtn.removeClass('active');
            self.nodes.pwdSubmitBtn.attr("disabled", true);  
        }
    }

    // 开关提交按钮状态
    ns.pwdForm.prototype.toggleSubmitBtn = function(b) {
        var self = this;
        var state = self.state;
        state.agree = b;
        if (b) {
            self.nodes[form + "SubmitBtn"].removeClass( self.ops.submitDisableClassName );
        } else {
            self.nodes[form + "SubmitBtn"].addClass( self.ops.submitDisableClassName );
        }
    }

    // 自动补全邮箱
    ns.pwdForm.prototype.autoCompleteUserName = function() {
        var self = this;
        var ipt = self.nodes.pwdUserNameIpt;
        var val = ipt.val();
        if ( /\@$/.test(val) ) { // 输入的内容以@结尾
            val = val.replace(/\@$/, "");
            self.nodes.autoUl.find( self.ops.domainNodeClass ).html(val);
            self.show(self.nodes.autoUl);
        } else {
            self.hide(self.nodes.autoUl);
        }
    }

    // 显示错误（文案＋边框）
    ns.pwdForm.prototype.showError = function(node, msg, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = $(node).parents(".controlItemNode");
        if ( showErrorOnTop ) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        if ( msg ) {
            errorNode.html(msg);
        }
        self.visable(errorNode);
        controlItemNode.addClass( self.ops.errorItemClassName )
    }

    // 隐藏错误（文案＋边框）
    ns.pwdForm.prototype.hideError = function(node, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = itemNode.find(".controlItemNode");
        if (showErrorOnTop) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        self.hidden(errorNode);
        controlItemNode.removeClass( self.ops.errorItemClassName )
    }

    // 刷新captcha
    ns.pwdForm.prototype.refreshCaptcha = function() {
        var self = this;
        var img = $('#verificationImageCode');
        var img_src = img.attr('src');
        img_src = img_src.substr(0, img_src.indexOf('time')) + 'time=' + new Date().getTime();
        img.attr('src', img_src);
    }

    // 处理手机号输入逻辑
    ns.pwdForm.prototype.phoneIptHandler = function() {
        var self = this;
        var inputedNum = self.nodes.phoneIpt.val();
        if ( inputedNum.length === self.ops.phoneLength ) {
            self.validatePhone();
        } else {
            self.state.phone = false;
            self.toggleSmsBtn(false); // self.state.canSendSms = b;
        }
    }

    //切换密码显示
    ns.pwdForm.prototype.showPasswordIcon = function (formItem){
        try{
            if(!formItem.bShowPassword){
                formItem.oDom.attr('src',formItem.openImg);
                document.getElementById(formItem.id).type = "text";
            }else{
                document.getElementById(formItem.id).type = "password";
                formItem.oDom.attr('src',formItem.closeImg);
            }
        }catch(e){
            console.log('e',e);
        }
    },

    ns.pwdForm.prototype.hidden = function(o) {
        var self = this;
        $(o).addClass( self.ops.hiddenClassName );
    }

    ns.pwdForm.prototype.visable = function(o) {
        var self = this;
        $(o).removeClass( self.ops.hiddenClassName );
    }

    ns.pwdForm.prototype.show = function(o) {
        var self = this;
        $(o).removeClass( self.ops.noneClassName );
    }

    ns.pwdForm.prototype.hide = function(o) {
        var self = this;
        $(o).addClass( self.ops.noneClassName );
    }

    // toast提示
    ns.pwdForm.prototype.toast = function(msg) {
        $('.toast').text(msg);
        $('.toast').show();
        setTimeout(function(){
            $('.toast').hide();
        },1500);
    }

})(jQuery, ajk);/**
* 用户中心登录的iframe页面
* 文档：http://gitlab.corp.anjuke.com/_site/docs/blob/master/API/%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83/%E6%96%B0%E7%89%88%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83%E6%8E%A5%E5%8F%A3.md
* developer: yaohuiwang@anjuke.com & guolichen 2016-08-01
*/
;APF.Namespace.register("ajk");
(function($, ns) {
    ns.LoginIframe = function(op) {
        var self = this;
        self.defaults = {
            countTime           : 60,                      // 倒计时多长时间(s)
            autoSustain         : true,                    // captcha验证成功后是否执行自动点击
            submitAutoSustain   : false,                   // captcha验证成功后是否执行自动提交
            countInterval       : 1000,                    // 倒计时的速度（ms）
            smsLength           : [4,5,6],                       // smscode是几位的
            captchaLength       : 4,                       // captcha是几位的
            phoneLength         : 11,                      // 手机号是几位的
            curTabClassName     : "cur",                   // 当前tabclass名
            hiddenClassName     : "hidden",                // 隐藏元素class名
            noneClassName       : "none",                  // 隐藏元素class名
            activeItemClassName : "active-item",           // 激活的输入框class名
            checkedClassName    : "checkbox-fake-checked",           // 激活的输入框class名
            errorItemClassName  : "error-item",            // 报错输入框class名
            autoUlHoverClassName : "cur",                  // 报错输入框class名
            smsHideClassName    : "control-item-sms-hide", // 使sms框隐藏的class名,显示captcha
            domainNodeClass     : ".domainNode",           // 自动补全邮箱的class名
            emailNodeClass      : ".emailNode",            // 自动补全邮箱的class名
            smsDisableClassName : "sms-disabel-btn",       // 禁用获取sms按钮的class名
            submitDisableClassName : "submit-disable-btn", // 禁用提交按钮的class名
            tipWrongNum         : "请输入正确手机号码",
            tipWrongNumOrSms    : "验证码错误",
            submiting_text      : "登录中，请稍后...",
            phoneEmptyTip       : "请输入手机号码",
            smsEmptyTip         : "请输入验证码",
            captchaEmptyTip     : "请输入验证码",
            userNameEmptyTip    : "请输入手机号、邮箱或安居客用户名",
            pwdEmptyTip         : "请输入密码",
            bHasSend            : false,
            bShowPassword       : true,
            sPsswordOpenImg     : '/layui/images/img/icon_eyeopen@3x.png',
            sPsswordCloseImg    : '/layui/images/img/icon_eyeclose@3x.png'
        };
        self.ops = $.extend({}, self.defaults, op);
        self.nodes = {
            autoUl           : $("#autoUl"),
            //smsCheckboxLabel : $("#smsCheckboxLabel"),
            pwdCheckboxLabel : $("#pwdCheckboxLabel"),
            errorItemTop     : $("#errorItemTop"),
            errorItemTopPwd  : $("#errorItemTopPwd"),
            pwdTitle         : $("#pwdTitle"),
            pwdLoginForm     : $("#pwdForm"),
            pwdTab           : $("#pwdTab"),
            pwdCheckbox      : $("#pwdCheckbox"),
            pwdCaptchaIpt    : $("#pwdCaptchaIpt"),
            pwdSubmitBtn     : $("#pwdSubmitBtn"),
            pwdUserNameIpt   : $("#pwdUserNameIpt"),
            pwdIpt           : $("#pwdIpt"),
            pwdVisible       : $("#pwdVisible"),
            pwdCaptchaRefreshBtn  : $("#pwdCaptchaRefreshBtn"),
            pwdTransitionNode     : $("#pwdTransitionNode"),
            phoneIpt              : $("#phoneIpt"),
            phoneCleanBtn         : $("#phoneCleanBtn"),
            smsTitle              : $("#smsTitle"),
            smsCaptchaRefreshBtn  : $("#smsCaptchaRefreshBtn"),
            smsLoginForm          : $("#phoneForm"),
            smsTab                : $("#smsTab"),
            sendSmsBtn            : $("#sendSmsBtn"),
            smsIpt                : $("#smsIpt"),
            smsIptItem            : $("#smsIptItem"),
            //smsCheckbox           : $("#smsCheckbox"),
            smsCaptchaIpt         : $("#smsCaptchaIpt"),
            smsTransitionNode     : $("#smsTransitionNode"),
            smsSubmitBtn          : $("#smsSubmitBtn"),
            customerTab           : $("#customerTab"),
            token2NodePwd         : $("#token2NodePwd"),
            token2NodeSms         : $("#token2NodeSms"),
            continueCountTimeNode : $("#continueCountTimeNode"),
            QQLogin               : $("#QQLogin"),
            weiboLogin            : $("#weiboLogin"),
            weixinLogin           : $("#weixinLogin"),
            thirdLoginTitle       : $("#thirdLoginTitle"),
            iframeLoginSuccess    : $("#iframeLoginSuccess"),
            ifmFormContent        : $("#ifmFormContent"),
            thirdsWrap            : $("#thirdsWrap"),
            otherLoginWrap        : $("#otherLoginWrap"),
            IframeLoginCloseBtn   : $("#IframeLoginCloseBtn"),
            notNowBtn             : $("#notNowBtn"),
            protocolItem          : $("#protocolItem")

        };

        // 存放表单字段是否合法的状态
        self.pageState = 0; // 0: 手机登录 1: 账号密码登录

        // 发码配置，码放倒pn上
        self.trackAllocations = [{
            node : "smsLoginForm",
            act : "submit",
            code : "track_login_page_phone"
        }, {
            node : "pwdLoginForm",
            act : "submit",
            code : "track_login_page_user"
        }, {
            node : "smsTab",
            act : "click",
            code : "track_login_page_changetab"
        }, {
            node : "pwdTab",
            act : "click",
            code : "track_login_page_changetab"
        }, {
            node : "QQLogin",
            act : "click",
            code : "login_page_qq"
        }, {
            node : "weiboLogin",
            act : "click",
            code : "login_page_weibo"
        }, {
            node : "weixinLogin",
            act : "click",
            code : "login_page_weichat"
        }, {
            node : "notNowBtn",
            act : "click",
            code : "track_login_phonetc_tgcb"
        }, {
            node : "pwdUserNameIpt",
            act : "blur",
            code : "track_login_page_tcuser"
        }];
        self._init();
    }

    ns.LoginIframe.prototype._init = function() {
        var self = this;
        self._bindEvent();
        self._getToken2(); // 填充token
        self._initInnerMsger();
        self._initTrack();
        self._initPhoneValidate(); // 如果带入了手机号则做一次验证，以自动激活smsbtn

        Cloud.Base.getInstance().initPhoneLoginSite(pageOnloadPhoneLoginInitCallBack);
        function pageOnloadPhoneLoginInitCallBack(response) {
            //console.log("pageOnloadPhoneLoginInitCallBack", response);
            if (response.code === 0) {
                //console.log("PhoneLoginInit 页面初始化成功.");
            } else {
                //console.log("PhoneLoginInit 页面初始化失败");
            }
        }
    }



    ns.LoginIframe.prototype._bindEvent = function() {

        function pageOnloadPhoneLoginInitCallBack(response) {
            //console.log("pageOnloadPhoneLoginInitCallBack", response);
            if (response.code === 0) {
                //console.log("PhoneLoginInit 页面初始化成功.");
            } else {
                //console.log("PhoneLoginInit 页面初始化失败");
            }
        }

        function pageOnloadUserLoginInitCallBack(response) {
            //console.log("pageOnloadUserLoginInitCallBack", response);
            if (response.code === 0) {
                //console.log("UserLoginInit 页面初始化成功.");
            } else {
                //console.log("UserLoginInit 页面初始化失败");
            }
        }

        var self = this;

        // 关闭弹层
        self.nodes.IframeLoginCloseBtn.on("click", function(e) {
            self.send({
                name : "close"
            });
        });

        // 绑定: 点击tab切换form
        self.nodes.smsTab.on("click", function(e) {
            e.preventDefault();
            //self.toggleCurTab(this);
            self.show( self.nodes.smsLoginForm );
            self.hide( self.nodes.pwdLoginForm );
            self.show( self.nodes.pwdTab );
            self.hide( self.nodes.smsTab );
            self.show( self.nodes.smsTitle );
            self.hide( self.nodes.pwdTitle );
            self.pageState = 0;
            Cloud.Base.getInstance().initPhoneLoginSite(pageOnloadPhoneLoginInitCallBack);
            return false;
        });

        self.nodes.pwdTab.on("click", function(e) {
            e.preventDefault();
            //self.toggleCurTab(this);
            self.hide( self.nodes.smsLoginForm );
            self.show( self.nodes.pwdLoginForm );
            self.hide( self.nodes.pwdTab );
            self.show( self.nodes.smsTab );
            self.show( self.nodes.pwdTitle );
            self.hide( self.nodes.smsTitle );
            self.pageState = 1;
            Cloud.Base.getInstance().initUserLoginSite(pageOnloadUserLoginInitCallBack);
            return false;
        });

        self.timer = null;
        self.nodes.customerTab.hover(function() {
            clearTimeout(self.timer);
            self.show( self.nodes.otherLoginWrap );
        }, function() {
            self.timer = setTimeout(function() {
                self.hide( self.nodes.otherLoginWrap );
            }, 500);   
        });

        self.nodes.otherLoginWrap.on("mouseenter", function(e) {
            clearTimeout(self.timer);
        });

        self.nodes.otherLoginWrap.on("mouseleave", function(e) {
            self.timer = setTimeout(function() {
                self.hide( self.nodes.otherLoginWrap );
            }, 500); 
        });


        // 刷新captcha

    } // bindEvent -end

    // 根据@self. trackAllocations 初始化发码
    ns.LoginIframe.prototype._initTrack = function() {
        var self = this;
        $.each( self.trackAllocations, function(k, v) {
            self.nodes[v.node].on(v.act, function(e) {
                ajk.Logger.sendSoj({
                    page : v.code,
                    pageName : v.code,
                    site : "anjuke-npv"
                });
            });
        } );
    }

    // 提交表单之前的设置
    ns.LoginIframe.prototype.beforeSubmit = function() {
        var self = this;
        var countingDown = self.nodes.sendSmsBtn.html().match(/\d+/);
        if (countingDown) {
            self.nodes.continueCountTimeNode.val( countingDown[0] );
        }
    }

    // 登录失败自动带入了手机号时，首先做一次手机号的验证，以自动激活smsbtn
    ns.LoginIframe.prototype._initPhoneValidate = function() {
        var self = this;
        if( self.nodes.phoneIpt.length && self.nodes.phoneIpt.val().length === self.ops.phoneLength ) {
            if ( self.ops.continueCountTime ) {
                self.countDown( self.ops.continueCountTime );
            }
            self.validatePhone(function(r) {
                self.hintLoginError(); // 显示登录失败填进来的错误信息
            });
        }

        // 如果带入了用户名，则做一次判断
        if ( self.nodes.pwdUserNameIpt.length && self.nodes.pwdUserNameIpt.val().length ) {
            self.validateEmpty(self.nodes.pwdUserNameIpt, self.ops.userNameEmptyTip, "userName");
            self.visable( self.nodes.errorItemTopPwd );
        }
    }

    // 显示登录失败填进来的错误信息
    ns.LoginIframe.prototype.hintLoginError = function() {
        var self = this;
        self.visable( self.nodes.errorItemTop );
    }

    // 初始化内层messenger
    ns.LoginIframe.prototype._initInnerMsger = function() {
        var self = this;
        self.innerMsger = new Messenger("iframe", "login");
        if(window.parent) {
            self.innerMsger.addTarget(window.parent, "parent");
        }
        self.innerMsger.listen(function(msg) {
            self._handleReceive(msg);
        });
    }

    // 接收到外层发来的消息
    ns.LoginIframe.prototype._handleReceive = function(msg) {
        var self = this;
        var msgObj = JSON.parse(msg);

        // 发码，外层业务场景不明，所以open的发码在内层进行. @msgObj.args : "track_login_phonetc"
        if (msgObj.name === "soj") {
            ajk.Logger.sendSoj({
                page : msgObj.args,
                pageName : msgObj.args,
                site : "anjuke-npv"
            });
        }
    }

    // 向外层发送消息（只能是{}）
    ns.LoginIframe.prototype.send = function(msg) {
        var self = this;
        self.innerMsger.send( JSON.stringify(msg) );
    }

    // 登录中 请稍后
    ns.LoginIframe.prototype.setSubmitting = function(form) {
        var self = this;
        var btn = self.nodes[form + "SubmitBtn"];
        btn.addClass( self.ops.submitDisableClassName ).val( self.ops.submiting_text );
    }
 

    /**
     * according to verification code handle response
     * 
     * @param {*} response 
     */
    ns.LoginIframe.prototype.handleDynamicCodeResponse = function(response, self) {
        
        var VERIFY_IMAGE = 0;
        // handle image verify code.
        if (response.vcodeimgurl) {
            self.state.needCaptcha = true;
            self.refreshVerifyCode(response.vcodeimgurl);
        } else if (response.data && response.data.verifycodetype === '1') {
            // slide verifyCode
            // $('#login-slidecode').show();
            // console.log("login-slidecode");
        } else if (response.code && response.code !== 0) {
            var cloudUtilInstance = CloudUtil.Singleton.getInstance();
            cloudUtilInstance.toast(response.msg);
            return;
        } else if (response.code === 0) {
            self.ops.bHasSend = true;
            self.countDown(self.ops.continueCountTime);
            //self.nodes.oVoiceCode.show();
        }
        if (response.responseId) {
            Cloud.Base.getInstance().getVerificationCodeBySdk(self.getPhone(), '', 0, handleSlideVerificationCodeResponse);
            //console.log("response.responseId", response.responseId);
        } else {
            var cloudUtilInstance = CloudUtil.Singleton.getInstance();
            cloudUtilInstance.toast(response.msg);
        }
        // handle slide code
    }


    // 验证手机号
    ns.LoginIframe.prototype.validatePhone = function(callback) {
        var self = this;
        var telNum = self.nodes.phoneIpt.val();
        var telPattern = /^1\d{10}$/;
        if ( telPattern.test(telNum) ) {

            self.state.phone = true;
            self.toggleSmsBtn(true);
            self.toggleLoading(self.nodes.phoneIpt, true);
            self.validateSubmit('sms');

            return true;
        } else { // 手机号格式错误
            if ( telNum.length === 0 ) { // 手机号为空
                self.showError(self.nodes.phoneIpt, self.ops.phoneEmptyTip);
            } else {
                self.showError(self.nodes.phoneIpt, self.ops.tipWrongNum);
            }
            self.state.phone = false;
            self.toggleSuccessIcon(self.nodes.phoneIpt, false);
            self.toggleSmsBtn(false);
            return false;
        }
    }

    // 验证账号为空
    ns.LoginIframe.prototype.validateEmpty = function(iptNode, msg, stateItem) {
        var self = this;
        var val = $(iptNode).val();
        if ( val.length > 0 ) {
            self.hideError(iptNode, true, true);
            self.statePwd[stateItem] = true;
            self.toggleSuccessIcon(iptNode, true);
            return true;
        } else {
            self.showError(iptNode, msg, true, true);
            self.statePwd[stateItem] = false;
            self.toggleSuccessIcon(iptNode, false);
            return false;
        }
    }

    //验证密码为空
    ns.LoginIframe.prototype.validatePwd = function(iptNode, msg, stateItem) {
        var self = this;
        var val = $(iptNode).val();
        if ( val.length > 0 ) {
            self.hideError(iptNode, false, false);
            self.statePwd[stateItem] = true;
            self.toggleSuccessIcon(iptNode, true);
            return true;
        } else {
            self.showError(iptNode, msg, false, false);
            self.statePwd[stateItem] = false;
            self.toggleSuccessIcon(iptNode, false);
            return false;
        }
    }

    // 验证账号为空
    ns.LoginIframe.prototype.validateSubmit = function(type) {
        var self = this;
        if (type == 'sms' && self.state.phone && self.state.sms) {
            return true;
        } else if (type == 'pwd' && self.statePwd.userName && self.statePwd.pwd) {
            return true;
        } else {
            return false;
        }
    }

    // 开关发送sms按钮状态
    ns.LoginIframe.prototype.toggleSmsBtn = function(b) {
        var self = this;
        self.state.canSendSms = b;
        if (self.state.counting) {
            return false;
        }
        if (b) {
            self.nodes.sendSmsBtn.removeClass( self.ops.smsDisableClassName );
        } else {
            self.nodes.sendSmsBtn.addClass( self.ops.smsDisableClassName );
        }
    }

    // 开关提交按钮状态
    ns.LoginIframe.prototype.toggleSubmitBtn = function(b, form) {
        var self = this;
        var state = self.state;
        if ( form === "pwd" ) {
            state = self.statePwd;
        }
        state.agree = b;
        if (b) {
            self.nodes[form + "SubmitBtn"].removeClass( self.ops.submitDisableClassName );
        } else {
            self.nodes[form + "SubmitBtn"].addClass( self.ops.submitDisableClassName );
        }
    }

    // 显示错误（文案＋边框）
    ns.LoginIframe.prototype.showError = function(node, msg, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = $(node).parents(".controlItemNode");
        if ( showErrorOnTop ) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        if ( msg ) {
            errorNode.html(msg);
        }
        self.visable(errorNode);
        controlItemNode.addClass( self.ops.errorItemClassName )
    }

    // 隐藏错误（文案＋边框）
    ns.LoginIframe.prototype.hideError = function(node, showErrorOnTop, pwd) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var errorNode = itemNode.find(".errorItem");
        var controlItemNode = itemNode.find(".controlItemNode");
        if (showErrorOnTop) {
            errorNode = self.nodes.errorItemTop;
        }
        if (pwd) {
            errorNode = self.nodes.errorItemTopPwd;
        }
        self.hidden(errorNode);
        controlItemNode.removeClass( self.ops.errorItemClassName )
    }

    // 控制验证通过icon的显隐
    ns.LoginIframe.prototype.toggleSuccessIcon = function(node, b) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var okNode = itemNode.find(".iconOK");
        if (b) { // 显示
            self.visable(okNode);
        } else {
            self.hidden(okNode);
        }
    }

    // 控制loading-icon
    ns.LoginIframe.prototype.toggleLoading = function(node, b) {
        var self = this;
        var itemNode = $(node).parents(".itemNode");
        var okNode = itemNode.find(".iconOK");
        if (b) { // 显示
            okNode.addClass("loading");
        } else {
            okNode.removeClass("loading");
        }
    }

    // 刷新captcha
    ns.LoginIframe.prototype.refreshCaptcha = function(btn) {
        var self = this;
        var imgNode = $(btn).prev();
        var initSrc = imgNode.attr("src");
        var newSrc = initSrc.replace(/timestamp\=\w*/, "timestamp=" + (+ new Date()));
        setTimeout(function() {
            imgNode.attr("src", newSrc);
        }, 50);
    }

    ns.LoginIframe.prototype.toggleCurTab = function(o) {
        var self = this;
        $(o).addClass( self.ops.curTabClassName ).siblings().removeClass( self.ops.curTabClassName );
    }

    ns.LoginIframe.prototype.hidden = function(o) {
        var self = this;
        $(o).addClass( self.ops.hiddenClassName );
    }

    ns.LoginIframe.prototype.visable = function(o) {
        var self = this;
        $(o).removeClass( self.ops.hiddenClassName );
    }

    ns.LoginIframe.prototype.show = function(o) {
        var self = this;
        $(o).removeClass( self.ops.noneClassName );
    }

    ns.LoginIframe.prototype.hide = function(o) {
        var self = this;
        $(o).addClass( self.ops.noneClassName );
    }

    // 计算token，后端传入的为token，前端计算出的为token2
    ns.LoginIframe.prototype._getToken2 = function() {
        var self = this;
        var set = {
            "algo1" : ["hex_md5"],
            "algo2" : ["hex_sha1"],
            "algo3" : ["sha256"],
            "algo4" : ["hex_md5", "hex_sha1"],
            "algo5" : ["hex_sha1", "sha256"]
        }
        var ruleList = set[ self.ops.algo ];
        var token = self.ops.token;
        if (!self.ops.algo || !ruleList || !token) {
            return;
        }
        $.each(ruleList, function(k, v) {
            token = window[v](token)
        });
        self.nodes.token2NodeSms.val(token);
        self.nodes.token2NodePwd.val(token);
        return token;
    }

    // reset
    ns.LoginIframe.prototype.reset = function(form) {
        if (form === "sms") { // 重置sms表单
            this.resetSmsForm();
        } else if (form === "pwd") { // 重置pwd表单
            this.resetPwdForm();
        } else if (!!form === true) { // 重置两个表单，并将tab切换至sms
            this.resetSmsForm();
            this.resetPwdForm();
            this.nodes.smsTab.trigger("click");
        } else if (!!form === false || form === undefined) { // 只重置两个表单
            this.nodes.smsLoginForm.length && this.resetSmsForm();
            this.nodes.pwdLoginForm.length && this.resetPwdForm();
        }
    }


    // 将表单@form初始化到原始状态
    ns.LoginIframe.prototype.resetSmsForm = function() {
        var self = this;
        if ( !self.state.counting ) {
            self.nodes.sendSmsBtn.html(self.initSmsBtnHtml);
            self.toggleSmsBtn(false);
        }
        self.toggleCaptcha(false);
        self.toggleSuccessIcon(self.nodes.phoneIpt, false);
        self.toggleSuccessIcon(self.nodes.smsCaptchaIpt, false);
        self.nodes.phoneIpt.val("");
        self.nodes.smsIpt.val("");
        self.nodes.smsCaptchaIpt.val("");
        self.hideError(self.nodes.phoneIpt);
        self.hideError(self.nodes.smsIpt, false);
        self.hideError(self.nodes.smsCaptchaIpt);
    }

    ns.LoginIframe.prototype.resetPwdForm = function() {
        var self = this;
        if ( !self.nodes.pwdCheckbox[0].checked ) {
            self.nodes.pwdCheckbox.click();
        }
        self.toggleCaptcha(false, "pwd");
        self.toggleSuccessIcon(self.nodes.pwdUserNameIpt, false);
        self.nodes.pwdUserNameIpt.val("");
        self.nodes.pwdIpt.val("");
        self.hideError(self.nodes.pwdUserNameIpt, true);
        self.hideError(self.nodes.pwdIpt, "top", "pwd");
    }

    // toast提示
    ns.LoginIframe.prototype.toast = function(msg) {
        $('.toast').text(msg);
        $('.toast').show();
        setTimeout(function(){
            $('.toast').hide();
        },1500);
    }

})(jQuery, ajk);var CloudUtil = {};

CloudUtil.Singleton = (function(){
    var uniqInstance;
    var toast = function(msg){
        $('.toast').text(msg);
        $('.toast').show();
        setTimeout(function(){
            $('.toast').hide();
        },1500);
    },
    isNullOrEmpty = function(value){
        if(value == "" || value == undefined){
            return false;
        }
        return true;
    },
    mobileRegExp = function(mobilePhone){
        if(mobilePhone.length>0 && mobilePhone.constructor == String){
            if((/^1[3-9][0-9]{9}$/.test(mobilePhone))){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    /**
     * oject: 
     * bShowPassword: 是否显示.
     * id: 密码输入框id,
     * oDom: 显示的图标,
     * bShowPassword,id,oDom.
     */
    showPasswordIcon = function (formItem){
        try{
            if(!formItem.bShowPassword){
                formItem.oDom.attr('src',formItem.openImg);
                document.getElementById(formItem.id).type = "text";
            }else{
                document.getElementById(formItem.id).type = "password";
                formItem.oDom.attr('src',formItem.closeImg);
            }
        }catch(e){
            console.log('e',e);
        }
    },
    countDown = function (opt,text,defaultCss,clickCss){
        var iTime = 60;
        if(opt!=null && opt!=undefined){
            var timeStop = setInterval(function(){
                iTime --;
                if(iTime>0){
                    opt.text(iTime+'s后重新发送');
                    opt.attr('disabled','disabled');
                    opt.removeClass(defaultCss);
                    opt.addClass(clickCss);
                } else {
                    iTime = 60;
                    opt.text(text);
                    clearInterval(timeStop);
                    opt.removeAttr('disabled');
                    opt.removeClass(clickCss);
                    opt.addClass(defaultCss);
                }
            },1000);
        }
        return this;
    }
    ,
    getEconomicInfo = function(account, success, fail){
        var isDev = /dev|test/.test(location.href);
        var economicUrl = location.origin + '/login/checkbroker';
        $.ajax({
            url: economicUrl,
            type: 'get',
            data: {
                account: account
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                success(data);
            },
            error: function(err) {
                console.log(err);
                fail(err);
            }
        });
    }

    function init(){
        return {
            toast:toast,
            isNullOrEmpty:isNullOrEmpty,
            countDown:countDown,
            mobileRegExp:mobileRegExp,
            getEconomicInfo:getEconomicInfo,
            showPasswordIcon:showPasswordIcon
        }
    }
    
    return {
        getInstance:function(){
            if(!uniqInstance){
                uniqInstance = init();
            }
            return uniqInstance;
        }
    }
})()