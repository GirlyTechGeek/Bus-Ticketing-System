<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
 $phpDate = strtotime($departureDate);
    $destination =  trim($request->destination);
    $departureDate = trim($request->departureDate);
try {
$query = $writeDB->prepare("SELECT returnDate, fare, destination, locations, departureDate FROM bookings WHERE destination='$destination' AND departureDate='$departureDate'");
 $query->bindParam("destination", $destination, PDO::PARAM_STR);
    $query->bindParam("departureDate", date('Y-m-d', strtotime($departureDate)) ,PDO::PARAM_STR);
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
