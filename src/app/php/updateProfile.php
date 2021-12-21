<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
$firstName = trim($request->firstName);
    $lastName =  trim($request->lastName);
    $phoneNumber =  trim($request->phoneNumber);
    $userName = trim($request->userName);

try {
    $query = $writeDB->prepare("UPDATE users set firstName= '$firstName',lastName= '$lastName',phoneNumber= '$phoneNumber' where userName='$userName' ");
    $query->bindParam("phoneNumber", $phoneNumber, PDO::PARAM_INT);
    $query->bindParam("firstName", $firstName, PDO::PARAM_STR);
            $query->bindParam("userName", $firstName, PDO::PARAM_STR);
            $query->bindParam("lastName", $lastName, PDO::PARAM_STR);

    $query->execute();
    $rowCount = $query->rowCount();
    if ($rowCount == 0) {
        $response = new Response();
        $response->setHttpStatusCode(409);
        $response->setSuccess(false);
        $response->addMessage("Unable to locate records");
        $response->send();
        exit;
    }

    $row = $query->fetch(PDO::FETCH_ASSOC);

    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}
