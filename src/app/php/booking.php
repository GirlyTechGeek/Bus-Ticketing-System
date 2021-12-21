<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if( $_SERVER['REQUEST_METHOD'] == 'GET')
{

try {
    $query = $writeDB->prepare("SELECT bookingID,departureDate,driver,fare,destination,returnDate,locations FROM bookings");
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
//             $returnData = array();
//
//             $response = new Response();
//             $response->setHttpStatusCode(200);
//             $response->setSuccess(true);
//             $response->toCache(true);
//             $response->setData($userArray);
//             $response->send();
//             exit;

    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}
