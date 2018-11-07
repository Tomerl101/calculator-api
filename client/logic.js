const BASE_URL = 'http://localhost/web/service/controller.php';

$(document).ready(function () {
  let $radioButtons = $('input[name=methodType]');

  $radioButtons.click(function () {
    let $methodType = $('input[name=methodType]:checked').val();
    sendRequest($methodType);

    var res;
  });
});


function sendRequest(method) {
  switch (method) {
    case 'GET':
      $.ajax({
        url: 'http://localhost/web/service/controller.php?func=sum&num1=1&num2=1&num3=2',
        type: 'GET',
        success: function (result) {
          console.log('result:' + result.avg);
          $(".result").append(result);
        }
      });
      console.log('get');
      break;
    case 'POST':
      $.ajax({
        url: 'http://localhost/web/service/controller.php',
        data: { func: "sum", num1: 1, num2: 1, num3: 2 },
        type: 'POST',
        success: function (result) {
          console.log(result);
          $(".result").append(result);
          // res = result;
        }
      });
      console.log('post');
      break;
    case 'PUT':
      $.ajax({
        url: BASE_URL,
        type: 'PUT',
        data: { func: "sum", num1: 10, num2: 15, num3: 20 },
        success: function (result) {
          console.log('result:' + result);
          $(".result").append(result);
        }
      });
      console.log('put');
      break;
    default:
      console.log('error');
  }
}