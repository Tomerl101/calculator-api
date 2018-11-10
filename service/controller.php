<?php

  //get params from request
  if(isset($_REQUEST['func']) && isValidOp($_REQUEST['func'])){
    $func = $_REQUEST["func"];
  }else{
    echo 'error!!!';
  }
  if(isset($_REQUEST['num1']) && is_numeric($_REQUEST['num1'])){
    $num1 = (int)$_REQUEST["num1"];
  }else{
    $num1 = 0;
  }
  if(isset($_REQUEST['num2']) && is_numeric($_REQUEST['num1'])){
    $num2 = (int)$_REQUEST["num2"];
  }else{
    $num2 = 0;
  }
  if(isset($_REQUEST['num3']) && is_numeric($_REQUEST['num1'])){
    $num3 = (int)$_REQUEST["num3"];
  }else{
    $num3 = 0;
  }
  
  $Calc = new Calculator($num1, $num2, $num3);
  $method = $_SERVER['REQUEST_METHOD'];

  switch ($func) {
    case "sum":
        $retVal = $Calc->sum();
        break;
    case "mult":
        $retVal = $Calc->mult();
        break;
    case "avg":
        $retVal = $Calc->avg();
        break;
    default:
        $retVal = 0;
}

  $response_arr = array('method'=>$method, 'result'=>$retVal);

  header('Content-Type: application/json'); // set header for json response
  echo json_encode($response_arr); // echo the converted JSON Object from the Array

  $Calc = null;

function isValidOp(op){

}
class Calculator{
  define( NUM_TO_DIVIDE, 3);
  var $num1;
  var $num2;
  var $num3;

  function Calculator($num1 = 0, $num2 = 0, $num3 = 0){
    $this->num1 = $num1;
    $this->num2 = $num2;
    $this->num3 = $num3;
    $result;
  }
  
  public function sum(){
    return $num1 + $num2 + $num3;
  }
  
  public function mult(){
    return $num1 * $num2 * $num3;
  }

  public function avg(){
    return ($num1 + $num2 + $num3) / NUM_TO_DIVIDE;
  }

  public function __destruct() {
        echo 'Destroying: ', $this->name, PHP_EOL;
    }
}
