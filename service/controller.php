<?php

  //get params from request

  $method = $_SERVER['REQUEST_METHOD'];

  if(isset($_REQUEST['func'])){
    $func = $_REQUEST["func"];
  }else if ($method == "PUT"){
    parse_str(file_get_contents("php://input"),$_PUT);
    $func = $_PUT['func'];
  }else{
    echo 'ERROR';
  }
  if(isset($_REQUEST['num1']) && is_numeric($_REQUEST['num1'])){
    $num1 = (int)$_REQUEST["num1"];
  }else if ($method == "PUT"){
    $num1 = $_PUT['num1'];
  }else{
    $num1 = 0;
  }
  if(isset($_REQUEST['num2']) && is_numeric($_REQUEST['num1'])){
    $num2 = (int)$_REQUEST["num2"];
  }else if ($method == "PUT"){
    $num2 = $_PUT['num2'];
  }else{
    $num2 = 0;
  }
  if(isset($_REQUEST['num3']) && is_numeric($_REQUEST['num1'])){
    $num3 = (int)$_REQUEST["num3"];
  }else if ($method == "PUT"){
    $num3 = $_PUT['num3'];
  }else{
    $num3 = 0;
  }
  
  $Calc = new Calculator($num1, $num2, $num3);

  switch ($func) {
    case "sum":
        $result = $Calc->sum();
        break;
    case "mult":
        $result = $Calc->mult();
        break;
    case "avg":
        $result = $Calc->avg();
        break;
    default:
        header('HTTP/1.0 400 Bad Request'); // set header for json response
        echo 'function is not define...';
        return;
}

  $response_arr = array('method'=>$method, 'result'=>$result);

  header('Content-Type: application/json'); // set header for json response
  echo json_encode($response_arr); // echo the converted JSON Object from the Array

  $Calc = null;


class Calculator{
  const NUM_TO_DIVIDE = 3;
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
    return $this->num1 + $this->num2 + $this->num3;
  }
  
  public function mult(){
    return $this->num1 * $this->num2 * $this->num3;
  }

  public function avg(){
    return ($this->num1 + $this->num2 + $this->num3) / self::NUM_TO_DIVIDE;
  }

  public function __destruct() {
        // printf("Destroying Calculator");
    }
}
