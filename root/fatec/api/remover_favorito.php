<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: DELETE");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'DELETE') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user_name = $data['user_name'];
  $movie_id = $data['movie_id'];

  $sql = mysql_query("SELECT id FROM Users WHERE user_name = '$user_name'");

  $user_id = mysql_fetch_assoc($sql)['id'];

  $sql = mysql_query("DELETE FROM favoritemovies WHERE userID = '$user_id' AND movieID = $movie_id");

  if ($sql) {
    $response = array(
      'status' => 200,
      'message' => 'Filme removido dos favoritos',
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
