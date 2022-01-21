<?php
require_once("database.php");
require_once('response.php');
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
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
    $phoneNumber =  trim($request->phoneNumber);
    try {


        $query = $writeDB->prepare("INSERT INTO trips (destination,locations,departureDate,returnDate,userName,hasPaid,pickupLocation,fares,requestTime,brand,phoneNumber) VALUES ('$destination','$locations','$departureDate','$returnDate','$userName','$hasPaid','$pickupLocation', '$fares', '$requestTime','$brand','$phoneNumber')");

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
        $query->bindParam("phoneNumber", $phoneNumber, PDO::PARAM_STR);
        $query->execute();

//         $availableSeats =  $writeDB->prepare("SELECT seats FROM bookings WHERE departureDate = '$departureDate' and locations = '$locations' and destination = '$destination'");
//         echo json_decode($availableSeats);
//         $newSeats = $availableSeats - 1;
//         $query = $writeDB->prepare("UPDATE bookings set seats = 8 where departureDate ='$departureDate' and locations ='$locations' and destination ='$destination'");
//         $query->execute();

           return $writeDB->lastInsertId();
        } catch (PDOException $e) {
          exit($e->getMessage());
        }
    }
