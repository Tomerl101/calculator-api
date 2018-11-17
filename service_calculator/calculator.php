<?php
  class Calculator{
    const NUM_TO_DIVIDE = 3;
    private $num1;
    private $num2;
    private $num3;

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

?>
