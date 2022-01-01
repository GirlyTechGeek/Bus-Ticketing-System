<?php
require_once("database.php");
require_once("response.php");
$writeDB = DB::connectWriteDB();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
     $bookingID =  trim($request->bookingID);
try {
    $query = $writeDB->prepare("DELETE FROM bookings WHERE bookingID='$bookingID'");
            $query->bindParam("bookingID", $bookingID, PDO::PARAM_INT);
            $query->execute();
    $rowCount = $query->rowCount();


    $row = $query->fetch(PDO::FETCH_ASSOC);

    return $writeDB->lastInsertId();
} catch (PDOException $e) {
    exit($e->getMessage());
}
}
