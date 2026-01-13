<?php
	require 'connexion.php';
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Content-Type: application/json");

	$rInput = json_decode(file_get_contents("php://input") , true);
	$first_name = $rInput["first_name"] ?? '';
	$last_name = $rInput["last_name"] ?? '';
	$age = $rInput["age"] ?? '';
	$email = $rInput["email"] ?? '';
	$pass = $rInput["pass"] ?? '';
	$verifPass = $rInput["verifPass"] ?? '';

	if($pass === $verifPass){
		$sql = "select * from user where email = :email";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([":email" => $email]);
		$u = $stmt->fetch(PDO::FETCH_ASSOC);
	}else{
		echo json_encode([
			"success" => false , 
			"message" => "les mots de passe ne sont pas similaire" 
		]);
		exit;
	}

	if (!$u){
		$password_hash = password_hash($pass,PASSWORD_DEFAULT);
		$sql = "insert into user(first_name , last_name , email , age , password_hash )
						values(:first_name ,:last_name , :email , :age , :password_hash )";
		$stmt = $pdo->prepare($sql);
		$stmt->execute([":first_name" => $first_name , 
			":last_name" => $last_name ,
			":age" => $age ,
			":email" => $email ,
			":password_hash" => $password_hash
		]);

		echo json_encode([
			"success" => true , 
			"message" => "welcome !"
			]);
			$_SESSION["user"] = [
				"first_name" => $first_name,
				"last_name" => $last_name,
				"email" => $email,
				"loggedIn" => true 
			];
			exit;
	}else{
		echo json_encode([
			"success" => false , 
			"message" => "votre compte deja exist , login"
		]);
	}
?>
