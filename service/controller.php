<?php

  //get params from request
  if(isset($_REQUEST['func'])){
    $func = (int)$_REQUEST["func"];
  }else{
    echo 'error!!!';
  }
  if(isset($_REQUEST['num1']) && is_numeric($_REQUEST['num1'])){
    $num1 = (int)$_REQUEST["num1"];
  }else{
    $num1 = 0;
    header( 'HTTP/1.1 400: BAD REQUEST' );
    return;
  }
  if(isset($_REQUEST['num2']) && is_numeric($_REQUEST['num1'])){
    $num2 = (int)$_REQUEST["num2"];
  }else{
    $num2 = 0;
    header( 'HTTP/1.1 400: BAD REQUEST' );
    return;
  }
  if(isset($_REQUEST['num3']) && is_numeric($_REQUEST['num1'])){
    $num3 = (int)$_REQUEST["num3"];
  }else{
    $num3 = 0;
    header( 'HTTP/1.1 400: BAD REQUEST' );
    return;
  }
  
  $Calc = new Calculator($num1, $num2, $num3);
  $method = $_SERVER['REQUEST_METHOD'];

  switch ($func) {
    case "sum":
        $retVal = $Calc->sum($num1, $num2, $num3);
        break;
    case "mult":
        $retVal = $Calc->mult($num1, $num2, $num3);
        break;
    case "avg":
        $retVal = $Calc->avg($num1, $num2, $num3);
        break;
    default:
        $retVal = 0;
}

  $response_arr = array('method'=>$method, 'result'=>$retVal);

  header('Content-Type: application/json'); // set header for json response
  echo json_encode($response_arr); // echo the converted JSON Object from the Array

  $Calc = null;


class Calculator{
  var $num1;
  var $num2;
  var $num3;

  function Calculator($num1 = 0, $num2 = 0, $num3 = 0){
    $this->num1 = $num1;
    $this->num2 = $num2;
    $this->num3 = $num3;
  }
  
  public function sum($num1, $num2, $num3){
    return $num1 + $num2 + $num3;
  }
  
  public function mult($num1, $num2, $num3){
    return $num1 * $num2 * $num3;
  }

  public function avg($num1, $num2, $num3){
    return ($num1 + $num2 + $num3) / 3;
  }

  public function __destruct() {
        echo 'Destroying: ', $this->name, PHP_EOL;
    }
}
