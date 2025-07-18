$(function() {
    var pageUp = $('#page_up');
    pageUp.hide(); //ボタンを非表示しておく
    
    //スクロールしてページトップから100に達したらボタンを表示
    $(window).scroll(function(){
      if($(this).scrollTop() > 100) {
        pageUp.fadeIn();
      }else{
        pageUp.fadeOut();
      }
    });
  
    //クリックするとスクロールしてトップへ戻る
    pageUp.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 80);
    });
  });