$(function(){
  function  autoBuild(message){
    if (message.image !== null){
    	var img = `<img src="${message.image}">`
    }
    else{
      var img = ""
    }

    var html = `<div class="chat__content__area" data-id="${ message.id }">
                  <div class="chat__content__area__head">
                    <a class="chat__content__area__head__name">${message.user}</a>
                    <a class="chat__content__area__head__time">${message.posted_time}</a>
                  </div>
                  <p class="chat__content__area__string">
                  ${ message.body }
                  ${ img }
                  </p>
                </div>`

    return html
  }

  setInterval(function(e){
  	var thispage = window.location.href
    if( thispage.match(/^(?=.*groups)(?=.*messages)/)){   //正規表現記述(groups)と(messages)が両方存在する文字列にマッチ
      var message_id = $('.chat__content__area:last').data('id');
  	  $.ajax({
        url:'messages',
        type:'GET',
        data:{
          message: {id: message_id}
        },
        dataType: 'json'
  	  })
  	  .done(function(json){
        json.forEach(function(message){
  	      var autohtml = autoBuild(message);
          $('.chat__content').append(autohtml);
  	      $('.chat__content').scrollTop($('.chat__content')[0].scrollHeight);
  	    });
      })
  	  .fail(function(){
  	    alert('error');
  	  })
    }
  },
  7000);
});

