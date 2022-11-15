<!-- [![build status](https://secure.travis-ci.org/dankogai/js-base64.png)](http://travis-ci.org/dankogai/js-base64) -->

# es2-base64

[dankogai](https://github.com/dankogai) 氏の [js-base64](https://github.com/dankogai/js-base64) を元に、正規表現を不使用としました。正規表現をサポートしない Windows CE 版 Internet Explorer 4.01 でも動作します。(未確認)

Closure Compiler で必要な関数だけをプロジェクトに組み込み、高度に最適化する想定で [`@define`](./src/js/base64.js) を定義し [externs.js](./src/js-externs/externs.js) を用意しています。

Closure Compiler を使った最適化は [gulpfile.js](./gulpfile.js) を参照します。

* [Demo for base64.js](https://ECMAScript2.github.io/es2-base64/test/demo.html)
* [Mocha Tests](https://ECMAScript2.github.io/es2-base64/test/index.html)

## 命名ルール

[僕のWeb開発の、変数と関数、ファイル名とフォルダ名の命名ルール](https://outcloud.blogspot.com/2021/08/naming-rules.html)

## mocha test

```
npm install
npm test
```

## Build

```
gulp dist
```

## Usage

### In Browser

```html
<script src="base64.js"></script>
```

### node.js

```javascript
var Base64 = require('js-base64').Base64;
```

<!--
## es6+

```javascript
import { Base64 } from 'js-base64';
```
--->

## SYNOPSIS

```javascript
Base64.encode('dankogai'); // ZGFua29nYWk=
Base64.btoa(  'dankogai'); // ZGFua29nYWk=
Base64.fromUint8Array(     // ZGFua29nYWk=
    new Uint8Array([100,97,110,107,111,103,97,105])
);
Base64.fromUint8Array(     // ZGFua29nYW which is URI safe
    new Uint8Array([100,97,110,107,111,103,97,105]), true
);
Base64.encode(   '小飼弾'); // 5bCP6aO85by+
Base64.encodeURI('小飼弾'); // 5bCP6aO85by- which equals to Base64.encode('小飼弾', true)
Base64.btoa(     '小飼弾'); // raises exception 
```

```javascript
Base64.decode('ZGFua29nYWk=');  // dankogai
Base64.atob(  'ZGFua29nYWk=');  // dankogai
Base64.toUint8Array(            // new Uint8Array([100,97,110,107,111,103,97,105])
    'ZGFua29nYWk='
);
Base64.decode('5bCP6aO85by+');  // 小飼弾
// note .decodeURI() is unnecessary since it accepts both flavors
Base64.decode('5bCP6aO85by-');  // 小飼弾
Base64.atob(  '5bCP6aO85by+');  // 'å°é£¼å¼¾' which is nonsense
```

## `.decode()` vs `.atob` (and `.encode()` vs `btoa()`)

Suppose you have:

```
var pngBase64 = 
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
```

Which is a Base64-encoded 1x1 transparent PNG, **DO NOT USE** `Base64.decode(pngBase64)`.  Use `Base64.atob(pngBase64)` instead.  `Base64.decode()` decodes to UTF-8 string while `Base64.atob()` decodes to bytes, which is compatible to browser built-in `atob()` (Which is absent in node.js).  The same rule applies to the opposite direction.


## SEE ALSO

+ http://en.wikipedia.org/wiki/Base64
