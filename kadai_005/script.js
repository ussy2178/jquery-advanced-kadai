$('.button-more').on('mouseover', function(){
    $(this).animate({
        opacity: 0.5,
        marginLeft: 20,
    }, 100); 
});

$('.button-more').on('mouseout', function(){
    $(this).animate({
        opacity: 1,
        marginLeft: 0,
    }, 100);
});

$('.carousel').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
});

$('#submit').on('click', function(event) {
    // formタグによる即時送信を拒否
    event.preventDefault();

    // 入力チェックを実行
    let result = inputCheck();

    // 入力チェックの結果を取得
    let error = result.error;
    let message = result.message;

    if(error == false) {
        // 送信OK
        $.ajax({
            url: 'https://api.staticforms.xyz/submit',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize(),
            success: function(result) {
                alert('お問合せを送信しました。')
            },
            error: function(xhr, resp, text) {
                alert('お問合せを送信できませんでした。')
            }
        })
    } else {
        // 送信NG→エラーメッセージ表示
        alert(message);
    }
});

$('#name').blur(function(){
    inputCheck();
});

$('#furigana').blur(function(){
    inputCheck();
});

$('#email').blur(function(){
    inputCheck();
});

$('#tel').blur(function(){
    inputCheck();
});

$('#message').blur(function(){
    inputCheck();
});

$('#agree').click(function(){
    inputCheck();
});

// 入力内容のチェック関数
function inputCheck(){
    let result;
    let message = '';
    let error = false;

    if($('#name').val() == '') {
        // エラーあり
        $('#name').css('background-color', '#f79999');
        error = true;
        message += 'お名前を入力してください。\n';
    } else {
        // エラーなし
        $('#name').css('background-color', '#fafafa');
    }

    if($('#furigana').val() == ''){
        // エラーあり
        $('#furigana').css('background-color', '#f79999');
        error = true;
        message += 'フリガナを入力してください。\n';
    } else {
        // エラーなし
        $('#furigana').css('background-color', '#fafafa');
    }

    if($('#message').val() == '') {
        // エラーあり
        $('#message').css('background-color', '#f79999');
        error = true;
        message += 'お問い合わせ内容を入力してください。\n'; 
    } else {
        // エラーなし
        $('#message').css('background-color', '#fafafa');
    }

    if($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
        // エラーあり
        $('#email').css('background-color', '#f79999');
        error = true;
        message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
        $('#email').css('background-color', '#fafafa');
    }

    if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
        // エラーあり
        $('#tel').css('background-color', '#f79999');
        error = true;
        message += '電話番号に「-」が含まれていません。\n';
    } else {
        // エラーなし
        $('#tel').css('background-color', '#fafafa');
    }

    if($('agree').prop('checked') == false) {
        error = true;
        message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n'
    }

    if(error == true) {
        // 送信NG
        $('#submit').attr('src', 'images/button-submit.png');
    } else {
        // 送信OK
        $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    result = {
        error : error,
        message : message
    }

    return result;
}