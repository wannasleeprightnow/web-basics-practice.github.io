<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if (strlen($username) <= 6 || strlen($password) <= 6) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Username and password must be longer than 6 characters.'
    ]);
    exit;
}

echo json_encode([
    'status' => 'success',
    'message' => "Successful login user $username"
]);
?>