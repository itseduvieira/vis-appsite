$(document).ready(function() {
    var code = param('code');
    var redirect = 'https://app.visualnoar.com.br/#download';

    if(code) {
        $('.show-hide-pass').click(function() {
            $('#pass').focus();
        });

        $('.show-hide-pass > span').click(function() {
            var input = $('#pass');
            if (input.attr("type") == "password") {
                $('.show-hide-pass > span').text('ESCONDER');
                input.attr("type", "text");
            } else {
                $('.show-hide-pass > span').text('MOSTRAR');
                input.attr("type", "password");
            }
        });

        $.get('https://vis-api.herokuapp.com/activate/' + code, function(data) {
            $('#titleName').text(data.name);
            $('#email').val(data.email);

            $('.bg').fadeIn('slow', function() {
                $('.main').fadeIn('slow');
            });

            $('#submit').click(function(e) {
                e.preventDefault();

                if($('#pass').val().length < 6) {
                    alert('A senha deve possuir mais de 6 caracteres');

                    return;
                }

                if(!$('#agree-term').is(':checked')) {
                    alert('Os termos de uso devem ser aceitos');

                    return;
                }
                
                var height = $('.sign-up-content').height();
                $('.sign-up-content').css('height', height);

                $('.sign-up-content').children().hide();
                $('.loader').css('top', (height / 2) - 40);
                $('.loader').show();

                var parameters = {
                    code: code,
                    password: $('#pass').val()
                };

                $.post('https://vis-api.herokuapp.com/activate/' + code, parameters, function(data) {
                    window.location = redirect;
                }).fail(function(err) {
                    $('.sign-up-content').children().show();

                    $('.loader').hide();
                });
            });
        }).fail(function(err) {
            window.location = redirect;
        });
    } else {
        window.location = redirect;
    }
});

function param(name) {
    var url = window.location.search.substring(1);
    var variables = url.split('&');
    for (var i = 0; i < variables.length; i++) {
        var element = variables[i].split('=');
		
        if (element[0] == name) 
        {
            return element[1];
        }
    }
}