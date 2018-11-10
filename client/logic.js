const BASE_URL = 'http://localhost/web/service/controller.php';

$(document).ready(function () {
    let $radioButtons = $('input[name=methodType]');
    let $numbersButtons = $('.numbers');
    let $methodButtons = $('.method');
    let $opButtons = $('.op');
    let $sendButton = $('#send');

    $radioButtons.click(function () {
        let methodType = $('input[name=methodType]:checked').val();
        sendRequest(methodType);
    });

    $methodButtons.click(function () {
        $methodButtons.removeClass('method-clicked');
        $(this).toggleClass('method-clicked');
    })

    $opButtons.click(function () {
        $opButtons.removeClass('op-clicked');
        $(this).toggleClass('op-clicked');
    })
});


function sendRequest(method) {
    switch (method) {
        case 'GET':
            $.ajax({
                url: BASE_URL + '?func=sum&num1=2&num2=2&num3=2',
                type: 'GET',
                success: function (data) {
                    $(".result").text('result:' + data.result);
                },
                error: function (request, textStatus, errorThrown) {
                    alert(errorThrown);
                    alert(request.getResponseHeader('some_header'));
                }
            });
            console.log('get');
            break;
        case 'POST':
            $.ajax({
                url: 'http://localhost/web/service/controller.php',
                data: { func: "bla", num1: 1, num2: '1', num3: 2 },
                type: 'POST',
                success: function (data) {
                    $(".result").text('result:' + data.result);
                },
                error: function (request, textStatus, errorThrown) {
                    alert('request');
                    alert(request.getResponseHeader());
                }
            });
            break;
        case 'PUT':
            $.ajax({
                url: BASE_URL,
                type: 'PUT',
                data: { func: "sum", num1: 3, num2: 3, num3: 3 },
                success: function (data) {
                    console.log(data);
                    $(".result").text('result:' + data.result);
                },
                error(e) {
                    console.log(e);
                }
            });
            break;
        default:
            console.log('error');
    }
}