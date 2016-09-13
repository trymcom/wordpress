## コーディングを始める前に

* [コーディングルール](https://github.com/leo-trym/html/wiki/%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%AB)
* [common.js について](https://github.com/leo-trym/html/wiki/common.js%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)  
* [SCSS使用時のmixinについて](https://github.com/leo-trym/html/wiki/SCSS%E4%BD%BF%E7%94%A8%E6%99%82%E3%81%AEmixin%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

## WordPress用ルール

### 一般的な注意点

wp-content/themes/theme-nameのディレクトリ名は適宜変更してください。

CSSやJSの読み込みをページごとに変更せずに、すべてのページで共通のファイルを使用します。  
各ページのスタイルはbodyに固有のクラスを振り、子孫セレクタで行うこと。

HTML
```html
<html>
  <body class="home">
    <div class="element"></div>
  </body>
</html>
```

CSS
```css
.home .element {
  margin-bottom: 1em;
}
```

ヘッダー、フッターをインクルードしているため、  
bodyにクラスを降る場合は3行目を変更する。

```php
<?php
  $root = $_SERVER['DOCUMENT_ROOT'] . '/wp-content/themes/theme-name/';
  $body_class = 'ここを変更する';
  include($root . 'header.php');
?>
```

### CSSについて

SCSSを使用して構築します。  
用途ごとにファイルを分割する必要がある場合は、  
「\_ファイル名.scss」のようにリネームし、  
下記ディレクトリに収めてstyle.scssにインクルードします。

/wp-content/themes/theme-name/scss

```scss
/* =========================================================
COMMON
========================================================= */
@import "_common.scss";

/* =========================================================
PAGES
========================================================= */
@import "_pages.scss";
```

プラグイン用のCSSなどは「\_ファイル名.scss」のようにリネームし  
_plugins.scssにインクルードします。  

```scss
/* =========================================================
  MMENU
========================================================= */
@import "_mmenu.scss";

/* =========================================================
  SLIDER
========================================================= */
@import "_bxslider.scss";
```

SCSSの書き出しパスは下記になります。

/wp-content/themes/theme-name/style.css

### 画像ファイルについて

画像ファイルはページごとに分けて下記のようにディレクトリに収めます。

/wp-content/themes/theme-name/images/  
　├ common/  
　├ home/  
　└ about/

### jQueryについて

WordPress内のjQueryを使用するため、  
記述の仕方に注意が必要です。

```js
//ダメな例
$('#element').hide();

//良い例
jQuery('#element').hide();
```
### HTMLファイルの階層について

WordPressではすべてスラッグでアクセスになるため、  
下記のような構成に出来ません。  

/about/history.html

この場合下記のようにします。

/about/history/
