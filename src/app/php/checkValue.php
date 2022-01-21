<?php

require_once('response.php');

function checkValue($value, $feedback)
{
    if (!isset($value) || strlen($value) < 1 || strlen($value) > 255) {
        $response = new Response();
        $response->setHttpStatusCode(400);
        $response->setSuccess(false);
        $response->addMessage($feedback);
        $response->send();
        exit;
    }
}
