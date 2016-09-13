/* ===============================================================

common scripts

=============================================================== */

  window.onunload = function(){};

  var g = {
    isSp:function(){ return ( g.winW() <= g.point )? true : false ; },// SP or PC
    winW:function(){ return jQuery( window ).width(); },
    winH:function(){ return jQuery( window ).height(); },
    winT:function(){ return jQuery( window ).scrollTop(); },
    point: 768
  }

  var _ua = (function(u){
    return {
      Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
      Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1
    }
  })(window.navigator.userAgent.toLowerCase());

  var Common = function(){};

  Common = {

    fadeAlpha : function(){

      jQuery('.fadeAlpha').hover(function(){
        jQuery(this).removeClass('out').addClass('over');
      },
      function(){
        jQuery(this).removeClass('over').addClass('out');
      });

    },

    accordion : function(){

      jQuery('.accordion').find('dt').not('.other').on("click", function() {
        jQuery(this).toggleClass('active')
          .next('dd').slideToggle()
            .siblings('dd:visible').slideUp()
              .prev('dt').removeClass('active');

        if(jQuery(this).hasClass('active')){
          var on = jQuery(this).find('img').attr('src').replace('_off','_on');
          jQuery(this).find('img').attr('src', on);
        }else{
          var off = jQuery(this).find('img').attr('src').replace('_on','_off');
          jQuery(this).find('img').attr('src', off);
        }
      });

    },

    tab : function(){

      var $tab = jQuery('div.inner');
      var $nav = $tab.find('.tabNav a');
      var $tabBody = $tab.find('.tabBody');

      $tabBody.not(':first').hide();
      $nav.eq(0).parent().addClass('active');

      $nav.click(function(){
        var $this = jQuery(this);
        var targetTabId = $this.attr('href');

        $nav.parent().removeClass('active');
        $tabBody.hide();
        $this.parent().addClass('active');
        jQuery(targetTabId).fadeIn(1000);

        return false;
      });

    },

    smoothScroll : function(){

      jQuery('a[href^="#"]').click(function() {
        jQuery('html,body').animate({ scrollTop:
          jQuery(jQuery(this).attr('href')).offset().top }, 'slow','swing');
          return false;
        });

    },

    pagetop : function(){

      //指定位置でstaticに
      var $elem = jQuery(''),
          $content = jQuery(''),
          $win = jQuery(window);

          var contentTop = 0;

      function updatePosition(){
        contentTop = $content.offset().top + $elem.outerHeight();
      }

      function update(){
        if( $win.scrollTop() + $win.height() > contentTop ){
          $elem.addClass('static');
        } else if( $elem.hasClass('static') ){
          $elem.removeClass('static');
        }
      }

      $win.load(function(){
        updatePosition();
          update();
        })
        .resize(function(){
          updatePosition();
          update();
        })
        .scroll(function(){
          update();
        });


      jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() > 100) {
          jQuery('.pagetop').fadeIn();
        } else {
          jQuery('.pagetop').fadeOut();
        }
      });


    },

    currentNav : function(){

      var url = window.location.pathname;

      jQuery('.nav.pg li a[href="'+url+'"]').parent().addClass('current');

      var url = url.replace(/\w*\.html$/,'');
      jQuery('.nav.dr li a[href="'+url+'"]').parent().addClass('current');

      if ( jQuery('.nrp li.current').size() > 0 ) {
        var $crimg = jQuery('li.current').find("img[src*='_off']");
        $crimg.attr('src', $crimg.attr("src").replace(/_off/,'_on'));
      }

      /* CURRENT画像置換
      jQuery('.nrp li').each(function(){

        var off = jQuery(this).find('img').attr('src'),
             on = off.replace(/_off/, '_on');

       if ( jQuery(this).hasClass('current') ) {
         jQuery(this).find('img').attr('src', on);
       }

      });
      */

    },

    rollover : function(){

      jQuery("img[src*='_on']").parents('li').addClass("current");

      jQuery("img,input[type='image']").hover(function(){
        if (jQuery(this).attr("src")){
          jQuery(this).attr("src",jQuery(this).attr("src").replace("_off.", "_on."));
        }
      },function(){
        if (jQuery(this).attr("src") && !jQuery(this).parents('li').hasClass("current") ){
          jQuery(this).attr("src",jQuery(this).attr("src").replace("_on.", "_off."));
        }
      });

    },

    popup : function(){

      jQuery('.popup').click(function(){
        window.open(this.href, "WindowName","width=650,height=500,resizable=yes,scrollbars=yes");
        return false;
      });

    },

    resizeFnc : function(){

      //resizeFlag
      if ( g.isSp() ) {
        jQuery('body').removeClass('pcview').addClass('spview');
      } else {
        jQuery('body').removeClass('spview').addClass('pcview');
      }

      //SP Image changer
      if ( g.isSp() ) {

        var before = /pc_/,
            after = 'sp_';

        replaceImg();

      } else {

        var before = /sp_/,
            after = 'pc_';

        replaceImg();

      }

      function replaceImg(){
        jQuery('img[src*=pc_],img[src*=sp_]').each(function(){
          var spImg = jQuery(this).attr('src').replace(before, after);
          if( jQuery(this).attr('src').match(before) ) {
            jQuery(this).attr('src', spImg);
          }
        });
      }

    },

    //画像の有無を判断して置換
    getSpImg : function(){

      var pc = jQuery(this).attr('src'),
          sp = pc.replace(/\/default\//, '/sphone/');

      $.get(sp, null, function(data, status) {

        jQuery('img' + '[src="' + pc + '"]').attr('src', sp);

      });

    },

    altText : function(){

      jQuery('.altText').each(function(){

        alt = jQuery(this).find('img').attr('alt').replace(/\s{2}/, '<br>');
        jQuery(this).prepend('<span class="sp">' + alt + '</span>');

      });

    },

    share : function(){

      var shareTitle = encodeURI(jQuery('title').html());
      var shareUrl = encodeURI(document.URL);
      var shareUrlComponent = encodeURIComponent(document.URL);
      jQuery('.twitterShare a').attr("href", "http://twitter.com/share?url="+ shareUrl + "&text=" + shareTitle);
      jQuery('.facebookShare a').attr("href", "http://www.facebook.com/sharer.php?u="+ shareUrl +"&t=" + shareTitle);
      jQuery('.googleShare a').attr("href", "https://plus.google.com/share?url=" + shareUrl);
      jQuery('.tumblrShare a').attr("href", "http://www.tumblr.com/share/link?&url=" + shareUrlComponent + "&name=" + shareTitle);
      jQuery('.pinterestShare a').attr("href", " http://pinterest.com/pin/create/button/?url=" + shareUrl + "&media=画像URL" + shareTitle );
      jQuery('.linkedinShare a').attr("href", "http://www.linkedin.com/shareArticle?mini=true&url=" + shareUrl + "&title=" + shareTitle);
      jQuery('.lineShare a').attr("href", "http://line.me/R/msg/text/?" + shareTitle + shareUrl);
      jQuery(".share a").click(function(){
        window.open(this.href, "social_window","width=600,height=600,resizable=yes,scrollbars=yes,toolbar=yes");
        return false;
      });

    },

    uaFnc : function(){

      if( _ua.Mobile || _ua.Tablet ){
        //スマホ OR タブレットの場合
      }

    }

  }

  jQuery(function() {

    Common.smoothScroll();
    Common.accordion();
    Common.tab();
    Common.currentNav();
    Common.rollover();
    Common.popup();
    //Common.getSpImg();
    Common.altText();
    Common.share();
    Common.uaFnc();

    jQuery(window).on('load resize', function(){

      Common.resizeFnc();
      Common.bgResize();

    });

  });