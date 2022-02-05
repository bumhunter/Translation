<?php
header('Content-Type: application/json');

require_once '../Classes/main.php';

$team1 = new Team("Победа");
$team2 = new Team("Вымпел");
$teams = [$team1->name, $team2->name];
$chosen_team = array_rand($teams);
$chosen_team = $teams[$chosen_team];
$chosen_team = new Team($chosen_team);
$chosen_teammate = $chosen_team->randomize($chosen_team->list);

$events = new Events();
$chosen_event = $events->randomize($events->list);

$now_time = date('Y-m-d H:i:s');

$result = array('time' => $now_time, 'team' => $chosen_team->name, 'teammate' => $chosen_teammate, 'event' => $chosen_event);

echo json_encode($result);






