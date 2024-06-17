<?php

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

$method = $_SERVER['REQUEST_METHOD'];

include 'conexao.php';

if ($method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user_name = $data['user_name'];
  $email = $data['email'];
  $password = $data['password'];
  $admin = false;

  $sqlUser = mysql_query("SELECT * FROM users WHERE user_name = '$user_name'");
  $sqlEmail = mysql_query("SELECT * FROM users WHERE email = '$email'");

  if (mysql_num_rows($sqlEmail) > 0) {
    echo json_encode( "Email já cadastrado");
    exit;
  } else if (mysql_num_rows($sqlUser) > 0) {
    echo  json_encode("Usuario já cadastrado");
    exit;
  } else {

    $sql = mysql_query("INSERT INTO users (id, user_name, email, password, admin) VALUES (UUID(), '$user_name', '$email', '$password', '$admin')");
    echo  json_encode("0000");
    exit;
  }
}