<?php
require_once("database.php");
require_once('response.php');
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $firstName = trim($request->firstName);
    $lastName =  trim($request->lastName);
    $phoneNumber =  trim($request->phoneNumber);
    $userName = trim($request->userName);
    $pin =  trim($request->pin);
    try {
        $query = $writeDB->prepare("INSERT INTO users (userName,firstName,lastName,phoneNumber,pin) VALUES ('$userName','$firstName','$lastName','$phoneNumber','$pin')");
        $query->bindParam("firstName", $firstName, PDO::PARAM_STR);
        $query->bindParam("userName", $firstName, PDO::PARAM_STR);
        $query->bindParam("lastName", $lastName, PDO::PARAM_STR);
        $query->bindParam("phoneNumber", $phoneNumber, PDO::PARAM_INT);
        $enc_password = password_hash('$pin', PASSWORD_DEFAULT);
        $query->bindParam("pin", $enc_password, PDO::PARAM_INT);
        $query->execute();
        return $writeDB->lastInsertId();
    } catch (PDOException $e) {
        exit($e->getMessage());
    }
}
