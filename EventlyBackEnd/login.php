<?php
	require 'connexion.php';
	
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Content-Type: application/json");

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

	ini_set('session.cookie_samesite', 'None');
	ini_set('session.cookie_secure', '0');
	session_start(); 

	$input = json_decode(file_get_contents("php://input") , true);
	$email = $input["email"] ?? '';
	$pass = $input["pass"] ?? '';
	if ($email !== "" && $pass != ""){
		$sql = "select * from user where email = :email";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([':email' => $email]);
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		if(!$r || $r["email"] !== $email){
			echo json_encode([
				"success" => false ,
				"message" => "l'utilisateur n'exist pas "
			]);
			exit;
		}if(!password_verify($pass,$r["password_hash"])){
			echo json_encode([
				"success" => false ,
				"message" => "le pass est  sans uncorrect"
			]);
			exit;
		}

		$_SESSION["user"] = [
				"first_name" => $r["first_name"],
				"lat_nsame" => $r["last_name"],
				"email" => $r["email"] ,
				"loggedIn" => true 
			];

			echo json_encode([
				"success" => true ,
				"message" => "welcom !!"
			]);
			
		}
?>