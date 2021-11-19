<?php
require_once('response.php');
require_once('database.php');
try {
  $writeDb = DB::connectWriteDB();
  $readDb = DB::connectReadDB();
  $response = new Response();

  $response->setHttpStatusCode(200);

  $response->setSuccess(true);

  $response->addMessage("Database Connected: ");

  $response->send();

  exit;
} catch (PDOException $error) {
  $response = new Response();

  $response->setHttpStatusCode(500);

  $response->setSuccess(false);

  $response->addMessage("Database Connection error: " . $error->getMessage());

  $response->send();

  exit;
}
