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

// $user_name = $_POST['user_name'];
// $email = $_POST['email'];
// $password = $_POST['password'];
// $admin = false;


// $sqlUser = mysql_query("SELECT * FROM users WHERE user_name = '$user_name'");
// $sqlEmail = mysql_query("SELECT * FROM users WHERE email = '$email'");

// if (mysql_num_rows($sqlEmail) > 0) {

//   echo "Email já cadastrado";
// } else if (mysql_num_rowsdata)User) > 0) {

//   echo "Usuario já cadastrado";
// } else {

//   $sql = mysql_query("INSERT INTO users (id, user_name, email, password, admin) VALUES (UUID(), '$user_name', '$email', '$password', '$admin')");
//   echo "0000";
// }


?>

<!-- ID CHAR(36) PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Admin BOOLEAN NOT NULL,
-->
<!-- INSERT INTO Users (id, user_name, email, password) 
VALUES 
(UUID(), 'usuario1', 'usuario1@example.com', 'senha123'),
(UUID(), 'usuario2', 'usuario2@example.com', 'senha456'),
(UUID(), 'usuario3', 'usuario3@example.com', 'senha789'); -->