const BASE_URL = 'http://localhost/web/service/controller.php';

$(document).ready(function () {
    let $radioButtons = $('input[name=methodType]');
    let $numbersButtons = $('.numbers');
    let $methodButtons = $('.method');
    let $opButtons = $('.op');
    let $enterButton = $('#enter');
    let method;
    let op;

    let value = "";
    let num1;
    let num2;
    let num3;

    $radioButtons.click(function () {
        let methodType = $('input[name=methodType]:checked').val();
        sendRequest(methodType);
    });


    $enterButton.click(function () {
        if (num1 == undefined) {
            num1 = parseInt(value);
            $('.calc-operation').append(", num2: ");
            $('.calc-typed').text(">press 'ENTER' to add num2");
            console.log('num1');
        } else if (num2 == undefined) {
            num2 = parseInt(value);
            $('.calc-operation').append(", num3: ");
            $('.calc-typed').text(">press 'ENTER' to add num3");
        } else if (num3 == undefined) {
            num3 = parseInt(value);
            $('.calc-typed').text(">press 'SEND' to get result!");
            $(this).text('SEND');
            return;
        } else {
            sendRequest(method, op, num1, num2, num3);
            resetCalculator();
            return;
        }
        value = "";
        return;
    });

    $numbersButtons.click(function () {
        value = value.concat($(this).text());
        console.log(value);
        $('.calc-operation').append(($(this).text()));
    });

    $methodButtons.click(function () {
        $methodButtons.removeClass('method-clicked');
        $(this).toggleClass('method-clicked').text();
        method = $(this).text();
    })

    $opButtons.click(function () {
        $opButtons.removeClass('op-clicked');
        op = $(this).toggleClass('op-clicked').text().toLowerCase();
    })


    function resetCalculator() {
        $('.calc-operation').text("num1: ");
        $('enterButton').text("ENTER");
        $methodButtons.removeClass("method-clicked");
        $opButtons.removeClass("op-clicked");
        num1 = undefined;
        num2 = undefined;
        num3 = undefined;
        value = "";
    }
});


function sendRequest(method, op, num1, num2, num3) {
    if (!(method && op)) {
        alert("Choose METHOD and OPERATION to send!");
        return;
    }
    switch (method) {
        case 'GET':
            $.ajax({
                url: BASE_URL + '?func=sum&num1=2&num2=2&num3=2',
                type: 'GET',
                success: function (data) {
                    $('.calc-typed').text(`> ${op} is: ${data.result}`);
                },
                error: function (request, textStatus, errorThrown) {
                    alert(errorThrown);
                    alert(request.getResponseHeader('some_header'));
                }
            });
            console.log('get');
            break;
        case 'POST':
            console.log('POST in client');
            console.log(method, op, num1, num2, num3);
            $.ajax({
                url: 'http://localhost/web/service/controller.php',
                data: { func: op, num1, num2, num3 },
                type: 'POST',
                success: function (data) {
                    $('.calc-typed').text(`> ${op} is: ${data.result}`);
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
                    $('.calc-typed').text(`> ${op} is: ${data.result}`);
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

