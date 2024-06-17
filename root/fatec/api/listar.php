<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $data = json_decode(file_get_contents('php://input'), true);

  $sql = mysql_query("SELECT id, user_name, email FROM users");

  $data = array();

  while ($rows[] = mysql_fetch_assoc($sql));

  array_pop($rows);

  array_push($data, $rows);

  if ($data) {
    echo json_encode($data);
  } else {

    $data = array(
      401,
      'erro na requisição'
    );

    echo json_encode($data);
  }
}
