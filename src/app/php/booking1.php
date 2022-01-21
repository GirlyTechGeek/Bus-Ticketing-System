<?php
require_once('cors.php');
require_once('database.php');
require_once('response.php');
require_once('checkJson.php');
require_once('checkValue.php');

cors();
try {
    $writeDB = DB::connectWriteDB();
    $readDB = DB::connectReadDB();
} catch (PDOException $ex) {
    error_log("Connection error " . $ex, 0);
    $response = new Response();
    $response->setHttpStatusCode(500);
    $response->setSuccess(false);
    $response->addMessage("Database Connection error" . $ex->getMessage());
    $response->send();
    exit;
}



if (array_key_exists("availability", $_GET)) {
    $departureDate = $_GET['departureDate'];
    $startLocation = $_GET['locations'];
    $endLocation = $_GET['destination'];

    checkValue($departureDate, 'Departure Date provided invalid.');
    checkValue($startLocation, 'Start Location provided invalid.');
    checkValue($endLocation, 'End Location provided invalid.');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $query = $readDB->prepare('SELECT seats
                                    from bookings
                                    where departureDate = :departureDate and locations = :startLocation and destination = :endLocation
                                    limit 1');
        $query->bindParam(':departureDate', $departureDate, PDO::PARAM_STR);
        $query->bindParam(':startLocation', $startLocation, PDO::PARAM_STR);
        $query->bindParam(':endLocation', $endLocation, PDO::PARAM_STR);
        $query->execute();

        $rowCount = $query->rowCount();

        if ($rowCount == 0) {
            $response = new Response();
            $response->setHttpStatusCode(404);
            $response->setSuccess(false);
            $response->addMessage("No Booking Data found");
            $response->send();
            exit;
        }

        $row = $query->fetch(PDO::FETCH_ASSOC);

        $availableSeats = intval($row['seats']);

        if ($availableSeats <= 0) {
            $response = new Response();
            $response->setHttpStatusCode(404);
            $response->setSuccess(false);
            $response->addMessage("No Available seats");
            $response->send();
            exit;
        } else {
            $response = new Response();
            $response->setHttpStatusCode(200);
            $response->setSuccess(true);
            $response->addMessage("Seats Available");
            $response->setData($availableSeats);
            $response->send();
            exit;
        }
    } else {
        $response = new Response();
        $response->setHttpStatusCode(405);
        $response->setSuccess(false);
        $response->addMessage("Method not allowed");
        $response->send();
        exit;
    }
} elseif (empty($_GET)) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
     $postdata = file_get_contents('php://input');
        $jsonData = json_decode($postdata);
//         $jsonData = checkJson($rawPostData);

        checkValue($jsonData->destination, 'Destination provided invalid.');
        checkValue($jsonData->locations, 'Departure Location provided invalid.');
        checkValue($jsonData->departureDate, 'Departure Date provided invalid.');
//         checkValue($jsonData->returnDate, 'Return Date provided invalid.');
//         checkValue($jsonData->userName, 'Username provided invalid.');
//         checkValue($jsonData->hasPaid, 'Has paid provided invalid.');
//         checkValue($jsonData->pickupLocation, 'Has paid provided invalid.');

        $destination = $jsonData->destination;
        $locations = $jsonData->locations;
        $departureDate = $jsonData->departureDate;
        $returnDate = $jsonData->returnDate;
//         $userName = $jsonData->userName;
//         $hasPaid = $jsonData->hasPaid;
//         $pickupLocation = $jsonData->pickupLocation;

        try {
            $query = $readDB->prepare('SELECT seats
                                    from bookings
                                    where departureDate = :departureDate and locations = :locations and destination = :destination
                                    limit 1');
            $query->bindParam(':departureDate', $departureDate, PDO::PARAM_STR);
            $query->bindParam(':locations', $locations, PDO::PARAM_STR);
            $query->bindParam(':destination', $destination, PDO::PARAM_STR);
            $query->execute();

            $rowCount = $query->rowCount();

            if ($rowCount == 0) {
                $response = new Response();
                $response->setHttpStatusCode(404);
                $response->setSuccess(false);
                $response->addMessage("No Booking Data found creation unsuccessful");
                $response->send();
                exit;
            }

            $row = $query->fetch(PDO::FETCH_ASSOC);

            $availableSeats = intval($row['seats']);

            if ($availableSeats <= 0) {
                $response = new Response();
                $response->setHttpStatusCode(404);
                $response->setSuccess(false);
                $response->addMessage("No Available seats");
                $response->send();
                exit;
            } else {
                $query = $writeDB->prepare('INSERT into trips (destination, locations, departureDate, returnDate, userName, hasPaid, pickupLocation)
                                                        values (:destination, :locations, :departureDate, :returnDate, :userName, :hasPaid, :pickupLocation)');
                $query->bindParam(':destination', $destination, PDO::PARAM_STR);
                $query->bindParam(':locations', $locations, PDO::PARAM_STR);
                $query->bindParam(':departureDate', $departureDate, PDO::PARAM_STR);
                $query->bindParam(':returnDate', $returnDate, PDO::PARAM_STR);
                $query->bindParam(':userName', $userName, PDO::PARAM_STR);
                $query->bindParam(':hasPaid', $hasPaid, PDO::PARAM_STR);
                $query->bindParam(':pickupLocation', $pickupLocation, PDO::PARAM_STR);
                $query->execute();

                $rowCount = $query->rowCount();

                if ($rowCount === 0) {
                    $response = new Response();
                    $response->setHttpStatusCode(500);
                    $response->setSuccess(false);
                    $response->addMessage("Error logging new booking.");
                    $response->send();
                    exit;
                }

                $tableId = $writeDB->lastInsertId();

                $newSeats = $availableSeats - 1;

                $query = $writeDB->prepare('UPDATE bookings
                                            set seats = :newSeats
                                            where departureDate = :departureDate and locations = :locations and destination = :destination');
                $query->bindParam(':newSeats', $newSeats, PDO::PARAM_STR);
                $query->bindParam(':departureDate', $departureDate, PDO::PARAM_STR);
                $query->bindParam(':locations', $locations, PDO::PARAM_STR);
                $query->bindParam(':destination', $destination, PDO::PARAM_STR);

                $query->execute();

                $rowCount = $query->rowCount();

                if ($rowCount === 0) {
                    $response = new Response();
                    $response->setHttpStatusCode(500);
                    $response->setSuccess(false);
                    $response->addMessage("Error updating seats.");
                    $response->send();
                    exit;
                }

                $returnData = array();
                $returnData['tripID'] = $tableId;
                $returnData['destination'] = $destination;
                $returnData['locations'] = $locations;
                $returnData['departureDate'] = $departureDate;
                $returnData['returnDate'] = $returnDate;
//                 $returnData['userName'] = $userName;
//                 $returnData['hasPaid'] = $hasPaid;
//                 $returnData['pickupLocation'] = $pickupLocation;

                $response = new Response();
                $response->setHttpStatusCode(201);
                $response->setSuccess(true);
                $response->addMessage("Booked successfully");
                $response->setData($returnData);
                $response->send();
                exit;
            }
        }
         catch (PDOException $ex) {
            $response = new Response();
            $response->setHttpStatusCode(500);
            $response->setSuccess(false);
            $response->addMessage("Failed to create Booking.");
            $response->send();
            exit;
        }
    } else {
        $response = new Response();
        $response->setHttpStatusCode(405);
        $response->setSuccess(false);
        $response->addMessage("Method not allowed");
        $response->send();
        exit;
    }
} else {
    $response = new Response();
    $response->setHttpStatusCode(405);
    $response->setSuccess(false);
    $response->addMessage("Method not allowed");
    $response->send();
    exit;
}
