const gulp            = require('gulp'),
      ClosureCompiler = require('google-closure-compiler').gulp(),
      externsJs       = './src/js-externs/externs.js';

/* -------------------------------------------------------
 *  gulp dist
 */
gulp.task('dist', gulp.series(
    function(){
        return gulp.src( './src/js/base64.js' )
            .pipe(
                ClosureCompiler(
                    {
                        externs           : [ externsJs ],
                        define            : [
                            'DEFINE_REGEXP_FREE_BASE64__DEBUG=true',
                            'DEFINE_REGEXP_FREE_BASE64__USE_URISAFE_BTOA=true',
                            'DEFINE_REGEXP_FREE_BASE64__USE_URISAFE_ATOB=true'
                        ],
                        compilation_level : 'ADVANCED',
                        //compilation_level : 'WHITESPACE_ONLY',
                        formatting        : 'PRETTY_PRINT',
                        warning_level     : 'VERBOSE',
                        language_in       : 'ECMASCRIPT3',
                        language_out      : 'ECMASCRIPT3',
                        output_wrapper    : 'var Base64_decode, Base64_encode,' +
                                                'Base64_atob, Base64_btoa,' +
                                                'Base64_utob, Base64_btou, Base64_encodeURI,' +
                                                'Base64_fromUint8Array, Base64_toUint8Array,' +
                                                'Base64_uriSafeBtoa, Base64_uriSafeAtob;' +
                                            '%output%' +
                                            ';;module.exports=this.Base64;',
                        js_output_file    : 'base64.min.js'
                    }
                )
            ).pipe(gulp.dest( './dist' ));
    },
    function(){
        return gulp.src( './src/js/base64.js' )
            .pipe(
                ClosureCompiler(
                    {
                        externs           : [ externsJs ],
                        define            : [
                            'DEFINE_REGEXP_FREE_BASE64__DEBUG=true',
                            'DEFINE_REGEXP_FREE_BASE64__USE_UTOB=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_BTOU=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_BTOA=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_ATOB=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_URISAFE_BTOA=true',
                            'DEFINE_REGEXP_FREE_BASE64__USE_URISAFE_ATOB=true',
                            'DEFINE_REGEXP_FREE_BASE64__USE_UINT8=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_ENCODE=false',
                            'DEFINE_REGEXP_FREE_BASE64__USE_DECODE=false'
                        ],
                        compilation_level : 'ADVANCED',
                        //compilation_level : 'WHITESPACE_ONLY',
                        formatting        : 'PRETTY_PRINT',
                        warning_level     : 'VERBOSE',
                        language_in       : 'ECMASCRIPT3',
                        language_out      : 'ECMASCRIPT3',
                        output_wrapper    : 'var Base64_decode, Base64_encode,' +
                                                'Base64_atob, Base64_btoa,' +
                                                'Base64_utob, Base64_btou, Base64_encodeURI,' +
                                                'Base64_fromUint8Array, Base64_toUint8Array,' +
                                                'Base64_uriSafeBtoa, Base64_uriSafeAtob;' +
                                            '%output%' +
                                            ';;module.exports=this.Base64;',
                        js_output_file    : 'base64-uriSafe.min.js'
                    }
                )
            ).pipe(gulp.dest( './dist' ));
    }
));