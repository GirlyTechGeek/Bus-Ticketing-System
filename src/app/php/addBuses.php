<?php
require_once("database.php");
require_once('response.php');
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $driver = trim($request->driver);
    $returnDate =  trim($request->returnDate);
    $phoneNumber =  trim($request->phoneNumber);
    $departureDate = trim($request->departureDate);
    $locations =  trim($request->locations);
    $fare =  trim($request->fare);
    $destination =  trim($request->destination);
    $seats =  trim($request->seats);
    $brand =  trim($request->brand);
    try {
        $query = $writeDB->prepare("INSERT INTO bookings (driver,returnDate,departureDate,locations,fare,destination,seats,brand,phoneNumber) VALUES ('$driver','$returnDate','$departureDate','$locations','$fare','$destination','$seats','$brand','$phoneNumber')");
        $query->bindParam("driver", $driver, PDO::PARAM_STR);
        $query->bindParam("departureDate", date('Y-m-d', strtotime($departureDate)) ,PDO::PARAM_STR );
        $query->bindParam("returnDate", date('Y-m-d', strtotime($returnDate)), PDO::PARAM_STR);
        $query->bindParam("phoneNumber", $phoneNumber, PDO::PARAM_INT);
        $query->bindParam("locations", $locations, PDO::PARAM_STR);
        $query->bindParam("fare", $fare, PDO::PARAM_STR);
        $query->bindParam("destination", $destination, PDO::PARAM_STR);
        $query->bindParam("seats", $seats, PDO::PARAM_INT);
        $query->bindParam("brand", $brand, PDO::PARAM_STR);
        $query->execute();
        return $writeDB->lastInsertId();
    } catch (PDOException $e) {
        exit($e->getMessage());
    }
}
