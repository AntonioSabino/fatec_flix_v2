<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');


include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {

    $query = "SELECT UserID, MovieID FROM favoritemovies";
    $result = mysql_query($query);
    if ($result) {
        $favorites = [];
        while ($row = mysql_fetch_assoc($result)) {
            $favorites[] = [
                'user_id' => $row['UserID'],
                'movie_id' => $row['MovieID']
            ];
        }
        echo json_encode($favorites);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao buscar favoritos"]);
    }
}
mysql_close($conecta_db);
?>
