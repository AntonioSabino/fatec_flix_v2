<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Conexão com o banco de dados (considerando que a conexão está em 'conexao.php')
include 'conexao.php';

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['user_id']) && isset($data['movie_id'])) {
        $user_id = mysql_real_escape_string($data['user_id']);
        $movie_id = mysql_real_escape_string($data['movie_id']);

        // Verificar se já existe um favorito para o usuário e o filme
        $checkQuery = "SELECT * FROM favoritemovies WHERE UserID = '$user_id' AND MovieID = '$movie_id'";
        $checkResult = mysql_query($checkQuery);

        if (mysql_num_rows($checkResult) > 0) {
            // Se já existir, atualiza o registro
            $updateQuery = "UPDATE favoritemovies SET MovieID = '$movie_id' WHERE UserID = '$user_id'";
            $updateResult = mysql_query($updateQuery);

            if ($updateResult) {
                echo json_encode(["status" => "success", "message" => "Favorito atualizado com sucesso"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao atualizar favorito"]);
            }
        } else {
            // Se não existir, insere um novo registro
            $insertQuery = "INSERT INTO favoritemovies (UserID, MovieID) VALUES ('$user_id', '$movie_id')";
            $insertResult = mysql_query($insertQuery);

            if ($insertResult) {
                echo json_encode(["status" => "success", "message" => "Novo favorito salvo com sucesso"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao salvar novo favorito"]);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Dados incompletos"]);
    }
}

// Fechar conexão com o banco de dados
mysql_close($conecta_db);

?>
