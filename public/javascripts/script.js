$(document).ready(function() {
    $('#loginForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
    });

    $('#regkeygen').click(function(){
        alert('hello');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/regkey",
            data:{
                "regkey": randString(10),
            },
            success: function(data) {
                $("#keyvalue").val("Hello world!");
                alert('hello');
            }
        });
    });

    function randString(n)
    {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(var i=0; i < n; i++)
        {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
});



