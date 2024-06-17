<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $movie_id = intval($_GET['movie_id']);

    $sql = mysql_query("SELECT Ratings.ID as id, Ratings.userID, Ratings.movieID, Ratings.rating, Ratings.comment, Users.user_name FROM Ratings INNER JOIN Users ON Ratings.userID = Users.ID WHERE Ratings.movieID = '$movie_id'");

    $data = array();

    while ($row = mysql_fetch_assoc($sql)) {
        $data[] = $row;
    }

    if ($data) {
        echo json_encode($data);
    } else {
        $response = array(
            "status" => 401,
            "message" => 'Erro na requisição'
        );
        echo json_encode($response);
    }
}
?>
