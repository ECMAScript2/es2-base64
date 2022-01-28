/** @type {Object} */
var Base64 = {
    atob           : function(){},
    btoa           : function(){},
    uriSafeAtob    : function(){},
    uriSafeBtoa    : function(){},
    fromBase64     : function(){},
    toBase64       : function(){},
    utob           : function(){},
    encode         : function(){},
    encodeURI      : function(){},
    btou           : function(){},
    decode         : function(){},
    fromUint8Array : function(){},
    toUint8Array   : function(){}
};

/** @type {function(string):string} */
var Base64_atob = function(a){};

/** @type {function(string):string} */
var Base64_btoa = function(b){};

/** @type {function(string):string} */
var Base64_uriSafeAtob = function(a){};

/** @type {function(string):string} */
var Base64_uriSafeBtoa = function(b){};

/** @type {function(string):string} */
var Base64_utob = function(u){};

/** @type {function(string):string} */
var Base64_btou = function(b){};

/** @type {function(string):string} */
var Base64_decode = function(a){};

/** @type {function(string,boolean=):string} */
var Base64_encode = function(u, urisafe){};

/** @type {function(string):string} */
var Base64_encodeURI = function(a){};

/** @type {function(string,boolean=):string} */
var Base64_fromUint8Array = function(a, urisafe){};

/** @type {function(string):string} */
var Base64_toUint8Array = function(a){};