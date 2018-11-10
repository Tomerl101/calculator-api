const BASE_URL = 'http://localhost/web/service/controller.php';

$(document).ready(function () {
    let $radioButtons = $('input[name=methodType]');

    $radioButtons.click(function () {
        let methodType = $('input[name=methodType]:checked').val();
        sendRequest(methodType);
    });
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
                    alert(request.getResponseHeader('some_header'));
                }
            });
            console.log('get');
            break;
        case 'POST':
            $.ajax({
                url: 'http://localhost/web/service/controller.php',
                data: { func: "sum", num1: 1, num2: 1, num3: 2 },
                type: 'POST',
                success: function (data) {
                    $(".result").text('result:' + data.result);
                },
                error: function (request, textStatus, errorThrown) {
                    alert(request);
                }
            });
            break;
        case 'PUT':
            $.ajax({
                url: BASE_URL,
                type: 'PUT',
                data: "func=mult&num1=10&num2=15&num3=20",
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