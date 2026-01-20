<?php
	header("Access-Control-Allow-Origin: http://localhost:5174");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

	header("Content-Type:application/json");

	if($_SERVER["REQUEST_METHOD"]==="OPTIONS"){
		http_response_code(200);
		exit;
	}

	require("connexion.php");

	session_start();

	$input = json_decode(file_get_contents("php://input") , true);

	$search = $input["search"] ?? '';

	if($search !== ""){
		$sql = "select * from event where user_email = :email and (name like ':search' or description like :search or location like ':search' or status like :search or vibe like :search)";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([
			":search"=>'%'.$search."%",
			":email"=>$_SESSION["user"]["email"]
		]);
	}else{
		$sql = "select * from event where user_email = :email order by date desc limit 6";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([
			":email"=>$_SESSION["user"]["email"]
		]);
	}
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode([
			"success"=>true ,
			"message" =>"done",
			"data" => $r
		]);
		exit;

?>