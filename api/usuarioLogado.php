<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

include 'conexao.php';
session_start();

if (isset($_SESSION['user_id'])) {
  $user_id = $_SESSION['user_id'];

  $sql = mysql_query("SELECT user_name, email, profile_picture, created_at FROM users WHERE id = '$user_id'");
  $user_data = mysql_fetch_assoc($sql);

  if ($user_data) {
    echo json_encode($user_data);
  } else {
    http_response_code(404);
    echo json_encode(['message' => 'User not found']);
  }
} else {
  http_response_code(401);
  echo json_encode(['message' => 'User not logged in']);
}
?>
