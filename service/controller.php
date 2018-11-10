<?php

  //TODO: add destructor the Calc class

  //get params from request
  if(isset($_REQUEST['func'])){
    $func = (int)$_REQUEST["func"];
  }else{
    echo 'error!!!';
  }
  if(isset($_REQUEST['num1'])){
    $num1 = (int)$_REQUEST["num1"];
  }else{
    $num1 = 0;
  }
  if(isset($_REQUEST['num2'])){
    $num2 = (int)$_REQUEST["num2"];
  }else{
    $num2 = 0;
  }
  if(isset($_REQUEST['num3'])){
    $num3 = (int)$_REQUEST["num3"];
  }else{
    $num3 = 0;
  }
  
  $Calc = new Calculator;
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

  $response_arr = array('method'=>$method, 'retVal'=>$retVal);

  header('Content-Type: application/json'); // set header for json response
  echo json_encode($response_arr); // echo the converted JSON Object from the Array



class Calculator{
  //save number state and result 
  
  public function sum($num1, $num2, $num3){
    return $num1 + $num2 + $num3;
  }
  
  public function mult($num1, $num2, $num3){
    return $num1 * $num2 * $num3;
  }

  public function avg($num1, $num2, $num3){
    return ($num1 + $num2 + $num3) / 3;
  }
}
