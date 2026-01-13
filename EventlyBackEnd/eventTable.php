<?php
require('connexion.php');
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

/////////////GET//////////////
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
if(isset($_GET["id"])){
		$idD = $_GET["id"];
		$sql = "DELETE  FROM event WHERE id =:id";
		$stmt = $pdo->prepare($sql);
		$stmt-> execute(['id' => $idD]);
}
///////////GET///////////////
$user_email = $_SESSION["user"]["email"];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM event WHERE user_email = :user_email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":user_email" => $user_email]);
    $r = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "message" => "deleted",
        "data" => $r
    ]);
    exit;
}
/////////////////////////////////////
if($_SERVER['REQUEST_METHOD'] === 'POST'){
		$input = json_decode(file_get_contents("php://input"), true);
		$searchWord = $input["searchInput"] ?? '';
		if ($searchWord === "") {

		    $sql = "SELECT * FROM event WHERE user_email = :user_email";
		    $stmt = $pdo->prepare($sql);
		    $stmt->execute([":user_email" => $user_email]);

		} else {

		    $sql = "SELECT * FROM event 
		            WHERE user_email = :user_email
		            AND (name LIKE :word OR description LIKE :word)";

		    $stmt = $pdo->prepare($sql);
		    $word = "%".$searchWord."%";
		    $stmt->execute([
		        ":user_email" => $user_email,
		        ":word" => $word
		    ]);
		}

		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode([
		    "success" => true,
		    "data" => $r
		]);
		exit;
}

