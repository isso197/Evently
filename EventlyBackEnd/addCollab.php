<?php
require 'connexion.php';

header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents('php://input') , true);

$email = $input["email"];
$role = $input["role"];
$message = $input["message"];

$event_id = $_GET["id"] ?? null;
$email_change_mind = $_GET["email_change_mind"] ?? null;

session_start();
////////////////////////////////////////////
if (!isset($_SESSION["draft_collabs"])) {
    $_SESSION["draft_collabs"] = [];
}
///////////////////
if (!isset($_SESSION["user"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}
//////////////////////////

//if we add collabs from outside the add event form
if($event_id){
	//making sure the user exists to add it 
	$sql ="select * from user where email =:email";
	$stmt = $pdo->prepare($sql);
	$stmt->execute([":email" =>$email]);
	$r = $stmt->fetch(PDO::FETCH_ASSOC);

	if($r){
	$sql = "insert into eventuser(event_id ,user_id ,role) values(:event_id , :user_id , :role)";
	$stmt = $pdo->prepare($sql);
	$stmt->execute([
		":event_id"=>$event_id,
		":user_id"=>$r["id"],
		":role"=>$role
	]);
//add an event from the adding form
}else{
		$_SESSION["draft_collabs"][]=[
		"email"=>$email,
		"role"=>$role,
		"message"=>$message
	];
}
	//the delete operation x / make sure it exist and get info
	$sql ="select * from user where email =:email";
	$stmt = $pdo->prepare($sql);
	$stmt->execute([":email" =>$email_change_mind]);
	$t = $stmt->fetch(PDO::FETCH_ASSOC);
	//delete the user that we changed our mind about
	if($t){
		$sql="delete from eventuser where event_id = :event_id and user_id = :id";
		$stmt =  $pdo->prepare($sql);
		$stmt->execute([
			":id"=>$t["id"],
			":event_id"=>$event_id
		]);}
	}
echo json_encode([
  "success" => true
]);
?>
