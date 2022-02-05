<?php

trait Random {
  public function randomize($array) {
    $rand = array_rand($array);
    return $array[$rand];
  }
}

class Team {

  use Random;

  protected $teammate1 = "Игрок 1";
  protected $teammate2 = "Игрок 2";
  protected $teammate3 = "Игрок 3";
  public $list = [];
  public $name = "";

  public function __construct($name) {
    $this->name = $name;
    $this->list = [$this->teammate1, $this->teammate2, $this->teammate3];
  }
}

class Events {

  use Random;

  protected $goal = "Гол";
  protected $forfeit = "Штрафной";
  protected $penalty = "Пенальти";
  public $list = [];

  public function __construct() {
    $this->list = [$this->goal, $this->forfeit, $this->penalty, "false"];
  }
}


