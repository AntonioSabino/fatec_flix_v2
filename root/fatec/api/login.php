<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user_email = $data['user_email'];
  $password = $data['password'];

  $sql = mysql_query("SELECT id, user_name, email, bio, instagram, facebook, twitter FROM users WHERE (user_name = '$user_email' OR email = '$user_email') AND password = '$password'");

  $user_data = mysql_fetch_assoc($sql);

  if ($user_data) {
    $response = array(
      $user_data
    );
    echo json_encode($response);
  } else {
    http_response_code(401);
    echo json_encode(array(
      'message' => 'senha ou usuário errado'
    ));
  }
}
?>
