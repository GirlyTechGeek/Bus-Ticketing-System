<?php

require_once('response.php');

function checkJson($rawPostData)
{
    $jsonData = json_decode($rawPostData);

    if (!$jsonData) {
        $response = new Response();
        $response->setHttpStatusCode(400);
        $response->setSuccess(false);
        $response->addMessage("Request body is not valid JSON");
        $response->send();
        exit;
    }

    return $jsonData;
}
