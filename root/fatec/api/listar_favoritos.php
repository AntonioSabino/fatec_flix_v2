<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $user_name = $_GET['user_name'];

  $sql = mysql_query("SELECT id FROM Users WHERE user_name = '$user_name'");

  $user_id = mysql_fetch_assoc($sql)['id'];

  $sql = mysql_query("SELECT movieID FROM favoritemovies WHERE userID = '$user_id'");

  $movies = array();

  while ($row = mysql_fetch_assoc($sql)) {
    $movies[] = $row['movieID'];
  }

  echo json_encode($movies);
}
