<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'DELETE') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user_name = $data['user_name'];

  $sql = mysql_query("DELETE FROM users WHERE user_name = '$user_name'");

  if ($sql) {
    $response = array(
      'status' => 200,
      'message' => 'usuário deletado',
    );
    echo json_encode($response);
  } else {

    $data = array(
      401,
      'erro na requisição'
    );

    echo json_encode($data);
  }
}
