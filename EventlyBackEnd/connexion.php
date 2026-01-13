<?php
$pdo = new PDO("mysql:host=localhost;dbname=eventplanner","root","");
	try{
		$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		error_log("DB connected successfully");		
	}
	catch(PDOException $e){
		retun($e->setMessage());

	}
?>
