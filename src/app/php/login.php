<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
$phoneNumber = trim($request->phoneNumber);
$pin = trim( $request->pin);
try {
    $query = $writeDB->prepare("SELECT * FROM users WHERE pin= $pin AND phoneNumber=$phoneNumber");
    $query->bindParam("phoneNumber", $phoneNumber, PDO::PARAM_INT);
    $enc_password = hash('sha256', $pin);
    $query->bindParam("pin", $enc_password, PDO::PARAM_INT);
    $query->execute();
    $rowCount = $query->rowCount();
    if ($rowCount == 0) {
        $response = new Response();
        $response->setHttpStatusCode(409);
        $response->setSuccess(false);
        $response->addMessage("PhoneNumber or Pin is invalid");
        $response->send();
        exit;
    }

    $row = $query->fetch(PDO::FETCH_ASSOC);

    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}
