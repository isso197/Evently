<?php
require("connexion.php");
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");


if($_SERVER['REQUEST_METHOD']==="OPTIONS" || $_SERVER['REQUEST_METHOD'] ==="POST") exit(0);

if($_SERVER['REQUEST_METHOD']==="GET"){

	$id = $_GET["id"];

	if(isset($id)){
		$sql = "SELECT * FROM event WHERE id =:id";
		$stmt = $pdo->prepare($sql);
		$stmt->execute(["id" => $id ]);
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode(
			[
				"success" => true,
				"data" => $r,
				"message" => "the dataaa"

			]);
	}else {
		echo json_encode(
			[
				"success"=>false,
				"message"=>"somthing went wrong"
			]);
	}
	exit;
}
?>