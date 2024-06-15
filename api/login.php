<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

include 'conexao.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $user_email = mysql_real_escape_string($data['user_email']);
    $password = mysql_real_escape_string($data['password']);

    $sqlUser = mysql_query("SELECT id, user_name, email FROM users WHERE (user_name = '$user_email' OR email = '$user_email') AND password = '$password'");
    $user_data = mysql_fetch_assoc($sqlUser);

    if ($user_data) {
        $_SESSION['user_id'] = $user_data['id'];

        // Busca os favoritos do usuário
        $sqlFavorites = mysql_query("SELECT movieID FROM favoritemovies WHERE userID = '$user_data[id]'");
        $favorites = array();
        while ($row = mysql_fetch_assoc($sqlFavorites)) {
            $favorites[] = $row['movieID'];
        }

        $data = array(
            'id' => $user_data['id'],
            'user_name' => $user_data['user_name'],
            'user_email' => $user_data['email'],
            'favorites' => $favorites
        );

        echo json_encode($data);
    } else {
        http_response_code(401); // Define o código de resposta HTTP 401 Unauthorized
        echo json_encode(array('status' => 401, 'message' => 'Usuário ou senha incorretos'));
    }
}
?>
