$(function(){
  function buildHTML(message){
    if (message.image !== null) {
      var img = `<img src="${message.image}">`
    }
    else{
      var img = ""
    }                                 //画像がある時のみ変数imgをhtmlとして生成。ない時は空値を挿入。同function内あるいは引数で取ってきた変数は${}で使えるので追加。
　　　
    var html =`<div class="chat__content__area">
                      <div class="chat__content__area__head">
                        <a class="chat__content__area__head__name">
                        ${ message.user }
                        </a>
                        <a class="chat__content__area__head__time">
                        ${ message.posted_time }
                        </a>
                      </div>
                      <p class="chat__content__area__string">
                      ${ message.body }
                      ${ img }
                      </p>
                </div>`
    return html
  }
  $('#new__form').on('submit', function(e){
  	e.preventDefault();
    var sendbody = $('.form__message').val();
    var sendimage = $('.hidden').val();
    if (sendbody.length || sendimage.length){ //変数化した画像ないしはテキストが存在するかの識別（.lengthは要素数をカウントするが、空の場合はnullになる挙動を利用して識別している）
    	var formData = new FormData(this);
    	var href = window.location.href;
      $.ajax({
        url: href,
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false
      })
      .done(function(message){
  　　　　var html = buildHTML(message);
        $('.chat__content').append(html)
        $('.form__message').val('')
        $('.hidden').val('')
        $(".form__submit").removeAttr("disabled");  //  リロードなしの複数回送信のためのコード
        $('.chat__content').scrollTop($('.chat__content')[0].scrollHeight);
      })
      .fail(function(){
  　　　　alert('error');
         location.href = window.location.href;
  　　　　$(".form__submit").removeAttr("disabled");
      })
     }
     else{
      alert('テキスト、または画像を入力してください');
      location.href = window.location.href;  // アラートを消した後に一行下コードの発火を促すために何も送れてない際に現在のビューに遷移している
      $(".form__submit").removeAttr("disabled");
     }
  });
});
