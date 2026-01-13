<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'connexion.php';
session_start();

$input = json_decode(file_get_contents("php://input"), true);

$name = $input["name"] ?? '';
$description = $input["description"] ?? '';
$time = $input["time"] ?? '';
$location = $input["location"] ?? '';
$categorie = $input["categorie"] ?? '';

if (
    $name !== "" &&
    $description !== "" &&
    $time !== "" &&
    $location !== "" &&
    $categorie !== ""
) {

    if (!isset($_SESSION["user"]["email"])) {
        echo json_encode([
            "success" => false,
            "message" => "Session expired. Please log in."
        ]);
        exit;
    }

    $sql = "INSERT INTO event 
            (name, description, time, location, category, user_email)
            VALUES (:name, :description, :time, :location, :categorie, :email)";

    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([
        ":name" => $name,
        ":description" => $description,
        ":time" => $time,
        ":location" => $location,
        ":categorie" => $categorie,
        ":email" => $_SESSION["user"]["email"]
    ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage() 
        ]);
    }

    echo json_encode([
        "success" => true,
        "message" => "L'événement est ajouté"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Remplis tous les champs"
    ]);
}
