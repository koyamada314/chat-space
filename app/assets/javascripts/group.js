$(function(){
  function appendUser(user){
  var html = `<div id='chat-group-users'>
                <div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="add-data" data-user-id="${ user.id }" data-user-name="${ user.name}">追加</a>
                </div>
              </div>`
  return html
  }

  $(document).on('keyup', '#user-search-field', function(e){   //form_for時にそのうちの一つのtextfieldの値を取得するためには、必ずtext_fieldのidを参照。(idは名付けておらずとも検証すれば後ずけされているのが確認できる)
  	e.preventDefault();
    var input = $('#user-search-field').val();
    // console.log(input)
    $.ajax({
      type: 'GET',
      url: "/users",
      data: {keyword: input},     //indexアクションのkeywordカラムにinputを送る。moooviのサーチはhtmlでも出来たためview側にもname=>keywordが必要だったが今回は不要？
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      users.forEach(function(user){
      	var eachhtml = appendUser(user);
        $('#user-search-result').append(eachhtml);
      });
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
  function addUser(username, userid){
  	var addhtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${userid}'>
                    <p class='chat-group-user__name'>${username}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id='${userid}' id='remove-button'>削除</a>
                  </div>`
  return addhtml
  }

  $('#user-search-result').on('click','#add-data', function(e){
  	var username = $(this).data('user-name');
  	var userid = $(this).data('user-id');
    $('#chat-group-users_a').append(addUser(username,userid));
    $(this).parent().remove();
  });
  $('#chat-group-users_a').on('click', '#remove-button', function(e){
    $(this).parent().remove();
  });
});




