$(document).ready(function() {
    var code = param('code');

    if(code) {
        $('.main').fadeIn('slow');

        $.get('https://vis-api.herokuapp.com/activate/' + code, function(data) {
            $('#titleName').text(data.name);
            $('#email').val(data.email);
        })
    } else {
        window.location = 'http://www.visualnoar.com.br';
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