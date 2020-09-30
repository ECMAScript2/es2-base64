/** regexp-free-js-base64.js
 *
 *  Original:
 *    https://github.com/dankogai/js-base64/ version 2.6.3, BSD 3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

    'use strict';

/** ===========================================================================
 * for closure compiler
 */
    /** @define {boolean} */
    var REGEXP_FREE_BASE64_DEFINE_DEBUG = true;

/** ===========================================================================
 * public
 */
    var Base64_decode, Base64_encode,
        Base64_atob, Base64_btoa,
        Base64_utob, Base64_btou, Base64_encodeURI,
        Base64_fromUint8Array, Base64_toUint8Array;

/** ===========================================================================
 * private
 */
(function(global){
// constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = {};
    
    (function(bin){
        for (var i = -1, chr; chr = bin.charAt(++i); ) b64tab[chr] = i;
    })(b64chars);

    var fromCharCode = String.fromCharCode;

// encoder stuff
    Base64_utob = function(u) {
        var _fromCharCode = fromCharCode,
            b = '', len, cc1, cc2, cc, chr;

        for (; 0 <= (cc1 = u.charCodeAt(0)); u = u.substr(len)) {
            len = 1;
            if(0xD800 <= cc1 && cc1 <= 0xDBFF){
                len = 2;
                cc2 = u.charCodeAt(1);
                if(0xDC00 <= cc2 && cc2 <= 0xDFFFF){
                    cc = 0x10000
                        + (cc1 - 0xD800) * 0x400
                        + (cc2 - 0xDC00);

                    chr = (_fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                         + _fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                         + _fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                         + _fromCharCode(0x80 | ( cc         & 0x3f)));
                } else {
                    chr = u.substr(0, 2);
                };
            } else if(0x80 <= cc1){
                chr = cc1 < 0x800 ? (_fromCharCode(0xc0 | ( cc1 >>> 6))
                                   + _fromCharCode(0x80 | ( cc1 & 0x3f)))
                                  : (_fromCharCode(0xe0 | ((cc1 >>> 12) & 0x0f))
                                   + _fromCharCode(0x80 | ((cc1 >>>  6) & 0x3f))
                                   + _fromCharCode(0x80 | ( cc1         & 0x3f)));
            } else {
                chr = u.charAt(0);
            };
            b += chr;
        };
        return b;
    };
    Base64_btoa = !REGEXP_FREE_BASE64_DEFINE_DEBUG && global.btoa ? global.btoa :
        function(b) {
            var b64nToChar = b64chars.split(''),
                _b = REGEXP_FREE_BASE64_DEFINE_DEBUG && b,
                a = '',
                padlen = 0, len, ord;

            while (len = b.length) {
                if(len < 4){
                    padlen = [0, 2, 1, 0][len];
                };
                ord =             b.charCodeAt(0)      << 16
                    | ((len > 1 ? b.charCodeAt(1) : 0) <<  8)
                    | ((len > 2 ? b.charCodeAt(2) : 0));
                a += [
                    b64nToChar[ ord >>> 18],
                    b64nToChar[(ord >>> 12) & 63],
                    padlen >= 2 ? '=' : b64nToChar[(ord >>> 6) & 63],
                    padlen >= 1 ? '=' : b64nToChar[ord & 63]
                ].join('');
                b = b.substr(3);
            };

            if(REGEXP_FREE_BASE64_DEFINE_DEBUG && global.btoa){
                if(global.btoa(_b) !== a) console.log( '** btoa error!' );
            };
            return a;
        };
    function _encode(u) {
        return Base64_btoa(Base64_utob(u + ''));
    };
    function mkUriSafe(b64) {
        return b64.split('+').join('-').split('/').join('_').split('=').join('');
    };
    Base64_encode = function(u, urisafe) {
        return urisafe ? Base64_encodeURI(u) : _encode(u);
    };
    Base64_encodeURI = function(u) { return mkUriSafe(_encode(u)) };

    // decoder stuff
    Base64_btou = function(b) {
        var _fromCharCode = fromCharCode,
            out = '',
            len, cc1, _cc1, cc2, cc3, cc4, cp, offset;

        for (; b; b = b.substr(len)) {
            len = 1;
            cc1 = _cc1 || b.charCodeAt(0);

            if(0xC0 <= cc1 && cc1 <= 0xF7){
                cc2 = b.charCodeAt(1);
                if(cc1 <= 0xDF){
                    if(0x80 <= cc2 && cc2 <= 0xBF){
                        out += _fromCharCode(((0x1f & cc1) << 6)|(0x3f & cc2));
                        _cc1 = 0;
                        len = 2;
                        continue;
                    };
                } else if(cc1 <= 0xEF){
                    if(0x80 <= cc2 && cc2 <= 0xBF){
                        cc3 = b.charCodeAt(2);
                        if(0x80 <= cc3 && cc3 <= 0xBF){
                            out += _fromCharCode(((0x0f & cc1) << 12)|((0x3f & cc2) << 6)|(0x3f & cc3));
                            _cc1 = 0;
                            len = 3;
                            continue;
                        };
                    };
                } else {
                    if(0x80 <= cc2 && cc2 <= 0xBF){
                        cc3 = b.charCodeAt(2);
                        if(0x80 <= cc3 && cc3 <= 0xBF){
                            cc4 = b.charCodeAt(3);
                            if(0x80 <= cc4 && cc4 <= 0xBF){
                                cp     = ((0x07 & cc1) << 18)
                                    |    ((0x3f & cc2) << 12)
                                    |    ((0x3f & cc3) <<  6)
                                    |     (0x3f & cc4);
                                offset = cp - 0x10000;
                                out += (_fromCharCode((offset  >>> 10) + 0xD800) + _fromCharCode((offset & 0x3FF) + 0xDC00));
                                _cc1 = 0;
                                len = 4;
                                continue;
                            };
                        };  
                    };
                };
                _cc1 = cc2;
            } else {
                _cc1 = 0;
            };
            out += b.charAt(0);
        };
        return out;
    };
    if(!REGEXP_FREE_BASE64_DEFINE_DEBUG && global.atob){
        _atob = global.atob;
    };
    function _atob(a) {
        var _fromCharCode = fromCharCode,
            _a = REGEXP_FREE_BASE64_DEFINE_DEBUG && a,
            b = '',
            padlen = 0, len, n;

        while (len = a.length) {
            if(len < 5){
                padlen = [0, 0, 2, 1, 0][len];
            };
            n =              b64tab[a.charAt(0)  ] << 18
                | (len > 1 ? b64tab[a.charAt(1)] << 12 : 0)
                | (len > 2 ? b64tab[a.charAt(2)] <<  6 : 0)
                | (len > 3 ? b64tab[a.charAt(3)]       : 0);
            b +=                   _fromCharCode( n >>> 16)          +
                (1 < padlen ? '' : _fromCharCode((n >>>  8) & 0xff)) +
                (    padlen ? '' : _fromCharCode( n         & 0xff));
            a = a.substr(4);
        };

        if(REGEXP_FREE_BASE64_DEFINE_DEBUG && global.atob){
            if(global.atob(_a) !== b) console.log( '** atob error!' );
        };

        return b;
    };
    function _cleanup(a) {
        var b = '', chr;

        a += b;
        for (; chr = a.charAt(0); a = a.substr(1)) {
            if(0 <= b64tab[chr]) b += chr;
        };
        return b;
    };
    Base64_atob = function(a) {
        return _atob(_cleanup(a));
    };
    function _fromURI(a) {
        return _cleanup((a + '').split('-').join('+').split('_').join('/'));
    };
    Base64_decode = function(a) {
        return Base64_btou(_atob(_fromURI(a)));
    };

// Uint8Array
    if (global.Uint8Array) {
        Base64_fromUint8Array = function(a, urisafe) {
            var b64 = '', i = 0, l = a.length,
                a0, a1, a2, ord, undef;

            for (; i < l; i += 3) {
                a0 = a[i], a1 = a[i+1], a2 = a[i+2];
                ord = a0 << 16 | a1 << 8 | a2;
                b64 +=    b64chars.charAt( ord >>> 18)
                    +     b64chars.charAt((ord >>> 12) & 63)
                    + ( a1 !== undef
                        ? b64chars.charAt((ord >>>  6) & 63) : '=')
                    + ( a2 !== undef
                        ? b64chars.charAt( ord         & 63) : '=');
            };
            return urisafe ? mkUriSafe(b64) : b64;
        };
        Base64_toUint8Array = function(a) {
            return Uint8Array.from(_atob(_fromURI(a)), function(c) {
                return c.charCodeAt(0);
            });
        };
    };

// export Base64 for test
    if(REGEXP_FREE_BASE64_DEFINE_DEBUG){
        global.Base64 = {
            atob           : Base64_atob,
            btoa           : Base64_btoa,
            fromBase64     : Base64_decode,
            toBase64       : Base64_encode,
            utob           : Base64_utob,
            encode         : Base64_encode,
            encodeURI      : Base64_encodeURI,
            btou           : Base64_btou,
            decode         : Base64_decode,
            fromUint8Array : Base64_fromUint8Array,
            toUint8Array   : Base64_toUint8Array
        };
    };
})(this);