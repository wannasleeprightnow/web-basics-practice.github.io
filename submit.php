<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';

if (strlen($name) > 6 && strlen($email) > 6) {
    echo json_encode([
        'status' => 'success',
        'message' => "$name, the response to your request will be sent by email $email"
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => "Error: name and email must be longer than 6 characters"
    ]);
}