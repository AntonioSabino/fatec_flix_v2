<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'PUT') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user_name = $data['user_name'];
  $user_email = $data['email'];

  $sql = mysql_query("UPDATE users SET user_name = '$user_name', email = '$user_email' WHERE user_name = '$user_name'");

  if ($sql) {
    $response = array(
      'status' => 200,
      'message' => 'Usuário atualizado',
    );
    echo json_encode($response);
  } else {
    http_response_code(401);
    echo json_encode(array(
      'status' => 401,
      'message' => 'Erro na requisição',
    ));
  }
}
?>
