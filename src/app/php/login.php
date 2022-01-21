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
     $query = $writeDB->prepare("SELECT phoneNumber,firstName,lastName,userName FROM users WHERE pin= $pin AND phoneNumber=$phoneNumber");
// $query = $writeDB->prepare("SELECT userName FROM users WHERE pin= $pin AND phoneNumber=$phoneNumber");
        $query->execute();
//     echo json_decode($query);
    $rowCount = $query->rowCount();
    if ($rowCount == 0) {
        $response = new Response();
        $response->setHttpStatusCode(409);
        $response->setSuccess(false);
        $response->addMessage("PhoneNumber or Pin is invalid");
        $response->send();
        exit;
    }
    $userArray = array();

     //     $row = $query->fetch(PDO::FETCH_ASSOC);
      while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                     $userArray[] = $row;
                 }
     echo json_encode($userArray);

    $row = $query->fetch(PDO::FETCH_ASSOC);

    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}
