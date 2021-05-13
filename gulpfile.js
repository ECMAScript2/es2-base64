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
                            'REGEXP_FREE_BASE64_DEFINE_DEBUG=true',
                            'REGEXP_FREE_BASE64_DEFINE_USE_URISAFE_BTOA=true',
                            'REGEXP_FREE_BASE64_DEFINE_USE_URISAFE_ATOB=true'
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
                                            ';;module.export=this.Base64;',
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
                            'REGEXP_FREE_BASE64_DEFINE_DEBUG=true',
                            'REGEXP_FREE_BASE64_DEFINE_USE_UTOB=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_BTOU=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_BTOA=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_ATOB=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_URISAFE_BTOA=true',
                            'REGEXP_FREE_BASE64_DEFINE_USE_URISAFE_ATOB=true',
                            'REGEXP_FREE_BASE64_DEFINE_USE_UINT8=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_ENCODE=false',
                            'REGEXP_FREE_BASE64_DEFINE_USE_DECODE=false'
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
                                            ';;module.export=this.Base64;',
                        js_output_file    : 'base64-uriSafe.min.js'
                    }
                )
            ).pipe(gulp.dest( './dist' ));
    }
));