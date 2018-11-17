const BASE_URL = 'http://shenkar.html5-book.co.il/2018-2019/dcs/dev_46/service_calculator/index.php';

$(document).ready(function () {
  let $numbersButtons = $('.numbers');
  let $methodButtons = $('.method');
  let $opButtons = $('.op');
  let $enterButton = $('#enter');
  let $clearButton = $('#clear');
  let method;
  let op;
  let value = "";
  let num1, num2, num3;

  $clearButton.click(function () {
    resetCalculator();
    $('.calc-typed').text("> select number1 and press 'ENTER' ");
    return;
  })

  $enterButton.click(function () {
    if (num1 == undefined) {
      num1 = parseInt(value);
      $('.calc-operation').append(", num2: ");
      $('.calc-typed').text("> select number2 and press 'ENTER'");
    } else if (num2 == undefined) {
      num2 = parseInt(value);
      $('.calc-operation').append(", num3: ");
      $('.calc-typed').text("> select number3 and press 'SEND'");
      $(this).text('SEND');
    } else if (num3 == undefined) {
      num3 = parseInt(value);
      if (sendRequest(method, op, num1, num2, num3)) {
        resetCalculator();
      }
    } else {
      if (sendRequest(method, op, num1, num2, num3)) {
        resetCalculator();
      }
    }
    value = "";
    return;
  });

  $numbersButtons.click(function () {
    value = value.concat($(this).text());
    $('.calc-operation').append(($(this).text()));
  });

  $methodButtons.click(function () {
    $methodButtons.removeClass('method-clicked');
    method = $(this).toggleClass('method-clicked').text();
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
    $enterButton.text("ENTER");
    num1 = undefined;
    num2 = undefined;
    num3 = undefined;
    value = "";
    method = null;
    op = null;
  }
});


function sendRequest(method, op, num1, num2, num3) {
  if (!(method && op)) {
    alert("Choose METHOD and OPERATION to send!");
    return false;
  }
  $.ajax({
    url: BASE_URL,
    data: { func: op, num1, num2, num3 },
    type: method,
    success: function (data) {
      $('.calc-typed').text(`> ${op} is: ${data.result}
                    \n Press C to reset`);
    },
    error: function (request, errorThrown) {
      console.log(errorThrown);
      alert(request.status + request.statusText);
    }
  });
  return true;
}

