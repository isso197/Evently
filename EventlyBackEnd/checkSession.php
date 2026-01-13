<?php
require "connexion.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '0');
session_start(); 

header("Content-Type:application/json");

if(isset($_SESSION["user"]) && $_SESSION["user"]["loggedIn"] === true){
	echo json_encode(
		[
			"isLogged"=>true ,
			"user"=>$_SESSION["user"]
		]
	);
}else{
	echo json_encode(
		[
			"isLogged"=>false
		]
	);
}
?>