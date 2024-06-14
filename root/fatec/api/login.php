<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);


  $user_email = $data['user_email'];
  $password = $data['password'];

  $sql = mysql_query("SELECT user_name FROM users WHERE (user_name = '$user_email' OR email = '$user_email') AND password = '$password'");

  $user_data = mysql_fetch_assoc($sql);

  if ($user_data) {
    $data = array(
      $user_data
    );

    echo json_encode($data);
  } else {

    $data = array(
      401,
      'senha ou usuario errado'
    );

    echo json_encode($data);
  }
}
