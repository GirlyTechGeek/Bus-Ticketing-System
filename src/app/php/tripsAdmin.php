<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if( $_SERVER['REQUEST_METHOD'] == 'GET')
{

try {
    $query = $writeDB->prepare("SELECT username,returnDate, fares, destination, locations, departureDate, pickupLocation, brand, tripID,phoneNumber FROM trips");
    $query->execute();


    $rowCount = $query->rowCount();
    $userArray = array();

 while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $userArray[] = $row;
            }
echo json_encode($userArray);


    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}



