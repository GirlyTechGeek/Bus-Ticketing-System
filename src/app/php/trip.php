<?php
require_once("database.php");
require_once('response.php');
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $phpDate = strtotime($departureDate);
    $destination =  trim($request->destination);
    $departureLocation =  trim($request->departureLocation);
    $departureDate = trim($request->departureDate);
    $returnDate =  trim($request->returnDate);
    $pickupLocation =  trim($request->pickupLocation);

    $userName =  trim($request->userName);
    $hasPaid =  trim($request->hasPaid);
    try {
        $query = $writeDB->prepare("INSERT INTO trips (destination,departureLocation,departureDate,returnDate,userName,hasPaid,pickupLocation) VALUES ('$destination','$departureLocation','$departureDate','$returnDate','$userName','$hasPaid','$pickupLocation')");
        $query->bindParam("destination", $destination, PDO::PARAM_STR);
        $query->bindParam("departureLocation", $departureLocation, PDO::PARAM_STR);
        $query->bindParam("departureDate", date('Y-m-d', strtotime($departureDate)) ,PDO::PARAM_STR );
        $query->bindParam("returnDate", date('Y-m-d', strtotime($returnDate)), PDO::PARAM_STR);
        $query->bindParam("userName", $userName, PDO::PARAM_STR);
        $query->bindParam("hasPaid", $hasPaid, PDO::PARAM_STR);
        $query->bindParam("pickupLocation", $pickupLocation, PDO::PARAM_STR);
        $query->execute();
        return $writeDB->lastInsertId();
    } catch (PDOException $e) {
        exit($e->getMessage());
    }
}
