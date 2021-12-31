<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $phpDate = strtotime($departureDate);
    $destination =  trim($request->destination);
    $locations =  trim($request->locations);
    $departureDate = trim($request->departureDate);
    $returnDate =  trim($request->returnDate);
    $pickupLocation =  trim($request->pickupLocation);
    $fares =  trim($request->fares);
    $requestTime =  trim($request->requestTime);
    $brand =  trim($request->brand);
    $userName =  trim($request->userName);
    $hasPaid =  trim($request->hasPaid);
     $tripID =  trim($request->tripID);
try {
    $query = $writeDB->prepare("UPDATE trips set destination='$destination',locations='$locations',departureDate='$departureDate',returnDate='$returnDate',userName='$userName',hasPaid='$hasPaid',pickupLocation='pickupLocation',fares='$fares',requestTime='$requestTime',brand='$brand' where tripID='$tripID'");
    $query->bindParam("destination", $destination, PDO::PARAM_STR);
            $query->bindParam("locations", $locations, PDO::PARAM_STR);
            $query->bindParam("departureDate", date('Y-m-d', strtotime($departureDate)) ,PDO::PARAM_STR );
            $query->bindParam("returnDate", date('Y-m-d', strtotime($returnDate)), PDO::PARAM_STR);
            $query->bindParam("userName", $userName, PDO::PARAM_STR);
            $query->bindParam("hasPaid", $hasPaid, PDO::PARAM_STR);
            $query->bindParam("pickupLocation", $pickupLocation, PDO::PARAM_STR);
            $query->bindParam("fares", $fares, PDO::PARAM_INT);
            $query->bindParam("requestTime", $requestTime, PDO::PARAM_STR);
            $query->bindParam("brand", $brand, PDO::PARAM_STR);
            $query->bindParam("tripID", $tripID, PDO::PARAM_INT);
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
